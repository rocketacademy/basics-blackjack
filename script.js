// function to make deck, borrowed from RA
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive)., borrowed from RA
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array , borrowed from RA
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

//Deal 2 cards to each player and calculate the current score
var dealHands = function () {
  for (let i = 0; i <= totalPlayers; i++) {
    playersHands[i].hand.push(shuffledDeck.pop());
    playersHands[i].hand.push(shuffledDeck.pop());
    calcScore(i);
  }
};

//Check for instant wins and to determine the next player
var blackjackChecker = function () {
  for (let i = 0; i <= totalPlayers; i++) {
    if (
      (playersHands[i]["hand"][0]["rank"] == 1 &&
        playersHands[i]["hand"][1]["rank"] >= 10) ||
      (playersHands[i]["hand"][0]["rank"] >= 10 &&
        playersHands[i]["hand"][1]["rank"] == 1)
    ) {
      playersHands[i].blackjackFlag = 1;
    } else {
      playersHands[i].blackjackFlag = 0;
    }
  }
  playerBlackjackFlag = 0;

  if (playersHands[0].blackjackFlag == 1) {
    for (let i = 1; i <= totalPlayers; i++) {
      if (playersHands[i].blackjackFlag == 0) {
        playersHands[i].wallet -= playersHands[i].bet;
      }
    }
    bettingPlayer = 1;
    score = printPlayers();

    return `Dealer has BlackJack! (▀̿Ĺ̯▀̿ ̿)<br> Player ${playersHands[bettingPlayer].playerNum} please place your bet. <br> ${score} `;
  } else {
    for (let i = 1; i <= totalPlayers; i++) {
      if (playersHands[i].blackjackFlag == 1) {
        playersHands[i].wallet += playersHands[i].bet * 2;
        playersHands[i].turnDoneFlag = 1;
        playerBlackjackFlag = 1;
      }
    }
  }
  if (playerBlackjackFlag == 1) {
    let outputMessage = ``;
    for (let i = 1; i <= totalPlayers; i++) {
      if (playersHands[i].blackjackFlag == 1) {
        outputMessage += `<br>Player ${playersHands[i].playerNum} has Blackjack! ♪┏(・o･)┛♪`;
      }
      nextPlayer = determineNextPlayer();
      currentPlayer = nextPlayer;
      return (outputMessage += `<br>Player ${playersHands[currentPlayer].playerNum}, please press submit to see your hand`);
    }
  } else {
    nextPlayer = determineNextPlayer();
    currentPlayer = nextPlayer;
    return `No Blackjack.<br>Player ${playersHands[currentPlayer].playerNum}, please press submit to see your hand`;
  }
};
//To handle bet placement by the players
var betInit = function (bet) {
  if (bet > playersHands[bettingPlayer].wallet || bet == 0) {
    return `Invalid bet, please place another bet <br> You have $${playersHands[bettingPlayer].wallet} `;
  }
  playersHands[bettingPlayer].bet = bet;
  bettingPlayer += 1;
  if (bettingPlayer <= totalPlayers) {
    return `Player ${
      playersHands[bettingPlayer - 1].playerNum
    } placed a bet of $${playersHands[bettingPlayer - 1].bet} <br> Player ${
      playersHands[bettingPlayer].playerNum
    } please place your bet.`;
  } else {
    return `Player ${
      playersHands[bettingPlayer - 1].playerNum
    } placed a bet of $${
      playersHands[bettingPlayer - 1].bet
    } <br> Please press submit to deal hands`;
  }
};

//To print the scoreboard of the players, showing the score, hand and money left from the round
var printPlayers = function () {
  let outputMessage = `<br>Current Score<br><br>Player\xa0\xa0\xa0\xa0Score\xa0\xa0\xa0\xa0Wallet\xa0\xa0\xa0\xa0Hand<br>`;
  for (let i = 0; i <= totalPlayers; i++) {
    outputMessage += `<br>${String(playersHands[i].playerNum).padEnd(
      10,
      "\xa0"
    )}\xa0${playersHands[i].score}\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0${
      playersHands[i].wallet
    }\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 ${printHand(i)} `;
  }
  return outputMessage;
};

//To determine the next player based on whether their turn is done
var determineNextPlayer = function () {
  for (let i = 1; i <= totalPlayers; i++) {
    if (playersHands[i].turnDoneFlag == 0) {
      return i;
    }
  }
};

//Print out the hand of the player
var printHand = function (playerIndex) {
  let outputMessage = "";
  for (let i = 0; i < playersHands[playerIndex].hand.length; i++) {
    outputMessage += `${playersHands[playerIndex].hand[i].name}${playersHands[playerIndex].hand[i].suit}\xa0\xa0`;
  }
  return outputMessage;
};

//Calculate the score of the player based on their index with 0 being the dealer and 1 being player 1 and so on
var calcScore = function (playerIndex) {
  let noOfAce = 0;
  playersHands[playerIndex].score = 0;
  for (let i = 0; i < playersHands[playerIndex].hand.length; i++) {
    score = playersHands[playerIndex].hand[i].rank;
    if (score > 10) {
      score = 10;
    }
    if (score == 1) {
      noOfAce += 1;
    }
    playersHands[playerIndex].score += score;
  }
  for (let i = 0; i < noOfAce; i++) {
    if (playersHands[playerIndex].score <= 11) {
      playersHands[playerIndex].score += 10;
    }
  }
};

//Run the dealer's turn
var dealerTurn = function () {
  while (playersHands[0].turnDoneFlag == 0) {
    if (playersHands[0].score < 16) {
      playersHands[0].hand.push(shuffledDeck.pop());
      calcScore(0);
    } else {
      playersHands[0].turnDoneFlag = 1;
    }
  }
};

//Settle who wins and the wager
var tabulateScore = function () {
  for (let i = 1; i <= totalPlayers; i++) {
    if (playersHands[i].blackjackFlag == 0) {
      if (playersHands[0].score <= 21 && playersHands[i].score > 21) {
        playersHands[i].wallet -= playersHands[i].bet;
      } else if (playersHands[0].score <= 21) {
        if (playersHands[i].score - playersHands[0].score > 0) {
          playersHands[i].wallet += playersHands[i].bet;
        }
        if (playersHands[i].score - playersHands[0].score < 0) {
          playersHands[i].wallet -= playersHands[i].bet;
        }
      } else if (playersHands[0].score > 21) {
        if (playersHands[i].score <= 21) {
          playersHands[i].wallet += playersHands[i].bet;
        }
      }
    }
  }
};

//To initialise the number of players
var playerInit = function (input) {
  totalPlayers = input;
  for (let i = 0; i <= totalPlayers; i++) {
    let playerIndex = i;
    if (i == 0) {
      playerIndex = "Dealer";
    }
    var player = {
      playerNum: playerIndex,
      wallet: 100,
      hand: [],
      turnDoneFlag: 0,
      turn: 1,
      score: 0,
    };
    playersHands.push(player);
  }
  return `${totalPlayers} players will be playing the game.  <br> Player ${playersHands[bettingPlayer].playerNum} please place your bet.`;
};

//Run the players turn
var playerTurn = function (input) {
  if (
    playersHands[currentPlayer].turnDoneFlag == 0 &&
    playersHands[currentPlayer].turn == 1
  ) {
    let hand = printHand(currentPlayer);
    playersHands[currentPlayer].turn += 1;
    return `You have ${hand}, with a score of ${playersHands[currentPlayer].score}.<br> Please submit hit or stand`;
  }
  if (playersHands[currentPlayer].turnDoneFlag == 0 && input == "stand") {
    if (currentPlayer == totalPlayers) {
      playersHands[currentPlayer].turnDoneFlag = 1;
      currentPlayer += 1;
      return `You have decided to stand.<br>Please press submit to continue`;
    }
    playersHands[currentPlayer].turnDoneFlag = 1;
    currentPlayer = determineNextPlayer();
    return `You have decided to stand.<br> ${playersHands[currentPlayer].playerNum}, please press submit to see your hand`;
  }
  if (playersHands[currentPlayer].turnDoneFlag == 0 && input == "hit") {
    hand = printHand(currentPlayer);
    if (playersHands[currentPlayer].score > 21) {
      return `You have gone bust with a score of ${playersHands[currentPlayer].score}.<br> Your hand is ${hand}. <br><br> 
┬─┬﻿︵/(.□.)╯.<br><br> Please submit stand to continue`;
    }
    playersHands[currentPlayer].hand.push(shuffledDeck.pop());
    hand = printHand(currentPlayer);
    calcScore(currentPlayer);
    if (playersHands[currentPlayer].score <= 21) {
      return `Your hand is ${hand}, with a score of ${playersHands[currentPlayer].score}.<br> Please choose to hit or stand`;
    } else {
      return `You have gone bust with a score of ${playersHands[currentPlayer].score}.<br> Your hand is ${hand}. <br><br> 
┬─┬﻿︵/(.□.)╯.<br><br> Please submit stand to continue`;
    }
  } else {
    return `Please submit hit or stand to continue.<br> Current player score is ${playersHands[currentPlayer].score}`;
  }
};

//Reset the game but keeping the wallet
var reset = function () {
  bettingPlayer = 1;
  currentPlayer = 0;
  immediateWinCheck = 0;
  dealFlag = 0;

  for (let i = 0; i <= totalPlayers; i++) {
    playersHands[i].hand = [];
    playersHands[i].score = 0;
    playersHands[i].turnDoneFlag = 0;
  }
  deck = makeDeck();
  shuffledDeck = shuffleCards(deck);
};

let totalPlayers = 0;
let playersHands = [];
let deck = makeDeck();
let shuffledDeck = shuffleCards(deck);
let bettingPlayer = 1;
let currentPlayer = 0;
let immediateWinCheck = 0;
let dealFlag = 0;

var main = function (input) {
  if (totalPlayers == 0 && (isNaN(input) || input == "")) {
    return `Invalid input.Please enter the number of players to start`;
  }
  if (totalPlayers == 0) {
    return playerInit(input);
  }
  while (bettingPlayer <= totalPlayers) {
    let bet = Number(input);
    return betInit(bet);
  }

  if (dealFlag == 0) {
    dealHands();
    dealFlag = 1;
  }

  if (immediateWinCheck == 0) {
    immediateWinCheck = 1;
    return blackjackChecker();
  }

  while (currentPlayer <= totalPlayers) {
    return playerTurn(input);
  }

  dealerTurn();
  tabulateScore();
  board = printPlayers();
  dealerHand = printHand(0);
  dealerScore = playersHands[0].score;
  reset();
  let lastMessage = `The dealer has ${dealerHand}, with a score of ${dealerScore} <br><br> Player ${bettingPlayer}, please place your bet to play again <br> ${board}`;

  return lastMessage;
};
