var makeDeck = function () {
  // create an empty deck at the beginning
  var deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];
    console.log("current suit: " + currentSuit);

    // loop to create all cards in this suit: rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      // For special cards
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      console.log("rank: " + rankCounter);
      // add the card to the deck
      deck.push(card);
      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  return deck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

var deck = shuffleCards(makeDeck());

// when game ends
var endGame = false;
// To denote that the player should get a max sum of 21.
var maxSumOfCards = 21;
// If player chose to stand, then player can no longer hit until game is over.
var playerChoseStand = false;
// to keep track of the players' cards
var playerHand = [];
var dealerHand = [];

// Deals card to a hand - player or computer
var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};

// Get sum of all cards in a hand
var getSumOfHand = function (hand) {
  var acesInHand = 0;
  var SumOfCards = 0;
  var index = 0;
  while (index < hand.length) {
    var currentCard = hand[index];

    if (currentCard.rank >= 2 && currentCard.rank <= 10) {
      // value and rank of card is the same for cards 2 to 10.
      SumOfCards = SumOfCards + currentCard.rank;
    } else if (currentCard.rank >= 11 && currentCard.rank <= 13) {
      // value of J,Q,K is 10.
      SumOfCards = SumOfCards + 10;
    } else if (currentCard.rank == 1) {
      acesInHand = acesInHand + 1;
      SumOfCards = SumOfCards + 11;
    }
    index = index + 1;
  }

  if (SumOfCards > maxSumOfCards && acesInHand > 0) {
    var index = 0;
    while (index < acesInHand) {
      SumOfCards = SumOfCards - 10;
      if (SumOfCards <= maxSumOfCards) {
        break;
      }
      index = index + 1;
    }
  }

  return SumOfCards;
};

var main = function (input) {
  if (endGame == true) {
    endGame = true;
    console.log(endGame);
    return "Please refresh to play the game.";
  }

  // if players have no cards, deal a card
  if (playerHand.length == 0) {
    playerHand = dealCardToHand();
    dealerHand = dealCardToHand();
    return " <br>Please input 'hit' or 'stand' as your choice.";
  } else {
    playerHand = dealCardToHand();
    dealerHand = dealCardToHand();
    // return " <br>Please input 'hit' or 'stand' as your choice.";
  }

  if (playerHand.length == 2 && getSumOfHand(pHand) == maxSumOfCards) {
    endGame = true;
    return "Player wins game.";
  } else if (computerHand.length == 2 && getSumOfHand(dHand) == maxSumOfCards) {
    endGame = true;
    return "Computer wins game.";
  }

  if (mode == "choose stand") {
    playerChoseStand = true;
    if (input != "hit" && input != "stand") {
      return "Please input either 'hit' or 'stand' to continue.";
    }
    if (input == "hit") {
      playerHand = dealCardToHand();
      if (getSumOfHand(playerHand) > maxSumOfCards) {
        return "<br>Player has a sum of more than 21 and loses. Please try again.";
        // return "Player has hand "+ convertHandToString(playerHand) + "with sum" + getHandSum(playerHand) + ". <br>Computer has hand " + convertHandToString(computerHand) + " with sum " + getHandSum(computerHand)+"<br>Player has a sum of more than 21 and loses. Please try again.";
      }
    }
  }

  if (input == "stand") {
    playerChoseStand = false;
  }

  var dealerSumOfHand = getSumOfHand(dealerHand);
  if (dealerSumOfHand < 17) {
    dealerHand = dealCardToHand();
    dealerSumOfHand = getSumOfHand(dealerHand);
    if (dealerSumOfHand > maxSumOfCards) {
      endGame = true;
      return "<br>Computer has a sum of more than 21 and loses. Please try again.";
    }
  }

  if (playerChoseStand && dealerSumOfHand >= 17) {
    endGame = true;
    if (getSumOfHand(playerHand) > dealerSumOfHand) {
      return " <br>Player wins game!!!";
    }
    return " <br>Computer wins game!!!";
  }

  return " <br>If Player has not yet chosen to stand, please enter 'hit' or 'stand'. <br> Otherwise, press Submit to see Computer's next move. ";
};

// rules of game;-
// Objective: Win highest card
// deck is shuffled and split evenly among players
// players take turns drawing one card
// highest card wins
//
// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.
