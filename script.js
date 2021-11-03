// empty array - for pushing of card obj depending on no. of players
let noOfPlayers = 0;
let playerProfiles = [];
let dealerCards = [];
let deck = [];
let activePlayer = 0;
let gameMode = 'start';
let playerScores = [];

/////////////////
/// MAIN FUNCTION
////////
var main = function (input) {
  if (gameMode === 'start') {
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
  }
  if (gameMode === 'blackJackCheck') {
    // check if cards are blackjack for active player
    // if player's cards are blackjack, output if it is.
    if (activePlayer < playerProfiles.length) {
      if (blackJackCheck(playerProfiles[activePlayer].hand)) {
        playerProfiles[activePlayer].blackjack = 1;
        activePlayer += 1;
        return `Player ${activePlayer + 1} has blackjack!`;
      }
      gameMode = 'hit';
      // FIXME can i remove this return??
      return `Player's cards will be revealed in order. (Player ${
        activePlayer + 1
      } to Player ${playerProfiles.length})`;
    } else if (activePlayer === playerProfiles.length) {
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
    if (blackJackCheck(dealerCards)) {
      let output = `Dealer has a blackjack.`;
      for (const [i, { blackjack }] of playerProfiles.entries()) {
        if (blackjack === 1) {
          output += `<br>Player ${i} did not lose the game as player ${i} has a blackjack.`;
        }
      }
      return output;
    } else {
      // show dealer cards
      let sum = sumOfCards(dealerCards);
      // DOING if dealer cards are less than 17, dealer has to hit
      if (sum < 17) {
      } else {
      }
    }
  }
};

////////
/// MAIN FUNCTION
/////////////////

// check for blackJack
// black jack = ace + 10/picture cards (max 2 cards)
const blackJackCheck = function (hand) {
  if (hand.length === 2 && sumOfCards(hand) === 21) {
    return true;
  } else {
    return false;
  }
};

// what does the active player do?
// TODO refactor code in !input and input
const hitOrStand = function (input) {
  // show cards for the active player
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
  // TODO if cards are >2 and sum >21, end active player turn
  if (input) {
    input = input.toLowerCase();
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
        return `Dealer's turn.`;
      }
      gameMode = 'blackJackCheck';
      return `Next player's turn.`;
    }
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
      playerName: `player${i}`,
      hand: [],
      blackjack: 0,
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

// -----> BUG //
