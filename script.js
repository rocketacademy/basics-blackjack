///// Global variables/////

let playerHand = [];
let computerHand = [];

let state = "Draw cards for both";

///// Global functions/////

// Function to create a deck of 52 cards
let makeDeck = function () {
  // Initialise an empty deck array
  let cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  let suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  let suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    let currentSuit = suits[suitIndex];
    let rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      let cardName = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      // If name is Jack, Queen and King, set cardRank to 10 points
      let cardRank = 0;
      if (cardName == "Jack" || cardName == "Queen" || cardName == "King") {
        cardRank = 10;
      } else {
        cardRank = rankCounter;
      }
      // Create a new card with the current name, suit, and rank
      let card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
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

// Function to shuffle the deck
let getRandomIndex = function (max) {
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
let shuffledDeck = shuffleCards(makeDeck());

//Function to check for blackjack
let checkBlackJack = function (hand) {
  let hasBlackJack = false;
  let hasTen = false;
  let hasAce = false;

  for (position = 0; position < hand.length; position += 1) {
    if (hand[position].rank == "10") {
      hasTen = true;
    }
    if (hand[position].name == "Ace") {
      hasAce = true;
    }
    if (hasTen && hasAce) {
      hasBlackJack = true;
      console.log("black jack");
    }
    return hasBlackJack;
  }
};

// Function to calculate sum of cards
let getSum = function (handarray) {
  let sum = 0; // Auto reset each time
  let hasAce = false;

  // Loop to count cards in hand
  for (let sumCounter = 0; sumCounter < handarray.length; sumCounter += 1) {
    sum = sum + handarray[sumCounter].rank;
    if (handarray[sumCounter].rank == 1) {
      hasAce = true;
    }
  }
  // Ace is read as 11 if hand is less 21 or less
  // Ace is read as 1 by default
  if (sum + 10 < 22 && hasAce) {
    // Adding 10 to the sum first to check if the hand > 21
    sum = sum + 10;
  }
  return sum;
};

// Function to calculate sum of cards
let showHandCards = function (hand) {
  let handOutput = "";
  for (counter = 0; counter < hand.length; counter += 1) {
    handOutput += hand[counter].name + " " + hand[counter].suit;
    if (counter != hand.length - 1) {
      handOutput += " ,  "; // no commas after the last card
    }
  }
  return handOutput;
};

// Function to output message for PLAYER card sum and the cards
let showPlayerMessage = function (hand) {
  myOutputValue = `Your hand:<br><b>${showHandCards(
    hand
  )}</b><br><br>Your total: ${getSum(hand)}`;
  return myOutputValue;
};
// Function to output message for DEALER card sum and the cards
let showComputerMessage = function (hand) {
  myOutputValue = `Dealer's hand:<br><b>${showHandCards(
    hand
  )}</b><br><br>Dealer's total: ${getSum(hand)}`;
  return myOutputValue;
};

///// Main function /////

let main = function (input) {
  console.log("State:", state);
  console.log("Input:", input);

  // Game start, draw 2 cards for player and dealer
  if (state == "Draw cards for both") {
    for (counter = 0; counter < 2; counter += 1) {
      let playerDraw = shuffledDeck.pop();
      let computerDraw = shuffledDeck.pop();
      playerHand.push(playerDraw);
      computerHand.push(computerDraw);
    }
    console.log(`Player draw: ${showHandCards(playerHand)}`);
    console.log(`Computer draw: ${showHandCards(computerHand)}`);

    // Check for Blackjack
    let playerHasBlackJack = checkBlackJack(playerHand);
    let computerHasBlackJack = checkBlackJack(computerHand);
    console.log(`Player has blackjack = ${playerHasBlackJack}`);
    console.log(`Computer has blackjack = ${computerHasBlackJack}`);

    // If only player has blackjack
    if (playerHasBlackJack && !computerHasBlackJack) {
      let myOutputValue = `Computer blackjack!<br><br>Computer wins!`;
      return myOutputValue;
    }
    // If only dealer has blackjack
    if (!playerHasBlackJack && computerHasBlackJack) {
      let myOutputValue = `Player blackjack!<br><br>Player wins!`;
      return myOutputValue;
    }
    // If both player and dealer has blackjack
    if (playerHasBlackJack && computerHasBlackJack) {
      let myOutputValue = `Double blackjack!<br><br>It's a tie!`;
      return myOutputValue;
    }

    let sumPlayerHand = getSum(playerHand);
    let sumComputerHand = getSum(computerHand);
    console.log("Player sum: " + sumPlayerHand);
    console.log("Computer sum (initial draw): " + sumComputerHand);

    // If no blackjack, give player choice to hit or stand
    let myOutputValue = `${showPlayerMessage(
      playerHand
    )}<br><br>Enter 'h' for hit or 's' for stand.`;
    state = "Player choice";
    return myOutputValue;
  }

  // If player enters blank or any other words, return with error msg
  if (
    state == "Player choice" &&
    (!input || !["h", "s"].includes(input.toLowerCase()))
  ) {
    return "Oops! Please only enter 'h' for hit or 's' for stand!";
  }

  // If player hit and has less than 21, draw another card
  if (input.toLowerCase() == "h" && state == "Player choice") {
    playerDraw = shuffledDeck.pop();
    playerHand.push(playerDraw);
    console.log("Player draw: " + showHandCards(playerHand));

    let sumPlayerHand = getSum(playerHand);
    let sumComputerHand = getSum(computerHand);
    console.log("Player sum: " + sumPlayerHand);
    console.log("Computer sum: " + sumComputerHand);

    // If player hit and bust, dealers's turn begin
    if (sumPlayerHand > 21) {
      state = "Computer turn";
      let myOutputValue = `${showPlayerMessage(
        playerHand
      )}<br><br>You bust! Dealer's turn!`;
      return myOutputValue;
    }
    // If player hit and did not bust, player's turn again
    let myOutputValue = `${showPlayerMessage(
      playerHand
    )}<br><br>Enter 'h' for hit or 's' for stand.`;
    return myOutputValue;
  }

  /////DEALER TURN/////
  // Dealer is also computer

  // If player stand OR player hit and bust, dealer's turn
  if (input.toLowerCase() == "s" || state == "Computer turn") {
    let sumPlayerHand = getSum(playerHand);
    let sumComputerHand = getSum(computerHand);
    console.log("Player sum: " + sumPlayerHand);
    console.log("Computer sum: " + sumComputerHand);

    // If dealer has 16 or less , it needs to draw until greater than 16
    while (sumComputerHand < 17) {
      let computerDraw = shuffledDeck.pop();
      computerHand.push(computerDraw);
      sumComputerHand = getSum(computerHand);
      console.log("Computer final sum: " + sumComputerHand);
    }

    let myOutputValue = `${showPlayerMessage(
      playerHand
    )}<br><br>${showComputerMessage(computerHand)}<br><br>`;

    // If player did not bust and has a higher score, player win
    if (sumPlayerHand < 22 && sumPlayerHand > sumComputerHand) {
      myOutputValue = myOutputValue + "<b>🏆🏆 Player wins! 🏆🏆</b>";
      // If player did not bust and dealer bust, player win
    } else if (sumPlayerHand < 22 && sumComputerHand > 21) {
      myOutputValue = myOutputValue + "<b>💣💣 Dealer bust! You win! 💣💣 </b>";
      // If player and dealer have same scores, both tie
    } else if (sumPlayerHand == sumComputerHand) {
      myOutputValue = myOutputValue + "<b>👏👏 It's a tie! 👏👏</b>";
      // If player and dealer both bust, both tie
    } else if (sumPlayerHand > 21 && sumComputerHand > 21) {
      myOutputValue = myOutputValue + "<b>💥💥 Both bust! It's a tie! 💥💥";
      // Dealer wins
    } else {
      myOutputValue = myOutputValue + "<b>✨✨ Dealer wins! ✨✨";
    }
    // Reset the game
    shuffledDeck = shuffleCards(makeDeck());
    console.log("Deck reset");
    playerHand = [];
    computerHand = [];
    state = "Draw cards for both";
    return myOutputValue;
  }
};
