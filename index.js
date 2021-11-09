var temp = document.querySelector(".time");
var words = document.getElementById(".words");
var levelOneBtn = document.getElementById("level-one-btn");
var scoreDiv = document.querySelector(".score");
var timerDiv = document.querySelector(".time");
var points = 0;
var spans;
var typed;
var seconds = 60;

const apiURL = "https://random-word-api.herokuapp.com/word?number=200&swear=1";

/** @returns {Promise<string[]>} */
async function fetchWords() {
    const res = await fetch(apiURL)
    return await res.json()
}

function timer() {
    points = 0;
    var timer = setInterval(function () {
        button.disabled = true;
        seconds--;
        temp.innerHTML = seconds;
        if (seconds === 0) {
            alert("Game over! Your score is " + points);
            scoreDiv.innerHTML = "0";
            words.innerHTML = "";
            button.disabled = false;
            clearInterval(timer);
            seconds = 60;
            timerDiv.innerHTML = "60";
            button.disabled = false;
        }
    }, 1000);
}

function wordSpitter() {
    words.innerHTML = "";
    var random = Math.floor(Math.random() * (1943 - 0 + 1)) + 0;
    var wordArray = list[random].split("");
    for (var i = 0; i < wordArray.length; i++) { //building the words with spans around the letters
        var span = document.createElement("span");
        span.classList.add("span");
        span.innerHTML = wordArray[i];
        words.appendChild(span);
    }
    spans = document.querySelectorAll(".span");
}

levelOneBtn.addEventListener("click", function (event) {
    event.preventDefault();
    fetchWords().then(words => console.log(words))
});

