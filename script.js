// Blackjack - base

// Declare game modes
var place_bet = "place your bets";
var game_start = "game start";
var cards_drawn = "cards drawn";
var hit_or_stand = "hit or stand";
var game_results = "show game results";
var currentGameMode = place_bet;

// track player points and player bet
var playerPoints = Number(100);
var playerBet;

// Declare variables to store player and dealer hands (use arrays to store multiple card objects)
var playerHandArray = [];
var dealerHandArray = [];

// Declare variable to hold deck of cards (empty at the start)
var cardDeck = [];

// if gameEnd = true, show output msg to refresh / reset the game
var gameEnd = false;

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);
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
      console.log(`rank: ${rankCounter}`);
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

var cardDeck = makeDeck();
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
// Shuffle the elements in the cardDeck array
var shuffleDeck = function (cardDeck) {
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
// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleDeck(cardDeck);

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

// Function that checks a hand for black jack
var checkForBlackjack = function (handArray) {
  // Loop through player hand
  // if there is a blackjack return true
  // else return false
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  // Possible black jack scenerios
  // First card is Ace +  Second card is 10 or suits
  // Second card is Ace +  First card is 10 or suits
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "ace" && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  }

  return isBlackJack;
};

// Function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // Counter to keep track of the number of aces found within the given hand
  var aceCounter = 0;

  // Loop through player or dealers hand and add up the ranks
  var index = 0;
  while (index < handArray.length) {
    var currCard = handArray[index];

    // In blackjack, the value of king, queen, and jack are counted as 10 by default
    if (
      currCard.name == "king" ||
      currCard.name == "queen" ||
      currCard.name == "jack"
    ) {
      totalHandValue = totalHandValue + 10;
    }
    // We count the value of ace as 11 by default
    else if (currCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
      // Else, all other numbered cards are valued by their ranks
    } else {
      totalHandValue = totalHandValue + currCard.rank;
    }
    index = index + 1;
  }

  // Reset index for ace counter
  index = 0;
  // Loop for the number of aces found and only deduct 10 from total hand value
  // when totalHandValue is more than 21.
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};

// function to display player and dealer hands
var cardsDrawn = function (handArray) {
  cardsIndex = 0;
  cardsHand = "";
  while (cardsIndex < handArray.length) {
    cardsHand =
      cardsHand +
      `~${handArray[cardsIndex].name} of ${handArray[cardsIndex].suit}~<br>`;
    cardsIndex += 1;
  }
  return cardsHand;
};

var main = function (input) {
  var myOutputValue = "";
  if (gameEnd == true) {
    return `The game is over. Click refresh to play again.`;
  }
  // start game mode with placing bets
  if (currentGameMode == place_bet) {
    if (input == "") {
      return `You will start with 100 points. Please input the number of points you want to bet.`;
    }
    // else user inputs number to bet, then switch to game start mode
    playerBet = Number(input);
    currentGameMode = game_start;
    // input validation: if input is not a number
    if (Number.isNaN(playerBet)) {
      return `Invalid input. Please input the number of points you want to bet.`;
    }
  }

  if (currentGameMode == game_start) {
    // create the game deck
    cardDeck = createNewDeck();
    console.log(cardDeck);
    // deal 2 cards to player and dealer
    var playerCardOne = cardDeck.pop();
    console.log("player card 1:", playerCardOne);
    var playerCardTwo = cardDeck.pop();
    console.log("player card 2:", playerCardTwo);
    var dealerCardOne = cardDeck.pop();
    console.log("dealer card 1:", dealerCardOne);
    var dealerCardTwo = cardDeck.pop();
    console.log("dealer card 2:", dealerCardTwo);
    playerHandArray.push(playerCardOne);
    playerHandArray.push(playerCardTwo);
    dealerHandArray.push(dealerCardOne);
    dealerHandArray.push(dealerCardTwo);

    // progress gameMode
    currentGameMode = cards_drawn;
    myOutputValue =
      'Everyone has been dealt with 2 cards. Click the "submit" button to calculate your cards.';
  }

  if (currentGameMode == cards_drawn) {
    // for testing purposes
    // playerHandArray = [
    //   { name: "queen", suit: "clubs", rank: 12 },
    //   { name: "7", suit: "diamonds", rank: 7 },
    // ];
    // dealerHandArray = [
    //   { name: "king", suit: "clubs", rank: 13 },
    //   { name: "7", suit: "spades", rank: 7 },
    // ];

    // check for blackjack
    var playerHasBlackjack = checkForBlackjack(playerHandArray);
    var dealerHasBlackjack = checkForBlackjack(dealerHandArray);
    console.log("check player for blackjack", playerHasBlackjack);
    console.log("check dealer for blackjack", dealerHasBlackjack);
    // calculate total hand value
    var playerHandTotalValue = calculateTotalHandValue(playerHandArray);
    var dealerHandTotalValue = calculateTotalHandValue(dealerHandArray);
    console.log("player total hand value:", playerHandTotalValue);
    console.log("dealer total hand value:", dealerHandTotalValue);

    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      // both player and dealer has blackjack -> tie
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        gameEnd = true;
        playerPoints += playerBet;
        myOutputValue = `Hi player, your cards are: <br><br> ${cardsDrawn(
          playerHandArray
        )} <br> Total value: ${playerHandTotalValue} <br><br> Dealer cards are: <br><br> ${cardsDrawn(
          dealerHandArray
        )} <br> Total value: ${dealerHandTotalValue}<br><br> It's a blackjack tie! <br>Total points: ${playerPoints}<br> Click refresh to play again.`;
      }
      // only player has blackjack -> player wins
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        gameEnd = true;
        playerPoints += playerBet;
        myOutputValue = `Hi player, your cards are: <br><br> ${cardsDrawn(
          playerHandArray
        )} <br> Total value: ${playerHandTotalValue}<br><br> Dealer cards are: <br><br> ${cardsDrawn(
          dealerHandArray
        )} <br> Total value: ${dealerHandTotalValue}<br><br> Player wins by blackjack!<br>Total points: ${playerPoints}<br> Click refresh to play again.`;
      }
      // only dealer has blackjack -> dealer wins
      else if (playerHasBlackjack == false && dealerHasBlackjack == true) {
        gameEnd = true;
        playerPoints -= playerBet;
        myOutputValue = `Hi player, your cards are: <br><br> ${cardsDrawn(
          playerHandArray
        )} <br> Total value: ${playerHandTotalValue}<br><br> Dealer cards are: <br><br> ${cardsDrawn(
          dealerHandArray
        )} <br> Total value: ${dealerHandTotalValue}<br><br> Dealer wins by blackjack! <br>Total points: ${playerPoints}<br> Click refresh to play again.`;
      }
    } else {
      myOutputValue = `Hi player, your cards are: <br><br> ${cardsDrawn(
        playerHandArray
      )} <br> Total value: ${playerHandTotalValue}<br><br> Dealer cards are: <br><br> ${cardsDrawn(
        dealerHandArray
      )} <br> Total value: ${dealerHandTotalValue}<br><br> There is no blackjack. <br> Please input "hit" or "stand".`;
      // no blackjack -> game mode change to 'hit or stand'
      currentGameMode = hit_or_stand;
    }
    return myOutputValue;
  }

  if (currentGameMode == hit_or_stand) {
    console.log("current game mode:", currentGameMode);
    if (input !== "hit" && input !== "stand") {
      myOutputValue = `Please enter only hit or stand.`;
    }
    if (input == "hit") {
      playerHandArray.push(cardDeck.pop());
      console.log("player hand:", playerHandArray);
      // calculate player hand value
      var playerHandTotalValue = calculateTotalHandValue(playerHandArray);
      console.log("player total hand value:", playerHandTotalValue);
      myOutputValue = `You have chosen to hit and drew another card. Your cards are: <br><br> ${cardsDrawn(
        playerHandArray
      )} <br> Total value: ${playerHandTotalValue} Please input "hit" or "stand".`;
    } else if (input == "stand") {
      currentGameMode = game_results;
      myOutputValue = `You have chosen to stand. Click submit to show the game results.`;
    }
    return myOutputValue;
  }
  if ((currentGameMode = game_results)) {
    console.log("current game mode:", currentGameMode);
    // Dealer to hit if total hand value is below 17
    while (calculateTotalHandValue(dealerHandArray) < 17) {
      dealerHandArray.push(cardDeck.pop());
      console.log("dealer hand:", dealerHandArray);
    }

    // calculate total hand value
    var playerHandTotalValue = calculateTotalHandValue(playerHandArray);
    var dealerHandTotalValue = calculateTotalHandValue(dealerHandArray);
    console.log("player total hand value:", playerHandTotalValue);
    console.log("dealer total hand value:", dealerHandTotalValue);
    myOutputValue = `Player cards are: <br><br> ${cardsDrawn(
      playerHandArray
    )} <br> Total value: ${playerHandTotalValue}
      <br><br> Dealer cards are: <br><br> ${cardsDrawn(
        dealerHandArray
      )} <br> Total value: ${dealerHandTotalValue}<br>`;

    // if both have same hand and <= 21, it's a tie
    if (
      playerHandTotalValue == dealerHandTotalValue &&
      playerHandTotalValue &&
      dealerHandTotalValue <= 21
    ) {
      playerPoints;
      myOutputValue =
        myOutputValue +
        `<br> It's a tie!<br>Total points: ${playerPoints}<br>Click refresh to play again.`;
    }

    // if both > 21, busted
    if (dealerHandTotalValue > 21 && playerHandTotalValue > 21) {
      playerPoints -= playerBet;
      myOutputValue =
        myOutputValue +
        `<br> Both you and the dealer have busted.<br>Total points: ${playerPoints}<br> Click refresh to play again.`;
    }
    // if dealer > 21 and player <= 21, dealer busted & player wins
    if (dealerHandTotalValue > 21 && playerHandTotalValue <= 21) {
      playerPoints += playerBet;
      myOutputValue =
        myOutputValue +
        `<br> The dealer has busted. You win!<br>Total points: ${playerPoints}<br>Click refresh to play again.`;
    }
    // if player > 21 and dealer <= 21, player busted & dealer wins
    if (playerHandTotalValue > 21 && dealerHandTotalValue <= 21) {
      playerPoints -= playerBet;
      myOutputValue =
        myOutputValue +
        `<br> You have busted. Dealer wins!<br>Total points: ${playerPoints}<br>Click refresh to play again.`;
    }
    // if player > dealer and both <= 21, player wins
    if (
      playerHandTotalValue > dealerHandTotalValue &&
      playerHandTotalValue <= 21
    ) {
      playerPoints += playerBet;
      myOutputValue =
        myOutputValue +
        `<br> Player wins!<br>Total points: ${playerPoints}<br>Click refresh to play again.`;
    }
    // if player < dealer and both <=21, dealer wins
    if (
      playerHandTotalValue < dealerHandTotalValue &&
      dealerHandTotalValue <= 21
    ) {
      playerPoints -= playerBet;
      myOutputValue =
        myOutputValue +
        `<br> Dealer wins!<br>Total points: ${playerPoints}<br>Click refresh to play again.`;
    }
    return myOutputValue;
  }
};
