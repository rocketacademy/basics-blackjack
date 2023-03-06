var deck;
var shuffledDeck;
var playerCards = [];
var compCards = [];
var playerSum;
var compSum;
var outputBox = document.getElementById("output-div");
var dealButton = document.getElementById("deal-button");
var hitButton = document.getElementById("hit-button");
var standButton = document.getElementById("stand-button");

var makeDeck = function () {
  //empty deck array
  var cardDeck = [];
  //initialise array with 4 suits
  var suits = ["Hearts ♥️ ", "Diamonds ♦️", "Clubs ♣️", "Spades ♠️"];

  //loop over suits array
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    //store current suit in variable
    var currentSuit = suits[suitIndex];

    //loop from 1 to 13 to create all cards for a given suit
    for (var counter = 1; counter <= 13; counter++) {
      //default card name is same as its rank
      var rankCounter = counter;
      var cardName = rankCounter;

      //if rank is 1, 11, 12, 13
      if (cardName == 1) {
        cardName = "♤ Ace";
      } else if (cardName == 11) {
        rankCounter = 10;
        cardName = "🤴🏼 Jack";
      } else if (cardName == 12) {
        rankCounter = 10;
        cardName = "👑 Queen";
      } else if (cardName == 13) {
        rankCounter = 10;
        cardName = "🫅🏼 King";
      }

      //create a new card with name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      //push card into deck
      cardDeck.push(card);
    }
  }
  //return completed card deck
  return cardDeck;
};

var getRandomIndex = function (cardsNum) {
  return Math.floor(Math.random() * cardsNum);
};

var shuffleCards = function (cardDeck) {
  //loop over the card deck array once
  for (var currentIndex = 0; currentIndex < cardDeck.length; currentIndex++) {
    //select random index 0-51
    var randomIndex = getRandomIndex(cardDeck.length);
    //select random card according to chosen index
    var randomCard = cardDeck[randomIndex];
    //select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    //swap positions of both cards
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  //return shuffled deck
  return cardDeck;
};

var draw2Cards = function (shuffledDeck) {
  //pop 2 cards out of shuffled deck
  var card1 = shuffledDeck.pop();
  var card2 = shuffledDeck.pop();
  var array = [];
  //push cards into array
  array.push(card1, card2);
  //return array
  return array;
};

var listOfCards = function (cards) {
  var cardsList = "";
  //loop each card in array
  for (var cardsCounter = 0; cardsCounter < cards.length; cardsCounter++) {
    //add card to a list
    cardsList +=
      cards[cardsCounter].name + " of " + cards[cardsCounter].suit + "<br>";
  }
  //return list of cards
  return cardsList;
};

var sumCounter = function (cards) {
  var sum = 0;
  var aceNum = 0;
  //loop through each card in array
  for (var counter = 0; counter < cards.length; counter++) {
    var currentCard = cards[counter];
    //if card is ace, count as 11
    if (currentCard.rank == 1) {
      aceNum += 1;
      sum += 11;
    } else {
      //if card is not ace, directly add their rank to sum
      sum += currentCard.rank;
    }
  }
  //count alternative score for ace
  if (sum > 21 && aceNum > 0) {
    for (var aceCounter = 0; aceCounter < aceNum; aceCounter++) {
      sum -= 10;
      if (sum <= 21) {
        break;
      }
    }
  }
  //return sum
  return sum;
};

var defaultHandSumMsg = function (playerCards, compCards, playerSum, compSum) {
  return `<u> YOUR HAND </u> <br> ${listOfCards(
    playerCards
  )} <b>Your hand totals to ${playerSum}!</b> <br><br> <u>DEALER'S HAND</u> <br> ${listOfCards(
    compCards
  )}<b>Dealer's hand totals to ${compSum}!</b> <br><br> Click the 'deal' button to play again!`;
};

var defaultWinMsg = function (playerCards, compCards, playerSum, compSum) {
  outputBox.innerHTML = `YOU WON! 😲 <br> <br> ${defaultHandSumMsg(
    playerCards,
    compCards,
    playerSum,
    compSum
  )}`;
};

var defaultLoseMsg = function (playerCards, compCards, playerSum, compSum) {
  outputBox.innerHTML = `HA! YOU LOST! 😵 <br> <br> ${defaultHandSumMsg(
    playerCards,
    compCards,
    playerSum,
    compSum
  )}`;
};

var defaultTieMsg = function (playerCards, compCards, playerSum, compSum) {
  outputBox.innerHTML = `IT'S A TIE! 😪 <br><br> ${defaultHandSumMsg(
    playerCards,
    compCards,
    playerSum,
    compSum
  )}`;
};

var defaultHitOrStandMsg = function (playerCards) {
  outputBox.innerHTML = `<u> YOUR HAND </u> <br> ${listOfCards(
    playerCards
  )} <b>Your hand totals to ${sumCounter(
    playerCards
  )}</b> <br><br> Press 'hit' or 'stand'!`;
};

var defaultBustedMsg = function (playerCards, playerSum) {
  outputBox.innerHTML = `HA! YOU BUSTED! 😂 <br><br> <u> YOUR HAND </u> <br> ${listOfCards(
    playerCards
  )} <b>Your hand totals to ${playerSum}!</b> <br><br> Click the 'deal' button to play again!`;
};

var defaultStandMsg = function (playerCards, playerSum) {
  outputBox.innerHTML = `<u> YOUR HAND </u> <br> ${listOfCards(
    playerCards
  )} <b>Your hand totals to ${playerSum}!</b> <br><br> Click 'stand' to view the Dealer's cards!`;
};

//functions to disable/enable buttons accordingly
var startOfGameButtons = function () {
  dealButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;
};

var hitOrStandButtons = function () {
  dealButton.disabled = true;
  hitButton.disabled = false;
  standButton.disabled = false;
};

var standButtonOnly = function () {
  dealButton.disabled = true;
  hitButton.disabled = true;
  standButton.disabled = false;
};

//disable hit and stand buttons at the start
startOfGameButtons();

//DEAL
dealButton.addEventListener("click", function () {
  //make and shuffle deck
  deck = makeDeck();
  shuffledDeck = shuffleCards(deck);
  // draw cards and store into respective arrays
  playerCards = draw2Cards(shuffledDeck);
  compCards = draw2Cards(shuffledDeck);
  //calculate sum for players
  compSum = sumCounter(compCards);
  playerSum = sumCounter(playerCards);
  console.log("compSum1: ", compSum);
  //if player get blackjack
  if (playerSum == 21 && compSum != 21) {
    defaultWinMsg(playerCards, compCards, playerSum, compSum);
  }
  //if both get blackjack on first 2 cards - TIE
  else if (playerSum == 21 && compSum == 21) {
    defaultTieMsg(playerCards, compCards, playerSum, compSum);
  }
  //player did not get blackjack - ask Hit or Stand
  else {
    hitOrStandButtons();
    defaultHitOrStandMsg(playerCards);
  }
});

//HIT
hitButton.addEventListener("click", function () {
  //player draw extra cards when they click hit
  var cardExtra = shuffledDeck.pop();
  playerCards.push(cardExtra);
  //recount cuurent sum for respective players
  playerSum = sumCounter(playerCards);
  //player sum > 21 - player lose
  if (playerSum > 21) {
    startOfGameButtons();
    defaultBustedMsg(playerCards, playerSum);
  }
  //player sum < 21 - ask Hit or Stand
  else if (playerSum < 21) {
    defaultHitOrStandMsg(playerCards, playerSum, compSum);
  }
  //if player get 21 with extra card
  else if (playerSum == 21) {
    //only enable stand button
    standButtonOnly();
    defaultStandMsg(playerCards, playerSum);
  }
});

//STAND
standButton.addEventListener("click", function () {
  //comp draw cards if sum < 17
  while (compSum < 17) {
    compCardExtra = shuffledDeck.pop();
    compCards.push(compCardExtra);
    compSum = sumCounter(compCards);
  }
  console.log("compSum2: ", compSum);
  //enable deal button only
  startOfGameButtons();
  //both have same score - TIE
  if (playerSum == compSum) {
    defaultTieMsg(playerCards, compCards, playerSum, compSum);
  }
  //player win conditions
  else if ((playerSum > compSum && playerSum <= 21) || compSum > 21) {
    defaultWinMsg(playerCards, compCards, playerSum, compSum);
  }
  //player lose
  else {
    defaultLoseMsg(playerCards, compCards, playerSum, compSum);
  }
});

//----------------------------------
//-----MAIN OF BLACKJACK BASE-------
//----------------------------------
// var main = function (input) {
//   if (gameMode == drawCards) {
//     deck = makeDeck();
//     shuffledDeck = shuffleCards(deck);
//     playerCards = draw2Cards(shuffledDeck);
//     compCards = draw2Cards(shuffledDeck);
//     var compSum = sumCounter(compCards);
//     console.log(compSum);
//     while (compSum < 17) {
//       compCardExtra = shuffledDeck.pop();
//       compCards.push(compCardExtra);
//       compSum = sumCounter(compCards);
//     }
//     console.log(sumCounter(compCards));
//     if (compSum == 21) {
//       return "The sum of Dealer's cards is 21! <br> Ha! you lost! ";
//     }
//     gameMode = hitOrStand;
//     return `your cards are: <br><br> ${listOfCards(
//       playerCards
//     )} <br><br> Enter 'hit' or 'stand'!`;
//   }

// if (gameMode == hitOrStand) {
//   if (input != "hit" && input != "stand") {
//     return `Please ONLY input 'hit' or 'stand'!😡`;
//   }
//   if (input == "stand") {
//     gameMode = determineWinner;
//   }
//   if (input == "hit") {
//     cardExtra = shuffledDeck.pop();
//     playerCards.push(cardExtra);
//     var playerSum = sumCounter(playerCards);
//     if (playerSum > 21) {
//       gameMode = drawCards;
//       return `HA! YOU BUSTED! Your cards are: <br><br> ${listOfCards(
//         playerCards
//       )}`;
//     }
//     if (playerSum == 21) {
//       gameMode = determineWinner;
//     }
//     if (playerSum < 21) {
//       return `your cards are: <br><br> ${listOfCards(
//         playerCards
//       )} <br><br> Enter 'hit' or 'stand'!`;
//     }
//   }
// }

//   if (gameMode == determineWinner) {
//     playerSum = sumCounter(playerCards);
//     compSum = sumCounter(compCards);
//     gameMode = drawCards;
//     if (
//       (playerSum > compSum && playerSum <= 21) ||
//       (playerSum <= 21 && compSum > 21)
//     ) {
//       return `playerSum is ${playerSum}. compSum is ${compSum}. you win!`;
//     } else if (playerSum < compSum && compSum <= 21) {
//       return `playerSum is ${playerSum}. compSum is ${compSum}. you lose!`;
//     } else {
//       return `it's a tie`;
//     }
//   }
// };
