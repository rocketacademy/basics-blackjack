var cardDeck = [];
var playerCards = [];
var compCards = [];
var gameStep = "start";
var win = 0;
var sumOfPlayerCards = 0;
var sumOfCompCards = 0;

function createDeck() {
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var nums = [
    "ace",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "jack",
    "queen",
    "king",
  ];

  for (var i = 0; i < nums.length; i++) {
    for (var j = 0; j < suits.length; j++) {
      var card = {
        name: nums[i] + " " + suits[j],
        suit: suits[j],
        num: i + 1,
      };

      cardDeck.push(card);
    }
  }
}

function getRandomIndex() {
  return Math.floor(Math.random() * 52);
}

function shuffleCards() {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
}

function dealCards() {
  playerCards = [cardDeck.pop(), cardDeck.pop()];
  compCards = [cardDeck.pop(), cardDeck.pop()];
}

function sumCards(input) {
  var sum = 0;
  var hasAce = false;

  for (var i = 0; i < input.length; i++) {
    var cardValue = input[i].num;

    if (cardValue > 10) {
      sum += 10;
    } else if (cardValue == 1) {
      hasAce = true;
      sum += 11; // Assume Ace is worth 11 initially
    } else {
      sum += cardValue;
    }
  }

  // If the sum is greater than 21 and there's an Ace, adjust the value of Ace to 1
  while (sum > 21 && hasAce) {
    sum -= 10;
    hasAce = false; // Ensures we don't keep subtracting for multiple Aces
  }

  return sum;
}

function checkForBlackJack() {
  sumOfPlayerCards = sumCards(playerCards);

  if (
    (playerCards[0].num == 1 && playerCards[1].num >= 10) ||
    (playerCards[1].num == 1 && playerCards[0].num >= 10)
  ) {
    return "Blackjack! Player wins.";
  } else if (
    (compCards[0].num == 1 && compCards[1].num >= 10) ||
    (compCards[1].num == 1 && compCards[0].num >= 10)
  ) {
    return "Blackjack! Computer wins.";
  } else {
    return "Would you like to hit or stand?";
  }
}

function playerHit() {
  playerCards.push(cardDeck.pop());
  console.log(playerCards);
}

function playerStand() {
  console.log(compCards);
  sumOfCompCards = sumCards(compCards);
  // console.log(sumOfCompCards);
  while (sumOfCompCards <= 16) {
    // console.log(cardDeck);
    compCards.push(cardDeck.pop());
    sumOfCompCards = sumCards(compCards);
  }
}

function checkWhoWins() {
  sumOfCompCards = sumCards(compCards);
  sumOfPlayerCards = sumCards(playerCards);
  if (sumOfPlayerCards > 21 && sumOfCompCards > 21) {
    return "Both over 21. Type 'restart' to play again.";
  } else if (sumOfPlayerCards > 21) {
    return "Over 21, you lose! Computer wins! Type 'restart' to play again.";
  } else if (sumOfCompCards > 21) {
    return "Computer over 21, you win! Type 'restart' to play again.";
  } else if (sumOfPlayerCards == sumOfCompCards) {
    return "It's a tie. Type 'restart' to play again.";
  } else if (sumOfPlayerCards > sumOfCompCards) {
    return "You win! Type 'restart' to play again.";
  } else if (sumOfCompCards > sumOfPlayerCards) {
    return "Computer wins! Type 'restart' to play again.";
  }
}

function main(input) {
  if (gameStep == "start" || input == "restart") {
    createDeck();
    shuffleCards();
    dealCards();
    startingResults = checkForBlackJack();
    gameStep = "hit or stand";
    // console.log(gameStep);
    return `Player cards: ${playerCards[0].name}, ${playerCards[1].name} <br><br> Computer cards: ${compCards[0].name}, ${compCards[1].name} <br><br> ${startingResults}`;
  } else if (input == "hit") {
    playerHit();
    return `Player cards: ${playerCards
      .map((card) => card.name)
      .join(", ")} <br><br> Computer cards:  ${compCards
      .map((card) => card.name)
      .join(", ")} `;
    // map creates an array of card.name join joins them into a string separated by ,
  } else if (input == "stand") {
    playerStand();
    var results = checkWhoWins();
    return `Player cards: ${playerCards
      .map((card) => card.name)
      .join(", ")} <br><br> Computer cards:  ${compCards
      .map((card) => card.name)
      .join(", ")} <br><br> Results: ${results}`;
  }
}
