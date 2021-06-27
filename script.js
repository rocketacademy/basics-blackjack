//TO ADD
// SHOULD COMBINE COMP TURN WITH THE OUTPUT STATING THE VALUE INSTEAD OF RETURNING IT (LINE 222) (OPTIONAL)
// refactor at the end
// hit function?
// COMP DECISION TO KEEP DRAWING CARDS SHOULD BE AUTOMATIC (line 238, combine with above as a hit function
// DO MULTIPLAYER AND THEN BETTING! USE OBJECT TO STORE PLAYER DATA LIKE NAME, BANK/BET AND PLAYERHAND?

var mode = "inputname";
var playerBlackjack = false;
var compBlackjack = false;
var playerHand = [];
var compHand = [];
var playerCard1 = {};
var playerCard2 = {};
var computerCard1 = {};
var computerCard2 = {};
var playerTotalValue = 0;
var compTotalValue = 0;
var playerStandText = "";
var username = "";

var main = function (input) {
  if (mode == "inputname") {
    username = input;
    mode = "dealmode";
    return `Hi ${username}, welcome to Blackjack. Now, the computer will deal the cards.`;
  }
  if (mode == "dealmode") {
    playerHand = [];
    compHand = [];
    shuffledDeck = shuffleCards(deck);
    var myOutputValue = dealCards(shuffledDeck);
    mode = "playerturn";
    return myOutputValue;
  }
  if (mode == "playerturn") {
    var playerTurnText = playerTurnFunc(input);
    return playerTurnText;
  }
  if (mode == "compturn") {
    var myOutputValue = compTurnFunc(playerHand, compHand, playerTotalValue);
  }
  // need to return cards to the deck at the end of the game. Reshuffle happens in the dealcards function.
  // Reset playerHand and compHand arrays
  return myOutputValue;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitEmoji = ["♥️", "♦️", "♣️", "♠️"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentEmoji = suitEmoji[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name, and change values as jack queen and king all have the same value. Set the value of ace to 11 initially
      if (cardName == 1) {
        cardName = "ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
        emojiSuit: currentEmoji,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var deck = makeDeck();

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var shuffledDeck = shuffleCards(deck);

var dealCards = function (shuffledDeck) {
  computerCard1 = shuffledDeck.pop();
  playerCard1 = shuffledDeck.pop();
  computerCard2 = shuffledDeck.pop();
  playerCard2 = shuffledDeck.pop();
  compHandText = `The computer drew:<br>${computerCard1.name} of ${computerCard1.emojiSuit} <br> ${computerCard2.name} of ${computerCard2.emojiSuit}`;
  playerHandText = `You drew: <br>${playerCard1.name} of ${playerCard1.emojiSuit} <br> ${playerCard2.name} of ${playerCard2.emojiSuit}`;
  console.log(
    "comp card 1 is " + computerCard1.rank + " of " + computerCard1.emojiSuit
  );
  console.log(
    "comp card 2 is " + computerCard2.rank + " of " + computerCard2.emojiSuit
  );
  console.log(
    "player card 1 is " + playerCard1.rank + " of " + playerCard1.emojiSuit
  );
  console.log(
    "player card 2 is " + playerCard2.rank + " of " + playerCard2.emojiSuit
  );
  // create a blackjack for computer as well. Function it.
  if (computerCard1.rank == 1 || computerCard2.rank == 1) {
    mode = "compBlackjackCheck";
    var compBlackjackText = blackjackCheck(computerCard1, computerCard2);
  }
  // if any of the two cards are aces FOR PLAYER
  if (playerCard1.rank == 1 || playerCard2.rank == 1) {
    mode = "playerBlackjackCheck";
    var playerBlackjackText = blackjackCheck(playerCard1, playerCard2);
  }
  if (compBlackjack == true && playerBlackjack && true) {
    compBlackjack = false;
    playerBlackjack = false;
    return `Both of you have gotten a blackjack! Its a draw! ${playerHandText} <br><br> ${compHandText}`;
  } else if (compBlackjack == true && playerBlackjack != true) {
    compBlackjack = false;
    return `The computer got a blackjack and you lost!<br><br>${playerHandText} <br><br> ${compHandText}`;
  } else if (compBlackjack != true && playerBlackjack == true) {
    playerBlackjack = false;
    return `You have gotten a blackjack and won!<br><br>${playerHandText} <br><br> ${compHandText}`;
  } else {
    playerHand.push(playerCard1);
    playerHand.push(playerCard2);
    compHand.push(computerCard1);
    compHand.push(computerCard2);
    mode = "playerturn";
    return `${playerHandText}`;
  }
};

var blackjackCheck = function (card1, card2) {
  // if any of the two cards are picture cards or 10 on top of having an ace in hand, it is a blackjack
  if (
    card1.rank == 10 ||
    card1.rank == 11 ||
    card1.rank == 12 ||
    card1.rank == 13 ||
    card2.rank == 10 ||
    card2.rank == 11 ||
    card2.rank == 12 ||
    card2.rank == 13
  ) {
    if (mode == "playerBlackjackCheck") {
      playerBlackjack = true;
      return `You got a BlackJack! Your cards are: <br><br> ${card1.name} of ${card1.emojiSuit} <br> ${card2.name} of ${card2.emojiSuit}`;
    } else if (mode == "compBlackjackCheck") {
      compBlackjack = true;
      return `The computer got a BlackJack! Your cards are: <br><br> ${card1.name} of ${card1.emojiSuit} <br> ${card2.name} of ${card2.emojiSuit}`;
    }
  } else {
    mode = "playerturn";
  }
  return `Your cards are: <br><br> ${card1.name} of ${card1.emojiSuit} <br> ${card2.name} of ${card2.emojiSuit}`;
};

var playerTurnFunc = function (input) {
  //player chooses to hit or stand
  if (input == "hit") {
    var cardDrawn = shuffledDeck.pop();
    playerHand.push(cardDrawn);
    //value calculating should be a diff function maybe?
    valueIndex = 0;
    playerTotalValue = 0;
    while (valueIndex < playerHand.length) {
      playerTotalValue = playerTotalValue + playerHand[valueIndex].value;
      valueIndex += 1;
    }
    console.log(playerTotalValue);
    //what happens if there are two aces? unlikely since 2 x 11 = 22? but how to make it such that 1 is 11 and the other is 1? Do this next time
    if (playerTotalValue > 21) {
      var aceCheckIndex = 0;
      while (aceCheckIndex < playerHand.length) {
        if (playerHand[aceCheckIndex].value == 11) {
          // if ace is in hand AND the value is set to 11, convert its value to 1. the moment this happens, the value is sure to be less than 21 so it is alright to just stop it there.
          playerHand[aceCheckIndex].value = 1;
          playerTotalValue = playerTotalValue - 10;
          return `You have drawn ${cardDrawn.name} of ${cardDrawn.emojiSuit} but will bust if you take ace as 11! Therefore, it has been converted to 1. Your hand total is ${playerTotalValue}.`;
        }
        aceCheckIndex = aceCheckIndex + 1;
      }
      mode = "compturn";
      return `You have busted! You drew ${cardDrawn.name} of ${cardDrawn.emojiSuit} and you have gone past 21 with a value of ${playerTotalValue}! The computer will now go.`;
    } else if (playerTotalValue < 16) {
      mode = "playerturn";
      return `You have drawn ${cardDrawn.name} of ${cardDrawn.emojiSuit} but your hand is still under 16!`;
    } else if (playerTotalValue == 21) {
      mode = "compturn";
      return `You have drawn ${cardDrawn.name} of ${cardDrawn.emojiSuit} and you have gotten 21! The computer will now go.`;
    } else {
      mode = "playerturn";
      return `You have drawn ${cardDrawn.name} of ${cardDrawn.emojiSuit}! You can either choose to stand with a total hand of ${playerTotalValue} or hit if you're feeling lucky!`;
    }
  }
  if (input == "stand") {
    valueIndex = 0;
    playerTotalValue = 0;
    while (valueIndex < playerHand.length) {
      playerTotalValue = playerTotalValue + playerHand[valueIndex].value;
      valueIndex += 1;
    }
    mode = "compturn";
    playerStandText = `You have stood with a total value of ${playerTotalValue}. Now the computer will go.`;
    return playerStandText;
  }
};

var playerHitFunction = function (playerHand) {
  var cardDrawn = shuffledDeck.pop();
  playerHand.push(cardDrawn);
  //value calculating should be a diff function maybe?
  valueIndex = 0;
  playerTotalValue = 0;
  while (valueIndex < playerHand.length) {
    playerTotalValue = playerTotalValue + playerHand[valueIndex].value;
    valueIndex += 1;
  }
  return `You have drawn ${cardDrawn.name} of ${cardDrawn}`;
};

var compTurnFunc = function (playerHand, compHand, playerTotalValue) {
  valueIndex = 0;
  compTotalValue = 0;
  while (valueIndex < compHand.length) {
    compTotalValue = compTotalValue + compHand[valueIndex].value;
    valueIndex += 1;
  }
  playerHand;
  //comp hits automatically if below 16
  if (compTotalValue < 16) {
    var cardDrawn = shuffledDeck.pop();
    compHand.push(cardDrawn);
    valueIndex = 0;
    compTotalValue = 0;
    while (valueIndex < compHand.length) {
      compTotalValue = compTotalValue + compHand[valueIndex].value;
      valueIndex += 1;
    }
    if (compTotalValue < 16) {
      return "The computer has drawn a card and has decided to draw again.";
    } else {
      var handText = handTextGenerate(compHand, playerHand);
      //comp stands between 16 and 21
      if (compTotalValue <= 21) {
        var myOutputValue = faceOffFunc(
          compHand,
          playerHand,
          playerTotalValue,
          compTotalValue
        );
      }
      //comp busts after 21
      else if (compTotalValue > 21) {
        var aceCheckIndex = 0;
        while (aceCheckIndex < compHand.length) {
          if (compHand[aceCheckIndex].value == 11 && compTotalValue > 21) {
            // if ace is in hand, convert its value to 1. the moment this happens, the value is sure to be less than 21 so it is alright to just stop it there.
            compHand[aceCheckIndex].value = 1;
            compTotalValue = compTotalValue - 10;
          }
          aceCheckIndex = aceCheckIndex + 1;
        }
        if (compTotalValue > 21) {
          //if player has <= 21, comp loses
          if (playerTotalValue <= 21) {
            mode = "dealmode";
            var myOutputValue = `${playerStandText}<br><br>The computer has bust with a hand of ${compTotalValue}! You win!<br> ${handText}`;
          }
          //if player has bust, push (Draw)
          else if (playerTotalValue >= 21) {
            mode = "dealmode";
            var myOutputValue = `${playerStandText}<br><br>The computer has bust with a hand of ${compTotalValue}! You have therefore drawn!<br> ${handText}`;
          }
        }
      }
    }
  }
  if (compTotalValue <= 21 && compTotalValue >= 16) {
    var myOutputValue = faceOffFunc(
      compHand,
      playerHand,
      playerTotalValue,
      compTotalValue
    );
  } else if (compTotalValue < 16) {
    return "The computer has drawn a card and has decided to draw again.";
  }
  return myOutputValue;
};

var handTextGenerate = function (compHand, playerHand) {
  var compHandText = "";
  var compIndex = 0;
  while (compIndex < compHand.length) {
    compHandText =
      compHandText +
      `<br> Card ${compIndex + 1}: ${compHand[compIndex].name} of ${
        compHand[compIndex].emojiSuit
      }`;
    compIndex = compIndex + 1;
  }
  var playerHandText = "";
  var playerIndex = 0;
  while (playerIndex < playerHand.length) {
    playerHandText =
      playerHandText +
      `<br> Card ${playerIndex + 1}: ${playerHand[playerIndex].name} of ${
        playerHand[playerIndex].emojiSuit
      }`;
    playerIndex = playerIndex + 1;
  }
  return `Computer hand:<br> ${compHandText} <br><br> Player hand:<br> ${playerHandText}`;
};

var compVsPlayer = function (playerHand, compHand, playerTotalValue) {
  var compHandText = "";
  var compIndex = 0;
  while (compIndex < compHand.length) {
    compHandText =
      compHandText +
      `<br> Card ${compIndex + 1}: ${compHand[compIndex].rank} of ${
        compHand[compIndex].emojiSuit
      }`;
    compIndex = compIndex + 1;
  }
  var playerHandText = "";
  var playerIndex = 0;
  while (playerIndex < compHand.length) {
    playerHandText =
      playerHandText +
      `<br> Card ${playerIndex + 1}: ${playerHand[playerIndex].rank} of ${
        playerHand[playerIndex].emojiSuit
      }`;
    playerIndex = playerIndex + 1;
  }
  //comp stands between 16 and 21
  if (compTotalValue <= 21) {
    var myOutputValue = faceOffFunc(
      compHand,
      playerHand,
      playerTotalValue,
      compTotalValue
    );
  }
  //comp busts after 21
  else if (compTotalValue > 21) {
    //if player has <= 21, comp loses
    if (playerTotalValue <= 21) {
      mode = "dealmode";
      var myOutputValue = `${playerStandText}<br><br>The computer has bust with a hand of ${compTotalValue}! You win! Comp hand: ${compHandText} <br><br> Your hand: ${playerHandText}`;
    }
    //if player has bust, push (Draw)
    else if (playerTotalValue >= 21) {
      mode = "dealmode";
      var myOutputValue = `${playerStandText}<br><br>The computer has bust with a hand of ${compTotalValue}! You have therefore drawn! Comp hand: ${compHandText} <br><br> Your hand: ${playerHandText}`;
    }
    return myOutputValue;
  }
};

var faceOffFunc = function (
  compHand,
  playerHand,
  playerTotalValue,
  compTotalValue
) {
  var handText = handTextGenerate(compHand, playerHand);
  var myOutputValue = "";
  if (
    playerTotalValue > compTotalValue &&
    playerTotalValue <= 21 &&
    compTotalValue <= 21
  ) {
    mode = "dealmode";
    myOutputValue = `You have won with a total hand of ${playerTotalValue} over the computer's hand of ${compTotalValue}. ${handText}`;
  } else if (
    playerTotalValue < compTotalValue &&
    playerTotalValue <= 21 &&
    compTotalValue <= 21
  ) {
    mode = "dealmode";
    myOutputValue = `You have lost with a total hand of ${playerTotalValue} compared to the computer's hand of ${compTotalValue}. ${handText}`;
  } else if (playerTotalValue > 21 && compTotalValue <= 21) {
    mode = "dealmode";
    myOutputValue = `You have lost with a busted value of ${playerTotalValue} compared to the computer's hand of ${compTotalValue}. ${handText}.`;
  } else if (playerTotalValue == compTotalValue) {
    mode = "dealmode";
    myOutputValue = `You have pushed (draw) with both total hands of ${playerTotalValue}. ${handText}`;
  }
  return myOutputValue;
};

var inputDisplay = function () {
  // change to new lowest and normal modes
  if (mode == "inputname") {
    return "Please input your name.";
  } else if (mode == "dealmode") {
    return `${username}, please click submit!`;
  } else if (mode == "playerturn") {
    return `${username}, please choose to either hit or stand.`;
  } else if (mode == "compturn") {
    return "It is now the computer's turn. Please click submit.";
  } else if (mode == "playerBlackjackCheck" || mode == "compBlackjackCheck") {
    return "Input";
  }
};
