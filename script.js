// BlackJack Game //
// Instructions //
// 1) There will be only two players. One human and one computer (for the Base solution).

// 2) The computer will always be the dealer.
// 3) Each player gets dealt two cards to start.
// 4) The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// 5) The dealer has to hit if their hand is below 17.
// 6) Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// 7) The player who is closer to, but not above 21 wins the hand.

// Global variables //
var gameMode = "DEAL CARDS TO COMPUTER AND PLAYER";
var playerHand = [];
var computerHand = [];

// Helper Functions Needed //
// 1) Deck generating function //
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        imagePath: `PNGCards/${cardName}_of_${currentSuit}.png`,
      };

      cardDeck.push(card);

      rankCounter += 1;
    }

    suitIndex += 1;
  }

  return cardDeck;
};

var deck = makeDeck();
// 2) Card shuffling function //
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);

    var randomCard = cardDeck[randomIndex];

    var currentCard = cardDeck[currentIndex];

    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }

  return cardDeck;
};

var main = function (input) {
  var shuffledDeck = shuffleCards(deck);
  var outputValue = "";

  if (gameMode == "DEAL CARDS TO COMPUTER AND PLAYER") {
    for (i = 0; i < 2; i += 1) {
      playerHand.push(shuffledDeck.pop());
      computerHand.push(shuffledDeck.pop());
    }
    console.log(
      `control flow 1: playerHand ${playerHand[0].name} of ${playerHand[0].suit} ${playerHand[1].name} of ${playerHand[1].suit} computerHand ${computerHand[0].name} of ${computerHand[0].suit} ${computerHand[1].name} of ${computerHand[1].suit}`
    );

    const playerHandContainer = document.getElementById("player-hand");
    playerHand.forEach((card) => {
      const imgElement = document.createElement("img");
      imgElement.src = card.imagePath;
      imgElement.alt = `${card.name} of ${card.suit}`;
      imgElement.width = 100;
      imgElement.height = 140;
      playerHandContainer.appendChild(imgElement);
    });

    const computerHandContainer = document.getElementById("computer-hand");
    const imgElement2 = document.createElement("img");
    imgElement2.src = computerHand[0].imagePath;
    imgElement2.alt = `${computerHand[0].name} of ${computerHand[0].suit}`;
    imgElement2.width = 100;
    imgElement2.height = 140;
    computerHandContainer.appendChild(imgElement2);

    for (i = 0; i < playerHand.length; i++) {
      if (
        playerHand[i].name === "Jack" ||
        playerHand[i].name === "Queen" ||
        playerHand[i].name === "King"
      ) {
        playerHand[i].rank = 10;
        computerHand[i].rank = 10;
      }
    }
    // winning validation on first two cards //
    if (
      (playerHand[0].name == "Ace" &&
        (playerHand[1].name == "Jack" ||
          playerHand[1].name == "Queen" ||
          playerHand[1].name == "King" ||
          playerHand[1].name == 10)) ||
      (playerHand[1].name == "Ace" &&
        (playerHand[0].name == "Jack" ||
          playerHand[0].name == "Queen" ||
          playerHand[0].name == "King" ||
          playerHand[0].name == 10))
    ) {
      outputValue = `Your cards are ${playerHand[0].name} and ${playerHand[1].name}. YOU WIN!!`;
      return outputValue;
      // end of winning validation on first two cards //
    } else if (
      (computerHand[0].name == "Ace" &&
        (computerHand[1].name == "Jack" ||
          computerHand[1].name == "Queen" ||
          computerHand[1].name == "King" ||
          computerHand[1].name == 10)) ||
      (computerHand[1].name == "Ace" &&
        (computerHand[0].name == "Jack" ||
          computerHand[0].name == "Queen" ||
          computerHand[0].name == "King" ||
          computerHand[0].name == 10))
    ) {
      outputValue = `Your cards are ${playerHand[0].name} and ${playerHand[1].name}.<br>The computer has ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].name} of ${computerHand[1].suit}<br>YOU LOST!!`;
      return outputValue;
    }
    gameMode = "GAME STATE PLAYER HIT OR STAND";
    outputValue = `You were dealt ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}.<br>The dealer has ${computerHand[0].name} of ${computerHand[0].suit}<br>Please enter HIT or STAND to continue.`;
    console.log("control flow 1");
  } else if (gameMode == "GAME STATE PLAYER HIT OR STAND") {
    var userGuess = input;
    if (userGuess == "STAND") {
      for (i = 0; i < playerHand.length; i++) {
        if (
          playerHand[i].name === "Jack" ||
          playerHand[i].name === "Queen" ||
          playerHand[i].name === "King"
        ) {
          playerHand[i].rank = 10;
        }
        if (
          computerHand[i].name === "Jack" ||
          computerHand[i].name === "Queen" ||
          computerHand[i].name === "King"
        ) {
          computerHand[i].rank = 10;
        }
        if (playerHand[i].name === "Ace") {
          playerHand[i].rank = 11;
        }
        if (computerHand[i].name === "Ace") {
          computerHand[i].rank = 11;
        }
      }
      console.log(playerHand);
      console.log(computerHand);
      var playerHandRank = playerHand[0].rank + playerHand[1].rank;
      var computerHandRank = computerHand[0].rank + computerHand[1].rank;
      console.log(playerHandRank);
      console.log(computerHandRank);
      if (computerHandRank > playerHandRank) {
        console.log("control flow 2");
        const playerHandContainer = document.getElementById("player-hand");
        playerHand.forEach((card) => {
          const imgElement = document.createElement("img");
          imgElement.src = card.imagePath;
          imgElement.alt = `${card.name} of ${card.suit}`;
          imgElement.width = 100;
          imgElement.height = 140;
          playerHandContainer.appendChild(imgElement);
        });

        const computerHandContainer = document.getElementById("computer-hand");
        computerHand.forEach((card) => {
          const imgElement2 = document.createElement("img");
          imgElement2.src = computerHand[0].imagePath;
          imgElement2.alt = `${computerHand[0].name} of ${computerHand[0].suit}`;
          imgElement2.width = 100;
          imgElement2.height = 140;
          computerHandContainer.appendChild(imgElement2);
        });
        outputValue = `YOU LOSE!<br>Your Cards are: 1)${playerHand[0].name} of ${playerHand[0].suit} and 2)${playerHand[1].name} of ${playerHand[1].suit}<br>Dealer has 1)${computerHand[0].name} of ${computerHand[0].suit} and 2)${computerHand[1].name} of ${computerHand[1].suit}}`;
        return outputValue;
      }
      console.log("control flow 3");
      const playerHandContainer = document.getElementById("player-hand");
      playerHand.forEach((card) => {
        const imgElement = document.createElement("img");
        imgElement.src = card.imagePath;
        imgElement.alt = `${card.name} of ${card.suit}`;
        imgElement.width = 100;
        imgElement.height = 140;
        playerHandContainer.appendChild(imgElement);
      });

      const computerHandContainer = document.getElementById("computer-hand");
      computerHand.forEach((card) => {
        const imgElement2 = document.createElement("img");
        imgElement2.src = computerHand[0].imagePath;
        imgElement2.alt = `${computerHand[0].name} of ${computerHand[0].suit}`;
        imgElement2.width = 100;
        imgElement2.height = 140;
        computerHandContainer.appendChild(imgElement2);
      });
      outputValue = `YOU WIN!<br>Your Cards are: 1)${playerHand[0].name} of ${playerHand[0].suit} and 2)${playerHand[1].name} of ${playerHand[1].suit}<br>Dealer has 1)${computerHand[0].name} of ${computerHand[0].suit} and 2)${computerHand[1].name} of ${computerHand[1].suit}}`;
      return outputValue;
    }
    var newCard = shuffledDeck.pop();
    playerHand.push(newCard);
    playerHandRank = playerHandRank + playerHand[2].rank;
    if (playerHandRank > 21) {
      const playerHandContainer = document.getElementById("player-hand");
      playerHand.forEach((card) => {
        const imgElement = document.createElement("img");
        imgElement.src = card.imagePath;
        imgElement.alt = `${card.name} of ${card.suit}`;
        imgElement.width = 100;
        imgElement.height = 140;
        playerHandContainer.appendChild(imgElement);
      });

      outputValue = `Your hand went over 21, you lost!`;
    } else if (playerHandRank == 21) {
      const playerHandContainer = document.getElementById("player-hand");
      playerHand.forEach((card) => {
        const imgElement = document.createElement("img");
        imgElement.src = card.imagePath;
        imgElement.alt = `${card.name} of ${card.suit}`;
        imgElement.width = 100;
        imgElement.height = 140;
        playerHandContainer.appendChild(imgElement);
      });

      const computerHandContainer = document.getElementById("computer-hand");
      computerHand.forEach((card) => {
        const imgElement2 = document.createElement("img");
        imgElement2.src = computerHand[0].imagePath;
        imgElement2.alt = `${computerHand[0].name} of ${computerHand[0].suit}`;
        imgElement2.width = 100;
        imgElement2.height = 140;
        computerHandContainer.appendChild(imgElement2);
      });
      outputValue = `YOU WIN!<br>Your Cards are: 1)${playerHand[0].name} of ${playerHand[0].suit} and 2)${playerHand[1].name} of ${playerHand[1].suit} and ${playerHand[2].name} of ${playerHand[2].suit}<br>Dealer has 1)${computerHand[0].name} of ${computerHand[0].suit} and 2)${computerHand[1].name} of ${computerHand[1].suit}}`;
      return outputValue;
    }
    const playerHandContainer = document.getElementById("player-hand");
    playerHand.forEach((card) => {
      const imgElement = document.createElement("img");
      imgElement.src = card.imagePath;
      imgElement.alt = `${card.name} of ${card.suit}`;
      imgElement.width = 100;
      imgElement.height = 140;
      playerHandContainer.appendChild(imgElement);
    });

    const computerHandContainer = document.getElementById("computer-hand");
    computerHand.forEach((card) => {
      const imgElement2 = document.createElement("img");
      imgElement2.src = computerHand[0].imagePath;
      imgElement2.alt = `${computerHand[0].name} of ${computerHand[0].suit}`;
      imgElement2.width = 100;
      imgElement2.height = 140;
      computerHandContainer.appendChild(imgElement2);
    });
    outputValue = `Your hand:<br>1)${playerHand[0].name} of ${playerHand[0].suit}<br>2)${playerHand[1].name} of ${playerHand[1].suit}<br>3)${playerHand[2].name} of ${playerHand[2].suit}<br><br><br>The Dealer has shown ${computerHand[0].name} of ${computerHand[0].suit}.<br>Please enter "HIT" or "STAND" to continue.`;
  }

  return outputValue;
};
