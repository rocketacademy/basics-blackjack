// Black Jack Game //

/* Gameplay Description 
1. Shuffle Deck
2. User clicks "submit" to deal cards. User and computer each get 2 cards.
3. Cards are analysed for game winning conditions. 
e.g. wins if got blackjack (i.e. ace + jack/queen/king)
4. Cards are displayed to the user.
5. User decides to hit or stand, using the submit button to submit their decision.
i.e. hit: to get one more card
i.e. stand: end round with the in-hands cards
6. Computer automatically decides hit or stand based on game rules.
i.e. if computer card is less than or equal to 16, they must hit
i.e. if computer card is more than 16, they must stand
7. Cards are analysed for game winning or losing conditions.
e.g. if cards value exceed 21 (bust)
e.g. if cards value is more than computer cards, you win
e.g. if cards value is less than computer cards, you lose
e.g. if cards value is same as computer cards, it's a tie
8. The game continues when user clicks "submit" button. */

// Create a standard 52-card deck function
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
    var currentSymbol = "";

    if (currentSuit == "hearts") {
      currentSymbol = "♥";
    } else if (currentSuit == "diamonds") {
      currentSymbol = "♦";
    } else if (currentSuit == "clubs") {
      currentSymbol = "♣";
    } else if (currentSuit == "spades") {
      currentSymbol = "♠";
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var currentCardValue = rankCounter;

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

      if (
        currentCardValue == 11 ||
        currentCardValue == 12 ||
        currentCardValue == 13
      ) {
        currentCardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        symbol: currentSymbol,
        value: currentCardValue,
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

// Get a random variable function from 0 (inclusive) to max (exclusive)
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle deck function
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

var calculateCardsValue = function (cardDeck) {
  var index = 0;
  var cardValue = 0;
  var aceCounter = 0;

  while (index < cardDeck.length) {
    if (cardDeck[index].name == "Ace") {
      cardDeck[index].value = 11;
      aceCounter += 1;
    }
    cardValue = cardValue + cardDeck[index].value;
    index += 1;
    console.log(cardValue);
  }
  console.log(cardValue);

  index = 0;

  while (index < aceCounter) {
    if (cardValue > 21) {
      cardValue = cardValue - 10;
    }
    index += 1;
    console.log(cardValue);
  }

  return cardValue;
};

var whoWins = function (playerValue, computerValue) {
  var winner = "";
  if (
    (playerValue > 21 && computerValue > 21) ||
    playerValue == computerValue
  ) {
    winner = "It's a tie.";
  } else if (
    (playerValue > computerValue && playerValue <= 21) ||
    (computerValue > 21 && playerValue <= 21)
  ) {
    winner = "Congratulations! Player wins.";
  } else if (
    (playerValue < computerValue && computerValue <= 21) ||
    (playerValue > 21 && computerValue <= 21)
  ) {
    winner = "Too Bad! Computer wins.";
  }
  return winner;
};

var display1Card = function (cardArray) {
  var index = 0;
  var message = "";

  while (index < cardArray.length) {
    index += 1;
    message = message + `${cardArray[index].name}${cardArray[index].symbol} `;
    index += 1;
  }
  message = message + ` covered `;

  return message;
};

var displayAllCards = function (cardArray) {
  var index = 0;
  var message = "";
  var comment = "";

  while (index < cardArray.length) {
    message = message + `${cardArray[index].name}${cardArray[index].symbol} `;
    index += 1;
  }
  if (calculateCardsValue(cardArray) > 21) {
    comment = "Busted!";
  } else if (calculateCardsValue(cardArray) == 21) {
    comment = "BlackJack!";
  }
  message = message + ` (${calculateCardsValue(cardArray)}) ` + comment;

  return message;
};

var displayHint = function (playerCardArray) {
  var hint = "";
  var playerValue = calculateCardsValue(playerCardArray);
  if (playerValue == 21) {
    hint = `Hint: You have already got Blackjack! Click "stand" to continue.`;
  } else if (playerValue <= 16) {
    hint = `Hint: You can try your luck by clicking "hit"`;
  } else if (playerValue > 16 && playerValue < 21) {
    hint = `Hint: You are now very close to Blackjack. Think carefully.`;
  } else if (playerValue > 21) {
    hint = 'Hint: You already exceed Blackjack. Click "stand" to continue.';
  }
  return hint;
};

var tabulatePoints = function (playerCards, computerCards) {
  var initialPoints = playerPoints;

  console.log(playerPoints);
  console.log(initialPoints);

  if (
    whoWins(
      calculateCardsValue(playerCards),
      calculateCardsValue(computerCards)
    ) == "It's a tie."
  ) {
    if (
      calculateCardsValue(playerCards) > 21 &&
      calculateCardsValue(computerCards) > 21
    ) {
      playerPoints = initialPoints - betPerRound;
    } else {
      playerPoints = initialPoints;
    }
  } else if (
    whoWins(
      calculateCardsValue(playerCards),
      calculateCardsValue(computerCards)
    ) == "Congratulations! Player wins."
  ) {
    playerPoints = initialPoints + betPerRound;
  } else if (
    whoWins(
      calculateCardsValue(playerCards),
      calculateCardsValue(computerCards)
    ) == "Too Bad! Computer wins."
  ) {
    playerPoints = initialPoints - betPerRound;
  }

  var totalPoints = `Player Initial Points: ${initialPoints} <br> Bet: ${betPerRound} <br> Player Current Points: ${playerPoints}`;
  return totalPoints;
};

// Define Global Variables
var Deal_Cards = "deal cards";
var Hit_Or_Stand = "hit or stand";
var Who_Wins = "who wins";
var Game_Over = "game over";
var gameMode = Deal_Cards;
var myOutputValue = "";
var playerCards = [];
var computerCards = [];
var playerCardsValue = 0;
var computerCardsValue = 0;
var myImage;
var playerPoints = 100;
var betPerRound = 10;
//create a 52-card Deck
var myDeck = makeDeck();

var main = function (input) {
  //shuffle deck
  var shuffledDeck = shuffleCards(myDeck);
  console.log(myDeck);

  // when user click "submit" button, to deal 2 cards each to user and computer
  if (gameMode == Deal_Cards) {
    if (myDeck.length < 4) {
      gameMode = Game_Over;
      return (myOutputValue = `Game Over! <br><br> The deck runs out of cards. <br> Please refresh the page to start a new game.`);
    }
    if (input == "") {
      playerCards = [];
      computerCards = [];
      playerCards.push(shuffledDeck.pop());
      playerCards.push(shuffledDeck.pop());
      computerCards.push(shuffledDeck.pop());
      computerCards.push(shuffledDeck.pop());

      playerCardsValue = calculateCardsValue(playerCards);
      computerCardsValue = calculateCardsValue(computerCards);

      gameMode = Hit_Or_Stand;

      myOutputValue = `Computer Hand: ${display1Card(computerCards)}
      <br> Player Hand: ${displayAllCards(playerCards)}`;
      myImage =
        '<img src="https://c.tenor.com/Je7_88Z0800AAAAC/disney-inside-out.gif"/>';

      return `${myOutputValue} <br><br> Decide if you want to "hit" or "stand". <br><br> ${displayHint(
        playerCards
      )} ${myImage}`;
    } else if (input !== "") {
      myOutputValue = `Invalid option. Click "submit" to deal cards.`;
    }
  }

  if (gameMode == Hit_Or_Stand) {
    if (input.toLowerCase() != "hit" && input.toLowerCase() != "stand") {
      return `${myOutputValue} <br><br> Invalid option. Please enter "hit" or "stand".`;
    } else if (input.toLowerCase() == "stand") {
      while (computerCardsValue <= 16) {
        if (myDeck.length == 0) {
          gameMode = Game_Over;
          return (myOutputValue = `Game Over! <br><br> The deck runs out of cards. <br> Please refresh the page to start a new game.`);
        } else {
          computerCards.push(shuffledDeck.pop());
          computerCardsValue = calculateCardsValue(computerCards);
        }
      }
      console.log("computer cards: " + computerCards);
      gameMode = Who_Wins;
      myImage =
        '<img src = "https://media3.giphy.com/media/fEewGteMTVyMM/giphy.gif?cid=790b7611d8af12a9124d7b7b9ddbd5be0e97562e94dc64d7&rid=giphy.gif&ct=g"/>';
      return `${myOutputValue} <br><br> You choose stand. <br><br> Click "submit" to see who wins. ${myImage}`;
    } else if (
      (input.toLowerCase() == "hit" && playerCardsValue > 21) ||
      (input.toLowerCase() == "hit" && playerCardsValue == 21)
    ) {
      return `${myOutputValue} <br><br> Invalid Option. Please enter "stand".`;
    } else if (input.toLowerCase() == "hit") {
      if (myDeck.length == 0) {
        gameMode = Game_Over;
        return (myOutputValue = `Game Over! <br><br> The deck runs out of cards. <br> Please refresh the page to start a new game.`);
      } else {
        playerCards.push(shuffledDeck.pop());
        playerCardsValue = calculateCardsValue(playerCards);
        myOutputValue = `Computer Hand: ${display1Card(computerCards)} 
      <br> Player Hand: ${displayAllCards(playerCards)}`;
        myImage =
          '<img src = "https://media1.giphy.com/media/ed0XptTuGv8be/giphy.gif?cid=790b761136d87c9e88ae54897493b08e8662df7f17cf6e30&rid=giphy.gif&ct=g"/>';
      }

      // myOutputValue =
      //   myOutputValue.slice(0, -4) +
      //   ` , ${playerCards[playerCards.length - 1].name}${
      //     playerCards[[playerCards.length - 1]].symbol
      //   } (${playerCardsValue})`;

      return `${myOutputValue} <br><br> Decide if you want to "hit" or "stand". <br><br>${displayHint(
        playerCards
      )} ${myImage}`;
    }
  }

  if (gameMode == Who_Wins) {
    if (input !== "") {
      return (
        myOutputValue +
        `<br><br> Invalid Option. Click "submit" to see who wins.`
      );
    }
    if (
      whoWins(
        calculateCardsValue(playerCards),
        calculateCardsValue(computerCards)
      ) == "It's a tie."
    ) {
      myImage =
        '<img src="https://media3.giphy.com/media/9Lycp5ifWTm6I/giphy.gif?cid=790b76119c6a2031b16393028411c3af7e52698183243329&rid=giphy.gif&ct=g"/>';
    } else if (
      whoWins(
        calculateCardsValue(playerCards),
        calculateCardsValue(computerCards)
      ) == "Congratulations! Player wins."
    ) {
      myImage =
        '<img src="https://media3.giphy.com/media/bBsLmHGPrZKN2/giphy.gif?cid=790b7611a06603e29f2a1d5fa5547278ff7d49aa30137933&rid=giphy.gif"/>';
    } else if (
      whoWins(
        calculateCardsValue(playerCards),
        calculateCardsValue(computerCards)
      ) == "Too Bad! Computer wins."
    ) {
      myImage = '<img src="https://c.tenor.com/MC7I7H_t4vsAAAAC/sad-cry.gif"/>';
    }

    myOutputValue = `${whoWins(
      playerCardsValue,
      computerCardsValue
    )} ${myImage} <br><br> Computer Hand: ${displayAllCards(
      computerCards
    )} <br> Player Hand: ${displayAllCards(
      playerCards
    )} <br><br> ${tabulatePoints(
      playerCards,
      computerCards
    )}<br><br> Click "submit" to deal cards again.`;
    console.log(myOutputValue);
  }

  if (playerPoints == 0) {
    gameMode = Game_Over;
  } else {
    gameMode = Deal_Cards;
  }

  if (gameMode == Game_Over) {
    myImage = '<img src ="https://c.tenor.com/Ho845EEf4v0AAAAC/angry.gif"/>';

    if (playerPoints == 0) {
      return (myOutputValue = `Game Over! <br><br> Player runs out of points. <br> Please refresh the page to start a new game. ${myImage}`);
    } else
      return (myOutputValue = `Game Over! <br><br> The deck runs out of cards. <br> Please refresh the page to start a new game. ${myImage}`);
  }

  return myOutputValue;
};
