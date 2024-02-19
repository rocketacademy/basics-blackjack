//This ia a game of Blacjack!
//Assumes two users, player vs. dealer
//Allows player and dealer to hit or stand
//Calculates Blackjack win

//2 users; player vs. dealer (computer)
var player = "Player";
var dealer = "Dealer";
var playerHand = [];
var dealerHand = [];
var gameDeck = [];

//Modes to run the game
//1) Start game, 2) Calculate cards, 3) Player decides hit or stand, 4) Show results
var modeGameStart = "start game";
var modeCalculateCards = "calculate cards";
var modePlayerHitStand = "player hit or stand";
var modeShowResults = "show results";

//Start the game
var currentGameMode = modeGameStart;

//<----- DECK FUNCTIONS ----->

//Function to create a deck of cards
var createDeck = function () {
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  var ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  var deck = [];

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for (var rankIndex = 0; rankIndex < ranks.length; rankIndex++) {
      var card = {
        rank: ranks[rankIndex],
        suit: suits[suitIndex],
      };

      //Assign value to the card
      if (
        ranks[rankIndex] === "J" ||
        ranks[rankIndex] === "Q" ||
        ranks[rankIndex] === "K"
      ) {
        card.value = 10;
      } else if (ranks[rankIndex] === "A") {
        card.value = 11;
      } else {
        card.value = parseInt(ranks[rankIndex]);
      }

      deck.push(card);
    }
  }

  return deck;
};

//Function to shuffle deck that is created by swapping card's position with another card in the deck, loops through the entire deck until all cards are shuffled

var shuffleDeck = function (shuffle) {
  // n is defined as the number of cards in the deck
  var n = shuffle.length;
  while (n > 1) {
    // Generate a random index between 0 and n (n > 1 so that while loop continues as long as n is greater than 1)
    // Math.random times n gives random number between 0 (inclusive) and n (exclusive), Math.floor to round down to integer
    //Then, n-- decrements the value of n after it's been used, ensuring that the random index will always be between 0 and n-1.
    var randomIndex = Math.floor(Math.random() * n--);
    //Temporarily stores the card at position 'n'
    var temp = shuffle[n];
    //Swap the current card with the card at the random index
    shuffle[n] = shuffle[randomIndex];
    shuffle[randomIndex] = temp;
  }
  return shuffle;
};

//Function to create AND shuffle deck
var prepareDeck = function () {
  var myDeck = createDeck();
  var shuffledDeck = shuffleDeck(myDeck);
  return shuffledDeck;
};

//Function to deal cards
//Use pop to hand out cards from deck (gameDeck)
//Use push to add to respective arrays (hand)
var dealCards = function (hand, numCards) {
  for (var i = 0; i < numCards; i++) {
    hand.push(gameDeck.pop());
  }
};

//<----- GAME FUNCTIONS ----->

//Check for Blackjack scenario first, because if player or dealer has Blackjack, automatically wins the game
var checkForBlackjack = function (handArray) {
  var userCardOne = handArray[0];
  var userCardTwo = handArray[1];
  var isBlackjack = false;

  var isTenCard = function (rank) {
    return rank === "10" || rank === "J" || rank === "Q" || rank === "K";
  };

  if (
    (userCardOne.rank === "A" && isTenCard(userCardTwo.rank)) ||
    (userCardTwo.rank === "A" && isTenCard(userCardOne.rank))
  ) {
    isBlackJack = true;
  }
  return isBlackjack;
};

//Calculate total value of hand
//Ace has assigned value of 11 unless total score becomes > 21, then assume value of 1

var calculateHandValue = function (handArray) {
  var handValue = 0;
  var hasAce = false;

  // Calculate the initial hand value
  for (var i = 0; i < handArray.length; i++) {
    var cardValue = handArray[i].value;
    handValue += cardValue;
    if (handArray[i].rank === "A") {
      hasAce = true;
    }
  }

  // If hand value exceeds 21 and there's an Ace, reduce Ace's value from 11 to 1
  if (handValue > 21 && hasAce) {
    handValue -= 10;
  }

  return handValue;
};

//Function to show player and dealer's hands respectively
var displayHands = function (playerHandArray, dealerHandArray) {
  var playerCardOne = playerHandArray[0];
  var playerCardTwo = playerHandArray[1];
  var dealerCardOne = dealerHandArray[0];
  var dealerCardTwo = dealerHandArray[1];

  var playerHandMessage = `Player's hand:<br>${playerCardOne.rank} of ${playerCardOne.suit}<br>${playerCardTwo.rank} of ${playerCardTwo.suit}<br><br>`;
  var dealerHandMessage = `Dealer's hand:<br>${dealerCardOne.rank} of ${dealerCardOne.suit}<br>${dealerCardTwo.rank} of ${dealerCardTwo.suit}<br>`;

  return playerHandMessage + dealerHandMessage;
};

//Function to show player and dealer's values respectively
var displayValue = function (playerHandArray, dealerHandArray) {
  var playerValue = calculateHandValue(playerHandArray);
  var dealerValue = calculateHandValue(dealerHandArray);

  var playerValueMessage = `Players's value: ${playerValue}`;
  var dealerValueMessage = `Dealer's value: ${dealerValue}`;
  return playerValueMessage + dealerValueMessage;
};

//<----- MAIN FUNCTION (YAY!) ----->

var main = function (input) {
  var outputMessage = "";

  //Create and shuffle deck of cards
  if (currentGameMode === modeGameStart) {
    gameDeck = prepareDeck();
    //Deal cards
    dealCards(playerHand, 2);
    dealCards(dealerHand, 2);

    currentGameMode = modeCalculateCards;

    outputMessage =
      "Two cards have been dealt. Click again to view and evaluate your cards.";
    return outputMessage;
  }

  //Run cards for Blackjack first
  if (currentGameMode === modeCalculateCards) {
    var playerBlackjack = checkForBlackjack(playerHand);
    var dealerBlackjack = checkForBlackjack(dealerHand);
    var handsMessage = displayHands(playerHand, dealerHand);
    var valueMessage = displayValue(playerHand, dealerHand);

    //console.log: check if either user has Blackjack
    console.log("Player hit Blackjack? " + playerBlackjack);
    console.log("Dealer hit Blackjack? " + dealerBlackjack);

    //if only player has Blackjack, player wins
    if (playerBlackjack && !dealerBlackjack) {
      outputMessage =
        handsMessage + valueMessage + "<br> Player has Blackjack! Player wins!";
    }
    //if only dealer has Blackjack, dealer wins
    else if (!playerBlackjack && dealerBlackjack) {
      outputMessage =
        handsMessage + valueMessage + "<br> Dealer has Blackjack! Dealer wins!";
    }
    //if both has Blackjack, it's a tie
    else if (playerBlackjack && dealerBlackjack) {
      outputMessage =
        handsMessage +
        valueMessage +
        "<br> It's a tie! Both of dealer and player has Blackjack!";
    }

    //if neither has Blackjack, continue to hit or stand
    else {
      outputMessage =
        handsMessage +
        valueMessage +
        "<br> No one has Blackjack.<br>Please enter 'hit' or 'stand'.";
      currentGameMode = modePlayerHitStand;
    }
    return outputMessage;
  }

  //Let player decide to hit or stand
  if (currentGameMode === modePlayerHitStand) {
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        handsMessage +
        "<br> You drew another card. Input 'hit' for another card or else, input 'stand' to end your turn.";
    }
    //If player chooses to "stand", then dealer's turn to decide push or stand
    //Dealer to draw extra card if value is 16 and below
    else if (input == "stand") {
      while (dealerValue <= 16) {
        dealerHand.push(gameDeck.pop());
      }
      //Once dealer's hand value is 17 or higher, the dealer stansd
      var playerFinalValue = calculateHandValue(playerHand);
      var dealerFinalValue = calculateHandValue(dealerHand);
    }
  }
  //Time to decide a winner!
  //If player wins
};
