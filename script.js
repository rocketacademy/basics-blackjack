var gameMode = "start";
var player = [];
var computer = [];
var playerTotal = 0;
var computerTotal = 0;

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["❤️", "♦️", "♣️", "♠️"];
  for (let i = 0; i < suits.length; i++) {
    var currentSuit = suits[i];

    var counter = 1;
    while (counter <= 13) {
      var pointCounter = counter;
      var cardName = pointCounter;

      if (cardName == 1) {
        pointCounter = 11;
        cardName = "Ace";
      } else if (cardName == 11) {
        pointCounter = 10;
        cardName = "Jack";
      } else if (cardName == 12) {
        pointCounter = 10;
        cardName = "Queen";
      } else if (cardName == 13) {
        pointCounter = 10;
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        points: pointCounter,
      };

      // add the card to the deck
      cardDeck.push(card);

      counter++;
    }
  }
  return cardDeck;
};
console.log("carddeck", makeDeck());

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  for (let i = 0; i < cardDeck.length; i++) {
    //get random index up to i
    let j = getRandomIndex(i + 1);
    // swap elements at indices i and j
    var temp = cardDeck[i];
    cardDeck[i] = cardDeck[j];
    cardDeck[j] = temp;
  }
  return cardDeck;
};

var shuffledDeck = shuffleCards(makeDeck());
console.log("shuffled Deck", shuffledDeck);

var dealCardToHand = function (hand) {
  hand.push(shuffledDeck.pop());
};

var displayCards = function (player, computer) {
  var playerMsg = `You have drawn:<br> `;
  var computerMsg = `Computer has drawn:<br>`;
  for (let i = 0; i < player.length; i++) {
    playerMsg += ` ${player[i].name}  ${player[i].suit} <br> `;
  }
  for (let j = 0; j < computer.length; j++) {
    computerMsg += ` ${computer[j].name}  ${computer[j].suit} <br> `;
  }

  return `${playerMsg}<br>${computerMsg}`;
};

var getPlayerSum = function (player) {
  let playerTotal = 0;
  let hasAce = false;
  for (let i = 0; i < player.length; i++) {
    if (player[i].name == "Ace") {
      hasAce = true;
    }
    playerTotal += Number(player[i].points);
  }
  if (hasAce && playerTotal > 21) {
    playerTotal -= 10; // Treat Ace as 1 instead of 11
  }
  return playerTotal;
};

var getComputerSum = function (computer) {
  let computerTotal = 0;
  let hasAce = false;
  for (let j = 0; j < computer.length; j++) {
    if (computer[j].name == "Ace") {
      hasAce = true;
    }
    computerTotal += Number(computer[j].points);
  }
  if (hasAce && computerTotal > 21) {
    computerTotal -= 10; // Treat Ace as 1 instead of 11
  }
  return computerTotal;
};

var computerPoints = getComputerSum(computer);
var playerPoints = getPlayerSum(player);

var getInputValidation = function (input) {
  if (input != "hit" && input != "stand") {
    return `Please submit "hit" or "stand".`;
  } else {
    return;
  }
};

var restartGame = function () {
  gameMode = "start";
  playerPoints = 0;
  computerPoints = 0;
  player = [];
  computer = [];
};

var computerPoints = getComputerSum(computer);
var playerPoints = getPlayerSum(player);

var main = function (input) {
  input = input.toLowerCase();
  var inputValidation = getInputValidation(input);
  var defaultMsg = "";

  if (gameMode == "start") {
    dealCardToHand(player);
    dealCardToHand(computer);
    dealCardToHand(player);
    dealCardToHand(computer);
    gameMode = "choice";

    var computerPoints = getComputerSum(computer);
    var playerPoints = getPlayerSum(player);

    defaultMsg = `${displayCards(player, computer)}<br>
                Player Points: ${playerPoints}<br>
                Computer Points: ${computerPoints}`;

    console.log(
      "Computer Points",
      computerPoints,
      "Player Points",
      playerPoints
    );

    if (playerPoints == 21) {
      gameMode = "gameOver";
      restartGame();
      return `${defaultMsg} <br> You have hit BlackJack! <br> Click Submit to play again`;
    }
    if (computerPoints == 21) {
      gameMode = "gameOver";
      restartGame();
      return `${defaultMsg} <br> Computer has hit BlackJack <br> Click Submit to play again`;
    }

    if (playerPoints < 21 && computerPoints != 21) {
      return `${defaultMsg} <br> Please key in "hit" or "stand" then press submit.`;
    }
  }
  if (gameMode == "choice") {
    if (getInputValidation(input)) {
      return `${inputValidation}`;
    }
    if (input == "hit") {
      dealCardToHand(player);
      console.log("remaining cards in deck", shuffledDeck);
      var computerPoints = getComputerSum(computer);
      var playerPoints = getPlayerSum(player);

      var playerMsg = "";
      if (getPlayerSum(player) > 21) {
        playerMsg = ` ${displayCards(player, computer)}<br>
                Player Points: ${playerPoints}<br>
                Computer Points: ${computerPoints}<br> You have gone bust! Computer wins.`;
        gameMode = "gameover";
      } else {
        playerMsg = `${displayCards(player, computer)}<br>
                Player Points: ${playerPoints}<br>
                Computer Points:${computerPoints}<br> You can key in "hit" or "stand" to continue.`;
      }

      console.log(
        "Computer Points",
        computerPoints,
        "Player Points",
        playerPoints
      );
      return playerMsg;
    }

    if (input == "stand") {
      // player stands, now it's the computer's turn
      var computerPoints = getComputerSum(computer);
      var playerPoints = getPlayerSum(player);
      while (
        computerPoints < 17 &&
        computerPoints < playerPoints &&
        playerPoints <= 21
      ) {
        dealCardToHand(computer);
        computerPoints += computer[computer.length - 1].points;
        output = `${defaultMsg} <br> ${resultMsg}`;
      }

      var resultMsg = "";
      if (computerPoints > 21) {
        resultMsg = `${displayCards(player, computer)}<br>
                Player Points: ${playerPoints}<br>
                Computer Points: ${computerPoints}<br>  Computer has gone bust! You win.`;
      } else if (getComputerSum(computer) > getPlayerSum(player)) {
        resultMsg = `${displayCards(player, computer)}<br>
                Player Points: ${playerPoints}<br>
                Computer Points: ${computerPoints}<br>Computer wins!`;
      } else if (playerPoints > computerPoints) {
        resultMsg = `${displayCards(player, computer)}<br>
                Player Points: ${playerPoints}<br>
                Computer Points: ${computerPoints}<br>  You win! `;
      } else {
        resultMsg = `${displayCards(player, computer)}<br>
                Player Points: ${playerPoints}<br>
                Computer Points: ${computerPoints}<br> It's a tie!`;
      }
      console.log(
        "Computer Points",
        computerPoints,
        "Player Points",
        playerPoints
      );
      gameMode = "gameover";
      return resultMsg;
    }
  } else if (gameMode == "gameover") restartGame();
  return `The Game is over, click submit to restart `;
};
