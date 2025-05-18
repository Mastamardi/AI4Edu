<<<<<<< HEAD
# AI4Edu Chatbot

An intelligent educational chatbot powered by Anthropic's Claude API, designed to provide personalized learning assistance across various subjects.

## Features

- Intelligent responses using Claude AI
- Conversation history support
- Educational focus with detailed explanations
- Support for multiple learning formats
- Document processing capabilities
- Quiz generation
- Flashcard creation

## Prerequisites

- Python 3.8+
- Node.js 14+
- Anthropic API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ai4edu
```

2. Set up the Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Install spaCy model:
```bash
python -m spacy download en_core_web_sm
```

4. Set up environment variables:
```bash
# On Unix/Linux/macOS
export CLAUDE_API_KEY="your-api-key-here"

# On Windows (Command Prompt)
set CLAUDE_API_KEY=your-api-key-here

# On Windows (PowerShell)
$env:CLAUDE_API_KEY="your-api-key-here"
```

5. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

## Running the Application

1. Start the AI service:
```bash
cd ai_service
python app.py
```

2. Start the backend server:
```bash
cd backend
node server.js
```

3. Start the frontend development server:
```bash
cd frontend
npm start
```

The application should now be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- AI Service: http://localhost:5001

## API Endpoints

### Chat Endpoint
```
POST /chat
Content-Type: application/json

{
    "message": "Your question here",
    "sessionId": "unique-session-id"  // Optional
}
```

### Document Processing Endpoint
```
POST /process
Content-Type: application/json

{
    "text": "Your text content",
    // OR
    "file": {
        "content": "base64-encoded-file-content",
        "type": "application/pdf"  // or other supported types
    }
}
```

## Features in Detail

1. **Intelligent Chat**
   - Context-aware responses
   - Educational focus
   - Conversation history support
   - Session management

2. **Document Processing**
   - PDF support
   - Word document support
   - PowerPoint support
   - Text extraction and analysis

3. **Learning Tools**
   - Quiz generation
   - Flashcard creation
   - Key concept extraction
   - Summary generation

## Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Keep dependencies updated
- Follow security best practices for production deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Add your license information here] 
=======
# AI4Edu

# 🎓 AI4Edu – Smart AI-Powered Study Companion

**AI4Edu** is an AI-powered educational web application designed to help students learn more effectively, stay focused, and manage their study routines. It combines intelligent tools like summarization, quiz generation, flashcards, progress tracking, and wellness support—all within a clean, distraction-free platform.

---

## 🚀 Features

- 🧠 **Smart Study Assistant**  
  AI-powered content summarization, flashcard & quiz generation, and instant doubt-solving to make learning easier and more efficient.

- 📊 **Study Tracker & Focus Mode**  
  Visual dashboards to track study time, topics covered, and quiz performance, along with a distraction-free mode during quizzes.

- 💬 **Wellness & Productivity Support**  
  EduBot chatbot offers guidance on focus, stress, healthy habits, and daily/weekly task tracking.

- 🌐 **Text Translation**  
  Translate summarized content into preferred languages for better accessibility.

- 🎧 **Binaural Beats Integration**  
  Boost concentration and reduce stress during study sessions.

---

## 🏗️ Technical Stack

### 🔹 Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Responsive Design: Flexbox, Grid, Media Queries
- UI Enhancements: Font Awesome, Google Fonts
- Visualization: Chart.js
- Browser APIs: LocalStorage, DOM API, Fullscreen API

### 🔹 Backend
- Flask (Python)
- RESTful API architecture
- CORS support for frontend-backend communication
- Base64 Encoding & MIME Type Validation for file handling

### 🔹 NLP & AI Modules
- **NLTK**: Sentence Tokenization, POS Tagging, Stopword Removal
- **SpaCy**: Dependency Parsing, Noun Chunk Extraction
- **WordNet**: Semantic Relationships
- **Custom Algorithms**: MCQ & Flashcard generation, keyword extraction

---

## ⚙️ Core Functionalities

- 🔹 **Summary Generator**: AI summarizes long study materials.
- 🔹 **Quiz Generator**: Creates multiple-choice quizzes from content.
- 🔹 **Flashcard Generator**: Auto-generates revision flashcards.
- 🔹 **Instant Doubt Solver**: Answers questions from uploaded content.
- 🔹 **Task Tracker**: Add, manage, and mark study goals.
- 🔹 **Study Dashboard**: Visual progress tracking via charts and logs.

---

## 📸 Screenshots

- **Home Page**: Clean UI introducing features and entry point.
- **Summary & Key Concepts**: Extracts and displays core points from content.
- **Personal Study Goals**: Add/manage daily & weekly targets.
- **EduBot**: AI chatbot for wellness and productivity tips.
- **Quiz Generator**: Interactive MCQ-based testing.
- **Dashboard**: Graphs and stats to track progress and engagement.

---

## 🔮 Future Enhancements

- 🎤 Voice Input/Output for hands-free learning
- 🌍 Full multilingual support
- 📱 Mobile app version
- 🧠 Adaptive study path recommendations

---

## 📌 Scope

AI4Edu aims to support self-paced learning by simplifying complex content, promoting consistent study habits, and addressing mental wellness. The platform integrates AI and NLP to provide a complete, personalized learning assistant—designed for learners from all backgrounds.

---

## 🤝 Team

**Team Enlighten**  
A passionate group of developers, designers, and AI enthusiasts committed to transforming education through technology.

---

## 📄 License

This project is licensed under the MIT License.

---

>>>>>>> 65b73ab17e8c25d7524cec39cd73e6380e77afcf
