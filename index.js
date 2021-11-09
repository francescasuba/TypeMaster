var temp = document.querySelector(".time");
    var words = document.querySelector(".words");
    var button = document.querySelector(".nes-btn is-primary");
    var scoreDiv = document.querySelector(".score");
    var timerDiv = document.querySelector(".time");
    var points = 0;
    var spans;
    var typed;
    var seconds = 60;


const apiURL = "https://random-word-api.herokuapp.com/word?number=200&swear=1";

function fetchWords() {
    return fetch(apiURL)
        .then( response => response.json())
}

async function getWords(){
    const messages = await response.json().parse();
    var wordsArray = [];
    for (var i in messages){
        wordsArray.push(messages[i]);
    }
}

function timer(){
    points = 0;
    var timer = setInterval(function(){
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

button.addEventListener("click", function(buttonClickEvent) {
    buttonClickEvent.preventDefault();
    fetchWords();
    getWords();
  });