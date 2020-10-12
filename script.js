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
    totalScore = totalScore + hand[index].rank
  }
  return totalScore;
}

var computePlayersOpenCardScore = function (hand) {
  var totalScore = 0
  for (index = 1; index < hand.length; index++) {
    totalScore = totalScore + hand[index].rank
  }
  return totalScore;
}


var computerMustTake = function () {
  computerHand.push(deck.pop());
  return computeScore(computerHand);
}

var deck = shuffleCards(makeDeck());
var currentMode = '';
var playerHand = [];
var computerHand = [];
var finish = false;

var main = function (input) {
  var myOutputValue = '';
  //computer gets one face up and one face down cards
  var computerCardFaceDown = deck.pop();
  var computerCardFaceUp = deck.pop();

  //player gets two cards
  var playerCard1 = deck.pop();
  var playerCard2 = deck.pop();
  console.log('player card name' + playerCard1.name);
  console.log('player card suit' + playerCard1.suit);
  console.log('player card rank' + playerCard1.rank);
  console.log('player card name' + playerCard2.name);
  console.log('player card suit' + playerCard2.suit);
  console.log('player card rank' + playerCard2.rank);
  console.log('computer face up card rank' + computerCardFaceUp.rank);
  console.log('computer face down card rank' + computerCardFaceDown.rank);
  if (playerHand.length == 0) {
    //push the player cards to playerhand array
    playerHand.push(playerCard1);
    playerHand.push(playerCard2);
  }
  //push the computer cards to computer hand array
  computerHand.push(computerCardFaceDown);
  computerHand.push(computerCardFaceUp);

  var currentComputerScore = computeScore(computerHand)
  var playerScore = computeScore(playerHand);

  //I want to check  bj logic
  if (currentComputerScore == 21 && computerHand.length == 2) {
    console.log(currentComputerScore);
    finish = true;
    myOutputValue = 'computer wins! computer has bj';
  }
  if (playerScore == 21 && playerHand.length == 2) {
    console.log(playerScore);
    finish = true;
    myOutputValue = 'player wins! player has bj';
  } else {
    myOutputValue += '<br>' + playerHand[0].name + ' of ' + playerHand[0].suit;
    myOutputValue += '<br>' + playerHand[1].name + ' of ' + playerHand[1].suit;
    currentMode = 'hit or stand'

  }
  console.log('player hand', playerHand);
  console.log('input', input);
  console.log('current mode', currentMode);

  if (input == 'h' && currentMode == 'hit or stand') {
    //Player Bust Scenario(Player presses HIT) -
    //This means player's open cards are >= 21
    //Deal a new card
    var newPlayerCard = deck.pop();
    //Add the new card to the player's hand
    playerHand.push(newPlayerCard);
    //Count the player's open cards
    var playerScore = computeScore(playerHand)
    // var playerCardsCount = computePlayersOpenCardScore(playerHand);
    myOutputValue += '<br>' + newPlayerCard.name + 'of ' + newPlayerCard.suit;
    //Check if player busts
    if (playerScore >= 21) {
      myOutputValue = 'computer wins!! You busted';
      finish = true;
    }
  }
  // if no one has bj and total score of 3 cards for player
  console.log('player hand', playerHand);
  var playerScore = computeScore(playerHand);
  myOutputValue += `<br> You have  ${playerScore} `;


  if (input == 's' && currentMode == 'hit or stand mode') {
    var currentComputerScore = computeScore(computerHand);
    while (currentComputerScore < 17) {
      currentComputerScore = computerMustTake();
    }
    // the currentComputerScore will be > 16
    // Check the computer's hand to see if it bust
    if (currentComputerScore > 21) {
      if (playerScore > 21) {
        myOutputValue = 'its tie!';
        finish = true;
      } else {
        myOutputValue = 'player wins!';
        finish = true;
      }
    }// if both compuetr and player bust
    else if (playerScore > 21) {
      myOutputValue = 'computer wins! but both busts';
    }// if both cards are < 21 then whoever closer to 21 wins
    // computerScore is 20
    // playerScore is 15
    else if (currentComputerScore > playerScore) {
      myOutputValue = 'computer wins! closer to 21';
    }
    else if (playerScore > currentComputerScore) {
      myOutputValue = 'player wins! closer to 21';
    }
    else {
      myOutputValue = 'its tie!';
    }
  }
  var currentComputerScore = computeScore(computerHand);
  var playerScore = computeScore(playerHand);
  myOutputValue += `<br> Please press 'h' for hit and 's' for stand!!`;

  return myOutputValue;
}