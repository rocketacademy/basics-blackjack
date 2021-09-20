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
const splitButton = document.getElementById("split-button");

// init players array by getting num players from user, and create player objects
var initialisePlayers = function (playerNum) {
  for (var i = 0; i < Number(playerNum); i += 1) {
    players[i] = {
      cards: [[]],
      curHand: 0,
      points: [0],
      settled: [false],
      chips: 100,
      wager: 0,
      buyIn: 100,
    };
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
  var output = "";
  deck = shuffleDeck(makeDeck());
  curPlayer = -1;
  computerCards = [];
  handInProgress = false;

  newHandButton.style.display = "inline-block";
  hitButton.style.display = "none";
  standButton.style.display = "none";
  splitButton.style.display = "none";

  for (var i = 0; i < players.length; i += 1) {
    for (var j = 0; j < players[i].cards.length; j += 1) {
      document.getElementById(`card-container-${i}-${j}`).style.opacity = 1;
      document.getElementById(`card-container-${i}-${j}`).style.border = "none";
    }

    players[i].cards = [[]];
    players[i].settled = [false];
    players[i].curHand = 0;
    players[i].points = [0];

    var count = 0;
    while (players[i].chips <= 0) {
      players[i].chips += 100;
      players[i].buyIn += 100;
      count += 1;
    }
    if (count > 0)
      output += `<br>Player ${i + 1} is topped up with ${count * 100} chips.`;

    const wagerSlider = document.getElementById(`wager-${i}`);
    wagerSlider.style.display = "block";
    wagerSlider.setAttribute("max", players[i].chips);
    wagerSlider.value =
      players[i].chips >= players[i].wager ? players[i].wager : 1;
    document.getElementById(
      `value-wager-${i}`
    ).innerHTML = `Bet: ${wagerSlider.value}`;
    document.getElementById(`player-${i}`).style.opacity = 1;
    document.getElementById(`player-${i}`).style.border = "none";
  }
  output += "<br>Hand is over. Please place your bets.";
  return output;
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

// check whether the starting two cards satisfy blackjack
var settleBlackjacks = function (dealerBlackjack) {
  var output = "";
  if (dealerBlackjack) output += `Dealer has blackjack!<br>`;

  for (var i = 0; i < players.length; i += 1) {
    if (!dealerBlackjack) {
      if (players[i].points[0] == 21) {
        var amtWon = Math.round(1.5 * players[i].wager);
        players[i].chips += amtWon;
        players[i].settled[0] = true;
        output += `Player ${i + 1} has blackjack and wins ${amtWon} chips!<br>`;
      }
    } else {
      if (players[i].points[0] == 21) {
        output += `Player ${i + 1} has blackjack. It's a tie!<br>`;
      } else {
        output += `Player ${i + 1} loses ${players[i].wager} chips.<br>`;
        players[i].chips -= players[i].wager;
      }
      players[i].settled[0] = true;
    }
  }
  return output;
};

// this function is called after a player busts or stands, or after the initial deal
var findNextPlayer = function () {
  curPlayer += 1;
  while (curPlayer < players.length && players[curPlayer].settled[0]) {
    curPlayer += 1;
  }

  if (curPlayer == players.length) return compareHandsWithDealer(); // no players left

  if (
    players[curPlayer].cards[0][0].name == players[curPlayer].cards[0][1].name
  ) {
    splitButton.style.display = "inline-block";
  } else {
    splitButton.style.display = "none";
  }
  return `Player ${curPlayer + 1}, it's your turn.`;
};

// update UI after each turn e.g. chip counts, and player effects
var updateUIAfterTurn = function () {
  for (var i = 0; i < players.length; i += 1) {
    const chipCountUI = document.getElementById(`chip-count-${i}`);
    const winLossUI = document.getElementById(`win-loss-${i}`);
    const win = players[i].chips - players[i].buyIn;
    chipCountUI.innerHTML = `Chip count: ${players[i].chips}`;
    winLossUI.innerHTML = win;
    if (win > 0) winLossUI.className = "win-loss-green";
    else if (win < 0) winLossUI.className = "win-loss-red";
    else winLossUI.className = "win-loss";

    for (var j = 0; j < players[i].cards.length; j += 1) {
      var container = document.getElementById(`card-container-${i}-${j}`);
      if (players[i].settled[j]) container.style.opacity = 0.5;
    }

    const playerUI = document.getElementById(`player-${i}`);
    if (players[i].settled.every((s) => s)) playerUI.style.opacity = 0.5;

    if (handInProgress && i == curPlayer) {
      playerUI.style.border = "solid 1px black";
      if (players[i].cards.length == 2) {
        for (var j = 0; j < players[i].cards.length; j += 1) {
          var container = document.getElementById(`card-container-${i}-${j}`);
          if (j == players[i].curHand)
            container.style.border = "solid 1px black";
          else container.style.border = "none";
        }
      }
    } else {
      playerUI.style.border = "none";
      for (var j = 0; j < players[i].cards.length; j += 1) {
        document.getElementById(`card-container-${i}-${j}`).style.border =
          "none";
      }
    }
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
    for (var j = 0; j < players[i].cards.length; j += 1) {
      var playerCardsString = "";
      players[i].points[j] = calculatePoints(players[i].cards[j]);
      for (var k = 0; k < players[i].cards[j].length; k += 1) {
        playerCardsString += `${players[i].cards[j][k].name}${players[i].cards[j][k].emoji} `;
      }
      document.getElementById(`player-cards-${i}-${j}`).innerHTML =
        playerCardsString;
      document.getElementById(
        `player-points-${i}-${j}`
      ).innerHTML = `(${players[i].points[j]})`;
    }
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
    document.getElementById(`card-container-${i}-1`).style.display = "none";
  }

  // deal cards just like irl - players, dealer, players, dealer
  for (var i = 0; i < STARTING_CARDS; i += 1) {
    for (var j = 0; j < players.length; j += 1) {
      players[j].cards[0].push(deck.pop());
    }
    computerCards.push(deck.pop());
  }

  var dealerBlackjack = calculatePoints(computerCards) == 21;
  updateCardsUI(dealerBlackjack);
  output += settleBlackjacks(dealerBlackjack); // settle blackjacks first

  if (players.every((p) => p.settled[0])) {
    // if players are all settled then hand is over
    output += resetGame();
  } else {
    // otherwise show the hit/stand buttons to continue gameplay
    output += findNextPlayer();
    newHandButton.style.display = "none";
    hitButton.style.display = "inline-block";
    standButton.style.display = "inline-block";
  }
  updateUIAfterTurn();
  return output;
};

// this function is called when no players are left to act
// dealer will draw and compare value with all remaining players
var compareHandsWithDealer = function () {
  var output = "";
  var computerPoints = calculatePoints(computerCards);
  while (computerPoints < DEALER_MIN) {
    computerCards.push(deck.pop());
    computerPoints = calculatePoints(computerCards);
  }
  updateCardsUI(true);
  output += `Computer has ${computerPoints} points.<br>`;

  for (var i = 0; i < players.length; i += 1) {
    for (var j = 0; j < players[i].cards.length; j += 1) {
      if (!players[i].settled[j]) {
        output += `Player ${i + 1} has ${players[i].points[j]} points`;
        players[i].settled[j] = true;

        if (
          players[i].points[j] > computerPoints ||
          computerPoints > MAX_VALUE
        ) {
          players[i].chips += players[i].wager;
          output += ` and wins ${players[i].wager} chips!<br>`;
        } else if (players[i].points[j] < computerPoints) {
          players[i].chips -= players[i].wager;
          output += ` and loses ${players[i].wager} chips.<br>`;
        } else output += `. It's a tie!<br>`;
      }
    }
  }
  output += resetGame();
  return output;
};

// this function is called when the hit button is clicked
var onPlayerHit = function () {
  var output = "";
  var handNum = players[curPlayer].curHand;
  players[curPlayer].cards[handNum].push(deck.pop());
  updateCardsUI();
  if (players[curPlayer].points[handNum] > MAX_VALUE) {
    // if player busts then output msg
    var amtLost = players[curPlayer].wager;
    output += `Player ${
      curPlayer + 1
    } busts and loses ${amtLost} chips.<br><br>`;
    players[curPlayer].chips -= amtLost;
    players[curPlayer].settled[handNum] = true;

    if (players[curPlayer].cards.length == 2 && players[curPlayer].curHand == 0)
      players[curPlayer].curHand += 1;
    else if (players.every((p) => p.settled.every((s) => s)))
      output += resetGame();
    else output += findNextPlayer();
  } else {
    splitButton.style.display = "none";
  }
  updateUIAfterTurn();
  return output;
};

// this function is called when the stand button is clicked
var onPlayerStand = function () {
  var output = "";
  if (players[curPlayer].cards.length == 2 && players[curPlayer].curHand == 0)
    players[curPlayer].curHand += 1;
  else {
    output = findNextPlayer();
  }
  updateUIAfterTurn();
  return output;
};

var onPlayerSplit = function () {
  players[curPlayer].cards.push([]);
  players[curPlayer].cards[1].push(players[curPlayer].cards[0].pop());
  players[curPlayer].cards[0].push(deck.pop());
  players[curPlayer].cards[1].push(deck.pop());

  players[curPlayer].points.push(0);
  players[curPlayer].settled.push(false);

  updateCardsUI();
  updateUIAfterTurn();
  document.getElementById(`card-container-${curPlayer}-1`).style.display =
    "block";
  splitButton.style.display = "none";
  return `Player ${curPlayer + 1} splits.`;
};
