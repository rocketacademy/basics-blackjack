var initialCards = function (shuffledDeck, playerHand, computerHand) {
  var counter = 0;
  while (counter < 2) {
    var playerCard = shuffledDeck.pop();
    playerHand.push(playerCard);

    var computerCard = shuffledDeck.pop();
    computerHand.push(computerCard);

    counter = counter + 1;
  }
  var computerCardSum = addCards(computerHand);
  while (computerCardSum < 17) {
    var computerCard = shuffledDeck.pop();
    computerHand.push(computerCard);
    computerCardSum = addCards(computerHand);
  }

  console.log("Player Cards:");
  console.log(playerHand);
  console.log("Computer Cards: ");
  console.log(computerHand);
};

var addCards = function (cardsArray) {
  var currentPlayerTotal = 0;
  var counter = 0;
  while (counter < cardsArray.length) {
    var cardValue = cardsArray[counter].name;
    if (cardValue == "jack" || cardValue == "queen" || cardValue == "king") {
      cardValue = 10;
      //change this later
    } else if (cardValue == "ace") {
      cardValue = 1;
    }
    currentPlayerTotal = currentPlayerTotal + Number(cardValue);

    counter = counter + 1;
  }
  console.log(currentPlayerTotal);
  return currentPlayerTotal;
};

var hitCard = function (currentPlayerArray) {
  var additionalCard = shuffledDeck.pop();
  currentPlayerArray.push(additionalCard);
};

var chooseAceValue = function (input, playerHand) {
  var index = 0;
  while (index < playerHand.length) {
    if (playerHand[index].name == "ace") {
      playerHand[index].name = input;
    }
    index = index + 1;
  }
};

var compareSum = function (playerSum, computerSum) {
  if (playerSum == 21) {
    return `You Got: ${playerSum}<br> You won!`;
  } else if (computerSum > 21) {
    return `Computer Got: ${computerSum}! You won`;
  } else if (computerSum > playerSum) {
    return `Computer Total: ${computerTotal}<br>Your Total: ${playerSum}<br>You lost`;
  } else if (computerSum < playerSum) {
    return `Computer Total: ${computerTotal}<br>Your Total: ${playerSum}<br>You won`;
  }
};

var gotAce = function (playerHand) {
  var index = 0;
  while (index < playerHand.length) {
    if (playerHand[index].name == "ace") {
      return true;
    }
    index = index + 1;
  }
};

var resetGame = function () {
  playerTotal = 0;
  computerTotal = 0;
  playerHand = [];
  computerHand = [];
  gameStart = true;
  nowPlaying = false;
  hit = false;
  haveAce = false;
};

var showCards = function (playerHand) {
  var index = 0;
  var showCards = "Your cards are: ";
  while (index < playerHand.length) {
    var cardSuits = playerHand[index].suit;
    var cardName = playerHand[index].name;
    showCards = `${showCards}<br> ${cardName} of ${cardSuits}`;
    index = index + 1;
  }
  return showCards;
};

var outPutMessages = function (playerHand, playerSum, haveAce) {
  if (haveAce == true) {
    return `${showCards(
      playerHand
    )}<br><br>Current Score: ${playerSum}<br>You got an ACE, Please choose if 1 or 11?`;
  } else {
    return `${showCards(
      playerHand
    )}<br><br>Current Score: ${playerSum}<br> stand or hit?`;
  }
};
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
  // Return the completed card deck
  return cardDeck;
};
// var deck = makeDeck()
// var shuffledDeck = shuffleCards(deck)
// var playerHand = [];
// var computerHand = [];

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

//MAIN FUNCTION

var playerTotal = 0;
var computerTotal = 0;
var outGameMessage;
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var playerHand = [];
var computerHand = [];
var gameStart = true;
var nowPlaying = false;
var hit = false;
var haveAce = false;

var main = function (input) {
  if (gameStart == true) {
    resetGame();
    initialCards(shuffledDeck, playerHand, computerHand);
    playerTotal = addCards(playerHand);
    gameStart = false;
    nowPlaying = true;
    if (gotAce(playerHand) == true) {
      haveAce = true;
      outGameMessage = outPutMessages(playerHand, playerTotal, haveAce);
      return outGameMessage;
    }
    outGameMessage = outPutMessages(playerHand, playerTotal, haveAce);
    return outGameMessage;
  }
  if (nowPlaying == true && haveAce == true) {
    chooseAceValue(input, playerHand);
    haveAce = false;
    playerTotal = addCards(playerHand);
    outGameMessage = outPutMessages(playerHand, playerTotal, haveAce);
    return outGameMessage;
  }
  if (nowPlaying == true && haveAce == false) {
    if (input == "hit") {
      hitCard(playerHand);
      playerTotal = addCards(playerHand);
      if (playerTotal > 21) {
        return `Your total is ${playerTotal} You Lost`;
      }
      outGameMessage = outPutMessages(playerHand, playerTotal, haveAce);
      return outGameMessage;
    } else if (input == "stand") {
      playerTotal = addCards(playerHand);
      computerTotal = addCards(computerHand);
      outGameMessage = compareSum(playerTotal, computerTotal);
      nowPlaying = false;
      gameStart = true;
      return outGameMessage;
    }
  }
  return `Ooppsss Something Went Wrong, Try Again`;
};
