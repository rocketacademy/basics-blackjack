var DEAL_FIRST_CARDS = "firstdeal";
var PLAYER_HIT_OR_STAND = "playerhitorstand";
var DEALER_TURN = "dealerturn";

var cardDeck;
var playerHand = [];
var playerScore = 0;
var dealerHand = [];
var playerWallet = 100;
var playerBet = 0;
var REPLAY_MSG_SHOW_WALLET = `<br>Place another bet to play another round<br><br>You now have $`;
var gameMode = DEAL_FIRST_CARDS; // 'playerhitorstand' // 'dealerturn'

var playerDecision = "nil";

//create an ordered deck of 52 cards
var makeDeck = function () {
  // Initialise an empty deck array
  var sampleCardDeck = [];
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
      var points = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        points = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        points = 10;
      } else if (cardName == 13) {
        cardName = "king";
        points = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: points,
      };

      // Add the new card to the deck
      sampleCardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return sampleCardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (sampleCardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < sampleCardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(sampleCardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = sampleCardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = sampleCardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    sampleCardDeck[currentIndex] = randomCard;
    sampleCardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return sampleCardDeck;
};
//converts suit name into its image emoji
var suitImage = function (suitName) {
  if (suitName == "hearts") {
    image = "♥️";
  }
  if (suitName == "diamonds") {
    image = "♦️";
  }
  if (suitName == "clubs") {
    image = "♣️";
  }
  if (suitName == "spades") {
    image = "♠️";
  }
  return image;
};

//prints all the cards in a given hand
var displayHand = function (hand) {
  var printHands = "";
  for (var cardCount = 0; cardCount < hand.length; cardCount += 1) {
    printHands += `${hand[cardCount].name} of ${suitImage(
      hand[cardCount].suit
    )}<br>`;
  }
  return printHands;
};
//finds the score of a given hand
var findScoreOfHand = function (hand) {
  var score = 0;
  //tracker for any ace card which got assigned higher value of 11
  var numLargeAce = 0;

  for (var cardCount = 0; cardCount < hand.length; cardCount += 1) {
    score += hand[cardCount].rank;
    //Increment the Ace value by 10 if it does not bust player's hand
    if (hand[cardCount].rank == 1 && score + 10 <= 21) {
      score += 10;
      numLargeAce = 1;
    }
    //Decrease any large Ace value by 10 to prevent bust
    if (numLargeAce == 1 && score > 21) {
      score -= 10;
      numLargeAce = 0;
    }
  }
  return score;
};
//deal the cards for the first time and check for any black jack wins
var firstDealCards = function () {
  var REPLAY_MSG = "<br>Place another bet to play another round";
  //deal 2 cards to player
  playerHand[0] = cardDeck.pop();
  playerHand[1] = cardDeck.pop();
  //deal 2 cards to dealer
  dealerHand[0] = cardDeck.pop();
  dealerHand[1] = cardDeck.pop();
  //tally the scores of each hand
  var dealerScore = findScoreOfHand(dealerHand);
  playerScore = findScoreOfHand(playerHand);
  //store the output string of the hands
  var displayDealerHands = `Dealer has<br>${displayHand(dealerHand)}<br>`;

  var displayDealerHandsOneFaceDown = `Dealer has<br>
  ${displayHand([dealerHand[0]])}and one face down card<br><br>`;

  var displayPlayerHands = `You have<br>${displayHand(playerHand)}`;

  //end the game if dealer gets blackjack or if both dealer and player blackjack
  if (playerScore == 21 && dealerScore == 21) {
    gameMode = DEAL_FIRST_CARDS;
    playerWallet += playerBet;
    var myImage =
      '<img src="https://c.tenor.com/Kmo46PLzc7UAAAAC/eye-roll-ugh.gif"/>';
    return (
      `${displayDealerHands}${displayPlayerHands}<br>Holy Moly, both of you got blackjack!${REPLAY_MSG}` +
      myImage
    );
  }
  if (dealerScore == 21) {
    gameMode = DEAL_FIRST_CARDS;
    var myImage =
      '<img src="https://c.tenor.com/Kmo46PLzc7UAAAAC/eye-roll-ugh.gif"/>';
    return (
      `${displayDealerHands}${displayPlayerHands}<br>The dealer won by black jack!${REPLAY_MSG}` +
      myImage
    );
  }
  //end the game if player got black jack
  if (playerScore == 21) {
    gameMode = DEAL_FIRST_CARDS;
    playerWallet += playerBet * 2.5;
    var myImage =
      '<img src="https://c.tenor.com/OJN5X4xaNMEAAAAC/win-happy.gif"/>';

    return (
      `${displayDealerHandsOneFaceDown}${displayPlayerHands}<br>You won by black jack!${REPLAY_MSG}` +
      myImage
    );
  }

  gameMode = PLAYER_HIT_OR_STAND;

  document.getElementById("submit-button").style.display = "none";
  document.getElementById("input-field").style.display = "none";

  var hitButton = document.createElement("button");
  hitButton.id = "hit-button";
  hitButton.innerText = "Hit";
  document.querySelector("#container").appendChild(hitButton);
  var standButton = document.createElement("button");
  standButton.innerText = "Stand";
  standButton.id = "stand-button";
  document.querySelector("#container").appendChild(standButton);

  standButton.addEventListener("click", function () {
    var output = document.querySelector("#output-div");
    playerDecision = "s";
    output.innerHTML = main();
  });

  hitButton.addEventListener("click", function () {
    var output = document.querySelector("#output-div");
    playerDecision = "h";
    output.innerHTML = main();
  });

  return `${displayDealerHandsOneFaceDown}${displayPlayerHands}<br>Your current score is ${playerScore}<br>Do you want to hit or stand?`;
};

var storeBetAndDealFirstHands = function (input) {
  //validation for betting amount
  if (playerWallet < 1) {
    return "Oops you are out of cash. Click refresh to print $100";
  }
  if (Number.isNaN(Number(input)) || !input || input < 1) {
    return `Please input your bet of at least $1, you have $${playerWallet}`;
  }
  if (input > playerWallet) {
    return `Oops, not enough moolah, you have $${playerWallet}`;
  }

  //store the bet amount and decrease wallet by that
  playerBet = Number(input);
  playerWallet -= playerBet;
  //initialise game round with empty hands and zero score
  playerHand = [];
  playerScore = 0;
  dealerHand = [];
  //create a shuffled deck of 52 cards
  cardDeck = shuffleCards(makeDeck());
  //firstDealCards adds 2 cards to all players' hand and returns the result of the first deal and any possible blackjack scenarios
  var myOutputValue = `Your bet is $${playerBet}<br><br>` + firstDealCards();
  myOutputValue += `<br><br>You now have $${playerWallet}`;
  return myOutputValue;
};

var executePlayerDecision = function (input) {
  if (playerDecision == "h") {
    var newPlayerCard = cardDeck.pop();
    //deal a new card into player hand
    playerHand.push(newPlayerCard);
    var displayPlayerHands = `You currently have these cards:<br>
      ${displayHand(playerHand)}`;
    playerScore = findScoreOfHand(playerHand);
    //scenario where player got bust
    if (playerScore > 21) {
      gameMode = DEALER_TURN;
      document.getElementById("submit-button").style.display = "block";

      document.getElementById("submit-button").innerText =
        "Pass Turn to Dealer";
      document.getElementById("hit-button").remove();
      document.getElementById("stand-button").remove();
      var myImage =
        '<img src="https://c.tenor.com/U5RwBfkG6t8AAAAC/elmo-flames.gif"/>';
      return (
        displayPlayerHands +
        `<br>Your current score is ${playerScore}<br>I am sorry, you bust, click to pass the turn to the dealer` +
        myImage
      );
    }
    //if not bust, ask player if he wants to proceed with hit or stand
    var myImage =
      '<img src="https://c.tenor.com/2ER74Ee4Ou0AAAAC/hmmnotbad-hmm.gif"/>';
    return (
      displayPlayerHands +
      `<br>Your current score is ${playerScore}<br>Do you want to hit or stand?` +
      myImage
    );
  }
  if (playerDecision == "s") {
    //show the player score and pass the turn to dealer
    gameMode = DEALER_TURN;
    document.getElementById("submit-button").style.display = "block";

    document.getElementById("submit-button").innerText = "Pass Turn to Dealer";
    document.getElementById("hit-button").remove();
    document.getElementById("stand-button").remove();
    var myImage =
      '<img src="https://c.tenor.com/TX04b7YAOl8AAAAd/please-please-god.gif"/>';

    return (
      `You decided to stand. Your current score is ${playerScore}, click to pass the turn to the dealer` +
      myImage
    );
  }
};

var executeDealerTurn = function () {
  var dealerScore = findScoreOfHand(dealerHand);
  // dealer will keep drawing new card if it scores less than 17
  while (dealerScore < 17) {
    var newDealerCard = cardDeck.pop();
    dealerHand.push(newDealerCard);
    dealerScore = findScoreOfHand(dealerHand);
  }
  return dealerScore;
};

var outputResultsAndPayout = function (dealerScore) {
  var displayDealerHands = `The dealer has these cards:<br>
    ${displayHand(dealerHand)}`;

  if (dealerScore > 21) {
    //end the game if dealer busts by returning to initial game mode
    gameMode = DEAL_FIRST_CARDS;
    //tie scenario where dealer bust with player
    if (playerScore > 21) {
      playerWallet += playerBet;
      var myImage =
        '<img src="https://c.tenor.com/Kmo46PLzc7UAAAAC/eye-roll-ugh.gif"/>';
      return (
        displayDealerHands +
        `<br>The dealer bust together with you with score of ${dealerScore}${REPLAY_MSG_SHOW_WALLET}${playerWallet}` +
        myImage
      );
    }
    //scenario where only dealer bust and player wins the bet
    playerWallet += playerBet * 2;
    var myImage =
      '<img src="https://c.tenor.com/FBe6asKNEPAAAAAC/lotto-winner-winning-money.gif"/>';
    return (
      displayDealerHands +
      `<br>You won as the dealer bust with score of ${dealerScore}${REPLAY_MSG_SHOW_WALLET}${playerWallet}` +
      myImage
    );
  }

  //scenario where only player bust
  if (playerScore > 21) {
    gameMode = DEAL_FIRST_CARDS;
    var myImage =
      '<img src="https://c.tenor.com/us6zO1kU3Y8AAAAC/tears-sad.gif"/>';
    return (
      displayDealerHands +
      `<br>The dealer won as you got bust just now!${REPLAY_MSG_SHOW_WALLET}${playerWallet}` +
      myImage
    );
  }
  //store both players' scores
  displayDealerHands += `<br>You scored ${playerScore}. The dealer scored ${dealerScore}<br>`;
  //various non-bust scenarios
  if (dealerScore > playerScore) {
    displayDealerHands += "The dealer won!";
    var myImage =
      '<img src="https://c.tenor.com/us6zO1kU3Y8AAAAC/tears-sad.gif"/>';
  }
  if (dealerScore == playerScore) {
    playerWallet += playerBet;
    displayDealerHands += "You tied with the dealer";
    var myImage =
      '<img src="https://c.tenor.com/Kmo46PLzc7UAAAAC/eye-roll-ugh.gif"/>';
  }
  if (dealerScore < playerScore) {
    var myImage =
      '<img src="https://c.tenor.com/FBe6asKNEPAAAAAC/lotto-winner-winning-money.gif"/>';
    playerWallet += playerBet * 2;
    displayDealerHands += "You won!!";
  }
  //end the game by returning to initial game mode
  gameMode = DEAL_FIRST_CARDS;
  return (
    `${displayDealerHands}${REPLAY_MSG_SHOW_WALLET}${playerWallet}` + myImage
  );
};

var main = function (input) {
  if (gameMode == DEAL_FIRST_CARDS) {
    return storeBetAndDealFirstHands(input);
  }

  if (gameMode == PLAYER_HIT_OR_STAND) {
    return executePlayerDecision(input);
  }

  if (gameMode == DEALER_TURN) {
    var dealerScore = executeDealerTurn();
    document.getElementById("submit-button").innerText =
      "Place Bet and Deal Cards";
    document.getElementById("submit-button").style.display = "block";
    document.getElementById("input-field").style.display = "block";
    return outputResultsAndPayout(dealerScore);
  }
};
