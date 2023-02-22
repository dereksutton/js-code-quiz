var jsQuiz = [
    {
        question: 'Which of the following is NOT a data type in JavaScript?',
        a: 'Number',
        b: 'String',
        c: 'Boolean',
        d: 'Float',
        answer: 'd'
    },
    {
        question: 'What does the "===" operator do in JavaScript?',
        a: 'Compares two values for equality without type coercion',
        b: 'Compares two values for equality with type coercion',
        c: 'Assigns a value to a variable',
        d: 'None of the above',
        answer: 'a'
    },
    {
        question: 'What is the purpose of a loop in JavaScript?',
        a: 'To define a function',
        b: 'To repeat a set of statements multiple times',
        c: 'To change the type of a variable',
        d: 'To create an object',
        answer: 'b'
    },
    {
        question: 'Which of the following demonstrates the correct way to comment in JavaScript?',
        a: '<!-- This is a comment -->',
        b: '# This is a comment',
        c: '// This is a comment',
        d: '/* This is a comment*/',
        answer: 'c'
    },
    {
        question: 'Which of the following is the correct way to add an event listener to an HTML element using JavaScript?',
        a: 'element.onclick = function() { /* code here */ };',
        b: 'element.addEventListener("click", function() { /* code here */ });',
        c: 'element.click = function() { /* code here */ };',
        d: 'element.on("click", function() { /* code here */});',
        answer: 'b'
    }
];

var bodyColor = document.querySelector("body");
var startBtn = document.querySelector("#start-btn");
var quizSection = document.querySelector(".quiz-section");
var endSection = document.querySelector(".end-section");
var scoreList = document.querySelector(".score-list");
var questionTally = 0;
var myScore = 100;
var topScores = [];

// initiates the quiz
var quizStart = function() {
    document.querySelector("#directions").remove();
    quizSection.classList.remove("hide");

    questionNext(questionTally);
    scoreKeeper();
};

// switches questions and checks user answers
var questionNext = function(index) {
    var quizHeader = document.querySelector(".quiz-header");
    var question = document.querySelector(".question");
    var aBtn = document.getElementById("a-btn");
    var bBtn = document.getElementById("b-btn");
    var cBtn = document.getElementById("c-btn");
    var dBtn = document.getElementById("d-btn");

    quizHeader.textContent = "Question: " + parseInt(index + 1);
    question.textContent = jsQuiz[index].question;
    aBtn.textContent = jsQuiz[index].a;
    bBtn.textContent = jsQuiz[index].b;
    cBtn.textContent = jsQuiz[index].c;
    dBtn.textContent = jsQuiz[index].d;

    aBtn.addEventListener("click", answerChecker);
    bBtn.addEventListener("click", answerChecker);
    cBtn.addEventListener("click", answerChecker);
    dBtn.addEventListener("click", answerChecker);
};

var answerChecker = function(event) {
    var userAnswer = event.target.value;

    if (userAnswer === jsQuiz[questionTally].answer) {
        questionTally++;
        document.querySelector(".user-msg").classList.remove("hide");
        document.querySelector(".user-msg").textContent = "Correct!";
    } else {
        document.querySelector(".user-msg").classList.remove("hide");
        document.querySelector(".user-msg").textContent = "Wrong!";

        myScore -= 6;
    }

    if (questionTally >= jsQuiz.length) {
        quizEnd();
    } else {
        questionNext(questionTally);
    }

    scoreKeeper();
};

// keeps the score
var scoreKeeper = function() {
    scoreList.textContent = "Your current score is: 100"

    var scoreCalc = setInterval(function() {
        if (myScore > 0 && questionTally < jsQuiz.length) {
            scoreList.textContent = "Your current score is: " + myScore;
            myScore--;
        } else {
            clearInterval(scoreCalc);
            quizEnd();
        }
    }, 1000);
};

var quizEnd = function() {
    quizSection.remove();

    endSection.innerHTML = "<h2>Thanks for playing -- Keep coding!</h2><p>Final score: " + myScore + ". Enter your name to see score rankings.</p>";

    var scoreRanks = document.createElement("form");
    scoreRanks.id = "score-ranks";
    endSection.appendChild(scoreRanks);

    var playerName = document.createElement("input");
    playerName.className = "player-name";
    playerName.setAttribute("type", "text");
    playerName.setAttribute("name", "player");
    playerName.setAttribute("placeholder", "Enter your name");
    scoreRanks.appendChild(playerName);

    var submitName = document.createElement("button");
    submitName.className = "btn";
    submitName.id = "name-sub";
    submitName.textContent = "SUBMIT";
    scoreRanks.appendChild(submitName);

    submitName.addEventListener("click", scoreKeeper);
};

var scoreSaver = function(event) {
    event.preventDefault();

    var playerID = document.querySelector("input[name='player']").value;

    if (playerID) {
        var playerScore = {
            name: playerID,
            score: myScore
        }
    } else {
        alert("Enter your name!");
    }

        topScores.push(playerScore);
        document.querySelector("#score-ranks").reset();
        localStorage.setItem("scores", JSON.stringify(topScores));
        document.location.href = "top-score.html";
};

var scoreLoader = function() {
    topScores = localStorage.getItem("scores");

    if (!topScores) {
        return false;
    } else {
        return JSON.parse(topScores);}
};

scoreLoader();

startBtn.addEventListener("click", quizStart);