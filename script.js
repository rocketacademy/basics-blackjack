// Global variables
var deck = [];
var playerHand = [];
var playerHandSumValue = Number();
var computerHandSumValue = Number();
var computerHand = [];

var shuffledDeck = [];

var dealStartingHand = ' deal the starting hand to players';
var playerAnalyseHand = 'round for player to analyse his hand and make decisions wrt hitting or staying';
var revealCards = 'round where player and computer reveal their cards';
var gameMode = dealStartingHand;

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

// Function title: Function to push cards from deck to appropriate player hand, then update respective sumValue
var dealCardToPlayerAndUpdateSumValue = function (chosenHand, lengthOfChosenHand) {
  // pop card from deck and put in player/computer's hand
  chosenHand.push(shuffledDeck.pop());
  var newCard = chosenHand[lengthOfChosenHand].name + ' of' + chosenHand[lengthOfChosenHand].suit;
  console.log(`card drawn was ${newCard}`);

  // if the drawn card is an Ace, its value will be reduced to 1 if playerHandSumValue>21
  if ((chosenHand[lengthOfChosenHand].name == 'ace') && (playerHandSumValue + chosenHand[lengthOfChosenHand].blckJckValue > 21)) {
    chosenHand[lengthOfChosenHand].blckJckValue = 1;
  }
  // else if card drawn is not an ace, but its value will cause player to exceed 21, then previously drawn aces will be counted as 1.
  if ((playerHandSumValue + chosenHand[lengthOfChosenHand].blckJckValue) > 21) {
    for (var i = 0; i < lengthOfChosenHand; i++) {
      if ((chosenHand[i].name == 'ace') && (playerHandSumValue > 21)) {
        chosenHand[i].blckJckValue = 1;
        playerHandSumValue = playerHandSumValue - 10;// this updates the playerHandSumValue since the value in the hand is now reduced by 10 (i.e. 11-1)
      }
    }
  }// calculate sum value of player's hand
  playerHandSumValue = chosenHand[lengthOfChosenHand].blckJckValue + playerHandSumValue;

  return playerHandSumValue;
};
// Function title: function to push cards from deck to  computer hand, then update respective sumValue
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
};

// generate random Index
var getRandomIndex = function (lengthOfDeck) {
  var randomDecimal = Math.random() * lengthOfDeck;
  var randomIndex = Math.floor(randomDecimal);
  return randomIndex;
};

// shuffle the deck
var shuffleCards = function (deck, lengthOfDeck) {
  for (var i = 0; i < lengthOfDeck; i++) {
    var randomIndex = getRandomIndex(lengthOfDeck);
    var currentItem = deck[i];
    var randomItem = deck[randomIndex];
    deck[i] = randomItem;
    deck[randomIndex] = currentItem;
  }
  return deck;
};

var getAceValue = function (userInput) {
  var aceValue = Number();
  if (userInput == 1) {
    aceValue = 1;
  }
  else if (userInput == 11) {
    aceValue = 11;
  }
  playerHand[playerHand.length - 1].blckJckValue = aceValue;
};
// searh player's hand for an ace, return 0 if true, 1 if false;
for (var i = 0; i < playerHand.length; i++) {
  if (playerHand[i].name == 'ace') {
    blckJckValue = userInput;
  }
}

var main = function (input) {
  var myOutputValue = 'Hello world';
  if (gameMode == dealStartingHand) {
    // initialise all arrays and necssary values to 0;
    playerHand = [];
    playerHandSumValue = 0;
    computerHand = [];
    computerHandSumValue = 0;

    // shuffle cards
    shuffledDeck = shuffleCards(makeDeck(), deck.length);
    /* [completed]: check to see if deck is shuffled correctly
      *console.log('shuffled deck is ');
      *console.log(shuffledDeck); */

    // deal cards + store in array, alternating btw user and computer
    for (var i = 0; i < 2; i++) {
      dealCardToPlayerAndUpdateSumValue(playerHand, playerHand.length);
      dealCardToComputerAndUpdateSumValue(computerHand, computerHand.length);
    }

    // if player hand contains an Ace, get his input on what the value should be
    // update the playerhandSumValue
    console.log('player hand is ');
    console.log(playerHand);
    console.log('computer hand is ');
    console.log(computerHand);
    gameMode = playerAnalyseHand;
    myOutputValue = `Player, you drew a ${playerHand[0].name} of ${playerHand[0].suit} and a a ${playerHand[1].name} of ${playerHand[1].suit}. <br> your hand's value is ${playerHandSumValue} <br> Click 'submit' to hit`;

    return myOutputValue;
  }
  if (gameMode == playerAnalyseHand) {
    console.log(`game mode is ${gameMode}`);

    // compare sum value of cards in player and computer's hand
    console.log(`playerHandSumValue is  ${playerHandSumValue}`);
    console.log(`computerHandSumValue is  ${computerHandSumValue}`);

    // Manage player's actions (i.e. stay vs hit)
    // if player inputs 'stay', change game mode to final round
    if (input == 'stay') {
      console.log('user has decided to stay');
      gameMode = revealCards;
      return 'Player, you\'ve chosen to stay with your current cards. click submit to continue';

      // if player clicks inputs '', draw a card for him and update his array
    } if (input == '') {
      console.log('player has chosen to hit');
      dealCardToPlayerAndUpdateSumValue(playerHand, playerHand.length);
    }

    // Manage game-ending conditions (player exceeds 21)
    if (playerHandSumValue > 21) {
      console.log('user\'s input exceeded 21');
      gameMode = dealStartingHand;
      return `player, you lose!  You drew a ${playerHand[playerHand.length - 1].name} of ${playerHand[playerHand.length - 1].suit}, making your hand value ${playerHandSumValue}. <br> Click 'submit' to restart the game. `;
    }
    if (playerHandSumValue <= 21) {
      console.log('user input is still below 21');
      var cardDrawn = `${playerHand[playerHand.length - 1].name} of ${playerHand[playerHand.length - 1].suit}`;
      return `You drew a ${cardDrawn}. Your hand's value is ${playerHandSumValue}. Click 'submit' to hit, else type 'stay' to stick with your current number`;
    }
  }
  if (gameMode == revealCards) {
    console.log(`gameMode is now ${gameMode}`);
    while ((computerHandSumValue < 17) && (computerHandSumValue <= 21)) {
      console.log('computerHandSumValue is less than 17');
      dealCardToComputerAndUpdateSumValue(computerHand, computerHand.length);
      console.log(`sum value of computer's hand is ${computerHandSumValue}`);
    }
    if (playerHandSumValue == computerHandSumValue) {
      myOutputValue = `it's a tie! <br>Value of your playing hand: ${playerHandSumValue} <br> Value of computer's playing hand ${computerHandSumValue}`;

      // Manage game-ending conditions (Blackjacks)
    } else if ((playerHandSumValue == 21) || (computerHandSumValue == 21)) {
      // Player hits blackjack and wins
      if (playerHandSumValue == 21) {
        console.log('\'Blackjack! player wins!\'');
        myOutputValue = 'Blackjack! player wins!';
      }
      // Computer hits blackjack and win
      if (computerHandSumValue == 21) {
        console.log('\'Blackjack! computer wins!\'');
        myOutputValue = 'Blackjack! computer wins';
      }
      // player win conditions
    } else if ((playerHandSumValue > computerHandSumValue) || (computerHandSumValue > 21)) {
      myOutputValue = `Player wins! <br>Value of your playing hand: ${playerHandSumValue} <br> Value of computer's playing hand: ${computerHandSumValue}`;
    }
    // player lose conditions
    if ((computerHandSumValue > playerHandSumValue) && (computerHandSumValue < 21)) {
      myOutputValue = `Computer wins! <br>Value of your playing hand: ${playerHandSumValue} <br> Value of computer's playing hand: ${computerHandSumValue}`;
    }
  }
  gameMode = dealStartingHand;
  myOutputValue = myOutputValue + '<br>Click submit to restart the game';
  return myOutputValue;
};
/*
if (gameMode==dealStartingHand)
* make a deck, shuffle it
*deal 2 cards to each player
* gameMode==playerAnalyseHand
if (gameMode== playerAnalyseHand)
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
