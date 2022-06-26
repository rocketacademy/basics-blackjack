//ver 1:
var DRAW_MODE = "DRAW MODE";
var RESULT_MODE = "RESULT MODE";

var GAME_MODE = DRAW_MODE;

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
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
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

//this function shuffles deck
var shuffleDeck = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    //switch the 2 cards around by swapping like this:
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex += 1;
  }
  return cardDeck;
};

var deck = makeDeck();
var shuffledDeck = shuffleDeck(deck);

//function for adding value of each deck together

var addTotalValue = function (card1, card2) {
  console.log(`card 1 rank: ${card1.rank}`);
  console.log(`card 2 rank: ${card2.rank}`);
  var totalValue = Number(card1.rank) + Number(card2.rank);
  return totalValue;
};

//function for checking who wins.... hold on we need to add them all

var checkBustOrBlackjack = function (deckValue1, deckValue2) {
  var endResult;
  // Compare computer and player cards by rank attribute
  if (deckValue1 == 21 && deckValue2 != 21) {
    //GAME_MODE = RESULT_MODE;
    endResult = `Player wins! 21 means blackjack!`;
  } else if (deckValue1 != 21 && deckValue2 == 21) {
    endResult = `Player loses! Computer got 21 which means blackjack!`;
  } else if (deckValue1 > 21 && deckValue2 > 21) {
    endResult = `Player loses!... even if the computer got a bust too. Alright you both and lose together, but technically, player always loses.`;
  } else if (deckValue1 > 21 && deckValue2 < 21) {
    endResult = `Player is busted! Deck exceeds 21...Player loses.`;
  } else if (deckValue1 < 21 && deckValue2 > 21) {
    endResult = `Computer is busted! Deck exceeds 21...so Player wins!`;
  } else if (deckValue1 < 21 && deckValue2 < 21) {
    var compareResult = checkWhoWinLose(deckValue1, deckValue2);
    endResult = compareResult;
  }
  return endResult;
};

var checkWhoWinLose = function (deckValue1, deckValue2) {
  if (deckValue1 == deckValue2) {
    endResult2 = `It is a tie! the values of both decks are the same!`;
  } else if (deckValue1 < deckValue2) {
    endResult2 = `Player lost! Player deck is ${deckValue1} which is lesser than Computer's deck of ${deckValue2} `;
  } else if (deckValue1 > deckValue2) {
    endResult2 = `Player won! Player deck is ${deckValue1} which is more than Computer's deck of ${deckValue2} `;
  }
  return endResult2;
};

var main = function (input) {
  //Let's draw 2 cards
  var computerCard1 = shuffledDeck.pop();
  var playerCard1 = shuffledDeck.pop();
  var computerCard2 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();
  //console.log(playerCard);
  console.log(deck);

  var totalvaluePlayer = addTotalValue(playerCard1, playerCard2);
  var totalvalueComputer = addTotalValue(computerCard1, computerCard2);

  var resultAnnouncement = checkBustOrBlackjack(
    totalvaluePlayer,
    totalvalueComputer
  );
  console.log(resultAnnouncement);

  return `Player Card: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} <br><br> CPU card: ${computerCard1.name} of ${computerCard1.suit}, ${computerCard2.name} of ${computerCard2.suit} 
  <br><br> Player deck Value is ${totalvaluePlayer} and CPU total value is ${totalvalueComputer}
  <br><br> ${resultAnnouncement}`;
};
