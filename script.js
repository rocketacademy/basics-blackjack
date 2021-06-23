//Blackjack (simplified rules)
//how to win: have hand that is higher than the dealer's, but not exceeding 21
//if your hand exceeds 21, it's a 'bust', meaning you are out
//scoring: 2-10 at face value, Jack/ Queen/ King score 10, Ace score 1 or 11
//simplified rules: only 1 player and 1 dealer (computer)
//simplified rules: player who is closer to 21 wins the hand.
//step 1: players each put down a bet
//step 2: dealer deals one card, face up, to each player, then to himself
//step 3: dealer deals a second card, face up to each player, and face down to himself
//step 4a: if player scores 21, automatically wins 1.5x of bet from dealer, then done for that round
//step4b: if want more card (draw from top of the deck), say 'hit'; no limit to how many cards you can hit, but when score exceeds 21, you go bust.
//step4c: if don't want any more cards, say 'stay'.
//step 5: once dealer has been round the table, dealer opens its face-down card
//step 6a: if dealer scores below 18, he has to take another card (i.e. hit)
//step 6b: if dealer scores 18 or higher, he has to stay with his hand
//step 7a: if dealer goes bust, all players win twice their bet
//step 7b: if dealer does not go bust, only players with a higher score win twice their bet, every one else loses their initial bet

//game modes//
var gameModeDeckShuffle = "game mode shuffle deck";
var gameModeDealCard = "game mode deal card";
var gameModePlayerHitOrStand = "game mode player decides hit or stand";
var gameModeDealerHitOrStand = "game mode dealer decides hit or stand";
var gameModeDecideWinner = "game mode to decide winner";

//initiate current game mode with game mode shuffle deck//
var currentGameMode = gameModeDeckShuffle;

//Card deck generation//
var makeDeck = function () {
  //create an empty array for the deck of cards
  var cardDeck = [];
  console.log(cardDeck);
  //to make a deck of cards, need to define suit, card name, and rank
  var suits = ["clubs", "diamonds", "hearts", "spades"];

  var suitIndex = 0;
  //run this loop as long as the suitIndex is shorter than the length of the suit array
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    console.log("current suit: " + currentSuit);
    //Loop from 1-13 to create all cards for a given suit
    // Hence rank loop is contained within the suit loop
    //start rank from 1 so rank is equal to cardname (except 1, 11, 12, 13)
    var rankCounter = 1;
    //since there are 13 ranks in each suit, loop should last till 13

    while (rankCounter <= 13) {
      //by default cardname = rank counter
      console.log("rank:" + rankCounter);
      var cardName = rankCounter;

      // with exception of ace, jack, queen and king
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

      //Add new card to the deck
      cardDeck.push(card);

      //increment rankCounter by +1 after each loop
      rankCounter += 1;
    }
    //increment suitIndex by +1 after each loop
    suitIndex += 1;
  }

  //Return the complete card deck
  return cardDeck;
};

//assign variable to deck of cards
var deck = makeDeck();

//Shuffle deck//
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

//Assign a variable to deck shuffle function
var shuffledDeck = shuffleCards(deck);

//card counter for card-dealing loop//
var cardCounter = 0;

//array to track dealt cards//
var playerDealtCards = [];
var dealerCards = [];

//playerscore//
var playerScore = 0;

//computer score//
var computerScore = 0;

//Determine a winner//
var winner = function () {
  if (playerScore >= computerScore) {
    return "you";
  } else return "computer";
};

//player can choose to hit or stand except for the following scenarios:
//if playerscore > 21, player goes bust
//if playerscore = 21, player wins
var playerStatus = function () {
  if (playerScore == 21) {
    currentGameMode = gameModeDeckShuffle;
    return "You are the winner. <br>Click Submit to play again.";
  }
  if (playerScore > 21) {
    currentGameMode = gameModeDeckShuffle;

    return "You have gone bust. The dealer wins. <br>Click Submit to play again.";
  }

  currentGameMode = gameModePlayerHitOrStand;
  return "Do you want to hit or stand? <br>Enter 'hit' or 'stand'.";
};

var main = function (input) {
  var myOutputValue = "";

  //Deck shuffle game mode
  if (currentGameMode == gameModeDeckShuffle) {
    //reset scores to 0
    playerScore = 0;
    computerScore = 0;

    //shuffle deck of cards
    shuffledDeck;
    currentGameMode = gameModeDealCard;
    return "Click Submit to deal card.";
  }

  //Deal card game mode
  if (currentGameMode == gameModeDealCard) {
    //create loop for 2 rounds of card dealing
    while (cardCounter < 2) {
      //player gets dealt card
      var playerCard = shuffledDeck.pop();
      //display cards dealt to player
      playerDealtCards.push(playerCard.name + " of " + playerCard.suit);
      console.log(playerDealtCards);

      //dealer (computer) gets dealt card
      var computerCard = shuffledDeck.pop();
      //display cards dealt to computer
      dealerCards.push(computerCard.name + " of " + computerCard.suit);
      console.log(dealerCards);

      //Add score of player's dealt card to player's score
      playerScore += Number(playerCard.rank);
      console.log("player score round 1 - " + playerScore);

      //Add score of computer's dealt card to computer's score
      computerScore += Number(computerCard.rank);
      console.log("dealer score round 1 - " + computerScore);

      //increase card counter by increment of 1 after each loop of card-dealing
      cardCounter += 1;
    }
    //switch to game mode for player to hit or stand
    currentGameMode = gameModePlayerHitOrStand;

    return `You have been dealt ${playerDealtCards}.<br>The dealer's hand is ${dealerCards}.<br>Your total score is ${playerScore} and the dealer's total score is ${computerScore}.<br>${playerStatus()} `;
  }

  //Player hit or stand game mode
  if (currentGameMode == gameModePlayerHitOrStand) {
    var playerChoice = input;

    //player chooses to hit
    if ((playerChoice == "hit") | (playerChoice == "Hit")) {
      var playerCard = shuffledDeck.pop();

      //Add score of player's dealt card to player's score
      playerScore += Number(playerCard.rank);
      console.log("player hit score round 2 - " + playerScore);

      return `You chose hit. <br>You have been dealt the ${
        playerCard.name
      } of ${
        playerCard.suit
      }. <br>Your new score is ${playerScore}.<br>${playerStatus()}`;
    }

    //player chooses to stand
    if ((playerChoice == "stand") | (playerChoice == "Stand")) {
      playerScore += 0;
      console.log("player stand score round 2 - " + playerScore);

      //switches game mode to Dealer hit or stand game mode
      currentGameMode = gameModeDealerHitOrStand;

      return `You chose stand. <br>Your score remains ${playerScore}. Click submit to continue.`;
    }
    //any other inputs are not recognised - request for correct input
    return 'Your response is not recognised. Please enter "hit" or "stand" to continue with the game.';
  }

  //Dealer hit or stand game mode
  if (currentGameMode == gameModeDealerHitOrStand) {
    //if dealer scores below 18, he has to take another card (i.e. hit)
    if (computerScore < 18) {
      //dealer (computer) gets dealt a card
      var computerCard = shuffledDeck.pop();

      //Add score of computer's dealt card to computer's score
      computerScore += Number(computerCard.rank);
      console.log("computer hit score round 2 - " + computerScore);

      //display cards dealt to computer
      dealerCards.push(computerCard.name + " of " + computerCard.suit);
      console.log(dealerCards);

      //output message about computer card dealt
      var cardDealtMessage = `The dealer hit. <br>The dealer got dealt ${computerCard.name} of ${computerCard.suit}.<br>It scored ${computerScore}.`;

      //if computer goes bust (score >21) the player wins
      if (computerScore > 21) {
        return `${cardDealtMessage} <br>It has gone bust. You win!`;
      }

      //switches to game mode to decide winner
      currentGameMode = gameModeDecideWinner;

      return `${cardDealtMessage}<br>Click Submit to see who wins.`;
    }

    //if dealer scores 18 or higher, he has to stay with his hand
    if (computerScore >= 18) {
      //Computer score will remain the same
      computerScore += 0;
      console.log("computer hit score round 2 - " + computerScore);
      //switches to game mode to decide winner
      currentGameMode = gameModeDecideWinner;
      return `The dealer stand. <br>Its score remains ${computerScore}. <br>Click Submit to see who wins!`;
    }
  }

  // game mode to decide winner
  if (currentGameMode == gameModeDecideWinner) {
    currentGameMode = gameModeDeckShuffle;
    return `You scored ${playerScore}.<br>The dealer scored ${computerScore}.<br>The winner is ${winner()}.<br>Click Submit to play again.`;
  }

  return myOutputValue;
};
