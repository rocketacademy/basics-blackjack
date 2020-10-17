/*
if (gameMode==DEAL_STARTING_HAND
* make a deck, shuffle it
*deal 2 cards to each player
* gameMode==ANALYSE_HAND
if (gameMode== ANALYSE_HAND)
* if player has 21, win; if computer has 21, win.
* Else /if either player != 21{
  * let player decide to take any amt of cards by clicking submit. (i.e. if input=='', deal card to player)
  * if input == 'stand', {gamemode= final}
    * return}
  * else if player cards >21
      * gameMode=final
  *   * return Busted!
*if (gameMode==final)
  * compare ranks of all cards;
  * winning condition:
    * if player1 >21, player 2 wins
    * if player2 >21, player 1 wins
    * if player 1  sum of rank is (<=21) AND (>player 2 sum of rank): player 1 wins
    * if player 2  sum of rank is (<=21) AND (>player 1 sum of rank): player 2 wins
    for (var i = 0; i < playerHand.length; i++) {
  console.log(`value of card at iteration ${i} is `);
  console.log(playerHand[i].blckJckValue);
  playerHandSumValue = playerHand[i].blckJckValue + playerHandSumValue;
}
console.log('sum value of cards in player 1 hand is');
console.log(playerHandSumValue);
for (var i = 0; i < computerHand.length; i++) {
  console.log(`value of card at iteration ${i} is `);
  console.log(computerHand[i].blckJckValue);
  computerHandSumValue = computerHand[i].blckJckValue + computerHandSumValue;
}
console.log('sum value of cards in computer\'s hand is');
console.log(computerHandSumValue); */
/*
player lose conditions
1. exceed 21;
2. computer is larger than player, and still under 21.
3. computer gets backjack */

/*
// Function title: Push cards from deck to  computer hand, then update respective sumValue
var dealCardToComputerAndUpdateSumValue = function (chosenHand, lengthOfChosenHand) {
  // pop card from deck and put in player/computer's hand
  chosenHand.push(shuffledDeck.pop());
  var newCard = chosenHand[lengthOfChosenHand].name + ' of' + chosenHand[lengthOfChosenHand].suit;
  console.log(`card drawn was ${newCard}`);
  // if the drawn card is an Ace, its value will be reduced to 1 if computerHandSumValue>21
  if ((chosenHand[lengthOfChosenHand].name == 'ace') && (computerHandSumValue + chosenHand[lengthOfChosenHand].blckJckValue > 21)) {
    chosenHand[lengthOfChosenHand].blckJckValue = 1;
  }
  // else if card drawn is not an ace, but its value will cause player to exceed 21, then previously drawn aces will be counted as 1.
  if ((computerHandSumValue + chosenHand[lengthOfChosenHand].blckJckValue) > 21) {
    for (var i = 0; i < lengthOfChosenHand; i++) {
      if ((chosenHand[i].name == 'ace') && (computerHandSumValue > 21)) {
        chosenHand[i].blckJckValue = 1;
        computerHandSumValue = computerHandSumValue - 10;// this updates the computerHandSumValue since the value in the hand is now reduced by 10 (i.e. 11-1)
      }
    }
  }// calculate sum value of computer's hand
  computerHandSumValue = chosenHand[lengthOfChosenHand].blckJckValue + computerHandSumValue;
  return computerHandSumValue;
}; */

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
var CHECK_FOR_SPLIT = '';
var ANALYSE_HAND = 'analyse hand';
var ANALYSE_HAND2 = 'analyse hand 2';

var REVEAL_CARDS = 'reveal cards';
var gameMode = DEAL_STARTING_HAND;
var split = 'split hands';
var completedSplit = 'completed splitting';
var subGameMode = '';
/*----------------------------------------------------------------*/

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
        for (var i = 0; i < chosenHand.length; i++) {
          tempChosenHandSumValue = chosenHand[i].blckJckValue + tempChosenHandSumValue;
        }
      } else {
        return tempChosenHandSumValue;
      }
    }
  }
  return tempChosenHandSumValue;
};
/*
// [Function title]: Push cards from deck to appropriate player hand, then update  sumValue
var dealCardAndUpdateSumValue = function (chosenHand, chosenHandSumValue) {
  // pop card from deck and put in player/computer's hand
  chosenHand.push(shuffledDeck.pop());
  var newCard = chosenHand[chosenHand.length - 1].name + ' of' + chosenHand[chosenHand.length - 1].suit;
  console.log(`card drawn was ${newCard}`);

  // if the drawn card is an Ace, its value will be reduced to 1 if playerHandSumValue>21
  if ((chosenHand[chosenHand.length - 1].name == 'ace') && (chosenHandSumValue + chosenHand[chosenHand.length - 1].blckJckValue > 21)) {
    chosenHand[chosenHand.length - 1].blckJckValue = 1;
  }
  // else if card drawn is not an ace, but its value will cause player to exceed 21, then previously drawn aces will be counted as 1.
  if ((chosenHandSumValue + chosenHand[chosenHand.length - 1].blckJckValue) > 21) {
    for (var i = 0; i < chosenHand.length; i++) {
      if ((chosenHand[i].name == 'ace') && (chosenHandSumValue > 21)) {
        chosenHand[i].blckJckValue = 1;
      }
    }
  }// re-calculate chosenHandSumValue]
  var updatedChosenHandSumValue = 0;
  for (var i = 0; i < chosenHand.length; i++) {
    updatedChosenHandSumValue = chosenHand[i].blckJckValue + updatedChosenHandSumValue;
  }
  return updatedChosenHandSumValue;
}; */
/*--------------------------------------------------------------------------------------------------*/

// [Function title]: pop from playerHand to playerHand2, then recount sumValue for both hands
var executeSplitDeck = function (firstHand, secondHand) {
  secondHand.push(firstHand.pop());
};

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
/* var analysePlayerHand = function (splitHand, splitHandSumValue, userInput) {
  var myOutputValue = '';
  var message = '';
  if (userInput == '') {
    console.log('player has chosen to hit');
    tempSplitHandSumValue = dealCardAndUpdateSumValue(splitHand, splitHandSumValue);
  }
  if (userInput == 'stay') {
    console.log('user has decided to stay');
    if (subGameMode == split) {
      message = `for hand 1; <br>your second hand contains: ${playerHand2[0].name} of ${playerHand2[0].suit} and ${playerHand2[1].name} of ${playerHand2[1].suit} <br> click 'submit' to hit, else 'stay' to stick with these cards`;
    } gameMode = REVEAL_CARDS;
    myOutputValue = 'Player, you\'ve chosen to stay with your current cards' + message;
    // if player clicks inputs '', draw a card for him and update his array
  }
  // Manage game-ending conditions (player exceeds 21)
  if (splitHandSumValue > 21) {
    console.log('user\'s input exceeded 21');
    gameMode = DEAL_STARTING_HAND;
    myOutputValue = `player, you lose!  You drew a ${splitHand[splitHand.length - 1].name} of ${splitHand[splitHand.length - 1].suit}, making your hand value ${splitHandSumValue}. <br> Click 'submit' to restart the game. `;
  }
  if (splitHandSumValue <= 21) {
    console.log('splitHandSumValue is still below 21');
    var cardDrawn = `${splitHand[splitHand.length - 1].name} of ${splitHand[splitHand.length - 1].suit}`;
    myOutputValue = `You drew a ${cardDrawn}. Your hand's value is ${splitHandSumValue}. Click 'submit' to hit, else type 'stay' to stick with your current number`;
  }
  return myOutputValue;
};
*/
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
      gameMode = DEAL_STARTING_HAND;
      message = `player, you lose!  You drew a ${playerHand[playerHand.length - 1].name} of ${playerHand[playerHand.length - 1].suit}, making your hand value ${tempSumValue}. <br> Click 'submit' to restart the game. `;
    } else if (tempSumValue <= 21) {
      console.log('tempSumValue is still below 21');
      var cardDrawn = `${playerHand[playerHand.length - 1].name} of ${playerHand[playerHand.length - 1].suit}`;
      message = `You drew a ${cardDrawn}. Your hand's value is ${tempSumValue}. Click 'submit' to hit, else type 'stay' to stick with your current number`;
    }
  } else if (userInput == 'stay') {
    console.log('user has decided to stay');
    gameMode = REVEAL_CARDS;
    return 'Player, you\'ve chosen to stay with your current cards. click submit to continue';
  // if player clicks inputs '', draw a card for him and update his array
  }
  // Manage game-ending conditions (player exceeds 21)

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
  }

  if (gameMode == CHECK_FOR_SPLIT) {
    if (playerHand[0].rank == playerHand[1].rank) {
      if (input == 'split') {
        executeSplitDeck(playerHand, playerHand2);
        console.log('splitDeck has been executed');

        // deal one new card to each of players hands
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
          + `your second hand contains: ${playerHand2[0].name} of ${playerHand2[0].suit} and ${playerHand2[1].name} of ${playerHand2[1].suit}`
          + 'For your first hand, enter \'hit\', else \'stay\'; ';
      } if (input == 'no') {
        gameMode = ANALYSE_HAND;
        message = '<br>You have chosen not to split your hand. Click \'submit\' to hit, else type \'stay\' to stick with the current cards';
      } else {
        message = 'Would you like to split your hand? If yes, enter \'split\'; else, enter \'no\'';
      }
    } else {
      message = 'click \'submit\' to hit, else type \'stay\' to stick with the current cards';
    }

    // update the playerhandSumValue
    console.log('player hand is ');
    console.log(playerHand);
    console.log('computer hand is ');
    console.log(computerHand);
    myOutputValue = `Player, your hand contains a ${playerHand[0].name} of ${playerHand[0].suit} and  ${playerHand[1].name} of ${playerHand[1].suit}. <br> Your hand's value is ${playerHandSumValue}.` + `<br>${message}`;
    gameMode = ANALYSE_HAND;
    return myOutputValue;
  }

  if (gameMode == ANALYSE_HAND) {
    console.log(`game mode is ${gameMode}`);
    // compare sum value of cards in player and computer's hand
    console.log(`playerHandSumValue is  ${playerHandSumValue}`);
    console.log(`computerHandSumValue is  ${computerHandSumValue}`);
    // Manage player's actions (i.e. stay vs hit)
    // if player inputs 'stay', change game mode to final round

    myOutputValue = analysePlayerHand(playerHand, input);
    playerHandSumValue = getSumValue(playerHand);
  }

  if ((gameMode == ANALYSE_HAND2) && (subGameMode == ANALYSE_HAND2)) {
    console.log(`game mode is ${gameMode}`);
    // compare sum value of cards in player and computer's hand
    myOutputValue = analysePlayerHand(playerHand2, input);
    playerHandSumValue = getSumValue(playerHand2);
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
