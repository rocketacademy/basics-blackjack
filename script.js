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

// var TIEIMAGE =
//   "https://i.pinimg.com/originals/a1/5b/7f/a15b7f361a8cee4bd62c10b55b895d53.gif"; // this doesnt work

// From Esther's method of storing images, credit to her!
var images = {
  win: '<img src = "https://media.tenor.com/2nerD3zqcC4AAAAC/lebron-james-dunk.gif"/>',
  lose: '<img src = "https://thumbs.gfycat.com/BouncyBelovedDromaeosaur-size_restricted.gif"/>',
  tie: '<img src = "https://media.tenor.com/003djdkDDyYAAAAC/the-office-mexican-standoff.gif"/> ',
  newgame:
    '<img src = "https://media.tenor.com/Om5vDKW2-WEAAAAC/grenade-explosion.gif"/>',
  oops: `<img src = "https://media.tenor.com/1B3KuSRuHRsAAAAC/embarrassing-fail.gif"/>`,
  sillyloss: `<img src = "https://gifsec.com/wp-content/uploads/2022/10/anime-sad-gif-1.gif"/>`,
};

///////////////////////////
/////////
/////////

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
  console.log("BLACKJACKCHECKER STARTS!");
  console.log("the hand is: " + hand);

  var blackjackResult = false;

  var cardOne = hand[0];
  var cardTwo = hand[1];

  console.log("cardOne is: " + cardOne);
  console.log("cardTwo is: " + cardTwo);

  // If first card is Ace
  // check inverse Permutation
  if (
    (cardOne.name == "ace" && cardTwo.rank > 9) ||
    (cardOne.rank > 9 && cardTwo.name == "ace")
  ) {
    blackjackResult = true;
  }
  console.log("BLACKJACKCHECKER ENDS, IS RETURNING!");
  console.log(blackjackResult);
  return blackjackResult;
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

//GIF DOM
var gifFormat = function (gifvar) {
  var Giffy = gifvar;

  var gifoutputLeft = document.querySelector("#gifexportingleft");
  var gifoutputRight = document.querySelector("#gifexportingright");
  gifoutputLeft.innerHTML = Giffy;
  gifoutputRight.innerHTML = Giffy;
};

var playMyAudio = function (inputstr) {
  document.getElementById(inputstr).play();
};

////////////////////
//MAIN GAME FUNCTION
var main = function (input) {
  input = input.toLowerCase();

  if (GAMEMODE == "INTRO") {
    GAMEMODE = "START";
    // restart the Gif banners
    var gifoutputLeft = document.querySelector("#gifexportingleft");
    var gifoutputRight = document.querySelector("#gifexportingright");
    gifoutputLeft.innerHTML = "";
    gifoutputRight.innerHTML = "";

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

    // console.log("check blackjack");
    // console.log(playersHands[0] + " dealer hands BELOW");
    // // console.log("BEGINNING TO CHECK!!" + blackjackChecker([playersHands[0]]));
    // console.log("BEGINNING TO CHECK!!");
    // console.log(playersHands[0][0] + "card1");
    // console.log(playersHands[0][1] + "card2");

    //Check Blackjack Combinations
    //Only enters this block of code if either player has blackjack.
    if (
      blackjackChecker(playersHands[0]) == true ||
      blackjackChecker(playersHands[1]) == true
    ) {
      // If both Dealer and Player has blackjack
      if (
        blackjackChecker(playersHands[0]) == true &&
        blackjackChecker(playersHands[1]) == true
      ) {
        GAMEMODE = "RESET";
        CARDMODE = "RESET";

        var GifMsg = images.tie;
        gifFormat(images.tie);
        playMyAudio("tieAudio");

        return (
          `<b>Dealer has drawn:</b><br> ` +
          handDescription(playersHands[0]) +
          "<br><br>" +
          `<b>Player has drawn:</b><br> ` +
          handDescription(playersHands[1]) +
          "<br><br>" +
          `You Both Got Blackjack! It's a tie!<br>Press Button To Play Again.<br><br>`
          // + GifMsg
          //+ images.tie // didnt work, not sure why. I had to create variable first.
        );
      }
      // if only dealer has blackjack
      else if (
        blackjackChecker(playersHands[0]) == true &&
        blackjackChecker(playersHands[1]) == false
      ) {
        GAMEMODE = "RESET";
        CARDMODE = "RESET";

        var GifMsg = images.lose;
        gifFormat(images.lose);
        playMyAudio("blackjackAudio");

        return (
          `<b>Dealer has drawn:</b><br> ` +
          handDescription(playersHands[0]) +
          "<br><br>" +
          `<b>Player has drawn:</b><br> ` +
          handDescription(playersHands[1]) +
          "<br><br>" +
          `Dealer got blackjack, Dealer Won!!<br>Press Button To Play Again.<br><br>`
          // + GifMsg
          //// +images.lose
          // Not sure why i couldnt't directly put images.lose, instead I have to create a variable first i.e var GifMsg = images.lose! Not sure what is going on under the hood.
        );
      }
      // if only player has blackjack
      else if (
        blackjackChecker(playersHands[1]) == true &&
        blackjackChecker(playersHands[0]) == false
      ) {
        GAMEMODE = "RESET";
        CARDMODE = "RESET";

        var GifMsg = images.win;

        gifFormat(images.win);
        playMyAudio("blackjackAudio");

        return (
          `<b>Dealer has drawn:</b><br> ` +
          handDescription(playersHands[0]) +
          "<br><br>" +
          `<b>Player has drawn:</b><br> ` +
          handDescription(playersHands[1]) +
          "<br><br>" +
          `You got blackjack, You Won!! <br>Press Button To Play Again.<br><br>`
        );
      }
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
      return outputMsg;
    }

    if (input == "pass") {
      CARDMODE = "CHECKDEALERVALUE";
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
      CARDMODE = "DRAWPHASE";

      return (
        `<b>Dealer's Turn</b><br><br>` +
        "Dealer only has " +
        calculateHandValue(playersHands[0]) +
        ", under the 16 points required to start the game.<br><br> Press button for dealer to draw."
      );
    } else {
      CARDMODE = "ENDGAME";
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

    if (calculateHandValue(playersHands[0]) > 21) {
      var drawnPoints = calculateHandValue(playersHands[0]);
      resetGame();
      gifFormat(images.oops);

      playMyAudio("winAudio");

      return (
        "Dealer drew to " +
        drawnPoints +
        " points, couldn't even survive the first round.<br><br>Player Wins!"
      );
    } else if (calculateHandValue(playersHands[0]) > 16) {
      CARDMODE = "ENDGAME";

      return `Dealer has drawn ${dealerCheckCounter} cards and now has sufficient points.<br> Press button to continue.`;
    }
  }

  ///////////////////
  // Code should only execute past here if Player is done and Dealer has > 16, And if No Blackjack Conditions
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
      var GifMsg = images.sillyloss;
      gifFormat(images.sillyloss);
      console.log("OUTCOME 1");

      myOutputValue =
        myOutputValue +
        `<br>Dealer has a score of ${playersScore[0]}!<br>But Player has gone bust, with a score of ${playersScore[1]}!<br> Dealer Wins.<br><br>` +
        "Press Submit to Restart the game";

      playMyAudio("loseAudio");
      resetGame();
      return myOutputValue;
    }

    if (playerOneScore < 16) {
      var GifMsg = images.lose;
      gifFormat(images.lose);
      console.log("OUTCOME 2");

      myOutputValue =
        myOutputValue +
        `<br>Dealer has a score of ${playersScore[0]}!<br>But Player has a score of ${playersScore[1]}, which is under 16 points!<br> Dealer Wins.<br><br>` +
        "Press Submit to Restart the game";

      playMyAudio("loseAudio");

      resetGame();
      return myOutputValue;
    }

    // Normal win conditions
    if (playersScore[0] > playersScore[1]) {
      var GifMsg = images.lose;
      gifFormat(images.lose);
      console.log("OUTCOME 3");
      myOutputValue =
        myOutputValue +
        `<br>Dealer has a score of ${playersScore[0]}!<br>Player has a score of ${playersScore[1]}!<br> Dealer Wins.<br><br>` +
        "Press Submit to Restart the game";

      playMyAudio("loseAudio");

      resetGame();
      return myOutputValue;
    }

    if (playersScore[0] < playersScore[1]) {
      var GifMsg = images.win;
      gifFormat(images.win);

      playMyAudio("winAudio");

      myOutputValue =
        myOutputValue +
        `<br>Dealer has a score of ${playersScore[0]}!<br>Player has a score of ${playersScore[1]}!<br> Player Wins.<br><br>` +
        "Press Submit to Restart the game";
    }

    if (playersScore[0] == playersScore[1]) {
      var GifMsg = images.tie;

      gifFormat(images.tie);
      playMyAudio("tieAudio");

      myOutputValue =
        GifMsg + "<br>Its a tie mate...<br><br>Press Submit to Restart";
    }

    resetGame();
    return myOutputValue;
  }

  if (CARDMODE == "RESET" && GAMEMODE == "RESET") {
    resetGame();
    var GifMsg = images.newgame;
    gifFormat(images.newgame);
    console.log("RESET MODE");

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
