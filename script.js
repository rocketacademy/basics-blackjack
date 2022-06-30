//RA basics project: blackjack!
//base

state = `dealing cards`;
var playerHand = [];
var comHand = [];
var standFlag = false;

var main = function (input) {
  var message = ``;
  var deck = makeDeck();
  shuffleCards(deck);
  if (state == `dealing cards`) {
    for (i = 0; i < 2; i += 1) {
      playerHand.push(deck.pop());
      comHand.push(deck.pop());
    }

    // had to push ace here instead of in countscore function because idk how to return the array properly after ace is pushed
    //need to add something to check double ace here
    playerHand = pushAceToLastIndex(playerHand);
    comHand = pushAceToLastIndex(comHand);
    var playerTotal = countScore(playerHand);
    var comTotal = countScore(comHand);
    console.log(`Player and Com score respectively: `, playerTotal, comTotal);
    message = getMessage(playerHand, playerTotal, comHand, comTotal);
    if (playerTotal < 21 && comTotal < 21) {
      state = `hit or stand`;
    }
    return message;
  }
  if (state == `hit or stand`) {
    var playerTotal = countScore(playerHand);
    var comTotal = countScore(comHand);
    if (input == `hit`) {
      playerHand.push(deck.pop());
      playerHand = pushAceToLastIndex(playerHand);
      playerTotal = countScore(playerHand);
      message = getMessage(playerHand, playerTotal, comHand, comTotal);
      return message;
    }
    if (input == `stand`) {
      standFlag = true;

      var comDrawNum = 0;
      if (comTotal < 17) {
        while (comTotal < 17) {
          comHand.push(deck.pop());

          comTotal = countScore(comHand);

          comDrawNum += 1;
        }
      }
      message =
        getMessage(playerHand, playerTotal, comHand, comTotal) +
        `Com has drawn ${comDrawNum} card(s).`;

      message += `Press submit to open all cards.`;
      state = `determine winner`;
      return message;
    }
  }
  if (state == `determine winner`) {
    var playerTotal = countScore(playerHand);
    var comTotal = countScore(comHand);
    message = getMessage(playerHand, playerTotal, comHand, comTotal);
    if (playerTotal > 21 && comTotal > 21) {
      message += `Both you and computer busted!`;
    } else if (playerTotal > 21) {
      message += `<br>` + `You busted!`;
    } else if (comTotal > 21) {
      message += `<br>` + `Computer busted!`;
    } else {
      if (playerTotal > comTotal) {
        message += `<br>` + `You won!`;
      } else if (comTotal > playerTotal) {
        message += `<br>` + `You lost!`;
      } else {
        message += `<br>` + `It's a draw!`;
      }
    }
    state = `dealing cards`;
    return message;
  }
};
//generates a deck array
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

// Get a random index ranging from 0 (inclusive) to max (exclusive)
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

//checks for special cards first, reassigns values, then counts score
var countScore = function (array) {
  var totalScore = 0;
  for (i = 0; i < array.length; i += 1) {
    if (
      array[i].name == `king` ||
      array[i].name == `queen` ||
      array[i].name == `jack`
    ) {
      array[i].rank = 10;
    }
    if (array[i].name == `ace`) {
      if (totalScore + 11 > 21) {
        array[i].rank = 1;
      } else {
        array[i].rank = 11;
      }
    }
    totalScore += array[i].rank;
  }
  return totalScore;
};

//checks for Ace card and pushes it to the last index for deciding 1 or 11 value based on final total.
var pushAceToLastIndex = function (array) {
  for (i = 0; i < array.length; i += 1) {
    if (array[i].name == `ace`) {
      var aceCard = array.splice(i, 1);
      console.log(`Acecard array, `, aceCard);
      array = array.concat(aceCard);
      console.log(`push ace was used. New hand: `, array);
    }
  }
  return array;
};

//print the cards in each player's hand
var showHand = function (array) {
  var message = ``;
  var i = 0;
  while (i < array.length) {
    message =
      message + `<br>` + `${i + 1}) ` + `${array[i].name} of ${array[i].suit}`;
    i += 1;
  }
  return message;
};

//print message for respective outcomes
var getMessage = function (playerHand, playerTotal, comHand, comTotal) {
  var numCardsPlayerHand = playerHand.length;
  var numCardsComHand = comHand.length;
  var message =
    `Player's cards are: ${showHand(playerHand)}` +
    `<br>` +
    `Player total score is ${playerTotal}` +
    `<br>` +
    `<br>` +
    `Computer has ${numCardsComHand} cards.` +
    `<br>` +
    `<br>`;
  if (state == `dealing cards`) {
    if (playerTotal == 21 && comTotal == 21) {
      message += `Both you and computer got blackjack! It's a tie!`;
      resetHands();
    } else if (playerTotal == 21 && comTotal != 21) {
      message += `Player got blackjack! Player wins!`;
      resetHands();
    } else if (playerTotal != 21 && comTotal == 21) {
      message += `Computer got blackjack! Computer wins!`;
      resetHands();
    } else {
      if (playerTotal <= 21) {
        message += `Type hit or stand and press submit.`;
      } else {
        message += `<br>` + `You busted!`;
      }
    }
  }
  if (state == `hit or stand`) {
    if (standFlag == false) {
      if (playerTotal > 21) {
        message += `You are already above 21! Type stand and press submit.`;
      }
      if (playerTotal <= 21) {
        message += `Type hit or stand and press submit.`;
      }
    }
  }
  if (state == `determine winner`) {
    message +=
      `Computer's cards are: ${showHand(comHand)}` +
      `<br>` +
      `Computer total score is ${comTotal}`;
  }
  return message;
};

//determines winner based on open cards
var determineWinner = function (comTotal, playerTotal, message) {
  message += `You won!`;
  if (comTotal == playerTotal) {
    message += `It's a draw!`;
  }
  if (comTotal > playerTotal) {
    message += `You lost!`;
  }
  return message;
};

//resets player and com hands to empty array
var resetHands = function () {
  playerHand = [];
  comHand = [];
};
