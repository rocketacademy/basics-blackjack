// created objects to store the player information
var player = {
  name: "player",
  card: [],
  score: 0,
};
var dealer = {
  name: "dealer",
  card: [],
  score: 0,
};
var shuffledDeck = [];
var round = 1;
​
var confirmWinPlayer = {
  name: "confirmWinPlayer",
  card: [],
  score: 21,
};
​
var main = function (input) {
  var deck = makeDeck();
  shuffledDeck = shuffleCards(deck);
  var myOutputValue = "";
​
  if (round == 1) {
    // 1st round
    playerMakeTurn();
    dealerMakeTurn();
    round = round + 1;
  }
​
  if (round == 2) {
    // 2nd round
    playerMakeTurn();
    dealerMakeTurn();
    round = round + 1;
    var playerWins = checkBlackjack(player);
    if (playerWins) {
      myOutputValue = printUserCards(player);
      myOutputValue += "You win.";
      return myOutputValue;
    }
  }
​
  myOutputValue = printUserCards(player);
​
  // process the input = either hit or stand
  if (input == "hit") {
    playerMakeTurn();
    var playerWins = checkBlackjack(player);
​
    if (playerWins) {
      myOutputValue = printUserCards(player);
      myOutputValue += "You win.";
      return myOutputValue;
    } else {
      var playerScoreAbove21 = checkUserScoreAbove21(player);
      if (playerScoreAbove21) {
        myOutputValue = printUserCards(player);
        myOutputValue += "You lose.";
        return myOutputValue;
      } else {
        myOutputValue = printUserCards(player);
        return myOutputValue;
      }
    }
  } else if (input == "stand") {
    // compare dealer and player scores
    checkWhetherDealerHitsOrStands();
    var comparisonResult = compareUsers();
    myOutputValue = printUserCards(player);
    myOutputValue += "<br/>";
    myOutputValue += printUserCards(dealer);
    myOutputValue += "<br/>";
    myOutputValue += comparisonResult;
    return myOutputValue;
  }
​
  round = round + 1;
  return myOutputValue;
};
​
// The user's cards are analysed for winning or losing conditions.
// Come into this function everytime user selects "hit"
// Also come into this function at first two rounds of giving cards
var checkBlackjack = function (user) {
  if (user.score == 21) {
    return true;
  } else {
    return false;
  }
};
​
// output user cards
var printUserCards = function (user) {
  myOutputValue = `${user.name} cards are: `;
​
  for (var i = 0; i < user.card.length; i++) {
    var myCard = user.card[i];
    myOutputValue += myCard.name + " " + myCard.suit + " ";
  }
​
  return myOutputValue;
};
​
// Come into this function everytime user selects "hit"
var checkUserScoreAbove21 = function (user) {
  if (user.score > 21) {
    return true;
  } else {
    return false;
  }
};
​
// Come into this function only after user selects "stand"
var compareUsers = function () {
  if (player.score > dealer.score) {
    // player wins
    return "You win.";
  } else {
    // player loses
    return "You lose.";
  }
};
​
var playerMakeTurn = function () {
  var dealtCard = dealCard(shuffledDeck);
  player.card.push(dealtCard);
  player.score += dealtCard.score;
};
​
var checkWhetherDealerHitsOrStands = function () {
  if (dealer.score < 17) {
    dealerMakeTurn();
  }
};
​
var dealerMakeTurn = function () {
  // since dealerMakeTurn is after playerMakeTurn, the shuffledDeck here is 1 less card
  var dealtCard = dealCard(shuffledDeck);
  dealer.card.push(dealtCard);
  dealer.score += dealtCard.score;
};
​
var dealCard = function (deck) {
  return deck.pop();
};
​
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
​
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
​
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var score = 0;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        score = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        score = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        score = 10;
      } else if (cardName == 13) {
        cardName = "king";
        score = 10;
      } else {
        score = cardName;
      }
​
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: score,
      };
​
      // Add the new card to the deck
      cardDeck.push(card);
​
      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }
​
    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
​
  // Return the completed card deck
  return cardDeck;
};
​
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
​
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