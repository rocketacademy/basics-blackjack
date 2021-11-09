var gameStage = 1;
var computerCard = [];
var playerCard = [];
var shuffledDeck = {};
var myOutputValue = "";

var computerBlackjack = false;
var playerBlackjack = false;
var playerScore = 0;
var computerScore = 0;

var playerCardValues = [];
var computerCardValues = [];
var playerValues = 0;
var computerValues = 0;

var main = function (input) {
  // Deck is shuffled.
  if (gameStage == 1) {
    shuffledDeck = shuffleCards(makeDeck());

    // User clicks Submit to deal cards.
    var cardCounter = 0;

    while (cardCounter < 2) {
      computerCard.push(shuffledDeck.pop());
      playerCard.push(shuffledDeck.pop());
      cardCounter += 1;
    }

    console.log(playerCard);
    console.log(playerCard[0].rank);
    console.log(playerCard[1].rank);

    // The cards are analysed for game winning conditions, e.g. Blackjack.
    if (
      (computerCard[0].rank == 1 && computerCard[1].rank > 9) ||
      (computerCard[1].rank == 1 && computerCard[0].rank > 9) ||
      (computerCard[1].rank == 1 && computerCard[0].rank == 1)
    ) {
      computerBlackjack = true;
    }
    if (
      (playerCard[0].rank == 1 && playerCard[1].rank > 9) ||
      (playerCard[1].rank == 1 && playerCard[0].rank > 9) ||
      (playerCard[1].rank == 1 && playerCard[0].rank == 1)
    ) {
      playerBlackjack = true;
    }

    myOutputValue =
      "Player's hand now are " +
      playerCard[0].name +
      playerCard[0].emoji +
      " and " +
      playerCard[1].name +
      playerCard[1].emoji;

    if (computerBlackjack == true && playerBlackjack == true) {
      myOutputValue =
        "Draw! Both players drew Blackjack! <br><br>Computer drew " +
        computerCard[0].name +
        computerCard[0].emoji +
        " and " +
        computerCard[1].name +
        computerCard[1].emoji +
        "<br><br>" +
        myOutputValue;

      return myOutputValue;
    } else if (computerBlackjack == true) {
      myOutputValue =
        "Blackjack, Computer Wins! <br><br>Computer drew " +
        computerCard[0].name +
        computerCard[0].emoji +
        " and " +
        computerCard[1].name +
        computerCard[1].emoji;

      return myOutputValue;
    } else if (playerBlackjack == true) {
      myOutputValue = "Blackjack, Player Wins! <br><br>" + myOutputValue;

      return myOutputValue;
    } else {
      // The cards are displayed to the user.
      gameStage += 1;
      return myOutputValue + "<br><br> Would you like to 'hit' or 'stand'?";
    }
  }

  // The user decides whether to hit or stand, using the submit button to submit their choice.
  if (gameStage == 2) {
    var userDecision = input;

    // The computer decides to hit or stand automatically based on game rules.
    var i = 0;
    while (i < computerCard.length) {
      if (Number(computerCard[i].rank) > 10) {
        computerCardValues.push(10);
        computerValues += 10;
      } else {
        computerCardValues.push(Number(computerCard[i].rank));
        computerValues += Number(computerCard[i].rank);
      }
      i += 1;
    }
    console.log("computer card values are: " + computerCardValues);
    console.log("computer values are: " + computerValues);

    if (computerValues < 17) {
      computerCard.push(shuffledDeck.pop());
    }

    // The user decides whether to hit or stand,
    if (userDecision == "hit") {
      playerCard.push(shuffledDeck.pop());
      myOutputValue =
        "Player hit!" +
        "<br><br>Player drew " +
        playerCard[2].name +
        playerCard[2].emoji +
        "<br><br>" +
        myOutputValue +
        " and " +
        playerCard[2].name +
        playerCard[2].emoji +
        "<br><br>Hit submit to reveal cards!";

      gameStage += 1;
      return myOutputValue;
    } else if (userDecision == "stand") {
      gameStage += 1;
      return (
        "Player stand! <br><br>" +
        myOutputValue +
        "<br><br>Hit submit to reveal cards!"
      );
    } else {
      return "Please only type in 'hit' or 'stand'";
    }
  }

  // The user's cards are analysed for winning or losing conditions.
  if (gameStage == 3) {
    var playerOutput = "";
    var computerOutput = "";

    //count player hands
    var i = 0;
    while (i < playerCard.length) {
      if (Number(playerCard[i].rank) > 10) {
        playerCardValues.push(10);
        playerValues += 10;
        playerOutput += playerCard[i].name + playerCard[i].emoji + " ";
      } else {
        playerCardValues.push(Number(playerCard[i].rank));
        playerValues += Number(computerCard[i].rank);
        playerOutput += playerCard[i].name + playerCard[i].emoji + " ";
      }
      i += 1;
    }

    //count computer hands
    var i = 0;
    while (i < computerCard.length) {
      if (Number(computerCard[i].rank) > 10) {
        computerCardValues.push(10);
        computerValues += 10;
        computerOutput += computerCard[i].name + computerCard[i].emoji + " ";
      } else {
        computerCardValues.push(Number(computerCard[i].rank));
        computerValues += Number(computerCard[i].rank);
        computerOutput += computerCard[i].name + computerCard[i].emoji + " ";
      }
      i += 1;
    }

    if (playerValues > computerValues && playerValues < 21) {
      return (
        "Player WON!!!" +
        "<br><br>Player's Hand:<br>" +
        playerOutput +
        "<br><br> Computer's Hand:<br>" +
        computerOutput
      );
    } else if (playerValues < computerValues && computerValues < 21) {
      return (
        "Computer WON!!!" +
        "<br><br>Player's Hand:<br>" +
        playerOutput +
        "<br><br> Computer's Hand:<br>" +
        computerOutput
      );
    }
  }

  // The game either ends or continues.
};

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var emoji = ["♥️", "♦️", "♣️", "♠️"];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var currentEmoji = emoji[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
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

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentEmoji,
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
