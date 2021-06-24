//Base Features
//P1: Create a set of cards into an array
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = []; // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"]; // Loop over the suits array

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex]; // Loop from 1 to 13 to create all cards for a given suit // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12. // This is an example of a loop without an array.

    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter; // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name

      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      // Create a new card with the current name, suit, and rank
      //P1: Cards are objects containing (name,suit,rank)
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      }; // Add the new card to the deck

      cardDeck.push(card); // Increment rankCounter to iterate over the next rank

      rankCounter += 1;
    } // Increment the suit index to iterate over the next suit

    suitIndex += 1;
  } // Return the completed card deck

  return cardDeck;
};

//P1: Create a Function for shuffling the deck.
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length); // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex]; // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex]; // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard; // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  } // Return the shuffled deck
  return cardDeck;
};
var deck = shuffleCards(makeDeck());

//Global Variables
//Default Mode is player turn
var currentPlayer = "playerTurn";
//Player & Computer cards in an array
playerCards = [];
computerCards = [];

var main = function (input) {
  currentPlayer = "playerTurn";
  var deck = shuffleCards(makeDeck());
  var playerCounter = 0;
  var computerCounter = 0;

  //Deal 2 Cards each with deck.pop
  while (playerCounter < 2) {
    playerCard = deck.pop();
    playerCards.push(playerCard);
    playerCounter = playerCounter + 1;
  }
  //If player has drawn two cards, it is computer's turn to draw two cards
  if (playerCards.length == 2) {
    currentPlayer = "computerTurn";
    while (computerCounter < 2) {
      computerCard = deck.pop();
      computerCards.push(computerCard);
      computerCounter = computerCounter + 1;
    }
    //Change the rank of J,Q,K to be 10
    if (
      playerCards[0].name == "King" ||
      playerCards[0].name == "Queen" ||
      playerCards[0].name == "Jack"
    ) {
      playerCards[0].rank = 10;
    }
    if (
      playerCards[1].name == "King" ||
      playerCards[1].name == "Queen" ||
      playerCards[1].name == "Jack"
    ) {
      playerCards[1].rank = 10;
    }
    if (
      computerCards[0].name == "King" ||
      computerCards[0].name == "Queen" ||
      computerCards[0].name == "Jack"
    ) {
      computerCards[0].rank = 10;
    }
    if (
      computerCards[1].name == "King" ||
      computerCards[1].name == "Queen" ||
      computerCards[1].name == "Jack"
    ) {
      computerCards[1].rank = 10;
    }
    //Ace is 11 when Only 2 cards are drawn
    if (playerCards.length == 2) {
      if (playerCards[0].name == "Ace") {
        playerCards[0].rank = 11;
      }
      if (playerCards[1].name == "Ace") {
        playerCards[1].rank = 11;
      }
      if (computerCards.length == 2) {
        if (computerCards[0].name == "Ace") {
          computerCards[0].rank = 11;
        }
        if (computerCards[1].name == "Ace") {
          computerCards[1].rank = 11;
        }
      }
      //Determine player/compuyer results by adding the two
      var playerResult = playerCards[0].rank + playerCards[1].rank;
      var computerResult = computerCards[0].rank + computerCards[1].rank;
      console.log(playerResult);
      console.log(computerResult);

      //Display of cards to user & Default Game Result
      var gameResult =
        "You Lose!, You draw these 2 cards <br>" +
        playerCards[0].name +
        " of " +
        playerCards[0].suit +
        " and " +
        playerCards[1].name +
        " of " +
        playerCards[1].suit +
        "<br><br>Computer draw <br>" +
        computerCards[0].name +
        " of " +
        computerCards[0].suit +
        " and " +
        computerCards[1].name +
        " of " +
        computerCards[1].suit;
    }
    //Winning Condition without BlackJack
    if (playerResult > computerResult) {
      gameResult =
        "You Win!, You draw these 2 cards <br>" +
        playerCards[0].name +
        " of " +
        playerCards[0].suit +
        " and " +
        playerCards[1].name +
        " of " +
        playerCards[1].suit +
        "<br><br>Computer draw <br>" +
        computerCards[0].name +
        " of " +
        computerCards[0].suit +
        " and " +
        computerCards[1].name +
        " of " +
        computerCards[1].suit;
    }

    //BlackJack Auto win 21
    if (playerResult == 21) {
      gameResult = "Player BlackJack!";
    }
    if (computerResult == 21) {
      gameResult = "Computer BlackJack!";
    }
    if (playerResult == 21 && computerResult == 21) {
      gameResult = "BlackJack Draw!";
    }

    console.log("playerCards: ");
    console.log(playerCards);
    console.log("computerCards: ");
    console.log(computerCards);
    return gameResult;
  }
};

//Order:

//Display of cards to user
//User decide on standing or hitting, Submit 'hit' or 'stand', if user stands, it's computer turn
//Computer will hit if below 17, else will stand.
//Game ends with results and instructions restarts

//Extra trimmings

// P2: Add feature of Ace being 1 or 11
// P2: Add conditional for computer to hit
//
