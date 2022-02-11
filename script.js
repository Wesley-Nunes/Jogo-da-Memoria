const cards = document.querySelectorAll(".card");
let hasCardFlip = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flip");
  if (!hasCardFlip) {
    hasCardFlip = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  hasCardFlip = false;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasCardFlip, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

//IIFE
(function shuffle() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();
