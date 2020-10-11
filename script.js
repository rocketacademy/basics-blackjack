// =================================================================================
// ========== GLOBAL VARIABLES =====================================================
// =================================================================================

// overall game stats
var round = 0;
var numOfHands = 2; // total no of hands playing (incl dealer)

// card arrays
var deck = [];
var player1stHand = [];
var player2ndHand = [];
var dealerHand = [];

// sums of cards
var player1stSum = 0;
var player2ndSum = 0;
var dealerSum = 0;

// player modes
var PLAYER = 'Player';
var DEALER = 'Dealer';
var whoIsPlaying = PLAYER; // default to player first, cos dealer always go last

// split or not
var HAND_1 = 'Hand 1';
var HAND_2 = 'Hand 2';
var hand = ''; // Default blank means no split of hands

// game modes
var START_GAME = 'START_GAME';
var ASK_SPLIT = 'ASK_SPLIT';
var SPLIT = 'SPLIT';
var KICKOFF = 'KICKOFF';
var HIT = 'HIT';
var STAND = 'STAND';
var DEALER_TURN = 'DEALER_TURN';
var CONCLUDE = 'CONCLUDE';
var END_OF_ROUND = 'END_OF_ROUND';
var gameMode = START_GAME;

// =================================================================================
// ========== HELPER FUNCTIONS  ====================================================
// =================================================================================

// reset variables for new round
var reset = function () {
  // overall game stats
  numOfHands = 2;

  // card arrays
  player1stHand = [];
  player2ndHand = [];
  dealerHand = [];

  // sums of cards
  player1stSum = 0;
  player2ndSum = 0;
  dealerSum = 0;

  // player modes
  whoIsPlaying = PLAYER;
  hand = '';

  // game modes
  gameMode = START_GAME;
};
// ------------------------------------------------
// create a new deck of cards
var makeDeck = function () {
  var newdeck = [];
  var suitsArray = ['spades', 'hearts', 'diamonds', 'clubs'];

  var counter1 = 0;
  while (counter1 < suitsArray.length) {
    var currSuit = suitsArray[counter1];
    // console.log('................................suit - ' + currSuit);

    var counter2 = 1;
    while (counter2 <= 13) {
      var currName = counter2;

      if (currName == 1) {
        currName = 'Ace';
      } else if (currName == 11) {
        currName = 'Jack';
      } else if (currName == 12) {
        currName = 'Queen';
      } else if (currName == 13) {
        currName = 'King';
      }

      var card = {
        name: currName,
        suit: currSuit,
        rank: counter2,
      };

      // console.log('new card');
      // console.log(card);

      newdeck.push(card);
      counter2 += 1;
    }
    counter1 += 1;
  }
  // console.log('new deck');
  // console.log(newdeck);
  return newdeck;
};
// ------------------------------------------------
// shuffle deck of cards
var shuffleDeck = function () {
  var counter = 0;
  while (counter < 52) {
    var currCard = deck[counter];

    var randomNum = Math.floor(Math.random() * 52);
    var randomCard = deck[randomNum];

    deck[counter] = randomCard;
    deck[randomNum] = currCard;

    counter += 1;
  }
  // console.log('shuffled deck');
  // console.log(deck);
};
// ------------------------------------------------
// displays the cards in an array
var displayCards = function () {
  // pull out the correct card array (ok since we will only read but not modify the array)
  var array = dealerHand;

  if (whoIsPlaying == PLAYER) {
    if (hand == HAND_2) {
      array = player2ndHand;
    } else {
      array = player1stHand;
    }
  }

  // create message using above array
  var message = '';

  var counter = 0;
  while (counter < array.length) {
    message = `${message} ${array[counter].name} of ${array[counter].suit} <br>`;
    counter += 1;
  }

  return message;
};
// ------------------------------------------------
// calculate best possible sum for the cards & update global variables for sums
var sumUpCards = function () {
  // STEP 1 - choose player or dealer array
  // pull out the correct card array (ok since we will only read but not modify the array)
  var array = dealerHand;

  if (whoIsPlaying == PLAYER) {
    if (hand == HAND_2) {
      array = player2ndHand;
    } else {
      array = player1stHand;
    }
  }

  // STEP 2 - declare local variables
  var score = 0; // best sum of cards
  var min = 0; // lower sum based on all Aces == 1
  var max = 0; // higher sum based on only 1 Ace == 11
  var numOfAce = 0; // total num of Aces in array

  // STEP 3 - sum up cards (EXclude any Aces)
  var counter = 0;
  while (counter < array.length) {
    var x = Number(array[counter].rank); // read rank of each card in array

    if (x >= 2 && x <= 10) { // cards rank 2-9 -> use face value
      score = score + x;
    } else if (x > 10) { // cards rank 10-13 -> add 10 per card
      score = score + 10;
    } else if (x == 1) { // Aces -> just calculate num of Ace cards for now
      numOfAce += 1;
    }
    counter += 1;
  }

  // STEP 4 - if there are Aces, create 2 possible scores & decide on 1
  // .....should never consider 2 Aces as both 11 as it will bust
  // ......0-4 Aces possible - either consider 0 Ace as 11 / consider 1 ace as 11
  // ......consider 0 Ace as 11 - add numOfAce
  // ......consider 1 Ace as 11 - add (numOfAce-1)+11 ie add numOfAce +10
  if (numOfAce > 0) {
    min = score + numOfAce; // min score when Aces present
    max = score + numOfAce + 10; // max score when Aces present

    // now choose to use min or max as the best score
    if (min == 21 || max == 21) { // if any black jack
      score = 21;
    } else if (min > 21) { // if both bust (min bust means max also bust)
      // need chk this more limiting cond b4 chk if only 1 bust
      // also ensure use 'else if' iso 'if' for remaining conditions
      score = min; // show the lower score to prove even the lower score bust
    } else if (max > 21) { // if only the max score bust, use the min score
      score = min;
    } else { // if both never bust, use the Higher score
      score = max;
    }
  }
  console.log('CALCULATING.......');
  console.log('min ' + min);
  console.log('max ' + max);
  console.log('final score ' + score);

  // STEP 5 - update global variables for final sums
  dealerSum = score;

  if (whoIsPlaying == PLAYER) {
    if (hand == HAND_2) {
      player2ndSum = score;
    } else {
      player1stSum = score;
    }
  }

  // STEP 6 - return the sum
  return score;
};

// ------------------------------------------------
// generate message for player if blackjack/bust
var msgBJackOrBust = function (sum) {
  // player is out of game if blackjack/bust
  // therefore update num of hands left in the game (note this num incl dealer)
  numOfHands = numOfHands - 1;

  // *********CASE 1************
  // if only dealer left, round is over

  if (numOfHands == 1) {
    gameMode = END_OF_ROUND;

    // tag on this message to below winning/losing message to end the round
    var message = `<br><br> No more player hands left to play. This is the end of round ${round}.
          <br><br> Click to start another round. Or enter 'end' to exit the game.`;

    // winning message if blackjack
    if (sum == 21) {
      return ` <br><br> BLACKJACK! You won! Congrats! ${message}`;
    }

    // losing message if bust
    return `<br><br> ....you have BUST! Its ok, try again next time....${message}`;
  }

  // *********CASE 2************
  // otherwise continue with the round
  // end this turn and go to next turn

  gameMode = STAND; // go to next turn

  // winning message if blackjack
  if (sum == 21) {
    return '<br><br> BLACKJACK! You won! Congrats! <br><br> Click submit to exit your turn.';
  }

  // losing message if bust
  return '<br><br> ....you have BUST! Its ok, try again next time....<br><br> Click submit to exit your turn.';
};
// ------------------------------------------------
// generate message for player if win/lose
var msgWinLose = function (playersum) {
  var message = `<br><br>Your cards add up to: ${playersum}`;

  if (playersum > dealerSum) {
    message = `${message} <br><br> You WIN! Congrats!`;
  } else {
    message = `${message} <br><br> You LOST! It's ok, try again next time!`;
  }
  return message;
};
// =================================================================================
// ========= MAIN FUNCTION =========================================================
// =================================================================================

var main = function (input) {
  // ************* DECLARE LOCAL VARIABLES ********************

  var sum = 0; // temp store sum for cards
  var message = '';

  // ************* PROCESSING USER INPUTS *********************

  // note placement eg we asked for input "yes" or 'no' in ASK_SPLIT mode
  // so code must put b4 ASK_SPLIT's if cond (else ASK_SPLIT will run b4 we can change the game mode
  if (input == 'yes') {
    gameMode = SPLIT;
    hand = HAND_1;
    numOfHands += 1;
    return 'You have decided to SPLIT your hand. <br><br> Click submit to create your 2 new hands!';
  }

  if (input == 'no') {
    gameMode = KICKOFF;
    return 'You have chosen NOT to split. <br><br>Click submit to continue.';
  }

  // use player's choice to hit or stand to directly go into the correct game mode
  // will go directly to run HIT/STAND modes since there is no Return inserted here to end code run
  if (input == 'hit') {
    gameMode = HIT;
  }

  if (input == 'stand') {
    gameMode = STAND;
  }

  // if player chooses to end the whole game
  if (input == 'end') {
    reset();
    round = 0;
    return 'Thanks for playing! Hope to see you again!';
  }

  // ************* VARIOUS GAME MODES ***********************

  // create and shuffle deck.......deal 2 cards each
  if (gameMode == START_GAME) {
    round += 1;
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ROUND ' + round);

    // create & shuffle deck
    deck = makeDeck();
    shuffleDeck();

    console.log(deck);

    // deal 2 cards each
    player1stHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];

    console.log('-----START GAME --------------');
    console.log('player1stHand');
    console.log(player1stHand);
    console.log('dealerHand');
    console.log(dealerHand);

    // for testing split case & also caln of Aces by creating 2 Aces
    player1stHand[0] = {
      name: 'Ace',
      rank: 1,
      suit: 'testA',
    };
    player1stHand[1] = {
      name: 'Ace',
      rank: 1,
      suit: 'testB',
    };
    console.log('TEST for SPLIT - player1stHand');
    console.log(player1stHand);

    // update game mode to run to next stage KICKOFF
    // but if player's cards are same rank then go to ASK_SPLIT mode to ask if want to split
    gameMode = KICKOFF; // position this before the if cond below else any setting to ASK_SPLIT will get overridden

    if (player1stHand[0].rank == player1stHand[1].rank) {
      gameMode = ASK_SPLIT;
    }

    return `Welcome to Round ${round} ! <br><br>Player shall go first. <br><br>Click submit to view your 2 cards. Good luck!`;
  }

  // ------------------------------------------------
  // ask player if want to split
  if (gameMode == ASK_SPLIT) {
    return `${whoIsPlaying}, <br><br>You have drawn 2 cards of the same rank: :<br> ${displayCards()}
    <br> Please enter 'yes' or 'no' and click submit.
    <br><br> If you enter 'yes', we will split your cards into 2 seperate hands and deal each hand 1 more card each.
    So you can play 2 hands and have 2 chances to win!
    <br><br> If you enter 'no', you can play your current hand as usual.`;
  }

  // ------------------------------------------------
  // split player's original hand into 2 seperate hands and deal a new card to each hand
  if (gameMode == SPLIT) {
    var firstCard = player1stHand[0];
    var secondCard = player1stHand[1];
    player1stHand = [firstCard, deck.pop()];
    player2ndHand = [secondCard, deck.pop()];

    console.log('-----SPLIT--------------');
    console.log('player1stHand');
    console.log(player1stHand);
    console.log('player2ndHand');
    console.log(player2ndHand);

    // display the 2 new hands
    var show1stHand = displayCards();
    hand = HAND_2; // temp revert to HAND_2 to display correct cards in 'show2ndHand' below
    var show2ndHand = displayCards();
    hand = HAND_1; // revert back to HAND_1

    gameMode = KICKOFF;

    return `Your 2 hands are: <br><br> First Hand: <br>${show1stHand} <br><br> Second Hand: <br>${show2ndHand}
    <br><br>Please click submit to start with your FIRST hand.`;
  }

  // ------------------------------------------------
  // display and sum up 1st 2 cards for player
  // check for blackjack (not possible to bust)
  // ask player to hit or stand
  if (gameMode == KICKOFF) {
    console.log('-----KICKOFF--------------');

    sum = sumUpCards();

    console.log('player1stSum');
    console.log(player1stSum);
    console.log('player2ndSum');
    console.log(player2ndSum);

    message = `${whoIsPlaying} ${hand}: 
    <br><br>You have drawn:<br> ${displayCards()}
    <br> The cards add up to: <br> ${sum}`;

    // Check for BLACK JACK (here not possible to BUST)
    if (sum == 21) {
      return `${message} ${msgBJackOrBust(sum)}`;
    }

    // if never black jack then ask player to hit or stand
    return `${message} <br><br> Enter 'hit' to draw 1 more card. <br> Or enter 'stand' to end your turn.`;
  }

  // ------------------------------------------------
  // deal 1 card....display & sum all cards...chk blackjack/bust...ask player hit/stand
  if (gameMode == HIT) {
    // deal a new card
    var newCard = deck.pop();

    if (hand == HAND_2) {
      player2ndHand.push(newCard);
    } else {
      player1stHand.push(newCard);
    }

    console.log('-----HIT--------------');
    console.log('player1stHand');
    console.log(player1stHand);
    console.log('player2ndHand');
    console.log(player2ndHand);

    // calculate sum
    sum = sumUpCards();

    console.log('player1stSum');
    console.log(player1stSum);
    console.log('player2ndSum');
    console.log(player2ndSum);

    // basic message to display cards and sum
    message = `${whoIsPlaying} ${hand}: , 
    <br><br>1 more card has been drawn - ${newCard.name} of ${newCard.suit}.
    <br> Here are all the cards:<br> ${displayCards()}
    <br> The cards add up to: ${sum}`;

    // check for BLACK JACK or BUST
    if (sum >= 21) {
      return `${message} ${msgBJackOrBust(sum)}`;
    }

    // if never BLACKJACK/BUST then ask player to HIT/STAND
    return `${message} <br><br> Enter 'hit' to draw 1 more card.
    <br> Or enter 'stand' to end your turn.`;
  }

  // ------------------------------------------------
  // player chose to stand so start next turn
  // in this case the next turn is either player's hand 2 (if there is one) or dealer's turn
  if (gameMode == STAND) {
    // go to hand 2 only if player split earlier and has completed hand 1
    if (hand == HAND_1) {
      gameMode = KICKOFF;
      hand = HAND_2;
      return 'You have completed your 1st hand. <br><br>Please click submit to start your SECOND hand.';
    }

    // otherwise its dealer's turn
    whoIsPlaying = DEALER;
    gameMode = DEALER_TURN;
    return 'It is now dealer\'s turn. Click submit to continue.';
  }

  // ------------------------------------------------
  // display cards & sum of dealer & auto deal so long as sum < 17 & check for blackjack/bust
  if (gameMode == DEALER_TURN) {
    console.log('-----DEALER TURN--------------');

    sum = sumUpCards();

    // display dealer's 1st two cards
    message = `${whoIsPlaying} has drawn:<br> ${displayCards()}
    <br> The cards add up to: <br> ${sum} <br>`;

    // deal automatically if sum < 17
    while (sum < 17) {
      var dealerCard = deck.pop();
      dealerHand.push(dealerCard);
      message = `${message}<br> Sum ${sum} less than 17, so a new card is drawn:
      <br> ${dealerCard.name} of ${dealerCard.suit}`;
      sum = sumUpCards();
    }

    console.log('dealerHand');
    console.log(dealerHand);
    console.log('dealerSum');
    console.log(dealerSum);

    // check for BLACK JACK
    if (sum == 21) {
      gameMode = END_OF_ROUND;
      return `${message} <br><br> Sum is ${sum} - BLACKJACK! Dealer won!
      <br><br> Sorry you have all lost...Click to start another round. Or enter 'end' to exit the game.`;
    }

    // check for BUST
    if (sum > 21) {
      gameMode = END_OF_ROUND;
      return `${message} <br><br> Sum is ${sum} - BUST! Dealer lost!
      <br><br> YOU HAVE WON!...Click to start another round. Or enter 'end' to exit the game.`;
    }

    // If never BLACKJACK/BUST then go conclude mode to see who won
    gameMode = CONCLUDE;

    return `${message} <br><br> Since sum is ${sum} which is 17 or more, dealer shall end turn.
    <br><br> Here are all the dealer's cards:<br> ${displayCards()}
    <br><br> 'Let's see the results. Click submit to continue.`;
  }

  // ------------------------------------------------
  // if player and dealer both never blackjack/bust then reach this mode
  // compare the sums - player wins only if higher sum than dealer (no tie)
  if (gameMode == CONCLUDE) {
    message = `Dealer's cards add up to ${dealerSum}`;

    // FIRST case - display for 1st hand if it has not blackjack/bust (ie < 21)
    if (player1stSum < 21) {
      var name = '';

      // address player properly - add 'hand 1' if player opted to split earlier
      if (hand == '') {
        name = 'Player';
      } else {
        name = 'Player Hand 1';
      }

      message = `${message} <br><br> ${name}: ${msgWinLose(player1stSum)}`;
    }

    // SECOND CASE - display for 2nd hand only if there is one & has not blackjack/bust (ie < 21)
    if (player2ndSum < 21 && hand == HAND_2) {
      message = `${message} <br><br> ${whoIsPlaying} ${hand}: ${msgWinLose(player2ndSum)}`;
    }

    gameMode = END_OF_ROUND;

    // final addition to message to continue or end game
    return `${message} <br><br> This is the end of round ${round}. Click to start another round. Or enter 'end' to exit the game.`;
  }

  // ------------------------------------------------
  // if player chooses to play aonther round, reset game variables
  if (gameMode == END_OF_ROUND) {
    reset();

    return 'Let\'s start a new round! Click to continue!';
  }
};
