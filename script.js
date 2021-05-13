var shuffledDeck = [];

// create a new deck of cards
var buildDeck = function () {
  // 3 properties of the object
  // 1: suit (4 types)
  // 2: rank (1-13)
  // 3: name (13 types)
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  var cardDeck = [];
  var suitCounter = 0;
  var cardName = "";
  while (suitCounter < suits.length) {
    //set suit
    var currentSuit = suits[suitCounter];

    // set rank and name
    var rankCounter = 1;
    var currentRank = 1;
    var cardValue = 1;
    while (rankCounter <= 13) {
      currentRank = rankCounter;
      if (rankCounter == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (rankCounter == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (rankCounter == 13) {
        cardName = "King";
        cardValue = 10;
      } else if (rankCounter == 1) {
        cardName = "Ace";
        cardValue = 1;
      } else {
        cardName = currentRank;
        cardValue = currentRank;
      }

      //create a new card
      var singleCard = {
        suit: currentSuit,
        rank: currentRank,
        name: cardName,
        pointValue: cardValue,
      };
      cardDeck.push(singleCard);
      rankCounter += 1;
    }
    suitCounter += 1;
  }
  return cardDeck;
};

// function to shuffle a new deck
var shuffleDeck = function () {
  var cardDeck = buildDeck();
  for (var i = 1; i < cardDeck.length; i++) {
    var j = Math.floor(Math.random() * 52);
    var currentCard = cardDeck[i];
    var randomCard = cardDeck[j];
    cardDeck[i] = randomCard;
    cardDeck[j] = currentCard;
  }
  return cardDeck;
};

// single player mode
var playBlackJack = function () {
  //get a shuffled deck
  var freshShuffledDeck = shuffleDeck();
  var humanPlayerCards = [];
  var computerDealerCards = [];

  //just to get the cards currently in hand
  var printHandMessage = function (hand) {
    var index = 0;
    var cardsHeld = "These were the cards in your hand:<br>";
    while (index < hand.length) {
      cardsHeld += `${hand[index].name} of ${hand[index].suit}<br>`;
      index += 1;
    }
    return cardsHeld;
  };

  // deal cards
  // human gets card first
  humanPlayerCards.push(freshShuffledDeck.pop());

  //dealer gets next card
  computerDealerCards.push(freshShuffledDeck.pop());

  //human player gets second card, and so does computer
  humanPlayerCards.push(freshShuffledDeck.pop());
  computerDealerCards.push(freshShuffledDeck.pop());

  //start evaluating winning conditions
  var humanPlayerScore = evaluateHand(humanPlayerCards);
  var computerDealerScore = evaluateHand(computerDealerCards);

  if (humanPlayerScore == "blackjack") {
    return (
      `You win with Blackjack!<br><br>` + printHandMessage(humanPlayerCards)
    );
  } else {
    // test if this works
    console.log(humanPlayerScore);
    return printHandMessage(humanPlayerCards);
  }
  //evaluate for blackjack for both players
};

//evaluates a player's hand to return their total number of points
var evaluateHand = function (playerHand) {
  var handIndex = 0;
  var sumPoints = 0;

  //blackjack can only be won with 2 cards
  if (playerHand.length == 2) {
    //check for blackjack
    if (playerHand[0].name == "Ace" || playerHand[1].name == "Ace") {
      // add 10 since in order to win by blackjack, the ace must be considered an "11"
      sumPoints = playerHand[0].pointValue + playerHand[1].pointValue + 10;
      if (sumPoints == 21) {
        return "blackjack";
      } else {
        // no blackjack, but counted the ace as an "11"
        return sumPoints;
      }
    }
    // no ace
    sumPoints = playerHand[0].pointValue + playerHand[1].pointValue;
    return sumPoints;
  }

  // to evaluate hands larger than 2 cards
  while (handIndex < playerHand.length) {
    //get cards
    sumPoints += playerHand[handIndex].pointValue;
    handIndex += 1;
  }

  //check if user busted because we chose to represent their ace as "11", if so, treat as "ace"
  if (sumPoints > 21) {
    for (var i = 0; i < playerHand.length; i++) {
      if (playerHand[i].name == "Ace") {
        sumPoints = sumPoints - 10;
      }
    }
  }

  return sumPoints;
};

var main = function (input) {
  var newDeck = buildDeck();
  console.log(newDeck);
  var outcome = playBlackJack();
  return outcome;
};
