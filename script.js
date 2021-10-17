/**
 * Create a standard 52-card deck.
 * Taken from https://basics.rocketacademy.co/10-javascript-objects/10.3-card-game-example-war
 */
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
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
 * Taken from https://basics.rocketacademy.co/10-javascript-objects/10.3-card-game-example-war
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 * Taken from https://basics.rocketacademy.co/10-javascript-objects/10.3-card-game-example-war
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
 * Get card value in the game of Blackjack
 * - Aces = 11
 * - Jack, Queen, King = 10
 * @param {number} cardRank Face value of the card. 
 */
var getBlackjackCardValue = (cardRank) => {
  if (cardRank == 1) return 11;
  else if (cardRank > 10) return 10;
  
  return cardRank;
}

// Initialize players and dealer hands
var playerHands = [], dealerHand = [];

/**
 * Deal a card to a hand (player or dealer).
 * @param {object} hand Card hand. 
 */
var dealCard = (hand) => {
  let dealtCard = deck.pop();

  // Count total and push card into cards array in hand
  hand.total += getBlackjackCardValue(dealtCard.rank);
  hand.cards.push(dealtCard);
  
  // Count how many aces are in hand, default value set to 11
  if (dealtCard.rank == 1) hand.acesAsEleven++;
}

/**
 * Deal an Ace of Spades card to a hand (player or dealer).
 * Used for testing aces as 1 or 11. Or to cheat :)
 * @param {object} hand Card hand. 
 */
var dealAceOfSpades = (hand) => {
  let dealtCard = {
    name: "ace",
    suit: "spades",
    rank: 1,
  };

  // Count total and push card into cards array in hand
  hand.total += getBlackjackCardValue(dealtCard.rank);
  hand.cards.push(dealtCard);
  
  // Count how many aces are in hand, default value set to 11
  if (dealtCard.rank == 1) hand.acesAsEleven++;
}

/**
 * Deal a King of Spades card to a hand (player or dealer).
 * Used for testing Blackjack as pair to Ace of Spades.
 * @param {object} hand Card hand. 
 */
var dealKingOfSpades = (hand) => {
  let dealtCard = {
    name: "king",
    suit: "spades",
    rank: 13,
  };

  // Count total and push card into cards array in hand
  hand.total += getBlackjackCardValue(dealtCard.rank);
  hand.cards.push(dealtCard);  
}

/**
 * Deal cards to players and dealer.
 * @param {number} numOfPlayers Number of players in this round. 
 * @param {number} numOfCards Number of cards to deal per hand.
 */
var dealCards = (numOfPlayers, numOfCards) => {
  // Prepare hands for players and dealer
  for (let i=0; i <= numOfPlayers; i++) {
    let hand = {
      player: i,
      cards: [],
      total: 0,
      acesAsEleven: 0,
    };
    
    if (i == 0) dealerHand.push(hand);
    else playerHands.push(hand);
  }

  // Deal cards to players and dealer
  for (let count=0; count < numOfCards; count++) {
    for (let i=0; i < numOfPlayers; i++) {
      dealCard(playerHands[i]); 
    }
    dealCard(dealerHand[0]);  
  }

  // Check for double aces in player hand
  for (let i=0; i < numOfPlayers; i++) {
    if (playerHands[i].acesAsEleven == 2) {
      playerHands[i].total -= 10;
      playerHands[i].acesAsEleven--;
    }
  }

  // Check for double aces in dealer hand
  if (dealerHand[0].acesAsEleven == 2) {
    dealerHand[0].total -= 10;
    dealerHand[0].acesAsEleven--;
  }
}

/**
 * Print cards in a hand.
 * @param {string} name Name of the hand holder.
 * @param {object} hand Hand object that hold the cards. 
 */
var printCards = (name, hand, onlyFirstCard = false) => {
    let myOutputValue;
    
    // Emojis to make the UI looks more fun
    let cardSuitEmojis = {
      "hearts": "♥️", "diamonds": "♦️", "clubs": "♣️", "spades": "♠️"
    };
    let cardRankEmojis = {
      2: "2️⃣", 3: "3️⃣", 4: "4️⃣", 5: "5️⃣", 6: "6️⃣",
      7: "7️⃣", 8: "8️⃣", 9: "9️⃣", 10: "🔟",
    }

    if (name == "DEALER") myOutputValue = name + " has ";
    else myOutputValue = name + " " + hand.player + " has ";

    // Print out first card
    // For aces, kings, queens, and jacks, get first letter of name and make it upper case
    myOutputValue += 
      ((hand.cards[0].name.length > 2) ? hand.cards[0].name.charAt(0).toUpperCase() : cardRankEmojis[hand.cards[0].rank]) 
      + cardSuitEmojis[hand.cards[0].suit];

    if (!onlyFirstCard) {
      // Print out more cards
      for (let j=1; j < hand.cards.length; j++) {
        myOutputValue +=
        " and " +
        ((hand.cards[j].name.length > 2) ? hand.cards[j].name.charAt(0).toUpperCase() : cardRankEmojis[hand.cards[j].rank]) 
        + cardSuitEmojis[hand.cards[j].suit];  
      }

      // Print out total
      myOutputValue += " with total of  " + hand.total; 
    }
    
    myOutputValue += "<br/>";

    return myOutputValue;
}

/**
 * Get suggestion whether to hit or stand.
 * Strategy taken from https://www.blackjackapprenticeship.com/blackjack-strategy-charts/
 * TODO: this suggestion engine can be improved with more data, ML/AI
 * @param {number} playerTotal Total of current player hand. 
 * @param {number} dealerUpcard Value of dealer card that's already open.
 */
var getSuggestion = (playerTotal, dealerUpcard) => {
  if ((playerTotal >= 17)
    || ((playerTotal < 17) && (playerTotal > 12) && (dealerUpcard < 6))
    || ((playerTotal == 12) && (dealerUpcard > 3) && (dealerUpcard < 7))) {
      return "stand";
  }
  return "hit";
}

// Initialize player wallets and game pots
var playerWallets = [], gamePots = [];

/**
 * Let players buy in.
 * @param {number} numOfPlayers Number of players on the table. 
 */
var buyInPlayers = (numOfPlayers) => {
  for (let i=0; i < numOfPlayers; i++) {
    playerWallets.push(BUY_IN_AMOUNT); // put buy in amount in player wallets
    gamePots.push(0); // initialize bet amounts to 0 for each player's game pot
  }
}

/**
 * Place bets.
 * @param {number} numOfPlayers Number of players on the table. 
 */
var placeBets = (numOfPlayers) => {
  for (let i=0; i < numOfPlayers; i++) {
    playerWallets[i] -= BET_AMOUNT; // take out bet amount from player wallets
    gamePots[i] = BET_AMOUNT; // put bet amount into player's game pot
  }
}

/**
 * Print chip status of players on the table.
 */
var printPlayerChipValues = () => {
  let myOutputValue = "";

  // Get amount of money (or in the form of chips) left in players' wallets
  for (let i=0; i < numOfPlayers; i++) {
    myOutputValue += "PLAYER " + (i+1) + " has $" + playerWallets[i] + ".<br/>";
  }

  myOutputValue += "<br/>";
  return myOutputValue;
}

/**
 * Check if there are hands to settle: need to be compared with dealer (not already bust).
 */
var isThereHandsToSettle = () => {
  for (let i=0; i < gamePots.length; i++) {
    // If game pot is still the same as original bet amount, then the game is not done for the player
    // Game is done for a player if they win or lose(bust)
    if (gamePots[i] == BET_AMOUNT) {
      return true;
    }  
  }
  return false;
}

/*
Game Rules
1. Deck is shuffled.
2. User clicks Submit to deal cards.
3. The cards are analysed for game winning conditions, e.g. Blackjack.
4. The cards are displayed to the user.
5. The user decides whether to hit or stand, using the submit button to submit their choice.
6. The user's cards are analysed for winning or losing conditions.
7. The computer decides to hit or stand automatically based on game rules.
8. The game either ends or continues.

Specific Blackjack Rules
1. Dealer must hit if total is under 17

Betting Rules
1. $100 for each player to buy in
2. $10 for each player to play a hand
3. Winning a game will give the player => $10 + $10 = $20
4. Winning a game with a Blackjack will get the player 1.5x => $10 + $15 = $25
5. A push (tie) between player and dealer will give the player their $10 back
6. Players can owe money to the casino, which is why their wallet can go negative

Multiplayer Rules
1. There can be up to 7 players playing in the same game

TODO:
1. Option to have the players stop playing / do another buy in if wallet goes to $0
2. Option to have players set their own amout of bets, instead of fixed
3. Other functionalities such as Doubling bets, Splitting
4. Unit tests
5. Improve look and feel with colors, images, and possibly animations

*/

// Initialize a few helper variables
var numOfPlayers = 1;
var gameMode = "READY";
var playerInFocus = 1;

// Constants related to game of Blackjack
const BLACKJACK = 21;
const DEALER_HIT_LIMIT = 17;
const NUMBER_OF_CARDS_TO_START = 2;

// Constants related to Betting
const BUY_IN_AMOUNT = 100;
const BET_AMOUNT = 10;
const WIN_MULTIPLIER = 2;
const BLACJACK_MULTIPLIER = 2.5;

// Constants related to Multiplayer
const MAX_PLAYERS = 7;

// Initialise the shuffled card deck before the game starts.
var deck = [];

// Initialize player wallets
var wallet = buyInPlayers(MAX_PLAYERS); 

/**
 * Each player action triggers the main function.
 */
var main = function (input) {

  // Start the game, place bets, deal cards
  if (gameMode == "READY") {
    gameMode = "GAME_IN_PROGRESS";
    
    // Get number of players from input, if available
    if (!isNaN(input)) {
      let inputNumber = parseInt(input);
      if (inputNumber > 0) {
        numOfPlayers = (inputNumber > MAX_PLAYERS) ? MAX_PLAYERS : inputNumber;
      }
    }

    placeBets(numOfPlayers); // Place bets for all players

    deck = shuffleCards(makeDeck()); // Reset and shuffle deck
    playerHands = []; dealerHand = []; // Reset hands
    dealCards(numOfPlayers, NUMBER_OF_CARDS_TO_START);
  }
  // Handle player inputs during game
  else if ((gameMode == "GAME_IN_PROGRESS") && (input == "h")) {
    //deal a card to player because the player chooses to 'hit'
    dealCard(playerHands[playerInFocus-1]);
  }
  else if ((gameMode == "GAME_IN_PROGRESS") && (input == "s")) {
    //player chooses to 'stand' so go the next player
    if (numOfPlayers == playerInFocus) gameMode = "EVALUATE_HANDS";
    else playerInFocus++;
  }
  else if ((gameMode == "GAME_IN_PROGRESS") && (input == "h ")) {
    //deal an Ace of Spades to player because the player wants to win
    dealAceOfSpades(playerHands[playerInFocus-1]);
  }

  // Prepare output values
  let playerInfoMessage = "", dealerInfoMessage = "", resultMessage = "", directionMessage = ""; 

  // Print out what the player and dealer have
  for (let i=0; i < numOfPlayers; i++) {
    playerInfoMessage += printCards("PLAYER", playerHands[i]);
  }
  dealerInfoMessage = printCards("DEALER", dealerHand[0], true);

  if (gameMode == "GAME_IN_PROGRESS") {
    let isGameDone = false, isBlackjack = false;
    
    // Check if player has Blackjack
    if ((playerHands[playerInFocus-1].total == BLACKJACK) && (playerHands[playerInFocus-1].cards.length == NUMBER_OF_CARDS_TO_START)) {
      resultMessage += "<br/>PLAYER " + playerInFocus + "! You have Blackjack! Wait to see if DEALER also has Blackjack.";
      isBlackjack = true;
    }
    // Check if player is going bust      
    else if (playerHands[playerInFocus-1].total > BLACKJACK) {
      //if hand has Aces, replaced value with 1 to avoid bust
      if (playerHands[playerInFocus-1].acesAsEleven > 0) {
        playerHands[playerInFocus-1].total -= 10;
        playerHands[playerInFocus-1].acesAsEleven--;

        // If last dealt card is an Ace and player still bust
        if (playerHands[playerInFocus-1].total > BLACKJACK) {
          resultMessage += "<br/>PLAYER " + playerInFocus + "! Sorry, you bust.";
          isGameDone = true;  
        }

        // Reprint all players' cards
        playerInfoMessage = "";
        for (let i=0; i < numOfPlayers; i++) {
          playerInfoMessage += printCards("PLAYER", playerHands[i]);
        }
      }
      else {
        resultMessage += "<br/>PLAYER " + playerInFocus + "! Sorry, you bust.";
        isGameDone = true;  
      }
    }

    if (isGameDone) { // Game is done for the player in focus
      gamePots[playerInFocus-1] = 0;

      if (numOfPlayers == playerInFocus) { // Player in focus is the last player       
        if (isThereHandsToSettle()) {
          directionMessage += "<br/><br/>Click on the Submit button to go to the next step.";            
          gameMode = "EVALUATE_HANDS";    
        }
        else { // Game is done for all players, Submit button to play next game
          playerInFocus = 1;
          directionMessage += "<br/><br/>Click on the Submit button to play again.";    
          gameMode = "READY";    
        }
      }
      else { // Player in focus is not the last player, so Submit to go to next player
        directionMessage += "<br/><br/>Click on the Submit button to go to the next step.";            
        playerInFocus++;
      }
    }
    else {
      if (isBlackjack) { // Player in focus gets Blackjack but still need to be compared with dealer
        directionMessage += "<br/><br/>Click on the Submit button to go to the next step.";
        
        if (numOfPlayers == playerInFocus) { // Player in focus is the last player
          gameMode = "EVALUATE_HANDS";    
        }
        else { // Go to next player
          playerInFocus++;
        }
      }
      else { // Prompt for next action from player in focus: hit or stand
        directionMessage = directionMessage + "<br/>PLAYER " + playerInFocus + "! You have " + playerHands[playerInFocus-1].total + ".";
        directionMessage = directionMessage + " I would suggest to " 
          + getSuggestion(playerHands[playerInFocus-1].total, dealerHand[0].cards[0]) + ".<br/>";
        directionMessage += "<br/>Please input 'h' if you want to hit (add a card) or 's' if you want to stand (stay with your cards)."  
      }
    }
  }
  // Player is done with their cards, time for the dealer to move
  else if (gameMode == "EVALUATE_HANDS") {
    // Add cards to dealer
    while (dealerHand[0].total < DEALER_HIT_LIMIT) {
      dealCard(dealerHand[0]);

      //if hand has Aces, replaced value with 1 to avoid bust
      if ((dealerHand[0].total > BLACKJACK) && (dealerHand[0].acesAsEleven > 0)) {
        dealerHand[0].total -= 10;
        dealerHand[0].acesAsEleven--;
      }              
    }
    
    // Reprint the dealer's cards
    dealerInfoMessage = printCards("DEALER", dealerHand[0]);
    
    // Go through all players' hands to determine if they win/lose/push(tie)
    for (let playerIndex=0; playerIndex < numOfPlayers; playerIndex++) {
      if (gamePots[playerIndex] != 0) {
        resultMessage += "<br/>PLAYER " + (playerIndex+1) + "! "; 

        // Player and dealer both has Blackjack
        if ((dealerHand[0].total == BLACKJACK) && (playerHands[playerIndex].total == BLACKJACK)) {
          if ((dealerHand[0].cards.length == NUMBER_OF_CARDS_TO_START) 
          && (playerHands[playerIndex].cards.length == NUMBER_OF_CARDS_TO_START)) {
            resultMessage += "It's a Blackjack push! You get your $" + BET_AMOUNT + " back.";
          } 
          else { //Player and dealer both has 21
            resultMessage += "It's a push! You get your $" + BET_AMOUNT + " back.";
          }
          playerWallets[playerIndex] += BET_AMOUNT;
        }
        // Only player has Blackjack or 21
        else if (playerHands[playerIndex].total == BLACKJACK) {
          // Player has Blackjack
          if (playerHands[playerIndex].cards.length == NUMBER_OF_CARDS_TO_START) {
            playerWallets[playerIndex] += (BET_AMOUNT * BLACJACK_MULTIPLIER);
            resultMessage += "Congrats! You win $" + (BET_AMOUNT * BLACJACK_MULTIPLIER) + ".";  
          } 
          else { // Player has 21
            playerWallets[playerIndex] += (BET_AMOUNT * WIN_MULTIPLIER);
            resultMessage += "Congrats! You win $" + (BET_AMOUNT * WIN_MULTIPLIER) + ".";  
          } 
        }
        // Only dealer has Blackjack or 21
        else if (dealerHand[0].total == BLACKJACK) {
          // Dealer has Blackjack
          if (dealerHand[0].cards.length == NUMBER_OF_CARDS_TO_START) {
            resultMessage += "Sorry, you lost. The dealer has Blackjack.";
          }
          else { // Dealer has 21
            resultMessage += "Sorry, you lost.";
          }
        }
        // Dealer busts
        else if (dealerHand[0].total > BLACKJACK) {
          playerWallets[playerIndex] += (BET_AMOUNT * WIN_MULTIPLIER);
          resultMessage += "The dealer busts. You win $" + (BET_AMOUNT * WIN_MULTIPLIER) + ".";
        }
        else {
          // Determine who wins between the players and the dealer

          // Player and dealer has same total, a push
          if (playerHands[playerIndex].total == dealerHand[0].total) {
            playerWallets[playerIndex] += BET_AMOUNT;
            resultMessage += "It's a push! You get your $" + BET_AMOUNT + " back.";    
          }
          // Player has better hand than dealer, player wins
          else if (playerHands[playerIndex].total > dealerHand[0].total) {
            playerWallets[playerIndex] += (BET_AMOUNT * WIN_MULTIPLIER);
            resultMessage += "Congrats! You win $" + (BET_AMOUNT * WIN_MULTIPLIER) + ".";    
          }
          else { // Dealer has better hand than player, player loses
            resultMessage += "Sorry, you lost.";    
          }
        }        
      }
    }

    // Game is done, back to start of game
    playerInFocus = 1;
    directionMessage += "<br/><br/>Click on the Submit button to play again.";
    gameMode = "READY";
  }

  // Print out all messages
  let myOutputValue = printPlayerChipValues() + playerInfoMessage + "<br/>" + dealerInfoMessage + 
    resultMessage + directionMessage;
  
  // Return output to screen.
  return myOutputValue;
};