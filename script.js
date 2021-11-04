//Global Variables
var computerCardArray = [];
var playerCardArray = [];
var deck = [];
var shuffledDeck = "";
var myOutputValue = "";

//Game Mode
var FIRSTDRAW = "First draw";
var USERTURN = "User's turn";
var COMPUTERTURN = "Computer's turn";
var ENDGAME = "End game";
var gameMode = FIRSTDRAW;

var main = function (input) {
  if (gameMode == FIRSTDRAW) {
    resetGame();
    myOutputValue = `You watch as the dealer hands you two cards, faced down.<br><br>`;
    computerCardArray = drawCards(2, shuffledDeck, computerCardArray);
    playerCardArray = drawCards(2, shuffledDeck, playerCardArray);
    validateBlackjack(playerCardArray, computerCardArray);
    // Display Computer & Player hands
  } else if (gameMode == USERTURN) {
    myOutputValue = `You cast a glance at the dealer. The dealer has a blank, emotionless expression that gives no indication of its thoughts or intentions. Literally, a poker face.<br><br>`;
    if (input == "HIT") {
      playerCardArray = drawCards(1, shuffledDeck, playerCardArray);
      myOutputValue += `You tap on the table twice, asking to draw another card.`;
    } else if (input == "STAND") {
      myOutputValue += `You shrug your shoulders and end your turn.`;
    } else {
      return `You hear a voice inside of your head saying: Please enter HIT or STAND only.`;
    }
    gameMode = COMPUTERTURN;
    myOutputValue += `<br>[Press Submit to continue]`;
  } else if (gameMode == COMPUTERTURN) {
    if (computeComputerDraw(computerCardArray, 17)) {
      myOutputValue = `Without skipping a beat, you see the dealer extend its mechanical arm to draw cards.`;
      computerCardArray = drawCards(1, shuffledDeck, computerCardArray);
    } else {
      myOutputValue = `The dealer remains motionless.`;
    }
    gameMode = ENDGAME;
    myOutputValue += "<br>[Press Submit to continue]";
  } else if (gameMode == ENDGAME) {
    return "You stopped here";
  }
  return (myOutputValue += `<br><br>--<br><br>Player's hand: ${displayCards(
    playerCardArray
  )}<br>Computer's hand: ${displayCards(computerCardArray)}`);
};

var rollDice = function (max) {
  var randomDecimal = Math.random() * max;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};
var drawCards = function (numberOfDraws, cardDeck, cardArray) {
  var indexNumber = 0;
  while (indexNumber < numberOfDraws) {
    cardArray.push(cardDeck.pop());
    indexNumber = indexNumber + 1;
  }
  return cardArray;
};
var displayCards = function (cardArray) {
  indexNumber = 0;
  myOutputValue = "";
  var sumCardsRanks = 0;
  while (indexNumber < cardArray.length) {
    sumCardsRanks = sumCardsRanks + cardArray[indexNumber].rank;
    myOutputValue += `Card ${indexNumber + 1} - ${
      cardArray[indexNumber].name
    } of ${cardArray[indexNumber].emoji}<br>`;
    indexNumber = indexNumber + 1;
  }
  console.log("displayCards sumCardsRank: ", sumCardsRanks);
  return `<br>${myOutputValue}`;
};
var validateHand = function (cardArray, minRank) {
  //Validate if sumCardsRanks < minRank i.e. flag = TRUE means did not hit minRank
  indexNumber = 0;
  sumCardsRanks = 0;
  var flagHaveAce = "";
  while (indexNumber < cardArray.length) {
    if (cardArray[indexNumber].name == "ace") {
      flagHaveAce = true;
    }
    sumCardsRanks = sumCardsRanks + cardArray[indexNumber].rank;
    indexNumber = indexNumber + 1;
  }
  if (cardArray.length == 2 && sumCardsRanks == 11 && flagHaveAce) {
    sumCardsRanks = 21; // sumCardsRanks = 21 if Ace == 1, 10, 11 in a two-card, Blackjack hand
  }
  var flagMinRank = sumCardsRanks < minRank;
  return flagMinRank;
};
var validateBlackjack = function (playerCardArray, computerBlackjack) {
  // function validates if Blackjack end games automatically. Else, continue.
  var playerBlackjack = !validateHand(playerCardArray, 21);
  var computerBlackjack = !validateHand(computerCardArray, 21);
  if (playerBlackjack || computerBlackjack) {
    if (playerBlackjack && computerBlackjack) {
      myOutputValue += `"BLACKJA-", you stop halfway when you see the dealer reveals its hands. <br>It's a push.`;
    } else if (playerBlackjack) {
      myOutputValue += `"BLACKJACK!" You shout as your upper-cut the air.<br> You have won.`;
    } else {
      myOutputValue += `But before you could even see your cards, the dealer reveals its hands.<br> You have lost.`;
    }
    gameMode = FIRSTDRAW;
    return (myOutputValue += `<br>[Press Submit to restart the game.]`);
  } else {
    gameMode = USERTURN;
    myOutputValue += `You consider your options as you review the cards.<br>[Input HIT or STAND to continue]`;
  }
};
var computeComputerDraw = function (cardArray, minRank) {
  flag = false;
  if (validateHand(cardArray, minRank)) {
    flag = true;
  } else {
    var diceRollYes = rollDice(20);
    var diceRollDestiny = rollDice(20);
    console.log("diceRollYes: ", diceRollYes);
    console.log("diceRollDestiny: ", diceRollDestiny);
    if (diceRollYes > diceRollDestiny) {
      flag = true;
    }
  }
  console.log("computeComputerDraw flag:", flag);
  return flag;
};
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var emojiArray = ["♥️", "♦", "♣️", "♠️"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var currentEmoji = emojiArray[suitIndex];
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
        emoji: currentEmoji,
      };
      if (card.rank == 11 || card.rank == 12 || card.rank == 13) {
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
var resetGame = function () {
  computerCardArray = [];
  playerCardArray = [];
  myOutputValue = "";
  deck = makeDeck();
  console.log("deck", JSON.parse(JSON.stringify(deck)));
  shuffledDeck = shuffleCards(deck);
  console.log("shuffledDeck", JSON.parse(JSON.stringify(shuffledDeck)));
};
