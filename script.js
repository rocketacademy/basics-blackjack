// Global variables:
var dealersCard1PlusCard2 = ``;
var dealersCard1PlusCard2PlusMore = ``;
var playerCard1PlusCard2 = ``;
var playerCard1PlusCard2PlusMore = ``;
var playerCard1PlusCard2PlusMore_alternative = ``;
var arrayOfPlayerCards = [];
var arrayOfDealersCards = [];
var player_first_card_is_ace = ``;
var player_second_card_is_ace = ``;
var valueOfAce = ``;
var dealerBlackjacksMessage = ``;
var playerName = ``;
var playerStash = 100;
var bet = 0;
var numberOfPlayers = 0;
var playerCounter = 1;

// To keep track of all the possible stages of the game
var HOW_MANY_PLAYERS = `How many players?`;
var DISPLAY_NUMBER_OF_PLAYERS = `Display number of players`;
var WHATS_YOUR_NAME = `Whats your name?`;
var WAITING_FOR_NAME = `waiting for player to enter name`;
var SHOW_NAME = `Show name`;
var HOW_MUCH_BET = `How much do you wanna bet this round?`;
var SHOW_BET = `Show bet`;
var PLAYER_TO_ENTER_DEAL = `waiting for player to enter deal`;
var DEAL_FIRST_2_CARDS = `deal first 2 cards`;
var PLAYER_TO_ENTER_HIT_OR_STAND = `player to enter hit or stand`;
var VIEW_DEALERS_FIRST_2_CARDS = `view dealer's first 2 cards`;
var REVEAL_THE_WINNER = `reveal the winner`;
var ACE_1_OR_11 = `Should Ace be 1 or 11?`;
var ACE_TO_BE_1 = `Ace to be 1`;
var ACE_TO_BE_11 = `Ace to be 11`;
var ACE_VALUE_SELECTED = `Ace value selected`;
var FINAL_ACE_VALUE = `Final ace value?`;
var DO_YOU_WANNA_SPLIT = `Does player want to split?`;

// Set the initial stage of game
var stageOfGame = HOW_MANY_PLAYERS;

// Function to reset game after each game ends
var resetGame = function () {
  stageOfGame = SHOW_NAME;
  console.log(`game resets`);
  arrayOfPlayerCards = [];
  arrayOfDealersCards = [];
  playerCard1PlusCard2 = 0;
  valueOfAce = ``;
};

// Main function:
var main = function (input) {
  var shuffledDeck = shuffleCards(deck);
  var myOutputValue = ``;

  // Ask how many players
  if (stageOfGame == HOW_MANY_PLAYERS) {
    myOutputValue = `Hi there! How many players are there at the table?`;
    stageOfGame = DISPLAY_NUMBER_OF_PLAYERS;
  } else if (stageOfGame == DISPLAY_NUMBER_OF_PLAYERS) {
    numberOfPlayers = input;
    myOutputValue = `There are ${numberOfPlayers} number of players at the table.`;
    stageOfGame = WHATS_YOUR_NAME;
  }

  // Ask player for his name
  if (stageOfGame == WHATS_YOUR_NAME) {
    myOutputValue = `Hi there! Welcome to the Blackjack table. What's your name?`;

    if (playerCounter < numberOfPlayers) {
      console.log(playerCounter);
      console.log(numberOfPlayers);
      stageOfGame = WHATS_YOUR_NAME;
      playerCounter = playerCounter + 1;
    } else {
      stageOfGame = WAITING_FOR_NAME;
    }

    // stageOfGame = WAITING_FOR_NAME;
  } else if (stageOfGame == WAITING_FOR_NAME) {
    playerName = input;
    console.log(`Player's name is: ${playerName}`);

    stageOfGame = SHOW_NAME;
  }

  // Say hi to player's name, and ask to place bet
  if (stageOfGame == SHOW_NAME) {
    myOutputValue = `Nice to meet you, ${playerName}! Please place your bet.<br><br>Your stash now: $${playerStash}`;

    stageOfGame = HOW_MUCH_BET;
  } else if (stageOfGame == HOW_MUCH_BET && input <= playerStash) {
    bet = input;
    console.log(`Player's bet: ${bet}`);

    stageOfGame = SHOW_BET;
  }
  // Player can't bet more than what he has and must only input a number
  else if (input > playerStash) {
    myOutputValue = `Oops! You can't bet more than what you have. Please enter another bet. <br><br>Your stash now: $${playerStash}`;
  } else if (stageOfGame == HOW_MUCH_BET && isNaN(Number(input)) == true) {
    myOutputValue = `Oops! You can only enter a number. Please place your bet.<br><br>Your stash now: $${playerStash}`;
  }

  // Show player his bet, and ask to enter "deal"
  if (stageOfGame == SHOW_BET) {
    playerStash = playerStash - bet;

    myOutputValue = `Nice to meet you, ${playerName}! You've placed $${bet} as your bet this round. The deck is shuffled. Enter "deal" to deal cards.<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

    stageOfGame = PLAYER_TO_ENTER_DEAL;
  }

  // If player enters "deal", to deal 2 cards each
  else if (input == `deal` && stageOfGame == PLAYER_TO_ENTER_DEAL) {
    stageOfGame = DEAL_FIRST_2_CARDS;

    // Dealer draws 2 cards
    var dealersCard1 = shuffledDeck.pop();

    // To be used if need to fix dealer's card 1
    // dealersCard1.name = 2;
    // dealersCard1.rank = 2;

    console.log(`Dealer's card: ${dealersCard1.name} of ${dealersCard1.suit}`);

    var dealersCard2 = shuffledDeck.pop();

    // To be used if need to fix dealer's card 2
    // dealersCard2.name = `🅰️ Ace`;
    // dealersCard2.rank = 1;

    console.log(`Dealer's card: ${dealersCard2.name} of ${dealersCard2.suit}`);

    // Dealer's total score from first 2 cards
    dealersCard1PlusCard2 = dealersCard1.rank + dealersCard2.rank;
    console.log(`Dealer's cards 1 and 2 Total = ${dealersCard1PlusCard2}`);

    // Push Dealer's 1st and 2nd card into array
    arrayOfDealersCards.push(`${dealersCard1.name} of ${dealersCard1.suit}`);
    arrayOfDealersCards.push(` ${dealersCard2.name} of ${dealersCard2.suit}`);
    console.log(arrayOfDealersCards);

    // Player draws 2 cards
    var playerCard1 = shuffledDeck.pop();

    // To be used if need to fix player's card 1
    playerCard1.name = 2;
    playerCard1.rank = 2;

    console.log(`Player card: ${playerCard1.name} of ${playerCard1.suit}`);

    var playerCard2 = shuffledDeck.pop();

    // To be used if need to fix player's card 2
    playerCard2.name = 2;
    playerCard2.rank = 2;

    console.log(`Player card: ${playerCard2.name} of ${playerCard2.suit}`);

    // Player's total score from first 2 cards
    playerCard1PlusCard2 = playerCard1.rank + playerCard2.rank;
    console.log(`Player's cards 1 and 2 Total = ${playerCard1PlusCard2}`);

    // Push Player's 1st and 2nd card into array
    arrayOfPlayerCards.push(`${playerCard1.name} of ${playerCard1.suit}`);
    arrayOfPlayerCards.push(` ${playerCard2.name} of ${playerCard2.suit}`);
    console.log(arrayOfPlayerCards);

    // If player gets a 10 + an Ace = Blackjack!; Player wins; Dealer loses immediately
    if (
      (playerCard1.rank == 1 && playerCard2.rank == 10) ||
      (playerCard1.rank == 10 && playerCard2.rank == 1)
    ) {
      // Unless if dealer has blackjack too, then it's a draw immediately
      if (
        (dealersCard1.rank == 1 && dealersCard2.rank == 10) ||
        (dealersCard1.rank == 10 && dealersCard2.rank == 1)
      ) {
        console.log(`Both player and dealer blackjack!`);

        playerStash = Number(playerStash) + Number(bet);
        bet = 0;
        myOutputValue = `You drew:${arrayOfPlayerCards}.<br><br>Your total score now is 21.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is also 21.<br><br>Tough luck, both you and the Dealer Blackjack! It's a draw!<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;
      } else {
        console.log(`player blackjack!`);
        console.log(dealersCard1.rank);
        console.log(dealersCard2.rank);

        playerStash = Number(playerStash) + 3 * Number(bet);
        bet = 0;
        myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score now is 21.<br><br>Blackjack! You win!<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;
      }
      // Game resets
      var gameResets = resetGame();

      return myOutputValue;
    }

    // If player draws an Ace and didn't blackjack, ask if he wants it to be 1 or 11
    else if (
      (playerCard1.name == `🅰️ Ace` && playerCard2.rank != 10) ||
      (playerCard2.name == `🅰️ Ace` && playerCard1.rank != 10)
    ) {
      console.log(
        `player's card name: ${playerCard1.name} and ${playerCard2.name}`
      );
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Do you want the Ace to be 1 or 11?<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

      stageOfGame = ACE_1_OR_11;
      console.log(stageOfGame);
    }

    // If no Blackjacks, and no Ace, continue playing and display to player his first 2 cards + dealer's first card, and ask to hit or stand
    else {
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score now is ${playerCard1PlusCard2}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter "hit" to draw another card, or enter "stand" if you don't wish to draw any more cards.<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

      // Store player's and dealer's initial score in a variable
      playerCard1PlusCard2PlusMore = playerCard1PlusCard2;
      console.log(`player's total score: ${playerCard1PlusCard2PlusMore}`);

      dealersCard1PlusCard2PlusMore = dealersCard1PlusCard2;
      console.log(`dealer's total score: ${dealersCard1PlusCard2PlusMore}`);

      stageOfGame = PLAYER_TO_ENTER_HIT_OR_STAND;
      console.log(stageOfGame);
    }
    // If dealer gets a 10 + an Ace = Blackjack!; Player loses; Dealer wins; but will not reveal to player until the end
    if (
      (dealersCard1.rank == 1 && dealersCard2.rank == 10) ||
      (dealersCard1.rank == 10 && dealersCard2.rank == 1)
    ) {
      console.log(`dealer blackjack!`);

      playerStash = playerStash;
      bet = 0;

      // Store dealer blackjacks message in a variable, to be used at the end
      dealerBlackjacksMessage = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score now is ${playerCard1PlusCard2}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is 21.<br><br>Blackjack! You lose!<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;
    }
  }
  // Restrict player to only enter "deal"
  else if (input != `deal` && stageOfGame == PLAYER_TO_ENTER_DEAL) {
    myOutputValue = `Oops! You have entered an invalid entry. Please enter "deal" only.`;
  }

  // If player wants Ace to be 1
  else if (input == "1" && stageOfGame == ACE_1_OR_11) {
    console.log(`Player wants Ace to be 1`);

    playerCard1PlusCard2 = playerCard1PlusCard2;
    console.log(playerCard1PlusCard2);

    myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>You have chosen Ace to be 1.<br>Your total score now is ${playerCard1PlusCard2}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter "hit" to draw another card, or enter "stand" if you don't wish to draw any more cards.<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

    valueOfAce = 1;

    // Store player's and dealer's initial score in a variable

    playerCard1PlusCard2PlusMore = playerCard1PlusCard2;
    console.log(`player's total score: ${playerCard1PlusCard2PlusMore}`);

    dealersCard1PlusCard2PlusMore = dealersCard1PlusCard2;
    console.log(`dealer's total score: ${dealersCard1PlusCard2PlusMore}`);

    stageOfGame = PLAYER_TO_ENTER_HIT_OR_STAND;
    console.log(stageOfGame);
  }

  // If player wants Ace to be 11
  else if (input == "11" && stageOfGame == ACE_1_OR_11) {
    console.log(`Player wants Ace to be 11`);

    playerCard1PlusCard2 = playerCard1PlusCard2 + 10;
    console.log(playerCard1PlusCard2);

    myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>You have chosen Ace to be 11.<br>Your total score now is ${playerCard1PlusCard2}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter "hit" to draw another card, or enter "stand" if you don't wish to draw any more cards.<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

    valueOfAce = 11;

    // Store player's and dealer's initial score in a variable

    playerCard1PlusCard2PlusMore = playerCard1PlusCard2;
    console.log(`player's total score: ${playerCard1PlusCard2PlusMore}`);

    dealersCard1PlusCard2PlusMore = dealersCard1PlusCard2;
    console.log(`dealer's total score: ${dealersCard1PlusCard2PlusMore}`);

    stageOfGame = PLAYER_TO_ENTER_HIT_OR_STAND;
    console.log(stageOfGame);
  }
  // If player has Ace, restrict player to let his Ace be "1" or "11" only
  else if ((input != "1" || input != "11") && stageOfGame == ACE_1_OR_11) {
    myOutputValue = `Oops! You have entered an invalid entry. Please enter if you want your Ace to be "1" or "11" only.`;
  }
  // Restrict player to enter "hit" or "stand" only
  else if (
    (input != "hit" || input != "stand") &&
    stageOfGame == PLAYER_TO_ENTER_HIT_OR_STAND
  ) {
    myOutputValue = `Oops! You have entered an invalid entry. Please only enter "hit" to draw another card or "stand" to stop drawing more cards.`;
  }

  // Every time player enters "hit", he'll draw another card
  if (input == "hit" && stageOfGame == PLAYER_TO_ENTER_HIT_OR_STAND) {
    var playerCard3AndOnwards = shuffledDeck.pop();

    console.log(
      `Player's new card: ${playerCard3AndOnwards.name} of ${playerCard3AndOnwards.suit}`
    );

    // Push Player's subsequent cards into array
    arrayOfPlayerCards.push(
      ` ${playerCard3AndOnwards.name} of ${playerCard3AndOnwards.suit}`
    );
    console.log(arrayOfPlayerCards);

    // To continuously sum up player's score
    playerCard1PlusCard2PlusMore =
      playerCard1PlusCard2PlusMore + playerCard3AndOnwards.rank;
    console.log(
      `Player's cards 1 and 2 and more Total = ${playerCard1PlusCard2PlusMore}`
    );

    // If user has an Ace, ALWAYS show him the 2 possible scores, and ask him to choose, before entering hit or stand

    if (valueOfAce == 1) {
      // To compute the other possible score for the player, if Ace had been = 11
      playerCard1PlusCard2PlusMore_alternative =
        playerCard1PlusCard2PlusMore + 10;

      console.log(playerCard1PlusCard2PlusMore);
      console.log(playerCard1PlusCard2PlusMore_alternative);

      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>You have an Ace. Your total score can be ${playerCard1PlusCard2PlusMore} or ${playerCard1PlusCard2PlusMore_alternative}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter the score you want your hand to be.<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

      stageOfGame = FINAL_ACE_VALUE;
    } else if (valueOfAce == 11) {
      console.log(valueOfAce);

      // To compute the other possible score for the player, if Ace had been = 1
      playerCard1PlusCard2PlusMore_alternative =
        playerCard1PlusCard2PlusMore - 10;

      console.log(playerCard1PlusCard2PlusMore);
      console.log(playerCard1PlusCard2PlusMore_alternative);

      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>You have an Ace. Your total score can be ${playerCard1PlusCard2PlusMore} or ${playerCard1PlusCard2PlusMore_alternative}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter the score you want your hand to be.<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

      stageOfGame = FINAL_ACE_VALUE;
    }

    // Display to player his cards and ask to continue to hit or stand
    else {
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score now is ${playerCard1PlusCard2PlusMore}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter "hit" to draw another card, or enter "stand" if you don't wish to draw any more cards.<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;
    }
  }

  // If player has Ace, and has drawn more cards, can now decide if he wants his Ace to be 1 or 11
  if (
    (input == playerCard1PlusCard2PlusMore ||
      input == playerCard1PlusCard2PlusMore_alternative) &&
    stageOfGame == FINAL_ACE_VALUE
  ) {
    console.log(input);
    playerCard1PlusCard2PlusMore = Number(input);
    myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score now is ${playerCard1PlusCard2PlusMore}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter "hit" to draw another card, or enter "stand" if you don't wish to draw any more cards.<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

    stageOfGame = PLAYER_TO_ENTER_HIT_OR_STAND;
  }

  // If user enters "stand", ask him to enter "next" to view dealer's cards
  if (input == "stand" && stageOfGame == PLAYER_TO_ENTER_HIT_OR_STAND) {
    myOutputValue = `You have chosen to "stand".<br>You drew:<br>${arrayOfPlayerCards}.<br>Your total score now is ${playerCard1PlusCard2PlusMore}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter "next" to view the Dealer's cards.<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

    stageOfGame = VIEW_DEALERS_FIRST_2_CARDS;
  }
  // Restrict user to only enter "next" from here onwards
  else if (input != `next` && stageOfGame == VIEW_DEALERS_FIRST_2_CARDS) {
    myOutputValue = `Oops! You have entered an invalid entry. Please enter "next" only to view the Dealer's cards.`;
  } else if (input == `next` && stageOfGame == VIEW_DEALERS_FIRST_2_CARDS) {
    // As long as dealer's score is less than 17, dealer MUST draw another card
    while (
      dealersCard1PlusCard2PlusMore < 17 &&
      dealerBlackjacksMessage == ``
    ) {
      var dealersCard3AndOnwards = shuffledDeck.pop();
      console.log(
        `dealer's new card: ${dealersCard3AndOnwards.name} of ${dealersCard3AndOnwards.suit}`
      );

      // Push Dealer's subsequent cards into array
      arrayOfDealersCards.push(
        ` ${dealersCard3AndOnwards.name} of ${dealersCard3AndOnwards.suit}`
      );
      console.log(arrayOfDealersCards);

      // To continuously sum up Dealer's score
      dealersCard1PlusCard2PlusMore =
        dealersCard1PlusCard2PlusMore + dealersCard3AndOnwards.rank;
    }
    console.log(`Dealer's final score: ${dealersCard1PlusCard2PlusMore}`);

    stageOfGame = REVEAL_THE_WINNER;

    // Compare cards and reveal the winner and loser

    // If player > dealer and both <= 21, then player wins, dealer loses
    if (
      playerCard1PlusCard2PlusMore > dealersCard1PlusCard2PlusMore &&
      playerCard1PlusCard2PlusMore <= 21 &&
      dealerBlackjacksMessage == `` &&
      stageOfGame == REVEAL_THE_WINNER
    ) {
      playerStash = Number(playerStash) + Number(bet) + Number(bet);
      bet = 0;

      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2PlusMore}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is ${dealersCard1PlusCard2PlusMore}.<br><br>You win!<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

      // To reset the game
      var gameResets = resetGame();
    }
    // If player > 21, and dealer <= 21, player busts and loses
    else if (
      playerCard1PlusCard2PlusMore > 21 &&
      dealersCard1PlusCard2PlusMore <= 21 &&
      dealerBlackjacksMessage == `` &&
      stageOfGame == REVEAL_THE_WINNER
    ) {
      playerStash = playerStash;
      bet = 0;

      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score now is ${playerCard1PlusCard2PlusMore}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is ${dealersCard1PlusCard2PlusMore}.<br><br>You bust! You lose!<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

      // To reset the game
      var gameResets = resetGame();
    }

    // If dealer > 21, and player <= 21 then player wins, dealer loses
    else if (
      dealersCard1PlusCard2PlusMore > 21 &&
      playerCard1PlusCard2PlusMore <= 21 &&
      stageOfGame == REVEAL_THE_WINNER
    ) {
      playerStash = Number(playerStash) + Number(bet) + Number(bet);
      bet = 0;

      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2PlusMore}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is ${dealersCard1PlusCard2PlusMore}.<br><br>Dealer busts! You win!<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

      // To reset the game
      var gameResets = resetGame();
    }

    // If player = dealer and both <= 21, then draw
    else if (
      playerCard1PlusCard2PlusMore == dealersCard1PlusCard2PlusMore &&
      playerCard1PlusCard2PlusMore <= 21 &&
      dealersCard1PlusCard2PlusMore <= 21 &&
      dealerBlackjacksMessage == `` &&
      stageOfGame == REVEAL_THE_WINNER
    ) {
      playerStash = Number(playerStash) + Number(bet);
      bet = 0;

      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2PlusMore}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is ${dealersCard1PlusCard2PlusMore}.<br><br>It's a draw!<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

      // To reset the game
      var gameResets = resetGame();
    }

    // If both player and dealer > 21, then draw
    else if (
      playerCard1PlusCard2PlusMore > 21 &&
      dealersCard1PlusCard2PlusMore > 21 &&
      stageOfGame == REVEAL_THE_WINNER
    ) {
      playerStash = Number(playerStash) + Number(bet);
      bet = 0;

      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2PlusMore}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is ${dealersCard1PlusCard2PlusMore}.<br><br>Both player and dealer bust! It's a draw!<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

      // To reset the game
      var gameResets = resetGame();
    }

    // If player < dealer and both <= 21, then player loses, dealer wins
    else if (
      playerCard1PlusCard2PlusMore < dealersCard1PlusCard2PlusMore &&
      playerCard1PlusCard2PlusMore <= 21 &&
      dealersCard1PlusCard2PlusMore <= 21 &&
      dealerBlackjacksMessage == `` &&
      stageOfGame == REVEAL_THE_WINNER
    ) {
      playerStash = playerStash;
      bet = 0;

      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2PlusMore}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is ${dealersCard1PlusCard2PlusMore}.<br><br>You lose!<br><br>Your bet this round: ${bet}<br><br>Your stash now: ${playerStash}`;

      // To reset the game
      var gameResets = resetGame();
    }
    // If dealer gets a 10 + an Ace = Blackjack!; Player loses; Dealer wins
    else if (dealerBlackjacksMessage != ``) {
      console.log(`dealer blackjack!`);
      myOutputValue = dealerBlackjacksMessage;

      // Game resets
      var gameResets = resetGame();
    }
  }

  return myOutputValue;
};

// Function to shuffle cards:
var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;

    index = index + 1;
  }

  return cards;
};

// To generate random numbers/ cards:
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Card Deck:
var makeDeck = function () {
  // Initialise an empty deck array
  var deck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts ♥️", "Diamonds ♦️", "Clubs ♣️", "Spades ♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    // console.log(`current suit: ${currentSuit}`);

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "🅰️ Ace";
      } else if (cardName == 11) {
        cardName = "💂‍♂️ Jack";
      } else if (cardName == 12) {
        cardName = "👸 Queen";
      } else if (cardName == 13) {
        cardName = "🤴 King";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      deck.push(card);
      // console.log(`rank: ${rankCounter}`);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // // Change all picture cards to = 10
  var deckCounter = 0;
  while (deckCounter < 52) {
    if (deck[deckCounter].name == "💂‍♂️ Jack") {
      deck[deckCounter].rank = 10;
    } else if (deck[deckCounter].name == "👸 Queen") {
      deck[deckCounter].rank = 10;
    } else if (deck[deckCounter].name == "🤴 King") {
      deck[deckCounter].rank = 10;
    }

    deckCounter = deckCounter + 1;
  }

  // Return the completed card deck
  return deck;
};

var deck = makeDeck();
