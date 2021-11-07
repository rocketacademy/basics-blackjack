/**
 * Blackjack - Base game
 */

/**
 Rules:
 1. Player plays against computer.
 2. The computer will always be the dealer.
 3. Each player gets dealt two cards to start.
 4. The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
 5. The dealer has to hit if their hand is below 17.
 6. Each players' score is the total of their card ranks. 
    i) Jacks/Queen/Kings are 10.
    ii) Aces can be 1 or 11.
 7. The player who is closer to, but not above 21 wins the hand.
 */

// track player and computer/dealer's cards
var playerHand = [];
var computerHand = [];

// track player and computer's total card values
var playerHandVal;
var computerHandVal;
var shuffledDeck;
var outputMessage = "";

// game modes
var DEAL_CARDS = "deal cards";
var HIT_OR_STAND = "choose hit or stand";

// initialise game mode to start with deal cards
var gameMode = DEAL_CARDS;

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in the deck
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    //console.log(`current suit: ${currentSuit}`);

    // Loop from 1 to 13 to create all cards for a given suit
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

      // to set jack/queen/king as card value 10
      if (cardName == "jack" || cardName == "queen" || cardName == "king") {
        var cardVal = 10;
      } // initialise ace as value 11
      else if (cardName == "ace") {
        cardVal = 11;
      } else if (cardName < 11) {
        // card value for number cards are same as rank
        cardVal = rankCounter;
      }

      // Create a new card with the current name, suit, rank and value
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardVal,
      };
      //console.log(`rank: ${rankCounter}`);
      //console.log(`card value: ${cardVal}`);
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

// Shuffle the elements in the card deck array
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

// to return a string of ranks and suits of cards in the input cards array
var printCards = function (cards) {
  var returnString = "";
  // Iterate until cards.length - 1 to avoid the extra comma at the end of return string
  for (var i = 0; i < cards.length - 1; i += 1) {
    var currCard = cards[i];
    returnString += `${currCard.name} of ${currCard.suit}, `;
  }
  var lastCard = cards[cards.length - 1];
  returnString += `${lastCard.name} of ${lastCard.suit}`;
  return returnString;
};

// function to display default message for player and computer/dealer cards
var cardsMessage = function (playerHand, computerHand) {
  var playerHandVal = sumOfCardsVal(playerHand);
  var computerHandVal = sumOfCardsVal(computerHand);
  var message = `Player cards: ${printCards(
    playerHand
  )} <br> Total value: ${playerHandVal} <br><br> Dealer cards: ${printCards(
    computerHand
  )} <br> Total value: ${computerHandVal}`;
  return message;
};

// function to sum cards' value
var sumOfCardsVal = function (cardArray) {
  var cardsVal = 0;
  for (i = 0; i < cardArray.length; i += 1) {
    cardsVal += cardArray[i].value;
  }
  return cardsVal;
};

// check if cards are blackjack
var isBlackjack = function (handArr) {
  return sumOfCardsVal(handArr) == 21 && handArr.length == 2;
};

// if not blackjack,
// compare player and dealer cards to check win/tie/lose
var compareCards = function (playerHand, computerHand) {
  playerHandVal = sumOfCardsVal(playerHand);
  computerHandVal = sumOfCardsVal(computerHand);

  // if playerHand sum > computerHand sum And within 21, OR computer busts, player wins
  if (
    (playerHandVal <= 21 && playerHandVal > computerHandVal) ||
    (playerHandVal <= 21 && computerHandVal > 21)
  ) {
    return `<br><br> Player won!`;
  } // if player and computer hands have same sum/blackjack/bust, it's a tie
  if (
    playerHandVal == computerHandVal ||
    (isBlackjack(playerHand) && isBlackjack(computerHand)) ||
    (playerHandVal > 21 && computerHandVal > 21)
  ) {
    return `<br><br> It's a tie!`;
  } // if not win/tie, player lost
  return `<br><br> Player lost!`;
};

var main = function (input) {
  if (gameMode == DEAL_CARDS) {
    // shuffle deck and save it in a new variable shuffledDeck
    var cardDeck = makeDeck();
    shuffledDeck = shuffleCards(cardDeck);
    // user clicks submit to deal cards
    // computer gets 2 cards
    // player gets 2 cards
    playerHand = [shuffledDeck.pop(), shuffledDeck.pop()];
    computerHand = [shuffledDeck.pop(), shuffledDeck.pop()];

    ///this is for testing
    // playerHand = [
    //   { name: "queen", suit: "spades", rank: 12, value: 10 },
    //   { name: "ace", suit: "diamonds", rank: 1, value: 11 },
    // ];
    console.log("player hand");
    console.log(playerHand);

    // sum up cards' value for player and computer
    outputMessage = cardsMessage(playerHand, computerHand);
    // switch game mode to choose hit or stand
    gameMode = HIT_OR_STAND;

    // if blackjack, determine winner
    // user clicks submit to restart game
    if (isBlackjack(playerHand) && !isBlackjack(computerHand)) {
      gameMode = DEAL_CARDS;
      return `${outputMessage} <br><br> Player won by Blackjack! <br><br> Click submit to play again!`;
    }
    if (!isBlackjack(playerHand) && isBlackjack(computerHand)) {
      gameMode = DEAL_CARDS;
      return `${outputMessage} <br><br> Dealer won by Blackjack! <br><br> Click submit to play again!`;
    }
    if (isBlackjack(playerHand) && isBlackjack(computerHand)) {
      gameMode = DEAL_CARDS;
      return `${outputMessage} <br><br> It's a Blackjack tie! <br><br> Click submit to play again!`;
    }
  }
  // if player sum less than 21, player to type hit OR stand and submit
  if (gameMode == HIT_OR_STAND) {
    var hitOrStandMsg = `Please input "hit" (to draw another card from deck) or "stand" (to not draw any card).`;
    if (input == "") {
      return `${outputMessage} <br> ${hitOrStandMsg}`;
    }
    if (input == "hit") {
      playerHand.push(shuffledDeck.pop());
      console.log(playerHand);
      playerHandVal = sumOfCardsVal(playerHand);
      console.log("player hand value: " + playerHandVal);
      outputMessage = cardsMessage(playerHand, computerHand);
      return `${outputMessage} <br> ${hitOrStandMsg}`;
    }
    if (input == "stand") {
      playerHandVal = sumOfCardsVal(playerHand);
      computerHandVal = sumOfCardsVal(computerHand);

      // compare player and dealer cards to determine outcome
      outputMessage =
        cardsMessage(playerHand, computerHand) +
        compareCards(playerHand, computerHand);
      // switch game mode to restart game
      gameMode = DEAL_CARDS;
      return `${outputMessage} <br><br> Click submit to play again!`;
    }
    // input validation
    else {
      outputMessage = `Invalid input. Please input "hit" or "stand" only. <br><br> ${cardsMessage(
        playerHand,
        computerHand
      )}`;
    }
    return outputMessage;
  }
};
