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
var playerHand = [];

var computerCards = [];

var playerTotalBettingPoint = 100;
var playerBettingPoint = 0;

var mode = 'ask for username';

var playerName = '';

// store all card value
var storePoint = function (totalValue, handCards) {
  var rankIndex = 0;
  totalValue = 0;
  console.log(handCards);
  while (rankIndex < handCards.length) {
    // store cards point
    console.log(totalValue);
    totalValue = totalValue + handCards[rankIndex].rank;
    rankIndex = rankIndex + 1;
  }
  return totalValue;
};

// check for ace condition logic
// if total value more than 21 , ace value change from 11  to 1
var aceCondition = function (totalValue, handCards) {
  var aceIndex = 0;
  while (aceIndex < handCards.length) {
    if (totalValue > 21 && handCards[aceIndex].name == 'ace') {
      totalValue = totalValue - 10;
      console.log('New Total value ' + totalValue);
      aceIndex = aceIndex + 1;
    } else {
      aceIndex = aceIndex + 1;
    }
  }
  return totalValue;
};

// player draw 2 cards and computer given 1 card face up and 1 card face down
var playerAndComputerDrawTwoCards = function () {
  var message = '';

  playerTotalValue = storePoint(playerTotalValue, playerHand);
  playerTotalValue = aceCondition(playerTotalValue, playerHand);
  console.log(playerTotalValue);

  message = playerName + ' first deal cards ' + playerHand[0].name + ' of ' + playerHand[0].suit + ' and ' + playerHand[1].name + ' of ' + playerHand[1].suit + '<br> Player total card value' + playerTotalValue + '<br>Computer deal ' + computerCards[0].name + ' of ' + computerCards[0].suit + ' and one face down card<br><br> You bet ' + playerBettingPoint + '<br> type hit to deal 1 card or stand to end your turn';
  // if player score 21 on the draw (first 2 cards) player win else
  if (playerTotalValue == 21) {
    console.log('player win blackjack');
    playerTotalValue = 0;
    playerTotalBettingPoint = playerTotalBettingPoint + Number(playerBettingPoint);
    message = message + '<br> You win! You bet ' + playerBettingPoint + ' point. your total point ' + playerTotalBettingPoint + '<br> Enter the amount you want to bet.';
    mode = 'player bet point';

    return message;
  }

  return message;
};

// player deal 1 card to player hand
var playerDeal1Cards = function () {
  var message = '';
  playerHand.push(deck.pop());
  console.log(playerHand);
  var rankIndex = 0;
  playerTotalValue = storePoint(playerTotalValue, playerHand);
  // display array card
  while (rankIndex < playerHand.length) {
    message = message + playerName + '  deal ' + playerHand[rankIndex].name + ' of ' + playerHand[rankIndex].suit + '<br>';
    rankIndex = rankIndex + 1;
  }
  // if value is more than 21 and there ace , ace set to 1
  playerTotalValue = aceCondition(playerTotalValue, playerHand);

  message = message + '<br>' + playerName + ' total cards value ' + playerTotalValue + '<br>' + playerName + ' bet ' + playerBettingPoint + '<br>Computer deal ' + computerCards[0].name + ' of ' + computerCards[0].suit + ' and one face down card <br>';
  return message;
  // if player cards value 21 , player win
  // if player cards value more than 21, player burst
};
var playerTotalValue = 0;

var main = function (input) {
  var myOutputValue = 'bug';
  // prompt user to enter user name
  if (mode == 'ask for username') {
    myOutputValue = 'Enter username';
    mode = 'enter username';
    return myOutputValue;
  }// ask user to enter betting amount
  if (mode == 'enter username') {
    playerName = input;
    myOutputValue = 'Welcome ' + playerName + ', enter the amount of point you wish to bet , you have total of ' + playerTotalBettingPoint + ' point';
    console.log(playerName);
    mode = 'player bet point';
    return myOutputValue;
  }
  if (mode == 'player bet point') {
    playerBettingPoint = input;
    myOutputValue = playerName + ',  you have total of ' + playerTotalBettingPoint + ' point and you wish to bet ' + playerBettingPoint;
    mode = 'player turn';
    // reset  player total cards value and reshuffle deck
    // 2 card will be given to player and computer
    playerTotalValue = 0;
    console.log(playerTotalValue);
    playerHand = [];
    computerCards = [];
    deck = shuffleCards(makeDeck());
    playerHand = deck.splice(0, 2);
    deck.pop(playerHand);
    console.log('player cards');
    console.log(playerHand);

    computerCards = deck.splice(2, 2);
    console.log('computer cards');
    console.log(computerCards);

    return myOutputValue;
  }

  if (mode == 'player turn') {
    myOutputValue = playerAndComputerDrawTwoCards();

    console.log(myOutputValue);
    if (playerTotalValue != 21) {
      mode = 'player choose';
    }
    // if player type hit ,player deal 1 card
  }
  if (input == 'hit' && mode == 'player choose') {
    myOutputValue = playerDeal1Cards();
  }
  if (playerTotalValue == 21) {
    console.log('you win');
    playerTotalBettingPoint = playerTotalBettingPoint + Number(playerBettingPoint);
    myOutputValue = myOutputValue + '<br>' + playerName + ' win! You bet ' + playerBettingPoint + ' point. your total point ' + playerTotalBettingPoint + '<br> Enter the amount you want to bet.';
    mode = 'player bet point';
    playerTotalValue = 0;
    return myOutputValue;
  }
  if (playerTotalValue > 21) {
    console.log('you lose');
    playerTotalBettingPoint = playerTotalBettingPoint - playerBettingPoint;
    myOutputValue = myOutputValue + '<br>' + playerName + ' lose! You bet ' + playerBettingPoint + ' point. your total point ' + playerTotalBettingPoint + '<br> Enter the amount you want to bet.';
    mode = 'player bet point';
    playerTotalValue = 0;
    return myOutputValue;
  }
  if (input == 'stand') {
    myOutputValue = playerName + ' total cards value' + playerTotalValue + '<br> Computer Turn';
    console.log(myOutputValue);

    mode = 'computer turn';
    console.log(mode);
  }
  // The computer decides to hit or stand automatically based on game rules.
  // computer will hit until his/her cards total 17 or higher.
  if (mode == 'computer turn') {
    console.log(computerCards);
    var computerRankIndex = 0;
    var computerTotalValue = storePoint(computerTotalValue, computerCards);
    console.log(computerTotalValue);
    // display output of computer deal card
    while (computerRankIndex < computerCards.length) {
      myOutputValue = myOutputValue + '<br> computer deal ' + computerCards[computerRankIndex].name + ' of ' + computerCards[computerRankIndex].suit;
      computerRankIndex = computerRankIndex + 1;
    }
    if (computerTotalValue == 21) {
      console.log('computer win');
      playerTotalBettingPoint = playerTotalBettingPoint - playerBettingPoint;
      myOutputValue = myOutputValue + '<br>Computer win! You lose ' + playerBettingPoint + ' point. your total point ' + playerTotalBettingPoint + '<br> Enter the amount you want to bet.';
      mode = 'player bet point';
      playerTotalValue = 0;
      return myOutputValue;
    }
    // computer draw card if computer total value is lesser than 21 and player total
    // or lesser than 17
    while (computerTotalValue < playerTotalValue && computerTotalValue < 21 || computerTotalValue < 17) {
      var temComputerCards = deck.pop();
      computerCards.push(temComputerCards);
      computerTotalValue = computerTotalValue + computerCards[computerRankIndex].rank;
      // if total value is more than 21 and there ace , ace value set from 11 to 1
      computerTotalValue = aceCondition(computerTotalValue, computerCards);
      myOutputValue = myOutputValue + '<br>computer deal ' + temComputerCards.name + ' of ' + temComputerCards.suit;
    }

    computerTotalValue = storePoint(computerTotalValue, computerCards);
    console.log(computerTotalValue);
    myOutputValue = myOutputValue + '<br> Computer total value ' + computerTotalValue;
    if (computerTotalValue > 21) {
      console.log('computer lose 1');
      playerTotalBettingPoint = playerTotalBettingPoint + Number(playerBettingPoint);
      console.log(playerTotalBettingPoint);
      myOutputValue = myOutputValue + '<br>Computer Burst! ' + playerName + ' win! You gain ' + playerBettingPoint + ' point. your total point ' + playerTotalBettingPoint + '<br> Enter the amount you want to bet.';
      mode = 'player bet point';
      playerTotalValue = 0;
      return myOutputValue;
    } if (playerTotalValue == computerTotalValue) {
      console.log('tie');
      myOutputValue = myOutputValue + '<br> TIE! Your total betting Point ' + playerTotalBettingPoint + '<br> Enter the amount you want to bet.';
      mode = 'player bet point';
      playerTotalValue = 0;
      return myOutputValue;
    }
    if (playerTotalValue > computerTotalValue) {
      console.log('player win 1');
      playerTotalBettingPoint = playerTotalBettingPoint + Number(playerBettingPoint);
      console.log(playerTotalBettingPoint);
      myOutputValue = myOutputValue + '<br>' + playerName + ' WIN! You gain ' + playerBettingPoint + ' point. your total point ' + playerTotalBettingPoint + '<br> Enter the amount you want to bet.';
      console.log(playerTotalBettingPoint);
      mode = 'player bet point';
      playerTotalValue = 0;
      return myOutputValue;
    } if (playerTotalValue < computerTotalValue) {
      console.log('computer win 2');
      playerTotalBettingPoint = playerTotalBettingPoint - playerBettingPoint;
      myOutputValue = myOutputValue + '<br> Computer WIN! You lose ' + playerBettingPoint + ' point. your total point ' + playerTotalBettingPoint + '<br> Enter the amount you want to bet.';
      mode = 'player bet point';
      playerTotalValue = 0;
      console.log(playerTotalBettingPoint);
      return myOutputValue;
    }
    playerTotalValue = 0;
    console.log(playerTotalBettingPoint);
  }
  console.log(playerTotalValue);

  return myOutputValue;
};
