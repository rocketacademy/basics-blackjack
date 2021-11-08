var cardDeck;
var playerHand = [];
var playerScore = 0;
var dealerHand = [];
var playerWallet = 100;
var playerBet = 0;
var REPLAY_MSG_SHOW_WALLET = `<br>Place another bet and click Submit to play another round<br><br>You now have $`;
var gameMode = "firstdeal"; // 'playerhitorstand' // 'dealerturn'

var main = function (input) {
  //validation for betting amount
  if (gameMode == "firstdeal") {
    if (Number.isNaN(Number(input)) || !input || input < 0) {
      return `Please input your bet, you have $${playerWallet}`;
    }
    if (input > playerWallet) {
      return `Oops, not enough moolah, you have $${playerWallet}`;
    }
    //store the bet amount and decrease wallet by that
    playerBet = Number(input);
    playerWallet -= playerBet;
    //initialise game round with empty hands and zero score
    playerHand = [];
    playerScore = 0;
    dealerHand = [];
    //create a shuffled deck of 52 cards
    cardDeck = shuffleCards(makeDeck());
    //firstDealCards adds 2 cards to all players' hand and returns the result of the first deal and any possible blackjack scenarios
    var myOutputValue = `Your bet is $${playerBet}<br><br>` + firstDealCards();
    myOutputValue += `<br><br>You now have $${playerWallet}`;
    return myOutputValue;
  }

  if (gameMode == "playerhitorstand") {
    //input validation for the player's hit or stand decision
    if (!(input == "h" || input == "s")) {
      return `Your current hand is<br>${displayHand(
        playerHand
      )}Please type h to hit or s to stand`;
    }
    if (input == "h") {
      var newPlayerCard = cardDeck.pop();
      //deal a new card into player hand
      playerHand.push(newPlayerCard);
      var displayPlayerHands = `You currently have these cards:<br>
      ${displayHand(playerHand)}`;
      playerScore = findScoreOfHand(playerHand);
      //scenario where player got bust
      if (playerScore > 21) {
        gameMode = "dealerturn";
        return (
          displayPlayerHands +
          `<br>Your current score is ${playerScore}<br>I am sorry, you bust, click Submit to pass the turn to the dealer`
        );
      }
      //if not bust, ask player if he wants to proceed with hit or stand
      return (
        displayPlayerHands +
        `<br>Your current score is ${playerScore}<br>Do you want to hit (Type h) or stand (Type s)?`
      );
    }
    if (input == "s") {
      //show the player score and pass the turn to dealer
      gameMode = "dealerturn";
      return `You decided to stand. Your current score is ${playerScore}, click Submit to pass the turn to the dealer`;
    }
  }

  if (gameMode == "dealerturn") {
    var dealerScore = findScoreOfHand(dealerHand);
    // dealer will keep drawing new card if it scores less than 17
    while (dealerScore < 17) {
      var newDealerCard = cardDeck.pop();
      dealerHand.push(newDealerCard);
      dealerScore = findScoreOfHand(dealerHand);
    }
    var displayDealerHands = `The dealer has these cards:<br>
    ${displayHand(dealerHand)}`;

    if (dealerScore > 21) {
      //end the game if dealer busts by returning to initial game mode
      gameMode = "firstdeal";
      //tie scenario where dealer bust with player
      if (playerScore > 21) {
        playerWallet += playerBet;
        return (
          displayDealerHands +
          `<br>The dealer bust together with you with score of ${dealerScore}${REPLAY_MSG_SHOW_WALLET}${playerWallet}`
        );
      }
      //scenario where only dealer bust and player wins the bet
      playerWallet += playerBet * 2;
      return (
        displayDealerHands +
        `<br>You won as the dealer bust with score of ${dealerScore}${REPLAY_MSG_SHOW_WALLET}${playerWallet}`
      );
    }

    //scenario where only player bust
    if (playerScore > 21) {
      gameMode = "firstdeal";
      return (
        displayDealerHands +
        `<br>The dealer won as you got bust just now!${REPLAY_MSG_SHOW_WALLET}${playerWallet}`
      );
    }
    //store both players' scores
    displayDealerHands += `<br>You scored ${playerScore}. The dealer scored ${dealerScore}<br>`;
    //various non-bust scenarios
    if (dealerScore > playerScore) {
      displayDealerHands += "The dealer won!";
    }
    if (dealerScore == playerScore) {
      playerWallet += playerBet;
      displayDealerHands += "You tied with the dealer";
    }
    if (dealerScore < playerScore) {
      playerWallet += playerBet * 2;
      displayDealerHands += "You won!!";
    }
    //end the game by returning to initial game mode
    gameMode = "firstdeal";
    return `${displayDealerHands}${REPLAY_MSG_SHOW_WALLET}${playerWallet}`;
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
      var points = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        points = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        points = 10;
      } else if (cardName == 13) {
        cardName = "king";
        points = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: points,
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
//converts suit name into its image emoji
var suitImage = function (suitName) {
  if (suitName == "hearts") {
    image = "♥️";
  }
  if (suitName == "diamonds") {
    image = "♦️";
  }
  if (suitName == "clubs") {
    image = "♣️";
  }
  if (suitName == "spades") {
    image = "♠️";
  }
  return image;
};

var firstDealCards = function () {
  var REPLAY_MSG =
    "<br>Place another bet and click Submit to play another round";
  //deal 2 cards to player
  playerHand[0] = cardDeck.pop();
  playerHand[1] = cardDeck.pop();
  //deal 2 cards to dealer
  dealerHand[0] = cardDeck.pop();
  dealerHand[1] = cardDeck.pop();

  var dealerScore = findScoreOfHand(dealerHand);
  playerScore = findScoreOfHand(playerHand);

  var displayDealerHands = `Dealer has<br>${displayHand(dealerHand)}<br>`;

  var displayDealerHandsOneFaceDown = `Dealer has<br>
  ${displayHand([dealerHand[0]])}and one face down card<br><br>`;

  var displayPlayerHands = `You have<br>${displayHand(playerHand)}`;

  //end the game if dealer gets blackjack or if both dealer and player blackjack
  if (playerScore == 21 && dealerScore == 21) {
    gameMode = "firstdeal";
    playerWallet += playerBet;
    return `${displayDealerHands}${displayPlayerHands}<br>Holy Moly, both of you got blackjack!${REPLAY_MSG}`;
  }
  if (dealerScore == 21) {
    gameMode = "firstdeal";
    return `${displayDealerHands}${displayPlayerHands}<br>The dealer won by black jack!${REPLAY_MSG}`;
  }
  //end the game if player got black jack
  if (playerScore == 21) {
    playerWallet += playerBet * 2.5;
    gameMode = "firstdeal";
    //return (displayHands += `<br>You won by black jack!${REPLAY_MSG}`);
    return `${displayDealerHandsOneFaceDown}${displayPlayerHands}<br>You won by black jack!${REPLAY_MSG}`;
  }

  gameMode = "playerhitorstand";
  return `${displayDealerHandsOneFaceDown}${displayPlayerHands}<br>Your current score is ${playerScore}<br>Do you want to hit (Type h) or stand (Type s)?`;
};
//prints all the cards in a given hand
var displayHand = function (hand) {
  var printHands = "";
  for (var cardCount = 0; cardCount < hand.length; cardCount++) {
    printHands += `${hand[cardCount].name} of ${suitImage(
      hand[cardCount].suit
    )}<br>`;
  }
  return printHands;
};
//finds the score of a given hand
var findScoreOfHand = function (hand) {
  var score = 0;
  //tracker for any ace card which got assigned higher value of 11
  var numLargeAce = 0;

  for (var cardCount = 0; cardCount < hand.length; cardCount++) {
    score += hand[cardCount].rank;
    //Increment the Ace value by 10 if it does not bust player's hand
    if (hand[cardCount].rank == 1 && score + 10 <= 21) {
      score += 10;
      numLargeAce = 1;
    }
    //Decrease any large Ace value by 10 to prevent bust
    if (numLargeAce == 1 && score > 21) {
      score -= 10;
      numLargeAce = 0;
    }
  }
  return score;
};
