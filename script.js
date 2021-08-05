var HIT = "hit";
var STAND = "stand";
var input = HIT;

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

      if (rankCounter == 1) {
        cardName = "ace";
        rankCounter = 1 || 11;
      } else if (rankCounter == 11) {
        cardName = "jack";
        rankCounter = 10;
      } else if (rankCounter == 12) {
        cardName = "queen";
        rankCounter = 10;
      } else if (cardName == 13) {
        cardName = "king";
        rankCounter = 10;
      }

      var card = {
        name: cardName,
        suit: currSuit,
        rank: rankCounter,
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

var getWinningMsg = function (outputOfPlayersCards) {
  if (playerCardSum == 21) {
    return (
      outputOfPlayersCards + "<br> Congrats, you got a blackjack! You win!"
    );
  }
  if (playerCardSum > dealerCardSum) {
    return (
      "Player, you won against computer with the scores of " +
      playerCardSum +
      " to " +
      dealerCardSum
    );
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

  // create var to hold winning output message
  var winningMsg = getWinningMsg(playerCardSum, dealerCardSum);
  console.log(winningMsg);

  // update value of player card sum and dealer card sum to the current sum
  playerCardSum = playerCard[0].rank + playerCard[1].rank;
  dealerCardSum = dealerCard[0].rank + dealerCard[1].rank;

  console.log(playerCardSum);
  console.log(dealerCardSum);

  //  check if player cards total up to 21
  // if it totals up to 21, player wins. else, ask the player to choose 'hit' or 'stay'
  if (playerCardSum == 21) {
    myOutputValue = winningMsg;
  } else {
    myOutputValue = myOutputValue + ". <br> Please choose between hit or stay.";
  }

  // if player choose 'hit', deal another card.
  // if it totals up to 21, player wins.
  // if it totals up to > 21, player 'bust'.
  if (input == HIT) {
    dealCards(shuffledDeck);

    myOutputValue =
      "You just draw a " +
      playerCard[2].name +
      " of " +
      playerCard[2].suit +
      ". <br> " +
      outputOfPlayersCards +
      ", " +
      playerCard[2].name +
      " of " +
      playerCard[2].suit +
      ". ";

    // update plater curr card sum
    playerCardSum = playerCardSum + playerCard[2].rank;
    console.log(playerCardSum);

    if (playerCardSum == 21) {
      return winningMsg;
    } else if (playerCardSum > 21) {
      return myOutputValue + " <br> Oh no, your cards exceed 21. Busted!";
    } else if (playerCardSum < 21) {
      if (playerCardSum > dealerCardSum) {
        return winningMsg;
      }
      return (
        "Player, you lost against computer with the scores of " +
        dealerCardSum +
        " to " +
        playerCardSum
      );
    }
  }

  // if the player choose stand, open dealer's closed card.
  if (input == STAND) {
    // if dealer card sum >= 17, compare player and dealer cards.
    if (dealerCardSum >= 17) {
      // compare player's cards sum with dealer's cards sum
      if (playerCardSum > dealerCardSum) {
        return winningMsg;
      } else {
        return (
          "Player, you lost against computer with the scores of " +
          dealerCardSum +
          " to " +
          playerCardSum
        );
      }
    }
    // if dealer card sum <= 16, deal another card for dealer.
    if (dealerCardSum <= 16) {
      myOutputValue =
        "Computer's second card is " +
        dealerCard[1].name +
        " of " +
        dealerCard[1].suit;

      dealCards(shuffledDeck);

      // update dealer card sum
      dealerCardSum = dealerCardSum + dealerCard[3].rank;

      // if dealer card sum == 21, player loses.
      if (dealerCardSum == 21) {
        myOutputValue = myOutputValue + "Dealer card equals to 21. You lost!";
      }
      // if dealer 'bust', player wins.
      if (dealerCardSum > 21) {
        myOutputValue = myOutputValue + "Dealer busted! Congrats, you win.";
      }
    }
  }
  return myOutputValue;
};
