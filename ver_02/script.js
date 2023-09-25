// ============= Global Variables ==============
var playMode = "";
var playerScore = 0;
var dealerScore = 0;
var currentIndex = 0;
var tieGames = 0;
var playerWins = 0;
var dealerWins = 0;
// the hand card section
var playerCardDraw = [];
var dealerCardDraw = [];
// the display section
var playerHandOutput = "";
var playerHandDisplay = "";
var dealerHandOutput = "";
var dealerHandDisplay = "";
var myOutputValue;
var scoreTabulation;

// --------- Deck Creation Functions ------------

function makeDeck() {
  var cardDeck = [];
  var suits = ["♠️", "♥️", "♣️", "♦️"];
  var colors = ["black", "red", "black", "red"];

  var outerCounter = 0;
  while (outerCounter < suits.length) {
    var currentSuit = suits[outerCounter];
    var currentColor = colors[outerCounter];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardValue = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        cardValue = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        cardValue = 10;
        cardName = "king";
      }

      var card = {
        name: cardName,
        value: cardValue,
        suit: currentSuit,
        rank: rankCounter,
        color: currentColor,
      };

      cardDeck.push(card);
      rankCounter += 1;
    }

    outerCounter += 1;
  }

  return cardDeck;
}

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function shuffleCards(cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);

    var randomCard = cardDeck[randomIndex];

    var currentCard = cardDeck[currentIndex];

    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex += 1;
  }

  return cardDeck;
}
// ------------- Card Deck Creation --------------------

var cardDeck = makeDeck();
var shuffledDeck = shuffleCards(cardDeck);

// ============= Main Function ==================
var main = function (input) {
  /*---------Initial initialization -------------------*/
  currentIndex;
  tieGames;
  playerWins;
  dealerWins;
  playerCardDraw;
  dealerCardDraw;
  playerHandDisplay;
  dealerHandDisplay;
  playerHandOutput;
  dealerHandOutput;
  playerScore;
  dealerScore;

  if (playMode == "reset") {
    cardDeck = makeDeck();
    shuffledDeck = shuffleCards(cardDeck);
    playerDeck = [];
    dealerDeck = [];
    playerCardDraw = [];
    dealerCardDraw = [];

    playerWins = 0;
    playerScore = 0;
    dealerWins = 0;
    dealerScore = 0;

    myOutputValue =
      "Welcome to Back to Basics Blackjack. <br><br> Press <em>'Play'</em>  to start a new game.";
    return myOutputValue;
  }
  /*-------------------------------------Play Button ------------------------------------------*/
  if (playMode == "play") {
    /*---------Initial initialization -------------------*/
    playerCardDraw = [];
    dealerCardDraw = [];
    playerHandDisplay = "";
    dealerHandDisplay = "";
    playerScore = 0;
    dealerScore = 0;

    /*---------This is the Player's initial draw and score -------------------*/
    playerCardDraw.push(shuffledDeck.pop());
    playerCardDraw.push(shuffledDeck.pop());

    // this is the display of the player's cards
    for (var counter = 0; counter < playerCardDraw.length; counter += 1) {
      playerHandDisplay += cardName(playerCardDraw[counter]);
      playerScore += Number(playerCardDraw[counter].value);
    }

    // this is the blackjack checker
    for (var counter = 0; counter < playerCardDraw.length; counter += 1) {
      if (playerCardDraw[counter].name == "ace") {
        playerScore += 10;
        if (
          playerCardDraw[counter].name == "ace" &&
          playerCardDraw[1].name == "ace"
        ) {
          playerScore = playerScore - 9;
        }
        if (playerScore == 21) {
          playerHandDisplay +=
            "<br><em> Player has Won this Hand with Blackjack !!! </em>";
          playerWins += 1;
        }
      }
    }

    playerHandOutput =
      "Player's score : " +
      playerScore +
      "<br><br>" +
      playerHandDisplay +
      " <br><br> Would you like to <em><b>'Hit'</b></em> <br>or<br> <em><b>'Stand'</b></em>";

    /*-------------------This is the Dealer's initial draw and score -------------------*/

    dealerCardDraw.push(shuffledDeck.pop());
    dealerCardDraw.push(shuffledDeck.pop());
    // this is for displaying the dealer's first drawn card
    var dealerTempScore = dealerCardDraw[0].value;
    var dealerTempHand = cardName(dealerCardDraw[0]);

    // normal dealer card display
    for (var counter = 0; counter < dealerCardDraw.length; counter += 1) {
      dealerScore += Number(dealerCardDraw[counter].value);
      dealerHandDisplay += cardName(dealerCardDraw[counter]);

      // this is the blackjack checker
      if (dealerCardDraw[0].name == "ace" && dealerScore + 10 <= 21) {
        dealerScore += 10;

        if (dealerCardDraw[1].name == "ace") {
          dealerScore = dealerScore - 9;
        }
        if (dealerScore == 21) {
          dealerTempScore = dealerScore;
          dealerHandDisplay +=
            "<br>" +
            cardName(dealerCardDraw[1]) +
            "<br><br> Dealer has Won this Hand with Blackjack !!! ";
          dealerWins += 1;
        }
      }
    }

    dealerHandOutput =
      " Dealer scores : " + dealerTempScore + " <br><br> " + dealerTempHand;

    myOutputValue =
      "The deck has : " +
      shuffledDeck.length +
      " cards left <br><br>" +
      playerHandOutput +
      "<br><br><br>" +
      dealerHandOutput;
  }

  /*-------------------------------------Hit Button -------------------------------------------*/
  if (playMode == "hit") {
    console.log("................................................");
    console.log("This is the Hit portion");

    // this checks if the hand limit has been hit
    if (playerCardDraw.length <= 5) {
      playerCardDraw.push(shuffledDeck.pop());
      // console.log(playerCardDraw);

      // this is the display of the player's cards
      playerScore = 0;
      playerHandDisplay = "";
      for (var counter = 0; counter < playerCardDraw.length; counter += 1) {
        playerHandDisplay += cardName(playerCardDraw[counter]);
        playerScore += Number(playerCardDraw[counter].value);
        // this is the blackjack checker
        if (playerScore == 21) {
          playerHandDisplay +=
            "<br> Player has Won this Hand with Blackjack !!! ";
          console.log("this is the blackjack condition for the player <br>");
        }

        if (playerCardDraw.length == 5 && playerScore <= 21) {
          playerHandDisplay +=
            "<br> Player has Won this Hand with a rare Charlie Blackjack !!! ";
        }
      }
      // this is the bust checker
      if (playerCardDraw.length >= 6 || playerScore >= 22) {
        playerHandDisplay +=
          "<br><br> Player has gone <b>Bust</b>. <br? Better luck next time!!! <br><br>";
      }
    }

    playerHandOutput =
      "Player's score : " +
      playerScore +
      "<br><br>" +
      playerHandDisplay +
      " <br><br> Would you like to continue to <em><b>'Hit'</b></em> <br>or<br> stop and <em><b>'Stand'</b></em>";

    myOutputValue =
      "The deck has : " +
      shuffledDeck.length +
      " cards left <br><br>" +
      playerHandOutput +
      "<br><br><br>" +
      dealerHandOutput;
  }

  /*-------------------------------------Stand Button -----------------------------------------*/
  if (playMode == "stand") {
    if (playerScore <= 21 && dealerScore <= 21 && dealerScore < playerScore) {
      dealerCardDraw.push(shuffledDeck.pop());
      // this is for displaying new drawn cards
      for (var counter = 2; counter < dealerCardDraw.length; counter += 1) {
        dealerHandDisplay += cardName(dealerCardDraw[counter]);
        dealerScore += Number(dealerCardDraw[counter].value);
      }

      // this is the blackjack checker
      if (dealerScore == 21) {
        dealerHandDisplay +=
          "<br> Dealer has Won this Hand with Blackjack !!! ";
      } else if (dealerCardDraw.length == 5 && dealerScore <= 21) {
        dealerHandDisplay +=
          "<br> Player has Won this Hand with a rare Charlie Blackjack !!! ";
      }
    }

    // this is the result tabulation portion
    if (playerScore > dealerScore) {
      playerWins += 1;
      currentIndex += 1;
      scoreTabulation =
        "Player has won this hand with " +
        playerScore +
        "<br> while Dealer only has " +
        dealerScore +
        "<br><br>" +
        "Currently the stats are: <br>" +
        "Games: " +
        currentIndex +
        "<br>Player: " +
        playerWins +
        "<br>Dealer: " +
        dealerWins;
    } else if (playerScore < dealerScore) {
      dealerWins += 1;
      currentIndex += 1;
      scoreTabulation =
        "Player has lost this hand with " +
        playerScore +
        "<br> while Dealer has " +
        dealerScore +
        "<br><br>" +
        "Currently the stats are: <br>" +
        "Games: " +
        currentIndex +
        "<br>Player: " +
        playerWins +
        "<br>Dealer: " +
        dealerWins;
    } else {
      tieGames += 1;
      currentIndex += 1;
      scoreTabulation =
        "It's a tie !!! " +
        "<br><br>" +
        "Currently the stats are: <br>" +
        "Games: " +
        currentIndex +
        "<br>Player: " +
        playerWins +
        "<br>Dealer: " +
        dealerWins;
    }

    dealerHandOutput =
      " Dealer scores : " + dealerScore + " <br><br> " + dealerHandDisplay;

    console.log("dealer cards " + dealerScore);

    myOutputValue =
      "The deck has : " +
      shuffledDeck.length +
      " cards left <br><br>" +
      playerHandOutput +
      "<br><br><br>" +
      dealerHandOutput +
      "<br><br>---------------------------------<br><br>" +
      scoreTabulation +
      "<br><br>---------------------------------<br><br>" +
      "Click <em>Play<em> for the next game";
  }

  return myOutputValue;
};

/*------------- This section is for the simplified functions of the program -------------------*/

var cardName = function (card) {
  return card.name + " of " + card.suit + "<br> ";
};

/*------------------- This section is for the html functions of the program -------------------*/

// this is the button functions in the html

var buttonPlay = document.querySelector("#play-button");
buttonPlay.addEventListener("click", function () {
  playMode = "play";
  var result = main("play");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

var buttonHit = document.querySelector("#hit-button");
buttonHit.addEventListener("click", function () {
  playMode = "hit";
  var result = main("hit");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

var buttonStand = document.querySelector("#stand-button");
buttonStand.addEventListener("click", function () {
  playMode = "stand";
  var result = main("stand");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

var buttonReset = document.querySelector("#reset-button");
buttonReset.addEventListener("click", function () {
  playMode = "reset";
  var result = main("reset");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});
