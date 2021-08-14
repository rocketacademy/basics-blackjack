// gamemodes:
// get player name & bet
// get initial hand
// player hit or stand
// compare winner

var gameMode = "get player name and bet";
var playerScore = 100;
var newScore = 100;
var scoreCard = [100];
var playerBet = 0;

document.getElementById("output-div").innerHTML =
  "Hi player, what is your name?";

// create card deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♦️", "♣️", "♥️", "♠️"];

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
      var cardRank = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        cardRank = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardRank = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardRank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardRank = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
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

// get random index
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// shuffle deck
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

var shuffledDeck = shuffleCards(makeDeck());

var playerName = "";
var newPcard = [];
var comTotal = 0;
var playerTotal = 0;
var nameStore = [];

// re-initialise player and com card hand after each round
var initCards = function () {
  playerCard = [];
  comCard = [];
  comCard = [shuffledDeck.pop(), shuffledDeck.pop()];
  playerCard = [shuffledDeck.pop(), shuffledDeck.pop()];
  comTotal = comCard[0].rank + comCard[1].rank;
  playerTotal = playerCard[0].rank + playerCard[1].rank;
};

// player draws card
var addCard = function () {
  var newCard = shuffledDeck.pop();
  newPcard = newCard;
  playerCard.push(newCard); // player adds one deck to card
  var getIndex = playerCard.length - 1;
  playerTotal += playerCard[getIndex].rank; // player gets new total points
  aceChange(playerCard);
  return playerTotal;
};

// com draws card
var comAdd = function () {
  comCard.push(shuffledDeck.pop()); // com adds one deck to card
  var getIndex = comCard.length - 1;
  comTotal += comCard[getIndex].rank; // com gets new total points
  aceChange(comCard);
  return comTotal;
};

// account for ace
var aceChange = function (input) {
  if (input.length > 2) {
    for (var i in input) {
      if (input[i].name == "ace") {
        input[i].rank = 1;
        break;
      }
    }
  }
};

// output all player cards for player to view
var outputPlayerCards = function () {
  var counter = 0;
  myOutputValue = `Your hand: <br>`;
  while (counter < playerCard.length) {
    myOutputValue += `${playerCard[counter].name} of ${playerCard[counter].suit} <br>`;
    counter += 1;
  }
  return myOutputValue;
};

// determine winner
var declareWinner = function () {
  if (playerTotal > 21 && comTotal <= 21) {
    var newScore = Number(playerScore) - Number(playerBet);
    scoreCard.push(newScore);
    return `Oops, you busted with a hand of ${playerTotal}! You are now left with a score of ${newScore}. <br>
    Press submit for a new game!`;
  } else if (playerTotal == comTotal) {
    newScore = playerScore;
    scoreCard.push(newScore);
    return `You draw with the dealer's hand of ${comTotal}! Your score: ${playerScore} <br>
    Press submit for a new game!`;
  } else if (playerTotal == 21 && comTotal !== 21) {
    newScore = Number(playerScore) + Number(playerBet) * 1.5;
    scoreCard.push(newScore);
    return `Your hand of ${playerTotal} won! The dealer had a hand of ${comTotal}. Your new score: ${newScore} <br>
    Press submit for a new game!`;
  } else if (comTotal == 21 && playerTotal !== 21) {
    newScore = Number(playerScore) - Number(playerBet);
    scoreCard.push(newScore);
    return `Your hand of ${playerTotal} lost to the dealer's ${comTotal}! You are now left with a score of ${newScore} <br>
    Press submit for a new game!`;
  } else if (playerTotal > comTotal && playerTotal <= 21) {
    newScore = Number(playerScore) + Number(playerBet);
    scoreCard.push(newScore);
    return `Congratulations! Your hand of ${playerTotal} beat the dealer's hand of ${comTotal}! Your score: ${newScore} <br>
    Press submit for a new game!`;
  } else if (playerTotal > 21 && comTotal > 21) {
    newScore = Number(playerScore) - Number(playerBet);
    scoreCard.push(newScore);
    return `Both parties busted! Your hand: ${playerTotal}. Dealer's hand: ${comTotal}. Your score: ${newScore} <br>
    Press submit for a new game!`;
  } else if (playerTotal < comTotal && comTotal > 21) {
    newScore = Number(playerScore) + Number(playerBet);
    scoreCard.push(newScore);
    return `The dealer went bust! Your hand of ${playerTotal} beat the dealer's hand of ${comTotal}! Your score: ${newScore} <br>
    Press submit for a new game!`;
  } else if (playerTotal < comTotal && comTotal <= 21) {
    newScore = Number(playerScore) - Number(playerBet);
    scoreCard.push(newScore);
    return `Your hand of ${playerTotal} lost to the dealer's hand of ${comTotal}! Your score: ${newScore} <br>
    Press submit for a new game!`;
  } else if (playerTotal < 21 && playerCard.length == 5 && comTotal != 21) {
    newScore = Number(playerScore) + Number(playerBet);
    scoreCard.push(newScore);
    return `Congratulations! Your hand of ${playerTotal} beat the dealer's hand of ${comTotal}! Your score: ${newScore} <br>
    Press submit for a new game!`;
  }
};

var main = function (input) {
  // get player name and bet, or stop game based on score
  if (gameMode == "get player name and bet") {
    nameStore.push(input);
    playerScore = scoreCard.pop();
    if (playerScore <= 0) {
      return `Hi ${nameStore[0]}, you have ${playerScore} points for betting. <br>
    Time to stop!`; // stop player from continuing once score <= 0
    }
    gameMode = "get initial hand"; // otw, progress on
    return `Hi ${nameStore[0]}, you have ${playerScore} points for betting. <br>
    How much would you like to bet for this round?`;
  }

  // show initial player hand
  if (gameMode == "get initial hand") {
    initCards();
    playerBet = input;
    gameMode = "player hit or stand";
    var showPlayer = outputPlayerCards();
    return `${nameStore[0]}, you bet ${input}. <br><br>
    ${showPlayer} <br>
    Your total score is ${playerTotal}. Enter y to draw another card, otherwise click submit.`;
  }

  // player adds card, otw com adds
  if (gameMode == "player hit or stand") {
    if (input == "y") {
      addCard();
      var showPlayer = outputPlayerCards();
      return `${nameStore[0]}, you drew a ${newPcard.name} of ${newPcard.suit}. Enter y to draw another card, else click submit to view results. <br><br>
      ${showPlayer} <br>
      Your new score: ${playerTotal} <br>`;
    } else if (input == "") {
      while (comTotal < 17) {
        comAdd();
      }
      gameMode = `compare winner`;
    }
  }

  // output winning or losing condition and revised score
  if (gameMode == "compare winner") {
    var announceWinner = declareWinner(playerTotal, comTotal);
    gameMode = "get player name and bet";
    return announceWinner;
  }
};
