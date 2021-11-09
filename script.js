// created objects to store the player information
var players = [];
var tempBetsToAdd = [];
var turn = 1;

var dealer = {
  name: "dealer",
  card: [],
  score: 0,
};

var shuffledDeck = [];

// this function is run directly after indicating the number of players
// who are playing blackjack. it instantiates the players, the placeholders
// for cards etc. then the site proceeds with displaying input boxes to
// receive players' bets
var placeBets = function (noOfPlayers) {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("place-bets").style.display = "";

  makePlayers(noOfPlayers);
  populatePlayersBets();
};

// this function is run directly after all players have entered their bet
// amount. it gives each player and the dealer 2 cards each.
var startRound = function (noOfPlayers) {
  document.getElementById("place-bets").style.display = "none";
  document.getElementById("play-time").style.display = "";

  for (var i = 0; i < players.length; i++) {
    // do not take into account players that have already been eliminated
    // we do not want them betting because they have nothing
    if (!players[i].eliminated) {
      players[i].bet = parseInt(
        document.getElementById(`player-${i + 1}-bet`).value
      );
    }
  }

  var deck = makeDeck();
  shuffledDeck = shuffleCards(deck);

  giveAllPlayers1Card();
  giveDealer1Card();

  giveAllPlayers1Card();
  giveDealer1Card();

  populateDealerOnTable();

  // check if any user has blackjack after first 2 cards
  // if so, we do not want to give them the option of hit/stand
  while (checkBlackjack(players[turn - 1])) {
    nextTurn();
  }

  populatePlayersOnTable();
};

// prevent place bets button to be clickable if there is no valid
// number of players. number of players has to be 1 - 6.
var checkNoOfPeopleNotEmpty = function () {
  if (document.getElementById("no-of-players").value.length !== 0) {
    if (
      document.getElementById("no-of-players").value <= 0 ||
      document.getElementById("no-of-players").value > 6
    ) {
      document.getElementById("place-bets-button").disabled = true;
    } else {
      document.getElementById("place-bets-button").disabled = false;
    }
  }
};

// come into this function everytime user selects "hit"
// also come into this function at first two rounds of giving cards
var checkBlackjack = function (user) {
  if (user.score == 21) {
    return true;
  } else {
    return false;
  }
};

// initial function to instantiate players after number of
// players are entered
var makePlayers = function (noOfPlayers) {
  for (var i = 0; i < noOfPlayers; i++) {
    var newPerson = new Object();
    newPerson.name = `Player ${i + 1}`;
    newPerson.card = [];
    newPerson.score = 0;
    newPerson.bet = 0;
    newPerson.amount = 100;
    newPerson.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    newPerson.eliminated = false;

    players.push(newPerson);
    tempBetsToAdd.push(0);
  }
};

// to display dealer cards on table. to hide the second card.
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

// to show the window whereby players can place their bets.
// to also check whether there are any players that have been eliminated.
// eliminated players cannot bet.
var populatePlayersBets = function () {
  resetRound();

  document.getElementById("play-time").style.display = "none";
  document.getElementById("place-bets").style.display = "";

  var innerHtml = "";

  for (var i = 0; i < players.length; i++) {
    if (players[i].amount !== 0) {
      innerHtml += `<div class="col col-lg-2 text-center"><h5 class="bangers" style="color: ${
        players[i].color
      }">Player ${i + 1}</h5><p class="text-white mb-2 mt-2 normal">Amount: ${
        players[i].amount
      }</p><div class="row"><div class="col-lg-12 mt-3" id="player-${i + 1}">`;

      innerHtml += `<input type="number" class="form-control normal" id="player-${
        i + 1
      }-bet" min="1" max="${players[i].amount}" placeholder="Player ${
        i + 1
      } bet amount." onkeyup="checkWhetherCanStartRound(this)" onmouseup="checkWhetherCanStartRound(this)"/>`;

      innerHtml += `</div></div></div></div>`;
    } else {
      innerHtml += `<div class="col col-lg-2 text-center"><div class="card" style="background: black; height: 100%;"><div class="card-body"><h5 class="bangers" style="color: ${
        players[i].color
      }; margin-top: 13px;">Player ${
        i + 1
      }</h5><h5 class="bangers text-white">💀 Eliminated 💀</h5></div></div></div>`;
    }
  }

  document.getElementById("list-of-bets").innerHTML = innerHtml;
  document.getElementById("start-round").disabled = true;
};

// reset round. to check whether there are any players that have been eliminated.
// e.g. if player 1 has been eliminated, turn starts at player 2.
var resetRound = function () {
  turn = -1;
  for (var i = 0; i < players.length; i++) {
    players[i].card = [];
    players[i].score = 0;
    if (players[i].eliminated == false && turn == -1) {
      turn = i + 1;
    }
  }
  dealer.card = [];
  dealer.score = 0;
};

// check whether i can enable the start round button
// all players must have entered their bet amount
var checkWhetherCanStartRound = function (input) {
  var playerId = input.id.split("-")[1];
  var enteredValue = input.value;

  if (enteredValue <= 0 || enteredValue > players[playerId - 1].amount) {
    document.getElementById("start-round").disabled = true;
    return;
  }

  for (var i = 0; i < players.length; i++) {
    if (
      players[i].eliminated == false &&
      document.getElementById(`player-${i + 1}-bet`).value.length == 0
    ) {
      document.getElementById("start-round").disabled = true;
      return;
    }
  }

  document.getElementById("start-round").disabled = false;
};

// to visually add a card to player's hands as he/she hits.
var populatePlayerOnTable = function () {
  document.getElementById(`player-${turn}-cards`).innerHTML += `<img src="${
    players[turn - 1].card[players[turn - 1].card.length - 1].pic
  }" style="width: 75px; position: relative; margin-left: -60px" />`;
  document.getElementById(`player-${turn}-score`).innerHTML =
    players[turn - 1].score;
};

// to visually add all players, their cards, their scores and bet amounts on the table.
var populatePlayersOnTable = function () {
  var innerHtml = "";

  for (var i = 0; i < players.length; i++) {
    if (players[i].eliminated) {
      innerHtml += `<div class="col col-lg-2 text-center"><div class="card" style="background: black; height: 100%;"><div class="card-body"><h5 class="bangers" style="color: ${
        players[i].color
      }; margin-top: 75px;">Player ${
        i + 1
      }</h5><h5 class="bangers text-white">💀 Eliminated 💀</h5></div></div></div>`;
    } else {
      innerHtml += `<div class="col col-lg-2 text-center"><h5 class="bangers" style="color: ${
        players[i].color
      }">Player ${
        i + 1
      }</h5><div class="row"><div class="col-lg-12 mt-3" id="player-${
        i + 1
      }-cards">`;

      for (var j = 0; j < players[i].card.length; j++) {
        if (j !== 0) {
          innerHtml += `<img src="${players[i].card[j].pic}" style="width: 75px; position: relative; margin-left: -60px" />`;
        } else {
          innerHtml += `<img src="${players[i].card[j].pic}" style="width: 75px; position: relative;" />`;
        }
      }

      innerHtml += `</div></div>`;

      innerHtml += `<div><p class="text-white mb-2 mt-2 normal">Score: <span id="player-${
        i + 1
      }-score">${players[i].score}</span> | Bet: ${players[i].bet}</p>`;

      if (turn <= players.length) {
        if (i == turn - 1) {
          innerHtml += `<div id="player-${
            i + 1
          }-info" class="btn-group" role="group" aria-label="Basic example">`;
        } else {
          innerHtml += `<div id="player-${
            i + 1
          }-info" class="btn-group" role="group" aria-label="Basic example" style="display: none;">`;
        }
        innerHtml += `<button type="button" class="btn btn-dark btn-lg bangers" onmouseup="playerHit()">Hit</button><button type="button" class="btn btn-light btn-lg bangers" onmouseup="nextTurn()">Stand</button></div>`;
      } else {
        if (tempBetsToAdd[i] < 0) {
          innerHtml += `<h5 class="mb-2 mt-2 bangers" style="color: #EA2027">🤕 LOSE 🤕</h5>`;
        } else if (tempBetsToAdd[i] > 0) {
          innerHtml += `<h5 class="mb-2 mt-2 bangers" style="color: #C4E538">🤑 WIN 🤑</h5>`;
        } else {
          innerHtml += `<h5 class="mb-2 mt-2 bangers" style="color: #FFC312">😑 TIE 😑</h5>`;
        }
      }

      innerHtml += `</div></div>`;
    }
  }

  if (turn > players.length) {
    innerHtml += `<hr /><div class="row justify-content-center"><div class="text-center"><button class="btn btn-dark btn-lg bangers" type="button" onclick="populatePlayersBets()">Place Bets</button></div></div>`;
  }

  document.getElementById("list-of-players").innerHTML = innerHtml;
};

// function to hit a card. everytime player hits a card, we will check for blackjack.
// if blackjack obtained, go to next player's turn. if not, player can still draw a card
// till bust or stand.
var playerHit = function () {
  var dealtCard = dealCard(shuffledDeck);
  players[turn - 1].card.push(dealtCard);
  players[turn - 1].score = players[turn - 1].score + dealtCard.score;

  populatePlayerOnTable();

  if (checkBlackjack(players[turn - 1])) {
    nextTurn();
  } else {
    if (checkUserScoreAbove21(players[turn - 1])) {
      nextTurn();
      return;
    }
  }
};

// function that runs when player press stand, or goes above 21.
var nextTurn = function () {
  if (turn == players.length) {
    // all players have gone through their turns
    // show all cards
    turn++;
    // show dealer cards
    // if dealer below 17 draw
    showDealerCards();
    populatePlayersOnTable();
    checkIfPlayerEliminated();
  } else {
    // go to next player
    // if next player is eliminated, go to next player
    hideCurrentPlayerHitStand();
    turn++;
    showCurrentPlayerHitStand();

    if (players[turn - 1].eliminated) {
      nextTurn();
    }
  }
};

// once round ends, dealer to show his card.
// we will also tabulate the bets won or lost.
var showDealerCards = function () {
  // check if dealer score is below 17
  // if it is, draw card
  while (checkDealerNeedToDraw()) {
    var dealtCard = dealCard(shuffledDeck);
    dealer.card.push(dealtCard);
    dealer.score += dealtCard.score;
  }

  compareUsers();

  var innerHtml = `<div class="col-lg-12 mt-3">`;
  for (var i = 0; i < dealer.card.length; i++) {
    if (i !== 0) {
      innerHtml += `<img src="${dealer.card[i].pic}" style="width: 75px; position: relative; margin-left: -60px" />`;
    } else {
      innerHtml += `<img src="${dealer.card[i].pic}" style="width: 75px; position: relative;" />`;
    }
  }
  innerHtml += `<p class="text-white mb-2 mt-2 normal">Score: ${dealer.score}</p></div>`;

  document.getElementById(`dealer-cards`).innerHTML = innerHtml;
};

// hide the hit/stand buttons
var hideCurrentPlayerHitStand = function () {
  if (!players[turn - 1].eliminated) {
    document.getElementById(`player-${turn}-info`).style.display = "none";
  }
};

// show the hit/stand buttons
var showCurrentPlayerHitStand = function () {
  if (!players[turn - 1].eliminated) {
    document.getElementById(`player-${turn}-info`).style.display = "";
  }
};

// to check whether dealer needs to draw at the end of the round
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
    // check if there are any aces in user's hand to switch from 11 to 1
    for (var i = 0; i < players[turn - 1].card.length; i++) {
      if (
        players[turn - 1].card[i].name == "ace" &&
        players[turn - 1].card[i].score == 11
      ) {
        players[turn - 1].card[i].score = 1;
        user.score -= 10;
      }
    }

    document.getElementById(`player-${turn}-score`).innerHTML =
      players[turn - 1].score;

    if (user.score > 21) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// Come into this function only after user selects "stand"
// Only come in here if dealer does not get 21
var compareUsers = function () {
  // check if dealer score is 21
  if (dealer.score == 21) {
    for (var i = 0; i < players.length; i++) {
      if (!players[i].eliminated) {
        if (players[i].score == 21) {
          tempBetsToAdd[i] = 0;
        } else {
          tempBetsToAdd[i] = -players[i].bet;
        }

        players[i].amount += tempBetsToAdd[i];
      }
    }
  } else if (dealer.score > 21) {
    for (var i = 0; i < players.length; i++) {
      if (!players[i].eliminated) {
        if (players[i].score == 21) {
          tempBetsToAdd[i] = players[i].bet * 1.5;
        } else if (players[i].score > 21) {
          tempBetsToAdd[i] = -players[i].bet;
        } else {
          tempBetsToAdd[i] = players[i].bet;
        }

        players[i].amount += tempBetsToAdd[i];
      }
    }
  } else {
    for (var i = 0; i < players.length; i++) {
      if (!players[i].eliminated) {
        if (players[i].score == 21) {
          tempBetsToAdd[i] = players[i].bet * 1.5;
        } else if (players[i].score > dealer.score && players[i].score < 21) {
          tempBetsToAdd[i] = players[i].bet;
        } else if (players[i].score == dealer.score) {
          tempBetsToAdd[i] = 0;
        } else {
          tempBetsToAdd[i] = -players[i].bet;
        }

        players[i].amount += tempBetsToAdd[i];
      }
    }
  }
};

// to check at the end of each round whether player has lost all his money.
var checkIfPlayerEliminated = function () {
  for (var i = 0; i < players.length; i++) {
    players[i].eliminated = players[i].amount == 0;
  }
};

// at the beginning of the round, to assign all players on the table 1 card.
var giveAllPlayers1Card = function () {
  for (var i = 0; i < players.length; i++) {
    if (!players[i].eliminated) {
      var dealtCard = dealCard(shuffledDeck);
      players[i].card.push(dealtCard);
      players[i].score += dealtCard.score;
    }
  }
};

// at the beginning of the round, to assign dealer 1 card.
var giveDealer1Card = function () {
  // since giveDealer1Card is after giveAllPlayers1Card, the shuffledDeck here is 1 less card
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
        score = 11;
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
