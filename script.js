"use strict";
let playersScore = [0, 0];
let players = [];
let activePlayer = 0;
let playing = false;
let roundFirst = true;
let userNameRound = false;
let dealRound = 1;

const output = document.querySelector("#output-div");
const dealBtn = document.querySelector("#deal-button");
const stayBtn = document.querySelector("#stay-button");
const hitBtn = document.querySelector("#hit-button");
const restartBtn = document.querySelector("#restart-button");

// //Create makeDeckF function
const makeDeck = function () {
  const deckCards = [];
  // console.log(deckCards);
  const suits = ["diamonds", "clubs", "hearts", "spades"];
  const faces = [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"];
  for (let suitsIndex = 0; suitsIndex < suits.length; suitsIndex += 1) {
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
const shuffleDeck = () => {
  const randomNumber = function (dice) {
    return Math.trunc(Math.random() * dice) + 1;
  };
  let deck = makeDeck();
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex += 1) {
    let currentCard = deck[currentIndex];
    let randomIndex = randomNumber(deck.length - 1);

    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = currentCard;
  }

  return deck;
};

const shuffledCards = shuffleDeck();
// console.log(shuffledCards);

const pushCardsToPlayersCardsHeld = function (card) {
  if (activePlayer == 0) {
    players[0].cardsHeld.push(card);
  } else {
    players[1].cardsHeld.push(card);
  }
  return card;
};

// create players that contains *** method called deck () ==> picks card ==> pushes to cardsHeld array ; auto updates playersScore
const playersCreate = function () {
  const cardsArray = [];

  const playerHuman = {
    name: "",
    deck: function () {
      let card = shuffledCards.pop();
      playersScore[activePlayer] = playersScore[activePlayer] + card.ranks;
      pushCardsToPlayersCardsHeld(card);
      return card;
    },
    cardsHeld: cardsArray,
  };

  const playerDealer = {
    name: "dealer",
    deck: function () {
      // draws card from shuffled deck
      let card = shuffledCards.pop();
      playersScore[activePlayer] = playersScore[activePlayer] + card.ranks;
      pushCardsToPlayersCardsHeld(card);
      return card;
    },
    cardsHeld: cardsArray,
  };

  players.push(playerHuman, playerDealer);
};

// deal hand a time //auto updates cardHeld array & playersScore // auto checks Ace post deal round
const dealHands = function (sCards) {
  let card = sCards.pop();
  let myOutputValue = "";
  let playersName = players[0].name;

  card = aceCheck(card);
  console.log(card);
  if (activePlayer === 0) {
    players[activePlayer].cardsHeld.push(card);
    playersScore[activePlayer] += card.ranks;
    myOutputValue = `${playersName} draw ${card.faces} of ${card.suits}`;
  } else {
    players[activePlayer].cardsHeld.push(card);
    playersScore[activePlayer] += card.ranks;
    myOutputValue = `🆚Dealer draws ${card.faces} of ${card.suits}<br/><br/>`;
  }
  return myOutputValue;
};

// switch player
const switchPlayers = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// auto update using players object : draws a card-->push to property cardsHeld in Player object, and updates playersScore,
const playersMethodActivate = function () {
  // activiate method-deck in player object
  return players[activePlayer].deck();
};

// playersScore update //not used in project cuz initial error due to sCards. Now solved.
const totalScore = function () {
  let currentScore;
  if (activePlayer == 0) {
    for (let i = 0; i < humanCards.length; i++) {
      currentScore = currentScore + humanCards[i].ranks;
      playersScore[activePlayer] = currentScore;
    }
    if (activePlayer == 1) {
      for (let x = 0; x < dealerCards.length; x++) {
        currentScore = currentScore + dealerCards[x].ranks;
        playersScore[activePlayer] = currentScore;
      }
    }
  }
};
// ace check to be 1 if total score > 21
const aceCheck = function (card) {
  let value = card.ranks;
  let currentScore = playersScore[activePlayer];
  let totalValue = currentScore + value;
  let nameCard = card.faces;

  if (nameCard === "ace") {
    if (totalValue > 21) {
      card.ranks = 1;
    } else {
      card.ranks = 11;
    }
  }
  return card;
};
// resets game to ground zero
const initGame = function () {
  playersScore = [0, 0];
  players = [];
  activePlayer = 0;
  playing = false;
  roundFirst = true;
  userNameRound = false;
  dealRound = 1;
  shuffleDeck();
  console.log(shuffleDeck());
  playersCreate();
};
// check dealer to keep drawing if dealer score < 17
const dealerWinCheck = function () {
  let output1;
  let dealerArray = [];
  let i = 1;

  while (playersScore[1] < 17 && i < 21) {
    output1 = dealHands(shuffledCards); // has auto Ace check & playersScore update
    console.log(output1);
    dealerArray.push(output1);
    i++;
  }
  return `${dealerArray}<br>Dealer has enough`;
};

// check win lose draw conditions
const humanWinCheck = function (human, dealer) {
  let checkWin;
  let playersName = players[0].name;

  if (activePlayer === 0) {
    if (human === 21 && dealer === 21) {
      checkWin = `It is a 👔 tie, both Black Jack`;
      playing = false;
    }
    if (human < 21 && dealer === 21) {
      checkWin = `🥵 ${playersName} lose. Dealer has Black Jack`; // lose
      playing = false;
    }
    if (human < 21 && dealer !== 21) {
      checkWin = `Click 🎯🎯 "Hit" or 🏡🏡 "Stay" ?`;
    }
    if (human > 21) {
      checkWin = `🥵 ${playersName} lose`; // lose
      playing = false;
    }
    if (roundFirst && human === 21 && dealer < 21) {
      // win
      checkWin = `💯${playersName} win, Black Jack`;
      playing = false;
    }
    if (!roundFirst && human === 21 && dealer < 21) {
      // win
      checkWin = `💯${playersName} win, it is not BJ`;
      playing = false;
    }
  }

  if (activePlayer === 1) {
    if (dealer === 21) {
      checkWin = `👿 Dealer wins`; // lose
      playing = false;
    }
    if (dealer > human && dealer <= 21) {
      checkWin = `👿 Dealer wins`; // lose
      playing = false;
    }
    if (dealer < human) {
      checkWin = `😇 Dealer loses, ${playersName} win`; // win
      playing = false;
    }
    if (dealer === human) {
      checkWin = `It is a tie`;
      playing = false;
    }
    if (dealer > 21) {
      checkWin = `😇 Dealer loses`; // win
      playing = false;
    }
  }

  let output = `${playersName} has ${playersScore[0]} score. Dealer has ${playersScore[1]}`;
  return `${output}<br><br>${checkWin}`;
};

const dealCardsInitial = function () {
  let myOutputValue;
  let cardFace = "";
  let cardSuit = "";
  let output0;
  let output1;
  let output00;
  let output11;
  let cardDrawn;
  let playersName = players[0].name;

  if (dealRound == 1) {
    cardDrawn = playersMethodActivate(); // player--0
    cardFace = cardDrawn.faces;
    cardSuit = cardDrawn.suits;
    output0 = `${playersName} draw ${cardFace} of ${cardSuit}`;
    switchPlayers();

    cardDrawn = playersMethodActivate(); // player--1
    cardFace = cardDrawn.faces;
    cardSuit = cardDrawn.suits;
    output1 = `Dealer draws ${cardFace} of ${cardSuit}`;
    switchPlayers();
    dealRound += 1;
  }
  if (dealRound == 2) {
    cardDrawn = playersMethodActivate(); // player--0
    output00 = `${playersName} draw ${cardFace} of ${cardSuit}`;
    switchPlayers();

    cardDrawn = playersMethodActivate(); // player--1
    output11 = `Dealer draws ${cardFace} of ${cardSuit}`;
    switchPlayers();
    dealRound += 1;
  }
  myOutputValue = `${output0} <br><br>${output1}<br><br>${output00}<br><br>${output11}<br><br>${humanWinCheck(
    playersScore[0],
    playersScore[1]
  )}`;
  return myOutputValue;
};

const stayHand = function () {
  roundFirst = false;
  switchPlayers();
  let output0 = dealerWinCheck();
  let output1 = humanWinCheck(playersScore[0], playersScore[1]);
  let myOutputValue = `${output0}<br><br>${output1}`;
  return myOutputValue;
};

const hitHand = function () {
  roundFirst = false;
  let output1 = dealHands(shuffledCards); // has Ace check function automated
  let output2 = humanWinCheck(playersScore[0], playersScore[1]);
  console.log(playersScore);
  let myOutputValue = `${output1}<br><br>${output2}`;
  return myOutputValue;
};

const introRestartGame = function () {
  let myOutputValue = "";
  if (
    dealRound >= 1 &&
    ((userNameRound == false && playing == true) ||
      (userNameRound == false && playing == false))
  ) {
    initGame();
    let introMessage = `☠☠☠ Welcome to Basics Blackjack game ☠☠☠<br/><br/> Please provide us your name before game initiates.`;
    myOutputValue = introMessage;
  }

  if (userNameRound == true && playing == false) {
    initGame();
    console.log(userNameRound);
    let introMessage = `Welcome to Basics Blackjack game.<br/><br/> Please provide us with your name before game initiates.`;
    myOutputValue = introMessage;
  }
  return myOutputValue;
};

const storeNameGuide2InputD = function (input) {
  let userName = input;
  let myOutputValue;
  players[0].name = userName;
  userNameRound = false;
  playing = true;
  myOutputValue = `Thank you ${userName}. <br/><br/>Please press "Deal" to start dealing cards to you and the computer.`;
  return myOutputValue;
};
const dealStandHit = function (input) {
  let myOutputValue;
  if (input == "d") {
    myOutputValue = dealCardsInitial();
  } else if (input == "s") {
    myOutputValue = stayHand();
  } else if (input == "h") {
    myOutputValue = hitHand();
  }
  return myOutputValue;
};

// Deal button click --> function
dealBtn.addEventListener("click", function () {
  let result = main("d");
  output.innerHTML = result;
});
// Stay button click --> function
stayBtn.addEventListener("click", function () {
  let result = main("s");
  output.innerHTML = result;
});
// Hit button click --> function
hitBtn.addEventListener("click", function () {
  let result = main("h");
  output.innerHTML = result;
});
// Restart button click --> function
restartBtn.addEventListener("click", function () {
  let result = main("");
  output.innerHTML = result;
});

const main = function (input) {
  // default message when no condition satisfy meaning == ERROR ==
  let myOutputValue = `Error. You either have not given us your name or tried keying in invalid inputs. <br/><br/>
  To continue, gives us your name or click "Deal" or "Hit" or "Stay" when prompted.<br/><br/>You may click "Submit" or "Restart anytime to restart game.`;

  // constant image to browser
  const imageConstant =
    '<img src="https://c.tenor.com/FNWDvGwBAA4AAAAC/tom-hardy-yak%C4%B1%C5%9F%C4%B1kl%C4%B1.gif"/>';

  // intro or restart Game
  if (input == "") {
    myOutputValue = introRestartGame(input);
    userNameRound = true;
  }

  // store players name and guide to press click Deal to deal initial hands
  if (
    !(input == "" || input == "s" || input == "d" || input == "h") &&
    userNameRound == true &&
    playing == false
  ) {
    myOutputValue = storeNameGuide2InputD(input);
  }

  // deal; hit; stand choice and choice consequence
  if (
    userNameRound == false &&
    playing == true &&
    ((input == "d" && dealRound < 3) ||
      (input == "s" && dealRound >= 3) ||
      (input == "h" && dealRound >= 3))
  ) {
    myOutputValue = dealStandHit(input);
  }
  return imageConstant + "<br />" + myOutputValue;
};
