// Deal one card to Dealer, one card to player.. etc
// Check for Blackjack
// Else, wait for instructions
// Draw, or check.
// Compare values to win

// Initialise deck
var cardDeck = [];
var GAMEMODE = "START";
var CARDMODE = "START";

var numOfPlayers = Number(2);
var playersScore = [];
var playersHands = [];
var myOutputValue;

//UTILITY FUNCTIONS
//Pops two cards from the cardDeck, and returns them as a List.
// var initialiseDrawTwo = function () {
//   var currentHand = [];
//   currentHand.push(cardDeck.pop());
//   currentHand.push(cardDeck.pop());
//   console.log("cards drawn are" + currentHand);

//   return currentHand;
// };

//Check right at the beginning if a hand has Blackjack
//Accepts a Hand List
//Returns a Boolean
var blackjackChecker = function (hand) {
  console.log("check!!!!!");
  console.log("check 1");

  // If first card is Ace
  if (hand[0].name == "ace") {
    if (
      hand[1].name == "jack" ||
      hand[1].name == "queen" ||
      hand[1].name == "king" ||
      hand[1].name == "ace"
    ) {
      console.log("check A");
      return Boolean(true);
    } else {
      console.log("check B");
      return Boolean(false);
    }
  }
  console.log("check 1");

  // check inverse Permutation
  if (
    hand[0].name == "jack" ||
    hand[0].name == "queen" ||
    hand[0].name == "king"
  ) {
    if (hand[1].name == "ace") {
      console.log("check A");
      return Boolean(true);
    } else {
      console.log("check B");
      return Boolean(false);
    }
  }
  console.log("check 2");

  return Boolean(false);
};

// Obtain and Sum the rank of all the cards in the hand
var calculateHandValue = function (hand) {
  var counter = 0;
  var rankValueSum = 0;

  // Adds the value of the rank for each card
  while (counter < hand.length) {
    // Picture Card Logic
    if (
      hand[counter].name == "jack" ||
      hand[counter].name == "queen" ||
      hand[counter].name == "king"
    ) {
      rankValueSum = rankValueSum + 10;
    }

    // Ace Card Logic
    else if (hand[counter].name == "ace") {
      if (hand.length == 2) {
        rankValueSum = rankValueSum + 11;
      }
      if (hand.length > 2) {
        rankValueSum = rankValueSum + 1;
      }
    } else {
      rankValueSum = rankValueSum + hand[counter].rank;
    }
    counter += 1;
  }
  return Number(rankValueSum);
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
// max is the length of the current deck (i.e. push and pop is accounted for.)
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// BASE CARD GENERATION AND MANIPULATION
// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;

  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);

    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];

    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// A sorted array of Card objects
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

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
      };

      // Add the new card to the deck
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Returns a string that has the full description of the card
var cardType = function (card) {
  var suitType = card.suit;
  var cardName = card.name;
  return cardName + " of " + suitType;
};

// Accepts a hand as an input
// returns the full hand as individual cards, in a string
var handDescription = function (hand) {
  var outputValue = "";
  var handCounter = 0;

  while (handCounter < hand.length) {
    var drawnCard = "";
    drawnCard = cardType(hand[handCounter]);
    outputValue = outputValue + drawnCard + "<br>";
    handCounter += 1;
  }

  return outputValue;
  //returns a string
};

////////////////////
//MAIN GAME FUNCTION
var main = function (input) {
  input = input.toLowerCase();

  if (GAMEMODE == "INTRO") {
    GAMEMODE = "START";
    return "Let's Begin A New Game!";
  }
  if (GAMEMODE == "START" && CARDMODE == "START") {
    myOutputValue = "";
    // Make and Shuffle deck
    cardDeck = makeDeck();
    cardDeck = shuffleCards(cardDeck);

    // Initialise Player's Hands - i.e. each person draws two cards as a List. This goes into a playersHands.
    // playersHands[0][n] is always dealer's Hands
    // playersHands[n][n] is other players hands
    var initialCounter = 0;
    while (initialCounter < numOfPlayers) {
      var currentHand = [];
      currentHand.push(cardDeck.pop());
      currentHand.push(cardDeck.pop());
      playersHands.push(currentHand);

      initialCounter += 1;
    }

    console.log("check blackjack");
    console.log(playersHands[0] + "dealer hands BELOW");
    console.log(blackjackChecker[playersHands[0]]);
    console.log(playersHands[0][0] + "card1");
    console.log(playersHands[0][1] + "card2");

    // console.log(playersHands[1] + "player hands");

    //Check Blackjack for Dealer first, then Players.
    if (blackjackChecker[playersHands[0]] == true) {
      return `Dealer drew <br>${playersHands[0][0]} and ${playersHands[0][1]}! <br> You Lose.`;
    }
    //Check if Players have blackjack
    // Starts from 1 in the playersHands list
    var blackjackCount = 1;
    while (blackjackCount < numOfPlayers) {
      console.log(
        blackjackChecker[playersHands[blackjackCount]] + "player BJ check"
      );
      console.log(blackjackCount + "count");
      if (blackjackChecker[playersHands[blackjackCount]] == true) {
        return `You drew <br>${playersHands[blackjackCount][0]} and ${playersHands[blackjackCount][1]}! <br> You Won!!`;
      }
      blackjackCount += 1;
    }

    console.log("end blackjack check");

    myOutputValue =
      `<b>Dealer has drawn:</b><br> ` +
      handDescription(playersHands[0]) +
      "<br><br>" +
      `<b>Player has drawn:</b><br> ` +
      handDescription(playersHands[1]) +
      "<br><br>" +
      "Starting Hands Dealt. <br><br>Type Hit to draw again, or Pass for Dealer's turn.";

    GAMEMODE = "PLAY";
    CARDMODE = "PLAYER";

    return myOutputValue;
  }

  ////////////////////
  // GAME MODE - PLAYERS TURN
  while (GAMEMODE == "PLAY" && CARDMODE == "PLAYER") {
    // Standard Gameplay
    if (input == "hit") {
      var addnCard = cardDeck.pop();
      playersHands[1].push(addnCard);

      var outputMsg =
        `<b>Player has drawn...<br></b> ` +
        cardType(addnCard) +
        `<br><br>` +
        `You now have:<br>` +
        handDescription(playersHands[1]) +
        "<br><br>" +
        "You have <b>" +
        calculateHandValue(playersHands[1]) +
        " points.</b><br><br>" +
        " Type Hit to draw again, or Pass for Dealer's turn.";
      console.log(GAMEMODE + "player");
      console.log(CARDMODE + "player");
      return outputMsg;
    }

    if (input == "pass") {
      CARDMODE = "CHECKDEALERVALUE";
      console.log(GAMEMODE + " pass mode check dealer");
      console.log(CARDMODE + " pass mode check dealer");
      return "Dealer's Turn.";
    }

    //Input Error Message
    else {
      var outputMsg =
        `<b>Dealer has drawn:</b><br> ` +
        handDescription(playersHands[0]) +
        "<br><br>" +
        `<b>Player has drawn:</b><br> ` +
        handDescription(playersHands[1]) +
        "<br><br>";

      return (
        outputMsg +
        "<b>Input error.<br><br>" +
        "Please type Hit to draw, or Pass for Dealer's turn.</b>"
      );
    }
  }

  //Dealer Check PART 1
  //Dealer HAS to draw if score is below 17. Check lose condition for dealer as well.
  if (GAMEMODE == "PLAY" && CARDMODE == "CHECKDEALERVALUE") {
    if (calculateHandValue(playersHands[0]) < 17) {
      // console.log("Dealer Check Start");
      CARDMODE = "DRAWPHASE";
      // console.log(GAMEMODE + "check dealer2");
      // console.log(CARDMODE + "check dealer2");
      console.log(calculateHandValue(playersHands[0]) + "dealer initial value");
      return (
        `<b>Dealer's Turn</b><br><br>` +
        "Dealer only has " +
        calculateHandValue(playersHands[0]) +
        ", under the 16 points required to start the game.<br><br> Press button for dealer to draw."
      );
    } else {
      console.log(
        "Dealer Check Else Branch, GAMEMODE is " +
          GAMEMODE +
          " and CARDMODE is " +
          CARDMODE
      );
      CARDMODE = "ENDGAME";
      console.log("The cardmode has been changed to: " + CARDMODE);
      return "Dealer has sufficient points to proceed with the game.<br><br>Press button to show hand.";
    }
  }

  ////////////////////
  // Dealer Check PART 1
  var dealerCheckCounter = 0;
  while (
    GAMEMODE == "PLAY" &&
    CARDMODE == "DRAWPHASE" &&
    calculateHandValue(playersHands[0]) < 17
  ) {
    var addnCard = cardDeck.pop();
    playersHands[0].push(addnCard);
    dealerCheckCounter += 1;

    console.log(playersHands[0] + "dealer check error Pre");

    if (calculateHandValue(playersHands[0]) > 21) {
      var drawnPoints = calculateHandValue(playersHands[0]);
      resetGame();
      return (
        "Dealer drew to " +
        drawnPoints +
        " points, couldn't even survive the first round.<br><br>Player Wins!"
      );
    } else if (calculateHandValue(playersHands[0]) > 16) {
      CARDMODE = "ENDGAME";
      console.log(CARDMODE + "Dealer Drawn");
      console.log(calculateHandValue(playersHands[0]) + "dealer final value");

      return `Dealer has drawn ${dealerCheckCounter} cards and now has sufficient points.<br> Press button to continue.`;
    }
  }

  ///////////////////
  // Code should only execute past here if Player is done and Dealer has > 16.
  // Those conditions will prompt GAMEMODE == "PLAY" && CARDMODE == "DRAWPHASE"
  // FINAL ENDGAME
  ///////////////////
  // CALCULATING SCORES AND STRING FORMATTING FOR CARDS IN HAND.
  if (GAMEMODE == "PLAY" && CARDMODE == "ENDGAME") {
    playersScore = [];

    //Start calculating the scores
    var sumScoreCounter = 0;
    while (sumScoreCounter < numOfPlayers) {
      playersScore.push(calculateHandValue(playersHands[sumScoreCounter]));
      sumScoreCounter += 1;
    }
    console.log("Scores Calculated");

    ///////////////////
    //Final Output String Formatting
    ///////////////////
    var myOutputValue = `<b>Final Hands:</b> <br><br>`;

    var dealerHandStr = handDescription(playersHands[0]);
    var playerHandStr = handDescription(playersHands[1]);

    myOutputValue =
      myOutputValue +
      `<b>Dealer:</b><br> ` +
      dealerHandStr +
      "<br><br>" +
      `<b>Player:</b><br> ` +
      playerHandStr;

    ///////////////////
    // Win Conditions
    ///////////////////
    var dealerScore = playersScore[0];
    var playerOneScore = playersScore[1];

    console.log("dealer's score is: " + dealerScore);
    console.log("player's score is: " + playerOneScore);

    //Check if Player has bust or invalid hand
    if (playerOneScore > 21) {
      myOutputValue =
        myOutputValue +
        `<br>Dealer has a score of ${playersScore[0]}!<br>Player has gone bust, with a score of ${playersScore[1]}!<br> Dealer Wins.<br><br>` +
        "Press Submit to Restart the game";
      resetGame();
      return myOutputValue;
    }

    if (playerOneScore < 16) {
      myOutputValue =
        myOutputValue +
        `<br>Dealer has a score of ${playersScore[0]}!<br>But Player is under 16 points, with a score of ${playersScore[1]}!<br> Dealer Wins.<br><br>` +
        "Press Submit to Restart the game";
      resetGame();
      return myOutputValue;
    }

    // Normal win conditions
    if (playersScore[0] > playersScore[1]) {
      myOutputValue =
        myOutputValue +
        `<br>Dealer has a score of ${playersScore[0]}!<br>Player has a score of ${playersScore[1]}!<br> Dealer Wins.<br><br>` +
        "Press Submit to Restart the game";
      resetGame();
      return myOutputValue;
    }

    if (playersScore[0] < playersScore[1]) {
      myOutputValue =
        myOutputValue +
        `<br>Dealer has a score of ${playersScore[0]}!<br>Player has a score of ${playersScore[1]}!<br> Player Wins.<br><br>` +
        "Press Submit to Restart the game";
    }

    if (playersScore[0] == playersScore[1]) {
      myOutputValue = "<br>its a tie mate...";
    }

    resetGame();

    console.log("final gamemode is: " + GAMEMODE);
    console.log("final cardmode is: " + CARDMODE);

    return myOutputValue;
  }

  if (CARDMODE == "RESET" && GAMEMODE == "RESET") {
    resetGame();
    return "Push Button To Start a New Game!";
  }
};

//RESET GAME
var resetGame = function () {
  // reset the variables
  CARDMODE = "START";
  GAMEMODE = "INTRO";
  playersScore = [];
  playersHands = [];
  cardDeck = [];
};
