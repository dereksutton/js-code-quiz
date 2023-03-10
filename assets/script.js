// array of question objects to display to the user when quiz is initiated
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

// setting global variables and selecting elements from the DOM for later manipulation
var bodyColor = document.querySelector("body");
var startBtn = document.querySelector("#start-btn");
var quizSection = document.querySelector(".quiz-section");
var endSection = document.querySelector(".end-section");
var scoreList = document.querySelector(".score-list");
var questionTally = 0;
var myScore = 100;
var topScores = [];

// initiates the quiz
var quizStart = function () {
    document.querySelector("#directions").remove();
    quizSection.classList.remove("hide");

    questionNext(questionTally);
    scoreKeeper();
};

// displays/switches questions and answer sets - uses event listener which is used to the answerChecker function to check user answers
var questionNext = function (index) {
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

// compares the user against the correct answer and sets conditions for each event scenario, then fires the `scoreKeeper` function to track score accordingly.
var answerChecker = function (event) {
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

// keeps track of the score for the duration of the quiz
var scoreKeeper = function () {
    scoreList.textContent = "Your current score is: 100"

    var scoreCalc = setInterval(function () {
        if (myScore > 0 && questionTally < jsQuiz.length) {
            scoreList.textContent = "Your current score is: " + myScore;
            myScore--;
        } else {
            clearInterval(scoreCalc);
            quizEnd();
        }
    }, 1000);
};

// once user reaches end of quiz, section is removed and new HTML elements dynamically generated based on user input. also sets an event listener on the `submit` button to fire the 'scoreSaver' function which saves user input to localStorage 
var quizEnd = function () {
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

    submitName.addEventListener("click", scoreSaver);
};

// this function saves the player's score to localStorage and displays the score leaderboard
var scoreSaver = function (event) {
    event.preventDefault();

    var topScores = [];
    var playerID = document.querySelector("input[name='player']").value;

    if (!playerID) {
        alert("Enter your name!");

    } else {
        var playerScore = {
            name: playerID,
            score: myScore
        }

        topScores.push(playerScore);
        localStorage.setItem("scores", JSON.stringify(topScores));
        document.location.href = "./top-score.html";
    }
};

// retrieves the saved user scores and parses the returned JSON data to be displayed in our application
var scoreLoader = function () {
    topScores = localStorage.getItem("scores");

    if (!topScores) {
        return false;
    } else {
        return JSON.parse(topScores);
    }
};

scoreLoader();

// event listener attached to the `start` button that fires the quizStart function to begin the quiz when clicked.
startBtn.addEventListener("click", quizStart);