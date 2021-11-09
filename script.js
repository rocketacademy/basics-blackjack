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
  if (
    (playerCard1.name == "ace" && playerCard2.rank >= 10) ||
    (playerCard2.name == "ace" && playerCard1.rank >= 10)
  ) {
    var blackjack = true;
  }
  return blackjack;
};

var checkSum = function (playerDeck) {
  var indexCounter = 0;
  if (playerDeck.length == 2) {
    while (indexCounter < playerDeck.length) {
      var playerCard = playerDeck[indexCounter];
      var cardName = playerCard.name;
      if (cardName == "queen" || cardName == "king" || cardName == "jack") {
        playerDeck[indexCounter].rank = 10;
      }
      indexCounter = indexCounter + 1;
    }
    var playerSum = playerDeck[0].rank + playerDeck[1].rank;
    console.log(playerSum, "playerSum");
  }

  if (playerDeck.length == 3) {
    while (indexCounter < playerDeck.length) {
      var playerCard = playerDeck[indexCounter];
      var cardName = playerCard.name;
      if (cardName == "queen" || cardName == "king" || cardName == "jack") {
        playerDeck[indexCounter].rank = 10;
      }
      indexCounter = indexCounter + 1;
    }
    var playerSum =
      playerDeck[0].rank + playerDeck[1].rank + playerDeck[2].rank;
    console.log(playerSum, "playerSum");
  }
  return playerSum;
};

var main = function (input) {
  var myOutputValue = "";
  // player name input
  if (currentGameMode == "player name input" && input != "") {
    playerName = input;
    myOutputValue = `Welcome ${playerName}, please press submit to draw 2 cards.`;
    currentGameMode = "draw cards";
  } else if (currentGameMode == "player name input" && input == "") {
    myOutputValue = "Please input your name.";
    currentGameMode = "player name input";
  }

  // game starts
  if (currentGameMode == "draw cards") {
    // Initialise the shuffled card deck before the game starts.
    // 1. player and computer draw 2 cards from shuffled deck
    var playerCard1 = deck.pop();
    var playerCard2 = deck.pop();
    // playerCard1.name = "ace";
    // playerCard2.rank = 10;
    playerDeck.push(playerCard1, playerCard2);
    console.log("playerDeck", playerDeck);
    console.log("playerCard1", playerCard1);
    console.log("playerCard2", playerCard2);
    var computerCard1 = deck.pop();
    var computerCard2 = deck.pop();
    // computerCard1.name = "ace";
    // computerCard2.rank = 10;
    computerDeck.push(computerCard1, computerCard2);
    console.log("computerDeck", computerDeck);
    console.log("computerCard1", computerCard1);
    console.log("computerCard2", computerCard2);
    myOutputValue = `${playerName}'s hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} <br> Dealer's hand: ${computerCard1.name} of ${computerCard1.suit}, ${computerCard2.name} of ${computerCard2.suit}<br> ${playerName}, please choose hit or stand.`;
    currentGameMode = "check blackjack";
  }
  // 1a. blackjack scenario
  if (currentGameMode == "check blackjack") {
    var playerBlackjack = checkBlackjack(playerDeck);
    var computerBlackjack = checkBlackjack(computerDeck);
    //player blackjack
    if (playerBlackjack == true && computerBlackjack != true) {
      playerScore = playerScore + 1;
      computerScore = computerScore + 0;
      myOutputValue = `${playerName}'s hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} <br> Dealer's hand: ${computerCard1.name} of ${computerCard1.suit}, ${computerCard2.name} of ${computerCard2.suit} <br><br> ${playerName} wins! <br><br> ${playerName}'s Score: ${playerScore}<br> Dealer's score: ${computerScore}`;
    }
    // computer blackjack
    else if (computerBlackjack == true && playerBlackjack != true) {
      playerScore = playerScore + 0;
      computerScore = computerScore + 1;
      myOutputValue = `${playerName}'s hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} <br> Dealer's hand: ${computerCard1.name} of ${computerCard1.suit}, ${computerCard2.name} of ${computerCard2.suit} <br><br> Dealer wins! <br><br> ${playerName}'s Score: ${playerScore}<br> Dealer's score: ${computerScore}`;
    }
    // both blackjack
    else if (playerBlackjack == true && computerBlackjack == true) {
      playerScore = playerScore + 0;
      computerScore = computerScore + 0;
      myOutputValue = `${playerName}'s hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} <br> Dealer's hand: ${computerCard1.name} of ${computerCard1.suit}, ${computerCard2.name} of ${computerCard2.suit} <br><br> It's a tie. <br><br> ${playerName}'s Score: ${playerScore}<br> Dealer's score: ${computerScore}`;
    } else if (playerBlackjack != true && computerBlackjack != true) {
      currentGameMode = "player draws";
    }
  }
  // 2. player decides to hit or stand
  // 2a. player hit
  if (currentGameMode == "player draws" && input == "hit") {
    var playerCard3 = deck.pop();
    playerDeck.push(playerCard3);
    myOutputValue = `You drew : ${playerDeck[2].name} of ${playerDeck[2].suit} <br><br> ${playerName}'s hand: ${playerDeck[0].name} of ${playerDeck[0].suit}, ${playerDeck[1].name} of ${playerDeck[1].suit}, ${playerDeck[2].name} of ${playerDeck[2].suit}<br> Dealer's hand: ${computerDeck[0].name} of ${computerDeck[0].suit}, ${computerDeck[1].name} of ${computerDeck[1].suit}<br><br> It's dealer's turn.`;
    console.log("myOutputValue after hit", myOutputValue);
    currentGameMode = "dealer turn";
    //2b. player stand
  } else if (currentGameMode == "player draws" && input == "stand") {
    myOutputValue = `${playerName}'s hand: ${playerDeck[0].name} of ${playerDeck[0].suit}, ${playerDeck[1].name} of ${playerDeck[1].suit} <br> Dealer's hand: ${computerDeck[0].name} of ${computerDeck[0].suit}, ${computerDeck[1].name} of ${computerDeck[1].suit} <br><br> It's dealer's turn.`;
    currentGameMode = "dealer turn";
    //2c. player input neither hit nor stand
  } else if (
    currentGameMode == "player draws" &&
    input != "hit" &&
    input != "stand"
  ) {
    myOutputValue = `${playerName}'s hand: ${playerDeck[0].name} of ${playerDeck[0].suit}, ${playerDeck[1].name} of ${playerDeck[1].suit} <br> Dealer's hand: ${computerDeck[0].name} of ${computerDeck[0].suit}, ${computerDeck[1].name} of ${computerDeck[1].suit} <br><br> Please input "hit" or "stand".`;
  }

  // dealer draws if hand < 17
  if (currentGameMode == "dealer turn" && input == "") {
    var computerSum = checkSum(computerDeck);
    console.log(computerSum, "computersum");
    if (computerSum < 17) {
      //dealer draws
      var computerCard3 = deck.pop();
      computerDeck.push(computerCard3);
      console.log(computerCard3, "computerCard3");
      // compare the sum of cards to see who wins
      var playerSum = checkSum(playerDeck);
      computerSum = checkSum(computerDeck);
      console.log(playerSum, "playersum");
      console.log(computerSum, "computersum");
      //player lose scenarios : burst / < computer sum
      if ((playerSum > 21 && computerSum < 21) || playerSum < computerSum) {
        playerScore = playerScore + 0;
        computerScore = computerScore + 1;
        myOutputValue = `Dealer drew: ${computerDeck[2].name} of ${computerDeck[2].suit}<br><br> ${playerName}'s Hand: ${playerSum}<br>Dealer's Hand: ${computerSum}<br><br> ${playerName}, you lost.<br><br> ${playerName}'s Score: ${playerScore}<br> Dealer's score: ${computerScore}`;
      }
      //computer lose scenarios
      else if (
        (computerSum > 21 && playerSum < 21) ||
        computerSum < playerSum
      ) {
        playerScore = playerScore + 1;
        computerScore = computerScore + 0;
        myOutputValue = `Dealer drew: ${computerDeck[2].name} of ${computerDeck[2].suit}<br><br> ${playerName}'s Hand: ${playerSum}<br>Dealer's Hand: ${computerSum}<br><br> Computer lost. <br><br> ${playerName}'s Score: ${playerScore}<br> Dealer's score: ${computerScore}`;
      }
      // tie scenarios, both burst, or
      else if (
        (playerSum > 21 && computerSum > 21) ||
        playerSum == computerSum
      ) {
        playerScore = playerScore + 0;
        computerScore = computerScore + 0;
        myOutputValue = `Dealer drew: ${computerDeck[2].name} of ${computerDeck[2].suit}<br><br> ${playerName}'s Hand: ${playerSum}<br>Dealer's Hand: ${computerSum}<br><br> It's a tie. <br><br> ${playerName}'s Score: ${playerScore}<br> Dealer's score: ${computerScore}`;
      }
    }
    // if computer > 17, no draw
    else if (computerSum > 17) {
      playerSum = checkSum(playerDeck);
      computerSum = checkSum(computerDeck);
      // player lose scenarios
      if ((playerSum > 21 && computerSum < 21) || playerSum < computerSum) {
        playerScore = playerScore + 0;
        computerScore = computerScore + 1;
        myOutputValue = `${playerName}'s Hand: ${playerSum}<br>Dealer's Hand: ${computerSum}<br><br> ${playerName}, you lost. <br><br> ${playerName}'s Score: ${playerScore}<br> Dealer's score: ${computerScore}`;
      }
      //computer lose scenarios
      else if (
        (computerSum > 21 && playerSum < 21) ||
        computerSum < playerSum
      ) {
        playerScore = playerScore + 1;
        computerScore = computerScore + 0;
        myOutputValue = `${playerName}'s Hand: ${playerSum}<br>Dealer's Hand: ${computerSum}<br><br> Computer lost. <br><br> ${playerName}'s Score: ${playerScore}<br> Dealer's score: ${computerScore}`;
      }
      // tie scenarios, both burst, or
      else if (
        (playerSum > 21 && computerSum > 21) ||
        playerSum == computerSum
      ) {
        playerScore = playerScore + 0;
        computerScore = computerScore + 0;
        myOutputValue = `${playerName}'s Hand: ${playerSum}<br>Dealer's Hand: ${computerSum}<br><br> It's a tie. <br><br> ${playerName}'s Score: ${playerScore}<br> Dealer's score: ${computerScore}`;
      }
    }
  }

  return myOutputValue;
};
