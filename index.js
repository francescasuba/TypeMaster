var temp = document.querySelector(".time");
var words = document.querySelector(".words");
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
    return await res.json();
}

async function wordSpitter() {
    var array = await fetchWords();
    words.innerHTML = "";
    var random = Math.floor(Math.random() * 200) + 1;
    var wordArray = array[random];
    for (var i = 0; i < wordArray.length; i++) { //building the words with spans around the letters
        var span = document.createElement("span");
        span.classList.add("span");
        span.innerHTML = wordArray[i];
        words.appendChild(span);
    }
    spans = document.querySelectorAll(".span");
}

function timer() {
    points = 0;
    var timer = setInterval(function () {
        levelOneBtn.disabled = true;
        seconds--;
        temp.innerHTML = seconds;
        if (seconds === 0) {
            alert("Game over! Your score is " + points);
            scoreDiv.innerHTML = "0";
            words.innerHTML = "";
            levelOneBtn.disabled = false;
            clearInterval(timer);
            seconds = 60;
            timerDiv.innerHTML = "60";
            levelOneBtn.disabled = false;
        }
    }, 1000);
}

levelOneBtn.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("level-one-btn").className = "nes-btn is-success";
    timer();
    fetchWords().then(words => console.log(words))
    wordSpitter();
});

function typing(e) {
    typed = String.fromCharCode(e.which);
    for (var i = 0; i < spans.length; i++) {
        if (spans[i].innerHTML === typed) { // if typed letter is the one from the word
            if (spans[i].style.color == "green") { // if it already has class with the bacground color then check the next one
                continue;
            } else if (spans[i].style.color !== "green" && spans[i-1] === undefined || spans[i-1].spans[i].style.color !== "green") { // if it dont have class, if it is not first letter or if the letter before it dont have class (this is done to avoid marking the letters who are not in order for being checked, for example if you have two "A"s so to avoid marking both of them if the first one is at the index 0 and second at index 5 for example)
                spans[i].style.color == "green";
                console.log(spans[i].style);
                break;
            }
        }
    }
    var checker = 0;
    for (var j = 0; j < spans.length; j++) { //checking if all the letters are typed
        if (spans[j].className === "span bg") {
            checker++;
        }
        if (checker === spans.length) { // if so, animate the words with animate.css class
            spark.pause();
            spark.currentTime = 0;
            spark.play();
            words.classList.add("animated");
            words.classList.add("fadeOut");
            points++; // increment the points
            scoreDiv.innerHTML = points; //add points to the points div
            document.removeEventListener("keydown", typing, false);
            setTimeout(function(){
                words.className = "words"; // restart the classes
                random(); // give another word
                document.addEventListener("keydown", typing, false);
            }, 400);
        }

    }
}

document.addEventListener("keydown", typing, false);