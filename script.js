///////////////
// Constants //
///////////////

const HEARTS = "hearts";
const DIAMONDS = "diamonds";
const CLUBS = "clubs";
const SPADES = "spades";
const INPUT_PLAYERS = "input players";
const INPUT_NAMES = "input names";
const INPUT_BETS = "input bets";
const BLACKJACK = "blackjack";
const COLOUR_1 = "#3700B3";
const COLOUR_2 = "#018786";
const COLOUR_3 = "#B00020";

//////////////////////
// Global Variables //
//////////////////////
let gameMode = INPUT_PLAYERS;
let numOfPlayers = 0;
const playerBoard = [];

//////////////////////
// Helper Functions //
//////////////////////

/**
 * ------------------------------------------------------------------------
 * Creates a 52 card deck.
 * Each card has the following properties.
 * [name]   2, 3, ... , J, Q, K, A
 * [suit]   Hearts, Diamonds, Clubs, Spades
 * [emoji]  Emoji of the suit.
 * [value]  Value of each card in Blackjack.
 * @return  {Array}       A deck grouped by suits and ordered from 2 to Ace.
 * ------------------------------------------------------------------------
 */
function createDeck() {
  var cardDeck = [];
  var suits = [HEARTS, DIAMONDS, CLUBS, SPADES];

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    var currentSuit = suits[suitIndex];

    for (var rankCounter = 2; rankCounter <= 14; rankCounter += 1) {
      var cardName = rankCounter;
      var cardValue = rankCounter;
      var suitEmoji;

      switch (cardName) {
        case 11:
          cardName = "J";
          cardValue = 10;
          break;
        case 12:
          cardName = "Q";
          cardValue = 10;
          break;
        case 13:
          cardName = "K";
          cardValue = 10;
          break;
        case 14:
          cardName = "A";
          cardValue = 11;
          break;
      }

      switch (currentSuit) {
        case HEARTS:
          suitEmoji = "♥";
          break;
        case DIAMONDS:
          suitEmoji = "♦";
          break;
        case CLUBS:
          suitEmoji = "♣";
          break;
        case SPADES:
          suitEmoji = "♠";
          break;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        display: `${cardName} ${suitEmoji}`,
        value: cardValue,
      };

      cardDeck.push(card);
    }
  }
  return cardDeck;
}

/**
 * ------------------------------------------------------------------------
 * A random index ranging from 0 (inclusive) to max (exclusive).
 * @param   {Number}    max     The maximum of the random number to be generated.
 * @return  {Number}            A random index.
 * ------------------------------------------------------------------------
 */
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

/**
 * ------------------------------------------------------------------------
 * Shuffle the cards in the cardDeck array
 * @param   {Array}    cardDeck     The deck of cards to be shuffled.
 * @return  {Array}                 A shuffled deck.
 * ------------------------------------------------------------------------
 */
function shuffleCards(cardDeck) {
  for (
    var currentIndex = 0;
    currentIndex < cardDeck.length;
    currentIndex += 1
  ) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var cardHolder = cardDeck[randomIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[randomIndex] = cardDeck[currentIndex];
    cardDeck[currentIndex] = cardHolder;
  }
  return cardDeck;
}

/**
 * ------------------------------------------------------------------------
 * Template for player objects.
 * @argument {String} id   The player's id.
 * ------------------------------------------------------------------------
 */
class Player {
  constructor(id) {
    this.id = id;
    this._name = "";
    this.hand = [];
    this.canSplit = false;
    this.hasBlackjack = false;
    this.hasBust = false;
    this.hasWon = false;
    this.hasDrew = false;
    this.points = 100;
    this._bet = 0;
  }

  /**
   * ------------------------------------------------------------------------
   * Set the player's name.
   * @param {String} name
   * ------------------------------------------------------------------------
   */
  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  /**
   * ------------------------------------------------------------------------
   * Set the player's bet.
   * @param {Number} bet
   * ------------------------------------------------------------------------
   */
  set bet(bet) {
    this._bet = bet;
  }

  calcPoints() {
    if (this.hasBlackjack && this.hasWon) {
      this.points += this._bet * 1.5;
    } else if (this.hasDrew) {
      this.points += 0;
    } else if (this.hasWon) {
      this.points += this._bet;
    } else if (!this.hasWon) {
      this.points -= this._bet;
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Add a card to the player's hand.
   * @param  {Object}  Card object from deck.
   * ------------------------------------------------------------------------
   */
  hit(card) {
    this.hand.push(card);
  }

  /**
   * ------------------------------------------------------------------------
   * Returns the sum of all cards' value in the player's hand.
   * @return {Number} handValue
   * ------------------------------------------------------------------------
   */
  get handValue() {
    let initialValue = 0;
    let handValue = this.hand.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.value;
    }, initialValue);
    return handValue;
  }

  /**
   * ------------------------------------------------------------------------
   * Check the player's initial hand for blackjack or splits.
   * ------------------------------------------------------------------------
   */
  checkHand() {
    if (this.handValue == 21 && this.hand.length == 2) {
      this.hasBlackjack = true;
    } else if (
      this.hand[0].name == this.hand[1].name &&
      this.hand.length == 2
    ) {
      this.canSplit = true;
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Check if the player has bust.
   * ------------------------------------------------------------------------
   */
  checkBust() {
    if (this.handValue > 21) {
      this.hasBust = true;
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Displays all cards in the player's hand.
   * @return {String} output
   * ------------------------------------------------------------------------
   */
  get showHand() {
    return `${this.name}<br>
    Hand: ${this.hand.map((e) => e.display).join(" | ")}<br>
    Value: ${this.handValue}.<br>`;
  }

  /**
   * ------------------------------------------------------------------------
   * Reset player's hand, bet and booleans for the next round.
   * ------------------------------------------------------------------------
   */
  reset() {
    this.hand = [];
    this.canSplit = false;
    this.hasBlackjack = false;
    this.hasBust = false;
    this.hasWon = false;
    this.hasDrew = false;
    this._bet = 0;
  }
}
/////////////////////////
// End of Player Class //
/////////////////////////

function createPlayers(numOfPlayers) {
  for (let i = 1; i <= numOfPlayers; i += 1) {
    playerBoard.push(new Player(i));
  }
}

function dealCards(deck) {
  for (let i = 0; i < 2; i += 1) {
    for (let player of playerBoard) {
      player.hit(deck.pop());
    }
    dealer.hit(deck.pop());
  }
}

function initialChecks() {
  for (let player of playerBoard) {
    player.checkHand();
  }
  dealer.checkHand();
}

function hitStandSplit() {}

function dealerHitStand(dealer) {
  while (dealer.handValue < 17) {
    dealer.hit(cardDeck.pop());
    dealer.checkBust();
  }
}

function evalDealerHand() {
  if (dealer.hasBlackjack) {
    return "Dealer got a Blackjack. All players lose except players with a Blackjack.";
  } else if (dealer.hasBust) {
    return "Dealer has bust. All players still in play wins.";
  } else {
    return "All players with a hand better than the Dealer wins.";
  }
}

function evalHands() {
  let output = `${dealer.showHand}<br>${evalDealerHand()}<br><br>`;
  for (let player of playerBoard) {
    output += `${player.showHand}<br>`;

    // Player and dealer have Blackjacks
    if (player.hasBlackjack && dealer.hasBlackjack) {
      player.hasDrew = true;
      output += `Both ${player.name} and the Dealer got Blackjacks, it's a draw!`;
    }
    // Player has Blackjacks but not dealer
    else if (player.hasBlackjack) {
      player.hasWon = true;
      output += `${player.name} got a Blackjack!`;
    }
    // Player wins the dealer
    else if (
      (player.handValue > dealer.handValue && !player.hasBust) ||
      (!player.hasBust && dealer.hasBust)
    ) {
      player.hasWon = true;
      output += `${player.name} won the Dealer!`;
    }
    // Player loses to the dealer
    else if (
      (dealer.hasBlackjack && !player.hasBlackjack) ||
      (!dealer.hasBust && dealer.handValue > player.handValue) ||
      (!dealer.hasBust && player.hasBust)
    ) {
      output += `${player.name} lost to the Dealer.`;
    }
    // Player draw with the the dealer
    else {
      player.hasDrew = true;
      output += `${player.name} drew with the Dealer.`;
    }
    output += `<br><br>`;
  }
  return output;
}

function computeBets() {}

function resetGame() {
  // Reset all players' hands, bets and booleans
  for (let player of playerBoard) {
    player.reset();
  }

  // Reset dealer's hand and booleans
  dealer.reset();

  // Generate new deck
  cardDeck = shuffleCards(createDeck());

  // Set game mode to input bets
  gameMode = INPUT_BETS;
}

/**
 * ------------------------------------------------------------------------
 * Game Variables
 * ------------------------------------------------------------------------
 */

const dealer = new Player("dealer");
dealer.name = "Dealer";
let cardDeck = shuffleCards(createDeck());

/**
 * ------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------
 */

function main(input) {
  if (gameMode == INPUT_PLAYERS) {
    if (
      isNaN(Number(input)) ||
      Number(input) < 1 ||
      Number(input) > 6 ||
      input == ""
    ) {
      return "Please enter the number of players from 1 to 6.";
    }
    numOfPlayers = input;
    createPlayers(numOfPlayers);
    gameMode = INPUT_NAMES;
    return `There are now ${input} player(s). Please enter the name(s) of the player(s) in order separated by slashes "/".`;
  }

  if (gameMode == INPUT_NAMES) {
    const defaultNames = [
      "Alice",
      "Bob",
      "Chen Xi",
      "Dennis",
      "Ee Ching",
      "Ferris",
    ];
    let names = input.split("/");
    if (input == "") {
      names = defaultNames.splice(0, numOfPlayers);
    }
    for (let i = 0; i < names.length; i += 1) {
      playerBoard[i].name = names[i];
    }
    gameMode = BLACKJACK;
    return `Now that everything is set, let's start playing Blackjack!`;
  }

  dealCards(cardDeck);
  initialChecks();
  dealerHitStand(dealer);

  let evaluation = evalHands();
  resetGame();
  return evaluation;
}

/* Pseudocode
//// Goal
Get a hand that is higher in value than dealer but not more than 21

//// Setup and Rules
Create deck.
Shuffle deck.
User clicks Submit to deal cards. Dealer deals 2 face up cards to each player, 1 face up 1 face down card to dealer
Cards are taken at face value. J, Q, K, are also 10. A is 1 or 11.
The cards are analysed for game winning conditions, e.g. Blackjack.
Blackjack wins 1.5 times of bet.
The dealer now checks their down card to see if they have Blackjack.
If dealer has Blackjack, show the down card.
The round is concluded and all players lose their original bet unless they also have Blackjack.
If a player and the dealer each have Blackjack the result is a push and the player's bet is returned. 

//// Player's turn
Only one of dealer's card is displayed.
The user's hand is displayed to the user.
The user decides whether to hit or stand, using the submit button to submit their choice.
Hit: add a card from the top of the deck.
Bust: dealer gets bet.
Stay: pass and don't add cards to hand.
Split: 
The user's cards are analysed for winning or losing conditions.

//// Dealer
Once every player has played, dealer reveals face down card.
The computer decides to hit or stand automatically based on game rules.
16 or under, hit.
17 or above, stay.

//// Tally
Dealer busts: every player that is still in the round wins their bet.
Dealer does not bust: only players with hand higher than dealer wins their bet.

//// Repeat
Players place their bets and another round begins.
 */
