// ===== Global Variables =======//
var gameMode = "enter username";
var player_username = "";
var player_cards = [];
var computer_cards = [];
var myOutputValue = "";
var computer_finalScore = 0;
var final_playerScore = 0;
var player_Moolah = 100;
var bettingAmount = 0;

// ===== Making a deck of cards =======//
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var valueCounter = rankCounter;
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        valueCounter = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        valueCounter = 10;
      } else if (cardName == 13) {
        cardName = "king";
        valueCounter = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: valueCounter,
      };

      cardDeck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// ===== Randomise the cards index ====== //
// Getting a random index
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// ===== Shuffling the deck of cards ====== //
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
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

// ===== Checking winning conditions ====== //
var winning_check = function (final_playerScore, computer_finalScore) {
  if (
    (final_playerScore > computer_finalScore && final_playerScore < 21) ||
    computer_finalScore > 21
  ) {
    myOutputValue =
      "Your score is " +
      final_playerScore +
      "<br><br> Computer's score is " +
      computer_finalScore +
      " <br><br> You have won!";
  } else if (
    (computer_finalScore > final_playerScore && computer_finalScore < 21) ||
    final_playerScore > 21
  ) {
    myOutputValue =
      "Your score is " +
      final_playerScore +
      " <br><br>Computer's score is " +
      computer_finalScore +
      " <br><br> You have lost..";
  } else if (
    (computer_finalScore > 21 && final_playerScore > 21) ||
    computer_finalScore == final_playerScore
  ) {
    myOutputValue =
      "Your score is " +
      final_playerScore +
      " <br><br>Computer's score is " +
      computer_finalScore +
      " <br><br> It's a draw! ";
  }
  return myOutputValue;
};

var main = function (input) {
  var shuffledDeck = shuffleCards(makeDeck());
  // Getting the username from the player
  if (gameMode == "enter username") {
    player_username = input;
    gameMode = "betting";
    console.log(gameMode);
  }

  if (gameMode == "betting") {
    myOutputValue =
      "Hello " +
      player_username +
      " You have " +
      player_Moolah +
      " points.<br><br> Please input the amount you would like to bet. ";
    gameMode = "Player Betting";
    return myOutputValue;
  }
  if ((gameMode = "Player Betting")) {
    if (isNaN(input) && input != "") {
      myOutputValue = " Please input a number.";
    } else {
      bettingAmount = input;
      myOutputValue =
        "You have bet " +
        bettingAmount +
        "<br><br> Please click on submit to start the game";
      player_Moolah = player_Moolah - bettingAmount;
      gameMode = "init";
    }
    // return myOutputValue;
  }

  // Initialize the start of the game

  if (gameMode == "init") {
    //Resets the card array and results when it starts again
    player_cards = [];
    computer_cards = [];
    final_playerScore = 0;
    computer_finalScore = 0;

    computer_cards = [shuffledDeck.pop(), shuffledDeck.pop()];
    console.log(computer_cards);
    player_cards = [shuffledDeck.pop(), shuffledDeck.pop()];
    console.log(player_cards);

    var drawn_playerCard =
      player_cards[0].name +
      " of " +
      player_cards[0].suit +
      " & " +
      player_cards[1].name +
      " of " +
      player_cards[1].suit;

    myOutputValue =
      " Hello " +
      player_username +
      ". These are your cards: " +
      drawn_playerCard +
      " <br><br> Would you like to hit or stand?";

    gameMode = "player_hit and stand";
  }

  if (gameMode == "player_hit and stand") {
    if (input.toLowerCase() == "hit" && player_cards.length != 5) {
      var new_card = shuffledDeck.pop();
      player_cards.push(new_card);
      myOutputValue =
        " You have drawn " +
        new_card.name +
        " of " +
        new_card.suit +
        "<br></br> Would you like to hit or stand ?";
    } else if (input.toLowerCase() == "stand" || player_cards.length == 5) {
      // To check the computer cards
      if (computer_finalScore < 16 && computer_cards.length != 5) {
        computer_cards.push(shuffledDeck.pop());
        console.log(computer_cards);
      } else if (input != "hit" || input != "stand") {
        myOutputValue = "Please input if you would like to 'Hit' or 'Stand' ";
      }
      var counter = 0;
      // Loop over the player cards array to check the total score of the cards
      while (counter < player_cards.length) {
        // Supposed to check for ace and then give it the value
        if (player_cards[counter].name == "ace") {
          if (player_cards.length < 3) {
            player_cards[counter].value = 10;
          } else if (player_cards.length > 3) {
            player_cards[counter].value = 1;
          }
        }
        final_playerScore = final_playerScore + player_cards[counter].value;
        counter = counter + 1;
        console.log(final_playerScore);
      }
      // Gets the total computer score
      var index = 0;
      while (index < computer_cards.length) {
        if (computer_cards[index].name == "ace") {
          if (computer_cards[index].length < 3) {
            value = 10;
          } else if (computer_cards[index].length > 3) {
            value = 1;
          }
        }
        computer_finalScore = computer_finalScore + computer_cards[index].value;
        index = index + 1;
        console.log(computer_finalScore);
      }
      gameMode = "score check";
    }
  }

  if (gameMode == "score check") {
    myOutputValue = winning_check(final_playerScore, computer_finalScore);
    gameMode = "init"; //
  }
  return myOutputValue;
};
