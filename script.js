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
    } else {
        // If the answer is incorrect, subtract 10 seconds from the timer
        timerValue -= 10;
    }

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

//ending the quiz
function endQuiz() {
    clearInterval(timerInterval); //stop timer, hide quiz area
    document.getElementById("quiz").style.display = "none";

    // Display the user's final score
    alert(`Quiz Over! Your score: ${score}`);
    // high score memory

    //reshow start quiz button
    document.getElementById("start-btn").style.display = "block";
}


//timer
let timerValue = 60;
let timerInterval;

function startTimer() {
    document.getElementById("timer").textContent = timerValue;
    //countdown
    timerInterval = setInterval(function () {
    timerValue--;
    document.getElementById("timer").textContent = timerValue;

    //check if timer ran out
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