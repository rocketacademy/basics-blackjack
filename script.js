// == HOW THE GAME WORKS ==
/* 
1. there will only be two players
2. computer will be the dealer always
3. each player gets dealt two cards to start
4. player goes first, and decides if they want to hit (draw a card) or stand (end their turn)
5. The dealer has to hit if their hand is below 17
6. Each player's score is the total of their card ranks. J/Q/K are 10, Aces can be 1 or 11
7. The player who is closer to, but not above 21 wins the hand
*/

//SET ACE TO 11 for version 1 to 3

//-- to create the shuffed deck --

//creating the makeDeck array object
var makeDeck = function () {
  var deck = [];
  // make 52 cards
  // rank 1-13
  // 4 suits : hearts, clubs, spade, diamonds
  // card names: 1-10, ace, jack, queen, king

  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    //loop from 1-13 o create all cards for a given suit
    //notice that rank counter starts at 1 instead of 0
    var rankCounter = 1;
    while (rankCounter <= 13) {
      //by default, the card name is the same as rank counter, with the exception of 1, 11, 12, 13
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      //creating a new card with the following infomation: curent name, suit and rank

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      //add the new card to the deck
      deck.push(card);

      //increase rankcounter to iterate over the next rank
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

//initialize the getRandomIndex function
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//initialize the shuffling cards function
var shuffleCards = function (deck) {
  var currentIndex = 0;

  while (currentIndex < deck.length) {
    var randomIndex = getRandomIndex(deck.length);

    // select the card that corresponds to currentIndex
    var currentCard = deck[currentIndex];
    //select the card that corresponds to randomIndex
    var randomCard = deck[randomIndex];

    //swap the positions of randomCard and currentCard in the deck (eqv to shuffling the deck since youre taking one card out and putting one card back into that position)
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return deck;
};

//create a shuffled deck of cards
var shuffledDeck = shuffleCards(makeDeck());
//-- shuffled deck created --

// initializing global variables
var currentProgramMode = "state1";

var playerArray = [];
var computerArray = [];

var playerArrayRank = [];
var computerArrayRank = [];

// helper function for calculating the total "rank values" for both player and computer
var computerTotalRank = function (rankValues) {
  var counter = 0;
  var sum = 0;
  while (counter < computerArrayRank.length) {
    sum += computerArrayRank[counter];
    counter += 1;
  }
  return sum;
};

var playerTotalRank = function (rankValues) {
  var counter = 0;
  var sum = 0;
  while (counter < playerArrayRank.length) {
    sum += playerArrayRank[counter];
    counter += 1;
  }
  return sum;
};

// ============================= using a statement here to turn jack queen king to 10? ===============================

//-- blackjack starts ---

// i would need to ensure thaat jack, queen and king's ranks are all 10.

// === MAIN FUNCTION ===
var main = function (input) {
  if (currentProgramMode == "state1") {
    // create variables for playerHand and ComputerHand
    // use .pop() twice for playerHand and computerHand to simulate two cards drawn for both.
    var playerHand1 = shuffledDeck.pop();
    var playerHand2 = shuffledDeck.pop();

    var computerHand1 = shuffledDeck.pop();
    var computerHand2 = shuffledDeck.pop();

    // have to keep the cards in an array
    playerArray.push(playerHand1);
    playerArray.push(playerHand2);
    playerArrayRank.push(playerHand1.rank);
    playerArrayRank.push(playerHand2.rank);
    // console.log(`${playerArray[1].name} of ${playerArray[1].suit}`);
    // console.log(`the player ranks in the array: ${playerArrayRank}`);

    computerArray.push(computerHand1);
    computerArray.push(computerHand2);
    computerArrayRank.push(computerHand1.rank);
    computerArrayRank.push(computerHand2.rank);
    //console.log(`the computer ranks in the array: ${computerArrayRank}`);

    var myOutputValue = `Player Hand: <br> Card1: ${playerHand1.name} of ${playerHand1.suit} <br> Card2: ${playerHand2.name} of ${playerHand2.suit} <br> <br> Computer Hand: <br> Card1 ${computerHand1.name} of ${computerHand1.suit} <br> Card2: ${computerHand2.name} of ${computerHand2.suit}`;

    console.log(
      `PLAYER CARDS: ${playerHand1.name} of ${playerHand1.suit} and ${playerHand2.name} of ${playerHand2.suit}`
    );
    console.log(
      `COMPUTER CARDS: ${computerHand1.name} of ${computerHand1.suit} and ${computerHand2.name} of ${computerHand2.suit}`
    );

    // placing the helper functions in here
    var playerValue = playerTotalRank(playerArrayRank);
    var computerValue = computerTotalRank(computerArrayRank);

    console.log(playerValue);
    console.log(computerValue);

    //input validation of isBlackJack == 21 for player

    if (playerValue == 21 && computerValue == 21) {
      myOutputValue = `${myOutputValue} <br> <br> Wow, its a BlackJack tie!!!!`;
    } else if (playerValue == 21) {
      myOutputValue = `${myOutputValue} <br> <br> Wow, its a BlackJack tie!!!!`;
    } else if (playerValue != 21) {
      myOutputValue = `Player Hand: <br> Card1: ${playerHand1.name} of ${playerHand1.suit} <br> Card2: ${playerHand2.name} of ${playerHand2.suit}. <br><br> Would you like to hit (draw another card) or stand (end the turn)`;
      currentProgramMode = "state2";
    }
  } else if (currentProgramMode == "state2") {
    // ---------------------------------- PLAYERHASCHOSENTOSTAND = false -------------------------------------

    if (input == "hit") {
      // var playerDecideToStand = false;
      // while (playerDecideToStand) {
      //   var nextPlayerHand = shuffledDeck.pop();
      //   playerArray.push(nextPlayerHand);
      //   playerArrayRank.push(nextPlayerHand);
      //   playerValue = playerTotalRank(playerArrayRank);

      //   if (playerValue > 21) {
      //     playerDecideToStand = true;
      //     myOutputValue = `hou dang you lose`;
      //   } else if (input == "stand") {
      //     playerDecideToStand = true;
      //     currentGameMode = "state3";
      //   }
      // }
      var playerHand3 = shuffledDeck.pop();
      playerArray.push(playerHand3);
      playerArrayRank.push(playerHand3.rank);
      playerValue = playerTotalRank(playerArrayRank);
      //console.log(`playerHand1: ${playerHand1.name} of ${playerHand1.suit}`);
      console.log(`playerHand3: ${playerHand3.name} of ${playerHand3.suit}`);
      console.log(`the player ranks in the array: ${playerArrayRank}`);
      console.log(`the player total value: ${playerValue}`);
      // check if the player has gone beyond 21
      if (playerValue > 21) {
        myOutputValue = "You lose!";
      } else if (playerValue < 21) {
        myOutputValue = `This is your newly drawn card: ${playerHand3.name} of ${playerHand3.suit}. <br><br> Your previous cards were: <br> Card1: ${playerArray[0].name} of ${playerArray[0].suit} <br> Card2: ${playerArray[1].name} of ${playerArray[1].suit}. <br><br> Would you like to hit (draw another card) or stand (end the turn)`;
      }
    } else if (input == "stand") {
      myOutputValue =
        "It is now the dealer's turn. Click on the submit button to view the final result!";
      currentProgramMode = "state3";
    }
  } else if (currentProgramMode == "state3") {
    computerValue = computerTotalRank(computerArrayRank);
    console.log(`AYAM HERE`);

    //dealer's turn
    if (computerValue == 21) {
      console.log(`AYAM HERE`);
      myOutputValue = `${myOutputValue} <br><br> And the dealer wins! Better luck next time eh?`;
    } else if (computerValue < 21) {
      console.log(`AYAM HERE`);
      if (computerValue < 20 && computerValue > 18) {
        myOutputValue =
          "Give the dealer a moment to contemplate their life choices... If you're unkind, you may go ahead and press the submit button";
        currentProgramMode = "state4";
      } else if (computerValue <= 17) {
        console.log(`AYAM HERE`);
        var nextComputerHand = shuffledDeck.pop();
        computerArray.push(nextComputerHand);
        computerArrayRank.push(nextComputerHand);
        // run a while loop?
        var computerRank = computerTotalRank(computerArrayRank);
        while (computerRank < 17) {
          return "yay";
        }
      }
    }
  }

  return myOutputValue;
};

//   - if player decides to stand
//   currentgGameMode == "state3"
//   13. computer's turn to decide whether to hit or stand
//   14. if computer < 17, will draw cards until >= 17 (while loop?)
//   15. if computer > 17, will just stand
//   currentGameMode = "state4"

// - once both sides "stand", to compare rank of cards
// currentGameMode == "state4"
// 16. if playerHand.rank > computerHand.rank, player wins
// 17. if playerHand.rank < computerHand.rank, computer wins
// 18. if both playerHand.rank and computerHand.rank > 21 OR playerHand.rank == computerHand.rank, its a tie, no winner.
// 19. output who the winner is, and then also show the total rank on both sides

// currentGameMode = "state1"
// reshuffle the deck, all global variables need to be emptied out
// (to play game again?)
