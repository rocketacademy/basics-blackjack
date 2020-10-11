var deck = [];
var playerHand = [];
var playerHandSumValue = Number();
var computerHandSumValue = Number();
var computerHand = [];

var shuffledDeck = [];

var dealStartingHand = ' deal the starting hand to players';
var firstRound = 'first round';
var finalRound = 'final round';
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
      if (blckJckValue == 11) {
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

/* // function to push cards from deck to appropriate player hand, then update respective sumValue
var dealCardnUpdateSumValue = function (chosenHand, lengthOfChosenHand, appropriateSumValue) {
  // pop card from deck and put in player/computer's hand

  chosenHand.push(shuffledDeck.pop());
  var newCard = chosenHand[lengthOfChosenHand].name + ' of' + chosenHand[lengthOfChosenHand].suit;
  console.log(`card drawn was ${newCard}`);

  var updatedSumValue = Number();
  // calculate sum value of player/computer's hand
  for (var i = 0; i < chosenHand.length; i++) {
    appropriateSumValue = chosenHand[i].blckJckValue + appropriateSumValue;
  }
  return appropriateSumValue;
}; */

// function to push cards from deck to appropriate player hand, then update respective sumValue
var dealCardToPlayerAndUpdateSumValue = function (chosenHand, lengthOfChosenHand) {
  // pop card from deck and put in player/computer's hand
  chosenHand.push(shuffledDeck.pop());
  var newCard = chosenHand[lengthOfChosenHand].name + ' of' + chosenHand[lengthOfChosenHand].suit;
  console.log(`card drawn was ${newCard}`);
  // calculate sum value of player/computer's hand
  playerHandSumValue = chosenHand[lengthOfChosenHand].blckJckValue + playerHandSumValue;

  return playerHandSumValue;
};
// function to push cards from deck to  computer hand, then update respective sumValue
var dealCardToComputerAndUpdateSumValue = function (chosenHand, lengthOfChosenHand) {
  // pop card from deck and put in player/computer's hand
  chosenHand.push(shuffledDeck.pop());
  var newCard = chosenHand[lengthOfChosenHand].name + ' of' + chosenHand[lengthOfChosenHand].suit;
  console.log(`card drawn was ${newCard}`);

  // calculate sum value of player/computer's hand
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

var main = function (input) {
  var myOutputValue = 'Hello world';
  if (gameMode == dealStartingHand) {
    shuffledDeck = shuffleCards(makeDeck(), deck.length);
    console.log('shuffled deck is ');
    console.log(shuffledDeck);
    // deal cards, one at a time to each user'

    for (var i = 0; i < 2; i++) {
      dealCardToPlayerAndUpdateSumValue(playerHand, playerHand.length);
      dealCardToComputerAndUpdateSumValue(computerHand, computerHand.length);
      // dealCardnUpdateSumValue(computerHand, computerHand.length, computerHandSumValue);
    }
    console.log('player hand is ');
    console.log(playerHand);
    console.log('computer hand is ');
    console.log(computerHand);
    gameMode = firstRound;
    myOutputValue = `Player, you drew a ${playerHand[0].name} of ${playerHand[0].suit} and a a ${playerHand[1].name} of ${playerHand[1].suit}. <br> your hand's value is ${playerHandSumValue} <br> Click 'submit' to hit`;
    return myOutputValue;
  }
  if (gameMode == firstRound) {
    console.log(`game mode is ${gameMode}`);

    // determine sum value of cards in player and computer's hand

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
    console.log(computerHandSumValue);

    if ((playerHandSumValue == 21) || (computerHandSumValue == 21)) {
      if (playerHandSumValue == 21) {
        console.log('\'Blackjack! player wins!\'');
        myOutputValue = 'Blackjack! player wins!';
      }
      if (computerHandSumValue == 21) {
        console.log('\'Blackjack! computer wins!\'');
        myOutputValue = 'Blackjack! computer wins';
      }
    }
    else {
      myOutputValue = `player, the value of your cards is ${playerHandSumValue}; type 'hit' to draw another card, else 'stand' to stick with this value`;
      var PlayerDecision = input;

      if (PlayerDecision == 'hit') {
        playerHand.push(shuffledDeck.pop());
        console.log();// how to record new value in playerhandsumvalue?
      } else if (input == 'stand') {

      }
    }
  }
  return myOutputValue;
};
/*
if (gameMode==dealStartingHand)
* make a deck, shuffle it
*deal 2 cards to each player
* gameMode==firstRound
if (gameMode== firstRound)
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
*/
