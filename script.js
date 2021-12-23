/*
1. Deck is shuffled. SET ACE AS 11 FIRST
currentState = shuffle
makeDeck function and shuffleCards function

2. User clicks Submit to deal cards.
currentState = deal cards
a) create 2 ARRAYS for dealer and player for their cards
dealerHand, playerHand
b) pop the shuffled deck: dealer,player,dealer,player
c) display and calculate total ranks of player hands


step 2c) should be repeated after each step

d) The cards are analysed for game winning conditions, e.g. Blackjack.
validate blacjack - ace and 10/jack/queen/king OR use rank (if playerHandTotal == 21)
  if playerHandTotal == 21, end game
  if playerHandTotal != 21, continue game, and change gamestate

myOutputValue = myOutputValue + "<br><br> You got blackjack! You won!"

change currentstate = playerTurn

3. The cards are displayed to the user.
myOutputValue displays the hands and the totals

4. The user decides whether to hit or stand, using the submit button to submit their choice.
a) user to key in INPUT "hit" or "stand", "stand" will change state to next step
b) The user's cards are analysed for winning or losing conditions after each iteration of step 5a),
user's total > 21, user loses.

change currentState = dealerTurn

5. The computer decides to hit or stand automatically based on game rules.
check dealer's hand IF its < 17 - "hit" till >= 17, else "stand"

change currentState = results

6. RESULTS - dealer busts or compare hands, then RESET 
 compare hands
 playerHandTotal and dealerHandTotal

 reshuffle
 empty global var
*/

// GLOBALS
// states
const RESET = "RESET";
const SHUFFLE = "SHUFFLE";
const DEAL_CARDS = "DEAL CARDS";
const PLAYER_TURN = "PLAYER TURN";
const DEALER_START = "DEALER START";
const DEALER_TURN = "DEALER TURN";
const RESULTS = "RESULTS";
var currentState = DEAL_CARDS;
var card; // variable to create cards of the deck

// different arrays to store name, suit and rank of cards
var playerHandNames = [];
var playerHandSuits = [];
var playerHandRanks = [];
var dealerHandNames = [];
var dealerHandSuits = [];
var dealerHandRanks = [];

var playerHand = [];
var playerHandTotal;
var dealerHandTotal;
var myOutputValue = "";

// create deck of cards
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  // var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suits = ["♥", "♦", "♣", "♠"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "J";
      } else if (cardName == 12) {
        cardName = "Q";
      } else if (cardName == 13) {
        cardName = "K";
      }

      // Create a new card with the current name, suit, and rank
      if (rankCounter == 1) {
        // set ACE as 11
        card = {
          name: cardName,
          suit: currentSuit,
          rank: 11,
        };
      } else if (rankCounter == 11 || rankCounter == 12 || rankCounter == 13) {
        card = {
          name: cardName,
          suit: currentSuit,
          rank: 10,
        };
      } else {
        card = {
          name: cardName,
          suit: currentSuit,
          rank: rankCounter,
        };
      }
      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// 1. Deck is shuffled. SET ACE AS 11 FIRST
var deck = shuffleCards(makeDeck());
console.log(deck);

// helper function to draw cards and validate if hand is over 21
var drawCards = function (handNames, handSuits, handRanks, handTotal) {
  var cardDrawn;
  var drawCardOutput = "";
  cardDrawn = deck.pop();
  // if card drawn is ACE, set rank to 1
  if (cardDrawn.name == "Ace") {
    cardDrawn.rank = 1;
  }
  handNames.push(cardDrawn.name);
  handSuits.push(cardDrawn.suit);
  handRanks.push(cardDrawn.rank);
  handTotal = calcHandTotal(handRanks);
  playerHandTotal = handTotal;

  if (handTotal > 21) {
    drawCardOutput = `${cardDrawn.name}${cardDrawn.suit} is drawn. <br><br>
    Current hand is: ${displayHand(handNames, handSuits)}<br>
    Total is: ${handTotal} <br><br>
    YOU LOST! 🙁`;
    currentState = RESET;
  } else {
    drawCardOutput = `${cardDrawn.name}${cardDrawn.suit} is drawn. <br><br>
    Current hand is: ${displayHand(handNames, handSuits)} and <br>
    Total is: ${handTotal} <br><br>
    Type 'hit' or 'stand'`;
  }

  return drawCardOutput;
};
// 2. Dealing cards helper function
var startGame = function () {
  var drawnCard;
  var dealCounter = 0;
  var startGameOutput = "";
  while (dealCounter < 4) {
    // player draws first, then dealer using MODULUS
    if (dealCounter % 2 == 0) {
      drawnCard = deck.pop();
      if (dealCounter > 0 && drawnCard.rank == 1) {
        drawnCard.rank = 1;
      }
      playerHandNames.push(drawnCard.name);
      playerHandSuits.push(drawnCard.suit);
      playerHandRanks.push(drawnCard.rank);
    }
    if (dealCounter % 2 == 1) {
      drawnCard = deck.pop();
      if (dealCounter > 0 && drawnCard.rank == 1) {
        drawnCard.rank = 1;
      }
      dealerHandNames.push(drawnCard.name);
      dealerHandSuits.push(drawnCard.suit);
      dealerHandRanks.push(drawnCard.rank);
    }
    dealCounter = dealCounter + 1;
  }

  // 2c. calculate playerHandTotal using calc helper function
  playerHandTotal = calcHandTotal(playerHandRanks);
  dealerHandTotal = calcHandTotal(dealerHandRanks);

  console.log("playerHandTotal is: ", playerHandTotal);

  // 3. The starting cards are displayed to the user.
  // startGameOutput = ` Player drew: ${playerHandNames}
  //   <br><br>Player's total is: ${playerHandTotal}<br><br><br>
  //   Type "hit" or "stand"`;
  startGameOutput = ` Player drew: ${displayHand(
    playerHandNames,
    playerHandSuits
  )}
    <br><br>Player's total is: ${playerHandTotal}<br><br><br>
    Type "hit" or "stand"`;
  return startGameOutput;
};

// helper function to display hands - cardname + suit eg. ace♠
var displayHand = function (cardNames, cardSuits) {
  var displayCounter = 0;
  while (displayCounter < cardNames.length) {
    playerHand[displayCounter] =
      String(cardNames[displayCounter]) + String(cardSuits[displayCounter]);

    displayCounter = displayCounter + 1;
  }
  return playerHand;
};

// 2c. helper function to calculate total of player's or dealer's hand
var calcHandTotal = function (hand) {
  var counter = 0;
  var total = 0;
  while (counter < hand.length) {
    total = total + hand[counter];
    counter = counter + 1;
  }
  return total;
};

// 6. helper function to compare hands to determine winner
var compareHands = function (playerTotal, dealerHTotal) {
  var resultDisplay = "";
  if (playerTotal > dealerHTotal) {
    resultDisplay = `You have: ${playerTotal}<br>
    Dealer has: ${dealerHTotal}<br><br>
    YOU WIN! 🎉`;
  } else if (playerTotal < dealerHTotal) {
    resultDisplay = `You have: ${playerTotal} <br>
    Dealer has: ${dealerHTotal}<br><br>
    YOU LOSE! 🙁`;
  } else if (playerTotal == dealerHTotal) {
    resultDisplay = `You have: ${playerTotal} <br>
    Dealer has: ${dealerHTotal}<br><br>
    ITS A DRAW! 😐`;
  }
  return resultDisplay;
};

// BLACJACK GAME
var main = function (input) {
  // var myOutputValue = "";
  // beginning of the game - note: currentState = DEAL_CARDS @ 1st ever iteration of the program
  if (currentState == RESET) {
    deck = shuffleCards(makeDeck());

    // empty the global variables to restart game
    playerHandNames = [];
    playerHandSuits = [];
    playerHandRanks = [];
    dealerHandNames = [];
    dealerHandSuits = [];
    dealerHandRanks = [];
    playerHand = [];
    playerHandTotal;
    dealerHandTotal;

    myOutputValue = `Lets deal the cards.`;
    currentState = DEAL_CARDS;
  }

  // 2. User clicks Submit to deal cards.
  else if (currentState == DEAL_CARDS) {
    myOutputValue = startGame();
    // 2d. validate starting hand is blackjack
    if (playerHandTotal == 21) {
      myOutputValue = `You drew: ${displayHand(
        playerHandNames.playerHandSuits
      )}<br><br>
      You got BLACKJACK! YOU WIN! 🎉`;
      currentState = RESET;
    }
    // if no blackjack, move on to player's turn to "hit" or "stand"
    else {
      currentState = PLAYER_TURN;
    }
  }

  // 4. The user decides whether to hit or stand
  else if (currentState == PLAYER_TURN) {
    if (input == "hit") {
      // use draw card helper function
      myOutputValue = drawCards(
        playerHandNames,
        playerHandSuits,
        playerHandRanks,
        playerHandTotal
      );
    } else if (input == "stand") {
      // when user 'stands', display dealer cards
      myOutputValue = `Dealer's turn <br><br>
      Dealer's cards are: ${displayHand(dealerHandNames, dealerHandSuits)} <br>
      Dealer's total is: ${dealerHandTotal}<br><br><br>
      Player's final hand is: ${displayHand(
        playerHandNames,
        playerHandSuits
      )}<br>
      Player's final total is: ${playerHandTotal}`;
      currentState = DEALER_TURN;
    }
  }

  // 5. The computer decides to hit or stand automatically based on game rules. check dealer's hand IF its < 17 - "hit" till >= 17, else "stand"
  else if (currentState == DEALER_TURN) {
    var dealerDraw;
    console.log("reached dealer's turn");

    while (dealerHandTotal < 17) {
      dealerDraw = deck.pop();
      dealerHandNames.push(dealerDraw.name);
      dealerHandSuits.push(dealerDraw.suit);
      dealerHandRanks.push(dealerDraw.rank);
      dealerHandTotal = calcHandTotal(dealerHandRanks);
      // myOutputValue = drawCards(
      //   dealerHandNames,
      //   dealerHandSuits,
      //   dealerHandRanks,
      //   dealerHandTotal
    }
    myOutputValue = `Dealer's final hand is: ${displayHand(
      dealerHandNames,
      dealerHandSuits
    )}<br>
    Dealer's final total is: ${dealerHandTotal}<br><br><br>
    Player's final hand is: ${displayHand(playerHandNames, playerHandSuits)}<br>
    Player's final total is: ${playerHandTotal}`;
    currentState = RESULTS;
  }

  // 6. RESULTS - dealer busts or compare hands, then RESET
  else if (currentState == RESULTS) {
    if (dealerHandTotal > 21) {
      myOutputValue = `Dealer has ${dealerHandTotal} and bust! YOU WIN !!! 🎉`;
      currentState = RESET;
    } else if (dealerHandTotal <= 21) {
      myOutputValue = compareHands(playerHandTotal, dealerHandTotal);
      currentState = RESET;
    }
  }
  return myOutputValue;
};
var hitButton = document.querySelector("#hit-button");
hitButton.addEventListener("click", function () {
  // var input = document.querySelector("#hit-button");
  // var afterHit = main(input);
  var word = "hit";
  main(word);
});
