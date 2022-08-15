/*
Basics - Blackjack

~Base~
1. There will be only two players. One human and one computer (for the Base solution).
2. The computer will always be the dealer.
3. Each player gets dealt two cards to start.
4. The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
5. The dealer has to hit if their hand is below 17.
6. Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
7. The player who is closer to, but not above 21 wins the hand.

Output:
1. Each player gets 2 cards
2. Player wins:
    i.    Blackjack
    ii.   More points than computer
    iii.  Computer more than 21 points
3. Computer wins:
    i.    Blackjack
    ii.   More points than player
    iii.  Player more than 21 points
4. Or tie

Helper Functions:
1. Make deck => makedeck
2. Shuffle deck
3. Deal cards
4. Blackjack
5. Display hands
6. Compare hands by total value

Global Variables
1. Game modes
    i.    game start
    ii.   cards drawn
    iii.  compare hands
    iv.   hit or stand
2. Arrays
    i.    Player hand
    ii.   Computer hand
    iii.  Game deck

*/

// Global Variables
// Game modes
var GAME_START = `Game start`;
var CARDS_DEALT = `Cards dealt`;
var HIT_OR_STAND = `Hit or stand`;
var COMPARE_HANDS = `Compare hands`;
var CURRENT_GAME_MODE = GAME_START;

// Arrays
var playerHands = [];
var computerHands = [];

/* ================================================ */
/* ===== Making of Deck ===== */
/* ================================================ */
// Game deck suits and ranks
var makeDeck = function () {
  var deck = [];

  // Loop 1 => to determine suits (Hearts, Diamonds, Clubs, Spades)
  var suitIndex = 0;
  var suits = [`Hearts ♥️`, `Diamonds ♦️`, `Clubs ♣`, `Spades ♠`];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    // To check on the suits
    // console.log(`current suit`, currentSuit);

    // Loop 2 => Determine ranks and rename ranks 1, 11, 12, 13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      // 1, 11, 12, 13
      if (cardName == 1) {
        cardName = `Ace`;
      } else if (cardName == 11) {
        cardName = `Jack`;
      } else if (cardName == 12) {
        cardName = `Queen`;
      } else if (cardName == 13) {
        cardName = `King`;
      }
      // Card object (name, suit, rank)
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // To check on the ranks
      // console.log(`rank`, rankCounter);
      deck.push(card);
      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  return deck;
};

// Generates random number used in the shuffleCards function for it to swap positions of currentCard and randomCard
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
// Shuffle the elements in the cardDeck array
var shuffleCards = function (cards) {
  // Loop over the card deck array once
  var cardIndex = 0;
  while (cardIndex < cards.length) {
    var currentCard = cards[cardIndex];
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cards.length);
    var randomCard = cards[randomIndex];

    // Swap positions of currentCard and randomCard in the deck
    cards[cardIndex] = randomCard;
    cards[randomIndex] = currentCard;

    cardIndex = cardIndex + 1;
  }
  return cards;
};

// Shuffle the deck, shuffleCards and save it in a new variable, shuffledDeck
var shuffledDeck = shuffleCards(makeDeck());

/* ================================================ */
/* ==== Game Helper Functions ==== */
/* ================================================ */
// Checking for Blackjack
var checkBlackJack = function (handsArray) {
  var cardOne = handsArray[0];
  var cardTwo = handsArray[1];
  // Setting Blackjack scenario as default, false
  var blackJack = false;

  if (
    // If cardOne = Ace & cardTwo rank is 10 or suits
    // If cardTwo = Ace & cardOne rank is 10 or suits
    (cardOne.name == `Ace` && cardTwo.rank >= 10) ||
    (cardTwo.name == `Ace` && cardOne.rank >= 10)
  ) {
    // BlackJack is true
    blackJack = true;
  }
  return blackJack;
};

// Function to display both player and computer hands using while loop
/* Additional arrays
      i.  playerHandArray
      ii. computerHandArray
*/
var displayHands = function (playerHandArray, computerHandArray) {
  // Display player's hands, x2 cards
  var displayPlayerHands = `Player's hands: <br>`;
  var index = 0;
  while (index < playerHandArray.length) {
    displayPlayerHands = `${displayPlayerHands} ${playerHandArray[index].name} of ${playerHandArray[index].suit} <br>`;

    console.log(`Display Player Hands`, displayPlayerHands);
    index = index + 1;
  }
  // Display computer's hands, x2 cards
  index = 0;
  var displayComputerHands = `Computer's hands: <br>`;
  while (index < computerHandArray.length) {
    displayComputerHands = `${displayComputerHands} ${computerHandArray[index].name} of ${computerHandArray[index].suit} <br>`;

    console.log(`Display Computer Hands`, displayComputerHands);
    index = index + 1;
  }
  var displayMessage = `${displayPlayerHands} <br> ${displayComputerHands}`;
  return displayMessage;
};

// Function to add total value of both cards for each hand
var totalValue = function (valueArray) {
  var totalCardsValue = 0;
  var aceCounter = 0;
  // Loop to add both card values together
  var valueCounter = 0;
  while (valueCounter < valueArray.length) {
    // Getting value of the card depending on their rank
    var cardValue = valueArray[valueCounter];
    // Jack, Queen, King are worth 10 points each
    if (
      cardValue.name == `Jack` ||
      cardValue.name == `Queen` ||
      cardValue.name == `King`
    ) {
      totalCardsValue = totalCardsValue + 10;
    }
    // If there is Ace at hand
    else if (cardValue.name == `ace`) {
      totalCardsValue = totalCardsValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalCardsValue = totalCardsValue + cardValue.rank;
    }
    valueCounter = valueCounter + 1;
  }

  // Reusing the valueCounter for another while loop
  // This while loop is to ensure that Ace is counted as 1 if the total value is more than 21
  valueCounter = 0;
  while (valueCounter < aceCounter) {
    if (totalCardsValue > 21) {
      totalCardsValue = totalCardsValue - 10;
    }
    valueCounter = valueCounter + 1;
  }

  return totalCardsValue;
};

/* ================================================ */
/* ==== Base Game - BlackJack w/o Hit or Stand ==== */
/* ================================================ */
var main = function (input) {
  var outputMessage = "";

  if (CURRENT_GAME_MODE == GAME_START) {
    // Deal 2 cards
    playerHands.push(shuffledDeck.pop());
    computerHands.push(shuffledDeck.pop());
    playerHands.push(shuffledDeck.pop());
    computerHands.push(shuffledDeck.pop());
    // Check hands
    console.log(`Player hands`, playerHands);
    console.log(`Computer hands`, computerHands);

    // Change game mode to CARDS_DRAWN
    CURRENT_GAME_MODE = CARDS_DEALT;
  }
  if (CURRENT_GAME_MODE == CARDS_DEALT) {
    // Calling checkBlackJack function for both player and computer
    var playerBlackjack = checkBlackJack(playerHands);
    var computerBlackjack = checkBlackJack(computerHands);

    console.log(`Does Player have BlackJack? ==?`, playerBlackjack);
    console.log(`Does Computer have BlackJack? ==?`, computerBlackjack);

    // Check for Blackjack scenario
    if (playerBlackjack == true || computerBlackjack == true) {
      if (computerBlackjack == true && playerBlackjack == true) {
        outputMessage = `${displayHands(
          playerHands,
          computerHands
        )} <br> It's a tie! Both you and the computer got Blackjack!`;
      } else if (playerBlackjack == true && computerBlackjack == false) {
        outputMessage = `${displayHands(
          playerHands,
          computerHands
        )} <br> You won by Blackjack!`;
      } else {
        outputMessage = `${displayHands(
          playerHands,
          computerHands
        )} <br> Computer won by Blackjack!`;
      }
      playerHands = [];
      computerHands = [];
      CURRENT_GAME_MODE = GAME_START;
      outputMessage = `${outputMessage} <br><br> Click on submit again to deal a new hand of cards.`;
      return outputMessage;
    }

    // If no one has Blackjack, game continues
    else {
      var playerTotalValue = totalValue(playerHands);
      var computerTotalValue = totalValue(computerHands);

      console.log(`Player's hands total value`, playerTotalValue);
      console.log(`Computer's hands total value`, computerTotalValue);

      if (computerTotalValue > playerTotalValue) {
        outputMessage = `${displayHands(
          playerHands,
          computerHands
        )} <br> Your total points are: ${totalValue(
          playerHands
        )} <br> The computer total points are: ${totalValue(computerHands)}`;
      } else if (playerTotalValue > computerTotalValue) {
        outputMessage = `${displayHands(
          playerHands,
          computerHands
        )} <br> Your total points are: ${totalValue(
          playerHands
        )} <br> The computer total points are: ${totalValue(computerHands)}`;
      } else {
        outputMessage = `${displayHands(
          playerHands,
          computerHands
        )} <br> Your total points are: ${totalValue(
          playerHands
        )} <br> The computer total points are: ${totalValue(computerHands)}`;
      }
      outputMessage = `${outputMessage} <br><br> Do you wish to hit or stand?`;
      CURRENT_GAME_MODE = HIT_OR_STAND;
      return outputMessage;
    }
  }
  // Hit or stand
  if (CURRENT_GAME_MODE == HIT_OR_STAND) {
    // player hit
    if (input == `hit`) {
      playerHands.push(shuffledDeck.pop());
      outputMessage = `You drew a card <br><br> ${displayHands(
        playerHands,
        computerHands
      )} <br><br> Your total points are: ${totalValue(
        playerHands
      )} <br> The computer total points are: ${totalValue(
        computerHands
      )} <br><br> Do you wish to continue to hit or stand?`;

      // Player stand
    } else if (input == `stand`) {
      var playerTotalValue = totalValue(playerHands);
      var computerTotalValue = totalValue(computerHands);

      // Computer draws if total card value less than 17
      while (computerTotalValue < 17) {
        computerHands.push(shuffledDeck.pop());
        computerTotalValue = totalValue(computerHands);
      }

      // If Player total value and Computer total value are equal
      if (playerTotalValue == computerTotalValue) {
        outputMessage = `${displayHands(
          playerHands,
          computerHands
        )} <br> Your total points are: ${totalValue(
          playerHands
        )} <br> The computer total points are: ${totalValue(
          computerHands
        )} <br><br> It's a tie!`;
      }

      // Arrange logics such that scenarios when total value more than 21 loses
      // If both players total value more than 21 points
      else if (playerTotalValue > 21 && computerTotalValue > 21) {
        outputMessage = `${displayHands(
          playerHands,
          computerHands
        )} <br> Your total points are: ${totalValue(
          playerHands
        )} <br> The computer total points are: ${totalValue(
          computerHands
        )} <br><br> Both players burst! It's a tie!`;
        console.log(`Both players burst`);
      }

      // If player total value more than 21 points
      else if (playerTotalValue > 21) {
        outputMessage = `${displayHands(
          playerHands,
          computerHands
        )} <br> Your total points are: ${totalValue(
          playerHands
        )} <br> The computer total points are: ${totalValue(
          computerHands
        )} <br><br> You lost!`;
        console.log(`Player burst`);
      }

      // If computer total value more than 21 points
      else if (computerTotalValue > 21) {
        outputMessage = `${displayHands(
          playerHands,
          computerHands
        )} <br> Your total points are: ${totalValue(
          playerHands
        )} <br> The computer total points are: ${totalValue(
          computerHands
        )} <br><br> You won!`;
        console.log(`Computer burst`);
      }

      // If Computer total value is more than Player total value OR Player total value is more than 21 points
      else if (computerTotalValue > playerTotalValue) {
        outputMessage = `${displayHands(
          playerHands,
          computerHands
        )} <br> Your total points are: ${totalValue(
          playerHands
        )} <br> The computer total points are: ${totalValue(
          computerHands
        )} <br><br> You lost!`;
        console.log(`PC > Player`);
      }

      // If Player total value is more than Computer total value OR Computer total value is more than 21 points
      else if (playerTotalValue > computerTotalValue) {
        outputMessage = `${displayHands(
          playerHands,
          computerHands
        )} <br> Your total points are: ${totalValue(
          playerHands
        )} <br> The computer total points are: ${totalValue(
          computerHands
        )} <br><br> You won!`;
        console.log(`Player > PC`);
      }
      CURRENT_GAME_MODE = COMPARE_HANDS;
      outputMessage = `${outputMessage} <br><br> Click on submit to refresh.`;
    }
    // Make sure input is either "hit" or "stand" only
    else {
      outputMessage = `Sorry, please type in "hit" or "stand" to continue the game. <br><br> ${displayHands(
        playerHands,
        computerHands
      )} <br> Your total points are: ${totalValue(
        playerHands
      )} <br> The computer total points are: ${totalValue(computerHands)}`;
    }

    return outputMessage;
  }
  if ((CURRENT_GAME_MODE = COMPARE_HANDS)) {
    playerHands = [];
    computerHands = [];
    CURRENT_GAME_MODE = GAME_START;
    outputMessage = `Click on submit again to deal a new set of hands!`;
  }
  return outputMessage;
};
