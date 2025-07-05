#!/bin/bash

# Create and activate virtual environment
echo "Setting up Python environment..."
python3 -m venv venv
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Download required NLTK data
echo "Downloading NLTK data..."
python3 -c "import nltk; nltk.download('punkt'); nltk.download('averaged_perceptron_tagger'); nltk.download('stopwords'); nltk.download('wordnet')"

# Download spaCy model
echo "Downloading spaCy model..."
python3 -m spacy download en_core_web_sm

# Start the Flask backend
echo "Starting Flask application..."
python3 ai_service/app.py &

# Wait for Flask to start
sleep 2

# Open the frontend in the default browser
echo "Opening application in browser..."
open http://127.0.0.1:5001

echo "Application is running!"
echo "Access the application at: http://127.0.0.1:5001"
echo "Press Ctrl+C to stop the application"

# Wait for user interrupt
wait 