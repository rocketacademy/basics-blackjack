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
var GAME_STATE_DECLARE_RESULT;
var GAME_STATE_COMPUTER_HIT_OR_STAND;
var GAME_STATE_PLAYER_HIT_OR_STAND;
var GAME_STATE_DEAL_CARDS;
var gameState;

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
  var playerHand = [];
  var computerHand = [];

  if (gameState == GAME_STATE_DEAL_CARDS) {
    for (i = 0; i < 2; i += 1) {
      playerHand.push(shuffledDeck.pop());
      computerHand.push(shuffledDeck.pop());
    }

    const playerHandContainer = document.getElementById("player-hand");
    playerHand.forEach((card) => {
      const imgElement = document.createElement("img");
      imgElement.src = card.imagePath;
      imgElement.alt = `${card.name} of ${card.suit}`;
      playerHandContainer.appendChild(imgElement);
    });

    const computerHandContainer = document.getElementById("computer-hand");
    const imgElement2 = document.createElement("img");
    imgElement2.src = computerHand[0].imagePath;
    imgElement2.alt = `${computerHand[0].name} of ${computerHand[0].suit}`;
    computerHandContainer.appendChild(imgElement2);
  }
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
        playerHand[1].name == "King")) ||
    (playerHand[1].name == "Ace" &&
      (playerHand[0].name == "Jack" ||
        playerHand[0].name == "Queen" ||
        playerHand[0].name == "King"))
  ) {
    outputValue = `Your cards are ${playerHand[0].name} and ${playerHand[1].name}. YOU WIN!!`;
    // end of winning validation on first two cards //
  }

  gameState = GAME_STATE_PLAYER_HIT_OR_STAND;

  outputValue = `You were dealt ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}.<br>The dealer has ${computerHand[0].name} of ${computerHand[0].suit}<br>Please enter HIT or STAND to continue.`;

  return outputValue;
};

// var playerHandRank = playerHand.reduce(
//       (total, card) => total + card.rank,
//       0
//     );
//     var computerHandRank = computerHand.reduce(
//       (total, card) => total + card.rank,
//       0
//     );
