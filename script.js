// pseudo-code
// Deck is shuffled. using shuffle helper function

var currentGameMode = "Waiting for players..";
console.log(currentGameMode);

// keeping track of each player's hands of cards
var humanHands = [];
var computerHands = [];

// keeping track of each player's chosen card with suit and rank
var humanCard;
var computerCard;

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

var displaySingleCard = function () {
  var deck = makeDeck();
  var shuffledDeck = shuffleCards(deck);
  var drawnCard = shuffledDeck.pop();
  return ` ${drawnCard.name} of ${drawnCard.suit}`;
};

// There will be only two players. One human and one computer, need to assign variable, input will represent human
// The computer will always be the dealer. Reference dice roll solution

var main = function (input) {
  // Each player gets dealt two cards to start. Human player will click Submit to deal/draw the two cards, at the same time dealer will show his two cards. Use console.log
  // Put human player and computer's two cards value in an array

  computerStartingCards = [displaySingleCard(), displaySingleCard()];
  console.log("starting 2 cards for computer", computerStartingCards);

  humanStartingCards = [displaySingleCard(), displaySingleCard()];
  console.log("starting 2 cards for human player", humanStartingCards);

  currentGameMode = "Round to decide on hit or stand";
  console.log("Human player decide to hit or stand", currentGameMode);

  var concatenateToNumbers = function (num1, num2) {
    return Number(String(num1) + String(num2));
  };

  // Concatenate human player and computer's values. Reference beatThat solution
  var humanCurrRank = concatenateToNumbers(
    humanStartingCards[0],
    humanStartingCards[1]
  );

  var computerCurrRank = concatenateToNumbers(
    computerStartingCards[0],
    computerStartingCards[1]
  );

  // Show the arrays in output e.g. 'Human has cards [x, y] with total value/rank of (x+y), computer has cards [a,b] with total value/rank of (a+b)'
  var myOutputValue = `Human has drawn ${humanStartingCards} with total value/rank of ${humanCurrRank}. Computer has drawn ${computerStartingCards} with total value/rank of ${computerCurrRank}`;

  // Put in conditions for blackjack - ace king, ace queen, ace jack, ace ten, else just show arrays in output
  if (
    (humanStartingCards[0] == "ace" && humanStartingCards[1] == "jack") ||
    (humanStartingCards[0] == "ace" && humanStartingCards[1] == "queen") ||
    (humanStartingCards[0] == "ace" && humanStartingCards[1] == "king") ||
    (humanStartingCards[0] == "ace" && humanStartingCards[1] == 10) ||
    (humanStartingCards[1] == "ace" && humanStartingCards[0] == "jack") ||
    (humanStartingCards[1] == "ace" && humanStartingCards[0] == "queen") ||
    (humanStartingCards[1] == "ace" && humanStartingCards[0] == "king") ||
    (humanStartingCards[1] == "ace" && humanStartingCards[0] == 10)
  ) {
    console.log("blackjack for human!", displaySingleCard);
    return "Blackjack! You've won the game";
  }
  if (
    (computerStartingCards[0] == "ace" && computerStartingCards[1] == "jack") ||
    (computerStartingCards[0] == "ace" &&
      computerStartingCards[1] == "queen") ||
    (computerStartingCards[0] == "ace" && computerStartingCards[1] == "king") ||
    (computerStartingCards[0] == "ace" && computerStartingCards[1] == 10) ||
    (computerStartingCards[1] == "ace" && computerStartingCards[0] == "jack") ||
    (computerStartingCards[1] == "ace" &&
      computerStartingCards[0] == "queen") ||
    (computerStartingCards[1] == "ace" && computerStartingCards[0] == "king") ||
    (computerStartingCards[1] == "ace" && computerStartingCards[0] == 10)
  ) {
    // If either human player and computer's two cards are blackjack, immediately show output that the player won.
    console.log("blackjack for computer!", displaySingleCard);
    return "Blackjack! You've won the game";
  }

  // Human player decides if they want to hit (draw a card) or stand (end their turn). There is a game mode here, where input 'hit' or 'stand' can determine next step or turn.

  // Consider input validation if human player doesn't input 'hit' or 'stand', show 'please input 'hit' to draw a card or 'stand' to pass

  // If hit, go game mode 'draw a card'. Console.log to differentiate from computer game mode.

  if (currentGameMode == "Round to decide on hit or stand" && input == "hit") {
    // At this 'draw a card' game mode, draw card from deck and show the new card in output value and push the newest card to the array using .push and then add the values.
    humanStartingCards = [displaySingleCard(), displaySingleCard()];
    console.log("starting 2 cards for human player", humanStartingCards);
    humanStartingCards.push(displaySingleCard());
    humanHands = humanStartingCards;

    currentGameMode = "Player hit and drew a card";
    console.log("Human decided to hit and draw a card", currentGameMode);

    if (humanCurrRank > 21) {
      // Show the output after the new card is added and the latest value/rank
      return `Busted! Human has ${humanHands} with a total value/rank of ${humanCurrRank} and is more than 21! Let's wait... you still have a chance for a tie if the computer also gets busted!'`;
    } else currentGameMode = "Player stand and pass the round";
    console.log("Nice save! Now computer's turn to draw", currentGameMode);
    return `Phew! Human has ${humanHands} with a total value/rank of ${humanCurrRank}.`;
  }

  if (
    currentGameMode == "Round to decide on hit or stand" &&
    input == "stand"
  ) {
    humanStartingCards = [displaySingleCard(), displaySingleCard()];
    console.log("starting 2 cards for human player", humanStartingCards);
    humanHands = humanStartingCards;

    currentGameMode = "Player stand and pass the turn";
    console.log("Human decided to stand and pass the card", currentGameMode);

    return `Human has ${humanHands} with a total value/rank of ${humanCurrRank}.`;
  }

  return myOutputValue;
};

// Show the output after the new card is added and the latest value/rank
// If total value > 21, shows the output 'Busted! Let's wait... you still have a chance if the computer also gets busted!'
// If total value > 21 then also switch to 'pass, dealer's next' game mode
// If total value < 21, can still draw and input 'hit'. If total value is still < 21, shows normal output 'Human has cards [x, y, z, w] with total value of (x+y+z+w). Can still put 'hit' or 'stand to continue.

// If stand, go game mode 'pass'. Console.log to differentiate from computer game mode like 'dealer's next'. Once at 'pass' game mode, dealer's turn to click Submit for the next card.
// If dealer's current card value/rank is < 17, when he clicks Submit, immediately draw a card.
// If dealer's current card rank (in an array) is > 17, there is a game mode here, where input 'hit' or 'stand' can determine next step or turn.
// If hit, go game mode 'draw a card'. Console.log to differentiate from human game mode. At this game mode, another card drawn. Show the new card in output value and push the newest card to the array using .push and then add the values.
// Show the output after the new card is added and the latest value/rank for computer, at the same time shows the final conclusion together without the need to click submit button
// If computer total value/rank > 21, shows the output 'Busted! Computer and human player both loses'
// If computer total rank/value > human player rank, shows output, 'Computer wins'
// If computer total rank/value < human player rank, shows output, 'Human wins'
// If computer total rank/value = human player rank, shows output, 'It's a tie'
// Game ends.
