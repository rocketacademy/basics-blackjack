/**  NOTE: Focus on code functionality, rather than design interface, due to time and daily work
 *
 * Name:  Yalun, Class #26
 *
 * **/

// Declare constant values for blackjack gameplay
const DECK_SUITS = ["hearts", "diamonds", "clubs", "spades"];
const RANK_PER_SUIT = 13;
const BLACKJACK_CARDSIZE = 2;

// Loop to create all cards in this suit
// total rank per suit is 1-13, A, 1,2, 3.... K
var counter = 1; //start from 1 (A)

// The maximum  valid total sum in Blackjack is 21 and declare with a constant
const TWENTY_ONE = 21;

// For input declaration
var userName = "";
var mode = false;

// Dealer always draw cards until the total sum reaches greater than 16.
var dealerCardsHitThreshold = 16;

// If player choose to stand, then player can no longer draw cards until game over
var playerHasChosenToStand = false;

// To keep track on the update total sum from player and computer
var computerHandTotalSum = 0;
var playerHandTotalSum = 0;

// Keep track of the game and set to true when game over. Otherwise, continue the game while the flag status  as false.
var gameOver = false;

// Use separate empty arrays to store player's cards and computer's cards individually
var playerHand = [];
var computerHand = [];

var makeDeckSuit = function () {
  // create the empty deck at the beginning for creating current rank/counter
  var deck = []; //total 52 cards, 13 rank cards per suit
  var rankCounter = 0;
  var cardName = 0;
  var suitIndex = 0;
  var currentSuit = 0;

  //increment by 1 from suitIndex after completing rank 1-13 in each suit
  for (suitIndex = 0; suitIndex < DECK_SUITS.length; suitIndex++) {
    currentSuit = DECK_SUITS[suitIndex]; //keep track of current suit

    for (counter = 1; counter <= RANK_PER_SUIT; counter++) {
      rankCounter = counter;
      cardName = rankCounter; //keep track of current rank for replacement of 1, 11, 12, 13 for A, J, Q, K

      // 1, 11, 12 ,13
      // for BlackJack only, change the card rank per suit for the face cards except 2 to 10.

      switch (cardName) {
        case 1:
          cardName = "ace";
          break;
        case 11:
          cardName = "jack";
          break;
        case 12:
          cardName = "queen";
          break;
        case 13:
          cardName = "king";
          break;
      }

      // Declare a dictonary to store a single card object variable, as in  key: value item
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add every card into the deck suit
      deck.push(card);
    }
  }

  return deck;
};

// Get the random card index from card size of 52, from 0th  to 51st, starting from 0
var getRandomCardIndex = function (cardSize) {
  return Math.floor(Math.random() * cardSize);
};

// Shuttfle the cards randomly upon game start
var shuffleCards = function (cards) {
  var currentCardIndex = 0;
  var randomCardIndex = 0;
  var currentCardItem = [];
  var randomCardItem = [];

  for (
    currentCardIndex = 0;
    currentCardIndex < cards.length;
    currentCardIndex++
  ) {
    randomCardIndex = getRandomCardIndex(cards.length);

    // Use temporary containers to keep track/store current card item and random card item
    currentCardItem = cards[currentCardIndex];
    randomCardItem = cards[randomCardIndex];

    //keep swapping the both current position and random position cards from 1st iteration till 52th iteration.
    cards[currentCardIndex] = randomCardItem;
    cards[randomCardIndex] = currentCardItem;
  }

  return cards;
};

// Deal a card to the current hand
var dealCardToHand = function (currentHand) {
  // Shuttfle the cards once game start and load deck with cards
  currentHand.push(shuffleCards(makeDeckSuit()).pop());
};

// Get total sum of cards in current hand
var getCurrentHandTotalSum = function (currentHand) {
  var numOfAcesInCurrentHand = 0;
  var totalSum = 0;
  var counter = 0;
  var aceCounter = 0;
  var currentCard = [];

  for (counter = 0; counter < currentHand.length; counter++) {
    currentCard = currentHand[counter];

    switch (currentCard.rank) {
      case 1:
        // If card is Ace, value is 11 by default for blackjack when card length is not more than 2
        if (counter < BLACKJACK_CARDSIZE) {
          numOfAcesInCurrentHand++;
          totalSum += 11;
        } else {
          // If card is Ace, value is 1 by default when card length is more than 2
          totalSum++;
        }
        break;

      //treat or consider rank 11, 12, 13 (J, Q, K) as value of 10 (based on project requirement and reference to CNY's style in Singapore, different country may vary)
      case 11:
      case 12:
      case 13:
        totalSum += 10;
        break;
      default:
        totalSum += currentCard.rank; //other than above exception, add the total sum with current card rank
    }

    //if have 2 Ace cards on current hand, straight declare total sum value as 21  and immediately break the loop
    if (numOfAcesInCurrentHand == 2) {
      totalSum = TWENTY_ONE; // Consider 1 of the Ace cards as 10, reference to CNY's style in Singapore
      break;
    }
  }

  // Convert Ace card value of 11 to value of 1 when the number of cards on current hand is more than 2.
  if (totalSum > TWENTY_ONE && numOfAcesInCurrentHand > 0) {
    for (aceCounter = 0; aceCounter < numOfAcesInCurrentHand; aceCounter++) {
      totalSum -= 10; //reduce the total sum by value of 11 per Ace card, and add back value of 1 for any Ace card on hand
      numOfAcesInCurrentHand--; //decrement the number of Ace cards on hand after total sum is reduced by per Ace card.
      if (totalSum <= TWENTY_ONE) {
        break; // break the loop when the total sum is below 21
      }
    }
  }
  // Assume the card length on current hand is more than 2 while not over 21, and there is an Ace card any point of time.
  else if (
    totalSum <= TWENTY_ONE &&
    numOfAcesInCurrentHand != 0 &&
    currentHand.length > BLACKJACK_CARDSIZE
  ) {
    totalSum -= 10; //reduce the total sum by value of 11 per Ace card, and add back value of 1 for any Ace card on hand
    numOfAcesInCurrentHand--;
  }

  return totalSum;
};

// Check whether current hand is blackjack while the card length is not more than 2
var isBlackjack = function (currentHand) {
  return (
    currentHand.length == 2 && getCurrentHandTotalSum(currentHand) == TWENTY_ONE
  );
};

// Convert hand to a string where objects within the array are stringified
var convertCurrentHandToString = function (currentHand) {
  var cards = "";
  var currentHandIndex = 0;

  for (
    currentHandIndex = 0;
    currentHandIndex < currentHand.length;
    currentHandIndex++
  ) {
    // Check for the format only for message output, not for any special purpose of code  functionality
    if (currentHandIndex != 0 && currentHandIndex < currentHand.length) {
      cards += " ,  " + currentHand[currentHandIndex].name;
    } else {
      cards += "  " + currentHand[currentHandIndex].name;
    }
  }

  return cards;
};

// Print the output message of the game
var getDefaultOutput = function () {
  return `Player ${userName} has: ${convertCurrentHandToString(
    playerHand
  )} with total sum of ${getCurrentHandTotalSum(playerHand)}. <br>
    Computer has: ${convertCurrentHandToString(
      computerHand
    )} with total sum of ${getCurrentHandTotalSum(computerHand)}.`;
};

// Function for the gameplay
var blackJack = function (input) {
  if (!userName) {
    if (!input) {
      console.log("Please input your name");
      return "Please input your name ";
    } else {
      console.log("welcome " + input);
      userName = input;
      mode = true;
    }
  }

  if (mode) {
    if (gameOver) {
      return "The game is over. Please refresh browser to play again.";
    }

    // If initial hands have no cards,  start to draw cards
    if (playerHand.length == 0 && !gameOver) {
      // User clicks submit button to deal cards.

      // Draw 2 cards upon game start
      // Deal first card for player then computer
      dealCardToHand(playerHand);
      dealCardToHand(computerHand);
      // Deal second card for player then computer
      dealCardToHand(playerHand);
      dealCardToHand(computerHand);

      // Need to update computer and player hand total sum after dealing cards from first round
      computerHandTotalSum = getCurrentHandTotalSum(computerHand);
      playerHandTotalSum = getCurrentHandTotalSum(playerHand);

      // Check whether computer has blackjack. Gameover if blackjack
      if (isBlackjack(computerHand)) {
        gameOver = true; //game over when blackjack
        // Computer wins, end game immediately
        return `${getDefaultOutput()} <br>
        Computer has Blackjack and wins.  Please refresh browser to play again.`;
      }

      // Check whether player  has blackjack. Gameover if blackjack
      else if (isBlackjack(playerHand)) {
        gameOver = true; //game over when blackjack
        // Player wins, end game immediately
        return `${getDefaultOutput()} <br>
        Player ${userName} has Blackjack and wins.  Please refresh browser to play again.`;
      }

      // Check whether both player and computer have blackjack together. Gameover if blackjack
      else if (isBlackjack(playerHand) && isBlackjack(computerHand)) {
        gameOver = true; // Game over when blackjack
        // Both player and computer have blackjack, end game immediately
        return `${getDefaultOutput()} <br>
        Player ${userName} and Computer have Blackjack and game ties.  Please refresh browser to play again.`;
      }
    }

    // Then next is the player has to decide something: hit or stand.
    if (!playerHasChosenToStand) {
      // Check for input validation and prompt user to enter the input correctly if the input is neither "hit" nor "stand"
      if (!isNaN(input) && input != "hit" && input != "stand") {
        return 'Please input correctly either "hit" or "stand" to move for next step.  ';
      }

      // Check for input validation and whether the input is hit
      if (isNaN(input) && input == "hit") {
        //Assume 1 hit input at any point of time is to draw 1 card, not auto draw more than 1 card when player below threshold value
        dealCardToHand(playerHand);
        playerHandTotalSum = getCurrentHandTotalSum(playerHand);

        // Get computer total sum first for comparison later with player total sum
        computerHandTotalSum = getCurrentHandTotalSum(computerHand);

        if (
          playerHandTotalSum > computerHandTotalSum &&
          playerHandTotalSum <= TWENTY_ONE
        ) {
          gameOver = true; // Game over when player total sum more than computer total sum
          return `${getDefaultOutput()} <br>
          Player ${userName} win.  Please refresh browser to play again.`;
        } else if (
          computerHandTotalSum > playerHandTotalSum &&
          computerHandTotalSum <= TWENTY_ONE
        ) {
          gameOver = true; // Game over when computer total sum more than player total sum
          return `${getDefaultOutput()} <br>
        Computer win.  Please refresh browser to play again.`;
        }

        // Based on the question asked, determine whether computer and player will burst if player already bust first
        else if (
          playerHandTotalSum > computerHandTotalSum &&
          playerHandTotalSum > TWENTY_ONE
        ) {
          gameOver = false; // Game not over when player total sum more than computer total sum and player bust

          dealCardToHand(computerHand);
          computerHandTotalSum = getCurrentHandTotalSum(computerHand);

          if (computerHandTotalSum > TWENTY_ONE) {
            // Game over when computer total sum more than player total sum and computer bust. if yes, they are ties
            gameOver = true;
            return `${getDefaultOutput()} <br> Both burst and ties.  Please refresh browser to play again.`;
          } else if (computerHandTotalSum <= TWENTY_ONE) {
            gameOver = true; // Game over when computer total sum more than player total sum and total sum is 21
            return `${getDefaultOutput()} <br> Computer win.  Please refresh browser to play again.`;
          }
        }
      }

      // Check for input validation and whether the input is stand
      if (isNaN(input) && input == "stand") {
        playerHasChosenToStand = true;
      }
    }

    // If computer total sum is lower than threshold, draw another card
    if (getCurrentHandTotalSum(computerHand) <= dealerCardsHitThreshold) {
      dealCardToHand(computerHand);
      // Need to update computer hand total sum after dealing new card
      computerHandTotalSum = getCurrentHandTotalSum(computerHand);
      // If bust, show the bust cards from the computer
      if (computerHandTotalSum > TWENTY_ONE) {
        gameOver = true; // Game over when total sum over 21
        return `${getDefaultOutput()} <br>
      Computer has busted and loses.  Please refresh browser to play again.`;
      }
    }

    // If player and computer have both not busted and chosen to stand, decide who wins
    if (
      playerHasChosenToStand &&
      computerHandTotalSum > dealerCardsHitThreshold
    ) {
      // The game is always over after the player choose to stand
      gameOver = true;
      playerHandTotalSum = getCurrentHandTotalSum(playerHand);

      // If computer and player have same total sum, game ties.
      if (
        playerHandTotalSum == computerHandTotalSum &&
        playerHandTotalSum <= TWENTY_ONE
      ) {
        return `${getDefaultOutput()} <br>
        Both are draw. Please refresh browser to play again.`;
      }

      // If player hand total sum is greater than computer hand total sum, player wins.
      else if (
        playerHandTotalSum > computerHandTotalSum &&
        playerHandTotalSum <= TWENTY_ONE
      ) {
        return `${getDefaultOutput()} <br>
        Player ${userName} wins! Please refresh browser to play again. `;
      } else if (
        computerHandTotalSum > playerHandTotalSum &&
        computerHandTotalSum <= TWENTY_ONE
      ) {
        // Otherwise, computer wins
        return `${getDefaultOutput()} <br>
      Computer wins! Please refresh browser  to play again. `;
      }

      // Based on the question asked, determine whether computer will win or ties if player already bust first
      else if (
        playerHandTotalSum > computerHandTotalSum &&
        playerHandTotalSum > TWENTY_ONE
      ) {
        computerHandTotalSum = getCurrentHandTotalSum(computerHand);
        if (
          computerHandTotalSum <= TWENTY_ONE &&
          computerHandTotalSum > dealerCardsHitThreshold
        ) {
          dealCardToHand(computerHand);
          computerHandTotalSum = getCurrentHandTotalSum(computerHand);
          if (computerHandTotalSum > TWENTY_ONE) {
            return `${getDefaultOutput()} <br>
            Both bust and ties.  Please refresh browser to play again.`;
          } else if (computerHandTotalSum <= TWENTY_ONE) {
            return `${getDefaultOutput()} <br> Computer win.  Please refresh browser to play again.`;
          }
        }
      }
    }

    // If game is not yet over, show current game status
    return `${getDefaultOutput()} <br> The
    playerHasChosenToStand checker is ${playerHasChosenToStand} <br>
    If player ${userName} has not yet chosen to stand, please enter "hit" or "stand". <br>
    Else, press Submit to see Computer's next move.`;
  }
};

var main = function (input) {
  //main function for gameplay
  return blackJack(input);
};
