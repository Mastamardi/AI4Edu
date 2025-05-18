// backend/server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai4edu', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Models
const UserActivity = mongoose.model('UserActivity', {
  userId: String,
  activityType: String,
  activityData: Object,
  timestamp: { type: Date, default: Date.now }
});

const StudyMaterial = mongoose.model('StudyMaterial', {
  userId: String,
  filename: String,
  originalText: String,
  summary: String,
  keywords: [String],
  flashcards: [Object],
  quizzes: [Object],
  language: String,
  createdAt: { type: Date, default: Date.now }
});

// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { language } = req.body;
    const filePath = req.file.path;
    
    // Read file content
    let textContent = '';
    if (req.file.mimetype === 'application/pdf') {
      // In production, you'd use pdfplumber here
      textContent = "Sample PDF text content extracted from " + req.file.originalname;
    } else {
      textContent = fs.readFileSync(filePath, 'utf8');
    }
    
    // Call Python AI service
    const aiResponse = await axios.post('http://localhost:5001/process', {
      text: textContent,
      language
    });
    
    // Save to database
    const material = new StudyMaterial({
      userId: 'demo-user', // In real app, use authenticated user ID
      filename: req.file.originalname,
      originalText: textContent,
      summary: aiResponse.data.summary,
      keywords: aiResponse.data.keywords,
      flashcards: aiResponse.data.flashcards,
      quizzes: aiResponse.data.quizzes,
      language
    });
    
    await material.save();
    
    // Log activity
    const activity = new UserActivity({
      userId: 'demo-user',
      activityType: 'upload',
      activityData: { filename: req.file.originalname }
    });
    await activity.save();
    
    res.json({
      success: true,
      materialId: material._id,
      ...aiResponse.data
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/activities', async (req, res) => {
  try {
    const activities = await UserActivity.find({ userId: 'demo-user' })
      .sort({ timestamp: -1 })
      .limit(5);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const uploads = await StudyMaterial.countDocuments({ userId: 'demo-user' });
    const activities = await UserActivity.find({ userId: 'demo-user' });
    
    let flashcardsViewed = 0;
    let quizzesTaken = 0;
    let studyTime = 0;
    
    activities.forEach(activity => {
      if (activity.activityType === 'flashcard') flashcardsViewed++;
      if (activity.activityType === 'quiz') quizzesTaken++;
      if (activity.activityType === 'study') studyTime += activity.activityData.minutes || 0;
    });
    
    res.json({
      uploads,
      flashcardsViewed,
      quizzesTaken,
      studyTime
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});