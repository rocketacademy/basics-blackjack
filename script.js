// Base
// Gameplay Description
// The main function runs on each player's turn. The sequence of actions in the game might be the following.
// Deck is shuffled. - done
// User clicks Submit to deal cards. - done
// The cards are analysed for game winning conditions, e.g. Blackjack. - done
// The cards are displayed to the user. - done
// The user decides whether to hit or stand, using the submit button to submit their choice. - done
// The user's cards are analysed for winning or losing conditions. - done
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

// declare game state
var gameState1 = "game start";
var gameState2 = "cards dealt";
var gameState3 = "hit or stand";
var currentGameState = gameState1;

// store player's and dealer's hand
var playerHand = [];
var dealerHand = [];

// initialize deck
var deckConstruct = "";

// a deck of cards
var deckBuilder = function () {
  var cards = [];
  var suits = ["spades", "hearts", "clubs", "diamonds"];
  for (var i = 0; i < suits.length; i += 1) {
    for (var j = 1; j <= 13; j += 1) {
      var cardsObject = {
        name: j,
        suit: suits[i],
        value: j,
      };
      if (j == 1) {
        cardsObject.name = "ace";
      } else if (j == 11) {
        cardsObject.name = "jack";
      } else if (j == 12) {
        cardsObject.name = "queen";
      } else if (j == 13) {
        cardsObject.name = "king";
      }
      cards.push(cardsObject);
    }
  }
  return cards;
};

// deck is shuffled
var shuffleDeck = function (deck) {
  for (var i = 0; i < deck.length; i += 1) {
    var shuffle = Math.floor(Math.random() * deck.length);
    // save value of deck[i] to a temp variable
    var temp = deck[i];
    // put the value of deck[shuffle] in deck[i]
    deck[i] = deck[shuffle];
    // restore the value that was in deck[i] to deck[shuffle]
    deck[shuffle] = temp;
    // ignore the value of temp
  }
  return deck;
};

// a deck of cards that's been shuffled
var shuffled = function () {
  return shuffleDeck(deckBuilder());
};

// user clicks submit to deal cards.
var dealCards = function () {
  var outputMessage = "";
  deckConstruct = shuffled();
  console.log(`shuffling deck . . .`);
  console.log(deckConstruct);
  for (var i = 0; i < 2; i += 1) {
    var player = deckConstruct.pop();
    var dealer = deckConstruct.pop();
    playerHand.push(player);
    dealerHand.push(dealer);
  }
  console.log(`player's hand:`);
  console.log(playerHand);
  console.log(`dealer's hand:`);
  console.log(dealerHand);
  return outputMessage;
};

// check hand for blackjack (21 points on first two cards)
var checkForBlackjack = function (card) {
  var cardIndexOne = card[0];
  var cardIndexTwo = card[1];
  var blackjack = false;
  if (
    (cardIndexOne.name == "ace" && cardIndexTwo.value >= 10) ||
    (cardIndexOne.value >= 10 && cardIndexTwo.name == "ace")
  ) {
    blackjack = true;
  }
  return blackjack;
};

// win by natural blackjack (21 points on first two cards)
var blackjackWin = function () {
  var playerBlackjack = checkForBlackjack(playerHand);
  var dealerBlackjack = checkForBlackjack(dealerHand);
  var outputMessage = "";
  if (playerBlackjack == true || dealerBlackjack == true) {
    if (playerBlackjack == true && dealerBlackjack == true) {
      outputMessage = `${showHand(playerHand, dealerHand)}blackjack draw<br>`;
    } else if (playerBlackjack == false && dealerBlackjack == true) {
      outputMessage = `${showHand(
        playerHand,
        dealerHand
      )}dealer wins by blackjack<br>`;
    } else {
      outputMessage = `${showHand(
        playerHand,
        dealerHand
      )}player wins by blackjack<br>`;
    }
  } else {
    outputMessage = `${showHand(
      playerHand,
      dealerHand
    )}there is no blackjack<br>`;
  }
  return outputMessage;
};

// sum up individual's hand
var checkHandTotalValue = function (hand) {
  var handCounter = 0;
  for (i = 0; i < hand.length; i += 1) {
    var j = hand[i];
    if (j.name == "jack" || j.name == "queen" || j.name == "king") {
      handCounter += 10;
    } else if (j.name == "ace") {
      handCounter += 11;
    } else {
      handCounter += j.value;
    }
  }
  return handCounter;
};

// win by hand value without exceeding 21 points
var normalWin = function (input) {
  var outputMessage = "";
  if (input == "z") {
    playerHand.push(deckConstruct.pop());
    outputMessage = `${showHand(
      playerHand,
      dealerHand
    )}card drawn from pile.<br>input: "z" - hit or "x" - stand`;
  } else if (input == "x") {
    var playerHandTotalValue = checkHandTotalValue(playerHand);
    var dealerHandTotalValue = checkHandTotalValue(dealerHand);
    if (playerHandTotalValue == dealerHandTotalValue) {
      outputMessage = `${showHand(
        playerHand,
        dealerHand
      )}it's a tie<br> ${showHandValue(
        playerHandTotalValue,
        dealerHandTotalValue
      )}`;
    } else if (playerHandTotalValue < dealerHandTotalValue) {
      outputMessage = `${showHand(
        playerHand,
        dealerHand
      )}dealer wins<br> ${showHandValue(
        playerHandTotalValue,
        dealerHandTotalValue
      )}`;
    } else {
      outputMessage = `${showHand(
        playerHand,
        dealerHand
      )}player wins<br> ${showHandValue(
        playerHandTotalValue,
        dealerHandTotalValue
      )}`;
    }
  } else {
    outputMessage = `input: "z" - hit or "x" - stand<br><br>${showHand(
      playerHand,
      dealerHand
    )}`;
  }
  return outputMessage;
};

// print output message
var showHand = function (player, dealer) {
  var playerOutput = `player's hand:<br>`;
  for (i = 0; i < player.length; i += 1) {
    playerOutput += `${player[i].name} of ${player[i].suit}<br>`;
  }
  var dealerOutput = `dealer's hand:<br>`;
  for (i = 0; i < dealer.length; i += 1) {
    dealerOutput += `${dealer[i].name} of ${dealer[i].suit}<br>`;
  }
  return `${playerOutput}<br>${dealerOutput}<br>`;
};

// print output value message
var showHandValue = function (player, dealer) {
  var returnOutput = `<br>player's total hand value: ${player}<br>dealer's total hand value: ${dealer}`;
  return returnOutput;
};

var main = function (input) {
  var myOutputValue = "";
  if (currentGameState == gameState1) {
    console.log(`gameState: 1`);
    myOutputValue = dealCards();
    currentGameState = gameState2;
    console.log(`gameState: 2`);
  }
  if (currentGameState == gameState2) {
    console.log(checkForBlackjack(playerHand));
    console.log(checkHandTotalValue(playerHand));
    console.log(checkForBlackjack(dealerHand));
    console.log(checkHandTotalValue(dealerHand));
    myOutputValue += blackjackWin();
    console.log(blackjackWin());
    currentGameState = gameState3;
    console.log(`gameState: 3`);
  }
  if (currentGameState == gameState3) {
    myOutputValue += normalWin(input);
    console.log(normalWin(input));
  }
  return myOutputValue;
};
