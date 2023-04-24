/*
Rules of the game. 
1.There will be only two players. One human and one computer (for the Base solution).
2.The computer will always be the dealer.
3.Each player gets dealt two cards to start.
4.The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
5.The dealer has to hit if their hand is below 17.
6.Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
7.The player who is closer to, but not above 21 wins the hand.

_______________________________________________________________________________________________________________
Programming Logic Step by Step 
Step 1: Deck is shuffled.
Step 2: User clicks Submit to deal cards. -> receive two cards

Points to note: The computer will always be the dealer. Each player gets dealt two cards to start

Step 3: The cards are analysed for game winning conditions, e.g. Blackjack.

Winning Condition: The player who is closer to, but not above 21 wins the hand.
Supplementary Condition: The dealer has to hit if their hand is below 17.

The cards are displayed to the user.
The user decides whether to hit or stand, using the submit button to submit their choice.
The user's cards are analysed for winning or losing conditions.
The game either ends or continues.

_________________________________________________________________________________________________________________
Details: in Pointers

Card Value: 1,2,3,4,5,6,7,8,9,10
Card Name: A,2,3,4,5,6,7,8,9,10,J,Q,K
Card Type: Spade, CLub, Diamond, Hearts
Total Cards: 52

Symbol: ♣ ♦ ♥ ♠

Things to Track: 
(1)Computer Total. 
(2)Player Total
(3) If below 17 dealer must draw one more card.
(4) If player: 21 Computer < 21 then player Wins. 
(5) If player/ computer above 21, player/computer loses
____________________________________________________________________________________________________________________
*/

/*********************************************************************************************************/
// 1. Declaration of GLobal Variables.
var deck;
var cardDeck;
var getCardDeck;
var myOutputValue = "";
var getDisplayOfDeck;
var getDisplayOfShuffledDeck;

var getShuffledDeck;

var dealerTotal = 0;
var playerTotal = 0;
var dealerAceCount = 0;
var playerAceCount = 0;
var hiddenCard;
var toStartGame;

var toHit = true;

var getHiddenCardValue;
var getCardValue;
var getAceCardValueForHidden;
var getAceCardValue;
var getDealerDrawCard;
var getPlayerDrawCard;
var getReduceAceValue;

var clickHitButton;
var clickStayButton;
var clickStartGameButton;
var clickResetButton;
var blankOutcome;
var finalPlayerPoints;
var finalDealerPoints;
var element;

/*********************************************************************************************************/
//2. Creation of a Deck.
cardDeck = function () {
  //Note the card file list as values.suits
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let suits = ["C", "D", "H", "S"];
  // Curently the deck is empty.
  deck = [];
  // Proceed to populate the deck arrat using loops.
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + suits[i]);
    }
  }
  for (let i = 0; i < deck.length; i++) {
    let cardImage = document.createElement("img");
    let card = deck[i];
    cardImage.src = "./card/" + card + ".png";
    document.getElementById("originalCardDeck").append(cardImage);
  }
  console.log(deck);
};

console.log("Card Deck Array:");
getCardDeck = cardDeck();

/*********************************************************************************************************/
// 3. Display Deck Array

var displayDeck = function () {
  myOutputValue = `Original Deck Array:` + `<br>` + `${deck}`;
  return myOutputValue;
};

getDisplayOfDeck = displayDeck();

/*********************************************************************************************************/
// 4. Shuffle the Deck.

var shuffledDeck = function () {
  for (i = 0; i < deck.length; i++) {
    // Scrambling the order so that the array can shuffled.
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  for (let i = 0; i < deck.length; i++) {
    let cardImage = document.createElement("img");
    let card = deck[i];
    cardImage.src = "./card/" + card + ".png";
    document.getElementById("shuffledCardDeck").append(cardImage);
  }
};

getShuffledDeck = shuffledDeck();
console.log("Shuffled Card Deck Array:");
console.log(deck);
/*********************************************************************************************************/
// 5. Display shuffled the Deck.
var displayShuffledDeck = function () {
  myOutputValue = `Shuffled Deck:` + `<br>` + `${deck}`;
  return myOutputValue;
};

getDisplayOfShuffledDeck = displayShuffledDeck();

/*********************************************************************************************************/
// 6. Getting the Value on the Card
var cardValue = function (card) {
  let data = card.split("-"); // Card name is label as value . suits. value will be in the first index of the array.
  console.log(data);
  let value = data[0];
  console.log("Value of Card:");
  console.log(value);

  // To check if the value contain digit or else if it is not a number -> A can be 10 or 11 and if (K,Q,J) -> 10.
  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10; // -> For J,Q,K.
  }
  return parseInt(value); // to return the value of a card if it is a number.
};

/*********************************************************************************************************/
// 7. To check hidden card value.
hidden = deck.pop(); // last card is designated as the hidden card.
getHiddenCardValue = cardValue(hidden);
console.log("Card:");
console.log(hidden);
console.log("Value of Hidden Card:");
console.log(getHiddenCardValue);

/*********************************************************************************************************/
// 8. To refine the value of Ace Card
var AceCardValue = function (card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
};

/*********************************************************************************************************/
// 9. To track the total count for dealer.
getAceCardValueForHidden = AceCardValue(hidden);

dealerTotal += getHiddenCardValue;
dealerAceCount += getAceCardValueForHidden;

console.log("Dealer Score:");
console.log(dealerTotal, dealerAceCount);

/*********************************************************************************************************/
// 10. To give dealer another card when the score is below 17.
var dealerDrawCard = function () {
  while (dealerTotal < 17) {
    let cardImage = document.createElement("img");
    let card = deck.pop();
    cardImage.src = "./card/" + card + ".png";
    getCardValue = cardValue(card);
    dealerTotal += getCardValue;
    getAceCardValue = AceCardValue(card);
    dealerAceCount += getAceCardValue;
    document.getElementById("dealer-cards").append(cardImage);
  }
};

//getDealerDrawCard = dealerDrawCard();
console.log("Dealer Score:");
console.log(dealerTotal);

/*********************************************************************************************************/
// 11. Player to draw card
var playerDrawCard = function () {
  for (i = 0; i < 2; i++) {
    let cardImage = document.createElement("img");
    let card = deck.pop();
    cardImage.src = "./card/" + card + ".png";
    getCardValue = cardValue(card);
    playerTotal += getCardValue;
    getAceCardValue = AceCardValue(card);
    playerAceCount += getAceCardValue;
    document.getElementById("player-cards").append(cardImage);
  }
};

//getPlayerDrawCard = playerDrawCard();
console.log("Player Score");
console.log(playerTotal);

/*********************************************************************************************************/
// 12. Functionality to the Hit button
var hitButton = function () {
  if (!toHit) {
    return;
  }
  let cardImage = document.createElement("img");
  let card = deck.pop();
  cardImage.src = "./card/" + card + ".png";
  getCardValue = cardValue(card);
  playerTotal += getCardValue;
  getAceCardValue = AceCardValue(card);

  playerAceCount += getAceCardValue;
  document.getElementById("player-cards").append(cardImage);

  if (getReduceAceValue > 21) {
    toHit = false;
    // Eg changing the value of Ace from 11 to 1 if the condition is met
  }
};

//clickHitButton = hitButton();
clickHitButton = document
  .getElementById("hit-button")
  .addEventListener("click", hitButton);

/*********************************************************************************************************/
// 13. To change to Ace count from 10 or 11 to 1 if condition

var reduceAceValue = function (playerTotal, playerAceCount) {
  if (playerTotal > 21 && playerAceCount == 1) {
    playerTotal -= 1;
    playerAceCount += 0;
  } else if (playerTotal > 21 && playerAceCount >= 2) {
    playerTotal -= 1;
    playerAceCount -= 1;
  } else if (playerTotal < 21 && playerAceCount == 1) {
    playerTotal -= 0;
    playerAceCount -= 0;
  } else if (playerTotal < 21 && playerAceCount >= 2) {
    playerTotal -= 10;
    playerAceCount -= 1;
  }
  return playerTotal;
};
getReduceAceValue = reduceAceValue();

console.log("Player Score");
console.log(playerTotal);

/*
Notes for part 13: 
A[] -> Ace count.
A[0]=1
A[1] =11
If one ace appear =11
if two aces appear = 22 however it is black jack therefore total score must deduct by 1

Only when two aces appear the value of one ace must be reduce to 10 

So long as 1 ace appear in the arrange the default value is 11

There are 4 cases to consider:
1. When total score > 21 and an ace appear, the value of Ace must be 11. 
2. When total score > 21 and two aces appear eg. first and third draw are two ace. Then the one of the Ace value must be 1 where the 

3. When total score < 21 and one ace appear eg second or third draw -> Ace Value for must be 11. 

4. when total score < 21 and two ace appear eg second and third draw -> 
ace value must be 11 and 1.
*/

/*********************************************************************************************************/
// 14. Functionality to the Stay button

var standButton = function () {
  dealerTotal = reduceAceValue(dealerTotal, dealerAceCount);
  playerTotal = reduceAceValue(playerTotal, playerAceCount);

  finalDealerPoints = dealerTotal;
  finalPlayerPoints = playerTotal;
  document.getElementById("dealerpoints").innerHTML = finalDealerPoints;
  document.getElementById("playerpoints").innerHTML = finalPlayerPoints;

  toHit = false;
  document.getElementById("hidden").src = "./card/" + hidden + ".png";

  myOutputValue = "";
  if (playerTotal > 21) {
    myOutputValue = `Player Lose!`;
  } else if (dealerTotal > 21 && finalPlayerPoints == 21) {
    myOutputValue = `Player Win!` + `<br>` + `Player has a Black Jack!`;
  } else if (dealerTotal > 21) {
    myOutputValue = `Player Win!`;
  } else if (
    playerTotal == dealerTotal &&
    finalDealerPoints == 21 &&
    finalPlayerPoints == 21
  ) {
    myOutputValue =
      `It is a Tie!` + `<br>` + ` Both Player and Dealer has Black Jack!`;
  } else if (playerTotal == dealerTotal) {
    myOutputValue = `It is a Tie!`;
  } else if (playerTotal > dealerTotal && finalPlayerPoints == 21) {
    myOutputValue = `Player Win!` + `<br>` + `Player has a Black Jack!!`;
  } else if (playerTotal > dealerTotal) {
    myOutputValue = `Player Win!`;
  } else if (dealerTotal > playerTotal && finalDealerPoints == 21) {
    myOutputValue = `Dealer has a Back Jack!!`;
  } else if (playerTotal < dealerTotal) {
    myOutputValue = `Player Lose!`;
  }

  document.getElementById("output-div").innerHTML = myOutputValue;
  return myOutputValue;
};

clickStayButton = document
  .getElementById("stand-button")
  .addEventListener("click", standButton);

/*********************************************************************************************************/
// 15. Functionality to the Blank the Outcome

blankOutcome = function () {
  document.getElementById("output-div").innerHTML = "";
};

/*********************************************************************************************************/
// 16. Functionality to the Start Game button

clickStartGameButton =
  document
    .getElementById("hide-button")
    .addEventListener("click", playerDrawCard) +
  document
    .getElementById("hide-button")
    .addEventListener("click", dealerDrawCard) +
  document
    .getElementById("hide-button")
    .addEventListener("click", blankOutcome);

/*********************************************************************************************************/
// 17. Limit Functionality to one click for Start Game button
function disable(x) {
  x.disabled = true;
}
/*********************************************************************************************************/
