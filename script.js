
var cards = [
  {
    name: 'ace',
    suit: 'hearts',
    rank: 1
  }, {
    name: '2',
    suit: 'hearts',
    rank: 2
  },
  {
    name: '3',
    suit: 'hearts',
    rank: 3
  }, {
    name: '4',
    suit: 'hearts',
    rank: 4
  }, {
    name: '5',
    suit: 'hearts',
    rank: 5
  }, {
    name: '6',
    suit: 'hearts',
    rank: 6
  }, {
    name: '7',
    suit: 'hearts',
    rank: 7
  }, {
    name: '8',
    suit: 'hearts',
    rank: 8
  }, {
    name: '9',
    suit: 'hearts',
    rank: 9
  }, {
    name: '10',
    suit: 'hearts',
    rank: 10
  }, {
    name: 'jack',
    suit: 'hearts',
    rank: 10
  }, {
    name: 'queen',
    suit: 'hearts',
    rank: 10
  }, {
    name: 'king',
    suit: 'hearts',
    rank: 10
  }, {
    name: 'ace',
    suit: 'diamonds',
    rank: 1
  }, {
    name: '2',
    suit: 'diamonds',
    rank: 2
  }, {
    name: '3',
    suit: 'diamonds',
    rank: 3
  }, {
    name: '4',
    suit: 'diamonds',
    rank: 4
  }, {
    name: '5',
    suit: 'diamonds',
    rank: 5
  }, {
    name: '6',
    suit: 'diamonds',
    rank: 6
  }, {
    name: '7',
    suit: 'diamonds',
    rank: 7
  }, {
    name: '8',
    suit: 'diamonds',
    rank: 8
  }, {
    name: '9',
    suit: 'diamonds',
    rank: 9
  }, {
    name: '10',
    suit: 'diamonds',
    rank: 10
  }, {
    name: 'jack',
    suit: 'diamonds',
    rank: 10
  }, {
    name: 'queen',
    suit: 'diamonds',
    rank: 10
  }, {
    name: 'king',
    suit: 'diamonds',
    rank: 10
  }, {
    name: 'ace',
    suit: 'clubs',
    rank: 1
  }, {
    name: '2',
    suit: 'clubs',
    rank: 2
  }, {
    name: '3',
    suit: 'clubs',
    rank: 3
  }, {
    name: '4',
    suit: 'clubs',
    rank: 4
  }, {
    name: '5',
    suit: 'clubs',
    rank: 5
  }, {
    name: '6',
    suit: 'clubs',
    rank: 6
  }, {
    name: '7',
    suit: 'clubs',
    rank: 7
  }, {
    name: '8',
    suit: 'clubs',
    rank: 8
  }, {
    name: '9',
    suit: 'clubs',
    rank: 9
  }, {
    name: '10',
    suit: 'clubs',
    rank: 10
  }, {
    name: 'jack',
    suit: 'clubs',
    rank: 10
  }, {
    name: 'queen',
    suit: 'clubs',
    rank: 10
  }, {
    name: 'king',
    suit: 'clubs',
    rank: 10
  }, {
    name: 'ace',
    suit: 'spades',
    rank: 1
  }, {
    name: '2',
    suit: 'spades',
    rank: 2
  }, {
    name: '3',
    suit: 'spades',
    rank: 3
  }, {
    name: '4',
    suit: 'spades',
    rank: 4
  }, {
    name: '5',
    suit: 'spades',
    rank: 5
  }, {
    name: '6',
    suit: 'spades',
    rank: 6
  }, {
    name: '7',
    suit: 'spades',
    rank: 7
  }, {
    name: '8',
    suit: 'spades',
    rank: 8
  }, {
    name: '9',
    suit: 'spades',
    rank: 9
  }, {
    name: '10',
    suit: 'spades',
    rank: 10
  }, {
    name: 'jack',
    suit: 'spades',
    rank: 10
  }, {
    name: 'queen',
    suit: 'spades',
    rank: 10
  }, {
    name: 'king',
    suit: 'spades',
    rank: 10
  }
];

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size)
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

  return cards;
};

console.log("start card" + cards.length)

var gameMode = "start";
var shuffledCards = shuffleCards(cards);


var handSum = function (hand) {
  var handContainsAce = false;
  var sum = 0;
  for (var i = 0; i < hand.length; i += 1) {
    var currCard = hand[i];
    // If card rank is not ace, value is same as rank
    if (currCard.rank !== 1) {
      sum += currCard.rank;
      // If card is Ace, value is 11 by default
    } else if (currCard.rank === 1) {
      handContainsAce = true;
      sum += 11;
    }
  }
  // If sum is greater than sum limit and hand contains Ace,
  // Convert Ace from value of 11 to value of 1.
  if (sum > handLimit && handContainsAce) {
    sum -= 10;
  }
  return sum;

}

var dealCards = function () {
  for (var j = 0; j < 2; j++) {
    computerCards[j] = shuffledCards.shift();
    computerScore = computerScore + computerCards[j].rank;
  };
  for (var i = 0; i < 2; i++) {
    userCards[i] = shuffledCards.shift();
    userScore = userScore + userCards[i].rank;
  };


};

var drawCards = function (hand) {
  hand.push(shuffledCards.shift())
}
var userCards = [];
var userScore = handSum(userCards);


var computerCards = [];
var computerScore = handSum(computerCards);


var handLimit = 21;


var cardToString = function (hand) {
  return `[${hand.map((cards) => cards.name)}]`;
}

var myOutputValue = "";

var main = function (input) {

  if (gameMode == "game over") {
    myOutputValue = "Game is over. Hit refresh";
    return myOutputValue;
  }

  if (gameMode == "start") {
    dealCards();
    console.log("cards left " + shuffledCards.length);
    console.log("computer cards")

    gameMode = "user turn";

    // check if there is blackjack

    var userCardRanks = [];
    for (let i = 0; i < userCards.length; i += 1) {
      userCardRanks.push(userCards[i].rank);
    };
    var computerCardRanks = [];
    for (let j = 0; j < computerCards.length; j += 1) {
      computerCardRanks.push(computerCards[j].rank);
    };

    console.log("computer card ranks")
    console.log(computerCardRanks)

    var userBlackjack = (userCardRanks.includes(10) && userCardRanks.includes(1))
    var computerBlackjack = (computerCardRanks.includes(10) && computerCardRanks.includes(1))
    console.log("userblackjack" + userBlackjack);
    console.log("computerblackjack" + computerBlackjack);

    myOutputValue = 'user: ' + cardToString(userCards) + "<br>" + 'computer: ' + computerCards[0].name + "face down card <br>" + 'User Type: hit or stay ';
    if (userBlackjack == true) {
      gameMode = "game over";
      myOutputValue = "User Blackjack! user:" + cardToString(userCards) + "<br>" + 'computer: ' + cardToString(computerCards);
    } else if (computerBlackjack == true) {
      gameMode = "game over";
      myOutputValue = "Computer Blackjack! user:" + cardToString(userCards) + "<br>" + 'computer: ' + cardToString(computerCards);
    };

    return myOutputValue;
  };

  if (gameMode == "user turn") {
    if (input == 'hit') {
      drawCards(userCards);
      userScore = handSum(userCards);
      if (userScore > handLimit) {
        myOutputValue = 'user: ' + cardToString(userCards) + "<br>" + 'computer: ' + computerCards[0].name + "face down card <br>" + 'You lost!';
        gameMode = "game over";
      } else {
        myOutputValue = 'user: ' + cardToString(userCards) + "<br>" + 'computer: ' + computerCards[0].name + "face down card <br>" + 'User Type: hit or stay ';
      }
    } else if (input == "stay") {
      gameMode = "computer turn";
      myOutputValue = 'user: ' + cardToString(userCards) + "<br>" + 'computer: ' + cardToString(computerCards) + 'Computer Turn ';
    } else {
      myOutputValue = "please type hit or stay"
    }



    console.log("mode" + gameMode);
    return myOutputValue;
  };



  if (gameMode == "computer turn") {
    var computerScore = handSum(computerCards);
    var userScore = handSum(userCards);
    var computerStayThreshold = 16;

    // if the computer score is less than threshold, draw card 
    if (computerScore < computerStayThreshold) {
      while (computerScore < computerStayThreshold) {
        drawCards(computerCards);
        computerScore = handSum(computerCards);
      }
      console.log("computer cards")
      console.log(computerCards)

      console.log("userscore " + userScore);
      console.log("computerscore " + computerScore);
      myOutputValue = 'user: ' + cardToString(userCards) + "<br>" + 'computer: ' + cardToString(computerCards)


      // if computer scores exceeds 21, user won
      if (computerScore > handLimit) {
        myOutputValue = 'user: ' + cardToString(userCards) + "<br>" + 'computer: ' + cardToString(computerCards) + "computer bust. You won";
        gameMode = "game over"
        // if the computer score is more than threshold, compare the scores of computer vs user
      } else if (computerScore >= computerStayThreshold) {

        if (computerScore > userScore) {
          console.log("computer won")
          console.log(computerScore > userScore)

          console.log("userscore" + userScore);
          console.log("computerscore " + computerScore);

          myOutputValue = 'user: ' + cardToString(userCards) + "<br>" + 'computer: ' + cardToString(computerCards) + "You lost";
          gameMode = "game over";
        } else if (computerScore < userScore) {

          console.log("computer lost")
          console.log(computerScore < userScore)

          myOutputValue = 'user: ' + cardToString(userCards) + "<br>" + 'computer: ' + cardToString(computerCards) + "You won";
          gameMode = "game over"
        } else {
          console.log("drew")
          console.log(computerScore == userscore)

          myOutputValue = 'user: ' + cardToString(userCards) + "<br>" + 'computer: ' + cardToString(computerCards) + "You draw";
          gameMode = "game over"
        }
      }
    } else if (computerScore >= computerStayThreshold) {

      if (computerScore > userScore) {
        console.log("computer won")
        console.log(computerScore > userScore)

        console.log("userscore" + userScore);
        console.log("computerscore " + computerScore);

        myOutputValue = 'user: ' + cardToString(userCards) + "<br>" + 'computer: ' + cardToString(computerCards) + "You lost";
        gameMode = "game over";
      } else if (computerScore < userScore) {

        console.log("computer lost")
        console.log(computerScore < userScore)

        myOutputValue = 'user: ' + cardToString(userCards) + "<br>" + 'computer: ' + cardToString(computerCards) + "You won";
        gameMode = "game over"
      } else {
        console.log("drew")
        console.log(computerScore == userscore)

        myOutputValue = 'user: ' + cardToString(userCards) + "<br>" + 'computer: ' + cardToString(computerCards) + "You draw";
        gameMode = "game over"
      }

    }
    return myOutputValue;
  }

  return myOutputValue;
}