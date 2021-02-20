var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  var suitIndex = 0;

  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var valueCounter = 1;
    var rankCounter = 1;

    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // If Value is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
        valueCounter = 10;
      } else if (cardName == 12) {
        cardName = 'queen';
        valueCounter = 10;
      } else if (cardName == 13) {
        cardName = 'king';
        valueCounter = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {

        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        // create a value counter so that jack queen king = 10
        value: valueCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
      valueCounter += 1;
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

// create new variable for our shuffled deck
var shuffledCardDeck = shuffleCards(makeDeck());

// create a counter for drawing cards
var cardCounter = 0;

// create an array to store cards of the player and computer
var computerHand = [];
var playerHand = [];

// create a global game mode for blackjack
var gameMode = 'blackJack';

// create a variable to display cards on hand
var cardsOnHand = [];

// create a variable to display the newly added cards on hand
var newCardsOnHand = [];

// create a variable for cards total Value on hand
var cardsTotalValue = 0;

// create a variable for the new total of cards on hand
var newCardsTotalValue = 0;

// create a variable for the total Value of computer cards
var computerTotalValue = 0;

// create a variable for new total Value of computer cards
var newComputerTotalValue = 0;

// create a variable to store for value when ACE appears
var aceValueOption = 0;

var blackJackLimit = 21;

// both player and computer draws 2 cards
var main = function (input) {
  // when player hits submit
  // Draw 2 cards from the top of the deck
  // loop twice so that both player and computer draws 2 cards
  while (cardCounter < 2) {
    var computerCard = shuffledCardDeck.pop();
    computerHand.push(computerCard);
    console.log('computerCard');
    console.log(computerCard);
    console.log('computerHand');
    console.log(computerHand);

    var playerCard = shuffledCardDeck.pop();
    playerHand.push(playerCard);
    console.log('playerCard');
    console.log(playerCard);
    console.log('playerHand');
    console.log(playerHand);

    cardCounter = cardCounter + 1;
  }

  // game mode will now change to allow player to hit or stay
  gameMode = 'playerTurn';

  // create a variable to display the player cards on hand
  cardsOnHand = [playerHand[0].name + ' of ' + playerHand[0].suit + '<br>' + playerHand[1].name + ' of ' + playerHand[1].suit];

  // create a variable to show the total Value of player cards
  cardsTotalValue = playerHand[0].value + playerHand[1].value;
  newCardsTotalValue = cardsTotalValue;

  var myOutputValue = cardsOnHand + ' <br> your total value is: ' + cardsTotalValue + '<br> type in "hit me" to receive one more card or "stay" if you believe you will win ';
  console.log(myOutputValue);

  // if and ace is drawn innitially
  if ((gameMode == 'playerTurn') && (playerHand.length == 2) && (playerHand[0].name == 'ace')) {
    // switch game mode to allow player to choose his value

    // var totalHighestVale = 0;
    // var totalLowestValue = 0;

    // create varialbe for highest and lowest possible total value
    // total value with the ace included
    // set ace to either 1 or 11
    totalLowestValue = 1 + playerHand[1].value;
    totalHighestVale = 11 + playerHand[1].value;

    myOutputValue = cardsOnHand + ' <br> You\'ve drawn an ACE!! your lowest possible value is; ' + totalLowestValue + ' <br> and your highest possible value is: ' + totalHighestVale + '<br> type in the value you want to keep';
    gameMode = 'playerOption';
  }
  if ((gameMode == 'playerTurn') && (playerHand.length == 2) && (playerHand[1].name == 'ace')) {
    // switch game mode to allow player to choose his value

    // create varialbe for highest and lowest possible total value
    // total value with the ace included
    // set ace to either 1 or 11
    totalLowestValue = 1 + playerHand[0].value;
    totalHighestVale = 11 + playerHand[0].value;

    myOutputValue = cardsOnHand + ' <br> You\'ve drawn an ACE!! your lowest possible value is; ' + totalLowestValue + ' <BR> and your highest possible value is: ' + totalHighestVale + '<br> type in the value you want to keep';
    gameMode = 'playerOption';
  }

  if (gameMode == 'playerOption') {
    if (input == totalHighestVale) {
      aceValueOption = 10;

      myOutputValue = 'You chose:' + input + ' as your value, type in "hit me" to receive one more card or "stay" if you believe you will win';
    }
    else if (input == totalLowestValue) {
      aceValueOption = 0;
      myOutputValue = 'You chose:' + input + ' as your value, type in "hit me" to receive one more card or "stay" if you believe you will win';
    }
    gameMode = 'playerTurn';
    console.log(gameMode);
  }

  // this marks the end drawing phase

  // if the player types in 'hit me'
  // if player has 2 cards, playerhand.length = 2
  if ((playerHand.length == 2) && (input == 'hit me')) {
    playerHand.push(shuffledCardDeck.pop());

    console.log('playerHand');
    console.log(playerHand);

    console.log('playerHand.length');
    console.log(playerHand.length);

    // add the new cards to existing cards on hand
    newCardsOnHand = cardsOnHand + '<br>' + playerHand[(playerHand.length - 1)].name + ' of ' + playerHand[(playerHand.length - 1)].suit;

    // update the new card Value into newCardsTotalValue
    newCardsTotalValue = Number(newCardsTotalValue) + Number(playerHand[(playerHand.length - 1)].value) + Number(aceValueOption);

    myOutputValue = newCardsOnHand + '<br> your total value is: ' + newCardsTotalValue + '<br> type in "hit me" to receive one more card or "stay" if you believe you will win ';
    console.log('newCardsTotalValue2');
    console.log(newCardsTotalValue);
    console.log(gameMode);
    console.log(cardsTotalValue);
  }

  // if player has 3 cards, playerhand.length = 3
  else if ((playerHand.length == 3) && (input == 'hit me')) {
    console.log(newCardsTotalValue);

    playerHand.push(shuffledCardDeck.pop());

    console.log('playerHand');
    console.log(playerHand);
    console.log(cardsTotalValue);
    console.log(newCardsTotalValue);

    // add the new cards to existing cards on hand
    newCardsOnHand = newCardsOnHand + '<br>' + playerHand[(playerHand.length - 1)].name + ' of ' + playerHand[(playerHand.length - 1)].suit;

    // update the new card Value into newCardsTotalValue
    newCardsTotalValue = newCardsTotalValue + playerHand[(playerHand.length - 1)].value;

    console.log(cardsTotalValue);
    console.log(newCardsTotalValue);

    myOutputValue = newCardsOnHand + '<br> your total value is: ' + newCardsTotalValue + '<br> type in "hit me" to receive one more card or "stay" if you believe you will win ';

    console.log(gameMode);
  }
  // if player has 4 cards, playerhand.length = 4
  else if ((playerHand.length == 4) && (input == 'hit me')) {
    playerHand.push(shuffledCardDeck.pop());

    console.log('playerHand');
    console.log(playerHand);

    console.log('playerHand.length');
    console.log(playerHand.length);

    // add the new cards to existing cards on hand
    newCardsOnHand = newCardsOnHand + '<br>' + playerHand[(playerHand.length - 1)].name + ' of ' + playerHand[(playerHand.length - 1)].suit;

    // update the new card Value into newCardsTotalValue
    newCardsTotalValue = newCardsTotalValue + playerHand[(playerHand.length - 1)].value;

    myOutputValue = newCardsOnHand + '<br> your total value is: ' + newCardsTotalValue + '<br> type in "hit me" to receive one more card or "stay" if you believe you will win ';
  }
  // if player decides to stay
  else if ((input == 'stay') && (playerHand.length > 2)) {
    console.log(cardsOnHand);
    console.log(gameMode);
    gameMode = 'dealerTurn';
  }
  else if (input == 'stay') {
    newCardsOnHand = cardsOnHand;
    newCardsTotalValue = cardsTotalValue;
    gameMode = 'dealerTurn';
  }

  console.log(newCardsTotalValue);

  //  switch the computer/dealer turn
  if (gameMode == 'dealerTurn') {
    // update total Value of computer cards
    computerTotalValue = computerHand[0].value + computerHand[1].value;

    console.log('computerHand');
    console.log(computerHand);
    console.log('computerTotalValue');
    console.log(computerTotalValue);

    // updates during dealer turn for new total Value of computer cards
    newComputerTotalValue = computerTotalValue;
    // create a variable to show the total Value of computer cards
    computerTotalValue = computerHand[0].value + computerHand[1].value;
    console.log(computerTotalValue);
    newComputerTotalValue = computerTotalValue;
    // computer will draw cards below 17 and stop once it hits 17
    while (newComputerTotalValue < 17) {
      computerHand.push(shuffledCardDeck.pop());
      console.log(computerTotalValue);
      newComputerTotalValue = computerTotalValue + computerHand[(computerHand.length - 1)].value;
      gameMode = 'result';
    }

    // determine the winner
    // if player total Value > computer total Value
    if (newCardsTotalValue > newComputerTotalValue) {
      myOutputValue = newCardsOnHand + ' <br> your total value is: ' + newCardsTotalValue + '<br>the dealer has drawn a total of ' + newComputerTotalValue + '<br> YOU WIN!!!';
    }
    // if player total Value < computer total Value
    else if (newCardsTotalValue < newComputerTotalValue) {
      console.log(newCardsTotalValue);
      console.log(newComputerTotalValue);

      myOutputValue = newCardsOnHand + ' <br> your total value is: ' + newCardsTotalValue + '<br>the dealer has drawn a total of ' + newComputerTotalValue + '<br> YOU LOSE!!!';
    }
    // if player total Value = computer total Value
    else {
      myOutputValue = newCardsOnHand + ' <br> your total value is: ' + newCardsTotalValue + '<br>the dealer has drawn a total of ' + newComputerTotalValue + '<br> ITS A TIE!!!';
    }
  }
  return myOutputValue;
};
