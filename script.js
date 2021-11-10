// === General Rules ==== //

// Two players: player and computer
// Computer will be the dealer
// Both player and computer get 2 cards to start with
// Player goes first to decide if they want to hit (draw another card) OR stand (end the turn)
// Dealer has to hit (take card) if their hands is below 17
// Each players' score is the sum of their card ranks (J/Q/K = 10; Aces can be 1 or 11)
// The player who is closer to but not above 21 wins

// === Steps to do === //
// 1. Shuffle the cards
// 2. Player get 2 cards first, follow by computer get 2 cards
// 3. Player choose either to hit OR stand
//    -- 3.a If hit, take one more card and back to point 3
//    -- 3.b If stand, switch to allow computer choose hit OR stand
//    -- 3.c.i computer will hit automatically if their card is less than 17
// 4. Compare the rank of sum of cards taken
//    -- 4.a J/Q/K = 10, Ace = 1 OR 11

//-----------------------------------
//       Global Variables
//------------------------------------

var playerCard1 = [];
var playerCard2 = [];
var computerCard1 = [];
var computerCard2 = [];
var shuffledDeck = [];
var currentGameMode = "Drawing Cards";

//-----------------------------------
//       Helper Functions
//-----------------------------------

// === makeDeck helper function ===
var makeDeck = function () {
  var cardDeck = [];
  var suits = [`hearts`, `diamonds`, `clubs`, `spades`];
  var emoji = [`♥️`, `♦️`, `♠️`, `♣️`];

  for (suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    var currentSuit = suits[suitIndex];
    var currentEmoji = emoji[suitIndex];
    // console.log(currentSuit);

    for (rankCounter = 1; rankCounter <= 13; rankCounter++) {
      var cardName = rankCounter;
      // console.log(cardName);

      if (cardName == 1) {
        cardName = `ace`;
      } else if (cardName == 11) {
        cardName = `jack`;
      } else if (cardName == 12) {
        cardName = `queen`;
      } else if (cardName == 13) {
        cardName = `king`;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentEmoji,
      };
      cardDeck.push(card);
    }
  }
  // console.log(cardDeck);
  return cardDeck;
};

// === generate random index function ===
var randomIndexGenerator = function (max) {
  return Math.floor(Math.random() * max);
};
// === shuffleCards helper function ===
var shuffleCards = function (cardDeck) {
  for (currentIndex = 0; currentIndex < cardDeck.length; currentIndex++) {
    var randomIndex = randomIndexGenerator(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};
// === check for blackjack function

var checkBlackJack = function (card1, card2) {
  result = "";
  if (
    (card1.name == "ace" && card2.rank >= 10) ||
    (card1.rank >= 10 && card2.name == "ace")
  ) {
    result = true;
  } else {
    result = false;
  }
  return result;
};

// === combineHands function
getCombinehandValues = function (card1, card2) {
  var combinedCardRank = card1.rank + card2.rank;
  if (combinedCardRank <= 21) {
    return combinedCardRank;
  } else {
    return "Bust!!";
  }
};

//-----------------------------------
//       Main Functions
//-----------------------------------

var main = function (input) {
  var shuffledDeck = shuffleCards(makeDeck());

  // Drawing Cards GameMode
  // === both players and computer will draw cards
  // === switch mode once both have draw the cards
  // === return message to switch GameMode

  if (currentGameMode == "Drawing Cards") {
    // console.log(shuffledDeck);

    var playerCard1 = shuffledDeck.pop();
    var playerCard2 = shuffledDeck.pop();
    console.log(`playerCard1: ${playerCard1.name} of ${playerCard1.suit} `);
    console.log(`playerCard2: ${playerCard2.name} of ${playerCard2.suit} `);

    var computerCard1 = shuffledDeck.pop();
    var computerCard2 = shuffledDeck.pop();
    console.log(
      `computerCard1: ${computerCard1.name} of ${computerCard1.suit}`
    );
    console.log(
      `computerCard2: ${computerCard2.name} of ${computerCard2.suit}`
    );

    var message = `Player hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} <br>  Dealer hand: ${computerCard1.name} of ${computerCard1.suit}, ${computerCard2.name} of ${computerCard2.suit} <br>`;

    // Switch GameMode to Comparing Mode
    currentGameMode = "Comparing Mode";
    console.log(currentGameMode);

    myOutputValue = `Click submit to compare the cards!`;
    console.log(myOutputValue);
  }

  // Comparing Mode
  // == check for blackjack conditions
  // == formation of blackjacks
  // == ace + 10 , J , Q, K
  // == both gets blackjack > tie
  // == player gets blackjack > player wins
  // == computer gets blackjack > computer wins
  // == if player hands are bigger > player wins
  // == if computer hands are bigger > computer wins

  if (currentGameMode == "Comparing Mode") {
    // === check for Blackjack conditions first

    // ~~~~~~~~~~~~~~~ Testing Conditions ~~~~~~~~~~~~~~~
    // playerCard1.name = "ace";
    // playerCard2.rank = 10;
    // computerCard1.name = "ace";
    // computerCard2.rank = 10;

    var playerBlackJack = checkBlackJack(playerCard1, playerCard2);
    console.log(`playerBlackJack: ${playerBlackJack}`);
    var computerBlackJack = checkBlackJack(computerCard1, computerCard2);
    console.log(`computerBlackJack: ${computerBlackJack}`);

    // player with Blackjack
    if (playerBlackJack == true && computerBlackJack == false) {
      return message + "Player wins with Blackjack!";
    } else if (playerBlackJack == true && computerBlackJack == true) {
      return message + "Its a Blackjack tie!";
    }

    // computer with Blackjack
    if (computerBlackJack == true && playerBlackJack == false) {
      return message + "Dealer wins with Blackjack!";
    } else if (computerBlackJack == true && playerBlackJack == true) {
      return message + "Its a Blackjack tie!";
    }

    // either computer or player has no Blackjack

    if (playerBlackJack == false && computerBlackJack == false) {
      var playerHands = getCombinehandValues(playerCard1, playerCard2);
      console.log(`playerHands: ${playerHands}`);
      var computerHands = getCombinehandValues(computerCard1, computerCard2);
      console.log(`computerHands: ${computerHands}`);

      if (playerHands > computerHands && playerHands !== "Bust!!") {
        return message + "Player wins!!";
      } else if (playerHands < computerHands && computerHands !== "Bust!!") {
        return message + "Dealer wins!!";
      } else if (
        playerHands == computerHands &&
        playerHands !== "Bust!!" &&
        computerHands !== "Bust!!"
      ) {
        return message + "Tie Game!!";
      }
    }

    // Switch GameMode to Result Mode
  }
};
