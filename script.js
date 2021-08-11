//Copied make deck function
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

// Copied random index generator
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Copied shuffle deck function
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

// Copied initialisation of the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

//Inital mode
var gameMode = `Gamestart`;

// Blackjack gameplay
// Need global variable for player and computer hand in the form of an array and a function to deal cards
var playerHand = [];
var computerHand = [];
// var cardDeal = function (hand) {
//   hand.push(deck.pop());
// };
// Need to calculate player and computer's points
var playerPoints = 0;
var computerPoints = 0;

// Ace
var numOfAce = 0;

var pointCalculation = function (hand) {
  var totalPoints = 0;
  // To calculate each card's points starting from index 0, 1 ...
  for (let i = 0; i < hand.length; i += 1) {
    var cardValue = hand[i];
    // 2 to 10
    if (cardValue.rank >= 2 && cardValue.rank <= 10) {
      totalPoints += cardValue.name;
    }
    // jack queen king
    if (cardValue.rank >= 11 && cardValue.rank <= 13) {
      totalPoints += 10;
    }
    // Ace(11)
    else if (cardValue.rank == 1) {
      totalPoints += 11;
      numOfAce += 1;
      if (playerHand.length > 2) {
        totalPoints -= 10;
      }
    }
  }
  return totalPoints;
};

// Need global variable for win counts
var playerWins = 0;
var computerWins = 0;

// Gameplay
var main = function (input) {
  var myOutputValue = ``;
  var shuffledDeck = shuffleCards(deck);

  if (gameMode == `Gamestart`) {
    playerHand = [];
    playerPoints = 0;
    playerWins = 0;
    computerHand = [];
    computerPoints = 0;
    computerWins = 0;

    for (i = 0; i < 2; i++) {
      playerHand.push(shuffledDeck.pop());
      computerHand.push(shuffledDeck.pop());
    }
    console.log(playerHand, `player's hand`);
    console.log(computerHand, `computer;s hand`);

    playerPoints = pointCalculation(playerHand);
    computerPoints = pointCalculation(computerHand);

    console.log(playerPoints, `player's points`);
    console.log(computerPoints, `computer's points`);

    if (playerPoints == 21 && computerPoints != 21) {
      myOutputValue = `You drew ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit} You got ${playerPoints}, you win! <br><br>Press submit to play again!`;
      return myOutputValue;
    }
    gameMode = `Hit or Stand`;
    myOutputValue =
      myOutputValue = `You drew ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit} You got ${playerPoints}, you have to hit or stand!`;
    return myOutputValue;
  }
  if (gameMode == `Hit or Stand`) {
    myOutputValue = `Please enter hit or stand<br><br>Current point is ${playerPoints}.`;
    // Hit
    if (input == `hit`) {
      var newPlayercards = `You have drawn `;
      playerHand.push(shuffledDeck.pop());
      console.log(playerHand, `Player's hand after hit`);
      playerPoints = pointCalculation(playerHand);
      console.log(playerPoints, `player's point after hit`);

      for (j = 0; j < playerHand.length; j++) {
        newPlayercards += `${playerHand[j].name} of ${playerHand[j].suit} `;
      }
      if (playerPoints > 21) {
        gameMode = `Gamestart`;
        return `You lose!!! ${newPlayercards}, your points are ${playerPoints}.<br><br>Press submit to play again!`;
      }
      myOutputValue = `${newPlayercards}, your points are ${playerPoints}.<br><br>Type in hit or stand.`;
    }
    if (input == `stand`) {
      for (k = 0; k < 5; k++) {
        if (computerPoints < 17) {
          computerHand.push(shuffledDeck.pop());
          console.log(computerHand, `Computer's hand after it draws card`);
          computerPoints = pointCalculation(computerHand);
          console.log(computerPoints, `Computer's points after it draws`);
          if (computerPoints > 21) {
            gameMode = `Gamestart`;
            myOutputValue = `You win! You got ${playerPoints} and computer got ${computerPoints}.
        <br><br>Press submit to play again`;
            return myOutputValue;
          }
        }
      }
      if (playerPoints == 21 || playerPoints > computerPoints) {
        myOutputValue = `You win! You got ${playerPoints} and computer got ${computerPoints}.
        <br><br>Press submit to play again`;
        gameMode = `Gamestart`;
      } else {
        myOutputValue = `You lose! You got ${playerPoints} and computer got ${computerPoints}. <br><br>Press submit to play again!`;
        gameMode = `Gamestart`;

        return myOutputValue;
      }
    }

    return myOutputValue;
  }
};
