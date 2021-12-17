//The main function runs on each player's turn. The sequence of actions in the game might be the following.
// Create a deck.
// Deck is shuffled.
// Multiplayer can play.
//  a. User to input number of players playing.
//  b. Generate the number of players according to the input number.
//  c. Players have attributes: Player Number, Chips.
// Players to determine how much chip to bet for that round.
// Player clicks Draw Hand to receive 2 cards each.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// Each player is able to choose to Hit, Stand or Split by clicking the respective buttons.
// The user's cards are analysed for winning or losing conditions.
// Hide dealer's first card
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues

// Function to creat a deck of cards
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

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

// Create a deck of cards
var deck = makeDeck();
// Shuffled deck of cards
var shuffledDeck = shuffleCards(deck);
// Output message of player card
var playerOutput = function (cardsArray) {
  var message = "";
  for (i = 0; i < cardsArray.length; i += 1) {
    message += cardsArray[i].name + " of " + cardsArray[i].suit + " ";
  }
  return message;
};

const ENTER_NUM_PLAYER = "enter number of players";
const ENTER_BET = "enter number of chips to bet";
const DEAL_CARD = "deal cards to players";
let gameMode = ENTER_NUM_PLAYER;
var totalNumOfPlayersPlaying = [];
var playerCounter = 0;
var main = function (input) {
  var myOutputValue = "";
  if (gameMode == ENTER_NUM_PLAYER) {
    var playerLimit = ["1", "2", "3", "4"];
    // Multiplayer can play.
    //  a. User to input number of players playing.
    //  b. Generate the number of players according to the input number.
    //  c. Players have attributes: Player Number, Chips.
    if (playerLimit.includes(input)) {
      for (i = 1; i <= input; i += 1) {
        var player = {
          number: i,
          chips: 100,
          bet: 0,
        };
        totalNumOfPlayersPlaying.push(player);
      }
      gameMode = ENTER_BET;
      input = null;
      return (myOutputValue = `Time to place your bet! Each player has 100 chips to play. <br> Player 1, please submit your bet amount.`);
    } else {
      myOutputValue =
        "Please enter the number of players playing (max. 4 players).";
    }
  }

  // Players to determine how much chip to bet for that round.
  //  a. Enter bet mode to take in player bets.
  if (gameMode == ENTER_BET) {
    //  b. Num of players unknown so will need to determine if the player counter meets the length of total number of player array.
    //  c. For each player in the array, replace the bet value with the input value the user entered.
    //    i. Need to convert each player's input into number.
    //    ii. Validate user input.
    //  d. Once done, enter draw card mode.
    if (input != "" && playerCounter + 1 == totalNumOfPlayersPlaying.length) {
      totalNumOfPlayersPlaying[playerCounter].bet = Number(input);
      playerCounter = 0;
      gameMode = DEAL_CARD;
    } else if (
      Number(input) > 0 &&
      Number(input) < totalNumOfPlayersPlaying[playerCounter].chips
    ) {
      totalNumOfPlayersPlaying[playerCounter].bet = Number(input);
      playerCounter += 1;
      myOutputValue = `Player ${totalNumOfPlayersPlaying[playerCounter].number}, it is your turn to place bet.`;
    } else {
      myOutputValue = `Player ${totalNumOfPlayersPlaying[playerCounter].number}, you have ${totalNumOfPlayersPlaying[playerCounter].chips} chips. Please place bet within your limit.`;
    }
  }

  return myOutputValue;
};
