// Gameplay Description
// The main function runs on each player's turn. The sequence of actions in the game might be the following.
// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

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

// Get the total rank of an array of cards
let getTotalRank = function (cards) {
  let total = 0;
  for (let i = 0; i < cards.length; i += 1) {
    let rank = cards[i].rank;
    if (rank > 10) {
      rank = 10;
    }
    total += rank;
  }
  return total;
};

let main = function (input) {
  let deck = makeDeck();
  let shuffledDeck = shuffleCards(deck);

  // Draw 2 cards for the player
  let playerCards = [];
  playerCards.push(shuffledDeck.pop());
  playerCards.push(shuffledDeck.pop());

  // Draw 2 cards for the computer
  let computerCards = [];
  computerCards.push(shuffledDeck.pop());
  computerCards.push(shuffledDeck.pop());

  // Check for Blackjack (an Ace and a 10 or face card) on the player's first two cards
  let playerHasBlackjack = false;
  if (playerCards.length == 2) {
    let rank1 = playerCards[0].rank;
    let rank2 = playerCards[1].rank;
    if ((rank1 == 1 && rank2 >= 10) || (rank2 == 1 && rank1 >= 10)) {
      playerHasBlackjack = true;
    }
  }

  // Check for Blackjack (an Ace and a 10 or face card) on the computer first two cards
  let computerHasBlackjack = false;
  if (computerCards.length == 2) {
    let rank1 = computerCards[0].rank;
    let rank2 = computerCards[1].rank;
    if ((rank1 == 1 && rank2 >= 10) || (rank2 == 1 && rank1 >= 10)) {
      computerHasBlackjack = true;
    }
  }

  // Construct an output string to communicate which cards were drawn
  let myOutputValue =
    "Player drew " +
    playerCards[0].name +
    " of " +
    playerCards[0].suit +
    " and " +
    playerCards[1].name +
    " of " +
    playerCards[1].suit +
    ".<br> Computer drew " +
    computerCards[0].name +
    " of " +
    computerCards[0].suit +
    " and " +
    computerCards[1].name +
    " of " +
    computerCards[1].suit +
    ". ";

  // Check for player Blackjack
  if (playerHasBlackjack && !computerHasBlackjack) {
    myOutputValue += "<br>Player has Blackjack. Player wins!<br>";
    return myOutputValue;
  }

  // Check for computer Blackjack
  if (computerHasBlackjack && !playerHasBlackjack) {
    myOutputValue += "<br>Computer has Blackjack. <br>Computer wins!";
    return myOutputValue;
  }

  // Compare the total ranks of the player and computer cards
  let playerTotal = getTotalRank(playerCards);
  let computerTotal = getTotalRank(computerCards);

  if (playerTotal > computerTotal) {
    myOutputValue += "<br>Player wins!";
  } else if (playerTotal < computerTotal) {
    myOutputValue += "<br>Computer wins!";
  } else if (
    (playerHasBlackjack && computerHasBlackjack) ||
    playerTotal == computerTotal
  ) {
    myOutputValue += "<br>It's a tie!";
  }
  return myOutputValue;
};
