/*

There will be only two players. One human and one computer (for the Base solution).
The computer will always be the dealer.
Each player gets dealt two cards to start.
The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
The dealer has to hit if their hand is below 17.
Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
The player who is closer to, but not above 21 wins the hand.

Base
Gameplay Description
The main function runs on each player's turn. The sequence of actions in the game might be the following.
Deck is shuffled.
User clicks Submit to deal cards.
The cards are analysed for game winning conditions, e.g. Blackjack.
The cards are displayed to the user.
The user decides whether to hit or stand, using the submit button to submit their choice.
The user's cards are analysed for winning or losing conditions.
The computer decides to hit or stand automatically based on game rules.
The game either ends or continues.
*/
document.querySelector("#hit-button").disabled = true;
document.querySelector("#stand-button").disabled = true;
document.querySelector("#submit-button").disabled = false;

var playerHandArr = [];
var dealerHandsArr = [];

let isPlayerBlackJack = false;
let isPlayerBusted = false;
let isDealerBlackJack = false;
let isDealerBusted = false;

let playerHandTotal = 0;
let dealerHandTotal = 0;

let gameOver = false;
let gameState = "";

let replayMsg = "<br><br>Click deal to play again!";
let imageLose =
  '<div style="width:480px"><iframe allow="fullscreen" frameBorder="" height="200" src="https://giphy.com/embed/oZJbVLZhpUoGoNgWW5/video" width="700"></iframe></div>';
let imageWin =
  '<div style="width:480px"><iframe allow="fullscreen" frameBorder="" height="200" src="https://giphy.com/embed/Id1Ay5MD5IsF6Or51v" width="700"></iframe></div>';

var deck = makeDeck();

function makeDeck() {
  var cardDeck = [];
  //var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suits = ["❤️", "♦️", "♣️", "♠️"];
  for (let i = 0; i < suits.length; i++) {
    var currentSuit = suits[i];
    // console.log("suit: ", currentSuit);
    for (let j = 1; j <= 13; j++) {
      var cardName = j;
      var cardRank = j;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        cardRank = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardRank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardRank = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
      };
      cardDeck.push(card);
    }
  }
  return cardDeck;
}

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

function shuffleCards(cardDeck) {
  for (let i = 0; i < cardDeck.length; i++) {
    let randomIndex = getRandomNum(cardDeck.length);
    let randomCard = cardDeck[randomIndex];
    let currentCard = cardDeck[i];

    cardDeck[randomIndex] = currentCard;
    cardDeck[i] = randomCard;
  }
  return deck;
}
//function to draw to 2 cards
function startingHands(shuffledDeck) {
  let playerCardsArr = [];
  //let shuffledDeck = shuffleCards(deck);

  for (let i = 0; i < 2; i++) {
    let drawCard = shuffledDeck.pop();
    playerCardsArr.push(drawCard);
  }
  console.log("Player Cards Array:", playerCardsArr);
  return playerCardsArr;
}
function printHands(cardInHandsArr) {
  let outputString = "";
  for (let i = 0; i < cardInHandsArr.length; i++) {
    outputString += `${cardInHandsArr[i].name} of ${cardInHandsArr[i].suit}<br> `;
  }
  return outputString;
}
function sumInHandsPlayer(cardInHandsArr) {
  let sum = 0;
  let numOfAces = 0;
  for (let i = 0; i < cardInHandsArr.length; i++) {
    if (cardInHandsArr[i].rank == 1) {
      console.log("test ace");

      numOfAces += 1;
      sum += 10;
    }
    // console.log("test");
    // console.log("card rank:", cardInHandsArr[i].rank);
    sum += cardInHandsArr[i].rank;
  }
  if (sum > 21 && numOfAces > 0) {
    for (let i = 0; i < numOfAces.length; i++) {
      sum -= 9;
      if (sum <= 21) {
        break;
      }
    }
  }
  if (sum == 21) {
    isPlayerBlackJack = true;
  }
  if (sum > 21) {
    isPlayerBusted = true;
  }
  return sum;
}

function sumInHandsDealer(cardInHandsArr) {
  let sum = 0;
  let numOfAces = 0;
  for (let i = 0; i < cardInHandsArr.length; i++) {
    if (cardInHandsArr[i].rank == 1) {
      console.log("test ace");

      numOfAces += 1;
      sum += 10;
    }
    // console.log("test");
    // console.log("card rank:", cardInHandsArr[i].rank);
    sum += cardInHandsArr[i].rank;
  }
  if (sum > 21 && numOfAces > 0) {
    for (let i = 0; i < numOfAces.length; i++) {
      sum -= 9;
      if (sum <= 21) {
        break;
      }
    }
  }
  if (sum == 21) {
    isDealerBlackJack = true;
  }
  if (sum > 21) {
    isDealerBusted = true;
  }
  return sum;
}

function resultDisplay(playerHandTotal) {
  if (isPlayerBlackJack && !isDealerBlackJack) {
    gameOver = true;
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#stand-button").disabled = true;
    document.querySelector("#submit-button").disabled = false;
    return `${imageWin} Your hands are:<br> ${printHands(playerHandArr)}
            Your hand totals to: ${playerHandTotal}
            <br><br>
            Dealer hands are: <br> ${printHands(dealerHandsArr)}
            Dealer hand totals to: ${dealerHandTotal}
            <br><br>
            Black Jack! You won the game! ${replayMsg}`;
  } else if (isPlayerBusted) {
    gameOver = true;
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#stand-button").disabled = true;
    document.querySelector("#submit-button").disabled = false;
    return `${imageLose}<br>Your hands:<br> ${printHands(playerHandArr)}
            Your hand totals to: ${playerHandTotal}
            <br><br>
            
            You have busted the game! You lose!${replayMsg}`;
  } else if (isPlayerBlackJack && isDealerBlackJack) {
    gameOver = true;
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#stand-button").disabled = true;
    document.querySelector("#submit-button").disabled = false;
    return `Your hands are:<br> ${printHands(playerHandArr)}
            Your hand totals to: ${playerHandTotal}
            <br><br>
            Dealer hands are: <br> ${printHands(dealerHandsArr)}
            Dealer hand totals to: ${dealerHandTotal}
            <br><br>
            It's a tie${replayMsg}`;
  }
  document.querySelector("#hit-button").disabled = false;
  document.querySelector("#stand-button").disabled = false;
  document.querySelector("#submit-button").disabled = true;
  return ` Your hands:<br> ${printHands(playerHandArr)}
            Your hand totals to: ${playerHandTotal}
          <br><br>
          Choose to "Hit" or "Stand"`;
}
function resultDisplayStand(playerHandTotal, dealerHandTotal) {
  gameOver = true;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#submit-button").disabled = false;
  if (isDealerBlackJack && !isPlayerBlackJack) {
    return `${imageLose}<br>
    Your hands:<br> ${printHands(playerHandArr)}
            Your hand totals to: ${playerHandTotal}
            <br><br>
            Dealer's hands: <br> ${printHands(dealerHandsArr)}
            Dealer hand totals to: ${dealerHandTotal}
            <br><br>
            You lose the game ${replayMsg}`;
  } else if (playerHandTotal > dealerHandTotal && playerHandTotal < 21) {
    return `${imageWin}Your hands:<br> ${printHands(playerHandArr)}
            Your hand totals to: ${playerHandTotal}
            <br><br>
            Dealer's hands: <br> ${printHands(dealerHandsArr)}
            Dealer's hands totals to: ${dealerHandTotal}
            <br><br>
            Black Jack! You won the game!${replayMsg}`;
  } else if (dealerHandTotal > playerHandTotal && dealerHandTotal < 21) {
    return `${imageLose}<br><br>
            Your hands:<br> ${printHands(playerHandArr)}
            Your hand totals to: ${playerHandTotal}
            <br><br>
            Dealer hands are: <br> ${printHands(dealerHandsArr)}
            Dealer hand totals to: ${dealerHandTotal}
            <br><br>
            You lose the game${replayMsg} `;
  } else if (playerHandTotal < 21 && dealerHandTotal > 21) {
    return `${imageWin}Your hands:<br> ${printHands(playerHandArr)}
            Your hand totals to: ${playerHandTotal}
            <br><br>
            Dealer hands: <br> ${printHands(dealerHandsArr)}
            Dealer hand totals to: ${dealerHandTotal}
            <br><br>
            Black Jack! You won the game!${replayMsg}`;
  } else if (playerHandTotal == dealerHandTotal && playerHandTotal < 21) {
    return `Your hands:<br> ${printHands(playerHandArr)}
            Your hand totals to: ${playerHandTotal}
            <br><br>
            Dealer hands are: <br> ${printHands(dealerHandsArr)}
            Dealer hand totals to: ${dealerHandTotal}
            <br><br>
            It's a tie${replayMsg}`;
  }
}

function playerHit() {
  gameState = "player hit";
}

function playerStand() {
  gameState = "player stand";
}
function reset() {
  playerHandArr = [];
  dealerHandsArr = [];

  isPlayerBlackJack = false;
  isPlayerBusted = false;
  isDealerBlackJack = false;
  isDealerBusted = false;
  gameOver = false;
}

var main = function (input) {
  let shuffledDeck = shuffleCards(deck);
  console.log("game over is:", gameOver);
  if (gameOver != false) {
    reset();
  }
  if (playerHandArr.length == 0) {
    playerHandArr = startingHands(shuffledDeck);
    dealerHandsArr = startingHands(shuffledDeck);
    playerHandTotal = sumInHandsPlayer(playerHandArr);
    dealerHandTotal = sumInHandsDealer(dealerHandsArr);
    console.log("dealer hand sum:", dealerHandTotal);
    return resultDisplay(playerHandTotal, dealerHandTotal);
  }

  if (gameState == "player hit") {
    playerHandArr.push(shuffledDeck.pop());
    playerHandTotal = sumInHandsPlayer(playerHandArr);
    return resultDisplay(playerHandTotal);
  }
  //let userInput = input.toLowerCase();
  if ((gameState = "player stand")) {
    if (dealerHandTotal < 17) {
      dealerHandsArr.push(shuffledDeck.pop());
      console.log("dealer hands arr:", dealerHandsArr);
      dealerHandTotal = sumInHandsDealer(dealerHandsArr);
      console.log("dealer hands total:", dealerHandTotal);
      return resultDisplayStand(playerHandTotal, dealerHandTotal);
    }
    return resultDisplayStand(playerHandTotal, dealerHandTotal);
  }
};
