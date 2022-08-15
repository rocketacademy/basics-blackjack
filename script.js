/* What do I need for project blackjack?
1. Deck
2. Shuffle
3. Winning condition
4. user will submit "hit" or "stand"
5. dealer deals until 17

*/
let gameState1 = "DRAW CARDS";
let gameState2 = "PLAYER_DECIDE_TO_HIT_OR_STAND";
let gameState3 = "PLAYER_STAND_THEN_SHOW_RESULT";
let currentGameState = gameState1;

// array for player and dealer hands
let playerHands = [];
let dealerHands = [];

// Main game play function is to deal cards and compare results and output the result
var main = function (input) {
  let ouputMessage = "";
  if (currentGameState == gameState1) {
    let playerCard1 = playerHands.push(shuffledDeck.pop());
    let playerCard2 = playerHands.push(shuffledDeck.pop());
    let computerCard1 = dealerHands.push(shuffledDeck.pop());
    let computerCard2 = dealerHands.push(shuffledDeck.pop());
    ouputMessage = `Player and Dealer had dealt two cards each. Press submit button to check the value`;
    currentGameState = gameState2;
    return ouputMessage;
  }

  // Player check value and decide to hit or not. If player or dealer got blackjack, it will display here.
  if ((currentGameState = gameState2)) {
    let playerGotBlackJack = checkForBlackJack(playerHands);
    let dealerGotBlackJack = checkForBlackJack(dealerHands);

    // if either one has blackjack, this condition will be in placed
    if (playerGotBlackJack == true || dealerGotBlackJack == true) {
      // Both got blackjack condition
      if (playerGotBlackJack == true && dealerGotBlackJack == true) {
        ouputMessage = `${displayHands(
          playerHands,
          dealerHands
        )} <br> It's a tie!`;

        // Either player or dealer got blackjack
      } else if (playerGotBlackJack == true && dealerGotBlackJack == false) {
        ouputMessage = `${displayHands(
          playerHands,
          dealerHands
        )}<br>BlackJack! Player wins!`;
      } else {
        ouputMessage = `${displayHands(
          playerHands,
          dealerHands
        )}<br>Dealer got BlackJack!`;
      }
    } else {
      ouputMessage = `${displayHands(
        playerHands,
        dealerHands
      )}<br> ${displayTotalPoints(
        calculateTotalPoints(playerHands),
        calculateTotalPoints(dealerHands)
      )} <br><br> Please enter input "hit" or "stand".`;
    }
    currentGameState = gameState3;
  }
  // Player will choose to hit or stand condition
  if (currentGameState == gameState3) {
    if (input == "hit") {
      // condition for player to hit if the value is less than 21
      if (calculateTotalPoints(playerHands) < 21) {
        playerHands.push(shuffledDeck.pop());
        ouputMessage = `${displayHands(
          playerHands,
          dealerHands
        )}<br>${displayTotalPoints(
          calculateTotalPoints(playerHands),
          calculateTotalPoints(dealerHands)
        )} <br><br> You drew another card! <br> Please input "hit" or "stand".`;
      }
      // condition to stop player from drawing card if the value reached 21
      if (calculateTotalPoints(playerHands) == 21) {
        ouputMessage = `${displayHands(
          playerHands,
          dealerHands
        )}<br>${displayTotalPoints(
          calculateTotalPoints(playerHands),
          calculateTotalPoints(dealerHands)
        )} <br><br> You have maximum handvalue <br> Please input "stand".`;
      }
      // condition to declare winner straightaway after player hand value more than 21
      else if (calculateTotalPoints(playerHands) > 21) {
        ouputMessage = `${displayHands(
          playerHands,
          dealerHands
        )}<br>${displayTotalPoints(
          calculateTotalPoints(playerHands),
          calculateTotalPoints(dealerHands)
        )} <br><br> You bust! Dealer wins!`;
        currentGameState = gameState1;
        playerHands = [];
        dealerHands = [];
      }
    } else if (input == "stand") {
      let playerTotalPoints = calculateTotalPoints(playerHands);
      let dealerTotalPoints = calculateTotalPoints(dealerHands);
      while (dealerTotalPoints < 17) {
        dealerHands.push(shuffledDeck.pop());
        dealerTotalPoints = calculateTotalPoints(dealerHands);
      }
      if (
        playerTotalPoints == dealerTotalPoints ||
        (playerTotalPoints > 21 && dealerTotalPoints > 21)
      ) {
        ouputMessage = `${displayHands(
          playerHands,
          dealerHands
        )}<br>${displayTotalPoints(
          playerTotalPoints,
          dealerTotalPoints
        )}<br><br>It is a tie!`;
      } else if (
        (playerTotalPoints > dealerTotalPoints && playerTotalPoints <= 21) ||
        (playerTotalPoints <= 21 && dealerTotalPoints > 21)
      ) {
        ouputMessage = `${displayHands(
          playerHands,
          dealerHands
        )}<br>${displayTotalPoints(
          playerTotalPoints,
          dealerTotalPoints
        )}<br><br>Player wins!`;
      } else {
        ouputMessage = `${displayHands(
          playerHands,
          dealerHands
        )}<br>${displayTotalPoints(
          playerTotalPoints,
          dealerTotalPoints
        )}<br><br>Dealer wins!`;
      }
      // reset back to game state 1 and reset the array
      currentGameState = gameState1;
      playerHands = [];
      dealerHands = [];
    }

    return ouputMessage;
  }
};

// Function to generate a deck
function deckMaker() {
  // collect data of generated card
  let cardDeck = [];
  // Four suits to be generated in a deck
  let cardSuits = ["hearts", "diamonds", "clubs", "spades"];
  let suitIndex = 0;
  while (suitIndex < cardSuits.length) {
    let currentSuits = cardSuits[suitIndex];
    // Each suits has 13 cards, value starts from 1 to 13.
    let cardValue = 1;
    // create a loop within a loop
    // when the cardValue is 1, change the cardname to "ace", 11 => "jack", 12 => "queen", 13 =>"king"
    while (cardValue <= 13) {
      let cardName = cardValue;
      if (cardValue == 1) {
        cardName = "ace";
      } else if (cardValue == 11) {
        cardName = "jack";
      } else if (cardValue == 12) {
        cardName = "queen";
      } else if (cardValue == 13) {
        cardName = "king";
      }
      // create a card with objects "name", "rank", "suits".
      let card = {
        name: cardName,
        value: cardValue,
        suits: currentSuits,
      };
      // push the card data in objects into cardDeck
      cardDeck.push(card);
      // After the card being pushed to cardDeck array, the cardValue increases 1 to run loop until 13.
      cardValue += 1;
    }
    // After 13 cards generated, the suitIndex will increase 1 to generate the remaining sets of suits.
    suitIndex += 1;
  }
  return cardDeck;
}

// Create a set of deck with the function deckMaker.
let deck = deckMaker();

// Function to change the value of jack queen and king to 10.
function newDeck(cards) {
  for (i = 0; i < 52; i++) {
    let currCard = cards[i];
    if (currCard.value == 11 || currCard.value == 12 || currCard.value == 13) {
      currCard.value = 10;
    }
  }
  return cards;
}

//  New valued deck.
let newValuedDeck = newDeck(deck);

// Create a function to generate random index.
function getRandomIndex(size) {
  return Math.floor(Math.random() * size);
}

// Create a function to shuffle the deck.
function shuffleCards(cardDeck) {
  let currentIndex = 0;
  // Loop over the card deck array once
  while (currentIndex < cardDeck.length) {
    // generate a random index using the the getRandomIndex function
    let randomIndex = getRandomIndex(cardDeck.length);
    let randomCard = cardDeck[randomIndex];
    let currentCard = cardDeck[currentIndex];
    // Swap the card to make the current card into random card by using randomIndex
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
}

// Declare a new variable to communicate that we have shuffled the deck.
let shuffledDeck = shuffleCards(newValuedDeck);

// function to check blackJack
function checkForBlackJack(handsArray) {
  let playerCard1 = handsArray[0];
  let playerCard2 = handsArray[1];
  let isBlackJack = false;
  if (
    (playerCard1.name == "ace" && playerCard2.value >= 10) ||
    (playerCard2.name == "ace" && playerCard1.value >= 10)
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
}

// function to check the total points
function calculateTotalPoints(handsArray) {
  let totalPoints = 0;
  let aceCounter = 0;
  let i = 0;
  while (i < handsArray.length) {
    let currCard = handsArray[i];
    if (currCard.name == "ace") {
      totalPoints = totalPoints + 11;
      aceCounter += 1;
    } else {
      totalPoints = totalPoints + currCard.value;
    }
    i += 1;
  }
  i = 0;
  while (i < aceCounter) {
    if (totalPoints > 21) {
      totalPoints = totalPoints - 10;
    }
    i += 1;
  }
  return totalPoints;
}
// function to display player and dealer hands
function displayHands(playerHands, dealerHands) {
  let playerMessage = `Player Hand: <br>`;
  let index = 0;
  while (index < playerHands.length) {
    playerMessage =
      playerMessage +
      `${playerHands[index].name} of ${playerHands[index].suits}` +
      "<br>";
    index += 1;
  }
  index = 0;
  let dealerMessage = `Dealer Hand: <br>`;
  while (index < dealerHands.length) {
    dealerMessage =
      dealerMessage +
      `${dealerHands[index].name} of ${dealerHands[index].suits}` +
      "<br>";
    index += 1;
  }
  return playerMessage + "<br>" + dealerMessage;
}
// function to display player and dealer hands value
function displayTotalPoints(playerHandsValue, dealerHandsValue) {
  let totalPointsMessage =
    `<br> Player total hand value:` +
    playerHandsValue +
    `<br> Dealer total hand value:` +
    dealerHandsValue;
  return totalPointsMessage;
}
