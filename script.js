// arrays to construct the deck
const suits = ["Spades", "Clubs", "Hearts", "Diamond"];
const values = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];

//Global variable to be used to store deck, player's cards and dealers cards
var fullDeck, player, dealer;
var playerHandDetails = "",
  dealerHandDetails = "",
  gameDetails = "";

//state of the game, if the state is true the player stands
var state = false;

//main function to run on button click
var main = function () {
  //generate deck
  fullDeck = shuffle(generateDeck());
  //deal cards to player
  player = dealCards(fullDeck);
  playerHandDetails = cardsInHand(player, "Player's Hand");

  //deal cards to dealer
  dealer = dealCards(fullDeck);
  dealerHandDetails = cardsInHand(dealer, "Dealer's Hand");

  gameDetails = playerHandDetails + "<br>" + dealerHandDetails;

  //check for blackjack
  if (checkFor21(player) == true) {
    return gameDetails + "<br><br>You have gotten BlackJack! Congrats!";
  }

  if (checkFor21(dealer) == true) {
    return (
      gameDetails +
      "<br><br>Better luck next time! Dealer has gotten BlackJack!"
    );
  }

  document.querySelector("#submit-button").disabled = true;
  document.querySelector("#hit-button").disabled = false;
  document.querySelector("#stand-button").disabled = false;

  return gameDetails;
};

//when player clicks hit
var hit = function () {
  var result = "";
  drawCard(player, fullDeck);
  if (checkIfOver21(player) == true) {
    result = "You have busted! better luck next time!";
    document.querySelector("#submit-button").disabled = false;
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#stand-button").disabled = true;
  } else if (checkIfOver21(player) == false) {
    if (calculateHandValue(player) < 16) {
      result = "I think you should Draw another card!";
    } else if (
      calculateHandValue(player) >= 16 &&
      calculateHandValue(player) <= 20
    ) {
      result = "STOP! I dont think you should hit it!";
    } else if (calculateHandValue(player) == 21) {
      result = "Thats nice dont HIT!";
    }
  }
  return displayGameDetails() + "<br>" + result;
};

//when player clicks stand
var stand = function () {
  document.querySelector("#submit-button").disabled = false;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  while (calculateHandValue(dealer) < 17) {
    drawCard(dealer, fullDeck);
  }

  if (calculateHandValue(dealer) > 21) {
    return displayGameDetails() + "<br>" + "Dealer Busted! Player Wins!!";
  } else {
    var result = compareCards(dealer, player);

    return displayGameDetails() + "<br>" + result;
  }
};

//display hands of dealer and player
var displayGameDetails = function () {
  playerHandDetails = cardsInHand(player, "Player's Hand");
  dealerHandDetails = cardsInHand(dealer, "Dealer's Hand");
  gameDetails = playerHandDetails + "<br>" + dealerHandDetails;

  return gameDetails;
};

//dispaly cards in either player or dealer hands
var cardsInHand = function (array, whosHand) {
  var hand = "<strong><u>" + whosHand + "</u></strong><br>";
  for (let i = 0; i < array.length; i++) {
    hand = hand + array[i][0] + " of " + array[i][1] + "<br>";
  }

  hand +=
    "<strong>Total Value = </strong>" + calculateHandValue(array) + "<br>";

  return hand;
};

//comapre dealer and player cards
var compareCards = function (dealer, player) {
  var playerValue = calculateHandValue(player);
  var dealerValue = calculateHandValue(dealer);
  if (playerValue > dealerValue) {
    return "<strong><u>Player wins!!</u></strong>";
  }
  if (dealerValue > playerValue) {
    return "<strong><u>dealer wins</u></strong>";
  }
  if (dealerValue == playerValue) {
    return "<strong><u>Draw</u></strong>";
  }
};

//check if busted
var checkIfOver21 = function (array) {
  if (calculateHandValue(array) > 21) {
    return true;
  } else return false;
};

//check for blackjack
var checkFor21 = function (array) {
  if (calculateHandValue(array) == 21) {
    return true;
  } else return false;
};

//generate deck
var generateDeck = function () {
  var deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      var card = [];
      card.push(values[j]);
      card.push(suits[i]);
      deck.push(card);
    }
  }
  return deck;
};

//shuffle deck
var shuffle = function (array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
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

//deal cards
var dealCards = function (array) {
  var hand = [];
  for (let i = 0; i < 2; i++) {
    randNum = Math.floor(Math.random() * array.length);
    hand.push(array[randNum]);
    array.pop(randNum);
  }

  return hand;
};

//draw card when player clicks hit
var drawCard = function (hand, array) {
  for (let i = 0; i < 1; i++) {
    randNum = Math.floor(Math.random() * array.length);
    hand.push(array[randNum]);
    array.pop(randNum);
  }
};

//calculate either player hand or dealer hand value
var calculateHandValue = function (array) {
  var handVlaue = 0;
  var aces = 0;
  for (let l = 0; l < array.length; l++) {
    if (array[l][0] == "Ace") {
      aces += 1;
    }
  }
  for (let i = 0; i < array.length; i++) {
    if (
      array[i][0] == "Jack" ||
      array[i][0] == "Queen" ||
      array[i][0] == "King"
    ) {
      handVlaue = handVlaue + 10;
    } else if (array[i][0] == "Ace") {
      if (aces > 1) {
        handVlaue = handVlaue + 1;
      } else handVlaue = handVlaue + 11;
    } else {
      handVlaue = handVlaue + Number(array[i][0]);
    }
  }
  return handVlaue;
};
