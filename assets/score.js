var topScores = [];
var scoreRecord = document.querySelector("#score-record");

var scoreLoader = function() {
    topScores = localStorage.getItem("scores");

    if (!topScores) {
        var emptyScores = document.createElement("div");
        emptyScores.style.textAlign = "center";
        emptyScores.textContent = "The scoreboard is clean. Play to add your score!"
        document.querySelector("#scoreboard").appendChild(emptyScores);

        return [];
    }

    topScores = JSON.parse(topScores).sort((a, b) => parseInt(b.score) - parseInt(a.score));
    return topScores;
};

var displayScores = function() {
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

scoreLoader();
displayScores();

