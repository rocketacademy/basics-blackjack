//click submit to start
//generate deck
//assign cards to player and dealer
//check for blackjack
//show player 2 card and dealer first card
//player hit/stand
//dealer hit/stand
//output winner
//resetgame

//establishing player and dealer's card to clean slate
var gameState = "Click submit to start play Blackjack";
var playerCards = [];
var dealerCards = [];
var checkFor21 = "Checking for 21";

//set gamestate to gamePlay where cards will be assigned to player and dealer
var gamePlay = "";

var gameChoice = "Please submit hit/stand";
//set gamestate to gameEnd where winner is presented and option to start is shown
var gameEnd = "Click submit to reset and play Blackjack again";
//generate deck function
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
//to initialise cardDeck to be used
cardDeck = makeDeck();
//assign cards to player and dealer
var pickRandomNumber = function () {
  // Generate a decimal from 0 through 52, inclusive of 0 and exclusive of 52.
  var randomDecimal = Math.random() * 51;
  var randomNumber = Math.floor(randomDecimal) + 1;
  console.log("pickRandomNumber = " + randomNumber);
  return randomNumber;
};
//for loop to deal one card to the player and one card to the dealer on each iteration
var pickCardForPlayers = function () {
  var playerCardValue = 0;
  var dealerCardValue = 0;
  for (var i = 0; i < 2; i++) {
    var playerCard = cardDeck[pickRandomNumber()];
    var dealerCard = cardDeck[pickRandomNumber()];

    playerCards.push({
      name: playerCard.name,
      suit: playerCard.suit,
      rank: playerCard.rank,
    });

    dealerCards.push({
      name: dealerCard.name,
      suit: dealerCard.suit,
      rank: dealerCard.rank,
    });

    // Calculate player score
    var playerCardValue = playerCard.rank;
    if (playerCardValue > 10) {
      playerCardValue = 10;
    }
    playerScore += playerCardValue;

    // Calculate dealer score
    var dealerCardValue = dealerCard.rank;
    if (dealerCardValue > 10) {
      dealerCardValue = 10;
    }
    dealerScore += dealerCardValue;
  }

  return (
    "Player cards picked: " +
    playerCards[0].name +
    " of " +
    playerCards[0].suit +
    ", " +
    playerCards[1].name +
    " of " +
    playerCards[1].suit +
    "\nDealer cards picked: " +
    dealerCards[0].name +
    " of " +
    dealerCards[0].suit +
    ", [Hidden Card]"
  );
};

console.log("sss" + dealerCardValue + playerCardValue);

var hit = function (playerInput) {
  if (playerInput == "hit") {
    var card = cardDeck[pickRandomNumber()];
    playerCards.push({
      name: card.name,
      suit: card.suit,
      rank: card.rank,
    });
  }
  return "You drew the " + card.name + " of " + card.suit;
};
console.log(pickCardForPlayers());

var main = function (input) {
  console.log("The current game state is = " + gameState);
  if ((gameState = gamePlay)) {
    gameState = checkFor21;
  }
  if ((gameState = checkFor21)) {
    for (var i = 0; i < playerCards.length; i++) {
      var cardValue = playerCards[i].rank;
      if (cardValue == 13 || cardValue == 12 || cardValue == 11) {
        cardValue = 10;
      } else if (cardValue === 1) {
        if (totalValue + 11 <= 21) {
          cardValue = 11;
        } else {
          cardValue = 1;
        }
      }
      totalValue += Number(cardValue);
    }
    if (totalValue == 21) {
      return true;
    } else {
      return false;
    }
  }
  if ((checkFor21 = false)) {
    gameState = gameChoice;
    myOutputValue = "Please enter hit or stand";
    if (input == "hit") {
      myOutputValue = "you drew" + hit();
      playerScore = +hit();
    }
  } else if (input == "stand") {
  } else {
    myOutputValue = "You got Blackjack!";
    return myOutputValue;
  }

  var myOutputValue = pickRandomNumber();
  return myOutputValue;
};
