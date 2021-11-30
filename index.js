const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;
const highScoresListMain = document.getElementById('highScoresListMain');

function displayHighScores(){
    highScoresListMain.innerHTML = highScores
        .map( score => {
        return `<li class="high-score">${score.name} - ${score.score} (${score.level})</li>`;
        })
        .join("");
}

window.onload = displayHighScores();