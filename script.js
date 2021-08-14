var deck = [];
var shuffledDeck = [];
var playerCards = [];
var computerCards = [];
var gameMode = "userName";
var coins = 100;
var wager = 0;
var userName = " ";

var main = function (input) {
  var myOutputValue = " ";
  //find player hand and output in box
  //calPlayerCard gives string representing the card name and suit

  if (gameMode == "userName") {
    var name = findUserName(input);
    return name;
  }
  if (gameMode == "reset") {
    wager = 0;
    playerCards = [];
    computerCards = [];
    deck = [];
    shuffledDeck = [];
    gameMode = "wager";
  }

  if (gameMode == "wager") {
    var placeWager = calWager(input);
    return placeWager;
  }
  if (gameMode == "drawCards") {
    var calCards = startOfGame();
    return calCards;
  }
  if (gameMode == "hit" && input == "hit") {
    var playerHand = calPlayerCard(shuffledDeck);
    console.log(playerHand);

    if (calPlayerSum(playerCards) > 21) {
      coins = coins - wager;
      gameMode = "reset";
      return "You bust!, Input new wager to try again";
    }
    myOutputValue =
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
  } else if (gameMode == "ComputerTurn") {
    var compCards = showComputerCards(computerCards);
    myOutputValue =
      "Computer got " +
      "<br>" +
      compCards +
      "<br>" +
      "Computer's total is " +
      calComputerSum(computerCards) +
      "<br>" +
      "Calculating winner press submit ";
    gameMode = "results";
    return myOutputValue;
  } else if (gameMode == "results") {
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
        cardStrength = 1;
      } else if (cardName > 1 && cardName < 11) {
        cardName = rankCounter;
        cardEmoji = " ";
        cardStrength = rankCounter;
      } else if (cardName == 11) {
        cardName = "Jack";
        cardEmoji = "👶";
        cardStrength = 11;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardEmoji = "👸";
        cardStrength = 12;
      } else if (cardName == 13) {
        cardName = "King";
        cardEmoji = "🤴";
        cardStrength = 13;
      }
      var card = {
        name: cardName,
        suit: currentSuits,
        rank: cardStrength,
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
    if (calPlayerSum(playerCards) == 21) {
      myOutputValue =
        showPlayerCards(playerCards) +
        "<br>" +
        showComputerCards(computerCards) +
        "<br>" +
        "Your total is " +
        calPlayerSum(playerCards) +
        "<br>" +
        "BlackJack! You won! Input new wager to try again";
      gameMode = "reset";
      return myOutputValue;
    }
    if (calPlayerSum(playerCards) > 21) {
      myOutputValue =
        showPlayerCards(playerCards) +
        "<br>" +
        "Your total is " +
        calPlayerSum(playerCards) +
        "<br>" +
        "You went over! You bust! Input new wager to try again";
      coins = coins - wager;
      gameMode = "reset";
      return myOutputValue;
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
  myOutputValue = playerCard.name + " of " + playerCard.suit;
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

  if (computerSum > 21 && playerSum < 21) {
    myOutputValue =
      " Your total was  " +
      calPlayerSum(playerCards) +
      "<br>" +
      "Computer's total was  " +
      calComputerSum(computerCards) +
      "<br>" +
      " The computer bust! You Won! Input new wager to try again";
    coins = coins + wager;
  } else if (playerSum < computerSum) {
    myOutputValue =
      " Your total was  " +
      calPlayerSum(playerCards) +
      "<br>" +
      "Computer's total was  " +
      calComputerSum(computerCards) +
      "<br>" +
      "You Lost! Input new wager to try again";
    coins = coins - wager;
  } else if (playerSum > computerSum) {
    myOutputValue =
      " You got " +
      calPlayerSum(playerCards) +
      "<br>" +
      "Computer got " +
      calComputerSum(computerCards) +
      "<br>" +
      "You Won! Input new wager to try again";
    coins = coins + wager;
  } else if (playerSum == computerSum) {
    myOutputValue =
      " You got " +
      calPlayerSum(playerCards) +
      "<br>" +
      "Computer got " +
      calComputerSum(computerCards) +
      "<br>" +
      "Draw! Input new wager to try again";
  }
  gameMode = "reset";
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

var findUserName = function (input) {
  if (gameMode == "userName") {
    userName = input;
    gameMode = "wager";
    myOutputValue =
      "Hello " +
      userName +
      "<br>" +
      "Please input your wager. Your total coins are " +
      coins;
  }
  return myOutputValue;
};
var calWager = function (input) {
  if (gameMode == "wager") {
    wager = Number(input);
    gameMode = "drawCards";
    myOutputValue =
      "Hello " +
      userName +
      "<br>" +
      "Your total coins are " +
      coins +
      "<br>" +
      "Your wager: " +
      wager +
      "<br>" +
      "Press submit to draw cards";
  }
  return myOutputValue;
};
