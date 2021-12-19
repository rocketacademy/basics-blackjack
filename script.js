// 1. define player and dealer
// 2. create and shuffle a game deck
// 3. draw 2 cards for player and dealer respectively
// 4. win conditions
// -- blackjack
// -- higher hand value
// 5. display hands of both player and dealer in output box and declare winner

// version 2
// add extra game mode hit or stand
// functionality for player to input hit or stand
// if player inputs hit > add extra card to user array
// if player chooses stand > compare player and dealer hand

// version 3
// dealer to hit or stand after the player choose to stand
// this happens automatically
// if dealer hand value is less than 17, dealer hits
// if dealer hand value is more than 17, dealer stands

// version 4
// determine value of ace as 11 or 1
// if total hand value, including ace, is less than 21, value is 11
// if total hand value, including ace, is more than 21, value is 1

// declare game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_RESULTS_SHOWN = "results shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;

// declare global variables to store player and dealer hands
// declare a new array to store drawn cards
var dealerCards = [];
var playerCards = [];
// declare variable to hold deck of cards
var deck = "empty at the start";

// create function to assemble cards: makeDeck
var makeDeck = function () {
  // make 52 cards
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // create a loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // store current suit in a variable
    var currentSuit = suits[suitIndex];

    // create a loop inside the suits array loop
    // loop from 1-13 to create all cards for a given suit
    // rank counter starts from 1 and not 0, and ends at 13
    // a loop without an array
    var rankCounter = 1;
    while (rankCounter <= 13) {
      //by default, the card name is the same as rankCounter

      var cardName = rankCounter;
      // special case for 1, 11, 12 and 13 where the card name is different from rankCounter
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      // create a new card object with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // add the new card to the deck
      cardDeck.push(card);
      //console.log(card);
      // increment rankCounter to iterate over the next rank (indicidual cards)
      rankCounter += 1;
    }
    // increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
  return cardDeck;
};
// assemble the card and input into a new global variable
deck = makeDeck();
// console.log(deck);
console.log(JSON.parse(JSON.stringify(deck)));

// Get a random index ranging from 0 (inclusive) to max number of cards (exclusive).
var getRandomIndex = function (deckLength) {
  return Math.floor(Math.random() * deck.length);
};
// shuffle card function
var shuffleDeck = function (deck) {
  var index = 0;

  while (index < deck.length) {
    var randomIndex = getRandomIndex(deck.length);
    var currentCard = deck[index];
    var randomCard = deck[randomIndex];
    deck[index] = randomCard;
    deck[randomIndex] = currentCard;

    index = index + 1;
  }
  return deck;
};
// shuffle the deck and save it in a new global variable
var shuffledCards = shuffleDeck(deck);

// create a new function to check hand for black jack
var checkBJ = function (handArray) {
  // check player cards for black jack
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBJ = false;

  // if there is black jack, return true
  // possible scenarios:
  // 1st card ace, 2nd card 10 or picture cards
  // 1st card 10 or picture, 2nd card ace
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBJ = true;
  }

  // else return false -  dont need statement as by default it's already false
  return isBJ;
};
// function that calculate total hand value
var calculateTotalValue = function (handArray) {
  var totalValue = 0;
  var aceCounter = 0;
  //loop through player or dealer hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    // for jack, queen and king, value is 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalValue = totalValue + 10;
    } else if (currentCard.name == "ace") {
      totalValue = totalValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalValue = totalValue + currentCard.rank;
    }
    index = index + 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalValue > 21) {
      totalValue = totalValue - 10;
    }
    index = index + 1;
  }
  return totalValue;
};

// function to display player and dealer hands
var displayPlayerAndDealerCards = function (
  playerCardsArray,
  dealerCardsArray
) {
  // player hand
  var playerMessage = `Player hand: <br>`;
  var index = 0;
  while (index < playerCardsArray.length) {
    playerMessage =
      playerMessage +
      "-" +
      playerCardsArray[index].name +
      " of " +
      playerCardsArray[index].suit +
      "<br>";
    index = index + 1;
  }
  console.log(playerMessage);
  // dealer hand
  index = 0;
  var dealerMessage = `Dealer hand: <br>`;
  while (index < dealerCardsArray.length) {
    dealerMessage =
      dealerMessage +
      "-" +
      dealerCardsArray[index].name +
      " of " +
      dealerCardsArray[index].suit +
      "<br>";
    index = index + 1;
  }
  console.log(dealerMessage);
  return playerMessage + "<br>" + dealerMessage;
};

// function to display total hand values
var displayTotalValues = function (playerValue, dealerValue) {
  var totalValueMessage = `<br>Player total hand value: ${playerValue} <br> Dealer total value: ${dealerValue}`;
  return totalValueMessage;
};

var main = function (input) {
  var myOutputMessage = "";
  // first click
  if (currentGameMode == GAME_START) {
    // deal 2 cards to player and dealer respectively
    playerCards.push(shuffledCards.pop());
    playerCards.push(shuffledCards.pop());
    dealerCards.push(shuffledCards.pop());
    dealerCards.push(shuffledCards.pop());

    console.log("player hand: ");
    console.log(playerCards);
    console.log("dealer hand: ");
    console.log(dealerCards);

    // progress the game mode
    currentGameMode = GAME_CARDS_DRAWN;
    myOutputMessage = `Everyone has been dealt a card. Click submit to evaluate cards!`;
    return myOutputMessage;
  }
  // second click
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // test checkBJ function
    // playerCards = [
    //   { name: 3, suit: "clubs", rank: 3 },
    //   { name: "ace", suit: "diamonds", rank: 1 },
    // ];
    // dealerCards = [
    //   { name: "ace", suit: "clubs", rank: 1 },
    //   { name: 10, suit: "spades", rank: 10 },
    // ];
    // check for blackjack
    var playerBJ = checkBJ(playerCards);
    var dealerBJ = checkBJ(dealerCards);

    // console.log("does player have bj? ==>" + playerBJ);
    // console.log("does dealer have bj? ==>" + dealerBJ);
    if (playerBJ == true || dealerBJ == true) {
      // -- both player and dealer has blackjack > a tie
      if (playerBJ == true && dealerBJ == true) {
        myOutputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          `<br>it's a blackjack tie!`;
      }
      // -- only player has black jack > player wins
      else if (playerBJ == true && dealerBJ == false) {
        myOutputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          `<br>player wins by blackjack!`;
      }
      // -- only dealer has black jack > dealer wins
      else {
        myOutputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          `<br>dealer wins by blackjack!`;
      }
      console.log(myOutputMessage);
    } else {
      myOutputMessage = "There is no blackjack!";
      console.log(myOutputMessage);
      // no black jack > game continues

      // change game mode
      currentGameMode = GAME_HIT_OR_STAND;

      // appropirate output message
      return myOutputMessage;
    }
  }
  // hit or stand
  if (currentGameMode == GAME_HIT_OR_STAND) {
    //player hit
    if (input == "hit") {
      playerCards.push(shuffledCards.pop());
      myOutputMessage = `${displayPlayerAndDealerCards(
        playerCards,
        dealerCards
      )}<br> You drew another card.<br>Please input "hit" or "stand"`;
    }

    //player stand
    else if (input == "stand") {
      // calculate total hand value of both player and dealer
      var playerTotalValue = calculateTotalValue(playerCards);
      var dealerTotalValue = calculateTotalValue(dealerCards);

      while (dealerTotalValue < 17) {
        dealerCards.push(shuffledCards.pop());
        dealerTotalValue = calculateTotalValue(dealerCards);
        // loop auto stops when dealer total is above or equals to 17
      }

      console.log("player total: " + playerTotalValue);
      console.log("dealer total: " + dealerTotalValue);
      // -- compare total hand value
      // check if player or dealer bust, card total is more than 21
      // if player is more than 21, dealer is less than 21, dealer auto wins
      if (playerTotalValue > 21 && dealerTotalValue <= 21) {
        myOutputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          `<br>Player hands has bust! Dealer WINS!` +
          displayTotalValues(playerTotalValue, dealerTotalValue);
      }
      // if dealer is more than 21, player is less than 21, player auto wins
      else if (dealerTotalValue > 21 && playerTotalValue <= 21) {
        myOutputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          `<br>Dealer hands has bust! Player WINS!` +
          displayTotalValues(playerTotalValue, dealerTotalValue);
      }
      // if dealer and player has same value, it's a draw
      else if (playerTotalValue == dealerTotalValue) {
        myOutputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          `<br>It's a draw!` +
          displayTotalValues(playerTotalValue, dealerTotalValue);
      }

      // player higher value AND value is less than 21 player wins
      else if (playerTotalValue > dealerTotalValue) {
        myOutputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          `<br>Player wins!` +
          displayTotalValues(playerTotalValue, dealerTotalValue);
      }
      // dealer higher value AND value is less than 21, dealer wins
      else if (dealerTotalValue > playerTotalValue) {
        myOutputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          `<br>Dealer wins!` +
          displayTotalValues(playerTotalValue, dealerTotalValue);
      } else {
        myOutputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          `<br> Both dealer and player has bust their hands!` +
          displayTotalValues(playerTotalValue, dealerTotalValue);
      }
    }
    //input validation
    else {
      myOutputMessage = `please input only "hit" or "stand" <br><br> ${displayPlayerAndDealerCards(
        playerCards,
        dealerCards
      )}`;
    }
    return myOutputMessage;
  }
};
