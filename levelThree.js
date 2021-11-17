var temp = document.querySelector(".time");
var words = document.querySelector(".words");
var levelThreeStartBtn = document.getElementById("level-three-start-btn");
var scoreDiv = document.querySelector(".score");
var timerDiv = document.querySelector(".time");
var points = 0;
var seconds = 60;
var levelThreeList = [];
const wordInputElement = document.getElementById("wordInput");

const apiURL = "https://random-word-api.herokuapp.com/word?number=1000&swear=1";

/** @returns {Promise<string[]>} */
async function fetchWords() {
    const res = await fetch(apiURL)
    return await res.json();
}

async function levelThreeWordSpitter() {
    const wordList = await fetchWords();
    words.innerHTML = "";
    wordList.forEach(function(word){
        if (word.length > 10)
        {
            levelThreeList.push(word);
        }
    });
    var random = Math.floor(Math.random() * levelThreeList.length) + 1;
    var pickedWord = levelThreeList[random];
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
        levelThreeStartBtn.disabled = true;
        document.getElementById("wordInput").disabled = false;
        seconds--;
        temp.innerHTML = seconds;
        if (seconds === 0) {
            alert("Game over! Your score is " + points);
            scoreDiv.innerHTML = "0";
            words.innerHTML = "";
            levelThreeStartBtn.disabled = false;
            clearInterval(timer);
            seconds = 60;
            timerDiv.innerHTML = "60";
            levelThreeStartBtn.disabled = false;
            wordInputElement.value = null;
            points = 0;
            document.getElementById("wordInput").disabled = true;
        }
    }, 1000);
}

levelThreeStartBtn.addEventListener("click", function (event) {
    event.preventDefault();
    timer();
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
            levelThreeWordSpitter();
            points++;
            scoreDiv.innerHTML = points;
      }
    })
    fetchWords().then(words => console.log(words))
    levelThreeWordSpitter();
});