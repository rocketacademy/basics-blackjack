var makeDeck = function () {
  // create an empty deck at the beginning
  var deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];
    // console.log("current suit: " + currentSuit);

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
      // console.log("rank: " + rankCounter);
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
var ace = false;
// To denote that the player should get a max sum of 21.
var maxSumOfCards = 21;
// If player chose to stand, then player can no longer hit until game is over.
var playerChoseStand = false;
// to keep track of the players' cards
var playerHand = [];
var dealerHand = [];
var index2 = 1;
others = "";
var acesInHand = 0;
var aceValue = 0;

// Deals card to a hand - player or dealer
var dealCardToHand = function (hand) {
  hand.push(deck.pop());
  return hand;
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
    playerHand = dealCardToHand(playerHand);
    dealerHand = dealCardToHand(dealerHand);
    return `You got the ${playerHand[0].name} of ${playerHand[0].suit} and the dealer got the ${dealerHand[0].name} of ${dealerHand[0].suit} <br> Please click Submit again to deal another card.`;
  } else if (playerHand.length == 1) {
    playerHand = dealCardToHand(playerHand);
    dealerHand = dealCardToHand(dealerHand);
    return `You got the ${playerHand[0].name} of ${playerHand[0].suit} and the ${playerHand[1].name} of ${playerHand[1].suit}. The dealer got the ${dealerHand[0].name} of ${dealerHand[0].suit} and another card.<br>Please input 'hit' or 'stand' as your choice.`;
  }

  if (getSumOfHand(playerHand) == maxSumOfCards) {
    endGame = true;
    return "Player wins game by having a total of 21.";
  }
  if (getSumOfHand(dealerHand) == maxSumOfCards) {
    endGame = true;
    return "Dealer wins game by having a total of 21.";
  }

  // if (playerChoseStand == true) {
  //   playerChoseStand = true;
  //   if (input != "hit" && input != "stand") {
  //     return "Please input either 'hit' or 'stand' to continue.";
  //   }

  if (input == "hit") {
    playerHand = dealCardToHand(playerHand);
    index2 += 1;
    if (getSumOfHand(playerHand) > maxSumOfCards) {
      return `You got the ${playerHand[0].name} of ${playerHand[0].suit} and the ${playerHand[1].name} of ${playerHand[1].suit} ${others}. The dealer got the ${dealerHand[0].name} of ${dealerHand[0].suit} and another card.<br> Dealer wins! You have a sum of more than 21 and lost. Please try again.`;
    } else {
      others += `and the ${playerHand[index2].name} of ${playerHand[index2].suit}`;
      return `You got the ${playerHand[0].name} of ${playerHand[0].suit} and the ${playerHand[1].name} of ${playerHand[1].suit} ${others}. The dealer got the ${dealerHand[0].name} of ${dealerHand[0].suit} and another card<br>Please input 'hit' or 'stand' as your choice.`;
    }
  }

  if (input == "stand") {
    playerChoseStand = true;
  }
  // }

  if (playerHand[0].rank == "1" || playerHand[1].rank == "1") {
    // `Please input '1' or '11' for your ace card.`;
    if (input == "1") {
      aceValue = 1;
      return `The value of ace card is now set to '1'.`;
    } else if (input == "11") {
      aceValue = 11;
      return `The value of ace card is now set to '11'.`;
    }
    //ASK THIS ONE
    //return `Please input '1' or '11' into the box.`
  }

  // if (playerChoseStand) {
  //   if (acesInHand > 0) {
  //     ace = true;
  //   }
  // }

  // if (ace && (input != "11") & (input != "1")) {
  //   return `Do you want your value of ace to be '1' or '11'? `;
  // }
  // if ((ace && input == "1") || (ace && input == "11")) {
  //   if (input == "11") {
  //     difference = 11;
  //     // acesInHand = 0;
  //     ace = false;
  //     return `The value of ace has been set to 11`;
  //   } else {
  //     // acesInHand = 0;
  //     ace = false;
  //     return `The value of ace has beens set 1`;
  //   }
  // }

  console.log(getSumOfHand(playerHand));
  console.log(getSumOfHand(dealerHand));

  if (ace == false) {
    if (getSumOfHand(dealerHand) < 17) {
      dealerHand = dealCardToHand(dealerHand);
      console.log(getSumOfHand(playerHand));
      console.log(getSumOfHand(dealerHand));
    }

    if (getSumOfHand(dealerHand) >= 17) {
      console.log(getSumOfHand(playerHand));
      console.log(getSumOfHand(dealerHand));
      if (getSumOfHand(dealerHand) > maxSumOfCards) {
        endGame = true;
        return `You got a total of ${getSumOfHand(
          playerHand
        )} while the dealer got a total of ${getSumOfHand(
          dealerHand
        )}. <br>You win! Dealer has a sum of more than 21 and loses. Please try again.`;
      } else if (
        getSumOfHand(playerHand) + aceValue >
        getSumOfHand(dealerHand)
      ) {
        endGame = true;
        return `You got a total of ${getSumOfHand(
          playerHand
        )} while the dealer got a total of ${getSumOfHand(
          dealerHand
        )}. <br>You win game!`;
      } else if (
        getSumOfHand(playerHand) + aceValue ==
        getSumOfHand(dealerHand)
      ) {
        return `You got a total of ${getSumOfHand(
          playerHand
        )} while the dealer got a total of ${getSumOfHand(
          dealerHand
        )}. <br>It's a tie!`;
      }
    } else {
      return `You got a total of ${getSumOfHand(
        playerHand
      )} while the dealer got a total of  ${getSumOfHand(
        dealerHand
      )}. <br>Dealer wins game!`;
    }
  }
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
