// There is two players.
// The computer is the dealer.
// The dealer must hit below 17.
// The player closer to 21 wins.
// Aces can be 1 or 11

// The Rules
// 1. User places a bet
// 2. Deal one open card each
// 3. User dealt one more open card; computer dealt a closed card.
// 4. Aces can be 1 or 11 anytime
// 5. when 2 cards total 21, automatically win times and round ends
// 6. otherwise user gets to hit as many times until 21.
// 7. if user exceed 21, user busts and dealer wins
// 8. if user has drawn enough cards, choose to stand
// 9. dealer opens closed card
// 10. if dealer 16 or less, dealer must hit
// 11. if dealer 17 or higher, dealer must stand
// 12. if dealer busts, user will win double the bet.
// 13. if the dealer does not bust, user wins only if higher points. user wins double the bet.

//BASE
// Deck is shuffled.
// >> function to shuffle deck
// User clicks Submit to deal cards.
// >> in main, run function to deal cards in this order: userCard1(open), computerCard1(open), userCard2(open), computerCard2(closed)
// The cards are analysed for game winning conditions, e.g. Blackjack.
// >> if (userCard1 or userCard2) == ace && (userCard1 or userCard2) == 10, jack, queen, king; user wins
// The cards are displayed to the user.
// Output message = show userCard1, userCard2 and userTotal, computerCard1
// The user decides whether to hit or stand
// >> change program mode userTurn. Hit = run function draw another card to userCards and calculate new userTotal. Stand = change program mode to checkUserHand
// The user's cards are analysed for winning or losing conditions.
// >> run function sum cards in userCards. If more than 21, computer wins and restart game. If less than or equals to 21, change program mode to computerTurn
// The computer decides to hit or stand automatically based on game rules.
// >> run function sum computerCards. If computer hand 16 or less, computer hits and calculate new computerTotal show computer new card and new total. Repeat mode computerTurn until computerTotal 17 or more. If computerTotal 17 or more, change program mode to compareResults.
// >> If computerTotal > userTotal, computer wins, then restart game.
// >> If computerTotal < userTotal, user wins, then restart game.
// >> If computerTotal == usersTotal, it is a tie, then restart game.
// The game either ends or continues.

//////////GLOBAL VARIABLES AND STATES////////////
var STAGE_USERNAME = "STAGE_USERNAME";
var STAGE_DEAL_CARDS = "STAGE_DEAL_CARDS";
var STAGE_HIT_STAND = "STAGE_HIT_STAND";
var STAGE_COMPUTER_TURN = "STAGE_COMPUTER_TURN";
var STAGE_GAME_OVER = "STAGE_GAME_OVER";
var STAGE_USERBET = "STAGE_USERBET";
var userCards = [];
var computerCards = [];
var userTotal = 0;
var computerTotal = 0;
var programStage = "STAGE_USERNAME";
var userName = "";
var userPoints = 100;
var userBet = Number();
var numberOfPlayers = 0;

//////////HELPER FUNCTIONS////////////

//function: make card deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var cardSuit = suits[suitIndex];
    var cardIndex = 1;
    while (cardIndex <= 13) {
      var cardName = cardIndex;
      var cardValue = cardIndex;
      if (cardName == 1) {
        cardName = "Ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }

      var card = {
        name: cardName,
        suit: cardSuit,
        cardIndex: cardIndex,
        value: cardValue,
      };

      cardDeck.push(card);
      cardIndex += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

//Function: shuffle card deck and return shuffled cards
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (deckToShuffle) {
  var currentIndex = 0;
  while (currentIndex < deckToShuffle.length) {
    var randomIndex = getRandomIndex(deckToShuffle.length);
    var randomCard = deckToShuffle[randomIndex];
    var currentCard = deckToShuffle[currentIndex];
    deckToShuffle[currentIndex] = randomCard;
    deckToShuffle[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return deckToShuffle;
};

var shuffledDeck = shuffleCards(makeDeck());

// Function: deal 1 card to player and computer.
// Repeat one time.

var dealStartingCards = function () {
  var dealIndex = 0;
  userTotal = 0;
  //start loop to deal cards twice to each player
  while (dealIndex < 2) {
    //deal 1 card to user
    userCards.push(shuffledDeck.pop());
    //update global variable for user's total points
    updateUserTotal();
    //deal 1 card to computer
    computerCards.push(shuffledDeck.pop());
    //update global variable for computer's total points
    updateComputerTotal();
    dealIndex += 1;
  }
  console.log("computerCards are:");
  console.log(computerCards);
  console.log("userCards are:");
  console.log(userCards);
};

// Function: check if user's starting hand is Blackjack

var blackJack = function () {
  return userCards[0].value + userCards[1].value == 21;
};

// Function: check if computer's starting hand is Blackjack

var computerBlackJack = function () {
  return computerCards[0].value + computerCards[1].value == 21;
};

// function to output message for a player's cards
var outputCards = function (aHand) {
  //set a loop to run through a player's entire hand and output all the cards' names and suits
  var cardsIndex = 0;
  var outputCardsMessage = "";
  while (cardsIndex < aHand.length) {
    outputCardsMessage =
      outputCardsMessage +
      aHand[cardsIndex].name +
      " of " +
      aHand[cardsIndex].suit +
      "<br>";
    cardsIndex += 1;
  }
  console.log("outputUserCards:");
  console.log(outputCardsMessage);
  return outputCardsMessage;
};

// Total value of cards in a hand, convert Ace value from 11 to 1 when total is more than 21
var calcHandTotal = function (hand) {
  //set a loop to go through the hand's cards and add the value of the cards to get total points
  var handTotal = 0;
  for (var i = 0; i < hand.length; i += 1) {
    handTotal = handTotal + hand[i].value;
  }
  //execute function to check for aces in hand to find out number of aces in hand to be subtracted if total points more than 21
  var numOfAces = checkForAce(hand);
  //if hand total is more than 21 and there is 1 or more aces in hand, then convert 1 ace at a time from 11 to 1 points and recount hand total and repeat
  while (handTotal > 21 && numOfAces > 0) {
    handTotal = handTotal - 10;
    numOfAces = numOfAces - 1;
  }
  return handTotal;
};

// function update user total
var updateUserTotal = function () {
  userTotal += userCards[userCards.length - 1].value;
};

// function update computer total
var updateComputerTotal = function () {
  computerTotal += computerCards[computerCards.length - 1].value;
};

// function to output a message to show Computer's 1st card
var outputComputerCard1 = function () {
  computerCard1Message =
    computerCards[0].name + " of " + computerCards[0].suit + " <br>";
  return computerCard1Message;
};

//function to check for Ace in hand and find out the number of aces in hand
var checkForAce = function (aHand) {
  var numOfAces = 0;
  for (var i = 0; i < aHand.length; i += 1) {
    if (aHand[i].cardIndex == 1) {
      numOfAces += 1;
    }
  }
  return numOfAces;
};

//function to check if hand bust
var checkForBust = function (aHand) {
  return calcHandTotal(aHand) > 21;
};

// function computerTurn
var startComputerTurn = function () {
  computerTotal = calcHandTotal(computerCards);
  //computer draws a card if less than 17 points
  while (computerTotal < 17) {
    computerCards.push(shuffledDeck.pop());
    updateComputerTotal();
    computerTotal = calcHandTotal(computerCards);
  }
  console.log("computer total after computer turn ends");
  console.log(computerTotal);
};

//function to compare user's and computer's cards to determine winner
var determineWinner = function () {
  if (userTotal > computerTotal && userTotal < 22) {
    userPoints = userPoints + userBet * 2;
    winnerMessage = "User wins!";
  } else if (userTotal < computerTotal && computerTotal < 22) {
    winnerMessage = "Computer wins!";
  } else if (userTotal == computerTotal) {
    userPoints = userPoints + Number(userBet);
    winnerMessage = "It is a tie.";
  }
  return winnerMessage;
};

////////////MAIN///////////

var main = function (input) {
  //Ending scenario Win/lose/Draw/0 points left
  if (programStage == STAGE_GAME_OVER) {
    return "The game is over, hit refresh to play again";
  }
  // If the user loses all of his points
  if (programStage == STAGE_USERBET && userPoints == 0) {
    return "You Have no more points!, hit refresh to play again";
  }
  if (programStage == STAGE_USERNAME && input == "") {
    console.log("NO NAME");
    return "Please enter your name! and hit submit!";
  } else if (programStage == STAGE_USERNAME) {
    userName = input;
    programStage = STAGE_USERBET;
    console.log(userName);
    return (
      "Hello " +
      userName +
      "<br>Please enter your Betting amount, It will be deducted from your current Points:" +
      userPoints
    );
  }
  if (programStage == STAGE_USERBET && input == "") {
    console.log("NO BET");
    return "Please enter your bet! and hit submit!";
  } else if (programStage == STAGE_USERBET) {
    userCards.length = 0;
    computerCards.length = 0;
    console.log(userCards);
    userBet = input;
    userPoints = userPoints - userBet;
    programStage = STAGE_DEAL_CARDS;
    console.log("User Bet:");
    console.log(userBet);
  }

  if (programStage == STAGE_DEAL_CARDS) {
    //Initial turn - cards are shuffled and dealt. Check for user's Blackjack - if yes, game ends.
    dealStartingCards(shuffledDeck);
    if (blackJack() && computerBlackJack()) {
      userPoints = userBet + userPoints;
      programStage = STAGE_USERBET;
      console.log("User Points:");
      console.log(userPoints);
      return (
        "Two Blackjack! What are the chances!! Both wins. User's hand is:" +
        outputCards(userCards) +
        "<br><br>Press Submit to play again."
      );
    } else if (blackJack()) {
      userPoints = userBet * 2 + userPoints;
      programStage = STAGE_USERBET;
      console.log("User Points:");
      console.log(userPoints);
      return (
        "Blackjack! " +
        userName +
        " wins. User's hand is:" +
        outputCards(userCards) +
        "<br><br>Press Submit to play again."
      );
    } else if (computerBlackJack()) {
      programStage = STAGE_USERBET;
      console.log("User Points:");
      console.log(userPoints);
      return (
        "Blackjack! Computer wins. User's hand is:" +
        outputCards(userCards) +
        "<br><br>Press Submit to play again."
      );
    }
    programStage = STAGE_HIT_STAND;
    // //if not Blackjack, display user's hand and computer's 1st card. Then continue to user's turn to hit or stand.
    var myOutputValue =
      userName +
      "'s hand is: <br>" +
      outputCards(userCards) +
      "<br>User's total points is " +
      calcHandTotal(userCards) +
      "<br>Computer's open card is: <br>" +
      outputComputerCard1() +
      "<br>User's turn. Select one of the following options: <br> 1 - hit <br> 2 - stand";
    return myOutputValue;
  }

  if (programStage == STAGE_HIT_STAND) {
    if (input == "1" || input == "hit") {
      console.log("input is 1/hit");
      userCards.push(shuffledDeck.pop());
      updateUserTotal();
      if (checkForBust(userCards)) {
        programStage = STAGE_USERBET;
        return (
          userName +
          " chose to hit, user has bust. Computer wins.<br><br> User's hand is: <br>" +
          outputCards(userCards) +
          "<br>" +
          userName +
          "'s total points is " +
          calcHandTotal(userCards) +
          "<br><br> Computer's hand is <br>" +
          outputCards(computerCards) +
          "<br><br>Enter Your bet to play again."
        );
      }
      return (
        userName +
        " chose to hit. User's hand is: <br>" +
        outputCards(userCards) +
        "<br>User's total points is " +
        calcHandTotal(userCards) +
        "<br><br>Computer's open card is: <br>" +
        outputComputerCard1() +
        "<br>User's turn. Select one of the following options: <br> 1 - hit <br> 2 - stand"
      );
    }
    if (input == "2" || input == "stand") {
      programStage = STAGE_COMPUTER_TURN;

      return (
        userName +
        " chose to stand. User's hand is: <br>" +
        outputCards(userCards) +
        "<br>User's total points is " +
        calcHandTotal(userCards) +
        "<br><br> Computer's hand is<br>" +
        outputCards(computerCards) +
        "<br><br>Click Submit to see Computer's final hand."
      );
    }
  }

  if (programStage == STAGE_COMPUTER_TURN) {
    console.log("entered stage_computer_turn");
    startComputerTurn();

    if (checkForBust(computerCards)) {
      programStage = STAGE_USERBET;
      userPoints = userBet * 2 + userPoints;
      console.log("computer busted");
      return (
        "Computer has bust." +
        userName +
        " wins!<br>" +
        outputCards(computerCards) +
        "<br>Enter Bet to play again"
      );
    }
    var winnerMessage = determineWinner();
    programStage = STAGE_USERBET;
    console.log("User Points:");
    console.log(userPoints);
    return (
      winnerMessage +
      "<Br><br>" +
      userName +
      "'s cards: <br>" +
      outputCards(userCards) +
      "<br>User's total:" +
      calcHandTotal(userCards) +
      "<br><br>Computer's cards:<br>" +
      outputCards(computerCards) +
      "<br>Computer's total:<br>" +
      computerTotal +
      "<br>Enter Bet to play again"
    );
  }
};
