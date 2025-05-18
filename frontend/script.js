// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Initialize on document load
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => observer.observe(element));

    // Show initial section
    const initialSection = window.location.hash.substring(1) || 'home';
    showPage(initialSection);
});

// Navigation function
function showPage(pageId, event) {
    if (event) {
        event.preventDefault();
    }
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update active nav link
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });

    // Update dashboard if needed
    if (pageId === 'dashboard') {
        updateDashboard();
    }
}

// Handle all navigation clicks
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const pageId = link.getAttribute('href').substring(1);
        showPage(pageId, e);
    }
});

// Smooth scroll handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.style.display = 'none';
            });
            
            // Show target page
            const targetPage = targetElement.closest('.page');
            if (targetPage) {
                targetPage.style.display = 'block';
            }
            
            // Smooth scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function submitQuiz() {
    const questions = currentDocument.quizQuestions;
    if (!questions || questions.length === 0) {
        return;
    }
    
    let score = 0;
    const feedback = [];
    
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        const correctAnswer = q.correctAnswer;
        
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            if (userAnswer === correctAnswer) {
                score++;
                feedback.push(`
                    <div class="alert alert-success">
                        <p><strong>Question ${index + 1}:</strong> Correct! ✓</p>
                    </div>
                `);
            } else {
                feedback.push(`
                    <div class="alert alert-danger">
                        <p><strong>Question ${index + 1}:</strong> Incorrect ✗</p>
                        <p>The correct answer was: ${q.options[correctAnswer]}</p>
                    </div>
                `);
            }
        } else {
            feedback.push(`
                <div class="alert alert-warning">
                    <p><strong>Question ${index + 1}:</strong> Not answered</p>
                    <p>The correct answer was: ${q.options[correctAnswer]}</p>
                </div>
            `);
        }
    });
    
    const percentage = Math.round((score / questions.length) * 100);
    document.getElementById('quiz-score').textContent = percentage;
    document.getElementById('quiz-feedback').innerHTML = feedback.join('');
    document.getElementById('quiz-results').style.display = 'block';
    
    // Update user data
    userData.quizzesTaken++;
    userData.studyTime += 10;
    addActivity("Completed a quiz", "📝");
}

function updateQuizPage() {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.querySelector('.submit-quiz');
    
    console.log('Updating quiz page...'); // Debug log
    console.log('Quiz container:', quizContainer); // Debug log
    console.log('Current document:', currentDocument); // Debug log
    
    if (!quizContainer) {
        console.error('Quiz container not found');
        return;
    }

    if (!currentDocument || !currentDocument.quizQuestions || currentDocument.quizQuestions.length === 0) {
        console.log('No quiz questions available'); // Debug log
        quizContainer.innerHTML = `
            <div class="quiz-message">
                <p>No quiz questions available yet. Please upload and process a document first.</p>
            </div>`;
        if (submitButton) submitButton.style.display = 'none';
        return;
    }

    console.log('Generating quiz HTML for', currentDocument.quizQuestions.length, 'questions'); // Debug log

    let html = '<div class="quiz-questions">';
    currentDocument.quizQuestions.forEach((q, index) => {
        if (!q.question || !q.options || !Array.isArray(q.options)) {
            console.error('Invalid question format:', q);
            return;
        }
        
        html += `
            <div class="quiz-question" data-aos="fade-up" data-aos-delay="${index * 100}">
                <h3>Question ${index + 1}</h3>
                <p>${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((option, i) => `
                        <div class="quiz-option">
                            <label>
                                <input type="radio" name="q${index}" value="${i}">
                                ${option}
                            </label>
                        </div>
                    `).join('')}
                </div>
                <div class="feedback" style="display: none;"></div>
            </div>
        `;
    });
    html += '</div>';
    
    console.log('Setting quiz HTML'); // Debug log
    quizContainer.innerHTML = html;
    
    if (submitButton) {
        submitButton.style.display = 'block';
        submitButton.disabled = false;
    }
    
    // Hide quiz results
    const quizResults = document.getElementById('quiz-results');
    if (quizResults) {
        quizResults.style.display = 'none';
    }
}

async function processFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    const loadingDiv = document.getElementById('loading');
    const processBtn = document.getElementById('process-btn');
    const errorDiv = document.getElementById('error-message');
    
    if (!file) {
        alert('Please select a file first.');
        return;
    }
    
    try {
        // Show loading state
        loadingDiv.style.display = 'block';
        processBtn.disabled = true;
        errorDiv.style.display = 'none';
        
        const reader = new FileReader();
        reader.onload = async function(e) {
            const base64Content = e.target.result.split(',')[1];
            
            try {
                const response = await fetch('http://127.0.0.1:5001/process', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        file: {
                            content: base64Content,
                            type: file.name.split('.').pop().toLowerCase(),
                            name: file.name
                        }
                    })
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `Server error: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.error) {
                    throw new Error(data.error);
                }
                
                // Update the current document with processed data
                currentDocument = {
                    summary: data.summary || '',
                    keywords: data.keywords || [],
                    flashcards: data.flashcards || [],
                    quizQuestions: data.quizQuestions || []
                };
            
                // Update UI
                updateSummaryPage();
                updateFlashcardsPage();
                updateQuizPage();
                
                // Update user data
                userData.documentsProcessed++;
                userData.studyTime += 5;
                addActivity(`Processed document: ${file.name}`, '🔍');
                
                // Show summary page
                showPage('summary');
                
            } catch (error) {
                console.error("Processing error:", error);
                errorDiv.textContent = error.message || 'An error occurred while processing the file.';
                errorDiv.style.display = 'block';
            }
        };
        
        reader.readAsDataURL(file);
        
    } catch (error) {
        console.error("Processing error:", error);
        errorDiv.textContent = error.message || 'An error occurred while processing the file.';
        errorDiv.style.display = 'block';
    } finally {
        loadingDiv.style.display = 'none';
        processBtn.disabled = false;
    }
}

function updateFlashcardsPage(data) {
    const flashcardsContainer = document.getElementById('flashcards-container');
    if (!flashcardsContainer) return;

    if (!data.flashcards || data.flashcards.length === 0) {
        flashcardsContainer.innerHTML = `
            <div class="flashcard">
                <p class="question">No flashcards available yet. Please upload and process a document first.</p>
                <div class="answer" style="display: none;">Sample answer</div>
            </div>`;
        return;
    }

    const flashcardsHTML = data.flashcards.map(card => `
        <div class="flashcard" onclick="toggleFlashcard(this)">
            <div class="question">${card.question}</div>
            <div class="answer" style="display: none;">${card.answer}</div>
        </div>
    `).join('');

    flashcardsContainer.innerHTML = flashcardsHTML;
}

function toggleFlashcard(element) {
    const answer = element.querySelector('.answer');
    if (answer) {
        const isHidden = answer.style.display === 'none';
        answer.style.display = isHidden ? 'block' : 'none';
        
        // Add animation class
        if (isHidden) {
            answer.classList.add('fade-in');
        } else {
            answer.classList.remove('fade-in');
        }
    }
}

// Show home page initially
showPage('home'); 