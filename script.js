var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var emoji = ["♥", "♦", "♣", "♠"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var currentEmoji = emoji[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
        emoji: currentEmoji,
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

// Creates a shuffled deck variable
var shuffledDeck = shuffleCards(makeDeck());

var gameMode = "start";

var dealerArr = [];
var playerArr = [];
var playerValue = 0;
var dealerValue = 0;

var reset = function () {
  gameMode = "start";
  dealerArr = [];
  playerArr = [];
  playerValue = 0;
  dealerValue = 0;
  shuffledDeck = shuffleCards(makeDeck());
  return `Welcome to M's Cards! Click the submit button to get started!`;
};

var addCards = function (cards) {
  //console.log(cards);
  var result = Number();
  var i = 0;
  while (i < cards.length) {
    var currentCard = cards[i];
    result += Number(currentCard.value);
    i += 1;
  }
  //variable ace 1 or 11
  for (var j = 0; j < cards.length; j += 1) {
    if (cards[j].name == "Ace") {
      //cardValue = 11;
      if (result + 10 > 21) {
        break;
      } else {
        result += 10;
      }
    }
  }
  return result;
};

var checkBlack = function (player, dealer) {
  var playerValue = addCards(player);
  //console.log(playerValue);
  var dealerValue = addCards(dealer);
  //console.log(dealerValue);

  if (playerValue == 21 && dealerValue != 21) {
    gameMode = "play again";
    return `You got a blackjack. You win! Click Submit to play again.`;
  } else if (playerValue != 21 && dealerValue == 21) {
    gameMode = "play again";
    return `Dealer got blackjack. You lose :c Click Submit to play again.`;
  } else if (playerValue == 21 && dealerValue == 21) {
    gameMode = "play again";
    return `Both player and dealer got blackjack. Its a draw. Click Submit to play again.`;
  } else {
    return `You drew ${player[0].name}${player[0].emoji} for your first card and ${player[1].name}${player[1].emoji} for your second card. 
    <br>
    <br>
    Your total value is ${playerValue}.
    <br>
    <br>
    Dealer drew ${dealer[1].name}${dealer[1].emoji} for the second card
    <br>
    <br>
    Type "h" to hit or "s" to stand.`;
  }
};

var checkResults = function (player, dealer) {
  var playerValue = addCards(player);
  var dealerValue = addCards(dealer);
  if (playerValue > dealerValue) {
    return `Congratulations. You have won. <br><br>Click submit to play again`;
  } else if (dealerValue > playerValue) {
    return `Sorry, you have lost. <br><br>Click submit to play again`;
  } else if (playerValue == dealerValue) {
    return `Its a draw. <br><br>Click submit to play again`;
  }
};

var main = function (input) {
  //Start of the game
  if (gameMode == "start") {
    var dealerCard1 = shuffledDeck.pop();
    var dealerCard2 = shuffledDeck.pop();
    dealerArr.push(dealerCard1);
    dealerArr.push(dealerCard2);
    console.log(dealerArr);
    var playerCard1 = shuffledDeck.pop();
    var playerCard2 = shuffledDeck.pop();
    playerArr.push(playerCard1);
    playerArr.push(playerCard2);
    console.log(playerArr);
    gameMode = "choose";
    return checkBlack(playerArr, dealerArr);
    //Player's turn
  } else if (gameMode == "choose") {
    input = input.toLowerCase();
    if (input == "h") {
      playerArr.push(shuffledDeck.pop());
      playerValue = addCards(playerArr);
      console.log(playerArr);
      if (playerValue > 21) {
        gameMode = "play again";
        return `You have drawn ${playerArr[playerArr.length - 1].name}${
          playerArr[playerArr.length - 1].emoji
        }.
        <br>
        Your total value is now ${playerValue}.
        <br>Sorry you have exceeded 21 points. You bust! 
        <br>Click Submit to play again`;
      } else {
        return `You have drawn ${playerArr[playerArr.length - 1].name}${
          playerArr[playerArr.length - 1].emoji
        }.
        <br>
        Your total value is now ${playerValue}.
        <br>
        Type h to hit and s to stand.`;
      }
    } else if (input == "s") {
      gameMode = "dealer turn";
      return `You have chose to stand. 
      <br><br>It is the dealer's turn now. 
      <br><br>Click Submit to proceed.`;
    } else {
      return `Please enter a valid command ("h" or "s")`;
    }
    // Dealer's turn
  } else if (gameMode == "dealer turn") {
    dealerValue = addCards(dealerArr);
    var drawCount = 0;
    while (dealerValue < 17) {
      dealerArr.push(shuffledDeck.pop());
      dealerValue = addCards(dealerArr);
      drawCount += 1;
      console.log(dealerArr);
      console.log(dealerValue);
    }
    if (dealerValue > 21) {
      gameMode = "play again";
      return `Dealer points is now ${dealerValue} and bust. You win! <br><br>Click Submit to play again.`;
    } else {
      gameMode = "results";
      return `Dealer drawn ${drawCount} card(s). Dealer's card total value is ${dealerValue} now. <br><br>Click submit to continue.`;
    }
    //Check results
  } else if (gameMode == "results") {
    gameMode = "play again";
    return checkResults(playerArr, dealerArr);
  } else if (gameMode == "play again") {
    return reset();
  }
};
