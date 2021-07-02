// GAME PLAY
// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

// RULES
// There will be only two players. One human and one computer.
// The computer will always be the dealer. The dealer has to hit if their hand is below 17.
// deal 1 card each to user and dealer
// deal 2nd card each to user (face up) and dealer (face down)
// jack, queen, king = 10
// ace = 1 or 11, user can choose
// user hand higher than dealer but less than 21 -> win
// user hand is 21 -> win
// when user wants another card from top of deck -> user will submit 'hit'
// if user doesnt want more cards -> user will submit 'stand'
// dealer flips open face down card -> if below 17 -> must hit
// dealer flips open face down card -> if above 17 -> must stand
// if dealer bust -> player wins
// if user more than dealer -> win
// if user less than dealer -> lose
// user hand higher than 21 -> bust

// The player who is closer to 21 wins the hand. Aces can be 1 or 11.

var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];

  var suits = ["hearts", "diamonds", "clubs", "spades"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the card to the deck
      deck.push(card);

      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return deck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);

    var currentItem = cards[index];

    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;

    index = index + 1;
  }

  return cards;
};

var deck = shuffleCards(makeDeck());

var playerHand = [];
var computerHand = [];
var gameMode = "waiting to draw";

// helper function to draw card and push into array
var dealCard = function (hand) {
  var drawCardFromDeck = deck.pop();
  var pushIntoCardArray = hand.push(drawCardFromDeck);
  return pushIntoCardArray;
};

// helper function to sum both cards
// if jack, queen, king is drawn -> reassign rank to 10

var SumUpCards = function (hand) {
  var cardInHand1 = hand[0];
  var cardInHand2 = hand[1];
  if (
    cardInHand1.rank == 11 ||
    cardInHand1.rank == 12 ||
    cardInHand1.rank == 13
  ) {
    cardInHand1.rank = 10;
  }
  if (
    cardInHand2.rank == 11 ||
    cardInHand2.rank == 12 ||
    cardInHand2.rank == 13
  ) {
    cardInHand2.rank = 10;
  }
  var sumValue = cardInHand1.rank + cardInHand2.rank;
  return sumValue;
};

var SumUpCardsSecondRound = function (hand) {
  var cardInHand3 = hand[2];
  if (
    cardInHand3.rank == 11 ||
    cardInHand3.rank == 12 ||
    cardInHand3.rank == 13
  ) {
    cardInHand3.rank = 10;
  }
  var newValue = cardInHand3.rank;
  return newValue;
};

// var hitOrStandMode = function (userChoice, hand) {
//   if (userChoice == "hit") {
//     gameMode = "hit mode";
//     console.log("game mode" + gameMode);

//     dealCard(hand);
//     var CardsSum = SumUpCards(hand);
//     var CardsNewSum = CardsSum + SumUpCardsSecondRound(hand);
//     // playerCardsNewSum = 22;
//     console.log("NEW player card sum: " + CardsNewSum);

//     message =
//       "PLAYER: " +
//       hand[0].name +
//       " of " +
//       hand[0].suit +
//       " and " +
//       hand[1].name +
//       " of " +
//       hand[1].suit +
//       ". Your total value is " +
//       playerCardsSum +
//       "<br>COMPUTER: " +
//       computerHand[0].name +
//       " of " +
//       computerHand[0].suit +
//       "<br>";
//     +"<br><br> You hit! Your 3rd card is " +
//       hand[2].name +
//       " of " +
//       hand[2].suit +
//       ". Your new total value is " +
//       CardsNewSum;

//     if (userChoice == "done" && CardsNewSum > 21) {
//       console.log("DONE player card sum: " + CardsNewSum);

//       myOutputValue =
//         "You bust! Your total of " + CardsNewSum + " is above 21.";
//     }
//   } else if (userChoice == "stand") {
//     gameMode = "stand mode";
//     myOutputValue = myOutputValue + "You chose to stand!";
//   }

//   // if (input == "done" && playerCardsNewSum > 21) {
//   //   myOutputValue =
//   //     "You bust! Your total of " + playerCardsNewSum + " is above 21.";
//   // }
//   return myOutputValue;
// };

var main = function (input) {
  if ((gameMode = "waiting to draw" && playerHand.length == 0)) {
    gameMode = "hit mode";
    console.log("game mode" + gameMode);
    // drawing first and second card for player and computer
    dealCard(playerHand);
    dealCard(computerHand);
    dealCard(playerHand);
    dealCard(computerHand);
  }

  // summing up cards in first round
  var playerCardsSum = SumUpCards(playerHand);
  console.log("player card sum: " + playerCardsSum);
  var computerCardsSum = SumUpCards(computerHand);
  console.log("comp card sum: " + computerCardsSum);

  // Initialise an output value with first cards drawn by each player.
  var myOutputValue =
    "PLAYER: " +
    playerHand[0].name +
    " of " +
    playerHand[0].suit +
    " and " +
    playerHand[1].name +
    " of " +
    playerHand[1].suit +
    ". Your total value is " +
    playerCardsSum +
    "<br>COMPUTER: " +
    computerHand[0].name +
    " of " +
    computerHand[0].suit +
    "<br>";

  // if (input == "hit") {
  //   console.log("game mode" + gameMode);
  //   myOutputValue = hitOrStandMode(input, playerHand);
  // } else if (input == "stand") {
  //   myOutputValue = hitOrStandMode(input, playerHand);
  // }

  // working code without refactoring
  // if player hits
  if (input == "hit") {
    dealCard(playerHand);
    var playerCardsSum = SumUpCards(playerHand);
    var playerCardsNewSum = playerCardsSum + SumUpCardsSecondRound(playerHand);
    // playerCardsNewSum = 22;
    console.log("NEW player card sum: " + playerCardsNewSum);

    myOutputValue =
      myOutputValue +
      "<br><br>You hit! Your 3rd card is " +
      playerHand[2].name +
      " of " +
      playerHand[2].suit +
      ". Your new total value is " +
      playerCardsNewSum;
  } else if (input == "stand") {
    gameMode = "stand mode";
    myOutputValue = myOutputValue + "You chose to stand!";
  }

  // if player busts
  if (playerCardsNewSum > 21) {
    console.log("DONE player card sum: " + playerCardsNewSum);
    myOutputValue =
      myOutputValue +
      // "<br><br> You hit! Your 3rd card is " +
      // playerHand[2].name +
      // " of " +
      // playerHand[2].suit +
      "<br><br>You bust! Your total is above 21.";
    return myOutputValue;
  }

  if (playerCardsSum > computerCardsSum) {
    // If the player's card beats the computer's card, the player wins.
    // Update output value to communicate player wins.
    myOutputValue = myOutputValue + "<br><br>PLAYER WINS!<br>";
  }
  // If the computer's card beats the player's card, the computer wins.
  else if (computerCardsSum > playerCardsSum) {
    // Update output value to communicate computer wins.
    myOutputValue = myOutputValue + "<br><br>COMPUTER WINS!<br>";
  }
  // If the player's and computer's cards match, it's War.
  // else {
  //   // Update output to communicate War.
  //   myOutputValue = myOutputValue + "It's WAR!<br>";
  //   // Create array to store cards used for War. The winner will receive all these cards.
  //   // add the 2 matching cards to the set of war cards.
  //   var warCards = [playerCard, computerCard];
  //   // Create boolean for while loop condition. When this boolean becomes false, end loop.
  //   var cardsEqual = true;
  return myOutputValue;
};
