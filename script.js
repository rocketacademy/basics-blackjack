//1. Create Helper functions
//1.1 to generate card deck
//1.2 to shuffle card deck
//1.3 to deal cards ('card dealer function')
//1.4 to count current score ('current score counter function')
//1.5 to check if more than one ace has been drawn(?)
//2. Shuffle the Deck when player clicks 'submit'
//3. Run card dealer function (twice) to deal two cards to the player and two to the computer/dealer when player clicks 'submit'
//3.1 Create an empty array for playerCards
//3.2 Create an empty array for computerCards
//3.3 run card dealer function and PUSH to respective arrays
//3.4 run card dealer function four times in total at start of game(?)
//4.Run current score counter function.
//The helper function will extract the ranks of every card in the playerCards/computerCards arrays and add them up together
//Create an empty array for currentPlayerScore
//Create an empty array for currentComputerScore
//If ace is drawn and it is the first ace, ace = 11
//If ace is drawn and from the second ace onwards, ace = 1
//Possibly need another helper function to check if more than one ace has been drawn?
//5. possible states at first round are: (a) Player wins, (b) Computer wins, (c) Both win i.e. tie, (d) Neither player nor compuet wins
//5.1 If player wins by blackjack i.e. currentPlayerScore=21, output message is 'you've won'.
//5.2 If computer won by blackjack i.e. currentComputerScore=21 , output message is 'you've lost'.
//5.3 If both player and computer wins by blackjack, output message is 'it's a draw!'

//6.If player/computer did not win by blackjack, then display cards to player.
//6.1 Output is 'you have <rank> of <suit>, <rank> of <suit>. Dealer has <rank> of <suit> and one face down card'

//7. If player wants to hit, player inputs 'hit' (Change game mode?)
//7.1 If player chooses to hit, run card dealer function to deal one card to the player --> PUSH to playerCards
//7.2 run Caclulate current score
//7.3 If current score > 21, output message is "Sorry, you bust! Computer wins."
//7.4 If current score < 21, player again gets the decision to hit or stand

//8. If player wants to stand, player inputs 'stand'(Change game mode?)
//8.1 output is "You decided to stand. Your current score is 14, click to pass the turn to the dealer"
//9. Decide winner
//9.1 If currentPlayerScore >  currentComputerScore, player wins
//9.2 If currentComputerScore > currentPlayerScore, computer wins
//9.3 If currentPlayerScore == currentComputerScore, it's a tie

//Declare global variables
var playerCards = [];
var computerCards = [];
var cardDeck = [];
var playerScore = [];
var computerScore = [];
var sumOfPlayerScore = 0;
var sumOfComputerScore = 0;
var aceDrawnByPlayer = [];
var aceDrawnByComputer = [];

var gameState = "begin";

//Generate Card Deck
var makeDeck = function () {
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

//Get a random index ranging from 0 (inclusive) to max (exclusive)
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

// Player score counter function
var playerScoreCounter = function () {
  indexCounter = 0;
  while (indexCounter < playerCards.length) {
    if (playerCards[indexCounter].name == "ace") {
      if (aceDrawnByPlayer.length > 1) {
        playerScore[indexCounter] = 1;
      } else {
        playerScore[indexCounter] = 11;
      }
      aceDrawnByPlayer.push(0);
    } else if (
      playerCards[indexCounter].name == "king" ||
      playerCards[indexCounter].name == "queen" ||
      playerCards[indexCounter].name == "jack"
    ) {
      playerScore[indexCounter] = 10;
    } else {
      playerScore[indexCounter] = parseInt(playerCards[indexCounter].name);
    }
    indexCounter += 1;
  }
  var i = 0;
  sumOfPlayerScore = 0;
  while (i < playerScore.length) {
    sumOfPlayerScore = sumOfPlayerScore + playerScore[i];
    i += 1;
  }
  return sumOfPlayerScore;
};

//Computer score counter function
var computerScoreCounter = function () {
  indexCounter = 0;
  while (indexCounter < computerCards.length) {
    if (computerCards[indexCounter].name == "ace") {
      if (aceDrawnByComputer.length > 1) {
        computerScore[indexCounter] = 1;
      } else {
        computerScore[indexCounter] = 11;
      }
    } else if (
      computerCards[indexCounter].name == "king" ||
      computerCards[indexCounter].name == "queen" ||
      computerCards[indexCounter].name == "jack"
    ) {
      computerScore[indexCounter] = 10;
    } else {
      computerScore[indexCounter] = parseInt(computerCards[indexCounter].name);
    }
    indexCounter += 1;
  }
  var i = 0;
  sumOfComputerScore = 0;
  while (i < computerScore.length) {
    sumOfComputerScore = sumOfComputerScore + computerScore[i];
    i += 1;
  }
  return sumOfComputerScore;
};

//helper function to display player deck
var displayPlayerDeck = function (playerCards) {
  var cardsInPlayerDeck = "";
  counter = 0;
  while (counter < playerCards.length) {
    cardsInPlayerDeck =
      cardsInPlayerDeck +
      "<br>" +
      `${playerCards[counter].name} of ${playerCards[counter].suit}`;
    counter += 1;
  }
  return cardsInPlayerDeck;
};

var newDeck = makeDeck();
var shuffledCards = shuffleCards(newDeck);

//'hit' helper function
var playerChoseHit = function (shuffledCards, playerCards) {
  var dealPlayerCard3 = shuffledCards.pop();
  playerCards.push(dealPlayerCard3);
  console.log("this is playerCards");
  console.log(playerCards);
  var playerScoreForCurrentRound = playerScoreCounter(playerCards, playerScore);
  console.log("this is playerScoreForCurrentRound");
  console.log(playerScoreForCurrentRound);
  return playerScoreForCurrentRound;
};

var main = function (input) {
  if (gameState == "begin") {
    var dealPlayerCard1 = shuffledCards.pop();
    var dealPlayerCard2 = shuffledCards.pop();
    var dealComputerCard1 = shuffledCards.pop();
    var dealComputerCard2 = shuffledCards.pop();
    playerCards.push(dealPlayerCard1);
    playerCards.push(dealPlayerCard2);
    computerCards.push(dealComputerCard1);
    computerCards.push(dealComputerCard2);

    console.log("this is playerCards");
    console.log(playerCards);
    console.log("this is computerCards");
    console.log(computerCards);
    console.log("this is cardDeck.length");
    console.log(cardDeck.length);

    var playerCurrentScore = playerScoreCounter(playerCards, playerScore);
    var computerCurrentScore = computerScoreCounter(
      computerCards,
      computerScore
    );

    console.log("this is playerCurrentScore");
    console.log(playerCurrentScore);
    console.log("this is computerCurrentScore");
    console.log(computerCurrentScore);

    var myOutputValue = "";
    if (playerCurrentScore < 21 && computerCurrentScore < 21) {
      gameState = "new round";
      myOutputValue = `Dealer has <br> ${computerCards[0].name} of ${computerCards[0].suit} <br> and one card faced down<br><br> You have <br> ${playerCards[0].name} of ${playerCards[0].suit}<br>${playerCards[1].name} of ${playerCards[1].suit} <br> Your current score is ${playerCurrentScore}<br><br> Type 'hit' or 'stand' to proceed.`;
    } else if (playerCurrentScore == 21) {
      myOutputValue = `You have <br> ${playerCards[0].name} of ${playerCards[0].suit}<br>${playerCards[1].name} of ${playerCards[1].suit} <br> Your current score is ${playerCurrentScore}<br><br> BLACKJACK!`;
    } else if (computerCurrentScore == 21) {
      myOutputValue = `You have <br> ${playerCards[0].name} of ${playerCards[0].suit}<br>${playerCards[1].name} of ${playerCards[1].suit} <br> Your current score is ${playerCurrentScore}<br> But too bad. Dealer wins because he has BLACKJACK!`;
    } else if (playerCurrentScore == 21 && computerCurrentScore == 21) {
      myOutputValue = `You have <br> ${playerCards[0].name} of ${playerCards[0].suit}<br>${playerCards[1].name} of ${playerCards[1].suit} <br> Your current score is ${playerCurrentScore}<br>. You BLACKJACK! And the Dealer BLACKJACKS! <br><br> It\'s a TIE! `;
    }
  }

  if (gameState == "new round" && input == "hit") {
    var playerScoreNow = playerChoseHit(shuffledCards, playerCards);
    var showPlayerDeck = displayPlayerDeck(playerCards);

    if (playerScoreNow > 21) {
      myOutputValue = `You currently have these cards: <br> ${showPlayerDeck} <br><br> Your current score is ${playerScoreNow}. You bust. You lose! `;
    } else if (playerScoreNow == 21) {
      myOutputValue = `You currently have these cards: <br> ${showPlayerDeck} <br><br> Your current score is ${playerScoreNow}. Blackjack! You win!`;
    } else {
      myOutputValue = `You currently have these cards: <br> ${showPlayerDeck} <br><br> Your current score is ${playerScoreNow}.<br>Type 'hit' or 'stand' to proceed.`;
    }
  }
  if (gameState == "new round" && input == "stand") {
    console.log("sumOfPlayerScore");
    console.log(sumOfPlayerScore);
    console.log("sumOfComputerScore");
    console.log(sumOfComputerScore);
    if (sumOfComputerScore > sumOfPlayerScore) {
      var showPlayerDeckIfStand = displayPlayerDeck(playerCards);
      myOutputValue = `You currently have these cards: <br> ${showPlayerDeckIfStand} <br><br> And the Dealer has: <br> ${computerCards[0].name} of ${computerCards[0].suit} <br> and ${computerCards[1].name} of ${computerCards[1].suit}. <br><br> Your current score is ${sumOfPlayerScore} <br> and Dealer's current score is ${sumOfComputerScore}. <br><br>You lose!`;
    } else if (sumOfComputerScore < sumOfPlayerScore) {
      var showPlayerDeckIfStand = displayPlayerDeck(playerCards);
      myOutputValue = `You currently have these cards: <br> ${showPlayerDeckIfStand} <br><br> And the Dealer has: <br> ${computerCards[0].name} of ${computerCards[0].suit} <br> and ${computerCards[1].name} of ${computerCards[1].suit}. <br><br> Your current score is ${sumOfPlayerScore} <br> and Dealer's current score is ${sumOfComputerScore}. <br><br>You win!`;
    } else if (sumOfComputerScore == sumOfPlayerScore) {
      var showPlayerDeckIfStand = displayPlayerDeck(playerCards);
      myOutputValue = `You currently have these cards: <br> ${showPlayerDeckIfStand} <br><br> And the Dealer has: <br> ${computerCards[0].name} of ${computerCards[0].suit} <br> and ${computerCards[1].name} of ${computerCards[1].suit}. <br><br> Your current score is ${sumOfPlayerScore} <br> and Dealer's current score is ${sumOfComputerScore}. <br><br>It's a tie!`;
    }
  }

  return myOutputValue;
};
