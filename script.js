//tracking scores
let currentQuestionIndex = 0; 
let score = 0; 

//start button starts when clicked
const startButton = document.getElementById("start-btn");
startButton.addEventListener("click", startQuiz);

//start quiz, hide start button
function startQuiz() {
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    displayQuestion()
    startTimer()
}

//display questions
function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Clear previous options

    // Create buttons for each option and add event listeners
    currentQuestion.options.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("option");
        optionButton.addEventListener("click", function () {
            checkAnswer(option);
        });
        optionsContainer.appendChild(optionButton);
    });
}

function checkAnswer(userAnswer) {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    // Check if the user's answer is correct
    if (userAnswer === currentQuestion.answer) {
        score++;
        displayFeedback("Correct!");
    } else {
        // If the answer is incorrect, subtract 10 seconds from the timer
        timerValue -= 10;
        displayFeedback("Incorrect!");
    }

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

//display correct/incorrect
function displayFeedback(message) {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = message;
}

// Display the high scores
function displayHighScores() {
    const savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];

    // Sort scores in descending order based on the score value
    savedScores.sort((a, b) => b.score - a.score);

    const highScoresList = document.createElement("ul");
    highScoresList.innerHTML = "<h2>High Scores:</h2>";

    savedScores.forEach((savedScore) => {
        const scoreItem = document.createElement("li");
        scoreItem.textContent = `${savedScore.initials}: ${savedScore.score}`;
        highScoresList.appendChild(scoreItem);
    });

    document.body.appendChild(highScoresList);
}

//ending the quiz
function endQuiz() {
    clearInterval(timerInterval); //stop timer, hide quiz area
    document.getElementById("quiz").style.display = "none";

    // Show the end message and final score
    const endMessageElement = document.getElementById("end-message");
    endMessageElement.style.display = "block";
    const finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = score;

   
    // Save initials and score to local storage
    const initialsInput = document.getElementById("initials");
    const saveScoreButton = document.getElementById("save-score-btn");
    saveScoreButton.addEventListener("click", function () {
        const initials = initialsInput.value.trim().toUpperCase();
        if (initials.length > 0) {
            const savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
            savedScores.push({ initials, score });
            localStorage.setItem("savedScores", JSON.stringify(savedScores));
            alert("Score saved successfully!");

            // Display high scores after saving
            displayHighScores();
        } else {
            alert("Please enter your initials before saving the score.");
        }
    });
}

// timer
let timerValue = 60;
let timerInterval;

function startTimer() {
    document.getElementById("timer").textContent = timerValue;
    // countdown
    timerInterval = setInterval(function () {
        timerValue--;
        // Prevent negative timer display
        if (timerValue >= 0) {
            document.getElementById("timer").textContent = timerValue;
        }

        // check if timer ran out
        if (timerValue <= 0) {
            endQuiz();
        }
    }, 1000);
}

//quiz questions array
let quizQuestions = [ 
{
    question: "what does 'DOM' stand for?",
    options: ["Document Object Model", "Data Object Model", "Data Object Manual", "Document Oriented Model"],
    answer: "Document Object Model"
},
{
    question: "Javascript is what type of language?",
    options: ["Object-Based", "Procedural", "Object-Oriented", "None of these"],
    answer: "Object-Oriented"
},
{
    question: "Which of the following methods is used to access HTML elements using Javascript?",
    options: ["getElementById()", "getElementsByClassName()", "Both of these", "None of these"],
    answer: "Both of these"
},
{
    question: "The process in which an object or data structure is translated into a format suitable for transferral over a network, or storage is called?",
    options: ["Object Serialization", "Object Encapsulation", "Object Inheritance", "None of these"],
    answer: "Object Serialization"
},
{
    question: "How do you write a comment in javascript?",
    options: ["/* */", "#", "$ $", "//"],
    answer: "//"
}
];