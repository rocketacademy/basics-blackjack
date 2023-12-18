/*    Next line Display    */
var BREAKONELINE = "<br>";
var BREAKTWOLINE = BREAKONELINE + "<br>";
var BREAKTHREELINE = BREAKTWOLINE + "<br>";

/*    Deck Calculation    */
var dealerSum = 0;
var playerSum = 0;
var dealerAceCount = 0;
var playerAceCount = 0;
// var dealerKQJCount = 0;
// var playerKQJCount = 0;

/*    Deck Creation    */
var hidden;
var deck = [];

/*    Point Documentation    */
var bet = 0;
var balance = 5000;
var beginnerPrice = 5000;

/*    Button Shortcuts    */
var dealButton = document.querySelector("#deal");
var hitButton = document.querySelector("#hit");
var standButton = document.querySelector("#stand");
var doubleButton = document.querySelector("#double");
var surrenderButton = document.querySelector("#surrender");
var shuffleButton = document.querySelector("#shuffle");

/*    Display Shortcuts    */
var displayChart = document.getElementById("output-div");

/*    Textbox Shortcuts    */
var cashInputText = document.getElementById("cash-text");
var winningInputText = document.getElementById("Winning-text");
var wagerInputText = document.getElementById("Wager-text");

/*    Message Display    */
var welcomeMSG =
  "Greetings, " +
  BREAKONELINE +
  "#1: You are encash with " +
  balance +
  " points. " +
  BREAKONELINE +
  '#2: Select your bets into "Wage" box.' +
  BREAKONELINE +
  "#3: Once bets are made, you will not be allow to change." +
  BREAKONELINE +
  '#4: You are only allow to "Double Down" first round & double your wage.' +
  BREAKONELINE +
  '#5: You may also "Surrender" & loss 1/2 of your bets.' +
  BREAKONELINE +
  "#7: No insurance in the game. " +
  BREAKONELINE +
  'Click "Deal" to start game!';

var continueBetMSG =
  'Click "Clear" to clear cards.' +
  BREAKTWOLINE +
  ' And place your new bets in the wage box & hit "deal"  to continue.';

/*    Main Program Flow    */
var FLOWCONTROLSEQUENCE_ONE = "SEQUENCE_ONE";
var FLOWCONTROLSEQUENCE_TWO = "SEQUENCE_TWO";
var FLOWSEQUENCECONTROL = FLOWCONTROLSEQUENCE_ONE;

/*    Game Outcome    */
var dealer = "DEALER";
var player = "PLAYER";
var tie = "TIE";
var backJack = "BLACKJACK";
var Surrender = "SURRENDER";
/*  END OF DECLARATION*/

main();

// window.onload = function () {
//   buildDeck();
//   shuffleDeck();
// };

function main() {
  switch (FLOWSEQUENCECONTROL) {
    case FLOWCONTROLSEQUENCE_ONE:
      FLOWCONTROLSEQUENCEONE();
    //break;
    case FLOWCONTROLSEQUENCE_TWO:
      FLOWCONTROLSEQUENCETWO();
    //break;

    default:
      null;
  }
}

function FLOWCONTROLSEQUENCEONE() {
  cashInputText.value = balance;
  displayChart.innerHTML = welcomeMSG;
  dealButton.addEventListener("click", deal);
  function deal() {
    document.getElementById("deck").src = "./Cards/BACK.png";
    buildDeck();
    shuffleDeck();
    bet = Number(wagerInputText.value);
    if (isNaN(bet) == true || bet == "") {
      displayChart.innerHTML = "Its not a number";
    } else {
      dealButton.disabled = true;
      wagerInputText.disabled = true;
      hitButton.disabled = false;
      standButton.disabled = false;
      doubleButton.disabled = false;
      surrenderButton.disabled = false;
      displayChart.innerHTML =
        BREAKTHREELINE +
        "You have bet " +
        bet +
        " points in the game." +
        BREAKTWOLINE +
        "Enjoy the game~";
      startGame();
      FLOWSEQUENCECONTROL = FLOWCONTROLSEQUENCE_TWO;
    }
  }
}

function FLOWCONTROLSEQUENCETWO() {
  hitButton.addEventListener("click", hit);
  standButton.addEventListener("click", stand);
  doubleButton.addEventListener("click", double);
  surrenderButton.addEventListener("click", surrender);
  shuffleButton.addEventListener("click", shuffle);

  function hit() {
    cardPoping(player);
    doubleButton.disabled = true;
    console.log("dealerSum  " + dealerSum);
    console.log("PlayerSum  " + reduceAce(playerSum, playerAceCount));
    if (reduceAce(playerSum, playerAceCount) > 21) {
      decisionJudgement(dealer);
      displayChart.innerHTML =
        "Bust: " +
        "You lose " +
        bet +
        " points." +
        BREAKTWOLINE +
        continueBetMSG;
      FLOWSEQUENCECONTROL = FLOWCONTROLSEQUENCE_ONE;
    }
  }
  function stand() {
    while (dealerSum < 17) {
      cardPoping(dealer);
    }
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);
    document.getElementById("hidden").src = "./Cards/" + hidden + ".png";

    // next target: Add in 1) blackjack & 2) doubledown & 3) surrender
    if (playerSum > 21) {
      decisionJudgement(dealer);
      displayChart.innerHTML =
        BREAKTHREELINE +
        "Bust" +
        BREAKTWOLINE +
        "You lose " +
        bet +
        " points." +
        BREAKTWOLINE +
        'Place your new bets in the wage box & hit "deal" button to continue.';
    } else if (dealerSum > 21) {
      decisionJudgement(player);
      displayChart.innerHTML =
        BREAKTHREELINE +
        "You won! " +
        bet +
        " points." +
        BREAKTWOLINE +
        'Place your new bets in the wage box & hit "deal" button to continue.';
    } else if (playerSum == dealerSum) {
      decisionJudgement(tie);
      displayChart.innerHTML =
        BREAKTHREELINE +
        "It's a tie " +
        BREAKTWOLINE +
        'Place your new bets in the wage box & hit "deal" button to continue.';
    } else if (playerSum > dealerSum) {
      decisionJudgement(player);
      displayChart.innerHTML =
        BREAKTHREELINE +
        "You won! " +
        bet +
        " points." +
        BREAKTWOLINE +
        'Place your new bets in the wage box & hit "deal" button to continue.';
    } else if (playerSum < dealerSum) {
      decisionJudgement(dealer);
      displayChart.innerHTML =
        BREAKTHREELINE +
        "You lose " +
        bet +
        " points." +
        BREAKTWOLINE +
        continueBetMSG;
    }
  }
  function double() {
    cardPoping(player);
    bet = 2 * bet;
    // wagerInputText.value = bet;
    hitButton.disabled = true;
    doubleButton.disabled = true;
    surrenderButton.disabled = true;
    displayChart.innerHTML =
      "<b> ~ Double down ~ </b>" +
      BREAKTWOLINE +
      "Your new wager is " +
      bet +
      BREAKTWOLINE +
      "You are not allowed to hit anymore.";
  }
  function surrender() {
    decisionJudgement(Surrender);
    displayChart.innerHTML =
      "<b> ~ Surrender ~ </b>" + BREAKTWOLINE + continueBetMSG;
    document.getElementById("hidden").src = "./Cards/" + hidden + ".png";
  }
  function shuffle() {
    document.getElementById("deck").src = "Riffle_shuffle.gif";
    ClearCard();
    dealButton.disabled = false;
    shuffleButton.disabled = true;
    FLOWSEQUENCECONTROL = FLOWCONTROLSEQUENCE_ONE;
  }
}

function decisionJudgement(Judgement) {
  switch (Judgement) {
    case player:
      balance += bet;
      cashInputText.value = balance;
      winningInputText.value = balance - beginnerPrice;
      adjustButton();
      break;
    case dealer:
      balance -= bet;
      cashInputText.value = balance;
      winningInputText.value = balance - beginnerPrice;
      adjustButton();
      break;
    case tie:
      adjustButton();
      break;
    case backJack:
      document.getElementById("hidden").src = "./Cards/" + hidden + ".png";
      balance = balance + bet * 1.5;
      cashInputText.value = balance;
      winningInputText.value = balance - beginnerPrice;
      adjustButton();
      break;
    case Surrender:
      bet = bet / 2;
      // wagerInputText.value = bet;
      balance -= bet;
      cashInputText.value = balance;
      winningInputText.value = balance - beginnerPrice;
      adjustButton();
      break;
  }
}

function ClearCard() {
  document.getElementById("dealer-cards").innerHTML = "";
  document.getElementById("player-cards").innerHTML = "";
  dealerSum = 0;
  playerSum = 0;
  dealerAceCount = 0;
  playerAceCount = 0;
  playerKQJCount = 0;
  dealerKQJCount = 0;
  deck = [];
}

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]);
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

function startGame() {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);
  let img = new Image();
  img.setAttribute("id", "hidden");
  img.src = "./Cards/BACK.png";
  document.getElementById("dealer-cards").appendChild(img);

  cardPoping(dealer);
  for (let i = 0; i < 2; i++) {
    cardPoping(player);
  }

  if (playerAceCount == 1 && playerSum == 21) {
    if (dealerAceCount == 1 && dealerSum == 21) {
      document.getElementById("hidden").src = "./Cards/" + hidden + ".png";
      decisionJudgement(tie);
      displayChart.innerHTML =
        "IT's a tie match!!! " +
        BREAKTWOLINE +
        "You and Dealer has a pair of BLACKJACK!" +
        BREAKONELINE +
        continueBetMSG;
    } else {
      decisionJudgement(backJack);
      displayChart.innerHTML =
        "CONGRATULATIONS!!! 🤗" +
        BREAKTWOLINE +
        "You got a pair of BLACKJACK!" +
        BREAKTWOLINE +
        "BLACKJACK pays 3 to 2!" +
        BREAKTWOLINE +
        "You won total of " +
        bet * 1.5 +
        "!" +
        BREAKONELINE +
        continueBetMSG;
    }
  }
}

function cardPoping(OWNERCARD) {
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./Cards/" + card + ".png";
  if (OWNERCARD == player) {
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);
  } else if (OWNERCARD == dealer) {
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
  }
}

function getValue(card) {
  // Split to get the value from the array "5-S" -> ["5","S"]
  let data = card.split("-");
  let value = data[0];

  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function reduceAce(reduceplayerSum, reduceplayerAceCount) {
  //Ace Card is count as 1 or 11.
  //If hand have not reach 21, it becomes 11
  //If hand is almost 21, it becomes 1
  while (reduceplayerSum > 21 && reduceplayerAceCount > 0) {
    reduceplayerSum -= 10;
    reduceplayerAceCount -= 1;
  }
  return reduceplayerSum;
}

function adjustButton() {
  dealButton.disabled = true;
  standButton.disabled = true;
  doubleButton.disabled = true;
  surrenderButton.disabled = true;
  hitButton.disabled = true;
  wagerInputText.disabled = false;
  dealButton.disabled = true;
  shuffleButton.disabled = false;
}
