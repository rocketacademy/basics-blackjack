/* Game rules 
----------------
There will be only two players. One human and one computer (for the Base solution).
The computer will always be the dealer.
Each player gets dealt two cards to start.
The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
The dealer has to hit if their hand is below 17.
Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
The player who is closer to, but not above 21 wins the hand.*/

// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

/*third part 
player decides whether to hit or stand 

1. if hit (game mode changes to deal another card), calculate sum of cards 
2. if stand (game mode remains), calculate sum of cards and decide who is the winner
*/

/* to check sum of cards- need a helper function*/

//1. to make a deck of cards
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

// to assign new key-value pair to the object in array - such that it will loop through the whole array and assign 10 to queen, jack and king
var assignValueToCards = function (newDeck) {
  var valueOfCard = 0;
  for (let i = 0; i < newDeck.length; i += 1) {
    if (newDeck[i].rank >= 11 && newDeck[i].rank <= 13) {
      valueOfCard = 10;
      newDeck[i].valueOfCard = 10;
    }
    if (newDeck[i].rank >= 2 && newDeck[i].rank <= 10) {
      valueOfCard = newDeck[i].rank;
      newDeck[i].valueOfCard = newDeck[i].rank;
    }
    //for ace card, the value can be 1 or 11 hence assign card value to an array of 2 values
    if (newDeck[i].rank == 1) {
      newDeck[i].valueOfCard = [1, 11];
    }
  }
  return newDeck;
};

var findSumOfHand = function (cards) {
  var index = 0;
  var sum = 0;
  for (let i = 0; i < cards.length; i += 1) {
    sum += cards[i].valueOfCard;
  }
  return sum;
};

//first make a deck of cards
var cardsDeck = [];
var shuffledDeck = [];
//then assign value to cards
var deckOfCards = [];
var blackJackMode = "blackJackMode";
var drawAnotherCard = "draws another card";
var gameStart = "start of the game, shuffle cards";
var gameMode = gameStart;
var playerCards = [];
var computerCards = [];

var sumOfPlayer = 0;
var sumOfComputer = 0;

//1. to deal 2 cards to dealer and player
//2. see whether there is a blackjack. if either there is a blackjack, game ends, display results
//3. else game continues, can continue to take card.
var checkSumOfInitialHand = function (cards) {
  for (let i = 0; i < cards.length; i += 1) {
    if (cards[i].name == "ace") {
      cards[i].valueOfCard = 11;
    }
  }
  //if initial hand contains ace, will be treated as 11 at first
  var sumOfHand = findSumOfHand(cards);
  if (sumOfHand == 21) {
    gameMode = blackJackMode;
  }
  return sumOfHand;
};

var drawCard = function () {
  var cardDrawn = shuffledDeck.pop();
  return cardDrawn;
};

var main = function (input) {
  if (input == "") {
    if (gameMode == gameStart) {
      cardsDeck = makeDeck();
      deckOfCards = assignValueToCards(cardsDeck);
      shuffledDeck = shuffleCards(deckOfCards);
      playerCards = deckOfCards.splice(0, 2);
      computerCards = deckOfCards.splice(0, 2);

      var outputMsg = `Player's hand is ${playerCards[1].name} of ${playerCards[1].suit} and ${playerCards[0].name} of ${playerCards[0].suit} <br> Computer's hand is ${computerCards[1].name} of ${computerCards[1].suit} and ${computerCards[0].name} of ${computerCards[1].suit}.`;

      console.log(playerCards);
      console.log(computerCards);

      sumOfPlayer = checkSumOfInitialHand(playerCards);
      sumOfComputer = checkSumOfInitialHand(computerCards);

      if (sumOfComputer < 17) {
        var computerNextCard = drawCard();
        computerCards.push(computerNextCard);
      }

      if (gameMode == blackJackMode) {
        gameMode = gameStart;
        if (sumOfPlayer == 21 && sumOfComputer == 21) {
          return `It is a tie! ${outputMsg} BlackJack for both`;
        }
        if (sumOfComputer == 21) {
          return `Dealer won! ${outputMsg} BlackJack!`;
        }
        if (sumOfPlayer == 21) {
          return `Player has won!${outputMsg} BlackJack!`;
        }
      } else
        return `${outputMsg} Player enter "hit" to continue drawing another card or "stand" to stop.`;
    }
  }
  if (input == "hit") {
    gameMode = drawAnotherCard;
    var playerNextCard = drawCard();
    playerCards.push(playerNextCard);
  }
};

//test
console.log(main(""));
console.log(main("hit"));
console.log(drawCard());

/* second part (after scenario 4)
1. need to set a game logic for computer to determine whether draw one more card 
if sum of number <= 16 -> draw 
2. if sum of number >=17 --> stand 
*/

//when player submit hits --> game mode changed to "deal one more card"
