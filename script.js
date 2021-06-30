// user enters number of players
// user enters name for each player
// start round: each player enters bet one by one. winner gets twice their bet back.
// user clicks submit to deal cards. dealer's first card is shown to all players.
/* Splitting logic
cards are displayed to the players (turn by turn)
if eligible for split, ask player if they want to split
if yes, show the two new hands, duplicate the current bet onto the second hand, then let the player play the first hand first
once first hand has been played, let the player play the second hand, then go to the next player
*/
// players take turns to decide whether to hit or stand (by using submit button)
// check for blackjack/bust before asking for their decision
// after each player decision, check for blackjack/bust again
// computer's turn after all players have finished their turns: decides to hit or stand automatically (hit if hand is below 17)
// end of round: player wins if they have blackjack, even if dealer also has blackjack. player loses if they bust, even if dealer busts. display tally of chips of all players after bets have been settled.
// new round: shuffle deck -> players enter bets -> deal cards

// Constants
const SUITS = ["diamonds", "clubs", "hearts", "spades"]; // Used to create deck
const NAMES = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]; // Used to create deck
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]; // Used to create deck
const CHOOSE_NUM_PLAYERS = "choose number of players"; // Type of game mode
const CHOOSE_PLAYER_NAMES = "choose names of players"; // Type of game mode
const PLACE_BETS = "place bets"; // Type of game mode
const DEAL_CARDS = "deal cards"; // Type of game mode
const SHOW_HAND = "show hand"; // Type of game mode
const CHOOSE_SPLIT = "choose split"; // Type of game mode
const PENDING_PLAYER_DECISION = "pending player decision"; // Type of game mode
const CALC_ROUND_RESULT = "calculate round result"; // Type of game mode
const STARTING_CHIPS = 100; // Initial tally of chips for each player
const HIT = "hit"; // Type of player decision
const STAY = "stay"; // Type of player decision
const YES = "yes"; // Type of split choice
const NO = "no"; // Type of split choice
const WIN = "win"; // Type of round result
const LOSE = "lose"; // Type of round result

// Global variables
var gameMode = CHOOSE_NUM_PLAYERS; // Initialise the game in this mode
var numPlayers; // Number of players that will be determined by the user
var players = []; // Array of player objects that will be updated as the game progresses
var dealerHand = { handNum: 1 }; // Dealer Hand object that will be populated with the hand cards (array) and hand value
var turn = 0; // Game starts on the first player's turn: 0 to represent first element in `players` array
var deck = []; // Deck that will be created at the beginning of each round
var currentHandNum = 1; // Players always start with viewing their first hand (relevant when splitting)

// Create the deck of cards
var createDeck = function () {
  for (var i = 0; i < NAMES.length; i++) {
    for (var x = 0; x < SUITS.length; x++) {
      var card = { name: NAMES[i], suit: SUITS[x], rank: RANKS[i] };
      deck.push(card);
    }
  }
  return deck;
};

// Shuffle the deck of cards
var shuffleCards = function (cardDeck) {
  for (var i = 0; i < cardDeck.length; i++) {
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[i];
    cardDeck[i] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

// Game mode where user selects the number of players
var updateNumPlayers = function (numPlayersInput) {
  var resultMessage;
  // Input validation: Limit num of players to 4 for performance reasons
  if (!(Number(numPlayersInput) >= 1 && Number(numPlayersInput) <= 4)) {
    resultMessage = `You have entered an invalid input.<br>Please enter a number between 1 and 4! All decimals will be rounded up.`;
    return resultMessage;
  }
  numPlayers = Math.ceil(Number(numPlayersInput));
  // Create array of player objects
  for (var i = 0; i < numPlayers; i++) {
    var player = {
      playerName: "",
      hand1: { cards: [], handNum: 1, value: 0, playerBet: 0 },
      chips: STARTING_CHIPS,
    };
    players.push(player);
  }
  gameMode = CHOOSE_PLAYER_NAMES; // Update game to the next mode
  resultMessage = `You have chosen to play the game with ${numPlayers} player(s).<br><br>Now please enter the name of each player, starting with the first.`;
  return resultMessage;
};

// Game mode where the players each enter their respective names
var updatePlayerNames = function (playerNameInput) {
  var resultMessage;
  // Input validation
  if (playerNameInput == "") {
    resultMessage = `You have entered an empty name.<br>Please enter a valid name!`;
    return resultMessage;
  }
  // Valid input, so we update player names in the `players` array
  players[turn].playerName = playerNameInput.italics(); // As best practice, we should not store strings with formatting included, but we do it here for convenience
  resultMessage = `Welcome to 🃏 Blackjack 🃏, ${players[turn].playerName}!`;
  turn += 1;
  // Condition to check if we have added the names for all players
  if (turn == players.length) {
    turn = 0; // Reset turn so that bets can be placed in the right order
    gameMode = PLACE_BETS; // Update game mode to the next mode
    resultMessage += `<br><br>All players have successfully entered their names. We will now start taking bets for the first round.<br><br>You currently have ${players[turn].chips} chips, ${players[turn].playerName}. Please enter your bet for this round - note that input will be rounded down.`;
  } else {
    resultMessage += `<br><br>Please enter the name of the next player.`;
  }
  return resultMessage;
};

// Game mode where the players each enter their respective bets for the round
var updateBets = function (playerBetInput) {
  var resultMessage;
  // Input validation: if user tries to place a bet higher than their current chips tally
  if (
    isNaN(playerBetInput) ||
    Math.floor(Number(playerBetInput)) > players[turn].chips ||
    Math.floor(Number(playerBetInput)) == 0
  ) {
    resultMessage = `Sorry ${players[turn].playerName}, you have an entered an invalid bet.<br><br>You currently have ${players[turn].chips} chips - please try again.`;
    return resultMessage;
  }
  // Valid input, so we update player bets in the `players` array and decrease their chips tally accordingly
  players[turn][`hand${currentHandNum}`].playerBet = Math.floor(Number(playerBetInput));
  players[turn].chips -= players[turn][`hand${currentHandNum}`].playerBet;
  resultMessage = `You have placed a bet of ${players[turn][`hand${currentHandNum}`].playerBet}
  chips for this round, ${players[turn].playerName}.`;
  turn += 1;
  // Condition to check if all players have placed their bets
  if (turn == players.length) {
    turn = 0; // Reset turn so that the round can start in the right order
    gameMode = DEAL_CARDS; // Update game to the next mode
    resultMessage += `<br><br>All players have successfully placed their bets for the round. Please click on "Submit" to deal the cards.`;
  } else {
    resultMessage += `<br><br>It is now your turn to place your bet, ${players[turn].playerName}. You currently have ${players[turn].chips} chips.`;
  }
  return resultMessage;
};

// Game mode where we deal the cards to all players
var dealCards = function () {
  // Create the deck and shuffle it
  deck = shuffleCards(createDeck());
  // Deal the cards to each player and the dealer
  for (var i = 0; i < players.length; i++) {
    players[i].hand1.cards = [deck.pop(), deck.pop()]; // Call it `hand1` as a player might have `hand2` if they split
  }
  dealerHand.cards = [deck.pop(), deck.pop()];
  var resultMessage = `All players have now received their hands.<br><br>The dealer's first card is ${dealerHand.cards[0].name} of ${dealerHand.cards[0].suit}.<br><br> Click on "Submit" to start playing the round.`;
  gameMode = SHOW_HAND; // Update game to the next mode
  return resultMessage;
};

// Game mode where we show the current player their hand
var showPlayerHand = function () {
  // Calculate value of player hand
  calcHandValue(players[turn][`hand${currentHandNum}`]);
  var resultMessage = `It is your turn, ${players[turn].playerName}.`;
  // Determine and show the next steps based on the state of the player's hand
  resultMessage += `<br><br>${interpretHandState(players[turn][`hand${currentHandNum}`])}`;
  return resultMessage;
};

// Helper function to display the cards in a hand, and the value of the hand
var displayHandCards = function (hand) {
  var handCards = hand.cards.map((card) => `${card.name} of ${card.suit}`).join(" | ");
  var resultMessage = `Hand ${hand.handNum} is (${handCards}), which represents a value of ${hand.value}.`;
  // If the hand has an alternate value (i.e. has at least one ace), display that as well
  if (hand.altValue) {
    resultMessage += ` Or an alternate value of ${hand.altValue}.`;
  }
  return resultMessage;
};

// Helper function to determine next steps for the current player based on the state of the hand
var interpretHandState = function (hand, playerDecision) {
  // If we are interpreting a player's hand
  if (turn < players.length) {
    var resultMessage = "";
    // Check splitting eligibility:
    // Players has only two cards (both same rank), player has not split before, it's not the dealer's turn, player has sufficient chips to split
    if (
      hand.cards[0].rank == hand.cards[1].rank &&
      hand.cards.length == 2 &&
      !hand.splitStatus &&
      turn < players.length &&
      players[turn].chips >= hand.playerBet
    ) {
      gameMode = CHOOSE_SPLIT;
      resultMessage = `Your ${displayHandCards(players[turn][`hand${currentHandNum}`])}<br><br>
      You are eligible for splitting. If you would like to do so, please type "${YES}", otherwise type "${NO}".`;
    }
    // Progress to next turn if current player hit Blackjack since there is no more action left for the player to take
    else if (hand.value == 21 || hand.altValue == 21) {
      resultMessage = `Your ${displayHandCards(players[turn][`hand${currentHandNum}`])}<br><br>
      You have hit Blackjack, ${players[turn].playerName}! 🎉🎉`;
      // Check whether next turn should be player's second hand, or the next player
      resultMessage += `<br><br>${checkNextTurnLogic(turn)}`;
    }
    // Progress to next turn if current player BUST since there is no more action left for the player to take
    // Don't need to check altValue as it must be greater than value
    else if (hand.value > 21) {
      resultMessage = `Your ${displayHandCards(players[turn][`hand${currentHandNum}`])}<br><br>
      Unfortunately that is a bust, ${players[turn].playerName}. 🤦‍♂️🤦‍♀️`;
      // Check whether next turn should be player's second hand, or the next player
      resultMessage += `<br><br>${checkNextTurnLogic(turn)}`;
    }
    // Progress to next turn if current player decided to STAY since there is no more action left for the player to take
    else if (playerDecision == STAY) {
      // Check whether next turn should be player's second hand, or the next player
      resultMessage += `${checkNextTurnLogic(turn)}`;
    }
    // If we have reached this point, then current player needs to make a decision as their hand is UNDER and they have not chosen to end their turn
    else {
      resultMessage = `Your ${displayHandCards(players[turn][`hand${currentHandNum}`])}<br><br>
      Please enter "${HIT}" to receive another card,
      or "${STAY}" to end your turn, ${players[turn].playerName}.`;
      gameMode = PENDING_PLAYER_DECISION; // Update game to the next mode
    }
    // End the function here if we were interpreting a player's hand
    return resultMessage;
  }
  // If we are interpreting the dealer's hand, i.e. if (turn == players.length) when calling interpretHandState function
  while (hand.value < 17) {
    // If the dealer's hand's alternate value already meets the criteria, then we break (stop) the loop
    if (hand.altValue >= 17) {
      break;
    }
    // Otherwise we keep hitting for the dealer's hand until its normal value meets the criteria
    hitHand(hand);
  }
};

// Game mode where we interpret the player's choice on whether to split their hand
var interpretSplitChoice = function (splitChoice) {
  var resultMessage;
  // Input validation
  if (splitChoice != YES && splitChoice != NO) {
    resultMessage = `You have entered an invalid choice. Please enter "${YES}" to split your hand, or "${NO}" to decline the split.<br><br>
    In case you have forgotten: Your ${displayHandCards(players[turn][`hand${currentHandNum}`])}`;
    return resultMessage;
  }
  // Valid input, so we proceed with processing the player's choice
  if (splitChoice == YES) {
    players[turn].hand1.splitStatus = splitChoice;
    players[turn].hand2 = { cards: [], handNum: 2, value: 0, playerBet: 0, splitStatus: splitChoice };
    // Take the second card in hand1 and put that into hand2
    players[turn].hand2.cards.push(players[turn].hand1.cards.pop());
    // Add a card to hand1 and hand2
    players[turn].hand1.cards.push(deck.pop());
    players[turn].hand2.cards.push(deck.pop());
    // Update hand value of both hands
    calcHandValue(players[turn].hand1);
    calcHandValue(players[turn].hand2);
    // Duplicate the bet onto hand2
    players[turn].hand2.playerBet = players[turn].hand1.playerBet;
    players[turn].chips -= players[turn].hand2.playerBet;
    // Show both hands to the player
    resultMessage = `You have chosen to split your hand - your initial bet has been duplicated onto your second hand.<br><br>
    Your ${displayHandCards(players[turn].hand1)}<br><br>
    Your ${displayHandCards(players[turn].hand2)}<br><br>
    You will now be playing your first hand, and then followed by your second hand. Please click on "Submit" to proceed.`;
    gameMode = SHOW_HAND; // Update game mode for player to play their first hand
  }
  // If player does not want to split, let them resume playing their hand
  else {
    players[turn].hand1.splitStatus = splitChoice;
    resultMessage = `You have declined the split. Click on "Submit" to continue playing your hand.`;
    gameMode = SHOW_HAND; // Update game mode for player to continue playing their hand
  }
  return resultMessage;
};

// Helper function to check whether we should go to the second hand or to the next player
var checkNextTurnLogic = function () {
  var resultMessage = "";
  // If the current player has a second hand, then let them play the second hand next
  if (currentHandNum == 1 && window.players[turn].hand2) {
    currentHandNum += 1;
  } else if (currentHandNum == 2) {
    // Current player has already played second hand, so naturally we go to the next player and reset currentHandNum
    currentHandNum -= 1;
    turn += 1;
  } else {
    // Current player does not have a second hand, so we increment the turn counter to go to the next player's turn
    turn += 1;
  }
  // If the last player has played their turn, then progress game to the next mode (show round results)
  if (turn == players.length) {
    resultMessage = `All players have now finished their turns. Click on "Submit" to reveal the dealer's full hand and therefore the result of the round.`;
    gameMode = CALC_ROUND_RESULT; // Update game to the next mode
  } else {
    // There are still players who haven't played yet, so we show a player's hand next
    gameMode = SHOW_HAND; //
    resultMessage = showPlayerHand();
  }
  return resultMessage;
};

// Game mode where we take in the current player's decision
var pendingPlayerDecision = function (decisionInput) {
  var resultMessage = "";
  // Input validation
  if (decisionInput != HIT && decisionInput != STAY) {
    resultMessage = `You have entered an invalid input.<br><br>
    Please enter "${HIT}" to receive another card, or "${STAY}" to end your turn, ${players[turn].playerName}
    <br><br>In case you have forgotten: Your ${displayHandCards(players[turn][`hand${currentHandNum}`])}`;
    return resultMessage;
  }
  // Hit the player's hand if they decided to HIT
  if (decisionInput == HIT) {
    var newCard = hitHand(players[turn][`hand${currentHandNum}`]);
    resultMessage += `You drew ${newCard.name} of ${newCard.suit}.<br><br>`;
  }
  // Determine and show the next steps based on the state of the player's hand
  resultMessage += interpretHandState(players[turn][`hand${currentHandNum}`], decisionInput);
  return resultMessage;
};

// Game mode where we display the results of the round
var genRoundResult = function () {
  // Finish the dealer's hand first
  calcHandValue(dealerHand);
  interpretHandState(dealerHand);
  // Find the winners and losers of the round
  for (var i = 0; i < players.length; i++) {
    for (var handCounter = 1; handCounter < 3; handCounter++) {
      // Player wins automatically if they have Blackjack, even if dealer also has Blackjack
      if (players[i][`hand${handCounter}`]?.value == 21 || players[i][`hand${handCounter}`]?.altValue == 21) {
        players[i][`hand${handCounter}`].roundResult = WIN;
        // Player loses automatically if they bust, even if dealer also busts
      } else if (players[i][`hand${handCounter}`]?.value > 21) {
        players[i][`hand${handCounter}`].roundResult = LOSE;
        // Player wins if they do not bust AND dealer busts
      } else if (players[i][`hand${handCounter}`] && dealerHand.value > 21) {
        players[i][`hand${handCounter}`].roundResult = WIN;
        // Player loses if their hand value is lower than or equal to dealer's
      } else if (
        players[i][`hand${handCounter}`] &&
        findOptimalValue(players[i][`hand${handCounter}`]) <= findOptimalValue(dealerHand)
      ) {
        players[i][`hand${handCounter}`].roundResult = LOSE;
        // Player wins if their hand value is higher than dealer's
      } else if (
        players[i][`hand${handCounter}`] &&
        findOptimalValue(players[i][`hand${handCounter}`]) > findOptimalValue(dealerHand)
      ) {
        players[i][`hand${handCounter}`].roundResult = WIN;
      }
      // Payout the winning bets
      if (players[i][`hand${handCounter}`]?.roundResult == WIN) {
        players[i].chips += 2 * players[i][`hand${handCounter}`].playerBet; // Winning player gets back their original bet + the winnings
      }
    }
  }
  // Display the results of the round
  var roundResults = displayRoundResults(players);
  // Remove the players who have 0 chips remaining at the end of the round
  roundResults += eliminatePlayers(players);
  // If there are still players remaining that can play the next round
  if (players.length > 0) {
    turn = 0; // Reset the turn counter for the next round
    // Reset the hand.altValue for all players and the dealer for the next round
    for (var i = 0; i < players.length; i++) {
      console.log(`i ${i}`);
      delete players[i].hand1.altValue;
      if (players[i].hand2?.altValue) {
        delete players[i].hand2.altValue;
      }
    }
    delete dealerHand.altValue;
    // Reset the deck for the next round
    deck = [];
    gameMode = PLACE_BETS; // Update game mode for the next round
    // Prompt players to start the next round
    roundResults += `<br><br>Please enter your bet for the next round, ${players[turn].playerName}.`;
  } else {
    // There are no more eligible players, so the game ends
    roundResults += `<br><br>${noPlayersLeft()}`;
    gameMode = NO_PLAYERS_LEFT;
  }
  return roundResults;
};

// Game mode where we tell the user that there are no eligible players remaining
var noPlayersLeft = function () {
  var resultMessage = `All players have been eliminated 😭<br><br>Refresh the page to play again.`;
  return resultMessage;
};

// Helper function to remove players with 0 chips remaining, as they will not be able to play the next round
var eliminatePlayers = function (players) {
  var resultMessage = "";
  // Check if there are any players to be removed
  if (players.find(({ chips }) => chips == 0)) {
    var eliminatedPlayers = [];
    // When removing elements from an array, we need to loop backwards as we are modifying the length of the array, so as to not skip any elements
    for (var i = players.length - 1; i >= 0; i--) {
      if (players[i].chips == 0) {
        // Remove players with 0 chips and add them into the eliminatedPlayers array
        eliminatedPlayers = [...eliminatedPlayers, ...players.splice(i, 1)];
      }
    }
    // Output the names of the removed players
    var eliminatedPlayersNames = eliminatedPlayers.map((player) => player.playerName);
    resultMessage += `<br><br>
    The following players have been eliminated: (${eliminatedPlayersNames.join(" | ")}).`;
  }
  return resultMessage;
};

// Helper function to generate the results of the round
var displayRoundResults = function (players) {
  // Display dealer's cards
  var roundResults = `The dealer's ${displayHandCards(dealerHand)}<br><br>
  Here are the round results:<br><br>`;
  // Show each player's hand and whether they won or lost
  for (var i = 0; i < players.length; i++) {
    roundResults += `Player Name: ${players[i].playerName}<br>
    Hand 1: Your ${displayHandCards(players[i].hand1)}<br>
    Bet: ${players[i].hand1.playerBet} chips<br>Result: ${players[i].hand1.roundResult}`;
    // If the player has a Hand 2, show its results as well
    if (window.players[i].hand2) {
      roundResults += `<br>Hand 2: Your ${displayHandCards(players[i].hand2)}<br>
      Bet: ${players[i].hand2.playerBet} chips<br>Result: ${players[i].hand2.roundResult}<br><br>`;
    } else {
      roundResults += `<br><br>`;
    }
  }
  // Display the current chips tally of all players
  var playerNamesArray = players.map((player) => player.playerName);
  var playerChipsArray = players.map((player) => player.chips);
  roundResults += `All bets have now been settled. The current chips tally is:<br><br>
  ${playerNamesArray.join(" | ")}<br>${playerChipsArray.join(" | ")}`;
  return roundResults;
};

// Helper function to find the optimal value of a hand
var findOptimalValue = function (hand) {
  var optimalValue;
  if (hand.altValue <= 21) {
    optimalValue = hand.altValue;
  } else {
    optimalValue = hand.value;
  }
  return optimalValue;
};

// Helper function that is called when the player / dealer decides to HIT
var hitHand = function (hand) {
  // Add a new card to the player / dealer's hand
  var newCard = deck.pop();
  hand.cards.push(newCard);
  // Update the value of the player / dealer's hand
  calcHandValue(hand);
  return newCard;
};

// Helper function to calculate the value (and altValue) of a hand
var calcHandValue = function (hand) {
  // Sum the ranks of the cards in the hand to calculate the hand value
  var normHandValue = hand.cards.reduce((card1, card2) => card1 + card2.rank, 0);
  // Update the hand value for the player / dealer
  hand.value = normHandValue;
  // Add 10 since the alternate value of `ace` is 11 instead of 1. We can only add this a maximum of once, as 2 * 11 is already > 21 which is a bust.
  var altHandValue = normHandValue + 10;
  // If player / dealer has one or more aces in their hand, update their alternate hand value
  if (hand.cards.find(({ name }) => name == "ace")) {
    hand.altValue = altHandValue;
  }
};

var main = function (input) {
  var myOutputValue;
  if (gameMode == CHOOSE_NUM_PLAYERS) {
    myOutputValue = updateNumPlayers(input);
  } else if (gameMode == CHOOSE_PLAYER_NAMES) {
    myOutputValue = updatePlayerNames(input);
  } else if (gameMode == PLACE_BETS) {
    myOutputValue = updateBets(input);
  } else if (gameMode == DEAL_CARDS) {
    myOutputValue = dealCards();
  } else if (gameMode == SHOW_HAND) {
    myOutputValue = showPlayerHand(turn);
  } else if (gameMode == CHOOSE_SPLIT) {
    myOutputValue = interpretSplitChoice(input);
  } else if (gameMode == PENDING_PLAYER_DECISION) {
    myOutputValue = pendingPlayerDecision(input);
  } else if (gameMode == CALC_ROUND_RESULT) {
    myOutputValue = genRoundResult();
  } else if (gameMode == NO_PLAYERS_LEFT) {
    myOutputValue = noPlayersLeft();
  }
  return myOutputValue;
};
