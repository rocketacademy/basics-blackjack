// // created objects to store the player information
// var player = {
//   name: "player",
//   card: [],
//   score: 0,
// };
// var dealer = {
//   name: "dealer",
//   card: [],
//   score: 0,
// };
// var shuffledDeck = [];
// var round = 1;

// var confirmWinPlayer = {
//   name: "confirmWinPlayer",
//   card: [],
//   score: 21,
// };

// var main = function (input) {
//   var deck = makeDeck();
//   shuffledDeck = shuffleCards(deck);
//   var myOutputValue = "";

//   if (round == 1) {
//     // 1st round
//     playerMakeTurn();
//     dealerMakeTurn();
//     round = round + 1;
//   }

//   if (round == 2) {
//     // 2nd round
//     playerMakeTurn();
//     dealerMakeTurn();
//     round = round + 1;
//     var playerWins = checkBlackjack(player);
//     if (playerWins) {
//       myOutputValue = printUserCards(player);
//       myOutputValue += "You win.";
//       return myOutputValue;
//     }
//   }

//   myOutputValue = printUserCards(player);

//   // process the input = either hit or stand
//   if (input == "hit") {
//     playerMakeTurn();
//     var playerWins = checkBlackjack(player);

//     if (playerWins) {
//       myOutputValue = printUserCards(player);
//       myOutputValue += "You win.";
//       return myOutputValue;
//     } else {
//       var playerScoreAbove21 = checkUserScoreAbove21(player);
//       if (playerScoreAbove21) {
//         myOutputValue = printUserCards(player);
//         myOutputValue += "You lose.";
//         return myOutputValue;
//       } else {
//         myOutputValue = printUserCards(player);
//         return myOutputValue;
//       }
//     }
//   } else if (input == "stand") {
//     // compare dealer and player scores
//     checkWhetherDealerHitsOrStands();
//     var comparisonResult = compareUsers();
//     myOutputValue = printUserCards(player);
//     myOutputValue += "<br/>";
//     myOutputValue += printUserCards(dealer);
//     myOutputValue += "<br/>";
//     myOutputValue += comparisonResult;
//     return myOutputValue;
//   }

//   round = round + 1;
//   return myOutputValue;
// };

// // The user's cards are analysed for winning or losing conditions.
// // Come into this function everytime user selects "hit"
// // Also come into this function at first two rounds of giving cards
// var checkBlackjack = function (user) {
//   if (user.score == 21) {
//     return true;
//   } else {
//     return false;
//   }
// };

// // output user cards
// var printUserCards = function (user) {
//   myOutputValue = `${user.name} cards are: `;

//   for (var i = 0; i < user.card.length; i++) {
//     var myCard = user.card[i];
//     myOutputValue += myCard.name + " " + myCard.suit + " ";
//   }

//   return myOutputValue;
// };

// // Come into this function everytime user selects "hit"
// var checkUserScoreAbove21 = function (user) {
//   if (user.score > 21) {
//     return true;
//   } else {
//     return false;
//   }
// };

// // Come into this function only after user selects "stand"
// var compareUsers = function () {
//   if (player.score > dealer.score) {
//     // player wins
//     return "You win.";
//   } else {
//     // player loses
//     return "You lose.";
//   }
// };

// var playerMakeTurn = function () {
//   var dealtCard = dealCard(shuffledDeck);
//   player.card.push(dealtCard);
//   player.score += dealtCard.score;
// };

// var checkWhetherDealerHitsOrStands = function () {
//   if (dealer.score < 17) {
//     dealerMakeTurn();
//   }
// };

// var dealerMakeTurn = function () {
//   // since dealerMakeTurn is after playerMakeTurn, the shuffledDeck here is 1 less card
//   var dealtCard = dealCard(shuffledDeck);
//   dealer.card.push(dealtCard);
//   dealer.score += dealtCard.score;
// };

// var dealCard = function (deck) {
//   return deck.pop();
// };

// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

//There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

//Game modes
// Game start - default game mode
var gameStart = "game start";

// Game mode when cards are drawn (submit button is clicked)
var gameCardsDrawn = "cards drawn";

// Game mode when the results are shown
var gameResultsDrawn = "results shown";

//current game mode
var currentGameMode = gameStart;

// Arrays to store whats in the dealer and player's hands
var playerHand = [];
var dealerHand = [];

// Variable that holds the deck of cards
var gameDeck = "empty";

var main = function (input) {
  if (currentGameMode == gameStart) {
    //create the game deck
    gameDeck = createDeck();
    console.log(gameDeck);

    // deal 2 cards to player by taking one card out of the gameDeck and pushing it into the player's hand. Repeat twice.
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());

    // deal 2 cards to dealer
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    //progress the gameMode
    currentGameMode = gameCardsDrawn;

    // output message
    myOutputValue = `Everyone has drawn a card! Click on submit to show the results.`;
    return myOutputValue;
  }
  if (currentGameMode == gameCardsDrawn) {
    // check for blackjack
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);

    // its a TIE both player and dealer has blackjack
    // Player Wins only player has blackjack
    // Dealer Wins only dealer has blackjack
    if (playerHasBlackjack == true && dealerHasBlackjack == true) {
      myOutputValue = displayHands(playerHand, dealerHand) + "its a tie!";
    } else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
      myOutputValue = displayHands(playerHand, dealerHand) + "you win!";
    } else if (playerHasBlackjack == false && dealerHasBlackjack == true) {
      myOutputValue =
        displayHands(playerHand, dealerHand) +
        "sorry, maybe next time. dealer wins!";
    } else {
      // no blackjack -> game continues
      // add total hand value of player and dealer

      var playerHandValue = totalHandValue(playerHand);
      var dealerHandValue = totalHandValue(dealerHand);

      console.log("player hand value is ", playerHandValue);
      console.log("dealer hand value is ", dealerHandValue);
      // compare hand value of player vs dealer
      // Tie
      if (playerHandValue == dealerHandValue) {
        console.log("its a tie");
        myOutputValue = displayHands(playerHand, dealerHand) + "its a tie!";
      }
      // player has more
      if (playerHandValue > dealerHandValue) {
        console.log("player wins");
        myOutputValue = displayHands(playerHand, dealerHand) + "player wins!";
      }
      // dealer has more
      if (playerHandValue < dealerHandValue) {
        console.log("dealer wins");
        myOutputValue = displayHands(playerHand, dealerHand) + "dealer wins!";
      }
      // change game mode
      currentGameMode = gameResultsDrawn;
      // output
    }
    return myOutputValue;
  }
};

//function that displays the player and dealer hands
var displayHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = "Player hand: <br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "-" +
      playerHandArray[index].name +
      "of" +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  var dealerMessage = "Dealer hand: <br>";
  var index = 0;
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "-" +
      dealerHandArray[index].name +
      "of" +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};

// calculate the hand
var totalHandValue = function (handArray) {
  var handValue = 0;

  //create while loop to add up the card scores
  var index = 0;

  while (index < handArray.length) {
    var currentCard = handArray[index];

    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      handValue = handValue + 10;
    } else {
      handValue = handValue + currentCard.rank;
    }
    index = index + 1;
  }
  return handValue;
};

var checkForBlackjack = function (handArray) {
  // create variable to access the card
  var playerCard1 = handArray[0];
  var playerCard2 = handArray[1];
  var isBlackjack = false;

  if (
    (playerCard1 == "ace" && playerCard2 <= 10) ||
    (playerCard2 == "ace" && playerCard1 <= 10)
  ) {
    isBlackjack = true;
  }
  //if its no blackjack, it will be false
  return isBlackjack;
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
      var score = 0;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        score = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        score = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        score = 10;
      } else if (cardName == 13) {
        cardName = "king";
        score = 10;
      } else {
        score = cardName;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: score,
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

var createDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};
