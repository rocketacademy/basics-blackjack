// 13 card of 4 suits
// ace has value of 11 or 1
// player vs computer
// draw 2 cards + additional until 21 or bust
// closest to 21 or =21 leads to a win. Bust = lose
//Array of Cards

var mainDeck = function () {
  var deck = [];

  var suits = ["hearts", "diamonds", "clubs", "spades"];

  var suitList = 0;
  while (suitList < suits.length) {
    var currentSuit = suits[suitList];

    var counter = 1;
    while (counter <= 13) {
      var cardValue = counter;
      var cardName = cardValue;

      // ace and picture cards
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardValue = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        cardValue = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        cardValue = 10;
        cardName = "king";
      }

      var currentCard = {
        name: cardName,
        suit: currentSuit,
        power: cardValue,
      };

      // add the currentCard to the deck
      deck.push(currentCard);

      counter = counter + 1;

      //      console.log(counter);
    }
    suitList = suitList + 1;
  }

  return deck;
};

// deal random card
var dealRandomCard = function (value) {
  return Math.floor(Math.random() * value);
};

var dealerShuffle = function (cards) {
  var cardDealt = 0;

  while (cardDealt < cards.length) {
    var randomCard = dealRandomCard(cards.length);

    var currentCardToHand = cards[cardDealt];

    var randomItem = cards[randomCard];

    cards[cardDealt] = randomItem;
    cards[randomCard] = currentCardToHand;

    cardDealt = cardDealt + 1;
  }

  return cards;
};

//game conditions
var deck = dealerShuffle(mainDeck());

var TWENTY_ONE = 21;

var dealerCardThreshold = 16;

var playerChooseStand = false;

var gameOver = false;

//setting arrays
var playerHand = [];
var computerHand = [];

//adding to hand, removing from deck
var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};

// Total Value of cards in hand
var totalHandValue = function (hand) {
  var aceInHand = 0;
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    var currCard = hand[counter];
    // If card is Ace, value is 11 by default
    if (currCard.power == 1) {
      aceInHand += 1;
      sum += 11;
    } else {
      sum += currCard.power;
    }

    counter = counter + 1;
  }
  // Ace variable condition
  if (sum > TWENTY_ONE && aceInHand > 0) {
    var aceCounter = 0;
    while (aceCounter < aceInHand) {
      sum -= 10;
      // If the sum is less than TWENTY_ONE before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (sum <= TWENTY_ONE) {
        break; // break keyword causes the loop to finish
      }
      aceCounter = aceCounter + 1;
    }
  }
  return sum;
};

// Return whether the hand contains a Blackjack combination
var totalTwentyOne = function (hand) {
  return hand.length == 2 && totalHandValue(hand) == TWENTY_ONE;
};

// Convert hand to a string where objects within the array are stringified
var convertHandToString = function (hand) {
  var cards = "";
  var cardsInHand = 0;

  while (cardsInHand < hand.length) {
    cards = cards + "," + hand[cardsInHand].name;
    cardsInHand = cardsInHand + 1;
  }

  return cards;
};

var firstTwoCards = function () {
  return `Player has: ${convertHandToString(
    playerHand
  )} with sum ${totalHandValue(playerHand)}. <br>
    Computer has: ${convertHandToString(
      computerHand
    )} with sum ${totalHandValue(computerHand)}.`;
};

// gameOver output with text
var main = function (input) {
  if (gameOver) {
    return "The game is over. Thank you for playing. Please refresh to play again.";
  }

  // If initial hands have not been dealt, deal initial hands
  if (playerHand.length === 0) {
    // User clicks submit button to deal cards.
    // Deal first card for player then computer
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);

    // Deal second card for player then computer
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);

    // The cards are analyzed for any game winning conditions. (Blackjack)
    // If computer has Blackjack, computer auto wins because computer is dealer
    if (totalTwentyOne(computerHand)) {
      gameOver = true;
      // Computer wins, return
      return `${firstTwoCards()} <br>
        Computer has Blackjack and wins. Please refresh to play again.`;
    }

    // If player has Blackjack and computer does not, player wins
    if (totalTwentyOne(playerHand)) {
      gameOver = true;
      // Player wins, return
      return `${firstTwoCards()} <br>
        Player has Blackjack and wins. Please refresh to play again.`;
    }

    // The cards are displayed to the user.
    return `${firstTwoCards()} <br>
      Please enter "hit" or "stand", then press Submit`;
  }

  // Then begins a new action, where the user has to decide something: do they hit or stand.
  if (!playerChooseStand) {
    // If user input is neither "hit" nor "stand" prompt user
    if (input !== "hit" && input !== "stand") {
      return 'Please input either "hit" or "stand" as possible moves in Blackjack';
    }

    if (input === "hit") {
      dealCardToHand(playerHand);
      // If bust, show player that she busts
      if (totalHandValue(playerHand) > TWENTY_ONE) {
        gameOver = true;
        return `${firstTwoCards()} <br>
          Player has busted and loses. Please refresh to play again.`;
      }
    }

    if (input === "stand") {
      playerChooseStand = true;
    }
  }

  // The computer also decides to hit or stand.
  // Computer hits if sum less than or equal to dealer hit threshold
  // Otherwise, computer stays
  var computerHandSum = totalHandValue(computerHand);
  if (computerHandSum <= dealerCardThreshold) {
    dealCardToHand(computerHand);
    // Update computer hand sum after dealing new card
    computerHandSum = totalHandValue(computerHand);
    // If bust, show computer that she busts
    if (computerHandSum > TWENTY_ONE) {
      gameOver = true;
      return `${firstTwoCards()} <br>
      Computer has busted and loses. Please refresh to play again.`;
    }
  }

  // If player and computer have both not busted and chosen to stand, decide who wins
  if (playerChooseStand && computerHandSum > dealerCardThreshold) {
    // The game is always over after this point
    gameOver = true;
    // If player hand sum is greater than computer hand sum, player wins!
    if (totalHandValue(playerHand) > computerHandSum) {
      return `${firstTwoCards()} <br>
        Player wins! Please refresh to play again.`;
    }
    // Else, computer wins
    return `${firstTwoCards()} <br>
      Computer wins! Please refresh to play again.`;
  }

  // If game is not yet over, show current game status
  return `${firstTwoCards()} 
    If player has not yet chosen to stand, please enter "hit" or "stand". <br>
    Else, press Submit to see Computer's next move.`;
};
