//to push plaers scores to compare
var playerScores = [];
var computerScores = [];
var mode = "first 2 cards";
var winningImage =
  '<iframe src="https://giphy.com/embed/dBf0OpOH96MTM6hYqr" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';
var losingImage =
  '<img src="https://static.mothership.sg/1/2016/10/Screen-Shot-2016-10-11-at-12.12.15-PM.png"/>';
var ahGongTieImage =
  '<img src="https://pbs.twimg.com/media/E0sqrY5UcAQqYtO.jpg"/>';

var tieImage =
  '<img src="http://thumbs.gfycat.com/AnnualPinkJavalina-size_restricted.gif"/>';

var playerBlackjack = false;
var computerBlackjack = false;

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts ♥️", "Diamonds ♦️", "Clubs ♣️", "Spades ♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    console.log("current suit:" + currentSuit);

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      console.log("rank:" + rankCounter);
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      //In BJ, jack queen and king is 10, hence all changed to 10
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      var valueofCards = rankCounter;
      if (rankCounter == 11) {
        valueofCards = 10;
      } else if (rankCounter == 12) {
        valueofCards = 10;
      } else if (rankCounter == 13) {
        valueofCards = 10;
      } else if (rankCounter == 1) {
        valueofCards = 11;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        valueofCards: valueofCards,
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
var cardDeck = makeDeck();
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
var playerHand = [];
var computerHand = [];

var showCards = function (player) {
  var string = "";
  var counter = 0;
  while (counter < player.length) {
    if (player.length > 2 && player[counter].name == "Ace") {
      player[counter].valueofCards = 1;
    }
    string += `${player[counter].name} of ${player[counter].suit}<br>`;
    counter = counter + 1;
  }
  return string;
};
var DealerShowCards = function () {
  var computerHandScores = 0;
  var computerCounter = 0;
  while (computerCounter < computerHand.length) {
    if (
      computerHand.length > 2 &&
      computerHand[computerCounter].name == "Ace"
    ) {
      computerHand[computerCounter].valueofCards = 1;
    }
    computerHandScores += computerHand[computerCounter].valueofCards;
    computerCounter = computerCounter + 1;
  }
  return computerHandScores;
};

var main = function (input) {
  var shuffledDeck = shuffleCards(cardDeck);

  var currentIndex = 0;

  if (mode == "first 2 cards") {
    while (currentIndex < 2) {
      var playerCard = shuffledDeck.pop();
      playerHand.push(playerCard);
      currentIndex = currentIndex + 1;
    }

    var displayPlayerHandandMessage = `${showCards(
      playerHand
    )}<br>Your total score now is: <br> ${
      playerHand[0].valueofCards + playerHand[1].valueofCards
    } Points.<br><br>`;
    // //Force Blackjack
    // playerHand = [
    //   { name: "Ace", valueofCards: 11 },
    //   { name: "King", valueofCards: 10 }];
    if (
      (playerHand[0].name == "Ace" && playerHand[1].valueofCards >= 10) ||
      (playerHand[1].name == "Ace" && playerHand[0].valueofCards >= 10)
    ) {
      myOutputValue = `You got a BlackJack!<br> ${displayPlayerHandandMessage}`;
      mode = "computer first 2 cards";
      playerBlackjack = true;
    } else {
      myOutputValue = `${displayPlayerHandandMessage}<br>Input <b>"hit me daddy"</b> to take another card or <b>"can liao"</b> to stand`;
      mode = "hit or stand";
    }
  } else if (mode == "hit or stand") {
    if (input == "hit me daddy") {
      var playerCard = shuffledDeck.pop();
      playerHand.push(playerCard);

      myOutputValue = `${showCards(
        playerHand
      )}<br>Input <b>"hit me daddy"</b> to take another card or <b>"can liao"</b> to stand`;
    } else if (input == "can liao") {
      var sumOfPlayerHand = 0;
      var playerHandCounter = 0;
      while (playerHandCounter < playerHand.length) {
        sumOfPlayerHand =
          sumOfPlayerHand + playerHand[playerHandCounter].valueofCards;
        playerHandCounter = playerHandCounter + 1;
      }
      if (sumOfPlayerHand <= 16) {
        myOutputValue = `Not enough la, hit some more please. Please input "hit me daddy"!`;
      } else {
        myOutputValue = `Okay, player is done, player has ${sumOfPlayerHand}.<br>It's now the Computer's turn`;

        mode = "computer first 2 cards";
      }
    }
  } else if (mode == "computer first 2 cards") {
    while (currentIndex < 2) {
      var computerCard = shuffledDeck.pop();
      computerHand.push(computerCard);
      currentIndex = currentIndex + 1;
    }
    var displayComputerHandandMessage = `${showCards(
      computerHand
    )}<br>Your total score now is: <br> ${
      computerHand[0].valueofCards + computerHand[1].valueofCards
    } Points.<br><br>`;
    // //Force Blackjack
    // computerHand = [
    //   { name: "Ace", valueofCards: 11 },
    //   { name: "King", valueofCards: 10 }];
    if (
      (computerHand[0].name == "Ace" && computerHand[1].valueofCards >= 10) ||
      (computerHand[1].name == "Ace" && computerHand[0].valueofCards >= 10)
    ) {
      myOutputValue = `Computer got a BlackJack!<br> ${displayComputerHandandMessage}`;
      computerBlackjack = true;
    } else {
      while (DealerShowCards() <= 16) {
        var computerCard = shuffledDeck.pop();
        computerHand.push(computerCard);
        myOutputValue = showCards(computerHand);
      }
    }
    // to sum the computer hand
    var sumOfComputerHand = 0;
    var computerHandCounter = 0;
    while (computerHandCounter < computerHand.length) {
      sumOfComputerHand =
        sumOfComputerHand + computerHand[computerHandCounter].valueofCards;
      computerHandCounter = computerHandCounter + 1;
    }
    myOutputValue += `The computer's total score is ${sumOfComputerHand}`;
    mode = "dictating a winner";
  } else if (mode == "dictating a winner") {
    var sumOfPlayerHand = 0;
    var playerHandCounter = 0;
    while (playerHandCounter < playerHand.length) {
      sumOfPlayerHand =
        sumOfPlayerHand + playerHand[playerHandCounter].valueofCards;
      playerHandCounter = playerHandCounter + 1;
    }
    if (
      (sumOfPlayerHand > DealerShowCards() && sumOfPlayerHand < 22) ||
      (DealerShowCards() > 21 && sumOfPlayerHand < 22) ||
      (playerBlackjack == true && computerBlackjack == false)
    ) {
      myOutputValue = `YOU WIN, YAY!<br><br>You got ${sumOfPlayerHand} and the Computer got ${DealerShowCards()}<br> ${winningImage}`;
    } else if (
      (sumOfPlayerHand < DealerShowCards() && DealerShowCards() < 22) ||
      (DealerShowCards() < 22 && sumOfPlayerHand > 21) ||
      (playerBlackjack == false && computerBlackjack == true)
    ) {
      myOutputValue = `YOU LOSE, LOSER! BOO! <br><br>You got ${sumOfPlayerHand} and the Computer got ${DealerShowCards()}<br>${losingImage}You can try one more time! Promise this is the last time.`;
    } else if (sumOfPlayerHand > 21 && DealerShowCards() > 21) {
      myOutputValue = `IT'S AN AHGONG TIE, YOU BOTH WENT TOO FAR, BOOM.<br><br>You got ${sumOfPlayerHand} and the Computer got ${DealerShowCards()}<br>${ahGongTieImage}`;
    } else if (
      (sumOfPlayerHand < 22 &&
        DealerShowCards() < 22 &&
        sumOfPlayerHand == DealerShowCards()) ||
      (playerBlackjack == true && computerBlackjack == true)
    ) {
      myOutputValue = `IT'S A TIE, BORING<br><br>You got ${sumOfPlayerHand} and the Computer got ${DealerShowCards()}<br>${tieImage}`;
    }
  }

  return myOutputValue;
};

//page 1
// user clicks submit and received 2 random cards
// user looks at the cards:
// 1. below 16, need to take > take third card, below 16 again, take fourth card
// 2. between 16 to 21 - accept
// 3. k,q,j,10 paired with Ace = win && opposing doesnt have
// 4. above 21, lose
// find sum of user total cards (option 2)

// computer looks at the cards:
// computer receives 2 cards
// 1. below 16, need to take > take third card, below 16 again, take fourth card
// 2. between 16 to 21 - accept
// 3. k,q,j,10 paired with Ace = win
// 4. above 21, lose
// find sum of computer total cards (option 2)

// //page 2 does anyone have blackjack? --> if yes go to end of game, that player wins. If both BJ, then both draw
// //page 3 user selection to add cards, must add if <16
// //page 4 confirm cards (if no add = confirm so pg 1 to 4)

// //page 5 computer selection to add cards, must add if <16
// //page 6 computer confirm cards (if no add = confirm so pg 1 to 6)

// //page 7 compare hands, anyone pom first? no, anyone has higher hand?

// compare when condition 2 above has been completed, compare and see who has higher hand

// lose conditions:
// a) if player has sum > 21 and opposing player has a sum between 16 to 21
// b) if opposing player has blackjack, and player DOES NOT have blackjack
// c) if player has lower hand

// win conditions:
// a) if opposing player has >21, player has sum of 16 to 21.
// b) if player has blackjack, and opposing player DOES NOT have blackjack
// c) if player has higher hand

// draw conditions:
// a) if both players have the same sum
// b) if both players pom
// c) if both players bj (but that is above, no need to add here)

//page 8 give results

// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

// First Version: Compare Initial Hands to Determine Winner
// Aim for a playable game. The essence of blackjack requires:Two players - a player and a dealer (computer).A deck of cards.A starting hand of 2 cards for each player.Comparing both hands and determining a winner. The possible scenarios are:A tie. When both the player and dealer have the same total hand values - or if both draw BlackjackA Blackjack win. When either player or dealer draw Blackjack.A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.

//
//
//
//
//
//
//
//
//
//
//
//

// //Solved Blackjack Final
// var makeDeck = function () {
//   // Initialise an empty deck array
//   var cardDeck = [];
//   // Initialise an array of the 4 suits in our deck. We will loop over this array.
//   var suits = ["hearts", "diamonds", "clubs", "spades"];

//   // Loop over the suits array
//   var suitIndex = 0;
//   while (suitIndex < suits.length) {
//     // Store the current suit in a variable
//     var currentSuit = suits[suitIndex];

//     // Loop from 1 to 13 to create all cards for a given suit
//     // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
//     var rankCounter = 1;
//     while (rankCounter <= 13) {
//       // By default, the card name is the same as rankCounter
//       var cardName = rankCounter;

//       // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
//       if (cardName == 1) {
//         cardName = "ace";
//       } else if (cardName == 11) {
//         cardName = "jack";
//       } else if (cardName == 12) {
//         cardName = "queen";
//       } else if (cardName == 13) {
//         cardName = "king";
//       }
//       console.log(`${cardName} of ${currentSuit}`);
//       // Create a new card with the current name, suit, and rank
//       var card = {
//         name: cardName,
//         suit: currentSuit,
//         rank: rankCounter,
//       };

//       // Add the new card to the deck
//       cardDeck.push(card);

//       // Increment rankCounter to iterate over the next rank
//       rankCounter += 1;
//     }

//     // Increment the suit index to iterate over the next suit
//     suitIndex += 1;
//   }

//   // Return the completed card deck
//   return cardDeck;
// };

// var pokerCards = makeDeck();

// // All Game modes
// var GAME_START = "game start";
// var GAME_CARDS_DRAWN = "cards are drawn";
// var GAME_RESULTS_SHOWN = "results are shown";
// var GAME_HIT_OR_STAND = "hit or stand";
// var currentGameMode = GAME_START;

// // Use Array to push cards that player and dealer draws into their arrays
// var playerHand = [];
// var dealerHand = [];

// // Declare an empty variable to hold deck of cards
// var gameDeck = [];

// // Function that checks a hand for black jack
// var checkForBlackJack = function (handArray) {
//   // Loop through player hand
//   // if there is a blackjack return true
//   // else return false
//   var playerCardOne = handArray[0];
//   var playerCardTwo = handArray[1];
//   var isBlackJack = false;

//   // Possible black jack scenerios
//   // First card is Ace +  Second card is 10 or suits
//   // Second card is Ace +  First card is 10 or suits
//   if (
//     (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
//     (playerCardTwo.name == "ace" && playerCardOne.rank >= 10)
//   ) {
//     isBlackJack = true;
//   }

//   return isBlackJack;
// };

// // Function that calculates a hand
// var calculateTotalHandValue = function (handArray) {
//   var totalHandValue = 0;
//   // Counter to keep track of the number of aces found within the given hand
//   var aceCounter = 0;

//   // Loop through player or dealers hand and add up the ranks
//   var index = 0;
//   while (index < handArray.length) {
//     var currCard = handArray[index];

//     // In blackjack, the value of king, queen, and jack are counted as 10 by default
//     if (
//       currCard.name == "king" ||
//       currCard.name == "queen" ||
//       currCard.name == "jack"
//     ) {
//       totalHandValue = totalHandValue + 10;
//     }
//     // We count the value of ace as 11 by default
//     else if (currCard.name == "ace") {
//       totalHandValue = totalHandValue + 11;
//       aceCounter = aceCounter + 1;
//       // Else, all other numbered cards are valued by their ranks
//     } else {
//       totalHandValue = totalHandValue + currCard.rank;
//     }
//     index = index + 1;
//   }

//   // Reset index for ace counter
//   index = 0;
//   // Loop for the number of aces found and only deduct 10 from total hand value
//   // when totalHandValue is more than 21.
//   while (index < aceCounter) {
//     if (totalHandValue > 21) {
//       totalHandValue = totalHandValue - 10;
//     }
//     index = index + 1;
//   }

//   return totalHandValue;
// };

// // Function that displays the player and dealers hand in a message
// var displayPlayerAndDealerHands = function (
//   playerHandArray,
//   dealerHandArray,
//   input
// ) {
//   var playerMessage = `Player hand: (Psst your score is ${calculateTotalHandValue(
//     playerHand
//   )}!)<br>`;
//   var index = 0;
//   while (index < playerHandArray.length) {
//     playerMessage =
//       playerMessage +
//       "- " +
//       playerHandArray[index].name +
//       " of " +
//       playerHandArray[index].suit +
//       "<br>";
//     index = index + 1;
//   }
//   //index = 1 for it to run just 1 time and hide the other card.
//   if (input == "stand") {
//     index = 0;
//   } else {
//     index = 1;
//   }
//   var dealerMessage = "Dealer hand:<br>";
//   while (index < dealerHandArray.length) {
//     dealerMessage =
//       dealerMessage +
//       "- " +
//       dealerHandArray[index].name +
//       " of " +
//       dealerHandArray[index].suit +
//       "<br>";
//     index = index + 1;
//   }

//   return playerMessage + "<br>" + dealerMessage;
// };

// // Function that displays the total hand values of the player and the dealer in a message
// var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
//   var totalHandValueMessage =
//     "<br>Player total hand value: " +
//     playerHandValue +
//     "<br>Dealer total hand value: " +
//     dealerHandValue;
//   return totalHandValueMessage;
// };

// var getRandomIndex = function (max) {
//   return Math.floor(Math.random() * max);
// };

// // Shuffle the elements in the cardDeck array
// var shuffleCards = function (cardDeck) {
//   // Loop over the card deck array once
//   var currentIndex = 0;
//   while (currentIndex < cardDeck.length) {
//     // Select a random index in the deck
//     var randomIndex = getRandomIndex(cardDeck.length);
//     // Select the card that corresponds to randomIndex
//     var randomCard = cardDeck[randomIndex];
//     // Select the card that corresponds to currentIndex
//     var currentCard = cardDeck[currentIndex];
//     // Swap positions of randomCard and currentCard in the deck
//     cardDeck[currentIndex] = randomCard;
//     cardDeck[randomIndex] = currentCard;
//     // Increment currentIndex
//     currentIndex = currentIndex + 1;
//   }
//   // Return the shuffled deck
//   return cardDeck;
// };

// /* ================================================= */
// /* ================= MAIN FUNCTION ================ */
// /* ================================================ */

// var main = function (input) {
//   var outputMessage = "";

//   // FIRST PAGE
//   if (currentGameMode == GAME_START) {
//     // create a deck of cards
//     gameDeck = shuffleCards(makeDeck());

//     // deal 2 cards to player and dealer
//     playerHand.push(gameDeck.pop());
//     playerHand.push(gameDeck.pop());
//     dealerHand.push(gameDeck.pop());
//     dealerHand.push(gameDeck.pop());

//     // check player and dealer cards
//     console.log("Player Hand ==>");
//     console.log(playerHand);
//     console.log("Dealer Hand ==>");
//     console.log(dealerHand);

//     // update gameMode
//     currentGameMode = GAME_CARDS_DRAWN;

//     // reassign output message
//     outputMessage =
//       "Everyone has been dealt their cards. Click button to calculate cards!";

//     // return message
//     return outputMessage;
//   }

//   // SECOND CLICK
//   if (currentGameMode == GAME_CARDS_DRAWN) {
//     // check for blackjack
//     var playerHasBlackJack = checkForBlackJack(playerHand);
//     var dealerHasBlackJack = checkForBlackJack(dealerHand);

//     console.log("Does Player have Black Jack? ==>", playerHasBlackJack);
//     console.log("Does Dealer have Black Jack? ==>", dealerHasBlackJack);

//     // Condition when either player or dealer has black jack
//     if (playerHasBlackJack == true || dealerHasBlackJack == true) {
//       // Condition where both have black jack
//       if (playerHasBlackJack == true && dealerHasBlackJack == true) {
//         outputMessage =
//           displayPlayerAndDealerHands(playerHand, dealerHand, input) +
//           "<br>Its a Black Jack Tie!";
//       }
//       // Condition when only player has black jack
//       else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
//         outputMessage =
//           displayPlayerAndDealerHands(playerHand, dealerHand, input) +
//           "<br>Player wins by Black Jack!";
//       }
//       // Condition when only dealer has black jack
//       else {
//         outputMessage =
//           displayPlayerAndDealerHands(playerHand, dealerHand, input) +
//           "<br>Dealer wins by Black Jack!";
//       }
//     }

//     // Condition where neither player nor dealer has black jack
//     // ask player to input 'hit' or 'stand'
//     else {
//       outputMessage =
//         displayPlayerAndDealerHands(playerHand, dealerHand, input) +
//         '<br> There are no Black Jacks. <br>Please input "hit" or "stand".';

//       // update gameMode
//       currentGameMode = GAME_HIT_OR_STAND;
//     }

//     // return message
//     return outputMessage;
//   }

//   // THIRD CLICK
//   if (currentGameMode == GAME_HIT_OR_STAND) {
//     // Condition where player inputs 'hit'
//     if (input == "hit") {
//       playerHand.push(gameDeck.pop());
//       outputMessage =
//         displayPlayerAndDealerHands(playerHand, dealerHand, input) +
//         '<br> You drew another card. <br>Please input "hit" or "stand".';
//     }

//     // Condition where player inputs 'stand'
//     else if (input == "stand") {
//       // Calculate hands
//       var playerHandTotalValue = calculateTotalHandValue(playerHand);
//       var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

//       // Dealer's hit or stand logic
//       while (dealerHandTotalValue < 17) {
//         dealerHand.push(gameDeck.pop());
//         dealerHandTotalValue = calculateTotalHandValue(dealerHand);
//       }

//       // Conditions for tied game
//       if (
//         playerHandTotalValue == dealerHandTotalValue ||
//         (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
//       ) {
//         outputMessage =
//           displayPlayerAndDealerHands(playerHand, dealerHand, input) +
//           "<br>Its a Tie!" +
//           displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
//       }

//       // Conditions for player win
//       else if (
//         (playerHandTotalValue > dealerHandTotalValue &&
//           playerHandTotalValue <= 21) ||
//         (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
//       ) {
//         outputMessage =
//           displayPlayerAndDealerHands(playerHand, dealerHand, input) +
//           "<br>Player wins!" +
//           displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
//       }

//       // Dealer wins when above two conditions are not met
//       else {
//         outputMessage =
//           displayPlayerAndDealerHands(playerHand, dealerHand, input) +
//           "<br>Dealer wins!" +
//           displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
//       }
//       // update game mode - GAME_RESULTS_SHOWN is not used in this base example
//       // However, you may wish to implement your own game modes for further functionality
//       // i.e. going back to GAME_START to loop the game
//       currentGameMode = GAME_RESULTS_SHOWN;
//     }

//     // Input validation when player inputs anything outside of 'hit' or 'stand'
//     else {
//       outputMessage =
//         'wrong input, please only input "hit" or "stand".<br><br>' +
//         displayPlayerAndDealerHands(playerHand, dealerHand, input);
//     }

//     // return output message
//     return outputMessage;
//   }
// };

// // Important things for BlackJack Game
// // 1. Create Deck, Shuffle, Deal cards and Evaluate Winner
// // 2. Allow for hit / stand
// // 3. Dynamic Ace card (value 1 or 10)

// // Steps:
// // 1. Define Player and Dealer
// // 2. Draw 2 cards each
// // 3. Win conditions (more important than hit/stand because game cannot conclude without win condition)
// // 3a) does anyone have blackjack?
// // 3b) higher hand <22
// // 4. Display both values of player and dealer and declare winner
