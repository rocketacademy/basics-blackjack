/*= =============================================================
=========Global variables=======================================
================================================================ */
var deck = [];
var playerHand = [];
var playerHand2 = [];
var playerHandSumValue = 0;
var playerHand2SumValue = 0;
var computerHandSumValue = 0;
var computerHand = [];

var shuffledDeck = [];

var DEAL_STARTING_HAND = ' deal the starting hand to players';
var CHECK_FOR_SPLIT = ' check for split';
var ANALYSE_HAND = 'analyse hand';
var ANALYSE_HAND2 = 'analyse hand 2';

var subMode = '';
var analyseHand1Completed = ' completed analysing hand 1';
var analyseHand2 = 'start analysing hand 2';
subMode = analyseHand1Completed;

var REVEAL_CARDS = 'reveal cards';
var gameMode = DEAL_STARTING_HAND;
var split = 'split hands';
var subGameMode = '';

/*= =============================================================
=========Helper functions=======================================
================================================================ */

// [Function title]: Make a deck of cards
// make a deck
var makeDeck = function () {
  // create the empty deck at the beginning

  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];
    console.log('current suit : ' + currentSuit);

    // loop to create all cards in this suit
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }
      // set value of picture cards (less ace) to 10
      var blckJckValue = rankCounter;
      if (blckJckValue == 1) {
        blckJckValue = 11;
      } else if (blckJckValue == 11) {
        blckJckValue = 10;
      } else if (blckJckValue == 12) {
        blckJckValue = 10;
      } else if (blckJckValue == 13) {
        blckJckValue = 10;
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        blckJckValue,
      };

      console.log('rank : ' + rankCounter);

      // add the card to the deck
      deck.push(card);

      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return deck;
};
//--------------------------------------------------------------------------------------------------

// [Function title]: Push cards from deck to appropriate player hand
var dealCard = function (chosenHand) {
  return chosenHand.push(shuffledDeck.pop());
};

// [Function title]: calculate current sumValue
var getSumValue = function (chosenHand) {
  var tempChosenHandSumValue = 0;
  // do inital calculation to determine if Ace should be 1 or 0

  // calculation of sumValue
  for (var i = 0; i < chosenHand.length; i += 1) {
    tempChosenHandSumValue = chosenHand[i].blckJckValue + tempChosenHandSumValue;
  }

  for (var j = 0; j < chosenHand.length; j++) {
    while (tempChosenHandSumValue > 21) {
      console.log('temp chosen hand sum value is more than 21');
      if (chosenHand[j].name == 'ace') {
        chosenHand[j].blckJckValue = 1;
      } else {
        return tempChosenHandSumValue;
      }
      for (var i = 0; i < chosenHand.length; i++) {
        tempChosenHandSumValue = chosenHand[i].blckJckValue + tempChosenHandSumValue;
      }
    }
  }
  return tempChosenHandSumValue;
};

// [Function title]: pop from playerHand to playerHand2, then recount sumValue for both hands
var executeSplitDeck = function (firstHand, secondHand) {
  secondHand.push(firstHand.pop());
};
/*----------------------------------------------------------------------------------------------*/

// [Function title]:Shuffle the deck
var shuffleCards = function (deck, lengthOfDeck) {
  for (var i = 0; i < lengthOfDeck; i++) {
    var randomIndex = Math.floor(Math.random() * lengthOfDeck);
    var currentItem = deck[i];
    var randomItem = deck[randomIndex];
    deck[i] = randomItem;
    deck[randomIndex] = currentItem;
  }
  return deck;
};
/*----------------------------------------------------------------------------------------------*/

// [Function title]:Analyse player hand

var analysePlayerHand = function (hand, userInput) {
  var tempSumValue = '';
  var message = '';
  if (userInput == '') {
    console.log('player has chosen to hit');
    dealCard(hand);
    tempSumValue = getSumValue(hand);
    console.log(`temp sum value is ${tempSumValue}`);

    if (tempSumValue > 21) {
      console.log('user\'s input exceeded 21');
      message = `pPlayer, this hand is busted!  You drew a ${hand[hand.length - 1].name} of ${hand[hand.length - 1].suit}, making your hand value ${tempSumValue}. <br> Click 'submit' to restart the game. `;
    } else if (tempSumValue <= 21) {
      console.log('tempSumValue is still below 21');
      var cardDrawn = `${hand[hand.length - 1].name} of ${hand[hand.length - 1].suit}`;
      message = `You drew a ${cardDrawn}. Your hand's value is ${tempSumValue}. Click 'submit' to hit, else type 'stay' to stick with your current number`;
    }
  } else if (userInput == 'stay') {
    console.log('user has decided to stay');
    message = 'Player, you\'ve chosen to stay with your current cards. click submit to continue';
  }

  if (subGameMode == split) {
    gameMode = ANALYSE_HAND2;
  }
  if (subGameMode !== split) {
    gameMode = REVEAL_CARDS;
  }
  return message;
};

/*= =============================================================
=========Commence Main==========================================
================================================================ */

var main = function (input) {
  var message = '';
  var myOutputValue = 'Hello world';
  if (gameMode == DEAL_STARTING_HAND) {
    // initialise all arrays and necssary values to 0;
    playerHand = [];
    playerHandSumValue = 0;
    playerHand2 = [];
    playerHand2SumValue = 0;
    computerHand = [];
    computerHandSumValue = 0;
    // shuffle cards
    shuffledDeck = shuffleCards(makeDeck(), deck.length);

    // deal cards + store in array, alternating btw user and computer
    for (var i = 0; i < 2; i += 1) {
      console.log('before dealing');
      dealCard(playerHand);
      playerHandSumValue = getSumValue(playerHand);
      console.log('after dealing');

      dealCard(computerHand);
      computerHandSumValue = getSumValue(computerHand);
    }

    gameMode = CHECK_FOR_SPLIT;
    console.log(`moving game mode into ${CHECK_FOR_SPLIT}`);
  }

  if (gameMode == CHECK_FOR_SPLIT) {
    console.log(`game mode is ${gameMode}`);

    if (input == 'split') {
      console.log('playerhand [0]] is equls to playerHand [1]');

      console.log('attempting to execute split deck');
      executeSplitDeck(playerHand, playerHand2);
      console.log('splitDeck has been executed');

      // deal one new card to each of players hands
      console.log('dealing a card to player\'s first hand and second hand');
      dealCard(playerHand);
      playerHandSumValue = getSumValue(playerHand);
      console.log('added new card to playerHand; it now contains: ');
      console.log(playerHand);

      dealCard(playerHand2);
      playerHand2SumValue = getSumValue(playerHand2);
      console.log('added new card to playerHand; it now contains: ');
      console.log(playerHand2);

      subGameMode = split;
      gameMode = ANALYSE_HAND;

      return `Player, your first hand contains: ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}.`
          + ` Your second hand contains: ${playerHand2[0].name} of ${playerHand2[0].suit} and ${playerHand2[1].name} of ${playerHand2[1].suit}`
          + '<br> For your first hand, click \'submit\' to hit, else type \'stay\'; ';
    }
    if (input == 'no') {
      gameMode = ANALYSE_HAND;
      return 'You have chosen not to split your hand. Click \'submit\' to hit, else type \'stay\' to stick with the current cards';
    }

    if (playerHand[0].rank == playerHand[1].rank) {
      return 'Would you like to split your hand? If yes, enter \'split\'; else, enter \'no\'';
    }

    // update the playerhandSumValue
    console.log('player hand is ');
    console.log(playerHand);
    console.log('computer hand is ');
    console.log(computerHand);
    myOutputValue = `Player, your hand contains a ${playerHand[0].name} of ${playerHand[0].suit} and  ${playerHand[1].name} of ${playerHand[1].suit}. <br> The value is ${playerHandSumValue}.<br>${message}`;
    gameMode = ANALYSE_HAND;
    return myOutputValue;
  }

  if (gameMode == ANALYSE_HAND) {
    console.log(`game mode is ${gameMode}`);
    // compare sum value of cards in player and computer's hand
    myOutputValue = analysePlayerHand(playerHand, input);
    playerHandSumValue = getSumValue(playerHand);
    if (subGameMode == split) {
      gameMode = ANALYSE_HAND2;
    }
    return myOutputValue;
  }

  if (gameMode == ANALYSE_HAND2) {
    if (subMode == analyseHand1Completed) {
      subMode = analyseHand2;
      console.log(`submode is now ${subMode}`);
      return `It's time to examine your second hand. Your cards are ${playerHand2[0].name} of ${playerHand2[0].suit} and ${playerHand2[1].name} of ${playerHand2[1].suit}<br> click 'submit' to hit, else type 'stay';`;
    }
    if (subMode == analyseHand2) {
      console.log(`submode is ${subMode}`);
      myOutputValue = analysePlayerHand(playerHand2, input);
      playerHand2 = getSumValue(playerHand2);
      gameMode = REVEAL_CARDS;
    }
    return myOutputValue;
  }

  if (gameMode == REVEAL_CARDS) {
    console.log(`gameMode is now ${gameMode}`);
    while ((computerHandSumValue < 17) && (computerHandSumValue <= 21)) {
      console.log('computerHandSumValue is less than 17');
      dealCard(computerHand);
      computerHandSumValue = getSumValue(computerHand);
      console.log(`sum value of computer's hand is ${computerHandSumValue}`);
    }
    if ((playerHandSumValue == 21) || (computerHandSumValue == 21) || (playerHand2SumValue == 21)) {
      // Player hits blackjack and wins
      if ((playerHandSumValue == 21) || (playerHand2SumValue == 21)) {
        console.log('\'Blackjack! player wins!\'');
        myOutputValue = 'Blackjack! player wins!';
      }
      // Computer hits blackjack and win
      if (computerHandSumValue == 21) {
        console.log('\'Blackjack! computer wins!\'');
        myOutputValue = 'Blackjack! computer wins';
      }
      // player win conditions
    } else if (((playerHandSumValue || playerHand2) > computerHandSumValue) || (computerHandSumValue > 21)) {
      myOutputValue = `Player wins! <br>Value of your playing hand: ${playerHandSumValue} <br> Value of computer's playing hand: ${computerHandSumValue}`;
      if (subGameMode == split) {
        myOutputValue = `Player wins! <br>Value of your first hand: ${playerHandSumValue} <br>Value of your second  hand: ${playerHand2SumValue};<br> Value of computer's playing hand: ${computerHandSumValue}`;
      }
    }
    // player lose conditions
    if ((computerHandSumValue > (playerHandSumValue || playerHand2SumValue)) && (computerHandSumValue < 21)) {
      myOutputValue = `Computer wins! <br>Value of your playing hand: ${playerHandSumValue} <br> Value of computer's playing hand: ${computerHandSumValue}`;
      if (subGameMode == split) {
        myOutputValue = `Computer wins! <br>Value of your first hand: ${playerHandSumValue} <br>Value of your second  hand: ${playerHand2SumValue};<br> Value of computer's playing hand: ${computerHandSumValue}`;
      } else if ((playerHandSumValue > 21) && (playerHand2SumValue > 21)) {
        myOutputValue = 'player, you lose! both your hands exceeded 21!';
      }
    } else if (playerHandSumValue == computerHandSumValue) {
      myOutputValue = `it's a tie! <br>Value of your playing hand: ${playerHandSumValue} <br> Value of computer's playing hand ${computerHandSumValue}`;
      // Manage game-ending conditions (Blackjacks)
    }
  }
  gameMode = DEAL_STARTING_HAND;
  myOutputValue = myOutputValue + '<br>Click submit to restart the game';
  return myOutputValue;
};
