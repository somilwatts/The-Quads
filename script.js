let currentQuiz = '';
let playerName = '';
let currentQuestionIndex = 0;
let score = 0;
let currentLevel = 1;
let quizQuestions = [];
let questionCount = 3;

// Define the questions for each subject and level
const englishQuestions = {
    level1: [
        { question: "What is the past tense of 'go'?", options: ["Went", "Go", "Goes", "Going"], answer: "Went" },
        { question: "Which word is a noun?", options: ["Quickly", "Jump", "Dog", "Happily"], answer: "Dog" },
        { question: "What is the plural form of 'mouse'?", options: ["Mouses", "Mice", "Mices", "Mouse"], answer: "Mice" }
    ],
    level2: [
        { question: "Choose the correct sentence:", options: ["He go to school.", "He went to school.", "He gone to school.", "He going to school."], answer: "He went to school." },
        { question: "What is the synonym of 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], answer: "Joyful" },
        { question: "What is the opposite of 'difficult'?", options: ["Easy", "Hard", "Complicated", "Challenging"], answer: "Easy" }
    ]
};

const mathQuestions = {
    level1: [
        { question: "5 + 7 =", options: [10, 12, 14, 16], answer: 12 },
        { question: "8 - 3 =", options: [3, 5, 6, 7], answer: 5 },
        { question: "3 x 4 =", options: [11, 10, 12, 16], answer: 12 }
    ],
    level2: [
        { question: "What is 6 x 9?", options: [54, 45, 36, 63], answer: 54 },
        { question: "What is 15 ÷ 3?", options: [3, 5, 7, 9], answer: 5 },
        { question: "What is 25 - 8?", options: [17, 18, 19, 20], answer: 17 }
    ]
};

const scienceQuestions = {
    level1: [
        { question: "What is H2O?", options: ["Water", "Oxygen", "Hydrogen"], answer: "Water" },
        { question: "What planet is closest to the Sun?", options: ["Earth", "Venus", "Mercury", "Mars"], answer: "Mercury" },
        { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], answer: "Au" }
    ],
    level2: [
        { question: "What gas do plants use for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
        { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"], answer: "Mitochondria" },
        { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: "Diamond" }
    ]
};

// Start quiz based on selected subject
function selectQuiz(subject) {
    currentQuiz = subject;
    currentQuestionIndex = 0;
    score = 0;

    // Load questions for the selected quiz
    switch (subject) {
        case 'English':
            quizQuestions = englishQuestions.level1; // Change to level2 if needed
            break;
        case 'Math':
            quizQuestions = mathQuestions.level1; // Change to level2 if needed
            break;
        case 'Science':
            quizQuestions = scienceQuestions.level1; // Change to level2 if needed
            break;
        default:
            quizQuestions = [];
    }
    
    showQuestion();
    document.getElementById('quizSelectionPage').style.display = 'none';
    document.getElementById('quizPage').style.display = 'block';
}

// Show the current question
function showQuestion() {
    if (currentQuestionIndex < questionCount) {
        const question = quizQuestions[currentQuestionIndex];
        let optionsHTML = question.options.map(option => `<button onclick="checkAnswer('${option}')">${option}</button>`).join('');
        
        document.getElementById('quizTitle').innerText = `${currentQuiz} Quiz`;
        document.getElementById('quizContent').innerHTML = `
            <p>${question.question}</p>
            ${optionsHTML}
        `;
    } else {
        showScore();
    }
}

// Check the answer and update score
function checkAnswer(selectedOption) {
    const correctAnswer = quizQuestions[currentQuestionIndex].answer;
    
    // For Math quiz, compare number value
    if (typeof correctAnswer === 'number') {
        if (Number(selectedOption) === correctAnswer) {
            score++;
        }
    } else {
        // For English/Science, compare as string
        if (selectedOption === correctAnswer) {
            score++;
        }
    }

    currentQuestionIndex++;
    showQuestion();
}

// Show the final score
function showScore() {
    document.getElementById('quizContent').innerHTML = `
        <h2>Your Score: ${score} / ${questionCount}</h2>
        <button onclick="showLeaderboard()">Show Leaderboard</button>
        <button onclick="startNextQuiz()">Take Another Quiz</button>
    `;
}

// Show the leaderboard
function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    let leaderboardHTML = leaderboard.map(entry => `<tr><td>${entry.name}</td><td>${entry.score}</td></tr>`).join('');
    document.getElementById('quizContent').innerHTML = `
        <h2>Leaderboard</h2>
        <table>
            <thead>
                <tr><th>Name</th><th>Score</th></tr>
            </thead>
            <tbody>
                ${leaderboardHTML}
            </tbody>
        </table>
        <button onclick="goToHome()">Go to Home Page</button>
    `;
}

// Start next quiz or return to quiz selection
function startNextQuiz() {
    document.getElementById('quizPage').style.display = 'none';
    document.getElementById('quizSelectionPage').style.display = 'block';
}

// Go back to the quiz selection page
function goBack() {
    document.getElementById('quizPage').style.display = 'none';
    document.getElementById('quizSelectionPage').style.display = 'block';
}

// Go to the home page
function goToHome() {
    document.getElementById('aboutPage').style.display = 'none';
    document.getElementById('homePage').style.display = 'block';
}

// Move to the quiz selection page after entering details
function moveToQuizSelection() {
    playerName = document.getElementById('playerNameHome').value;
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('quizSelectionPage').style.display = 'block';
}
