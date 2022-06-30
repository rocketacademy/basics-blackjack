// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

var gameMode = "deal cards";
var computerCard = [];
var playerCard = [];
var computerScore = 0;
var playerScore = 0;
var lostImage =
  '<img src="https://c.tenor.com/XpZ1nVvr6DsAAAAC/diary-of-a-wimpy-kid-loser.gif"/>';
var winImage = '<img src="https://c.tenor.com/2w1XsfvQD5kAAAAC/hhgf.gif"/>';
var tieImage =
  '<img src="https://c.tenor.com/wyfhYqF1tJIAAAAC/mark-wahlberg-wahlberg.gif"/>';

/**
 * Create a standard 52-card deck
 */
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to deal all cards for a given suit
    // The rankCounter starts from 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;

    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardWeight = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name, set cardWeight to 1, 11 or 10
      if (cardName == 1) {
        cardName = "🅰️";
        cardWeight = 1;
      } else if (cardName == 2) {
        cardName = "2️⃣";
      } else if (cardName == 3) {
        cardName = "3️⃣";
      } else if (cardName == 4) {
        cardName = "4️⃣";
      } else if (cardName == 5) {
        cardName = "5️⃣";
      } else if (cardName == 6) {
        cardName = "6️⃣";
      } else if (cardName == 7) {
        cardName = "7️⃣";
      } else if (cardName == 8) {
        cardName = "8️⃣";
      } else if (cardName == 9) {
        cardName = "9️⃣";
      } else if (cardName == 10) {
        cardName = "🔟";
      } else if (cardName == 11) {
        cardName = "Jack";
        cardWeight = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardWeight = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardWeight = 10;
      }

      // Create a new card with the current name, suit, rank, and weight
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        weight: cardWeight,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  console.log("card deck:", cardDeck);
  return cardDeck;
};

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  // test
  return cardDeck;
};

// Initialise the card deck representation as an array of objects
var deck = [];

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var newDeck = makeDeck();
var shuffledDeck = shuffleCards(newDeck);

var drawCard = function (shuffledDeck) {
  var cardDrawn = shuffledDeck.pop();
  return cardDrawn;
};

var calculateScore = function (hand) {
  var cardCounter = 0;
  var score = 0;
  var noOfAces = countAce(hand);
  while (cardCounter < hand.length) {
    score = score + hand[cardCounter].weight;
    cardCounter = cardCounter + 1;
  }
  if (noOfAces > 0 && score < 12) {
    score = score + 10;
  }
  console.log("score: ", score);
  return score;
};

var countAce = function (hand) {
  var aceCounter = 0;
  var cardCounter = 0;
  while (cardCounter < hand.length) {
    if (hand[cardCounter].name == "ace") {
      aceCounter = aceCounter + 1;
      cardCounter = cardCounter + 1;
    } else cardCounter = cardCounter + 1;
  }
  console.log("Ace counter: ", aceCounter);
  return aceCounter;
};

var returnAllCards = function (hand) {
  var cardCounter = 0;
  var displayCards = "";

  while (cardCounter < hand.length) {
    displayCards =
      displayCards +
      "<br>" +
      hand[cardCounter].name +
      " of " +
      hand[cardCounter].suit;
    cardCounter = cardCounter + 1;
  }
  console.log("display cards: ", displayCards);
  return displayCards;
};

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == "deal cards") {
    computerCard = [drawCard(shuffledDeck), drawCard(shuffledDeck)];

    console.log("Computer cards: ", computerCard);

    computerScore = calculateScore(computerCard);
    playerCard = [drawCard(shuffledDeck), drawCard(shuffledDeck)];

    playerScore = calculateScore(playerCard);
    myOutputValue = `Your cards are:<br> ${returnAllCards(playerCard)}
    <br><br>Your hand is ${playerScore}. <br><br>Please enter "hit" to draw a card or "stand" to pass. If your hand is less than 17, you must draw a card`;

    while (computerScore < 17) {
      var newCard = drawCard(shuffledDeck);
      computerCard.push(newCard);
      computerScore = calculateScore(computerCard);
    }

    gameMode = "player hit or stand";
  } else if (gameMode == "player hit or stand") {
    // computer
    //  weight more than 17, stand
    // weight less than 17, draw cards until more than 17

    console.log("player cards: ", playerCard);
    console.log("player Score: ", playerScore);
    //player
    if (playerScore == 21) {
      if (computerScore == 21) {
        myOutputValue = `${tieImage}<br>Your cards are:<br> ${returnAllCards(
          playerCard
        )}
    <br><br>Your hand is ${playerScore}. The computer's hand is ${computerScore}. It's a draw.<br><br> Refresh to play again!`;
      } else {
        myOutputValue = `${winImage}<br><br>Your cards are:<br> ${returnAllCards(
          playerCard
        )}
    <br><br>Your hand is ${playerScore}. The computer's hand is ${computerScore}. You won! <br><br> Refresh to play again!`;
      }
    }

    if (input == "hit") {
      var newCard = drawCard(shuffledDeck);
      playerCard.push(newCard);
      playerScore = calculateScore(playerCard);
      myOutputValue = `Your cards are:<br> ${returnAllCards(playerCard)}
    <br><br>Your hand is ${playerScore}. Please enter "hit" to draw a card or "stand" to pass.`;
    }
    console.log("hit player cards: ", playerCard);
    console.log("hit player Score: ", playerScore);

    if (playerScore > 21) {
      if (computerScore > 21) {
        myOutputValue = `${tieImage}<br>Your cards are:<br> ${returnAllCards(
          playerCard
        )}
    <br><br>Your hand is ${playerScore}. The computer's hand is ${computerScore}. It's a tie.<br><br> Refresh to play again!`;
      } else {
        myOutputValue = `${lostImage}<br><br>Your cards are:<br> ${returnAllCards(
          playerCard
        )}
    <br><br>Your hand is ${playerScore}. The computer's hand is ${computerScore}. You lose, loser!<br><br> Refresh to play again!`;
      }
    }

    if (playerScore < 17) {
      myOutputValue = `Your cards are:<br> ${returnAllCards(playerCard)}
    <br><br>Your hand is ${playerScore}. Your hand is less than 17, please enter "hit" to draw a card.`;
    }

    if (playerScore == 21) {
      if (computerScore == 21) {
        myOutputValue = `${tieImage}Your cards are:<br> ${returnAllCards(
          playerCard
        )}
    <br><br>Your hand is ${playerScore}. The computer's hand is ${computerScore}. It's a tie.<br><br> Refresh to play again!`;
      } else {
        myOutputValue = `${winImage}<br><br>Your cards are:<br> ${returnAllCards(
          playerCard
        )}
    <br><br>Your hand is ${playerScore}. The computer's hand is ${computerScore}. You won! <br><br> Refresh to play again!`;
      }
    }

    if (input == "stand") {
      if (playerScore > computerScore) {
        myOutputValue = `${winImage}<br><br>You won. Your cards are:<br> ${returnAllCards(
          playerCard
        )}
    <br><br>Your hand is ${playerScore}. The computer's hand is ${computerScore}.<br><br> Refresh to play again!`;
      }
      if (playerScore < computerScore && computerScore > 21) {
        myOutputValue = `${winImage}<br><br>You won. Your cards are:<br> ${returnAllCards(
          playerCard
        )}
    <br><br>Your hand is ${playerScore}. The computer's hand is ${computerScore}.<br><br> Refresh to play again!`;
      }
      if (playerScore < computerScore && computerScore < 22) {
        myOutputValue = `${lostImage}<br><br>You lost. Your cards are:<br> ${returnAllCards(
          playerCard
        )}
    <br><br>Your hand is ${playerScore}. The computer's hand is ${computerScore}.<br><br> Refresh to play again!`;
      }
    }
  }

  return myOutputValue;
};
