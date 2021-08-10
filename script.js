///////////////////////////////////////////////////////
////////////////////// Constants //////////////////////
///////////////////////////////////////////////////////

const HEARTS = "hearts";
const DIAMONDS = "diamonds";
const CLUBS = "clubs";
const SPADES = "spades";
const INPUT_PLAYERS = "inputPlayers";
const INPUT_NAMES = "inputNames";
const INPUT_BETS = "inputBets";
const BLACKJACK = "blackjack";
const HIT = "hit";
const STAND = "stand";
const SPLIT = "split";
const defaultNames = ["Alice", "Bob", "Condi", "Dev", "Ed", "Foobar"];
const defaultBets = ["10", "10", "10", "10", "10", "10"];
const COLOUR_BLUE = "#013D87";
const COLOUR_GREEN = "#018786";
const COLOUR_RED = "#B00020";
const COLOUR_YELLOW = "#F9D342";
const BORDER_SPAN = `<span style="border:1px; border-style:solid; border-color:#FFFFFF; padding: 0.25em 0.5em;">`;
const createBackground = function (colour) {
  return `<div class="fw-bold" style="display: inline-block; border-radius:5px; background-color:${colour}; padding: 0.25em 2em;">`;
};
const BLACK_TEXT = `<span style="color: #292826">`;

//////////////////////////////////////////////////////////////
////////////////////// Global Variables //////////////////////
//////////////////////////////////////////////////////////////

let gameMode = INPUT_PLAYERS;
let numOfPlayers = 0;
const playerBoard = [];
let dealerFaceUpCard;

//////////////////////////////////////////////////////////////
////////////////////// Helper Functions //////////////////////
//////////////////////////////////////////////////////////////

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
    var suitEmoji;
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

    for (var rankCounter = 2; rankCounter <= 14; rankCounter += 1) {
      var cardName = rankCounter;
      var cardValue = rankCounter;

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

///////////////////////////////////////////////////////////////////
////////////////////// Start of Player Class //////////////////////
///////////////////////////////////////////////////////////////////

/**
 * ------------------------------------------------------------------------
 * Template for player objects.
 * @argument  {String}  id        The player's id.
 * @argument  {String}  name      The player's name.
 * @argument  {Boolean} isSplit   Whether a player object is a split of a player.
 * @argument  {Number}  points    Player starting points.
 * @argument  {Number}  bet       Player's bet for the round.
 * ------------------------------------------------------------------------
 */

class Player {
  constructor(id, name = "", isSplit = false, points = 100, bet = 0) {
    this.id = id;
    this._name = name;
    this.hand = [];
    this.isSplit = isSplit;
    this.canSplit = false;
    this.hasBlackjack = false;
    this.hasBust = false;
    this.hasWon = false;
    this.hasDrew = false;
    this.points = points;
    this._bet = bet;
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
    this._bet = Number(bet);
  }

  get bet() {
    return this._bet;
  }

  calcPoints() {
    if (this.hasBlackjack && this.hasWon) {
      this.points += Number(this._bet) * 1.5;
    } else if (this.hasDrew) {
      this.points += 0;
    } else if (this.hasWon) {
      this.points += Number(this._bet);
    } else if (!this.hasWon) {
      this.points -= Number(this._bet);
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
   * If the player has Aces and player has bust, change the ace's value to 1.
   * ------------------------------------------------------------------------
   */

  checkBust() {
    if (this.handValue > 21 && this.hand.some(({ name }) => name === "A")) {
      this.hand.find(({ name }) => name === "A").value = 1;
      // TODO: sort cards by descending order so that if there is more than 1 Ace, the second ace will also be converted to one if needed.
    }
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
    ${BORDER_SPAN}${this.hand
      .map((element) => element.display)
      .join(" | ")}</span><br>
    Value: ${this.handValue}<br>`;
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
    playerTurn = 0;
  }
}
/////////////////////////////////////////////////////////////////
////////////////////// End of Player Class //////////////////////
/////////////////////////////////////////////////////////////////

/**
 * ------------------------------------------------------------------------
 * Create players based on user input.
 * ------------------------------------------------------------------------
 */

function createPlayers(numOfPlayers) {
  for (let i = 1; i <= numOfPlayers; i += 1) {
    playerBoard.push(new Player(i));
  }
}

/**
 * ------------------------------------------------------------------------
 * Deal cards to players and dealer.
 * ------------------------------------------------------------------------
 */

function dealCards(deck) {
  for (let i = 0; i < 2; i += 1) {
    for (let player of playerBoard) {
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
  for (let player of playerBoard) {
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
 * Dealer hits if the hand value is below 17.
 * ------------------------------------------------------------------------
 */

function dealerHitStand(dealer) {
  while (dealer.handValue < 17) {
    dealer.hit(cardDeck.pop());
    dealer.checkBust();
  }
}

/**
 * ------------------------------------------------------------------------
 * Evaluate Dealer's hand.
 * @return {String}
 * ------------------------------------------------------------------------
 */

function evalDealerHand() {
  if (dealer.hasBlackjack) {
    return `${createBackground(COLOUR_YELLOW)}
    ${BLACK_TEXT}
    Dealer got a Blackjack.</span></div><br>
    All players lose except players with a Blackjack.`;
  } else if (dealer.hasBust) {
    return `${createBackground(COLOUR_RED)}
    Dealer has bust.</div><br>
    ${createBackground(COLOUR_GREEN)}
    All players still in play wins.</div>`;
  } else {
    return `${createBackground(COLOUR_BLUE)}
    Dealer got ${dealer.handValue}.</div><br>
    ${createBackground(COLOUR_GREEN)}
    Players with a better hand wins.</div>`;
  }
}

/**
 * ------------------------------------------------------------------------
 * Evaluate every player's hand and sets outcome for each player for that round.
 * @return {String}
 * ------------------------------------------------------------------------
 */

function evalHands() {
  let output = `${dealer.showHand}${evalDealerHand()}<br><br>`;
  for (let player of playerBoard) {
    output += `${player.showHand}`;

    // Player and dealer have Blackjacks
    if (player.hasBlackjack && dealer.hasBlackjack) {
      player.hasDrew = true;
      output += `${createBackground(COLOUR_BLUE)}
      Both ${player.name} and the Dealer got Blackjacks, it's a draw!
      </div>`;
    }
    // Player has Blackjacks but not dealer
    else if (player.hasBlackjack) {
      player.hasWon = true;
      output += `${createBackground(COLOUR_YELLOW)}
      ${BLACK_TEXT}
      ${player.name} got a Blackjack!
      </span></div>`;
    }
    // Player wins the dealer
    else if (
      (player.handValue > dealer.handValue && !player.hasBust) ||
      (!player.hasBust && dealer.hasBust)
    ) {
      player.hasWon = true;
      output += `${createBackground(COLOUR_GREEN)}
      ${player.name} won!
      </div>`;
    }
    // Player loses to the dealer
    else if (
      (dealer.hasBlackjack && !player.hasBlackjack) ||
      (!dealer.hasBust && dealer.handValue > player.handValue) ||
      (!dealer.hasBust && player.hasBust)
    ) {
      output += `${createBackground(COLOUR_RED)}
      ${player.name} lost to the Dealer.
      </div>`;
    }
    // Player draw with the the dealer
    else {
      player.hasDrew = true;
      output += `${createBackground(COLOUR_BLUE)}
      ${player.name} drew with the Dealer.
      </div>`;
    }
    player.calcPoints();
    player.reset();
    output += `<br>Current Points: ${player.points}<br><br>`;
    if (player.points <= 0) {
      output += `${player.name} ran out of points and is eliminated!`;
      playerBoard.splice(playerBoard.indexOf(player), 1);
    }
  }
  output += "Place your bets again for the next round!";
  return output;
}

/**
 * ------------------------------------------------------------------------
 * Dealer automated hit or stand.
 * Evaluate every player's hand and sets outcome for each player for that round.
 * Compute bets of every player.
 * Reset everyone's hands, bets and booleans.
 * Generate new deck for next round.
 * @return {String}
 * ------------------------------------------------------------------------
 */

function endGame() {
  dealerHitStand(dealer);
  // Compute bets then reset everyone's hands, bets and booleans
  let evaluation = evalHands();
  dealer.reset();

  // Handle splits
  for (
    let playerCounter = 0;
    playerCounter < playerBoard.length;
    playerCounter += 1
  ) {
    if (playerBoard[playerCounter].isSplit) {
      // Add split hand's points back to main player's points
      playerBoard[playerCounter - 1].points += Number(
        playerBoard[playerCounter].points
      );

      // Remove split hands player objects from player board
      playerBoard.splice(playerCounter, 1);
    }
  }

  // Generate new deck
  cardDeck = shuffleCards(createDeck());

  gameMode = INPUT_BETS;

  return evaluation;
}

////////////////////////////////////////////////////////////
////////////////////// Game Variables //////////////////////
////////////////////////////////////////////////////////////

const dealer = new Player("dealer");
dealer.name = "Dealer";
let cardDeck = shuffleCards(createDeck());
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
      numOfPlayers = input;
      createPlayers(numOfPlayers);
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
        names = defaultNames.slice(0, playerBoard.length);
      } else if (names.length != playerBoard.length) {
        return `There are ${playerBoard.length} players but only ${names.length} names entered, please check and try again.`;
      }
      for (let i = 0; i < names.length; i += 1) {
        playerBoard[i].name = names[i];
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
        bets = defaultBets.slice(0, playerBoard.length);
      }
      if (bets.length != playerBoard.length) {
        return `There are ${playerBoard.length} players but only ${bets.length} bets were entered, please check and try again.<br>
        If a player does not wish to bet, please enter "0" for that player.`;
      }
      for (let i = 0; i < bets.length; i += 1) {
        playerBoard[i].bet = bets[i];
      }
      gameMode = BLACKJACK;
      dealCards(cardDeck);
      initialChecks();
      let defaultMessage = "Bets are placed, cards are dealt.";
      if (dealer.hasBlackjack) {
        return `${defaultMessage}<br><br>${endGame()}`;
      }
      return `${defaultMessage} Best of luck to everyone!<br><br>
      ${playerDecide(playerBoard[playerTurn])}`;
    },
  },
  blackjack: {
    execute(input) {
      while (playerTurn < playerBoard.length) {
        let player = playerBoard[playerTurn];
        switch (input) {
          case "hit":
            if (player.handValue >= 21) {
              playerTurn += 1;
              player = playerBoard[playerTurn];
              if (playerTurn >= playerBoard.length) {
                break;
              }
              return `The previous player has a Blackjack, a hand total of 21 or has bust and can't hit.<br><br>
              ${playerDecide(player)}`;
            }
            player.hit(cardDeck.pop());
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
            player.hit(cardDeck.pop());
            splitHand.hit(cardDeck.pop());
            playerBoard.splice(playerTurn + 1, 0, splitHand);
            break;
        }
        if (playerTurn >= playerBoard.length) {
          break;
        }
        player = playerBoard[playerTurn];
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
