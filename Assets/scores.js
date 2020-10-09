// Declare variables
var olEl = document.getElementById("highscores");

// Create a function to show the high scores
function showHighScores() {

// Get the highscores and initials from local storage
displayScore = localStorage.getItem("highscores");
displayInitials = localStorage.getItem("initials");

// Add a list item to the ordered list to display the high score
var liTag = document.createElement("li");
liTag.setAttribute("class", "list-items");
liTag.textContent = displayInitials + " - " + displayScore;

// Append the list item to the ordered list
var olEl =document.getElementById("highscores");
olEl.appendChild(liTag);
    }

// A function to clear the scores when the "Clear Scores" button is pushed
function clearScores() {
    window.localStorage.removeItem("highscores");
    window.localStorage.removeItem("initials");
    window.location.reload();
}

showHighScores();