//Global Variables
var currentGameMode = "game start";
var playerHand = [];
var dealerHand = [];
var gameDeck = "";

//Creating Deck
function createDeck() {
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
}

// Get a random index ranging from 0 (inclusive) to max (exclusive).
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Shuffle the elements in the cardDeck array
function shufflecards(cardDeck) {
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
}

function createNewDeck() {
  var newDeck = createDeck();
  var shuffledDeck = shufflecards(newDeck);
  return shuffledDeck;
}

//Game Functions
function checkForBlackjack(hand) {
  var playerCard1 = hand[0];
  var playerCard2 = hand[1];
  var isBlackjack = false;

  if (
    (playerCard1.name == "ace" && playerCard2.rank >= 10) ||
    (playerCard1.rank >= 10 && playerCard2.name == "ace")
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
}

function calculateTotalHandValue(hand) {
  var totalHandValue = 0;
  var index = 0;
  while (index < hand.length) {
    var currentCard = hand[index];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue += 10;
    } else {
      totalHandValue += currentCard.rank;
    }
    index++;
  }
  return totalHandValue;
}
function displayHands(playerHandArray, dealerHandArray) {
  // Player's Hand
  var playerMessage = "Player's Hand: <br>";
  for (var index = 0; index < playerHandArray.length; index++) {
    playerMessage +=
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
  }

  // Dealer's Hand
  var dealerMessage = "Dealer's Hand: <br>";
  for (index = 0; index < dealerHandArray.length; index++) {
    dealerMessage +=
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
  }

  // Return both messages concatenated
  return playerMessage + dealerMessage;
}

//Main Function

function main(input) {
  var outputMsg = "";
  if (currentGameMode == "game start") {
    gameDeck = createNewDeck();
    console.log(gameDeck);

    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("Player Hand");
    console.log(playerHand);
    console.log("Dealer Hand");
    console.log(dealerHand);

    currentGameMode = "game cards drawn";
    outputMsg = "Cards dealt. Press submit to continue!";
    return outputMsg;
  }
  if (currentGameMode == "game cards drawn") {
    //Tester Below --> Uncomment to Test
    // playerHand = [
    //   { name: "queen", suit: "spades", rank: 12 },
    //   { name: 2, suit: "spades", rank: 2 },
    // ];
    // dealerHand = [
    //   { name: "jack", suit: "spades", rank: 11 },
    //   { name: "ace", suit: "spades", rank: 1 },
    // ];

    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);

    console.log(`PBJ: ${playerHasBlackjack}`);
    console.log(`DBJ: ${dealerHasBlackjack}`);

    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMsg = "Its a Blackjack Tie!";
      } else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMsg = "Player wins by Blackjack";
      } else {
        outputMsg = "Dealer wins by Blackjack";
      }
    } else {
      outputMsg = "No Blackjack!.";

      var playerTotalHandValue = calculateTotalHandValue(playerHand);
      var dealerTotalHandValue = calculateTotalHandValue(dealerHand);

      console.log(
        `PTHV: ${playerTotalHandValue}   DTHV: ${dealerTotalHandValue}`
      );

      //compare THV
      //Same Value == Tie
      if (playerTotalHandValue == dealerTotalHandValue) {
        outputMsg = "Its a tie!";
        console.log("Tie");
      }
      //Player Higher == Player Wins
      else if (playerTotalHandValue > dealerTotalHandValue) {
        outputMsg = "Player wins!";
        console.log("Win");
      }
      //Dealer Higher == Dealer WIns
      else {
        outputMsg = "Dealer Wins!";
        console.log("Lose");
      }
    }
    outputMsg = `${displayHands(playerHand, dealerHand)}` + outputMsg;

    return outputMsg;
  }
}
