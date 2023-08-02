var currentGameMode = "Key in username";
var PLACE_BET = "Place bet";
var GAME_CARDS_DRAWN = "Starts with 2 cards";
var HIT_OR_STAND = "Hit or Stand";

var playerHand = [];
var computerHand = []; //or dealer hand

var computerHandValue = "";
var playerHandValue = "";

var restartGame = function () {
  currentGameMode = PLACE_BET;
  playerHand = [];
  computerHand = [];
  shuffledDeck = shuffleDeck(createCardDeck()); // Create a new deck with 52 cards and shuffle it.
};

// create username function

var userName = "";

var inputUsername = function (input) {
  if (input !== "") {
    userName = input;
    currentGameMode = PLACE_BET;
    return (
      "Hello " +
      userName +
      "! Welcome to Blackjack.<br><br>" +
      gameInstructions +
      "<br><br> Click submit to proceed to game."
    );
  }
  return "Hello! Key in username.";
};

var gameInstructions =
  "GAME INSTURCTION: <br>" +
  "<br> - Play Blackjack, get close to 21 without going over." +
  "<br> - Start with 2 cards, 'hit' for more, you can 'stand' with 16+." +
  "<br> - Dealer hits until 17+." +
  "<br> - Win if closer to 21." +
  "<br> - Repeat with a new bet.<br><br>" +
  "You are given 10 coins!" +
  "<br> Please input a number between 1 to 10 to bet.";

//Player Bet Function

// player is given 10 coins for a new game.
var isGameOver = false;
var playerCoins = Number(10);
var playerBet = "";

//CARDS
//create card deck with 52 poker cards

// Create Card Deck
var createCardDeck = function () {
  var deck = [];
  //Create outer loop for the suits
  var suitCounter = 0;
  var suits = ["Hearts ♥️", "Diamonds ♦️", "Clubs ♣️", "Spades ♠️"];

  while (suitCounter < suits.length) {
    var currentSuit = suits[suitCounter];
    console.log("current suit: ", currentSuit);

    //Create a rank loop.

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      // Set name to the following ranks: 1 (ace), 11 (jack), 12 (queen), 12 (king)
      if (cardName === 1) {
        cardName = "Ace";
      } else if (cardName === 11) {
        cardName = "Jack";
      } else if (cardName === 12) {
        cardName = "Queen";
      } else if (cardName === 13) {
        cardName = "King";
      }
      // Create card object. Name, Suit, Rank (value will be used for counting ("addition"))
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      console.log("rank: ", rankCounter);
      deck.push(card);
      rankCounter += 1;
    }
    suitCounter += 1;
  }
  return deck;
};

var deck = createCardDeck();

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements.
var shuffleDeck = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // This is the current card..
    var currentCard = cardDeck[currentIndex];
    // Switch positions of randomCard and currentCard in the deck (shuffling).
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  // Issue a new card deck.
  return cardDeck;
};

// Shuffle the deck and save it in a new variable shuffledDeck to communicate that we have shuffled the deck.
var shuffledDeck = shuffleDeck(deck);

// empty game deck at the start of each game
var gameDeck = "";

//Deal two cards to player and computer at the beginning of the game.
var dealTwoCards = function (hand) {
  hand.push(shuffledDeck.pop());
  hand.push(shuffledDeck.pop());
};

// player can see their cards,

// Display Player Hand
var displayPlayerHand = function (playerHand) {
  var displayPlayerHandMessage =
    userName +
    ", you bet " +
    playerBet +
    " coins." +
    "<br><br>" +
    "Your hand: <br>";
  var index = 0;
  while (index < playerHand.length) {
    displayPlayerHandMessage =
      displayPlayerHandMessage +
      "Card " +
      (index + 1) +
      ": " +
      playerHand[index].name +
      " of " +
      playerHand[index].suit +
      "<br>";

    index += 1;
  }
  return displayPlayerHandMessage;
};

// Round 1 : Display 1 card on Dealer Hand
var displayComputerHand = function (computerHand) {
  return (
    "Dealer's hand: <br>" +
    "Card 1: " +
    computerHand[0].name +
    " of " +
    computerHand[0].suit +
    "<br> Hidden Card."
  );
};

// Result Page: Display both player hands.
var displayPlayerAndComputerHands = function (playerHand, computerHand) {
  var displayComputerHandMessage = "<br> Dealer's hand: <br>";
  var index = 0;
  while (index < computerHand.length) {
    displayComputerHandMessage =
      displayComputerHandMessage +
      "Card " +
      (index + 1) +
      ": " +
      computerHand[index].name +
      " of " +
      computerHand[index].suit +
      "<br>";

    index += 1;
  }
  return (
    displayPlayerHand(playerHand) +
    displayComputerHandMessage +
    "<br><br>" +
    userName +
    ", the total value on your hand is " +
    playerHandValue +
    "." +
    "<br>The total value on Dealer's hand is " +
    computerHandValue +
    "."
  );
};

// display cards to player if there is no blackjack in Round 1
var displayMessageForCoverDealerCard = function (playerHand, computerHand) {
  playerHandValue = countCardTotalValue(playerHand);
  return (
    displayPlayerHand(playerHand) +
    "<br><br>" +
    displayComputerHand(computerHand) +
    "<br><br>" +
    "The total value in your hand is " +
    playerHandValue +
    "."
  );
};

//check player and computer hand for blackjack in round 1
var checkForBlackJack = function (hand) {
  var isBlackJack = false;
  //condition 1 = number of cards on hand = 2
  //condition 2 = total value of cards = 21
  if (hand.length === 2 && countCardTotalValue(hand) === 21) {
    isBlackJack = true;
  }
  return isBlackJack;
};

var countCardTotalValue = function (hand) {
  var cardTotalValue = 0;
  var numberOfAce = 0;

  var index = 0;

  // Calculate cardTotalValue assuming all Aces are value 1 first, and count how many Aces there are in the hand
  while (index < hand.length) {
    var currentCard = hand[index];

    // Ace Counter
    if (currentCard.rank === 1) {
      numberOfAce += 1;
    }

    // Set any ranking above 10 to 10. The biggest number that will be returned is 10.
    var adjustedRank = Math.min(currentCard.rank, 10);

    // Sum of card rank (with King, Queen, and Jack adjusted to 10)
    cardTotalValue = cardTotalValue + adjustedRank;

    index += 1; // Increment the index to move to the next card
  }

  // Adjust cardTotalValue for Aces.
  // Only 2 cards on hand. Where here should only be 1 ace is "11". Total card value is 21. If not, the remaining aces are counted as "1".
  while (numberOfAce === 1 && cardTotalValue + 10 === 21 && hand.length === 2) {
    cardTotalValue += 10;
    numberOfAce -= 1;
  }

  return cardTotalValue;
};

var compareBlackjack = function (playerHand, computerHand) {
  playerHandValue = countCardTotalValue(playerHand);
  computerHandValue = countCardTotalValue(computerHand);
  //Check for Blackjack, determine winner and restart game
  // It's a Tie
  if (checkForBlackJack(playerHand) && checkForBlackJack(computerHand)) {
    outputMessage = displayPlayerAndComputerHands(playerHand, computerHand);
    restartGame();
    currentGameMode = PLACE_BET;
    return (
      outputMessage +
      GAME_MESSAGE_TIE +
      "You now have " +
      playerCoins +
      " coins" +
      "<br><br>  Click submit to play again."
    );
  }
  //Player wins
  if (checkForBlackJack(playerHand) && !checkForBlackJack(computerHand)) {
    outputMessage = displayPlayerAndComputerHands(playerHand, computerHand);
    playerCoins += playerBet;
    restartGame();
    currentGameMode = PLACE_BET;
    return (
      outputMessage +
      GAME_MESSAGE_PLAYER_WINS +
      "You now have " +
      playerCoins +
      " coins" +
      "<br><br>  Click submit to play again."
    );
  }
  // Dealer wins
  if (checkForBlackJack(computerHand) && !checkForBlackJack(playerHand)) {
    outputMessage = displayPlayerAndComputerHands(playerHand, computerHand);
    playerCoins -= playerBet;
    restartGame();
    currentGameMode = PLACE_BET;
    return (
      outputMessage +
      GAME_MESSAGE_COMPUTER_WINS +
      "You now have " +
      playerCoins +
      " coins" +
      "<br><br>  Click submit to play again."
    );
  }
  return outputMessage + hitOrStandMessage;
};

//compare players cards
// if there is no blackjack by both players during the first round
var comparePlayersHands = function (playerHand, computerHand) {
  playerHandValue = countCardTotalValue(playerHand);
  computerHandValue = countCardTotalValue(computerHand);

  // player wins computer
  // player has more than computer, player more than computer (when within 21)
  // player has near or equal to 21, but computer bust.
  if (
    (playerHandValue <= 21 && playerHandValue > computerHandValue) ||
    (playerHandValue <= 21 && checkBust(computerHand))
  ) {
    playerCoins += playerBet;
    return GAME_MESSAGE_PLAYER_WINS;
  } // tie
  // both players are within range, and less than or equal to 21
  // player and computer hand has same number
  // both player and dealer busts
  else if (
    playerHandValue === computerHandValue ||
    (checkBust(playerHand) && checkBust(computerHand))
  ) {
    return GAME_MESSAGE_TIE;
  } // lose
  // both players are within range.
  // player lose when computer has 21
  // player lose when total value is less than computer.
  // player bust.
  else
    (computerHandValue <= 21 && computerHandValue > playerHandValue) ||
      (computerHand <= 21 && checkBust(playerHand));
  playerCoins -= playerBet;
  return GAME_MESSAGE_COMPUTER_WINS;
};

// check for more than 21 (bust)
var checkBust = function (hand) {
  var isBust = false;
  var totalAmount = countCardTotalValue(hand);
  if (totalAmount > 21) {
    isBust = true;
  }

  return isBust;
};

var images = {
  win: '<img src = "https://media.tenor.com/RBkfDOWuXYEAAAAi/chibi-cat-white-cat.gif"/>',
  lose: '<img src = "https://media.tenor.com/Wf2tmMAhMcoAAAAi/chibi-cat-mochi-cat.gif"/>',
  tie: '<img src = "https://media.tenor.com/dk-wSWullF0AAAAi/mochi-cat-chibi-cat.gif"/> ',
  bye: '<img src = "https://media.tenor.com/cPm8ayQ03rUAAAAi/chibi-cat-mochi-cat.gif"/>',
};

var GAME_MESSAGE_TIE = "<br> " + images.tie + "<br> It's a tie! <br><br>";

var GAME_MESSAGE_PLAYER_WINS = "<br>" + images.win + "<br> You win! ";

var GAME_MESSAGE_COMPUTER_WINS = "<br>" + images.lose + "<br><br> Dealer win! ";

var hitOrStandMessage =
  "<br><br> Please enter 'hit' to draw one more card or 'stand' to hold your total and end your turn.";

var outputMessage = "";

var main = function (input) {
  //User must key in username before they start the game.
  //User to key in user name. Input validation. User cannot proceed without an input.
  if (currentGameMode === "Key in username") {
    console.log("game mode: ", currentGameMode);
    return inputUsername(input);
  }
  if (currentGameMode === PLACE_BET) {
    //User is given 10 coins at the beginning of each game. User can input any amount from 1 to 10.
    if (playerCoins === 0) {
      isGameOver = true;
      return "Game Over! You have run out of coins. <br><br>" + images.bye;
    }
    playerBet = Number(input);
    console.log("Player bet", playerBet);
    if (
      input === "" ||
      Number.isNaN(playerBet) ||
      playerBet < 1 ||
      playerBet > playerCoins
    ) {
      return (
        "Your have " +
        playerCoins +
        " coins. <br><br>" +
        "Please input a number between 1 to " +
        playerCoins +
        "."
      );
    }

    //if player bet is number input, then switch to deal cards mode
    currentGameMode = GAME_CARDS_DRAWN;
  }
  // Start game with 2 cards drawn
  if (currentGameMode === GAME_CARDS_DRAWN) {
    gameDeck = shuffledDeck;
    console.log("Game Deck: ", gameDeck);

    //issue 2 cards to Player and Computer Hands
    dealTwoCards(playerHand);
    dealTwoCards(computerHand);

    //DO NOT DELETE
    //testcheck for checkForBlackjack function
    // playerHand = [
    //   { name: "King", suit: "Clubs ♣️", rank: 13 },
    //   { name: "Ace", suit: "Hearts ♥️", rank: 1 },
    // ];
    // computerHand = [
    //   { name: "King", suit: "Hearts ♥️", rank: 13 },
    //   { name: "Ace", suit: "Clubs ♣️", rank: 1 },
    // ];

    console.log("player hand: ", playerHand);
    console.log("computer hand: ", computerHand);

    // Display Player Hands to Player. Show player 1 of dealer's cards
    outputMessage = displayMessageForCoverDealerCard(playerHand, computerHand);
    +hitOrStandMessage;

    // Switch Game Mode to Hit or Stand
    currentGameMode = HIT_OR_STAND;

    // Check for Blackjack in round 1 (when there are only 2 cards)
    outputMessage = compareBlackjack(playerHand, computerHand);

    return outputMessage;
  }
  if (currentGameMode === HIT_OR_STAND) {
    console.log("game mode:", HIT_OR_STAND);
    var inputInLowerCase = input.toLowerCase();
  }
  console.log("input lower: ", inputInLowerCase);

  if (inputInLowerCase === "hit") {
    console.log("game mode: Hit");
    //player take 1 card
    playerHand.push(shuffledDeck.pop());
    playerHandValue = countCardTotalValue(playerHand);
    computerHandValue = countCardTotalValue(computerHand);
    console.log("Player hands: ", playerHandValue);
    outputMessage =
      displayMessageForCoverDealerCard(playerHand, computerHand) +
      hitOrStandMessage;

    return outputMessage;
  }
  if (inputInLowerCase === "stand") {
    console.log("game mode: Stand");
    playerHandValue = countCardTotalValue(playerHand);
    computerHandValue = countCardTotalValue(computerHand);

    // player must have at least 16 points in order to stand
    if (countCardTotalValue(playerHand) < 16) {
      return outputMessage + "<br><br> You need at least 16 points to stand. ";
    }
    // after player decides hit/stand, dealer to draw if its hand sum is less than 17.
    while (computerHandValue < 17) {
      computerHand.push(shuffledDeck.pop());
      console.log(computerHand);
      computerHandValue = countCardTotalValue(computerHand);
    }
    outputMessage =
      displayPlayerAndComputerHands(playerHand, computerHand) +
      comparePlayersHands(playerHand, computerHand);

    currentGameMode = PLACE_BET;
    restartGame();
    return (
      outputMessage +
      "You now have " +
      playerCoins +
      " coins" +
      "<br><br>  Click submit to play again."
    );
  }
  return outputMessage;
};
