// Declare game modes
var START = "game start";
var CARDS_DRAWN = "cards are drawn";
var HIT_OR_STAND = "hit or stand";
var currentGameMode = START;

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
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
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank

      var card = {
        name: cardName,

        suit: currentSuit,

        rank: rankCounter,
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

// Draw 1 card from the shuffledDeck to player's hand
function drawCard(player) {
  player.cards.push(shuffledDeck.pop());
}

// Clear hands of the player
function clearHandCards(player) {
  player.cards = [];
  player.cardsPoints = 0;
}

function checkForBlackJack(player) {
  // player.cards[0].suits = 'ace';
  // player.cards[1].rank = 10;
  if (
    (player.cards[0].suits == "ace" && player.cards[1].rank >= 10) ||
    (player.cards[1].suits == "ace" && player.cards[0].rank >= 10)
  ) {
    player.blackjack = true;
  }
}

function DrawBlackJack(player) {
  player.cards[0].suits = "ace";
  player.cards[1].rank = 10;
}

// Clear hand of both players, draw two cards from deck

function newGame(player1, player2) {
  clearHandCards(player1);
  clearHandCards(player2);

  for (let i = 0; i < 2; i++) {
    drawCard(player1);

    drawCard(player2);
  }
}

function printResult(player) {
  var result = player.name + "'s hand : <br>";
  for (let i = 0; i < player.cards.length; i++) {
    result += player.cards[i].name + " of " + player.cards[i].suit + "<br>";
  }
  result += "<br>";
  return result;
}

//Calculate the player's hand score
function PlayerHandsScore(player) {
  player.cardsPoints = 0;
  for (let i = 0; i < player.cards.length; i++) {
    //Check for J/Q/K cards, card score = 10

    if (player.cards[i].rank >= 11 || player.cards[i].rank == 1) {
      player.cardsPoints += 10;
    } else {
      player.cardsPoints += player.cards[i].rank;
    }
  }

  return player.cardsPoints;
}

//Check the winners
function checkWinner(player1, player2) {
  console.log(PlayerHandsScore(player1));

  console.log(PlayerHandsScore(player2));

  var result = `<br>${player2.name} wins`;

  checkForBlackJack(p1);

  checkForBlackJack(com);

  if (
    (player1.blackjack == true && player2.blackjack == true) ||
    player1.cardsPoints == player2.cardsPoints
  ) {
    //Tie condition

    console.log("tie");

    result = `<br>It is a tie!`;

    //tie
  } else if (player1.blackjack == true || player2.blackjack == true) {
    //Win condition

    result = `<br>${player1.name} blackjack!`;

    if (player1.blackjack == true) {
      result = `<br>${player2.name} blackjack!`;
    }
  } else {
    if (player1.cardsPoints > player2.cardsPoints) {
      //player 1 wins

      result = `<br>${player1.name} win`;
    }
  }

  return result;
}

function updateScore(player) {
  player.gameScore++;
}

//cardsPoints = sum of cards point. GameScore++ if win one round
class player {
  constructor(name, cards, cardsPoints, gameScore) {
    this.name = name;
    this.cards = [];
    this.cardsPoints = 0;
    this.gameScore = 0;
    this.blackjack = false;
  }

  // static PlayerHandsScore(this){
  //   for (let i = 0; i < this.cards.length; i++){
  //     this.cardsPoints += this.cards[i].rank
  //   }
  //   return player.cardsPoints;
  // }
}

// Initialization of players
let p1 = new player("p1");
let com = new player("com");
// Initialise and shuffle deck representation as an array of objects
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

var main = function (input) {
  // If run out of cards
  if (deck.length == 0) {
    deck = makeDeck();
    shuffledDeck = shuffleCards(deck);
  }

  // var myOutputValue = printResult(p1) + printResult(com) + " <br>" + checkWinner(p1, com);
  var myOutputValue = "";

  if (currentGameMode == START) {
    newGame(p1, com);
    currentGameMode = CARDS_DRAWN;

    image = '<img src="./img/curious.jfif" />';
    // reassign output message
    myOutputValue =
      "Everyone has been dealt a card. Click Continue to calculate cards!" +
      image;

    return myOutputValue;
  }

  if (currentGameMode == CARDS_DRAWN) {
    // check for blackjack
    // DrawBlackJack(p1);
    // DrawBlackJack(com);
    checkForBlackJack(p1);
    checkForBlackJack(com);

    console.log("Does Player have Black Jack? ==>", p1.blackjack);
    console.log("Does Dealer have Black Jack? ==>", com.blackjack);

    // Condition when either player or dealer has black jack
    if (p1.blackjack == true || com.blackjack == true) {
      // Condition where both have black jack
      if (p1.blackjack == true && com.blackjack == true) {
        myOutputValue =
          printResult(p1) +
          printResult(com) +
          "Its a Black Jack Tie! Game restarts";
      }
      // Condition when only player has black jack
      else if (p1.blackjack == true && com.blackjack == false) {
        myOutputValue =
          printResult(p1) +
          printResult(com) +
          "Player wins by Black Jack! Game restarts";
      }
      // Condition when only dealer has black jack
      else {
        myOutputValue =
          printResult(p1) +
          printResult(com) +
          "Dealer wins by Black Jack! Game restarts";
      }
      currentGameMode = START;
    }

    // Condition where neither player nor dealer has black jack
    // ask player to input 'hit' or 'stand'
    else {
      myOutputValue = myOutputValue =
        printResult(p1) +
        printResult(com) +
        'There are no Black Jacks. <br>Please input "hit" or "stand".';

      // update gameMode
      currentGameMode = HIT_OR_STAND;
    }

    // return message
    return myOutputValue;
  }

  if (currentGameMode == HIT_OR_STAND) {
    // Condition where player inputs 'hit'
    if (input == "hit") {
      drawCard(p1);
      myOutputValue =
        printResult(p1) +
        printResult(com) +
        'You drew another card. <br>Please input "hit" or "stand".';
    }

    // Condition where player inputs 'stand'
    else if (input == "stand") {
      // Calculate hands
      PlayerHandsScore(p1);
      PlayerHandsScore(com);

      // Dealer's hit or stand logic
      while (com.cardsPoints < 18) {
        drawCard(com);
        PlayerHandsScore(com);
      }

      // Conditions for tied game
      if (
        p1.cardsPoints == com.cardsPoints ||
        (p1.cardsPoints > 21 && com.cardsPoints > 21)
      ) {
        myOutputValue = printResult(p1) + printResult(com) + "Its a Tie!";
      }

      // Conditions for player win
      else if (
        (p1.cardsPoints > com.cardsPoints && p1.cardsPoints <= 21) ||
        (p1.cardsPoints <= 21 && com.cardsPoints > 21)
      ) {
        updateScore(p1);
        image = '<img src="./img/fist-bump-otter.gif" />';
        myOutputValue =
          printResult(p1) + printResult(com) + "<br>Player wins!" + image;
      }

      // Dealer wins when above two conditions are not met
      else {
        updateScore(com);
        image = '<img src="./img/otters-sad.jfif" />';
        myOutputValue =
          printResult(p1) + printResult(com) + "<br>Dealer wins!<br>" + image;
      }
      //Game restarts
      currentGameMode = START;
    }

    // Input validation when player inputs anything outside of 'hit' or 'stand'
    else {
      myOutputValue = 'wrong input... only "hit" or "stand" are valid.';
    }

    // return output message
    return myOutputValue;
  }

  return myOutputValue;
};
