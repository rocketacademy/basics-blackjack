/**
 * Add all elements from fromArray to the start of toArray.
 */
var addArray = function (fromArray, toArray) {
  var fromArrayIndex = 0;
  while (fromArrayIndex < fromArray.length) {
    // Add each element in fromArray to toArray individually
    toArray.unshift(fromArray[fromArrayIndex]);
    // Increment the index to operate on the next index of fromArray
    fromArrayIndex += 1;
  }
  return toArray;
};

/**
 * Create a standard 52-card deck
 */
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['♥️', '♦️', '♣️', '♠️'];

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
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
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
  return cardDeck;
};

// ! above code from class

// initialize the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

var playerHand = [];
var dealerHand = [];

var playerScore = 0;
var dealerScore = 0;

var mode = 'DEAL_CARDS';

// to sum a property in an array of objects
function getTotal(cards) {
  var total = 0;
  var counter = 0;
  var ace = false;
  // loop to find the sum of an array
  // sum the rank of cards inside an array object
  while (counter < cards.length) {
    // add current card to current total
    console.log(total);
    if (cards[counter].rank == 11 || cards[counter].rank == 12 || cards[counter].rank == 13) {
      total += 10;
    }
    else {
      total = cards[counter].rank + total;
    }
    counter = counter + 1;
    if (cards[cards.length] == 1) ace = true;
  }
  if (total + 10 <= 21 && ace) {
    total += 10;
  }

  return total;
}

// function to deal next card from the deck
function dealNextCard() {
  return deck.pop();
}

// function to check the results if it is not blackjack or bust
function checkResult() {
  var playerResult = getTotal(playerHand);
  var dealerResult = getTotal(dealerHand);

  if (playerResult > dealerResult) {
    mode = 'GAME_OVER';
    return '<br>' + 'Player wins! with a higher score 🤑🤑🤑';
  }
  if (playerResult < dealerResult) {
    mode = 'GAME_OVER';
    return '<br>' + 'Sorry dealer wins! with a higher score 💸 please visit your local Ah-Long 💵 🦈 for cash (just kidding 😝)';
  }
  if (playerResult == dealerResult) {
    mode = 'GAME_OVER';
    return '<br>' + 'Whoah it\'s a tie! Press submit to play again!!!';
  }
  return '';
}

// reset game after game over
function resetGame() {
  mode = 'DEAL_CARDS';
  playerHand = [];
  dealerHand = [];
  return 'click submit to play again!';
}

// player and dealer are dealt cards
var dealCards = function () {
  // cards are dealt to the player and dealer
  playerHand = [dealNextCard(), dealNextCard()];
  dealerHand = [dealNextCard()];
  // variable for player card one and two
  var playerCardOne = playerHand[0];
  var playerCardTwo = playerHand[1];
  // variable for dealer card one and two
  var dealerCardOne = dealerHand[0];
  // initial hand of player and dealer is summed
  playerScore = getTotal(playerHand);
  dealerScore = getTotal(dealerHand);
  // check win or lose conditioj
  if (playerScore == 21) {
    mode = 'GAME_OVER';
    return playerMessage + playerScore + " it's a Blackjack! 💰";
  }
  // go to player turn mode before return
  mode = 'PLAYER_TURN';
  // player hand message
  var playerMessage = 'Player: ' + playerCardOne.rank + ' of ' + playerCardOne.suit + ' & '
  + playerCardTwo.rank + ' of ' + playerCardTwo.suit
  + '<br>' + 'Player card total is: ' + playerScore + ' ';
  // dealer hand message
  var dealerMessage = 'Dealer: ' + dealerCardOne.rank + ' of ' + dealerCardOne.suit + '<br>'
  + 'Dealer card total is: ' + dealerScore;
  // return output
  return playerMessage + '<br><br>' + dealerMessage;
};

// function when it is players turn
function playerTurn(input) {
  // default message for playerTurn function if there is no input
  if (input == '') {
    return 'please input "hit" or "stay" to play';
  }
  if (input == 'hit') {
    playerHand.push(dealNextCard());
    playerScore = getTotal(playerHand);
    if (playerScore == 21) {
      mode = 'GAME_OVER';
      return "it's a Blackjack! 💰";
    } if (playerScore > 21) {
      mode = 'GAME_OVER';
      return "it's a bust... 🤡 GameOver...";
    }
    var playerNewCardHitRank = playerHand[playerHand.length - 1].rank;
    var playerNewCardHitSuit = playerHand[playerHand.length - 1].suit;
    var message = 'Your hit is ' + playerNewCardHitRank + ' of ' + playerNewCardHitSuit
    + '<br>' + 'Player total is now: ' + playerScore;
    return message + ' ';
  }
  if (input == 'stay') {
    playerScore = getTotal(playerHand);
    mode = 'DEALER_TURN';
    return 'You will stand with a total score of ' + playerScore + '<br>'
    + "Now it's dealer turn: Click on submit button for dealer card hits!";
    // check for game over
  }
}

// function when it is dealers' turn
function dealerTurn() {
  // no input is needed, just click submit to see dealer card hits
  dealerHand.push(dealNextCard());
  dealerScore = getTotal(dealerHand);
  if (dealerScore < 17) {
    return 'Dealer must hit again!';
  }
  if (dealerScore == 21) {
    mode = 'GAME_OVER';
    return "it's a Blackjack! 💰";
  }
  if (dealerScore > 21) {
    mode = 'GAME_OVER';
    return "it's a bust... 🤡 GameOver...";
  }
  var dealerCardHitRank = dealerHand[dealerHand.length - 1].rank;
  var dealerCardHitSuit = dealerHand[dealerHand.length - 1].suit;
  var resultMessage = checkResult();
  return 'Dealer has hit ' + dealerCardHitRank + ' of ' + dealerCardHitSuit + '<br>'
  + 'Dealer total is now: ' + dealerScore + ' ' + resultMessage;
}

var main = function (input) {
  if (mode == 'DEAL_CARDS') {
    return dealCards();
  }
  if (mode == 'PLAYER_TURN') {
    return playerTurn(input);
  }
  if (mode == 'DEALER_TURN') {
    return dealerTurn();
  }
  if (mode == 'GAME_OVER') {
    return resetGame();
  }
};
