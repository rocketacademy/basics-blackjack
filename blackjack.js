var cardDeck = [];
var playerHand = [];
var computerHand = [];
var playerTotalValue = 0;
var computerTotalValue = 0;
var stage = "makeDeckMode";
console.log(stage);
var main = function (input) {
  console.log(stage);
  if (stage == "makeDeckMode") {
    console.log("inside stage 1");
    if (!input) {
      cardDeck = [];
      makeDeck();
      shuffleCards(cardDeck);

      playerHand.push(cardDeck.pop());
      computerHand.push(cardDeck.pop());
      playerHand.push(cardDeck.pop());
      computerHand.push(cardDeck.pop());

      if (playerHand[0].value == 1) {
        playerHand[0].value = 11;
      }
      if (computerHand[0].value == 1) {
        computerHand[0].value = 11;
      }
      playerTotalValue = playerHand[0].value + playerHand[1].value;
      console.log(playerHand[0].value, playerHand[1].value);

      computerTotalValue = computerHand[0].value + computerHand[1].value;
      console.log(computerHand[0].value, computerHand[1].value);
      var myOutputValue =
        "Your hand cards are " +
        playerHand[0].name +
        " " +
        playerHand[0].suit +
        " " +
        "and " +
        playerHand[1].name +
        " " +
        playerHand[1].suit +
        ". Your total value is" +
        " " +
        playerTotalValue +
        "<br>" +
        "Computer hand cards are " +
        computerHand[0].name +
        " " +
        computerHand[0].suit +
        " " +
        "and " +
        computerHand[1].name +
        " " +
        computerHand[1].suit +
        ". Computer's total value is" +
        " " +
        computerTotalValue +
        ". Do you wish to hit or stand?";
      return myOutputValue;
    }
    stage += 1;
  }

  if (stage == 2) {
    if (!input) {
      myOutputValue = "Please type in either 'hit' or 'stand'.";
    }
    if (input != "hit" || input != "stand") {
      myOutputValue = "Please type in either 'hit' or 'stand'.";
    }
    if (playerHand.length == 2 && input == "hit") {
      if (playerTotalValue >= 21) {
        myOutputValue =
          "Your value has already exceeded 21! You can no longer hit.";
        return myOutputValue;
      }
      playerHand.push(cardDeck.pop());
      console.log(playerHand[2].value);
      playerTotalValue += playerHand[2].value;
      myOutputValue =
        "Your hand cards are " +
        playerHand[0].name +
        " " +
        playerHand[0].suit +
        " " +
        "and " +
        playerHand[1].name +
        " " +
        playerHand[1].suit +
        " " +
        "and " +
        playerHand[2].name +
        " " +
        playerHand[2].suit +
        ". Your total value is" +
        " " +
        playerTotalValue +
        "<br>" +
        "Computer hand cards are " +
        computerHand[0].name +
        " " +
        computerHand[0].suit +
        " " +
        "and " +
        computerHand[1].name +
        " " +
        computerHand[1].suit +
        ". Computer's total value is" +
        " " +
        computerTotalValue +
        ". Do you wish to hit or stand?";
      return myOutputValue;
    }

    if (input == "stand") {
      while (computerTotalValue < 17) {
        computerHand.push(cardDeck.pop());
        computerTotalValue += computerHand[computerHand.length - 1].value;
        console.log(computerHand[computerHand.length - 1].value);
        myOutputValue =
          "Your total value is" +
          " " +
          playerTotalValue +
          ". <br>Computer hand cards are " +
          computerHand[0].name +
          " " +
          computerHand[0].suit +
          " " +
          "and " +
          computerHand[1].name +
          " " +
          computerHand[1].suit +
          ". Since computer's value is less than 17, it drew another" +
          "<br>";
        myOutputValue +=
          computerHand[computerHand.length - 1].name +
          " " +
          computerHand[computerHand.length - 1].suit +
          "<br>" +
          ". Computer's total value is" +
          " " +
          computerTotalValue;
      }
      stage += 1;
      myOutputValue =
        "Player's total value is" +
        " " +
        playerTotalValue +
        ". Computer's total value is " +
        computerTotalValue +
        "<br>";
      return myOutputValue;
    }
  }
  if (stage >= 3) {
    if (playerHand > computerHand && playerHand < 21) {
      myOutputValue = "You win! click submit to play again";
    }
    if (playerHand < computerHand && computerHand < 21) {
      myOutputValue = "You lose! click submit to play again";
    }
    if (playerHand > 21 && computerHand < 21) {
      myOutputValue = "You lose! click submit to play again";
    }
    if (playerHand < 21 && computerHand > 21) {
      myOutputValue = "You win! click submit to play again";
    }
    if (playerHand == computerHand || (playerHand > 21 && computerHand > 21)) {
      myOutputValue = "Draw! click submit to play again";
    }
    var playerHand = [];
    var computerHand = [];
    var playerTotalValue = 0;
    var computerTotalValue = 0;
    var stage = 1;
    return myOutputValue;
  }
  console.log(playerHand);
  if (playerHand.length == 3) {
    if (!input) {
      myOutputValue = "Please type in either 'hit' or 'stand'.";
    }
    if (input != "hit" || input != "stand") {
      myOutputValue = "Please type in either 'hit' or 'stand'.";
    }
    if (input == "hit") {
      if (playerTotalValue >= 21) {
        myOutputValue =
          "Your value has already exceeded 21! You can no longer hit.";
        return myOutputValue;
      }
      playerHand.push(cardDeck.pop());
      console.log(playerHand[3].value);
      playerTotalValue += playerHand[3].value;
      myOutputValue =
        "Your hand cards are " +
        playerHand[0].name +
        " " +
        playerHand[0].suit +
        " " +
        "and " +
        playerHand[1].name +
        " " +
        playerHand[1].suit +
        " " +
        "and " +
        playerHand[2].name +
        " " +
        playerHand[2].suit +
        " " +
        "and " +
        playerHand[3].name +
        " " +
        playerHand[3].suit +
        ". Your total value is" +
        " " +
        playerTotalValue +
        "<br>" +
        "Computer hand cards are " +
        computerHand[0].name +
        " " +
        computerHand[0].suit +
        " " +
        "and " +
        computerHand[1].name +
        " " +
        computerHand[1].suit +
        ". Computer's total value is" +
        " " +
        computerTotalValue +
        ". Do you wish to hit again or stand?";
      return myOutputValue;
    }
    if (input == "stand") {
      while (computerTotalValue < 17) {
        computerHand.push(cardDeck.pop());
        computerTotalValue += computerHand[computerHand.length - 1].value;
        console.log(computerHand[computerHand.length - 1].value);
        myOutputValue =
          "Your total value is" +
          " " +
          playerTotalValue +
          ". <br>Computer hand cards are " +
          computerHand[0].name +
          " " +
          computerHand[0].suit +
          " " +
          "and " +
          computerHand[1].name +
          " " +
          computerHand[1].suit +
          ". Since computer's value is less than 17, it drew another" +
          "<br>";
        myOutputValue +=
          computerHand[computerHand.length - 1].name +
          " " +
          computerHand[computerHand.length - 1].suit +
          "<br>" +
          ". Computer's total value is" +
          " " +
          computerTotalValue;
      }
      stage += 1;
      myOutputValue =
        "Player's total value is" +
        " " +
        playerTotalValue +
        ". Computer's total value is " +
        computerTotalValue +
        "<br>";
      return myOutputValue;
    }
  }

  if (playerHand.length == 4) {
    if (!input) {
      myOutputValue = "Please type in either 'hit' or 'stand'.";
    }
    if (input != "hit" || input != "stand") {
      myOutputValue = "Please type in either 'hit' or 'stand'.";
    }
    if (input == "hit") {
      if (playerTotalValue >= 21) {
        myOutputValue =
          "Your value has already exceeded 21! You can no longer hit.";
        return myOutputValue;
      }
      playerHand.push(cardDeck.pop());
      console.log(playerHand[4].value);
      playerTotalValue += playerHand[4].value;
      myOutputValue =
        "Your hand cards are " +
        playerHand[0].name +
        " " +
        playerHand[0].suit +
        " " +
        "and " +
        playerHand[1].name +
        " " +
        playerHand[1].suit +
        " " +
        "and " +
        playerHand[2].name +
        " " +
        playerHand[2].suit +
        " " +
        "and " +
        playerHand[3].name +
        " " +
        playerHand[3].suit +
        " " +
        "and " +
        playerHand[4].name +
        " " +
        playerHand[4].suit +
        ". Your total value is" +
        " " +
        playerTotalValue +
        "<br>" +
        "Computer hand cards are " +
        computerHand[0].name +
        " " +
        computerHand[0].suit +
        " " +
        "and " +
        computerHand[1].name +
        " " +
        computerHand[1].suit +
        ". Computer's total value is" +
        " " +
        computerTotalValue +
        ". Do you wish to hit again or stand?";
      return myOutputValue;
    }
    if (input == "stand") {
      while (computerTotalValue < 17) {
        computerHand.push(cardDeck.pop());
        computerTotalValue += computerHand[computerHand.length - 1].value;
        console.log(computerHand[computerHand.length - 1].value);
        myOutputValue =
          "Your total value is" +
          " " +
          playerTotalValue +
          ". <br>Computer hand cards are " +
          computerHand[0].name +
          " " +
          computerHand[0].suit +
          " " +
          "and " +
          computerHand[1].name +
          " " +
          computerHand[1].suit +
          ". Since computer's value is less than 17, it drew another" +
          "<br>";
        myOutputValue +=
          computerHand[computerHand.length - 1].name +
          " " +
          computerHand[computerHand.length - 1].suit +
          "<br>" +
          ". Computer's total value is" +
          " " +
          computerTotalValue;
      }
      stage += 1;
      myOutputValue =
        "Player's total value is" +
        " " +
        playerTotalValue +
        ". Computer's total value is " +
        computerTotalValue;
      return myOutputValue;
    }
  }
  if (playerHand.length == 5) {
    if (!input) {
      myOutputValue = "Please type in either 'hit' or 'stand'.";
    }
    if (input != "hit" || input != "stand") {
      myOutputValue = "Please type in either 'hit' or 'stand'.";
    }
    if (input == "hit") {
      if (playerTotalValue >= 21) {
        myOutputValue =
          "Your value has already exceeded 21! You can no longer hit.";
        return myOutputValue;
      }
      playerHand.push(cardDeck.pop());
      console.log(playerHand[5].value);
      playerTotalValue += playerHand[5].value;
      myOutputValue =
        "Your hand cards are " +
        playerHand[0].name +
        " " +
        playerHand[0].suit +
        " " +
        "and " +
        playerHand[1].name +
        " " +
        playerHand[1].suit +
        " " +
        "and " +
        playerHand[2].name +
        " " +
        playerHand[2].suit +
        " " +
        "and " +
        playerHand[3].name +
        " " +
        playerHand[3].suit +
        " " +
        "and " +
        playerHand[4].name +
        " " +
        playerHand[4].suit +
        " " +
        "and " +
        playerHand[5].name +
        " " +
        playerHand[5].suit +
        ". Your total value is" +
        " " +
        playerTotalValue +
        "<br>" +
        "Computer hand cards are " +
        computerHand[0].name +
        " " +
        computerHand[0].suit +
        " " +
        "and " +
        computerHand[1].name +
        " " +
        computerHand[1].suit +
        ". Computer's total value is" +
        " " +
        computerTotalValue +
        ". Do you wish to hit again or stand?";
      return myOutputValue;
    }
    if (input == "stand") {
      while (computerTotalValue < 17) {
        computerHand.push(cardDeck.pop());
        computerTotalValue += computerHand[computerHand.length - 1].value;
        console.log(computerHand[computerHand.length - 1].value);
        myOutputValue =
          "Your total value is" +
          " " +
          playerTotalValue +
          ". <br>Computer hand cards are " +
          computerHand[0].name +
          " " +
          computerHand[0].suit +
          " " +
          "and " +
          computerHand[1].name +
          " " +
          computerHand[1].suit +
          ". Since computer's value is less than 17, it drew another" +
          "<br>";
        myOutputValue +=
          computerHand[computerHand.length - 1].name +
          " " +
          computerHand[computerHand.length - 1].suit +
          "<br>" +
          ". Computer's total value is" +
          " " +
          computerTotalValue;
      }
      stage += 1;
      myOutputValue =
        "Player's total value is" +
        " " +
        playerTotalValue +
        ". Computer's total value is " +
        "<br>";
      return myOutputValue;
    }
  }
};

var makeDeck = function () {
  // Initialise an empty deck array

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
      var value = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name

      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        value = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        value = 10;
      } else if (cardName == 13) {
        cardName = "king";
        value = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: value,
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
