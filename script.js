var stage = "deal";
var userCards = [];
var computerCards = [];

var myOutputValue = "";
var userDrawValue = "You drew: <br>";
var computerDrawValue = "Computer drew: <br>";

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

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

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

      if (cardName > 10) {
        var cardValue = 10;
      } else cardValue = cardName;

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

      if (currentSuit == "hearts") {
        suitEmoji = "♥️";
      } else if (currentSuit == "diamonds") {
        suitEmoji = "♦";
      } else if (currentSuit == "clubs") {
        suitEmoji = "♣️";
      } else if (currentSuit == "spades") {
        suitEmoji = "♠️";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: suitEmoji,
        value: cardValue,
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
var shuffledDeck = shuffleCards(makeDeck());

var dealCards = function (cardDeck, drawValue) {
  var dealtCard = shuffledDeck.pop();
  cardDeck.push(dealtCard);
  var currIndex = cardDeck.length - 1;
  drawValue =
    drawValue +
    ` ${cardDeck[currIndex].name} ${cardDeck[currIndex].emoji} <br>`;
  return drawValue;
};

var blackJack = function (inputCards) {
  if (inputCards[0].value == 10 && inputCards[1].rank == 1) {
    return true;
  }
  if (inputCards[1].value == 10 && inputCards[0].rank == 1) {
    return true;
  }
};

var sumCards = function (inputCards) {
  var sum = 0;
  for (i = 0; i < inputCards.length; i += 1) {
    sum = sum + inputCards[i].value;
  }
  return sum;
};

var computerPlay = function () {
  while (sumCards(computerCards) < 17) {
    computerDrawValue = dealCards(computerCards, computerDrawValue);
  }
};

var winLose = function () {};

var main = function (input) {
  if (stage == "deal") {
    for (i = 0; i < 2; i += 1) {
      userDrawValue = dealCards(userCards, userDrawValue);
      computerDrawValue = dealCards(computerCards, computerDrawValue);
    }

    if (blackJack(userCards) && blackJack(computerCards)) {
      myOutputValue =
        userDrawValue + computerDrawValue`<br>2 BLACJACKS!! You tied!`;
    } else if (blackJack(userCards)) {
      myOutputValue = userDrawValue + `<br>BLACJACK!! You win!`;
    } else if (blackJack(computerCards)) {
      myOutputValue = userDrawValue + `<br>COMPUTER BLACKJACK. You lose ):`;
    } else {
      stage = "draw";
      myOutputValue = userDrawValue + `<br>Input 'hit' or 'stand' to continue.`;
    }
    return myOutputValue;
  }

  if (stage == "draw") {
    input = input.trim().toLowerCase();
    if (input == "hit") {
      userDrawValue = dealCards(userCards, userDrawValue);

      if (sumCards(userCards) > 21) {
        computerPlay();
        if (sumCards(computerCards) > 21) {
          myOutputValue =
            userDrawValue +
            "<br>" +
            computerDrawValue +
            "<br>" +
            `BOTH BUST! It's a tie`;
        } else {
          myOutputValue =
            userDrawValue +
            "<br>" +
            computerDrawValue +
            "<br>" +
            `BUST! You lose ):`;
        }
      } else {
        myOutputValue =
          userDrawValue + "<br>" + `Input 'hit' or 'stand' to continue.`;
      }
    } else if (input == "stand") {
      computerPlay();
      if (sumCards(computerCards) > 21) {
        myOutputValue =
          userDrawValue +
          "<br>" +
          computerDrawValue +
          "<br>" +
          `Computer BUST! You win!`;
      } else if (sumCards(computerCards) > sumCards(userCards)) {
        myOutputValue =
          userDrawValue +
          "<br>" +
          computerDrawValue +
          "<br>" +
          `You: ${sumCards(userCards)} <br> Computer:${sumCards(
            computerCards
          )}. <br> Computer wins!`;
      } else {
        myOutputValue =
          userDrawValue +
          "<br>" +
          computerDrawValue +
          "<br>" +
          `You: ${sumCards(userCards)} <br> Computer:${sumCards(
            computerCards
          )}. <br> You win!`;
      }
    } else return `Input 'hit' or 'stand' to continue.`;
    return myOutputValue;
  }
};
