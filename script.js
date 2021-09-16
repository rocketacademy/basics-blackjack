var deck;
var players = [];
var curPlayer = 0;
var computerCards = [];

const STARTING_CARDS = 2;
const MAX_VALUE = 21;
const DEALER_MIN = 17;

const newHandButton = document.getElementById("new-hand-button");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");

var initialisePlayers = function (playerNum) {
  for (var i = 0; i < Number(playerNum); i += 1) {
    players[i] = { cards: [], chips: 100, wager: 0, done: false };
  }
};

// helper function to create card
var makeCard = function (suit, emoji, rank) {
  // rank will be a number from 1 to 13, define a specialranks object for use later
  var specialRanks = {
    11: "J",
    12: "Q",
    13: "K",
    1: "A",
  };

  // set name and points value to first be equivalent to the rank value
  var name = rank.toString();
  var points = rank;

  // if the name is one of the keys in special ranks,
  // change name to be the corresponding value
  if (Object.keys(specialRanks).includes(name)) {
    name = specialRanks[rank];
    if (name != "A") points = 10; // for blackjack purpose, jack/queen/king = 10
  }

  // return card object
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

// reset game by making and shuffling a new deck, and clearing the player/computer cards
var resetGame = function () {
  deck = shuffleDeck(makeDeck());
  for (var i = 0; i < players.length; i += 1) {
    players[i].cards = [];
    players[i].done = false;

    var wagerSlider = document.getElementById(`wager-${i}`);
    var wagerVal = document.getElementById(`value-wager-${i}`);
    wagerSlider.disabled = false;
    wagerSlider.setAttribute("max", players[i].chips);
    wagerSlider.value = 1;
    wagerVal.innerHTML = 1;
  }
  curPlayer = 0;
  computerCards = [];

  newHandButton.disabled = false;
  hitButton.style.visibility = "hidden";
  standButton.style.visibility = "hidden";
};

// returns true/false based on whether the starting two cards satisfy blackjack
var checkForBlackjack = function () {
  var output = "";
  for (var i = 0; i < players.length; i += 1) {
    var cardsCopy = [...players[i].cards];
    cardsCopy.sort((a, b) => a.points - b.points);

    if (cardsCopy[0].points == 1 && cardsCopy[1].points == 10) {
      var amtWon = Math.round(1.5 * players[i].wager);
      players[i].chips += amtWon;
      players[i].done = true;
      output += `Player ${i + 1} has blackjack and wins ${amtWon} chips!<br>`;
    }
  }

  return output;
};

// returns blackjack point total for a given array of cards
var calculatePoints = function (cards) {
  var total = 0;
  var numAces = cards.reduce(
    (acc, cur) => (cur.name == "A" ? acc + 1 : acc),
    0
  );

  for (var i = 0; i < cards.length; i += 1) {
    total += cards[i].points;
  }

  for (var i = 0; i < numAces; i += 1) {
    if (total + 10 <= MAX_VALUE) total += 10;
  }
  return total;
};

var updateChips = function () {
  for (var i = 0; i < players.length; i += 1) {
    document.getElementById(
      `chip-count-${i}`
    ).innerHTML = `Chip count: ${players[i].chips}`;
  }
};

// returns an output to inform the player of the cards in play
var outputCards = function (showComputerCards = false) {
  var output = "";

  var computerCardsString = "";
  var computerPoints;
  if (showComputerCards) {
    // output all the dealer's cards
    // output += "Computer's cards:<br>";
    for (var i = 0; i < computerCards.length; i += 1) {
      // output += `${computerCards[i].name}${computerCards[i].emoji} `;
      computerCardsString += `${computerCards[i].name}${computerCards[i].emoji} `;
      computerPoints = calculatePoints(computerCards);
    }
  } else {
    // otherwise only output the first card
    // output += "Computer's face up card:<br>";
    // output += `${computerCards[0].name}${computerCards[0].emoji}`;
    computerCardsString += `${computerCards[0].name}${computerCards[0].emoji}`;
    computerPoints =
      computerCards[0].points == 1 ? "1 / 11" : computerCards[0].points;
  }
  document.getElementById("dealer-cards").innerHTML = computerCardsString;
  document.getElementById("dealer-points").innerHTML = `(${computerPoints})`;

  // output += "<br><br>";
  for (var i = 0; i < players.length; i += 1) {
    var playerCardsString = "";
    var playerPoints = calculatePoints(players[i].cards);
    // output += `Player ${i + 1}<br>`;
    for (var j = 0; j < players[i].cards.length; j += 1) {
      playerCardsString += `${players[i].cards[j].name}${players[i].cards[j].emoji} `;
      // output += `${players[i].cards[j].name}${players[i].cards[j].emoji} `;
    }
    // output += "<br><br>";
    document.getElementById(`player-cards-${i}`).innerHTML = playerCardsString;
    document.getElementById(
      `player-points-${i}`
    ).innerHTML = `(${playerPoints})`;
  }
  return output;
};

// this function is called when the new hand button is clicked
var dealNewHand = function () {
  if (!deck) deck = shuffleDeck(makeDeck());
  var output = "";

  for (var i = 0; i < players.length; i += 1) {
    var playerWager = document.getElementById(`wager-${i}`).value;
    players[i].wager = Number(playerWager);
  }

  // deal cards just like irl - players, dealer, players, dealer
  for (var i = 0; i < STARTING_CARDS; i += 1) {
    for (var j = 0; j < players.length; j += 1) {
      players[j].cards.push(deck.pop());
    }
    computerCards.push(deck.pop());
  }

  output += outputCards();
  output += checkForBlackjack();

  if (players.every((p) => p.done)) {
    // if players are all done then hand is over
    resetGame();
  } else {
    // otherwise show the hit/stand buttons to continue gameplay
    for (var i = 0; i < players.length; i += 1) {
      var wagerSlider = document.getElementById(`wager-${i}`);
      wagerSlider.disabled = true;
    }
    newHandButton.disabled = true;
    hitButton.style.visibility = "visible";
    standButton.style.visibility = "visible";

    while (curPlayer < players.length && players[curPlayer].done) {
      curPlayer += 1;
    }
  }

  updateChips();
  return output;
};

var compareHandsWithDealer = function () {
  var output = "";
  while (calculatePoints(computerCards) < DEALER_MIN) {
    // dealer has to hit to at least 17
    computerCards.push(deck.pop());
  }
  output += outputCards(true);
  var computerPoints = calculatePoints(computerCards);
  output += `<br><br>Computer has ${computerPoints} points.<br>`;

  for (var i = 0; i < players.length; i += 1) {
    if (!players[i].done) {
      var playerPoints = calculatePoints(players[i].cards);
      output += `Player ${i + 1} has ${playerPoints} points. `;

      if (playerPoints > computerPoints || computerPoints > MAX_VALUE) {
        players[i].chips += players[i].wager;
        output += `Player ${i + 1} wins ${players[i].wager} chips!<br>`;
      } else if (playerPoints < computerPoints) {
        players[i].chips -= players[i].wager;
        output += `Computer wins! Player ${i + 1} loses ${
          players[i].wager
        } chips.<br>`;
      } else output += `It's a tie!<br>`;

      players[i].done = true;
    }
  }

  if (players.every((p) => p.done)) resetGame();
  return output;
};

// this function is called when the hit button is clicked
var playerHit = function () {
  var output = "";
  players[curPlayer].cards.push(deck.pop());
  output += outputCards();
  var playerPoints = calculatePoints(players[curPlayer].cards);
  if (playerPoints > MAX_VALUE) {
    // if player busts then output msg
    output += `<br><br>Player ${curPlayer + 1} busts. Computer wins!<br>`;
    players[curPlayer].chips -= players[curPlayer].wager;
    players[curPlayer].done = true;
    curPlayer += 1;
    while (curPlayer < players.length && players[curPlayer].done) {
      curPlayer += 1;
    }
    if (curPlayer < players.length)
      output += `Player ${curPlayer + 1}'s turn.<br>`;
    else output += compareHandsWithDealer();
  }
  updateChips();
  return output;
};

// this function is called when the stand button is clicked
var playerStand = function () {
  var output = "";

  curPlayer += 1;
  while (curPlayer < players.length && players[curPlayer].done) {
    curPlayer += 1;
  }

  if (curPlayer < players.length) {
    output += outputCards();
    output += `Player ${curPlayer + 1}'s turn.<br>`;
    updateChips();
    return output;
  }

  output += compareHandsWithDealer();
  updateChips();

  return output;
};
