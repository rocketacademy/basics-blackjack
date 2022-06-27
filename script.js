//ver 2: player hit or stand
var DRAW_MODE = "DRAW MODE";
var RESULT_MODE = "RESULT MODE";
var GAME_START = "GAME START";
var PLAYER_CHOICE_MODE = "PLAYER CHOICE MODE";
var COMPUTER_CHOICE_MODE = "COMPUTER CHOICE MODE";

// player start with choice mode to decide if hit or stand
// draw mode is when player decides to hit
// result mode is when player decides to stand
// game start is when 2 players draw cards
var gameMode = GAME_START;

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
      var cardValue = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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

//function for checking who wins.... hold on we need to add them all

var checkBustOrBlackjack = function (playerHand, computerHand) {
  console.log("SEND HELP");
  var deckValue1 = addAllCards(playerHand);
  console.log("DECK VALUE 1");
  console.log(deckValue1);

  var deckValue2 = addAllCards(computerHand);
  console.log("DECK VALUE 2");
  console.log(deckValue2);

  var endResult;
  // Compare computer and player cards by rank attribute

  if (deckValue1 == 21 && deckValue2 != 21) {
    //gameMode = RESULT_MODE;
    endResult = `Player wins! 21 means blackjack!`;
  } else if (deckValue1 != 21 && deckValue2 == 21) {
    endResult = `Player loses! Computer got 21 which means blackjack!`;
  } else if (deckValue1 > 21 && deckValue2 < 21) {
    endResult = `Player is busted! Deck exceeds 21...Player loses.`;
  } else if (deckValue1 < 21 && deckValue2 > 21) {
    endResult = `Computer is busted! Deck exceeds 21...so Player wins!`;
  }

  return endResult;
};

var checkWhoWinLose = function (deckValue1, deckValue2) {
  console.log("SEND HELP 2");
  var endResult2;
  if (deckValue1 == deckValue2) {
    endResult2 = `It is a tie! the values of both decks are the same!`;
  } else if (deckValue1 < deckValue2) {
    endResult2 = `Player lost! Player deck is ${deckValue1} which is lesser than Computer's deck of ${deckValue2} `;
  } else if (deckValue1 > deckValue2) {
    endResult2 = `Player won! Player deck is ${deckValue1} which is more than Computer's deck of ${deckValue2} `;
  }
  return endResult2;
};

var resetGame = function () {
  gameMode = PLAYER_CHOICE_MODE;
  playerHand = [];
  computerHand = [];
};

var listAllCards = function (cards) {
  var resultString = String();
  //console.log(cards);
  for (var i = 0; i < cards.length; i += 1) {
    var currentCard = cards[i];
    //console.log(currentCard);
    resultString += `<br><br>${currentCard.name} of ${currentCard.suit}`;
    //console.log("results String:" + resultString);
  }
  return resultString;
};

var addAllCards = function (cards) {
  var result = Number();
  //console.log(cards);
  for (var i = 0; i < cards.length; i += 1) {
    var currentCard = cards[i];
    //console.log(currentCard);
    result += Number(currentCard.value);
    //console.log("results String:" + resultString);
  }
  return result;
};
//ok we should have a list for player hand and CPU hand
var playerHand = [];
var computerHand = [];
var myOutputValue;

var outputStatement = function (playerHand, computerHand) {
  var playerValue = addAllCards(playerHand);
  var computerValue = addAllCards(computerHand);

  myOutputValue = `Player Hand has ${listAllCards(playerHand)}
  <br><br> Computer Hand has ${listAllCards(computerHand)}
  <br><br> Player deck Value is ${playerValue} and CPU total value is ${computerValue}
  <br><br> Player, would you like to hit or stand? type h for hit and s for stand.`;

  return myOutputValue;
};

var main = function (input) {
  //Let's draw 2 cards and push them into each others hand

  if (gameMode == GAME_START) {
    var playerHandIndex = 0;
    var playerCardCapacity = 2;
    while (playerHandIndex < playerCardCapacity) {
      playerDrawnCard = shuffledDeck.pop();
      playerHand.push(playerDrawnCard);
      //console.log
      console.log("playerhand");
      console.log(playerHand[playerHandIndex]);
      playerHandIndex += 1;
    }

    //wait does the CPU draw first or the player draws first???
    var computerHandIndex = 0;
    var computerHandCapacity = 2;
    while (computerHandIndex < computerHandCapacity) {
      computerDrawnCard = shuffledDeck.pop();
      computerHand.push(computerDrawnCard);
      computerHandIndex += 1;
    }

    //check bust or blackjack
    checkBustOrBlackjack(playerHand, computerHand);

    gameMode = PLAYER_CHOICE_MODE;

    myOutputValue = outputStatement(playerHand, computerHand);
  }

  //var playerCard1 = shuffledDeck.pop();
  //var playerCard2 = shuffledDeck.pop();
  //playerHand.push(playerCard1, playerCard2);
  //var computerCard3;
  //var playerCard3;
  //console.log(playerCard);
  //console.log(deck);

  //var totalvaluePlayer = addTotalValue(playerCard1, playerCard2);
  //var totalvalueComputer = addTotalValue(computerCard1, computerCard2);

  // var resultAnnouncement = checkBustOrBlackjack(totalvaluePlayer,totalvalueComputer);
  //console.log(resultAnnouncement);

  //resetGame();

  //game mode please

  if (gameMode == PLAYER_CHOICE_MODE) {
    //validate the input
    if (input == "h") {
      //ok draw more cards! draw mode...

      var playerCardCapacity = playerCardCapacity + 1;
      playerDrawnCard = shuffledDeck.pop();
      playerHand.push(playerDrawnCard);

      console.log("player hand after he hits");
      console.log(playerHand);

      playerHandIndex += 1;

      myOutputValue = outputStatement(playerHand, computerHand);

      return myOutputValue;
    } else if (input == "s") {
      gameMode = RESULT_MODE;
    }
  }

  if (gameMode == RESULT_MODE) {
    console.log("RESULT MODE");
    checkBustOrBlackjack(playerHand, computerHand);
    checkWhoWinLose(playerHand, computerHand);
  }
  //var check2 = checkWhoWinLose(playerHand, computerHand);

  /*
  if (gameMode == DRAW_MODE) {
    myOutputValue = outputStatement(playerHand, computerHand);
    return myOutputValue;
  }
  //}
*/
  //<br><br> ${resultAnnouncement}`;

  return myOutputValue;
};
