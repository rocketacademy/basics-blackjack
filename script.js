/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/*
Rules of the game:
There will be only two players. One human and one computer.
The computer will always be the dealer. The dealer has to hit if their hand is below 17.
The player who is closer to 21 wins the hand. Aces can be 1 or 11.

*/

// constant for the face cards
const cardAce = 'Ace';
const cardJack = 'Jack';
const cardKing = 'King';
const cardQueen = 'Queen';
// constants for the suits
const Suits = {
  suitClubs: 'Clubs',
  suitSpades: 'Spades',
  suitHearts: 'Hearts',
  suitDiamonds: 'Diamonds',
};
const suitList = [Suits.suitHearts, Suits.suitDiamonds, Suits.suitSpades, Suits.suitClubs];
// constants for game results
const playLimitValue = 21;
// Dealer has to hit, if the current sum is less than 17.
// 17 or higher stay with their hand
const dealerLimitValue = 17;
const GameStatus = {
  Bust: 'Bust', Hit: 'Hit', Stand: 'Stand', Tie: 'Tie',
};
const playerName = 'Player';
const dealerName = 'Dealer';
const lineBreak = '<br/>';
var roundWinner = '';
// A variable to indicate whether the game is already started or not.
// This is to avoid unnecessary input validation and card dealing
var bGameStarted = false;
// Variable to store the last found total value for the player
// This will be used while comparing the dealer value
// Will be reset at the start of next round
var lastTotalPlayerValue = 0;
var bSplit = false; // when there is a split happened this variable will be set to true.

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
    SuitName: cardSuit,
  };
  return singleCard;
};

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
};

// returns an integer with values between 0 and max (exclusive of max)
var getRandomValue = function (maxValue) {
  return Math.floor(Math.random() * maxValue);
};

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
};

var askForPlayerInput = function () {
  var msg = lineBreak + 'Choose an option: <b>' + GameStatus.Hit + '</b> or <b>' + GameStatus.Stand + '</b>' + lineBreak;
  return msg;
};

// Variable to hold the complete deck of cards
// Call the shuffle function while loading the script
var cardDeck = shuffleCardDeck(makeDeck());
console.log(cardDeck);
var arrayDealerHands = [];
var arrayPlayerHands = [];
var arrayPlayerSecondHand = []; // will come into play if Split is applicable

var cardFormat = function (singleCard) {
  var message = singleCard.Name + ' of ' + singleCard.SuitName + '. Value: ' + singleCard.FaceValue;
  message += (singleCard.FaceValue == singleCard.AlternateFaceValue) ? '' : (' / ' + singleCard.AlternateFaceValue);
  message += lineBreak;
  return message;
};

var printMessageToDoc = function (message) {
  document.getElementById('msg_para').innerHTML = message;
};
var combinedCardDetails = '';
var printAllCardsToDoc = function (itemCard, arrIndex) {
  document.getElementById('msg_para').innerHTML += cardFormat(itemCard);
};

var printAllCardsMessage = function (itemCard, arrIndex) {
  combinedCardDetails += cardFormat(itemCard);
  // console.log(combinedCardDetails);
};

var askForSubmit = function () {
  var message = lineBreak + 'Press <b>submit</b> button to deal next set of cards' + lineBreak;
  return message;
};

// Validates the card name at current index with that of the previous element
var isSameCardName = function (singleCard, arrIndex, processingArray) {
  if (arrIndex === 0) {
    // No need to test the first array as there is nothing to be compared to
    return true;
  }
  // Checks for each element, whether previous element's  value is same.
  return (singleCard.Name === processingArray[arrIndex - 1].Name);
};

// This function checks whether there is a need to split
// Checking has to be done with Rank. Since rank corresponds to the card Name,
// here comparison is done with Card Name
var checkForSplit = function () {
  return arrayPlayerHands.every(isSameCardName);
};

var isCardAce = function (cardName) {
  return ((cardName == cardAce));
};

var validateCardDeck = function (lengthLimit) {
  if (cardDeck.length <= lengthLimit) {
    return false;
  }
  return true;
};

var verifyWithAceCardValues = function (currentTotalValue, numberOfAces) {
  if (numberOfAces <= 0) {
    return currentTotalValue;
  }
  var tempValue = currentTotalValue;
  var aceFaceValue = 11;
  tempValue -= numberOfAces;
  tempValue += (numberOfAces * aceFaceValue);
  while (true) {
    if (tempValue > playLimitValue) {
      tempValue -= aceFaceValue;
      tempValue += 1;
      numberOfAces -= 1;
    } else {
      return tempValue;
    }
    if (numberOfAces <= 0) {
      break;
    }
  }
  return tempValue;
};

// Function that decides the winner of that turn.
// If the player value = 21, player wins
// If the player value > 21, player lost = Bust
var verifyPalyerHands = function (playerHandCardsArray) {
  var gameStatusPlayer = '';
  var returnValue = '';
  var totalPlayerFaceValue = 0;
  var numOfAceCards = 0;
  // while calculating the total value in the initial level, the value considered for Ace is 1
  for (const playerCard of playerHandCardsArray) {
    totalPlayerFaceValue += playerCard.FaceValue;
    if (playerCard.Name == cardAce) {
      numOfAceCards += 1;
    }
  }
  // to prevent the loop from continuing infintely
  var bVerifiedAceCards = false;
  while (true) {
    if (totalPlayerFaceValue > playLimitValue) {
      roundWinner = dealerName;
      returnValue = lineBreak + GameStatus.Bust + '!! You lost the round.' + lineBreak;
      gameStatusPlayer = GameStatus.Bust;
      break;
    } else if (totalPlayerFaceValue == playLimitValue) {
      roundWinner = playerName;
      break;
    } else {
      // If calculated once, no need to do verification again
      if (!bVerifiedAceCards) {
        bVerifiedAceCards = true;
        // Check for the possibilites with Ace Cards
        var tempValue = verifyWithAceCardValues(totalPlayerFaceValue, numOfAceCards);
        // If the returned value is not same as the already calculated value, choose the new value
        if (totalPlayerFaceValue != tempValue) {
          totalPlayerFaceValue = tempValue;
        } else {
          break;
        }
      } else {
        break;
      }
      roundWinner = '';
    }
  }

  lastTotalPlayerValue = totalPlayerFaceValue;

  if (roundWinner == playerName) {
    returnValue = 'Player Win!!. You won the round and you made 1 and 1/2 times your bet!!' + lineBreak;
    // done with this round.
    returnValue += askForSubmit() + lineBreak;
    // remove the current cards in hand
    playerHandCardsArray = [];
    bGameStarted = false;
  } else {
    // Dealer will ask whether player would like to take another card or not: Hit or Stand
    if (gameStatusPlayer != GameStatus.Bust) {
      returnValue += askForPlayerInput();
    } else {
      bGameStarted = false;
      returnValue += askForSubmit();
    }
  }
  return returnValue;
};

// Dealer has to hit, if the current sum is less than 17.
// 17 or higher stay with their hand
// If the dealer busts i.e. sum > 21, every player wins twice the bet
// If the dealer doesn't bust, only the player with value greater than the dealer wins
var verifyDealerHands = function (bVerifiedAceCards) {
  var totalDealerFaceValue = 0;
  var returnValue = '';
  var numOfAceCards = 0;
  for (const dealerCard of arrayDealerHands) {
    totalDealerFaceValue += dealerCard.FaceValue;
    if (dealerCard.Name == cardAce) {
      numOfAceCards += 1;
    }
  }

  // Check for the Ace values
  // If calculated once, no need to do verification again
  if (!bVerifiedAceCards) {
    bVerifiedAceCards = true;
    // Check for the possibilites with Ace Cards
    var tempValue = verifyWithAceCardValues(totalDealerFaceValue, numOfAceCards);
    // If the returned value is not same as the already calculated value, choose the new value
    if (totalDealerFaceValue != tempValue) {
      totalDealerFaceValue = tempValue;
    }
  }

  returnValue = 'Dealer total face value: ' + totalDealerFaceValue + lineBreak;
  // Dealer has to hit, if the current sum is less than 17.
  if (totalDealerFaceValue < dealerLimitValue) {
    if (!validateCardDeck(1)) {
      bGameStarted = false;
      return 'Not enough cards to play further. Please refresh the page to start a new game.';
    }
    returnValue += 'Dealer has to make a choice to Hit or Stand';
    returnValue += lineBreak + 'Dealer choice: Hit' + lineBreak;
    printMessageToDoc(returnValue);
    returnValue = '';
    arrayDealerHands.push(cardDeck.pop());
    // Since a new card is added, need to check for ace cards again
    bVerifiedAceCards = false;
    return verifyDealerHands(bVerifiedAceCards);
  }
  // 17 or higher stay with their hand
  // Check whether the player has a value greater than the dealer
  if ((totalDealerFaceValue >= dealerLimitValue) && (totalDealerFaceValue < playLimitValue)) {
    // Dealer chooses to stand by
    returnValue += lineBreak + 'Dealer choice: Stand' + lineBreak;
    printMessageToDoc(returnValue);
    returnValue = '';

    // var totalPlayerFaceValue = 0;
    // for (const playerCard of arrayPlayerHands) {
    //   totalPlayerFaceValue += playerCard.FaceValue;
    // }
    if (lastTotalPlayerValue > totalDealerFaceValue) {
      roundWinner = playerName;
    } else {
      roundWinner = dealerName;
    }
  } else if (totalDealerFaceValue > playLimitValue) {
    roundWinner = playerName;
    returnValue += 'Dealer Busted.' + lineBreak;
  }

  if (roundWinner == playerName) {
    returnValue += 'Player Win!!. You won the round and made twice of your bet!!' + lineBreak;
  } else {
    returnValue += 'Dealer Wins!!. You lost your bet.' + lineBreak;
  }
  // done with this round.
  returnValue += askForSubmit();
  bGameStarted = false;
  return returnValue;
};

var resetVariables = function () {
  bGameStarted = true;
  // Deal the cards, for the first time
  arrayDealerHands = [];
  arrayPlayerHands = [];
  arrayPlayerSecondHand = [];
  roundWinner = '';
  lastTotalPlayerValue = 0;
  bSplit = false;
};

var main = function (input) {
  console.log(arrayPlayerHands);
  console.log(arrayDealerHands);
  console.log(cardDeck);
  printMessageToDoc('');

  var outputValue = '';
  if (bGameStarted) {
    console.log('Inside the game started consition.');
    console.log('input: ', input);
    if (input == GameStatus.Hit) {
      if (!validateCardDeck(1)) {
        bGameStarted = false;
        return 'Not enough cards to play further. Please refresh the page to start a new game.';
      }
      arrayPlayerHands.push(cardDeck.pop());
      console.log(arrayPlayerHands);

      outputValue += 'Cards with the player: ' + lineBreak;
      arrayPlayerHands.forEach(printAllCardsMessage);
      outputValue += combinedCardDetails;

      combinedCardDetails = '';
      outputValue += verifyPalyerHands(arrayPlayerHands);
      return outputValue;
    } if (input == GameStatus.Stand) {
      // Player has stopped taking new cards.
      // Now the turn of dealer to face up the already taken face down card
      outputValue += verifyDealerHands(false);

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
  }
  if (!bGameStarted) { // Shuffle the cards before dealing the cards
    // Shuffling is only needed if it's a new game
    cardDeck = shuffleCardDeck(cardDeck);
  }
  resetVariables();
  if (!validateCardDeck(6)) {
    bGameStarted = false;
    return 'Not enough cards to play further. Please refresh the page to start a new game.';
  }
  // Deal 2 cards each between the player and the dealer
  // the dealer deals a card face up to each player, and one card up to themselves.
  // Everyone is dealt one more face up card, besides the dealer,
  //  whose second card is dealt face down
  arrayPlayerHands.push(cardDeck.pop());
  arrayPlayerHands.push(cardDeck.pop());
  // Check whether Splitting is needed or not
  bSplit = checkForSplit();
  if (bSplit) {
    arrayPlayerSecondHand.push(arrayPlayerHands.pop());
    arrayPlayerHands.push(cardDeck.pop());
    arrayPlayerSecondHand.push(cardDeck.pop());
  }
  console.log(arrayPlayerHands);

  arrayDealerHands.push(cardDeck.pop());
  arrayDealerHands.push(cardDeck.pop());
  console.log(arrayDealerHands);

  outputValue += lineBreak + 'Face up card of the dealer: ' + lineBreak
    + cardFormat(arrayDealerHands[0]) + lineBreak;

  outputValue += 'Result of the below set of Cards with the player: ' + lineBreak;
  arrayPlayerHands.forEach(printAllCardsMessage);
  outputValue += combinedCardDetails;
  combinedCardDetails = '';

  outputValue += verifyPalyerHands(arrayPlayerHands);
  var winnerNormalSet = roundWinner;
  // If player in any set, he will be declared as the round winner.
  // No need to verify for Split hand cards
  if (roundWinner == playerName) {
    return outputValue;
  }
  // If the player fails or there is no specific winner at this time,
  //  check for split and continue playing with that set
  roundWinner = '';
  if (bSplit) {
    outputValue += lineBreak + lineBreak + 'Playing with the split card set: ' + lineBreak;
    arrayPlayerSecondHand.forEach(printAllCardsMessage);
    outputValue += combinedCardDetails;
    combinedCardDetails = '';

    outputValue += verifyPalyerHands(arrayPlayerSecondHand);
    var winnerSecondSet = roundWinner;
    roundWinner = '';
    // If player failed with the first set and won with the Split set,
    // treat the split set as the only set remaining
    if ((dealerName == winnerNormalSet) && (playerName == winnerSecondSet)) {
      // Since the first set failed with the dealer, the only set to be considered is second set
      arrayPlayerHands = [];
      arrayPlayerHands.push(arrayPlayerSecondHand);
      arrayPlayerSecondHand = [];
    }
    // The case in which a winner can't be found, conitnue to play
  }

  outputValue += lineBreak
   + '<b>NB</b>: If 2 options are to be specified, write both options in the input area. e.g: <b>Hit Stand</b>' + lineBreak
   + 'Applicable only when two inputs are asked for.';

  return outputValue;
};
