var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];
    // loop to create all cards in this suit
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }


      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      //console.log('rank counter ' + rankCounter);
      // add the card to the deck
      deck.push(card);
      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  return deck;
};
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};
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
  console.log(cards)
  return cards;
};
var computeScore = function (hand) {
  var totalScore = 0;
  var hasAce = false;
  for (index = 0; index < hand.length; index++) {

    // joker, queen and king will be 10 in the score
    if (hand[index].rank >= 11 && hand[index].rank <= 13) {
      totalScore = totalScore + 10;
      // ace will be 11
    } else if (hand[index].rank == 1) {
      totalScore = totalScore + 11;
      hasAce = true;
    } else {
      totalScore += hand[index].rank;
    }
  }
  //  if the player hand has ace and is > 21 change the ace card to 1
  if (hasAce == true && totalScore > 21) {
    totalScore = totalScore - 10;
  }
  return totalScore;
}
var computerMustTake = function () {
  var newCard = deck.pop();
  return newCard;
}
var displayCards = function (hand) {
  var nameOfCards = '';
  for (i = 0; i < hand.length; i += 1) {
    nameOfCards += hand[i].name + " ";
  }
  console.log(nameOfCards);
  return nameOfCards;
}

var deck = shuffleCards(makeDeck());
// var deck = makeDeck();
// var card1 = {
//   rank: 9,
//   suit: "heart",
//   name: "jack",
// };
// var card2 = {
//   rank: 9,
//   suit: "heart",
//   name: "jack",
// };

// var card3 = {
//   rank: 9,
//   suit: "heart",
//   name: "jack",
// };

// var card4 = {
//   rank: 9,
//   suit: "heart",
//   name: "jack",
// };
// var card5 = {
//   rank: 1,
//   suit: "heart",
//   name: "ace",
// };
// deck.push(card5);
// deck.push(card4);
// deck.push(card3);
// deck.push(card2);
// deck.push(card1);
var gameState = 'userName';
var userName = '';
var playerHand = [];
var computerHand = [];
var finish = false;
var computerScore = 0;
var playerScore = 0;

var main = function (input) {
  var myOutputValue = '';
  //computer gets one face up and one face down cards
  if (gameState == 'userName') {
    userName = input;
    gameState = 'bj'
    myOutputValue = `Hello ${userName}. Please press submit to play`
  } else if (gameState == 'bj') {
    var computerCardFaceDown = deck.pop();
    var computerCardFaceUp = deck.pop();
    //player gets two cards
    var playerCard1 = deck.pop();
    var playerCard2 = deck.pop();
    console.log(playerCard1);
    console.log(playerCard2);
    console.log(computerCardFaceUp);
    console.log(computerCardFaceDown);
    if (playerHand.length == 0) {
      //push the player cards to playerhand array
      playerHand.push(playerCard1);
      playerHand.push(playerCard2);
      //push the computer cards to computer hand array
      computerHand.push(computerCardFaceDown);
      computerHand.push(computerCardFaceUp);
    }
    computerScore = computeScore(computerHand)
    playerScore = computeScore(playerHand);
    console.log('current computer score', computerScore);
    console.log('player score', playerScore);
    //show cards to the player
    myOutputValue = `${userName} drew ${playerCard1.name} & ${playerCard2.name}. <br>Computer drew a face down card and face up card ${computerCardFaceUp.name}. `
    gameState = 'playerTurn';
  }
  if (gameState == 'playerTurn') {
    if (playerScore == 21 && playerHand.length == 2) {
      finish = true;
      myOutputValue += `<br><br>${userName} wins! ${userName} has bj`;
      myOutputValue += `<br>Computer has cards: ${displayCards(computerHand)}.`;
      myOutputValue += `<br>${userName} has cards: ${displayCards(playerHand)}.`;

    } else if (playerScore < 17 && playerScore <= 21) {
      myOutputValue += `<br>${userName}'s current score is ${playerScore}. <br>Please press 'h' for hit and 's' for stand!!`;
      gameState = 'hitOrStand';
    }

    console.log('player score', playerScore);

    if (playerScore > 17 && playerScore <= 21) {
      myOutputValue += `<br>${userName}'s current score is ${playerScore}. <br>Please press 'h' for hit and 's' for stand!!`;
      gameState = 'hitOrStand';
    } else if (playerScore > 21) {
      myOutputValue += `<br>${userName} busts as your score ${playerScore} is more than 21.`;
      myOutputValue += `<br>Computer has cards: ${displayCards(computerHand)}.`;
      myOutputValue += `<br>${userName} has cards: ${displayCards(playerHand)}.`;
      gameState = 'computerTurn';
    }
  } else if (gameState == 'hitOrStand') {
    if (input == 'h') {
      console.log('hit');
      var playerCard4 = deck.pop();
      playerHand.push(playerCard4);
      console.log('player card 4', playerCard4);
      playerScore = computeScore(playerHand);
      myOutputValue = `${userName} choose to hit! ${userName} drew ${playerCard4.name}. <br> ${userName}'s score is now: ${playerScore}.`;

      if (playerScore < 21) {
        myOutputValue += `<br> Please choose to hit or stand.`;
      } else if (playerScore > 21) {
        myOutputValue += `<br> ${userName} busts! ${userName}'s score is now ${playerScore}`;
        gameState = 'computerTurn';
      } else {
        myOutputValue += `<br>${userName}should choose to stand as you have reached the best possible score of 21.`;
      }
    }
    else if (input == 's') {
      playerScore = computeScore(playerHand);
      myOutputValue = ` ${userName} chooses to stand and ${userName}'s score is now ${playerScore}. <br> Press submit for computer's turn.`;
      gameState = 'computerTurn';
    } else {
      myOutputValue = `Please enter either 'h' or 's'.`
    }     //Check if player busts
    //tell player he cannot draw any more cards because he is bust.
  } else if (gameState == 'computerTurn') {
    computerScore = computeScore(computerHand);
    myOutputValue = `Computer's current score is ${computerScore}. `;
    console.log('current computer score', computerScore);

    while (computerScore < 17) {
      newCard = computerMustTake();
      computerHand.push(newCard);
      computerScore = computeScore(computerHand);
      myOutputValue += `<br><br> Computer just drew another card ${newCard.name} and current score is ${computerScore}.`;
    }

    if (computerScore <= 21) {
      myOutputValue += `<br>Computer has cards: ${displayCards(computerHand)}.`;
      gameState = 'evaluateGameResults';

      // the ComputerScore will be > 16
      // Check the computer's hand to see if it busts
    } else if (computerScore > 21) {
      myOutputValue += `<br>${userName} wins! computer busts`;
      myOutputValue += `<br>Computer has cards: ${displayCards(computerHand)}.  ${userName} has cards: ${displayCards(playerHand)}.`;
      finish = true;
    } else if (computerScore > 17) {
      myOutputValue += `<br>Computer has cards: ${displayCards(computerHand)}.`;
      myOutputValue += `<br>${userName} has cards: ${displayCards(playerHand)}.`;
      gameState = 'evaluateGameResults';
    }

    //Fourth part is to compare player's score against computer score if player has 
    // not got a blackjack hand 
  } else if (gameState == 'evaluateGameResults') {
    if (computerScore > 21) {
      if (playerScore <= 21) {//playerWins
        myOutputValue += `${userName} wins!!`;
        myOutputValue += `<br>Computer has cards: ${displayCards(computerHand)}.`;
        myOutputValue += `<br>${userName} has cards: ${displayCards(playerHand)}.`;
      }
      else if (playerScore > 21) {
        //It is a draw
        myOutputValue += `Its a draw`;
        myOutputValue += `<br>computer has cards: ${displayCards(computerHand)}.`;
        myOutputValue += `<br>${userName} has cards: ${displayCards(playerHand)}.`;
      }
    } else if (computerScore <= 21) {
      if (playerScore > 21) {
        //player loses
        myOutputValue = `${userName} loses!`;
        myOutputValue += `<br>Computer has cards: ${displayCards(computerHand)}.`;
        myOutputValue += `<br>${userName} has cards: ${displayCards(playerHand)}.`;
        //below surmises the scenarios where user scores <=21 
      } else if (playerScore < computerScore) {
        //computerWins
        myOutputValue = 'computer wins!';
        myOutputValue += `<br>Computer has cards: ${displayCards(computerHand)}.`;
        myOutputValue += `<br>${userName} has cards: ${displayCards(playerHand)}.`;
      } else if (playerScore > computerScore) {
        // player wins
        myOutputValue = `${userName} wins!`;
        myOutputValue += `<br>Computer has cards: ${displayCards(computerHand)}.`;
        myOutputValue += `<br>${userName}has cards: ${displayCards(playerHand)}.`;
      } else {
        myOutputValue += 'its tie!';
        myOutputValue += `<br>Computer has cards: ${displayCards(computerHand)}.`;
        myOutputValue += `<br>${userName} has cards: ${displayCards(playerHand)}.`;
      }
      return myOutputValue;
    }

  }
  return myOutputValue;
}
