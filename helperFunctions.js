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
 * Searches the next player for the game, and assigns the global value of current player to it.
 * @returns {null}
 */
var searchNextPlayer = function () {
  for (var i = currentPlayer + 1; i < playerArray.length; i += 1) {
    if (playerArray[i].activePlayer) {
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
};

/***
 * When everything is done, resolves game, paid/took credit from players and resets round
 * @returns {null}
 */
var resolveGame = function () {
  //dealer blackjack scenario
  if (dealerBlackJack) {
    for (var i = 1; i < playerArray.length; i += 1) {
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
