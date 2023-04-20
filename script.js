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
// Helper function to calculate the total rank of a hand
// let getTotalRank = function (cards) {
//   let totalRank = 0;
//   let hasAce = false;
//   for (let i = 0; i < cards.length; i += 1) {
//     let rank = cards[i].rank;
//     if (rank == 1) {
//       hasAce = true;
//       totalRank += 11;
//     } else if (rank >= 10) {
//       totalRank += 10;
//     } else {
//       totalRank += rank;
//     }
//   }
//   // If total rank is over 21 and the hand has an Ace, the Ace is worth 1 instead of 11
//   if (totalRank > 21 && hasAce) {
//     totalRank -= 10;
//   }
//   return totalRank;
// };
let getTotalRank = function (cards) {
  let total = 0;
  let hasAce = false;
  let numberAce = 1;
  for (let i = 0; i < cards.length; i += 1) {
    let rank = cards[i].rank;
    if (rank > 10) {
      rank = 10;
    } else if (rank == 1) {
      hasAce = true;
      rank = 11;
    } else if (rank == 1 && numberAce >= 2) {
      hasAce = true;
      rank = 1;
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

  // Check for player Blackjack
  if (playerHasBlackjack) {
    myOutputValue += "<br><br>Player has Blackjack ♠️ | 🎉 Player wins!<br>";
    return myOutputValue;
  } else if (computerHasBlackjack) {
    myOutputValue += "<br><br> Computer has Blackjack ♠️  | 🎉 Computer wins!";
    return myOutputValue;
  }

  // Allow the player to hit or stand
  let playerTotal = getTotalRank(playerCards);
  while (playerTotal < 21) {
    let hitOrStand = input.toLowerCase();
    if (hitOrStand == "hit") {
      playerCards.push(shuffledDeck.pop());
      myOutputValue +=
        "<br><br>Player drew " +
        playerCards[playerCards.length - 1].name +
        " of " +
        playerCards[playerCards.length - 1].suit;
      playerTotal = getTotalRank(playerCards);
    } else if (hitOrStand == "stand") {
      break;
    }
  }

  // Check if player busts
  if (playerTotal > 21) {
    myOutputValue += "<br><br>Player busts 🤯 | 💻 Computer wins!";
    return myOutputValue;
  }

  // Computer draws cards if total rank is less than 17
  while (computerTotal < 17) {
    computerCards.push(shuffledDeck.pop());
    computerTotal = getTotalRank(computerCards);
  }

  // Check if computer busts
  if (computerTotal > 21) {
    myOutputValue += "<br><br>Computer busts 🤯 | 🎉 Player wins!";
    return myOutputValue;
  }

  // Compare the total ranks of the player and computer cards after computer draws
  if (playerTotal > computerTotal) {
    myOutputValue +=
      "<br><br>🎉 Player wins!" +
      "<br><br>Player total hand: " +
      playerTotal +
      "<br>Computer total hand: " +
      computerTotal;
  } else if (playerTotal < computerTotal) {
    myOutputValue +=
      "<br><br>🎉 Computer wins!" +
      "<br><br>Player total hand: " +
      playerTotal +
      "<br>Computer total hand: " +
      computerTotal;
  } else if (
    (playerHasBlackjack && computerHasBlackjack) ||
    playerTotal == computerTotal
  ) {
    myOutputValue +=
      "<br><br>🎊 It's a tie!" +
      "<br><br>Player total hand: " +
      playerTotal +
      "<br>Computer total hand: " +
      computerTotal;
  }
  return myOutputValue;
};
