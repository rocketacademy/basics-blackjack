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
    if (calPlayerSum(playerCards) > 21) {
      return (
        playerHand +
        "<br>" +
        showPlayerCards(playerCards) +
        "<br>" +
        "Your total is " +
        calPlayerSum(playerCards) +
        "<br>" +
        "You bust!, refresh to try again"
      );
    }
    myOutputValue =
      playerHand +
      "<br>" +
      showPlayerCards(playerCards) +
      "<br>" +
      "Your total is " +
      calPlayerSum(playerCards) +
      "<br>" +
      " key in 'hit' to draw another card" +
      "<br>" +
      "key in 'pass' to stop drawing";
  } else if (gameMode == "hit" && input == "pass") {
    myOutputValue =
      "You passed, here are your cards " +
      "<br>" +
      showPlayerCards(playerCards) +
      "<br>" +
      "Your total is " +
      calPlayerSum(playerCards) +
      "<br>" +
      "Press submit to hand over to Computer";
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
      "Computer's total is " +
      calComputerSum(computerCards);
    gameMode = "results";
  }
  ////////////need to make gamewinning function
  if (gameMode == "results") {
    var calWinningFunction = calWinningHand(playerCards, computerCards);
    myOutputValue = calWinningFunction;
  }
  return myOutputValue;
};
var makeDeck = function () {
  var suits = ["💎", "♣", "❤", "♠"];
  var suitIndex = 0;
  //making suits
  while (suitIndex < suits.length) {
    var currentSuits = suits[suitIndex];
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
    var makingDeck = makeDeck();
    var shufflingDeck = shuffleCards(deck);
    var playerHand1 = calPlayerCard(shuffledDeck);
    var playerHand2 = calPlayerCard(shuffledDeck);
    // logic for if player is > 21 or =21
    if (calPlayerSum(playerCards) == 21) {
      return (
        showPlayerCards(playerCards) +
        "<br>" +
        showComputerCards(computerCards) +
        "<br>" +
        "Your total is " +
        calPlayerSum(playerCards) +
        "<br>" +
        "BlackJack! You won! Refresh to try again"
      );
    } else if (calPlayerSum(playerCards) > 21) {
      return (
        showPlayerCards(playerCards) +
        "<br>" +
        "Your total is " +
        calPlayerSum(playerCards) +
        "<br>" +
        "You went over! You bust! Refresh to try again"
      );
    }
    //making two cards to add into sum so while loop below can run
    // while runs as long as computerSum is less then 17
    var computerHand1 = calComputerCard(shuffledDeck);
    var computerHand2 = calComputerCard(shuffledDeck);
    console.log(computerHand1);
    console.log(computerHand2);
    while (calComputerSum(computerCards) < 17) {
      var computerNewDraw = calComputerCard(shuffledDeck);
      console.log(computerNewDraw);
    }
    myOutputValue =
      "You got " +
      "<br>" +
      playerHand1 +
      "<br>" +
      playerHand2 +
      "<br>" +
      "Your total is " +
      calPlayerSum(playerCards) +
      "<br>" +
      " key in 'hit' to draw another card" +
      "<br>" +
      "key in 'pass' to stop drawing";
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

var calWinningHand = function (playerCards, computerCards) {
  myOutputValue = " ";
  var playerSum = calPlayerSum(playerCards);
  console.log(playerSum);
  var computerSum = calComputerSum(computerCards);
  console.log(computerSum);

  if (computerSum > 21) {
    return (
      " Your total was  " +
      calPlayerSum(playerCards) +
      "<br>" +
      "Computer's total was  " +
      calComputerSum(computerCards) +
      "<br>" +
      " The computer bust! You Won! Refresh to try again"
    );
  }
  if (playerSum < computerSum) {
    myOutputValue =
      " Your total was  " +
      calPlayerSum(playerCards) +
      "<br>" +
      "Computer's total was  " +
      calComputerSum(computerCards) +
      "<br>" +
      "You Lost! Refresh to try again";
  } else if (playerSum > computerSum) {
    myOutputValue =
      " You got " +
      calPlayerSum(playerCards) +
      "<br>" +
      "Computer got " +
      calComputerSum(computerCards) +
      "<br>" +
      "You Won! Refresh to try again";
  } else if (playerSum == computerSum) {
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

/////////////need to make an ace function and embed it into calPlayerCards function , give user choice to change ace to 1 or 11

//// if players have an Ace and playerCards.length =2 , ace.rank == 11
/// if players have an Ace and playerCards.length >3 Ace.rank == 1
