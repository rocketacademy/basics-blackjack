//==== Pseudo code====
// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

//GLOBAL VARIABLES
var cardDeck = [];
var playerHands = [];
var computerHands = [];
var playerPoints = 0;
var computerPoints = 0;
var scoreBoard = [];
var hitCount = 0; //number of times the player key in hit
var myOutputValue = "";
var NUM_OF_PLAYERS = 1;
var GAME_START = `game start`;
var GAME_DRAW_CARDS = `draw cards`;
var GAME_SHOW_RESULTS = `show who's the winner`;
var currentGameMode = GAME_START;
var playCount = 0;
var blackjackPlayerCount = 0;
var normalWinCount = 20;
var loseCount = 10;

//==================Helper functions=====================

var makeDeck = function () {
  // Initialise an empty deck array

  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts♥", "diamonds♦", "clubs♣", "spades♠"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
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

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Make and Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(makeDeck());
console.log(shuffledDeck);

var printCards = function (cards) {
  var returnString = "";
  // Iterate until cards.length - 1 so we can avoid the extra comma at the end of return string
  for (var i = 0; i < cards.length - 1; i += 1) {
    var currCard = cards[i];
    returnString += `Card ${i + 1} - ${currCard.name} of ${currCard.suit}<br>`;
  }
  var lastCard = cards[cards.length - 1];
  returnString += `Card ${cards.length} - ${lastCard.name} of ${lastCard.suit}`;
  return returnString;
};

var checkForBlackJack = function (cardsOnHands) {
  var isBlackJack = false;
  var firstCard = cardsOnHands[0];
  var secondCard = cardsOnHands[1];
  if (
    (firstCard.name == "ace" && secondCard.rank >= 10) ||
    (firstCard.rank >= 10 && secondCard.name == "ace")
  ) {
    isBlackJack = true;
  } else isBlackJack;
  return isBlackJack;
};

var checkForAce = function (cardsOnHands) {
  var numberOfAceInHands = 0;
  for (var ace = 0; ace < cardsOnHands.length; ace += 1) {
    var currCard = cardsOnHands[ace];
    if (currCard.rank == 1) {
      numberOfAceInHands += 1;
    }
  }
  return numberOfAceInHands;
};

var calculatePoints = function (cardsOnHands) {
  // Compare computer hands and player hands by rank attribute
  // 10,J,Q,K = 10 points
  // Others = face value
  // A = 11 points or -10 point if the total value exceed 21
  var points = 0;
  for (var p = 0; p < cardsOnHands.length; p += 1) {
    var curCard = cardsOnHands[p];
    if (curCard.rank >= 10) {
      points += 10;
    } else if (curCard.rank == 1) {
      points += 11;
    } else points += Number(curCard.rank);
  }
  if (points > 21 && checkForAce(cardsOnHands) > 0) {
    points = points - 10;
  }
  return points;
};

var comparePoints = function (scoreBoard) {
  var compPoints = Number(scoreBoard[0]);
  var playerPoints = Number(scoreBoard[1]);
  var message = ``;

  if (compPoints == playerPoints) {
    message = `It's a tie.`;
  } else if (
    (compPoints > 21 && playerPoints <= 21) ||
    (compPoints <= 21 && playerPoints > compPoints)
  ) {
    message = `You win!`;
    normalWinCount += 1;
  } else if (compPoints > playerPoints) {
    message = `You lose!`;
    loseCount += 1;
  }

  return message;
};

var resetGame = function () {
  currentGameMode = GAME_START;
  cardDeck = [];
  shuffledDeck = shuffleCards(makeDeck());
  playerHands = [];
  computerHands = [];
  playerPoints = 0;
  computerPoints = 0;
  scoreBoard = [];
  hitCount = 0;
  console.log(
    currentGameMode,
    "is dealer hands empty?",
    computerHands,
    `is player hands empty?`,
    playerHands
  );
};

var main = function (input) {
  if (currentGameMode == GAME_START) {
    // game has started, change mode to draw cards
    currentGameMode = GAME_DRAW_CARDS;
    playCount += 1;
    // check to ensure that at the start of game, the shuffled deck has 52 cards.
    console.log(shuffledDeck.length);
    // Draw 2 cards from the top of the deck to both player and dealer
    for (counter = 0; counter < 2; counter += 1) {
      playerHands.push(shuffledDeck.pop());
      computerHands.push(shuffledDeck.pop());
    }
    console.log("computerHands", computerHands);
    console.log("playerHands", playerHands);

    // if both player and dealer gets blackjack, show both wins and add 1 to bj count
    if (
      checkForBlackJack(playerHands) == true &&
      checkForBlackJack(computerHands) == true
    ) {
      blackjackPlayerCount += 1;
      myOutputValue = `<b>Dealer hands:</b><br>${printCards(
        computerHands
      )}<br><br><b>Your hands:</b><br>${printCards(
        playerHands
      )}<br><br> Blackjack - it's a tie! Hit submit to play again<br><br><br><b>Your Scoreboard:</b><br>Total plays: ${playCount}<br>Blackjack wins: ${blackjackPlayerCount}<br>Normal wins: ${normalWinCount}`;
      //reset the cards on both dealer and player hands and points
      resetGame();
    } else if (checkForBlackJack(playerHands) == true) {
      // if only player has blackjack, tell player that he has already won and reset the game
      blackjackPlayerCount += 1;
      myOutputValue = `<b>Dealer hands:</b><br>${printCards(
        computerHands
      )}<br><br><b>Your hands:</b><br>${printCards(
        playerHands
      )}<br><br> Blackjack - you win! Hit submit to play again<br><br><br><b>Your Scoreboard:</b><br>Total plays: ${playCount}<br>Blackjack wins: ${blackjackPlayerCount}<br>Normal wins: ${normalWinCount}`;
      //reset the cards on both dealer and player hands and points
      resetGame();
    } else
      myOutputValue = `<b>Dealer hands:</b><br>Card 1 - ${
        computerHands[0].name
      } of ${
        computerHands[0].suit
      }<br>Card 2 - ❓ Covered card ❓ <br><br><b>Your hands:</b><br>${printCards(
        playerHands
      )}.<br><br>Now, key in "hit" to deal one more card or "stand" to see the winner and click submit`;
  }

  if (input == "hit") {
    hitCount += 1;
    // if player key in hit, draw one more card for player.
    playerHands.push(shuffledDeck.pop());
    console.log("playerHands after hit", playerHands);
    console.log(`number of cards in deck now`, shuffledDeck.length);
    // calculate the points for player and computer
    playerPoints = calculatePoints(playerHands);
    computerPoints = calculatePoints(computerHands);
    console.log(computerPoints, playerPoints, "scoreboard", scoreBoard);
    if (playerPoints > 21) {
      loseCount += 1;
      myOutputValue = `<b>Dealer hands:</b><br>${printCards(
        computerHands
      )}<br><br><b>Your hands:</b><br>${printCards(
        playerHands
      )}<br><br> Busted! Click submit to play again.`;
      //reset the cards on both dealer and player hands and points
      resetGame();
    } else
      myOutputValue = `<b>Dealer hands:</b><br>Card 1 - ${
        computerHands[0].name
      } of ${
        computerHands[0].suit
      }<br>Card 2 - ❓ Covered card ❓ <br><br><b>Your hands:</b><br>${printCards(
        playerHands
      )}.<br><br>Now, key in "hit" to deal one more card or "stand" to see the winner and click submit`;
  }

  if (input == "stand") {
    //change game mode to show results
    currentGameMode = GAME_SHOW_RESULTS;
    // dealer has to draw cards until his total point is more than or equal to 17
    while (calculatePoints(computerHands) < 17) {
      computerHands.push(shuffledDeck.pop());
      console.log(`computerhands`, computerHands);
      console.log(`number of cards in deck now`, shuffledDeck.length);
    }
    // if player do not wish to draw cards, the highest number wins game.
    computerPoints = calculatePoints(computerHands);
    playerPoints = calculatePoints(playerHands);
    scoreBoard.push(computerPoints, playerPoints);
    console.log(computerPoints, playerPoints, "scoreboard", scoreBoard);
    myOutputValue =
      `<b>Dealer hands:</b><br>${printCards(
        computerHands
      )}<br><br><b>Your hands:</b><br>${printCards(playerHands)}<br><br> ` +
      comparePoints(scoreBoard) +
      ` Hit submit to play again<br><br><br><b>Your Scoreboard:</b><br>Total plays: ${playCount}<br>Blackjack wins: ${blackjackPlayerCount}<br>Normal wins: ${normalWinCount}`;
    //reset the cards on both dealer and player hands and points
    resetGame();
  }

  // Return the fully-constructed output string
  return myOutputValue;
};
