//To create entire deck object --> need to change rank for blackjack
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
// Initialise the card deck representation as an array of objects
var deck = makeDeck();

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(deck);

//2 players: player vs computer
//Computer always dealer
//Player & computer gets 2 cards at first
//Cards analysed for game winning conditions (blackjack)
var checkBlackjack = function (drawnCards) {
  var totalPoints = drawnCards[0].rank + drawnCards[1].rank;
  if (totalPoints == 21) {
    var myOutputValue = "Blackjack! You won!";
  } else {
    //just display cards and current points to user
    myOutputValue =
      "You have drawn " +
      drawnCards[0].name +
      " of " +
      drawnCards[0].suit +
      " and " +
      drawnCards[1].name +
      " of " +
      drawnCards[1].suit +
      ". <br> Your current points are " +
      totalPoints;
  }
  return myOutputValue;
};

//Player first --> decide to hit (draw card) or stand (end)
//Dealer (computer) must hit if hand <17
//Total score is total of card ranks: J,Q,K = 10, Ace = 1 or 11
//Closer to or not >21 --> Winner

var decideHitOrStand = function (decision, drawnCards) {
  var outputPlayerCard = "";
  var myOutputValue = " ";
  var myOutputValue1 = " ";
  if (decision == "hit") {
    //draw another card
    drawnCards.push(shuffledDeck.pop());
  } else if (decision == "stand") {
    //end turn if player's turn and continue with computer's turn. If it's computer's turn, move to compare points.
    myOutputValue1 = "Player chose stand. It's the computer's turn.";
  } else {
    // error, only can choose hit or stand
    myOutputValue1 =
      "Invalid choice. Please only choose 'hit' or 'stand'. Click submit button to try again.";
  }

  //output all cards on hand
  for (let i = 0; i < drawnCards.length; i++) {
    outputPlayerCard =
      outputPlayerCard +
      "<br> " +
      playerCard[i].name +
      " of " +
      playerCard[i].suit;
  }

  myOutputValue =
    myOutputValue1 + "<br> Player's drawn cards: " + outputPlayerCard;
  return myOutputValue;
};

var currentPlayer = "Player"; //switch between Player and Computer

var main = function (input) {
  // Draw 2 cards per player, store into array
  var computerCards = [];
  var playerCards = [];
  var outputComputerCard = "";
  var outputPlayerCard = "";
  for (let i = 0; i < 2; i++) {
    //const element = array[i];
    computerCards.push(shuffledDeck.pop());
    playerCards.push(shuffledDeck.pop());
    outputComputerCard =
      computerCards +
      "<br> " +
      computerCards[i].name +
      " of " +
      computerCards[i].suit;
    outputPlayerCard =
      outputPlayerCard +
      "<br> " +
      playerCards[i].name +
      " of " +
      playerCards[i].suit;
  }
  console.log(computerCards);
  console.log(playerCards);
  console.log(outputPlayerCard);
  console.log(outputComputerCard);

  return myOutputValue;
};
