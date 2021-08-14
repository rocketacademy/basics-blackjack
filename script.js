// Generate new Deck (Copy 10.2 code)
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
      var cardPoints = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        cardPoints = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardPoints = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardPoints = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        points: cardPoints,
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

//Make Deck
var newDeck = shuffleCards(makeDeck());

//Game Rules
var scoreLimit = 21;
var numOfPlayers = 0;
var PLAYERSTART = `playerStart`;
var PLAYERNAME = `playerName`;
var BETTINGROUND = `bettingRound`;
var START_HAND = `startHand`;
var HIT_OR_STAND = "hitOrStand";
var COMPTURN = "compTurn"; //Hit until 17
var ENDGAME = "endGame";
var RESTART = "restart";
var blackJack = false;
var gameMode = PLAYERSTART;

// //JS output variables (https://www.w3schools.com/js/js_output.asp)
// //Popup window with instruction
// window.alert(
//   `
//   21 points to win.
//   Type 'Hit' for more cards.
//   Type 'Stand' to pass your turn.`
// );
//Element is case sensitive.
document.getElementById(
  "output-div"
).innerHTML = `How many players for this game?`;

//Store hands
var compHand = [];
var dealerBank = 100;
var playersData = [];
var currentPlayer = {
  name: ``,
  playerBank: 100,
  playerHand: [],
  playerScore: [],
  playerGameScore: [],
  Bet: ``,
};

//Determine score from hand
var getScore = function (hand) {
  var score = 0;
  for (i = 0; i < hand.length; i++) {
    var cards = hand[i];
    if (cards.rank == 1 && hand.length == 2) {
      score += 11;
    } else if (i < hand.length) {
      score += cards.points;
    }
  }
  return score;
};

//Print hand (.map is interesting, `card` can be randomly named but has to be referenced for the key to be called. `hand` is used for array reference and for .map to string)
var printHand = function (hand) {
  return `${hand.map((card) => ` ${card.name} of ${card.suit}`)}`;
};

//BlackJack Check
var blackJackCheck = function (hand) {
  return hand.length == 2 && getScore(hand) == scoreLimit;
};

var main = function (input) {
  //How many players to start game?
  if (gameMode == PLAYERSTART) {
    console.log(gameMode);
    numOfPlayers = Number(input);
    var myOutputValue = `Starting ${numOfPlayers} Player Game Mode. Key in your names.`;
    gameMode = PLAYERNAME;
    return myOutputValue;
  }

  if (gameMode == PLAYERNAME) {
    console.log(gameMode);
    currentPlayer.name = input;
    var myOutputValue = `${currentPlayer.name} entered.`;
    gameMode = BETTINGROUND;
    return myOutputValue;
  }
  if (gameMode == BETTINGROUND) {
    document.getElementById("output-div").innerHTML = `Input your bets.`;
    currentPlayer.bet = Number(input);
    var myOutputValue = `${currentPlayer.bet} bet by ${currentPlayer.name}`;
    gameMode = START_HAND;
    return myOutputValue;
  }
  //Start game & check blackjack for players and dealer.
  if (gameMode == START_HAND) {
    //deal hand
    compHand = [newDeck.pop(), newDeck.pop()];
    currentPlayer.playerHand = [newDeck.pop(), newDeck.pop()];
    compScore = getScore(compHand);
    if (blackJackCheck(currentPlayer.playerHand)) {
      if (compScore == scoreLimit) {
        var myOutputValue = `All Natural! Both tie! <br> ${
          currentPlayer.name
        } has ${printHand(currentPlayer.playerHand)} <br>`;
        console.log(currentPlayer.playerHand);
        console.log(compHand);
        return myOutputValue;
      } else if (compScore != scoreLimit) {
        var myOutputValue = `Natural! ${currentPlayer.name} wins! <br> ${
          currentPlayer.name
        } has ${printHand(currentPlayer.playerHand)} <br>`;
        console.log(currentPlayer.playerHand);
        console.log(compHand);
        return myOutputValue;
      }
    } else if (blackJackCheck(compHand)) {
      if (currentPlayer.playerScore == scoreLimit) {
        var myOutputValue = `All Natural! Both tie! <br> ${
          currentPlayer.name
        } has ${printHand(currentPlayer.playerHand)} <br>`;
        console.log(currentPlayer.playerHand);
        console.log(compHand);
        return myOutputValue;
      } else if (currentPlayer.playerScore != scoreLimit) {
        var myOutputValue = `Natural! Dealer wins! <br> ${
          currentPlayer.name
        } has ${printHand(currentPlayer.playerHand)} <br>`;
        console.log(currentPlayer.playerHand);
        console.log(compHand);
        return myOutputValue;
      }
    }
    playerGameScore = currentPlayer.playerScore;
    compGameScore = compScore;
    gameMode = HIT_OR_STAND;
    console.log(`Comp score:${compGameScore}`);
    var myOutputValue = `${currentPlayer.name} has ${
      currentPlayer.playerScore
    } points. <br> ${currentPlayer.name} has ${printHand(
      currentPlayer.playerHand
    )} <br> Choose to hit or stand.`;
    return myOutputValue;
  }

  if (gameMode == HIT_OR_STAND && input.toLowerCase() == `hit`) {
    currentPlayer.playerHand.push(newDeck.pop());
    currentPlayer.playerScore = getScore(currentPlayer.playerHand);
    if (currentPlayer.playerScore > scoreLimit) {
      gameMode = COMPTURN;
      currentPlayer.playerGameScore = 0;
      console.log(`PlayerG: ${playerGameScore}`);
      var myOutputValue = `${
        currentPlayer.name
      } bust. <br> Player has ${printHand(
        currentPlayer.playerHand
      )} <br> Dealer turn now. <br> ${currentPlayer.name} has ${
        currentPlayer.playerScore
      }.`;
      return myOutputValue;
    } else {
      gameMode = HIT_OR_STAND;
      currentPlayer.playerGameScore = currentPlayer.playerScore;
      var myOutputValue = `${currentPlayer.name} has ${printHand(
        currentPlayer.playerHand
      )} <br> ${currentPlayer.name} has ${
        currentPlayer.playerScore
      }. <br>Choose to hit or stand.`;
      return myOutputValue;
    }
  }

  if (gameMode == HIT_OR_STAND && input.toLowerCase() == `stand`) {
    gameMode = COMPTURN;
    playerGameScore = currentPlayer.playerScore;
    console.log(`PlayerG: ${playerGameScore}`);
    var myOutputValue = `${currentPlayer.name} has ${currentPlayer.playerScore}. It is the dealer turn to play. Dealer has ${compScore}`;
    return myOutputValue;
  }

  if (gameMode == HIT_OR_STAND && input.toLowerCase() != `stand || hit`) {
    var myOutputValue = `Invalid input. ${currentPlayer.name} has ${currentPlayer.playerScore} points. Choose to hit or stand`;
    return myOutputValue;
  }

  //Dealer hit until 17. Then move to check score
  if (gameMode == COMPTURN) {
    for (
      compScore = getScore(compHand);
      compScore < 17;
      compScore = getScore(compHand)
    ) {
      compHand.push(newDeck.pop());
    }
    gameMode = ENDGAME;
    if (compScore > scoreLimit) {
      var myOutputValue = `Dealer bust. Dealer has ${compScore}.`;
    } else {
      var myOutputValue = `Dealer has ${compScore}.`;
    }
    compGameScore = compScore;
    if (compScore > scoreLimit) {
      compGameScore = 0;
    }
    console.log(`CompG:${compGameScore}`);
    return myOutputValue;
  }

  //Compare hands and announce winner
  if (gameMode == ENDGAME) {
    gameMode = RESTART;
    if (compGameScore > currentPlayer.playerGameScore) {
      myOutputValue = `Dealer had ${compScore} points. ${currentPlayer.name} had ${currentPlayer.playerScore} points.<br> ${currentPlayer.name} loses.`;
      console.log(`Player lose`);
      return myOutputValue;
    }
    if (compGameScore < currentPlayer.playerGameScore) {
      myOutputValue = `Dealer had ${compScore} points. ${currentPlayer.name} had ${currentPlayer.playerScore} points.<br> ${currentPlayer.name} wins.`;
      console.log(`Player Win`);
      return myOutputValue;
    }
    if (compGameScore == currentPlayer.playerGameScore) {
      myOutputValue = `Dealer had ${compScore} points. ${currentPlayer.name} had ${currentPlayer.playerScore} points.<br> It's a tie.`;
      console.log(`Game tie`);
      return myOutputValue;
    }
  }

  //Resetting the game stats for next round.
  if ((gameMode = RESTART)) {
    newDeck = shuffleCards(makeDeck());
    blackJack = false;
    compHand = [];
    currentPlayer.playerHand = [];
    currentPlayer.playerScore = [];
    currentPlayer.playerGameScore = [];
    gameMode = START_HAND;
    var myOutputValue = `A new round awaits`;
    return myOutputValue;
  }
  //Catch all
  var myOutputValue = `Invalid Move. Restart game.`;
  return myOutputValue;
};
