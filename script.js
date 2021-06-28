var mode = "playersetup";
var playerBlackjack = false;
var compBlackjack = false;
var compHandText = "";
var playerHandText = "";
var playerHand = [];
var compHand = [];
var playerCard1 = {};
var playerCard2 = {};
var computerCard1 = {};
var computerCard2 = {};
var noOfPlayers = 0;
var allPlayers = [];
var playerTotalValue = 0;
var compTotalValue = 0;
var playerStandText = "";
var username = "";
var playerNameIndex = 0;
var dealIndex = 0;
var cardDisplayCounter = 0;

var main = function (input) {
  if (mode == "playersetup" || mode == "inputname") {
    compHand = [];
    return playerArraySetup(input);
  }
  if (mode == "dealmode" || mode == "compdeal") {
    shuffledDeck = shuffleCards(deck);
    var myOutputValue = dealCards(shuffledDeck);
    return myOutputValue;
  }
  if (
    mode == "playerturn" ||
    mode == "playerDecisionTurn" ||
    mode == "playerEndTurn"
  ) {
    var playerTurnText = playerTurnFunc(input);
    return playerTurnText;
  }
  if (mode == "compturn") {
    var myOutputValue = compTurnFunc(compHand);
  }
  // need to return cards to the deck at the end of the game. Reshuffle happens in the dealcards function.
  shuffledDeck = shuffleCards(deck);
  // implement betting mode
  return myOutputValue;
};

var playerArraySetup = function (input) {
  if (mode == "playersetup") {
    dealIndex = 0;
    compBlackjack = false;
    cardDisplayCounter = 0;
    noOfPlayers = input;
    allPlayers = [];
    var playerCountIndex = 0;
    var playerObject = {};
    while (playerCountIndex < noOfPlayers) {
      playerObject = {
        player: {
          username: "",
          playerHand: [],
          bankroll: 100,
          blackjackCheck: false,
          handTotal: 0,
          handText: "",
        },
      };
      allPlayers.push(playerObject);
      playerCountIndex += 1;
    }
    mode = "inputname";
    playerNameIndex = 0;
    return `There are ${noOfPlayers} players. Please input your names in order.`;
  }
  if (mode == "inputname") {
    if (playerNameIndex < noOfPlayers) {
      allPlayers[playerNameIndex].player.username = input;
      playerNameIndex += 1;
      if (playerNameIndex < noOfPlayers) {
        return `Hi ${
          allPlayers[playerNameIndex - 1].player.username
        }, you are Player ${playerNameIndex}. Next player, please input your name.`;
      } else {
        mode = "compdeal";
        return `Hi ${
          allPlayers[playerNameIndex - 1].player.username
        }, you are Player ${playerNameIndex}. Now, the computer will deal the cards.`;
      }
    }
  }
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
  if (mode == "compdeal") {
    var computerCard1 = shuffledDeck.pop();
    var computerCard2 = shuffledDeck.pop();
    compHand.push(computerCard1);
    compHand.push(computerCard2);
    if (computerCard1.rank == 1 || computerCard2.rank == 1) {
      mode = "compBlackjackCheck";
      var compBlackjackText = blackjackCheckFunc(
        allPlayers,
        computerCard1,
        computerCard2,
        compHand
      );
    }
    mode = "dealmode";
  }
  if (dealIndex < noOfPlayers) {
    var playerCard1 = shuffledDeck.pop();
    var playerCard2 = shuffledDeck.pop();
    allPlayers[dealIndex].player.playerHand.push(playerCard1);
    allPlayers[dealIndex].player.playerHand.push(playerCard2);
    // if any of the two cards are aces FOR PLAYER
    playerBlackjack = false;
    mode = "playerBlackjackCheck";
    var playerBlackjackText = blackjackCheckFunc(
      allPlayers,
      playerCard1,
      playerCard2,
      compHand
    );
  }
  dealIndex += 1;
  if (dealIndex < noOfPlayers) {
    mode = "dealmode";
    return `${playerBlackjackText} <br><br> Player ${allPlayers[dealIndex].player.username}, it is your turn.`;
  } else {
    mode = "playerDecisionTurn";
    if (compBlackjack == true) {
      mode = "compturn";
      return `${playerBlackjackText}. Since the computer has a blackjack, all players cards will be revealed automatically.`;
    } else {
      return `${playerBlackjackText}. Now, Players will choose to hit/stand in order.`;
    }
  }
};

var blackjackCheckFunc = function (allPlayers, card1, card2, compHand) {
  // if any of the two cards are picture cards or 10 on top of having an ace in hand, it is a blackjack
  computerCard1 = compHand[0];
  computerCard2 = compHand[1];
  var compHandText = `The computer drew:<br>${computerCard1.name} of ${computerCard1.emojiSuit} <br> ${computerCard2.name} of ${computerCard2.emojiSuit}`;
  // reset player blackjack for future games
  allPlayers[dealIndex].player.blackjackCheck = false;
  if (mode == "playerBlackjackCheck") {
    playerHandText = `You drew: <br>${allPlayers[dealIndex].player.playerHand[0].name} of ${allPlayers[dealIndex].player.playerHand[0].emojiSuit} <br> ${allPlayers[dealIndex].player.playerHand[1].name} of ${allPlayers[dealIndex].player.playerHand[1].emojiSuit}`;
  }
  if (mode == "compBlackjackCheck") {
    computerCard1 = card1;
    computerCard2 = card2;
  }
  if (card1.rank == 1 || card2.rank == 1) {
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
        allPlayers[dealIndex].player.blackjackCheck = true;
      } else if (mode == "compBlackjackCheck") {
        compBlackjack = true;
      }
    }
  }
  if (compBlackjack == true && playerBlackjack == true) {
    playerBlackjack = false;
    return `Both of you have gotten a blackjack! Its a draw! ${playerHandText} <br><br> ${compHandText}`;
  } else if (compBlackjack == true && playerBlackjack != true) {
    return `The computer got a blackjack and you lost!<br><br>${playerHandText} <br><br> ${compHandText}`;
  } else if (compBlackjack != true && playerBlackjack == true) {
    playerBlackjack = false;
    return `You have gotten a blackjack and won!<br><br>${playerHandText} <br><br> The computer did not get a blackjack.`;
  } else {
    return `${playerHandText}`;
  }
};

var playerTurnFunc = function (input) {
  var myOutputValue = "";
  if (mode == "playerDecisionTurn") {
    if (allPlayers[cardDisplayCounter].player.blackjackCheck == true) {
      mode = "playerEndTurn";
      return `Since you have gotten a blackjack, please pass it on to the next player.`;
    } else {
      mode = "playerturn";
      return `Your hand: <br>${allPlayers[cardDisplayCounter].player.playerHand[0].name} of ${allPlayers[cardDisplayCounter].player.playerHand[0].emojiSuit} <br> ${allPlayers[cardDisplayCounter].player.playerHand[1].name} of ${allPlayers[cardDisplayCounter].player.playerHand[1].emojiSuit}`;
    }
  }
  if (mode == "playerturn") {
    //player chooses to hit or stand
    if (input == "hit") {
      var cardDrawn = shuffledDeck.pop();
      allPlayers[cardDisplayCounter].player.playerHand.push(cardDrawn);
      //value calculating should be a diff function maybe?
      valueIndex = 0;
      playerTotalValue = 0;
      while (
        valueIndex < allPlayers[cardDisplayCounter].player.playerHand.length
      ) {
        playerTotalValue =
          playerTotalValue +
          allPlayers[cardDisplayCounter].player.playerHand[valueIndex].value;
        valueIndex += 1;
      }
      if (playerTotalValue > 21) {
        var aceCheckIndex = 0;
        while (
          aceCheckIndex <
          allPlayers[cardDisplayCounter].player.playerHand.length
        ) {
          if (
            allPlayers[cardDisplayCounter].player.playerHand[aceCheckIndex]
              .value == 11
          ) {
            // if ace is in hand AND the value is set to 11, convert its value to 1. the moment this happens, the value is sure to be less than 21 so it is alright to just stop it there.
            allPlayers[cardDisplayCounter].player.playerHand[
              aceCheckIndex
            ].value = 1;
            playerTotalValue = playerTotalValue - 10;
            myOutputValue = `You have drawn ${cardDrawn.name} of ${cardDrawn.emojiSuit} but will bust if you take ace as 11! Therefore, it has been converted to 1. Your hand total is ${playerTotalValue}.`;
            return myOutputValue;
          }
          aceCheckIndex = aceCheckIndex + 1;
        }
        valueIndex = 0;
        while (
          valueIndex < allPlayers[cardDisplayCounter].player.playerHand.length
        ) {
          allPlayers[cardDisplayCounter].player.handTotal =
            allPlayers[cardDisplayCounter].player.handTotal +
            allPlayers[cardDisplayCounter].player.playerHand[valueIndex].value;

          allPlayers[cardDisplayCounter].player.handText =
            allPlayers[cardDisplayCounter].player.handText +
            `<br> Card ${valueIndex + 1}: ${
              allPlayers[cardDisplayCounter].player.playerHand[valueIndex].name
            } of ${
              allPlayers[cardDisplayCounter].player.playerHand[valueIndex]
                .emojiSuit
            }`;

          valueIndex += 1;
        }
        myOutputValue = `You have busted! You drew ${cardDrawn.name} of ${cardDrawn.emojiSuit} and you have gone past 21 with a value of ${playerTotalValue}!`;
      } else if (playerTotalValue < 16) {
        myOutputValue = `You have drawn ${cardDrawn.name} of ${cardDrawn.emojiSuit} but your hand is still under 16 with a value of ${playerTotalValue}!`;
        return myOutputValue;
      } else if (playerTotalValue == 21) {
        allPlayers[cardDisplayCounter].player.handTotal = 21;
        valueIndex = 0;
        while (
          valueIndex < allPlayers[cardDisplayCounter].player.playerHand.length
        ) {
          allPlayers[cardDisplayCounter].player.handText =
            allPlayers[cardDisplayCounter].player.handText +
            `<br> Card ${valueIndex + 1}: ${
              allPlayers[cardDisplayCounter].player.playerHand[valueIndex].name
            } of ${
              allPlayers[cardDisplayCounter].player.playerHand[valueIndex]
                .emojiSuit
            }`;
          valueIndex += 1;
        }
        myOutputValue = `You have drawn ${cardDrawn.name} of ${cardDrawn.emojiSuit} and you have gotten 21!`;
      } else {
        myOutputValue = `You have drawn ${cardDrawn.name} of ${cardDrawn.emojiSuit}! You can either choose to stand with a total hand of ${playerTotalValue} or hit if you're feeling lucky!`;
        return myOutputValue;
      }
    }
    if (input == "stand") {
      valueIndex = 0;
      while (
        valueIndex < allPlayers[cardDisplayCounter].player.playerHand.length
      ) {
        allPlayers[cardDisplayCounter].player.handTotal =
          allPlayers[cardDisplayCounter].player.handTotal +
          allPlayers[cardDisplayCounter].player.playerHand[valueIndex].value;

        allPlayers[cardDisplayCounter].player.handText =
          allPlayers[cardDisplayCounter].player.handText +
          `<br> Card ${valueIndex + 1}: ${
            allPlayers[cardDisplayCounter].player.playerHand[valueIndex].name
          } of ${
            allPlayers[cardDisplayCounter].player.playerHand[valueIndex]
              .emojiSuit
          }`;

        valueIndex += 1;
      }
      playerStandText = `You have stood with a total value of ${allPlayers[cardDisplayCounter].player.handTotal}.`;
      myOutputValue = playerStandText;
    }
  }
  cardDisplayCounter += 1;
  mode = "playerEndTurn";
  if (mode == "playerEndTurn") {
    if (cardDisplayCounter < noOfPlayers) {
      mode = "playerDecisionTurn";
      myOutputValue =
        myOutputValue + ` Next, Player ${cardDisplayCounter + 1}'s turn.`;
    } else {
      mode = "compturn";
      myOutputValue = myOutputValue + ` Now, the computer will go.`;
    }
  }
  return myOutputValue;
};

var compTurnFunc = function (compHand) {
  cardDisplayCounter = 0;
  valueIndex = 0;
  compTotalValue = 0;
  while (valueIndex < compHand.length) {
    compTotalValue = compTotalValue + compHand[valueIndex].value;
    valueIndex += 1;
  }
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
      //comp stands between 16 and 21
      if (compTotalValue <= 21) {
        var myOutputValue = standOffFunc(compHand, compTotalValue, noOfPlayers);
      }
      //comp busts after 21
      else {
        var myOutputValue = computerBust(compHand, noOfPlayers);
      }
    }
  }
  if (compTotalValue <= 21 && compTotalValue >= 16) {
    var myOutputValue = standOffFunc(compHand, compTotalValue, noOfPlayers);
  } else if (compTotalValue < 16) {
    return "The computer has drawn a card and has decided to draw again.";
  }
  mode = "playersetup";
  deck = makeDeck();
  return myOutputValue;
};

var standOffFunc = function (compHand, compTotalValue, noOfPlayers) {
  compHandText = "";
  var compIndex = 0;
  while (compIndex < compHand.length) {
    compHandText =
      compHandText +
      `<br> Card ${compIndex + 1}: ${compHand[compIndex].name} of ${
        compHand[compIndex].emojiSuit
      }`;
    compIndex = compIndex + 1;
  }
  playerIndex = 0;
  var myOutputValue = `The computer has a hand total of ${compTotalValue}.<br> ${compHandText}`;
  while (playerIndex < noOfPlayers) {
    allPlayers[playerIndex].player.handTotal;
    if (allPlayers[playerIndex].player.blackjackCheck == true) {
      myOutputValue = `${myOutputValue}<br><br> ${allPlayers[playerIndex].player.username}, You have already won with a blackjack. ${allPlayers[playerIndex].player.handText}`;
    } else {
      if (
        allPlayers[playerIndex].player.handTotal > compTotalValue &&
        allPlayers[playerIndex].player.handTotal <= 21 &&
        compTotalValue <= 21
      ) {
        myOutputValue = `${myOutputValue}<br><br> ${allPlayers[playerIndex].player.username}, You have won with a total hand of ${allPlayers[playerIndex].player.handTotal} over the computer's hand of ${compTotalValue}. ${allPlayers[playerIndex].player.handText}`;
      } else if (
        allPlayers[playerIndex].player.handTotal < compTotalValue &&
        allPlayers[playerIndex].player.handTotal <= 21 &&
        compTotalValue <= 21
      ) {
        myOutputValue = `${myOutputValue}<br><br> ${allPlayers[playerIndex].player.username},You have lost with a total hand of ${allPlayers[playerIndex].player.handTotal} compared to the computer's hand of ${compTotalValue}. ${allPlayers[playerIndex].player.handText}`;
      } else if (
        allPlayers[playerIndex].player.handTotal > 21 &&
        compTotalValue <= 21
      ) {
        myOutputValue = `${myOutputValue}<br><br> ${allPlayers[playerIndex].player.username},You have lost with a busted value of ${allPlayers[playerIndex].player.handTotal} compared to the computer's hand of ${compTotalValue}. ${allPlayers[playerIndex].player.handText}.`;
      } else if (allPlayers[playerIndex].player.handTotal == compTotalValue) {
        myOutputValue = `${myOutputValue}<br><br> ${allPlayers[playerIndex].player.username},You have pushed (draw) with both total hands of ${allPlayers[playerIndex].player.handTotal}. ${allPlayers[playerIndex].player.handText}`;
      }
    }
    playerIndex += 1;
  }
  return myOutputValue;
};

var computerBust = function (compHand, noOfPlayers) {
  compHandText = "The computer's cards are:";
  var compIndex = 0;
  while (compIndex < compHand.length) {
    compHandText =
      compHandText +
      `<br> Card ${compIndex + 1}: ${compHand[compIndex].name} of ${
        compHand[compIndex].emojiSuit
      }`;
    compIndex = compIndex + 1;
  }
  if (compTotalValue > 21) {
    var aceCheckIndex = 0;
    while (aceCheckIndex < compHand.length) {
      if (compHand[aceCheckIndex].value == 11 && compTotalValue > 21) {
        // if ace is in hand, convert its value to 1. the moment this happens, the value is sure to be less than 21 so it is alright to just stop it there.
        compHand[aceCheckIndex].value = 1;
        compTotalValue = compTotalValue - 10;
      }
      aceCheckIndex += 1;
    }
    if (compTotalValue < 16) {
      return `The computer has drawn a card and has decided to draw again. The computer currently has ${compHand.length} cards in hand`;
    } else if (compTotalValue > 21) {
      //if player has <= 21, comp loses
      var comparisonIndex = 0;
      var myOutputValue = `The computer bust with a hand of ${compTotalValue}<br><br>${compHandText}`;
      while (comparisonIndex < noOfPlayers) {
        if (allPlayers[comparisonIndex].player.handTotal <= 21) {
          myOutputValue = `${myOutputValue}<br><br> ${allPlayers[comparisonIndex].player.username}, your total hand is ${allPlayers[comparisonIndex].player.handTotal}. The computer has bust with a hand of ${compTotalValue}! You win!<br> ${allPlayers[comparisonIndex].player.handText}`;
        }
        //if player has bust, push (Draw)
        else if (allPlayers[comparisonIndex].player.handTotal >= 21) {
          myOutputValue = `${myOutputValue}<br><br> ${allPlayers[comparisonIndex].player.username}, your total hand is ${allPlayers[comparisonIndex].player.handTotal}. The computer has bust with a hand of ${compTotalValue}! You have therefore drawn!<br> ${allPlayers[comparisonIndex].player.handText}`;
        }
        comparisonIndex += 1;
      }
    }
  }
  return myOutputValue;
};

var inputDisplay = function () {
  // change to new lowest and normal modes
  if (mode == "playersetup") {
    return "Please input the number of players for this round.";
  } else if (mode == "inputname") {
    return "Please input your name.";
  } else if (mode == "compdeal") {
    return `Please click submit for the computer to deal the cards!`;
  } else if (mode == "dealmode") {
    return `Please click submit!`;
  } else if (mode == "playerturn") {
    return `${allPlayers[cardDisplayCounter].player.username}, please choose to either hit or stand.`;
  } else if (mode == "playerDecisionTurn") {
    return `Next player, please click submit to see your hand.`;
  } else if (mode == "playerEndTurn") {
    return `This is the end of your turn.`;
  } else if (mode == "compturn") {
    return "It is now the computer's turn. Please click submit.";
  } else if (mode == "playerBlackjackCheck" || mode == "compBlackjackCheck") {
    return "Input";
  }
};
