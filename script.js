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
  var shuffledDeck = shuffleCards(deck);

  // create deck & initiate the game

  if (currGameMode == "initiate game") {
    currGameMode = "deal two cards";
    return `We are ready to play! Click submit to deal two cards each!`;
  }

  // click submit to deal two cards to player and computer
  // set a new game mode to choose winner if blackjack
  if (currGameMode == "deal two cards") {
    currGameMode = "blackjack winner";
  }
  var computerCard1 = shuffledDeck.pop();
  console.log("computerCard1", computerCard1);
  var computerCard2 = shuffledDeck.pop();
  console.log("computerCard2", computerCard2);
  var playerCard1 = shuffledDeck.pop();
  console.log("playerCard1", playerCard1);
  var playerCard2 = shuffledDeck.pop();
  console.log("playerCard2", playerCard2);

  // change player and computer picture cards to = 10
  if (
    computerCard1.name == "💂‍♂️ jack" ||
    computerCard1.name == "👸 queen" ||
    computerCard1.name == "🤴 king"
  ) {
    computerCard1.rank = 10;
  }

  if (
    computerCard2.name == "💂‍♂️ jack" ||
    computerCard2.name == "👸 queen" ||
    computerCard2.name == "🤴 king"
  ) {
    computerCard2.rank = 10;
  }

  if (
    playerCard1.name == "💂‍♂️ jack" ||
    playerCard1.name == "👸 queen" ||
    playerCard1.name == "🤴 king"
  ) {
    playerCard1.rank = 10;
  }

  if (
    playerCard2.name == "💂‍♂️ jack" ||
    playerCard2.name == "👸 queen" ||
    playerCard2.name == "🤴 king"
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
      myOutputValue = `Blackjack, player wins! <br><br>Player drew: <br>${playerAllCards}. <br><br>Refresh to play again.`;
    } else if (
      (computerCard1.rank == 1 && computerCard2.rank == 10) ||
      (computerCard1.rank == 10 && computerCard2.rank == 1)
    ) {
      myOutputValue = `Blackjack, computer wins! <br><br>Computer drew: <br>${computerAllCards}. <br><br>Refresh to play again.`;
    } else {
      myOutputValue = `Player, you drew:<br>${playerAllCards}. <br> Your total score is ${playerCardValue}. <br><br> Computer's first card is ${computerAllCards[0]}. <br><br> Please choose to hit or stand.`;
      console.log("player < 21");
      currGameMode = "hit or stand";
      console.log(currGameMode);
    }
  }

  // change game mode, player chooses to "hit" & draw another card or "Stand"
  if (input == "hit" && currGameMode == "hit or stand") {
    console.log("current game mode hit or stand");
    var playerCard3Hit1 = shuffledDeck.pop();
    var playerCard4Hit2 = shuffledDeck.pop();

    // change all of player's picture cards 3 and more to = 10
    if (
      playerCard3Hit1.name == "💂‍♂️ jack" ||
      playerCard3Hit1.name == "👸 queen" ||
      playerCard3Hit1.name == "🤴 king"
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

    return (myOutputValue = `Player chose to hit. <br> You drew ${playerCard3Hit1.name} of ${playerCard3Hit1.suit}. <br><br>You now hold ${playerAllCards}.<br><br>Player's total score: ${playerSum}.`);
  } else if (currGameMode == "hit or stand" && input == "stand") {
    return (myOutputValue = `Player chose to stay. <br><br>You hold ${playerAllCards}.<br><br>Player's total score: ${playerSum}. Enter "next" to view dealer's cards.`);
  } else {
    console.log(input);
    console.log(currGameMode);
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

// Function to shuffle cards:
var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;

    index = index + 1;
  }

  return cards;
};

// To generate random numbers/ cards:
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Card Deck:
var makeDeck = function () {
  // Initialise an empty deck array
  var deck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts ♥️", "Diamonds ♦️", "Clubs ♣️", "Spades ♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    // console.log(`current suit: ${currentSuit}`);

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "🅰️ Ace";
      } else if (cardName == 11) {
        cardName = "💂‍♂️ Jack";
      } else if (cardName == 12) {
        cardName = "👸 Queen";
      } else if (cardName == 13) {
        cardName = "🤴 King";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      deck.push(card);
      // console.log(`rank: ${rankCounter}`);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return deck;
};

var deck = makeDeck();
