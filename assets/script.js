var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question:
            "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question:
            "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question:
            "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    }
];

var contentEl = document.querySelector("#content");
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var player = "";

var questionIndex = 0;
var correctCount = 0;

var time = 60;
var intervalId;

function preQuiz() {
    preQDiv = document.createElement("div");
    preH2 = document.createElement("h2");
    preH2.textContent = "Welcome to the Code Quiz! Please enter your name!";
    preQDiv.appendChild(preH2);

    preInput = document.createElement("input");
    preInput.className = "prequiz";
    preInput.setAttribute ("type", "text", "placeholder = Enter your name");
    preQDiv.appendChild (preInput);

    preButton = document.createElement("button");
    preButton.className = "prebutton"
    preButton.textContent = "Start Quiz!"
    preQDiv.appendChild(preButton);


    preButton.addEventListener("click", renderQuestion);
    preButton.addEventListener("click", remove);
    preButton.addEventListener("click", savePlayer);
    contentEl.append(preQDiv);
};

function remove() {
    preQDiv.remove();
}



function endQuiz() {
    clearInterval(intervalId);
    var body = document.body;
    body.innerHTML = "Game over, " + preInput.value + " scored " + correctCount;
    body.className = "endtext";
    
    saveCount();
}

function updateTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}

function renderQuestion() {

    if (time == 0) {
        updateTime();
        return;
    }

    intervalId = setInterval(updateTime, 1000);


    questionEl.textContent = questions[questionIndex].question;

    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;

    for (var i = 0; i < choicesLenth; i++) {
        var questionListItem = document.createElement("li");
        questionListItem.textContent = choices[i];
        optionListEl.append(questionListItem);
    }
}

function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
        time = 0;
    }
    renderQuestion();
}

function checkAnswer(event) {
    clearInterval(intervalId);
    if (event.target.matches("li")) {
        var answer = event.target.textContent;
        if (answer === questions[questionIndex].answer) {
            questionResultEl.textContent = "Correct";
            correctCount++;
        } else {
            questionResultEl.textContent = "Incorrect";
            time = time - 2;
            timerEl.textContent = time;
        }
    }
    setTimeout(nextQuestion, 2000);
}

function savePlayer() {
    localStorage.setItem("player", JSON.stringify(preInput.value));
}

function saveCount () {
    localStorage.setItem("correctCount", JSON.stringify(correctCount));
}

preQuiz();
//renderQuestion();
optionListEl.addEventListener("click", checkAnswer);