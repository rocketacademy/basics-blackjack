var deck;
var players = [];
var curPlayer = -1;
var computerCards = [];
var handInProgress = false;

const STARTING_CARDS = 2;
const MAX_VALUE = 21;
const DEALER_MIN = 17;
const newHandButton = document.getElementById("new-hand-button");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");

// init players array by getting num players from user, and create player objects
var initialisePlayers = function (playerNum) {
  for (var i = 0; i < Number(playerNum); i += 1) {
    players[i] = { cards: [], points: 0, chips: 100, wager: 0, settled: false };
  }
};

// helper function to create card object
var makeCard = function (suit, emoji, rank) {
  // rank will be a number from 1 to 13, define a specialranks object for use later
  var specialRanks = {
    11: "J",
    12: "Q",
    13: "K",
    1: "A",
  };

  // set name and points value to first be equivalent to the rank value
  // if the name is one of the keys in special ranks,
  // change name to be the corresponding value
  var name = rank.toString();
  var points = rank;
  if (Object.keys(specialRanks).includes(name)) {
    name = specialRanks[rank];
    if (name != "A") points = 10; // for blackjack purpose, jack/queen/king = 10
  }
  return { name, suit, points, emoji };
};

// helper function to create deck
var makeDeck = function () {
  var deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitEmojis = ["♥️", "♦", "♣️", "♠️"];
  const NUM_RANKS = 13;

  // loop thru suits and ranks to generate 52 cards
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    for (var rank = 1; rank <= NUM_RANKS; rank += 1) {
      var card = makeCard(suits[suitIndex], suitEmojis[suitIndex], rank);
      deck.push(card);
    }
  }
  return deck;
};

// Shuffle the elements in the cardDeck array
var shuffleDeck = function (cardDeck) {
  for (var i = 0; i < cardDeck.length; i += 1) {
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[i];

    cardDeck[i] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

// reset game by making and shuffling a new deck, clearing cards, resetting ui
var resetGame = function () {
  deck = shuffleDeck(makeDeck());
  curPlayer = -1;
  computerCards = [];
  handInProgress = false;

  newHandButton.style.display = "inline-block";
  hitButton.style.display = "none";
  standButton.style.display = "none";

  for (var i = 0; i < players.length; i += 1) {
    players[i].cards = [];
    players[i].settled = false;

    const wagerSlider = document.getElementById(`wager-${i}`);
    wagerSlider.style.display = "block";
    wagerSlider.setAttribute("max", players[i].chips);
    wagerSlider.value = 1;
    document.getElementById(`value-wager-${i}`).innerHTML = "Bet: 1";
    document.getElementById(`player-${i}`).style.opacity = 1;
    document.getElementById(`player-${i}`).style.border = "none";
  }
  return "<br>Hand is over. Please place your bets.";
};

// check whether the starting two cards satisfy blackjack
var settleBlackjacks = function () {
  var output = "";
  for (var i = 0; i < players.length; i += 1) {
    if (players[i].points == 21) {
      var amtWon = Math.round(1.5 * players[i].wager);
      players[i].chips += amtWon;
      players[i].settled = true;
      output += `Player ${i + 1} has blackjack and wins ${amtWon} chips!<br>`;
    }
  }
  return output;
};

// this function is called after a player busts or stands, or after the initial deal
var findNextPlayer = function () {
  curPlayer += 1;
  while (curPlayer < players.length && players[curPlayer].settled) {
    curPlayer += 1;
  }

  if (curPlayer == players.length) return compareHandsWithDealer(); // no players left
  return `Player ${curPlayer + 1}, it's your turn.`;
};

// returns point total for a given array of cards
var calculatePoints = function (cards) {
  var total = 0;
  for (var i = 0; i < cards.length; i += 1) {
    total += cards[i].points;
  }

  // count aces and add to total if it is possible to
  var numAces = cards.reduce(
    (acc, cur) => (cur.name == "A" ? acc + 1 : acc),
    0
  );

  for (var i = 0; i < numAces; i += 1) {
    if (total + 10 <= MAX_VALUE) total += 10;
  }
  return total;
};

// update UI after each turn e.g. chip counts, and player effects
var updateUIAfterTurn = function () {
  for (var i = 0; i < players.length; i += 1) {
    const chipCountUI = document.getElementById(`chip-count-${i}`);
    chipCountUI.innerHTML = `Chip count: ${players[i].chips}`;

    const playerUI = document.getElementById(`player-${i}`);
    if (players[i].settled) playerUI.style.opacity = 0.3;

    if (handInProgress && i == curPlayer)
      playerUI.style.border = "solid 1px black";
    else playerUI.style.border = "none";
  }
};

// update the cards displayed to the players on the UI
var updateCardsUI = function (showComputerCards = false) {
  var computerCardsString = "";
  if (showComputerCards) {
    // output all the dealer's cards
    for (var i = 0; i < computerCards.length; i += 1) {
      computerCardsString += `${computerCards[i].name}${computerCards[i].emoji} `;
    }
  } else {
    // otherwise only output the first card
    computerCardsString += `${computerCards[0].name}${computerCards[0].emoji}`;
  }
  document.getElementById("dealer-cards").innerHTML = computerCardsString;

  for (var i = 0; i < players.length; i += 1) {
    var playerCardsString = "";
    players[i].points = calculatePoints(players[i].cards);
    for (var j = 0; j < players[i].cards.length; j += 1) {
      playerCardsString += `${players[i].cards[j].name}${players[i].cards[j].emoji} `;
    }
    document.getElementById(`player-cards-${i}`).innerHTML = playerCardsString;
    document.getElementById(
      `player-points-${i}`
    ).innerHTML = `(${players[i].points})`;
  }
};

// this function is called when the new hand button is clicked
var dealNewHand = function () {
  if (!deck) deck = shuffleDeck(makeDeck());
  handInProgress = true;
  var output = "Dealing cards...<br><br>";

  for (var i = 0; i < players.length; i += 1) {
    const playerWager = document.getElementById(`wager-${i}`);
    players[i].wager = Number(playerWager.value);
    playerWager.style.display = "none";
  }

  // deal cards just like irl - players, dealer, players, dealer
  for (var i = 0; i < STARTING_CARDS; i += 1) {
    for (var j = 0; j < players.length; j += 1) {
      players[j].cards.push(deck.pop());
    }
    computerCards.push(deck.pop());
  }

  updateCardsUI();
  output += settleBlackjacks(); // settle blackjacks first

  if (players.every((p) => p.settled)) {
    // if players are all settled then hand is over
    output += resetGame();
  } else {
    // otherwise show the hit/stand buttons to continue gameplay
    newHandButton.style.display = "none";
    hitButton.style.display = "inline-block";
    standButton.style.display = "inline-block";

    output += findNextPlayer();
  }
  updateUIAfterTurn();
  return output;
};

// this function is called when no players are left to act
// dealer will draw and compare value with all remaining players
var compareHandsWithDealer = function () {
  var output = "";
  var computerPoints = 0;
  while (computerPoints < DEALER_MIN) {
    computerCards.push(deck.pop());
    computerPoints = calculatePoints(computerCards);
  }
  updateCardsUI(true);
  output += `Computer has ${computerPoints} points.<br>`;

  for (var i = 0; i < players.length; i += 1) {
    if (!players[i].settled) {
      output += `Player ${i + 1} has ${players[i].points} points`;
      players[i].settled = true;

      if (players[i].points > computerPoints || computerPoints > MAX_VALUE) {
        players[i].chips += players[i].wager;
        output += ` and wins ${players[i].wager} chips!<br>`;
      } else if (players[i].points < computerPoints) {
        players[i].chips -= players[i].wager;
        output += ` and loses ${players[i].wager} chips.<br>`;
      } else output += `. It's a tie!<br>`;
    }
  }
  output += resetGame();
  return output;
};

// this function is called when the hit button is clicked
var onPlayerHit = function () {
  var output = "";
  players[curPlayer].cards.push(deck.pop());
  updateCardsUI();
  if (players[curPlayer].points > MAX_VALUE) {
    // if player busts then output msg
    var amtLost = players[curPlayer].wager;
    output += `Player ${
      curPlayer + 1
    } busts and loses ${amtLost} chips.<br><br>`;
    players[curPlayer].chips -= amtLost;
    players[curPlayer].settled = true;

    if (players.every((p) => p.settled)) output += resetGame();
    else output += findNextPlayer();
  }
  updateUIAfterTurn();
  return output;
};

// this function is called when the stand button is clicked
var onPlayerStand = function () {
  var output = findNextPlayer();
  updateUIAfterTurn();
  return output;
};
