// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function (array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

let gameState = {
  score: 0,
  currentCard: "fas fa-atom",
  numFound: 0,
  cardTable: [
    "fas fa-atom",
    "fas fa-frog",
    "fas fa-feather-alt",
    "fas fa-cogs",
    "fas fa-anchor",
    "fas fa-fan",
    "fas fa-bolt",
    "fas fa-hat-wizard",
    "fas fa-apple-alt",
    "fas fa-bell",
    "fas fa-bomb",
    "fas fa-brain",
  ],
  guessArr: [
    "fas fa-atom",
    "fas fa-frog",
    "fas fa-feather-alt",
    "fas fa-cogs",
    "fas fa-anchor",
    "fas fa-fan",
    "fas fa-bolt",
    "fas fa-hat-wizard",
    "fas fa-apple-alt",
    "fas fa-bell",
    "fas fa-bomb",
    "fas fa-brain",
  ],
};

function handleReset() {
  gameState.score = 0;
  gameState.numFound = 0;
  for (i = 0; i < gameState.cardTable.length; i++) {
    document.querySelector("#cards").children[i].classList.remove("matched");
  }
  gameStart();
}

function handleTable(data) {
  const element = data.target;
  if (element.classList.value === "card") {
    gameState.score++;
  }
  element.classList.add("show");
  tableConditions(element);
}

function tableConditions(element) {
  if (element.children[0].classList.value !== gameState.currentCard) {
    document.querySelector("#cards").removeEventListener("click", handleTable);
    setTimeout(() => {
      element.classList.remove("show");
      document.querySelector("#cards").addEventListener("click", handleTable);
    }, 500);
  }
  if (element.children[0].classList.value === gameState.currentCard) {
    gameState.numFound++;
    element.classList.remove("show");
    element.classList.add("matched");
  }
  render();
  if (gameState.numFound === 12) {
    alert("you win!!!");
  }
}

function render() {
  document.querySelector("#score").textContent = gameState.score;
  gameState.currentCard = gameState.guessArr[gameState.numFound];
  document.querySelector("#next-card").firstChild.classList.value =
    gameState.currentCard;
  for (i = 0; i < gameState.cardTable.length; i++) {
    document.querySelector("#cards").children[
      i
    ].firstElementChild.classList.value = gameState.cardTable[i];
  }
}

function gameStart() {
  shuffle(gameState.cardTable);
  shuffle(gameState.guessArr);
  render();
}

gameStart();

document.querySelector(".restart").addEventListener("click", handleReset);
document.querySelector("#cards").addEventListener("click", handleTable);
