// 1. Deck is shuffled.
// 2. User clicks Submit to deal cards.
// 3. The cards are analysed for game winning conditions, e.g. Blackjack.
//    A Blackjack win. When either player or dealer draw Blackjack.
//    A tie. When both the player and dealer draw Blackjack
// 4. The cards are displayed to the user.
// 5. The user decides whether to hit or stand, using the submit button to submit their choice.
// 6. The user's cards are analysed for winning or losing conditions
// 7. The computer decides to hit or stand automatically based on game rules.
// 8. Comparing both hands and determining a winner. The possible scenarios are:
//    A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.
//    A tie. When both the player and dealer have the same total hand values

// Declare game modes
var gameStartMode = `game start`;
var drawCardsMode = `draw cards`;
var showResultsMode = `show results`;
var currentGameMode = gameStartMode;

// Declare variables to store player and dealer hands
var playerHand = [];
var dealerHand = [];

// Declare variable to hold deck of cards
var gameDeck = "empty at the start";

// 1. Deck is shuffled.
var makeDeck = function () {
  console.log(`control flow: start of makeDeck`);
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
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

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cards) {
  var currentIndex = 0;
  while (currentIndex < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var randomCard = cards[randomIndex];
    var currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cards;
};

var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

var checkBlackjack = function (handArray) {
  // Check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;

  // return is true if:
  // 1st card ace, 2nd card 10 or picture cards
  // 1st card 10 or picture cards, 2nd card ace
  // else return false
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

var totalCardsValue = function (handArray) {
  var totalHandValue = 0;

  // check all card values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      totalHandValue += 10;
    } else {
      totalHandValue += currentCard.rank;
    }
    index += 1;
  }
  return totalHandValue;
};

// 4. The cards are displayed to the user.
var showAllCards = function (playerHand, dealerHand) {
  var playerTotalCards = totalCardsValue(playerHand);
  var dealerTotalCards = totalCardsValue(dealerHand);

  // Player's card
  var playerCardsMessage = `Player got: ${playerTotalCards}<br>Player's cards:<br>`;
  var index = 0;
  while (index < playerHand.length) {
    playerCardsMessage = `${playerCardsMessage}  - ${playerHand[index].name} of ${playerHand[index].suit}<br>`;
    index += 1;
  }

  // Dealer's card
  var dealerCardsMessage = `Dealer got: ${dealerTotalCards}<br>Dealer's cards:<br>`;
  var index = 0;
  while (index < dealerHand.length) {
    dealerCardsMessage = `${dealerCardsMessage}  - ${dealerHand[index].name} of ${dealerHand[index].suit}<br>`;
    index += 1;
  }
  return playerCardsMessage + "<br>" + dealerCardsMessage;
};

var main = function (input) {
  var outputMessage = "";
  console.log("Current Game Mode = ", currentGameMode);

  // 2. User clicks Submit to deal cards.
  // click submit
  if (currentGameMode == gameStartMode) {
    // Create game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);

    //Deal 2 cards to player and dealer respectively
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("player hand ==> ");
    console.log(playerHand);
    console.log("dealer hand ==> ");
    console.log(dealerHand);

    // change to the next gameMode
    currentGameMode = drawCardsMode;

    //give an output message
    outputMessage =
      'You got your cards!<br><br>Click "Submit" to see your cards.';

    return outputMessage;
  }

  // 3. The cards are analysed for game winning conditions, e.g. Blackjack.
  // click submit
  if ((currentGameMode = drawCardsMode)) {
    // check for blackjack
    var playerHasBlackjack = checkBlackjack(playerHand);
    var dealerHasBlackjack = checkBlackjack(dealerHand);

    console.log("Player has Blackjack -> ", playerHasBlackjack);
    console.log("Dealer has Blackjack -> ", dealerHasBlackjack);

    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      // both player and dealer has blackjack ->
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage = `Both player and dealer got Blackjack!<br><br>It is a Blackjack tie!<br><br>${showAllCards(
          playerHand,
          dealerHand
        )}`;
      }

      // only player has blackjack -> player wins
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage = `Player got Blackjack!<br><br>You win!<br><br>${showAllCards(
          playerHand,
          dealerHand
        )}`;
      }

      // only dealer has blackjack -> dealer wins
      else {
        outputMessage = `Dealer got Blackjack!<br><br>You lose!<br><br>${showAllCards(
          playerHand,
          dealerHand
        )}`;
      }

      // no blackjack
    } else {
      outputMessage = "No Blackjack";
      console.log(outputMessage);

      // sum up the cards in player's and dealer's hand
      var playerTotalCards = totalCardsValue(playerHand);
      var dealerTotalCards = totalCardsValue(dealerHand);

      console.log("Player total cards -> ", playerTotalCards);
      console.log("Dealer total cards -> ", dealerTotalCards);

      // compare the cards
      // same value -> tie
      if (playerTotalCards == dealerTotalCards) {
        outputMessage = `It's a tie!<br><br>${showAllCards(
          playerHand,
          dealerHand,
          playerTotalCards,
          dealerTotalCards
        )}`;
      }

      // player value is higher -> player wins
      else if (playerTotalCards > dealerTotalCards) {
        outputMessage = `You win!<br><br>${showAllCards(
          playerHand,
          dealerHand,
          playerTotalCards,
          dealerTotalCards
        )}`;
      }

      // dealer value is higher -> player wins
      else {
        outputMessage = `You lose!<br><br>${showAllCards(
          playerHand,
          dealerHand,
          playerTotalCards,
          dealerTotalCards
        )}`;
      }

      // change to the next gameMode
      currentGameMode = showResultsMode;

      // give an output message
      return outputMessage;
    }
  }
  return outputMessage;
};
