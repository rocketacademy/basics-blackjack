//Global variables defining the different game modes and setting default to gameModeOne
var gameModeOne = "deal cards";
var gameModeTwo = "player turn";
var gameModeThree = "results";

var gameMode = gameModeOne;
var playerHand = [];
var dealerHand = [];
var cardDeck = [];

var main = function (input) {
  if (gameMode == gameModeOne) {
    //Deck is created and shuffled
    cardDeck = shuffleCards(makeDeck());
    //Players are dealt 2 cards each
    playerHand = dealPlayerCards(cardDeck);
    console.log(playerHand);
    //Dealer is dealt 2 cards
    dealerHand = dealDealerCards(cardDeck);
    console.log(dealerHand);
    console.log(cardDeck);
    //GameMode changes to player turn
    gameMode = gameModeTwo;

    var myOutputValue =
      "Dealer deals the cards...<br><br><br>Player's turn.<br><br>Hit the submit button to view your hand";
    return myOutputValue;
  }

  //Game mode 2 where player views his hand and decides on whether to hit or stand
  //Check to ensure that player has > 14 points
  if (gameMode == gameModeTwo) {
    //In game mode 2, submitting empty input box will show player hand
    var myOutputValue =
      "Player hand:<br>" +
      showHand(playerHand) +
      "<br>To hit: Input H<br>To stand: Input S<br><br>You need a minimum of 14 points to Stand";
    //If player enters H, additional card will be drawn
    if (input == "H") {
      playerHand = drawCard(playerHand, cardDeck);
      myOutputValue =
        "Player hand:<br>" +
        showHand(playerHand) +
        "<br>To hit: Input H<br>To stand: Input S<br><br>You need a minimum of 14 points to Stand";
      return myOutputValue;
      //If player enters S, dealer will draw cards automatically and game mode will change to game mode 3. In multiplayer mode, this will move on to next player instead until all players have drawn.
    }
    if (input == "S" && countHand(playerHand) >= 14) {
      //Once player chooses to stand, dealer can start drawing cards
      dealerHand = topupDealerHand(dealerHand, cardDeck);
      gameMode = gameModeThree;
      return (myOutputValue =
        "Dealer's turn.<br><br>Dealer is drawing the necessary cards...<br><br><br>Press submit to view results.");
    }
    return myOutputValue;
  }

  //After dealer is done adding cards, dealer will call for the results
  if (gameMode == gameModeThree) {
    myOutputValue =
      "Player hand:<br>" +
      showHand(playerHand) +
      "<br><br>Dealer hand:<br>" +
      showHand(dealerHand) +
      "<br><br>" +
      determineWinner(dealerHand, playerHand);

    return myOutputValue;
  }

  return myOutputValue;
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

//Functions to shuffle deck
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

//Funtion to print out cards in player's hand
var showHand = function (hand) {
  var handIndex = 0;
  var handOutput = " ";
  while (handIndex < hand.length) {
    handOutput =
      handOutput + hand[handIndex].name + hand[handIndex].suit + "<br>";

    console.log(hand[handIndex].name);
    console.log(hand[handIndex].suit);
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
  return totalPoints;
};

//Function to determine winner
var determineWinner = function (dealerHand, playerHand) {
  var dealerPoints = countHand(dealerHand);
  var playerPoints = countHand(playerHand);

  if (dealerPoints > 21 && playerPoints > 21) {
    return "Its a draw";
  }
  if (dealerPoints > 21 && playerPoints <= 21) {
    return "Player win";
  }
  if (dealerPoints <= 21 && playerPoints > 21) {
    return "Dealer win";
  }
  if (dealerPoints <= 21 && playerPoints <= 21) {
    if (dealerPoints > playerPoints) return "Dealer win";
    if (dealerPoints < playerPoints) return "Player win";
    else return "Its a draw";
  }
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
