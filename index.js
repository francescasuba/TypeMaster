var temp = document.querySelector(".time");
var words = document.querySelector(".words");
var startBtn = document.getElementById("start-btn");
var scoreDiv = document.querySelector(".score");
var timerDiv = document.querySelector(".time");
var points = 0;
var spans;
var typed;
var seconds = 60;
const wordInputElement = document.getElementById("wordInput")

const apiURL = "https://random-word-api.herokuapp.com/word?number=200&swear=1";

/** @returns {Promise<string[]>} */
async function fetchWords() {
    const res = await fetch(apiURL)
    return await res.json();
}

async function wordSpitter() {
    const wordList = await fetchWords();
    words.innerHTML = "";
    var random = Math.floor(Math.random() * 200) + 1;
    var word = wordList[random];
    
    word.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        words.appendChild(characterSpan);
    })
        wordInputElement.value = null;
    /* var array = await fetchWords();
    words.innerHTML = "";
    var random = Math.floor(Math.random() * 200) + 1;
    var wordArray = array[random];
    for (var i = 0; i < wordArray.length; i++) { //building the words with spans around the letters
        var span = document.createElement("span");
        span.classList.add("span");
        span.innerHTML = wordArray[i];
        words.appendChild(span);
    }
    spans = document.querySelectorAll(".span"); */
}

function timer() {
    points = 0;
    var timer = setInterval(function () {
        startBtn.disabled = true;
        seconds--;
        temp.innerHTML = seconds;
        if (seconds === 0) {
            alert("Game over! Your score is " + points);
            scoreDiv.innerHTML = "0";
            words.innerHTML = "";
            startBtn.disabled = false;
            clearInterval(timer);
            seconds = 60;
            timerDiv.innerHTML = "60";
            startBtn.disabled = false;
        }
    }, 1000);
}

startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    // document.getElementById("start-btn").className = "nes-btn is-success";
    timer();
    fetchWords().then(words => console.log(words))
    wordSpitter();
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
        } else if (character === characterSpan.innerText) {
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
        wordSpitter();
  }
})

// document.addEventListener("keydown", typing, false);