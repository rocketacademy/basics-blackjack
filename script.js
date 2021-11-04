let noOfPlayers = 0;
let playerProfiles = [];
let dealerCards = [];
let deck = [];
let activePlayer = 0;
let gameMode = 'start';
let roundsPlayed = 0;

const inputEl = document.querySelector('#input-field');
const newGameBtn = document.querySelector('.new-game');
const outputEl = document.querySelector('#output-div');
const scoreboardEl = document.querySelector('#scoreboard-data');

/* TODO
add DOM elements for:
1. New game button (done)
2. Track wins of each player
*/

// DOM --->
// press 'enter' to submit
inputEl.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    document.querySelector('#submit-button').click();
  }
  newGameBtn.addEventListener('click', function () {
    newGame();
  });
});

// <--- DOM

/*
dynamic scoretable to track each player's win/loss
1. scoretable is created when amt of players are input
2. scoretable is updated at the end of each round

scoretable to contain:
<player name> = win: <>, draw: <>, loss: <>
**can use spread operator
*/

/////////////////
/// MAIN FUNCTION
////////
var main = function (input) {
  if (gameMode === 'start') {
    inputEl.placeholder = 'Follow instructions in the output.';
    // logic for 1st round of every game
    if (roundsPlayed === 0) {
      if (input >= 1) {
        noOfPlayers = input;
        newUserProfile(noOfPlayers);
        dealCards(noOfPlayers);
        // next game mode
        gameMode = 'blackJackCheck';
        return `Cards have been dealt to the ${noOfPlayers} players.`;
      } else if (!noOfPlayers) {
        return `Please enter the number of player(s) playing. (at least 1)`;
      }
      // logic for every round after 1st round
    } else {
      activePlayer = 0;
      resetCards();
      dealCards(noOfPlayers);
      // next game mode
      gameMode = 'blackJackCheck';
      return `Cards have been dealt to the ${noOfPlayers} players again.`;
    }
  }
  if (gameMode === 'blackJackCheck') {
    scoreboardEl.textContent = outputScoreboardData();
    // check if cards are blackjack for active player
    // if player's cards are blackjack, output if it is.
    if (activePlayer < playerProfiles.length) {
      if (blackJackCheck(playerProfiles[activePlayer].hand)) {
        playerProfiles[activePlayer].blackjack = 1;
        let output = `Player ${activePlayer + 1} has blackjack!`;
        activePlayer += 1;
        return output;
      }
      gameMode = 'hit';
      // FIXME can i remove this return??
      inputEl.placeholder = 'Follow instructions in the output.';
      return `Player's cards will be revealed in order. (Player ${
        activePlayer + 1
      } of Player ${playerProfiles.length})`;
    } else if (activePlayer === playerProfiles.length) {
      gameMode = 'dealerTurn';
      return `Dealer's turn.`;
    }
  }
  // if card is not blackjack, ask player to hit or stand
  else if (gameMode === 'hit') {
    return hitOrStand(input);
  }
  // dealer logic below
  // if dealer has blackjack, check if anyone else has blackjack and they won't lose the game.
  if (gameMode === 'dealerTurn') {
    inputEl.placeholder = 'Follow instructions in the output.';
    if (blackJackCheck(dealerCards)) {
      //  if dealer has blackjack, check if anyone else has blackjack, else everyone loses.
      let output = `Dealer has a blackjack.`;
      for (const [i, { playerName, blackjack }] of playerProfiles.entries()) {
        if (blackjack === 1) {
          output += `<br>${playerName} did not lose the game as ${playerName} has a blackjack.`;
        }
        if (!blackjack) {
          output += `<br>${playerName} lost the game as ${playerName} did not have a blackjack.`;
        }
      }
      roundsPlayed += 1;
      return `${output}<br> Starting next round.`;
    } else {
      // show dealer cards
      // if dealer cards are less than 17, dealer has to hit, max hand size = 5
      let sum = sumOfCards(dealerCards);
      for (let i = 0; dealerCards.length <= 5; i++) {
        if (sum < 17) {
          dealerCards.push(deck.pop());
          sum = sumOfCards(dealerCards);
          console.log(`After drawing, dealer's hand is ${sum}`);
        } else {
          gameMode = 'checkResults';
          console.log(`Dealer's final hand is ${sum}`);
          inputEl.placeholder = 'Click submit.';
          return `Dealer has finished his turn.`;
        }
      }
    }
  }
  if (gameMode === 'checkResults') {
    /*
  if no blackjack, compare dealer's cards with all.
    -- if dealer > 21, anyone > 21 draw, anyone < 21 win.
  */ sumOfEachPlayerCards();
    let dealerCardSum = sumOfCards(dealerCards);
    if (dealerCardSum > 21) {
      let output = `Dealer's cards are more than 21.<br>`;
      for (const [i, { playerName, sumOfCards }] of playerProfiles.entries()) {
        if (sumOfCards > 21) {
          output += `${playerName} is safe.<br>`;
          playerProfiles[i].draw += 1;
        } else {
          output += `${playerName} won!<br>`;
          playerProfiles[i].win += 1;
        }
      }
      gameMode = 'start';
      scoreboardEl.textContent = outputScoreboardData();
      return output;
    }
    // -- same => draw; > dealer => win; < dealer => lose
    else if (dealerCardSum <= 21) {
      let output = `The sum of the dealer's cards are: ${dealerCardSum}.<br>`;
      for (const [i, { playerName, sumOfCards }] of playerProfiles.entries()) {
        if (dealerCardSum === sumOfCards) {
          output += `${playerName} has the same cards as the dealer.<br>`;
          playerProfiles[i].draw += 1;
        } else if (dealerCardSum > sumOfCards) {
          output += `${playerName} lost to the dealer with ${sumOfCards}.<br>`;
          playerProfiles[i].loss += 1;
        } else if (sumOfCards > 21) {
          output += `${playerName} lost by going over 21.<br>`;
          playerProfiles[i].loss += 1;
        } else if (dealerCardSum < sumOfCards && sumOfCards <= 21) {
          output += `${playerName} won the dealer with ${sumOfCards}.<br>`;
          playerProfiles[i].win += 1;
        }
      }
      gameMode = 'start';
      return output;
    }
  }
  roundsPlayed += 1;
  scoreboardEl.textContent = outputScoreboardData();
  return `Starting next round!`;
};
////////
/// MAIN FUNCTION
/////////////////

//
const outputScoreboardData = function () {
  let output = '';
  for (let [i, { playerName, win, loss, draw }] of playerProfiles.entries()) {
    output += `${playerName} -> win: ${win}, draw: ${draw}, loss: ${loss}.\r\n`;
  }
  return output;
};

const resetCards = function () {
  dealerCards = [];
  for (let i = 0; i < playerProfiles.length; i++) {
    playerProfiles[i].hand = [];
  }
};

// check for blackJack
// black jack = ace + 10/picture cards (max 2 cards)
const blackJackCheck = function (hand) {
  if (hand.length === 2 && sumOfCards(hand) === 21) {
    return true;
  } else {
    return false;
  }
};

const sumOfEachPlayerCards = function () {
  // loop through each player's hand, add new object sum for total
  for (const [i, { hand }] of playerProfiles.entries()) {
    let sum = sumOfCards(hand);
    playerProfiles[i].sumOfCards = sum;
  }
};

// what does the active player do?
// TODO refactor code in !input and input
const hitOrStand = function (input) {
  // show cards for the active player
  inputEl.placeholder = `Type 'Hit' or 'Stand' and submit.`;
  if (!input) {
    // give option to hit or stand
    let hand = playerProfiles[activePlayer].hand;
    let sumOfCurrCards = sumOfCards(hand);
    let outputStr = `Player ${
      activePlayer + 1
    } has these cards in hand, please enter 'Hit' or 'Stand':`;
    for (let i = 0; i < hand.length; i++) {
      outputStr += `<br> ${hand[i].name} of ${hand[i].suit}.`;
    }
    outputStr += `<br><br>Sum of cards: ${sumOfCurrCards}`;
    // add score into player object.
    playerProfiles[activePlayer].cardSum = sumOfCurrCards;
    return outputStr;
  }
  // if input is true, check for hit / stand
  input = input.toLowerCase();
  if (typeof input === 'string') {
    if (input === 'hit') {
      // draw a new card
      playerProfiles[activePlayer].hand.push(deck.pop());
      let hand = playerProfiles[activePlayer].hand;
      let sumOfCurrCards = sumOfCards(hand);
      let outputStr = `Player ${
        activePlayer + 1
      } has these cards in hand, please enter 'Hit' or 'Stand':`;
      for (let i = 0; i < hand.length; i++) {
        if (i === hand.length - 1) {
          outputStr += `<br> ${hand[i].name} of ${hand[i].suit}. (drawn)`;
        } else {
          outputStr += `<br> ${hand[i].name} of ${hand[i].suit}.`;
        }
      }
      outputStr += `<br><br>Sum of cards: ${sumOfCurrCards}`;
      // add score into player object.
      playerProfiles[activePlayer].cardSum = sumOfCurrCards;

      return outputStr;
    }
    if (input === 'stand') {
      // go to next player
      activePlayer += 1;
      if (activePlayer === playerProfiles.length) {
        gameMode = 'dealerTurn';
        inputEl.placeholder = 'Click submit.';
        return `Dealer's turn.`;
      }
      gameMode = 'blackJackCheck';
      inputEl.placeholder = 'Follow instructions in the output.';
      return `Next player's turn.`;
    }
  }
  // prevent output from changing if input is not hit or stand
  if (input !== 'hit' || input !== 'stand') {
    return zzz;
  }
};

const sumOfCards = function (hand) {
  let sum = 0;
  let aceCards = 0;
  // 2 to 10 = amount, 1 = 11, 11 to 13 = 10
  // return sum amount
  for (let i = 0; i < hand.length; i++) {
    let currentCard = hand[i];
    // numbered cards
    if (currentCard.rank >= 2 && currentCard.rank <= 10) {
      sum += currentCard.rank;
      // picture cards
    } else if (currentCard.rank >= 11 && currentCard.rank <= 13) {
      sum += 10;
      // ace card
    } else if (currentCard.rank === 1) {
      sum += 11;
      aceCards += 1;
    }
  }
  // if sum amount is >21 and if there are ace cards, convert ace to 1
  if (sum > 21 && aceCards >= 1) {
    for (let i = 0; i < aceCards; i++) {
      sum -= 10;
      aceCards -= 1;
      if (sum <= 21) {
        break;
      }
    }
  }
  return sum;
};

// dealing cards
const dealCards = (players) => {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < players; j++) {
      // deal cards to each player
      playerProfiles[j].hand.push(deck.pop());
    }
    dealerCards.push(deck.pop());
  }
};
// create user profile
const newUserProfile = function () {
  for (let i = 0; i < noOfPlayers; i++) {
    playerProfiles.push({
      playerName: `Player ${i + 1}`,
      hand: [],
      blackjack: 0,
      win: 0,
      loss: 0,
      draw: 0,
    });
  }
};
// generate deck
const deckGenerator = function () {
  const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
  // loop 1
  // loop over the suits
  for (let i = 0; i < suits.length; i += 1) {
    let suitName = suits[i];
    // loop 2
    // loop over the ranks
    for (let j = 1; j < 14; j += 1) {
      cardName = j;
      if (j === 1) {
        cardName = 'ace';
      } else if (j === 11) {
        cardName = 'jack';
      } else if (j === 12) {
        cardName = 'queen';
      } else if (j === 13) {
        cardName = 'king';
      }
      newDeck = {
        name: cardName,
        suit: suitName,
        rank: j,
      };
      deck.push(newDeck);
    }
  }
  shuffleDeck();
  return deck;
};
// shuffle deck
const shuffleDeck = () => {
  for (let [index] of deck.entries()) {
    let randomNumber = randomNumberGenerator(deck.length);
    let currentCard = deck[index];
    let randomCard = deck[randomNumber];
    deck[index] = randomCard;
    deck[randomNumber] = currentCard;
  }
  return deck;
};
// generate a random number based on deck size
const randomNumberGenerator = (deckLength) => {
  return Math.floor(Math.random() * deckLength);
};
// create and shuffle deck
deck = deckGenerator();

const newGame = function () {
  noOfPlayers = 0;
  playerProfiles = [];
  dealerCards = [];
  deck = [];
  activePlayer = 0;
  gameMode = 'start';
  roundsPlayed = 0;
  outputEl.textContent = '';
  scoreboardEl.textContent = 'Start playing! 🃏';
  inputEl.placeholder = 'Press submit to start the game.';
};

// -----> BUG //
