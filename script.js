// Blackjack Project

/* RULES */

/* There will be two players. 
One human and one computer (for the Base solution).
The computer will always be the dealer.
Each player gets dealt two cards to start.
The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
The dealer has to hit if their hand is below 17.
Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
The player who is closer to, but not above 21 wins the hand.
*/

// Helper function to create a deck of cards using a loop

var makeDeck = function (cardDeck) {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    // rankCounter starts from 1, otherwise it would start from 0

    while (rankCounter <= 13) {
      var cardName = rankCounter;
      // set cardName as rankCounter. i.e. 2 of hearts will have 2 as name and 2 as rank
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      cardDeck.push(card);

      rankCounter += 1;
    }

    suitIndex += 1;
  }

  return cardDeck;
};

// Helper function to get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
// the length of card deck will be used as "max". Hence 42 cards is the total/max number of cards in the deck

// Helper function to shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// Helper function to add cards rank together
function sumCardsInArray(inputArray) {
  var outputSum = 0;
  for (let sumCounter = 0; sumCounter < inputArray.length; sumCounter += 1) {
    outputSum += inputArray[sumCounter];
  }
  return outputSum;
}

// Main function
var main = function (input) {
  var deck = makeDeck();
  var shuffledDeck = shuffleCards(deck);
  var dealerArr = [];
  var playerArr = [];
  var dealerHandArr = [];
  var playerHandArr = [];

  // for loop to draw cards
  for (let drawCardsCounter = 0; drawCardsCounter < 2; drawCardsCounter++) {
    dealerArr.push(shuffledDeck.pop());
    dealerHandArr.push(shuffledDeck.pop().rank);
    playerArr.push(shuffledDeck.pop());
    playerHandArr.push(shuffledDeck.pop().rank);
    // console.log(dealerArr, "this is the dealer's cards");
    // console.log(playerArr, "this is the player's cards");
    // console.log(dealerHandArr, "dealer hand array");
    // console.log(playerHandArr, "player hand arr");
  }

  // for loop to add cards
  var dealerSum = sumCardsInArray(dealerHandArr);
  var playerSum = sumCardsInArray(playerHandArr);
  console.log(dealerSum, "this is the sum of dealer's hand");
  console.log(playerSum, "this is the sum of player's hand");

  var myOutputValue = `This is the dealer's cards: ${dealerHandArr} and the total hand is ${dealerSum}. <br/> <br/> This is the player's cards: ${playerHandArr} and the total hand is ${playerSum} `;

  return myOutputValue;
};

// ideas: use a for loop to draw cards multiple times and push them into an array?

// Code Graveyard

// draw cards one by one (replaced by for loop)
// var dealerCard1 = shuffledDeck.pop();
// dealerArr.push(dealerCard1);
// dealerHandArr.push(dealerCard1.rank);
// var dealerCard2 = shuffledDeck.pop();
// dealerArr.push(dealerCard2);
// dealerHandArr.push(dealerCard2.rank);
// var playerCard1 = shuffledDeck.pop();
// playerArr.push(playerCard1);
// playerHandArr.push(playerCard1.rank);
// var playerCard2 = shuffledDeck.pop();
// playerArr.push(playerCard2);
// playerHandArr.push(playerCard2.rank);
