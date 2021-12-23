/*
Basics 12-2, Black Jack Base

Game rules: 
1. There will be only two players. One human and one computer (for the Base solution).
2. The computer will always be the dealer.
3. Each player gets dealt two cards to start.
4. The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
5. The dealer has to hit if their hand is below 17.
6. Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
7. The player who is closer to, but not above 21 wins the hand.
8. Instant opening win when dealt with blackjack at the start.

Game sequence:
1. Deck is shuffled.
2. User clicks Submit to deal cards.
3. The cards are analysed for game winning conditions, e.g. Blackjack.
4. The cards are displayed to the user.
5. The user decides whether to hit or stand, using the submit button to submit their choice.
6. The user's cards are analysed for winning or losing conditions.
7. The computer decides to hit or stand automatically based on game rules.
8. The game either ends or continues.

What is needed:
1. A deck of cards
2. Shuffling function for the deck.
3. Dealing of cards, and storing it in array for player and com results.
4. Hit or stay for player choice, computer is default choice.
5. Compare results outcome, and to restart a new game with different player, or same player.
*/

//Create common global var for use.
var currentGameMode = "userName"; //Key in player name before game starts.
var playerArr = []; //Store cards dealt to player
var computerArr = []; //Store cards dealt to computer

//Make a deck of 52 cards. Reference below for object key and value.
// var card = {
//   name: cardName, //Value taken from inner loop
//   suit: currentSuit, //Value taken from outer loop
//   rank: rankCounter, //Value taken from inner loop
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];

  // Initialise an array of the 4 suits in our deck. This will be the array outer loop.
  var suits = ["🔸", "♣", "💗", "♠"];

  // Create index for suits, and outer while loop coinditions.
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    console.log(`current suit, ${currentSuit}`);
    // Loop from 1 to 13 to create all cards for a given suit. Nested inner loop. Add rank counter to determine value of cards.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      //Let cardName be the card value (rank counter)
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
        name: cardName, //Value taken from inner loop
        suit: currentSuit, //Value taken from outer loop
        rank: rankCounter, //Value taken from inner loop
      };
      //console.log(`card name, ${cardName}`);
      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    } //Inner loop is closed here, proceed to close outer loop.

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive). For shuffling deck.
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
  // Console.log below was used to check that deck is shuffled. Remove // to enable console.log to check again.
  // console.log(
  //   `shuffled deck results above, ${cardDeck.forEach((element) =>
  //     console.log(`card name, ${element.name}, card suit, ${element.suit}`)
  //   )}`
  // );
  // Return the shuffled deck
  return cardDeck;
};

//Create a var for a completed shuffled deck
var shuffledDeck = shuffleCards(makeDeck());
console.log("shuffled deck");
console.log(shuffledDeck);

//Create a function to deliver message of player hand
var playerHand = function (playerArr) {
  var message = "You currently have <br>";
  for (let i = 0; i < playerArr.length; i += 1) {
    message = message + `${playerArr[i].name} of ${playerArr[i].suit} <br>`;
  }
  console.log(`player hand message, ${message}`);
  return message;
};

// Create a function to deliver message of computer hand
var computerHand = function (computerArr) {
  var message = "Computer have <br>";
  for (let i = 0; i < computerArr.length; i += 1) {
    message = message + `${computerArr[i].name} of ${computerArr[i].suit} <br>`;
  }
  console.log(`computer hand message, ${message}`);
  return message;
};

//Create a helper function to calculate hand value.
var handValue = function (Arr) {
  var totalValue = 0; //Define total value as 0 first.
  var aceInHand = 0; //Number of ace in hand.
  var handIndex = 0; //Array index
  while (handIndex < Arr.length) {
    //Create nested condition within loop to check for all card type.
    //Check for card value 2-10
    var currentCard = Arr[handIndex];
    if (currentCard.rank >= 2 && currentCard.rank <= 10) {
      totalValue += currentCard.rank;
    } else if (currentCard.rank >= 11 && currentCard.rank <= 13) {
      totalValue += 10;
    } else if (currentCard.rank == 1) {
      totalValue += 11;
      aceInHand += 1;
      //Harder to calculate value of ace later, so assume ace to be 11 first since starting hand can't bust unless 2 ace. Create conditions after this loop to rectify any other ace value.
    }
    handIndex += 1;
  }
  //Conditions where ace value needs to become 1
  // If starting hand, 2 aces
  // If after hit and ace is present, hand bust, -10
  // Since, aces can only be 1 or 11, value -10 * number of aces in hand. To accomodate multiple aces in hand from multiple hits scenario.
  // Can find a common condition from the above, 1. if bust, 2. if there is ace in hand
  if (totalValue > 21 && aceInHand > 0) {
    totalValue = totalValue - aceInHand * 10;
  }
  return totalValue;
};

//Deal cards + check for instant win if have.
//Flow of the game:
//1. Check blackjack win condition,
//2. If no instant win, proceed to player choice to hit or stay
//3. Once player turn end, computer turn to hit or stay
//4. Once computer turn end, reveal result and game outcome
var dealCards = function () {
  //Dealt to player first, follow by computer
  if (computerArr.length < 2) {
    playerArr.push(shuffledDeck.pop());
    computerArr.push(shuffledDeck.pop());
    playerArr.push(shuffledDeck.pop());
    computerArr.push(shuffledDeck.pop());

    console.log(
      `player hand, ${playerArr[0].name} of ${playerArr[0].suit} , and ${playerArr[1].name} of ${playerArr[1].suit}`
    );
    console.log(
      `computer hand, ${computerArr[0].name} of ${computerArr[0].suit} , and ${computerArr[1].name} of ${computerArr[1].suit}`
    );
    console.log(`Remaining cards in deck, ${shuffledDeck.length}`);
    var playerValue = handValue(playerArr);
    var computerValue = handValue(computerArr);
    console.log(`player hand value, ${playerValue}`);
    console.log(`computer hand value, ${computerValue}`);
  }
  // create conditions if anyone have blackjack, or if it is a tie if both have blackjack. If not game proceeds to player turn
  if (playerValue == 21 && computerValue !== 21) {
    myOutputValue = `${userName} wins! You got a blackjack! <br><br>
    ${playerHand(playerArr)} 
    Points in hand: ${playerValue} <br><br>
    ${computerHand(computerArr)} 
    Points in hand: ${computerValue} <br><br>
    Click submit to start a new game!`;
    userName = "";
    playerArr = [];
    computerArr = [];
    currentGameMode = "newGame";
    shuffledDeck = shuffleCards(makeDeck());
  } else if (computerValue == 21 && playerValue != 21) {
    myOutputValue = `${userName} lose! Computer wins! Computer got a blackjack! <br><br>
    ${playerHand(playerArr)} 
    Points in hand: ${playerValue}<br><br>
    ${computerHand(computerArr)} 
    Points in hand: ${computerValue}<br><br>
    Click submit to start a new game`;
    userName = "";
    playerArr = [];
    computerArr = [];
    currentGameMode = "newGame";
    shuffledDeck = shuffleCards(makeDeck());
  } else if (computerValue == 21 && playerValue == 21) {
    myOutputValue = `It is a tie! Both ${userName} and computer has blackjack! <br><br>
    ${playerHand(playerArr)}
    Points in hand: ${playerValue} <br><br>
    ${computerHand(computerArr)}
    Points in hand: ${computerValue} <br><br>
    Click submit to start a new game.`;
    userName = "";
    playerArr = [];
    computerArr = [];
    currentGameMode = "newGame";
    shuffledDeck = shuffleCards(makeDeck());
  } else if (playerValue < 21 && computerValue < 21) {
    myOutputValue = `${playerHand(playerArr)} 
    Points in hand: ${playerValue}<br><br>
    Type in "hit" to be dealt another card, <br> or type in "stay" to end your turn.`;
    currentGameMode = "hitOrStay";
    console.log(`current Game Mode, ${currentGameMode}`);
  }
  return myOutputValue;
};

//Create a function for player hit
var playerHit = function () {
  playerArr.push(shuffledDeck.pop());
  var playerValue = handValue(playerArr);
  console.log(`remaining cards in deck, ${shuffledDeck.length}`);
  console.log(`player value after hit, ${playerValue}`);
  //Create conditions for if player bust & if player doesn't bust
  // If player bust, proceed to game outcome
  if (playerValue > 21) {
    myOutputValue = `You have bust, <br><br> ${playerHand(playerArr)}
    Points in hand: ${playerValue} <br><br> Click submit to proceed for game results`;
    currentGameMode = "playerHitBust";
    return myOutputValue;
  }

  //If player have not bust, choose to hit or stay, nested conditino. If hit, repeat, if stay, proceed to game outcome
  if (playerValue <= 21) {
    myOutputValue = `${playerHand(playerArr)} 
    Points in hand: ${playerValue}<br><br>
    Type in "hit" to be dealt another card, <br> or type in "stay" to end your turn.`;
    currentGameMode = "hitOrStay";
    console.log(`current Game Mode, ${currentGameMode}`);
    return myOutputValue;
  }

  return myOutputValue;
};

//Create a function for computer turn
var computerTurn = function () {
  var computerValue = handValue(computerArr);
  while (computerValue < 17) {
    computerArr.push(shuffledDeck.pop());
    computerValue = handValue(computerArr);
    console.log(computerValue);
  }
  console.log(`computer value after hit, if any, ${computerValue}`);
  console.log(`computer hand after turn end, ${computerHand(computerArr)}`);
  console.log(`After computer turn, ${computerHand(computerArr)}`);
  return computerHand(computerArr);
};

// Create function for computer hit or stay + game outcome
var gameResult = function () {
  // Create and view values of everyone first.
  var playerValue = handValue(playerArr);
  var computerValue = handValue(computerArr);
  //Player wins condition
  // player > computer, when both are <= 21
  // player <= 21 & computer > 21
  if (
    (playerValue > computerValue && playerValue <= 21 && computerValue <= 21) ||
    (playerValue <= 21 && computerValue > 21)
  ) {
    myOutputValue = `${userName} wins! <br><br>
    ${playerHand(playerArr)} 
    Points in hand: ${playerValue}<br><br>
    ${computerHand(computerArr)}
    Points in hand: ${computerValue}`;
  } //Computer wins conditions.
  else if (
    (playerValue < computerValue && playerValue <= 21 && computerValue <= 21) ||
    (computerValue <= 21 && playerValue > 21)
  ) {
    myOutputValue = `${userName} lose! <br><br>
    ${playerHand(playerArr)}
    Points in hand: ${playerValue} <br><br>
    ${computerHand(computerArr)}
    Points in hand: ${computerValue}`;
  } // Draw conditions, if both values are equal || both bust
  else if (
    playerValue == computerValue ||
    (playerValue > 21 && computerValue > 21)
  ) {
    myOutputValue = `It is a draw! <br><br>
    ${playerHand(playerArr)} 
    Points in hand: ${playerValue}<br><br>
    ${computerHand(computerArr)}
    Points in hand: ${computerValue}`;
  }
  return myOutputValue;
};

var main = function (input) {
  //First, make a general message and ask to enter userName
  myOutputValue = "";
  if (currentGameMode == "userName") {
    userName = input;
    myOutputValue = `Hi ${userName}, welcome to a game of black jack. Click submit to start the game.`;
    currentGameMode = "dealCards";
    console.log(`current game mode, ${currentGameMode}`);
    return myOutputValue;
  }
  if (currentGameMode == "newGame") {
    userName = input;
    myOutputValue = `Enter user name in input and click submit.`;
    currentGameMode = "userName";
    console.log(`current game mode, ${currentGameMode}`);
    return myOutputValue;
  }
  if (currentGameMode == "dealCards") {
    input = "";
    myOutputValue = dealCards();
    return myOutputValue;
  }
  if (currentGameMode == "hitOrStay") {
    if (input == "hit") {
      myOutputValue = playerHit();
    } else if (input == "stay") {
      //Calculate game result and restart game
      computerTurn();
      myOutputValue = gameResult() + "<br>click submit to start a new game";
      userName = "";
      playerArr = [];
      computerArr = [];
      currentGameMode = "newGame";
      shuffledDeck = shuffleCards(makeDeck());
    } else if (input !== "hit" && input != "stay") {
      var playerValue = handValue(playerArr);
      myOutputValue = `Response is invalid, please key in hit or stay <br><br>
      ${playerHand(playerArr)}
    Points in hand: ${playerValue}`;
    }
    return myOutputValue;
  } else if (currentGameMode == "playerHitBust") {
    computerTurn();
    myOutputValue = gameResult() + "<br>click submit to start a new game";
    userName = "";
    playerArr = [];
    computerArr = [];
    currentGameMode = "newGame";
    shuffledDeck = shuffleCards(makeDeck());
  }
  return myOutputValue;
};
