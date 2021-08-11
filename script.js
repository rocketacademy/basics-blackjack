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
const COLOUR_WHITE = "#FFFFFF";
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
const deck = [];
const sumLimit = 21;
const handIdEmoji = String.fromCodePoint(0xfe0f, 0x20e3);
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
 * @param  {String}  id        The player's id.
 * @param  {String}  name      The player's name.
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

  get showPlayer() {
    return `${this.name}<br>
    Points: ${this.points}`;
  }
}

/**
 * ------------------------------------------------------------------------
 * Template for hand objects.
 * @param  {String}  playerId        The player's id.
 * @param  {String}  playerName      The player's name.
 * @param  {Number}  bet             The player's bet.
 * @param  {Boolean} isSplit         Determine if a hand is split.
 * @param  {Number}  handId          For split hands.
 * ------------------------------------------------------------------------
 */

class Hand {
  cards = [];
  canSplit = false;
  hasBlackjack = false;
  hasBust = false;
  hasWon = false;
  hasDrew = false;
  constructor(playerId, playerName, bet = 0, isSplit = false, handId = 1) {
    this.playerId = playerId;
    this.playerName = playerName;
    this._bet = bet;
    this.isSplit = isSplit;
    this.handId = Number(handId);
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
   * Displays all cards in the player's hand.
   * @return {String} output
   * ------------------------------------------------------------------------
   */

  get showHand() {
    let output = "";
    if (this.isSplit) {
      output = `${this.playerName}'s Hand ${this.handId}${handIdEmoji}<br>`;
    }
    output += `${BORDER_SPAN}
    ${this.cards.map((card) => card.display).join(" | ")}
    </span><br>
    Value: ${this.handValue}<br>`;
    return output;
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
   * Message for each player's turn.
   * @return  {String}
   * ------------------------------------------------------------------------
   */

  get playerDecide() {
    // Show Dealer's Face up card
    // Show player's hand.
    // Decision for player to make
    let output = `Now it's ${this.playerName}'s turn.<br><br>
  Dealer's Face Up Card<br>
  ${BORDER_SPAN}${dealerFaceUpCard.display}</span><br><br>
  ${this.showHand}<br>`;
    if (this.canSplit) {
      output += `Your hand has two of the same cards, you can split if you want.<br>
    Please enter "hit/stand/split".`;
      return output;
    }
    output += `Please enter "hit/stand"`;
    return output;
  }

  /**
   * ------------------------------------------------------------------------
   * Evaluates the player's hand and update the points.
   * ------------------------------------------------------------------------
   */

  get evalHand() {
    let output = "";

    // Player and dealer have Blackjacks
    if (this.hasBlackjack && dealer.hasBlackjack) {
      this.hasDrew = true;
      output = `${createTextBackground(COLOUR_BLUE)}
    Both ${this.playerName} and the Dealer got Blackjacks, it's a draw!
    </div>`;
    }

    // Player has Blackjacks but not dealer
    if (this.hasBlackjack) {
      this.hasWon = true;
      output = `${createTextBackground(COLOUR_YELLOW)}
    ${BLACK_TEXT}
    ${this.playerName} got a Blackjack!
    </span></div>`;
    }

    // Player wins the dealer
    else if (
      (this.handValue > dealer.handValue && !this.hasBust) ||
      (!this.hasBust && dealer.hasBust)
    ) {
      this.hasWon = true;
      output = `${createTextBackground(COLOUR_GREEN)}
    ${this.playerName} won!
    </div>`;
    }

    // Player loses to the dealer
    else if (
      (dealer.hasBlackjack && !this.hasBlackjack) ||
      (!dealer.hasBust && dealer.handValue > this.handValue) ||
      (!dealer.hasBust && this.hasBust)
    ) {
      output = `${createTextBackground(COLOUR_RED)}
    ${this.playerName} lost to the Dealer.
    </div>`;
    }

    // Player draw with the the dealer
    else {
      this.hasDrew = true;
      output = `${createTextBackground(COLOUR_BLUE)}
    ${this.playerName} drew with the Dealer.
    </div>`;
    }

    this.updatePoints;
    return output;
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
 * Create hands based on the number of players.
 * @param     {Array}     bets     Array of players' bets.
 * ------------------------------------------------------------------------
 */

function createHands(bets) {
  for (let i = 0; i < bets.length; i += 1) {
    hands.push(new Hand(players[i].id, players[i].name, bets[i]));
  }
}

/**
 * ------------------------------------------------------------------------
 * Deal cards to players and dealer.
 * ------------------------------------------------------------------------
 */

function dealCards() {
  for (let i = 0; i < 2; i += 1) {
    for (let hand of hands) {
      hand.hit(deck.pop());
    }
    dealer.hit(deck.pop());
  }
}

/**
 * ------------------------------------------------------------------------
 * Check the initial hands of every player and dealer for blackjacks and splits.
 * ------------------------------------------------------------------------
 */

function initialChecks() {
  for (let hand of hands) {
    hand.checkHand;
  }
  dealer.checkHand;
}

/**
 * ------------------------------------------------------------------------
 * Setup the round.
 * @param     {Array}     bets     Array of players' bets.
 * ------------------------------------------------------------------------
 */

function setupRound(bets) {
  createDeck();
  shuffleDeck();
  createHands(bets);
  dealer = new Dealer(0, "Dealer");
  dealCards();
  dealerFaceUpCard = dealer.cards[0];
  initialChecks();
}

/**
 * ------------------------------------------------------------------------
 * Evaluate everyone's hand and generate outcome message for that round.
 * @return {String}
 * ------------------------------------------------------------------------
 */

function evalRound() {
  // Show round results
  let output = `${dealer.evalDealerHand}<br>${dealer.showHand}<br>`;
  for (let player of players) {
    output += `${createTextBackground(COLOUR_WHITE)}${BLACK_TEXT}
    ${player.name}</span></div><br>`;
    for (let hand of hands.filter(({ playerId }) => playerId === player.id)) {
      output += hand.showHand;
      output += `${hand.evalHand}<br><br>`;
    }
  }

  // For each player, show their points total and if they got eliminated
  let toEliminate = [];
  output += `${createTextBackground(COLOUR_WHITE)}${BLACK_TEXT}
  Players Standings</span></div><br>`;
  for (let player of players) {
    output += `${player.name}: ${player.points} points<br>`;

    if (player.points <= 0) {
      output += `${createTextBackground(COLOUR_RED)}
      ${player.name} ran out of points and is eliminated!</div><br>`;
      toEliminate.unshift(players.indexOf(player));
    }
  }

  toEliminate.forEach((element) => players.splice(element, 1));
  if (players.length == 0) {
    gameMode = INPUT_PLAYERS;
    playersNames.splice(0);
    output += `<br>All players have been eliminated!<br>
    Start a new game by entering the number of players.`;
  } else {
    gameMode = INPUT_BETS;
    output += "<br>Players still in play, bet for the next round!";
  }
  return output;
}

/**
 * ------------------------------------------------------------------------
 * Dealer automated hit or stand.
 * Evaluate every player's hand and sets outcome for each player for that round.
 * Compute bets of every player.
 * Generate new deck for next round.
 * @return {String}
 * ------------------------------------------------------------------------
 */

function endRound() {
  removeButtons();
  dealer.hitStand;
  let evaluation = evalRound();
  hands.splice(0);
  deck.splice(0);
  playerTurn = 0;
  return evaluation;
}

//////////////////////////////////////////////////////////////////
////////////////////// DOM Decision Buttons //////////////////////
//////////////////////////////////////////////////////////////////

const decisions = [HIT, STAND, SPLIT];
const buttonGroup = document.getElementById("decision-buttons");
const appOutput = document.getElementById("output");

// <button type="button" class="btn btn-outline-primary">Left</button>

function playerDecision(input) {
  let result = main(input);
  appOutput.innerHTML = result;
}

function createButton(decision) {
  let button = document.createElement("button");
  let decisionTitled = decision.charAt(0).toUpperCase() + decision.slice(1);
  button.innerHTML = decisionTitled;
  let buttonClass = document.createAttribute("class");
  buttonClass.value = "btn btn-outline-primary";
  let buttonType = document.createAttribute("type");
  buttonType.value = "button";
  let buttonOnclick = document.createAttribute("onclick");
  buttonOnclick.value = "playerDecision(this.value)";
  button.value = decision;
  button.setAttributeNode(buttonClass);
  button.setAttributeNode(buttonType);
  button.setAttributeNode(buttonOnclick);
  buttonGroup.append(button);
}

function createButtons() {
  for (let decision of decisions) {
    createButton(decision);
  }
}

function removeButtons() {
  for (let i = 0; i < 3; i += 1) {
    buttonGroup.removeChild(buttonGroup.childNodes[0]);
  }
}

////////////////////////////////////////////////////////////
////////////////////// Game Variables //////////////////////
////////////////////////////////////////////////////////////

const defaultNames = [
  "Alice",
  "Bob",
  "Condi",
  "Dev",
  "Ed",
  "Foobar",
  "Grey",
  "Hacker",
];
const defaultBets = [50, 50, 50, 50, 50, 50, 50, 50];
let numOfPlayers = 0;
let playersNames = [];
const players = [];
const hands = [];
let dealerFaceUpCard;
let dealer;
let playerTurn = 0;

const gameplay = {
  inputPlayers: {
    execute(input) {
      if (
        isNaN(Number(input)) ||
        Number(input) < 1 ||
        Number(input) > 8 ||
        input == ""
      ) {
        return "Please enter the number of players from 1 to 8.";
      }
      numOfPlayers = Number(input);
      gameMode = INPUT_NAMES;
      return `There are now ${numOfPlayers} player(s).<br>
      Please enter the name(s) of the player(s) separated by slashes "/".<br>
      Example: "Alice/Bob/Chen Xi/Dorothy"`;
    },
  },
  inputNames: {
    execute(input) {
      playersNames = input.split("/");
      if (input == "") {
        playersNames = defaultNames.slice(0, numOfPlayers);
      } else if (playersNames.length != numOfPlayers) {
        return `There are ${numOfPlayers} players but only ${playersNames.length} names entered, please check and try again.`;
      }
      createPlayers(playersNames);
      gameMode = INPUT_BETS;
      return `Now, place your bets for Blackjack!<br>
      Every player starts with 100 points.<br><br>
      Bet your points in this order "${players
        .map((player) => player.name)
        .join("/")}".<br>
      Separate each player's bet with a slash "/".<br>
      Example: "10/25/30/15"`;
    },
  },
  inputBets: {
    execute(input) {
      let bets = input.split("/");
      // Set bets to default amount if there is no input.
      if (input == "") {
        bets = defaultBets.slice(0, players.length);
      }

      // Check that every player has placed a bet.
      if (bets.length != players.length) {
        return `There are ${players.length} players but only ${
          bets.length
        } bets, please check and try again.<br>
        Bet your points in this order "${players
          .map((player) => player.name)
          .join("/")}.<br>
        If a player does not wish to bet, please enter "0" for that player.`;
      }

      // Input validation for bets amount.
      let betsError = "";
      for (let i = 0; i < players.length; i += 1) {
        let bet = Number(bets[i]);
        let player = players[i];
        if (bet > player.points) {
          betsError += `Hey ${player.name}, you have only ${player.points} points but you bet ${bet} points.<br>
          Please bet within your limit.<br><br>`;
        }

        if (isNaN(bet)) {
          betsError += `Hey ${player.name}, you did not enter a valid number for a bet.<br>
          Please check and try again.<br><br>`;
        }
      }
      if (betsError != "") {
        return betsError;
      }

      // Blackjack game starts
      gameMode = BLACKJACK;
      createButtons();
      setupRound(bets);
      let defaultMessage = "Bets are placed, cards are dealt.";
      if (dealer.hasBlackjack) {
        return `${defaultMessage}<br><br>${endRound()}`;
      }
      return `${defaultMessage} Best of luck to everyone!<br><br>
      ${hands[playerTurn].playerDecide}`;
    },
  },
  blackjack: {
    execute(input) {
      while (playerTurn < hands.length) {
        let hand = hands[playerTurn];
        switch (String(input).toLowerCase()) {
          case HIT:
            if (hand.handValue >= 21) {
              playerTurn += 1;
              hand = hands[playerTurn];
              if (playerTurn >= hands.length) {
                break;
              }
              return `The previous player has a Blackjack, a hand total of 21 or has bust and can't hit.<br><br>
              ${hand.playerDecide}`;
            }
            hand.hit(deck.pop());
            hand.checkBust;
            break;
          case STAND:
            playerTurn += 1;
            break;
          case SPLIT:
            if (!hand.canSplit) {
              return `Your hand does not allow for a split. Please choose "hit/stand".<br><br>
              ${hand.playerDecide}`;
            }
            hand.canSplit = false;
            hand.isSplit = true;
            let splitHand = new Hand(
              hand.playerId,
              hand.playerName,
              hand.bet,
              true,
              2
            );
            splitHand.hit(hand.cards.pop());
            hand.hit(deck.pop());
            splitHand.hit(deck.pop());
            hands.splice(playerTurn + 1, 0, splitHand);
            break;
        }
        if (playerTurn >= hands.length) {
          break;
        }
        hand = hands[playerTurn];
        return hand.playerDecide;
      }
      return endRound();
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
