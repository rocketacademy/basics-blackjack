//---------------CODE TO MAKE DECK----------------------
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var name = ["", "ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter < name.length) {
      var cardName = name[rankCounter];
      var rankCounterValue = rankCounter;
      if (cardName == "ace") {
        rankCounterValue = 11;
      } else if (cardName == "jack") {
        rankCounterValue = 10;
      } else if (cardName == "queen") {
        rankCounterValue = 10;
      } else if (cardName == "king") {
        rankCounterValue = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounterValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var cardDeck = makeDeck();
var index = 0;
while (index < cardDeck.length) {
  console.log(cardDeck[index].name);
  var cardTitle = cardDeck[index].name + " of " + cardDeck[index].suit;
  console.log(cardTitle);
  index = index + 1;
}

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
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
};

//--------- CODE STARTS HERE --------------------
var gameMode = 0;
var numPlayerCards = 0;
var numComputerCards = 0;
var playerHand = [];
var computerHand = [];

var sumPlayerHand = 0;
var sumComputerHand = 0;

//Function to sum up hand numbers
var calcSumOfHand = function (array) {
  var totalHandValue = 0;
  var i = 0;
  while (i < array.length) {
    var currentCard = array[i];
    totalHandValue = totalHandValue + currentCard.rank;
    i += 1;
  }
  return totalHandValue;
};

var main = function (input) {
  var myOutputValue = `hello world`;

  var cardDeck = makeDeck();
  var shuffledDeck = shuffleCards(cardDeck);
  var myOutputValue = "";
  //gameMode = 0
  //first, distribute cards, push them into arrays
  if (gameMode == 0) {
    var playerCard1 = shuffledDeck.pop();
    var playerCard2 = shuffledDeck.pop();
    var computerCard1 = shuffledDeck.pop();
    var computerCard2 = shuffledDeck.pop();
    playerHand.push(playerCard1);
    playerHand.push(playerCard2);
    computerHand.push(computerCard1);
    computerHand.push(computerCard2);
    numPlayerCards = 2;
    numComputerCards = 2;
    sumComputerHand = computerCard1.rank + computerCard2.rank;
    console.log(sumComputerHand);
    sumPlayerHand = playerCard1.rank + playerCard2.rank;
    //if 2 cards, +10 to total sum if one of them is an ace (global var)
    if (
      numPlayerCards == 2 &&
      (playerCard1.rank == 1 || playerCard2.rank == 1)
    ) {
      sumPlayerHand = sumPlayerHand + 10;
      console.log(sumPlayerHand);
    }

    if (
      numComputerCards == 2 &&
      (computerCard1.rank == 1 || computerCard2.rank == 1)
    ) {
      sumComputerHand = sumComputerHand + 10;
    }

    //check if theres any blackjacks
    //one card = ace, second card = j/q/k
    if (sumPlayerHand == 21) {
      gameMode = 0;
      var numPlayerCards = 0;
      var numComputerCards = 0;
      return `Your cards: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit}<BR>You blackjacked! YOU WIN.<BR>Click submit to play again.`;
    }
    if (sumComputerHand == 21) {
      gameMode = 0;
      var numPlayerCards = 0;
      var numComputerCards = 0;
      return `Your cards: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit}<BR><BR>Computer's cards: ${computerCard1.name} of ${computerCard1.suit}, ${computerCard2.name} of ${computerCard2.suit}<BR><BR>Computer blackjacked! Kua kua kua, you suay leh. Click submit to play again.`;
    }
    if (sumPlayerHand == 21 && sumComputerHand == 21) {
      gameMode = 0;
      var numPlayerCards = 0;
      var numComputerCards = 0;
      return `What are the odds! You both blackjacked.<BR>Click submit to play again.`;
    }
    if (sumPlayerHand < 21) {
      gameMode = 1;
      return `Your cards: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit}<BR><BR>Type "hit" to draw another card, type "stand" to stop.`;
    }
  }

  //gameMode = 1, if input = "hit"
  if (gameMode == 1 && input == "hit") {
    var newCard = shuffledDeck.pop();
    numPlayerCards += 1;
    playerHand.push(newCard);
    sumPlayerHand = sumPlayerHand + newCard.rank;
    //check if player got bao
    if (sumPlayerHand > 21) {
      gameMode = 0;
      var numPlayerCards = 0;
      var numComputerCards = 0;
      return `Kua kua kua, you suay leh. Click submit to play again.`;
    }
    if (sumPlayerHand < 21) {
      gameMode = 1;
      return `Your total sum = ${sumPlayerHand}<BR><BR>Enough or not? Type "hit" to draw another card, type "stand" to stop.`;
    }
  }

  if (gameMode == 1 && input == "stand") {
    gameMode = 2;
    return `Ok you sure enough ah. Click submit to see computer's cards. Good luck!`;
  }

  //compare sum, and reveal computers' cards
  if (gameMode == 2) {
    if (sumComputerHand < 17) {
      var newCard = shuffledDeck.pop();
      numComputerCards += 1;
      computerHand.push(newCard);
      sumComputerHand = sumComputerHand + newCard.rank;
      gameMode = 0;
      var numPlayerCards = 0;
      var numComputerCards = 0;
    }
    if (sumPlayerHand > sumComputerHand) {
      return `you win! you got ${sumPlayerHand}, computer got ${sumComputerHand}. <BR>Click submit to play again.`;
    }
    if (sumPlayerHand < sumComputerHand) {
      return `you lose! you got ${sumPlayerHand}, computer got ${sumComputerHand}<BR>Click submit to play again.`;
    }
    if ((sumPlayerHand = sumComputerHand)) {
      return `you tie! you got ${sumPlayerHand}, computer got ${sumComputerHand}<BR>Click submit to play again.`;
    }
    if (sumPlayerHand > 21 && sumComputerHand > 21) {
      return `you heng leh, computer also bao! you got ${sumPlayerHand}, computer got ${sumComputerHand}.<BR><BR>Click submit to play again.`;
    }
    //reset all variables

    return `Your cards: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit}<BR><BR>Type "hit" to draw another card, type "stand" to stop.`;
  }

  return myOutputValue;
};
