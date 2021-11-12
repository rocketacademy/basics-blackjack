var gameMode = "shuffleDeck";
var gameModes = ["shuffleDeck","startGame","hitOrStand","dealerTurn","gameEnd"];
var isPlayerTurn = true;
var playerHand = [];
var dealerHand = [];
var cardDeck = [];
var result = "";
var playerMove = "";

var main = function (input) {

  if (gameMode == "shuffleDeck") {
    // game starts from shuffleDeck
    cardDeck = makeDeck();
    cardDeck = shuffleCards(cardDeck);
    gameMode = "startGame";

    // Announce the start of game
    console.log("Starting game:...");
    return "Starting game... Click the submit button to continue"
  }


  if (gameMode == "startGame") {
    // gives the player and dealer two cards to start the game.
    playerHand = [];
    dealerHand = [];
    for (let i = 0; i < 2; i++){
      playerHand.push(dealCard());
      dealerHand.push(dealCard());
    }

    console.log("playerhand:" + JSON.stringify(playerHand) + "\ndealerhand:" + JSON.stringify(dealerHand));
    // checks if either the player or dealer has a Blackjack
    playerResult = getScore(playerHand);
    dealerResult = getScore(dealerHand);

    console.log("playerResult: " + playerResult + "\ndealerResult: " + dealerResult);
    result = getBlackJackStatus(playerResult, dealerResult);

    if (result == "") {
      console.log("Moving on to hit or stand..")
      gameMode = "hitOrStand"
    }

    if (isGameOver()) {
      gameMode = "shuffleDeck"
    }

    return announceResult(result);
  }


  if (gameMode == "hitOrStand") {
    playerMove = input
    card = dealCard()

    if (playerMove == "h") {
      playerHand.push(card)
    } else if (input == "s") {
      // do nothing
    } else {
      return "Please enter either 'h' or 's' to continue with the game."
    }

    gameMode = "dealerTurn"
    return `You drew ${card.name} of ${card.suit}.\n
    Wow, you're at ${getScore(playerHand)} right now! It's the dealer's turn now..`
  }

  if (gameMode == "dealerTurn") {
    if (getScore(dealerHand) < 17) {
      dealerHand.push(dealCard())
    }

    console.log("playerResult: " + getScore(playerHand) + "\ndealerResult: " + getScore(dealerHand));

    if (isGameOver()) {
      gameMode = "gameEnd"
      return "The game has ended. Click the submit button to view the results.."
    }

    gameMode = "hitOrStand"
    return `Wow, you're at ${getScore(playerHand)} right now!<br>
    Dealer has these cards (with one faced down): ${listAllCardsExceptOne(dealerHand)}.<br>
    Do you want to hit or stand? Type h for hit or s for stand.`
  }

  if (gameMode == "gameEnd") {
    playerScore = getScore(playerHand)
    dealerScore = getScore(dealerHand)
    result = determineResult(playerScore,dealerScore)

    gameMode = "promptNewGame"
    return `Player's score: ${playerScore}.&nbsp;
    Dealer's score: ${dealerScore}.&nbsp;
    Result: ${result}&nbsp;`
  }

};


var getBlackJackStatus = function(playerResult,dealerResult) {
  result = "";

  if (playerResult == 21 && dealerResult == 21) {
    result = "tie";
  } else {
    if (playerResult == 21) {
      result = "playerWin"
    }
    if (dealerResult == 21) {
      result = "dealerWin";
    }
  }

  return result;
}


var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var dealCard = function() {
  return cardDeck.pop()
}


var getScore = function(hand) {
  sum = 0;
  countedAce = false;

  // get sum of other cards before determining value of ace
  for (let i = 0; i < hand.length; i++) {
    currentCard = hand[i].name
    if (currentCard != "ace") {
      // J,Q,K have a value of 10
      if (currentCard == "jack" || currentCard == "queen" || currentCard == "king") {
        sum += 10
      } else {
        sum += hand[i].rank
      }
    } 
  }

  // determine value of ace 
  for (let i = 0; i < hand.length; i++) {
    currentCard = hand[i].name
    if (currentCard == "ace" && sum + 11 <= 21 && countedAce == false) {
      sum += 11
      countedAce = true
    } else if (currentCard == "ace") {
      sum += 1
    }
  }

  return sum
}

var announceResult = function(result) {
  displayScore = `Player's score: ${getScore(playerHand)}\nDealer's score: ${getScore(dealerHand)}\n`
  announcement = displayScore

  if (result == "tie") {
    announcement += "Player ties with dealer"
  } else if (result == "playerWin") {
    announcement += "Player wins!"
  } else if (result == "dealerWin") {
    announcement += "Dealer wins!"
  } else {
    announcement = `Wow, you're at ${getScore(playerHand)} right now! Do you want to hit or stand? Type h for hit or s for stand.`
  }

  return announcement
}

var isGameOver = function() {
  var gameover = false;

  if (getScore(playerHand) >= 21 || getScore(dealerHand) >= 21) {
    gameover = true
  }

  if (getScore(dealerHand) >= 17 && playerMove == "s") {
    gameover = true
  }

  return gameover
}


var determineResult = function() {
  playerScore = getScore(playerHand);
  dealerScore = getScore(dealerHand);

  // both bust
  if (playerScore > 21 && dealerScore > 21) {
    return "Both player and dealer bust!"
  } 

  if (playerScore > 21) {
    return "Player busts. It's the dealer's win!"
  }  

  if (dealerScore > 21) {
    return "Dealer busts. It's your win!"
  }

  if (playerScore == dealerScore || (playerScore == 21 && dealerScore == 21)) {
    return "It's a tie!"
  }

  if (playerScore == 21) {
    return "Player wins with a blackjack!"
  }

  if (dealerScore == 21) {
    return "Dealer wins with a blackjack!"
  }

  if (playerScore > dealerScore) {
    return "Player wins!"
  }

  if (dealerScore > playerScore) {
    return "Dealer wins"
  }

}

var listAllCardsExceptOne = function(hand) {
  handInfo = []
  for (var i = 0; i < hand.length; i++) {
    // hide first card
    if (i != 0) {
      handInfo.push(`${hand[i].name} of ${hand[i].suit}`)
    }
  }
  console.log(handInfo)
  return handInfo.join()
}