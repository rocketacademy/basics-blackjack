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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// // Initialise the card deck representation as an array of objects
// var deck = makeDeck();

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

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

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
// console.log(shuffledDeck);
var shuffledDeck = shuffleCards(makeDeck());

// var playerDraw = function (){

// var firstCard =

// }

//Card calculator
var calculateScore = function (drawnDeck) {
  var score = 0;

  console.log(drawnDeck);
  score += drawnDeck[0].rank;
  for (var i = 1; i < drawnDeck.length; i++) {
    //Convert rank of Ace to 11 if less than 10
    if (score < 10 && drawnDeck[i].name == "ace") {
      console.log("ace");
      drawnDeck[i].rank = 11;
    }
    score += drawnDeck[i].rank;
    console.log(score);
  }

  return score;
};

//Ace value

// var checkForAce = function (drawnDeck) {
//   var score = 0;

//   for (i = 0; i < drawnDeck.length; i++) {
//     if (score > 10 && drawnDeck[i].name == "ace") {
//       drawnDeck[i].rank = 1;
//     }
//     score += drawnDeck[i].rank;
//   }
//   console.log(score);
//   return score;
// };

//cardDrawn Statement

var cardDrawnsStatement = function (person, drawnDeck) {
  var statement = `${person} has drawn`;
  console.log(statement);
  for (i = 0; i < drawnDeck.length; i++) {
    if (i != drawnDeck.length - 1) {
      statement += ` ${drawnDeck[i].name} of ${drawnDeck[i].suit} and`;
    } else statement += ` ${drawnDeck[i].name} of ${drawnDeck[i].suit}.`;
  }
  console.log(statement);
  return statement;
};

//convert Jack, Queen, King to rank 10
var convertValues = function (drawnDeck) {
  for (i = 0; i < drawnDeck.length; i++) {
    if (
      drawnDeck[i].name == "king" ||
      drawnDeck[i].name == "queen" ||
      drawnDeck[i].name == "jack"
    ) {
      drawnDeck[i].rank = 10;
    }
  }
  return drawnDeck;
};

//Sort the rank according to order and put Ace at the back
var selectionSort = function (drawnCards) {
  //Sort the score according to DESC order

  for (var i = 0; i < drawnCards.length; i++) {
    //set min to the current iteration of i
    var min = i;
    for (var j = i + 1; j < drawnCards.length; j++) {
      if (drawnCards[j].rank > drawnCards[min].rank) {
        min = j;
      }
    }
    var temp = drawnCards[i];
    drawnCards[i] = drawnCards[min];
    drawnCards[min] = temp;
  }

  return drawnCards;
};

//Global Variables
var allPlayerCards = [];
var allComputerCards = [];
var gameMode = "round1";
var computerCard = [];
var computerScore = 0;
var playerCard = [];
var playerScore = 0;
var orderAllComputerCards = [];

var main = function (input) {
  var counter = 0;

  var output = "";
  var playerStatement = "";
  var computerStatement = "";
  if (gameMode == "round1") {
    while (counter < 2) {
      playerCard = shuffledDeck.pop();
      allPlayerCards.push(playerCard);
      computerCard = shuffledDeck.pop();
      allComputerCards.push(computerCard);
      counter++;
    }
    // convert Jack, Queen, King to rank 10
    convertValues(allPlayerCards);
    convertValues(allComputerCards);
    playerScore = calculateScore(allPlayerCards);
    computerScore = calculateScore(allComputerCards);

    //cards drawn statement
    playerStatement = cardDrawnsStatement("Player", allPlayerCards);
    computerStatement = cardDrawnsStatement("Dealer", allComputerCards);

    output = `${playerStatement} Your score is ${playerScore}.
    <br> Do you want to hit or stand? <br><br> Hit to have additional cards added to your current hand.<br> Stand if you've burst or finalize your hand!`;
    gameMode = "decideMove";

    return output;
  }
  // hit or stand action
  if (gameMode == "decideMove") {
    if (input == "hit") {
      playerCard = shuffledDeck.pop();

      allPlayerCards.push(playerCard);
      convertValues(allPlayerCards);

      var orderAllPlayerCards = [...allPlayerCards];
      //Sort rank in Desc and assign Ace to last index
      selectionSort(orderAllPlayerCards);

      console.log(orderAllPlayerCards);
      playerScore = calculateScore(orderAllPlayerCards);

      console.log(playerScore);
      //For deciding whether computer should hit or stand
      if (computerScore < 17) {
        computerCard = shuffledDeck.pop();

        allComputerCards.push(computerCard);
        convertValues(allComputerCards);

        orderAllComputerCards = [...allComputerCards];
        selectionSort(orderAllComputerCards);
        computerScore = calculateScore(orderAllComputerCards);
      }
      playerStatement = cardDrawnsStatement("Player", orderAllPlayerCards);
      computerStatement = cardDrawnsStatement("Dealer", orderAllComputerCards);
      output = `${playerStatement} Your score is ${playerScore}.
    <br> Do you want to hit or stand? <br><br> Hit to have additional cards added to your current hand.<br> Stand if you've burst or finalize your hand!`;
    }

    if (input == "stand") {
      //Computer wins condition
      if (computerScore > playerScore || playerScore > 21) {
        output = `Computer wins. Player score is ${playerScore} while computer score is ${computerScore}.<br><br> ${playerStatement}<br> ${computerStatement}`;
      } //Player wins condition
      else if (playerScore > computerScore || playerScore == computerScore) {
        console.log(orderAllPlayerCards);
        console.log(orderAllComputerCards);
        output = `Player wins. Player score is ${playerScore} while computer score is ${computerScore}.<br><br> ${playerStatement}<br> ${computerStatement}`;
      }
      //reset mode
      gameMode = "round1";
    }

    return output;
  }
};
