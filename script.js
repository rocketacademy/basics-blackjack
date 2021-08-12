// initiate game mode to start game
var currGameMode = "initiate game";
// array to store computer cards
var computerAllCards = [];
// array to store player cards
var playerAllCards = [];
// array to store total value of computer cards
var computerAllCardsValue = [];
// array to store total value of player cards
var playerAllCardsValue = [];
// array to store sum player cards

// global variables to store values of computer & player cards
var computerSum = 0;
var playerSum = 0;

var main = function (input) {
  var myOutputValue = "";

  // create deck & initiate the game

  if (currGameMode == "initiate game") {
    currGameMode = "deal two cards";
    return `It's Blackjack time! Click submit to deal two cards each!`;
  }

  // click submit to deal two cards to player and computer
  // set a new game mode to choose winner if blackjack
  if ((currGameMode = "deal two cards")) {
    currGameMode = "blackjack winner";
  }
  var computerCard1 = deck.pop();
  console.log("computerCard1", computerCard1);
  var computerCard2 = deck.pop();
  console.log("computerCard2", computerCard2);
  var playerCard1 = deck.pop();
  console.log("playerCard1", playerCard1);
  var playerCard2 = deck.pop();
  console.log("playerCard2", playerCard2);

  // change player and computer picture cards to = 10
  if (
    computerCard1.name == "jack" ||
    computerCard1.name == "queen" ||
    computerCard1.name == "king"
  ) {
    computerCard1.rank = 10;
  }

  if (
    computerCard2.name == "jack" ||
    computerCard2.name == "queen" ||
    computerCard2.name == "king"
  ) {
    computerCard2.rank = 10;
  }

  if (
    playerCard1.name == "jack" ||
    playerCard1.name == "queen" ||
    playerCard1.name == "king"
  ) {
    playerCard1.rank = 10;
  }

  if (
    playerCard2.name == "jack" ||
    playerCard2.name == "queen" ||
    playerCard2.name == "king"
  ) {
    playerCard2.rank = 10;
  }

  // get the total score of the first 2 drawn cards
  var computerCardValue =
    Number(computerCard1.rank) + Number(computerCard2.rank);
  console.log(`computer's first 2 cards total: ${computerCardValue}`);
  var playerCardValue = Number(playerCard1.rank) + Number(playerCard2.rank);
  console.log(`player's first 2 cards total: ${playerCardValue}`);
  playerSum += playerCardValue;

  // push first two cards into an array
  // computer card array
  computerAllCards.push(`${computerCard1.name} of ${computerCard1.suit}`);
  computerAllCards.push(` ${computerCard2.name} of ${computerCard2.suit}`);
  console.log(computerAllCards);
  // player card array
  playerAllCards.push(`${playerCard1.name} of ${playerCard1.suit}`);
  playerAllCards.push(` ${playerCard2.name} of ${playerCard2.suit}`);
  console.log(playerAllCards);

  // if player & computer gets a 10 + Ace, both win & game restarts
  // if player gets a 10 + Ace = blackjack, player wins & game restarts
  // if computer gets a 10 + Ace = blackjack, computer wins & game restarts
  // if no blackjack, player can choose to hit or stand
  if (currGameMode == "blackjack winner") {
    if (
      (playerCard1.rank == 1 && playerCard2.rank == 10) ||
      (playerCard1.rank == 10 && playerCard2.rank == 1)
    ) {
      myOutputValue = `Blackjack, player wins! Player drew: <br>${playerAllCards}. <br>Refresh to play again.`;
    } else if (
      (computerCard1.rank == 1 && computerCard2.rank == 10) ||
      (computerCard1.rank == 10 && computerCard2.rank == 1)
    ) {
      myOutputValue = `Blackjack, computer wins! Computer drew: <br>${computerAllCards}. <br>Refresh to play again.`;
    } else if (playerSum < 21) {
      currGameMode = "hit or stand";
      myOutputValue = `Player, please choose to hit or stand. You drew:<br>${playerAllCards}.`;
    }
  }

  // change game mode, player chooses to "hit" & draw another card or "Stand"
  if (currGameMode == "hit or stand" && input == "hit") {
    var playerCard3Hit1 = deck.pop();
    var playerCard4Hit2 = deck.pop();

    // change all of player's picture cards 3 and more to = 10
    if (
      playerCard3Hit1.name == "jack" ||
      playerCard3Hit1.name == "queen" ||
      playerCard3Hit1.name == "king"
    ) {
      playerCard3Hit1.rank = 10;
    }
    console.log(
      `Player's new card: ${playerCard3Hit1.name} of ${playerCard3Hit1.suit}`
    );

    // push player's new cards into array
    playerAllCardsValue.push(playerCardValue);
    playerAllCards.push(`${playerCard3Hit1.name} of ${playerCard3Hit1.suit}`);

    // total value of player's score with more cards
    playerSum += playerCard3Hit1.rank;
    console.log(`Player's cards total = ${playerAllCards}`);

    return (myOutputValue = `Player chose to hit. <br> You drew ${playerCard3Hit1.name} of ${playerCard3Hit1.suit}. <br> You now hold ${playerAllCards}.<br> Player's total score: ${playerSum}.`);
  } else if (currGameMode == "hit or stand" && input == "stand") {
    return (myOutputValue = `Player chose to stay. <br>You hold ${playerAllCards}.<br> Player's total score: ${playerSum}.`);
  }

  return myOutputValue;
};

// if player draws an  Ace, ask if he wants it to be 1 or 11

// } else if (playerCardValue > 21) {
//   myOutputValue += `Player card value is more than 21, player loses. Refresh to play again.`;
// } else if (computerCardValue > 21) {
//   myOutputValue += `Computer card value is more than 21, computer loses. Refresh to play again.`;
// } else {
//   myOutputValue +=
//     "Player Cards: <br>" +
//     playerCard1.name +
//     ` of ` +
//     playerCard1.suit +
//     ` & ` +
//     playerCard2.name +
//     ` of ` +
//     playerCard2.suit +
//     `<br>Player Card Total: ` +
//     playerCardValue +
//     `<br>Computer Cards:<br>` +
//     computerCard1.name +
//     ` of ` +
//     computerCard1.suit +
//     ` & ` +
//     computerCard2.name +
//     ` of ` +
//     computerCard2.suit +
//     `<br>Computer Card Total: ` +
//     computerCardValue +
//     `<br>You may choose to hit or stand.`;

// player inputs hit to deal one more card

var makeDeck = function () {
  var cardDeck = [];
  // make 52 cards
  // rank 1 - 13
  // 1-4 suits , hearts, diamonds, clubs, spades
  // 1-10 and jack, queen, king and ace
  // loop 1
  // suit hearts - spades
  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    console.log("current suit: " + currentSuit);
    // loop 2
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // 1, 11, 12, 13
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      console.log("rank: " + rankCounter);
      cardDeck.push(card);
      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

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

var deck = shuffleCards(makeDeck());
