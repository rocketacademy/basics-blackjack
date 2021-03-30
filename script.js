// generate blackjack cards
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
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      var blackjackRank = rankCounter;
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
      // if rank is 11 ,12 or 13 , rank value set to 10. ace set to 11
      if (blackjackRank == 1) {
        blackjackRank = 11;
      } else if (blackjackRank == 11) {
        blackjackRank = 10;
      } else if (blackjackRank == 12) {
        blackjackRank = 10;
      } else if (blackjackRank == 13) {
        blackjackRank = 10;
      }

      // Create a new card with the current name, suit, and rank
      // console.log(cardName)
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: blackjackRank,

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

// // Shuffle the elements in the cardDeck array
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
var deck = shuffleCards(makeDeck());
console.log(deck);

// player and computer deal 2 cards
var playerCards = deck.splice(0, 2);
console.log('player cards');
console.log(playerCards);

// 1 computer card face up  and 1 face down
var computerCards = deck.splice(2, 2);
console.log('computer cards');
console.log(computerCards);
var playerTotalValue = 0;

var mode = 'player turn';

// player draw 2 cards and computer given 1 card face up and 1 card face down
var playerAndComputerDrawTwoCards = function () {
  var message = '';
  var rankIndex = 0;
  playerTotalValue = 0;
  // store player score into 'playerTOtalValue
  while (rankIndex < playerCards.length) {
    // store cards point
    playerTotalValue = playerTotalValue + playerCards[rankIndex].rank;
    rankIndex = rankIndex + 1;
  }
  message = 'Player first deal cards ' + playerCards[0].name + ' of ' + playerCards[0].suit + ' and ' + playerCards[1].name + ' of ' + playerCards[1].suit + '<br> Player total card value' + playerTotalValue + '<br>Computer deal ' + computerCards[0].name + ' of ' + computerCards[0].suit + ' and one face down card';
  // if player score 21 on the draw (first 2 cards) player win else
  if (playerTotalValue == 21) {
    console.log('player win blackjack');
    message = message + '<br> You win!';
    return message;
  }
  return message;
};

// store player total point and check for ace condition logic
var storePlayerPoint = function () {
  var message = '';
  var temPlayerCards = deck.pop();
  playerCards.push(temPlayerCards);
  console.log('tem card');
  console.log(temPlayerCards);
  console.log('player cards');
  console.log(playerCards);
  var rankIndex = 0;
  playerTotalValue = 0;
  // store cards point
  while (rankIndex < playerCards.length) {
    playerTotalValue = playerTotalValue + playerCards[rankIndex].rank;
    console.log('Before ace change value' + playerTotalValue);
    message = message + ' Player deal ' + playerCards[rankIndex].name + ' of ' + playerCards[rankIndex].suit + '<br>';
    rankIndex = rankIndex + 1;
  }
  // if value is mroe than 21 and there ace , ace set to 1
  var aceIndex = 0;
  while (aceIndex < playerCards.length) {
    if (playerTotalValue > 21 && playerCards[aceIndex].name == 'ace') {
      playerTotalValue = playerTotalValue - 10;
      console.log('New Total value ' + playerTotalValue);
      aceIndex = aceIndex + 1;
    } else {
      aceIndex = aceIndex + 1;
    }
  }
  message = message + '<br> Player total cards value ' + playerTotalValue + '<br>Computer deal ' + computerCards[0].name + ' of ' + computerCards[0].suit + ' and one face down card <br>';
  return message;
  // if player cards value 21 , player win
  // if player cards value more than 21, player burst
};

var main = function (input) {
  if (mode == 'player turn') {
    var myOutputValue = playerAndComputerDrawTwoCards();
    if (playerTotalValue != 21) {
      mode = 'player choose';
    }
    // if player type hit ,player deal 1 car
  }
  if (input == 'hit' && mode == 'player choose') {
    myOutputValue = storePlayerPoint();
  }
  if (playerTotalValue == 21) {
    console.log('you win');
    myOutputValue = myOutputValue + '<br> Player win';
  }
  if (playerTotalValue > 21) {
    console.log('you lose');
    myOutputValue = myOutputValue + '<br> Player lose!';
    return myOutputValue;
  }
  if (input == 'stand') {
    myOutputValue = 'Player total point ' + playerTotalValue + '<br> Computer Turn';
    console.log(myOutputValue);

    mode = 'computer turn';
    console.log(mode);
  }
  // The computer decides to hit or stand automatically based on game rules.
  // computer will hit until his/her cards total 17 or higher.
  if (mode == 'computer turn') {
    console.log(computerCards);
    var computerRankIndex = 0;
    var computerTotalValue = 0;
    while (computerRankIndex < computerCards.length) {
      // store cards point
      computerTotalValue = computerTotalValue + computerCards[computerRankIndex].rank;
      console.log(computerTotalValue);
      myOutputValue = myOutputValue + '<br> computer deal ' + computerCards[computerRankIndex].name + ' of ' + computerCards[computerRankIndex].suit;
      if (computerTotalValue == 21) {
        console.log('computer win');
      }
      computerRankIndex = computerRankIndex + 1;
    }
    while (computerTotalValue < playerTotalValue && computerTotalValue < 21 || computerTotalValue < 17) {
      var temComputerCards = deck.pop();
      computerCards.push(temComputerCards);
      computerTotalValue = computerTotalValue + computerCards[computerRankIndex].rank;
      myOutputValue = myOutputValue + '<br>computer deal ' + temComputerCards.name + ' of ' + temComputerCards.suit;
    }
    var aceComputerIndex = 0;
    while (aceComputerIndex < computerCards.length) {
      if (computerTotalValue > 21 && computerCards[aceComputerIndex].name == 'ace') {
        computerTotalValue = computerTotalValue - 10;
        console.log('New Total value ' + computerTotalValue);
        aceComputerIndex = aceComputerIndex + 1;
      } else {
        aceComputerIndex = aceComputerIndex + 1;
      }
    }
    myOutputValue = myOutputValue + '<br> Computer total value ' + computerTotalValue;
    if (computerTotalValue > 21) {
      console.log('computer lose');
      myOutputValue = myOutputValue + '<br>Computer Burst! Player WIN!';
    } else if (playerTotalValue == computerTotalValue) {
      console.log('tie');
      myOutputValue = myOutputValue + '<br> TIE!';
    }
    else if (playerTotalValue > computerTotalValue) {
      console.log('player win');
      myOutputValue = myOutputValue + '<br> Player WIN!';
    } else if (playerTotalValue < computerTotalValue) {
      console.log('computer win');
      myOutputValue = myOutputValue + '<br> Computer WIN!';
    }
  }
  return myOutputValue;
};
