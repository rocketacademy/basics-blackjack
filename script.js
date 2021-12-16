/*Global Variables*/
// Game State
// -2 = Introduction
// -1 = Betting
// 0 = After player and dealer draw, pend player action
// 1 = After player is done (player says "stand")
// 2 = End game state
var gameState = -2;

// Player Wallet
var playerWalletBalance = 100;
var playerBet = 0;

// gifs
var bankerBJImage =
  '<img src="https://c.tenor.com/leTKg3W0pyMAAAAC/fizzer1k-5597.gif"/>';
var bankruptImage =
  '<img src="https://c.tenor.com/wmSc-TlZvTwAAAAC/michael-jordan-memes.gif"/>';
var playerBJImage =
  '<img src="https://c.tenor.com/6G8KXj9IaiMAAAAd/memes-happy.gif"/>';
var bankerWinImage =
  '<img src="https://c.tenor.com/-0N5qk6UyykAAAAM/memes-meme.gif"/>';
var playerWinImage =
  '<img src="https://c.tenor.com/7Elrv5eUXoAAAAAM/funny-fat.gif"/>';
var drawImage =
  '<img src="https://c.tenor.com/wyfhYqF1tJIAAAAC/mark-wahlberg-wahlberg.gif"/>';

// Cards
var cardDeck = [];
var shuffledDeck = [];
var bankerCards = [];
var bankerCardValue = "";
var playerCards = [];
var playerCardValue = "";

// Output Values
var playerOutput = "";
var bankerOutput = "";
var myOutputValue = "";

// Initialise the card deck representation as an array of objects
var makeDeck = function () {
  // Initialise an empty deck array
  cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️ ", " ♠️ "];

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
      var cardPoint = rankCounter;

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

      // If rank is 11, 12, or 13, set cardPoint to 10
      if (cardPoint == 11) {
        cardPoint = 10;
      } else if (cardPoint == 12) {
        cardPoint = 10;
      } else if (cardPoint == 13) {
        cardPoint = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        points: cardPoint,
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

// Check for blackjack
var checkForBlackjack = function (card1, card2) {
  if (card1 == 1 || card2 == 1) {
    return card1 + card2 > 10;
  } else {
    return false;
  }
};

// Check for winner
var checkForWinner = function () {
  myOutputValue = `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}<br>Total value : ${bankerCardValue}`;
  gameState = -2;
  // Both bust
  if (playerCardValue > 21 && bankerCardValue > 21) {
    myOutputValue =
      myOutputValue +
      `<br><br>Both you and Banker bust, it's a tie! ${drawImage}<br><br>You have: $${playerWalletBalance} `;
    // Player bust
  } else if (playerCardValue > 21) {
    console.log(playerWalletBalance);
    console.log(playerBet);
    playerWalletBalance = playerWalletBalance - +playerBet;
    myOutputValue =
      myOutputValue +
      `<br><br>You bust, Banker won 😩  ${bankerWinImage}<br><br>You have: $${playerWalletBalance}`;
    // Banker bust
  } else if (bankerCardValue > 21) {
    console.log(playerWalletBalance);
    console.log(playerBet);
    playerWalletBalance = playerWalletBalance + +playerBet;
    myOutputValue =
      myOutputValue +
      `<br><br>Banker bust, you won!🙂 ${playerWinImage}<br><br>You have: $${playerWalletBalance}`;
    // Player won with higher points
  } else if (playerCardValue > bankerCardValue) {
    console.log(playerWalletBalance);
    console.log(playerBet);
    playerWalletBalance = playerWalletBalance + +playerBet;
    myOutputValue =
      myOutputValue +
      `<br><br>You won!🙂 ${playerWinImage}<br><br>You have: $${playerWalletBalance}`;
    // Banker won with higher points
  } else if (playerCardValue < bankerCardValue) {
    console.log(playerWalletBalance);
    console.log(playerBet);
    playerWalletBalance = playerWalletBalance - +playerBet;
    myOutputValue =
      myOutputValue +
      `<br><br>Banker won 😩 ${bankerWinImage}<br><br>You have: $${playerWalletBalance}`;
    // Tie
  } else if (playerCardValue == bankerCardValue) {
    myOutputValue =
      myOutputValue +
      `<br><br>It's a tie! ${drawImage} <br><br>You have: $${playerWalletBalance}`;
  }
  myOutputValue = myOutputValue + " <br>Click to start the next round.";
};

// End the game if either player has Blackjack
var blackjackOutcome = function () {
  if (
    checkForBlackjack(playerCards[0].rank, playerCards[1].rank) &&
    checkForBlackjack(bankerCards[0].rank, bankerCards[1].rank)
  ) {
    // Both player and banker has Blackjack
    console.log("in tie condition");
    gameState = -2;
    bankerOutput = `Banker drew ${bankerCards[0].name} of ${bankerCards[0].suit} | ${bankerCards[1].name} of ${bankerCards[1].suit} `;
    myOutputValue =
      `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}` +
      `<br><br>Both Player and Banker got Blackjack, it's a tie! ${drawImage} <br><br>You have: $${playerWalletBalance}<br>Click to start the next round.`;
    // Player has Blackjack
  } else if (checkForBlackjack(playerCards[0].rank, playerCards[1].rank)) {
    console.log("in player BJ condition");
    gameState = -2;
    playerWalletBalance = playerWalletBalance + playerBet * 1.5;
    bankerOutput = `Banker drew ${bankerCards[0].name} of ${bankerCards[0].suit} | ${bankerCards[1].name} of ${bankerCards[1].suit} `;
    myOutputValue =
      `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}` +
      `<br><br>You got Blackjack, you won! 🤑 ${playerBJImage} <br><br>You have: $${playerWalletBalance}<br>Click to start the next round.`;
    // Banker has Blackjack
  } else if (checkForBlackjack(bankerCards[0].rank, bankerCards[1].rank)) {
    console.log("in banker BJ condition");
    gameState = -2;
    playerWalletBalance = playerWalletBalance - +playerBet;
    bankerOutput = `Banker drew ${bankerCards[0].name} of ${bankerCards[0].suit} | ${bankerCards[1].name} of ${bankerCards[1].suit} `;
    myOutputValue =
      `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}` +
      `<br><br>Banker got Blackjack, you lost! 😢  ${bankerBJImage}<br><br>You have: $${playerWalletBalance}<br>Click to start the next round.`;
  }
};

// For player to take as many cards as needed
var playerHits = function () {
  playerCards.push(shuffledDeck.pop());
  playerOutput =
    playerOutput +
    ` | ${playerCards[playerCards.length - 1].name} of ${
      playerCards[playerCards.length - 1].suit
    } `;
  playerCardValue = calculateCardValue(playerCards);
  myOutputValue = `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}<br><br>Please input "hit" (to draw another card from deck) or "stand" (to not draw any card). `;
  return myOutputValue;
};

// Loop for banker to take card if hand < 17
var bankersTurn = function () {
  console.log("in banker function");
  bankerOutput = `Banker drew ${bankerCards[0].name} of ${bankerCards[0].suit} | ${bankerCards[1].name} of ${bankerCards[1].suit} `;
  console.log(bankerOutput);
  while (bankerCardValue < 17) {
    console.log("in While");
    bankerCards.push(shuffledDeck.pop());
    bankerOutput =
      bankerOutput +
      ` | ${bankerCards[bankerCards.length - 1].name} of ${
        bankerCards[bankerCards.length - 1].suit
      } `;
    console.log(bankerOutput);
    bankerCardValue = calculateCardValue(bankerCards);
    console.log(bankerCardValue);
  }
  checkForWinner();
  // myOutputValue = `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}<br>Total value : ${bankerCardValue}`;
  return myOutputValue;
};

// For hand with "ace" and value of other cards < 10, let ace's value be 11
var calculateCardValue = function (cardsOnHand) {
  var totalCardVal = 0;
  var aceCount = 0;
  var loopcount = 0;
  console.log(cardsOnHand);
  while (loopcount < cardsOnHand.length) {
    console.log(cardsOnHand[0].points);
    if (cardsOnHand[loopcount].points == 1) {
      aceCount += 1;
    }
    totalCardVal = totalCardVal + cardsOnHand[loopcount].points;
    loopcount += 1;
  }

  for (let aceLoop = 0; aceLoop < aceCount; aceLoop++) {
    if (totalCardVal < 12) {
      totalCardVal = totalCardVal + 10;
    }
  }
  loopcount += 1;

  return totalCardVal;
};

// First round of card draw
var readCards = function (input) {
  if (gameState == 0) {
    gameState += 1;
    // Create the cardDeck
    bankerCards = [];
    playerCards = [];
    playerCardValue = "";
    cardDeck = makeDeck();

    // Shuffle the deck and save it in a new variable shuffledDeck
    shuffledDeck = shuffleCards(cardDeck);

    // Draw 2 cards from the top of the deck
    bankerCards.push(shuffledDeck.pop());
    playerCards.push(shuffledDeck.pop());
    bankerCards.push(shuffledDeck.pop());
    playerCards.push(shuffledDeck.pop());

    playerCardValue = calculateCardValue(playerCards);
    bankerCardValue = calculateCardValue(bankerCards);

    // Loop to return computer and player cards by rank attribute
    playerOutput = `You drew ${playerCards[0].name} of ${playerCards[0].suit} | ${playerCards[1].name} of ${playerCards[1].suit}`;
    bankerOutput = `Banker drew ${bankerCards[0].name} of ${bankerCards[0].suit} | Covered `;
    myOutputValue =
      `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}` +
      `<br><br>Please input "hit" (to draw another card from deck) or "stand" (to not draw any card). `;

    console.log(checkForBlackjack(playerCards[0].rank, playerCards[1].rank));
    console.log(checkForBlackjack(bankerCards[0].rank, bankerCards[1].rank));

    blackjackOutcome();
    return myOutputValue;
  } else if (gameState == 1 && input == "hit") {
    myOutputValue = playerHits();
    return myOutputValue;
  } else if (gameState == 1 && input == "stand") {
    gameState += 1;
    myOutputValue = bankersTurn();
    return myOutputValue;
  }
};

var main = function (input) {
  if (gameState == -2) {
    playerBet = 0;
    gameState += 1;
    openingLine = `♠️♠️ Let's play a game of Blackjack! ♠️♠️<br><br>
The aim of the game is to have a hand of cards that has greater value than banker's. A starting hand of "Ace" and "10" or "Jack" or "Queen" or "King" is a Blackjack and results in a win by default.<br><br>
Your current wallet balance is $${playerWalletBalance}, place your bets and we will start the game.<br><br>May the odds be ever in your favor 🍀
`;
    return openingLine;
  } else if (playerWalletBalance <= 0) {
    return `You have no more money left, come back another day!${bankruptImage}<br><br>The National Council on Problem Gambling operates the National Problem Gambling Helpline Network (1-800-522-4700). The network is a single national access point to local resources for those seeking help for a gambling problem.`;
  } else if (gameState == -1) {
    if (input > playerWalletBalance) {
      myOutputValue =
        "Bet is more than your current wallet balance<br><br>" + openingLine;
      return myOutputValue;
    } else if (input <= 0) {
      myOutputValue =
        `Invalid bet amount, please choose a bet amount between 1 and ${playerWalletBalance} <br><br>` +
        openingLine;
      return myOutputValue;
    } else if (parseFloat(input) % parseFloat(input) == 0) {
      gameState += 1;
      playerBet = parseFloat(input);
      readCards();
      return myOutputValue;
    } else {
      console.log(playerBet);
      console.log(input);
      return `Please input a valid response<br><br>${myOutputValue}`;
    }
  } else if (gameState == 1 && input != "hit" && input != "stand") {
    return `Please input a valid response<br><br>${myOutputValue}`;
  } else {
    readCards(input);
    // Return the fully-constructed output string
    return myOutputValue;
  }
};
