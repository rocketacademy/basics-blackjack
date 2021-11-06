//Start from game mode - player drew 2 cards
var currentGameMode = "Player Draw Cards";

var totalplayerCardRank = 0;
var totalComputerCardRank = 0;
var currentCardDrewSoFar = "";
var previousCards = "";

// //Create a card deck of 52 cards, Ace value = 11
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var name = ["", "ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter < name.length) {
      // By default, the card name is the same as rankCounter
      var cardName = name[rankCounter];
      var rankCounterBJ = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == "ace") {
        rankCounterBJ = 11;
      } else if (cardName == "jack") {
        rankCounterBJ = 10;
      } else if (cardName == "queen") {
        rankCounterBJ = 10;
      } else if (cardName == "king") {
        rankCounterBJ = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounterBJ,
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

var main = function (playerInput) {
  var myOutputValue = `Player, the cards you drew are: <br>`;

  //shuffle the 52 cards, player will get 2 cards from the deck when click "submit"
  if (currentGameMode == "Player Draw Cards") {
    console.log(currentGameMode);
    var shuffleDeckOfCard = shuffleCards(makeDeck());
    var arrayForCurrentCardRank = [];
    for (let counter = 0; counter < 2; counter += 1) {
      var currentCardDrew = shuffleDeckOfCard.pop();

      myOutputValue =
        myOutputValue +
        `${currentCardDrew.name} of ${currentCardDrew.suit} <br>`;
      arrayForCurrentCardRank.push(currentCardDrew.rank);
      previousCards = myOutputValue;
    }

    //Show player the total rank of 2 cards drawn
    totalplayerCardRank =
      arrayForCurrentCardRank[0] + arrayForCurrentCardRank[1];
    if (arrayForCurrentCardRank[0] + arrayForCurrentCardRank[1] == 21) {
      var blackJackPlayer = true;
    }
    myOutputValue =
      myOutputValue + `<br>Your total points is ${totalplayerCardRank} <br>`;

    if (totalplayerCardRank < 17) {
      myOutputValue =
        myOutputValue + `Your point is below 17. Choose 1 to "hit".`;
    } else {
      myOutputValue = myOutputValue + `Choose 1 to "hit" or 2 to "stand".`;
    }
    currentGameMode = "Player hit or stand";
    return myOutputValue;
  }

  //Validation
  if (playerInput !== 1 || playerInput !== 2) {
    myOutputValue = `Invalid option. Please choose 1 to "hit" or 2 to "stand".`;
  }

  //In this game mode, add the card rank of the new card drawn to the current card rank
  if (currentGameMode == "Player hit or stand" && playerInput == 1) {
    console.log(currentGameMode);
    var shuffleDeckOfCard = shuffleCards(makeDeck());
    var additionalCardDrew = shuffleDeckOfCard.pop();
    totalplayerCardRank += additionalCardDrew.rank;
    previousCards += `${additionalCardDrew.name} of ${additionalCardDrew.suit} <br> `;
    myOutputValue =
      previousCards +
      `<br> Your new total points is: ${totalplayerCardRank}. <br><br> Choose 1 to "hit" or 2 to "stand".`;

    if (totalplayerCardRank < 17) {
      myOutputValue =
        previousCards +
        `<br> Your new total points is: ${totalplayerCardRank}. <br><br> Your point is below 17. Choose 1 to "hit".`;
    }
  } else if (currentGameMode == "Player hit or stand" && playerInput == 2) {
    myOutputValue = `You choose to "stand". Click submit again to see if you win the game.`;

    currentGameMode = "Result";
    return myOutputValue;
  }

  //computer will generate 2 cards
  if (currentGameMode == "Result") {
    console.log(currentGameMode);
    myOutputValue = "Computer drew the following cards:<br>";
    var shuffleDeckOfCard = shuffleCards(makeDeck());
    var arrayForComputerCardRank = [];
    for (let computerCounter = 0; computerCounter < 2; computerCounter += 1) {
      var computerCardDrew = shuffleDeckOfCard.pop();
      myOutputValue =
        myOutputValue +
        `${computerCardDrew.name} of ${computerCardDrew.suit} <br>`;
      arrayForComputerCardRank.push(computerCardDrew.rank);
    }
    var totalComputerCardRank =
      arrayForComputerCardRank[0] + arrayForComputerCardRank[1];
    if (arrayForComputerCardRank[0] + arrayForComputerCardRank[1] == 21) {
      var blackJackComputer = true;
    }
    //Let computer draw cards until its above 17 points
    for (
      let condition = totalComputerCardRank;
      condition < 17;
      condition += additionalComputerCard.rank
    ) {
      var shuffleDeckOfCard = shuffleCards(makeDeck());
      var additionalComputerCard = shuffleDeckOfCard.pop();
      totalComputerCardRank += additionalComputerCard.rank;
      myOutputValue =
        myOutputValue +
        `${additionalComputerCard.name} of ${additionalComputerCard.suit} <br>`;
    }
    myOutputValue =
      previousCards +
      `<br> Your total points is: ${totalplayerCardRank}.<br><br>` +
      myOutputValue +
      ` <br> The computer's total point is: ${totalComputerCardRank} <br><br>`;

    //cases where player wins - player cards bigger than computer's and within 21 points
    //case where player loses - player cards smaller than computer, or player larger than 21
    console.log(blackJackComputer, blackJackPlayer);
    if (blackJackPlayer) {
      myOutputValue = myOutputValue + "You win! You've a Black Jack!";
    } else if (blackJackComputer) {
      myOutputValue = myOutputValue + "You lose... Computer got a Black Jack!";
    } else if (
      (totalplayerCardRank > totalComputerCardRank &&
        totalplayerCardRank < 22) ||
      (totalplayerCardRank < 22 && totalComputerCardRank > 21)
    ) {
      myOutputValue = myOutputValue + "You win!!";
    } else if (
      (totalComputerCardRank > totalplayerCardRank &&
        totalComputerCardRank < 22) ||
      (totalplayerCardRank > 21 && totalComputerCardRank < 22)
    ) {
      myOutputValue = myOutputValue + "You lose...";
    } else {
      myOutputValue = myOutputValue + "Its a draw.";
    }
    currentGameMode = "Player Draw Cards";
    totalplayerCardRank = 0;
    totalComputerCardRank = 0;
    return myOutputValue;
  }

  return myOutputValue;
};
