// Variables for highscores, clearing the history, and to go back to start of quiz and selected from HTML
var highScore = document.querySelector("#highScore");
var clearButton = document.querySelector("#clearButton");
var backButton = document.querySelector("#backButton");

// Click to clear scores-adds event listener
clearButton.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

//Creates list of initials from text entered at end of game
if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
// Go back to beginning of game
backButton.addEventListener("click", function () {
    window.location.replace("./index.html");
});