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

// mode for placing bet
var PLACE_BET = "place bet";
// track player points (start from 100) and player bet
var playerPts = Number(100);
var playerBet;

// initialise game mode to start with place bet
var gameMode = PLACE_BET;
// default message for hit/stand
var hitOrStandMsg = `Please input "hit" (to draw another card from deck) or "stand" (to not draw any card).`;

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

// Convert the word representation of a suit to the suit's emoji
var convertSuitWordToEmoji = function (suitWord) {
  if (suitWord == "spades") {
    return "♠️";
  }
  if (suitWord == "hearts") {
    return "♥️";
  }
  if (suitWord == "clubs") {
    return "♣️";
  }
  if (suitWord == "diamonds") {
    return "♦️";
  }
  // If we reach here, we entered an invalid suit
  return "Invalid Suit!";
};

// to return a string of ranks and suits of cards in the input cards array
var printCards = function (cards) {
  var returnString = "";
  // Iterate until cards.length - 1 to avoid the extra comma at the end of return string
  for (var i = 0; i < cards.length - 1; i += 1) {
    var currCard = cards[i];
    returnString += `${currCard.name} of ${convertSuitWordToEmoji(
      currCard.suit
    )} | `;
  }
  var lastCard = cards[cards.length - 1];
  returnString += `${lastCard.name} of ${convertSuitWordToEmoji(
    lastCard.suit
  )}`;
  // notify that player and/or dealer total card value has busted
  if (sumOfCardsVal(cards) > 21) {
    returnString += " Busted!";
  }
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

// function to display 1 card for dealer
var cardsMsgPartial = function (playerHand, computerHand) {
  var playerHandVal = sumOfCardsVal(playerHand);
  var message = `Player cards: ${printCards(
    playerHand
  )} <br> Total value: ${playerHandVal} <br><br> Dealer cards: ${
    computerHand[0].name
  } of ${convertSuitWordToEmoji(computerHand[0].suit)} | Covered`;
  return message;
};

// function to sum cards' value
var sumOfCardsVal = function (cardArray) {
  var cardsVal = 0;
  // checking number of ace in hand
  var aceCounter = 0;
  for (i = 0; i < cardArray.length; i += 1) {
    var currCard = cardArray[i];
    if (currCard.name == "ace") {
      aceCounter += 1;
    }
    cardsVal += cardArray[i].value;
  }
  // check for the ace in hand
  // if total hand value > 21, reduce hand value by 10
  for (i = 0; i < aceCounter; i += 1) {
    if (cardsVal > 21) {
      cardsVal = cardsVal - 10;
      console.log(cardsVal);
    }
  }
  return cardsVal;
};

// display hints for hit/stand to player
var givePlayerHints = function (playerHand) {
  var hint = "";
  playerHandVal = sumOfCardsVal(playerHand);
  if (playerHandVal <= 16) {
    hint = `Try your luck by submitting "hit"!`;
  } else if (playerHandVal > 16 && playerHandVal < 21) {
    hint = `You are close to 21. Consider to "stand"`;
  } else if (playerHandVal == 21) {
    hint = `Your hand value is 21! Submit "stand" to see result!`;
  } else if (playerHandVal > 21) {
    hint = `Oops, you have busted. Submit "stand" to see result!`;
  }
  return hint;
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
    playerPts += playerBet;
    return `<br><br> Player won! Total points: ${playerPts}`;
  } // if player and computer hands have same sum/blackjack/bust, it's a tie
  if (
    playerHandVal == computerHandVal ||
    (isBlackjack(playerHand) && isBlackjack(computerHand)) ||
    (playerHandVal > 21 && computerHandVal > 21)
  ) {
    return `<br><br> It's a tie! Total points: ${playerPts}`;
  } // if not win/tie, player lost
  playerPts -= playerBet;
  return `<br><br> Player lost! Total points: ${playerPts}`;
};

var main = function (input) {
  // game mode for placing bet
  if (gameMode == PLACE_BET) {
    if (input == "") {
      return `Please input a number of points to bet.`;
    }
    //else user inputs number to bet
    playerBet = Number(input);
    console.log(`player bet: ${playerBet}`);

    // input validation: if input is not number
    if (Number.isNaN(playerBet)) {
      return `Invalid input. Please input a number to bet.`;
    }
    //if player bet is number input, then switch to deal cards mode
    gameMode = DEAL_CARDS;
  }

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

    // sum up and display cards' value for player and 1 card for computer
    outputMessage = cardsMsgPartial(playerHand, computerHand);

    // switch game mode to choose hit or stand
    gameMode = HIT_OR_STAND;

    // if blackjack, determine winner
    // user clicks submit to restart game
    if (isBlackjack(playerHand) && !isBlackjack(computerHand)) {
      gameMode = PLACE_BET;
      outputMessage = cardsMessage(playerHand, computerHand);
      playerPts += playerBet;
      return `${outputMessage} <br><br> Player won by Blackjack! Total points: ${playerPts} <br><br> Click submit to play again!`;
    }
    if (!isBlackjack(playerHand) && isBlackjack(computerHand)) {
      gameMode = PLACE_BET;
      outputMessage = cardsMessage(playerHand, computerHand);
      playerPts -= playerBet;
      return `${outputMessage} <br><br> Dealer won by Blackjack! Total points: ${playerPts} <br><br> Click submit to play again!`;
    }
    if (isBlackjack(playerHand) && isBlackjack(computerHand)) {
      gameMode = PLACE_BET;
      outputMessage = cardsMessage(playerHand, computerHand);
      return `${outputMessage} <br><br> It's a Blackjack tie! Total points: ${playerPts} <br><br> Click submit to play again!`;
    }
    return `${outputMessage} <br><br> ${hitOrStandMsg} <br><br>${givePlayerHints(
      playerHand
    )}`;
  }

  // if player sum less than 21, player to type hit OR stand and submit
  if (gameMode == HIT_OR_STAND) {
    if (input == "") {
      return `${outputMessage} <br><br> ${hitOrStandMsg} <br><br> ${givePlayerHints(
        playerHand
      )}`;
    }
    if (input == "hit") {
      // if playerHandVal is 21 or more, do not draw new card
      if (playerHandVal == 21 || playerHandVal > 21) {
        return `${outputMessage} <br><br> You should submit "stand" to see result.`;
      } // else if playerHandVal not yet 21, allow drawing of new card
      playerHand.push(shuffledDeck.pop());
      console.log(playerHand);
      playerHandVal = sumOfCardsVal(playerHand);
      console.log("player hand value: " + playerHandVal);
      outputMessage = cardsMsgPartial(playerHand, computerHand);
      return `${outputMessage} <br><br> ${hitOrStandMsg} <br><br> ${givePlayerHints(
        playerHand
      )}`;
    }
    if (input == "stand") {
      playerHandVal = sumOfCardsVal(playerHand);
      computerHandVal = sumOfCardsVal(computerHand);

      // after player decides hit/stand, dealer to hit if its hand sum less than 17.
      // loop such that if dealer hand sum => 17, no card will be drawn.
      while (computerHandVal < 17) {
        computerHand.push(shuffledDeck.pop());
        console.log(computerHand);
        computerHandVal = sumOfCardsVal(computerHand);
      }
      // compare player and dealer cards to determine outcome
      outputMessage =
        cardsMessage(playerHand, computerHand) +
        compareCards(playerHand, computerHand);
      // switch game mode to restart game
      gameMode = PLACE_BET;
      return `${outputMessage} <br><br> Click submit to play again!`;
    }
    // input validation
    else if (input != "hit" && input != "stand") {
      outputMessage = `${cardsMsgPartial(
        playerHand,
        computerHand
      )} <br><br> Invalid input. Please input "hit" or "stand" only.`;
    }
    return outputMessage;
  }
};
