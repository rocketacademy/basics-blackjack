/* 
Blackjack game:
Deck is shuffled.
User clicks Submit to deal cards.
The cards are analysed for game winning conditions, e.g. Blackjack.
The cards are displayed to the user.
The user decides whether to hit or stand, using the submit button to submit their choice.
The user's cards are analysed for winning or losing conditions.
The computer decides to hit or stand automatically based on game rules.
The game either ends or continues.
*/

var currentGameMode = "game start";

var playerHand = [];
var dealerHand = [];

// Initialises deck helper function
var makeDeck = function () {
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
};

// Shuffle deck helper function
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = Math.floor(Math.random() * cardDeck.length); // Selects an index from the length of card deck
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    //Swaps the current index of loop with a random card
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};

var checkForBlackjack = function (cardArray) {
  var cardOne = cardArray[0];
  var cardTwo = cardArray[1];
  var isBlackJack = false;

  if (
    (cardOne.name == "ace" && cardTwo.rank >= 10) ||
    (cardOne.rank >= 10 && cardTwo.name == "ace")
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
};

var scoreTotalRank = function (cardArray) {
  var score = 0;
  var index = 0;
  var aceIndex = 0;
  var aceCounter = 0;
  while (index < cardArray.length) {
    var currentCard = cardArray[index];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king" ||
      currentCard.name == "ace"
    ) {
      score = score + 10;
    } else if (currentCard.name == "ace") {
      score = score + 11;
      aceCounter = aceCounter + 1;
    } else {
      score = score + currentCard.rank;
    }
    index += 1;
  }

  while (aceIndex < aceCounter) {
    if (score > 21) {
      score = score - 10;
    }
    aceIndex += 1;
  }
  return score;
};

var createNewDeck = function () {
  return shuffleCards(makeDeck());
};

var main = function (input) {
  var outputMessage = "";
  //Deck created
  var gameDeck = createNewDeck();
  if (currentGameMode == "game start") {
    //Deal out cards
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    //Update game mode
    currentGameMode = "drawn";
    outputMessage = "Cards dealt";
    return outputMessage;
  }
  if (currentGameMode == "drawn") {
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);
    var winner = "";

    if (playerHasBlackjack == true && dealerHasBlackjack == true) {
      winner = "neither";
    }
    if (playerHasBlackjack == true && dealerHasBlackjack == false) {
      winner = "player";
    }
    if (dealerHasBlackjack == true && dealerHasBlackjack == false) {
      winner = "dealer";
    }
    if (dealerHasBlackjack == false && dealerHasBlackjack == false) {
      if (scoreTotalRank(playerHand) == scoreTotalRank(dealerHand)) {
        winner = "neither";
      } else if (
        scoreTotalRank(playerHand) > 21 &&
        scoreTotalRank(dealerHand) > 21
      ) {
        winner = "neither";
      } else if (
        scoreTotalRank(playerHand) <= 21 &&
        scoreTotalRank(dealerHand) >= 21
      ) {
        winner = "player";
      } else if (
        scoreTotalRank(playerHand) >= 21 &&
        scoreTotalRank(dealerHand) <= 21
      ) {
        winner = "dealer";
      } else if (scoreTotalRank(playerHand) > scoreTotalRank(dealerHand)) {
        winner = "player";
      } else {
        winner = "dealer";
      }
      playerCards = JSON.stringify(playerHand);
      dealerCards = JSON.stringify(dealerHand);
      outputMessage =
        "The outcome so far is that the winner is: " +
        winner +
        ". </br></br> Cards drawn for player are: </br>" +
        playerCards +
        ". </br></br> Cards drawn for dealer are: </br>" +
        dealerCards +
        ". </br></br> Player score: " +
        scoreTotalRank(playerHand) +
        ". </br></br> Dealer score: " +
        scoreTotalRank(dealerHand) +
        ". </br></br> Input 'hit' or 'stand'.";
      currentGameMode = "hit or stand";
      console.log("first round OK");
      return outputMessage;
    }
  }
  if (currentGameMode == "hit or stand") {
    console.log("Hit or stand mode working");
    if (input == "hit") {
      console.log("Hit mode working");
      playerHand.push(gameDeck.pop());
      outputMessage =
        "You drew another card" +
        ". </br></br> Cards drawn for player are: </br>" +
        JSON.stringify(playerHand) +
        ". </br></br> Cards drawn for dealer are: </br>" +
        JSON.stringify(dealerHand) +
        ". </br></br> Player score: " +
        scoreTotalRank(playerHand) +
        ". </br></br> Dealer score: " +
        scoreTotalRank(dealerHand) +
        ". </br></br> Input 'hit' or 'stand'.";
      return outputMessage;
    } else if (input == "stand") {
      console.log("Stand mode working");
      while (scoreTotalRank(dealerHand) < 17) {
        dealerHand.push(gameDeck.pop());
      }
      var playerHasBlackjack = checkForBlackjack(playerHand);
      var dealerHasBlackjack = checkForBlackjack(dealerHand);
      var winner = "";

      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        winner = "neither";
      }
      if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        winner = "player";
      }
      if (dealerHasBlackjack == true && dealerHasBlackjack == false) {
        winner = "dealer";
      }
      if (dealerHasBlackjack == false && dealerHasBlackjack == false) {
        if (scoreTotalRank(playerHand) == scoreTotalRank(dealerHand)) {
          winner = "neither";
        } else if (
          scoreTotalRank(playerHand) > 21 &&
          scoreTotalRank(dealerHand) > 21
        ) {
          winner = "neither";
        } else if (
          scoreTotalRank(playerHand) <= 21 &&
          scoreTotalRank(dealerHand) > 21
        ) {
          winner = "player";
        } else if (
          scoreTotalRank(playerHand) > 21 &&
          scoreTotalRank(dealerHand) <= 21
        ) {
          winner = "dealer";
        } else if (scoreTotalRank(playerHand) > scoreTotalRank(dealerHand)) {
          winner = "player";
        } else {
          winner = "dealer";
        }
        playerCards = JSON.stringify(playerHand);
        dealerCards = JSON.stringify(dealerHand);
        outputMessage =
          "The final outcome is that the winner is: " +
          winner +
          ". </br></br> Cards drawn for player are: </br>" +
          playerCards +
          ". </br></br> Cards drawn for dealer are: </br>" +
          dealerCards +
          ". </br></br> Player score: " +
          scoreTotalRank(playerHand) +
          ". </br></br> Dealer score: " +
          scoreTotalRank(dealerHand) +
          ". </br></br> Thank you for playing";
        return outputMessage;
      }
    } else {
      outputMessage = "Invalid input. Only 'hit' or 'stand' allowed.";
      return outputMessage;
    }
  }
};
