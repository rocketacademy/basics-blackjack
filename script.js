var makeDeck = function () {
  var deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
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

// Player and Dealer hand arrays
var playerHand = [];
var dealerHand = [];

// Deal a card to the given hand
var dealCard = function (hand) {
  hand.push(deck.pop());
};

// Game parameters
var bustLimit = 21;
var dealerHit = 17;

// Initial states
var playerStanding = false;
var freshTable = false;

// Get sum of cards in hand
var handValue = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currCard = hand[i];
    if (currCard.rank >= 2 && currCard.rank <= 10) {
      sum += currCard.rank;
    } else if (currCard.rank >= 11 && currCard.rank <= 13) {
      sum += 10;
    } else if (currCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    }
  }
  if (sum > bustLimit && numAcesInHand > 0) {
    for (let i = 0; i < numAcesInHand; i += 1) {
      sum -= 10;
      if (sum <= bustLimit) {
        break;
      }
    }
  }
  return sum;
};

// Blackjack checker
var isBlackjack = function (hand) {
  return hand.length === 2 && handValue(hand) === bustLimit;
};

// Cheated this off the solution
var convertHandToString = function (hand) {
  return `[${hand.map((card) => card.name)}]`;
};

// Hand display
var myOutputValue = function () {
  return `Player has hand ${convertHandToString(
    playerHand
  )} with sum ${handValue(playerHand)}. <br>
    dealer has hand ${convertHandToString(dealerHand)} with sum ${handValue(
    dealerHand
  )}.`;
};

var main = function (input) {
  if (freshTable) {
    freshTable = false;
    playerHand = [];
    dealerHand = [];
    playerStanding = false;
    return "Press Submit to begin a new game of Blackjack!";
  }

  // Initial hands
  while (playerHand.length < 2) {
    dealCard(playerHand);
    dealCard(dealerHand);

    if (isBlackjack(dealerHand)) {
      freshTable = true;
      return `${myOutputValue()} <br>
        Blackjack for the Dealer! Press submit to begin another game!`;
    }

    if (isBlackjack(playerHand)) {
      freshTable = true;
      return `${myOutputValue()} <br>
        Blackjack for the Player! Press submit to begin another game!`;
    }

    // Card display
    return `${myOutputValue()} <br>
      Please type in "hit" or "stand" for your next action!`;
  }

  // No Blackjack - player decide what to do with their hand
  if (!playerStanding) {
    // Input validationS
    if (input !== "hit" && input !== "stand") {
      return `${myOutputValue()} <br> 
      Please input either "hit" or "stand" as your next move!`;
    }

    if (input === "hit") {
      dealCard(playerHand);
      if (handValue(playerHand) > bustLimit) {
        freshTable = true;
        return `${myOutputValue()} <br>
          Bummer! The player busted! Press submit to begin another game!`;
      }
    }

    if (input === "stand") {
      playerStanding = true;
    }
  }

  // No Blackjack - Dealer is auto-dealt cards based on the parameters
  var dealerHandSum = handValue(dealerHand);
  if (dealerHandSum <= dealerHit) {
    dealCard(dealerHand);
    dealerHandSum = handValue(dealerHand);
    if (dealerHandSum > bustLimit) {
      freshTable = true;
      return `${myOutputValue()} <br>
      Dealer busted with their draw! Press submit to play another game!`;
    }
  }

  // No Blackjack, player stands, dealer passed limit - Compare hands
  if (playerStanding && dealerHandSum > dealerHit) {
    freshTable = true;
    if (handValue(playerHand) > dealerHandSum) {
      return `${myOutputValue()} <br>
        Close call but Player wins! Press submit to play another game.`;
    }
    return `${myOutputValue()} <br>
      Dealer won! Please submit to play another game.`;
  }

  // No Blackjack, player not standing, dealer passed limit - Continue game
  return `${myOutputValue()} <br>
    Pick "hit" or "stand" as your next move!`;
};
