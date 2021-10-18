//Global variables defining the different game modes and setting default to gameModeOne
var gameModeZero = "enter number of players";
var gameModePointFive = "enter betting amount";
var gameModeOne = "deal cards";
var gameModeTwo = "player turn";
var gameModeThree = "results";

var gameMode = gameModeZero;
var playerHand = [];
var allPlayerHand = [];
var dealerHand = [];
var cardDeck = [];
var numberOfPlayers = 0;
var playerNumber = 0;
var playerWallet = [];
var playerBets = [];
var bettingIndex = 0;

//Game mode zero to input number of players
var main = function (input) {
  var myOutputValue =
    "Please enter the number of players and hit submit to play.";
  if (gameMode == gameModeZero && input > 0) {
    numberOfPlayers = input;
    gameMode = gameModePointFive;
    //Function to create coin wallet for each player
    createWallet(numberOfPlayers);
    playerNumber = 1;
    return (myOutputValue =
      "Number of players: " +
      numberOfPlayers +
      "<br><br>" +
      printWallet(numberOfPlayers) +
      "<br>Player 1, enter the number of coins you'll like to bet and press submit.");
    //"<br><br>Once all players are ready, hit the submit button and the dealer will start dealing."
  }

  //Game mode 0.5 where bets are collected
  if (gameMode == gameModePointFive) {
    if (gameMode == gameModePointFive && input == "r")
      return (myOutputValue =
        "Dealer is shuffling a new deck...<br><br>Player " +
        playerNumber +
        ", enter the number of coins you'll like to bet and press submit.");

    if (
      gameMode == gameModePointFive &&
      input > 0 &&
      playerNumber < numberOfPlayers
    ) {
      playerBets.push(input);
      playerNumber += 1;
      return (myOutputValue =
        printBettingSlip() +
        "<br><br>Player " +
        playerNumber +
        ", enter the number of coins you'll like to bet and press submit.");
    }
    if (
      gameMode == gameModePointFive &&
      input > 0 &&
      playerNumber == numberOfPlayers
    ) {
      playerBets.push(input);
      playerNumber = 0;
      gameMode = gameModeOne;
      return (myOutputValue =
        printBettingSlip() +
        "<br>All players have submitted their bets. Hit submit to start the game.");
    }
    return (
      "Player " +
      playerNumber +
      ", enter the number of coins you'll like to bet and press submit."
    );
  }

  if (gameMode == gameModeOne) {
    //Game mode one where cards are shuffled and dealt to all players and dealer
    allPlayerHand = [];
    //Deck is created and shuffled
    cardDeck = shuffleCards(makeDeck());

    //Players are dealt 2 cards each
    var playerIndex = 0;
    while (playerIndex < numberOfPlayers) {
      var currentPlayerHand = dealPlayerCards(cardDeck);
      playerIndex += 1;
      allPlayerHand.push(currentPlayerHand);
    }
    console.log(allPlayerHand);

    //Dealer is dealt 2 cards
    dealerHand = dealDealerCards(cardDeck);
    console.log(dealerHand);

    //GameMode changes to player turn
    gameMode = gameModeTwo;
    playerNumber = 0;

    var myOutputValue =
      "Dealer deals the cards...<br><br><br>Player " +
      (playerNumber + 1) +
      "'s turn.<br><br>Hit the submit button to view your hand";
    return myOutputValue;
  }

  //Game mode 2 where each player views his hand and decides on whether to hit or stand
  //Check to ensure that player has > 14 points
  if (gameMode == gameModeTwo && playerNumber < numberOfPlayers) {
    //In game mode 2, submitting empty input box will show player hand
    var myOutputValue =
      "Player " +
      (playerNumber + 1) +
      "'s hand:<br>" +
      showHand(allPlayerHand[playerNumber]) +
      '<br>To hit: Input "h"<br>To stand: Input "s"<br><br>You need a minimum of 14 points to Stand';
    //If player enters H, additional card will be drawn
    if (input == "h") {
      drawCard(allPlayerHand[playerNumber], cardDeck);
      myOutputValue =
        "Player " +
        (playerNumber + 1) +
        "'s hand:<br>" +
        showHand(allPlayerHand[playerNumber]) +
        '<br>To hit: Input "h"<br>To stand: Input "s"<br><br>You need a minimum of 14 points to Stand';
      return myOutputValue;
      //If player enters S, dealer will draw cards automatically and game mode will change to game mode 3. In multiplayer mode, this will move on to next player instead until all players have drawn.
    }
    if (input == "s" && countHand(allPlayerHand[playerNumber]) >= 14) {
      playerNumber += 1;
      if (playerNumber == numberOfPlayers) {
        //Once all players are done, dealer can start drawing cards
        dealerHand = topupDealerHand(dealerHand, cardDeck);
        gameMode = gameModeThree;
        return (myOutputValue =
          "Dealer's turn.<br><br>Dealer is drawing the necessary cards...<br><br><br>Press submit to view results.");
      }
      return (myOutputValue =
        "Player " +
        (playerNumber + 1) +
        "'s turn.<br><br>Hit the submit button to view your hand");
    }
    return myOutputValue;
  }
  if (gameMode == gameModeTwo && playerNumber == numberOfPlayers) {
    //Once player chooses to stand, dealer can start drawing cards
    dealerHand = topupDealerHand(dealerHand, cardDeck);
    gameMode = gameModeThree;
  }

  //After dealer is done adding cards, dealer will call for the results
  if (gameMode == gameModeThree) {
    // if (input == "r") {
    //   gameMode = gameModePointFive;
    //   playerNumber = 1;
    //   console.log(playerWallet);
    // return (myOutputValue =
    //   "Dealer is shuffling a new deck...<br><br>Player " +
    //   playerNumber +
    //   ", enter the number of coins you'll like to bet and press submit.");
    // }

    myOutputValue =
      printFinalResults() +
      "<br>" +
      printWallet(numberOfPlayers) +
      '<br>Input "r" to play another round.';
    playerBets = [];
    playerNumber = 1;
    gameMode = gameModePointFive;
    console.log(playerWallet);
    return myOutputValue;
  }
  return myOutputValue;
};

//Function to create coin wallet for each player
var createWallet = function (number) {
  var walletIndex = 0;
  while (walletIndex < number) {
    playerWallet.push(Number(100));
    walletIndex += 1;
  }
  return playerWallet;
};

var printWallet = function (number) {
  var walletBalance = "Current coin balance.<br>";
  var walletIndex = 0;

  while (walletIndex < number) {
    var playerIndex = walletIndex + 1;
    walletBalance =
      walletBalance +
      "Player " +
      playerIndex +
      ": " +
      playerWallet[walletIndex] +
      " coins<br>";
    walletIndex += 1;
  }
  console.log(playerWallet);
  return walletBalance;
};

var printBettingSlip = function () {
  var bettingSlip = "Bets on the table:<br>";
  var betIndex = 0;
  while (betIndex < playerBets.length) {
    var playerIndex = betIndex + 1;
    bettingSlip =
      bettingSlip +
      "Player " +
      playerIndex +
      ": " +
      playerBets[betIndex] +
      " coins<br>";
    betIndex += 1;
  }
  return bettingSlip;
};

//Function to create deck of 52 cards
var makeDeck = function () {
  //Create empty deck array
  var cardDeck = [];
  //Create array of 4 suits
  var suits = ["♦️", "♣️", "♥️", "♠️"];

  //Loop over suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    //Inner loop to create cards in a suit from 1 to 13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      //Default card name = rank number
      var cardName = rankCounter;
      //Special names for cards with rank 1,11-13
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      //Create card with current name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      //Push card into deck
      console.log(card);
      cardDeck.push(card);
      //Increment rank Index to create next card
      rankCounter += 1;
    }
    //Increment suit index to move onto the next suit
    suitIndex += 1;
  }
  return cardDeck;
};

//Function to shuffle deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function (deck) {
  //Loop over array of cards
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    //Get random index
    var randomIndex = getRandomIndex(deck.length);
    //Select random card from deck using random index
    var randomCard = deck[randomIndex];
    //Select card that corresponds to current index
    var currentCard = deck[currentIndex];
    //Swap positions of both cards
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    //Increment counter
    currentIndex += 1;
  }
  return deck;
};

//Function to deal cards to players
var dealPlayerCards = function (cardDeck) {
  //Empty array to store cards that are dealt to player
  var playerHand = [];

  //Loop to deal 2 cards to each player (currently only support 1 player)
  var cardIndex = 0;
  while (cardIndex < 2) {
    var drawnCard = cardDeck.pop();
    playerHand.push(drawnCard);
    cardIndex += 1;
  }
  console.log(playerHand);
  return playerHand;
};

//Function to deal cards to dealer
var dealDealerCards = function (cardDeck) {
  //Empty array to store cards that are dealt to dealer
  var dealerHand = [];

  //Loop to deal 2 cards to dealer
  var cardIndex = 0;
  while (cardIndex < 2) {
    var drawnCard = cardDeck.pop();
    dealerHand.push(drawnCard);
    cardIndex += 1;
  }
  return dealerHand;
};

//Function to print out cards in player's hand
var showHand = function (hand) {
  var handIndex = 0;
  var handOutput = " ";
  while (handIndex < hand.length) {
    handOutput =
      handOutput + hand[handIndex].name + hand[handIndex].suit + "<br>";

    //console.log(hand[number][handIndex].name);
    //console.log(hand[number][handIndex].suit);
    handIndex += 1;
  }
  return handOutput;
};

//Function to sum up points in player's hand
var countHand = function (hand) {
  var rankIndex = 0;
  var totalPoints = 0;
  while (rankIndex < hand.length) {
    //Get the rank of each card in hand
    var currentCardRank = hand[rankIndex].rank;
    var currentCardPoints = currentCardRank;
    //Convert rank of picture cards to 10
    if (
      currentCardRank == 11 ||
      currentCardRank == 12 ||
      currentCardRank == 13
    ) {
      currentCardPoints = 10;
    }
    //Add points into totalPoints
    totalPoints = totalPoints + currentCardPoints;

    rankIndex += 1;
  }
  //Check for ace pairs
  if (totalPoints == 2) {
    totalPoints = totalPoints + 19;
    return totalPoints;
  }

  //loop through hand to check for ace and add 10 to total points
  var index = 0;
  while (index < hand.length) {
    var currentCardRank = hand[index].rank;
    var currentCardPoints = currentCardRank;
    if (currentCardPoints == 1 && totalPoints <= 11) {
      totalPoints = totalPoints + 10;

      return totalPoints;
    }
    index += 1;
  }

  return totalPoints;
};

//Function to determine winner and tablulate bets
var determineWinner = function (dealerHand, hand, number) {
  var dealerPoints = countHand(dealerHand);
  var playerPoints = countHand(hand);
  var playerIndex = number + 1;

  if (dealerPoints > 21 && playerPoints > 21) {
    return "Its a draw";
  }
  if (dealerPoints > 21 && playerPoints <= 21) {
    if (playerPoints == 21 && hand.length == 2) {
      playerBlackjackSettlement(number);
      return "Player " + playerIndex + " BLACKJACK!!";
    }
    playerWinSettlement(number);
    return "Player " + playerIndex + " wins";
  }
  if (dealerPoints <= 21 && playerPoints > 21) {
    if (dealerPoints == 21 && dealerHand.length == 2) {
      dealerBlackjackSettlement(number);
      return "Dealer BLACKJACK!!";
    }
    dealerWinSettlement(number);
    return "Dealer wins";
  }
  if (dealerPoints <= 21 && playerPoints <= 21) {
    if (
      dealerPoints == 21 &&
      dealerHand.length == 2 &&
      dealerPoints > playerPoints
    ) {
      dealerBlackjackSettlement(number);
      return "Dealer BLACKJACK!!";
    }
    if (playerPoints == 21 && hand.length == 2 && playerPoints > dealerPoints) {
      playerBlackjackSettlement(number);
      return "Player " + playerIndex + " BLACKJACK!!";
    }
    if (playerPoints == 21 && hand.length == 2 && dealerHand.length > 2) {
      playerBlackjackSettlement(number);
      return "Player " + playerIndex + " BLACKJACK!!";
    }
    if (dealerPoints == 21 && dealerHand.length == 2 && hand.length > 2) {
      dealerBlackjackSettlement(number);
      return "Dealer BLACKJACK!!";
    }
    if (dealerPoints > playerPoints) {
      dealerWinSettlement(number);
      return "Dealer wins";
    }
    if (dealerPoints < playerPoints) {
      playerWinSettlement(number);
      return "Player " + playerIndex + " wins";
    } else return "Its a draw";
  }
};

//Function to tabulate player win
var playerWinSettlement = function (number) {
  var playerCurrentPoints = playerWallet[number];
  var playerBet = playerBets[number];
  playerWallet[number] = Number(playerCurrentPoints) + Number(playerBet);
};

//Function to tablulate dealer win
var dealerWinSettlement = function (number) {
  var playerCurrentPoints = playerWallet[number];
  var playerBet = playerBets[number];
  playerWallet[number] = Number(playerCurrentPoints) - Number(playerBet);
};
//Function to tabulate player BLACKJACK
var playerBlackjackSettlement = function (number) {
  var playerCurrentPoints = playerWallet[number];
  var playerBet = playerBets[number];
  playerWallet[number] = Number(playerCurrentPoints) + Number(2 * playerBet);
};

//Function to tabulate dealer BLACKJACK
var dealerBlackjackSettlement = function (number) {
  var playerCurrentPoints = playerWallet[number];
  var playerBet = playerBets[number];
  playerWallet[number] = Number(playerCurrentPoints) - Number(2 * playerBet);
};

//Funtion to draw an additional card into a specified hand array
var drawCard = function (hand, deck) {
  console.log("card drawn");
  var drawnCard = deck.pop();
  hand.push(drawnCard);
  return hand;
};

//Function to automatically top up dealer's hand
var topupDealerHand = function (hand, deck) {
  //Max number of additional cards that can be drawn in blackjack is 3, so loop needs to run 3 rounds
  var topupIndex = 0;
  while (topupIndex < 3) {
    //Check if dealer hand has less than 17 points
    var dealerPoints = countHand(hand);
    if (dealerPoints < 17) {
      drawCard(hand, deck);
    }
    topupIndex += 1;
  }
  return hand;
};

//Function to print final results
var printFinalResults = function () {
  var myOutputValue = "Dealer's hand:<br>" + showHand(dealerHand) + "<br>";
  var resultsIndex = 0;
  while (resultsIndex < numberOfPlayers) {
    myOutputValue =
      myOutputValue +
      "Player " +
      (resultsIndex + 1) +
      "'s hand:<br>" +
      showHand(allPlayerHand[resultsIndex]) +
      "<br>" +
      determineWinner(dealerHand, allPlayerHand[resultsIndex], resultsIndex) +
      "<br><br>";
    resultsIndex += 1;
  }
  return myOutputValue;
};
