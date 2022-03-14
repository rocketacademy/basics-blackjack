/***
 * Makes a new 52 card deck
 * @returns {Array} an array of a playing card objects
 */
var makeDeck = function () {
  var cardSuits = ["S", "H", "C", "D"];
  var cardText = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
  ];
  var createdDeck = [];
  for (var i = 0; i < cardSuits.length; i += 1) {
    var currentSuit = cardSuits[i];
    for (var j = 0; j < cardText.length; j += 1) {
      var newCard = {
        suit: currentSuit,
        rank: j + 1,
        text: cardText[j],
        svg: `<img class="card" src="svg/${currentSuit}${cardText[j]}.svg" />`,
      };
      createdDeck.push(newCard);
    }
  }
  return createdDeck;
};

/***
 * Shuffles a card deck
 * @argument {Array} deckToShuffle The deck to be shuffled
 * @returns {Array} the shuffled deck
 */
var shuffleDeck = function (deckToShuffle) {
  for (var i = 0; i < deckToShuffle.length; i += 1) {
    var randomIndex = Math.floor(Math.random() * deckToShuffle.length);
    var randomCard = deckToShuffle[randomIndex];
    var currentCard = deckToShuffle[i];
    deckToShuffle[randomIndex] = currentCard;
    deckToShuffle[i] = randomCard;
  }
  return deckToShuffle;
};

/***
 * Calculates the hand blackjack value
 * @argument {Array} cardArray The current blackjack hand
 * @returns {number} the total blackjack value of the hand.
 */
var calculateHand = function (cardArray) {
  var calculatedValue = 0;
  var acesInHand = 0;
  for (var i = 0; i < cardArray.length; i += 1) {
    //if it's an ace
    if (cardArray[i].rank == 1) {
      acesInHand += 1;
      continue;
    }
    //rank > 10 means Jack Queen King
    if (cardArray[i].rank > 10) {
      calculatedValue += 10;
      continue;
    }
    calculatedValue += cardArray[i].rank;
  }

  if (acesInHand) {
    var aceValues = calcuateAceValue(acesInHand);
    if (calculatedValue + aceValues[0] <= 21)
      return (calculatedValue += aceValues[0]);
    return (calculatedValue += aceValues[1]);
  }

  return calculatedValue;
};

/***
 * Calculates the maximum and minimum value of the Ace cards in the hand
 * @argument {number} numberofAces The number of Aces in hand.
 * @returns {Array} The maximum and minimum value of the Aces in hand where [0] is the max value, and [1] is the minimum value
 */
var calcuateAceValue = function (numberofAces) {
  var maxValue = 10 + numberofAces;
  var minValue = numberofAces;
  return [maxValue, minValue];
};

/***
 * Draws card for blackjack, resets the deck of cards into a new shuffled deck of cards if deck is empty.
 * @returns {Object} The pulled card Object
 */
var drawCard = function () {
  if (playDeck.length == 0) {
    playDeck = shuffleDeck(makeDeck());
  }
  return playDeck.pop();
};

/***
 * Searches the next player for the game, and assigns the global value of current player to it. Skips player if player has blackjack
 * @returns {null}
 */
var searchNextPlayer = function () {
  for (var i = currentPlayer + 1; i < playerArray.length; i += 1) {
    if (
      playerArray[i].activePlayer &&
      !checkBlackjack(playerArray[i].handArray)
    ) {
      currentPlayer = i;
      return;
    }
  }
  currentPlayer = 0;
  return;
};

/***
 * Checks whether a hand has blackjack or not
 * @param {Array} hand An array of card objects on hand
 * @returns {boolean} True if hand is blackjack, False if not
 */
var checkBlackjack = function (hand) {
  if (calculateHand(hand) == MAX_VALUE_CARDS && hand.length == 2) return true;
  return false;
};

/***
 * discards all the players and dealer hands
 * @returns {null}
 */
var discardAllHand = function () {
  for (var i = 0; i < playerArray.length; i += 1)
    playerArray[i].handArray.length = 0;
};

/***
 * resets the game for the next round
 * @returns {null}
 */
var nextRound = function () {
  discardAllHand();
  dealerBlackJack = false;

  //reset UI
  enableDeal();
  enableChipIn();
  enableBetInput();
  disableP1Options();
  disableP2Options();
  disableP3Options();

  if (playerArray[1].activePlayer) {
    playerArray[1].chipInfoSpace.innerHTML = `Current Chips: ${playerArray[1].chips}`;
    playerArray[1].betInput.value = 1;
  }
  if (playerArray[2].activePlayer) {
    playerArray[2].chipInfoSpace.innerHTML = `Current Chips: ${playerArray[2].chips}`;
    playerArray[2].betInput.value = 1;
  }
  if (playerArray[3].activePlayer) {
    playerArray[3].chipInfoSpace.innerHTML = `Current Chips: ${playerArray[3].chips}`;
    playerArray[3].betInput.value = 1;
  }

  if (playerArray[1].chips <= 0 && playerArray[1].activePlayer) {
    hideP1BetArea();
    hideP1Options();
    showP1ChipIn();
    p1ChipInfo.innerHTML = `You've run out of chips!`;
    playerArray[1].activePlayer = false;
  }
  if (playerArray[2].chips <= 0 && playerArray[2].activePlayer) {
    hideP2BetArea();
    hideP2Options();
    showP2ChipIn();
    p2ChipInfo.innerHTML = `You've run out of chips!`;
    playerArray[2].activePlayer = false;
  }
  if (playerArray[3].chips <= 0 && playerArray[3].activePlayer) {
    hideP3BetArea();
    hideP3Options();
    showP3ChipIn();
    p3ChipInfo.innerHTML = `You've run out of chips!`;
    playerArray[3].activePlayer = false;
  }
};

/***
 * When everything is done, resolves game, paid/took credit from players and resets round
 * @returns {null}
 */
var resolveGame = function () {
  //dealer blackjack scenario
  if (dealerBlackJack) {
    for (var i = 1; i < playerArray.length; i += 1) {
      if (!playerArray[i].activePlayer) continue;
      if (checkBlackjack(playerArray[i].handArray)) {
        playerArray[i].handInfoSpace.innerHTML = `Push! bet will be returned`;
        continue;
      }
      playerArray[
        i
      ].handInfoSpace.innerHTML = `You lost ${playerArray[i].betInput.value}`;
      var playerInitialChips = Number(playerArray[i].chips);
      var playerResultingChips =
        playerInitialChips - Number(playerArray[i].betInput.value);
      playerArray[i].chips = playerResultingChips;
    }
    nextRound();
    return;
  }

  //if dealer hand below threshold, dealer hits
  var dealerFinalHandValue = calculateHand(playerArray[0].handArray);
  while (dealerFinalHandValue <= DEALER_HIT_THRESHOLD) {
    playerArray[0].handArray.push(drawCard());
    dealerFinalHandValue = calculateHand(playerArray[0].handArray);
  }

  //display dealer cards and value
  dealerHand.innerHTML = "";
  for (var i = 0; i < playerArray[0].handArray.length; i += 1) {
    dealerHand.innerHTML += playerArray[0].handArray[i].svg;
  }
  dealerInfo.innerHTML = `Dealer has: ${dealerFinalHandValue}`;

  if (dealerFinalHandValue > MAX_VALUE_CARDS) {
    //dealer bust scenario
    dealerInfo.innerHTML = `Dealer Bust!`;
    for (var i = 1; i < playerArray.length; i += 1) {
      if (!playerArray[i].activePlayer) continue;
      //player Blackjack scenario
      if (checkBlackjack(playerArray[i].handArray)) {
        var blackjackWinTotal =
          Number(playerArray[i].betInput.value) * BLACKJACK_WIN_MULTIPLIER;
        playerArray[i].handInfoSpace.innerHTML = `You Won ${blackjackWinTotal}`;
        var playerInitialChips = Number(playerArray[i].chips);
        var playerResultingChips = playerInitialChips + blackjackWinTotal;
        playerArray[i].chips = playerResultingChips;
        continue;
      }

      var currentPlayerHandValue = calculateHand(playerArray[i].handArray);

      //player bust
      if (currentPlayerHandValue > MAX_VALUE_CARDS) {
        playerArray[
          i
        ].handInfoSpace.innerHTML = `You lost ${playerArray[i].betInput.value}`;
        var playerInitialChips = Number(playerArray[i].chips);
        var playerResultingChips =
          playerInitialChips - Number(playerArray[i].betInput.value);
        playerArray[i].chips = playerResultingChips;
        continue;
      }
      //player doesn't bust
      playerArray[
        i
      ].handInfoSpace.innerHTML = `You Won ${playerArray[i].betInput.value}`;
      var playerInitialChips = Number(playerArray[i].chips);
      var playerResultingChips =
        playerInitialChips + Number(playerArray[i].betInput.value);
      playerArray[i].chips = playerResultingChips;
    }
    nextRound();
    return;
  }

  //dealer doesn't bust scenario
  for (var i = 1; i < playerArray.length; i += 1) {
    if (!playerArray[i].activePlayer) continue;
    //player Blackjack scenario
    if (checkBlackjack(playerArray[i].handArray)) {
      var blackjackWinTotal =
        Number(playerArray[i].betInput.value) * BLACKJACK_WIN_MULTIPLIER;
      playerArray[i].handInfoSpace.innerHTML = `You Won ${blackjackWinTotal}`;
      var playerInitialChips = Number(playerArray[i].chips);
      var playerResultingChips = playerInitialChips + blackjackWinTotal;
      playerArray[i].chips = playerResultingChips;
      continue;
    }

    var currentPlayerHandValue = calculateHand(playerArray[i].handArray);

    //player bust OR player has less than dealer
    if (
      currentPlayerHandValue > MAX_VALUE_CARDS ||
      currentPlayerHandValue < dealerFinalHandValue
    ) {
      playerArray[
        i
      ].handInfoSpace.innerHTML = `You lost ${playerArray[i].betInput.value}`;
      var playerInitialChips = Number(playerArray[i].chips);
      var playerResultingChips =
        playerInitialChips - Number(playerArray[i].betInput.value);
      playerArray[i].chips = playerResultingChips;
      continue;
    }
    //player push
    if (currentPlayerHandValue == dealerFinalHandValue) {
      playerArray[i].handInfoSpace.innerHTML = `Push! bet will be returned`;
      continue;
    }

    //player has more than dealer AND player doesnt bust
    playerArray[
      i
    ].handInfoSpace.innerHTML = `You Won ${playerArray[i].betInput.value}`;
    var playerInitialChips = Number(playerArray[i].chips);
    var playerResultingChips =
      playerInitialChips + Number(playerArray[i].betInput.value);
    playerArray[i].chips = playerResultingChips;
  }
  nextRound();
  return;
};

/***
 * upates the playing player's UI.
 */
var updateCurrentPlayerUI = function () {
  playerArray[currentPlayer].enableOptions();
  //can player double down. if player's chips are less than double of inputted bet, disable double down.
  if (
    playerArray[currentPlayer].chips <
    playerArray[currentPlayer].betInput.value * 2
  )
    playerArray[currentPlayer].disableDouble();
};

/***
 * Chips in a player, shows and hides appropriate UI elements
 * @param {number} player index of player to be chipped in
 * @returns {null}
 */
var chipIn = function (player) {
  playerArray[player].hideChipIn();
  playerArray[player].disableOptions();
  playerArray[player].showOptions();
  playerArray[player].showBetArea();
  playerArray[player].chips = 200;
  playerArray[player].activePlayer = true;
  playerArray[
    player
  ].chipInfoSpace.innerHTML = `Current Chips: ${playerArray[player].chips}`;
};

/***
 * Hits: draws a card for the player and resolves it, enables and disables appropriate UI elements
 * @param {number} player index of player to hit
 * @returns {null}
 */
var playerHit = function (player) {
  playerArray[player].handArray.push(drawCard());

  //update UI
  playerArray[player].handSpace.innerHTML = "";
  for (var i = 0; i < playerArray[player].handArray.length; i += 1)
    playerArray[player].handSpace.innerHTML +=
      playerArray[player].handArray[i].svg;
  playerArray[player].disableDouble();

  var handValue = calculateHand(playerArray[player].handArray);

  //if bust
  if (handValue > MAX_VALUE_CARDS) {
    playerArray[player].handInfoSpace.innerHTML = `BUST!`;
    playerArray[player].disableOptions();
    searchNextPlayer();
    if (currentPlayer != 0) {
      updateCurrentPlayerUI();
      return;
    }
    //if next player = 0, it means it's dealer's turn, i.e. game resolve
    resolveGame();
    return;
  }
  //if not bust
  playerArray[player].handInfoSpace.innerHTML = `Current hand: ${handValue}`;
};

/***
 * Stand: passes on turn to the next player, enables and disables appropriate UI elements
 * @param {number} player index of player to stand
 * @returns {null}
 */
var playerStand = function (player) {
  playerArray[player].disableOptions();
  searchNextPlayer();
  if (currentPlayer != 0) {
    updateCurrentPlayerUI();
    return;
  }
  resolveGame();
  return;
};

/***
 * Double: draws one card for the player and passes on turn to the next player, enables and disables appropriate UI elements
 * @param {number} player index of player to double down
 * @returns {null}
 */
var playerDouble = function (player) {
  playerArray[player].betInput.value =
    Number(playerArray[player].betInput.value) * 2;
  playerArray[player].handArray.push(drawCard());
  playerArray[player].handSpace.innerHTML = "";
  for (var i = 0; i < playerArray[player].handArray.length; i += 1)
    playerArray[player].handSpace.innerHTML +=
      playerArray[player].handArray[i].svg;
  playerArray[player].disableOptions();
  searchNextPlayer();
  var handValue = calculateHand(playerArray[player].handArray);
  if (handValue > MAX_VALUE_CARDS) {
    //if bust
    playerArray[player].handInfoSpace.innerHTML = `BUST!`;
  } else {
    //if not bust
    playerArray[player].handInfoSpace.innerHTML = `Current hand: ${handValue}`;
  }

  if (currentPlayer != 0) {
    updateCurrentPlayerUI();
    return;
  }
  resolveGame();
  return;
};

/***
 * Deals a new round of game of blackjack
 * @returns {null}
 */
var dealGame = function () {
  //check if there are any players who chipped in
  var activePlayerPresent = false;
  //i = 1 because index 0 is dealer
  for (var i = 1; i < playerArray.length; i += 1) {
    if (playerArray[i].activePlayer) {
      activePlayerPresent = true;
      continue;
    }
    playerArray[i].handSpace.innerHTML = CARDBACK_SVG;
    playerArray[i].handInfoSpace.innerHTML = "Chip In";
    playerArray[i].chipInfoSpace.innerHTML = "On the next game!";
  }

  if (!activePlayerPresent) {
    dealerInfo.innerHTML = "There isn't any active player!";
    return;
  }

  //ACTIVE PLAY
  disableDeal();
  disableChipIn();
  disableBetInput();

  //deals every active player, and shows hand
  for (var i = 0; i < playerArray.length; i += 1) {
    //skips if player isn't active
    if (!playerArray[i].activePlayer) continue;
    playerArray[i].handArray.push(drawCard());
    playerArray[i].handArray.push(drawCard());
    var currentPlayerHasBlackjack = checkBlackjack(playerArray[i].handArray);

    //dealer cards, hides one card
    if (i == 0) {
      //dealer blackjack situation
      if (currentPlayerHasBlackjack) {
        playerArray[i].handSpace.innerHTML =
          playerArray[i].handArray[0].svg + playerArray[i].handArray[1].svg;
        playerArray[i].handInfoSpace.innerHTML = "Blackjack!";
        dealerBlackJack = true;
        continue;
      }
      playerArray[
        i
      ].handInfoSpace.innerHTML = `Dealer unveils their first card`;
      playerArray[i].handSpace.innerHTML =
        playerArray[i].handArray[0].svg + CARDBACK_SVG;
      continue;
    }
    playerArray[i].handSpace.innerHTML =
      playerArray[i].handArray[0].svg + playerArray[i].handArray[1].svg;
    playerArray[i].handInfoSpace.innerHTML = `Current Hand: ${calculateHand(
      playerArray[i].handArray
    )}`;
  }
  if (dealerBlackJack) {
    resolveGame();
    return;
  }

  //activate current player options
  searchNextPlayer();
  if (currentPlayer != 0) {
    updateCurrentPlayerUI();
    return;
  }
  resolveGame();
  return;
};

/***
 * Input validation before dealing the hand
 * @param {number} player index of player to input check
 * @returns {null}
 */
var betInputCheck = function (player) {
  if (
    playerArray[player].betInput.value > playerArray[player].chips ||
    playerArray[player].betInput.value < 1
  ) {
    disableDeal();
    return;
  }
  enableDeal();
};
