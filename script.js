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

var blackjackCheck = function (hand) {
  var counter = 0;
  var rankValueSum = 0;
  var blackjackStatement;

  if (hand.length != 2) {
    return false;
  }

  while (counter < hand.length) {
    rankValueSum = rankValueSum + hand[counter].rank;
    counter += 1;
  }

  if (rankValueSum == 21) {
    blackjackStatement = true; // Blackjack Condition
  } else {
    blackjackStatement = false;
  }
  return blackjackStatement;
};

// Obtain and Sum the rank of all the cards in the hand
var calculateHandValue = function (hand) {
  var counter = 0;
  var rankValueSum = 0;

  // Adds the value of the rank for each card
  while (counter < hand.length) {
    rankValueSum = rankValueSum + hand[counter].rank;
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
  console.log(card);
  var suitType = card.suit;
  var cardName = card.name;

  // return `${cardName} of ${suitType}`;
  return cardName + " of " + suitType;
};

var main = function (input) {
  input = input.toLowerCase();

  if (GAMEMODE == "START" && CARDMODE == "START") {
    myOutputValue = "";
    // Make and Shuffle deck
    cardDeck = makeDeck();
    cardDeck = shuffleCards(cardDeck);
    // console.log(cardDeck[0]);
    // console.log(cardDeck[1]);

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

    //Check Blackjack for Dealer first, then Players.
    if (blackjackCheck[0]) {
      return `Dealer drew <br>${playersHands[0][0]} and ${playersHands[0][1]}! <br> You Lose.`;
    }
    //Check if Players have blackjack
    // Starts from 1 in the playersHands list
    var blackjackCount = 1;
    while (blackjackCount < numOfPlayers) {
      if (blackjackCheck[blackjackCount]) {
        return `You drew <br>${playersHands[blackjackCount][0]} and ${playersHands[blackjackCount][1]}! <br> You Won!!`;
      }
      blackjackCount += 1;
    }

    myOutputValue =
      `Dealer has drawn ` +
      cardType(playersHands[0][0]) +
      ` and ` +
      cardType(playersHands[0][1]) +
      `.<br><br>` +
      `Player 1 has drawn ` +
      cardType(playersHands[1][0]) +
      ` and ` +
      cardType(playersHands[1][1]) +
      `.<br><br>` +
      "All cards Drawn. <br><br>Type Hit to draw again, or Pass for Dealer's turn.";

    console.log(GAMEMODE + "initial");
    console.log(CARDMODE + "initial");
    GAMEMODE = "PLAY";
    CARDMODE = "PLAYER";
    console.log(GAMEMODE);
    console.log(CARDMODE);

    // CARDMODE = "DRAWPHASE";
    // CARDMODE = "CHECKDEALERVALUE";

    return myOutputValue;
  }

  //PLAYERS TURN
  while (GAMEMODE == "PLAY" && CARDMODE == "PLAYER") {
    if (input == "hit") {
      var addnCard = cardDeck.pop();
      playersHands[1].push(addnCard);

      var outputMsg =
        `Player has drawn ` +
        cardType(addnCard) +
        ".<br><br> Type Hit to draw again, or Pass for Dealer's turn.";
      console.log(GAMEMODE + "player");
      console.log(CARDMODE + "player");
      return outputMsg;
    }

    if (input == "pass") {
      CARDMODE = "CHECKDEALERVALUE";
      console.log(GAMEMODE + "check dealer");
      console.log(CARDMODE + "check dealer");
      return "Dealer's Turn.";
    } else {
      var outputMsg =
        `Dealer has drawn ` +
        cardType(playersHands[0][0]) +
        ` and ` +
        cardType(playersHands[0][1]) +
        `.<br><br>` +
        `Player 1 has drawn ` +
        cardType(playersHands[1][0]) +
        ` and ` +
        cardType(playersHands[1][1]) +
        `.<br><br>`;
      return (
        outputMsg +
        "<b>Input error.<br><br>" +
        "Please type Hit to draw, or Pass for Dealer's turn.</b>"
      );
    }
  }

  //Dealer Check
  //Dealer HAS to draw if score is below 17. Check lose condition for dealer as well.
  if (
    GAMEMODE == "PLAY" &&
    CARDMODE == "CHECKDEALERVALUE" &&
    calculateHandValue(playersHands[0]) < 17
  ) {
    console.log("Dealer Check Start");
    CARDMODE = "DRAWPHASE";
    console.log(GAMEMODE + "check dealer2");
    console.log(CARDMODE + "check dealer2");
    console.log(calculateHandValue(playersHands[0]) + "dealer initial value");
    return (
      `<b>Dealer's Turn</b><br><br>` +
      "Dealer only has " +
      calculateHandValue(playersHands[0]) +
      ", under the 16 points required to start the game.<br><br> Press button for dealer to draw."
    );
  }

  var dealerCheckCounter = 0;
  while (
    GAMEMODE == "PLAY" &&
    CARDMODE == "DRAWPHASE" &&
    calculateHandValue(playersHands[0]) < 17
  ) {
    var addnCard = cardDeck.pop();
    playersHands[0].push(addnCard);
    dealerCheckCounter += 1;

    if (calculateHandValue(playersHands[0]) > 21) {
      return (
        "Dealer drew to " +
        calculateHandValue(playersHands[0]) +
        " points, couldn't even survive the first round.<br><br>Player Wins!"
      );
    } else if (calculateHandValue(playersHands[0]) > 16) {
      CARDMODE = "ENDGAME";
      console.log(CARDMODE + "Dealer Drawn");
      console.log(calculateHandValue(playersHands[0]) + "dealer final value");

      return `Dealer has drawn ${dealerCheckCounter} cards and now has sufficient points.<br> Press button to continue.`;
    }
  }

  //Code should only execute past here if Player is done and Dealer has > 16.
  //Those conditions will prompt GAMEMODE == "PLAY" && CARDMODE == "DRAWPHASE"
  //FINAL ENDGAME
  if (GAMEMODE == "PLAY" && CARDMODE == "ENDGAME") {
    playersScore = [];

    //Start calculating the scores
    var sumScoreCounter = 0;
    while (sumScoreCounter < numOfPlayers) {
      playersScore.push(calculateHandValue(playersHands[sumScoreCounter]));
      sumScoreCounter += 1;
    }
    console.log("Scores Calculated");

    //Final Output String Formatting
    //DEALER
    var myOutputValue = `<b>Final Hands:</b> <br><br>` + `<b>Dealer:</b><br> `;

    var dealerCounter = 0;
    while (dealerCounter < playersHands[0].length) {
      var drawnCard = "";
      // console.log("length of dealer's hand: " + playersHands[0].length);
      // console.log(playersHands[0][dealerCounter]);

      drawnCard = cardType(playersHands[0][dealerCounter]);
      myOutputValue = myOutputValue + drawnCard + "<br>";
      dealerCounter += 1;
    }

    //PLAYER
    myOutputValue = myOutputValue + `<b>Player:</b><br> `;
    var playersCounter = 0;
    while (playersCounter < playersHands[1].length) {
      var drawnCard = "";
      // console.log("length of players's hand: " + playersHands[1].length);

      drawnCard = cardType(playersHands[1][playersCounter]);
      myOutputValue = myOutputValue + drawnCard + "<br>";
      playersCounter += 1;
    }

    //Win Conditions
    if (playersScore[0] > playersScore[1]) {
      myOutputValue =
        myOutputValue +
        `Dealer has a score of ${playersScore[0]}!<br> Dealer Wins.<br><br>` +
        "Press Submit to Restart the game";
    }

    //other win conditions
    if (playersScore[0] < playersScore[1]) {
      myOutputValue =
        myOutputValue +
        `Player has a score of ${playersScore[1]}!<br> Player Wins.<br><br>` +
        "Press Submit to Restart the game";
    }

    if ((playersScore[0] = playersScore[1])) {
      return "its a tie";
    }

    // reset the variables
    CARDMODE = "START";
    GAMEMODE = "START";
    playersScore = [];
    playersHands = [];
    cardDeck = [];

    return myOutputValue;
  }
};
