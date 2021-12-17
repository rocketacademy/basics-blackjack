//psuedo code
//1. create a card deck object and shuffle it and store it at global state
//2. ask how many players are playing (max. 4) and initilize the number of player object
//3. ask each player name and betting amount and store in the player object
//4. once all players are initialize, can begin to play. Deal 2 cards to each players and the dealer.
//    a. one of dealer card is not shown
//5. beginning from player 1 adds up the sum at hand and store it
//    a. use global states to control which player is playing at the moment (for DOM control)
//    b. jack/queen/king is 10 and aces is 1 or 11.
//6. begining from player 1, display hand and score
//    a. if player has blackjack and dealer is not a blackjack, player win automatically, get paid 3:2 and player will reset and wait for next round.
//    b. else, allow the player to choose hit or stand or /split (if in pairs)/ or double or quit (lose the bet and stop playing)
//      i. if hit and bust, lose the bet and wait for next round
//      ii. else hit until player stands and wait for next round
//    g. else save the score and move to next player and repat a-b.
//7. dealer see if total card score is equal or above 17, if not draw until it is above 17 and stop
//    a. if bust, award bet to non busted players
//    b. else, compare score and award bet to non busted players with higher score
//    c. else,
//8. restart hand and repeat step 4 - 6 until deck.length is less than 26 and reshuffle and repeat step 4-6.
//9. include quit function to restart the whole game

//initializing global variables & setting up initial game status & arrays
const pendingNumOfPlayers = "pending number of players";
const pendingPlayersNames = "pending players' names";
const pendingPlayersCash = "pending cash from players";
const pendingBets = "pending players to place bets";
const dealingCards = "dealer dealing cards after bets are placed";
const hitStandSplit = "players to choose hit, stand or split";
const dealerTurn = "dealer to play";
const HIT = "hit";
const STAND = "stand";
const DOUBLE = "double";
const PLAYED = "player status - played";
const PENDING = "player status - pending";
let shuffledDeck;
let deck = [];
let playersArray = [];
let playersArrayIndex = 0;
let totalNumOfPlayers;
let gameStatus = pendingNumOfPlayers;
let dealer = { cards: [], cardPoints: 0 };
let hitStandDoubleInputArray = [HIT, STAND, DOUBLE];
let hitStandInputArray = [HIT, STAND];
let hitFlag = false;
let nextPlayerTurnFlag = false;

const makeDeck = function () {
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
      var point = rankCounter;
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

      if (cardName == "jack") {
        point = 10;
      } else if (cardName == "queen") {
        point = 10;
      } else if (cardName == "king") {
        point = 10;
      } else if (cardName == "ace") {
        point = 11;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        point: point,
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
const shuffleCards = function (cardDeck) {
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

//creating object factory to generate player object
const createPlayer = (name) => {
  return {
    name: name,
    cash: 0,
    cards: [],
    cardPoints: 0,
    bets: 0,
    status: PENDING,
  };
};

//function to initialize the playersArray for storing players info
const initializePlayersArray = (totalNumOfPlayers) => {
  playersArray = [];
  for (i = 0; i < totalNumOfPlayers; i += 1) {
    playersArray.push(createPlayer(i + 1));
  }
  console.log(playersArray);
};

//function to place bets
const placeBets = function (input) {
  if (isNaN(input) || input == "") {
    return `Hello ${playersArray[playersArrayIndex].name}, please place your bets.`;
  } else if (Number(input.trim()) > playersArray[playersArrayIndex].cash) {
    return `Hello ${playersArray[playersArrayIndex].name}, you have insufficient cash. Please place bets below $${playersArray[playersArrayIndex].cash}.`;
  }
  if (playersArrayIndex + 1 == playersArray.length) {
    playersArray[playersArrayIndex].bets = Number(input.trim());
    playersArrayIndex = 0;
    gameStatus = dealingCards;
    return "Please press submit button to deal the cards.";
  } else {
    playersArray[playersArrayIndex].bets = Number(input.trim());
    playersArrayIndex += 1;
    return `Hi ${playersArray[playersArrayIndex].name}, please place your bets.`;
  }
};

//creating deal function
const dealCards = function () {
  for (i = 0; i < 2; i += 1) {
    for (j = 0; j < playersArray.length; j += 1) {
      playersArray[j].cards.push(shuffledDeck.pop());
    }
    dealer.cards.push(shuffledDeck.pop());
  }
};

//creating function to read the hand cards and store the points in player's object (deciding if i should count everyone at one go or individual players)
const countCardPoints = function () {
  for (i = 0; i < playersArray.length; i += 1) {
    playersArray[i].cardPoints = 0;
    let aceCounter = 0;
    for (j = 0; j < playersArray[i].cards.length; j += 1) {
      if (playersArray[i].cards[j].name == "ace") {
        aceCounter += 1;
      }
      playersArray[i].cardPoints += playersArray[i].cards[j].point;
    }
    for (k = 0; k < aceCounter; k += 1) {
      if (playersArray[i].cardPoints > 21) {
        playersArray[i].cardPoints -= 10;
      }
    }
  }
  dealer.cardPoints = 0;
  for (k = 0; k < dealer.cards.length; k += 1) {
    dealer.cardPoints += dealer.cards[k].point;
  }
  if (dealer.cardPoints > 21) {
    dealer.cardPoints = 0;
    for (k = 0; k < dealer.cards.length; k += 1) {
      if (dealer.cards[k].name == "ace") {
        dealer.cards[k].point = 1;
      }
      dealer.cardPoints += dealer.cards[k].point;
    }
  }
};

//creating display player/dealer hand function
const displayHandmsg = function (playerObject) {
  let msg = ``;
  for (i = 0; i < playerObject.cards.length; i += 1) {
    msg += `[${playerObject.cards[i].name}${playerObject.cards[i].suit}]<br>`;
  }
  msg += `<b>Points: ${playerObject.cardPoints}</b>`;
  return msg;
};

//creating display dealer partial hand function
const displayDealerHandmsg = function (dealerObject) {
  let msg = ``;
  if (dealer.cardPoints == 21 || gameStatus == dealerTurn) {
    for (i = 0; i < dealerObject.cards.length; i += 1) {
      msg += `[${dealerObject.cards[i].name}${dealerObject.cards[i].suit}]<br>`;
    }
    msg += `<b>Points: ${dealer.cardPoints}</b>`;
  } else {
    msg = `[?]<br>`;
    for (i = 1; i < dealerObject.cards.length; i += 1) {
      msg += `[${dealerObject.cards[i].name}${dealerObject.cards[i].suit}]<br>`;
    }
  }
  return msg;
};

//creating template message to display hand cards
const generateHandCardsMsg = function () {
  let msg = `<b>${
    playersArray[playersArrayIndex].name
  }'s hand</b><br>${displayHandmsg(
    playersArray[playersArrayIndex]
  )}<br><br><b>Dealer's hand</b><br>${displayDealerHandmsg(dealer)}`;
  return msg;
};

//compare dealer-player hand for blackjack function
const blackjackCheck = function () {
  let msg = `Hi ${playersArray[playersArrayIndex].name}, would you like to "Hit", "Stand" or "Double"?`;
  if (
    playersArray[playersArrayIndex].cardPoints == 21 &&
    dealer.cardPoints == 21
  ) {
    playersArray[playersArrayIndex].bets = 0;
    msg = "It is a push!<br><br>Press submit for next player turn.";
    playersArray[playersArrayIndex].status = PLAYED;
    playersArrayIndex += 1;
  } else if (
    playersArray[playersArrayIndex].cardPoints == 21 &&
    dealer.cardPoints < 21
  ) {
    playersArray[playersArrayIndex].cash +=
      (playersArray[playersArrayIndex].bets * 3) / 2;
    nextPlayerTurnFlag = true;
    msg = `It is a blackjack! ${playersArray[playersArrayIndex].name} wins $${
      (playersArray[playersArrayIndex].bets * 3) / 2
    }.<br><br>Press submit for next player turn.`;
    playersArray[playersArrayIndex].bets = 0;
    playersArray[playersArrayIndex].status = PLAYED;
    if (playersArrayIndex + 1 == playersArray.length) {
      playersArrayIndex = 0;
      gameStatus = dealerTurn;
    }
    playersArrayIndex += 1;
  } else if (
    playersArray[playersArrayIndex].cardPoints < 21 &&
    dealer.cardPoints == 21
  ) {
    outer_block: {
      msg = `Dealer has a blackjack. ${playersArray[playersArrayIndex].name} loses $${playersArray[playersArrayIndex].bets}.<br><br>Press submit for next player turn.`;
      playersArray[playersArrayIndex].cash -=
        playersArray[playersArrayIndex].bets;
      nextPlayerTurnFlag = true;
      if (playersArray[playersArrayIndex].cash <= 0) {
        msg += `<br><br>${playersArray[playersArrayIndex].name} has ran out of cash and left the table.`;
        if (playersArrayIndex + 1 == playersArray.length) {
          playersArray.splice(playersArrayIndex, 1);
          playersArrayIndex = 0;
          gameStatus = dealerTurn;
        }
        break outer_block;
      }
      playersArray[playersArrayIndex].bets = 0;
      playersArray[playersArrayIndex].status = PLAYED;
      if (playersArrayIndex + 1 == playersArray.length) {
        playersArrayIndex = 0;
        gameStatus = dealerTurn;
      }
      playersArrayIndex += 1;
    }
  }
  return msg;
};

//creating function to run BJ
const runPlayerTurn = function (input) {
  //input validation
  if (nextPlayerTurnFlag == true) {
    return `Please press Submit for next player turn.`;
  } else if (
    hitFlag == false &&
    hitStandDoubleInputArray.indexOf(input.trim().toLowerCase()) == -1
  ) {
    return `${generateHandCardsMsg()}<br><br>Please type "hit", "stand" or "double".`;
  } else if (
    hitFlag == true &&
    hitStandInputArray.indexOf(input.trim().toLowerCase()) == -1
  ) {
    return `${generateHandCardsMsg()}<br><br>Please type "hit" or "stand".`;
  }
  let msg = "";
  if (input.trim().toLowerCase() == HIT) {
    hitFlag = true;
    playersArray[playersArrayIndex].cards.push(shuffledDeck.pop());
    countCardPoints();
    msg = `${generateHandCardsMsg()}<br><br>Hi ${
      playersArray[playersArrayIndex].name
    }, would you like to "Hit" or "Stand"?`;
    bust_block: {
      if (playersArray[playersArrayIndex].cardPoints > 21) {
        msg = `${generateHandCardsMsg()}<br><br>BUST!<br><br>${
          playersArray[playersArrayIndex].name
        } loses $${
          playersArray[playersArrayIndex].bets
        }.<br><br>Press Submit for the next turn.`;
        nextPlayerTurnFlag = true;
        playersArray[playersArrayIndex].cash -=
          playersArray[playersArrayIndex].bets;
        if (playersArray[playersArrayIndex].cash <= 0) {
          msg += `<br><br>${playersArray[playersArrayIndex].name} has ran out of cash and left the table.`;
          if (playersArrayIndex + 1 == playersArray.length) {
            playersArray.splice(playersArrayIndex, 1);
            playersArrayIndex = 0;
            gameStatus = dealerTurn;
          }
          break bust_block;
        }
        playersArray[playersArrayIndex].bets = 0;
        playersArray[playersArrayIndex].status = PLAYED;
        if (playersArrayIndex + 1 == playersArray.length) {
          playersArrayIndex = 0;
          gameStatus = dealerTurn;
        } else {
          playersArrayIndex += 1;
        }
      }
    }
  }
  if (input.trim().toLowerCase() == STAND) {
    hitFlag = false;
    if (playersArrayIndex + 1 == playersArray.length) {
      playersArrayIndex = 0;
      gameStatus = dealerTurn;
      return main("");
    } else {
      playersArrayIndex += 1;
      return main("");
    }
  }

  double_block: {
    if (input.trim().toLowerCase() == DOUBLE) {
      playersArray[playersArrayIndex].bets *= 2;
      playersArray[playersArrayIndex].cards.push(shuffledDeck.pop());
      countCardPoints();
      msg = `${generateHandCardsMsg()}<br><br>Hi ${
        playersArray[playersArrayIndex].name
      }, press Submit for next player turn.`;
      nextPlayerTurnFlag = true;
      if (playersArray[playersArrayIndex].cardPoints > 21) {
        msg = `${generateHandCardsMsg()}<br><br>BUST!<br><br>${
          playersArray[playersArrayIndex].name
        } loses $${
          playersArray[playersArrayIndex].bets
        }.<br><br>Press Submit for the next turn.`;
        playersArray[playersArrayIndex].cash -=
          playersArray[playersArrayIndex].bets;
        if (playersArray[playersArrayIndex].cash <= 0) {
          msg += `<br><br>${playersArray[playersArrayIndex].name} has ran out of cash and left the table.`;
          if (playersArrayIndex + 1 == playersArray.length) {
            playersArray.splice(playersArrayIndex, 1);
            playersArrayIndex = 0;
            gameStatus = dealerTurn;
          }
          break double_block;
        }
        playersArray[playersArrayIndex].bets = 0;
        playersArray[playersArrayIndex].status = PLAYED;
      }
      if (playersArrayIndex + 1 == playersArray.length) {
        playersArrayIndex = 0;
        gameStatus = dealerTurn;
      } else {
        playersArrayIndex += 1;
      }
    }
  }
  return msg;
};

//creating function to check if all players done playing the current round of BJ before dealer turn
const allPlayerPlayedCheck = function () {
  let counter = 0;
  for (const player of playersArray) {
    if (player.status == PLAYED) {
      counter += 1;
    }
  }
  return counter == playersArray.length ? true : false;
};

//creating function to start new round and place bets again
const newRound = function () {
  for (const player of playersArray) {
    player.cards = [];
    player.cardPoints = 0;
    player.bets = 0;
    player.status = PENDING;
  }
  dealer.cards = [];
  dealer.cardPoints = 0;
  shuffledDeck = shuffleCards(deck);
  playersArrayIndex = 0;
  gameStatus = pendingBets;
  return `Hi ${playersArray[playersArrayIndex].name} Please start placing your bets.`;
};

//creating function to run dealer turn
const runDealerTurn = function () {
  while (dealer.cardPoints < 17) {
    dealer.cards.push(shuffledDeck.pop());
    countCardPoints();
  }
  let msg = "";
  if (dealer.cardPoints > 21) {
    while (playersArray[playersArrayIndex].status == PLAYED) {
      playersArrayIndex += 1;
    }
    msg = `${generateHandCardsMsg()}<br><br>Dealer Busted, you win!<br><br>${
      playersArray[playersArrayIndex].name
    } wins $${
      playersArray[playersArrayIndex].bets
    }.<br><br>Press Submit for the next turn.`;
    playersArray[playersArrayIndex].cash +=
      playersArray[playersArrayIndex].bets;
    playersArray[playersArrayIndex].bets = 0;
    playersArray[playersArrayIndex].status = PLAYED;
    playersArrayIndex += 1;
  } else if (
    dealer.cardPoints <= 21 &&
    playersArray[playersArrayIndex].cardPoints == dealer.cardPoints
  ) {
    while (playersArray[playersArrayIndex].status == PLAYED) {
      playersArrayIndex += 1;
    }
    msg = `${generateHandCardsMsg()}<br><br>Hi ${
      playersArray[playersArrayIndex].name
    }. It is a push.<br><br>Press Submit for the next turn.`;
    playersArray[playersArrayIndex].bets = 0;
    playersArray[playersArrayIndex].status = PLAYED;
    playersArrayIndex += 1;
  } else if (
    dealer.cardPoints <= 21 &&
    playersArray[playersArrayIndex].cardPoints > dealer.cardPoints
  ) {
    while (playersArray[playersArrayIndex].status == PLAYED) {
      playersArrayIndex += 1;
    }
    msg = `${generateHandCardsMsg()}<br><br>You win!<br><br>${
      playersArray[playersArrayIndex].name
    } wins $${
      playersArray[playersArrayIndex].bets
    }.<br><br>Press Submit for the next turn.`;
    playersArray[playersArrayIndex].cash +=
      playersArray[playersArrayIndex].bets;
    playersArray[playersArrayIndex].bets = 0;
    playersArray[playersArrayIndex].status = PLAYED;
    playersArrayIndex += 1;
  } else {
    bust_block2: {
      while (playersArray[playersArrayIndex].status == PLAYED) {
        playersArrayIndex += 1;
      }
      msg = `${generateHandCardsMsg()}<br><br>You lose!<br><br>${
        playersArray[playersArrayIndex].name
      } lose $${
        playersArray[playersArrayIndex].bets
      }.<br><br>Press Submit for the next turn.`;
      playersArray[playersArrayIndex].cash -=
        playersArray[playersArrayIndex].bets;
      if (playersArray[playersArrayIndex].cash <= 0) {
        msg += `<br><br>${playersArray[playersArrayIndex].name} has ran out of cash and left the table.`;
        if (playersArrayIndex + 1 == playersArray.length) {
          playersArray.splice(playersArrayIndex, 1);
          playersArrayIndex = 0;
          gameStatus = dealerTurn;
        }
        break bust_block2;
      }
      playersArray[playersArrayIndex].bets = 0;
      playersArray[playersArrayIndex].status = PLAYED;
      playersArrayIndex += 1;
    }
  }
  return msg;
};

deck = makeDeck();
shuffledDeck = shuffleCards(deck);

var main = function (input) {
  if (playersArray.length == 0) {
    dealer.cards = [];
    dealer.cardPoints = 0;
    playersArrayIndex = 0;
    shuffledDeck = shuffleCards(deck);
    gameStatus = pendingNumOfPlayers;
  }

  if (gameStatus == pendingNumOfPlayers) {
    if (isNaN(input) || input == "" || Number(input) > 4) {
      return "Hello user, please kindly input a number for the number of players.";
    }
    totalNumOfPlayers = Number(input);
    initializePlayersArray(totalNumOfPlayers);
    gameStatus = pendingPlayersNames;
    return `Hi player ${playersArray[playersArrayIndex].name}, may I have your name please?`;
  }

  if (gameStatus == pendingPlayersNames) {
    if (!isNaN(input) || input == "") {
      return `Hello player ${playersArray[playersArrayIndex].name}, please kindly provide your name.`;
    }
    if (playersArrayIndex + 1 == playersArray.length) {
      playersArray[playersArrayIndex].name = input.trim();
      gameStatus = pendingPlayersCash;
      return `Hello ${playersArray[playersArrayIndex].name}, how much would you like to cash in?`;
    } else {
      playersArray[playersArrayIndex].name = input.trim();
      gameStatus = pendingPlayersCash;
      return `Hi ${playersArray[playersArrayIndex].name}, how much would you like to cash in?`;
    }
  }

  if (gameStatus == pendingPlayersCash) {
    if (isNaN(input) || input == "") {
      return `Hello ${playersArray[playersArrayIndex].name}, please let us know how much cash would you like to play with?`;
    }
    if (playersArrayIndex + 1 == playersArray.length) {
      playersArray[playersArrayIndex].cash = Number(input);
      gameStatus = pendingBets;
      playersArrayIndex = 0;
      return `Hi ${playersArray[playersArrayIndex].name} Please start placing your bets.`;
    } else {
      playersArray[playersArrayIndex].cash = Number(input.trim());
      playersArrayIndex += 1;
      gameStatus = pendingPlayersNames;
      return `Hi player ${playersArray[playersArrayIndex].name}, may I have your name please?`;
    }
  }
  if (gameStatus == pendingBets) {
    return placeBets(input);
  }

  if (gameStatus == dealingCards) {
    if (input != "") {
      return "Please press submit to deal the cards.";
    }
    dealCards(shuffledDeck);
    countCardPoints();
    gameStatus = hitStandSplit;
  }

  if (gameStatus == hitStandSplit) {
    if (input == "") {
      nextPlayerTurnFlag = false;
      return `${generateHandCardsMsg()}<br>${blackjackCheck()} `;
    }
    return runPlayerTurn(input);
  }

  if (gameStatus == dealerTurn) {
    if (allPlayerPlayedCheck() == true) {
      return newRound();
    }
    return runDealerTurn();
  }
};
