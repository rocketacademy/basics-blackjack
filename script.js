//****** Card Deck Generation with Loops **********/
//
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
        cardName = "A";
      } else if (cardName == 11) {
        cardName = "J";
      } else if (cardName == 12) {
        cardName = "Q";
      } else if (cardName == 13) {
        cardName = "K";
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

// ********* Card Shuffling ************//
//
// Get a random index ranging from 0 (inclusive) to max (exclusive).
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

// ********* Calculate the score of a hand ************//
//
function getScore(hand) {
  var score = 0;
  var hasAce = false;

  for (var i = 0; i < hand.length; i++) {
    var card = hand[i];
    if (card === "A") {
      score += 11;
      hasAce = true;
    } else if (card === "K" || card === "Q" || card === "J") {
      score += 10;
    } else {
      score += parseInt(card);
    }
  }

  if (score > 21 && hasAce) {
    score -= 10;
  }

  return score;
}

//  ************ Function that checks a hand for black jack  ************ //
var checkForBlackJack = function (handArray) {
  // Loop through player hand
  // if there is a blackjack return true
  // else return false
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  // Possible black jack scenerios
  // First card is Ace +  Second card is 10 or suits
  // Second card is Ace +  First card is 10 or suits
  if (
    (playerCardOne.name == "A" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "A" && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  }

  return isBlackJack;
};

// *****************************************//
// Game modes
var GAME_MODE_START = "GAME_MODE_START";
var GAME_MODE_PLAYER_HIT_STAND = "GAME_MODE_PLAYER_HIT_STAND";
var GAME_MODE_END = "GAME_MODE_END";

// Initialise the game to start
var gameMode = GAME_MODE_START;
var playerHand = [];
var dealerHand = [];
var playerScore;
var dealerScore;
var shuffledDeck = [];

// ************ Main function *****************************//
//
var main = function (input) {
  var myOutputValue = "Here you go:";
  // Start the game
  if (gameMode === GAME_MODE_START) {
    // generate the deck and shuffule it
    var deck = makeDeck();
    shuffledDeck = shuffleCards(deck);
    playerHand = [];
    dealerHand = [];
    // Draw 4 cards from the top of the deck
    var userCard1 = shuffledDeck.pop();
    var computerCard1 = shuffledDeck.pop();
    var userCard2 = shuffledDeck.pop();
    var computerCard2 = shuffledDeck.pop();

    // Deal initial cards
    playerHand.push(userCard1.name);
    dealerHand.push(computerCard1.name);
    playerHand.push(userCard2.name);
    dealerHand.push(computerCard2.name);

    playerScore = getScore(playerHand);
    dealerScore = getScore(dealerHand);

    console.log("Player's hand: " + playerHand.join(" "));
    console.log("Dealer's hand: " + dealerHand.join(" "));
    console.log("Player's score: " + playerScore);
    console.log("Dealer's score: " + dealerScore);

    // check for blackjack

    var userCards = [userCard1, userCard2];
    console.log(userCards);
    var computerCards = [computerCard1, computerCard2];
    console.log(computerCards);
    var playerHasBlackJack = checkForBlackJack(userCards);
    var dealerHasBlackJack = checkForBlackJack(computerCards);

    console.log("Does Player have Black Jack? ==>", playerHasBlackJack);
    console.log("Does Dealer have Black Jack? ==>", dealerHasBlackJack);

    // Condition when either player or dealer has black jack
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      // Condition where both have black jack
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        myOutputValue =
          myOutputValue +
          "<br> --------------------------------------------------" +
          "<br>As of now, Player drew the cards: " +
          playerHand +
          "<br> Player Score is " +
          playerScore +
          "<br> --------------------------------------------------" +
          "<br>As of now, Dealer drew the cards: " +
          dealerHand +
          "<br> Dealer Score is " +
          dealerScore +
          "<br> --------------------------------------------------" +
          "<br>Its a Black Jack Tie!";
      }
      // Condition when only player has black jack
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        myOutputValue =
          myOutputValue +
          "<br> --------------------------------------------------" +
          "<br>As of now, Player drew the cards: " +
          playerHand +
          "<br> Player Score is " +
          playerScore +
          "<br> --------------------------------------------------" +
          "<br>As of now, Dealer drew the cards: " +
          dealerHand +
          "<br> Dealer Score is " +
          dealerScore +
          "<br> --------------------------------------------------" +
          "<br>Player wins by Black Jack!";
      }
      // Condition when only dealer has black jack
      else {
        myOutputValue =
          myOutputValue +
          "<br> --------------------------------------------------" +
          "<br>As of now, Player drew the cards: " +
          playerHand +
          "<br> Player Score is " +
          playerScore +
          "<br> --------------------------------------------------" +
          "<br>As of now, Dealer drew the cards: " +
          dealerHand +
          "<br> Dealer Score is " +
          dealerScore +
          "<br> --------------------------------------------------" +
          "<br>Dealer wins by Black Jack!";
      }
    }

    // Condition where neither player nor dealer has black jack
    // ask player to input 'hit' or 'stand'
    else {
      myOutputValue =
        myOutputValue +
        "<br> --------------------------------------------------" +
        "<br>As of now, Player drew the cards: " +
        playerHand +
        "<br> Player Score is " +
        playerScore +
        "<br> --------------------------------------------------" +
        "<br>As of now, Dealer drew the cards: " +
        dealerHand +
        "<br> Dealer Score is " +
        dealerScore +
        "<br> --------------------------------------------------" +
        "<br> <br> There are no Black Jacks. Well done, Player! Do you want to hit or stand? Please type in hit or stand to continue!";

      // update gameMode
      gameMode = GAME_MODE_PLAYER_HIT_STAND;
    }
    // Return the fully-constructed output string
    return myOutputValue;
  }

  // Player's turn: to Hit or Stand
  if (gameMode === GAME_MODE_PLAYER_HIT_STAND) {
    var playerInput = input;
    if (playerInput === "hit") {
      var userCard3 = shuffledDeck.pop();
      playerHand.push(userCard3.name);
      playerScore = getScore(playerHand);
      console.log("Player's hand: " + playerHand.join(" "));
      console.log("Player's score: " + playerScore);
    } else if (playerInput === "stand") {
      playerScore = getScore(playerHand);
      console.log("Player's hand: " + playerHand.join(" "));
      console.log("Player's score: " + playerScore);
      //break;
    } else {
      return "Error! Please type in hit or stand to continue";
    }

    // Dealer's turn
    // The dealer decides to hit or stand automatically based on game rules.
    console.log("Dealer's hand: " + dealerHand.join(" "));
    if (dealerScore < 17) {
      var dealerCard3 = shuffledDeck.pop();
      dealerHand.push(dealerCard3.name);
      dealerScore = getScore(dealerHand);
      console.log("Dealer's hand: " + dealerHand.join(" "));
      console.log("Dealer's score: " + dealerScore);
    }

    myOutputValue =
      myOutputValue +
      "<br> --------------------------------------------------" +
      "<br>Now, Player is having the cards: " +
      playerHand +
      "<br> Player Score is " +
      playerScore +
      "<br> --------------------------------------------------" +
      "<br> Please click the Submit button to view the results!";
    gameMode = GAME_MODE_END;
    return myOutputValue;
  }

  // Determine the winner and end the current game
  while (gameMode === GAME_MODE_END) {
    var results = "";
    if (dealerScore > 21 && playerScore > 21) {
      results = "Both Dealer and Player bust! It is a tie!";
    } else if (dealerScore > 21 && playerScore <= 21) {
      results = "Dealer Bust! Player win!";
    } else if (dealerScore <= 21 && playerScore > 21) {
      results = "Player bust! Dealer win!";
    } else if (dealerScore > playerScore) {
      results = "Dealer win!";
    } else if (dealerScore < playerScore) {
      results = "Player win!";
    } else if (dealerScore == playerScore) {
      results = "It is a tie!";
    }

    //
    console.log("Player's hand: " + playerHand.join(" "));
    console.log("Player's score: " + playerScore);
    console.log("Dealer's hand: " + dealerHand.join(" "));
    console.log("Dealer's score: " + dealerScore);

    myOutputValue =
      myOutputValue +
      "<br>" +
      "<br> --------------------------------------------------" +
      "<br> Player drew the cards: " +
      playerHand +
      "<br> Player Score is " +
      playerScore +
      "<br> --------------------------------------------------" +
      "<br> Dealer drew the cards: " +
      dealerHand +
      "<br> Dealer Score is " +
      dealerScore +
      "<br> --------------------------------------------------" +
      "<br>" +
      results +
      "<br> Please click the Submit the button to start a new game!";
    gameMode = GAME_MODE_START;
    return myOutputValue;
  }
};
