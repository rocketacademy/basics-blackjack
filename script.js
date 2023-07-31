var player1card = [];
var player1CardSum;
var dealerCard = [];
var dealerCardSum;
var gameModeStart = "GAME MODE START";
var gameMode2cards = "GAME MODE 2 CARDS";
var gameModeHit = "hit";
var gameMode = gameModeStart;
var deck = [];

var main = function (input) {
  var outputMessage = "";

  //GAMEMODE IS START
  if (gameMode === gameModeStart) {
    // Make Deck
    startDeck = createDeck();
    console.log("deck before dealing " + startDeck.length);
    //Each player deals 2 cards one by one starting from the last card
    player1card.push(startDeck.pop());
    dealerCard.push(startDeck.pop());
    player1card.push(startDeck.pop());
    dealerCard.push(startDeck.pop());
    console.log("deck after dealing 2 each " + startDeck.length);
    deck.push(startDeck);
    console.log(deck);
    gameMode = gameMode2cards;
    outputMessage =
      "Both cards are drawn. Checking for blackjack.... Click 'Submit'";
    return outputMessage;
  }
  // Cards are analysed for winning conditions -- if player1 or player 2 wins, then blackjack
  if (gameMode === gameMode2cards) {
    //add sum for both dealt cards
    player1CardSum = Number(player1card[0].rank) + Number(player1card[1].rank);
    dealerCardSum = Number(dealerCard[0].rank) + Number(dealerCard[1].rank);

    if (player1CardSum === 21 && dealerCardSum === 21) {
      outputMessage = `Player 1 cards are ${player1CardSum} <br> Dealer cards are ${dealerCardSum}. <br> It's a tie!`;
      return outputMessage;
    }

    if (player1CardSum === 21) {
      outputMessage = `Player 1 cards are ${player1CardSum} <br> Dealer cards are ${dealerCardSum}. <br> Player 1 wins!`;
      return outputMessage;
    }

    if (dealerCardSum === 21) {
      outputMessage = `Player 1 cards are ${player1CardSum} <br> Dealer cards are ${dealerCardSum}. <br> Player 1 wins!`;
      return outputMessage;
    }
    console.log(
      "Player 1 cards and sum:" +
        player1card[0].rank +
        " " +
        player1card[1].rank +
        " " +
        player1CardSum +
        "Dealer cards and sum:" +
        dealerCard[0].rank +
        " " +
        dealerCard[1].rank +
        " " +
        dealerCardSum
    );
    // Cards are displayed to user if no black jack and player1 decides to hit or stand
    return `No black jack yet.<br> <br> Player 1 cards are ${player1card[0].rank} and ${player1card[1].rank}. <br>Dealer's revealed card is ${dealerCard[1].rank}<br><br>Player 1 - type "hit" or "stand"`;
  }

  // User's cards are analysed for winning/losing conditions

  // Computer decides to hit or stand automatically based on game rules

  // The game either ends or continues
};

//////////
// 01. CREATE A NEW DECK
///////////
var createDeck = function () {
  var newDeck = makeDeck();
  // Shuffle Deck and put into array
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

///////////
//// MAKE THE DECK
///////////
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

////////////
/////SHUFFLE THE DECK
/////////////
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
