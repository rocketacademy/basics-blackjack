// makes all of the deck of cards, arrange by rank, suits and name

var makeDeck = function () {
  var cardDeck = [];

  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    console.log("Current Suit : " + currentSuit);

    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suits: currentSuit,
        rank: rankCounter,
      };
      console.log("rank : " + rankCounter);

      cardDeck.push(card);
      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  return cardDeck;
};

// generate the function from above into variable so easy to use
var cardDeck = makeDeck();

// helps to get all the random numbers
var getRandomNumberIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// pulls the random number as an randomindex and search into the card deck for the number
var shuffleCards = function (cardDeck) {
  currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomNumberIndex(cardDeck.length);
    var randomCardGenerated = cardDeck[randomIndex]; // this takes the random index which is a random number and then it will look for that number on the cards deck.
    var currentCardGenerated = cardDeck[currentIndex]; // using the current index it will find a card in the deck
    // it swaps random card and current card together for a result
    cardDeck[currentIndex] = randomCardGenerated;
    cardDeck[randomIndex] = currentCardGenerated;

    currentIndex = currentIndex + 1;
  }

  return cardDeck;
};

// store the user name
var username = [];
var gameMode = "enter name";

var checkUsername = function (input) {
  gameMode == "enter name";
  if (input != ``) {
    gameMode = "start game";

    username = input;
    console.log("Check username input:", username);
    var message = "Hi 😀" + username + " <br> </br> Click submit to play.🃏";
  } else if (input == ``) {
    gameMode == "enter name";
    message = "Please enter your name 👀.";
    return message;
  }
  return message;
};

// store the player scores in global variable from functions below
var playerOneTwoCardResult = [];
var computerScore = [];
// shows the the player what card has been drawn
var shuffledCardResultScreen = function () {
  var firstCardValue = [];
  console.log("check first card value global variable", firstCardValue);

  var dealerFirstCardValue = [];
  console.log("check global variable", dealerFirstCardValue);

  var cardShuffled = shuffleCards(cardDeck);
  console.log("card shuffed part 1", cardShuffled);
  gameMode = "stage 2";

  // player's first card
  var playerOneCardOne = cardShuffled.pop();
  console.log("Player first card is :", playerOneCardOne);

  // value of the first card drawn
  var firstCardValue = playerOneCardOne.rank;
  console.log("Player First Card value :", firstCardValue);

  // player's second card
  var playerOneCardTwo = cardShuffled.pop();
  console.log("Player two card is :", playerOneCardTwo);
  // value of the second card drawn
  var secondCardValue = playerOneCardTwo.rank;
  console.log("Player Second Card Value :", secondCardValue);

  // if first two card is A then it will always be 11, afterwards if the third card is an A = 1
  //  to determine whether Aces should have value of 1 or 11 for a given hand.
  // card one can never be a "1" rank, if the rank 1 is choosen, auto turn to 11
  // card two can be 10 or 11, to keep it simple, as long as card two is choosen as 1 auto = 1

  // if the function sees that first card value is 1 then it is ace hence auto turn to value 11 to fill game rule
  if (firstCardValue == `1`) {
    firstCardValue = `11`;
    console.log("Turn Player Ace to:", firstCardValue);
  } else if (
    firstCardValue == `11` ||
    firstCardValue == `12` ||
    firstCardValue == `13` ||
    secondCardValue == `11` ||
    secondCardValue == `12` ||
    secondCardValue == `13`
  ) {
    firstCardValue = `10`;
    console.log("J Q K ", firstCardValue);

    secondCardValue = `10`;
    console.log("J Q K ", secondCardValue);
  }
  // value of the two cards together
  playerOneTwoCardResult = parseInt(secondCardValue) + parseInt(firstCardValue);
  console.log("Both of the player cards are valued", playerOneTwoCardResult);

  // dealer's first card
  var computerCardOne = cardShuffled.pop();
  console.log("Dealer first card is :", computerCardOne);

  // dealer first card value
  dealerFirstCardValue = computerCardOne.rank;
  console.log("Dealer First Card Value :", dealerFirstCardValue);

  // re-arrange the A J Q K value
  if (dealerFirstCardValue == `1`) {
    dealerFirstCardValue = `11`;
    console.log("Turn Dealer Ace to:", dealerFirstCardValue);
  } else if (
    dealerFirstCardValue == `11` ||
    dealerFirstCardValue == `12` ||
    dealerFirstCardValue == `13` ||
    dealerSecondCardValue == `11` ||
    dealerSecondCardValue == `12` ||
    dealerSecondCardValue == `13`
  ) {
    dealerFirstCardValue = `10`;
    console.log("J Q K ", dealerFirstCardValue);

    dealerSecondCardValue = `10`;
    console.log("J Q K ", dealerSecondCardValue);
  }

  // dealer's second card
  var computerCardTwo = cardShuffled.pop();
  console.log("Dealer second Card is :", computerCardTwo);
  // dealer second card value
  var dealerSecondCardValue = computerCardTwo.rank;
  console.log("Dealer second Card value :", dealerSecondCardValue);

  computerScore =
    parseInt(dealerSecondCardValue) + parseInt(dealerFirstCardValue);
  console.log("Both Dealer Cards :", computerScore);

  if (computerScore <= `17`) {
    // if score less than 17, dealer draws a new card to the deck
    var computerCardThird = cardShuffled.pop();
    console.log("Dealer Add Third Card:", computerCardThird);
    // check the value of third card and add to the total computer score
    var dealerSecondThirdValue = computerCardThird.rank;
    // total score of the third card from dealer
    computerScore = computerScore + parseInt(dealerSecondThirdValue);
    console.log("Latest Dealer Card Value: ", computerScore);
  }

  var message =
    `${username} have drawn a card of ${playerOneCardOne.name} of ${playerOneCardOne.suits} and ${playerOneCardTwo.name} of ${playerOneCardTwo.suits}. <br> </br> Please select "yes" if you would like to add another card ☠️` +
    "<br> </br>  Current Player Card value:" +
    playerOneTwoCardResult;
  return message;
};

// global variable for toHit function
var blackjack = "21";
var message2;
var message3;
var message;
var playerOneThirdCardResult = [];

// choice: players to decide whether to hit or stand
// Note: If the third card value is less than 17, there will be a undefined because did not account for that. Need to use loop...
var toHit = function (input) {
  // changes the gameMode now to stage 3 when this function runs
  gameMode = "stage 3";
  message = "processing request...";
  // Condition: If the player or Dealer total card value is less than blackjack, give player a choice
  if (playerOneTwoCardResult < `17`) {
    // default choice message to player
    message = "Value more than 17! Processing result with dealer....";
    // player to input their decision to add card or not
    if (input === "yes") {
      // shuffle and select the card
      var cardShuffled = shuffleCards(cardDeck);
      var playerOneCardThird = cardShuffled.pop();
      console.log("Player Third Card is:", playerOneCardThird);

      // gathers the value of the third card into the first two cards
      var playerOneThirdCardResult =
        playerOneTwoCardResult + playerOneCardThird.rank;
      console.log("Player Third Card value:", playerOneThirdCardResult);

      // set the third card value to the first two card value
      playerOneTwoCardResult = playerOneThirdCardResult;
      message2 = `Third Card is added a card of ${playerOneCardThird.name} of ${playerOneCardThird.suits} <br> </br> Current card value ${playerOneThirdCardResult}`;
      console.log("Player card value is changed", message2);

      // run loop if card value is still less than 17
      while (playerOneTwoCardResult <= blackjack) {
        message2 =
          "Ah...new card added but still not enough. Please add another." +
          "<br> </br> Previous card was :" +
          `${playerOneCardThird.name} of ${playerOneCardThird.suits}` +
          "<br> </br> brings total card value to " +
          playerOneTwoCardResult +
          "<br> </br>. You can add another card by pressing yes";
        if (input === `add`) {
          // take new card
          var cardShuffled = shuffleCards(cardDeck);
          var playerAddCard = cardShuffled.pop();
          console.log("Added New Card loop:", playerAddCard);

          var addNewCard = playerAddCard.rank + playerOneThirdCardResult;
          console.log("Updated New Card Value:", addNewCard);

          // new card result value
          playerOneTwoCardResult = addNewCard;
          console.log("Player's final card value: ", playerOneTwoCardResult);

          message2 = "New Card added" + playerOneTwoCardResult;
          console.log("New Card Added", message2);
          return message2;
        }
        return message2;
      }
      console.log("Check Message:", message2);
      return message2;
    } else if (playerOneTwoCardResult < `17`) {
      gameMode = "stage 2";
      message2 =
        "Ops... card value is less than 17. You have to input yes, to proceed.";
      console.log("check message", message2);
      return message2;
    }
    console.log("Stage 3 Message:", message);
    return message;
  } else if (playerOneTwoCardResult > 17)
    while (playerOneTwoCardResult <= blackjack) {
      message2 = `Ah...no card added.`;
      if (input === `add`) {
        // take new card
        var cardShuffled = shuffleCards(cardDeck);
        var playerAddCard = cardShuffled.pop();
        console.log("Added New Card loop:", playerAddCard);

        var addNewCard = playerAddCard.rank + playerOneThirdCardResult;
        console.log("Updated New Card Value:", addNewCard);

        // new card result value
        playerOneTwoCardResult = addNewCard;
        console.log("Player's final card value: ", playerOneTwoCardResult);

        message2 = "New Card added" + playerOneTwoCardResult;
        console.log("New Card Added", message2);
        return message2;
      }
      return message2;
    }

  // if result is more than 21, just move it away
  if (playerOneTwoCardResult > blackjack) {
    gameMode = "stage 3";
  }
  // if result is equal 21, just move it away

  if (playerOneTwoCardResult === blackjack) {
    gameMode = "stage 3";
  }
};

// for dealer to decide to hit or stand, default to if less than 17 dealer must add card.
dealerHit = function () {
  gamemode = "dealer checks hand";
  // input has to be yes if not force the game to loop
  if (computerScore <= `17`) {
    // take new card
    var cardShuffled = shuffleCards(cardDeck);
    var dealerAddCard = cardShuffled.pop();
    console.log("Added new card in loop:", dealerAddCard);

    // dealer add a new card and value now change
    var addNewCard = dealerAddCard.rank + computerScore;
    console.log("Player Card value is changed again:", dealerAddCard);

    // new card result value
    computerScore = addNewCard;
    console.log("Dealer Final Card Value: ", computerScore);

    message2 = "Dealer add a new card" + computerScore;
    console.log("Dealer New Card Added", message2);
  } else {
    gameMode = "stage 3";
  }
  return message2;
};

// Conditons: To win the game comparing dealer and player score
// Note: Some conditions may be missing, require another update.
var gameResult = function () {
  message = `This result was not calculated, contact YK to update result.`;

  console.log("Win Message:", message);
  // if computer total card value > 21 lose
  if (computerScore > blackjack && playerOneTwoCardResult > blackjack) {
    message = "Dealer lost and player lost together";
    console.log("check message: ", message);
    return message;
  }
  if (playerOneTwoCardResult <= blackjack && computerScore >= blackjack) {
    message = `Dealer card bursted! Player card won`;
    console.log("Losing message:", message);
    return message;
  }
  if (computerScore == blackjack && playerOneTwoCardResult <= blackjack) {
    message = "Dealer gotten blackjack";
    console.log("Dealer Message", message);
    return message;
  }
  if (playerOneTwoCardResult == blackjack && computerScore <= blackjack) {
    message = "You won the game, black jack";
    console.log("BLACK JACKED", message);
    return message;
  }
  if (playerOneTwoCardResult == computerScore) {
    message = "Wow! dealer and player both tie";
    console.log("check message: ", message);
    return message;
  }
  if (computerScore >= blackjack) {
    message = "dealer lost";
    console.log("check message: ", message);
    return message;
  }
  if (playerOneTwoCardResult > blackjack && computerScore <= blackjack) {
    message = "Your card bursted, dealer won";
    console.log("Bursted", message);
    return message;
  }
  if (
    playerOneTwoCardResult < computerScore &&
    computerScore <= blackjack &&
    computerScore >= playerOneTwoCardResult
  ) {
    message = "Player card value is lower than dealer, dealer won!";
    console.log("check message: ", message);
    return message;
  }
  if (playerOneTwoCardResult > computerScore && computerScore <= blackjack) {
    message = "Player won!";
    console.log("check message: ", message);
    return message;
  }

  return message;
};

// main display screen

var main = function (input) {
  display = "display finished";
  // if the mode is start the game then run function to enter a player name
  if (gameMode == "enter name") {
    var display = checkUsername(input);
    console.log("Game Mode username entered :", display);
  } // once name is entered start the game
  else if (gameMode == "start game") {
    var display = shuffledCardResultScreen();
    console.log("Mode Display 1 :", display);
  } // now if the game mode is in stage 1 then run to check if can hit
  else if (gameMode == "stage 2") {
    var display = toHit(input);
    console.log("Mode Display 2 :", display);
  } // now that the player condition for hit or stand is made, if needed will check for dealer's hand
  else if (gameMode == "dealer checks hand") {
    var display = dealerHit(input);
    console.log("Mode Display 3 :", display);
  } // if the dealer and player hit or stand is made, a condition to check winning result
  else if (gameMode == "stage 3") {
    var display = gameResult();
    console.log("Mode Display 4", display);
  }
  return display;
};
