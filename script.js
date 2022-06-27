/*
v1.
- default game mode at deal card
- create new deck and shuffle
- deal card to player and dealer - pop card from shuffled deck
  - global var - store player and dealer hand
-compare hand
  -if got black jack
    - tie - player and dealer got balck jack
    - player win - player got black jack
    - dealer win - dealer got black jack
  -if no black jack
    -calcualte hand score - store score in global variable
      - compare scores
      - tie - player and dealer same score
      - player win - player higher score
      - dealer win - dealer higher score
- return message to show player hand, dealer hand, who win, player score, dealer score
  - display cards on hand - create loop to run array of player and dealer hand
  - display score in hand
v2.
- change game mode to enter player hit/stand for player
  - if hand score below 17 - draw 1 card
  - if hand score above 17
    - if hit
    - if stand - evaluate score / go game mode dealer hit/stand

v3.
- in game mode dealer hit/stand
  - if hand score below 17 - draw 1 card
  - if hand score above 17
    - stand - evaluate score

- in evaluate score compare final player and dealer score 
  - if burst
    - both dealer and player burst - tie
    - dealer burst - player win
    - player burst - dealer win
  - copy from v1 compare hand if got blackjack and no blackjack

*/

/*======================================*/
/*===========GLOBAL VARIABLES===========*/
/*======================================*/

var GAME_MODE_GET_CARD = "deal card";
var GAME_MODE_EVALUATE_CARD = "cards dealt. evaluating cards";
var GAME_MODE_GAME_RESULT = "show card results";
var GAME_MODE_HIT_OR_STAND = "player choose to hit or stand";
// var GAME_MODE_DEALER_HIT_STAND = "dealer choose to hit or stand";
// var GAME_MODE_RESET = "game restart to deal cards";

var gameMode = GAME_MODE_GET_CARD;
var dealerHand = [];
var playerHand = [];
var dealerScore = [];
var playerScore = [];

/*======================================*/
/*=============MAIN FUNCTION============*/
/*======================================*/

var main = function (input) {
  var myOutputMessage = "";
  var currentDeck = createNewDeck();

  if (gameMode == GAME_MODE_GET_CARD) {
    dealerHand.push(currentDeck.pop());
    dealerHand.push(currentDeck.pop());
    // console.log(`dealerHand ==>`);
    // console.log(dealerHand);
    playerHand.push(currentDeck.pop());
    playerHand.push(currentDeck.pop());
    // console.log(`playerHand ==>`);
    // console.log(playerHand);

    gameMode = GAME_MODE_EVALUATE_CARD;
    myOutputMessage = `cards have been dealt.<br><br>click submit to look at cards`;
    return myOutputMessage;
  }

  if (gameMode == GAME_MODE_EVALUATE_CARD) {
    // if blackjack
    var didPlayerGetBlackjack = checkForBlackjack(playerHand);
    var didDealerGetBlackjack = checkForBlackjack(dealerHand);
    // console.log(`did dealer get blackjack: ${didDealerGetBlackjack}`);
    // console.log(`did player get blackjack: ${didPlayerGetBlackjack}`);

    if (didDealerGetBlackjack == true || didPlayerGetBlackjack == true) {
      // both player and dealer got blackjack - tie
      if (didDealerGetBlackjack == true && didPlayerGetBlackjack == true) {
        myOutputMessage = `its a tie - PLAYER and DEALER got black jack<br><br>${displayDealerAndPlayerHand(
          dealerHand,
          playerHand
        )}`;
        // gameReset();
        // gameMode = GAME_MODE_GET_CARD;
      }
      // player get blackjack - player win
      else if (
        didDealerGetBlackjack == false &&
        didPlayerGetBlackjack == true
      ) {
        myOutputMessage = `winner - PLAYER won by black jack<br><br>${displayDealerAndPlayerHand(
          dealerHand,
          playerHand
        )}`;
        // gameReset();
        // gameMode = GAME_MODE_GET_CARD;
      }
      // dealer get blackjack - dealer win
      else {
        myOutputMessage = `winner - DEALER won by black jack<br><br>${displayDealerAndPlayerHand(
          dealerHand,
          playerHand
        )}`;
        // gameReset();
        // gameMode = GAME_MODE_GET_CARD;
      }
      gameReset();
      gameMode = GAME_MODE_GET_CARD;

      return myOutputMessage + `<br><br>click submit for another round`;
    }
    // if no blackjack
    else {
      gameMode = GAME_MODE_HIT_OR_STAND;
      return `there is no black jack<br><br>click submit to move to next game mode`;
      // gameMode = GAME_MODE_HIT_OR_STAND;
    }

    // return myOutputMessage;
  }

  if (gameMode == GAME_MODE_HIT_OR_STAND) {
    //   - if player choose hit
    if (input == "h") {
      playerHand.push(currentDeck.pop());
      playerHandScore = calculateHandScore(playerHand);

      myOutputMessage = `you drew a card<br>${displayPlayerHand(
        playerHand
      )}<br> your hand score: ${playerHandScore}`;
    }

    //   - if stand - go to dealer to hit/stand
    else if (input == "s") {
      // calculate hand score
      dealerHandScore = calculateHandScore(dealerHand);
      playerHandScore = calculateHandScore(playerHand);

      // loop to run conition if deal hand score less than 17. dealer need draw 1 card. loop stop when deal score is 17 or more
      while (dealerHandScore < 17) {
        dealerHand.push(currentDeck.pop());
        dealerHandScore = calculateHandScore(dealerHand);
        // console.log(`dealer score: ${dealerHandScore}`);
      }

      dealerScore.push(dealerHandScore);
      playerScore.push(playerHandScore);

      // bust logic
      var didDealerBust = checkForBust(dealerScore);
      var didPlayerBust = checkForBust(playerScore);
      // console.log(`did dealer bust? ==> ${didDealerBust}`);
      // console.log(`did player bust? ==> ${didPlayerBust}`);

      // if dealer and player bust
      if (didDealerBust == true || didPlayerBust == true) {
        if (didDealerBust == true && didPlayerBust == true) {
          myOutputMessage = `PLAYER and DEALER hand busted<br><br>${displayDealerAndPlayerHand(
            dealerHand,
            playerHand
          )}<br>${displayDealerAndPlayerScore(dealerScore, playerScore)}`;
        }
        // if dealer bust
        else if (didDealerBust == true && didPlayerBust == false) {
          myOutputMessage = `DEALER hand busted<br><br>${displayDealerAndPlayerHand(
            dealerHand,
            playerHand
          )}<br>${displayDealerAndPlayerScore(dealerScore, playerScore)}`;
        }
        // if player bust
        else {
          myOutputMessage = `PLAYER hand busted<br><br>${displayDealerAndPlayerHand(
            dealerHand,
            playerHand
          )}<br>${displayDealerAndPlayerScore(dealerScore, playerScore)}`;
        }
      }

      // else no one bust. compare score to determine winner
      else {
        myOutputMessage = `no one busted`;

        if (dealerHandScore == playerHandScore) {
          // compare scores
          // both player and dealer same score - tie
          myOutputMessage = `its a tie - PLAYER and DEALER hand score are the same<br><br>${displayDealerAndPlayerHand(
            dealerHand,
            playerHand
          )}<br>${displayDealerAndPlayerScore(dealerScore, playerScore)}`;
        }
        // player score higher - player win
        else if (playerHandScore > dealerHandScore) {
          myOutputMessage = `winner - PLAYER hand score higher<br><br>${displayDealerAndPlayerHand(
            dealerHand,
            playerHand
          )}<br>${displayDealerAndPlayerScore(dealerScore, playerScore)}`;
        }
        // dealer score higher - dealer win
        else {
          myOutputMessage = `winner - DEALER hand score higher<br><br>${displayDealerAndPlayerHand(
            dealerHand,
            playerHand
          )}<br>${displayDealerAndPlayerScore(dealerScore, playerScore)}`;
        }
      }
      gameReset();
      gameMode = GAME_MODE_GET_CARD;
      return myOutputMessage + `<br><br>click submit for another round`;
    }

    // input validation for hit or stand
    else {
      playerHandScore = calculateHandScore(playerHand);
      return `**ERROR**<br>please choose either to input <br>"h" to hit, or <br>"s" to stand <br>${displayPlayerHand(
        playerHand
      )}<br> your hand score: ${playerHandScore}`;
    }
    return myOutputMessage;
  }
};

/*======================================*/
/*============GAME FUNCTIONS============*/
/*======================================*/

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♡", "♢", "♧", "♤"];

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
        cardName = "A";
      } else if (cardName == 11) {
        cardName = "J";
      } else if (cardName == 12) {
        cardName = "Q";
      } else if (cardName == 13) {
        cardName = "K";
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

// function to create new shuffled deck
var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

// function to check for blackjack true or false
var checkForBlackjack = function (handArray) {
  var card1 = handArray[0];
  var card2 = handArray[1];
  blackjack = false;

  if (
    (card1.name == "A" && card2.rank >= 10) ||
    (card1.rank >= 10 && card2.name == "A")
  ) {
    blackjack = true;
  }
  return blackjack;
};

// function to calculate score for cards in hand
var calculateHandScore = function (handArray) {
  var handScore = 0;
  var aceCounter = 0;

  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    if (
      currentCard.name == "J" ||
      currentCard.name == "Q" ||
      currentCard.name == "K"
    ) {
      handScore = handScore + 10;
    } else if (currentCard.name == "A") {
      aceCounter + 1;
      handScore = handScore + 11;
    } else {
      handScore = handScore + currentCard.rank;
    }
    index += 1;
  }

  index = 0;
  while (index < aceCounter) {
    if (handScore > 21) {
      handScore = handScore - 10;
    }
  }
  return handScore;
};

// function to check if dealer or player busted
var checkForBust = function (scoreArray) {
  // console.log(`checking for bust`);
  var isScoreHigherThan21 = scoreArray;
  bust = false;

  if (isScoreHigherThan21 > 21) {
    bust = true;
  }
  return bust;
};

/*======================================*/
/*===========HELPER FUNCTIONS===========*/
/*======================================*/

// function to loop and message out to display dealer and player hand.
var displayDealerAndPlayerHand = function (dealerHandArray, playerHandArray) {
  var dealerCardsMessage = "dealer hand:<br>";

  for (var index = 0; index < dealerHandArray.length; index += 1) {
    var cardNameAndSuit =
      dealerHandArray[index].name + dealerHandArray[index].suit;
    // console.log(`dealer hand ${index}: ${cardNameAndSuit}`);

    dealerCardsMessage += cardNameAndSuit + "<br>";
  }

  var playerCardsMessage = "<br>player hand:<br>";

  for (var index = 0; index < playerHandArray.length; index += 1) {
    var cardNameAndSuit =
      playerHandArray[index].name + playerHandArray[index].suit;
    // console.log(`player hand ${index}: ${cardNameAndSuit}`);

    playerCardsMessage += cardNameAndSuit + "<br>";
  }

  return dealerCardsMessage + playerCardsMessage;
};

// function to message out to dealer and player hand score.
var displayDealerAndPlayerScore = function (dealerScore, playerScore) {
  var scoreMessage = `hand score<br>dealer: ${dealerScore}<br>player: ${playerScore}`;
  return scoreMessage;
};

var displayPlayerHand = function (playerHandArray) {
  var playerCardsMessage = "<br>player hand:<br>";

  for (var index = 0; index < playerHandArray.length; index += 1) {
    var cardNameAndSuit =
      playerHandArray[index].name + playerHandArray[index].suit;

    playerCardsMessage += cardNameAndSuit + "<br>";
  }

  return playerCardsMessage;
};

var gameReset = function () {
  dealerHand = [];
  playerHand = [];
  dealerScore = [];
  playerScore = [];
};
