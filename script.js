var preGame = document.getElementById("pre-game");
var game = document.getElementById("game");
var bet = document.getElementById("bet-value");
var playersContainer = document.getElementById("players-container");
var dealersContainer = document.getElementById("dealers-container");
var buttonStartGame = document.getElementById("start-game");
var buttonHit = document.getElementById("hit-button");
var buttonStand = document.getElementById("stand-button");
var modal = document.getElementById("modal");
var modalContent = document.getElementById("modal-content");

var playerCards = [];
var dealerCards = [];
var playerCardsRank = [];
var dealerCardsRank = [];
var cardDeck;
var playerScore;
var dealerScore;

var playerDetails;
var playerHandDisp;
var dealerHandDisp;
var dealerHandDispGrey;

buttonStartGame.addEventListener("click", function () {
  // hide pre-game, display game
  preGame.style.display = "none";
  game.style.display = "block";

  cardDeck = makeDeck();
  cardDeck = shuffleCards(cardDeck);

  for (var i = 0; i < 2; i++) {
    // player's cards
    playerCards.push(cardDeck.pop());
    playerCardsRank.push(Math.min(playerCards[i].rank, 10));

    // dealer's cards
    dealerCards.push(cardDeck.pop());
    dealerCardsRank.push(Math.min(dealerCards[i].rank, 10));
  }

  playerScore = optimiseScore(playerCardsRank);
  dealerScore = optimiseScore(dealerCardsRank);

  // player
  var playerBet = document.createElement("p");
  playerBet.innerHTML = `Bet: ${bet.value}`;
  playersContainer.appendChild(playerBet);

  playerDetails = document.createElement("p");
  playerDetails.innerHTML = `Player's score: ${playerScore}`;
  playersContainer.appendChild(playerDetails);

  var playerHand = document.createElement("p");
  playerHand.innerHTML = `Player's hand: <br>`;
  playersContainer.appendChild(playerHand);

  for (var i = 0; i < playerCards.length; i++) {
    playerHandDisp = document.createElement("img");
    playerHandDisp.src = "assets/" + playerCards[i].image + ".png";
    playerHandDisp.className = "card-display";
    playersContainer.appendChild(playerHandDisp);
  }

  // dealer
  dealerHand = document.createElement("p");
  dealerHand.innerHTML = `Dealer's hand: <br>`;
  dealersContainer.appendChild(dealerHand);

  for (var i = 0; i < dealerCards.length - 1; i++) {
    var dealerHandDisp = document.createElement("img");
    dealerHandDisp.src = "assets/" + dealerCards[i].image + ".png";
    dealerHandDisp.className = "card-display";
    dealersContainer.appendChild(dealerHandDisp);
  }

  dealerHandDispGrey = document.createElement("img");
  dealerHandDispGrey.src = "assets/grey_back.png";
  dealerHandDispGrey.className = "card-display";
  dealersContainer.appendChild(dealerHandDispGrey);

  if (playerScore == 21) {
    displayResult(`You scored 21 and win ${1.5 * bet.value}!`);
  }
});

buttonHit.addEventListener("click", function () {
  playerCards.push(cardDeck.pop());
  playerCardsRank.push(Math.min(playerCards[playerCards.length - 1].rank, 10));
  playerScore = optimiseScore(playerCardsRank);
  playerDetails.innerHTML = `Player's score: ${playerScore}`;

  playerHandDisp = document.createElement("img");
  playerHandDisp.src =
    "assets/" + playerCards[playerCards.length - 1].image + ".png";
  playerHandDisp.className = "card-display";
  playersContainer.appendChild(playerHandDisp);
  if (playerScore > 21) {
    dealersContainer.removeChild(dealerHandDispGrey);
    dealerHandDisp = document.createElement("img");
    dealerHandDisp.src =
      "assets/" + dealerCards[dealerCards.length - 1].image + ".png";
    dealerHandDisp.className = "card-display";
    dealersContainer.appendChild(dealerHandDisp);

    displayResult(
      `You went bust and lost ${bet.value} to the dealer. Better luck next time!`
    );
  } else if (playerScore == 21) {
    displayResult(`You scored 21 and win ${1.5 * bet.value}!`);
  }
});

buttonStand.addEventListener("click", function () {
  // if dealer's score is >= 17, stay with their hand
  // otherwise draw another card
  while (dealerScore < 17) {
    dealerCards.push(cardDeck.pop());
    dealerCardsRank.push(
      Math.min(dealerCards[dealerCards.length - 1].rank, 10)
    );
    dealerScore = optimiseScore(dealerCardsRank);
  }

  dealersContainer.removeChild(dealerHandDispGrey);
  for (var i = 1; i < dealerCards.length; i++) {
    dealerHandDisp = document.createElement("img");
    dealerHandDisp.src = "assets/" + dealerCards[i].image + ".png";
    dealerHandDisp.className = "card-display";
    dealersContainer.appendChild(dealerHandDisp);
  }

  if (dealerScore > 21) {
    displayResult(`Dealer went bust and you win ${2 * bet.value}!`);
  } else if (playerScore > dealerScore) {
    displayResult(
      `You scored higher than the dealer and win ${2 * bet.value}!`
    );
  } else {
    displayResult(
      `You scored lower than the dealer and lost ${bet.value}. Better luck next time!`
    );
  }
});

var displayResult = function (message) {
  modal.style.display = "block";
  var resultMsg = document.createElement("p");
  resultMsg.innerHTML = message;
  modalContent.appendChild(resultMsg);
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  resetGame();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resetGame();
  }
};

var resetGame = function () {
  preGame.style.display = "block";
  game.style.display = "none";
  modalContent.removeChild(modalContent.lastChild);
  bet.value = 100;
  playerCards = [];
  dealerCards = [];
  playerCardsRank = [];
  dealerCardsRank = [];
  playersContainer.innerHTML = "";
  dealersContainer.innerHTML = "";
};

var optimiseScore = function (cards) {
  var sum = 0;
  for (card in cards) {
    sum += cards[card];
  }
  // ace can be 1 or 11
  if (cards.includes(1) && sum + 10 <= 21) {
    sum += 10;
  }
  return sum;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

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

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    if (currentSuit == "hearts") {
      imgsuit = "H";
    } else if (currentSuit == "diamonds") {
      imgsuit = "D";
    } else if (currentSuit == "clubs") {
      imgsuit = "C";
    } else if (currentSuit == "spades") {
      imgsuit = "S";
    }

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
        img = "A" + imgsuit;
      } else if (cardName == 11) {
        cardName = "jack";
        img = "J" + imgsuit;
      } else if (cardName == 12) {
        cardName = "queen";
        img = "Q" + imgsuit;
      } else if (cardName == 13) {
        cardName = "king";
        img = "K" + imgsuit;
      } else {
        img = cardName + imgsuit;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        image: img,
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
