var mode = "deal cards";
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var allPlayerCards = [];
var allComputerCards = [];
var cardsPerPlayer = 2;
var playerCards;
var computerCards;

var main = function (input) {
  // Deal 2 cards to player and computer
  if (mode == "deal cards") {
    for (var i = 0; i < cardsPerPlayer; i++) {
      playerCards = drawCard(allPlayerCards);
      computerCards = drawCard(allComputerCards);
    }
    // Prompt player if they want another card
    mode = "draw another card?";
    return `Your current hand: ${playerCards} <br>Would you like to draw another card? <br>(yes/no)`;
  }
  // Player decides if they want to draw another card
  if (mode == "draw another card?" && input == "yes") {
    mode = "player draws";
  } else if (mode == "draw another card?" && input == "no") {
    mode = "computer draws";
    return `It is now the computer's turn.`;
  }

  // Player can keep drawing another card until they indicate no
  if (mode == "player draws") {
    playerCards = drawCard(allPlayerCards);
    mode = "draw another card?";
    return `Your current hand:${playerCards} <br>Would you like to draw another card? <br>(yes/no)`;
  }
  // Dealer hits after player is done
  if (mode == "computer draws") {
    var sumAllComputerCards = sumAllCards(allComputerCards);
    while (sumAllComputerCards < 17) {
      computerCards = drawCard(allComputerCards);
      sumAllComputerCards = sumAllCards(allComputerCards);
    }
    mode = "compute results";
    return `ready to show your hand?`;
  }
  if (mode == "compute results") {
    console.log("test 1 compute results");
    var playerPoints = sumAllCards(allPlayerCards);
    var computerPoints = sumAllCards(allComputerCards);
    console.log(allPlayerCards);
    console.log(allComputerCards);
    mode = "play again?";
    if (
      (playerPoints > computerPoints && playerPoints <= 21) ||
      (playerPoints < computerPoints && computerPoints > 21)
    ) {
      return `Player wins with ${playerPoints} points. <br>Player's hand: ${playerCards} <br> Computer has ${computerPoints} points. <br>Computer's hand: ${computerCards} <br> Play again? (yes/no)`;
    } else if (
      (playerPoints < computerPoints && computerPoints <= 21) ||
      (playerPoints > computerPoints && playerPoints > 21)
    ) {
      return `Computer wins with ${computerPoints} points. <br>Computer's hand: ${computerCards} <br> Player has ${playerPoints} points. <br>Player's hand: ${playerCards} <br> Play again? (yes/no)`;
    } else if (playerPoints == computerPoints && playerPoints <= 21) {
      return `It's a draw.<br>Player's hand: ${playerCards}<br>Computer's hand: ${computerCards}<br> Play again? (yes/no)`;
    } else if (playerPoints > 21 && computerPoints > 21) {
      return `It's a draw, you've both gotten more than 21 points.<br>Player's hand: ${playerCards}<br>Computer's hand: ${computerCards}<br> Play again? (yes/no)`;
    }
  }
  if (mode == "play again?") {
    if (input == "yes") {
      mode = "deal cards";
      allPlayerCards = [];
      allComputerCards = [];
      playerCards = 0;
      computerCards = 0;
      deck = makeDeck();
      shuffledDeck = shuffleCards(deck);
      return `Let's play!`;
    } else if (input == "no") {
      return `Good bye, see you next time!`;
    }
  }
};

// Sum all cards in array
function sumAllCards(cardarray) {
  var ace = false;
  var currentCard;
  for (var i = 0; i < cardarray.length; i++) {
    currentCard = cardarray[i];
    var currentCardName = currentCard.name;
    if (currentCardName == "ace") {
      ace = true;
    }
  }
  var sumOfAllCardsInArray = 0;
  for (var i = 0; i < cardarray.length; i++) {
    currentCard = cardarray[i];
    var currentCardPoints = currentCard.points;
    sumOfAllCardsInArray = sumOfAllCardsInArray + currentCardPoints;
  }
  if (sumOfAllCardsInArray < 12 && ace == true) {
    for (var i = 0; i < cardarray.length; i++) {
      currentCard = cardarray[i];
      var currentCardName = currentCard.name;
      if (currentCardName == "ace") {
        currentCard.points = 11;
      }
    }
    sumOfAllCardsInArray = 0;
    for (var i = 0; i < cardarray.length; i++) {
      currentCard = cardarray[i];
      var currentCardPoints = currentCard.points;
      sumOfAllCardsInArray = sumOfAllCardsInArray + currentCardPoints;
    }
  }
  return sumOfAllCardsInArray;
}

// Draw card after deal function
function drawCard(array) {
  var newPlayerCard = shuffledDeck.pop();
  array.push(newPlayerCard);
  var allCardsCounter = 0;
  var currentCard;
  var displayCurrentCard;
  var displayAllCards = "";
  while (allCardsCounter < array.length) {
    currentCard = array[allCardsCounter];
    displayCurrentCard = `<br>${currentCard.name} of ${currentCard.suit}`;
    displayAllCards = displayAllCards + displayCurrentCard;
    allCardsCounter = allCardsCounter + 1;
  }
  return displayAllCards;
}

// // Deal cards
// function dealCards() {
//   var computerCard1 = shuffledDeck.pop();
//   var computerCard2 = shuffledDeck.pop();
//   var playerCard1 = shuffledDeck.pop();
//   var playerCard2 = shuffledDeck.pop();
// }
// Get a random index ranging from 0 (inclusive) to max (exclusive).
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Shuffle the elements in the cardDeck array
function shuffleCards(cardDeck) {
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
}

// Make Deck Function
function makeDeck() {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts ♥️", "diamonds ♦️", "clubs ♣️", "spades ♠️"];

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
      var cardPoints = rankCounter;
      if (cardPoints == 11 || cardPoints == 12 || cardPoints == 13) {
        cardPoints = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        points: cardPoints,
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
}
