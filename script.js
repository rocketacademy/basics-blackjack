const CARDBACK_SVG = `<img src="svg/back.svg" class="card" >`;
const MAX_VALUE_CARDS = 21;
const DEALER_HIT_THRESHOLD = 16;
const BLACKJACK_WIN_MULTIPLIER = 2;

var playDeck = [];
var currentPlayer = 0;
var dealerBlackJack = false;

var playerArray = [
  {
    name: "dealer",
    handArray: [],
    activePlayer: true,
    handSpace: dealerHand,
    handInfoSpace: dealerInfo,
  },
  {
    name: "p1",
    chips: 0,
    handArray: [],
    activePlayer: false,
    handSpace: p1Hand,
    handInfoSpace: p1HandInfo,
    chipInfoSpace: p1ChipInfo,
    betInput: p1BetInput,
    enableOptionFunction: enableP1Options,
    disableOptionFunction: disableP1Options,
    hideOptionFunction: hideP1Options,
    disableDoubleFunction: disableP1Double,
    showChipInFunction: showP1ChipIn,
  },
  {
    name: "p2",
    chips: 0,
    handArray: [],
    activePlayer: false,
    handSpace: p2Hand,
    handInfoSpace: p2HandInfo,
    chipInfoSpace: p2ChipInfo,
    betInput: p2BetInput,
    enableOptionFunction: enableP2Options,
    disableOptionFunction: disableP2Options,
    hideOptionFunction: hideP2Options,
    disableDoubleFunction: disableP2Double,
    showChipInFunction: showP2ChipIn,
  },
  {
    name: "p3",
    chips: 0,
    handArray: [],
    activePlayer: false,
    handSpace: p3Hand,
    handInfoSpace: p3HandInfo,
    chipInfoSpace: p3ChipInfo,
    betInput: p3BetInput,
    enableOptionFunction: enableP3Options,
    disableOptionFunction: disableP3Options,
    hideOptionFunction: hideP3Options,
    disableDoubleFunction: disableP3Double,
    showChipInFunction: showP3ChipIn,
  },
];

p1ChipIn.addEventListener("click", function () {
  hideP1ChipIn();
  disableP1Options();
  showP1Options();
  showP1BetArea();
  playerArray[1].chips = 200;
  playerArray[1].activePlayer = true;
  p1ChipInfo.innerHTML = `Current Chips: ${playerArray[1].chips}`;
});

p2ChipIn.addEventListener("click", function () {
  hideP2ChipIn();
  disableP2Options();
  showP2Options();
  showP2BetArea();
  playerArray[2].chips = 200;
  playerArray[2].activePlayer = true;
  p2ChipInfo.innerHTML = `Current Chips: ${playerArray[2].chips}`;
});

p3ChipIn.addEventListener("click", function () {
  hideP3ChipIn();
  disableP3Options();
  showP3Options();
  showP3BetArea();
  playerArray[3].chips = 200;
  playerArray[3].activePlayer = true;
  p3ChipInfo.innerHTML = `Current Chips: ${playerArray[3].chips}`;
});

p1Hit.addEventListener("click", function () {
  playerArray[1].handArray.push(drawCard());

  //update UI
  playerArray[1].handSpace.innerHTML = "";
  for (var i = 0; i < playerArray[1].handArray.length; i += 1)
    playerArray[1].handSpace.innerHTML += playerArray[1].handArray[i].svg;
  disableP1Double();

  var handValue = calculateHand(playerArray[1].handArray);
  if (handValue > MAX_VALUE_CARDS) {
    //if bust
    playerArray[1].handInfoSpace.innerHTML = `BUST!`;
    disableP1Options();
    searchNextPlayer();
    if (currentPlayer != 0) {
      playerArray[currentPlayer].enableOptionFunction();
      return;
    }
    //if next player = 0, it means it's dealer's turn, i.e. game resolve
    resolveGame();
  } else {
    //if not bust
    playerArray[1].handInfoSpace.innerHTML = `Current hand: ${handValue}`;
  }
});

p2Hit.addEventListener("click", function () {
  playerArray[2].handArray.push(drawCard());

  //update UI
  playerArray[2].handSpace.innerHTML = "";
  for (var i = 0; i < playerArray[2].handArray.length; i += 1)
    playerArray[2].handSpace.innerHTML += playerArray[2].handArray[i].svg;
  disableP2Double();

  var handValue = calculateHand(playerArray[2].handArray);
  if (handValue > MAX_VALUE_CARDS) {
    //if bust
    playerArray[2].handInfoSpace.innerHTML = `BUST!`;
    disableP2Options();
    searchNextPlayer();
    if (currentPlayer != 0) {
      playerArray[currentPlayer].enableOptionFunction();
      return;
    }
    //if next player = 0, it means it's dealer's turn, i.e. game resolve
    resolveGame();
  } else {
    //if not bust
    playerArray[2].handInfoSpace.innerHTML = `Current hand: ${handValue}`;
  }
});

p3Hit.addEventListener("click", function () {
  playerArray[3].handArray.push(drawCard());

  //updateUI
  playerArray[3].handSpace.innerHTML = "";
  for (var i = 0; i < playerArray[3].handArray.length; i += 1)
    playerArray[3].handSpace.innerHTML += playerArray[3].handArray[i].svg;
  disableP3Double();

  var handValue = calculateHand(playerArray[3].handArray);
  if (handValue > MAX_VALUE_CARDS) {
    //if bust
    playerArray[3].handInfoSpace.innerHTML = `BUST!`;
    disableP3Options();
    searchNextPlayer();
    if (currentPlayer != 0) {
      playerArray[currentPlayer].enableOptionFunction();
      return;
    }
    //if next player = 0, it means it's dealer's turn, i.e. game resolve
    resolveGame();
  } else {
    //if not bust
    playerArray[3].handInfoSpace.innerHTML = `Current hand: ${handValue}`;
  }
});

p1Stand.addEventListener("click", function () {
  disableP1Options();
  searchNextPlayer();
  if (currentPlayer != 0) {
    playerArray[currentPlayer].enableOptionFunction();
    return;
  }
  resolveGame();
});

p2Stand.addEventListener("click", function () {
  disableP2Options();
  searchNextPlayer();
  if (currentPlayer != 0) {
    playerArray[currentPlayer].enableOptionFunction();
    return;
  }
  resolveGame();
});

p3Stand.addEventListener("click", function () {
  disableP3Options();
  searchNextPlayer();
  if (currentPlayer != 0) {
    playerArray[currentPlayer].enableOptionFunction();
    return;
  }
  resolveGame();
});

p1Double.addEventListener("click", function () {
  p1BetInput.value = Number(p1BetInput.value) * 2;
  playerArray[1].handArray.push(drawCard());
  playerArray[1].handSpace.innerHTML = "";
  for (var i = 0; i < playerArray[1].handArray.length; i += 1)
    playerArray[1].handSpace.innerHTML += playerArray[1].handArray[i].svg;
  disableP1Options();
  searchNextPlayer();
  var handValue = calculateHand(playerArray[1].handArray);
  if (handValue > MAX_VALUE_CARDS) {
    //if bust
    playerArray[1].handInfoSpace.innerHTML = `BUST!`;
  } else {
    //if not bust
    playerArray[1].handInfoSpace.innerHTML = `Current hand: ${handValue}`;
  }

  if (currentPlayer != 0) {
    playerArray[currentPlayer].enableOptionFunction();
    return;
  }
  resolveGame();
});

p2Double.addEventListener("click", function () {
  p2BetInput.value = Number(p2BetInput.value) * 2;
  playerArray[2].handArray.push(drawCard());
  playerArray[2].handSpace.innerHTML = "";
  for (var i = 0; i < playerArray[2].handArray.length; i += 1)
    playerArray[2].handSpace.innerHTML += playerArray[2].handArray[i].svg;
  disableP2Options();
  searchNextPlayer();
  var handValue = calculateHand(playerArray[2].handArray);
  if (handValue > MAX_VALUE_CARDS) {
    //if bust
    playerArray[2].handInfoSpace.innerHTML = `BUST!`;
  } else {
    //if not bust
    playerArray[2].handInfoSpace.innerHTML = `Current hand: ${handValue}`;
  }
  if (currentPlayer != 0) {
    playerArray[currentPlayer].enableOptionFunction();
    return;
  }
  resolveGame();
});

p3Double.addEventListener("click", function () {
  p3BetInput.value = Number(p3BetInput.value) * 2;
  playerArray[3].handArray.push(drawCard());
  playerArray[3].handSpace.innerHTML = "";
  for (var i = 0; i < playerArray[3].handArray.length; i += 1)
    playerArray[3].handSpace.innerHTML += playerArray[3].handArray[i].svg;
  disableP3Options();
  searchNextPlayer();
  var handValue = calculateHand(playerArray[3].handArray);
  if (handValue > MAX_VALUE_CARDS) {
    //if bust
    playerArray[3].handInfoSpace.innerHTML = `BUST!`;
  } else {
    //if not bust
    playerArray[3].handInfoSpace.innerHTML = `Current hand: ${handValue}`;
  }
  if (currentPlayer != 0) {
    playerArray[currentPlayer].enableOptionFunction();
    return;
  }
  resolveGame();
});

deal.addEventListener("click", function () {
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
  playerArray[currentPlayer].enableOptionFunction();
  return;
});
