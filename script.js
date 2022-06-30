/*
Logic
--- betting system
- player starts with $100 balance
- Have 4 buttons for $1, $2, $5, $10
- player will choose how much they want to bet, whatever they bet will be added up to a output screen
- have a balance that adds/minus their win/loss

--- playing system
- there will be 5 decks at all times 
- once happy with bet, press 'play' button
- 2 cards for player, 2 cards for dealer
show 2 cards for player, 1 card for dealer at this point 
e.g. player: 9 Spade, 2 Club | 11 points 
e.g. dealer: Jack Spade, Closed card
- if player blackjack, instant win
- if dealer blackjack, instant lose
- if both blackjack, instant draw
- player turn - 2 choices, buttons [stand] [hit]
- [stand], locks in player cards
e.g. before hit - King Diamond, 2 Spades | 12 points 
- [hit], draws a new card for player
e.g. after hit - King Diamon, 2 Spades, 4 Clubs | 16 points
- if player bust, instant lose no matter what cards dealer have
- if player doesn't bust, dealer's turn 
- dealer 2nd card reveal
- if dealer is < 17, draw a card, tally points 
- if dealer is < <17, draw a card, tally points

--- payout system 
- if player wins, add to player balance
- if player loses, minus from their balance


Good to learn from 
Able to show picture - https://supershazwi.github.io/basics-blackjack/
Able to double down & surrender - https://lim-jiahao.github.io/basics-blackjack/
*/

//---------------------------------------------------
// TO MAKE DECKS
// Helper Function - to make deck
var makeDeck = function () {
  var deck = [];
  var suitIndex = 0;
  var suits = ["♠️", "❤️", "♣️", "♦️"];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankIndex = 1;
    while (rankIndex <= 13) {
      var cardName = rankIndex;
      if (cardName == 1) {
        cardName = "A";
      } else if (cardName == 11) {
        cardName = "J";
      } else if (cardName == 12) {
        cardName = "Q";
      } else if (cardName == 13) {
        cardName = "K";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankIndex,
      };
      deck.push(card);
      rankIndex += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

//Helper function - get 5 decks
var createMultipleDecks = function (deck) {
  var deckCounter = 0;
  while (deckCounter < 5) {
    fiveDecks.push(...deck);
    deckCounter += 1;
  }
};

//Helper function - shuffle deck
var shuffleCards = function (cards) {
  index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var randomCard = cards[randomIndex];
    var currentCard = cards[index];
    cards[index] = randomCard;
    cards[randomIndex] = currentCard;
    index += 1;
  }
  return cards;
};
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//Declaring global variables for decks
var deck = makeDeck();
var fiveDecks = [];
var shuffledDeck = [];
createMultipleDecks(deck);
shuffledDeck = shuffleCards(fiveDecks);

//---------------------------------------------------

//Declaring global variables for Player & Dealer
var playerDrawnCards = [];
var dealerDrawnCards = [];
var playerPoints = 0;
var dealerPoints = 0;
var playerBalance = 1000;
var playerBet = 0;

//Declaring global variables for buttons
const HITBUTTON = document.getElementById("hit-button");
HITBUTTON.disabled = true;
const STANDBUTTON = document.getElementById("stand-button");
STANDBUTTON.disabled = true;
const ONEBUTTON = document.getElementById("one-button");
ONEBUTTON.disabled = false;

//---------------------------------------------------
// Helper Function - FIRST DRAW, draw out 2 cards(array of objects)
var draw2Cards = function (shuffledDeck) {
  drawCounter = 0;
  var drawnCard = [];
  while (drawCounter < 2) {
    drawnCard[drawCounter] = shuffledDeck.pop();
    drawCounter += 1;
  }

  return drawnCard;
};

// Helper Function - SUBSEQUENT DRAW
var subsequentDraws = function (shuffledDeck) {
  var subsequentDrawnCard = [];
  subsequentDrawnCard = shuffledDeck.pop();
  return subsequentDrawnCard;
};

// Helper Function - Default Cards Message
var totalCardsMessage = function (cardsArray) {
  //for each card in the array, write out the card
  //add up the points of the card
  //write out total points
  var index = 0;
  var cardMessage = "";
  while (index < cardsArray.length) {
    cardMessage += `${cardsArray[index].name}${cardsArray[index].suit}`;
    index += 1;
  }
  var message = `${cardMessage}`;
  // console.log(message);
  return message;
};

var defaultResultsMessage = function (playerDrawnCards, dealerDrawnCards) {
  var playerCardsMessage = totalCardsMessage(playerDrawnCards);
  var dealerCardsMessage = totalCardsMessage(dealerDrawnCards);
  var message = `Player Drew: ${playerCardsMessage} (${playerPoints}) <br><br>Dealer Drew: ${dealerCardsMessage} (${dealerPoints}) <br><br>`;
  return message;
};

//Player Current Balance: ${playerBalance} <br> Player Current Bet: ${playerBet} <br><br>

// Helper Function - Show Drawn Cards
var outputBeforeDealer = function (playerDrawnCards, dealerDrawnCards) {
  var playerCardsMessage = totalCardsMessage(playerDrawnCards);
  var dealerCardsMessage = totalCardsMessage(dealerDrawnCards);
  var defaultMessage = defaultResultsMessage(
    playerDrawnCards,
    dealerDrawnCards
  );
  var message = "";

  //check for blackjack condition
  if (playerPoints == 21) {
    playerBalance = playerBalance + playerBet;
    message = `${defaultMessage}Player Got Blackjack, You win!`;
  } else if (dealerPoints == 21) {
    playerBalance = playerBalance - playerBet;
    message = `${defaultMessage}Dealer Got Blackjack, You lost!`;
  } else {
    //output drawn cards
    message = `Player Drew: ${playerCardsMessage} (${playerPoints}) <br><br>Dealer Face Up Card: ${dealerDrawnCards[0].name}${dealerDrawnCards[0].suit} <br><br>Please choose to 'Hit' or 'Stand'`;
  }
  return message;
};

// Helper Function - After Hitting
var afterHitting = function (playerDrawnCards, dealerDrawnCards) {
  var playerCardsMessage = totalCardsMessage(playerDrawnCards);
  var dealerCardsMessage = totalCardsMessage(dealerDrawnCards);
  var message = "";

  //check for player bust
  if (playerPoints > 21) {
    var defaultMessage = defaultResultsMessage(
      playerDrawnCards,
      dealerDrawnCards
    );
    playerBalance = playerBalance - playerBet;
    message = `${defaultMessage} YOU'VE BUSTED`;
  } else {
    message = `Player Drew: ${playerCardsMessage} (${playerPoints}) <br><br>Dealer Face Up Card: ${dealerDrawnCards[0].name}${dealerDrawnCards[0].suit} <br><br>Please choose to 'Hit' or 'Stand'`;
  }
  return message;
};

//Helper Function - After Standing (Compare Results)
var afterStanding = function (playerDrawnCards, dealerDrawnCards) {
  var playerCardsMessage = totalCardsMessage(playerDrawnCards);
  var dealerCardsMessage = totalCardsMessage(dealerDrawnCards);
  var defaultMessage = defaultResultsMessage(
    playerDrawnCards,
    dealerDrawnCards
  );
  var message = "";
  if (dealerPoints > 21) {
    playerBalance = playerBalance + playerBet;
    message = `${defaultMessage}DEALER BUSTED! YOU WIN!`;
  } else if (playerPoints > dealerPoints) {
    playerBalance = playerBalance + playerBet;
    message = `${defaultMessage}You Won!`;
  } else if (dealerPoints > playerPoints) {
    playerBalance = playerBalance - playerBet;
    message = `${defaultMessage}You Lost!`;
  } else if (playerPoints == dealerPoints) {
    message = `${defaultMessage}It's a tie!`;
  }
  return message;
};

// Helper Function - CALCULATE TOTAL POINTS
var calcPoints = function (currentCards) {
  var cardPoints = 0;
  var currentPointsIndex = 0;
  while (currentPointsIndex < currentCards.length) {
    // if j,q,k = 10 points
    if (
      currentCards[currentPointsIndex].rank == 11 ||
      currentCards[currentPointsIndex].rank == 12 ||
      currentCards[currentPointsIndex].rank == 13
    ) {
      currentCards[currentPointsIndex].rank = 10;
    }
    // extract the rank and turn into points
    cardPoints = cardPoints + currentCards[currentPointsIndex].rank;

    if (currentCards[currentPointsIndex].rank == 1 && cardPoints < 12) {
      cardPoints += 10;
    }
    currentPointsIndex += 1;
  }
  return cardPoints;
};

var bet = function (input) {
  var myOutputValue = "";
  playerBet = input;
  playerDrawnCards = draw2Cards(shuffledDeck);
  playerPoints = calcPoints(playerDrawnCards);
  dealerDrawnCards = draw2Cards(shuffledDeck);
  dealerPoints = calcPoints(dealerDrawnCards);
  myOutputValue = outputBeforeDealer(playerDrawnCards, dealerDrawnCards);
  HITBUTTON.disabled = false;
  STANDBUTTON.disabled = false;
  ONEBUTTON.disabled = true;
  return myOutputValue;
};

var hit = function (input) {
  var playerDraw = shuffledDeck.pop();
  var myOutputValue = "";
  playerDrawnCards.push(playerDraw);
  playerPoints = calcPoints(playerDrawnCards);
  //output current points
  myOutputValue = afterHitting(playerDrawnCards, dealerDrawnCards);
  return myOutputValue;
};

var stand = function (input) {
  var dealerDraw = [];
  while (dealerPoints < 17) {
    dealerDraw = shuffledDeck.pop();
    dealerDrawnCards.push(dealerDraw);
    dealerPoints = calcPoints(dealerDrawnCards);
  }
  myOutputValue = afterStanding(playerDrawnCards, dealerDrawnCards);
  HITBUTTON.disabled = true;
  STANDBUTTON.disabled = true;
  ONEBUTTON.disabled = false;
  return myOutputValue;
};

var betting = function () {
  playerBet = 10;
  myOutputValue = `Wallet Balance = $${playerBalance} <br>You have chosen to bet $${playerBet} <br>Good luck!`;
  return myOutputValue;
};

var standbet = function () {
  playerBalance = playerBalance + playerBet;
  myOutputValue = `Wallet Balance = $${playerBalance}`;
  console.log(`playerbet = ${playerBet}`);
  console.log(`playerbalance = ${playerBalance}`);
  return myOutputValue;
};

/*
Option 1 [WORKS]
Create a new main function for hit and stand 
When hit button clicked - run the hit function 
When stand button clicked - run the stand function
-- seems like this is the one that will work 

for buttons appearing and disappearing, 
https://bobbyhadz.com/blog/javascript-hide-button-after-click

*/

/*
1. Ask player how much they want to bet + show their current balance
  -> Once click, goes to next step 

2. Show player 2 cards, dealer 1 card 
  -> Options to click, Hit or Stand

3. IF HIT, player draw 1 card, output
   IF STAND, show dealer 2 cards, compare results, output
   -> Option to click, Back to step 1 


No need for main function 
Functions I need are 
1. Place bet - generates 2 cards 
2. Hit, Stand - hit=draw card, stand = compare results
3. After results, place bet to generate 2 new cards 

Results 
[DONE] 1. Once draw 2 card, check if any Blackjack - auto win condition
[DONE] 2. If player draw too much, BUST = LOSE
[DONE] 3. If player never BUST, dealer draw until >17 points 
[DONE] 4. If dealer BUST = player Win
[DONE] 5. If dealer NEVER BUST = compare results

DONT CARE ACE FIRST
Ace
If only 2 cards - confirm 11 points 
If more than 2 cards - Ace will be 11 points if all cards <21, 1 point if all cards >21 points

If 1 Ace
If points <=21, Ace = 11
If points >21, Ace = 1

If 2 Ace
1st Ace, either 11 or 1
2nd Ace, must be 1
Note: Only can have 1 
*/
