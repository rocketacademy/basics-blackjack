// "use strict";
let dealerCards = [];
let humanCards = [];
let playersScore = [0, 0];
let players = [];
let activePlayer = 0;
let playing = true;
let roundFirst = true;

// //Create makeDeckF function
const makeDeckF = function () {
  const deckCards = [];
  // console.log(deckCards);
  const suits = ["diamonds", "clubs", "hearts", "spades"];
  const faces = [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"];
  for (let suitsIndex = 0; suitsIndex < suits.length; suitsIndex++) {
    let suit = suits[suitsIndex];

    for (let facesIndex = 0; facesIndex < faces.length; facesIndex++) {
      let face = faces[facesIndex];
      let rank;

      if (face == "ace") {
        rank = 11;
      } else if (face == "jack" || face == "queen" || face == "king") {
        rank = 10;
      } else {
        rank = face;
      }
      // object created for cardFaceObject
      // let ranks = 0; // error that might need removal, causing ranks undefined error
      const cardObject = {
        faces: face,
        suits: suit,
        ranks: rank,
      };
      // add new card to deckCards
      deckCards.push(cardObject);
    }
  }
  // console.log(deckCards);
  return deckCards;
};

//  shuffle cards
const shuffleF = function () {
  const randomNumberF = function (dice) {
    return Math.trunc(Math.random() * dice) + 1;
  };
  const deck = makeDeckF();
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex++) {
    let currentCard = deck[currentIndex];
    let randomIndex = randomNumberF(deck.length - 1);

    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = currentCard;
  }

  return deck;
};
let sCards = shuffleF();
console.log(sCards);

// push Cards to human and dealer
const pushCardsF = function (card) {
  if (activePlayer === 0) {
    humanCards.push(card);
  } else {
    dealerCards.push(card);
  }
};

// create players // includes property: deck () - auto updates playersScore && dealersCards && humanCards
const playersF = function () {
  let cards = [];
  const playerHuman = {
    name: "human",
    deck: function () {
      let card = sCards.pop();
      playersScore[activePlayer] = playersScore[activePlayer] + card.ranks;
      pushCardsF(card);
    },
  };
  const playerDealer = {
    name: "dealer",
    deck: function () {
      let card = sCards.pop();
      playersScore[activePlayer] = playersScore[activePlayer] + card.ranks;
      pushCardsF(card);
    },
  };

  players.push(playerHuman, playerDealer);
};

// deal hand a time //auto updates dealerCards & humanCards & playersScore // auto checks Ace post deal round
const dealHandsF = function () {
  let card = sCards.pop();
  let output;
  //
  card = aceF(card);
  console.log(card);
  if (activePlayer === 0) {
    humanCards.push(card);
    playersScore[activePlayer] += card.ranks;
    output = `You draw ${card.faces} of ${card.suits}`;
  } else {
    dealerCards.push(card);
    playersScore[activePlayer] += card.ranks;
    output = `Dealer draws ${card.faces} of ${card.suits}`;
  }
  return output;
};

// switch player
const switchPlayersF = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// auto update using players object : draws a card and ; playersScore update; humanCards && dealerCards update
const playersUpdateF = function () {
  players[activePlayer].deck();
};

// playersScore update //not used, bugged; spews out NAN error in one part of array
const totalScoreF = function () {
  let currentScore;
  if (activePlayer === 0) {
    for (let i = 0; i < humanCards.length; i++) {
      currentScore = currentScore + humanCards[i].ranks;
      playersScore[activePlayer] = currentScore;
    }
    if (activePlayer === 1) {
      for (let x = 0; x < dealerCards.length; x++) {
        currentScore = currentScore + dealerCards[x].ranks;
        playersScore[activePlayer] = currentScore;
      }
    }
  }
};

const aceF = function (card) {
  let value = card.ranks;
  let currentScore = playersScore[activePlayer];
  let totalValue = currentScore + value;
  let nameCard = card.face;

  if (nameCard === "ace") {
    if (totalValue > 21) {
      card.ranks = 1;
    } else {
      card.ranks = 11;
    }
  }
  return card;
};

const startF = function () {
  dealerCards = [];
  humanCards = [];
  playersScore = [0, 0];
  players = [];
  activePlayer = 0;
  playing = true;
  roundFirst = true;
  shuffleF();
  playersF();
  sCards = shuffleF();
  return `enter (☞ﾟヮﾟ)☞  deal  ☜(ﾟヮﾟ☜) to deal cards`;
};

const dealerCheck = function () {
  let output1;
  let dealerArray = [];
  let i = 1;

  while (playersScore[1] < 17 && i < 5) {
    output1 = dealHandsF(); // has auto Ace check & playersScore update
    console.log(output1);
    dealerArray.push(output1);
    i++;
  }
  return `${dealerArray}<br>dealer has enough`;
};

// check win lose draw conditions
const checkF = function (human, dealer) {
  let checkWin;
  if (activePlayer === 0) {
    if (human === 21 && dealer === 21) {
      checkWin = `It is a 👔 tie, both Black Jack`;
      playing = false;
    }
    if (human < 21 && dealer === 21) {
      checkWin = `🥵 you lose. dealer has Black Jack`;
      playing = false;
    }
    if (human < 21 && dealer !== 21) {
      checkWin = `Enter 🎯🎯 hit or 🏡🏡 stay?`;
    }
    if (human > 21) {
      checkWin = `🥵 You lose`;
      playing = false;
    }
    if (roundFirst && human === 21 && dealer < 21) {
      checkWin = `💯You win, Black Jack`;
      playing = false;
    }
    if (!roundFirst && human === 21 && dealer < 21) {
      checkWin = `💯You win, it is not BJ`;
      playing = false;
    }
  }
  if (activePlayer === 1) {
    if (dealer === 21) {
      checkWin = `👿 dealer wins`;
      playing = false;
    }
    if (dealer > human && dealer <= 21) {
      checkWin = `👿 dealer wins`;
      playing = false;
    }
    if (dealer < human) {
      checkWin = `😇 dealer loses, you win`;
      playing = false;
    }
    if (dealer === human) {
      checkWin = `it is a tie`;
      playing = false;
    }
    if (dealer > 21) {
      checkWin = `😇 dealer loses`;
      playing = false;
    }
  }
  output = `You have ${playersScore[0]} score. Dealer has ${playersScore[1]}`;
  return `${output}<br><br>${checkWin}`;
};
// myOutputvalue function to UI
var main = function (input) {
  var myOutputValue;
  let output0;
  let output1;

  // start new game: Resets declared global variables
  if (input === "") {
    myOutputValue = startF();
  }
  // deal cards to starting round first only
  if (playing && input === "deal") {
    playersUpdateF(); // player--0
    output0 = `You draw ${humanCards[0].faces} of ${humanCards[0].suits}`;
    switchPlayersF();
    playersUpdateF(); // player--1
    output1 = `Dealer draws ${dealerCards[0].faces} of ${dealerCards[0].suits}`;
    switchPlayersF();
    playersUpdateF(); // player--0
    let output00 = `You draw ${humanCards[1].faces} of ${humanCards[1].suits}`;
    switchPlayersF();
    playersUpdateF(); // player--1
    let output11 = `Dealer draws ${dealerCards[1].faces} of ${dealerCards[1].suits}`;
    switchPlayersF();
    myOutputValue = `${output0} <br><br>${output1}<br><br>${output00}<br><br>${output11}<br><br>${checkF(
      playersScore[0],
      playersScore[1]
    )}`;
  }
  // stay
  if (playing && input === "stay") {
    roundFirst = false;
    switchPlayersF();
    console.log(activePlayer);
    output0 = dealerCheck();
    output1 = checkF(playersScore[0], playersScore[1]);
    console.log(output1);
    myOutputValue = `${output0}<br><br>${output1}`;
  }

  // if hit
  if (playing && input === "hit") {
    roundFirst = false;
    let output1 = dealHandsF(); // has Ace check function automated
    let output2 = checkF(playersScore[0], playersScore[1]);
    console.log(playersScore);
    myOutputValue = `${output1}<br><br>${output2}`;
  }
  return myOutputValue;
};
