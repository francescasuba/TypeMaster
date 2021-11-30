var temp = document.querySelector(".time");
var words = document.querySelector(".words");
var levelTwoStartBtn = document.getElementById("level-two-start-btn");
var scoreDiv = document.querySelector(".score");
var timerDiv = document.querySelector(".time");
var points = 0;
var seconds = 60;
var levelTwoList = [];
const wordInputElement = document.getElementById("wordInput")

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;
const highScoresListLevelTwo = document.getElementById('highScoresListLevelTwo');

function saveHighScore() {
    const score = {
        score: points,
        name: prompt('You got a highscore! Enter name:').substring(0, 5),
        level: "Level 2"
    };
    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score)
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayHighScores(){
    highScoresListLevelTwo.innerHTML = highScores
        .map( score => {
        return `<li class="high-score">${score.name} - ${score.score} (${score.level})</li>`;
        })
        .join("");
}

const apiURL = "https://random-word-api.herokuapp.com/word?number=1000&swear=1";

/** @returns {Promise<string[]>} */
async function fetchWords() {
    const res = await fetch(apiURL)
    return await res.json();
}

async function levelTwoWordSpitter() {
    const wordList = await fetchWords();
    words.innerHTML = "";
    wordList.forEach(function(word){
        if (word.length >= 5 && word.length <= 10)
        {
            levelTwoList.push(word);
        }
    });
    var random = Math.floor(Math.random() * levelTwoList.length) + 1;
    var pickedWord = levelTwoList[random];
    pickedWord.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        words.appendChild(characterSpan);
    })
        wordInputElement.value = null;
}

function timer() {
    points = 0;
    var timer = setInterval(function () {
        levelTwoStartBtn.disabled = true;
        seconds--;
        temp.innerHTML = seconds;
        if (seconds === 0) {
            alert("Game over! Your score is " + points);
            scoreDiv.innerHTML = "0";
            words.innerHTML = "";
            saveHighScore();
            displayHighScores();
            levelTwoStartBtn.disabled = false;
            clearInterval(timer);
            seconds = 60;
            timerDiv.innerHTML = "60";
            levelTwoStartBtn.disabled = false;
            wordInputElement.value = null;
        }
    }, 1000);
}

window.onload = displayHighScores();

levelTwoStartBtn.addEventListener("click", function (event) {
    event.preventDefault();
    timer();
    fetchWords().then(words => console.log(words))
    levelTwoWordSpitter();
});

wordInputElement.addEventListener('input', () => {
    const arrayWord = words.querySelectorAll('span')
    const arrayValue = wordInputElement.value.split('')

    let correct = true
    arrayWord.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
        correct = false
        } else if (character === characterSpan.innerHTML) {
        characterSpan.classList.add('correct')
        characterSpan.classList.remove('incorrect')
        } else {
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
        correct = false
        }
  })

  if (correct) {
        points++;
        scoreDiv.innerHTML = points;
        levelTwoWordSpitter();
  }
})