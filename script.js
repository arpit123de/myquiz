const questions = [
    { level: 1, question: "Which country is known as the Land of the Rising Sun?", answers: [ { text: "Thailand", correct: false}, { text: "Japan", correct: true}, { text: "India", correct: false}, { text: "China", correct: false} ]},
    { level: 1, question: "What is the smallest prime number?", answers: [ { text: "1", correct: false}, { text: "3", correct: false}, { text: "2", correct: true}, { text: "0", correct: false} ]},
    { level: 1, question: "How many legs does a spider have?", answers: [ { text: "8", correct: true}, { text: "6", correct: false}, { text: "10", correct: false}, { text: "4", correct: false} ]},

    { level: 2, question: "In which year did World War II end?", answers: [ { text: "1943", correct: false}, { text: "1944", correct: false}, { text: "1945", correct: true}, { text: "1946", correct: false} ]},
    { level: 2, question: "Which country has the largest population?", answers: [ { text: "India", correct: false}, { text: "China", correct: true}, { text: "Pakistan", correct: false}, { text: "USA", correct: false} ]},
    { level: 2, question: "In which year did India gain independence?", answers: [ { text: "1949", correct: false}, { text: "1942", correct: false}, { text: "1947", correct: true}, { text: "1945", correct: false} ]},

    { level: 3, question: "Who won the ICC Men’s Cricket World Cup 2024?", answers: [ { text: "India", correct: true}, { text: "Australia", correct: false}, { text: "Pakistan", correct: false}, { text: "New Zealand", correct: false} ]},
    { level: 3, question: "Who is the current CEO of OpenAI (2025)?", answers: [ { text: "Jeff Bezos", correct: false}, { text: "Liam Thomson", correct: false}, { text: "Sam Altman", correct: true}, { text: "Ethan Jenkins", correct: false} ]},
    { level: 3, question: "Which country hosted the COP29 Climate Summit?", answers: [ { text: "UAE", correct: true}, { text: "Abu Dhabi", correct: false}, { text: "Australia", correct: false}, { text: "India", correct: false} ]},

    { level: 4, question: "Which country hosted the G20 Summit in 2024?", answers: [ { text: "Brasil", correct: true}, { text: "Australia", correct: false}, { text: "India", correct: false}, { text: "New Zealand", correct: false} ]},
    { level: 4, question: "Which tech company recently launched the AI model GPT-5 (2025)?", answers: [ { text: "Google", correct: false}, { text: "Meta", correct: false}, { text: "Open AI", correct: true}, { text: "Microsoft", correct: false} ]},
    { level: 4, question: "Which Indian city was declared as the first AI-powered Smart City in 2024?", answers: [ { text: "Bengaluru", correct: true}, { text: "Kochi", correct: false}, { text: "Karnataka", correct: false}, { text: "Chennai", correct: false} ]},

    { level: 5, question: " Who won the Nobel Prize in Economics in 2024?", answers: [ { text: " Claudia Goldin", correct: true}, { text: "Ben Barnanke", correct: false}, { text: "Ester Duflo", correct: false}, { text: "David Card", correct: false} ]},
    { level: 5, question: " Which country recently joined BRICS in its 2024 expansion?", answers: [ { text: "Argentina", correct: false}, { text: "Nygeria", correct: false}, { text: "Egypt", correct: false}, { text: "Saudi Aeabia", correct: true} ]},
    { level: 5, question: " What is the name of the first woman astronaut from India selected for a NASA Moon mission collaboration?", answers: [ { text: "Swati Mohan", correct: true}, { text: "Kalpana Chawla", correct: false}, { text:"Gangandeep Kaur", correct: false}, { text: "Sheetal Mohan", correct: false} ]},

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentLevel = 1;
let currentQuestions = [];
let currentQuestionIndex = 0;
let levelScore = 0;
let totalScore = 0;

function startLevel() {
    currentQuestions = questions.filter(q => q.level === currentLevel);
    currentQuestionIndex = 0;
    levelScore = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = currentQuestions[currentQuestionIndex];
    questionElement.innerHTML = `Level ${currentLevel}: ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButton.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        levelScore++;
        totalScore++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showFinalMessage(message) {
    resetState();
    questionElement.innerHTML = message + `<br>You scored ${totalScore} in total.`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        if (levelScore >= 3) {
            currentLevel++;
            const hasNextLevel = questions.some(q => q.level === currentLevel);
            if (hasNextLevel) {
                alert(`Congrats! You've unlocked Level ${currentLevel}`);
                startLevel();
            } else {
                showFinalMessage("Congratulations🎉 You've completed all levels!");
            }
        } else {
            showFinalMessage("❌ You didn’t score enough to pass this level.");
        }
    }
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Restart") {
        currentLevel = 1;
        totalScore = 0;
        startLevel();
    } else {
        handleNextButton();
    }
});

startLevel();

