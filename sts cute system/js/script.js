// Page navigation functionality
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation active states
    const navButtons = document.querySelectorAll('.nav-links button');
    navButtons.forEach(button => button.classList.remove('active'));

    const activeNavButton = document.getElementById(`nav-${pageId}`);
    if (activeNavButton) {
        activeNavButton.classList.add('active');
    }

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// Mobile menu toggle functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    mobileMenu.classList.toggle('active');

    // Toggle menu icon
    if (mobileMenu.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Quiz functionality
const quizData = [
    {
        question: "What year did the Department of Health issue comprehensive telemedicine guidelines in the Philippines?",
        options: ["2018", "2020", "2022", "2024"],
        correct: 1
    },
    {
        question: "Which government agency includes teleconsultation in its benefit packages?",
        options: ["DOH", "PhilHealth", "DPC", "FDA"],
        correct: 1
    },
    {
        question: "What is one major challenge of telemedicine in rural Philippine areas?",
        options: ["Too many doctors", "Limited internet connectivity", "High cost of smartphones", "Lack of patients"],
        correct: 1
    },
    {
        question: "What law establishes strict requirements for handling personal health information in the Philippines?",
        options: ["Universal Health Care Act", "Data Privacy Act of 2012", "Telemedicine Act", "Digital Health Law"],
        correct: 1
    },
    {
        question: "Which telemedicine service allows patients to track vital signs remotely?",
        options: ["Teleconsultation", "E-Prescription", "Remote Monitoring", "Appointment Booking"],
        correct: 2
    },
    {
        question: "What is the main goal of integrating telemedicine with traditional care?",
        options: ["Replace all hospitals", "Create hybrid models", "Eliminate doctors", "Increase costs"],
        correct: 1
    }
];

let currentQuizAnswers = [];

function loadQuiz() {
    const quizContainer = document.getElementById('quiz-questions');
    quizContainer.innerHTML = '';

    quizData.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `${index + 1}. ${question.question}`;
        questionDiv.appendChild(questionTitle);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quiz-options';

        question.options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';
            optionDiv.onclick = () => selectQuizOption(index, optionIndex);

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question-${index}`;
            radio.value = optionIndex;

            const label = document.createElement('span');
            label.textContent = option;

            optionDiv.appendChild(radio);
            optionDiv.appendChild(label);
            optionsDiv.appendChild(optionDiv);
        });

        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    });
}

function selectQuizOption(questionIndex, optionIndex) {
    currentQuizAnswers[questionIndex] = optionIndex;

    // Update visual selection
    const questionDiv = document.querySelectorAll('.quiz-question')[questionIndex];
    const options = questionDiv.querySelectorAll('.quiz-option');

    options.forEach((option, index) => {
        option.classList.remove('selected');
        if (index === optionIndex) {
            option.classList.add('selected');
        }
    });
}

function submitQuiz() {
    const submitBtn = document.getElementById('submit-btn');
    const resultDiv = document.getElementById('quiz-result');

    // Check if all questions are answered
    if (currentQuizAnswers.length < quizData.length) {
        alert('Please answer all questions before submitting.');
        return;
    }

    // Calculate score
    let correct = 0;
    quizData.forEach((question, index) => {
        if (currentQuizAnswers[index] === question.correct) {
            correct++;
        }
    });

    const percentage = Math.round((correct / quizData.length) * 100);

    // Show results
    resultDiv.innerHTML = `
        <div class="quiz-result">
            <h3>Quiz Complete!</h3>
            <p>You got ${correct} out of ${quizData.length} questions correct (${percentage}%)</p>
            ${percentage >= 80 ? '<p>Excellent! You have a good understanding of telemedicine in the Philippines.</p>' :
              percentage >= 60 ? '<p>Good job! You know quite a bit about telemedicine.</p>' :
              '<p>Keep learning! Telemedicine is an important topic in Philippine healthcare.</p>'}
            <button class="btn-retake" onclick="retakeQuiz()">Take Quiz Again</button>
        </div>
    `;

    resultDiv.style.display = 'block';
    submitBtn.style.display = 'none';

    // Show correct/incorrect answers
    const questionDivs = document.querySelectorAll('.quiz-question');
    questionDivs.forEach((div, index) => {
        const options = div.querySelectorAll('.quiz-option');
        options.forEach((option, optionIndex) => {
            option.onclick = null; // Disable clicking
            if (optionIndex === quizData[index].correct) {
                option.classList.add('correct');
            } else if (optionIndex === currentQuizAnswers[index]) {
                option.classList.add('incorrect');
            }
        });
    });
}

function retakeQuiz() {
    currentQuizAnswers = [];
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'block';
    loadQuiz();
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadQuiz();
});
