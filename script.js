var playerCard;
var computerCard;
var computerCardArray = [];
var playerProfile = [];
var playerCardValue;
var computerCardValue;
var compPlayer;
var currPlayer = 0;
var deckShuffled;
var playerChoice;
var numOfPlayers;
var currentPlayerCards;
var playerHasBj;
var computerHasBj;
var computerWinCounter = 0;

// game modes
var gameInitial = "gameInitial";
var chooseNumPlayers = "chooseNumPlayers";
var enterName = "enterName";
var gameStart = "gameStart";
var determineBj = "determineBj";
var evaluateCards = "evaluateCards";
var standOrDraw = "standOrDraw";
var drawCard = "drawCard";
var nextPlayerTurn = "nextPlayerTurn";
var computerDraw = "computerDraw";
var determineWinner = "determineWinner";
var gameMode = gameInitial;

// create player profile
var createPlayer = function (playerName) {
  playerProfile.push({
    id: currPlayer + 1,
    name: playerName,
    cards: [],
    wins: 0,
  });
};
// make deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♣️", "♠️", "♦️", "♥️"];
  for (var i = 0; i < suits.length; i += 1) {
    for (var rankIndex = 1; rankIndex <= 13; rankIndex += 1) {
      var cardObject = {
        rank: rankIndex,
        suits: suits[i],
        name: rankIndex,
      };

      if (cardObject.rank == 1) {
        cardObject.name = `Ace`;
      }
      if (cardObject.rank == 11) {
        cardObject.name = `Jack`;
      }
      if (cardObject.rank == 12) {
        cardObject.name = `Queen`;
      }
      if (cardObject.rank == 13) {
        cardObject.name = `King`;
      }
      cardDeck.push(cardObject);
    }
  }
  return cardDeck;
};

var shuffleDeck = function (deck) {
  var copyDeck = [...deck];
  for (var j = 0; j < deck.length; j += 1) {
    randomIndex = Math.floor(Math.random() * copyDeck.length);
    var temporaryCard = copyDeck[j];
    copyDeck[j] = copyDeck[randomIndex];
    copyDeck[randomIndex] = temporaryCard;
  }
  return copyDeck;
};

// dealing cards to players and dealers

var dealSingleCard = function (hand, playerCard) {
  var output = ``;
  playerCard = deckShuffled.pop();
  hand.push(playerCard);
  var value = detValue(hand);
  gameMode = evaluateCards;
  if (value < 17) {
    drawButton.style.display = "";
    standButton.style.display = "none";
    return `${playerProfile[currPlayer].name}'s turn: <br><br> You have drawn ${
      playerCard.name
    } of ${playerCard.suits}. <br> ${displayPlayerCard(
      hand
    )} <br> Your total card value is ${value} which is less than 17. Please draw again.`;
  } else if (value >= 21) {
    document.getElementById("draw").style.display = "none";
    document.getElementById("submit-button").style.display = "";
    document.getElementById("stand").style.display = "none";
    submit.disabled = false;
    endCurrPlayerTurn;
    return `${playerProfile[currPlayer].name}'s turn: <br><br>You have drawn ${
      playerCard.name
    } of ${playerCard.suits}. <br> ${displayPlayerCard(
      hand
    )} <br> Your total card value is ${value}. Your turn has ended, press 'Next' to proceed.`;
  } else if (value >= 17 && value < 21) {
    drawButton.style.display = "";
    standButton.style.display = "";
    return `You have drawn ${playerCard.name} of ${
      playerCard.suits
    }. <br> ${displayPlayerCard(
      hand
    )} <br> Your total card value is ${value}. Please select to 'Draw' or 'Stand'`;
  }
};

var dealCards = function () {
  for (var a = 0; a < 2; a += 1) {
    for (var b = 0; b < playerProfile.length; b += 1) {
      dealSingleCard(playerProfile[b].cards);
    }

    dealSingleCard(computerCardArray);
  }
};

// Start a new round-- change mode and reset currplayer index

var endCurrPlayerTurn = function () {
  var output = ``;
  if (currPlayer == numOfPlayers - 1) {
    gameMode = computerDraw;
    document.getElementById("submit-button").style.display = "";
    document.getElementById("stand").style.display = "none";
    document.getElementById("draw").style.display = "none";
    output = `You have drawn ${displayPlayerCard(
      playerProfile[numOfPlayers - 1].cards
    )} <br> Your total score is ${detValue(
      playerProfile[numOfPlayers - 1].cards
    )} <br> <br> All players have played. Next, it's Dealer's turn`;
  } else {
    currPlayer++;
    prevPlayer = currPlayer - 1;
    gameMode = nextPlayerTurn;
    submit.disabled = false;
    console.log(`currentplayer: ${currPlayer}`);
    console.log(`total players: ${playerProfile.length}`);
    console.log(`game mode: ${gameMode} in helper`);
    document.getElementById("submit-button").style.display = "";
    document.getElementById("stand").style.display = "none";
    document.getElementById("draw").style.display = "none";
    output = `${displayPlayerCard(
      playerProfile[prevPlayer].cards
    )} <br><br> Total value is ${detValue(
      playerProfile[prevPlayer].cards
    )} <br>It's next player's turn`;
  }
  return output;
};

// calculate card value

var detValue = function (cardArray) {
  var k = 0;
  var cardValue = 0;
  var aceCounter = 0;

  while (k < cardArray.length) {
    var currentCard = cardArray[k];
    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      cardValue = cardValue + 10;
    } else if (currentCard.name == "Ace") {
      cardValue = cardValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      cardValue = cardValue + currentCard.rank;
    }
    k = k + 1;
  }

  k = 0;
  while (k < aceCounter) {
    if (cardValue > 21) {
      cardValue = cardValue - 10;
    }
    k = k + 1;
  }
  return cardValue;
};

var displayAllCards = function (cards, computerCardArray) {
  var allCardsMsg = `All cards drawn:<br>`;
  var t = 0;
  while (t < cards.length) {
    playerCardMsg =
      playerCardMsg +
      displayPlayerCard(cards) +
      "<br> Dealer has drawn: " +
      displayComputerCard(computerCardArray);
    t = t + 1;
  }
};
var displayPlayerCard = function (cards) {
  var playerCardMsg = `All your cards drawn: <br>`;
  var m = 0;
  while (m < cards.length) {
    playerCardMsg = playerCardMsg + cards[m].name + cards[m].suits + "<br>";
    m = m + 1;
  }
  return playerCardMsg;
};

var displayComputerCard = function (computerCardArray) {
  var computerCardMsg = "All dealer cards drawn: <br>";
  var m = 0;
  while (m < computerCardArray.length) {
    computerCardMsg =
      computerCardMsg +
      computerCardArray[m].name +
      computerCardArray[m].suits +
      "<br>";
    m = m + 1;
  }

  return computerCardMsg;
};

var detBlackjack = function (hand) {
  var isBlackjack = false;
  if (hand.length == 2 && detValue(hand) == 21) {
    isBlackjack = true;
  }
  return isBlackjack;
};
var resetGame = function () {
  // Reset game-specific variables
  playerCard = null;
  computerCard = null;
  computerCardArray = [];
  playerCardValue = null;
  computerCardValue = null;
  compPlayer = null;
  currPlayer = 0;
  deckShuffled = null;
  playerChoice = null;
  currentPlayerCards = null;
  playerHasBj = null;
  gameMode = gameStart;

  // Clear card hands for all players
  for (var i = 0; i < playerProfile.length; i++) {
    playerProfile[i].cards = [];
  }

  // Set the game mode to its initial state
  gameMode = gameStart;
};
document.getElementById("stand").style.display = "none";
document.getElementById("draw").style.display = "none";
document.getElementById("input-field").style.display = "none";

document.getElementById("submit-button").style.display = "none";
var main = function (input) {
  if (gameMode == gameInitial) {
    document.getElementById("submit-button").style.display = "";
    document.getElementById("start-game").style.display = "none";
    document.getElementById("input-field").style.display = "";

    gameMode = chooseNumPlayers;
    console.log(gameMode);
    return `Please enter number of players that will be playing`;
  }
  if (gameMode == chooseNumPlayers) {
    console.log(gameMode);
    if (isNaN(input) == true || !Number(input) > 0) {
      return "Please enter a number larger than 0";
    }
    numOfPlayers = Number(input);
    gameMode = enterName;
    console.log(gameMode);
    return `There are ${numOfPlayers} players in the game. <br> <br> Player 1, please enter your name.`;
  }
  if (gameMode == enterName) {
    if (input == "") {
      return `Please input your name.`;
    }
    playerName = input;
    createPlayer(playerName);
    console.log(playerProfile[0].name + playerProfile[0].id);

    if (playerProfile[currPlayer].id < numOfPlayers) {
      currPlayer += 1;
      prevPlayer = currPlayer - 1;
      return `Welcome ${playerProfile[prevPlayer].name}! <br><br>Player ${
        playerProfile[prevPlayer].id + 1
      }, please enter your name`;
    }
    gameMode = gameStart;
    return `Welcome ${playerProfile[currPlayer].name}! <br> <br> Let's deal cards now!`;
  }
  if (gameMode == gameStart) {
    document.getElementById("input-field").style.display = "none";

    currPlayer = 0;
    console.log(gameMode);
    console.log(currPlayer);

    var deck = makeDeck();
    deckShuffled = shuffleDeck(deck);
    console.log("non shuffled deck:", deck);
    console.log("shuffled deck:", shuffleDeck(deck));
    dealCards();
    gameMode = determineBj;
  }

  if (gameMode == determineBj) {
    console.log(playerProfile[1].cards);
    console.log("detBJ in main");
    currentPlayerCards = playerProfile[currPlayer].cards;
    playerCardValue = detValue(currentPlayerCards);

    playerHasBj = detBlackjack(currentPlayerCards);
    console.log("current player: " + currPlayer);
    // if (dealerHasBj == true && playerHasBj == true) {
    //   return `It's a tie! Both Play and dealer have drawn Blackjack! <br> ${displayPlayerCard(
    //     playerProfile[currPlayer].cards
    //   )} <br> ${displayComputerCard(computerCardArray)}`;
    // } else if (dealerHasBj == true && playerHasBj == false) {
    //   return `You have lost! Dealer has drawn Blackjack! <br> ${displayPlayerCard(
    //     playerProfile[currPlayer].cards
    //   )} <br> ${displayComputerCard(computerCardArray)}`;
    if (playerHasBj == true) {
      console.log(currPlayer + " has BJ, end turn");
      endCurrPlayerTurn();
      return `${
        playerProfile[currPlayer - 1].name
      } has drawn Blackjack! <br><br> ${displayPlayerCard(
        playerProfile[currPlayer - 1].cards
      )} <br> <br> If computer doesn't draw Blackjack, player wins!`;
    } else {
      gameMode = evaluateCards;
    }
  }
  // Player minimum amount
  if (gameMode == evaluateCards) {
    console.log(
      "evaluate cards" + displayPlayerCard(playerProfile[currPlayer].cards)
    );
    currentPlayerCards = playerProfile[currPlayer].cards;
    playerCardValue = detValue(currentPlayerCards);
    if (playerCardValue < 17) {
      document.getElementById("stand").style.display = "none";
      document.getElementById("submit-button").style.display = "none";
      document.getElementById("draw").style.display = "";
      gameMode = drawCard;
      console.log(gameMode + " less than 17");
      return `${
        playerProfile[currPlayer].name
      }'s turn: <br><br> ${displayPlayerCard(
        playerProfile[currPlayer].cards
      )} <br> Your total card value is ${detValue(
        playerProfile[currPlayer].cards
      )} and is less than 17. Please draw another card.`;
    }
    // Player fulfils minimum amount
    else if (
      detValue(currentPlayerCards) < 21 &&
      detValue(currentPlayerCards) >= 17
    ) {
      document.getElementById("stand").style.display = "";
      document.getElementById("draw").style.display = "";
      document.getElementById("submit-button").style.display = "none";
      console.log(gameMode + " more than 17");
      gameMode = standOrDraw;
      console.log(gameMode);

      return `${playerProfile[currPlayer].name}'s turn: ${displayPlayerCard(
        playerProfile[currPlayer].cards
      )}
      Your total card value is ${detValue(
        playerProfile[currPlayer].cards
      )}. <br> <br> Please select draw or stand.`;
    } else {
      drawButton.style.display = "none";
      document.getElementById("submit-button").style.display = "";
      submit.disabled = false;
      endCurrPlayerTurn();
    }
  }

  // Choose 'Stand' or 'Draw'
  if (gameMode == standOrDraw) {
    document.getElementById("submit-button").style.display = "none";
    if (detValue(playerProfile[currPlayer].cards) < 17) {
      document.getElementById("stand").style.display = "none";
      document.getElementById("submit").style.display = "none";
    } else {
      // If the card value is 17 or more, show the Stand button
      document.getElementById("stand").style.display = "block";
    }
    if (input == "2") {
      console.log("end turn");
      endCurrPlayerTurn();
    } else if (input == "1") {
      gameMode = drawCard;
    }
  }

  if (gameMode == nextPlayerTurn) {
    document.getElementById("stand").style.display = "none";
    document.getElementById("submit-button").style.display = "";
    gameMode = determineBj;
    console.log(`${playerProfile[currPlayer].name} starts now`);
    return `Welcome ${
      playerProfile[currPlayer].name
    }! <br><br> ${displayPlayerCard(
      playerProfile[currPlayer].cards
    )} <br> Hit next to proceed.`;
  }

  // drawcard

  if (gameMode == drawCard) {
    // dealSingleCard(playerProfile[currPlayer].cards, playerCard);
    playerCard = deckShuffled.pop();
    playerProfile[currPlayer].cards.push(playerCard);

    playerCardValue = detValue(playerProfile[currPlayer].cards);
    console.log("draw new card");

    if (playerCardValue < 17) {
      console.log("still less than 17");
      return `You have drawn ${playerCard.name} ${
        playerCard.suits
      } <br> ${displayPlayerCard(
        playerProfile[currPlayer].cards
      )} <br> Your total card value is ${playerCardValue} and is less than 17. Please draw another card.`;
    } else if (playerCardValue < 21 && playerCardValue >= 17) {
      console.log(gameMode + " 17<cards<21");
      document.getElementById("stand").style.display = "";
      gameMode = standOrDraw;
      return `You have drawn ${playerCard.name} ${
        playerCard.suits
      } <br> ${displayPlayerCard(
        playerProfile[currPlayer].cards
      )} <br> Your total card value is ${detValue(
        playerProfile[currPlayer].cards
      )} <br> <br> Please input 1 or 2 <br> 1: Draw <br> 2: Stand.`;
    } else if (playerCardValue >= 21) {
      console.log(">=21; end turn");
      var changePlayer = endCurrPlayerTurn();
      submit.disabled = false;
      document.getElementById("submit").style.display = "block";
      return changePlayer;
    }
  }

  if (gameMode == computerDraw) {
    document.getElementById("submit-button").style.display = "";
    document.getElementById("stand").style.display = "none";
    document.getElementById("draw").style.display = "none";
    computerCardValue = detValue(computerCardArray);
    computerHasBj = detBlackjack(computerCardArray);

    if (computerHasBj == true) {
      document.getElementById("submit-button").style.display = "";
      document.getElementById("stand").style.display = "none";
      document.getElementById("draw").style.display = "none";
      gameMode = determineWinner;
      return `Dealer has struck Blackjack!`;
    }

    if (computerCardValue < 17) {
      while (computerCardValue < 17) {
        computerCard = deckShuffled.pop();
        computerCardArray.push(computerCard);
        computerCardValue = detValue(computerCardArray);
      }
      gameMode = determineWinner;
      return `Dealer has drawn card(s). Let's determine the winner!`;
    } else {
      gameMode = determineWinner;
      return `Dealer has chosen to stand. Let's determine the winner!`;
    }
  }

  if (gameMode == determineWinner) {
    // computerCardArray = [
    //   {
    //     rank: 11,
    //     suits: "Hearts",
    //     name: "Ace",
    //   },
    //   { rank: 10, suits: "Spades", name: 10 },
    // ];

    // playerProfile[0].cards = [
    //   {
    //     rank: 11,
    //     suits: "Hearts",
    //     name: "Ace",
    //   },
    //   { rank: 10, suits: "Spades", name: 10 },
    // ];
    computerHasBj = detBlackjack(computerCardArray);
    console.log(computerCardArray);
    var output = `${displayComputerCard(
      computerCardArray
    )} <br> Dealer's total card value is ${detValue(
      computerCardArray
    )} <br> <br> Results: <br>`;
    var anyPlayerWon = false;
    for (var f = 0; f < playerProfile.length; f += 1) {
      var currentPlayer = playerProfile[f];
      var currentPlayerValue = detValue(currentPlayer.cards);
      playerHasBj = detBlackjack(currentPlayer.cards);
      console.log(playerHasBj);
      console.log(currentPlayer.cards);
      // Computer hits blackjack

      if (computerHasBj == true && playerHasBj == true) {
        output += `<br> Dealer has Blackjack and ${currentPlayer.name} also has Blackjack!<br>It's a tie!<br>Total ${currentPlayer.name}'s wins: ${currentPlayer.wins}<br><br>`;
      } else if (computerHasBj == true && playerHasBj == false) {
        computerWinCounter += 1;
        output += `<br> Dealer has Blackjack! <br> ${currentPlayer.name} has lost against dealer!<br> Total ${currentPlayer.name}'s wins: ${currentPlayer.wins}<br><br>`;
      }
      // player hits blackjack
      else if (computerHasBj == false && playerHasBj == true) {
        currentPlayer.wins++;
        output += `<br> ${currentPlayer.name} has Blackjack and won against the dealer! <br> Total ${currentPlayer.name}'s wins: ${currentPlayer.wins}<br><br>`;

        // no blackjack
      } else if (currentPlayerValue > 21) {
        // Player busts
        computerWinCounter++;
        output += `${currentPlayer.name} has busted.<br>Total ${currentPlayer.name}'s wins: ${currentPlayer.wins}<br><br>`;
      }
      // Player wins
      else if (
        currentPlayerValue <= 21 &&
        (currentPlayerValue > computerCardValue || computerCardValue > 21)
      ) {
        currentPlayer.wins++;
        output += `${currentPlayer.name} has won against the dealer!<br>Total ${currentPlayer.name}'s wins: ${currentPlayer.wins}<br><br>`;
        anyPlayerWon = true;
      }
      // Player ties
      else if (
        currentPlayerValue <= 21 &&
        currentPlayerValue === computerCardValue
      ) {
        output += `${currentPlayer.name} has tied with the dealer.<br> Total ${currentPlayer.name}'s wins: ${currentPlayer.wins}<br><br>`;
      }
      // Player loses
      else {
        computerWinCounter++;
        output += `${currentPlayer.name} has lost to the dealer.<br>Total ${currentPlayer.name}'s wins: ${currentPlayer.wins}<br><br>`;
      }
    }
    resetGame();
    return output + "<br> Please click next to play again!";
  }
};
