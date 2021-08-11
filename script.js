///////////////////////////////////////////////////////
////////////////////// Constants //////////////////////
///////////////////////////////////////////////////////

const HIT = "hit";
const STAND = "stand";
const SPLIT = "split";
const INPUT_PLAYERS = "inputPlayers";
const INPUT_NAMES = "inputNames";
const INPUT_BETS = "inputBets";
const BLACKJACK = "blackjack";
const COLOUR_BLUE = "#013D87";
const COLOUR_GREEN = "#018786";
const COLOUR_RED = "#B00020";
const COLOUR_YELLOW = "#F9D342";
const BORDER_SPAN = `<span style="border:1px; border-style:solid; border-color:#FFFFFF; padding: 0.25em 0.5em;">`;
const BLACK_TEXT = `<span style="color: #292826">`;

//////////////////////////////////////////////////////////////
////////////////////// Global Variables //////////////////////
//////////////////////////////////////////////////////////////

const suits = ["♥", "♦", "♣", "♠"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
var deck = [];
const sumLimit = 21;
let gameMode = INPUT_PLAYERS;

//////////////////////////////////////////////////////////////
////////////////////// Helper Functions //////////////////////
//////////////////////////////////////////////////////////////

/**
 * ------------------------------------------------------------------------
 * Creates background for output text.
 * @param   {String}    colour    Background colour.
 * @return  {String}              HTML \<div\> for background
 * ------------------------------------------------------------------------
 */

function createTextBackground(colour) {
  return `<div class="fw-bold" style="display: inline-block; border-radius:5px; background-color:${colour}; padding: 0.25em 2em;">`;
}

/**
 * ------------------------------------------------------------------------
 * Creates a 52 card deck.
 * Each card has the following properties.
 * [name]     2, 3, ... , J, Q, K, A
 * [suit]     Emoji of the suit.
 * [display]  [name] [emoji]
 * [value]    Value of each card in Blackjack.
 * ------------------------------------------------------------------------
 */

function createDeck() {
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    var currentSuit = suits[suitIndex];

    for (var rankIndex = 0; rankIndex < ranks.length; rankIndex += 1) {
      var cardName = ranks[rankIndex];
      var cardValue = parseInt(ranks[rankIndex]);

      switch (cardName) {
        case "J":
        case "Q":
        case "K":
          cardValue = 10;
          break;
        case "A":
          cardValue = 11;
          break;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        display: `${cardName} ${currentSuit}`,
        value: cardValue,
      };

      deck.push(card);
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * A random index ranging from 0 (inclusive) to max (exclusive).
 * @param   {Number}    max     The maximum of the random number to be generated.
 * @return  {Number}            A random index integer.
 * ------------------------------------------------------------------------
 */

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

/**
 * ------------------------------------------------------------------------
 * Shuffle the cards in the deck array.
 * ------------------------------------------------------------------------
 */

function shuffleDeck() {
  for (let i = 0; i < 1000; i += 1) {
    let location1 = getRandomIndex(deck.length);
    let location2 = getRandomIndex(deck.length);
    let tmp = deck[location1];
    // Swap positions of randomCard and currentCard in the deck
    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

/**
 * ------------------------------------------------------------------------
 * Template for player objects.
 * @argument  {String}  id        The player's id.
 * @argument  {String}  name      The player's name.
 * @argument  {Number}  points    Player starting points.
 * ------------------------------------------------------------------------
 */

class Player {
  id = 0;
  name = "";
  points = 100;
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

/**
 * ------------------------------------------------------------------------
 * Template for hand objects.
 * @argument  {String}  playerId        The player's id.
 * @argument  {String}  playerName      The player's name.
 * @argument  {Number}  bet             The player's bet.
 * ------------------------------------------------------------------------
 */

class Hand {
  playerId = 0;
  playerName = "";
  handId = "1️⃣";
  cards = [];
  canSplit = false;
  isSplit = false;
  hasBlackjack = false;
  hasBust = false;
  hasWon = false;
  hasDrew = false;
  _bet = 0;
  constructor(playerId, playerName, bet) {
    this.playerId = playerId;
    this.playerName = playerName;
    this._bet = bet;
  }

  /**
   * ------------------------------------------------------------------------
   * Set the player's bet.
   * @param {Number} bet
   * ------------------------------------------------------------------------
   */

  set bet(bet) {
    this._bet = Number(bet);
  }

  get bet() {
    return this._bet;
  }

  /**
   * ------------------------------------------------------------------------
   * Add a card to the player's hand.
   * @param  {Object}  Card object from deck.
   * ------------------------------------------------------------------------
   */

  hit(card) {
    this.cards.push(card);
  }

  /**
   * ------------------------------------------------------------------------
   * Returns the sum of all cards' value in the player's hand.
   * @return {Number} handValue
   * ------------------------------------------------------------------------
   */

  get handValue() {
    let initialValue = 0;
    return this.cards.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.value;
    }, initialValue);
  }

  /**
   * ------------------------------------------------------------------------
   * Displays all cards in the player's hand.
   * @return {String} output
   * ------------------------------------------------------------------------
   */

  get showHand() {
    let output = `${this.playerName}'s hand<br>`;
    if (this.isSplit) {
      output = `${this.playerName}'s hand ${this.handId}<br>`;
    }
    output += `${BORDER_SPAN}
    ${this.cards.map((card) => card.display).join(" | ")}
    </span><br>
    Value: ${this.handValue}<br>`;
    return output;
  }

  /**
   * ------------------------------------------------------------------------
   * Check the player's initial hand for blackjack or splits.
   * ------------------------------------------------------------------------
   */

  get checkHand() {
    if (this.handValue == sumLimit && this.cards.length == 2) {
      this.hasBlackjack = true;
    } else if (
      this.cards[0].name == this.cards[1].name &&
      this.cards.length == 2
    ) {
      this.canSplit = true;
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Checks if the player has bust.
   * If the player has Aces and player has bust, change the ace's value to 1.
   * ------------------------------------------------------------------------
   */

  get checkBust() {
    if (
      this.handValue > sumLimit &&
      this.cards.some(({ value }) => value === 11)
    ) {
      this.cards.find(({ value }) => value === 11).value = 1;
    }
    if (this.handValue > sumLimit) {
      this.hasBust = true;
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Evaluates the player's hand and update player's points.
   * ------------------------------------------------------------------------
   */

  get evalHand() {
    // Player and dealer have Blackjacks
    if (this.hasBlackjack && dealer.hasBlackjack) {
      this.hasDrew = true;
      return `${createTextBackground(COLOUR_BLUE)}
    Both ${this.playerName} and the Dealer got Blackjacks, it's a draw!
    </div>`;
    }

    // Player has Blackjacks but not dealer
    if (this.hasBlackjack) {
      this.hasWon = true;
      return `${createTextBackground(COLOUR_YELLOW)}
    ${BLACK_TEXT}
    ${this.playerName} got a Blackjack!
    </span></div>`;
    }
    // Player wins the dealer
    if (
      (this.handValue > dealer.handValue && !this.hasBust) ||
      (!this.hasBust && dealer.hasBust)
    ) {
      this.hasWon = true;
      return `${createTextBackground(COLOUR_GREEN)}
    ${this.playerName} won!
    </div>`;
    }
    // Player loses to the dealer
    if (
      (dealer.hasBlackjack && !this.hasBlackjack) ||
      (!dealer.hasBust && dealer.handValue > this.handValue) ||
      (!dealer.hasBust && this.hasBust)
    ) {
      return `${createTextBackground(COLOUR_RED)}
    ${this.playerName} lost to the Dealer.
    </div>`;
    }

    // Player draw with the the dealer
    this.hasDrew = true;
    return `${createTextBackground(COLOUR_BLUE)}
    ${this.playerName} drew with the Dealer.
    </div>`;
  }
  /**
   * ------------------------------------------------------------------------
   * Update player's points based on the hand's result.
   * ------------------------------------------------------------------------
   */

  get updatePoints() {
    let player = players.find(({ id }) => id === this.playerId);
    if (this.hasBlackjack && this.hasWon) {
      player.points += Number(this._bet) * 1.5;
    } else if (this.hasDrew) {
      player.points += Number(0);
    } else if (this.hasWon) {
      player.points += Number(this._bet);
    } else if (!this.hasWon) {
      player.points -= Number(this._bet);
    }
  }
}

///////////////////////////////////////////////////////////////
////////////////////// End of Hand Class //////////////////////
///////////////////////////////////////////////////////////////

class Dealer extends Hand {
  /**
   * ------------------------------------------------------------------------
   * Dealer hits if the hand value is below 17.
   * ------------------------------------------------------------------------
   */

  get hitStand() {
    while (this.handValue < 17) {
      this.hit(deck.pop());
      this.checkBust;
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Evaluate Dealer's hand.
   * @return {String}
   * ------------------------------------------------------------------------
   */

  get evalDealerHand() {
    // Dealer has Blackjack
    if (this.hasBlackjack) {
      return `${createTextBackground(COLOUR_YELLOW)}
    ${BLACK_TEXT}
    Dealer got a Blackjack.</span></div><br>
    All players lose except players with a Blackjack.`;
    }

    // Dealer bust
    if (this.hasBust) {
      return `${createTextBackground(COLOUR_RED)}
    Dealer has bust.</div><br>
    ${createTextBackground(COLOUR_GREEN)}
    All players still in play wins.</div>`;
    }

    // Default: Dealer did not bust
    return `${createTextBackground(COLOUR_BLUE)}
    Dealer got ${this.handValue}.</div><br>
    ${createTextBackground(COLOUR_GREEN)}
    Players with a better hand wins.</div>`;
  }
}

/////////////////////////////////////////////////////////////////
////////////////////// End of Dealer Class //////////////////////
/////////////////////////////////////////////////////////////////

/**
 * ------------------------------------------------------------------------
 * Create players based on user input.
 * @param     {Array}     names     Array of players' names.
 * ------------------------------------------------------------------------
 */

function createPlayers(names) {
  for (let i = 0; i < numOfPlayers; i += 1) {
    players.push(new Player(i + 1, names[i]));
  }
}

/**
 * ------------------------------------------------------------------------
 * Deal cards to players and dealer.
 * ------------------------------------------------------------------------
 */

function dealCards() {
  for (let i = 0; i < 2; i += 1) {
    for (let player of players) {
      player.hit(deck.pop());
    }
    dealer.hit(deck.pop());
  }
  dealerFaceUpCard = dealer.hand[0];
}

/**
 * ------------------------------------------------------------------------
 * Check the initial hands of every player and dealer for blackjacks and splits.
 * ------------------------------------------------------------------------
 */

function initialChecks() {
  for (let player of players) {
    player.checkHand();
  }
  dealer.checkHand();
}

/**
 * ------------------------------------------------------------------------
 * Message for each player's turn.
 * @param   {Object}  player
 * @return  {String}
 * ------------------------------------------------------------------------
 */

function playerDecide(player) {
  // Show Dealer's Face up card
  // Show player's hand.
  // Decision for player to make
  return `Now it's ${player.name}'s turn.<br><br>
  Dealer's Face Up Card<br>
  ${BORDER_SPAN}${dealerFaceUpCard.display}</span><br><br>
  ${player.showHand}<br>
  Please enter "hit/stand/split".`;
}

/**
 * ------------------------------------------------------------------------
 * Evaluate everyone's hand and generate outcome message for that round.
 * @return {String}
 * ------------------------------------------------------------------------
 */

function evalRound() {
  let toEliminate = [];
  let output = `${dealer.showHand}${evalDealerHand()}<br><br>`;
  for (let player of players) {
    output += `${player.showHand}`;

    player.updatePoints();
    player.reset();
    if (player.points <= 0) {
      output += `<br>${createTextBackground(COLOUR_RED)}
      ${player.name} ran out of points and is eliminated!</div>`;
      toEliminate.unshift(players.indexOf(player));
    }
    output += `<br>Current Points: ${player.points}<br><br>`;
  }
  toEliminate.forEach((element) => players.splice(element, 1));
  output += "Place your bets again for the next round!";
  return output;
}

/**
 * ------------------------------------------------------------------------
 * Dealer automated hit or stand.
 * Evaluate every player's hand and sets outcome for each player for that round.
 * Compute bets of every player.
 * Reset everyone's hands, bets and booleans.
 * Handle splits
 * Generate new deck for next round.
 * @return {String}
 * ------------------------------------------------------------------------
 */

function endGame() {
  dealerHitStand(dealer);
  // Compute bets then reset everyone's hands, bets and booleans
  let evaluation = evalRound();
  dealer.reset();

  // Handle splits
  for (
    let playerCounter = 0;
    playerCounter < players.length;
    playerCounter += 1
  ) {
    if (players[playerCounter].isSplit) {
      // Add split hand's points back to main player's points
      players[playerCounter - 1].points += Number(
        players[playerCounter].points
      );

      // Remove split hands player objects from player board
      players.splice(playerCounter, 1);
    }
  }

  // Generate new deck
  createDeck();
  shuffleDeck();

  gameMode = INPUT_BETS;

  return evaluation;
}

////////////////////////////////////////////////////////////
////////////////////// Game Variables //////////////////////
////////////////////////////////////////////////////////////

const defaultNames = ["Alice", "Bob", "Condi", "Dev", "Ed", "Foobar"];
const defaultBets = [10, 10, 10, 10, 10, 10];
let numOfPlayers = 0;
const players = [];
let hands = [];
let dealerFaceUpCard;
let dealer = new Dealer(0, "Dealer");
let playerTurn = 0;

const gameplay = {
  inputPlayers: {
    execute(input) {
      if (
        isNaN(Number(input)) ||
        Number(input) < 1 ||
        Number(input) > 6 ||
        input == ""
      ) {
        return "Please enter the number of players from 1 to 6.";
      }
      createPlayers(input);
      gameMode = INPUT_NAMES;
      return `There are now ${input} player(s).<br>
      Please enter the name(s) of the player(s) separated by slashes "/".<br>
      Example: "Alice/Bob/Chen Xi/Dorothy"`;
    },
  },
  inputNames: {
    execute(input) {
      let names = input.split("/");
      if (input == "") {
        names = defaultNames.slice(0, players.length);
      } else if (names.length != players.length) {
        return `There are ${players.length} players but only ${names.length} names entered, please check and try again.`;
      }
      for (let i = 0; i < names.length; i += 1) {
        players[i].name = names[i];
      }
      gameMode = INPUT_BETS;
      return `Now, let's place your bets for Blackjack!<br>
      Every player starts with 100 points.<br><br>
      Bet your points in the same order as the names separated by slashes "/".<br>
      Example: "10/25/30/15"`;
    },
  },
  inputBets: {
    execute(input) {
      let bets = input.split("/");
      if (input == "") {
        bets = defaultBets.slice(0, players.length);
      }
      if (bets.length != players.length) {
        return `There are ${players.length} players but only ${bets.length} bets were entered, please check and try again.<br>
        If a player does not wish to bet, please enter "0" for that player.`;
      }
      for (let i = 0; i < bets.length; i += 1) {
        players[i].bet = bets[i];
      }
      gameMode = BLACKJACK;
      createDeck();
      shuffleDeck();
      dealCards();
      initialChecks();
      let defaultMessage = "Bets are placed, cards are dealt.";
      if (dealer.hasBlackjack) {
        return `${defaultMessage}<br><br>${endGame()}`;
      }
      return `${defaultMessage} Best of luck to everyone!<br><br>
      ${playerDecide(players[playerTurn])}`;
    },
  },
  blackjack: {
    execute(input) {
      while (playerTurn < players.length) {
        let player = players[playerTurn];
        switch (String(input).toLowerCase()) {
          case "hit":
            if (player.handValue >= 21) {
              playerTurn += 1;
              player = players[playerTurn];
              if (playerTurn >= players.length) {
                break;
              }
              return `The previous player has a Blackjack, a hand total of 21 or has bust and can't hit.<br><br>
              ${playerDecide(player)}`;
            }
            player.hit(deck.pop());
            player.checkBust();
            break;
          case "stand":
            playerTurn += 1;
            break;
          case "split":
            if (!player.canSplit) {
              return `Your hand does not allow for a split. Please choose "hit/stand".<br><br>
              ${playerDecide(player)}`;
            }
            player.canSplit = false;
            let splitHand = new Player(
              player.id,
              player.name + " Hand B",
              true,
              0,
              player.bet
            );
            splitHand.hit(player.hand.pop());
            player.hit(deck.pop());
            splitHand.hit(deck.pop());
            players.splice(playerTurn + 1, 0, splitHand);
            break;
        }
        if (playerTurn >= players.length) {
          break;
        }
        player = players[playerTurn];
        return playerDecide(player);
      }
      return endGame();
    },
  },
};

/**
 * ------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------
 */

function main(input) {
  return gameplay[gameMode].execute(input);
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
