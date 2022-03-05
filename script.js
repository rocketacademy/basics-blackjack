var playerOneHand = [];
var playerTwoHand = [];
var playerOneDeck = [];
var playerTwoDeck = [];
var gameMode = 0;
var playerMode = 0;
var dealerMode = 0;
var playerOneScore = 0;
var playerTwoScore = 0;

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// To make a deck of cards
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

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
var deck = shuffleCards(makeDeck());
var main = function (input) {
  deck;

  //first and second round, player will need to draw another card irregardless so draw 2 cards for both irregardless
  if (gameMode == 0) {
    playerOneHand.push(deck.pop());
    playerTwoHand.push(deck.pop());
    console.log("playerOneHand");
    console.log(playerOneHand);
    console.log("playerTwoHand");
    console.log(playerTwoHand);
    playerOneScore += playerOneHand.at(-1).rank;
    playerTwoScore += playerTwoHand.at(-1).rank;
    console.log("playerOneScore1stR");
    console.log(playerOneScore);
    console.log("playerTwoScore1stR");
    console.log(playerTwoScore);

    if (playerMode == 0) {
      playerMode += 1;
      playerOneDeck.push(` ${playerOneHand[0].name} ${playerOneHand[0].suit}`);
      playerTwoDeck.push(` ${playerTwoHand[0].name} ${playerTwoHand[0].suit}`);
      return `Your current score is ${playerOneScore} while the dealer's score is ${playerTwoScore}. <br>The card you have drawn is: ${playerOneDeck}.
      <br>The card the dealer has drawn is:${playerTwoDeck}.
      <br><br>Click 'submit' again for a faced down card.`;
    }

    if (playerMode == 1) {
      console.log("playerOneScore2ndR");
      console.log(playerOneScore);
      console.log("playerTwoScore2ndR");
      console.log(playerTwoScore);
      gameMode += 1;
      playerMode += 1;
      dealerMode += 1;
      playerOneDeck.push(` ${playerOneHand[1].name} ${playerOneHand[1].suit}`);
      playerTwoDeck.push(` ${playerTwoHand[1].name} ${playerTwoHand[1].suit}`);

      if (playerOneScore == 21) {
        gameMode = 3;
        return ` You have Won!!<br>
        Your current score is ${playerOneScore}. <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}. 
        <br> The dealer's current score is ${playerTwoScore}.
        <br>The cards the dealer drawn were ${playerTwoDeck}.
        <br><br>Refresh the page to start again`;
      }
      if (playerTwoScore == 21 || playerOneScore > 21) {
        gameMode = 4;
        return `You have bust!!<br>
        Your current score is ${playerOneScore}. <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}. 
        <br> The dealer's current score is ${playerTwoScore}.
        <br>The cards the dealer drawn were ${playerTwoDeck}.
        <br><br>Refresh the page to start again`;
      }
      return `Your current score is ${playerOneScore} while the computer's score is a secret now... <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}. 
      <br>The only known card the dealer has drawn is ${playerTwoHand[0].name} ${playerTwoHand[0].suit}. The other is unknown.
      <br><br>Type 'h' if you want to hit or 's' if you want to stand.`;
    }
  }
  //third round onwards where player can decide to 'Hit' or 'Stand'
  if (gameMode == 1) {
    if (playerMode == 2 && input == "h" && playerOneScore < 21) {
      playerOneHand.push(deck.pop());
      console.log("playerOneHand");
      console.log(playerOneHand);
      playerOneScore += playerOneHand.at(-1).rank;
      console.log("playerOneScore3rdR onwards");
      console.log(playerOneScore);
      for (var i = playerOneHand.length - 1; i < playerOneHand.length; i++) {
        var nameSuitOne = ` ${playerOneHand[i].name} ${playerOneHand[i].suit}`;
        playerOneDeck.push(nameSuitOne);
      }
      if (playerOneScore == 21) {
        gameMode = 3;
        return ` You have Won!!<br>
        Your current score is ${playerOneScore}. 
        <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}. 
        <br> The dealer's current score is ${playerTwoScore}.
        <br>The cards the dealer drawn were ${playerTwoDeck}.
        <br><br>Refresh the page to start again`;
      }
      if (playerOneScore > 21) {
        gameMode = 4;
        return `You have bust!!<br>
        Your current score is ${playerOneScore}. 
        <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}. 
        <br> The dealer's current score is ${playerTwoScore}.
        <br>The cards the dealer drawn were ${playerTwoDeck}.
        <br><br>Refresh the page to start again`;
      }
      return `Your current score is ${playerOneScore} while the dealer's score is still a secret... <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}. 
      <br>The only known card the dealer has drawn is ${playerTwoHand[0].name} ${playerTwoHand[0].suit}. The other is unknown.
      <br><br>Type 'h' if you want to hit or 's' if you want to stand.`;
    }
    if (playerMode == 2 && input == "s") {
      gameMode = 2;
      return `Your final score is ${playerOneScore}. 
      <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}. 
      <br>The only known card the dealer has drawn is ${playerTwoHand[0].name} ${playerTwoHand[0].suit}. The other is unknown.
      <br><br>The dealer will now reveal his face down card and then decide whether to hit or stand. Click 'submit'.`;
    }
  }
  // dealer's turn to decide whether to hit or stand
  if (gameMode == 2) {
    if (dealerMode == 1) {
      dealerMode += 1;
      if (playerTwoScore < 17) {
        return `Your final score is ${playerOneScore}. 
      <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}.
      <br> The dealer's current score is ${playerTwoScore}.
      <br>The cards the dealer drawn were ${playerTwoDeck}.
      <br> Since the dealer's score is below 17, the dealer must hit. Click 'submit'.`;
      }
      if (
        (playerOneScore < playerTwoScore && playerTwoScore < 21) ||
        playerTwoScore == 21
      ) {
        gameMode = 4;
        return `You have Lost!!<br>
          Your final score is ${playerOneScore}. <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}. 
          <br>The dealer's current score is ${playerTwoScore}.
          <br>The cards the dealer drawn were ${playerTwoDeck}.
          <br><br>Refresh the page to start again`;
      }

      if (playerTwoScore < playerOneScore || playerTwoScore > 21) {
        gameMode = 3;
        return ` You have Won!!<br>
          Your final score is ${playerOneScore}. <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}.
          <br>The dealer's current score is ${playerTwoScore}.
          <br>The cards the dealer drawn were ${playerTwoDeck}.
          <br><br>Refresh the page to start again`;
      }

      if (playerTwoScore == playerOneScore) {
        gameMode = 5;
        return `It's a draw!!<br>
          Your final score is ${playerOneScore}. <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}.
          <br>The dealer's current score is ${playerTwoScore}.
          <br>The cards the dealer drawn were ${playerTwoDeck}.
          <br><br>Refresh the page to start again`;
      }
      return `Your final score is ${playerOneScore}. 
      <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}.
      <br> The dealer's current score is ${playerTwoScore}.
      <br>The cards the dealer drawn were ${playerTwoDeck}.
      <br> The dealer will now decide to hit or stand... 

      <br>*may the odds not be in the dealer's favour hehe*`;
    }
    if (dealerMode == 2) {
      if (playerTwoScore < 17) {
        playerTwoHand.push(deck.pop());
        console.log("playerTwoHand");
        console.log(playerTwoHand);
        playerTwoScore += playerTwoHand.at(-1).rank;
        console.log("playerTwoScore3rdR");
        console.log(playerTwoScore);
        for (var i = playerTwoHand.length - 1; i < playerTwoHand.length; i++) {
          var nameSuitTwo = ` ${playerTwoHand[i].name} ${playerTwoHand[i].suit}`;
          playerTwoDeck.push(nameSuitTwo);
        }
        if (
          (17 <= playerTwoScore &&
            playerOneScore < playerTwoScore &&
            playerTwoScore < 21) ||
          playerTwoScore == 21
        ) {
          gameMode = 4;
          return `You have Lost!!<br>
          Your final score is ${playerOneScore}. <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}. 
          <br>The dealer's current score is ${playerTwoScore}.
          <br>The cards the dealer drawn were ${playerTwoDeck}.
          <br><br>Refresh the page to start again`;
        }
        if (
          (17 <= playerTwoScore && playerTwoScore < playerOneScore) ||
          playerTwoScore > 21
        ) {
          gameMode = 3;
          return ` You have Won!!<br>
          Your final score is ${playerOneScore}. <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}.
          <br>The dealer's current score is ${playerTwoScore}.
          <br>The cards the dealer drawn were ${playerTwoDeck}.
          <br><br>Refresh the page to start again`;
        }
        if (playerTwoScore == playerOneScore) {
          gameMode = 5;
          return `It's a draw!!<br>
          Your final score is ${playerOneScore}. <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}.
          <br>The dealer's current score is ${playerTwoScore}.
          <br>The cards the dealer drawn were ${playerTwoDeck}.
          <br><br>Refresh the page to start again`;
        }

        return `Your final score is ${playerOneScore}. 
        <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}.
        <br> The dealer's current score is ${playerTwoScore}.
        <br>The cards the dealer drawn were ${playerTwoDeck}.
        <br>Since the dealer's score is below 17, the dealer must hit. Click 'submit' again. 
        <br>*may the odds not be in the dealer's favour hehe*`;
      }
    }
  }
  if (gameMode == 3) {
    return ` You have Won!!<br>
    Your final score is ${playerOneScore}. <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}.
    <br>The dealer's final score is ${playerTwoScore}.
    <br>The cards the dealer drawn were ${playerTwoDeck}.
    <br><br>Refresh the page to start again`;
  }

  if (gameMode == 4) {
    return `You have Lost!!<br>
    Your final score is ${playerOneScore}. <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}. 
    <br>The dealer's final score is ${playerTwoScore}.
    <br>The cards the dealer drawn were ${playerTwoDeck}.
    <br><br>Refresh the page to start again`;
  }

  if (gameMode == 5) {
    return `It's a draw!!<br>
    Your final score is ${playerOneScore}. <br>The cards you have drawn, in order of rounds, are: ${playerOneDeck}. 
    <br>The dealer's final score is ${playerTwoScore}.
    <br>The cards the dealer drawn were ${playerTwoDeck}.
    <br><br>Refresh the page to start again`;
  }

  return `Type 'h' if you want to hit or 's' if you want to draw another card. `;
};
