// global variables
var playerName = "";
var state = "awaiting player name";

// make deck function
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
      // face cards are rank 10 for Blackjack
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        rankCounter = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        rankCounter = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        rankCounter = 10;
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

var cardDeck = makeDeck();
var shuffledDeck = shuffleCards(cardDeck);

// store player's cards and computer's cards in arrays
var playerHand = [];
var computerHand = [];

// deal card function
var dealCard = function (hand) {
  hand.push(shuffledDeck.pop());
};

// get sum of cards in hand
var checkSum = function (hand) {
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    var currentCard = hand[counter];
    sum = sum + currentCard.rank;
    counter = counter + 1;
  }
  return sum;
};

// check blackjack function
var checkBlackjack = function (hand) {
  var playerCard1 = hand[0];
  var playerCard2 = hand[1];
  if (
    (playerCard1.name == "ace" && playerCard2.rank == 10) ||
    (playerCard2.name == "ace" && playerCard1.rank == 10)
  ) {
    var blackjack = true;
  }
  return blackjack;
};

function main(input) {
  if (state == "awaiting player name") {
    // if input is blank, prompt player 1 to enter a name
    if (input == "") {
      return "Please enter your name";
    } else if (input !== "") {
      playerName = input;
      state = "deal cards";
      return `Welcome to the game of Blackjack, ${playerName}! <br><br> Click submit to deal the cards!`;
    }
  }

  // game starts
  if (state == "deal cards") {
    // deal first card
    dealCard(playerHand);
    dealCard(computerHand);

    // deal second card
    dealCard(playerHand);
    dealCard(computerHand);

    var playerCard1 = playerHand[0];
    var playerCard2 = playerHand[1];
    var computerCard1 = computerHand[0];
    var computerCard2 = computerHand[1];

    // win/lose conditions (blackjack)
    var playerBlackjack = checkBlackjack(playerHand);
    var computerBlackjack = checkBlackjack(computerHand);

    // if computer gets blackjack and player doesn't, player loses
    if (computerBlackjack == true && playerBlackjack != true) {
      state == "game over";
      return `${playerName}'s' hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} <br><br> Dealer's hand: ${computerCard1.name} of ${computerCard1.suit}, ${computerCard2.name} of ${computerCard2.suit} <br><br> Dealer got Blackjack! You lose! Please refresh to play again.`;
    }
    // if player gets blackjack and computer doesn't, player wins
    else if (playerBlackjack == true && computerBlackjack != true) {
      state == "game over";
      return `${playerName}'s' hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} <br><br> Dealer's hand: ${computerCard1.name} of ${computerCard1.suit}, ${computerCard2.name} of ${computerCard2.suit} <br><br> You got Blackjack! You win! Please refresh to play again.`;
    }
    // both blackjack
    else if (playerBlackjack == true && computerBlackjack == true) {
      state == "game over";
      return `${playerName}'s' hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} <br><br> Dealer's hand: ${computerCard1.name} of ${computerCard1.suit}, ${computerCard2.name} of ${computerCard2.suit} <br><br> You both got Blackjack! It's a tie! Please refresh to play again.`;
    } else if (playerBlackjack != true && computerBlackjack != true) {
      state == "hit or stand";
      return `${playerName}'s' hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} <br><br> Enter "hit" to draw a card, or "stand" to keep your current hand.`;
    }
  }

  // player decides hit or stand
  if (state == "hit or stand") {
    if (input !== "hit" && input !== "stand") {
      return `${playerName}'s' hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} <br><br> Enter "hit" to draw a card, or "stand" to keep your current hand.`;
    }

    // win/lose conditions (normal)

    // player decides to hit
    if (input == "hit") {
      // deal new card
      dealCard(playerHand);
      var playerHandSum = checkSum(playerHand);
      // if sum of player's cards exceed 21, player loses
      if (playerHandSum > 21) {
        state == "game over";
        return `You've busted! You lose! Please refresh to play again.`;
      }
    }

    //player decides to stand
    if (input == "stand") {
      state == "dealer's turn";
      var playerHandSum = checkSum(playerHand);
      var computerHandSum = checkSum(computerHand);
      if (computerHandSum <= 16) {
        dealCard(computerHand);
        // get new sum
        computerHand = checkSum(computerHand);
        // if sum of computer's cards exceed 21, player wins
        if (computerHandSum > 21) {
          state == "game over";
          return `The dealer has busted! You win! Please refresh to play again.`;
        }
      }
      if (computerHandSum > 16 && computerHandSum <= 21) {
        state == "game over";
        // if player number higher, player wins
        if (playerHandSum > computerHandSum) {
          return `Your hand: ${playerHandSum} <br><br> Dealer's hand: ${computerHandSum} <br><br>You win! Please refresh to play again.`;
        }
        // if computer number higher, player loses
        else if (playerHandSum < computerHandSum) {
          return `Your hand: ${playerHandSum} <br><br> Dealer's hand: ${computerHandSum} <br><br>You lose! Please refresh to play again.`;
        }
        // if player number = computer number, it's a tie
        else if (playerHandSum == computerHandSum) {
          return `Your hand: ${playerHandSum} <br><br> Dealer's hand: ${computerHandSum} <br><br>It's a tie! Please refresh to play again.`;
        }
      }
    }
  }
}
