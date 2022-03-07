var deal = document.querySelector("#deal-button");
var dealerHand = document.querySelector("#dealer-hand");
var dealerInfo = document.querySelector("#dealer-info");

var p1Hand = document.querySelector("#p1-hand");
var p1HandInfo = document.querySelector("#p1-hand-info");
var p1ChipInfo = document.querySelector("#p1-chip-info");
var p1Hit = document.querySelector("#p1-hit");
var p1Stand = document.querySelector("#p1-stand");
var p1Double = document.querySelector("#p1-double");
var p1BetArea = document.querySelector("#p1-bet-area");
var p1BetInput = document.querySelector("#p1-bet");
var p1ChipIn = document.querySelector("#p1-chip-in");

var p2Hand = document.querySelector("#p2-hand");
var p2HandInfo = document.querySelector("#p2-hand-info");
var p2ChipInfo = document.querySelector("#p2-chip-info");
var p2Hit = document.querySelector("#p2-hit");
var p2Stand = document.querySelector("#p2-stand");
var p2Double = document.querySelector("#p2-double");
var p2BetArea = document.querySelector("#p2-bet-area");
var p2BetInput = document.querySelector("#p2-bet");
var p2ChipIn = document.querySelector("#p2-chip-in");

var p3Hand = document.querySelector("#p3-hand");
var p3HandInfo = document.querySelector("#p3-hand-info");
var p3ChipInfo = document.querySelector("#p3-chip-info");
var p3Hit = document.querySelector("#p3-hit");
var p3Stand = document.querySelector("#p3-stand");
var p3Double = document.querySelector("#p3-double");
var p3BetArea = document.querySelector("#p3-bet-area");
var p3BetInput = document.querySelector("#p3-bet");
var p3ChipIn = document.querySelector("#p3-chip-in");

var disableDeal = function () {
  deal.disabled = true;
};

var enableDeal = function () {
  deal.disabled = false;
};

var disableChipIn = function () {
  p1ChipIn.disabled = true;
  p2ChipIn.disabled = true;
  p3ChipIn.disabled = true;
};

var enableChipIn = function () {
  p1ChipIn.disabled = false;
  p2ChipIn.disabled = false;
  p3ChipIn.disabled = false;
};

var hideP1ChipIn = function () {
  p1ChipIn.style.visibility = "hidden";
};

var showP1ChipIn = function () {
  p1ChipIn.style.visibility = "visible";
};

var hideP2ChipIn = function () {
  p2ChipIn.style.visibility = "hidden";
};

var showP2ChipIn = function () {
  p2ChipIn.style.visibility = "visible";
};

var hideP3ChipIn = function () {
  p3ChipIn.style.visibility = "hidden";
};

var showP3ChipIn = function () {
  p3ChipIn.style.visibility = "visible";
};

var showP1Options = function () {
  p1Hit.style.visibility = "visible";
  p1Stand.style.visibility = "visible";
  p1Double.style.visibility = "visible";
};

var hideP1Options = function () {
  p1Hit.style.visibility = "hidden";
  p1Stand.style.visibility = "hidden";
  p1Double.style.visibility = "hidden";
};

var enableP1Options = function () {
  p1Hit.disabled = false;
  p1Stand.disabled = false;
  p1Double.disabled = false;
};

var disableP1Options = function () {
  p1Hit.disabled = true;
  p1Stand.disabled = true;
  p1Double.disabled = true;
};

var showP2Options = function () {
  p2Hit.style.visibility = "visible";
  p2Stand.style.visibility = "visible";
  p2Double.style.visibility = "visible";
};

var hideP2Options = function () {
  p2Hit.style.visibility = "hidden";
  p2Stand.style.visibility = "hidden";
  p2Double.style.visibility = "hidden";
};

var enableP2Options = function () {
  p2Hit.disabled = false;
  p2Stand.disabled = false;
  p2Double.disabled = false;
};

var disableP2Options = function () {
  p2Hit.disabled = true;
  p2Stand.disabled = true;
  p2Double.disabled = true;
};

var showP3Options = function () {
  p3Hit.style.visibility = "visible";
  p3Stand.style.visibility = "visible";
  p3Double.style.visibility = "visible";
};

var hideP3Options = function () {
  p3Hit.style.visibility = "hidden";
  p3Stand.style.visibility = "hidden";
  p3Double.style.visibility = "hidden";
};

var enableP3Options = function () {
  p3Hit.disabled = false;
  p3Stand.disabled = false;
  p3Double.disabled = false;
};

var disableP3Options = function () {
  p3Hit.disabled = true;
  p3Stand.disabled = true;
  p3Double.disabled = true;
};

var disableP1Double = function () {
  p1Double.disabled = true;
};

var disableP2Double = function () {
  p2Double.disabled = true;
};

var disableP3Double = function () {
  p3Double.disabled = true;
};

var showP1BetArea = function () {
  p1BetArea.style.visibility = "visible";
};

var hideP1BetArea = function () {
  p1BetArea.style.visibility = "hidden";
};

var showP2BetArea = function () {
  p2BetArea.style.visibility = "visible";
};

var hideP2BetArea = function () {
  p2BetArea.style.visibility = "hidden";
};

var showP3BetArea = function () {
  p3BetArea.style.visibility = "visible";
};

var hideP3BetArea = function () {
  p3BetArea.style.visibility = "hidden";
};

var enableBetInput = function () {
  p1BetInput.disabled = false;
  p2BetInput.disabled = false;
  p3BetInput.disabled = false;
};

var disableBetInput = function () {
  p1BetInput.disabled = true;
  p2BetInput.disabled = true;
  p3BetInput.disabled = true;
};
