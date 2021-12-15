//psuedo code
//1. create a card deck object and shuffle it and store it at global state
//2. ask how many players are playing (max. 4) and initilize the number of player object
//3. ask each player name and betting amount and store in the player object
//4. once all players are initialize, can begin to play. Deal 2 cards to each players followed by the dealer.
//    a. one of dealer card is not shown
//5. beginning from player 1 adds up the sum at hand and store it
//    a. use global states to control which player is playing at the moment (for DOM control)
//    b. jack/queen/king is 10 and aces is 1 or 11.
//    c. if player has blackjack and dealer is not a blackjack, player win automatically, get paid 3:2 and player will reset and wait for next round.
//    d. else, allow the player to choose hit or stand or /split (if in pairs)/ or double or quit (lose the bet and stop playing)
//    f. if hit and bust, lose the bet and wait for next round
//    g. else save the score and move to next player and repat a-f.
//6. dealer see if total card score is equal or above 17, if not draw until it is above 17 and stop
//    a. if bust, award bet to non busted players
//    b. else, compare score and award bet to non busted players with higher score
//    c. else,
//7. restart hand and repeat step 4 - 6 until deck.length is less than 26 and reshuffle and repeat step 4-6.
//8. include quit function to restart the whole game

//initializing global variables & setting up initial game status & arrays
const pendingNumOfPlayers = "pending number of players";
const pendingPlayersNames = "pending players' names";
const pendingPlayersCash = "pending cash from players";
const pendingBets = "pending players to place bets";
const dealingCards = "dealer dealing cards after bets are placed";
const hitStandSplit = "";
let shuffledDeck;
let deck = [];
let playersArray = [];
let playersArrayIndex = 0;
let totalNumOfPlayers;
let gameStatus = pendingNumOfPlayers;
let dealer = { cards: [], cardPoints: 0 };

const makeDeck = function () {
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
      var point = rankCounter;
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

      if (cardName == "jack") {
        point = 10;
      } else if (cardName == "queen") {
        point = 10;
      } else if (cardName == "king") {
        point = 10;
      } else if (cardName == "ace") {
        point = 11;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        point: point,
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
const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
const shuffleCards = function (cardDeck) {
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

//creating object factory to generate player object
const createPlayer = (name) => {
  return {
    name: name,
    cash: 0,
    cards: [],
    cardPoints: 0,
    bets: 0,
  };
};

//function to initialize the playersArray for storing players info
const initializePlayersArray = (totalNumOfPlayers) => {
  playersArray = [];
  for (i = 0; i < totalNumOfPlayers; i += 1) {
    playersArray.push(createPlayer(i + 1));
  }
  console.log(playersArray);
};

//function to place bets
const placeBets = function (input) {
  if (isNaN(input) || input == "") {
    return `Hello ${playersArray[playersArrayIndex].name}, please place your bets.`;
  }
  if (playersArrayIndex + 1 == playersArray.length) {
    playersArray[playersArrayIndex].bets = Number(input.trim());
    playersArrayIndex = 0;
    gameStatus = dealingCards;
    return "Please press submit button to deal the cards.";
  } else {
    playersArray[playersArrayIndex].bets = Number(input.trim());
    playersArrayIndex += 1;
    return `Hi ${playersArray[playersArrayIndex].name}, please place your bets.`;
  }
};

//creating deal function
const dealCards = function () {
  for (i = 0; i < 2; i += 1) {
    for (j = 0; j < playersArray.length; j += 1) {
      playersArray[j].cards.push(shuffledDeck.pop());
    }
    dealer.cards.push(shuffledDeck.pop());
  }
};

//creating function to read the hand cards and store the points in player's object (deciding if i should count everyone at one go or individual players)
const countCardPoints = function (playersArray) {
  for (i = 0; i < playersArray.length; i += 1) {
    playersArray[i].cardPoints = 0;
    for (j = 0; j < playersArray[i].cards.length; j += 1) {
      playersArray[i].cardPoints += playersArray[i].cards[j].point;
    }
    if (playersArray[i].cardPoints > 21) {
      playersArray[i].cardPoints = 0;
      for (j = 0; j < playersArray[i].cards.length; j += 1) {
        if (playersArray[i].cards[j].name == "ace") {
          playersArray[i].cards[j].point = 1;
        }
        playersArray[i].cardPoints += playersArray[i].cards[j].point;
      }
    }
  }
  dealer.cardPoints = 0;
  for (k = 0; k < dealer.cards.length; k += 1) {
    dealer.cardPoints += dealer.cards[k].point;
  }
  if (dealer.cardPoints > 21) {
    dealer.cardPoints = 0;
    for (k = 0; k < dealer.cards.length; k += 1) {
      if (dealer.cards[k].name == "ace") {
        dealer.cards[k].point = 1;
      }
      dealer.cardPoints += dealer.cards[k].point;
    }
  }
};

deck = makeDeck();
shuffledDeck = shuffleCards(deck);

var main = function (input) {
  if (gameStatus == pendingNumOfPlayers) {
    if (isNaN(input) || input == "") {
      return "Hello user, please kindly input a number for the number of players.";
    }
    totalNumOfPlayers = Number(input);
    initializePlayersArray(totalNumOfPlayers);
    gameStatus = pendingPlayersNames;
    return `Hi player ${playersArray[playersArrayIndex].name}, may I have your name please?`;
  }

  if (gameStatus == pendingPlayersNames) {
    if (!isNaN(input) || input == "") {
      return `Hello player ${playersArray[playersArrayIndex].name}, please kindly provide your name.`;
    }
    if (playersArrayIndex + 1 == playersArray.length) {
      playersArray[playersArrayIndex].name = input.trim();
      gameStatus = pendingPlayersCash;
      return `Hello ${playersArray[playersArrayIndex].name}, how much would you like to cash in?`;
    } else {
      playersArray[playersArrayIndex].name = input.trim();
      gameStatus = pendingPlayersCash;
      return `Hi ${playersArray[playersArrayIndex].name}, how much would you like to cash in?`;
    }
  }

  if (gameStatus == pendingPlayersCash) {
    if (isNaN(input) || input == "") {
      return `Hello ${playersArray[playersArrayIndex].name}, please let us know how much cash would you like to play with?`;
    }
    if (playersArrayIndex + 1 == playersArray.length) {
      playersArray[playersArrayIndex].cash = Number(input);
      gameStatus = pendingBets;
      playersArrayIndex = 0;
      return `Press submit to start placing your bets.`;
    } else {
      playersArray[playersArrayIndex].cash = Number(input.trim());
      playersArrayIndex += 1;
      gameStatus = pendingPlayersNames;
      return `Hi player ${playersArray[playersArrayIndex].name}, may I have your name please?`;
    }
  }
  if (gameStatus == pendingBets) {
    placeBets(input);
  }

  if (gameStatus == dealingCards) {
    if (input == "") {
      return "Please press submit to deal the cards.";
    }
    dealCards(shuffledDeck);
    countCardPoints(playersArray);
  }
};
