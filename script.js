var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥", "🔸", "♣", "♠"];

  //HELLO COMMENT TESTING!!!

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
      var cardValue = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        cardValue = [11, 1];
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      // add in card value property for easier counting
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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

//shuffle deck helper function
var shuffleDeck = function (newDeck) {
  //new deck needs to be a object array containing all 52 cards
  if (Array.isArray(newDeck)) {
    for (var i = 0; i < newDeck.length; i++) {
      randomIndex = Math.floor(Math.random() * newDeck.length);
      var currentCard = newDeck[i];
      var randomCard = newDeck[randomIndex];
      newDeck[i] = randomCard;
      newDeck[randomIndex] = currentCard;
    }
  } else {
    return "Deck error, deck cannot be shuffled. Please check deck.";
  }
  return newDeck;
};

//helper to deal card > 1 line only should it even be helper just to improve readability?
var dealCard = function (playerToDeal) {
  var dealtCard = deck.pop();
  console.log(dealtCard);
  playerState[playerToDeal].hand.push(dealtCard);
  if (dealtCard.name == "ace") {
    playerState[playerToDeal].aceCount += 1;
    if (playerState[playerToDeal].currentValue < 11) {
      playerState[playerToDeal].currentValue += dealtCard.value[0]; //add 11 if card value less than 11
      playerState[playerToDeal].aceValueEleven = true;
    } else {
      playerState[playerToDeal].currentValue += dealtCard.value[1]; //add 1 if card value more than 11
    }
  } else {
    playerState[playerToDeal].currentValue += dealtCard.value;
    if (
      playerState[playerToDeal].currentValue > 21 &&
      playerState[playerToDeal].aceValueEleven
    ) {
      //check if there is ace with value 11 (there can only be max 1 ace with 11)
      playerState[playerToDeal].currentValue -= 10;
    }
  }
};

var calculateCurrentValue = function (playerToCalc) {
  playerState[playerToCalc].currentValue = 0;
  playerState[playerToCalc].aceCount = 0;
  for (var calcCount = 0; calcCount < playerState[playerToCalc]; calcCount++) {
    if (playerState[playerToCalc].hand[calcCount].name == "ace") {
      //dont add any to currentValue and deal with ace at the end
      playerState[playerToCalc].aceCount += 1;
    } else {
      //if not ace just add face value
      playerState[playerToCalc].currentValue +=
        playerState[playerToCalc].hand[calcCount].currentValue;
    }
  }
  for (
    var aceCounter = 0;
    aceCounter < playerState[playerToCalc].aceCount;
    aceCounter++
  ) {
    //add all aces at the end
    if (playerState[playerToCalc].currentValue < 11) {
      playerState[playerToCalc].currentValue +=
        playerState[playerToCalc].hand[aceCounter].value[0]; //add 11 if card value less than 11
      playerState[playerToCalc].aceValueEleven = true;
    } else {
      playerState[playerToCalc].currentValue +=
        playerState[playerToCalc].hand[aceCounter].value[1]; //add 1 if card value more than 11
    }
  }
};

//helper function to initialise players and dealer as objects. dealer will always be index [playerState.length - 1](last index)
var initPlayers = function (numPlayers) {
  //numplayers should be a number
  if (Number.isInteger(numPlayers)) {
    for (playerCount = 0; playerCount < numPlayers; playerCount++) {
      var player = {
        name: "player " + (playerCount + 1),
        hand: [],
        currentValue: 0, //insert method to calculate total value everytime a card is added?
        aceCount: 0, //insert method to calculate number of ace?
        aceValueEleven: false,
      };
      playerState.push(player);
    }
    var dealer = {
      name: "dealer",
      hand: [],
      currentValue: 0, //insert method to calculate total value everytime a card is added?
      aceCount: 0, //insert method to calculate number of ace?
      aceValueEleven: false,
    };
    playerState.push(dealer);
  } else {
    return "Please input number of players as an integer of maximum 8. ";
  }
};

// check for blackjack
var checkBlackjack = function (playerToCheck) {
  if (
    (playerState[0].hand.name == "ace" && playerState[1].hand.value == 10) ||
    (playerState[1].hand.name == "ace" && playerState[0].hand.value == 10)
  ) {
    playerState.currentValue = "blackjack";
    return true;
  } else {
    return false;
  }
};

var checkWin = function (checkee) {
  // running out of words for checking inputs, checkee is an object
  var endStatements = makeEndStatements();
  console.log("checking win");
  console.log(playerState[checkee].currentValue);
  console.log(playerState[playerState.length - 1].currentValue);
  if (
    playerState[checkee].currentValue >
    playerState[playerState.length - 1].currentValue
  ) {
    // if player or dealer bust, it wouldn't reach check win
    gameState = "Game Starting";
    return `${endStatements.win}`; //insert win flag as attribute for multiplayer?
  } else if (
    playerState[checkee].currentValue <
    playerState[playerState.length - 1].currentValue
  ) {
    gameState = "Game Starting";
    return `${endStatements.lose}
    `;
  } else if (
    playerState[checkee].currentValue ==
    playerState[playerState.length - 1].currentValue
  ) {
    gameState = "Game Starting";
    return `${endStatements.draw}`;
  } else {
    return "something is wrong with the code please check";
  }
};

var displayCards = function (displayer) {
  var displayed = `${playerState[displayer].name}'s cards are: <br>`;
  for (var j in playerState[displayer].hand) {
    displayed += `${playerState[displayer].hand[j].name} ${playerState[displayer].hand[j].suit} <br>`;
  }
  console.log(playerState);
  return displayed;
};

//Main code starts here!!!!!

//initialise deck as global variable
var deck = makeDeck();
//shuffle deck > is there a need to create a function to shuffle or draw random index is good enough? just pop after draw
deck = shuffleDeck(deck);
console.log(deck);
var gameState = "Game Starting";
var playerState;
var playerTurn = 0; // player = 0, dealer = 1
var makeEndStatements = function () {
  return {
    win: `${displayCards(0)} <br> ${displayCards(1)} <br> You won!`,
    lose: `${displayCards(0)} <br> ${displayCards(1)} <br> You lost!`,
    draw: `${displayCards(0)} <br> ${displayCards(1)} <br> It's a draw!`,
    hitstand: `Type 'hit' to deal another card or 'stand' to end your turn.`,
  };
};

var main = function (input) {
  //possible to add a module for getting and updating names and number of players
  if (gameState == "Game Starting") {
    playerState = [];
    initPlayers(1); //for base case only 1 player and 1 dealer
    var blackjackFlag = false; // blackjack only for starting hand
    //deal cards to player and dealer starting with player
    for (
      var startingHand = 0;
      startingHand < playerState.length;
      startingHand++
    ) {
      // playerState.length = 2 for base case
      for (var handCount = 0; handCount < 2; handCount++) {
        // only draw 2 cards per person
        dealCard(playerTurn);
        if (handCount == 1) {
          blackjackFlag = blackjackFlag || checkBlackjack(playerTurn); //check for if there is any black jack for first 2 cards
        }
        playerTurn = (playerTurn + 1) % playerState.length; // for base this is 2
      }
    }
    gameState = "player turn to draw";
    var endStatements = makeEndStatements();
    if (blackjackFlag) {
      if (
        playerState[playerState.length - 1] == "blackjack" &&
        playerState[0] == "blackjack"
      ) {
        //if multiplayer, need to check banker first then loop through to see either draw or win condition
        gameState = "Game Starting";
        return `${playerState[0].name} and the dealer got black jacks. ${endStatements.draw}`;
      } else if (playerState[playerState.length - 1] == "blackjack") {
        gameState = "Game Starting";
        return `The dealer got a blackjack. ${endStatements.lose}`;
      } else {
        playerTurn = 0; //actually already 0 but just to make sure
        gameState = "Game Starting";
        return `${playerState[0].name} got a blackjack. ${endStatements.win}`;
      }
    } else {
      playerTurn = 0; //actually already 0 but just to make sure
      return `${displayCards(0)} <br> ${displayCards(1)} <br> ${
        endStatements.hitstand
      }`;
    }
  } else if (gameState == "player turn to draw") {
    if (input.toLowerCase() == "hit") {
      dealCard(playerTurn);
      var endStatements = makeEndStatements();
      if (playerState[playerTurn].currentValue > 21) {
        gameState = "Game Starting";
        return `${endStatements.lose}`;
      } else return `${displayCards(0)} <br> ${endStatements.hitstand}`;
    } else if (input.toLowerCase() == "stand") {
      console.log("in stand");
      //if stand then is banker turn in base case
      playerTurn = (playerTurn + 1) % 2;
      console.log(playerState.length);
      console.log(playerTurn);
      if (playerTurn == playerState.length - 1) {
        if (playerState[playerTurn].currentValue < 17) {
          while (playerState[playerTurn].currentValue < 17) {
            dealCard(playerTurn);
            var endStatements = makeEndStatements();
            if (playerState[playerTurn].currentValue > 21) {
              gameState = "Game Starting";
              return `${endStatements.win}`;
            }
          }
          //add function to check winner
        }
        for (let k in playerState) {
          if (playerState[k].name == "dealer") {
            continue;
          }
          console.log(k);
          return checkWin(k);
        }
      } else if (playerTurn != playerState.length - 1) {
        console.log(playerTurn);
        console.log(playerState.length);
        //can add next player here rules here
        //display next player cards and ask to hit or stand
        //must exclude those that already blackjack
        return "this will be executed is there is more than 1 player, feature in upcoming release.";
      }
    } else {
      return "Invalid input. Please key in either 'hit' or 'stand'.";
    }
  }
  //check win/lose condition -helper?
  //dealer draw conditions < 17 hit
  var myOutputValue =
    "What special exception did I miss that got this to be returned?";
  return myOutputValue;
};
