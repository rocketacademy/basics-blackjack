// ============================================= HOW THE GAME WORKS =========================================================
/* 
1. there will only be two players
2. computer will be the dealer always
3. each player gets dealt two cards to start
4. player goes first, and decides if they want to hit (draw a card) or stand (end their turn)
5. The dealer has to hit if their hand is below 17
6. Each player's score is the total of their card ranks. J/Q/K are 10, Aces can be 1 or 11
7. The player who is closer to, but not above 21 wins the hand
=============================================================================================================================
*/

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

// ======================================================================================================================
//   =====================================initializing global variables==================================================
// ======================================================================================================================
var currentProgramMode = "state1";

var playerArray = [];
var playerArrayRank = [];
var computerArray = [];
var computerArrayRank = [];

// ======================================================================================================================
// ============================================= HELPER FUNCTIONS =======================================================
// ======================================================================================================================

// helper function for calculating the total "rank values" for player and computer
// this function will be called using the ArrayRank array so wont need to use .rank / .name to change the sum
var calculateTotalRank = function (cardArray) {
  var index = 0;
  var numberOfAces = 0;
  var sumOfRank = 0;
  while (index < cardArray.length) {
    var currentCard = cardArray[index];

    if (currentCard == 11 || (currentCard == 12) | (currentCard == 13)) {
      sumOfRank += 10;
    } else if (currentCard == 1) {
      sumOfRank += 11;
      numberOfAces += 1;
    } else {
      sumOfRank += cardArray[index];
    }
    index += 1;
  }
  index = 0;
  while (index < numberOfAces) {
    if (sumOfRank > 21) {
      sumOfRank -= 10;
    }
    index += 1;
  }
  return sumOfRank;
};

// helper function for calculating if its player blackjack
var checkingForPlayerBJ = function (cards) {
  var playerArrayCard1 = playerArray[0];
  var playerArrayCard2 = playerArray[1];
  var isPlayerBlackjack = false;

  if (
    (playerArrayCard1.name == "ace" && playerArrayCard2.rank >= 10) ||
    (playerArrayCard1.rank >= 10 && playerArrayCard2.name == "ace")
  ) {
    isPlayerBlackjack = true;
  }
  return isPlayerBlackjack;
};

// helper function for calculating if its dealer blackjack
var checkingForComputerBJ = function (cards) {
  var computerArrayCard1 = computerArray[0];
  var computerArrayCard2 = computerArray[1];
  var isComputerBlackjack = false;

  if (
    (computerArrayCard1.name == "ace" && computerArrayCard2.rank >= 10) ||
    (computerArrayCard1.rank >= 10 && computerArrayCard2.name == "ace")
  ) {
    isComputerBlackjack = true;
  }
  return isComputerBlackjack;
};

// helper function to call out output message for an increasing array of cards for player
var outputMsgPlayer = function (cardArray) {
  var playerMessage = "<b>Player Cards:</b> <br>";
  var index = 0;
  while (index < cardArray.length) {
    playerMessage = `${playerMessage} ${cardArray[index].name} of ${cardArray[index].suit} <br>`;
    index += 1;
  }
  return playerMessage;
};

// helper function to call out output message for an increasing array of cards for computer
var outputMsgComputer = function (cardArray) {
  var computerMessage = "<b>Dealer Cards:</b> <br>";
  var index = 0;
  while (index < cardArray.length) {
    computerMessage = `${computerMessage} ${cardArray[index].name} of ${cardArray[index].suit} <br>`;
    index += 1;
  }
  return computerMessage;
};
//-- blackjack starts ---

// ======================================================================================================================
// =============================================== MAIN FUNCTION ========================================================
// ======================================================================================================================
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

    computerArray.push(computerHand1);
    computerArray.push(computerHand2);

    computerArrayRank.push(computerHand1.rank);
    computerArrayRank.push(computerHand2.rank);

    var messageForPlayer = outputMsgPlayer(playerArray);
    var messageForComputer = outputMsgComputer(computerArray);
    var myOutputValue = "";
    var revealedDealerCards = `<b>Dealer Hand</b>: <br> ${computerArray[0].name} of ${computerArray[0].suit}`;

    // --- checking the scenarios in which whether player has blackjack or not ---
    //calling the helper functions here
    var playerBJ = checkingForPlayerBJ(playerArray);
    var computerBJ = checkingForComputerBJ(computerArray);

    // if player has bj and computer also has bj
    if (playerBJ == true && computerBJ == true) {
      myOutputValue = `${messageForPlayer} <br> ${messageForComputer} <br> <br> It seems that we are tied. No matter, let's go for another round to determine who the true winner is <br><br> <img src = "https://c.tenor.com/9lnDEML3WYsAAAAd/kambe-daisuke.gif"/> <br><br> Click on the submit button to draw two new cards for you and me`;
      //reset everything so that player need not hit refresh button. can just click on "submit" button
      currentProgramMode = "state1";
      playerArray = [];
      playerArrayRank = [];
      computerArray = [];
      computerArrayRank = [];
    }
    // if only player has bj
    else if (playerBJ == true && computerBJ == false) {
      myOutputValue = `${messageForPlayer} <br> ${messageForComputer} <br> <br> It seems like you have won me from the get go... <br> But no matter, my balance is still... Unlimited <br><br> <img src = "https://c.tenor.com/S0iVsGnw5ssAAAAC/anime-kambe.gif"/> <br><br> Click on the submit button to draw two new cards for you and me`;
      //reset everything so that player need not hit refresh button. can just click on "submit" button
      currentProgramMode = "state1";
      playerArray = [];
      playerArrayRank = [];
      computerArray = [];
      computerArrayRank = [];
    }

    // if only dealer has bj
    else if (computerBJ == true) {
      myOutputValue = `${messageForPlayer} <br> ${messageForComputer} <br> <br> Hu hu hu, it is my victory. <br> Lady luck is shining on me today and it's time for me to take your pile of cash <br><br> <img src = "https://c.tenor.com/OTjx7omPuaUAAAAC/kambe-daisuke.gif"/> <br><br> Click on the submit button to draw two new cards for you and me`;
      //reset everything so that player need not hit refresh button. can just click on "submit" button
      currentProgramMode = "state1";
      playerArray = [];
      playerArrayRank = [];
      computerArray = [];
      computerArrayRank = [];
    }
    // no player bj
    else if (playerBJ == false) {
      var playerRankValue = calculateTotalRank(playerArrayRank);
      var playerTotalValue = `Your hand totals to ${playerRankValue}`;
      myOutputValue = ` <img src = "https://c.tenor.com/vg3j2jvFwLcAAAAC/daisuke-smile.gif"/> <br> <br>${messageForPlayer} <b>${playerTotalValue}</b> <br> <br> ${revealedDealerCards} <br><br> Would you like to hit (draw another card) or stand (end the turn)`;
      currentProgramMode = "state2";
    }

    // player to choose to draw more (hit) or end turn (stand)
  }
  if (currentProgramMode == "state2") {
    if (input == "hit") {
      // draw cards using .pop method and push the cards into all the arrays
      var nextPlayerhand = shuffledDeck.pop();
      playerArray.push(nextPlayerhand);
      playerArrayRank.push(nextPlayerhand.rank);
      messageForPlayer = outputMsgPlayer(playerArray);
      playerRankValue = calculateTotalRank(playerArrayRank);

      // creating variables for the different parts of the output message so that each output msg wont be so long
      var newCardMsg = `This is your newly drawn card: ${nextPlayerhand.name} of ${nextPlayerhand.suit}`;
      var myOutputValue = `${messageForPlayer}`;
      var questionMsg = `The revealed dealer's hand was: ${computerArray[0].name} of ${computerArray[0].suit} <br><br> Would you like to hit (draw another card) or stand (end the turn) <br> <img src = "https://c.tenor.com/_rc3PCYO1dUAAAAd/daisukekanbe-balancedunlimited.gif"/>`;
      playerTotalValue = `Your hand totals to ${playerRankValue}`;

      return `${newCardMsg}. <br><br> ${myOutputValue} <b>${playerTotalValue}</b> <br><br> ${questionMsg}`;
    } else if (input == "stand") {
      // calculate what the total value of cards player and dealer has
      var playerRankValue = calculateTotalRank(playerArrayRank);
      var computerRankValue = calculateTotalRank(computerArrayRank);

      // since player stands, its dealers turn automatically
      // if dealer value < 17, will take cards until >= 17, then show output message
      while (computerRankValue < 17) {
        var nextComputerHand = shuffledDeck.pop();
        computerArray.push(nextComputerHand);
        computerArrayRank.push(nextComputerHand.rank);
        computerRankValue = calculateTotalRank(computerArrayRank);
      }
      currentProgramMode = "state3";
      myOutputValue = `I see that it is my turn to draw my cards. <br><br> <img src = "https://c.tenor.com/iRxYhChXfgUAAAAC/kambe-daisuke.gif"/> <br><br> Alright, I'm done. Let's see who is the winner`;
    }
  }
  // comparing the values to determine the eventual winner
  else if (currentProgramMode == "state3") {
    // listing all the variables again
    var playerRankValue = calculateTotalRank(playerArrayRank);
    var computerRankValue = calculateTotalRank(computerArrayRank);
    messageForPlayer = outputMsgPlayer(playerArray);
    messageForComputer = outputMsgComputer(computerArray);

    //scenario 1: tied game
    if (
      playerRankValue == computerRankValue ||
      (playerRankValue > 21 && computerRankValue > 21)
    ) {
      myOutputValue = `${messageForPlayer} <br> ${messageForComputer} <br> Player total hand value: ${playerRankValue} <br> Computer total hand value: ${computerRankValue}<br><br> It seems that we are tied. No matter, let's go for another round to determine who the true winner is <br><br> <img src = "https://c.tenor.com/9lnDEML3WYsAAAAd/kambe-daisuke.gif"/> <br><br> Click on the submit button to draw two new cards for you and me`;
    }
    // scenario 2: player value > dealer value, or dealer goes above 21 and player still within 21
    else if (
      (playerRankValue > computerRankValue && playerRankValue <= 21) ||
      (playerRankValue <= 21 && computerRankValue > 21)
    ) {
      myOutputValue = `${messageForPlayer} <br> ${messageForComputer} <br> Player total hand value: ${playerRankValue} <br> Computer total hand value: ${computerRankValue} <br><br> Darn, you have bested me. But no matter, my balance is still... Unlimited <br><br> <img src = "https://c.tenor.com/S0iVsGnw5ssAAAAC/anime-kambe.gif"/> <br><br> Click on the submit button to draw two new cards for you and me`;
    } // scenario 3: dealer value > player value, or player goes above 21 and dealer still within 21
    else if (
      (computerRankValue > playerRankValue && computerRankValue <= 21) ||
      (computerRankValue <= 21 && playerRankValue > 21)
    ) {
      myOutputValue = `${messageForPlayer} <br> ${messageForComputer} <br> Player total hand value: ${playerRankValue} <br> Computer total hand value: ${computerRankValue} <br><br> Hu hu hu, it is my victory. <br> Lady luck is shining on me today and it's time for me to take your pile of cash <br><br> <img src = "https://c.tenor.com/OTjx7omPuaUAAAAC/kambe-daisuke.gif"/> <br><br> Click on the submit button to draw two new cards for you and me`;
    }

    //reset everything so that player need not hit refresh button. can just click on "submit" button
    currentProgramMode = "state1";
    playerArray = [];
    playerArrayRank = [];
    computerArray = [];
    computerArrayRank = [];
  }

  return myOutputValue;
};
