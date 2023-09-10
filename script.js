/*

player choose: hit or stand.
if hit, draw card, player card total updates itself. loop back for player to choose.
if player card total exceeds 21, BUST. player loses bet. end round.

if player chooses stand,
if dealer card total is less than 17, draw card until dealer card total is 17 or more.
if dealer card total is 17 or more, expose all dealer's cards.
if dealer card total exceeds 21, BUST. player wins bet. end round.
if player card total = dealer card total, TIE. end round.
if player card total > dealer card total, YOU WIN. player wins bet. end round.
if player card total < dealer card total, DEALER WINS. player loses bet. end round.

[if card rank = 1, and cardTotalValue doesn't exceed 21, count card value as 11.
if card rank = 1, and cardTotalValue exceeds 21, count card value as 1.
e.g.
A,9. count as 11,9.
5,9,A. count as 15.]

 */

// make a shuffled deck
var makeDeck = function () {
  var deck = [];

  var suits = ["hearts", "diamonds", "clubs", "spades"];
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    var currentSuit = suits[suitIndex];
    for (var rank = 1; rank <= 13; rank += 1) {
      var name = rank;
      if (rank == 1) {
        name = "ace";
      } else if (rank == 11) {
        name = "jack";
      } else if (rank == 12) {
        name = "queen";
      } else if (rank == 13) {
        name = "king";
      }
      var score = rank;
      if (rank == 11 || rank == 12 || rank == 13) {
        score = 10;
      } else if (rank == 1) {
        score = 11;
      }
      deck.push({
        name: name,
        rank: rank,
        suit: currentSuit,
        score: score,
      });
    }
  }
  return deck;
};
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function (cardDeck) {
  for (var i = 0; i < cardDeck.length; i += 1) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[i];
    cardDeck[i] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

var deck = makeDeck();

// have 6 shuffled decks
var shuffledDeckOne = shuffleCards(deck);
var shuffledDeckTwo = shuffleCards(structuredClone(deck));
var shuffledDeckThree = shuffleCards(structuredClone(deck));
var shuffledDeckFour = shuffleCards(structuredClone(deck));
var shuffledDeckFive = shuffleCards(structuredClone(deck));
var shuffledDeckSix = shuffleCards(structuredClone(deck));
var sixDecks = shuffledDeckOne.concat(
  shuffledDeckTwo,
  shuffledDeckThree,
  shuffledDeckFour,
  shuffledDeckFive,
  shuffledDeckSix
);

// player starts with $1000
var playerMoneyTotal = 1000;
var bet = 0;

var dealer = {
  cards: [],
  score: 0,
  isDealer: true,
};

var player = {
  cards: [],
  score: 0,
  isDealer: false,
};

var output = "";

// [if card rank = 1, and cardTotalValue doesn't exceed 21, count card value as 11.
// if card rank = 1, and cardTotalValue exceeds 21, count card value as 1.
// e.g.
// A,9. count as 11,9.
// 5,9,A. count as 15.]
var calcScore = function (person) {
  person.score = 0;
  for (var i = 0; i < person.cards.length; i += 1) {
    person.score += person.cards[i].score;
  }
  console.log(person.score);
  for (var i = 0; i < person.cards.length; i += 1) {
    if (person.cards[i].rank == 1) {
      if (person.score > 21) {
        person.cards[i].score = 1;
      }
    }
  }
  person.score = 0;
  for (var i = 0; i < person.cards.length; i += 1) {
    person.score += person.cards[i].score;
  }
  console.log(person.score);
};

var blackJackCheck = function () {
  if (player.score == 21 && dealer.score == 21) {
    console.log("PLAYER AND DEALER BLACK JACKS. PUSH");
  } else if (player.score == 21) {
    console.log("PLAYER BLACKJACK");
  } else if (dealer.score == 21) {
    console.log("DEALER BLACKJACK");
  }
};

var gameOver = function () {
  if (player.score > 21) {
    console.log("PLAYER BUST");
  } else if (dealer.score > 21) {
    console.log("DEALER BUST");
  } else if (player.score == dealer.score) {
    console.log("PUSH");
  } else if (player.score > dealer.score) {
    console.log("PLAYER WINS");
  } else if (player.score < dealer.score) {
    console.log("DEALER WINS");
  }
};

var playerHit = function () {
  player.cards.push(sixDecks.pop());
  calcScore(player);
  console.log(player.score);
  console.log(player.cards[player.cards.length - 1]);
  if (player.score > 21) {
    // Player loses bet, Reset values?
    gameOver();
  }
};

// if player chooses stand,
// if dealer card total is less than 17, draw card until dealer card total is 17 or more.
// if dealer card total is 17 or more, expose all dealer's cards.
// if dealer card total exceeds 21, BUST. player wins bet. end round.
// if player card total = dealer card total, TIE. end round.
// if player card total > dealer card total, YOU WIN. player wins bet. end round.
// if player card total < dealer card total, DEALER WINS. player loses bet. end round.
var playerStand = function () {
  while (dealer.score < 17) {
    dealer.cards.push(sixDecks.pop());
    calcScore(dealer);
  }
  console.log(dealer.cards);
  console.log(dealer.score);
  gameOver();
};

var main = function (input) {
  // player input bet: $2-$500. clicks "Deal"
  if (isNaN(input) || input < 2 || input > 500) {
    output = "Please enter a number from 2 to 500.";
  } else {
    bet = input;
    // sequence of card drawing: player, dealer, player, dealer(face down).
    player.cards.push(sixDecks.pop());
    dealer.cards.push(sixDecks.pop());
    player.cards.push(sixDecks.pop());
    dealer.cards.push(sixDecks.pop());

    // display card totals for player and dealer
    calcScore(player);
    calcScore(dealer);
    output = `Player: ${player.cards[0].name} of ${player.cards[0].suit},${player.cards[1].name} of ${player.cards[1].suit}. ${player.score} <br>Dealer: ${dealer.cards[0].name} of ${dealer.cards[0].suit}, XX. ${dealer.cards[0].score}`;
    blackJackCheck();
  }
  return output;
};
