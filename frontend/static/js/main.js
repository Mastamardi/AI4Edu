async function processText() {
    const text = document.getElementById('text').value;
    const resultDiv = document.getElementById('result');
    
    if (!text.trim()) {
        showError('Please enter some text to process.');
        return;
    }

    showLoading();
    
    try {
        const response = await fetch('http://127.0.0.1:5005/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        
        if (!response.ok) {
            throw new Error('Failed to process text');
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        showError('Error processing text: ' + error.message);
    } finally {
        hideLoading();
    }
}

function displayResults(data) {
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = `
        <div class="card mb-4">
            <div class="card-header">
                <h3>Summary</h3>
            </div>
            <div class="card-body">
                <p>${data.summary}</p>
            </div>
        </div>

        <div class="card mb-4">
            <div class="card-header">
                <h3>Keywords</h3>
            </div>
            <div class="card-body">
                <div class="keywords-container">
                    ${data.keywords.map(keyword => `
                        <span class="keyword">${keyword}</span>
                    `).join('')}
                </div>
            </div>
        </div>

        <div class="card mb-4">
            <div class="card-header">
                <h3>Flashcards</h3>
            </div>
            <div class="card-body">
                ${data.flashcards.map(card => `
                    <div class="flashcard">
                        <p><strong>Q:</strong> ${card.question}</p>
                        <p><strong>A:</strong> ${card.answer}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="card mb-4">
            <div class="card-header">
                <h3>Quizzes</h3>
            </div>
            <div class="card-body">
                ${data.quizzes.map(quiz => `
                    <div class="quiz-card">
                        <p><strong>${quiz.question}</strong></p>
                        ${quiz.options.map((option, index) => `
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="quiz-${quiz.question}" id="option-${index}">
                                <label class="form-check-label ${index === quiz.correctAnswer ? 'correct-answer' : ''}" for="option-${index}">
                                    ${option}
                                </label>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="error-message">
            ${message}
        </div>
    `;
}

function showLoading() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="loading">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Processing your text...</p>
        </div>
    `;
    document.querySelector('.loading').style.display = 'block';
}

function hideLoading() {
    const loadingDiv = document.querySelector('.loading');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
} 