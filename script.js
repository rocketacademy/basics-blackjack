/*PROJECT 3: BLACKJACK
Source: https://fundamentals.rocketacademy.co/projects/project-3-blackjack */

// Create a global array for a deck of 52 cards. All picture cards have rank of 10 (based on Blackjack rules).
var deck = [
  {
    name: "Ace",
    suit: "Hearts",
    rank: 11,
  },
  {
    name: "2",
    suit: "Hearts",
    rank: 2,
  },
  {
    name: "3",
    suit: "Hearts",
    rank: 3,
  },
  {
    name: "4",
    suit: "Hearts",
    rank: 4,
  },
  {
    name: "5",
    suit: "Hearts",
    rank: 5,
  },
  {
    name: "6",
    suit: "Hearts",
    rank: 6,
  },
  {
    name: "7",
    suit: "Hearts",
    rank: 7,
  },
  {
    name: "8",
    suit: "Hearts",
    rank: 8,
  },
  {
    name: "9",
    suit: "Hearts",
    rank: 9,
  },
  {
    name: "10",
    suit: "Hearts",
    rank: 10,
  },
  {
    name: "Jack",
    suit: "Hearts",
    rank: 10,
  },
  {
    name: "Queen",
    suit: "Hearts",
    rank: 10,
  },
  {
    name: "King",
    suit: "Hearts",
    rank: 10,
  },
  {
    name: "Ace",
    suit: "Diamonds",
    rank: 11,
  },
  {
    name: "2",
    suit: "Diamonds",
    rank: 2,
  },
  {
    name: "3",
    suit: "Diamonds",
    rank: 3,
  },
  {
    name: "4",
    suit: "Diamonds",
    rank: 4,
  },
  {
    name: "5",
    suit: "Diamonds",
    rank: 5,
  },
  {
    name: "6",
    suit: "Diamonds",
    rank: 6,
  },
  {
    name: "7",
    suit: "Diamonds",
    rank: 7,
  },
  {
    name: "8",
    suit: "Diamonds",
    rank: 8,
  },
  {
    name: "9",
    suit: "Diamonds",
    rank: 9,
  },
  {
    name: "10",
    suit: "Diamonds",
    rank: 10,
  },
  {
    name: "Jack",
    suit: "Diamonds",
    rank: 10,
  },
  {
    name: "Queen",
    suit: "Diamonds",
    rank: 10,
  },
  {
    name: "King",
    suit: "Diamonds",
    rank: 10,
  },
  {
    name: "Ace",
    suit: "Clubs",
    rank: 11,
  },
  {
    name: "2",
    suit: "Clubs",
    rank: 2,
  },
  {
    name: "3",
    suit: "Clubs",
    rank: 3,
  },
  {
    name: "4",
    suit: "Clubs",
    rank: 4,
  },
  {
    name: "5",
    suit: "Clubs",
    rank: 5,
  },
  {
    name: "6",
    suit: "Clubs",
    rank: 6,
  },
  {
    name: "7",
    suit: "Clubs",
    rank: 7,
  },
  {
    name: "8",
    suit: "Clubs",
    rank: 8,
  },
  {
    name: "9",
    suit: "Clubs",
    rank: 9,
  },
  {
    name: "10",
    suit: "Clubs",
    rank: 10,
  },
  {
    name: "Jack",
    suit: "Clubs",
    rank: 10,
  },
  {
    name: "Queen",
    suit: "Clubs",
    rank: 10,
  },
  {
    name: "King",
    suit: "Clubs",
    rank: 10,
  },
  {
    name: "Ace",
    suit: "Spades",
    rank: 11,
  },
  {
    name: "2",
    suit: "Spades",
    rank: 2,
  },
  {
    name: "3",
    suit: "Spades",
    rank: 3,
  },
  {
    name: "4",
    suit: "Spades",
    rank: 4,
  },
  {
    name: "5",
    suit: "Spades",
    rank: 5,
  },
  {
    name: "6",
    suit: "Spades",
    rank: 6,
  },
  {
    name: "7",
    suit: "Spades",
    rank: 7,
  },
  {
    name: "8",
    suit: "Spades",
    rank: 8,
  },
  {
    name: "9",
    suit: "Spades",
    rank: 9,
  },
  {
    name: "10",
    suit: "Spades",
    rank: 10,
  },
  {
    name: "Jack",
    suit: "Spades",
    rank: 10,
  },
  {
    name: "Queen",
    suit: "Spades",
    rank: 10,
  },
  {
    name: "King",
    suit: "Spades",
    rank: 10,
  },
];

// Create a function to shuffle a deck of cards.
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function shuffleCards(cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
}

var shuffledDeck = shuffleCards(deck);
console.log(shuffledDeck);

//Define game modes
var START_GAME = "start game";
var gameMode = START_GAME;
var PLAYER_HITS = "player hits";
var DEALER_HITS = "dealer hits"; // rule: if score after 3rd card < 17, dealer has to hit 4th card.
var playerHasBusted = false;
var dealerHasBusted = false;

// List of global variables
var playerDrawnCards = []; // shuffledDeck.pop(), shuffledDeck.pop()
console.log(playerDrawnCards);
var dealerDrawnCards = [];
console.log(dealerDrawnCards);

// Create a function to calculate score of drawn cards.
function calcTotalScore(drawnCards) {
  var numAcesInDrawnCards = 0;
  var totalScore = 0;
  for (var i = 0; i < drawnCards.length; i += 1) {
    var currentCard = drawnCards[i];
    if (currentCard.name == "Ace") {
      numAcesInDrawnCards += 1;
      totalScore += 11;
    } else {
      totalScore += currentCard.rank;
    }
  }
  if (totalScore > 21 && numAcesInDrawnCards > 0) {
    for (
      var aceCounter = 0;
      aceCounter < numAcesInDrawnCards;
      aceCounter += 1
    ) {
      totalScore -= 10;
      if (totalScore <= 21) {
        break;
      }
    }
  }
  return totalScore;
}

// Create a function to check winner
var finalScore_player = 0;
var finalScore_dealer = 0;
var currentScore_player = 0;
function getWinner(finalScore_player, finalScore_dealer) {
  var finalScore_player = calcTotalScore(playerDrawnCards);
  var finalScore_dealer = calcTotalScore(dealerDrawnCards);
  if (finalScore_player > finalScore_dealer) {
    return "Player wins!";
  } else if (finalScore_player < finalScore_dealer) {
    return "Dealer wins.";
  } else {
    return "It's a tie.";
  }
}

// Create a function to check Blackjack.
function checkBlackjack(drawnCards) {
  if (drawnCards.length == 2 && calcTotalScore(drawnCards) == 21) {
    var isBlackjack = true;
    return isBlackjack;
  } else return (isBlackjack = false);
}

function main(input) {
  if (gameMode == START_GAME && input != "") {
    return "Invalid input. Please click on the 'Submit' button.";
  } else if (playerDrawnCards.length == 0) {
    playerDrawnCards.push(shuffledDeck.pop()); // Player Card 1
    dealerDrawnCards.push(shuffledDeck.pop()); // Dealer Card 1
    playerDrawnCards.push(shuffledDeck.pop()); // Player Card 2
    dealerDrawnCards.push(shuffledDeck.pop()); // Dealer Card 2
    console.log(playerDrawnCards, dealerDrawnCards);
    var message_displayCards = `Player's Hand:<br> Card 1: ${playerDrawnCards[0].name} of ${playerDrawnCards[0].suit} <br> Card 2: ${playerDrawnCards[1].name} of ${playerDrawnCards[1].suit}<br><br> Dealer's Hand:<br> Card 1: ${dealerDrawnCards[0].name} of ${dealerDrawnCards[0].suit} <br> Card 2: ${dealerDrawnCards[1].name} of ${dealerDrawnCards[1].suit}<br><hr>`;

    // if player gets blackjack, player wins
    if (checkBlackjack(playerDrawnCards)) {
      return `${message_displayCards} <b>Player drew Blackjack. Player wins!</b><br> Click 'refresh' to play again.`;
    } else if (checkBlackjack(dealerDrawnCards)) {
      // if dealer gets blackjack, dealer wins
      return `${message_displayCards} <b>Bummer...Dealer drew Blackjack. Dealer wins.</b><br> Click 'refresh' to play again.`;
    } else {
      // else ask player to hit or stand
      gameMode = PLAYER_HITS;
      currentScore_player = calcTotalScore(playerDrawnCards);
      var message_displayCards2 = `Player's Hand:<br> Card 1: ${playerDrawnCards[0].name} of ${playerDrawnCards[0].suit} <br> Card 2: ${playerDrawnCards[1].name} of ${playerDrawnCards[1].suit}<br> Player's score: ${currentScore_player} <br><br> Dealer's Hand:<br> Card 1: *Hidden* <br> Card 2: ${dealerDrawnCards[1].name} of ${dealerDrawnCards[1].suit}<br><hr>`;
      return `${message_displayCards2} Player, do you want to hit or stand? <br> Type <b>'hit'</b> or <b>'stand'</b> and click <b>'Submit'</b>.`;
    }
  } else if (gameMode == PLAYER_HITS && playerDrawnCards.length == 2) {
    if (input != "hit" && input != "stand") {
      return "Oops that is invalid. Please type <b>'hit'</b> or <b>'stand'</b> and click <b>'Submit'</b>. ";
    } else if (input == "hit") {
      // Player chooses to draw card 3.
      playerDrawnCards.push(shuffledDeck.pop()); // Player Card 3
      // if player busted, dealer draws card 3.
      if (calcTotalScore(playerDrawnCards) > 21) {
        playerHasBusted = true;
        console.log(playerHasBusted);
        finalScore_player = calcTotalScore(playerDrawnCards);
        gameMode = DEALER_HITS;
        return "Hard luck. You have busted. Let's wait for the dealer to draw its remaining cards.<br> Click <b>'Submit'</b> to to see the results."; // then change mode to dealer hits
      } else {
        // if player's score is less than 21 after card 3, ask player to hit or stand.
        currentScore_player = calcTotalScore(playerDrawnCards);
        var message_displayCards3 = `Player's Hand:<br> Card 1: ${playerDrawnCards[0].name} of ${playerDrawnCards[0].suit} <br> Card 2: ${playerDrawnCards[1].name} of ${playerDrawnCards[1].suit}<br> Card 3: ${playerDrawnCards[2].name} of ${playerDrawnCards[2].suit}<br> Player's score: ${currentScore_player} <br><br> Dealer's Hand:<br> Card 1: *Hidden* <br> Card 2: ${dealerDrawnCards[1].name} of ${dealerDrawnCards[1].suit}<br><hr>`;
        return `${message_displayCards3} Player, do you want to hit or stand? <br> Type <b>'hit'</b> or <b>'stand'</b> and click <b>'Submit'</b>.`;
      }
      // if player chooses to stand, record final score, gameMode changes to dealer hits.
    } else if (input == "stand") {
      finalScore_player = calcTotalScore(playerDrawnCards);
      gameMode = DEALER_HITS;
      return "You have chosen to stand. Let's wait for the dealer to draw its remaining cards.<br> Click <b>'Submit'</b> to to see the results.";
    }
  } else if (gameMode == PLAYER_HITS && playerDrawnCards.length == 3) {
    if (input != "hit" && input != "stand") {
      return "Oops that is invalid. Please type <b>'hit'</b> or <b>'stand'</b> and click <b>'Submit'</b>. ";
    } else if (input == "hit") {
      // Player chooses to draw card 4.
      playerDrawnCards.push(shuffledDeck.pop()); // Player Card 4
      // if player busted, dealer draws card 3.
      if (calcTotalScore(playerDrawnCards) > 21) {
        playerHasBusted = true;
        console.log(playerHasBusted);
        finalScore_player = calcTotalScore(playerDrawnCards);
        gameMode = DEALER_HITS;
        return "Hard luck. You have busted. Let's wait for the dealer to draw its remaining cards.<br> Click <b>'Submit'</b> to to see the results."; // then change mode to dealer hits
      } else {
        // if player's score is less than 21 after card 4, ask player to hit or stand.
        currentScore_player = calcTotalScore(playerDrawnCards);
        var message_displayCards4 = `Player's Hand:<br> Card 1: ${playerDrawnCards[0].name} of ${playerDrawnCards[0].suit} <br> Card 2: ${playerDrawnCards[1].name} of ${playerDrawnCards[1].suit}<br> Card 3: ${playerDrawnCards[2].name} of ${playerDrawnCards[2].suit}<br> Card 4: ${playerDrawnCards[3].name} of ${playerDrawnCards[3].suit}<br> Player's score: ${currentScore_player} <br><br> Dealer's Hand:<br> Card 1: *Hidden* <br> Card 2: ${dealerDrawnCards[1].name} of ${dealerDrawnCards[1].suit}<br><hr>`;
        return `${message_displayCards4} Player, do you want to hit or stand? <br> Type <b>'hit'</b> or <b>'stand'</b> and click <b>'Submit'</b>.`;
      }
      // if player chooses to stand, record final score, gameMode changes to dealer hits.
    } else if (input == "stand") {
      finalScore_player = calcTotalScore(playerDrawnCards);
      gameMode = DEALER_HITS;
      return "You have chosen to stand. Let's wait for the dealer to draw its remaining cards.<br> Click <b>'Submit'</b> to to see the results.";
    }
  } else if (gameMode == PLAYER_HITS && playerDrawnCards.length == 4) {
    if (input != "hit" && input != "stand") {
      return "Oops that is invalid. Please type <b>'hit'</b> or <b>'stand'</b> and click <b>'Submit'</b>. ";
    } else if (input == "hit") {
      // Player chooses to draw card 5.
      playerDrawnCards.push(shuffledDeck.pop()); // Player Card 5
      // if player busted, dealer draws card 3.
      if (calcTotalScore(playerDrawnCards) > 21) {
        playerHasBusted = true;
        console.log(playerHasBusted);
        finalScore_player = calcTotalScore(playerDrawnCards);
        gameMode = DEALER_HITS;
        return "Hard luck. You have busted. Let's wait for the dealer to draw its remaining cards.<br> Click <b>'Submit'</b> to to see the results."; // then change mode to dealer hits
      } else {
        // if player's score is less than 21 after card 5, player stands.
        finalScore_player = calcTotalScore(playerDrawnCards);
        gameMode == DEALER_HITS;
        var message_displayCards5 = `Player's Hand:<br> Card 1: ${playerDrawnCards[0].name} of ${playerDrawnCards[0].suit} <br> Card 2: ${playerDrawnCards[1].name} of ${playerDrawnCards[1].suit}<br> Card 3: ${playerDrawnCards[2].name} of ${playerDrawnCards[2].suit}<br> Card 4: ${playerDrawnCards[3].name} of ${playerDrawnCards[3].suit}<br> Card 5: ${playerDrawnCards[4].name} of ${playerDrawnCards[4].suit}<br> Player's score: ${finalScore_player} <br><br> Dealer's Hand:<br> Card 1: *Hidden* <br> Card 2: ${dealerDrawnCards[1].name} of ${dealerDrawnCards[1].suit}<br><hr>`;
        return `${message_displayCards5} You have drawn all 5 cards. <br> Let's wait for the dealer to draw its remaining cards.<br> Click <b>'Submit'</b> to to see the results.`;
      }
      // if player chooses to stand, record final score, gameMode changes to dealer hits.
    } else if (input == "stand") {
      finalScore_player = calcTotalScore(playerDrawnCards);
      gameMode = DEALER_HITS;
      return "You have chosen to stand. Let's wait for the dealer to draw its remaining cards.<br> Click <b>'Submit'</b> to to see the results.";
    }
    // Player ends turn. Dealer draws card 3.
  } else if (gameMode == DEALER_HITS) {
    if (input != "") {
      return "Invalid input. Please click on the 'Submit' button.";
    } else {
      dealerDrawnCards.push(shuffledDeck.pop()); // Dealer Card 3
      console.log(dealerDrawnCards);
      if (calcTotalScore(dealerDrawnCards) > 21) {
        dealerHasBusted = true;
        if (playerHasBusted && dealerHasBusted) {
          gameMode = START_GAME;
          return "It's your lucky day. Both player and dealer have busted. <b>It's a tie</b>.<br> Click 'refresh' to play again.";
        } else {
          gameMode = START_GAME;
          return `Your final score is ${finalScore_player} and dealer has busted. <b>You win!</b><br> Click 'refresh' to play again.`;
        }
      } else if (calcTotalScore(dealerDrawnCards) > 16) {
        // rule: if dealer's score is > 16, dealer stands.
        finalScore_dealer = calcTotalScore(dealerDrawnCards);
        if (playerHasBusted) {
          gameMode = START_GAME;
          return `<b>Final scores:</b><br> Player: ${finalScore_player} <br> Dealer: ${finalScore_dealer}<hr> <b>Player has busted and dealer wins.</b><br> Cick 'refresh' to play again.`;
        } else {
          var finalResult = getWinner(finalScore_player, finalScore_dealer);
          gameMode = START_GAME;
          return `<b>Final scores:</b><br> Player: ${finalScore_player} <br> Dealer: ${finalScore_dealer}<hr> <b>${finalResult}</b><br> Cick 'refresh' to play again.`;
        }
      } else if (calcTotalScore(dealerDrawnCards) <= 16) {
        // rule: if dealer's score is <= 16, dealer hits card 4
        dealerDrawnCards.push(shuffledDeck.pop()); // Dealer Card 4
        console.log(dealerDrawnCards);
        if (calcTotalScore(dealerDrawnCards) > 21) {
          dealerHasBusted = true;
          if (playerHasBusted && dealerHasBusted) {
            gameMode = START_GAME;
            return "It's your lucky day. Both player and dealer have busted. <b>It's a tie</b>.<br> Click 'refresh' to play again.";
          } else {
            gameMode = START_GAME;
            return `Your final score is ${finalScore_player} and dealer has busted. <b>You win!</b><br> Click 'refresh' to play again.`;
          }
        } else {
          finalScore_dealer = calcTotalScore(dealerDrawnCards);
          if (playerHasBusted) {
            gameMode = START_GAME;
            return `<b>Final scores:</b><br> Player: ${finalScore_player} <br> Dealer: ${finalScore_dealer}<hr> <b>Player has busted and dealer wins.</b><br> Cick 'refresh' to play again.`;
          } else {
            var finalResult = getWinner(finalScore_player, finalScore_dealer);
            gameMode = START_GAME;
            return `<b>Final scores:</b><br> Player: ${finalScore_player} <br> Dealer: ${finalScore_dealer}<hr> <b>${finalResult}</b><br> Cick 'refresh' to play again.`;
          }
        }
      }
    }
  } else {
    return "Click 'refresh' on your browser to start over.";
  }
}

// function main(input) {
//   if (input != "") {
//     return "Invalid input. Please click on the 'Submit' button.";
//   } else {
//     var playerCard1 = shuffledDeck.pop();
//     var dealerCard1 = shuffledDeck.pop();
//     var playerCard2 = shuffledDeck.pop();
//     var dealerCard2 = shuffledDeck.pop();
//     console.log(playerCard1, playerCard2);
//     console.log(dealerCard1, dealerCard2);
//     var message_displayCards = `Player's Hand:<br> Card 1: ${playerCard1.name} of ${playerCard1.suit} <br> Card 2: ${playerCard2.name} of ${playerCard2.suit}<br><br> Dealer's Hand:<br> Card 1: ${dealerCard1.name} of ${dealerCard1.suit} <br> Card 2: ${dealerCard2.name} of ${dealerCard2.suit}<br><hr>`;

//     // if player hand == dealer hand, then tie.
//     if (
//       playerCard1.rank + playerCard2.rank ==
//       dealerCard1.rank + dealerCard2.rank
//     ) {
//       return `${message_displayCards} It's a tie!`;
//       // if player draws Blackjack, player wins.
//     } else if (
//       (playerCard1.rank == 1 && playerCard2.rank == 10) ||
//       (playerCard1.rank == 10 && playerCard2.rank == 1)
//     ) {
//       return `${message_displayCards} Player drew Blackjack. Player wins!`;
//       // if dealer draws Blackjack, dealer wins.
//     } else if (
//       (dealerCard1.rank == 1 && dealerCard2.rank == 10) ||
//       (dealerCard1.rank == 10 && dealerCard2.rank == 1)
//     ) {
//       return `${message_displayCards} Dealer drew Blackjack. Dealer wins.`;
//       // if player's scores are higher then dealer's scores, player wins. Else, dealer wins.
//     } else if (
//       playerCard1.rank + playerCard2.rank >
//       dealerCard1.rank + dealerCard2.rank
//     ) {
//       return `${message_displayCards} Player wins!`;
//     } else {
//       return `${message_displayCards} Dealer wins!`;
//     }
//   }
// }
