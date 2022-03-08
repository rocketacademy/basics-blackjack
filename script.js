/*

Pseudo coding framework:
1. What is the objective?
2. Break down problem into sub-problems (optional for now)
---- First version -----
a. Create deck [Create make deck function]
b. Shuffle deck [create shuffle deck function]
c. Deal 2 cards for player and compueter
d. compare which card is higher and display winner message

3. What information do I have?
4. What information do I need?
5. How can I get there?

*/

// Helper functions below

/**
 * Create a standard 52-card deck
 */
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

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

/**
 * show player's and computer's hands in output message
 */
var showPlayerAndComputerHands = function (playerHand, computerHand) {
  // define message for player
  var playerMessage = "Player's hand is: <br>";
  //initialise counter
  var counter = 0;
  // Declare loop conditions
  // Loop condition for player hand
  while (counter < playerHand.length) {
    playerMessage =
      playerMessage +
      playerHand[counter].name +
      " of " +
      playerHand[counter].suit +
      `<br>`;
    counter += 1;
  }
  //reset counter for computer hand
  counter = 0;
  // define message for player
  var computerMessage = "Computer's hand is: <br>";
  //Loop condition for computer hand
  while (counter < computerHand.length) {
    computerMessage =
      computerMessage +
      computerHand[counter].name +
      " of " +
      computerHand[counter].suit +
      ` <br> `;
    counter += 1;
  }
  return playerMessage + `<br>` + computerMessage;
};

/**
 * check that player has blackjack
 */
var checkBlackJack = function (playerHandArray) {
  var firstCardInHand = playerHandArray[0];
  var secondCardInHand = playerHandArray[1];
  var confirmBlackJack = false;

  // when player or computer has blackjack return true
  // set sum of playerHand.rank > sum of computerHand.rank condition
  // set sum of computerHand.rank > sum of playerHand.rank condition
  if (
    (firstCardInHand.name == `ace` && secondCardInHand.rank >= 10) ||
    (firstCardInHand.rank >= 10 && secondCardInHand.name == `ace`)
  ) {
    confirmBlackJack = true;
  }
  return confirmBlackJack;
};

// check total points in player's hands
var checkRankSum = function (playerHandArray) {
  // initialise counter
  var counter = 0;
  var totalRank = 0;

  // initialise aceCounter
  var aceCounter = 0;
  // create while loop to add through all the cards in a player's hand

  // declare loop condition
  while (counter < playerHandArray.length) {
    // create current card variable
    var currentCardInHand = playerHandArray[counter];

    // declare condition for jack, queen king
    if (
      currentCardInHand.name == `jack` ||
      currentCardInHand.name == `queen` ||
      currentCardInHand.name == `king`
    ) {
      totalRank = totalRank + 10;
    }
    // declare condition for ace
    else if (currentCardInHand.name == `ace`) {
      totalRank = totalRank + 11;
      // initialise ace-specific counter
      aceCounter += 1;
    } else {
      totalRank = totalRank + currentCardInHand.rank;
    }
    counter += 1;
  }

  // create while loop for ace counter to ensure that only 1 of the aces will be counted as 11
  while (counter < aceCounter) {
    if (totalRank > 21) {
      totalRank = totalRank - 10;
    }
    counter += 1;
  }
  return totalRank;
};

// ----- global variable definition ------
// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

// Define empty player hand and computer hand
var playerHand = [];
var computerHand = [];

// define game modes
var startGame = "Start game";
var dealCards = "Deal cards";
var playerHitOrStand = "Player hit Or Stand mode";
var dealerHitOrStand = "Dealer hit Or Stand mode";
var gameMode = startGame;

// define image tags
var shuffleDeckImg =
  '<img src = "https://c.tenor.com/oxauAlJ2IF8AAAAM/riffle-shuffle-world-xm.gif"/>';
var hangoverMath =
  '<img src = "https://c.tenor.com/NcDKtNtM7LYAAAAd/hangover-math.gif"/>';

var sweatingImage =
  '<img src= "https://c.tenor.com/RVi1u8Q3uMYAAAAC/sweating-hot.gif"/>';

// ------ main function below --------
var main = function (input) {
  // set gameMode to startGame
  if (gameMode == startGame) {
    // clear player Hand and computer hand
    playerHand = [];
    computerHand = [];
    // Change gameMode to deal cards
    gameMode = dealCards;
    console.log(gameMode);

    // return output message with instructions
    return (
      "The game has started, please press submit to deal cards." +
      shuffleDeckImg
    );
  }

  // set game mode to deal cards
  if (gameMode == dealCards) {
    console.log(deck);

    // deal out 2 cards from the gamedeck into the player's hand, and push into player's hand array
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());

    // deal out 2 cards from the gamedeck into the computer's hand, and push into computer's hand array
    computerHand.push(deck.pop());
    computerHand.push(deck.pop());

    console.log(playerHand);
    console.log(computerHand);

    console.log(playerHand.length);
    console.log(computerHand.length);

    // Initialise an output value with the cards drawn by each player.
    var myOutputValue = showPlayerAndComputerHands(playerHand, computerHand);

    //set variables for blackjack checks
    var playerBlackJack = checkBlackJack(playerHand);
    var computerBlackJack = checkBlackJack(computerHand);

    console.log(`Player BlackJack condition is ` + checkBlackJack(playerHand));
    console.log(
      `Computer BlackJack condition is ` + checkBlackJack(computerHand)
    );
    // set output value with blackjack conditions
    if (playerBlackJack == true && computerBlackJack == false) {
      gameMode = startGame;
      return (
        showPlayerAndComputerHands(playerHand, computerHand) +
        ` <br> ` +
        `Player wins by black jack!`
      );
    }
    if (playerBlackJack == false && computerBlackJack == true) {
      gameMode = startGame;
      return (
        showPlayerAndComputerHands(playerHand, computerHand) +
        ` <br> ` +
        `Computer wins by black jack!`
      );
    }
    if (playerBlackJack == true && computerBlackJack == true) {
      gameMode = startGame;
      return (
        showPlayerAndComputerHands(playerHand, computerHand) +
        ` <br> ` +
        `It's a blackjack tie, please play again.`
      );
    }

    // NO BLACKJACK scenario on initial dealing

    console.log(`Player Hand Rank sum is ` + checkRankSum(playerHand));
    console.log(`Computer Hand Rank sum is ` + checkRankSum(computerHand));

    if (playerBlackJack == false && computerBlackJack == false) {
      gameMode = playerHitOrStand;
      console.log(deck);
      return (
        `${showPlayerAndComputerHands(playerHand, computerHand)} 
           <br> <br>
          Player's points is ${checkRankSum(playerHand)}
          <br> <br>
          Computer's points is ${checkRankSum(computerHand)}
          <br><br>
          Please enter "hit" or "stand".
          <br> <br>
          ` + hangoverMath
      );
    }
  }

  // initiate player hit or stand game mode
  if (gameMode == playerHitOrStand) {
    console.log(gameMode);
    console.log(playerHand);
    // if player input is hit condition
    if (input == "hit") {
      playerHand.push(deck.pop());
      console.log(deck);
      console.log(checkRankSum(playerHand));
      // condition if player total rank is more than 21, not lose immediately if he busts
      if (checkRankSum(playerHand) > 21) {
        gameMode = dealerHitOrStand;
        return `
        ${showPlayerAndComputerHands(playerHand, computerHand)}
         <br> <br>
        Your hand is busted. Please press "submit" for dealer to hit or stand. `;
      }
      // condition if player total rank is 21 or less
      else
        return (
          `
        ${showPlayerAndComputerHands(playerHand, computerHand)}
         <br> <br>
        This is your new hand, your current points is ${checkRankSum(
          playerHand
        )} ,please enter "hit" or "stand" to continue` + sweatingImage
        );
    }

    // if player input is stand condition
    if (input == "stand") {
      gameMode = dealerHitOrStand;
      console.log(`Dealer hand before drawing cards is ${computerHand}`);

      return `Please press "submit" for dealer to hit or stand.`;
    }

    // if player input is not hit or stand
    if (input !== "hit" || input !== "stand") {
      // gameMode = playerHitOrStand;
      return `Please input "hit" or "stand" to continue game`;
    }
  }

  //dealer Hit or stand game mode
  if (gameMode == dealerHitOrStand) {
    while (checkRankSum(computerHand) < 17) {
      computerHand.push(deck.pop());
    }
    console.log(`Dealer hand after ddrawing cards is ${computerHand}`);
    // player hand total rank higher than computer hand, but less than 21
    if (
      checkRankSum(playerHand) < 22 &&
      checkRankSum(playerHand) > checkRankSum(computerHand)
    ) {
      gameMode = startGame;
      return `${showPlayerAndComputerHands(playerHand, computerHand)} 
           <br> <br> 
          Player's points is ${checkRankSum(playerHand)}
          <br> <br>
          Computer's points is ${checkRankSum(computerHand)}
          <br><br>
          Player Wins!`;
    }
    // player hand total rank lower than computer hand
    if (
      checkRankSum(playerHand) < 22 &&
      checkRankSum(playerHand) < checkRankSum(computerHand)
    ) {
      gameMode = startGame;
      return `${showPlayerAndComputerHands(playerHand, computerHand)} <br> <br>
          Player's points is ${checkRankSum(playerHand)}
          <br> <br>
          Computer's points is ${checkRankSum(computerHand)}
          <br><br>
          Computer Wins!`;
    }

    // draw condition
    if (checkRankSum(playerHand) == checkRankSum(computerHand)) {
      gameMode = startGame;
      return `${showPlayerAndComputerHands(playerHand, computerHand)} <br> <br>
          Player's points is ${checkRankSum(playerHand)}
          <br> <br>
          Computer's points is ${checkRankSum(computerHand)}
          <br><br>
        It is a draw!`;
    }
  }
};
