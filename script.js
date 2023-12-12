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
var deck = makeDeck();

function makeDeck() {
  var cardDeck = [];
  //var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suits = ["♡", "♦️", "♣️", "♠️"];
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
function sumInHands(cardInHandsArr) {
  let sum = 0;
  let numOfAces = 0;
  for (let i = 0; i < cardInHandsArr.length; i++) {
    if (cardInHandsArr[i].rank == 1) {
      console.log("test ace");

      numOfAces += 1;
      sum += 10;
    }
    console.log("test");
    console.log("card rank:", cardInHandsArr[i].rank);
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

  return sum;
}
var main = function (input) {
  if (!input) {
    let shuffledDeck = shuffleCards(deck);

    let playerStartHandsArr = startingHands(shuffledDeck);
    // console.table(playerStartHandsArr);
    let dealerStartHandsArr = startingHands(shuffledDeck);
    let playerHandTotal = sumInHands(playerStartHandsArr);
    let dealerHandTotal = sumInHands(dealerStartHandsArr);

    return `Your hands are:<br> ${printHands(playerStartHandsArr)}
            Your hand totals to: ${playerHandTotal}
          <br><br>
          Dealer hands are: <br> ${printHands(dealerStartHandsArr)}
            Dealer hand totals to: ${dealerHandTotal}`;
  }
};
