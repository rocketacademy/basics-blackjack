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
  var totalScore = 0
  for (index = 0; index < hand.length; index++) {

    // joker, queen and king will be 10 in the score
    if (hand[index].rank >= 11 && hand[index].rank <= 13) {
      totalScore = totalScore + 10;
    } else {
      totalScore += hand[index].rank;
    }
  }
  return totalScore;
}
var computerMustTake = function () {
  var newCard = deck.pop();
  return newCard;
}
var deck = shuffleCards(makeDeck());
var gameState = '';
var playerHand = [];
var computerHand = [];
var finish = false;
var computerScore = 0;
var playerScore = 0;

var main = function (input) {
  var myOutputValue = '';
  //computer gets one face up and one face down cards
  if (gameState == '') {
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
    myOutputValue = `Player drew ${playerCard1.name} & ${playerCard2.name}. <br>Computer drew a face down card and face up card ${computerCardFaceUp.name}. `
    gameState = 'playerTurn';
  }
  if (gameState == 'playerTurn') {
    if (playerScore == 21 && playerHand.length == 2) {
      finish = true;
      myOutputValue += 'player wins! player has bj';
      myOutputValue += '<br>' + playerHand[0].name + ' of ' + playerHand[0].suit;
      myOutputValue += '<br>' + playerHand[1].name + ' of ' + playerHand[1].suit;

    } else if (playerScore <= 21) {
      while (playerScore < 17) {
        var playerCard3 = deck.pop();
        playerHand.push(playerCard3);
        myOutputValue += `<br><br>You just drew another card: ${playerCard3.name}.`
        playerScore = computeScore(playerHand);
      }

      console.log('player score', playerScore);

      if (playerScore > 17 && playerScore <= 21) {
        myOutputValue += `<br>Your current score is ${playerScore}. <br>Please press 'h' for hit and 's' for stand!!`;
        gameState = 'hitOrStand';
      } else {
        myOutputValue += `<br>You bust as your score ${playerScore} is more than 21.`
        gameState = 'computerTurn';
      }
    }
  } else if (gameState == 'hitOrStand') {
    if (input == 'h') {
      console.log('here');
      var playerCard4 = deck.pop();
      playerHand.push(playerCard4);
      playerScore = computeScore(playerHand);
      myOutputValue = `You drew ${playerCard4.name}. <br> Your score is now: ${playerScore}.`

      if (playerScore < 21) {
        myOutputValue += `<br> Please choose to hit or stand.`
      } else if (playerScore > 21) {
        myOutputValue += `<br> You bust!`
        gameState = 'computerTurn';
      } else {
        myOutputValue += `<br>You should choose to stand as you have reached the best possible score of 21.`
      }
    }
    else if (input == 's') {
      playerScore = computeScore(playerHand);
      myOutputValue = `You chose to stand and your score is now ${playerScore}. <br> Press submit for computer's turn.`
      gameState = 'computerTurn';
    } else {
      myOutputValue = `Please enter either 'h' or 's'.`
    }     //Check if player busts
    //tell player he cannot draw any more cards because he is bust.
  } else if (gameState == 'computerTurn') {
    computerScore = computeScore(computerHand);
    myOutputValue = `Computer's current score is ${computerScore}. `
    console.log('current computer score', computerScore);

    while (computerScore < 17) {
      newCard = computerMustTake();
      computerHand.push(newCard);
      computerScore = computeScore(computerHand);
      myOutputValue += `<br><br> Computer just drew another card ${newCard.name} and current score is ${computerScore}.`
    }

    if (computerScore <= 21) {
      myOutputValue += `<br>Computer has cards: ${displayCards(computerHand)}.`;
      gameState = 'evaluateGameResults';

      // the ComputerScore will be > 16
      // Check the computer's hand to see if it busts
    } else if (computerScore > 21) {
      myOutputValue += '<br><br>player wins! computer busts';
      myOutputValue += '<br>player:' + playerHand[0].name + ' of ' + playerHand[0].suit;
      myOutputValue += '<br>' + playerHand[1].name + ' of ' + playerHand[1].suit;
      myOutputValue += '<br>computer:' + computerHand[0].name + ' of ' + computerHand[0].suit;
      myOutputValue += '<br>' + computerHand[1].name + ' of ' + computerHand[1].suit;
      finish = true;
    } else if (computerScore > 17) {
      myOutputValue += '<br>player:' + playerHand[0].name + ' of ' + playerHand[0].suit;
      myOutputValue += '<br>' + playerHand[1].name + ' of ' + playerHand[1].suit;
      myOutputValue += '<br>computer:' + computerHand[0].name + ' of ' + computerHand[0].suit;
      myOutputValue += '<br>' + computerHand[1].name + ' of ' + computerHand[1].suit;
      gameState = 'evaluateGameResults';
    }

    //Fourth part is to compare player's score against computer score if player has 
    // not got a blackjack hand 
  } else if (gameState == 'evaluateGameResults') {
    if (computerScore > 21) {
      if (playerScore <= 21) {//playerWins
        myOutputValue += `player wins!!`;
      }
      else if (playerScore > 21) {
        //It is a draw
        myOutputValue += `Its a draw`;
      }
    } else if (computerScore <= 21) {
      if (playerScore > 21) {
        //player loses
        myOutputValue = 'player loses!';
        //below surmises the scenarios where user scores <=21 
      } else if (playerScore < computerScore) {
        //computerWins
        myOutputValue = 'computer wins!';
      } else if (playerScore > computerScore) {
        // player wins
        myOutputValue = 'player wins!';
      } else {
        myOutputValue += 'its tie!';
        myOutputValue += '<br>player:' + playerHand[0].name + ' of ' + playerHand[0].suit;
        myOutputValue += '<br>' + playerHand[1].name + ' of ' + playerHand[1].suit;
      }
      return myOutputValue;
    }

  }
  return myOutputValue;
}
var displayCards = function (hand) {
  var nameOfCards = '';
  for (i = 0; i < hand.length; i += 1) {
    nameOfCards += hand[i].name + " ";
  }
  console.log(nameOfCards);
  return nameOfCards;
}