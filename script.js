///=====================GLOBAL VARIABLES======================///

var GAME_MODE_CHOOSE_NUM_PLAYERS = "GAME_MODE_CHOOSE_NUM_PLAYERS";
var GAME_MODE_BETTING_MODE = "GAME_MODE_BETTING_MODE";
var GAME_MODE_HIT_OR_STAND = "GAME_MODE_HIT_OR_STAND";
var GAME_MODE_DEALER_TURN = "GAME_MODE_DEALER_TURN";
var GAME_MODE_LEADERBOARD = "GAME_MODE_LEADERBOARD";
var GAME_MODE_PLAYERS_TURN = "GAME_MODE_PLAYERS_TURN";

var gameMode = GAME_MODE_CHOOSE_NUM_PLAYERS;
var numPlayers = 0;
var currPlayer = 0;
var currentPlayer = 0;
var input;
var playerProfiles = [];
var deck = [];
var dealerProfile = {
  dealerHand: [],
  dealerAceCount: 0,
  dealerHandValue: 0,
  dealerFinalValue: 0,
};

///================HELPER FUNCTIONS===============///

var buildDeck = function () {
  var suits = ["♠", "❤️", "♣️", "♦️"];
  var value = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
  var deck = [];

  for (var i = 0; i < suits.length; i += 1) {
    for (var j = 0; j < value.length; j += 1) {
      var card = {};
      card["value"] = value[j];
      card["suits"] = suits[i];

      deck.push(card);
    }
  }
  return deck;
};

function shuffleDeck(deck) {
  for (var i = 0; i < deck.length; i += 1) {
    var j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

function getNumPlayers(input) {
  if (input == "") {
    numPlayersMessage = "Please enter a number between 1 player to 7 players";
  } else if (isNaN(input)) {
    numPlayersMessage =
      "NaN, Please enter a number between 1 player to 7 players";
  } else if (input > 7) {
    numPlayersMessage = "Max 7 players";
  } else if (input < 1) {
    numPlayersMessage = "At least 1 player to play! ";
  } else {
    numPlayers = input;
    createPlayerProfiles(input);
    gameMode = GAME_MODE_BETTING_MODE;
    numPlayersMessage =
      "There are " +
      numPlayers +
      " players in this game. <br><br> Player 1, you have " +
      playerProfiles[currPlayer].playerChipsBalance +
      " chips. How much would you like to bet?";
  }
  return numPlayersMessage;
}

function createPlayerProfiles() {
  for (var i = 0; i < numPlayers; i += 1) {
    playerProfiles.push({
      id: i + 1,
      playerHand: [],
      playerAceCount: 0,
      playerHandValue: 0,
      playerChipsBalance: 100,
      playerCurrRoundBet: 0,
      playerRoundScore: "",
      playerScore: 0,
    });
  }
}

function determineCurrentRoundBetSize(input) {
  if (isNaN(input)) {
    playerBetMessage =
      "Ops! Not a Number! How much do you want to bet? <br><br> Player " +
      playerProfiles[currPlayer].id +
      ", your chips balance is " +
      playerProfiles[currPlayer].playerChipsBalance +
      ".";
    return playerBetMessage;
  } else if (input < 1) {
    playerBetMessage =
      "You can't bet 0, try again.<br><br> Player " +
      playerProfiles[currPlayer].id +
      ", your chips balance is " +
      playerProfiles[currPlayer].playerChipsBalance +
      ".";
    return playerBetMessage;
  } else if (input > playerProfiles[currPlayer].playerChipsBalance) {
    playerBetMessage =
      "Player" +
      playerProfiles[currPlayer].id +
      ", you do not have that many chips left. <br><br> Your Chips balance is " +
      playerProfiles[currPlayer].playerChipsBalance +
      ".";
    return playerBetMessage;
  } else {
    playerProfiles[currPlayer].playerCurrRoundBet = Number(input);
    playerBetMessage =
      "Player " +
      playerProfiles[currPlayer].id +
      ", your bet is " +
      playerProfiles[currPlayer].playerCurrRoundBet;

    if (currPlayer + 1 < numPlayers) {
      gameMode = GAME_MODE_BETTING_MODE;

      currPlayer += 1;
      playerBetMessage =
        playerBetMessage +
        ". <br><br> Player " +
        playerProfiles[currPlayer].id +
        " , how much would you like to bet?";
      return playerBetMessage;
    } else {
      gameMode = GAME_MODE_PLAYERS_TURN;
      var allBetsInmessage = "All bets in! Continue to draw cards, good luck!";
      return allBetsInmessage;
    }
  }
}
function drawingPlayersCardsAndDealerFirstCard(deck) {
  for (var j = 0; j < 2; j++) {
    for (currPlayer = 0; currPlayer < playerProfiles.length; currPlayer++) {
      card = deck.pop();
      playerProfiles[currPlayer].playerHand +=
        "<br>" + card.value + " of " + card.suits;
      playerProfiles[currPlayer].playerHandValue += getValue(card);
      playerProfiles[currPlayer].playerAceCount += checkAce(card);
      while (
        playerProfiles[currPlayer].playerHandValue > 21 &&
        playerProfiles[currPlayer].playerAceCount > 0
      ) {
        playerProfiles[currPlayer].playerHandValue -= 10;
        playerProfiles[currPlayer].playerAceCount -= 1;
      }
    }
  }

  gameMode = GAME_MODE_HIT_OR_STAND;

  for (var j = 0; j < playerProfiles.length; j++) {
    if (playerProfiles[j].playerHandValue == 21) {
      playerProfiles[j].playerRoundScore += "BLACKJACK! - ";
    }
  }

  let dealerCard = deck.pop();
  dealerProfile.dealerHand +=
    "<br>" + dealerCard.value + " of " + dealerCard.suits;
  dealerProfile.dealerHandValue += getValue(dealerCard);
  dealerProfile.dealerAceCount += checkAce(dealerCard);

  var playerHandmessage = createPlayerHandmessage();
  return (
    playerHandmessage +
    "<br><br> Player " +
    playerProfiles[0].id +
    ", hit or stand?"
  );
}
function getValue(card) {
  let value = card["value"];

  if (isNaN(value)) {
    if (value == "Ace") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card["value"] == "Ace") {
    return 1;
  }
  return 0;
}
function createPlayerHandmessage() {
  var playerHandmessage =
    "Dealer card: " +
    dealerProfile.dealerHand +
    "<br> Dealer current points: " +
    dealerProfile.dealerHandValue +
    "<br>";

  for (i = 0; i < playerProfiles.length; i++) {
    var playerHandmessage =
      playerHandmessage +
      "<br><br>Player " +
      playerProfiles[i].id +
      "'s cards:" +
      playerProfiles[i].playerHand +
      "<br> Current points: " +
      playerProfiles[i].playerHandValue +
      "<br> Chips balance: " +
      playerProfiles[i].playerChipsBalance +
      "<br> Bet this round: " +
      playerProfiles[i].playerCurrRoundBet;
  }
  return playerHandmessage;
}
function toValidate_HitorStand(input) {
  var validation = input.toUpperCase();
  var playerHandmessage = createPlayerHandmessage();
  console.log(currentPlayer);
  if (validation == "STAND") {
    if (currentPlayer + 1 < numPlayers) {
      gameMode = GAME_MODE_HIT_OR_STAND;
      currentPlayer += 1;
      playerHandmessage =
        playerHandmessage +
        "<br><br> Player " +
        playerProfiles[currentPlayer].id +
        ", it's your turn. Hit or Stand?";
      return playerHandmessage;
    } else if (currentPlayer + 1 >= numPlayers) {
      gameMode = GAME_MODE_DEALER_TURN;
      console.log(gameMode + " stand");
      playerHandmessage =
        playerHandmessage + " <br><br> Continue to dealer's turn";
      return playerHandmessage;
    }
  } else if (validation == "HIT") {
    let card = deck.pop();

    playerProfiles[currentPlayer].playerHandValue += getValue(card);
    playerProfiles[currentPlayer].playerAceCount += checkAce(card);

    playerProfiles[currentPlayer].playerHand +=
      "<br>" + card.value + " of " + card.suits;

    while (
      playerProfiles[currentPlayer].playerHandValue > 21 &&
      playerProfiles[currentPlayer].playerAceCount > 0
    ) {
      playerProfiles[currentPlayer].playerHandValue -= 10;
      playerProfiles[currentPlayer].playerAceCount -= 1;
    }

    if (playerProfiles[currentPlayer].playerHandValue <= 21) {
      gameMode = GAME_MODE_HIT_OR_STAND;
      var playerHandmessage = createPlayerHandmessage();
      return (
        playerHandmessage +
        "<br><br> Player " +
        playerProfiles[currentPlayer].id +
        ", it's still your turn, continue to hit or stand? "
      );
    } else if (
      playerProfiles[currentPlayer].playerHandValue > 21 &&
      currentPlayer + 1 < numPlayers
    ) {
      gameMode = GAME_MODE_HIT_OR_STAND;
      var playerHandmessage = createPlayerHandmessage();
      currentPlayer += 1;
      console.log(currentPlayer);

      return (
        playerHandmessage +
        "<br><br> Player " +
        playerProfiles[currentPlayer - 1].id +
        ", your hand is over 21, busted!<br> Player " +
        playerProfiles[currentPlayer].id +
        ", hit or stand?"
      );
    }
  } else if (validation == "" && gameMode == GAME_MODE_HIT_OR_STAND) {
    gameMode = GAME_MODE_HIT_OR_STAND;
    return (
      playerHandmessage +
      "<br><br> Invalid. <br><br> Player " +
      playerProfiles[currentPlayer].id +
      ", it's still your turn, continue to hit or stand?<br><br> Enter Hit to draw another card or enter Stand to continue game."
    );
  } else if (Number(validation)) {
    gameMode = GAME_MODE_HIT_OR_STAND;
    return (
      playerHandmessage +
      "<br><br> Invalid. You entered a number. <br><br> Player " +
      playerProfiles[currentPlayer].id +
      ", it's still your turn, continue to hit or stand?<br><br> Enter Hit to draw another card or enter Stand to continue game."
    );
  } else if (
    isNaN(validation) &&
    !(validation == "HIT") &&
    !(validation == "STAND")
  ) {
    gameMode = GAME_MODE_HIT_OR_STAND;
    return (
      playerHandmessage +
      "<br><br> Invalid. Nan.<br><br> Player " +
      playerProfiles[currentPlayer].id +
      ", it's still your turn, continue to hit or stand?<br><br> Enter Hit to draw another card or enter Stand to continue game."
    );
  } else gameMode = GAME_MODE_DEALER_TURN;
  var playerHandmessage = createPlayerHandmessage();
  gameMode = GAME_MODE_DEALER_TURN;
  console.log(gameMode);
  return (
    playerHandmessage +
    "<br><br> Player " +
    playerProfiles[currentPlayer].id +
    ", your hand is over 21, busted!<br><br> Continue to dealer's turn"
  );
}
function drawingDealerCard(deck) {
  while (dealerProfile.dealerHandValue < 17) {
    let dealerCard = deck.pop();

    dealerProfile.dealerHandValue += getValue(dealerCard);
    dealerProfile.dealerAceCount += checkAce(dealerCard);

    dealerProfile.dealerHand +=
      "<br>" + dealerCard.value + " of " + dealerCard.suits;

    while (
      dealerProfile.dealerHandValue > 21 &&
      dealerProfile.dealerAceCount > 0
    ) {
      dealerProfile.dealerHandValue -= 10;
      dealerProfile.dealerAceCount -= 1;
    }
  }
  gameMode = GAME_MODE_LEADERBOARD;
  return (
    "Dealer : " +
    dealerProfile.dealerHand +
    "<br> Dealer have " +
    dealerProfile.dealerHandValue +
    "points. <br><br> Players with points over 21 or less than Dealer's points, lose. <br><br> Calculating..."
  );
}
function determineWinners() {
  for (var i = 0; i < playerProfiles.length; i++) {
    if (
      playerProfiles[i].playerHandValue > dealerProfile.dealerHandValue &&
      playerProfiles[i].playerHandValue < 22
    ) {
      playerProfiles[i].playerRoundScore += "WIN";
    }
    if (
      playerProfiles[i].playerHandValue < dealerProfile.dealerHandValue ||
      playerProfiles[i].playerHandValue > 21
    ) {
      playerProfiles[i].playerRoundScore += "LOSE";
    } else if (
      playerProfiles[i].playerHandValue == dealerProfile.dealerHandValue
    ) {
      playerProfiles[i].playerRoundScore += "TIE";
    }
  }
  for (var i = 0; i < playerProfiles.length; i++) {
    if (playerProfiles[i].playerRoundScore == "WIN") {
      playerProfiles[i].playerChipsBalance +=
        playerProfiles[i].playerCurrRoundBet;
    }
    if (playerProfiles[i].playerRoundScore == "LOSE") {
      playerProfiles[i].playerChipsBalance -=
        playerProfiles[i].playerCurrRoundBet;
    }
    if (playerProfiles[i].playerRoundScore == "BLACKJACK! - WIN") {
      playerProfiles[i].playerChipsBalance +=
        playerProfiles[i].playerCurrRoundBet * 2;
    }
  }

  var playerHandmessage =
    "Dealer cards: " +
    dealerProfile.dealerHand +
    "<br> Dealer current points: " +
    dealerProfile.dealerHandValue +
    "<br>";

  for (i = 0; i < playerProfiles.length; i++) {
    var playerHandmessage =
      playerHandmessage +
      "<br><br>Player " +
      playerProfiles[i].id +
      "'s cards:" +
      playerProfiles[i].playerHand +
      "<br> Current points: " +
      playerProfiles[i].playerHandValue +
      "<br> Chips balance: " +
      playerProfiles[i].playerChipsBalance +
      "<br> Bet this round: " +
      playerProfiles[i].playerCurrRoundBet +
      "<br> Result: " +
      playerProfiles[i].playerRoundScore;
  }
  for (var i = 0; i < playerProfiles.length; i++) {
    if (playerProfiles[i].playerChipsBalance < 1) {
      playerProfiles.splice(i, 1);
      numPlayers -= 1;
    }
  }
  return playerHandmessage;
}
function resetGame() {
  gameMode = GAME_MODE_BETTING_MODE;
  currPlayer = 0;
  currentPlayer = 0;
  deck = buildDeck();
  shuffleDeck(deck);
  for (var i = 0; i < playerProfiles.length; i += 1) {
    playerProfiles[i].playerHand = [];
    playerProfiles[i].playerAceCount = 0;
    playerProfiles[i].playerHandValue = 0;
    playerProfiles[i].playerCurrRoundBet = 0;
    playerProfiles[i].playerRoundScore = "";
  }
  dealerProfile = {
    dealerHand: [],
    dealerAceCount: 0,
    dealerHandValue: 0,
    dealerFinalValue: 0,
  };
}
function totalReset() {
  gameMode = GAME_MODE_CHOOSE_NUM_PLAYERS;
  numPlayers = 0;
  currPlayer = 0;
  currentPlayer = 0;
  input;
  playerProfiles = [];
  deck = [];
  dealerProfile = {
    dealerHand: [],
    dealerAceCount: 0,
    dealerHandValue: 0,
    dealerFinalValue: 0,
  };
}

///===================================================///
///================= MAIN FUNCTION ===================///
///===================================================///

var main = function (input) {
  console.log(deck.length);

  if (gameMode == GAME_MODE_CHOOSE_NUM_PLAYERS) {
    deck = buildDeck();
    shuffleDeck(deck);
    getNumPlayers(input);
    return numPlayersMessage;
  } else if (gameMode == GAME_MODE_BETTING_MODE) {
    if (playerProfiles.length == 0) {
      return "All players lost. No more players. Refresh the page to play again. ";
    } else {
      var bettingModeMessage = determineCurrentRoundBetSize(input);
      return bettingModeMessage;
    }
  } else if (gameMode == GAME_MODE_PLAYERS_TURN) {
    var playerCardsMessage = drawingPlayersCardsAndDealerFirstCard(deck);
    return playerCardsMessage;
  } else if (gameMode == GAME_MODE_HIT_OR_STAND) {
    var playerChoiceHitorStand = toValidate_HitorStand(input);
    return playerChoiceHitorStand;
  } else if (gameMode == GAME_MODE_DEALER_TURN) {
    var dealerCardsMessage = drawingDealerCard(deck);
    return dealerCardsMessage;
  } else if (gameMode == GAME_MODE_LEADERBOARD) {
    var determineWinnersMessage = determineWinners();
    resetGame();
    return (
      determineWinnersMessage +
      "<br><br>Player " +
      playerProfiles[0].id +
      ", what's your bet this round?"
    );
  } else return "Error, please refresh the page ";
};
