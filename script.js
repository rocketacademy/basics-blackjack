//Global Variable
var playerCard = [];
var dealerCard = [];
var GAME_STATE_MAKE_HAND = "GAME_STATE_MAKE_HAND";
var GAME_STATE_MAKE_DECISION = "GAME_STATE_MAKE_DECISION";
var GAME_STATE_CHECK_VALUE = "GAME_STATE_CHECK_VALUE";
var GAME_STATE_PLAYER_BUST = "GAME_STATE_PLAYER_BUST";
var GAME_STATE_BOTH_BUST = "GAME_STATE_BOTH_BUST";
var GAME_STATE_CHECK_RESULT = "GAME_STATE_CHECK_RESULT";
var GAME_STATE_PLAYER_BLACKJACK = "GAME_STATE_PLAYER_BLACKJACK";
var GAME_STATE_DEALER_BLACKJACK = "GAME_STATE_DEALER_BLACKJACK";
var GAME_STATE_BOTH_BLACKJACK = "GAME_STATE_BOTH_BLACKJACK";
var CURRENT_GAME_STATE = GAME_STATE_MAKE_HAND;

//function that returns a generated standard 52-card deck
var makeDeck = function () {
  console.log("Control flow: start of makeDeck()");
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the Ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      // Create a new card with the current name, suit, and rank
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

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  console.log("Control flow: start of shuffleCards()");
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

// Give out two cards to player and dealer respectively
var makeHand = function () {
  console.log("Control flow: start of makeHand()");
  for (let index = 0; index < 2; index++) {
    var givenCard1 = shuffledDeck.pop();
    var givenCard2 = shuffledDeck.pop();
    playerCard.push(givenCard1);
    dealerCard.push(givenCard2);
  }
};

var playerCalculator = function () {
  console.log("Control flow: start of playerCalculator()");
  var sum = 0;
  for (let index = 0; index < playerCard.length; index++) {
    var cardName = playerCard[index].name;
    if (cardName == "Jack" || cardName == "Queen" || cardName == "King") {
      sum = sum + 10;
    } else if (cardName == "Ace" && sum < 11) {
      sum = sum + 11;
    } else {
      sum = sum + playerCard[index].rank;
    }
  }
  return sum;
};

var dealerCalculator = function () {
  console.log("Control flow: start of dealerCalculator()");
  var sum = 0;
  for (let index = 0; index < dealerCard.length; index++) {
    var cardName = dealerCard[index].name;
    if (cardName == "Jack" || cardName == "Queen" || cardName == "King") {
      sum = sum + 10;
    } else if (cardName == "Ace" && sum < 11) {
      sum = sum + 11;
    } else {
      sum = sum + dealerCard[index].rank;
    }
  }
  return sum;
};

var automateDealerHand = function () {
  console.log("Control flow: start of automateDealerHand()");
  var dealerValue = dealerCalculator();
  while (dealerValue < 17) {
    console.log("dealer cards < 17 - Looping to draw cards..");
    dealerCard.push(shuffledDeck.pop());
    dealerValue = dealerCalculator();
  }
};

// Print out statement of only dealer second card
var showDealerSecondCard = function () {
  console.log("Control flow: start of showDealerSecondCard()");
  return (
    "Dealer hand: <br> Hidden <br>" +
    dealerCard[1].name +
    " of " +
    dealerCard[1].suit
  );
};

var drawCard = function () {
  playerCard.push(shuffledDeck.pop());
};

var makeDecision = function (playerInput) {
  console.log("Control flow: start of makeDecision()");
  if (playerInput.toLowerCase() == "hit") {
    drawCard();
    return (
      "You drew a " +
      playerCard[playerCard.length - 1].name +
      " of " +
      playerCard[playerCard.length - 1].suit +
      " !<br><br>" +
      makeHandStatement()
    );
  } else {
    CURRENT_GAME_STATE = GAME_STATE_CHECK_RESULT;
    buttonReveal();
    return "Click 'Reveal' to see results.";
  }
};

// Print out statement of cards that dealer has
var showDealerHand = function () {
  console.log("Control flow: start of showDealerHand()");
  var dealerHandStatement = "Dealer hand: <br>";
  for (let index = 0; index < dealerCard.length; index++) {
    dealerHandStatement =
      dealerHandStatement +
      dealerCard[index].name +
      " of " +
      dealerCard[index].suit +
      "<br>";
  }
  return dealerHandStatement + "Value: " + dealerCalculator();
};

// Print out statement of cards that player has
var showPlayerHand = function () {
  console.log("Control flow: start of showPlayerHand()");
  var playerHandStatement = "Player hand: <br>";
  for (let index = 0; index < playerCard.length; index++) {
    playerHandStatement =
      playerHandStatement +
      playerCard[index].name +
      " of " +
      playerCard[index].suit +
      "<br>";
  }
  return playerHandStatement + "Value: " + playerCalculator();
};

//Print out statement of cards that player+dealer has & hit/stand statement
var makeHandStatement = function () {
  return (
    showPlayerHand() +
    "<br><br>" +
    showDealerSecondCard() +
    "<br><br> Please click 'Hit' to draw another card or 'Stand' to show hand."
  );
};

//statement of result tie/win/lose
var getFinalResult = function () {
  if (
    playerCalculator() == dealerCalculator() ||
    (playerCalculator() > 21 && dealerCalculator() > 21)
  ) {
    return "It's a tie! Try again!";
  } else if (
    (playerCalculator() > dealerCalculator() && playerCalculator() < 22) ||
    dealerCalculator() > 21
  ) {
    return "Good job! You won!";
  } else {
    return "Aww! You lost! Try again! ";
  }
};

//deal new card statement
var makeDealStatement = function () {
  return "Click 'Deal' to start a new round!";
};

// result + deal new card statement
var getFinalStatement = function () {
  return (
    getFinalResult() +
    "<br><br>" +
    showPlayerHand() +
    "<br><br>" +
    showDealerHand() +
    "<br><br>" +
    makeDealStatement()
  );
};

//blur out deal & reveal buttons
var buttonDecision = function () {
  dealButton.disabled = true;
  hitButton.disabled = false;
  standButton.disabled = false;
  revealButton.disabled = true;
};

//blur out deal,hit,stand buttons
var buttonReveal = function () {
  dealButton.disabled = true;
  hitButton.disabled = true;
  standButton.disabled = true;
  revealButton.disabled = false;
};

//blur out hit,stand & reveal buttons
var buttonDeal = function () {
  dealButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;
  revealButton.disabled = true;
};

//reset player and dealer hands
var reset = function () {
  playerCard = [];
  dealerCard = [];
};

var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

var main = function (input) {
  var myOutputValue = "";
  if (CURRENT_GAME_STATE == GAME_STATE_MAKE_HAND) {
    console.log(shuffledDeck.length);
    makeHand();
    automateDealerHand();
    myOutputValue = makeHandStatement();
    buttonDecision();
    CURRENT_GAME_STATE = GAME_STATE_MAKE_DECISION;
    console.log(playerCard);
    console.log(dealerCard);
    console.log(dealerCalculator());
    return myOutputValue;
  }

  if (CURRENT_GAME_STATE == GAME_STATE_MAKE_DECISION) {
    myOutputValue = makeDecision(input);

    if (playerCalculator() == 21) {
      CURRENT_GAME_STATE = GAME_STATE_PLAYER_BLACKJACK;
    } else if (playerCalculator() == 21 && dealerCalculator() == 21) {
      CURRENT_GAME_STATE = GAME_STATE_BOTH_BLACKJACK;
    } else if (playerCalculator() > 21 && dealerCalculator() < 21) {
      CURRENT_GAME_STATE = GAME_STATE_PLAYER_BUST;
    } else if (playerCalculator() > 21 && dealerCalculator() > 21) {
      CURRENT_GAME_STATE = GAME_STATE_BOTH_BUST;
    } else return myOutputValue;
  }

  if (CURRENT_GAME_STATE == GAME_STATE_PLAYER_BLACKJACK) {
    myOutputValue = "YOU GOT A BLACKJACK!<br><br>" + getFinalStatement();
    buttonDeal();
    reset();
    CURRENT_GAME_STATE = GAME_STATE_MAKE_HAND;
    return myOutputValue;
  }

  if (CURRENT_GAME_STATE == GAME_STATE_BOTH_BLACKJACK) {
    myOutputValue =
      "YOU & DEALER BOTH GOT A BLACKJACK!<br><br>" + getFinalStatement();
    buttonDeal();
    reset();
    CURRENT_GAME_STATE = GAME_STATE_MAKE_HAND;
    return myOutputValue;
  }

  if (CURRENT_GAME_STATE == GAME_STATE_PLAYER_BUST) {
    myOutputValue = "Your cards went BUST!<br><br>" + getFinalStatement();
    buttonDeal();
    reset();
    CURRENT_GAME_STATE = GAME_STATE_MAKE_HAND;
    return myOutputValue;
  }

  if (CURRENT_GAME_STATE == GAME_STATE_BOTH_BUST) {
    myOutputValue = "You both went BUST!<br><br>" + getFinalStatement();
    buttonDeal();
    reset();
    CURRENT_GAME_STATE = GAME_STATE_MAKE_HAND;
    return myOutputValue;
  }

  if (CURRENT_GAME_STATE == GAME_STATE_CHECK_RESULT) {
    if ((dealerCalculator() == 21) & (playerCalculator() < 21)) {
      myOutputValue = "DEALER GOT A BLACKJACK!<br><br>" + getFinalStatement();
    } else myOutputValue = getFinalStatement();

    buttonDeal();
    reset();
    console.log("Number of cards left in deck:" + shuffledDeck.length);
    CURRENT_GAME_STATE = GAME_STATE_MAKE_HAND;
    if (shuffledDeck.length < 20) {
      var deck = makeDeck();
      shuffledDeck = shuffleCards(deck);
      myOutputValue = myOutputValue + "<br><br>SHUFFLING A NEW DECK OF CARDS";
    }
    return myOutputValue;
  }
};
