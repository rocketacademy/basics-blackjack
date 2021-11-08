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

var placeBets = function (noOfPlayers) {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("place-bets").style.display = "";

  makePlayers(noOfPlayers);
  populatePlayersBets();
};

var startRound = function (noOfPlayers) {
  document.getElementById("place-bets").style.display = "none";
  document.getElementById("play-time").style.display = "";

  for (var i = 0; i < players.length; i++) {
    if (!players[i].eliminated) {
      players[i].bet = parseInt(
        document.getElementById(`player-${i + 1}-bet`).value
      );
    }
  }

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
    newPerson.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    newPerson.eliminated = false;

    players.push(newPerson);
    tempBetsToAdd.push(0);
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
  resetRound();
  document.getElementById("play-time").style.display = "none";
  document.getElementById("place-bets").style.display = "";
  // remove welcome screen
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

var checkWhetherCanStartRound = function (input) {
  // check whether i can enable the start round button
  // all players must have entered their bet amount

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

var populatePlayerOnTable = function () {
  document.getElementById(`player-${turn}-cards`).innerHTML += `<img src="${
    players[turn - 1].card[players[turn - 1].card.length - 1].pic
  }" style="width: 75px; position: relative; margin-left: -60px" />`;
  document.getElementById(`player-${turn}-score`).innerHTML =
    players[turn - 1].score;
};

var populatePlayersOnTable = function () {
  var innerHtml = "";

  if (turn <= players.length) {
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

        if (turn == players.length) {
          for (var j = 0; j < players[i].card.length; j++) {
            if (j !== 0) {
              innerHtml += `<img src="${players[i].card[j].pic}" style="width: 75px; position: relative; margin-left: -60px" />`;
            } else {
              innerHtml += `<img src="${players[i].card[j].pic}" style="width: 75px; position: relative;" />`;
            }
          }
        } else {
          for (var j = 0; j < players[i].card.length; j++) {
            if (i + 1 == turn) {
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
        }

        innerHtml += `</div></div>`;

        if (i == turn - 1) {
          innerHtml += `<div id="player-${i + 1}-info">`;
        } else {
          innerHtml += `<div id="player-${i + 1}-info" style="display: none">`;
        }

        innerHtml += `<p class="text-white mb-2 mt-2 normal">Score: <span id="player-${
          i + 1
        }-score">${players[i].score}</span> | Bet: ${
          players[i].bet
        }</p><div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-dark btn-lg bangers" onmouseup="playerHit()">Hit</button><button type="button" class="btn btn-light btn-lg bangers" onmouseup="nextTurn()">Stand</button></div></div></div>`;
      }
    }
  } else {
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
        innerHtml += `<div id="player-${i + 1}-info">`;
        innerHtml += `<p class="text-white mb-2 mt-2 normal">Score: <span id="player-${
          i + 1
        }-score">${players[i].score}</span> | Bet: ${players[i].bet}</p>`;

        if (tempBetsToAdd[i] < 0) {
          innerHtml += `<h5 class="mb-2 mt-2 bangers" style="color: #EA2027">🤕 LOSE 🤕</h5>`;
        } else if (tempBetsToAdd[i] > 0) {
          innerHtml += `<h5 class="mb-2 mt-2 bangers" style="color: #C4E538">🤑 WIN 🤑</h5>`;
        } else {
          innerHtml += `<h5 class="mb-2 mt-2 bangers" style="color: #FFC312">😑 TIE 😑</h5>`;
        }

        innerHtml += `</div></div>`;
      }
    }

    innerHtml += `<hr /><div class="row justify-content-center"><div class="text-center"><button class="btn btn-dark btn-lg bangers" type="button" onclick="populatePlayersBets()">Place Bets</button></div></div>`;
  }

  document.getElementById("list-of-players").innerHTML = innerHtml;
};

var playerHit = function () {
  var dealtCard = dealCard(shuffledDeck);
  players[turn - 1].card.push(dealtCard);
  players[turn - 1].score = players[turn - 1].score + dealtCard.score;

  populatePlayerOnTable();

  if (checkBlackjack(players[turn - 1])) {
    // user wins
    playerWins("blackjack");
    nextTurn();
  } else {
    if (checkUserScoreAbove21(players[turn - 1])) {
      console.log("line 177");
      console.log("checkUserScoreAbove21");
      // user loses
      playerLoses();
      // next turn
      nextTurn();
      return;
    }
  }
};

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
    hideCurrentPlayerCards();
    turn++;
    showCurrentPlayerCards();

    if (players[turn - 1].eliminated) {
      nextTurn();
    }
  }
};

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

var hideCurrentPlayerCards = function () {
  if (!players[turn - 1].eliminated) {
    var innerHtml = "";
    for (var i = 0; i < players[turn - 1].card.length; i++) {
      if (i !== 0) {
        innerHtml += `<img src="./images/cards/back.png" style="width: 75px; position: relative; margin-left: -60px" />`;
      } else {
        innerHtml += `<img src="./images/cards/back.png" style="width: 75px; position: relative;" />`;
      }
    }

    document.getElementById(`player-${turn}-cards`).innerHTML = innerHtml;
    document.getElementById(`player-${turn}-info`).style.display = "none";
  }
};

var showCurrentPlayerCards = function () {
  if (!players[turn - 1].eliminated) {
    var innerHtml = "";
    for (var i = 0; i < players[turn - 1].card.length; i++) {
      if (i !== 0) {
        innerHtml += `<img src="${
          players[turn - 1].card[i].pic
        }" style="width: 75px; position: relative; margin-left: -60px" />`;
      } else {
        innerHtml += `<img src="${
          players[turn - 1].card[i].pic
        }" style="width: 75px; position: relative;" />`;
      }
    }

    document.getElementById(`player-${turn}-cards`).innerHTML = innerHtml;
    document.getElementById(`player-${turn}-info`).style.display = "";
  }
};

var playerWins = function (winType) {
  if (winType == "blackjack") {
    tempBetsToAdd[turn - 1] = players[turn - 1].bet * 1.5;
  } else if (winType == "normal") {
    tempBetsToAdd[turn - 1] = players[turn - 1].bet;
  }
};

var playerLoses = function () {
  tempBetsToAdd[turn - 1] = -players[turn - 1].bet;
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

var checkIfPlayerEliminated = function () {
  for (var i = 0; i < players.length; i++) {
    players[i].eliminated = players[i].amount == 0;
  }
};

var giveAllPlayers1Card = function () {
  for (var i = 0; i < players.length; i++) {
    if (!players[i].eliminated) {
      var dealtCard = dealCard(shuffledDeck);
      players[i].card.push(dealtCard);
      players[i].score += dealtCard.score;
    }
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
