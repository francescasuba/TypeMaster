var temp = document.querySelector(".time");
var words = document.querySelector(".words");
var levelOneStartBtn = document.getElementById("level-one-start-btn");
var scoreDiv = document.querySelector(".score");
var timerDiv = document.querySelector(".time");
var points = 0;
var seconds = 60;
var levelOneList = [];
const wordInputElement = document.getElementById("wordInput")

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;
const highScoresList = document.getElementById('highScoresList');

function saveHighScore() {
    const score = {
        score: points,
        name: prompt('You got a highscore! Enter name:')
    };
    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score)
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayHighScores(){
    highScoresList.innerHTML = highScores
        .map( score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
        })
        .join("");
}
/* const NO_OF_HIGH_SCORES = 5;
const HIGH_SCORES = 'highScores';
const highScoreString = localStorage.getItem(HIGH_SCORES);
const highScores = JSON.parse(highScoreString) ?? [];
const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
 */
/* function saveHighScore(points, highScores) {
    const name = prompt('You got a highscore! Enter name:');
    const newScore = { points, name };
    
    // 1. Add to list
    highScores.push(newScore);
  
    // 2. Sort the list
    highScores.sort((a, b) => b.points - a.points);
    
    // 3. Select new list
    highScores.splice(NO_OF_HIGH_SCORES);
    
    // 4. Save to local storage
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
}; */

/* function showHighScores() {
    const highScoreList = document.getElementById(HIGH_SCORES);
    // const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    var displayList = document.querySelector('HIGH_SCORES');
    displayList.innerHTML = "";
    JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [].forEach(points => {
        displayList.innerHTML =
        `<ul>
            <li>${points.points} - ${points.name}</li>
        </ul>`
        
    });
    console.log(localStorage.getItem(points));
    
    highScoreList.innerHTML = highScores
      .map((points) => `<li>${points.points} - ${points.name}`)
      .join('');
} */

/* function checkHighScore(points) {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.points ?? 0;
    
    if (points > lowestScore) {
      saveHighScore(points, highScores);
      showHighScores();
    }
} */

const apiURL = "https://random-word-api.herokuapp.com/word?number=1000&swear=1";

/** @returns {Promise<string[]>} */
async function fetchWords() {
    const res = await fetch(apiURL)
    return await res.json();
}

async function levelOneWordSpitter() {
    const wordList = await fetchWords();
    words.innerHTML = "";
    wordList.forEach(function(word){
        if (word.length <= 5)
        {
            levelOneList.push(word);
        }
    });
    var random = Math.floor(Math.random() * levelOneList.length) + 1;
    var pickedWord = levelOneList[random];
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
        levelOneStartBtn.disabled = true;
        seconds--;
        temp.innerHTML = seconds;
        if (seconds === 0) {
            alert("Game over! Your score is " + points);
            // checkHighScore(points);
            scoreDiv.innerHTML = "0";
            words.innerHTML = "";
            levelOneStartBtn.disabled = false;
            clearInterval(timer);
            seconds = 60;
            timerDiv.innerHTML = "60";
            levelOneStartBtn.disabled = false;
            wordInputElement.value = null;
        }
    }, 1000);
}

levelOneStartBtn.addEventListener("click", function (event) {
    event.preventDefault();
    displayHighScores();
    timer();
    fetchWords().then(words => console.log(words))
    levelOneWordSpitter();
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
        levelOneWordSpitter();
  }
})