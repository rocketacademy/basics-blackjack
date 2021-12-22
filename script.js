//1. 2 player - computer will always be the dealer
//2. Players start off with 100, allow players to place bets
//2. Each player gets dealt 2 cards to start (dealer's first card is hidden)
//3. Player decides to hit or stand
//- if <17, recommend to hit; else, stand
//4. Dealer has to hit if hand < 17
//5. Calculate scores at the end of round - J/Q/K = 10, A - 1/11  (if 2 aces, only 1 is 11)
//6. Winner has hand closest to 21 (account for draw scenario)
var myOutputValue;
var cardsInHand;
var dealer = {
  name: "Dealer",
  hand: [],
  //totalAmount: 100,
  score,
  cardsInHand,
  //betAmount: 0,
};

var player = {
  name: "",
  hand: [],
  totalAmount: 100,
  score,
  cardsInHand,
  betAmount: 0,
};
var gameMode = "setup";
var score = 0;
var totalAmount; // that each player has
var betAmount; // that each player bets
var turn = "player";

//create card deck ♠♥♣♦
var cardDeck = function () {
  var deck = [];
  var suits = ["♣", "♦", "♥", "♠"];
  var suitIndex = 0;

  while (suitIndex < 4) {
    var currentSuit = suits[suitIndex];
    var rankCount = 1;
    while (rankCount < 14) {
      var rankName = rankCount;
      if (rankCount == 1) {
        rankName = "Ace";
      } else if (rankCount == 11) {
        rankName = "Jack";
      } else if (rankCount == 12) {
        rankName = "Queen";
      } else if (rankCount == 13) {
        rankName = "King";
      }
      var card = {
        points: rankCount,
        rank: rankName,
        suit: currentSuit,
        name: `${rankName} of ${currentSuit}`,
      };

      deck.push(card);
      rankCount += 1;
    }
    suitIndex += 1;
  }
  //console.log(deck.length);
  return deck;
};

//shuffle card deck
var shuffle = function (deck) {
  var maxDeckLength = deck.length;
  var currentIndex = 0;

  while (currentIndex < maxDeckLength) {
    var randomIndex = Math.floor(Math.random() * maxDeckLength);
    var currentCard = deck[currentIndex];
    var randomCard = deck[randomIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  //console.log(deck);
  return deck;
};

var deck = cardDeck();
var shuffledDeck = shuffle(deck);

//deal number of cards based on player and move
var dealCards = function (player, move) {
  console.log(shuffledDeck.length);
  if (move == "deal") {
    player.hand.push(shuffledDeck.pop(), shuffledDeck.pop());
  } else if (move == "hit") {
    player.hand.push(shuffledDeck.pop());
  }
};

//count points in hand
var scoreOutput = "";
var points = function (hand) {
  var score = 0;
  for (let i = 0; i < hand.length; i += 1) {
    // to count point in hands
    if (hand[i].points > 10) {
      //console.log(hand[i].rankName);
      //console.log(hand[i].points);
      hand[i].points = 10;
      //console.log(hand[i].points);
    } else if (hand[i].points == 1) {
      // account for ace
      if (score <= 11) {
        hand[i].points = 11;
      } else {
        hand[i].points = 1;
      }
    }
    score += hand[i].points;
  }

  return score;
};

//score output
var winner;
var winImage = '<img src="https://c.tenor.com/YjPBups7H48AAAAC/6m-rain.gif"/>';
var loseImage =
  '<img src = "https://c.tenor.com/zyxnzLdTzqoAAAAC/sobbing-baby.gif"/>';
var brokeImage =
  '<img src = "https://c.tenor.com/YvOjHMyFlH0AAAAC/empty-box.gif/">';
var drawImage =
  '<img src = "https://c.tenor.com/MkyiUsAp8t8AAAAd/tom-and-jerry-tom-the-cat.gif/">';
var calcScore = function (playerScore, dealerScore) {
  winner = "";
  if (playerScore == 21 || dealerScore == 21) {
    //scoreOutput = `BLACKJACK!`;
    gameMode = "setup";
    if (playerScore == 21) {
      winner = player;
      //scoreOutput = `BLACKJACK!` + scoreOutput;
    } else {
      winner = dealer;
      //scoreOutput = `BLACKJACK!` + scoreOutput;
    }
    scoreOutput = `BLACKJACK! <br> ${winner.name} wins! Click submit to go again.`;
  } else if (playerScore > 21 || dealerScore > 21) {
    //scoreOutput = `Bust!`;
    gameMode = "setup";
    if (playerScore > 21) {
      winner = dealer;
    } else {
      winner = player;
    }
    scoreOutput = `BUST! <br> ${winner.name} wins! Click submit to go again.`;
  } else if (turn == "player") {
    scoreOutput = `Enter "hit" or "stand"`;
  } else if (turn == "dealer") {
    gameMode = "setup";
    if (playerScore == dealerScore) {
      winner = "draw";
      scoreOutput = `Draw!<br> Click submit to go again.`;
    } else if (playerScore < dealerScore) {
      winner = dealer;
      scoreOutput = ` ${winner.name} wins! Click submit to go again.`;
    } else if (dealerScore < playerScore) {
      winner = player;
      scoreOutput = ` ${winner.name} wins! Click submit to go again.`;
    }
  }
  allocateWinnings(winner);

  if (winner == player) {
    scoreOutput = scoreOutput + winImage;
  } else if (winner == dealer) {
    scoreOutput = scoreOutput + loseImage;
  } else if (winner == "draw") {
    scoreOutput = scoreOutput + drawImage;
  }
  return scoreOutput;
};

//print cards in hand
var cardsHeld = function (hand) {
  cardsInHand = hand[0].name;
  for (let i = 1; i < hand.length; i += 1) {
    cardsInHand = cardsInHand + ` & ${hand[i].name}`;
  }
  return cardsInHand;
};

//reset hand
var reset = function (player) {
  player.hand = [];
  player.score = 0;
  player.cardsInHand = 0;
  player.betAmount;
};

// allocateWinnings
var allocateWinnings = function (winner) {
  if (winner.name == player.name) {
    player.totalAmount = player.totalAmount + player.betAmount;
  } else if (winner.name == dealer.name) {
    player.totalAmount = player.totalAmount - player.betAmount;
  }
};

var main = function (input) {
  //welcome msg: Welcome, player - please enter your name.
  if (shuffledDeck.length == 0) {
    gameMode = "end";
    myOutputValue = `Out of cards! ${player.name}, you walk away with $${player.totalAmount}.  Refresh to play again`;
    return myOutputValue;
  }
  // initialise player info
  if (gameMode == "setup") {
    if (player.name != "") {
      if (player.totalAmount == 0) {
        myOutputValue =
          `Sorry ${player.name}, you have $${player.totalAmount} left. <br> <br> GAME OVER! Refresh to play again.` +
          brokeImage;
      } else {
        reset(player);
        reset(dealer);
        turn = "player";
        gameMode = "bet";
        //console.log(player.totalAmount);
        myOutputValue = `Welcome ${player.name}, you have $${player.totalAmount} to play. Please enter the amount you would like to bet.`;
      }
    } else if (input == "" && player.name == "") {
      myOutputValue = `Welcome, player. Please enter your name`;
    } else {
      player.name = input;
      myOutputValue = `Welcome ${player.name}, you have $${player.totalAmount} to play. Please enter the amount you would like to bet.`;
      gameMode = "bet";
    }
    return myOutputValue;
  }
  //record bet amount -reject string
  if (gameMode == "bet") {
    player.betAmount = Number(input);
    if (input <= player.totalAmount && input != 0) {
      myOutputValue = `Hi ${player.name}, you are placing a bet of $${player.betAmount}. Please enter "deal" to start playing or "bet" to reset your bet.`;
      gameMode = "play";
    }
    //make sure player has enough to bet
    else if (input > player.totalAmount) {
      myOutputValue = `Hi ${player.name}, your bet of $${player.betAmount} is greater than your available amount of $${player.totalAmount}. Please enter the amount you would like to bet.`;
    } else {
      myOutputValue = `Welcome ${player.name}, you have $${player.totalAmount} to play. Please enter the amount you would like to bet.`;
    }
    return myOutputValue;
  }

  if (gameMode == "play") {
    // allow player to reset bet
    if (input == "bet") {
      gameMode = "bet";
      myOutputValue = `Welcome ${player.name}, you have $${player.totalAmount} to play. Please enter the amount you would like to bet.`;
    } else if (input == "" && player.score == 0) {
      myOutputValue = `Hi ${player.name}, you are placing a bet of $${player.betAmount}. Please enter "deal" to start playing or "bet" to reset your bet.`;
    } else if (input == "deal") {
      // assign cards to player
      dealCards(player, input);
      player.cardsInHand = cardsHeld(player.hand);
      player.score = points(player.hand);
      // assign cards to dealer
      dealCards(dealer, input);
      dealer.cardsInHand = cardsHeld(dealer.hand);
      dealer.score = points(dealer.hand);

      calcScore(player.score, dealer.score);

      myOutputValue = `${player.name} drew ${player.cardsInHand} for a total of ${player.score} <br> Dealer drew ${dealer.cardsInHand} for a total of ${dealer.score}  <br> ${scoreOutput} `;
    } else if (input == "hit" && turn == "player") {
      dealCards(player, input);
      player.cardsInHand = cardsHeld(player.hand);
      player.score = points(player.hand);
      calcScore(player.score, dealer.score);
      myOutputValue = `${player.name} drew ${player.cardsInHand} for a total of ${player.score} <br> Dealer drew ${dealer.cardsInHand} for a total of ${dealer.score} <br>  ${scoreOutput}`;
    } else if (input == "stand" && turn == "player") {
      turn = "dealer";
      while (dealer.score < 17) {
        dealCards(dealer, "hit");
        dealer.cardsInHand = cardsHeld(dealer.hand);
        dealer.score = points(dealer.hand);
      }
      calcScore(player.score, dealer.score);
      myOutputValue = `${player.name} drew ${player.cardsInHand} for a total of ${player.score} <br> Dealer drew ${dealer.cardsInHand} for a total of ${dealer.score} <br>  ${scoreOutput}`;
      // reset
      gameMode = "setup";
    }
    //allocateWinnings(winner);

    return myOutputValue;
  }
};
