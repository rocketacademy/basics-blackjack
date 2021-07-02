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
var playerHandTotal = "";
var computerHandTotal = "";

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

var givePlayerOutputValue = function () {
  return (DefaultOutputValue =
    "PLAYER: " +
    playerHand[0].name +
    " of " +
    playerHand[0].suit +
    " and " +
    playerHand[1].name +
    " of " +
    playerHand[1].suit +
    ".");
  // "<br><br>COMPUTER: " +
  // computerHand[0].name +
  // " of " +
  // computerHand[0].suit +
  // "<br>"
};

var giveComputerOutputValue = function () {
  return (DefaultOutputValue =
    "<br><br>COMPUTER: " +
    computerHand[0].name +
    " of " +
    computerHand[0].suit +
    ".");
};

var giveThirdIteminOutputValue = function () {
  return (ThirdItemOutputValue =
    "<br><br> Your 3rd card is " +
    playerHand[2].name +
    " of " +
    playerHand[2].suit +
    ".");
};

var main = function (input) {
  if (playerHand.length == 0) {
    // drawing first and second card for player and computer
    dealCard(playerHand);
    dealCard(computerHand);
    dealCard(playerHand);
    dealCard(computerHand);

    playerHandTotal = SumUpCards(playerHand);
    computerHandTotal = SumUpCards(computerHand);

    console.log("player card sum: " + playerHandTotal);

    return (
      givePlayerOutputValue() +
      giveComputerOutputValue() +
      "<br><br> Your total value is " +
      playerHandTotal +
      ". Submit 'hit' or 'stand'."
    );
  }

  // checking for blackjack
  if (playerHand.length == 2 && playerHandTotal == 21) {
    console.log("player card sum: " + playerHandTotal);
    return (
      givePlayerOutputValue() +
      giveComputerOutputValue() +
      "Your total value is " +
      playerHandTotal +
      ". Player wins blackjack! Refresh the page to play again."
    );
  } else if (playerHand.length == 2 && computerHandTotal == 21) {
    console.log("computer card sum: " + computerHandTotal);
    return (
      givePlayerOutputValue() +
      giveComputerOutputValue() +
      "Your total value is " +
      computerHandTotal +
      ". Computer wins blackjack! Refresh the page to play again."
    );
  }
  // player chooses to hit or stand
  if (input == "hit") {
    dealCard(playerHand);
    // var playerCardsSum = SumUpCards(playerHand);
    // playerHandTotal = 22;
    playerHandTotal = playerHandTotal + SumUpCardsSecondRound(playerHand);
    console.log("NEW player card sum: " + playerHandTotal);

    return (
      givePlayerOutputValue() +
      "<br><br>You hit!" +
      giveThirdIteminOutputValue() +
      // playerHand[2].name +
      // " of " +
      // playerHand[2].suit +
      " Your new total value is " +
      playerHandTotal +
      giveComputerOutputValue() +
      "<br><br>Submit 'done' to end your turn."
    );
  } else if (input == "stand") {
    return (
      givePlayerOutputValue() +
      "<br><br>You chose to stand! Submit 'done' to end your turn"
    );
  }

  // when player enters 'done' to see if they bust or not
  if (playerHandTotal > 21 && input == "done") {
    console.log("DONE player card sum: " + playerHandTotal);
    return (
      // "<br><br> You hit! Your 3rd card is " +
      // playerHand[2].name +
      // " of " +
      // playerHand[2].suit +
      "<br>You bust! Your total is above 21."
    );
  } else if (playerHandTotal < 21 && input == "done") {
    return (
      "Your current total value is " +
      playerHandTotal +
      "<br><br>You're done! Click 'submit' to continue with the dealer's turn."
    );
  }

  // dealer flips open face down card -> if below 17 -> must hit
  // dealer flips open face down card -> if above 17 -> must stand
  if (computerHand.length == 2 && computerHandTotal < 17) {
    dealCard(computerHand);
    computerHandTotal = computerHandTotal + SumUpCardsSecondRound(computerHand);
    console.log("NEW computer card sum: " + computerHandTotal);
    return (
      "Your current total value is " +
      playerHandTotal +
      ".<br>" +
      giveComputerOutputValue() +
      " Computer's second card is " +
      computerHand[1].name +
      " of " +
      computerHand[1].suit +
      ".<br><br>Computer hit! Their 3rd card is " +
      computerHand[2].name +
      " of " +
      computerHand[2].suit +
      ".<br><br>Computer's current total value is " +
      computerHandTotal
    );
  } else if (computerHand.length == 2 && computerHandTotal > 17) {
    return (
      "Your current total value is " +
      playerHandTotal +
      ".<br><br>" +
      giveComputerOutputValue() +
      " " +
      computerHand[1].name +
      " of " +
      computerHand[1].suit +
      ".<br><br> Computer chose to stand!"
    );
  }

  // if computer busts
  if (computerHandTotal > 21) {
    return (
      "Your current total value is " +
      playerHandTotal +
      ".<br><br> Computer's current total value is " +
      computerHandTotal +
      ".<br><br> Computer bust. You win!"
    );
  }

  // evaluating winning condition
  if (playerHandTotal > computerHandTotal) {
    // If the player's card beats the computer's card, the player wins.
    return (
      "Your current total value is " +
      playerHandTotal +
      ".<br><br>Computer's current total value is " +
      computerHandTotal +
      ". <br><br>You win!"
    );
  }
  // If the computer's card beats the player's card, the computer wins.
  else if (computerHandTotal > playerHandTotal) {
    return (
      "Your current total value is " +
      playerHandTotal +
      ".<br><br> Computer's current total value is " +
      computerHandTotal +
      ".<br><br>You lose!"
    );
  }
  return myOutputValue;
};
