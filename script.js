/* Rules

(4) If round ends, compare player hand & dealer hand 
player submit 'end round' 

*/

// generates standard 52-card deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = [' ♡', ' ◇', ' ♧', ' ♤'];

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
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
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

// shuffle elements in the cardDeck array. Return the shuffled deck.
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// reads array of multiple cards attributes in order 
// input: array of card objects, output: '3 of ♤', 'king of ♡', etc.
var readCardMessage = '';
var readCards = function (arrayOfCardObjects) {
  for (i = 0; i < arrayOfCardObjects.length; i += 1) {
    readCardMessage += arrayOfCardObjects[i].name + arrayOfCardObjects[i].suit + '<br>';
  }
  return readCardMessage;
}
// bug: 
// message 1 
// message 1 + message 1 + message 2

// calculate value of cards
var countCards = function (faceUpObject, faceDownArrayOfObjects) {
  // combine to single hand
  var totalHand = faceDownArrayOfObjects;
  totalHand.push(faceUpObject);

  // loop through each object get the number 
  var finalCount = 0;
  for (i = 0; i < totalHand.length; i += 1) {

    if ( totalHand[i].name == 'king' || totalHand[i].name == 'queen' || totalHand[i].name == 'jack') {
      finalCount += 10;
    }

    else if (totalHand[i].name == 'ace') {
      if (finalCount < 10) {
        finalCount += 11;
      }
      else if (finalCount > 10) {
        finalCount += 1;
      }
    } 

    else if (totalHand[i].name <= 10 || totalHand[i].name >= 2) {
      // default is to add number into final number
      finalCount += totalHand[i].name;
    }

  }

  return finalCount;

}

// initialise the shuffled card deck before the game starts
var mainDeck = shuffleCards(makeDeck());

// initialise variables 
var playerFaceUpCard; // single object
var playerFaceDownCard = []; // array of objects bc can have multiple 
var playerCount = 0;

var dealerFaceUpCard;
var dealerFaceDownCard = [];
var dealerCount = 0;

var PLAYER_FACE_UP_CARDS;
var PLAYER_FACE_DOWN_CARDS;
var DEALER_FACE_UP_CARDS;
var DEALER_FACE_DOWN_CARDS;

// initialise modes
var START_MODE = 'start mode';
var GAME_MODE = 'game mode';
var END_ROUND = 'finish round';
var mode = START_MODE;

// initialise messages
var PLAYER_FACE_UP_TITLE = `<br><br><strong>PLAYER</strong>
<br><i>Face Up Card:</i> <br>` 
var PLAYER_FACE_DOWN_TITLE = `<br><i>Face Down Card:</i> <br>` 

var DEALER_FACE_UP_TITLE = `<strong>DEALER</strong>
<br><i>Face Up Card:</i> <br>` 
var DEALER_FACE_DOWN_TITLE = `<br><i>Face Up Card:</i> <br>` 

var HIT_OR_STAND = 
  `<br><br>To draw another card, type <strong>hit</strong>.
  <br>To hold your cards, type <strong>stand</strong>.
  <br>When you are done, type <strong>end</strong>.`

var PLAYER_WINNER = `Player wins!`
var PLAYER_LOSER = `Players loses!`


var main = function (input) {



  if (mode == START_MODE) {
    console.log('mode is ' + mode);

    // player gets dealt face up card
    playerFaceUpCard = mainDeck.pop();
    PLAYER_FACE_UP_CARDS = playerFaceUpCard.name + playerFaceUpCard.suit;

    // player gets dealt face down card
    playerFaceDownCard.push(mainDeck.pop());
    PLAYER_FACE_DOWN_CARDS = readCards(playerFaceDownCard);

    // dealer gets dealt face up card 
    dealerFaceUpCard = mainDeck.pop();
    DEALER_FACE_UP_CARDS = dealerFaceUpCard.name + dealerFaceUpCard.suit;

    // dealer gets dealt face down cards
    dealerFaceDownCard.push(mainDeck.pop());

    // dealer counts cards
    dealerCount = countCards(dealerFaceUpCard, dealerFaceDownCard);
    
    var START_MODE_MESSAGE = 
      DEALER_FACE_UP_TITLE + DEALER_FACE_UP_CARDS + 
      PLAYER_FACE_UP_TITLE + PLAYER_FACE_UP_CARDS + `<br>` +
      PLAYER_FACE_DOWN_TITLE + PLAYER_FACE_DOWN_CARDS;

    // user will be asked to hit or stand
    mode = GAME_MODE;

    return START_MODE_MESSAGE + HIT_OR_STAND;
  }

  if (mode == GAME_MODE) {
    console.log('mode is ' + mode);

    // when next round comes, whether or not player hits or stands, dealer must hit cards if below 17
    
    // count dealer's cards
    // dealerCount = countCards(dealerFaceUpCard, dealerFaceDownCard);

    // if dealer's cards is below 17, cards get added to dealer's face down hand 
    while (dealerCount < 17) {
      dealerFaceDownCard.push(mainDeck.pop());
      dealerCount = countCards(dealerFaceUpCard, dealerFaceDownCard);
    }
    console.log('dealer count is ' + dealerCount);

    // if user types in 'hit'
    if (input == 'hit') {
      // add another card to face down deck
      playerFaceDownCard.push(mainDeck.pop());

    } 

    // if player types 'end', player ends the round
    else if (input == 'end') {
      mode = END_ROUND;
      return `Click <strong>Submit</strong> to reveal cards.`;
    }

    // if the input is anything other than 'stand'
    else if (input != 'stand') { 
      return HIT_OR_STAND;
    }



    // print player and dealer face up cards
    PLAYER_FACE_UP_CARDS = playerFaceUpCard.name + playerFaceUpCard.suit;
    DEALER_FACE_UP_CARDS = dealerFaceUpCard.name + dealerFaceUpCard.suit;
    PLAYER_FACE_DOWN_CARDS = readCards(playerFaceDownCard);

    var REVEAL_HAND_MESSAGE = 
      DEALER_FACE_UP_TITLE + DEALER_FACE_UP_CARDS + 
      PLAYER_FACE_UP_TITLE + PLAYER_FACE_UP_CARDS + `<br>` +
      PLAYER_FACE_DOWN_TITLE + PLAYER_FACE_DOWN_CARDS;

    return REVEAL_HAND_MESSAGE + HIT_OR_STAND; 
  }

  // determine winner dealer vs player
  if (mode = END_ROUND) {
    var RESULT;

    // count player's cards 
    playerCount = countCards(playerFaceUpCard, playerFaceDownCard);

    // player winning conditions
    if (playerCount == 21 && dealerCount != 21 ||
      playerCount > dealerCount && playerCount < 22 ||
      dealerCount > 21) {
      RESULT = PLAYER_WINNER; 
    }

    // dealer wins
    else {
      RESULT = PLAYER_LOSER;
    }

    // print player and dealer face up cards
    PLAYER_FACE_UP_CARDS = playerFaceUpCard.name + playerFaceUpCard.suit;
    DEALER_FACE_UP_CARDS = dealerFaceUpCard.name + dealerFaceUpCard.suit;
    PLAYER_FACE_DOWN_CARDS = readCards(playerFaceDownCard);

    var REVEAL_WINNER_MESSAGE = 
      RESULT + `<br>` + 
      DEALER_FACE_UP_TITLE + DEALER_FACE_UP_CARDS + 
      PLAYER_FACE_UP_TITLE + PLAYER_FACE_UP_CARDS + `<br>` +
      PLAYER_FACE_DOWN_TITLE + PLAYER_FACE_DOWN_CARDS;

    return REVEAL_WINNER_MESSAGE;
  }

  mode = START_MODE;
}; 