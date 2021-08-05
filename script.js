var HIT = "hit";
var STAND = "stand";

var deck = [];

// create an array to store players' cards
var playerCard = [];
var dealerCard = [];

// create an empty var to hold players' cards sum
var playerCardSum = 0;
var dealerCardSum = 0;

// create a function to create deck of cards.
var createDeck = function () {
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var rank = rankCounter;

      if (rankCounter == 1) {
        cardName = "ace";
        rank = 1 || 11;
      } else if (rankCounter == 11) {
        cardName = "jack";
        rank = 10;
      } else if (rankCounter == 12) {
        cardName = "queen";
        rank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        rank = 10;
      }

      var card = {
        name: cardName,
        suit: currSuit,
        rank: rank,
      };

      deck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// shuffle the deck
var shuffleDeck = function () {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(deck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = deck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = deck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return deck;
};

// create a function to deal cards.
var dealCards = function (deck) {
  playerChosenCard = deck.pop();
  dealerChosenCard = deck.pop();

  // add the top card to the respective array
  playerCard.push(playerChosenCard);
  console.log(playerChosenCard);

  dealerCard.push(dealerChosenCard);
  console.log(dealerChosenCard);
};

var getWinningMsg = function (playerCardSum, dealerCardSum) {
  if (playerCardSum == 21) {
    return "Congrats, you got a blackjack! You win!";
  }
  if (playerCardSum > dealerCardSum) {
    return (
      "Player, you won against computer with the scores of " +
      playerCardSum +
      " to " +
      dealerCardSum
    );
  }
  if (dealerCardSum > 21) {
    return "Dealer busted! Congrats, you won!";
  }
};

var getLosingMsg = function (playerCardSum, dealerCardSum) {
  if (dealerCardSum == 21) {
    return "Dealer got a blackjack! Unfortunately, you lose :(";
  }
  if (dealerCardSum > playerCardSum) {
    return (
      "Player, you lost against computer with the scores of " +
      playerCardSum +
      " to " +
      dealerCardSum +
      ". <br> Such a shame."
    );
  }
  if (playerCardSum > 21) {
    return "Whoops, you busted!";
  }
};

var main = function (input) {
  var cardDeck = createDeck();

  // shuffle card
  var shuffledDeck = shuffleDeck(cardDeck);

  // deal the cards two times
  var numOfDeals = 0;
  while (numOfDeals < 2) {
    dealCards(shuffledDeck);
    numOfDeals += 1;
  }

  // list players' cards
  var outputOfPlayersCards =
    "Your cards are " +
    playerCard[0].name +
    " of " +
    playerCard[0].suit +
    " and " +
    playerCard[1].name +
    " of " +
    playerCard[1].suit;

  // create default output value.
  var myOutputValue =
    outputOfPlayersCards +
    ". <br> Computer's card is " +
    dealerCard[0].name +
    " of " +
    dealerCard[0].suit;

  // update value of player card sum and dealer card sum
  playerCardSum = playerCard[0].rank + playerCard[1].rank;
  console.log("player card sum is " + playerCardSum);
  dealerCardSum = dealerCard[0].rank + dealerCard[1].rank;
  console.log("dealer card sum is " + dealerCardSum);

  // store the winning and losing message
  var winningMsg = getWinningMsg(playerCardSum, dealerCardSum);
  var losingMsg = getLosingMsg(playerCardSum, dealerCardSum);

  // check if player card totals to 21
  // if playerCardSum == 21, player wins. Else, player choose 'hit' or 'stand'
  if (playerCardSum == 21) {
    myOutputValue = outputOfPlayersCards + " <br> " + winningMsg;
  } else {
    myOutputValue =
      myOutputValue + ". <br> Please choose between hit or stand.";
  }

  // if player choose 'stand', open dealer's closed card.
  if (input == STAND) {
    var outputOfDealersCards =
      "Dealer's second card is " +
      dealerCard[1].name +
      " of " +
      dealerCard[1].suit +
      ".";

    // if dealerCardSum == 21, player looses.
    if (dealerCardSum == 21) {
      return outputOfDealersCards + " <br> " + losingMsg + ".";
    }
    // else if dealerCardSum > 21, player wins.
    else if (dealerCardSum > 21) {
      return outputOfDealersCards + " <br> " + winningMsg + ".";
    }
    // else compare playerCardSum and dealerCardSum
    else {
      if (playerCardSum > dealerCardSum) {
        return outputOfDealersCards + " <br> " + winningMsg + ".";
      }
      if (dealerCardSum > playerCardSum) {
        return outputOfDealersCards + " <br> " + losingMsg + ".";
      }
    }
  }

  // if player choose 'hit', deal another card.
  if (input == HIT) {
    dealCards(shuffledDeck);

    // update player card sum
    playerCardSum = playerCardSum + playerCard[2].rank;
    console.log(playerCardSum);

    // update winning message and losing message
    winningMsg = getWinningMsg(playerCardSum, dealerCardSum);
    losingMsg = getLosingMsg(playerCardSum, dealerCardSum);

    myOutputValue =
      "Player, you just draw a " +
      playerCard[2].name +
      " of " +
      playerCard[2].suit +
      ". <br> " +
      outputOfPlayersCards;

    outputOfPlayersCards =
      myOutputValue +
      ", and " +
      playerCard[2].name +
      " of " +
      playerCard[2].suit +
      ".";

    // check winning condition
    if (playerCardSum == 21) {
      myOutputValue = outputOfPlayersCards + " <br> " + winningMsg;
      console.log(winningMsg);
    }
    if (playerCardSum > 21) {
      myOutputValue = outputOfPlayersCards + "<br> " + losingMsg;
      console.log(losingMsg);
    }
    if (playerCardSum < 21) {
      if (playerCardSum > dealerCardSum) {
        myOutputValue = outputOfPlayersCards + "<br>" + winningMsg + ".";
        console.log(winningMsg);
      }
      if (playerCardSum < dealerCardSum) {
        myOutputValue = outputOfPlayersCards + " <br> " + losingMsg + ".";
      }
    }
  }
  return myOutputValue;
};
