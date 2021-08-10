var deck = [];
var shuffledDeck = [];
var playerCards = [];
var computerCards = [];
var gameMode = "drawCards";

var main = function (input) {
  var myOutputValue = " ";
  //find player hand and output in box
  //calPlayerCard gives string representing the card name and suit
  var calCards = startOfGame();
  myOutputValue = calCards;
  if (gameMode == "hit" && input == "hit") {
    var playerHand = calPlayerCard(shuffledDeck);
    console.log(playerHand);
    myOutputValue = playerHand;
  } else if (gameMode == "hit" && input == "pass") {
    myOutputValue =
      "You passed, here are your cards " +
      "<br>" +
      showPlayerCards(playerCards) +
      "<br>" +
      calPlayerSum(playerCards);
    gameMode = "ComputerTurn";
    return myOutputValue;
  }
  if (gameMode == "ComputerTurn") {
    var compCards = showComputerCards(computerCards);
    myOutputValue =
      "Computer got " +
      "<br>" +
      compCards +
      "<br>" +
      calComputerSum(computerCards);
    gameMode = "results";
    return myOutputValue;
  }
  if (gameMode == "results") {
    var win = calWinningHand(playerCards, computerCards);
    myOutputValue = win;
  }
  return myOutputValue;
};
var makeDeck = function () {
  var suits = ["💎", "♣", "❤", "♠"];
  var suitIndex = 0;
  //making suits
  while (suitIndex < suits.length) {
    var currentSuits = suits[suitIndex];
    console.log("current Suit: " + currentSuits);
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
        cardEmoji = "😎";
      } else if (cardName > 1 && cardName < 11) {
        cardName = rankCounter;
        cardEmoji = " ";
      } else if (cardName == 11) {
        cardName = "Jack";
        cardEmoji = "👶";
      } else if (cardName == 12) {
        cardName = "Queen";
        cardEmoji = "👸";
      } else if (cardName == 13) {
        cardName = "King";
        cardEmoji = "🤴";
      }
      var card = {
        name: cardName,
        suit: currentSuits,
        rank: rankCounter,
        Emoji: cardEmoji,
      };
      console.log("rank: " + rankCounter + cardEmoji);
      deck.push(card);
      shuffledDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
// Shuffle the elements in the deck array
var shuffleCards = function (deck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(shuffledDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = shuffledDeck[randomIndex];
    console.log(randomCard);
    // Select the card that corresponds to currentIndex
    var currentCard = shuffledDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    shuffledDeck[currentIndex] = randomCard;
    shuffledDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return deck;
};
var startOfGame = function () {
  if (gameMode == "drawCards") {
    //put making and shuffling of deck inside to avoid many decks everytime you press submit
    //inititate making of deck
    var makingDeck = makeDeck();
    //shuffle the deck
    var shufflingDeck = shuffleCards(deck);
    var playerHand1 = calPlayerCard(shuffledDeck);
    var playerHand2 = calPlayerCard(shuffledDeck);
    console.log(playerHand1);
    console.log(playerHand2);
    // while runs as long as computerSum is less then 17
    var computerHand1 = calComputerCard(shuffledDeck);
    var computerHand2 = calComputerCard(shuffledDeck);
    console.log(computerHand1);
    console.log(computerHand2);
    while (calComputerSum(computerCards) < 17) {
      console.log(computerHand1);
      var computerNewDraw = calComputerCard(shuffledDeck);
    }
    myOutputValue =
      "You got " +
      "<br>" +
      playerHand1 +
      "<br>" +
      playerHand2 +
      "<br>" +
      calPlayerSum(playerCards);
    // var winningHand = calWinningHand(playerCards, computerCards);
    // var myOutputValue = winningHand;
    gameMode = "hit";
  }
  return myOutputValue;
};
// finding a player card from shuffled deck
var calPlayerCard = function (shuffledDeck) {
  var playerCard = shuffledDeck.pop();
  playerCards.push(playerCard);
  var myOutputValue = playerCard.name + " of " + playerCard.suit;
  return myOutputValue;
};
// function to show all cards in players hands as well as the sum of cards
var calPlayerSum = function (playerCards) {
  myOutputValue = " ";
  var counter = 0;
  var sum = 0;
  while (counter < playerCards.length) {
    var rankOfCurrentCard = playerCards[counter].rank;
    counter = counter + 1;
    sum += rankOfCurrentCard;
  }
  return sum;
};
var calComputerCard = function (shuffledDeck) {
  var computerCard = shuffledDeck.pop();
  computerCards.push(computerCard);
  var myOutputValue = computerCard.name + " of " + computerCard.suit;
  return myOutputValue;
};

var calComputerSum = function (computerCards) {
  myOutputValue = " ";
  var counter = 0;
  var sum = 0;
  while (counter < computerCards.length) {
    var rankOfCurrentCard = computerCards[counter].rank;
    counter = counter + 1;
    sum += rankOfCurrentCard;
  }
  return sum;
};

/////////output is showing as blank need to fix this
var calWinningHand = function (playerCards, computerCards) {
  myOutputValue = " ";
  playerSum = calPlayerSum(playerCards);
  console.log(playerSum);
  computerSum = calComputerSum(computerCards);
  console.log(computerSum);
  if (playerSum < computerSum) {
    myOutputValue =
      " You got " +
      calPlayerSum(playerCards) +
      "<br>" +
      "Computer got " +
      calComputerSum(computerCards) +
      "<br>" +
      "You Lost!";
  } else if (playerSum > computerSum) {
    myOutputValue =
      " You got " +
      calPlayerSum(playerCards) +
      "<br>" +
      "Computer got " +
      calComputerSum(computerCards) +
      "<br>" +
      "You Won!";
  } else if ((playerSum = computerSum)) {
    myOutputValue =
      " You got " +
      calPlayerSum(playerCards) +
      "<br>" +
      "Computer got " +
      calComputerSum(computerCards) +
      "<br>" +
      "Draw!";
  }
  return myOutputValue;
};
//adding hit or not funtionality for player and computer
//showing player cards function
var showPlayerCards = function (playerCards) {
  myOutputValue = "";
  var noOfCards = playerCards.length;
  var counter = 0;
  while (counter < noOfCards) {
    myOutputValue =
      playerCards[counter].name +
      " of " +
      playerCards[counter].suit +
      "<br>" +
      myOutputValue;
    counter += 1;
  }
  return myOutputValue;
};
var showComputerCards = function (computerCards) {
  myOutputValue = " ";
  var counter = 0;
  while (counter < computerCards.length) {
    myOutputValue =
      myOutputValue +
      "<br>" +
      computerCards[counter].name +
      " of " +
      computerCards[counter].suit;
    counter += 1;
  }
  return myOutputValue;
};

//////logic to win game at 21 or bust over 21;

var gameLogic = function (computerCards, playerCards) {
  if (calPlayerSum(playerCards) == 21 && calComputerSum(computerCards) == 21) {
    myOutputValue = "You both drew 21! what are the chances?! DRAW";
  }
};
