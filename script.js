// 1. 2 players - computer (dealer) and player
var playerName = "";

var deck = [];
var playerDeck = [];
var computerDeck = [];

var playerScore = 0;
var computerScore = 0;

//game mode
var currentGameMode = "player name input";

// player Name
var playerName = "";

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

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
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

deck = shuffleCards(makeDeck());
// gets 2 cards each (sum of cards)

// Win condition, blackjack
var checkBlackjack = function (playerDeck) {
  var playerCard1 = playerDeck[0];
  var playerCard2 = playerDeck[1];
  var indexCounter = 0;
  while (indexCounter < playerDeck.length) {
    if (
      playerDeck[indexCounter].name == "jack" ||
      playerDeck[indexCounter].name == "queen" ||
      playerDeck[indexCounter].name == "king"
    ) {
      playerDeck[indexCounter].rank = 10;
    }
    indexCounter = indexCounter + 1;
  }
  if (
    (playerCard1.name == "ace" && playerCard2.rank == 10) ||
    (playerCard2.name == "ace" && playerCard1.rank == 10)
  ) {
    var blackjack = true;
  }
  return blackjack;
};

var checkSum = function (playerDeck) {
  var totalSum = 0;
  var indexCounter = 0;
  while (indexCounter < playerDeck.length) {
    var playerCard = playerDeck[indexCounter];
    var cardRank = playerDeck[indexCounter].rank;
    if (
      playerCard.name == "jack" ||
      playerCard.name == "queen" ||
      playerCard.name == "king"
    ) {
      cardRank = 10;
    }

    totalSum = totalSum + cardRank;
    indexCounter = indexCounter + 1;
  }
  return totalSum;
};

var checkWinner = function (playerDeck, computerDeck) {
  playerSum = checkSum(playerDeck);
  computerSum = checkSum(computerDeck);
  // nobody burst, playerSum > computerSum, player wins
  if (playerSum > computerSum && playerSum <= 21 && computerSum <= 21) {
    myOutputValue = `Your card rank: ${playerSum}<br> Dealer's card rank: ${computerSum} <br><br> Congratulations! The winner is ${playerName}! You win!`;
  }
  // nobody burst, playerSum < computerSum, computer wins
  else if (playerSum < computerSum && playerSum <= 21 && computerSum <= 21) {
    myOutputValue = `Your card rank: ${playerSum}<br> Dealer's card rank: ${computerSum} <br><br> The winner is the Dealer! You lose!`;
  }
  // player burst
  else if (playerSum > 21 && computerSum <= 21) {
    myOutputValue = `Your card rank: ${playerSum}<br> Dealer's card rank: ${computerSum} <br><br> You burst. The winner is the Dealer! You lose!`;
  }
  //computer burst
  else if (playerSum <= 21 && computerSum > 21) {
    myOutputValue = `Your card rank: ${playerSum}<br> Dealer's card rank: ${computerSum} <br><br> Dealer burst. Congratulations! The winner is ${playerName}! You win!`;
  }
  //both burst
  else if (playerSum > 21 && computerSum > 21) {
    myOutputValue = `Your card rank: ${playerSum}<br> Dealer's card rank: ${computerSum} <br><br> Everyone burst. It's a tie!`;
  }
  // same rank
  else if (playerSum == computerSum && playerSum > 21 && computerSum <= 21) {
    myOutputValue = `Your card rank: ${playerSum}<br> Dealer's card rank: ${computerSum} <br><br> It's a tie!`;
  }
  return myOutputValue;
};

//display msg -- first card of dealer deck is not shown
var displayHand = function (playerDeck, computerDeck) {
  var playerOutput = `${playerName}'s Hand: <br>`;
  var indexCounter = 0;
  while (indexCounter < playerDeck.length) {
    playerOutput =
      playerOutput +
      playerDeck[indexCounter].name +
      " of " +
      playerDeck[indexCounter].suit +
      "<br>";
    indexCounter = indexCounter + 1;
  }

  var computerOutput = `Dealer's Hand: <br>  Hidden Card <br> ${computerDeck[1].rank} of ${computerDeck[1].suit}`;
  var myOutputValue = playerOutput + "<br>" + computerOutput;
  return myOutputValue;
};

//display msg -- end of round where both cards of dealer deck are shown
var displayHandEnd = function (playerDeck, computerDeck) {
  var playerOutput = `${playerName}'s Hand: <br>`;
  var indexCounter = 0;
  while (indexCounter < playerDeck.length) {
    playerOutput =
      playerOutput +
      playerDeck[indexCounter].name +
      " of " +
      playerDeck[indexCounter].suit +
      "<br>";
    indexCounter = indexCounter + 1;
  }

  var computerOutput = `Dealer's Hand: <br>`;
  var indexCounter = 0;
  while (indexCounter < computerDeck.length) {
    computerOutput =
      computerOutput +
      computerDeck[indexCounter].name +
      " of " +
      computerDeck[indexCounter].suit +
      "<br>";
    indexCounter = indexCounter + 1;
  }
  var myOutputValue = playerOutput + "<br>" + computerOutput;
  return myOutputValue;
};

//display msg -- blackjack scenario, both cards from both players are shown
var displayBlackjackHand = function (playerDeck, computerDeck) {
  var playerOutput = `${playerName}'s Hand: <br>`;
  var indexCounter = 0;
  while (indexCounter < playerDeck.length) {
    playerOutput =
      playerOutput +
      playerDeck[indexCounter].name +
      " of " +
      playerDeck[indexCounter].suit +
      "<br>";
    indexCounter = indexCounter + 1;
  }

  var computerOutput = `Dealer's Hand: <br>`;
  var indexCounter = 0;
  while (indexCounter < computerDeck.length) {
    computerOutput =
      computerOutput +
      computerDeck[indexCounter].name +
      " of " +
      computerDeck[indexCounter].suit +
      "<br>";
    indexCounter = indexCounter + 1;
  }
  var myOutputValue = playerOutput + "<br>" + computerOutput;
  return myOutputValue;
};

var playerDraw = function () {
  playerCard = deck.pop();
  playerDeck.push(playerCard);
  var playerDrawMessage =
    `You have chosen to hit. You have drawn ` +
    playerCard.name +
    " of " +
    playerCard.suit +
    ".<br>";
  console.log(playerDeck, "playerDeck");
  var playerSum = checkSum(playerDeck);
  var displayMessage =
    playerDrawMessage + "<br>" + displayHand(playerDeck, computerDeck);
  myOutputValue =
    displayMessage +
    `<br><br> Your card rank: ${playerSum}<br><br> Please decide to hit or stand.`;
  document.getElementById("output-div").innerHTML = myOutputValue;
  return myOutputValue;
};

var playerStand = function () {
  var displayMessage = displayHand(playerDeck, computerDeck);
  var playerSum = checkSum(playerDeck);
  myOutputValue =
    `You have chosen to stand. <br><br>` +
    displayMessage +
    `<br><br> Your card rank: ${playerSum}<br><br> It's Dealer's turn. Press submit to continue.`;
  document.getElementById("output-div").innerHTML = myOutputValue;
  console.log("playerstand", myOutputValue);
  currentGameMode = "Dealer turn";
  return myOutputValue;
};

var computerDraw = function () {
  computerCard = deck.pop();
  computerDeck.push(computerCard);
  computerSum = checkSum(computerDeck);
  var myOutputValue =
    `The Dealer has chosen to hit. Dealer has drawn ` +
    computerCard.name +
    " of " +
    computerCard.suit +
    ".<br>";
  return myOutputValue;
};

var main = function (input) {
  var myOutputValue = "";
  // player name input
  if (currentGameMode == "player name input" && input != "") {
    playerName = input;
    currentGameMode = "draw cards";
    return (myOutputValue = `Welcome ${playerName}, please press submit to draw 2 cards.`);
  } else if (currentGameMode == "player name input" && input == "") {
    currentGameMode = "player name input";
    return (myOutputValue = "Please input your name.");
  }

  // game starts
  if (currentGameMode == "draw cards" && input == "") {
    // Initialise the shuffled card deck before the game starts.
    // 1. player and computer draw 2 cards from shuffled deck
    var playerCard1 = deck.pop();
    var playerCard2 = deck.pop();
    playerDeck.push(playerCard1, playerCard2);
    console.log("playerDeck", playerDeck);
    console.log("playerCard1", playerCard1);
    console.log("playerCard2", playerCard2);
    var computerCard1 = deck.pop();
    var computerCard2 = deck.pop();
    computerDeck.push(computerCard1, computerCard2);
    console.log("computerDeck", computerDeck);
    console.log("computerCard1", computerCard1);
    console.log("computerCard2", computerCard2);
    var displayMessage = displayHand(playerDeck, computerDeck);
    var computerSum = checkSum(computerDeck);
    var playerSum = checkSum(playerDeck);
    myOutputValue =
      displayMessage +
      `<br><br> Your card rank: ${playerSum}<br><br> ${playerName}, Please decide to hit or stand.`;
    console.log("myOutputValue", myOutputValue);
    currentGameMode = "Player choice";
    // check blackjack
    var playerBlackjack = checkBlackjack(playerDeck);
    var computerBlackjack = checkBlackjack(computerDeck);
    // player blackjack
    if (playerBlackjack == true && computerBlackjack != true) {
      displayMessage = displayBlackjackHand(playerDeck, computerDeck);
      myOutputValue =
        displayMessage +
        `<br> Congratulations, ${playerName} wins by blackjack!`;
    }
    // computer blackjack
    else if (computerBlackjack == true && playerBlackjack != true) {
      displayMessage = displayBlackjackHand(playerDeck, computerDeck);
      myOutputValue =
        displayMessage + `<br> Congratulations, the Dealer wins by blackjack!`;
    }
    // both blackjack
    else if (playerBlackjack == true && computerBlackjack == true) {
      displayMessage = displayBlackjackHand(playerDeck, computerDeck);
      myOutputValue =
        displayMessage +
        `<br> Congratulations, both sides hold blackjack! It's a draw!`;
    }
  } else if (currentGameMode == "draw cards" && input != "") {
    myOutputValue = "Please press submit to draw 2 cards.";
  }

  // 2. player decides to hit or stand
  else if (currentGameMode == "Player choice") {
    if (playerDraw == true) {
      // var playerDrawMessage = playerDraw();
      // var computerSum = checkSum(computerDeck);
      // var playerSum = checkSum(playerDeck);
      // displayMessage =
      //   playerDrawMessage + "<br>" + displayHand(playerDeck, computerDeck);
      // myOutputValue =
      //   displayMessage +
      //   `<br><br> Your card rank: ${playerSum}<br><br> Please decide to hit or stand.`;
      // console.log(displayMessage, "displayerMessage");
    } else if (playerStand == true) {
      // displayMessage = displayHand(playerDeck, computerDeck);
      // var computerSum = checkSum(computerDeck);
      // var playerSum = checkSum(playerDeck);
      // myOutputValue =
      //   `You have chosen to stand. <br><br>` +
      //   displayMessage +
      //   `<br><br> Your card rank: ${playerSum}<br><br> It's Dealer's turn. Press submit to continue.`;
      // currentGameMode = "Dealer turn";
    } else if (input != "stand" && input != "hit") {
      var computerSum = checkSum(computerDeck);
      var playerSum = checkSum(playerDeck);
      displayMessage = displayHand(playerDeck, computerDeck);
      myOutputValue =
        "You have not select any of the choice. Please decide to hit or stand. <br><br>" +
        displayMessage +
        `<br><br> Your card rank: ${playerSum}`;
    }
  }

  // dealer's turn
  // dealer draw if total sum less than 17
  else if ((currentGameMode = "Dealer turn")) {
    computerSum = checkSum(computerDeck);
    if (computerSum < 17) {
      var computerDrawMessage = computerDraw();
      displayMessage =
        computerDrawMessage + "<br>" + displayHandEnd(playerDeck, computerDeck);
      computerSum = checkSum(computerDeck);
      playerSum = checkSum(playerDeck);
      myOutputValue =
        displayMessage +
        `<br><br> Your card rank: ${playerSum}<br>Dealer's card rank: ${computerSum}<br><br> Please press submit to continue.`;
    } else if (computerSum >= 17) {
      displayMessage =
        `The Dealer decides to stand.<br><br>` +
        displayHandEnd(playerDeck, computerDeck);
      var winnerMessage = checkWinner(playerDeck, computerDeck);
      myOutputValue = displayMessage + "<br>" + winnerMessage;
      console.log(myOutputValue, "myoutputValue");
    }
  }
  return myOutputValue;
};
