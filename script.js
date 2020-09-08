/*
Rules of the game:
There will be only two players. One human and one computer.
The computer will always be the dealer. The dealer has to hit if their hand is below 17.
The player who is closer to 21 wins the hand. Aces can be 1 or 11.

*/

// constant for the face cards
const cardAce = "Ace";
const cardJack = "Jack";
const cardKing = "King";
const cardQueen = "Queen";
// constants for the suits
const suitClubs = "Clubs";
const suitSpades = "Spades";
const suitHearts = "Hearts";
const suitDiamonds = "Diamonds";
const suitList = [suitHearts, suitDiamonds, suitSpades, suitClubs];
// constants for game results
const playLimitValue = 21;
// Dealer has to hit, if the current sum is less than 17.
// 17 or higher stay with their hand
const dealerLimitValue = 17;
const GameStatus = { Bust: "Bust", Hit: "Hit", Stand: "Stand", Tie: "Tie" };
const playerName = 'Player';
const dealerName = 'Dealer';
const lineBreak = "<br/>";
var roundWinner = '';
var playerChosenMode = '';
// A variable to indicate whether the game is already started or not.
// This is to avoid unnecessary input validation and card dealing
var bGameStarted = false;

// Function to create a single card object from the suit name and card value
var makeSingleCard = function (cardSuit, cardValue) {
  var cardName = cardValue;
  var faceValue = cardValue;
  // Alternate faceValue is intorudced to account for the double values for Ace .
  var alternateFaceValue = faceValue;
  if (cardValue == 1) {
    // for Ace, face value can be can be 1 or 11.
    cardName = cardAce;
    faceValue = cardValue;
    alternateFaceValue = 11;
  } else if (cardValue == 11) {
    cardName = cardJack;
    faceValue = 10;
    alternateFaceValue = faceValue;
  } else if (cardValue == 12) {
    cardName = cardQueen;
    faceValue = 10;
    alternateFaceValue = faceValue;
  } else if (cardValue == 13) {
    cardName = cardKing;
    faceValue = 10;
    alternateFaceValue = faceValue;
  }
  var singleCard = {
    Name: cardName,
    FaceValue: faceValue,
    AlternateFaceValue: alternateFaceValue,
    SuitName: cardSuit
  };
  return singleCard;
}

// Function to create the deck of cards
// A total of 52 cards == 13 cards of 4 suits
var makeDeck = function () {
  var deck = [];
  for (var suit of suitList) {
    var cardValue = 1;
    while (cardValue <= 13) {
      deck.push(makeSingleCard(suit, cardValue));
      cardValue += 1;
    }
  }
  return deck;
}

// returns an integer with values between 0 and max (exclusive of max)
var getRandomValue = function (maxValue) {
  return Math.floor(Math.random() * maxValue);
}

// Function to shuffle the deck of cards
var shuffleCardDeck = function (originalCardDesk) {
  var randomIndex = 0;
  var cardIndex = 0;
  var maxValue = originalCardDesk.length;
  while (cardIndex < maxValue) {
    randomIndex = getRandomValue(originalCardDesk.length);
    // swap between the cards at indices cardIndex and randomIndex
    var currentCard = originalCardDesk[cardIndex];
    originalCardDesk[cardIndex] = originalCardDesk[randomIndex];
    originalCardDesk[randomIndex] = currentCard;
    cardIndex += 1;
  }
  return originalCardDesk;
}

var askForPlayerInput = function () {
  var msg = lineBreak + "Choose an option: <b>" + GameStatus.Hit + "</b> or <b>" + GameStatus.Stand + "</b>" + lineBreak;
  return msg;
}

// Variable to hold the complete deck of cards
// Call the shuffle function while loading the script
var cardDeck = shuffleCardDeck(makeDeck());
console.log(cardDeck);
var arrayDealerHands = [];
var arrayPlayerHands = [];


var cardFormat = function (singleCard) {
  var message = singleCard.Name + ' of ' + singleCard.SuitName + '. Value: ' + singleCard.FaceValue;
  message += (singleCard.FaceValue == singleCard.AlternateFaceValue) ? '' : (' / ' + singleCard.AlternateFaceValue);
  message += lineBreak;
  return message;
}

var printMessageToDoc = function (message) {
  document.getElementById("msg_para").innerHTML = message;
}
var combinedCardDetails = '';
var printAllCardsToDoc = function (itemCard, arrIndex) {
  document.getElementById("msg_para").innerHTML += cardFormat(itemCard);
}

var printAllCardsMessage = function (itemCard, arrIndex) {
  combinedCardDetails += cardFormat(itemCard);
  //console.log(combinedCardDetails);
}

var askForSubmit = function () {
  var message = lineBreak + "Press <b>submit</b> button to deal next set of cards" + lineBreak;
  return message;
}

var isCardAce = function (cardName) {
  return ((cardName == cardAce) ? true : false);
}
// Function that decides the winner of that turn.
// If the player value = 21, player wins
// If the player value > 21, player lost = Bust 
var verifyPalyerHands = function () {
  var gameStatusPlayer = '';
  var returnValue = '';
  var totalPlayerFaceValue = 0;
  for (let playerCard of arrayPlayerHands) {

    totalPlayerFaceValue += playerCard.FaceValue;
  }

  //arrayPlayerHands[0].FaceValue + arrayPlayerHands[1].FaceValue;
  if (totalPlayerFaceValue > playLimitValue) {
    roundWinner = dealerName;
    returnValue = lineBreak + GameStatus.Bust + "!! You lost the round." + lineBreak;
    gameStatusPlayer = GameStatus.Bust;
  }
  else if (totalPlayerFaceValue == playLimitValue) {
    roundWinner = playerName;
  }
  else {
    roundWinner = '';
  }
  if (roundWinner == playerName) {
    returnValue = "Player Win!!. You won the round and you made 1 and 1/2 times your bet!!" + lineBreak;
    // done with this round.
    // remove the current cards in hand
    arrayPlayerHands = [];
  }
  else { // Winner is the dealer
    console.log("Player is not winner. Game Status: ", gameStatusPlayer);

    // Dealer will ask whether player would like to take another card or not: Hit or Stand
    if (gameStatusPlayer != GameStatus.Bust) {
      returnValue += askForPlayerInput();
    }
    else {
      returnValue += askForSubmit();
    }
  }
  return returnValue;
}

// Dealer has to hit, if the current sum is less than 17.
// 17 or higher stay with their hand
// If the dealer busts i.e. sum > 21, every player wins twice the bet
// If the dealer doesn't bust, only the player with value greater than the dealer wins
var verifyDealerHands = function () {
  var totalDealerFaceValue = 0;
  var returnValue = '';
  for (let dealerCard of arrayDealerHands) {
    totalDealerFaceValue += dealerCard.FaceValue;
  }
  returnValue = "Dealer total face value: " + totalDealerFaceValue + lineBreak;
  // Dealer has to hit, if the current sum is less than 17.
  if (totalDealerFaceValue < dealerLimitValue) {
    if (!validateCardDeck(1)) {
      bGameStarted = false;
      return "Not enough cards to play further. Please refresh the page to start a new game.";
    }
    // Check for Ace card here
    returnValue += "Dealer has to make a choice to Hit or Stand";
    printMessageToDoc(returnValue);
    returnValue = '';
    // Dealer will decide to take a hit, if the difference between the maximum limit and current face value is 
    // less than 10
    if ((playLimitValue - totalDealerFaceValue) > 9) {

    }
    arrayDealerHands.push(cardDeck.pop());
    return verifyDealerHands();
  }
  // 17 or higher stay with their hand
  // Check whether the player has a value greater than the dealer
  else if ((totalDealerFaceValue > dealerLimitValue) && (totalDealerFaceValue < playLimitValue)) {
    // Check for Ace
    var totalPlayerFaceValue = 0;
    for (let playerCard of arrayPlayerHands) {
      totalPlayerFaceValue += playerCard.FaceValue;
    }
    if (totalPlayerFaceValue > totalDealerFaceValue) {
      roundWinner = playerName;
    }
    else {
      roundWinner = dealerName;
    }
  }
  else if (totalDealerFaceValue > playLimitValue) {
    roundWinner = playerName;
    returnValue += "Dealer Busted." + lineBreak;
  }

  if (roundWinner == playerName) {
    returnValue += "Player Win!!. You won the round and made twice of your bet!!" + lineBreak;
  }
  else {
    returnValue += "Dealer Wins!!. You lost your bet." + lineBreak;
  }
  // done with this round.
  returnValue += askForSubmit();
  bGameStarted = false;
  return returnValue;
}

var validateCardDeck = function (lengthLimit) {
  if (cardDeck.length <= lengthLimit) {
    return false;
  }
  return true;
}

var main = function (input) {

  console.log(arrayPlayerHands);
  console.log(arrayDealerHands);
  console.log(cardDeck);
  printMessageToDoc("");

  var outputValue = '';
  if (bGameStarted) {
    console.log("Inside the game started consition.")
    console.log("input: ", input);
    if (input == GameStatus.Hit) {
      if (!validateCardDeck(1)) {
        bGameStarted = false;
        return "Not enough cards to play further. Please refresh the page to start a new game.";
      }
      arrayPlayerHands.push(cardDeck.pop());
      console.log(arrayPlayerHands);

      outputValue += 'Cards with the player: ' + lineBreak;
      arrayPlayerHands.forEach(printAllCardsMessage);
      outputValue += combinedCardDetails;

      // compare the card value
      // outputValue += askForPlayerInput();
      combinedCardDetails = '';
      outputValue += verifyPalyerHands();
      return outputValue;

    } else if (input == GameStatus.Stand) {
      // Player has stopped taking new cards.
      // Now the turn of dealer to face up the already taken face down card
      outputValue += verifyDealerHands();

      outputValue += lineBreak + 'Cards with the player: ' + lineBreak;
      arrayPlayerHands.forEach(printAllCardsMessage);
      outputValue += combinedCardDetails;
      combinedCardDetails = '';

      outputValue += lineBreak + 'Cards with the Dealer: ' + lineBreak;
      arrayDealerHands.forEach(printAllCardsMessage);
      outputValue += combinedCardDetails;
      combinedCardDetails = '';
      return outputValue;
    }
    else {
      //return askForPlayerInput();
    }
  }
  bGameStarted = true;
  // Deal the cards, for the first time
  arrayDealerHands = [];
  arrayPlayerHands = [];
  if (!validateCardDeck(4)) {
    bGameStarted = false;
    return "Not enough cards to play further. Please refresh the page to start a new game.";
  }
  // Shuffle the cards before dealing the cards
  cardDeck = shuffleCardDeck(cardDeck);
  // Deal 2 cards each between the player and the dealer
  // the dealer deals a card face up to each player, and one card up to themselves.
  // Everyone is dealt one more face up card, besides the dealer, whose second card is dealt face down
  arrayPlayerHands.push(cardDeck.pop());
  arrayPlayerHands.push(cardDeck.pop());

  console.log(arrayPlayerHands);

  outputValue += 'Cards with the player: ' + lineBreak;
  arrayPlayerHands.forEach(printAllCardsMessage);
  outputValue += combinedCardDetails;
  combinedCardDetails = '';
  // arrayPlayerHands.forEach(printAllCardsToDoc);

  arrayDealerHands.push(cardDeck.pop());
  arrayDealerHands.push(cardDeck.pop());
  console.log(arrayDealerHands);

  outputValue += lineBreak + "Face up card of the dealer: " + lineBreak
    + cardFormat(arrayDealerHands[0]) + lineBreak;

  outputValue += verifyPalyerHands();
  return outputValue;
};
