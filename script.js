var deck;
var players = [];
var curPlayer = -1;
var dealerCards = [];
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
      // hands is an array storing one array of cards
      // if player splits, then another array of cards will be added
      hands: [[]],
      points: [0], // array of points corresponding to hands
      settled: [false], // array denoting whether the hand is settled
      curHand: 0, // set current hand index as 0
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

// helper function to create a shuffled deck
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

  // shuffle deck
  for (var i = 0; i < deck.length; i += 1) {
    var randomIndex = Math.floor(Math.random() * deck.length);
    var randomCard = deck[randomIndex];
    var currentCard = deck[i];

    deck[i] = randomCard;
    deck[randomIndex] = currentCard;
  }
  return deck;
};

// helper function to reset player
var resetPlayer = function (index) {
  players[index].hands = [[]];
  players[index].settled = [false];
  players[index].curHand = 0;
  players[index].points = [0];

  // top up a player with 100 chips if he has 0 or less chips
  var count = 0;
  while (players[index].chips <= 0) {
    players[index].chips += 100;
    players[index].buyIn += 100;
    count += 1;
  }
  if (count > 0)
    return `<br>Player ${index + 1} is topped up with ${count * 100} chips.`;
  else return "";
};

// reset game by making and shuffling a new deck, clearing cards, resetting ui
var resetGame = function () {
  // reset state variables
  var output = "";
  deck = makeDeck();
  curPlayer = -1;
  dealerCards = [];
  handInProgress = false;

  // reset buttons
  newHandButton.style.display = "inline-block";
  hitButton.style.display = "none";
  standButton.style.display = "none";
  splitButton.style.display = "none";

  // reset players ui and state
  for (var i = 0; i < players.length; i += 1) {
    for (var j = 0; j < players[i].hands.length; j += 1) {
      document.getElementById(`card-container-${i}-${j}`).style.opacity = 1;
      document.getElementById(`card-container-${i}-${j}`).style.border = "none";
    }

    output += resetPlayer(i);

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
  var total = cards.reduce((acc, cur) => acc + cur.points, 0);

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
  if (
    curPlayer != -1 &&
    players[curPlayer].hands.length == 2 &&
    players[curPlayer].curHand == 0
  ) {
    // current player has 2 hands and we are only on the first hand
    players[curPlayer].curHand += 1;
    return "";
  }

  curPlayer += 1;
  while (curPlayer < players.length && players[curPlayer].settled[0]) {
    curPlayer += 1;
  }

  if (curPlayer == players.length) return compareHandsWithDealer(); // no players left

  // next player's starting hand is splittable, show the split button
  if (
    players[curPlayer].hands[0][0].name == players[curPlayer].hands[0][1].name
  ) {
    splitButton.style.display = "inline-block";
  } else {
    splitButton.style.display = "none";
  }
  return `Player ${curPlayer + 1}, it's your turn.`;
};

// update UI after each turn e.g. chip counts, and player effects
var updateTableUI = function () {
  for (var i = 0; i < players.length; i += 1) {
    // update chip count and W/L
    const chipCountUI = document.getElementById(`chip-count-${i}`);
    const winLossUI = document.getElementById(`win-loss-${i}`);
    const win = players[i].chips - players[i].buyIn;
    chipCountUI.innerHTML = `Chip count: ${players[i].chips}`;
    winLossUI.innerHTML = win;
    if (win > 0) winLossUI.className = "win-loss-green";
    else if (win < 0) winLossUI.className = "win-loss-red";
    else winLossUI.className = "win-loss";

    // update opacity effect for settled hands
    for (var j = 0; j < players[i].hands.length; j += 1) {
      var container = document.getElementById(`card-container-${i}-${j}`);
      if (players[i].settled[j]) container.style.opacity = 0.5;
    }

    // if all the player's hands are settled, update the player opacity
    const playerUI = document.getElementById(`player-${i}`);
    if (players[i].settled.every((s) => s)) playerUI.style.opacity = 0.5;

    // set border around active player (and active hand if split hand)
    if (handInProgress && i == curPlayer) {
      playerUI.style.border = "solid 1px black";
      if (players[i].hands.length == 2) {
        for (var j = 0; j < players[i].hands.length; j += 1) {
          var container = document.getElementById(`card-container-${i}-${j}`);
          if (j == players[i].curHand)
            container.style.border = "solid 1px black";
          else container.style.border = "none";
        }
      }
    } else {
      playerUI.style.border = "none";
      for (var j = 0; j < players[i].hands.length; j += 1) {
        document.getElementById(`card-container-${i}-${j}`).style.border =
          "none";
      }
    }
  }
};

// update the cards displayed to the players on the UI
var updateCardsUI = function (showDealerCards = false) {
  var dealerCardsString = "";
  if (showDealerCards) {
    // output all the dealer's cards
    for (var i = 0; i < dealerCards.length; i += 1) {
      dealerCardsString += `${dealerCards[i].name}${dealerCards[i].emoji} `;
    }
  } else {
    // otherwise only output the first card
    dealerCardsString += `${dealerCards[0].name}${dealerCards[0].emoji}`;
  }
  document.getElementById("dealer-cards").innerHTML = dealerCardsString;

  for (var i = 0; i < players.length; i += 1) {
    for (var j = 0; j < players[i].hands.length; j += 1) {
      var playerCardsString = "";
      players[i].points[j] = calculatePoints(players[i].hands[j]);
      for (var k = 0; k < players[i].hands[j].length; k += 1) {
        playerCardsString += `${players[i].hands[j][k].name}${players[i].hands[j][k].emoji} `;
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
  if (!deck) deck = makeDeck();
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
      players[j].hands[0].push(deck.pop());
    }
    dealerCards.push(deck.pop());
  }

  var dealerBlackjack = calculatePoints(dealerCards) == 21;
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
  updateTableUI();
  return output;
};

// this function is called when no players are left to act
// dealer will draw and compare value with all remaining players
var compareHandsWithDealer = function () {
  var output = "";
  var dealerPoints = calculatePoints(dealerCards);
  while (dealerPoints < DEALER_MIN) {
    dealerCards.push(deck.pop());
    dealerPoints = calculatePoints(dealerCards);
  }
  updateCardsUI(true);
  output += `Dealer has ${dealerPoints} points.<br>`;

  for (var i = 0; i < players.length; i += 1) {
    for (var j = 0; j < players[i].hands.length; j += 1) {
      if (!players[i].settled[j]) {
        output += `Player ${i + 1} has ${players[i].points[j]} points`;
        players[i].settled[j] = true;

        if (players[i].points[j] > dealerPoints || dealerPoints > MAX_VALUE) {
          players[i].chips += players[i].wager;
          output += ` and wins ${players[i].wager} chips!<br>`;
        } else if (players[i].points[j] < dealerPoints) {
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
  players[curPlayer].hands[handNum].push(deck.pop());
  updateCardsUI();
  if (players[curPlayer].points[handNum] > MAX_VALUE) {
    // if player busts then output msg
    var amtLost = players[curPlayer].wager;
    output += `Player ${
      curPlayer + 1
    } busts and loses ${amtLost} chips.<br><br>`;
    players[curPlayer].chips -= amtLost;
    players[curPlayer].settled[handNum] = true;

    if (players.every((p) => p.settled.every((s) => s))) output += resetGame();
    else output += findNextPlayer();
  } else {
    splitButton.style.display = "none";
  }
  updateTableUI();
  return output;
};

// this function is called when the stand button is clicked
var onPlayerStand = function () {
  var output = findNextPlayer();
  updateTableUI();
  return output;
};

// this function is called when the split button is clicked
var onPlayerSplit = function () {
  // give the player another hand, move one card from current hand to new hand
  // then deal one card each to both hands
  players[curPlayer].hands.push([]);
  players[curPlayer].hands[1].push(players[curPlayer].hands[0].pop());
  players[curPlayer].hands[0].push(deck.pop());
  players[curPlayer].hands[1].push(deck.pop());

  players[curPlayer].points.push(0);
  players[curPlayer].settled.push(false);

  updateCardsUI();
  updateTableUI();

  // show the 2nd hand and hide split button
  document.getElementById(`card-container-${curPlayer}-1`).style.display =
    "block";
  splitButton.style.display = "none";
  return `Player ${curPlayer + 1} splits.`;
};
