// referencing the `top scores` table element by ID to use for DOM manipulation
var scoreRecord = document.querySelector("#score-record");

// retrieves saved user scores, parses the JSON data to be used in the app, sets conditions for dynamically generating new HTML content for displaying the list of user top scores, sorts/compares returned list of scores to display them in descending order
var scoreLoader = function () {
    topScores = localStorage.getItem("scores");

    if (!topScores) {
        var emptyScores = document.createElement("div");
        emptyScores.style.textAlign = "center";
        emptyScores.textContent = "The scoreboard is clean. Play to add your score!"
        document.querySelector("#scoreboard").appendChild(emptyScores);

        return [];
    }

    try {
        topScores = JSON.parse(topScores).sort((a, b) => parseInt(b.score) - parseInt(a.score));
        return topScores;
    } catch (error) {
        console.error("Failed to parse top scores:", error);
        return [];
    }
};

// sets the condition that if the list of top scores is greater than 0, loop through the list and dynamically generate each on the `top scores` leaderboard screen
var displayScores = function () {
    if (topScores.length > 0) {
        for (var i = 0; i < topScores.length; i++) {
            var playerRow = document.createElement("tr");
            scoreRecord.appendChild(playerRow);

            var newName = document.createElement("td");
            newName.className = "name-data";
            newName.textContent = topScores[i].name;
            playerRow.appendChild(newName);

            var newScore = document.createElement("td");
            newScore.className = "score-data";
            newScore.style.textAlign = "right";
            newScore.textContent = topScores[i].score;
            playerRow.appendChild(newScore);
        }
    }
};

// assigns the topScores array value to the scoreLoader function to receive and store each score entered by the user
var topScores = scoreLoader();

// fires first, used to dynamically generate each score from the 'top scores` array on the score leaderboard
displayScores();

