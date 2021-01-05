// card rank goes from 1-10, 11, 12, 13
// card suit - hearts, diamonds, spades, clubs
// car name - 1 is ace, 2-10, jack is 11, queen is 12, king is 13

var makeDeck = function () {
  var deck = [];

  var cardSuits = ['hearts', 'diamonds', 'spades', 'clubs'];
  var cardSuitIndex = 0;

  while (cardSuitIndex < cardSuits.length) {
    var cardSuit = cardSuits[cardSuitIndex];
    var cardRankIndex = 1;
    var cardName;
    while (cardRankIndex < 14) {
      if (cardRankIndex == 1) {
        cardName = 'Ace';
      }
      else if (cardRankIndex == 11) {
        cardName = 'Jack';
      }
      else if (cardRankIndex == 12) {
        cardName = 'Queen';
      }
      else if (cardRankIndex == 13) {
        cardName = 'King';
      }
      else {
        cardName = cardRankIndex;
      }
      var card = {
        name: cardName,
        rank: cardRankIndex,
        suit: cardSuit,
      };
      cardRankIndex += 1;
      deck.push(card);
    }
    cardSuitIndex += 1;
  }

  return deck;
};

// function is given an object containing ordered deck
// function returns shuffled deck
var shuffleDeck = function (deck) {
  var cardIndex = 0;
  while (cardIndex < deck.length) {
    var randomNumber;
    var placeHolder;
    randomNumber = cardIndex + Math.floor(Math.random() * (deck.length - cardIndex));
    placeHolder = deck[randomNumber];
    deck[randomNumber] = deck[cardIndex];
    deck[cardIndex] = placeHolder;
    cardIndex += 1;
  }
  return deck;
};

// get card value from a function when a card is given to function as input
var cardScore = function (card) {
  var BlackjackCardScore;
  if (card.name == 'Jack' || card.name == 'Queen' || card.name == 'King') {
    BlackjackCardScore = 10;
  }
  else if (card.name == 'Ace') {
    BlackjackCardScore = 11;
  }
  else {
    BlackjackCardScore = card.rank;
  }
  return BlackjackCardScore;
};

var shuffledCards = [];
var playerHand = [];
var computerHand = [];
var gameMode = 'start';
var myOutputValue;

// caluclate the score of a card hand irrespective of the number of cards
var handScore = function (handDeck) {
  var counter = 0;
  var handScoreTotal = 0;
  while (counter < handDeck.length) {
    handScoreTotal += cardScore(handDeck[counter]);
    counter += 1;
  }
  return handScoreTotal;
};

// the dealCard function takes a card from fromDeck array to toHand array
var dealCard = function (fromDeck, toHand) {
  var dealtCard = fromDeck.pop();
  toHand.push(dealtCard);
  return toHand;
};

// the function lists down all the cards part of the deck and total score of deck
var showHandInfo = function (deck) {
  var counter = 0;
  var handInfo = '<br> The hand contains ' + deck.length + ' cards, which are: ';
  while (counter < deck.length) {
    handInfo = handInfo + deck[counter].name + ' of ' + deck[counter].suit + ' wih the card score of ' + cardScore(deck[counter]) + ', ';
    counter += 1;
  }
  handInfo = handInfo + ' The total value of hand is: ' + handScore(deck);
  return handInfo;
};

// function to check if the player hand or computer hand
// has hit abover 21 or equal to 21
var checkWinningCondition = function (playerHandExample, computerHandExample) {
  if (gameMode == 'playerTurn' || gameMode == 'start') {
    if (handScore(playerHandExample) > 21) {
      myOutputValue = myOutputValue + '. <br> <br> Since Player hand is greater than 21. Player is bust. Player has lost. <br>';
      gameMode = 'start';
    }
    else if (handScore(playerHandExample) == 21) {
      myOutputValue = myOutputValue + '. <br> <br> Since Player hand score is 21. Player has won the round! <br>';
      gameMode = 'start';
    }
    else if (handScore(playerHand) < 21) {
      myOutputValue = myOutputValue + '<br> <br> Enter hit if you want another card or enter stay if you do not want another card <br>';
      gameMode = 'playerTurn';
    }
  }
  else if (gameMode == 'computerTurn') {
    if (handScore(computerHandExample) > 21) {
      myOutputValue = myOutputValue + '. <br> <br> Since Computer hand is greater than 21. Dealer is bust. Dealer has lost. <br>';
      gameMode = 'start';
    }
  }

  return myOutputValue;
};

// function to compare both player hand and computer hand to recognise the winner
var checkWinner = function (playerHandSpecimen, computerHandSpecimen) {
  if (handScore(playerHandSpecimen) > handScore(computerHandSpecimen)) {
    myOutputValue = myOutputValue + '<br> <br> Player wins because player hand rank is: ' + handScore(playerHandSpecimen) + ' and the computer hand score is: ' + handScore(computerHandSpecimen);
    gameMode = 'start';
  }
  else {
    myOutputValue = myOutputValue + '<br> <br> Computer wins because player hand rank is: ' + handScore(playerHandSpecimen) + ' and the computer hand score is: ' + handScore(computerHandSpecimen);
    gameMode = 'start';
  }
  return myOutputValue;
};

// On submit button being pressed, a card is drawn by computer and player to be compared
var main = function (input) {
  if (gameMode == 'start') {
    // cards created using makeDeck function and then shuffled using shuffleDeck function
    playerHand = [];
    computerHand = [];
    shuffledCards = shuffleDeck(makeDeck());

    // player dealt two cards from shuffledCards and added to the array playerHand
    // var playerCard1 = shuffledCards.pop();
    // playerHand.push(playerCard1);
    // var playerCard2 = shuffledCards.pop();
    // playerHand.push(playerCard2);
    console.log(shuffledCards.length);
    dealCard(shuffledCards, playerHand);
    dealCard(shuffledCards, playerHand);
    console.log(showHandInfo(playerHand));

    // computer is dealt two cards from shuffledCards array to computerHand array
    dealCard(shuffledCards, computerHand);
    dealCard(shuffledCards, computerHand);

    // shows only one card for the dealer
    myOutputValue = 'Player Hand: ' + showHandInfo(playerHand) + '<br> <br> Computer up card: ' + showHandInfo(computerHand.slice(0, 1));

    checkWinningCondition(playerHand, computerHand);
  }
  if (gameMode == 'playerTurn') {
    if (input == 'hit') {
      dealCard(shuffledCards, playerHand);
      myOutputValue = myOutputValue + showHandInfo(playerHand);
      checkWinningCondition(playerHand, computerHand);
    }
    else if (input == 'stay') {
      myOutputValue = myOutputValue + '<br> Player chose stay. Click submit to see dealer turn.<br>';
      gameMode = 'computerTurn';
      return myOutputValue;
    }
  }
  if (gameMode == 'computerTurn') {
    if (handScore(computerHand) > 16) {
      myOutputValue = myOutputValue + '<br> Computer hand: ' + showHandInfo(computerHand) + '<br> Computer chose stay. <br>';
      checkWinningCondition(playerHand, computerHand);
      if (gameMode != 'start') {
        checkWinner(playerHand, computerHand);
      }
    }
    else if (handScore(computerHand) < 17) {
      myOutputValue = myOutputValue + '<br> Computer hand: ' + showHandInfo(computerHand) + '<br> Computer chose hit. <br>';
      dealCard(shuffledCards, computerHand);
      myOutputValue = myOutputValue + showHandInfo(computerHand);
      // check winning condition
      checkWinningCondition(playerHand, computerHand);
      // check winner
      if (gameMode != 'start') {
        checkWinner(playerHand, computerHand);
      }
    }
  }
  return myOutputValue;
};
