// jshint esversion: 6 

// --- GENERAL CONSTANTS & VARIABLES FOR MEMORY GAME --- 

const cards = document.querySelectorAll(".memory-card");
const score = document.getElementById("point");
const finalScore = document.getElementById("finalPoints");
const won = document.getElementById("won");
const play = document.getElementById("playAgain");
const body = document.getElementsByTagName("body")[0];

var points = 0;
var finalPoint = 0;
var win = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


// --- HELP MODAL ---

var modal = document.getElementById("myModal");
var btn = document.getElementById("HelpBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
    modal.style.display = "block";
};
span.onclick = function () {
    modal.style.display = "none";
};
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


// --- AUDIO EFFECTS ---

var FxRight = new Audio("assets/sounds/yay.mp3");
var fxWrong = new Audio("assets/sounds/oooh.mp3");
var fxFin = new Audio("assets/sounds/applause.mp3");



function toggleClass(el) {
    if (el.className == "audioon") {
        el.className = "audiooff";
        FxRight.muted = true;
        fxWrong.muted = true;
        fxFin.muted = true;
    } else {
        el.className = "audioon";
        FxRight.muted = false;
        fxWrong.muted = false;
        fxFin.muted = false;
    }
}



// --- GAME SECTION ---

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkCards();
}

function checkCards() {
    let isMatch = firstCard.dataset.cards === secondCard.dataset.cards;

    isMatch ? cardsMatch() : cardsDontMatch();
}

function cardsMatch() {

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    points += 5;
    finalPoint = points;
    win += 2;
    finalScore.innerHTML = finalPoint;
    score.innerHTML = points;

    if (win != 12) {

        FxRight.play();

    }


    if (win === 12) {

        fxFin.play();
        won.style.visibility = "visible";

    }

    resetBoard();

}

function cardsDontMatch() {
    fxWrong.play();
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 2000);

    points -= 2;
    finalPoint = points;
    score.innerHTML = points;

}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function playAgain() {
    location.reload();
}

play.addEventListener("click", playAgain);

(function shuffle() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));