var deckinfo = function () {
  var cardDeck = [];
  var suits = ["Spades ♠️", "Hearts ♥️", "Clubs ♣️", "Diamonds ♦️"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    // Loop without an array
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
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

// Get a random number from the 52 cards
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleDeck = function (cards) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cards.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cards;
};

var banLuck = function (hand) {
  cardOne = hand[0];
  cardTwo = hand[1];
  var isBL = false;
  console.log(cardOne);
  console.log(cardTwo);
  if (
    (cardOne.name == "ace" && cardTwo.rank >= 10) ||
    (cardOne.rank >= 10 && cardTwo.name == "ace")
  ) {
    var isBL = true;
  }
  return isBL;
};

var ScoreOnHand = function (hand) {
  var handIndex = 0;
  var handScore = 0;
  var numOfAces = 0;

  while (handIndex < hand.length) {
    if (
      hand[handIndex].name == "king" ||
      hand[handIndex].name == "queen" ||
      hand[handIndex].name == "jack"
    ) {
      handScore += 10;
    } else if (hand[handIndex].name == "ace") {
      handScore += 11;
      numOfAces += 1;
    } else {
      console.log("within function handIndex: ", handIndex);
      handScore = handScore + hand[handIndex].rank;
      console.log("within function handScore: ", handScore);
    }

    handIndex += 1;
  }

  while (numOfAces >= 1) {
    if (handScore > 21) {
      handScore -= 10;
      numOfAces -= 1;
    }
  }

  return handScore;
};

var handcards = function (hand) {
  cardsIndex = 0;
  cardsHand = "";
  while (cardsIndex < hand.length) {
    cardsHand =
      cardsHand + `${hand[cardsIndex].name} of ${hand[cardsIndex].suit}<br>`;
    cardsIndex += 1;
  }

  return cardsHand;
};

var generalMessageplayer = function () {
  return `Player have ${handcards(
    playerCards
  )} on hand. <br> Sum on hand: ${ScoreOnHand(playerCards)}`;
};
var generalMessagecomputer = function () {
  return `<br>Computer have ${handcards(
    computerCards
  )} on hand. <br> Sum on hand: ${ScoreOnHand(computerCards)}`;
};

var gameMode = "gameBlackJack";
var cardsdeal = "Cards Deal";
var hitorstand = "hit or stand";
var gameResults = "Results";

var playerCards = [];
var computerCards = [];
var cardDeck = [];
var currGameMode = gameMode;

var main = function (input) {
  var myOutputValue = "";

  if (currGameMode == "gameBlackJack") {
    console.log("game mode:", currGameMode);
    cardDeck = shuffleDeck(deckinfo());

    var dealingIndex = 0;
    while (dealingIndex < 2) {
      playerCards.push(cardDeck.pop());
      computerCards.push(cardDeck.pop());
      dealingIndex += 1;
    }

    console.log("playerCards:", playerCards);
    console.log("computerCards:", computerCards);
    console.log("cardDeck:", cardDeck);

    myOutputValue =
      "Card has been dealt. <br> Please press 'Submit' to calculate cards";

    currGameMode = cardsdeal;

    return myOutputValue;
  }

  if (currGameMode == "Cards Deal") {
    console.log("game mode:", currGameMode);

    myOutputValue = "Player's Cards are <br>" + handcards(playerCards);

    if (banLuck(playerCards) && banLuck(computerCards)) {
      myOutputValue =
        myOutputValue +
        "<br> Computer's Cards are <br>" +
        generalMessagecomputer() +
        "It's a Tie! <br> Please refresh to start a new game or Press 'Submit' to play again.";

      playerCards = [];
      computerCards = [];
      cardDeck = [];
      currGameMode = gameMode;

      return myOutputValue;
    } else if (banLuck(playerCards)) {
      myOutputValue =
        myOutputValue +
        "<br> Computer's Cards are <br>" +
        generalMessagecomputer() +
        "<br> Player wins with a BlackJack! <br> Please refresh to start a new game or Press 'Submit' to play again.";

      playerCards = [];
      computerCards = [];
      cardDeck = [];
      currGameMode = gameMode;

      return myOutputValue;
    } else if (banLuck(computerCards)) {
      myOutputValue =
        myOutputValue +
        "<br> Computer's Cards are <br<" +
        generalMessagecomputer() +
        "Computer wins with a BlackJack! <br> Please refresh to start a new game or Press 'Submit' to play again.";

      playerCards = [];
      computerCards = [];
      cardDeck = [];
      currGameMode = gameMode;

      return myOutputValue;
    } else {
      myOutputValue =
        myOutputValue +
        "There is no Black Jack. <br> Please enter 'hit' or 'stand'.";
    }

    currGameMode = hitorstand;

    return myOutputValue;
  }

  if (currGameMode == "hit or stand") {
    console.log("game mode:", currGameMode);
    myOutputValue = "Player's turn. <br>";

    if (input == "") {
      myOutputValue =
        myOutputValue +
        handcards(playerCards) +
        "<br> Please enter 'hit' or 'stand' and 'Submit'.";
    }

    if (input == "hit") {
      console.log("playerCards:", playerCards);
      playerCards.push(cardDeck.pop());

      myOutputValue =
        myOutputValue +
        handcards(playerCards) +
        "<br> Please enter 'hit' or 'stand' and 'Submit.";
    } else if (input == "stand") {
      currGameMode = gameResults;
      myOutputValue =
        myOutputValue +
        handcards(playerCards) +
        "<br> Please press 'Submit' to calculate score.";
    }
    return myOutputValue;
  }
  if (currGameMode == "Results") {
    while (ScoreOnHand(computerCards) < 17) {
      computerCards.push(cardDeck.pop());
    }

    var computerHS = ScoreOnHand(computerCards);
    console.log("computerHS:", computerHS);
    var playerHS = ScoreOnHand(playerCards);
    console.log("playerHS:", playerHS);

    myOutputValue =
      "Player's Score are " +
      generalMessageplayer() +
      "<br> Computer's Score are " +
      generalMessagecomputer();

    if (
      (playerHS > computerHS && computerHS <= 21) ||
      (playerHS <= 21 && computerHS > 21)
    ) {
      myOutputValue =
        generalMessageplayer() +
        generalMessagecomputer() +
        "<br> Player Wins! <br> Please refresh to start again. or ";
    }
    if (
      (playerHS < computerHS && computerHS <= 21) ||
      (computerHS <= 21 && playerHS > 21)
    ) {
      myOutputValue =
        generalMessageplayer() +
        generalMessagecomputer() +
        "<br> Computer Wins! <br> Please refresh to start again. or ";
    }
    if (playerHS == computerHS || (playerHS > 21 && computerHS > 21)) {
      myOutputValue =
        generalMessageplayer() +
        generalMessagecomputer() +
        "<br> It's a Tie! <br> Please refresh to start again. or ";
    }

    myOutputValue = myOutputValue + "Press 'Submit' to play again.";

    playerCards = [];
    computerCards = [];
    cardDeck = [];
    currGameMode = gameMode;

    return myOutputValue;
  }
};
