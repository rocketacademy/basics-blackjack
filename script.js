var currentDeck = [];
var playerHand = [];
var computerHand = [];

var mode = "";
var hitOrStand = "";

document.getElementById("restart-button").disabled = true;

var main = function (input) {
  if (input == "restart") {
    currentDeck = [];
    playerHand = [];
    computerHand = [];
    output = document.querySelector("#output-div");
    output.innerHTML = "Welcome! Press continue to draw the cards!";
    document.getElementById("restart-button").disabled = true;
    document.getElementById("continue-button").disabled = false;
  }

  if (input == "drawPhase") {
    document.getElementById("continue-button").disabled = true;

    //make deck
    currentDeck = makeDeck();

    //shuffle deck
    currentDeck = shuffle(currentDeck);

    //dealing cards
    playerHand.push(currentDeck.pop());
    computerHand.push(currentDeck.pop());
    playerHand.push(currentDeck.pop());
    computerHand.push(currentDeck.pop());

    //determine blackjack
    mode = isBlackJack(playerHand, computerHand); //changes mode
  }

  if (mode == "normal") {
    mode = "playerHit";
    return `Your cards: ${displayCards(playerHand)}(${determineValue(
      playerHand
    )}) <br>
        Computer's 1st card: ${computerHand[0].value}${
      computerHand[0].suits
    }  <br>
        Click 'hit' or 'stand' to proceed`;
  } else if (mode == "playerBlackjack") {
    return `Congratulations! You've hit blackjack! <br> 
      Your cards are:          ${playerHand[0].name} ${playerHand[0].suits} and ${playerHand[1].name} ${playerHand[1].suits} <br>
      Computers's cards are:   ${computerHand[0].name} ${computerHand[0].suits} and  ${computerHand[1].name} ${computerHand[1].suits}<br>
      Refresh the page to play again!    `;
  } else if (mode == "computerBlackjack") {
    return `Oh No! The computer hit blackjack! <br>
      Your cards were:       ${playerHand[0].name} ${playerHand[0].suits} and ${playerHand[1].name} ${playerHand[1].suits} <br>
      Computer's card were:  ${computerHand[0].name} ${computerHand[0].suits} and  ${computerHand[1].name} ${computerHand[1].suits} <br>
      Refresh the page to play again! `;
  } else if (mode == "bothBlackjack") {
    return `Errr.... You both hit blackjack...<br>
      Your hand:              ${playerHand[0].name} ${playerHand[0].suits} and ${playerHand[1].name} ${playerHand[1].suits} <br>
      The computers's hand:   ${computerHand[0].name} ${computerHand[0].suits} and ${computerHand[1].name} ${computerHand[1].suits}<br>
      Refresh the page to play again!    `;
  }

  if (mode == "playerHit") {
    if (input == "hit") {
      playerHand.push(currentDeck.pop());
      if (determineValue(playerHand) > 21) {
        mode = "determineWinner";
      } else {
        return `Your cards: ${displayCards(playerHand)}(${determineValue(
          playerHand
        )}) <br>
        Computer's 1st card: ${displayCards(computerHand[0])} <br>
        Click 'hit' or 'stand' to proceed`;
      }
    }
    if (input == "stand") {
      mode = "determineWinner";
    }
  }

  if ((mode = "determineWinner")) {
    var winStatus = "";
    if (determineValue(playerHand) > 21) {
      winStatus = `You lost as you bust!`;
    }
    while (determineValue(computerHand) < 17) {
      computerHand.push(currentDeck.pop());
    }
    if (determineValue(playerHand) > determineValue(computerHand)) {
      winStatus = `You win as you have a higher hand!`;
    }
    if (determineValue(playerHand) < determineValue(computerHand)) {
      winStatus = `You lost as the computer has a higher hand`;
    }
    var conclusionString = `Your hand: ${displayCards(playerHand)} <br>
    Computer's hand: ${displayCards(computerHand)} <br>
    ${winStatus}`;

    return conclusionString;
  }
};

//returns array of cards{rank:1-13, suits:spades|hearts|clubs|diamonds, name:Ace-10,jack,king,queen }
var makeDeck = function () {
  var deck = [];
  var suites = ["♠️", "♥️", "♣️", "♦️"];
  for (var i = 0; i < 4; i++) {
    var currentSuit = suites[i];
    for (var j = 1; j < 14; j++) {
      var cardName = j;
      var value = j;
      if (j == 1) {
        cardName = "A";
      } else if (j == 11) {
        cardName = "J";
        value = 10;
      } else if (j == 12) {
        cardName = "Q";
        value = 10;
      } else if (j == 13) {
        cardName = "K";
        value = 10;
      }

      var card = {
        rank: j,
        suits: currentSuit,
        name: cardName,
        value: value,
      };
      deck.push(card);
    }
  }
  return deck;
};

//returns shuffled deck
var shuffle = function (array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

//determine if a or b or both is blackjack => playerBlackjack, computerBlackjack, bothBlackjack, or normal
var isBlackJack = function (arr_playerHand, arr_computerHand) {
  var plrCard1 = {};
  var plrCard2 = {};
  var comCard1 = {};
  var comCard2 = {};

  var status = "normal";
  [plrCard1, plrCard2] = arr_playerHand;
  [comCard1, comCard2] = arr_computerHand;
  if (
    (plrCard1.value == 1 && plrCard2.value == 10) ||
    (plrCard2.value == 1 && plrCard1.value == 10)
  ) {
    if (
      (comCard1.value == 1 && comCard2.value == 10) ||
      (comCard2.value == 1 && comCard1.value == 10)
    ) {
      status = "bothBlackjack";
    } else status = "playerBlackjack";
  }
  if (
    (comCard1.value == 1 && comCard2.value == 10) ||
    (comCard2.value == 1 && comCard1.value == 10)
  ) {
    status = "computerBlackjack";
  }
  return status;
};

//determine value of cards return value
var determineValue = function (arrayTest) {
  var sum = 0;
  var noOfAces = 0;
  for (i in arrayTest) {
    if (arrayTest[i].value == 1) {
      noOfAces += 1;
      sum += 11;
    } else {
      sum += arrayTest[i].value;
    }
  }
  while (noOfAces > 0) {
    while (sum > 21) {
      sum -= 10;
      noOfAces -= 1;
    }
    if (sum < 22) {
      break;
    }
  }
  return sum;
};

var displayCards = function (stack) {
  var arr = [];
  var card = [];
  for (i in stack) {
    arr.push(stack[i].name, stack[i].suits);
  }
  return arr.join(" ");
};
