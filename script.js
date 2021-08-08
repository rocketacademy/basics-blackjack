// ===== Global Variables =======//
var gameMode = "init";
var player_cards = [];
var computer_cards = [];
var myOutputValue = "";

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

// // // ===== Computer Hit or Stand ====== //
// var COM_HIT_OR_STAND = function (computer_cards) {
//   if (computer_cards.value < 21 && computer_cards.length != 5) {
//     computer_cards.push(shuffledDeck.pop());
//   } else if (computer_cards.value == 21 && computer_cards.length <= 5) {
//     var finalScore = 0;
//     var index = 0;
//     while (index < computer_cards.length) {
//       finalScore = finalScore + computer_cards[index].value;
//       index = index + 1;
//     }
//     return finalScore;
//   }
// };

// ===== Checking winning conditions ====== //
var winning_check = function (final_playerScore, computer_finalScore) {
  if (
    (final_playerScore > computer_finalScore && final_playerScore < 21) ||
    computer_finalScore > 21
  ) {
    myOutputValue =
      "Your score is " +
      final_playerScore +
      " Computer's score is " +
      computer_finalScore +
      " <br><br> You have won!";
  } else if (
    (computer_finalScore > final_playerScore && computer_finalScore < 21) ||
    final_playerScore > 21
  ) {
    myOutputValue =
      "Your score is " +
      final_playerScore +
      " Computer's score is " +
      computer_finalScore +
      " <br><br> You have lost..";
  } else if (
    (computer_finalScore > 21 && final_playerScore > 21) ||
    computer_finalScore == final_playerScore
  ) {
    myOutputValue =
      "Your score is " +
      final_playerScore +
      " Computer's score is " +
      computer_finalScore +
      " <br><br> It's a draw! ";
  }
  return myOutputValue;
};

var main = function (input) {
  // Initialize the start of the game
  var shuffledDeck = shuffleCards(makeDeck());
  if (gameMode == "init") {
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
      " Hello Player. These are your cards: " +
      drawn_playerCard +
      " <br><br> Would you like to hit or stand?";
    gameMode = "player_hit and stand";
  }

  if (computer_cards.value < 21 && computer_cards.length != 5) {
    computer_cards.push(shuffledDeck.pop());
  } else if (computer_cards.value == 21 && computer_cards.length <= 5) {
    var computer_finalScore = 0;
    var index = 0;
    while (index < computer_cards.length) {
      computer_finalScore = computer_finalScore + computer_cards[index].value;
      index = index + 1;
      console.log(computer_finalScore);
    }
  }

  if (gameMode == "player_hit and stand") {
    if (input.toLowerCase() == "hit" && player_cards.length != 5) {
      var new_card = shuffledDeck.pop();
      player_cards.push(new_card);
      myOutputValue =
        " You have drawn " + new_card.name + " of " + new_card.suit;
    } else if (input.toLowerCase() == "stand" || player_cards.length == 5) {
      var counter = 0;
      // Loop over the player cards array to check the total score of the cards
      var final_playerScore = 0;
      while (counter < player_cards.length) {
        final_playerScore = final_playerScore + player_cards[counter].value;
        counter = counter + 1;
        console.log(final_playerScore);
        gameMode = "score check";
      }
    }
  }
  if (gameMode == "score check") {
    myOutputValue = winning_check(final_playerScore, computer_finalScore);
  }
  return myOutputValue;
};

// } // For the computer to get the closest number to 21
//       if (gameMode == "computer_hit and stand") {
//         var computer_finalScore = COM_HIT_OR_STAND(computer_cards);
//         console.log(computer_finalScore);
//         gameMode = "score check";
//       }
