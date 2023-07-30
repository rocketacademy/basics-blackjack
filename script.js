player1card = [];
dealerCard = [];
gameModeStart = "GAME MODE START";
gameMode = gameModeStart;

function main(input) {
  var outputMessage = "";

  if (gameMode === gameModeStart) {
    console.log("gamemode is:" + gameMode);
    outputMessage = draw2cards();
    //change gameMode for next player
    // gameMode = gameMode_CHOOSE_DICE;

    return outputMessage;
  }
}

// User clicks submit to deal cards - 1st time
function draw2cards() {
  for (counter = 0; counter < 2; counter += 1) {
    action = draw1Card();
  }
  outputMessage = `Player 1 card are ${player1card[0].name} ${player1card[0].suit} and ${player1card[1].name} ${player1card[1].suit}.<br> Dealer's card are ${dealerCard[0].name} ${dealerCard[0].suit} and ${dealerCard[1].name} ${dealerCard[1].suit}.`;

  return outputMessage;
}

var draw1Card = function () {
  // Shuffle Deck
  var deck = makeDeck();
  var shuffledDeck = shuffleCards(deck);
  /////take last card
  var player1 = shuffledDeck[shuffledDeck.length - 1];
  /////save card in array
  player1card.push(player1);
  /////remove the last card from the deck
  shuffledDeck.pop(shuffledDeck.length - 1);
  console.log("player 1 cards:" + player1card[0].name);

  /// For Dealer
  var dealer = shuffledDeck[shuffledDeck.length - 1];
  /////save card in array
  dealerCard.push(dealer);
  /////remove the last card from the deck
  shuffledDeck.pop(shuffledDeck.length - 1);
};

//console.log("Player1card:" + player1.name);

// console.log("Shuffled deck before removal:" + shuffledDeck.length);

// console.log("Shuffled deck afetr removal:" + shuffledDeck.length);
// console.log(player1card[0]);

// return player1.name;
// var player2 = shuffleDeck[getRandomIndex(52)];
// //console.log("Player2card:" + player2.name);
// player2card.push(player2);
// console.log(player2card[0]);

// player1output = `Player 1 cards are ${player1card[0]} and  ${player1card[1]}`;
// player2output = `Player 2 cards are ${player2card[0]} and  ${player2card[1]}`;

// return player1output < br > player2output;

// Cards are analysed for winning conditions

// cards are displayed to user

// User decides whether to hit or stand

// User's cards are analysed for winning/losing conditions

// Computer decides to hit or stand automatically based on game rules

// The game either ends or continues

/////
//USER DEALS 2 CARDS
//////
//pick a random card for player 1 and player 2

///////////
//// MAKE THE DECK
///////////
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

////////////
/////SHUFFLE THE DECK
/////////////
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
