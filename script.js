// game images
var myWelcomeImage = '<img src="/images/myawesomecat.jpeg"/>';
var myWinningImage =
  '<img src="https://c.tenor.com/VExHMtIttBEAAAAC/money-make-it-rain.gif"/>';
var myLosingImage =
  '<img src="https://c.tenor.com/8JAUqjB08EoAAAAC/homer-simpson-revenge.gif"/>';

// global array to store cards
var playerHand = [];
var computerHand = [];

// gamemodes
var gameMode1 = `distribute hand`;
var gameMode2 = `player hit or stand`;
var gameMode3 = `computer's turn`;
var gameMode = gameMode1;

// reset gamemode
var gameOver = false;

// make card deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♣️"];

  var emojiNames = {
    1: "A",
    2: "2️⃣",
    3: "3️⃣",
    4: "4️⃣",
    5: "5️⃣",
    6: "6️⃣",
    7: "7️⃣",
    8: "8️⃣",
    9: "9️⃣",
    10: "🔟",
    11: "🕺🏽",
    12: "👸🏽",
    13: "🤴🏽",
  };

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
      var rankValue = rankCounter;
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        // cardValue = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      var emojiName = emojiNames[rankCounter];

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankValue,
        value: cardValue,
        emojiName: emojiName,
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

// get random index
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// make shuffled deck
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

// make shuffled deck
var shuffledCardDeck = shuffleCards(makeDeck());
console.log(shuffledCardDeck);

// deal card from deck
var dealCard = function (hand) {
  hand.push(shuffledCardDeck.pop());
};

// calculate total value of hand in array
var sumOfHand = function (hand) {
  var numOfAce = 0;
  var handSum = 0;
  var sumCounter = 0;

  while (sumCounter < hand.length) {
    var currCard = hand[sumCounter];

    if (hand[sumCounter].name === `ace`) {
      numOfAce += 1;
      handSum += 11;
    } else {
      handSum += currCard.value;
    }

    sumCounter = sumCounter + 1;
  }

  if (handSum > 21 && numOfAce > 0) {
    var aceCounter = 0;

    while (aceCounter < numOfAce) {
      handSum -= 10;
      if (handSum <= 21) {
        break;
      }
      aceCounter += 1;
    }
  }
  return handSum;
};

// print standard output function
var printCardArray = function (cardArray) {
  var cardNames = ``;
  var arrayIndexLoopCounter = 0;
  while (arrayIndexLoopCounter < cardArray.length) {
    var singleCardName = `<br> ${cardArray[arrayIndexLoopCounter].emojiName} ${cardArray[arrayIndexLoopCounter].suit}`;
    cardNames += singleCardName;
    arrayIndexLoopCounter += 1;
  }
  return cardNames + `<br><br> **Total value: ${sumOfHand(cardArray)}**`;
};

// main function to index.html
var main = function (input) {
  var myOutputValue = myOutputValue + myWelcomeImage;
  var playerCardValue = 0;
  var computerCardValue = 0;

  if (gameOver == true) {
    return `GAME OVER. <br><br> Refresh page to restart game.`;
  }

  // distribute two cards to player and computer
  // only reveal player cards
  if (gameMode == gameMode1) {
    var dealCounter = 0;
    while (dealCounter < 2) {
      dealCard(playerHand);
      dealCard(computerHand);
      console.log(`player hand`, playerHand);
      console.log(`computer hand`, computerHand);
      playerCardValue = sumOfHand(playerHand);
      computerCardvalue = sumOfHand(computerHand);
      console.log(`playerCardValue`, playerCardValue);
      console.log(`computerCardValue`, computerCardvalue);
      dealCounter += 1;
      gameMode = gameMode2;
    }

    // evaluate player and computer hands
    if (playerCardValue == 21 && computerCardvalue != 21) {
      gameOver = true;
      return `${myWinningImage} <br><br> WOO HOO! YOU WIN WITH 21! <br><br> Player hand <br> 
      ${printCardArray(
        playerHand
      )} <br><br> Computer hand: <br> ${printCardArray(computerHand)}`;
    }

    if (playerCardValue == 21 && computerCardvalue == 21) {
      gameOver = true;
      return `IT IS A DRAW! <br> Player and Computer both get 21! <br><br> Player hand: <br> ${printCardArray(
        playerHand
      )} <br><br> Computer hand: <br> ${printCardArray(computerHand)}`;
    }

    if (computerCardvalue == 21 && playerCardValue != 21) {
      gameOver = true;
      return `SORRY! COMPUTER WINS WITH 21. <br><br> Player hand: <br> ${printCardArray(
        playerHand
      )} <br><br> Computer hand:  <br> ${printCardArray(computerHand)}`;
    }

    return `Player hand: <br> ${printCardArray(
      playerHand
    )} <br><br> Computer hand: <br><br> ${computerHand[0].name} ${
      computerHand[0].suit
    } <br><br> Enter HIT or STAND to continue.`;
  }

  if (
    input != `hit` &&
    input != `HIT` &&
    input != `stand` &&
    input != `STAND`
  ) {
    return `INVALID. Please enter HIT or STAND only!!!`;
  }

  if (
    (gameMode == gameMode2 && input === `hit`) ||
    (gameMode == gameMode2 && input === `HIT`)
  ) {
    dealCard(playerHand);
    playerCardValue = sumOfHand(playerHand);
    computerCardValue = sumOfHand(computerHand);
    console.log(`playerCardValue`, playerCardValue);

    if (playerCardValue > 21) {
      gameOver = true;
      return `${myLosingImage} <br><br> Sorry you busted! You lose! <br><br> Player hand: <br> ${printCardArray(
        playerHand
      )} <br><br> Computer hand: <br> ${printCardArray(
        computerHand
      )}. <br><br> Click SUBMIT to continue.`;
    }

    if (playerCardValue == 21 && computerCardvalue != 21) {
      gameOver = true;
      return `${myWinningImage} <br><br> WOO HOO! YOU WIN WITH 21! <br><br> Player hand <br> 
      ${printCardArray(
        playerHand
      )} <br><br> Computer hand: <br> ${printCardArray(
        computerHand
      )}  <br><br> Click SUBMIT to continue.`;
    }

    if (playerCardValue < 21 && computerCardvalue < 21) {
      gameMode = gameMode2;
      return `Player hand: <br> ${printCardArray(
        playerHand
      )} <br><br> You may HIT or STAND.`;
    }
  }

  if (
    (gameMode == gameMode2 && input === `stand`) ||
    (gameMode == gameMode2 && input === `STAND`)
  ) {
    gameMode = gameMode3;
    if (computerCardValue < 17) {
      dealCard(computerHand);
      playerCardValue = sumOfHand(playerHand);
      computerCardValue = sumOfHand(computerHand);
      console.log(`computerCardValue`, computerCardValue);
    }

    if (computerCardValue > 21) {
      gameOver = true;
      return `${myWinningImage} <br><br> You win! Computer busted! <br><br> Player hand: <br> ${printCardArray(
        playerHand
      )} <br><br> Computer hand: <br> ${printCardArray(
        computerHand
      )}  <br><br> Click SUBMIT to continue.`;
    }

    if (computerCardValue > playerCardValue) {
      gameOver = true;
      return `${myLosingImage} <br><br> You lose! <br><br> Player hand: <br> ${printCardArray(
        playerHand
      )} <br><br> Computer hand: <br> ${printCardArray(
        computerHand
      )}  <br><br> Click SUBMIT to continue.`;
    }

    if (computerCardValue == 21) {
      gameOver = true;
      return `${myLosingImage} <br><br> You lose! Computer wins with 21! <br><br> Player hand: <br> ${printCardArray(
        playerHand
      )} <br><br> Computer hand: <br> ${printCardArray(
        computerHand
      )}  <br><br> Click SUBMIT to continue.`;
    }

    if (playerCardValue > computerCardValue) {
      gameOver = true;
      return `${myWinningImage} <br><br> You win! <br><br> Player hand: <br> ${printCardArray(
        playerHand
      )} <br><br> Computer hand: <br> ${printCardArray(
        computerHand
      )}  <br><br> Click SUBMIT to continue.`;
    }

    if (playerCardValue == computerCardValue) {
      gameOver = true;
      return `It is a draw! <br><br> Player hand: <br> ${printCardArray(
        playerHand
      )} <br><br> Computer hand: <br> ${printCardArray(
        computerHand
      )}  <br><br> Click SUBMIT to continue.`;
    }
  }
};
