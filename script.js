var drawnCard = [];
var shuffledDeck = [];
var turn = "player";
var playerCards;
var computerCards;
var playerSum;
var computerSum;
var sumWhenAceIsEleven;

var main = function (input) {
  // starts with player's turn
  if (turn == "player") {
    // when input is blank, draw 2 cards for player
    if (input == "") {
      var deck = makeDeck();
      // deck only reshuffles if game ends and return back to player
      shuffledDeck = shuffleCards(deck);
      console.log("cards are shuffled");
      playerCards = drawnCards();
      myOutputValue = `Player draws: ${playerCards}`;
    }
    // if player choose to hit, draw a card & show results if it is > 21
    if (input == "hit") {
      hitDrawCard();
      var playerHitCounter = 2;
      while (playerHitCounter < drawnCard.length) {
        if (playerSum <= 21) {
          myOutputValue = `You draw: ${drawnCard[playerHitCounter].name} of ${
            drawnCard[playerHitCounter].suit
          }. ${calSumOfCards()}. <br>
        Enter 'hit' to draw cards or 'stand' to see results.`;
        } else {
          myOutputValue = `You draw: ${drawnCard[playerHitCounter].name} of ${
            drawnCard[playerHitCounter].suit
          }. ${calSumOfCards()} ${resultsBurst()}.`;
        }

        playerHitCounter += 1;
      }
    }
    // when player choose to stand, change turn to computer
    if (input == "stand") {
      turn = "computer";
    }
  }
  // when it is computer's turn, draw 2 cards & play game
  if (turn == "computer") {
    computerCards = drawnCards();
    myOutputValue = `Computer draws: ${computerCards}`;
    // change turn back to player so that the game restarts
    turn = "player";
  }

  return myOutputValue;
};

// function to draw 1 card
var hitDrawCard = function () {
  drawnCard.push(shuffledDeck.pop());
  console.log(drawnCard);
  calSumOfCards();
  return drawnCard;
};

var calSumOfCards = function () {
  // converts all picture cards to rank = 10
  var drawnCardCounter = 0;
  while (drawnCardCounter < drawnCard.length) {
    convertPicRank();
    convertAceRank();

    drawnCardCounter += 1;
  }

  // calculate total sum of cards using new value of rank
  function rank(value) {
    return value.rank;
  }
  function sum(prev, next) {
    return prev + next;
  }
  sumOfCards = drawnCard.map(rank).reduce(sum);
  console.log(sumOfCards);

  // // cal sum when rank of ace is 11
  // sumWhenAceIsEleven = 10 + sumOfCards;
  // console.log(`sum when ace is 11 = ${sumWhenAceIsEleven}`);

  // assign value of sum according to their turn
  if (turn == "player") {
    playerSum = sumOfCards;
    return `Your sum is now ${playerSum}`;
  } else if (turn == "computer") {
    computerSum = sumOfCards;
    return `Your sum is now ${computerSum}`;
  }
};

// function to convert all picture cards to rank = 10
var convertPicRank = function () {
  var convertCounter = 0;
  while (convertCounter < drawnCard.length) {
    if (drawnCard[convertCounter].name == "jack") {
      cardRankIndex = drawnCard.findIndex((obj) => obj.name == "jack");
      drawnCard[cardRankIndex].rank = 10;
    }
    if (drawnCard[convertCounter].name == "queen") {
      cardRankIndex = drawnCard.findIndex((obj) => obj.name == "queen");
      drawnCard[cardRankIndex].rank = 10;
    }
    if (drawnCard[convertCounter].name == "king") {
      cardRankIndex = drawnCard.findIndex((obj) => obj.name == "king");
      drawnCard[cardRankIndex].rank = 10;
    }
    convertCounter += 1;
  }
};

var convertAceRank = function () {
  var aceCounter = 0;
  while (aceCounter < drawnCard.length) {
    if (drawnCard[aceCounter].name == "ace") {
      // cal sum when rank of ace is 11
      sumWhenAceIsEleven = 10 + sumOfCards;
      console.log(`sum when ace is 11 = ${sumWhenAceIsEleven}`);
      // if ace is 11 & sum is < 21, assign value of 11 to ace
      if (sumWhenAceIsEleven < 21) {
        cardRankIndex = drawnCard.findIndex((obj) => obj.name == "ace");
        drawnCard[cardRankIndex].rank = 11;
      }
      // if ace is 11 & sum is > 21, assigned value of 1 to ace
      if (sumWhenAceIsEleven > 21) {
        cardRankIndex = drawnCard.findIndex((obj) => obj.name == "ace");
        drawnCard[cardRankIndex].rank = 1;
      }
    }
    aceCounter += 1;
  }
};

var drawnCards = function () {
  drawnCard = [];

  // draw initial 2 cards
  var cardsCounter = 0;
  while (cardsCounter < 2) {
    drawnCard.push(shuffledDeck.pop());
    cardsCounter += 1;
  }
  // 2 initial drawn cards will be assigned to player
  if (turn == "player") {
    console.log(
      `player: ${drawnCard[0].name} of ${drawnCard[0].suit} and ${drawnCard[1].name} of ${drawnCard[1].suit}. `
    );
    calSumOfCards();
    // check for player blackjack
    if (
      drawnCard.length == 2 &&
      (drawnCard[0].name == "ace" || drawnCard[1].name == "ace") &&
      (drawnCard[0].rank == 10 || drawnCard[1].rank == 10)
    ) {
      return "You got a blackjack! You won!";
    }
    // if no blackjack, ask if player wants to hit or stand.
    else {
      myOutputValue = `${drawnCard[0].name} of ${drawnCard[0].suit} and ${
        drawnCard[1].name
      } of ${drawnCard[1].suit}. ${calSumOfCards()}. <br>
    Enter 'hit' to draw cards or 'stand' to see results.`;
    }
  }
  // 2 initial drawn cards will be assigned to computer
  if (turn == "computer") {
    console.log(
      `computer: ${drawnCard[0].name} of ${drawnCard[0].suit} and ${drawnCard[1].name} of ${drawnCard[1].suit}.`
    );
    calSumOfCards();
    // check for computer blackjack
    if (
      drawnCard.length == 2 &&
      (drawnCard[0].name == "ace" || drawnCard[1].name == "ace") &&
      (drawnCard[0].rank == 10 || drawnCard[1].rank == 10)
    ) {
      return "Computer got a blackjack! Computer won!";
    }
    // if no blackjack, show the 2 cards that computer draw at the beginning
    else {
      myOutputValue = `${drawnCard[0].name} of ${drawnCard[0].suit} and ${drawnCard[1].name} of ${drawnCard[1].suit}. <br>`;
    }

    // while loop to continuously draw cards when computersum is < 17
    var computerCounter = 0;
    while (computerCounter < drawnCard.length) {
      // calSumOfCards();
      if (computerSum < 17) {
        hitDrawCard();
      }
      computerCounter += 1;
    }
    // show how many additional cards computer automatically draw + results of game
    var numOfCardsDrawn = drawnCard.length - 2;
    myOutputValue =
      myOutputValue +
      ` Computer continues to draw ${numOfCardsDrawn} cards. <br><br> ${resultsOfGame()} `;
  }

  return myOutputValue;
};

// use total sum of game to calculate who is winning
var resultsOfGame = function () {
  if (computerSum > 21) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br>
    ${resultsBurst()}`;
  }

  if (playerSum > computerSum) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br>
    Player wins!`;
  }

  if (playerSum < computerSum) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br>
    Computer wins!`;
  }

  if ((playerSum = computerSum)) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br>
    It's a tie!`;
  }

  if (playerSum == 21) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br>
    Player wins!`;
  }

  if (computerSum == 21) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br>
    Computer wins!`;
  }
};

// when sum is more than 21
var resultsBurst = function () {
  if (playerSum > 21) {
    return `<br>Player has lost! Game Over! <br>
    Click 'Submit' to restart the game`;
  }

  if (computerSum > 21) {
    return `<br>Computer has lost! Game Over<br>
    Click 'Submit' to restart the game`;
  }
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
