// =================================================================================.
// =================================================================================
// ========== GLOBAL VARIABLES =====================================================
// =================================================================================
// =================================================================================

// RESET FOR EACH NEW GAME
var round = 0;
var numOfPlayers = 0; // total no of players (EXclude dealer)
var playerNames = ['Dealer']; // array for player names - position 0 is 'dealer' so player 1 takes position 1, player 2 position 2 etc

// RESET FOR EACH NEW ROUND
var deck = [];
var playerHandsLeft = 0; // player hands now playing (EXclude dealer).. +1 for split; -1 if BJ/Bust
var whichPlayer = 1; // which player - to use as index for playerNames array

// STATS FOR EACH HAND
var gameStats = []; // array (each hand as 1 object) - if split, 2 objects (2 hands) for same player
var index = 0; // which position in gameStats array
var currHand = ''; // for each player hand currently playing, this uses above index to get the correct object in gameStats array
// 'hand' attribute in object in gameStats array - if split, set as HAND_1 / HAND_2 (iso default '')
var HAND_1 = 'Hand 1';
var HAND_2 = 'Hand 2';

// GAME MODES
var START_GAME = 'START_GAME'; // for each new round; main action is to create and shuffle deck
var DEAL_PLAYER_INIT_CARDS = 'DEAL_PLAYER_INIT_CARDS'; // for each player; main action is to deal 2 cards & chk if same rank
var ASK_SPLIT = 'ASK_SPLIT'; // this is activated if first 2 cards are of equal rank
var SPLIT = 'SPLIT'; // split into 2 hands for player
var KICKOFF = 'KICKOFF'; // this displays first 2 cards dealt, check blackjack & ask player to hit/stand
var HIT = 'HIT'; // deal 1 new card, check blackjack/bust, else ask player to hit/stand
var STAND = 'STAND'; // go on to player's 2nd hand OR to next player OR to dealer
var DEALER_TURN = 'DEALER_TURN';
var CONCLUDE = 'CONCLUDE'; // determine win/lose for player hands still remaining (ie have not blackjack/bust)
var END_OF_ROUND = 'END_OF_ROUND'; // reset relevant global variables for the next round
var gameMode = START_GAME;

// =================================================================================
// =================================================================================
// ========== HELPER FUNCTIONS  ====================================================
// =================================================================================
// =================================================================================

// reset variables for new round
var reset = function () {
  playerHandsLeft = 0;
  whichPlayer = 1;

  gameStats = [];
  index = 0;
  currHand = '';

  gameMode = START_GAME;
};

// -------------------------------------------------------------------------

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

// -------------------------------------------------------------------------

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
  // console.log('shuffled');
  // console.log(deck);
};

// -------------------------------------------------------------------------

// displays the cards in an array
var displayCards = function () {
  // pull out the correct card array (ok since we will only read but not modify the array)
  var array = currHand.cards;

  // create message using above array
  var message = '';

  var counter = 0;
  while (counter < array.length) {
    message = `${message} ${array[counter].name} of ${array[counter].suit} <br>`;
    counter += 1;
  }

  return message;
};

// -------------------------------------------------------------------------

// calculate best possible sum for the cards & update gameStats array
var sumUpCards = function () {
  // STEP 1 - pull out the correct card array (ok since we will only read but not modify the array)
  var array = currHand.cards;

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

  // STEP 5 - update gameStats array
  currHand.cardSum = score;

  // STEP 6 - return the sum
  return score;
};

// -------------------------------------------------------------------------

// generate message for player if blackjack/bust
// update status of the hand to 'Blackjack' or 'Bust' inside gameStats array
// also update playerHandsLeft
// then go to next hand or end round
var msgBJackOrBust = function (sum) {
  var message = '';

  // if bust
  currHand.status = 'Bust';
  message = '<br><br> ....you have BUST! Its ok, try again next time....';

  // if blackjack
  if (sum == 21) {
    currHand.status = 'Blackjack';
    message = '<br><br> BLACKJACK! You won! Congrats!';
  }

  // next, remaining steps determine if continue round or not

  // player is out of game if blackjack/bust
  // therefore update num of hands left in the game (note this num excludes dealer)
  playerHandsLeft -= 1;
  console.log('Due to Blackjack / Bust - playerHandsLeft');
  console.log(playerHandsLeft);

  // CASE 1 - continue with the round (go to STAND for next player hand / dealer)
  gameMode = STAND;

  // CASE 2 - end this round if everyone blackjack/bust so no more player hands left
  if (playerHandsLeft == 0) {
    gameMode = END_OF_ROUND;
    return `${message} <br><br> No more player hands left to play. This is the end of round ${round}.
          <br><br> Click to start another round. Or enter 'end' to exit the game.`;
  }

  return `${message} <br><br> Click submit to exit your turn.`;
};

// -------------------------------------------------------------------------

// generate message for player whether win/lose/tie versus dealer
var msgWinLose = function (playersum) {
  var message = `<br>Your cards add up to: ${playersum}.`;
  var dealerCardSum = gameStats[0].cardSum;

  if (playersum > dealerCardSum) {
    message = `${message} <br> You WIN! Congrats!`;
  } else if (playersum < dealerCardSum) {
    message = `${message} <br> You LOST! It's ok, try again next time!`;
  } else {
    message = `${message} <br> Its a TIE! Not bad!`;
  }

  return message;
};

// =================================================================================
// =================================================================================
// ========= MAIN FUNCTION =========================================================
// =================================================================================
// =================================================================================

var main = function (input) {
  // @@@@@@@@@@@@@ DECLARE LOCAL VARIABLES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  var sum = 0; // temp store sum for cards
  var message = '';

  // @@@@@@@@@@@@@ PROCESSING USER INPUTS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  // note placement eg we asked for input "yes" or 'no' in ASK_SPLIT mode
  // so code must put b4 ASK_SPLIT's if cond (else ASK_SPLIT will run b4 we change the game mode)
  if (input == 'yes') {
    gameMode = SPLIT;
    return 'You have decided to SPLIT your hand. <br><br> Click submit to create your 2 new hands!';
  }

  if (input == 'no') {
    gameMode = KICKOFF;
    return 'You have chosen NOT to split. <br><br>Click submit to continue.';
  }

  // -------------------------------------------------------------------------

  // if player chose 'stand' then directly go into the STAND game mode
  // STAND mode will directly run after this since there is no Return inserted here to end code run
  if (input == 'stand') {
    gameMode = STAND;
  }

  // -------------------------------------------------------------------------

  // if player chooses to end the whole game, reset everything to initial default values
  if (input == 'end') {
    reset();

    // STATS FOR EACH GAME
    round = 0;
    numOfPlayers = 0;
    playerNames = ['Dealer'];

    return 'Thanks for playing! Hope to see you again! <br><br> And if you wish to play again, just enter the number of players and click submit.';
  }

  // @@@@@@@@@@@@@ VARIOUS GAME MODES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  // START_GAME
  // this runs for each new ROUND
  // if it is a also new GAME - also update num of players
  // update round & reset playerHandsLeft
  // create and shuffle deck.......deal 2 cards for dealer...ask player 1 to start
  if (gameMode == START_GAME) {
    // CASE 1 - NEW GAME
    /// below 2 steps only take place at start of a New GAME

    // 1. input validation at start of game for total no of players
    if (round == 0 && !(input >= 1)) {
      return 'Please enter a numerical figure for the total number of players and click submit.';
    }

    // 2. update no of players at start of game
    if (round == 0) {
      numOfPlayers = Number(input);
    }

    // CASE 2 - NEW ROUND
    // below steps all take place at start of every New ROUND in the game

    // update the round number & no of hands (before any split) for current round
    round += 1;
    playerHandsLeft = numOfPlayers; // total no of player hands (before any split option)

    // create & shuffle deck
    deck = makeDeck();
    shuffleDeck();
    // check - why below line cannot work?
    // deck = shuffleDeck(makeDeck());

    console.log('****************************************** ROUND ' + round);
    console.log(deck);
    console.log('playerHandsLeft');
    console.log(playerHandsLeft);

    // deal 2 cards....create and store initial stats for dealer
    var dealerStats = {
      who: 'Dealer',
      nameindex: '',
      hand: '',
      status: 'Playing',
      cards: [deck.pop(), deck.pop()],
      cardSum: 0,
    };

    gameStats.push(dealerStats);

    console.log('gameStats');
    console.log(gameStats);

    // update next game mode...output a message for player 1 to proceed
    gameMode = DEAL_PLAYER_INIT_CARDS;

    if (round == 1) {
      message = 'Player 1 shall go first. <br><br> But first, please enter your NAME and click submit.';
    } else {
      message = `${playerNames[1]} (Player 1) shall go first. <br><br>Click submit to view your 2 cards. Good luck!`;
    }

    return `Welcome all ${numOfPlayers} players! <br><br> This is Round ${round} <br><br> ${message}`;
  }

  // -------------------------------------------------------------------------

  // DEAL_PLAYER_INIT_CARDS
  // this runs for each PLAYER
  // if it is a also new GAME - also store player's name
  // deal 2 cards for player......update index & currHand
  // check if the 2 cards are same rank - if yes go to SPLIT
  // otherwise go to KICKOFF game mode
  if (gameMode == DEAL_PLAYER_INIT_CARDS) {
    console.log('**************************** DEAL_PLAYER_INTT_CARDS');

    // store player's name in very 1st round
    // note - player 1 asked to submit name in START_GAME
    // while remaining players asked to submit name in STAND
    if (round == 1) {
      if (input == '') {
        return 'Please enter your name and click submit.';
      }
      var name = input;
      playerNames.push(name);
    }

    // deal 2 cards....create and store initial stats for player
    var playerStats = {
      who: 'Player ' + whichPlayer,
      nameindex: whichPlayer,
      hand: '',
      status: 'Playing',
      cards: [deck.pop(), deck.pop()],
      cardSum: 0,
    };

    gameStats.push(playerStats);

    // update currHand (and index) only after creating object
    // otherwise currHand will be 'undefined'
    // this is done to pull out correct object in gameStats array
    index += 1;
    currHand = gameStats[index];

    // player 1 only - for testing split case & also caln of Aces by creating 2 Aces
    if (whichPlayer == 1) { // added this if cond, else code will run everytime this game mode runs
      gameStats[1].cards[0] = {
        name: 'Ace',
        rank: 1,
        suit: 'testA',
      };
      gameStats[1].cards[1] = {
        name: 'Ace',
        rank: 1,
        suit: 'testB',
      };
    }

    console.log('whichPlayer');
    console.log(whichPlayer);
    console.log('playerNames');
    console.log(playerNames);
    console.log('index');
    console.log(index);
    console.log('currHand');
    console.log(currHand);
    console.log('gameStats');
    console.log(gameStats);

    // update game mode to direct go KICKOFF (put b4 IF so it dosen't override game mode fr IF cond)
    // but if player's cards are of same rank then directly enter ASK_SPLIT to ask if want to split
    gameMode = KICKOFF;

    if (currHand.cards[0].rank == currHand.cards[1].rank) {
      gameMode = ASK_SPLIT;
    }
  }

  // -------------------------------------------------------------------------

  // ASK_SPLIT
  // ask player if want to split
  if (gameMode == ASK_SPLIT) {
    console.log('**************************** ASK_SPLIT');
    return `Hi ${playerNames[whichPlayer]} (${currHand.who}), <br><br>You have drawn 2 cards of the same rank: <br> ${displayCards()}
    <br> Enter 'yes' or 'no' and click submit.
    <br><br> If you enter 'yes', we will split your cards into 2 seperate hands and deal each hand 1 more card.
    <br>So you can play 2 hands and have 2 chances to win!
    <br><br> If you enter 'no', you can play your current hand as usual.`;
  }

  // -------------------------------------------------------------------------

  // SPLIT
  // split player's original hand into 2 seperate hands and deal a new card to each hand
  // update playerHandsLeft
  // display cards and ask player to proceed to play the 1st hand
  if (gameMode == SPLIT) {
    console.log('**************************** SPLIT');

    // STEP 1 - SPLIT INTO 2 HANDS

    var orig1stCard = currHand.cards[0];
    var orig2ndCard = currHand.cards[1];

    // update the current details in gameStats array
    currHand.hand = HAND_1; // iso '', update as the 1st hand from the split
    currHand.cards = [orig1stCard, deck.pop()]; // use the 1st card dealt + deal 1 more card

    // add hand no 2 from the splitting as the next item in gameStats array
    var secondHand = {
      who: 'Player ' + whichPlayer,
      nameindex: whichPlayer,
      hand: HAND_2, // 2nd hand from the split
      status: 'Playing',
      cards: [orig2ndCard, deck.pop()], // use 2nd card dealt previously + deal 1 more card
      cardSum: 0,
    };

    gameStats.push(secondHand);

    console.log('gameStats');
    console.log(gameStats);

    // STEP 2 - DISPLAY THE 2 NEW HANDS & UPDATE GAME VARIABLES

    // temp update index & currHand
    // this is to pull out next item for display (ie the newly added hand 2 for this player)
    index += 1;
    currHand = gameStats[index];
    var show2ndHand = displayCards();

    // revert index & currHand back to previous (ie hand 1 for this player)
    // pull out hand 1 for display
    index -= 1;
    currHand = gameStats[index];
    var show1stHand = displayCards();

    playerHandsLeft += 1; // add 1 since spliiting adds an additional player hand to the game
    console.log('playerHandsLeft');
    console.log(playerHandsLeft);

    gameMode = KICKOFF;

    return `${playerNames[whichPlayer]} (${currHand.who}): <br><br>Your 2 hands are: 
    <br><br> First Hand: <br>${show1stHand} <br><br> Second Hand: <br>${show2ndHand}
    <br><br>Please click submit to start with your FIRST hand.`;
  }

  // -------------------------------------------------------------------------

  // KICKOFF
  // display and sum up 1st 2 cards for player
  // check for blackjack (not possible to bust)
  // ask player to hit or stand
  if (gameMode == KICKOFF) {
    console.log('**************************** KICKOFF for Round ' + round + ' for ' + currHand.who + '(' + currHand.hand + ')');

    sum = sumUpCards();

    console.log('gameStats');
    console.log(gameStats);

    message = `Hi ${playerNames[whichPlayer]} (${currHand.who}) ${currHand.hand}: 
    <br><br>You have drawn:<br> ${displayCards()}
    <br> The cards add up to: ${sum}`;

    // Check for BLACK JACK (here not possible to BUST)
    if (sum == 21) {
      return `${message} ${msgBJackOrBust(sum)}`;
    }

    // game will proceed to HIT unless player enter "stand"
    gameMode = HIT;

    // if never black jack then ask player to hit or stand
    return `${message} <br><br> Click submit to draw 1 more card ('hit'). <br> Or enter 'stand' and submit to end your turn.`;
  }

  // -------------------------------------------------------------------------

  // HIT
  // deal 1 card....display & sum all cards
  // chk blackjack/bust...else ask player hit/stand
  if (gameMode == HIT) {
    console.log('**************************** HIT');

    // deal a new card
    var newCard = deck.pop();
    currHand.cards.push(newCard);

    // calculate sum
    sum = sumUpCards();

    console.log('gameStats');
    console.log(gameStats);

    // basic message to display cards and sum
    message = `${playerNames[whichPlayer]} (${currHand.who}) ${currHand.hand}: 
    <br><br>1 more card has been drawn - ${newCard.name} of ${newCard.suit}.
    <br> Here are all the cards:<br> ${displayCards()}
    <br> The cards add up to: ${sum}`;

    // check for BLACK JACK or BUST
    if (sum >= 21) {
      return `${message} ${msgBJackOrBust(sum)}`;
    }

    // if never BLACKJACK/BUST then ask player to HIT/STAND
    // game will continue in HIT unless player enters "stand"
    return `${message} <br><br> Click submit to draw 1 more card ('hit').
    <br> Or enter 'stand' and submit to end your turn.`;
  }

  // -------------------------------------------------------------------------

  // STAND
  // player chose to stand so start next turn
  // this can be same player's 2nd hand, or next player, or dealer
  if (gameMode == STAND) {
    console.log('**************************** STAND');

    // CASE 1
    // if there is a 2nd hand remaining for the same player, just go to 2nd hand
    if (currHand.hand == HAND_1) {
      gameMode = KICKOFF;
      index += 1;
      currHand = gameStats[index];
      return 'You have completed your 1st hand. <br><br>Please click submit to start your SECOND hand.';
    }

    // CASE 2
    // if this is NOT YET the last player, go to next player's turn
    // note - index & currHand updated in DEAL_PLAYER_INIT_CARDS
    // ie after deal cards & create object in gameStats array else currHand will return 'undefined'
    if (whichPlayer != numOfPlayers) {
      gameMode = DEAL_PLAYER_INIT_CARDS;
      whichPlayer += 1; // update which player is now going to be dealt his/her first 2 cards

      if (round == 1) { // ask for player's name only if round 1
        return `It is now Player ${whichPlayer}'s turn. <br><br> But first, please enter your name and click submit.`;
      }

      return `It is now ${playerNames[whichPlayer]} (Player ${whichPlayer})'s turn. Click submit to continue.`;
    }

    // CASE 3
    // otherwise its the dealer's turn
    gameMode = DEALER_TURN;
    index = 0; // dealer is first position in gameStats array
    currHand = gameStats[index];
    return 'It is now dealer\'s turn. Click submit to continue.';
  }

  // -------------------------------------------------------------------------

  // DEALER_TURN
  // display cards & sum of dealer & auto deal so long as sum < 17
  // check for blackjack/bust...otherwise go to CONCLUDE to see who win/lost
  if (gameMode == DEALER_TURN) {
    console.log('**************************** DEALER TURN');

    sum = sumUpCards();

    // display dealer's 1st two cards
    message = `Dealer has drawn:<br> ${displayCards()}
      <br> The cards add up to: <br> ${sum} <br>`;

    // deal automatically if sum < 17
    while (sum < 17) {
      var dealerCard = deck.pop();
      currHand.cards.push(dealerCard);
      message = `${message}<br> Sum ${sum} is less than 17, so a new card is drawn:
        <br> ${dealerCard.name} of ${dealerCard.suit}`;
      sum = sumUpCards();
    }

    console.log('gameStats');
    console.log(gameStats);

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
      <br><br> Congrats you have all WON!...Click to start another round. Or enter 'end' to exit the game.`;
    }

    // If never BLACKJACK/BUST then go conclude mode to see who won
    gameMode = CONCLUDE;

    return `${message} <br><br> Since sum ${sum} is 17 or more, dealer shall end turn.
      <br><br> Here are all the dealer's cards:<br> ${displayCards()}
      <br><br> 'Let's see the results. Click submit to continue.`;
  }

  // -------------------------------------------------------------------------

  // CONCLUDE
  // if player(s) and dealer both never blackjack/bust then reach this mode
  // compare and decide win/lose... ask if continue next round/end game
  if (gameMode == CONCLUDE) {
    console.log('**************************** CONCLUDE');
    console.log('playerNames');
    console.log(playerNames);
    console.log('gameStats');
    console.log(gameStats);

    message = `Dealer's cards add up to ${gameStats[0].cardSum}`;

    // display win/lose for each player hand that has not yet blackjack/bust
    // counter starts at 1 - no need to consider dealer stats at position 0 in gameStats array
    var counter = 1;
    while (counter < gameStats.length) { // note gameStats.length includes dealer
      var thisHand = gameStats[counter];
      if (thisHand.status == 'Playing') {
        message = `${message} <br><br> ${playerNames[thisHand.nameindex]} (${thisHand.who}) ${thisHand.hand}: ${msgWinLose(thisHand.cardSum)}`;
      }
      counter += 1;
    }

    gameMode = END_OF_ROUND;

    // final addition to message to continue or end game
    return `${message} <br><br> This is the end of round ${round}. Click to start another round. Or enter 'end' to exit the game.`;
  }

  // -------------------------------------------------------------------------

  // gameMode == END_OF_ROUND
  // if player chooses to play another round, reset global variables for the round
  if (gameMode == END_OF_ROUND) {
    console.log('**************************** END_OF_ROUND');

    reset();

    return 'Let\'s start a new round! Click to continue!';
  }
};
