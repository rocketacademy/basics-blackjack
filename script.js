// Global variables
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
var dealerBlackJacksMessage = ``;

// Game modes
var WAITING_FOR_PLAYER_TO_CLICK_SUBMIT = `WAITING_FOR_PLAYER_TO_CLICK_SUBMIT`;
var DEAL_FIRST_2_CARDS = `DEAL_2_CARDS_TO_PLAYER_AND_DEALER`;
var ACE_1_OR_11 = `PLAYER_TO_CHOOSE_ACE_TO_BE_1_OR_11`;
var PLAYER_TO_ENTER_HIT_OR_STAND = `PLAYER_T0_ENTER_HIT_OR_STAND`;
var FINAL_ACE_VALUE = `FINAL_ACE_VALUE`;
var VIEW_DEALERS_FIRST_2_CARDS = `VIEW_DEALERS_FIRST_2_CARDS`;
var REVEAL_THE_WINNER = `REVEAL_THE_WINNER`;

var currentGameMode = WAITING_FOR_PLAYER_TO_CLICK_SUBMIT;

var main = function (input) {
  var shuffledDeck = shuffleCards(deck);
  var myOutputValue = ``;

  // Player clicks submit to start game
  if (currentGameMode == WAITING_FOR_PLAYER_TO_CLICK_SUBMIT) {
    console.log(currentGameMode);

    currentGameMode = DEAL_FIRST_2_CARDS;

    // Dealer draws 2 cards
    var dealersCard1 = shuffledDeck.pop();
    console.log(`Dealer's card: ${dealersCard1.name} of ${dealersCard1.suit}`);
    var dealersCard2 = shuffledDeck.pop();
    console.log(`Dealer's card: ${dealersCard2.name} of ${dealersCard2.suit}`);

    // Change all of dealer's picture cards (if any) to = 10
    if (
      dealersCard1.name == "💂‍♂️ Jack" ||
      dealersCard1.name == "👸 Queen" ||
      dealersCard1.name == "🤴 King"
    ) {
      dealersCard1.rank = 10;
    }

    if (
      dealersCard2.name == "💂‍♂️ Jack" ||
      dealersCard2.name == "👸 Queen" ||
      dealersCard2.name == "🤴 King"
    ) {
      dealersCard2.rank = 10;
    }

    // Dealer's total score from first 2 cards
    dealersCard1PlusCard2 = dealersCard1.rank + dealersCard2.rank;
    console.log(`Dealer's cards 1 and 2 Total = ${dealersCard1PlusCard2}`);

    // Push Dealer's 1st and 2nd card into array
    arrayOfDealersCards.push(`${dealersCard1.name} of ${dealersCard1.suit}`);
    arrayOfDealersCards.push(` ${dealersCard2.name} of ${dealersCard2.suit}`);
    console.log(arrayOfDealersCards);

    // Player draws 2 cards
    var playerCard1 = shuffledDeck.pop();
    console.log(`Player card: ${playerCard1.name} of ${playerCard1.suit}`);
    var playerCard2 = shuffledDeck.pop();
    console.log(`Player card: ${playerCard2.name} of ${playerCard2.suit}`);

    // Change all of player's picture cards (if any) to = 10
    if (
      playerCard1.name == "💂‍♂️ Jack" ||
      playerCard1.name == "👸 Queen" ||
      playerCard1.name == "🤴 King"
    ) {
      playerCard1.rank = 10;
    }

    if (
      playerCard2.name == "💂‍♂️ Jack" ||
      playerCard2.name == "👸 Queen" ||
      playerCard2.name == "🤴 King"
    ) {
      playerCard2.rank = 10;
    }

    // Player's total score from first 2 cards
    playerCard1PlusCard2 = playerCard1.rank + playerCard2.rank;
    console.log(`Player's cards 1 and 2 Total = ${playerCard1PlusCard2}`);

    // Push Player's 1st and 2nd card into array
    arrayOfPlayerCards.push(`${playerCard1.name} of ${playerCard1.suit}`);
    arrayOfPlayerCards.push(` ${playerCard2.name} of ${playerCard2.suit}`);
    console.log(arrayOfPlayerCards);

    // If player gets a 10 + an Ace = Blackjack!; Player wins; Dealer loses

    if (
      (playerCard1.rank == 1 && playerCard2.rank == 10) ||
      (playerCard1.rank == 10 && playerCard2.rank == 1)
    ) {
      console.log(`player blackjack!`);
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is 21.<br><br>Blackjack! Congrats, you win!`;

      // Game resets
      currentGameMode = WAITING_FOR_PLAYER_TO_CLICK_SUBMIT;
      console.log(`game resets`);
      arrayOfPlayerCards = [];
      arrayOfDealersCards = [];
      playerCard1PlusCard2 = 0;
    }

    // If player draws an Ace, ask if player wants it to be 1 or 11
    else if (playerCard1.name == `🅰️ Ace` || playerCard2.name == `🅰️ Ace`) {
      console.log(
        `player's card name: ${playerCard1.name} and ${playerCard2.name}`
      );
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Do you want your Ace to be 1 or 11?`;

      currentGameMode = ACE_1_OR_11;
      console.log(currentGameMode);
    }

    // If no Blackjacks, and no Ace, continue playing and show player his first 2 cards + dealer's first card. Ask player if he wants to hit or stand
    else {
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score now is ${playerCard1PlusCard2}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter "hit" to draw another card, or enter "stand" if you do not wish to draw any more cards.`;

      // Store player's and dealer's initial score in a variable
      playerCard1PlusCard2PlusMore = playerCard1PlusCard2;
      console.log(`player's total score: ${playerCard1PlusCard2PlusMore}`);

      dealersCard1PlusCard2PlusMore = dealersCard1PlusCard2;
      console.log(`dealer's total score: ${dealersCard1PlusCard2PlusMore}`);

      currentGameMode = PLAYER_TO_ENTER_HIT_OR_STAND;
      console.log(currentGameMode);
    }
    // If dealer gets a 10 + an Ace = Blackjack!; Player loses; Dealer wins; but will not reveal to player until the end
    if (
      (dealersCard1.rank == 1 && dealersCard2.rank == 10) ||
      (dealersCard1.rank == 10 && dealersCard2.rank == 1)
    ) {
      console.log(`dealer blackjack!`);
      // Store dealerBlackJacksMessage in a variable, to be used at the end
      dealerBlackJacksMessage = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is 21.<br><br>Blackjack for the Dealer! Boohoo, you lose!`;
    }
  }

  // If player wants Ace to be 1
  else if (input == "1" && currentGameMode == ACE_1_OR_11) {
    console.log(`Player wants Ace to be 1`);
    playerCard1PlusCard2 = playerCard1PlusCard2;
    console.log(playerCard1PlusCard2);
    myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>You have chosen Ace to be 1.<br>Your total score now is ${playerCard1PlusCard2}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter "hit" to draw another card, or enter "stand" if you do not wish to draw any more cards.`;

    valueOfAce = 1;

    // Store player's and dealer's initial score in a variable

    playerCard1PlusCard2PlusMore = playerCard1PlusCard2;
    console.log(`player's total score: ${playerCard1PlusCard2PlusMore}`);

    dealersCard1PlusCard2PlusMore = dealersCard1PlusCard2;
    console.log(`dealer's total score: ${dealersCard1PlusCard2PlusMore}`);

    currentGameMode = PLAYER_TO_ENTER_HIT_OR_STAND;
    console.log(currentGameMode);
  }

  // If player wants Ace to be 11
  else if (input == "11" && currentGameMode == ACE_1_OR_11) {
    console.log(`Player wants Ace to be 11`);
    playerCard1PlusCard2 = playerCard1PlusCard2 + 10;
    console.log(playerCard1PlusCard2);
    myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>You have chosen Ace to be 11.<br>Your total score now is ${playerCard1PlusCard2}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter "hit" to draw another card, or enter "stand" if you do not wish to draw any more cards.`;

    valueOfAce = 11;

    // Store player's and dealer's initial score in a variable

    playerCard1PlusCard2PlusMore = playerCard1PlusCard2;
    console.log(`player's total score: ${playerCard1PlusCard2PlusMore}`);

    dealersCard1PlusCard2PlusMore = dealersCard1PlusCard2;
    console.log(`dealer's total score: ${dealersCard1PlusCard2PlusMore}`);

    currentGameMode = PLAYER_TO_ENTER_HIT_OR_STAND;
    console.log(currentGameMode);
  }
  // If player has Ace, restrict player to let his Ace be "1" or "11" only
  else if ((input != "1" || input != "11") && currentGameMode == ACE_1_OR_11) {
    myOutputValue = `Oops! You have entered an invalid entry. Please enter if you want your Ace to be "1" or "11" only.`;
  }
  // Restrict player to enter "hit" or "stand" only
  else if (
    (input != "hit" || input != "stand") &&
    currentGameMode == PLAYER_TO_ENTER_HIT_OR_STAND
  ) {
    myOutputValue = `Oops! You have entered an invalid entry. Please only enter "hit" to draw another card or "stand" to stop drawing more cards.`;
  }

  // While loop, every time player enters "hit", he'll draw another card
  while (input == "hit" && currentGameMode == PLAYER_TO_ENTER_HIT_OR_STAND) {
    var playerCard3AndOnwards = shuffledDeck.pop();

    // Change all of player's subsequent picture cards (if any) to = 10
    if (
      playerCard3AndOnwards.name == "💂‍♂️ Jack" ||
      playerCard3AndOnwards.name == "👸 Queen" ||
      playerCard3AndOnwards.name == "🤴 King"
    ) {
      playerCard3AndOnwards.rank = 10;
    }

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

      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>You have an Ace. Your total score can be ${playerCard1PlusCard2PlusMore} or ${playerCard1PlusCard2PlusMore_alternative}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter the score you want your hand to be.`;

      currentGameMode = FINAL_ACE_VALUE;
    } else if (valueOfAce == 11) {
      console.log(valueOfAce);

      // To compute the other possible score for the player, if Ace had been = 1
      playerCard1PlusCard2PlusMore_alternative =
        playerCard1PlusCard2PlusMore - 10;

      console.log(playerCard1PlusCard2PlusMore);
      console.log(playerCard1PlusCard2PlusMore_alternative);

      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>You have an Ace. Your total score can be ${playerCard1PlusCard2PlusMore} or ${playerCard1PlusCard2PlusMore_alternative}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter the score you want your hand to be.`;

      currentGameMode = FINAL_ACE_VALUE;
    }

    // Display to player his cards and ask to continue to hit or stand
    else {
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score now is ${playerCard1PlusCard2PlusMore}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter "hit" to draw another card, or enter "stand" if you do not wish to draw any more cards.`;
    }

    // To exit the loop until the next time user enters "hit" again or "stand"
    input = ``;
  }

  // If player has Ace, and has drawn more cards, can now decide if he wants his Ace to be 1 or 11
  if (
    (input == playerCard1PlusCard2PlusMore ||
      input == playerCard1PlusCard2PlusMore_alternative) &&
    currentGameMode == FINAL_ACE_VALUE
  ) {
    console.log(input);
    playerCard1PlusCard2PlusMore = Number(input);
    myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score now is ${playerCard1PlusCard2PlusMore}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter "hit" to draw another card, or enter "stand" if you do not wish to draw any more cards.`;

    currentGameMode = PLAYER_TO_ENTER_HIT_OR_STAND;
  }

  // If user enters "stand", ask him to enter "next" to view dealer's cards
  else if (
    input == "stand" &&
    currentGameMode == PLAYER_TO_ENTER_HIT_OR_STAND
  ) {
    myOutputValue = `You have chosen to "stand".<br>You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2PlusMore}.<br><br>The dealer's first card is ${arrayOfDealersCards[0]}.<br><br>Enter "next" to view the Dealer's cards.`;

    currentGameMode = VIEW_DEALERS_FIRST_2_CARDS;
  }
  // Restrict user to only enter "next" from here onwards
  else if (input != `next` && currentGameMode == VIEW_DEALERS_FIRST_2_CARDS) {
    myOutputValue = `Oops! You have entered an invalid entry. Please enter "next" only to view the Dealer's cards.`;
  } else if (input == `next` && currentGameMode == VIEW_DEALERS_FIRST_2_CARDS) {
    // As long as dealer's score is less than 17, dealer MUST draw another card
    while (
      dealersCard1PlusCard2PlusMore < 17 &&
      dealerBlackJacksMessage == ``
    ) {
      var dealersCard3AndOnwards = shuffledDeck.pop();
      console.log(
        `dealer's new card: ${dealersCard3AndOnwards.name} of ${dealersCard3AndOnwards.suit}`
      );

      // Change all of dealer's subsequent picture cards (if any) to = 10
      if (
        dealersCard3AndOnwards.name == "💂‍♂️ Jack" ||
        dealersCard3AndOnwards.name == "👸 Queen" ||
        dealersCard3AndOnwards.name == "🤴 King"
      ) {
        dealersCard3AndOnwards.rank = 10;
      }

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

    currentGameMode = REVEAL_THE_WINNER;

    // Compare cards and reveal the winner and loser

    // If player > dealer and both <= 21, then player wins, dealer loses
    if (
      playerCard1PlusCard2PlusMore > dealersCard1PlusCard2PlusMore &&
      playerCard1PlusCard2PlusMore <= 21 &&
      dealerBlackJacksMessage == `` &&
      currentGameMode == REVEAL_THE_WINNER
    ) {
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2PlusMore}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is ${dealersCard1PlusCard2PlusMore}.<br><br>Congrats, you win!`;

      // To reset the game
      currentGameMode = WAITING_FOR_PLAYER_TO_CLICK_SUBMIT;
      console.log(`game resets`);
      arrayOfPlayerCards = [];
      arrayOfDealersCards = [];
      playerCard1PlusCard2 = 0;
      valueOfAce = ``;
    }

    // If player >21, and dealer <=21, player busts and loses
    else if (
      playerCard1PlusCard2PlusMore > 21 &&
      dealersCard1PlusCard2PlusMore <= 21 &&
      dealerBlackJacksMessage == `` &&
      currentGameMode == REVEAL_THE_WINNER
    ) {
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2PlusMore}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is ${dealersCard1PlusCard2PlusMore}.<br><br>You bust! Boohoo, you lose!`;

      // To reset the game
      currentGameMode = WAITING_FOR_PLAYER_TO_CLICK_SUBMIT;
      console.log(`game resets`);
      arrayOfPlayerCards = [];
      arrayOfDealersCards = [];
      playerCard1PlusCard2 = 0;
      valueOfAce = ``;
    }

    // If dealer > 21, and player <=21, then player wins, dealer loses
    else if (
      dealersCard1PlusCard2PlusMore > 21 &&
      playerCard1PlusCard2PlusMore <= 21 &&
      currentGameMode == REVEAL_THE_WINNER
    ) {
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2PlusMore}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is ${dealersCard1PlusCard2PlusMore}.<br><br>Dealer busts! Congrats, you win!`;

      // To reset the game
      currentGameMode = WAITING_FOR_PLAYER_TO_CLICK_SUBMIT;
      console.log(`game resets`);
      arrayOfPlayerCards = [];
      arrayOfDealersCards = [];
      playerCard1PlusCard2 = 0;
      valueOfAce = ``;
    }

    // If player = dealer, and both <=21, then draw
    else if (
      playerCard1PlusCard2PlusMore == dealersCard1PlusCard2PlusMore &&
      playerCard1PlusCard2PlusMore <= 21 &&
      dealersCard1PlusCard2PlusMore <= 21 &&
      dealerBlackJacksMessage == `` &&
      currentGameMode == REVEAL_THE_WINNER
    ) {
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2PlusMore}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is ${dealersCard1PlusCard2PlusMore}.<br><br>It's a draw!`;

      // To reset the game
      currentGameMode = WAITING_FOR_PLAYER_TO_CLICK_SUBMIT;
      console.log(`game resets`);
      arrayOfPlayerCards = [];
      arrayOfDealersCards = [];
      playerCard1PlusCard2 = 0;
      valueOfAce = ``;
    }

    // If both player and deal >21, then draw
    else if (
      playerCard1PlusCard2PlusMore > 21 &&
      dealersCard1PlusCard2PlusMore > 21 &&
      currentGameMode == REVEAL_THE_WINNER
    ) {
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2PlusMore}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is ${dealersCard1PlusCard2PlusMore}.<br><br>Both you and the Dealer bust, it's a draw!`;

      // To reset the game
      currentGameMode = WAITING_FOR_PLAYER_TO_CLICK_SUBMIT;
      console.log(`game resets`);
      arrayOfPlayerCards = [];
      arrayOfDealersCards = [];
      playerCard1PlusCard2 = 0;
      valueOfAce = ``;
    }

    // If player < dealer and both <= 21, then player loses, dealer wins
    else if (
      playerCard1PlusCard2PlusMore < dealersCard1PlusCard2PlusMore &&
      playerCard1PlusCard2PlusMore <= 21 &&
      dealersCard1PlusCard2PlusMore <= 21 &&
      dealerBlackJacksMessage == `` &&
      currentGameMode == REVEAL_THE_WINNER
    ) {
      myOutputValue = `You drew:<br>${arrayOfPlayerCards}.<br>Your total score is ${playerCard1PlusCard2PlusMore}.<br><br>The Dealer's cards are: ${arrayOfDealersCards}.<br>The Dealer's total score is ${dealersCard1PlusCard2PlusMore}.<br><br>Boohoo, you lose!`;

      // To reset the game
      currentGameMode = WAITING_FOR_PLAYER_TO_CLICK_SUBMIT;
      console.log(`game resets`);
      arrayOfPlayerCards = [];
      arrayOfDealersCards = [];
      playerCard1PlusCard2 = 0;
      valueOfAce = ``;
    }
    // If dealer gets a 10 + an Ace = Blackjack!; Player loses; Dealer wins
    else if (dealerBlackJacksMessage != "") {
      console.log(`dealer blackjack`);
      myOutputValue = dealerBlackJacksMessage;

      // Game resets
      currentGameMode = WAITING_FOR_PLAYER_TO_CLICK_SUBMIT;
      console.log(`game resets`);
      arrayOfPlayerCards = [];
      arrayOfDealersCards = [];
      playerCard1PlusCard2 = 0;
      valueOfAce = ``;
      dealerBlackJacksMessage = ``;
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
      rankCounter = rankCounter + 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex = suitIndex + 1;
  }

  // Return the completed card deck
  return deck;
};

var deck = makeDeck();
