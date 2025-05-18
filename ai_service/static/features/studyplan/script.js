// StudyPlan Feature Module
const StudyPlanFeature = {
    init() {
        // Initialize event listeners
        this.initializeEventListeners();
    },

    initializeEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'studyPlanBtn' || e.target.closest('#studyPlanBtn')) {
                this.showModal();
            }
        });
    },

    showModal() {
        const modal = document.createElement('div');
        modal.className = 'study-plan-modal';
        modal.innerHTML = `
            <div class="study-plan-content">
                <div class="study-plan-header">
                    <h2><i class="fas fa-calendar-alt me-2"></i>Study Plan Generator</h2>
                    <button class="close-btn">&times;</button>
                </div>
                
                <div class="input-section">
                    <div class="input-group">
                        <label><i class="fas fa-calendar me-2"></i>Exam Date:</label>
                        <input type="date" id="examDate" min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    
                    <div class="input-group">
                        <label><i class="fas fa-clock me-2"></i>Daily Study Hours:</label>
                        <input type="number" id="dailyHours" min="1" max="12" value="4">
                    </div>
                </div>
                
                <div class="input-group">
                    <label><i class="fas fa-book me-2"></i>Subjects (comma-separated):</label>
                    <textarea id="subjects" rows="3" placeholder="Example: Mathematics, Physics, Chemistry"></textarea>
                </div>
                
                <button id="generatePlan" class="generate-btn">
                    <i class="fas fa-magic me-2"></i>Generate Study Plan
                </button>
                
                <div id="planOutput" class="plan-output"></div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Close button handler
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => modal.remove());

        // Generate plan button handler
        const generateBtn = modal.querySelector('#generatePlan');
        generateBtn.addEventListener('click', () => this.generatePlan());
    },

    generatePlan() {
        const examDate = document.querySelector('#examDate').value;
        const subjects = document.querySelector('#subjects').value
            .split(',')
            .map(s => s.trim())
            .filter(s => s);
        const dailyHours = parseInt(document.querySelector('#dailyHours').value);

        // Validation
        if (!examDate) {
            alert('Please select an exam date');
            return;
        }
        if (subjects.length === 0) {
            alert('Please enter at least one subject');
            return;
        }
        if (isNaN(dailyHours) || dailyHours < 1) {
            alert('Please enter valid study hours (minimum 1)');
            return;
        }

        // Calculate days remaining
        const today = new Date();
        const examDay = new Date(examDate);
        const daysRemaining = Math.ceil((examDay - today) / (1000 * 60 * 60 * 24));
        
        if (daysRemaining < 1) {
            alert('Please select a future date');
            return;
        }

        // Generate plan
        const hoursPerSubject = 2; // Fixed 2 hours per subject session
        const subjectsPerDay = Math.ceil(dailyHours / hoursPerSubject);
        let plan = [];
        
        // Generate 7-day plan or up to exam date if sooner
        const planDays = Math.min(daysRemaining, 7);
        
        for (let day = 0; day < planDays; day++) {
            const date = new Date(today);
            date.setDate(date.getDate() + day);
            
            const dayPlan = {
                date: date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                }),
                subjects: []
            };
            
            // Distribute subjects evenly
            for (let i = 0; i < subjectsPerDay; i++) {
                const subjectIndex = (day + i) % subjects.length;
                const startHour = 9 + (i * hoursPerSubject); // Start at 9 AM
                
                dayPlan.subjects.push({
                    subject: subjects[subjectIndex],
                    time: `${startHour}:00 - ${startHour + hoursPerSubject}:00`,
                    hours: hoursPerSubject
                });
            }
            
            plan.push(dayPlan);
        }

        this.displayPlan(plan);
    },

    displayPlan(plan) {
        const outputDiv = document.querySelector('#planOutput');
        let html = '<div class="plan-table">';
        
        plan.forEach(dayPlan => {
            html += `
                <div class="plan-day">
                    <h3>
                        <i class="fas fa-calendar-day"></i>
                        ${dayPlan.date}
                    </h3>
                    <ul>
                        ${dayPlan.subjects.map(subject => `
                            <li>
                                <i class="fas fa-book-open"></i>
                                <div>
                                    <strong>${subject.subject}</strong>
                                    <div class="text-muted small">${subject.time}</div>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        });
        
        html += '</div>';
        outputDiv.innerHTML = html;
    }
};

// Initialize the feature when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    StudyPlanFeature.init();
}); 