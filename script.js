//Blackjack (simplified rules)
//how to win: have hand that is higher than the dealer's, but not exceeding 21
//if your hand exceeds 21, it's a 'bust', meaning you are out
//scoring: 2-10 at face value, Jack/ Queen/ King score 10, Ace score 1 or 11
//simplified rules: only 1 player and 1 dealer (computer)
//simplified rules: player who is closer to 21 wins the hand.
//step 1: players each put down a bet
//step 2: dealer deals one card, face up, to each player, then to himself
//step 3: dealer deals a second card, face up to each player, and face down to himself
//step 4a: if player scores 21, automatically wins, wins 1.5x her bet from the dealer
//step4b: if want more card (draw from top of the deck), say 'hit'; no limit to how many cards you can hit, but when score exceeds 21, you go bust.
//step4c: if don't want any more cards, say 'stand'.
//step 5: once dealer has been round the table, dealer opens its face-down card
//step 6a: if dealer scores below 18, he has to take another card (i.e. hit)
//step 6b: if dealer scores 18 or higher, he has to stay with his hand
//step 7a: if dealer goes bust, all players win twice their bet (get his bet back + get an extra amount same as his bet)
//step 7b: if dealer does not go bust, only players with a higher score win twice their bet, every one else loses their initial bet

//game modes//
var deckShuffle = "game mode shuffle deck";
var dealCard = "game mode deal card";
var playerHitOrStand = "game mode player decides hit or stand";
var dealerHitOrStand = "game mode dealer decides hit or stand";
var decideWinner = "game mode to decide winner";
var askUserName = "game mode ask for username";
var placeBet = "game mode player place bet";

//initiate current game mode with game mode shuffle deck//
var currentGameMode = deckShuffle;

//Card deck generation//
var makeDeck = function () {
  //create an empty array for the deck of cards
  var cardDeck = [];
  console.log(cardDeck);
  //to make a deck of cards, need to define suit, card name, and rank
  var suits = ["clubs ♣", "diamonds 🔶", "hearts 🧡", "spades ♠"];

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
        cardName = "Ace 🅰";
      } else if (cardName == 11) {
        cardName = "Jack 👱‍♂️";
      } else if (cardName == 12) {
        cardName = "Queen 👸";
      } else if (cardName == 13) {
        cardName = "King 🤴";
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
var dealerDealtCards = [];

var playerDealtCardsRank = [];
var dealerDealtCardsRank = [];

var playerCardsArray = [];
var dealerCardsArray = [];

//playerscore//
var playerScore = 0;

//computer score//
var computerScore = 0;

//player points - start with 100
var playerPoints = 100;
var playerWager = 0;

//function to count number of Aces in each hand
var countAces = function (cardsHeld) {
  var cardCounter = 0;
  var aceCount = 0;
  while (cardCounter < cardsHeld.length) {
    if (cardsHeld[cardCounter].rank == 1) {
      aceCount += 1;
    }
    cardCounter += 1;
  }
  return aceCount;
};

//Determine a winner//
var winner = function () {
  if (playerScore > computerScore) {
    //player wins 2x the wager i.e. get intial bet back + win amount equivalent to original bet
    playerPoints = playerPoints + playerWager * 2;
    return `You are the winner! <br> You now have ${playerPoints} points.`;
  }
  if (playerScore < computerScore) {
    //player loses initial wager (accounted for in playerPoint during placeBet gamemode)
    playerPoints = playerPoints;
    return `The computer is the winner!<br> You lost your bet and now have ${playerPoints} points.`;
  }
  return "It's a tie.";
};

//player can choose to hit or stand except for the following scenarios:
//if playerscore > 21, player goes bust
//if playerscore = 21, player wins
var playerStatus = function () {
  if (playerScore == 21) {
    currentGameMode = deckShuffle;
    //if player's two face-up cards total 21, she wins 1.5x her wager
    playerPoints = playerPoints + playerWager + playerWager * 1.5;
    return `You are the winner. <br>You now have ${playerPoints} points.<br>Click Submit to play again.`;
  }
  if (playerScore > 21) {
    currentGameMode = deckShuffle;
    //if player goes bust, she loses initial wager (accounted for in playerPoint during placeBet gamemode)
    playerPoints = playerPoints;
    return `You have gone bust. The dealer wins. <br>You have lost your bet and now have ${playerPoints} points.<br>Click Submit to play again.`;
  }

  currentGameMode = playerHitOrStand;
  return "Do you want to hit or stand? <br>Enter 'hit' or 'stand'.";
};

//Fake deck for code-testing
var fakeDeck = [
  {
    name: "ace",
    suit: "diamond",
    rank: 1,
  },
  {
    name: "2",
    suit: "diamond",
    rank: 2,
  },
  {
    name: "3",
    suit: "heart",
    rank: 3,
  },
  {
    name: "ace",
    suit: "heart",
    rank: 1,
  },
];

//logic for ace
//if cumulative score minus 1 (initial value of ace) is less than 11, ace should be 11
//if cumulative score minus 1 is more than 10 , ace should be 1
var playerAceCounter = 0;

var main = function (input) {
  var myOutputValue = "";

  //Deck shuffle game mode
  if (currentGameMode == deckShuffle) {
    //shuffle deck of cards
    shuffledDeck = shuffleCards(deck);

    //when a new round begins, reset scores to 0, reset cardCounter to 0, reset arrays
    playerScore = 0;
    computerScore = 0;
    cardCounter = 0;
    playerDealtCards = [];
    dealerDealtCards = [];
    playerDealtCardsRank = [];
    dealerDealtCardsRank = [];
    playerCardsArray = [];
    dealerCardsArray = [];

    console.log("shuffle mode " + playerScore);
    console.log("shuffle mode " + computerScore);

    currentGameMode = askUserName;
    return `Welcome to the game of Blackjack🔶♠🧡♣.<br>What's your name?`;
  }

  //ask for username
  if (currentGameMode == askUserName) {
    var userName = input;
    currentGameMode = placeBet;
    return `Hi ${userName}! <br>You have ${playerPoints} points to start.<br>How much would you like to bet 💵?<br>(Enter a number that is greater than 0 and smaller than 100)? `;
  }

  //place your bet
  if (currentGameMode == placeBet) {
    playerWager = Number(input);
    if (playerWager > 0 && playerWager < 100) {
      currentGameMode = dealCard;
      playerPoints = playerPoints - playerWager;
      return `💵You placed a bet of ${playerWager} points.💵<br> Your remaining points are ${playerPoints}.<br>Click Submit to deal 2 face-up cards.`;
    } else
      return `That is not a recognised input.<br>Please enter a number that is greater than 0 and smaller than 100.`;
  }

  //Deal card game mode
  if (currentGameMode == dealCard) {
    //create loop for 2 rounds of card dealing
    while (cardCounter < 2) {
      //player gets dealt card
      var playerCard = shuffledDeck.pop();
      //display cards dealt to player
      playerDealtCards.push(playerCard.name + " of " + playerCard.suit);
      console.log(playerDealtCards);
      // tracking playerCards rank
      playerDealtCardsRank.push(playerCard.rank);
      playerCardsArray.push(playerCard);
      console.log(playerCardsArray.length);

      //dealer (computer) gets dealt card
      var computerCard = shuffledDeck.pop();
      //display cards dealt to computer
      dealerDealtCards.push(computerCard.name + " of " + computerCard.suit);
      console.log(dealerDealtCards);
      // tracking dealerCards rank
      dealerDealtCardsRank.push(computerCard.rank);
      dealerCardsArray.push(computerCard);
      console.log(dealerCardsArray.length);

      //Add score of player's dealt card to player's score
      playerScore += Number(playerCard.rank);
      console.log("player score round 1 - " + playerScore);

      //Add score of computer's dealt card to computer's score
      computerScore += Number(computerCard.rank);
      console.log("dealer score round 1 - " + computerScore);

      //increase card counter by increment of 1 after each loop of card-dealing
      cardCounter += 1;
    }

    console.log(playerDealtCardsRank);

    // apply Ace card logic to player cards
    var playerAceCount = countAces(playerCardsArray);
    console.log(playerAceCount);
    var dealerAceCount = countAces(dealerCardsArray);

    //logic for ace
    //if cumulative score minus 1 (initial value of ace) is less than 11, ace should be 11
    //if cumulative score minus 1 is more than 10 , ace should be 1
    if (playerScore < 12 && playerAceCount > 0) {
      playerScore = playerScore - 1 + 11;
    } else if (playerScore > 11 && playerAceCount > 0) {
      playerScore = playerScore;
    } else playerScore = playerScore;

    if (computerScore < 12 && dealerAceCount > 0) {
      computerScore = computerScore - 1 + 11;
    } else if (computerScore > 11 && dealerAceCount > 0) {
      computerScore = computerScore;
    } else computerScore = computerScore;

    //switch to game mode for player to hit or stand
    currentGameMode = playerHitOrStand;

    //output message only tells player about the face-up card of the dealer
    return `You have been dealt ${playerDealtCards}.<br>The dealer's face-up card is ${
      dealerDealtCards[0]
    }.<br>Your total score is ${playerScore}.<br>${playerStatus()} `;
  }

  //Player hit or stand game mode
  if (currentGameMode == playerHitOrStand) {
    var playerChoice = input;

    //player chooses to hit
    if (playerChoice == "hit") {
      var playerCard = shuffledDeck.pop();
      playerCardsArray.push(playerCard);
      console.log(
        `playercardround 2 - ${playerCard.name} of ${playerCard.suit} rank ${playerCard.rank}`
      );

      //Add score of player's dealt card to player's score
      playerScore += Number(playerCard.rank);

      // apply Ace card logic to player cards
      var playerAceCount = countAces(playerCardsArray);
      console.log(playerAceCount);
      var dealerAceCount = countAces(dealerCardsArray);

      if (playerScore < 12 && playerAceCount > 0) {
        playerScore = playerScore - 1 + 11;
      } else if (playerScore > 11 && playerAceCount > 0) {
        playerScore = playerScore;
      } else playerScore = playerScore;

      console.log("player hit score round 2 - " + playerScore);

      return `You chose hit. <br>You have been dealt the ${
        playerCard.name
      } of ${
        playerCard.suit
      }. <br>Your new score is ${playerScore}.<br>${playerStatus()}`;
    }

    //player chooses to stand
    if (playerChoice == "stand") {
      playerScore += 0;
      console.log("player stand score round 2 - " + playerScore);

      //switches game mode to Dealer hit or stand game mode
      currentGameMode = dealerHitOrStand;

      return `You chose stand. <br>Your score remains ${playerScore}. Click submit to continue.`;
    }
    //any other inputs are not recognised - request for correct input
    return 'Your response is not recognised. Please enter "hit" or "stand" to continue with the game.';
  }

  //Dealer hit or stand game mode
  if (currentGameMode == dealerHitOrStand) {
    //if dealer scores below 18, he has to take another card (i.e. hit)
    if (computerScore < 18) {
      //dealer (computer) gets dealt a card
      var computerCard = shuffledDeck.pop();
      dealerCardsArray.push(computerCard);

      //Add score of computer's dealt card to computer's score
      computerScore += Number(computerCard.rank);
      console.log("computer hit score round 2 - " + computerScore);

      //display cards dealt to computer
      dealerDealtCards.push(computerCard.name + " of " + computerCard.suit);
      console.log(dealerDealtCards);

      // apply Ace card logic to player cards
      var playerAceCount = countAces(playerCardsArray);
      var dealerAceCount = countAces(dealerCardsArray);
      console.log(dealerAceCount);

      if (computerScore < 12 && dealerAceCount > 0) {
        computerScore = computerScore - 1 + 11;
      } else if (computerScore > 11 && dealerAceCount > 0) {
        computerScore = computerScore;
      } else computerScore = computerScore;

      //output message about the cards the dealer has (including previously face-down card)
      var cardDealtMessage = `The dealer hit. <br>The dealer's cards are ${dealerDealtCards}.<br>It scored ${computerScore}.`;

      //if computer goes bust (score >21) the player wins
      if (computerScore + Number(computerCard.rank) > 21) {
        //player wins 2x his wager i.e. gets his initial wager + wins an amount equivalent to his wager
        playerPoints = playerPoints + playerWager * 2;
        currentGameMode = deckShuffle;
        return `${cardDealtMessage} <br>It has gone bust. You win!<br>You now have ${playerPoints} points.<br>Click Submit to start again.`;
      }

      //switches to game mode to decide winner
      currentGameMode = decideWinner;

      return `${cardDealtMessage}<br>Click Submit to see who wins.`;
    }

    //if dealer scores 18 or higher, he has to stay with his hand
    if (computerScore >= 18) {
      //Computer score will remain the same
      computerScore += 0;
      console.log("computer hit score round 2 - " + computerScore);
      //if computer goes bust (score >21) the player wins (computer would have gone bust after 2 cards dealt, but not known until now when the facedown card is revealed.)
      if (computerScore > 21) {
        currentGameMode = deckShuffle;
        //player wins 2x his wager i.e. gets his initial wager + wins an amount equivalent to his wager
        playerPoints = playerPoints + playerWager * 2;
        return `${cardDealtMessage} <br>It has gone bust. You win!<br>You now have ${playerPoints} points.<br>Click Submit to start again.`;
      }
      //switches to decideWinner game mode
      currentGameMode = decideWinner;
      return `The dealer stand. <br>The dealer's cards are ${dealerDealtCards}.<br>Its score remains ${computerScore}. <br>Click Submit to see who wins!`;
    }
  }

  // game mode to decide winner
  if (currentGameMode == decideWinner) {
    currentGameMode = deckShuffle;
    return `You scored ${playerScore}.<br>The dealer scored ${computerScore}.<br>${winner()}<br>Click Submit to play again.`;
  }

  return myOutputValue;
};
