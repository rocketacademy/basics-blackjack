// created objects to store the player information
var players = [];
var turn = 1;

var dealer = {
  name: "dealer",
  card: [],
  score: 0,
};

var shuffledDeck = [];

var placeBets = function (noOfPlayers) {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("place-bets").style.display = "";

  makePlayers(noOfPlayers);
  populatePlayersBets();
};

var startRound = function (noOfPlayers) {
  document.getElementById("place-bets").style.display = "none";
  document.getElementById("play-time").style.display = "";

  var deck = makeDeck();
  shuffledDeck = shuffleCards(deck);

  giveAllPlayers1Card();
  dealerMakeTurn();

  giveAllPlayers1Card();
  dealerMakeTurn();

  populateDealerOnTable();
  populatePlayersOnTable();
};

// The user's cards are analysed for winning or losing conditions.
// Come into this function everytime user selects "hit"
// Also come into this function at first two rounds of giving cards
var checkBlackjack = function (user) {
  if (user.score == 21) {
    return true;
  } else {
    return false;
  }
};

var makePlayers = function (noOfPlayers) {
  for (var i = 0; i < noOfPlayers; i++) {
    var newPerson = new Object();
    newPerson.name = `Player ${i + 1}`;
    newPerson.card = [];
    newPerson.score = 0;
    newPerson.bet = 0;
    newPerson.amount = 100;

    players.push(newPerson);
  }
};

var populateDealerOnTable = function () {
  var innerHtml = `<div class="col-lg-12 mt-3">`;

  for (var i = 0; i < dealer.card.length; i++) {
    if (i !== 0) {
      if (i == dealer.card.length - 1) {
        innerHtml += `<img src="./images/cards/back.png" style="width: 75px; position: relative; margin-left: -60px" />`;
      } else {
        innerHtml += `<img src="${dealer.card[i].pic}" style="width: 75px; position: relative; margin-left: -60px" />`;
      }
    } else {
      innerHtml += `<img src="${dealer.card[i].pic}" style="width: 75px; position: relative;" />`;
    }
  }

  innerHtml += `</div>`;

  document.getElementById("dealer-cards").innerHTML = innerHtml;
};

var populatePlayersBets = function () {
  // remove welcome screen
  var innerHtml = "";

  for (var i = 0; i < players.length; i++) {
    innerHtml += `<div class="col col-lg-2 text-center"><h5 style="color: white">Player ${
      i + 1
    }</h5><div class="row"><div class="col-lg-12 mt-3" id="player-${
      i + 1
    }-cards">`;

    innerHtml += `<input type="number" class="form-control" id="player-${
      i + 1
    }-bet" min="1" max="${players[i].amount}" placeholder="Player ${
      i + 1
    } bet amount." />`;

    innerHtml += `</div></div></div></div>`;
  }

  document.getElementById("list-of-bets").innerHTML = innerHtml;
};

var populatePlayersOnTable = function () {
  var innerHtml = "";

  for (var i = 0; i < players.length; i++) {
    innerHtml += `<div class="col col-lg-2 text-center"><h5 style="color: white">Player ${
      i + 1
    }</h5><div class="row"><div class="col-lg-12 mt-3" id="player-${
      i + 1
    }-cards">`;

    for (var j = 0; j < players[i].card.length; j++) {
      if (i == 0) {
        if (j !== 0) {
          innerHtml += `<img src="${players[i].card[j].pic}" style="width: 75px; position: relative; margin-left: -60px" />`;
        } else {
          innerHtml += `<img src="${players[i].card[j].pic}" style="width: 75px; position: relative;" />`;
        }
      } else {
        if (j !== 0) {
          innerHtml += `<img src="./images/cards/back.png" style="width: 75px; position: relative; margin-left: -60px" />`;
        } else {
          innerHtml += `<img src="./images/cards/back.png" style="width: 75px; position: relative;" />`;
        }
      }
    }

    innerHtml += `</div></div>`;

    if (i == 0) {
      innerHtml += `<div id="player-${i + 1}-info">`;
    } else {
      innerHtml += `<div id="player-${i + 1}-info" style="display: none">`;
    }

    innerHtml += `<p class="text-white mb-2 mt-2">Score: ${players[i].score} | Bet: ${players[i].bet}</p><div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-dark" onmouseup="playerHit()">Hit</button><button type="button" class="btn btn-light" onmouseup="playerStand()">Stand</button></div></div></div>`;
  }

  document.getElementById("list-of-players").innerHTML = innerHtml;
};

var playerHit = function () {
  var dealtCard = dealCard(shuffledDeck);
  players[turn - 1].card.push(dealtCard);
  players[turn - 1].score += dealtCard.score;

  if (checkBlackjack(players[turn - 1])) {
    // user wins
  } else {
    if (checkUserScoreAbove21(players[turn - 1])) {
      // user loses
    } else {
      // do nothing
      // wait for user to hit or stand
    }
  }
};

var playerStand = function () {
  turn++;
  if (turn > players.length) {
    // everyone has stand
    // check dealer hands
    if (checkBlackjack(dealer)) {
      // dealer wins
    } else {
      // check if dealer needs to draw card
      while (checkDealerNeedToDraw()) {
        var dealtCard = dealCard(shuffledDeck);
        dealer.card.push(dealtCard);
        dealer.score += dealtCard.score;
      }

      if (checkBlackjack(dealer)) {
        // dealer wins
      } else {
        compareUsers();
      }
    }
  }
};

var checkDealerNeedToDraw = function () {
  return dealer.score < 17;
};

// output user cards
var printUserCards = function (user) {
  myOutputValue = `${user.name} cards are: `;

  for (var i = 0; i < user.card.length; i++) {
    var myCard = user.card[i];
    myOutputValue += myCard.name + " " + myCard.suit + " ";
  }

  return myOutputValue;
};

// Come into this function everytime user selects "hit"
var checkUserScoreAbove21 = function (user) {
  if (user.score > 21) {
    return true;
  } else {
    return false;
  }
};

// Come into this function only after user selects "stand"
var compareUsers = function () {
  for (var i = 0; i < players.length; i++) {
    if (players[i].score > dealer.score) {
      players[i].amount += players[i].bet;
    } else {
      players[i].amount -= players[i].bet;
    }
    players[i].bet = 0;
  }
};

var giveAllPlayers1Card = function () {
  for (var i = 0; i < players.length; i++) {
    var dealtCard = dealCard(shuffledDeck);
    players[i].card.push(dealtCard);
    players[i].score += dealtCard.score;
  }
};

var checkWhetherDealerHitsOrStands = function () {
  if (dealer.score < 17) {
    dealerMakeTurn();
  }
};

var dealerMakeTurn = function () {
  // since dealerMakeTurn is after giveAllPlayers1Card, the shuffledDeck here is 1 less card
  var dealtCard = dealCard(shuffledDeck);
  dealer.card.push(dealtCard);
  dealer.score += dealtCard.score;
};

var dealCard = function (deck) {
  return deck.pop();
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

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var score = 0;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        score = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        score = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        score = 10;
      } else if (cardName == 13) {
        cardName = "king";
        score = 10;
      } else {
        score = cardName;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: score,
        pic: `./images/cards/${cardName}_of_${currentSuit}.png`,
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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
