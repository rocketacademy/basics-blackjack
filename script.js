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
var sumOfPlayerScore = 0;
var computerScore = [];
var sumOfComputerScore = 0;

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
      playerScore[indexCounter] = 11;
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
      computerScore[indexCounter] = 11;
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
  while (i < computerScore.length) {
    sumOfComputerScore = sumOfComputerScore + computerScore[i];
    i += 1;
  }
  return sumOfComputerScore;
};

var main = function (input) {
  var newDeck = makeDeck();
  var shuffledCards = shuffleCards(newDeck);
  var dealPlayerCard1 = shuffledCards.pop();
  var dealPlayerCard2 = shuffledCards.pop();
  var dealComputerCard1 = shuffledCards.pop();
  var dealComputerCard2 = shuffledCards.pop();
  playerCards.push(dealPlayerCard1);
  playerCards.push(dealPlayerCard2);
  computerCards.push(dealComputerCard1);
  computerCards.push(dealComputerCard2);

  // var dealPlayerCard1 = dealCards(cardDeck);
  // playerCards.push(dealPlayerCard1);
  // var dealPlayerCard2 = dealCards(cardDeck);
  // playerCards.push(dealPlayerCard2);
  console.log("this is playerCards");
  console.log(playerCards);
  // var dealComputerCard1 = dealCards(cardDeck);
  // computerCards.push(dealComputerCard1);
  // var dealComputerCard2 = dealCards(cardDeck);
  // computerCards.push(dealComputerCard2);
  console.log("this is computerCards");
  console.log(computerCards);
  console.log("this is cardDeck.length");
  console.log(cardDeck.length);
  var playerCurrentScore = playerScoreCounter(playerCards, playerScore);
  var computerCurrentScore = computerScoreCounter(computerCards, computerScore);

  console.log("this is playerCurrentScore");
  console.log(playerCurrentScore);
  console.log("this is computerCurrentScore");
  console.log(computerCurrentScore);

  var myOutputValue = "";
  return myOutputValue;
};
