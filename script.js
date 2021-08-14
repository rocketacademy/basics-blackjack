var HIT = "hit";
var STAND = "stand";
var userName = "";
var ASK_USERNAME = "asks for user's name";
var INPUTS_NAME = "input user's name";
var BLACKJACK = "blackjack starts";
var BET_POINTS = "bet points";
var HIT_OR_STAND = "hit or stand";
var GAME_MODE = ASK_USERNAME;

// player starts with 100 points
var playerPoints = 100;
var pointsBet = 0;

// create an array to store deck and players' cards
var deck = [];
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
        rank = 11;
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
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    var randomIndex = getRandomIndex(deck.length);

    var randomCard = deck[randomIndex];

    var currentCard = deck[currentIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }
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

var doesPlayerWin = function (playerCardSum, dealerCardSum) {
  if (
    (playerCardSum <= 21 && playerCardSum > dealerCardSum) ||
    (dealerCardSum > 21 && playerCardSum <= 21) ||
    (playerCardSum == 21 && dealerCardSum !== 21)
  ) {
    return 1;
  }
  if (
    (dealerCardSum <= 21 && dealerCardSum > playerCardSum) ||
    (playerCardSum > 21 && dealerCardSum <= 21) ||
    (dealerCardSum == 21) & (playerCardSum !== 21)
  ) {
    return 2;
  }
  if (
    playerCardSum == dealerCardSum ||
    (playerCardSum > 21 && dealerCardSum > 21)
  ) {
    return 3;
  }
};

var countCurrPoints = function (playerWins, currPoints, betPoints) {
  console.log(currPoints);
  // if player wins, add bet points to current total points
  if (playerWins == 1) {
    currPoints = Number(currPoints) + Number(betPoints);
    // if player looses, lessen the curr points with bet points.
  } else if (playerWins == 2) {
    currPoints = Number(currPoints) - Number(betPoints);
    // else, curr points doesn't change
  } else if (playerWins == 3) {
    currPoints = currPoints;
  }
  return currPoints;
};

var getOutputMsg = function (playerWins, currPoints) {
  console.log(playerWins);
  if (playerWins == 1) {
    return (
      "Congrats player! You win! <br> Your current points is: " + currPoints
    );
  } else if (playerWins == 2) {
    return "Oh no, you lost :( <br> Your current points is: " + currPoints;
  } else if (playerWins == 3) {
    return (
      "There's no winner for this round. <br> Your current points is: " +
      currPoints
    );
  }
};

var cardDeck = [];
var shuffledDeck = [];
var playerWins = 0;
var currPoints = "";
var outputMsg = "";

var main = function (input) {
  if (GAME_MODE == ASK_USERNAME) {
    GAME_MODE = INPUTS_NAME;
    return "Welcome to Blackjack! <br> May I know your name?";
  }
  if (GAME_MODE == INPUTS_NAME) {
    userName = input;
    GAME_MODE = BET_POINTS;
    return (
      "Hi " +
      userName +
      ", nice to meet you! <br> You currently have 100 points. Please enter your bet for this round."
    );
  }
  // player decide how many points they want to bet
  if (GAME_MODE == BET_POINTS) {
    pointsBet = input;
    GAME_MODE = BLACKJACK;
    return (
      userName +
      ", you are betting " +
      pointsBet +
      " points. Now you're set to play. <br> Please hit 'submit' to start playing."
    );
  }
  if (GAME_MODE == BLACKJACK) {
    playerCard = [];
    dealerCard = [];

    cardDeck = createDeck();
    shuffledDeck = shuffleDeck(cardDeck);

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
      ". <br> Dealer's card is " +
      dealerCard[0].name +
      " of " +
      dealerCard[0].suit;

    // update value of player card sum and dealer card sum
    playerCardSum = playerCard[0].rank + playerCard[1].rank;
    console.log("player card sum is " + playerCardSum);

    dealerCardSum = dealerCard[0].rank + dealerCard[1].rank;
    console.log("dealer card sum is " + dealerCardSum);

    // check if player card totals to 21
    // if playerCardSum == 21, player wins. Else, player choose 'hit' or 'stand'
    if (playerCardSum == 21) {
      playerWins = doesPlayerWin(playerCardSum, dealerCardSum);
      currPoints = countCurrPoints(playerWins, playerPoints, pointsBet);
      outputMsg = getOutputMsg(playerWins, currPoints);

      myOutputValue =
        outputOfPlayersCards +
        ". <br> You got a blackjack. You win! <br> Your current points are: " +
        currPoints;
    } else {
      myOutputValue =
        myOutputValue + ". <br> Please choose between hit or stand.";
    }
    GAME_MODE = HIT_OR_STAND;
  }
  if (GAME_MODE == HIT_OR_STAND) {
    // if player choose 'stand', open dealer's closed card.
    if (input == STAND) {
      myOutputValue =
        "Player, you card sum is " +
        playerCardSum +
        ". <br> Dealer's card sum is " +
        dealerCardSum +
        ". ";

      if (dealerCardSum >= 17) {
        playerWins = doesPlayerWin(playerCardSum, dealerCardSum);
        currPoints = countCurrPoints(playerWins, playerPoints, pointsBet);
        outputMsg = getOutputMsg(playerWins, currPoints);

        // check winning condition
        if (doesPlayerWin(playerCardSum, dealerCardSum)) {
          playerPoints += pointsBet;
          return myOutputValue + "<br>" + outputMsg;
        } else if (!doesPlayerWin(playerCardSum, dealerCardSum)) {
          playerPoints -= pointsBet;
          return myOutputValue + "<br>" + outputMsg;
        }
        // if dealer card sum is <= 16, dealer draw
        if (dealerCardSum <= 16) {
          dealCards(shuffledDeck);

          dealerCardSum = dealerCardSum + dealerCard[2].rank;

          playerWins = doesPlayerWin(playerCardSum, dealerCardSum);
          currPoints = countCurrPoints(playerWins, playerPoints, pointsBet);
          outputMsg = getOutputMsg(playerWins, currPoints);

          myOutputValue =
            "Player, you card sum is " +
            playerCardSum +
            ". <br> Dealer's card sum is " +
            dealerCardSum +
            ". ";

          // check winning condition
          if (doesPlayerWin(playerCardSum, dealerCardSum)) {
            playerPoints += pointsBet;
            return myOutputValue + "<br>" + outputMsg;
          } else if (!doesPlayerWin(playerCardSum, dealerCardSum)) {
            playerPoints -= pointsBet;
            return myOutputValue + "<br>" + outputMsg;
          }
        }
      }
    }

    // if player choose 'hit', deal another card.
    if (input == HIT) {
      dealCards(shuffledDeck);

      playerCardSum = playerCardSum + playerCard[2].rank;
      console.log(playerCardSum);

      // if player card sum > 21 and player card 2 rank is 11, change the rank to 1
      if (playerCardSum > 21 && playerCard[2].rank == 11) {
        playerCard[2].rank = 1;
        playerCardSum =
          playerCard[0].rank + playerCard[1].rank + playerCard[2].rank;
      }

      myOutputValue =
        "Player, you card sum is " +
        playerCardSum +
        ". <br> Dealer's card sum is " +
        dealerCardSum +
        ". ";

      // check winning condition
      if (dealerCardSum <= 16) {
        dealCards(shuffledDeck);

        dealerCardSum = dealerCardSum + dealerCard[2].rank;
        console.log(dealerCardSum);

        playerWins = doesPlayerWin(playerCardSum, dealerCardSum);
        currPoints = countCurrPoints(playerWins, playerPoints, pointsBet);
        outputMsg = getOutputMsg(playerWins, currPoints);

        myOutputValue =
          "Player, your card sum is " +
          playerCardSum +
          ". <br> Dealer's card sum is " +
          dealerCardSum;

        if (doesPlayerWin(playerCardSum, dealerCardSum)) {
          playerPoints += pointsBet;
          return myOutputValue + ". <br>" + outputMsg;
        } else if (!doesPlayerWin(playerCardSum, dealerCardSum)) {
          playerPoints -= pointsBet;
          return myOutputValue + ". <br>" + outputMsg;
        }
      }
      if (dealerCardSum >= 17) {
        playerWins = doesPlayerWin(playerCardSum, dealerCardSum);
        currPoints = countCurrPoints(playerWins, playerPoints, pointsBet);
        outputMsg = getOutputMsg(playerWins);

        // check winning condition
        if (doesPlayerWin(playerCardSum, dealerCardSum)) {
          playerPoints += pointsBet;
          return myOutputValue + " <br>" + outputMsg;
        } else if (!doesPlayerWin(playerCardSum, dealerCardSum)) {
          playerPoints -= pointsBet;
          return myOutputValue + " <br>" + outputMsg;
        }
      }
    }
    return myOutputValue;
  }
  GAME_MODE = BET_POINTS;
};
