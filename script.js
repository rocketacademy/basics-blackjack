// card variables
var playerCards = [];
var playerCardsRank = [];
var dealerCards = [];
var dealerCardsRank = [];

// game modes
var gameStart = "game start";
var cardsDrawn = "cards drawn";
var resultsDisplayed = 'results displayed';
var HitOrStand = 'hit or stand';
var currentGameMode = gameStart;

// function to generate random number; to be used in shuffleCards function
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

// create deck of 52 cards
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥ hearts ♥", "♦ diamonds ♦", "♣ clubs ♣", "♠ spades ♠"];
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

// helper function to calculate total hand value
var calculateTotalHandValue = function (hand) {
  var totalHandValue = 0;
  //counter for Ace(s) drawn
  var numAce = 0;

  // Loop hands to calculate rank
  var index = 0;
  while (index < hand.length) {
    var currCard = hand[index];
    // values of picture cards are not the same as the incremental rank displayed in cardDeck 
    // i.e. they have a rank of 10, and not 11,12,13 respectively
    if (currCard.name == 'king' || currCard.name == 'queen' || currCard.name == 'jack') {
      totalHandValue = totalHandValue + 10;
    }
    // value of ace not the same as rank in cardDeck 
    // i.e. aces can present as 11 in blackjack
    else if (currCard.name == 'ace' && hand.length < 3) {
      totalHandValue = totalHandValue + 11;
      numAce = numAce + 1;
    } else {
      totalHandValue = totalHandValue + currCard.rank;
    }
    index = index + 1;
  }
  
  // Reset index for ace counter
  index = 0;
  // Ace can only be presented as 11 when there are only 2 cards 
  // i.e. if 3 cards, ace can only be presented as 1 and not 11. 
  while (index < numAce) {
    if (totalHandValue > 21 || hand.length < 3) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }

  return totalHandValue;
};

// helper function to check for blackjack in either hands
var checkBlackJack = function (playerHandArray) {
  
  var playerCardOne = playerHandArray[0];
  var playerCardTwo = playerHandArray[1];
  console.log(playerHandArray)
  console.log(playerCardOne)
  console.log(playerCardTwo)
  var isBlackJack = false;

  // Possible blackjack scenerios; return true if blackjack present
  if (  
    (playerCardOne.name == 'ace' && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == 'ace' && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  }

  return isBlackJack;
}

// helper function to show player and dealer hands
var showHands = function (playerHandArray, dealerHandArray) {
  var playerHandStr = "Player's hand 🤚 :<br>";
  var playerIndex = 0;
  while (playerIndex < playerHandArray.length) {
    playerHandStr = playerHandStr + '- ' + playerHandArray[playerIndex].name + " of " + playerHandArray[playerIndex].suit + "<br>";
    playerIndex = playerIndex + 1;
  }

  var dealerIndex = 0;
  var dealerHandStr= "Dealer's hand 🤚 :<br>";
  while (dealerIndex < dealerHandArray.length) {
    dealerHandStr = dealerHandStr + "- " + dealerHandArray[dealerIndex].name + " of " + dealerHandArray[dealerIndex].suit + "<br>";
    dealerIndex = dealerIndex + 1;
  }

  return playerHandStr + '<br>' + dealerHandStr;
};

//function to count player and dealer hand value
var countHandValues = function (playerHandValue, dealerHandValue) {
  var HandValuesStr = "<br>Player total hand value: " + playerHandValue + "<br>Dealer total hand value: " + dealerHandValue;
  return HandValuesStr;
};

//main function
var main = function (input) {
  var myOutputValue = ""
  var shuffledCards = shuffleCards(makeDeck());
  if (currentGameMode == gameStart){
    playerCards.push(shuffledCards.pop());
    dealerCards.push(shuffledCards.pop());
    playerCards.push(shuffledCards.pop());
    dealerCards.push(shuffledCards.pop());
    currentGameMode = cardsDrawn;
    console.log(playerCards, dealerCards)
    myOutputValue = "Cards have been drawn. Click 'submit' to determine total value."
    return myOutputValue
  }
  if (currentGameMode == cardsDrawn) {
    //  reminder that checkBlackJack function returns true or false
    var playerBlackJack = checkBlackJack(playerCards);
    var dealerBlackJack = checkBlackJack(dealerCards);
    console.log("player has blackjack 🃏: " + playerBlackJack + "</br>" 
                + "dealer has blackjack 🃏: " + dealerBlackJack)
    if (playerBlackJack === true || dealerBlackJack === true){
      if (playerBlackJack === true && dealerBlackJack === true){
        myOutputValue = showHands(playerCards,dealerCards) + "<br> both players have a black jack 🃏. It's a tie!"
      }
      else if (playerBlackJack === true && dealerBlackJack === false){
        myOutputValue = showHands(playerCards,dealerCards) + "<br> Player has a black jack 🃏. Player wins!"
      }
      else {
        myOutputValue = showHands(playerCards,dealerCards) + "<br> Dealer has a black jack 🃏. Dealer wins!"
      }
    }  
    else {
      myOutputValue = showHands(playerCards,dealerCards) + "<br> no one has a black jack 🃏. Please input 'hit' or 'stand'."
      currentGameMode = HitOrStand
    }
    return myOutputValue;
    }
  // conditionals for user hit and stand 
  if (currentGameMode == HitOrStand){
    // user chooses to hit
    if (input == "hit"){
      playerCards.push(shuffledCards.pop());
      myOutputValue = showHands(playerCards, dealerCards) + '<br> You drew another card. <br>Please input "hit" or "stand".';
    }
    // user chooses to stand >>  dealer's turn to hit or stand
    else if (input == "stand") {
      var playerCardsTotalValue = calculateTotalHandValue(playerCards);
      var dealerCardsTotalValue = calculateTotalHandValue(dealerCards);
      // dealer will automatically draw one more card if total value is <= 16
      while (dealerCardsTotalValue <= 16) {
        dealerCards.push(shuffledCards.pop());
        dealerCardsTotalValue = calculateTotalHandValue(dealerCards);
      }
      // draw scenario
      if (playerCardsTotalValue == dealerCardsTotalValue) {
        myOutputValue = showHands(playerCards, dealerCards) + "<br>Both players have the same value. It's a draw." + countHandValues(playerCardsTotalValue, dealerCardsTotalValue) +
        "<br> <br> <br> Game over. Please press submit to start a new game."; 
    } 
      if (playerCardsTotalValue > 21 && dealerCardsTotalValue > 21) {
          myOutputValue = showHands(playerCards, dealerCards) + "<br>Both players exceeded 21. It's a draw." + countHandValues(playerCardsTotalValue, dealerCardsTotalValue) +
          "<br> <br> <br> Game over. Please press submit to start a new game.";
      } 
      // player win scenario
      else if ((playerCardsTotalValue > dealerCardsTotalValue && playerCardsTotalValue <= 21) ||
                (playerCardsTotalValue <= 21 && dealerCardsTotalValue > 21)) { 
                myOutputValue = showHands(playerCards, dealerCards) + "<br>Player wins!" + countHandValues(playerCardsTotalValue, dealerCardsTotalValue) +
                "<br> <br> <br> Game over. Please press submit to start a new game.";
      } 
      // dealer win scenario
      else {
        myOutputValue = showHands(playerCards, dealerCards) + "<br>Dealer wins!" + countHandValues(playerCardsTotalValue, dealerCardsTotalValue) +
        "<br> <br> <br> Game over. Please press submit to start a new game.";
      }
    }
    // possibility of scenario where user input is neither hit or stand
    else {
      myOutputValue = 'Only "hit" or "stand" valid. Please input again. <br><br>' + showHands(playerCards, dealerCards);
    }
    return myOutputValue;
    }
}