const CARDBACK_SVG = `<img src="svg/back.svg" class="card" >`;
const MAX_VALUE_CARDS = 21;

var playerArray = [
  {
    name: "dealer",
    chips: Infinity,
    handArray: [],
    activePlayer: true,
    turnEndFlag: false,
    handSpace: dealerHand,
  },
  {
    name: "p1",
    chips: 0,
    handArray: [],
    activePlayer: false,
    turnEndFlag: false,
    handSpace: p1Hand,
    infoSpace: p1Info,
    p1BetInput: p1BetInput,
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
    turnEndFlag: false,
    handSpace: p2Hand,
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
    turnEndFlag: false,
    turnEndFlag: false,
    handSpace: p3Hand,
    enableOptionFunction: enableP3Options,
    disableOptionFunction: disableP3Options,
    hideOptionFunction: hideP3Options,
    disableDoubleFunction: disableP3Double,
    showChipInFunction: showP3ChipIn,
  },
];

var playDeck = [];

p1ChipIn.addEventListener("click", function () {
  hideP1ChipIn();
  disableP1Options();
  showP1Options();
  showP1BetArea();
  playerArray[1].chips = 200;
  playerArray[1].activePlayer = true;
  p1Info.innerHTML = `Current Chips: ${playerArray[1].chips}`;
});

p2ChipIn.addEventListener("click", function () {
  hideP2ChipIn();
  disableP2Options();
  showP2Options();
  showP2BetArea();
  playerArray[2].chips = 200;
  playerArray[2].activePlayer = true;
  p2Info.innerHTML = `Current Chips: ${playerArray[2].chips}`;
});

p3ChipIn.addEventListener("click", function () {
  hideP3ChipIn();
  disableP3Options();
  showP3Options();
  showP3BetArea();
  playerArray[3].chips = 200;
  playerArray[3].activePlayer = true;
  p3Info.innerHTML = `Current Chips: ${playerArray[3].chips}`;
});

p1Hit.addEventListener("click", function () {
  playerArray[1].handArray.push(drawCard());
  playerArray[1].handSpace.innerHTML = "";
  for (var i = 0; i < playerArray[1].handArray.length; i += 1)
    playerArray[1].handSpace.innerHTML += playerArray[1].handArray[i].svg;
  disableP1Double();
});

p2Hit.addEventListener("click", function () {
  playerArray[2].handArray.push(drawCard());
  playerArray[2].handSpace.innerHTML = "";
  for (var i = 0; i < playerArray[2].handArray.length; i += 1)
    playerArray[2].handSpace.innerHTML += playerArray[1].handArray[i].svg;
  disableP2Double();
});

p3Hit.addEventListener("click", function () {
  playerArray[3].handSpace.innerHTML = "";
  for (var i = 0; i < playerArray[3].handArray.length; i += 1)
    playerArray[3].handSpace.innerHTML += playerArray[1].handArray[i].svg;
  playerArray[3].handArray.push(drawCard());
  disableP3Double();
});

p1Stand.addEventListener("click", function () {
  playerArray[1].turnEndFlag = true;
});

p2Stand.addEventListener("click", function () {
  playerArray[2].turnEndFlag = true;
});

p3Stand.addEventListener("click", function () {
  playerArray[3].turnEndFlag = true;
});

p1Double.addEventListener("click", function () {
  p1BetInput.value = Number(p1BetInput.value) * 2;
  playerArray[1].handArray.push(drawCard());
});

p2Double.addEventListener("click", function () {
  p2BetInput.value = Number(p2BetInput.value) * 2;
  playerArray[2].handArray.push(drawCard());
});

p3Double.addEventListener("click", function () {
  p3BetInput.value = Number(p3BetInput.value) * 2;
  playerArray[3].handArray.push(drawCard());
});

deal.addEventListener("click", function () {
  //check if there are any players who chipped in
  var activePlayerPresent = false;
  //i = 1 because index 0 is dealer
  for (var i = 1; i < playerArray.length; i += 1) {
    if (playerArray[i].activePlayer == true) {
      activePlayerPresent = true;
      break;
    }
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
    //dealer cards, hides one card
    if (i == 0) {
      playerArray[i].handSpace.innerHTML =
        playerArray[i].handArray[0].svg + CARDBACK_SVG;
      continue;
    }
    playerArray[i].handSpace.innerHTML =
      playerArray[i].handArray[0].svg + playerArray[i].handArray[1].svg;
  }
});
