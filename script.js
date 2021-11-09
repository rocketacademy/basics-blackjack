// Stage 1: Cards are shuffled. Player starts game and is given 2 cards and dealer is given 2 cards
// Stage 2: Player decides if they want to 'Hit' a card or to 'Stand', dealer automatically draws if it does not have 21 points. If the player 'bust' the game ends, and the results is tallied. If the player 'Hit' and has not bust, stage 2 is repeated.
// Stage 3: If the player decides to stand, the results is tallied. Game is resetted.

var gameMode = "gameStart";
var playerHand = [];
var dealerHand = [];
var playerScore = 0;
var dealerScore = 0;
var currentIndex = 0;
var playerTotalWins = 0;
var dealerTotalWins = 0;
var myOutputValue = "Error in states";
let timerInterval; // for alert popup

var main = function (input) {
  if (input == "restart") {
    gameMode = "gameStart";
    playerTotalWins = 0;
    dealerTotalWins = 0;
  }

  if (gameMode == "gameStart") {
    playerHand = [];
    dealerHand = [];

    // deep clone of array
    var copiedDeck = [...newCardDeck];
    cardDeck = shuffleCards(copiedDeck);
    playerHand.push(cardDeck.pop());
    playerHand.push(cardDeck.pop());

    dealerHand.push(cardDeck.pop());
    dealerHand.push(cardDeck.pop());

    console.log(playerHand);
    console.log(dealerHand);

    playerScore = generateScore(playerHand);
    dealerScore = generateScore(dealerHand);

    var showPlayerHand = showHand(playerHand, "player");
    var showDealerFirstCard = showFirstCard(dealerHand);

    myOutputValue =
      "Player score: " +
      playerScore +
      "<br>" +
      "Player hand: <br><br>" +
      showPlayerHand +
      "<br>" +
      "Dealer hand: <br><br>" +
      showDealerFirstCard +
      "<br>" +
      "Enter 'Hit' or 'Stand' to continue.";

    gameMode = "hitOrStand";
  } else if (gameMode == "hitOrStand") {
    while (dealerScore < 15) {
      dealerHand.push(cardDeck.pop());
      dealerScore = generateScore(dealerHand);
    }

    if (input == "Hit" || input == "hit" || input == "H" || input == "h") {
      playerHand.push(cardDeck.pop());

      playerScore = generateScore(playerHand);

      myOutputValue =
        "Player score: " +
        playerScore +
        "<br>" +
        "Player hand: <br><br>" +
        showHand(playerHand, "player") +
        "<br>" +
        "Dealer hand: <br><br>" +
        showFirstCard(dealerHand) +
        "<br>" +
        "Enter 'Hit' or 'Stand' to continue.";
    } else if (
      input == "Stand" ||
      input == "stand" ||
      input == "s" ||
      input == "S"
    ) {
      var results = "";
      if (playerScore <= 21 && playerScore > dealerScore) {
        playerTotalWins += 1;
        Swal.fire({
          title: "Congratulations you won!",
          timer: 3000,
          width: 600,
          padding: "3em",
          background: "",
          backdrop: `
    rgba(0,0,0,0.4)
    url(assets/youwin.gif)
    center bottom 
    no-repeat
  `,
        });
        results = "Player wins! ";
      } else if (dealerScore <= 21 && dealerScore > playerScore) {
        dealerTotalWins += 1;
        Swal.fire({
          title: "You lost! Better luck next time!",
          timer: 3000,
          width: 600,
          padding: "3em",
          background: "",
          backdrop: `
    rgba(0,0,0,0.4)
    url(assets/youlose.gif)
    center bottom 
    no-repeat
  `,
        });
        results = "Dealer wins! ";
      } else if (dealerScore == playerScore) {
        Swal.fire({
          title: "It's a tie! You better watch out!",
          timer: 3000,
          width: 600,
          padding: "3em",
          background: "",
          backdrop: `
    rgba(0,0,0,0.4)
    url(assets/draw.gif)
    center bottom 
    no-repeat
  `,
        });
        results = "It's a tie! ";
      } else if (playerScore > 21 && dealerScore > 21) {
        Swal.fire({
          title: "You both went busts! That was a close one!",
          timer: 3000,
          width: 600,
          padding: "3em",
          background: "",
          backdrop: `
    rgba(0,0,0,0.4)
    url(assets/draw.gif)
    center bottom 
    no-repeat
  `,
        });
        results = "You both went busts! It's a tie! ";
      } else if (playerScore > 21 && dealerScore <= 21) {
        dealerTotalWins += 1;
        Swal.fire({
          title: "You went busts! Better luck next time!",
          timer: 3000,
          width: 600,
          padding: "3em",
          background: "",
          backdrop: `
    rgba(0,0,0,0.4)
    url(assets/youlose.gif)
    center bottom 
    no-repeat
  `,
        });
        results = "You went busts! You lose! ";
      } else if (playerScore <= 21 && dealerScore > 21) {
        playerTotalWins += 1;
        Swal.fire({
          title: "You got lucky! Dealer went busts!",
          timer: 3000,
          width: 600,
          padding: "3em",
          background: "",
          backdrop: `
    rgba(0,0,0,0.4)
    url(assets/youwin.gif)
    center bottom 
    no-repeat
  `,
        });
        results = "Dealer went busts! You win! ";
      }

      myOutputValue =
        results +
        "Player : " +
        playerTotalWins +
        " | Dealer : " +
        dealerTotalWins +
        "<br><br>" +
        "Player score: " +
        playerScore +
        "<br>" +
        "Player hand: <br><br>" +
        showHand(playerHand, "player") +
        "<br>" +
        "Dealer score: " +
        dealerScore +
        "<br>" +
        "Player hand: <br><br>" +
        showHand(dealerHand, "dealer") +
        "<br>Select 'Start' or 'Hit' to continue playing, or 'Restart' to restart the counter.";

      gameMode = "gameStart";
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please select 'Hit' or 'Stand' to continue.",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
  return myOutputValue;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (deck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(deck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = deck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = deck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return deck;
};

// Generate Score

var generateScore = function (hand) {
  var scoreWithoutAce = 0; // Ace as 1
  var scoreWithAce = []; // Ace as 11
  var score = 0;

  currentIndex = 0;
  while (currentIndex < hand.length) {
    scoreWithoutAce += Number(hand[currentIndex].score);
    score = scoreWithoutAce;
    currentIndex++;
  }

  // option to add 10 if there is a Ace
  currentIndex = 0;
  scoreWithAce = [score];
  while (currentIndex < hand.length) {
    if (Number(hand[currentIndex].score) == 1) {
      if (score + 10 <= 21) {
        score += 10;
      }
    }
    currentIndex++;
  }

  var myOutputValue = score;
  return myOutputValue;
};

// Show Hand

var showHand = function (hand, handType) {
  var myOutputValue = "";
  var currentIndex = 0;
  while (currentIndex < hand.length) {
    myOutputValue =
      myOutputValue +
      "<img class='" +
      handType +
      "-hand' src ='" +
      String(hand[currentIndex].image) +
      "'/>";
    currentIndex++;
  }
  console.log(myOutputValue);
  return myOutputValue;
};

// Show first card

var showFirstCard = function (hand) {
  var myOutputValue = "";
  var currentIndex = 1;
  myOutputValue = myOutputValue + "<img src ='" + String(hand[0].image) + "'/>";
  console.log(myOutputValue);
  while (currentIndex < hand.length) {
    myOutputValue = myOutputValue + "<img src ='assets/grey_back.png'/>";
    currentIndex++;
  }
  return myOutputValue;
};

// Full deck of cards

var backOfCard = [
  {
    name: "red",
    image: "assets/red_back.png",
  },

  {
    name: "grey",
    image: "assets/grey_back.png",
  },
];

var newCardDeck = [
  {
    name: "ace",
    suit: "hearts",
    score: 1,
    image: "assets/AH.png",
  },
  {
    name: "2",
    suit: "hearts",
    score: 2,
    image: "assets/2H.png",
  },
  {
    name: "3",
    suit: "hearts",
    score: 3,
    image: "assets/3H.png",
  },
  {
    name: "4",
    suit: "hearts",
    score: 4,
    image: "assets/4H.png",
  },
  {
    name: "5",
    suit: "hearts",
    score: 5,
    image: "assets/5H.png",
  },
  {
    name: "6",
    suit: "hearts",
    score: 6,
    image: "assets/6H.png",
  },
  {
    name: "7",
    suit: "hearts",
    score: 7,
    image: "assets/7H.png",
  },
  {
    name: "8",
    suit: "hearts",
    score: 8,
    image: "assets/8H.png",
  },
  {
    name: "9",
    suit: "hearts",
    score: 9,
    image: "assets/9H.png",
  },
  {
    name: "10",
    suit: "hearts",
    score: 10,
    image: "assets/10H.png",
  },
  {
    name: "jack",
    suit: "hearts",
    score: 10,
    image: "assets/JH.png",
  },
  {
    name: "queen",
    suit: "hearts",
    score: 10,
    image: "assets/QH.png",
  },
  {
    name: "king",
    suit: "hearts",
    score: 10,
    image: "assets/KH.png",
  },
  {
    name: "ace",
    suit: "diamonds",
    score: 1,
    image: "assets/AD.png",
  },
  {
    name: "2",
    suit: "diamonds",
    score: 2,
    image: "assets/2D.png",
  },
  {
    name: "3",
    suit: "diamonds",
    score: 3,
    image: "assets/3D.png",
  },
  {
    name: "4",
    suit: "diamonds",
    score: 4,
    image: "assets/4D.png",
  },
  {
    name: "5",
    suit: "diamonds",
    score: 5,
    image: "assets/5D.png",
  },
  {
    name: "6",
    suit: "diamonds",
    score: 6,
    image: "assets/6D.png",
  },
  {
    name: "7",
    suit: "diamonds",
    score: 7,
    image: "assets/7D.png",
  },
  {
    name: "8",
    suit: "diamonds",
    score: 8,
    image: "assets/8D.png",
  },
  {
    name: "9",
    suit: "diamonds",
    score: 9,
    image: "assets/9D.png",
  },
  {
    name: "10",
    suit: "diamonds",
    score: 10,
    image: "assets/10D.png",
  },
  {
    name: "jack",
    suit: "diamonds",
    score: 10,
    image: "assets/JD.png",
  },
  {
    name: "queen",
    suit: "diamonds",
    score: 10,
    image: "assets/QD.png",
  },
  {
    name: "king",
    suit: "diamonds",
    score: 10,
    image: "assets/KD.png",
  },
  {
    name: "ace",
    suit: "clubs",
    score: 1,
    image: "assets/AC.png",
  },
  {
    name: "2",
    suit: "clubs",
    score: 2,
    image: "assets/2C.png",
  },
  {
    name: "3",
    suit: "clubs",
    score: 3,
    image: "assets/3C.png",
  },
  {
    name: "4",
    suit: "clubs",
    score: 4,
    image: "assets/4C.png",
  },
  {
    name: "5",
    suit: "clubs",
    score: 5,
    image: "assets/5C.png",
  },
  {
    name: "6",
    suit: "clubs",
    score: 6,
    image: "assets/6C.png",
  },
  {
    name: "7",
    suit: "clubs",
    score: 7,
    image: "assets/7C.png",
  },
  {
    name: "8",
    suit: "clubs",
    score: 8,
    image: "assets/8C.png",
  },
  {
    name: "9",
    suit: "clubs",
    score: 9,
    image: "assets/9C.png",
  },
  {
    name: "10",
    suit: "clubs",
    score: 10,
    image: "assets/10C.png",
  },
  {
    name: "jack",
    suit: "clubs",
    score: 10,
    image: "assets/JC.png",
  },
  {
    name: "queen",
    suit: "clubs",
    score: 10,
    image: "assets/QC.png",
  },
  {
    name: "king",
    suit: "clubs",
    score: 10,
    image: "assets/KC.png",
  },
  {
    name: "ace",
    suit: "spades",
    score: 1,
    image: "assets/AS.png",
  },
  {
    name: "2",
    suit: "spades",
    score: 2,
    image: "assets/2S.png",
  },
  {
    name: "3",
    suit: "spades",
    score: 3,
    image: "assets/3S.png",
  },
  {
    name: "4",
    suit: "spades",
    score: 4,
    image: "assets/4S.png",
  },
  {
    name: "5",
    suit: "spades",
    score: 5,
    image: "assets/5S.png",
  },
  {
    name: "6",
    suit: "spades",
    score: 6,
    image: "assets/6S.png",
  },
  {
    name: "7",
    suit: "spades",
    score: 7,
    image: "assets/7S.png",
  },
  {
    name: "8",
    suit: "spades",
    score: 8,
    image: "assets/8S.png",
  },
  {
    name: "9",
    suit: "spades",
    score: 9,
    image: "assets/9S.png",
  },
  {
    name: "10",
    suit: "spades",
    score: 10,
    image: "assets/10S.png",
  },
  {
    name: "jack",
    suit: "spades",
    score: 10,
    image: "assets/JS.png",
  },
  {
    name: "queen",
    suit: "spades",
    score: 10,
    image: "assets/QS.png",
  },
  {
    name: "king",
    suit: "spades",
    score: 10,
    image: "assets/KS.png",
  },
];
