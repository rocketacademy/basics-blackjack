var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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

      // IF Jack, Queen, King then Rank = 10
      if (cardName == 'jack' || cardName == 'queen' || cardName == 'king') {
        card.rank = 10;
      }

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

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
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

var aceLogic = function () {
// ace logic
  if (playerCards[0].name == 'ace' && playerCards[1].name == 'ace') {
    playerCardsSum += 19;
  }

  else if (playerCardsArray.includes('ace of hearts') == true || playerCardsArray.includes('ace of clubs') == true || playerCardsArray.includes('ace of diamonds') == true || playerCardsArray.includes('ace of diamonds') == true && playerCardsSum < 21 && playerCardsArray.length < 2) {
    playerCardsSum += 10;
  }

  if (computerCards[0].name == 'ace' && computerCards[1].name == 'ace') {
    computerCardsSum += 19;
  }
  else if (computerCardsArray.includes('ace of hearts') == true || computerCardsArray.includes('ace of clubs') == true || computerCardsArray.includes('ace of diamonds') == true || computerCardsArray.includes('ace of diamonds') == true && computerCardsSum < 21 && computerCardsArray.length < 2) {
    computerCardsSum += 10;
  }
};

var compareLogic = function () {
  var outputValue = '';
  if (computerCardsSum > 21 && playerCardsSum > 21) {
    outputValue = 'Your Cards: ' + playerCardsArray + '<br>Sum of your cards: ' + playerCardsSum
      + '<br><br> Computer Cards: ' + computerCardsArray + '<br> Sum of computer cards: ' + computerCardsSum
      + '<br><br>You both exploded and lost 💥💥';
  }

  else if (computerCardsSum < 16 && playerCardsSum < 16) {
    outputValue = 'Your Cards: ' + playerCardsArray + '<br>Sum of your cards: ' + playerCardsSum
      + '<br><br> Computer Cards: ' + computerCardsArray + '<br> Sum of computer cards: ' + computerCardsSum
      + '<br><br>You both had cards under 16. Nobody wins 😭';
  }

  else if (computerCardsSum < 16 && playerCardsSum > 21) {
    outputValue = 'Your Cards: ' + playerCardsArray + '<br>Sum of your cards: ' + playerCardsSum
      + '<br><br> Computer Cards: ' + computerCardsArray + '<br> Sum of computer cards: ' + computerCardsSum
      + '<br><br>You both did not meet the requirements. Nobody wins 😭';
  }

  else if (playerCardsSum < 16 && computerCardsSum > 21) {
    outputValue = 'Your Cards: ' + playerCardsArray + '<br>Sum of your cards: ' + playerCardsSum
      + '<br><br> Computer Cards: ' + computerCardsArray + '<br> Sum of computer cards: ' + computerCardsSum
      + '<br><br>You both did not meet the requirements. Nobody wins 😭';
  }

  else if (computerCardsSum == playerCardsSum) {
    outputValue = 'Your Cards: ' + playerCardsArray + '<br>Sum of your cards: ' + playerCardsSum
      + '<br><br> Computer Cards: ' + computerCardsArray + '<br> Sum of computer cards: ' + computerCardsSum
      + '<br><br>You both drew the same value. Nobody wins 😭';
  }

  else if (computerCardsSum > 21) {
    outputValue = 'Your Cards: ' + playerCardsArray + '<br>Sum of your cards: ' + playerCardsSum
      + '<br><br> Computer Cards: ' + computerCardsArray + '<br> Sum of computer cards: ' + computerCardsSum
      + '<br><br>Player wins 🥳';
  }

  else if (playerCardsSum > 21) {
    outputValue = 'Your Cards: ' + playerCardsArray + '<br>Sum of your cards: ' + playerCardsSum
      + '<br><br> Computer Cards: ' + computerCardsArray + '<br> Sum of computer cards: ' + computerCardsSum
      + '<br><br>Computer wins 👾';
  }

  else if (computerCardsSum > playerCardsSum) {
    outputValue = 'Your Cards: ' + playerCardsArray + '<br>Sum of your cards: ' + playerCardsSum
      + '<br><br> Computer Cards: ' + computerCardsArray + '<br> Sum of computer cards: ' + computerCardsSum
      + '<br><br>Computer wins 👾'; }

  else if (playerCardsSum > computerCardsSum) {
    outputValue = 'Your Cards: ' + playerCardsArray + '<br>Sum of your cards: ' + playerCardsSum
      + '<br><br> Computer Cards: ' + computerCardsArray + '<br> Sum of computer cards: ' + computerCardsSum
      + '<br><br>Player wins 🥳';
  }
  return outputValue;
};

// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

var playerCards = [];
var computerCards = [];

var playerCardsSum = 0;
var computerCardsSum = 0;

var playerCardsArray = [];
var computerCardsArray = [];

var computerMove = '';

var gameMode = 'default';

var main = function (input) {
  // GameMode = default. User clicks Submit to deal cards. User gets 2 cards, computer gets 2 cards
  if (gameMode == 'default') {
    playerCards = deck.splice(0, 2);
    computerCards = deck.splice(0, 2);

    for (var playerCardCounter = 0; playerCardCounter < playerCards.length; playerCardCounter += 1) {
      playerCardsArray.push(playerCards[playerCardCounter].name + ' of ' + playerCards[playerCardCounter].suit);
    }
    for (var computerCardCounter = 0; computerCardCounter < computerCards.length; computerCardCounter += 1) {
      computerCardsArray.push(computerCards[computerCardCounter].name + ' of ' + computerCards[computerCardCounter].suit);
    }

    playerCardsSum = playerCards.reduce((n, { rank }) => n + rank, 0);
    computerCardsSum = computerCards.reduce((n, { rank }) => n + rank, 0);

    var myOutputValue = 'Your Cards: ' + playerCardsArray + '<br><br>Press Submit again to make your choice ☝️';

    gameMode = 'playerMakeChoice';
  }

  // Ask Player to make choice
  else if (gameMode == 'playerMakeChoice') {
    if (input == 'draw') {
      gameMode = 'playerDraw';
    }
    else if (input == 'hold') {
      gameMode = 'computersTurn';
    }
    myOutputValue = 'Please enter "draw" or "hold" and press submit TWICE to make your choice ☝️';
  }

  // If player chooses draw, draw new cards for player
  else if (gameMode == 'playerDraw') {
    playerCards.push(deck.pop());
    console.log('playerCards after drawing');
    console.log(playerCards);
    playerCardsArray.push(playerCards[2].name + ' of ' + playerCards[2].suit);
    playerCardsSum = playerCards.reduce((n, { rank }) => n + rank, 0);

    myOutputValue = 'Your Cards: ' + playerCardsArray + "<br><br> It is now the computer's turn. Press submit for the computer to make it's choice 🧠";
    gameMode = 'computersTurn';
  }

  // If player chooses hold or after player has drawn, computer makes move

  else if (gameMode == 'computersTurn') {
  // If computer has less than 16, it will draw a new cards
    if (computerCardsSum < 16) {
      computerCards.push(deck.pop());
      computerCardsSum = computerCards.reduce((n, { rank }) => n + rank, 0);
      computerCardsArray.push(computerCards[2].name + ' of ' + computerCards[2].suit);
      computerMove = 'Draw';
    }
    else if (computerCardsSum > 16) {
      computerMove = 'Hold';
    }
    myOutputValue = 'Your Cards: ' + playerCardsArray + '<br><br> The computer chose to ' + computerMove + '. Press submit again to compare cards ☝️';
    gameMode = 'Compare';
  }

  // compare computer and player cards
  else if (gameMode == 'Compare') {
    aceLogic();
    myOutputValue = compareLogic();
  }
  return myOutputValue;
};

// loop over each player's cards. if sum of cards < 16, then draw one more card and add it to the sum of cards.

// while (playerCardsSum < 16) {
//   playerCards.push(deck.pop());
//   playerCardsSum = playerCards.reduce((n, { rank }) => n + rank, 0);
//   console.log('playerCards after adding');
//   console.log(playerCards);
//   console.log('sum of playerCards after adding');
//   console.log(playerCardsSum);
// }

// while (computerCardsSum < 16) {
//   computerCards.push(deck.pop());
//   computerCardsSum = computerCards.reduce((n, { rank }) => n + rank, 0);
//   console.log('computerCards after adding');
//   console.log(computerCards);
//   console.log('sum of computerCards after adding');
//   console.log(computerCardsSum);
// }

// Ace logic
// If cards contain ace and more than 21, ace = 1
// If cards contain ace and less than 21, ace = 11

// if player cards more than computer card, player wins. if computer card more than player card, player wins

// if sum of cards = 21, then win
// if sum of cards = >21 player lose

// Compare the ranks of the player's and dealer's cards - sum cards in array.

// Whichever is higher wins + if above 21, automatically lose
// If below 16, draw another card
