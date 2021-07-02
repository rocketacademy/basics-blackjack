var mode = "welcome";
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var playerHand = [];
var dealerHand = [];
var cardsPerPlayer = 2;
var playerName = "";

// modes present in game
// mode: welcome
function askForName() {
  return `♦️ ♣️ Welcome to Black Jack! ♠️ ♥️ <br>Please enter your name.`;
}
// mode: greet with rules
function greetWithRules(input) {
  playerName = input;
  return `Hi ${playerName}✨! Let's play a round of Black Jack! ♠️ ♥️ ♣️ ♦️ <br> Here are the rules:<br>𐄙 The goal is to beat the dealer's hand without going over 21. <br>𐄚 Each player starts with two cards, one of the dealer's cards is hidden until the end. <br>𐄛 To 'Hit' is to ask for another card. To 'Stand' is to hold your total and end your turn. <br>𐄜 If you go over 21 you bust, and the dealer wins regardless of the dealer's hand. <br>𐄝 If you are dealt 21 from the start (Ace & 10), you got a blackjack.<br>𐄞 Dealer will hit until his/her cards total 17 or higher.<br>💃🏻 Ready to play? Click submit to begin.`;
}
// mode: deal cards
function dealCards() {
  for (var i = 0; i < cardsPerPlayer; i++) {
    drawCardInto(playerHand);
    drawCardInto(dealerHand);
  }
  var ace = findAceIn(playerHand);
  var facesOr10 = findFacesOr10In(playerHand);

  if (ace == true && facesOr10 == true) {
    mode = "play again?";
    return `You've got 👯‍♂️ B L A C K  J A C K 👯‍♀️ <br> 🎰 Would you like to play again? (yes/no) 🎰`;
  } else {
    return `Your current hand: ${printCardsIn(
      playerHand
    )} <br>The dealer's first card is ${dealerHand[0].name} of ${
      dealerHand[0].suit
    }<br><br>Would you like to hit or stand? <br>(hit/stand)`;
  }
}

// mode: hit
function hit() {
  drawCardInto(playerHand);
  if (sumCardPointsIn(playerHand) > 21) {
    mode = "play again?";
    return `You're  🧨 B U S T 💣 <br>Better luck next time 🃏 <br>Would you like to play again? (yes/no)`;
  } else {
    return `Your current hand:${printCardsIn(
      playerHand
    )} <br>The dealer's first card is ${dealerHand[0].name} of ${
      dealerHand[0].suit
    }<br><br>Would you like to hit or stand? <br>(hit/stand)`;
  }
}
// mode: dealer hits
function hitDealer() {
  var doubleAces = findDoubleAces(dealerHand);
  var dealerTotalPoints = sumCardPointsIn(dealerHand);
  var ace = findAceIn(dealerHand);
  if (doubleAces == true) {
    dealerTotalPoints = 21;
  } else if (dealerTotalPoints < 11 && ace == true) {
    for (var i = 0; i < dealerHand.length; i++) {
      currentCard = dealerHand[i];
      var currentCardName = currentCard.name;
      if (currentCardName == "ace") {
        currentCard.points = 11;
      }
    }
    dealerTotalPoints = sumCardPointsIn(dealerHand);
  }
  while (dealerTotalPoints < 17) {
    drawCardInto(dealerHand);
    dealerTotalPoints = sumCardPointsIn(dealerHand);
  }
  return `Ready to show your hand? Ready or not, click submit.`;
}
// mode: compute results
function computeResults() {
  var ace = findAceIn(playerHand);
  console.log(ace);

  var playerPoints = sumCardPointsIn(playerHand);
  console.log(sumCardPointsIn(playerHand));
  if (playerPoints < 11 && ace == true) {
    for (var i = 0; i < playerHand.length; i++) {
      currentCard = playerHand[i];
      var currentCardName = currentCard.name;
      if (currentCardName == "ace") {
        currentCard.points = 11;
      }
    }
    playerPoints = sumCardPointsIn(playerHand);
  }
  var computerPoints = sumCardPointsIn(dealerHand);
  console.log("computer points " + computerPoints);
  console.log("player points " + playerPoints);
  if (
    (playerPoints > computerPoints && playerPoints <= 21) ||
    (playerPoints < computerPoints && computerPoints > 21)
  ) {
    return `You 🌸 🌼 W I N 🌼 🌸 <br>${playerName}, you've got ${playerPoints} points. <br>Player's hand: ${printCardsIn(
      playerHand
    )} <br> Computer has ${computerPoints} points. <br>Computer's hand: ${printCardsIn(
      dealerHand
    )} <br> Play again? (yes/no)`;
  } else if (
    (playerPoints < computerPoints && computerPoints <= 21) ||
    (playerPoints > computerPoints && playerPoints > 21)
  ) {
    return `You  😭 L O S T 😭 <br>Computer wins with ${computerPoints} points. <br>Computer's hand: ${printCardsIn(
      dealerHand
    )} <br> ${playerName}, you have ${playerPoints} points. <br>Player's hand: ${printCardsIn(
      playerHand
    )} <br> Play again? (yes/no)`;
  } else if (playerPoints == computerPoints && playerPoints <= 21) {
    return `It's a draw.<br>Player's hand: ${printCardsIn(
      playerHand
    )}<br>Computer's hand: ${printCardsIn(
      dealerHand
    )}<br> Play again? (yes/no)`;
  }
}
// mode: play again
function refreshRound() {
  playerHand = [];
  dealerHand = [];
  deck = makeDeck();
  shuffledDeck = shuffleCards(deck);
  mode = "deal cards";
  return `Let's play!`;
}

var main = function (input) {
  if (mode == "welcome") {
    var output = askForName();
    mode = "greet with rules";
    return output;
  } else if (mode == "greet with rules") {
    output = greetWithRules(input);
    mode = "deal cards";
    return output;
  } else if (mode == "deal cards") {
    var output = dealCards();
    mode = "hit or stand";
    return output;
  } else if (mode == "hit or stand") {
    if (input == "hit") {
      output = hit();
      return output;
    } else if (input == "stand") {
      output = hitDealer();
      mode = "compute results";
      return output;
    }
  } else if (mode == "compute results") {
    output = computeResults();
    mode = "play again?";
    return output;
  } else if (mode == "play again?") {
    if (input == "yes") {
      output = refreshRound();
      mode = "deal cards";
    } else if (input == "no") {
      output = `Bye bye! Let's play again soon ~`;
    }
    return output;
  }
};

// sum card points in card array
function sumCardPointsIn(cardArray) {
  var currentCard;
  var sumOfCardPoints = 0;
  for (var i = 0; i < cardArray.length; i++) {
    currentCard = cardArray[i];
    var currentCardPoints = currentCard.points;
    sumOfCardPoints = sumOfCardPoints + currentCardPoints;
  }
  return sumOfCardPoints;
}
// find double ace
function findDoubleAces(cardArray) {
  var doubleAces = false;
  if (cardArray[0].name == "ace" && cardArray[1].name == "ace") {
    doubleAces = true;
  }
  return doubleAces;
}
// find ace
function findAceIn(cardArray) {
  var ace = false;
  var currentCard;
  for (var i = 0; i < cardArray.length; i++) {
    currentCard = cardArray[i];
    var currentCardName = currentCard.name;
    if (currentCardName == "ace") {
      ace = true;
    }
  }
  return ace;
}

function findFacesOr10In(cardArray) {
  var facesOr10 = false;
  var currentCard;
  for (var i = 0; i < cardArray.length; i++) {
    currentCard = cardArray[i];
    var currentCardName = currentCard.name;
    if (
      currentCardName == 10 ||
      currentCardName == "jack" ||
      currentCardName == "queen" ||
      currentCardName == "king"
    ) {
      facesOr10 = true;
    }
  }
  return facesOr10;
}

// Draw card after deal function
function drawCardInto(cardArray) {
  var newPlayerCard = shuffledDeck.pop();
  cardArray.push(newPlayerCard);
}

function printCardsIn(cardArray) {
  var currentCard;
  var printCurrentCard;
  var printAllCards = "";
  for (i = 0; i < cardArray.length; i++) {
    currentCard = cardArray[i];
    printCurrentCard = ` ${currentCard.name} of ${currentCard.suit} | `;
    printAllCards = printAllCards + printCurrentCard;
  }
  return printAllCards;
}

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
