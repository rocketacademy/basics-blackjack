"use strict";
let players = [];
let activePlayer = 0;
let multiPlayerMode = false;
let bettingMode = false;
let dealHitStayMode = false;
let hitStay = false;
let dealerTurn = false;
let endGame = false;
let playingContinue = false;
let CONTINUE = false;

// global variables for html elements
const output = document.querySelector("#output-div");
const dealBtn = document.querySelector("#deal-button");
const stayBtn = document.querySelector("#stay-button");
const hitBtn = document.querySelector("#hit-button");
const restartBtn = document.querySelector("#restart-button");
const bet5Btn = document.querySelector("#five");
const bet10Btn = document.querySelector("#ten");

// bet button for $5
bet5Btn.addEventListener("click", function () {
  let result = main("5");
  output.innerHTML = result;
});
// bet button for $10
bet10Btn.addEventListener("click", function () {
  let result = main("10");
  output.innerHTML = result;
});
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
// ===== HELPER FUNCTIONS =====

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
    let randomIndex = randomNumber(deck.length - 1);

    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = deck[currentIndex];
  }

  return deck;
};

// create multiplayers
const multiPlayerCreate = function (numPlayers) {
  const cardsArray = [];
  let dealerNum = Number(numPlayers) + 1;
  for (let counter = 1; counter <= dealerNum; counter += 1) {
    if (counter === dealerNum) {
      const playerObject = {
        name: "Dealer",
        cardsHeld: cardsArray,
        cash: 1000,
        totalCardValue: 0,
        bet: 0,
        win: "",
      };
      players.push(playerObject);
    } else {
      const playerObject = {
        name: `player--${counter}`,
        cardsHeld: cardsArray,
        cash: 100,
        totalCardValue: 0,
        bet: 0,
        playing: true,
        win: "",
      };
      players.push(playerObject);
    }
  }
};

// restart game
const initGame = function () {
  players = [];
  activePlayer = 0;
  multiPlayerMode = false;
  bettingMode = false;
  dealHitStayMode = false;
  hitStay = false;
  dealerTurn = false;
  endGame = false;
  playingContinue = false;
  CONTINUE = false;
};
// display total card value for all players at once
const displayTotalCardValueAllPlayers = function () {
  let playerScore = "";
  let playerName = "";
  let myOutputValue = "";

  for (let counter = 0; counter < players.length; counter += 1) {
    playerScore = players[counter].totalCardValue;
    playerName = players[counter].name;
    myOutputValue += `${playerName} total card value is ${playerScore}<br>`;
  }
  return myOutputValue;
};
// draw, update cardsHeld & totalCardValue and display
const drawACardUpdateAndDisplay = function () {
  let shuffledCards = shuffleDeck();
  let cardDrawn = shuffledCards.pop();
  let cardAceCleared = aceCheck(cardDrawn);
  let cardSuit = cardAceCleared.suits;
  let cardFace = cardAceCleared.faces;
  let myOutputValue = "";
  let currentPlayer = players[activePlayer].name;

  players[activePlayer].cardsHeld.push(cardAceCleared);
  players[activePlayer].totalCardValue += cardAceCleared.ranks;
  myOutputValue = `${currentPlayer} drew ${cardFace} of ${cardSuit}. `;
  return myOutputValue;
};
// card value display
const intermittentCardValueDisplay = function () {
  let myOutputValue = "";
  let cardPlayer = players[activePlayer].name;
  let cardValue = players[activePlayer].totalCardValue;
  myOutputValue = `${cardPlayer} total current card value is ${cardValue}.<br/>`;
  return myOutputValue;
};
// deal cards one round
const dealCardsOneRound = function () {
  let myOutputValue = "";
  for (let counter = 0; counter < players.length; counter += 1) {
    myOutputValue += `${drawACardUpdateAndDisplay()}${intermittentCardValueDisplay()}`;
    activePlayer += 1;
  }
  activePlayer = 0;
  return myOutputValue;
};
// search for BlackJack in dealing round
const dealBlackjackCheckLoop = function () {
  let myOutputValue = "";
  for (let counter = 0; counter < players.length; counter += 1) {
    myOutputValue += `${winLossChecker()}<br>`;
    activePlayer += 1;
  }
  activePlayer = 0;
  return myOutputValue;
};
// search for Players that are still playing. Allowing to continue to Hit/stay else straight to payout.
const playingLoopCheck = function () {
  for (let i = 0; i < players.lenghth - 1; i++) {
    if (players[i].playing === true) {
      playingContinue = true;
    }
  }
};
// win loss check
const winLossChecker = function () {
  let myOutputValue = "";
  let cleanHuman = players[activePlayer].totalCardValue;
  let cleanDealer = players[players.length - 1].totalCardValue;

  // round: find players/dealer with Blackjack --> playing = false
  if (hitStay === false) {
    //player BlackJack. Player Wins
    if (cleanHuman === 21 && cleanDealer !== 21) {
      myOutputValue = `${players[activePlayer].name} wins with Blackjack.`;
      players[activePlayer].win = "win";
      players[activePlayer].playing = false;
    } // Both Blackjack. Both Tie
    else if (cleanHuman === 21 && cleanDealer === 21) {
      players[activePlayer].playing = false;
      players[activePlayer].win = "tie";
      myOutputValue += `${players[activePlayer].name} has Blackjack, so does the Dealer. It is a tie of Blackjacks.`;
    } // Dealer Blackjack. Player loses. Game go straight to payout.
    else if (cleanDealer === 21) {
      myOutputValue += `${players[activePlayer].name} loses. Dealer has Blackjack.`;
      players[players.length - 1].win = "win";
      for (let i = 0; i < players.length; i++) {
        players[i].playing = false;
        players[i].win = "lose";
      }
      endGame = true;
    }
  }
  // find players when Hit --> lose, hence playing = false
  if (hitStay === true && activePlayer < players.length - 1) {
    // activePlayer += 1;
    if (cleanHuman > 21) {
      players[activePlayer].win = "lose";
      myOutputValue = `${players[activePlayer].name} loses.`;
      players[activePlayer].playing = false;
      activePlayer += 1;
      if (activePlayer == players.length - 1) {
        // myOutputValue += `<br>Dealer's turn to roll`;
        playingContinue = true;
      }
      //  else {
      //   // activePlayer += 1;
      //   myOutputValue += `<br>${players[activePlayer].name}, you are next, Hit or Stay?`;
      // }
    }
  } // End game check
  if (hitStay === false && endGame === true) {
    if (cleanHuman === cleanDealer) {
      console.log(players[activePlayer].name);
      // tie
      players[activePlayer].win = "tie";
      myOutputValue = `${players[activePlayer].name} and Dealer have a tie.`;
    } // player wins
    else if (
      (cleanHuman <= 21 && cleanHuman > cleanDealer) ||
      (cleanHuman <= 21 && cleanDealer > 21)
    ) {
      myOutputValue = `${players[activePlayer].name} wins. Dealer loses.`;
      players[activePlayer].win = "win";
    } // player and dealer lose
    else if (cleanHuman > 21 && cleanDealer > 21) {
      myOutputValue = `Both ${players[activePlayer].name} and Dealer died.`;
      players[activePlayer].win = "tie";
    } // player loses
    else {
      myOutputValue = `${players[activePlayer].name} loses. Dealer wins.`;
      players[activePlayer].win = "lose";
      players[activePlayer].playing = false;
    }
  }

  return myOutputValue;
};
// all in one: deal, hit or stay
const dealHitStay = (input) => {
  let playerStatus = players[activePlayer].playing;
  let currentPlayer = players[activePlayer].name;
  let myOutputValue = "Error !. Invalid click. ";
  console.log(players[activePlayer].name);
  if (input === "d" && hitStay === false) {
    myOutputValue = "=== 1st round of deal cards === <br>";
    myOutputValue += dealCardsOneRound();
    myOutputValue += "<br/> === 2nd round of deal cards ===<br>";
    myOutputValue += dealCardsOneRound();
    myOutputValue += dealBlackjackCheckLoop();
    hitStay = true;
    const findFirstPlayer2HitOrStay = () => {
      for (let i = 0; i < players.length; i++) {
        if (players[i].playing == true) {
          myOutputValue += `=== Hit or Stay ===<br>${currentPlayer}.<br>${intermittentCardValueDisplay()}Click Hit or Stay.`;
          return myOutputValue;
        } else {
          return `=== this round is over ===`;
        }
      }
    };
    // find first player to begin hit or stay
    myOutputValue = findFirstPlayer2HitOrStay();
  } // hit choice
  else if (input === "h" && hitStay === true && playerStatus === true) {
    console.log(players[activePlayer].name);
    myOutputValue = `${drawACardUpdateAndDisplay()}${intermittentCardValueDisplay()}${winLossChecker()}`;

    if (players[activePlayer].playing == true) {
      myOutputValue += `${players[activePlayer].name}, please decide to Hit or Stay.`;
    } else {
      // condition prevents dealer to enter
      if (activePlayer < players.length - 2) {
        activePlayer += 1;
        myOutputValue += `${
          players[activePlayer].name
        },${intermittentCardValueDisplay()} please decide to Hit or Stay.<br>`;
      } else {
      }
    }
  } // stay choice
  else if (input === "s" && hitStay === true && playerStatus === true) {
    playingContinue = true;
    if (players[activePlayer].playing == true) {
      myOutputValue = `${
        players[activePlayer].name
      } chose to stay.<br/>${intermittentCardValueDisplay()}<br>`;
      players[activePlayer].playing = false;
      activePlayer += 1;
      if (activePlayer < players.length - 1) {
        myOutputValue += `${
          players[activePlayer].name
        }, please decide to Hit or Stay.<br>${intermittentCardValueDisplay()}`;
      } else {
        myOutputValue += `===Players are done picking===`;
      }
    }
  }
  return myOutputValue;
};
// betting amount display
const bettingDisplay = function (betAmt) {
  let myOutputValue = "";
  let currentPlayerObject = players[activePlayer];
  let currentPlayerName = currentPlayerObject.name;
  currentPlayerObject.bet = betAmt;
  myOutputValue += `${currentPlayerName} bets ${betAmt} dollars.<br>`;

  return myOutputValue;
};
// betting deduct from cash display
const betDeductNDisplay = function (betAmt) {
  let currentPlayerObject = players[activePlayer];
  let currentPlayerName = currentPlayerObject.name;
  players[activePlayer].cash -= betAmt;
  let currentPlayerCash = currentPlayerObject.cash;
  return `${currentPlayerName} has ${currentPlayerCash} dollars left.`;
};
// check Ace 11 or 1
const aceCheck = function (card) {
  let cardRank = card.ranks;
  let nameCard = card.faces;
  let currentTotalC = players[activePlayer].totalCardValue;
  let totalWithCard = currentTotalC + cardRank;

  if (nameCard === "ace") {
    if (totalWithCard >= 21) {
      card.ranks = 1;
    } else {
      card.ranks = 11;
    }
  }
  return card;
};
// dealer picks cards
const dealerPickCard = function () {
  let myOutputValue = `Dealer's current hand ${
    players[players.length - 1].totalCardValue
  }.<br>`;

  let i = 1;
  while (players[activePlayer].totalCardValue < 17 && i < 21) {
    myOutputValue += `${drawACardUpdateAndDisplay()} <br/>`;
    myOutputValue += `${intermittentCardValueDisplay()}<br/>`;
    i++;
    if (players[activePlayer].totalCardValue > 21) {
      players[players.length - 1].win = "lose";
      myOutputValue += `Dealer died/lose.<br>`;
    } else {
      myOutputValue += `Dealer has enough cards. Total hand ${
        players[players.length - 1].totalCardValue
      } <br/>`;
    }
  }
  activePlayer = 0;
  return myOutputValue;
};
// end game win loss check
const endGameWinLossLoopCheck = function () {
  let myOutputValue = "";
  for (let counter = 0; counter < players.length - 1; counter += 1) {
    myOutputValue += `${winLossChecker()}<br>`;
    myOutputValue += intermittentCardValueDisplay();
    activePlayer += 1;
  }
  activePlayer = 0;
  return myOutputValue;
};
// pay out of win and loss
const payOut = function () {
  let myOutputValue = "<br>=== payout round ===<br>";
  for (let i = 0; i < players.length - 1; i++) {
    let betAmt = Number(players[i].bet);
    let player = players[i].name;
    let playerObj = players[i];
    let dealerObj = players[players.length - 1];
    let dealer = players[players.length - 1].name;
    if (players[i].win === "win") {
      players[i].cash += betAmt;
      players[i].cash += betAmt;
      players[players.length - 1].cash -= betAmt;

      myOutputValue += `${player} wins ${betAmt}, cash at ${playerObj.cash} dollars. Dealer cash now at ${dealerObj.cash} dollars.<br>`;
    }
    if (players[i].win === "lose") {
      players[players.length - 1].cash += betAmt;
      myOutputValue += `${player} loses ${betAmt} dollars, cash at ${playerObj.cash} dollars. ${dealer} gains ${betAmt} dollars, cash at ${dealerObj.cash} dollars.<br>`;
    }
    if (
      players[i].win === players[players.length - 1].win ||
      players[i].win === "tie"
    ) {
      myOutputValue += `${player} and ${dealer} are tied. No one loses any cash.<br>`;
    }
    activePlayer += 1;
    players[i].bet = 0;
  }
  activePlayer = 0;
  return myOutputValue;
};
// restart game for continuation of existing players while retain cash
const noNewPlayersInitGame = function () {
  let cashArray = [];

  for (let i = 0; i < players.length; i++) {
    cashArray.push(players[i].cash);
  }
  initGame();
  multiPlayerCreate(cashArray.length - 1);
  bettingMode = true;
  for (let index = 0; index < players.length; index++) {
    players[index].cash = cashArray[index];
  }

  let myOutputValue = "Please make your bets now. Start with Player--1";
  return myOutputValue;
};
// display to browser function
const main = function (input) {
  let myOutputValue = "Error. Invalid response !";
  // start game by clicking "submit"
  // introduction
  if (input === "") {
    initGame();
    myOutputValue = `Welcome to...<br><br> sure2Lose##Blackjack Gaming Den##sure2Lose.<br><br> To begin, please input number of players`;
    multiPlayerMode = true;
    // CONTINUE = false;
  } else if (
    multiPlayerMode === true &&
    Number.isNaN(Number(input)) === false
  ) {
    // multiplayer input. Player Numbers are non inclusive of dealer
    let playerNumbers = input;
    multiPlayerCreate(playerNumbers);
    multiPlayerMode = false;
    bettingMode = true; // switches on betting
    myOutputValue = `Excluding the Dealer, ${playerNumbers} players were created.<br> Please input your bets now.<br>Start with Player--1.<br/>`;
  } // bet amount input n display
  else if (
    // ensures only numbers are input
    bettingMode === true &&
    activePlayer < players.length - 1 &&
    Number.isInteger(Number(input))
  ) {
    let bet = Number(input);
    myOutputValue = bettingDisplay(bet);
    myOutputValue += `${betDeductNDisplay(bet)}<br>`;
    activePlayer += 1;
    // prompts players for bets while keeping below array length n EX-dealer
    if (activePlayer < players.length - 1) {
      myOutputValue += `${players[activePlayer].name}, what is your bet ?`;
    } // catches the last player EX-dealer and ends betting round
    if (activePlayer >= players.length - 1) {
      myOutputValue += `<br/>Bets done! Dealing cards now.<br> Click Deal now.`;
      bettingMode = false; // switches off betting
      dealHitStayMode = true; // switches on dealHitStay mode
      activePlayer = 0;
    }
    // deal hit and stay mode begins
  } else if (
    dealHitStayMode === true &&
    (input === "d" || input === "h" || input === "s")
  ) {
    // deal cards to everyone for two round then,--> hit or stay decision
    myOutputValue = dealHitStay(input);
    playingLoopCheck();
    // Dealer picking cards as last player
    if (playingContinue && activePlayer >= players.length - 1) {
      myOutputValue += `<br/><br>===Dealer's turn.===<br>`;
      myOutputValue += dealerPickCard();
      dealHitStayMode = false; // turn off deal hit stay mode
      endGame = true; // turn on end game
    }
  }
  // end game check and payout
  if (endGame === true) {
    hitStay = false; // turn off hit stay mode
    myOutputValue += "<br>===End game winners and losers===<br>";
    myOutputValue += `${endGameWinLossLoopCheck()}${payOut()}`;
    myOutputValue += `<br>===Restart by clicking Restart or Submit===<br>===To continue with the same players, type "C"===`;
    endGame = false; // turn off end game mode
    CONTINUE = true; // turn on continue with exist players cash retained mode
    return myOutputValue;
  }
  // if decision to continue game with existing players
  if (CONTINUE && input !== "") {
    if (input === "C") {
      //extracts cash from players[], restarts game and push cash back to "new" players[]
      myOutputValue = noNewPlayersInitGame();
    } else {
      myOutputValue = `Please only click "C" in capitals to continue game with current players or click restart for new players`;
    }
  }
  return myOutputValue;
};
