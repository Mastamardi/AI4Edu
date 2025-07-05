FROM python:3.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential gcc

WORKDIR /app

COPY api/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Download spaCy and NLTK data
RUN python -m spacy download en_core_web_sm
RUN python -m nltk.downloader punkt averaged_perceptron_tagger stopwords wordnet omw-1.4

COPY api/ .

CMD ["gunicorn", "app:app"] 