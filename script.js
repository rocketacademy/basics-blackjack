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
    showChipIn: showP1ChipIn,
    hideChipIn: hideP1ChipIn,
    enableOptions: enableP1Options,
    disableOptions: disableP1Options,
    showOptions: showP1Options,
    hideOptions: hideP1Options,
    disableDouble: disableP1Double,
    showBetArea: showP1BetArea,
    hideBetArea: hideP1BetArea,
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
    showChipIn: showP2ChipIn,
    hideChipIn: hideP2ChipIn,
    enableOptions: enableP2Options,
    disableOptions: disableP2Options,
    showOptions: showP2Options,
    hideOptions: hideP2Options,
    disableDouble: disableP2Double,
    showBetArea: showP2BetArea,
    hideBetArea: hideP2BetArea,
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
    showChipIn: showP3ChipIn,
    hideChipIn: hideP3ChipIn,
    enableOptions: enableP3Options,
    disableOptions: disableP3Options,
    showOptions: showP3Options,
    hideOptions: hideP3Options,
    disableDouble: disableP3Double,
    showBetArea: showP3BetArea,
    hideBetArea: hideP3BetArea,
  },
];

p1ChipIn.addEventListener("click", chipIn.bind(null, 1));

p2ChipIn.addEventListener("click", chipIn.bind(null, 2));

p3ChipIn.addEventListener("click", chipIn.bind(null, 3));

p1Hit.addEventListener("click", playerHit.bind(null, 1));

p2Hit.addEventListener("click", playerHit.bind(null, 2));

p3Hit.addEventListener("click", playerHit.bind(null, 3));

p1Stand.addEventListener("click", playerStand.bind(null, 1));

p2Stand.addEventListener("click", playerStand.bind(null, 2));

p3Stand.addEventListener("click", playerStand.bind(null, 3));

p1Double.addEventListener("click", playerDouble.bind(null, 1));

p2Double.addEventListener("click", playerDouble.bind(null, 2));

p3Double.addEventListener("click", playerDouble.bind(null, 3));

deal.addEventListener("click", dealGame);

//bet input validations
p1BetInput.addEventListener("keydown", betInputCheck.bind(null, 1));

p1BetInput.addEventListener("keyup", betInputCheck.bind(null, 1));

p1BetInput.addEventListener("click", betInputCheck.bind(null, 1));

p2BetInput.addEventListener("keydown", betInputCheck.bind(null, 2));

p2BetInput.addEventListener("keyup", betInputCheck.bind(null, 2));

p2BetInput.addEventListener("click", betInputCheck.bind(null, 2));

p3BetInput.addEventListener("keydown", betInputCheck.bind(null, 3));

p3BetInput.addEventListener("keyup", betInputCheck.bind(null, 3));

p3BetInput.addEventListener("click", betInputCheck.bind(null, 3));
