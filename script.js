var shuffledDeck = [];
var deck = [];
var computerCard = [];
var playerCard = [];
var myOutputValue;
var currentGameMode = "Draw Cards";
var playerCurrentHand = "";
var computerCurrentHand = "";
var mustStand = false;
var playerTotalRank = 0;
var numberOfWins = 0;
var numberOfLose = 0;

var makeDeck = function () {
  var newDeck = [
    {
      name: "ace",
      suit: "hearts",
      rank: 11,
    },
    {
      name: "2",
      suit: "hearts",
      rank: 2,
    },
    {
      name: "3",
      suit: "hearts",
      rank: 3,
    },
    {
      name: "4",
      suit: "hearts",
      rank: 4,
    },
    {
      name: "5",
      suit: "hearts",
      rank: 5,
    },
    {
      name: "6",
      suit: "hearts",
      rank: 6,
    },
    {
      name: "7",
      suit: "hearts",
      rank: 7,
    },
    {
      name: "8",
      suit: "hearts",
      rank: 8,
    },
    {
      name: "9",
      suit: "hearts",
      rank: 9,
    },
    {
      name: "10",
      suit: "hearts",
      rank: 10,
    },
    {
      name: "jack",
      suit: "hearts",
      rank: 10,
    },
    {
      name: "queen",
      suit: "hearts",
      rank: 10,
    },
    {
      name: "king",
      suit: "hearts",
      rank: 10,
    },
    {
      name: "ace",
      suit: "diamonds",
      rank: 11,
    },
    {
      name: "2",
      suit: "diamonds",
      rank: 2,
    },
    {
      name: "3",
      suit: "diamonds",
      rank: 3,
    },
    {
      name: "4",
      suit: "diamonds",
      rank: 4,
    },
    {
      name: "5",
      suit: "diamonds",
      rank: 5,
    },
    {
      name: "6",
      suit: "diamonds",
      rank: 6,
    },
    {
      name: "7",
      suit: "diamonds",
      rank: 7,
    },
    {
      name: "8",
      suit: "diamonds",
      rank: 8,
    },
    {
      name: "9",
      suit: "diamonds",
      rank: 9,
    },
    {
      name: "10",
      suit: "diamonds",
      rank: 10,
    },
    {
      name: "jack",
      suit: "diamonds",
      rank: 10,
    },
    {
      name: "queen",
      suit: "diamonds",
      rank: 10,
    },
    {
      name: "king",
      suit: "diamonds",
      rank: 10,
    },
    {
      name: "ace",
      suit: "clubs",
      rank: 11,
    },
    {
      name: "2",
      suit: "clubs",
      rank: 2,
    },
    {
      name: "3",
      suit: "clubs",
      rank: 3,
    },
    {
      name: "4",
      suit: "clubs",
      rank: 4,
    },
    {
      name: "5",
      suit: "clubs",
      rank: 5,
    },
    {
      name: "6",
      suit: "clubs",
      rank: 6,
    },
    {
      name: "7",
      suit: "clubs",
      rank: 7,
    },
    {
      name: "8",
      suit: "clubs",
      rank: 8,
    },
    {
      name: "9",
      suit: "clubs",
      rank: 9,
    },
    {
      name: "10",
      suit: "clubs",
      rank: 10,
    },
    {
      name: "jack",
      suit: "clubs",
      rank: 10,
    },
    {
      name: "queen",
      suit: "clubs",
      rank: 10,
    },
    {
      name: "king",
      suit: "clubs",
      rank: 10,
    },
    {
      name: "ace",
      suit: "spades",
      rank: 11,
    },
    {
      name: "2",
      suit: "spades",
      rank: 2,
    },
    {
      name: "3",
      suit: "spades",
      rank: 3,
    },
    {
      name: "4",
      suit: "spades",
      rank: 4,
    },
    {
      name: "5",
      suit: "spades",
      rank: 5,
    },
    {
      name: "6",
      suit: "spades",
      rank: 6,
    },
    {
      name: "7",
      suit: "spades",
      rank: 7,
    },
    {
      name: "8",
      suit: "spades",
      rank: 8,
    },
    {
      name: "9",
      suit: "spades",
      rank: 9,
    },
    {
      name: "10",
      suit: "spades",
      rank: 10,
    },
    {
      name: "jack",
      suit: "spades",
      rank: 10,
    },
    {
      name: "queen",
      suit: "spades",
      rank: 10,
    },
    {
      name: "king",
      suit: "spades",
      rank: 10,
    },
  ];
  return newDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
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
};

var printCards = function (cardArray) {
  var hand = "";
  var index = 0;
  while (index < cardArray.length) {
    hand += `${cardArray[index].suit} ${cardArray[index].name}<br>`;
    index += 1;
  }
  return hand;
};

var calRank = function (cardArray) {
  var rank = 0;
  var index = 0;
  var aceCounter = 0;
  while (index < cardArray.length) {
    rank += cardArray[index].rank;
    // change ace from rank 11 to rank 1
    if (cardArray[index].name == "ace") {
      aceCounter += 1;
    }
    if (rank > 21 && aceCounter > 0) {
      rank -= 10;
      aceCounter -= 1;
    }
    index += 1;
  }
  return rank;
};

var main = function (input) {
  if (currentGameMode == "Draw Cards") {
    deck = makeDeck();
    shuffledDeck = shuffleCards(deck);
    playerCard.push(shuffledDeck.pop());
    computerCard.push(shuffledDeck.pop());
    playerCard.push(shuffledDeck.pop());
    computerCard.push(shuffledDeck.pop());
    myOutputValue = `You have drawn ${playerCard[0].suit} ${playerCard[0].name} and ${playerCard[1].suit} ${playerCard[1].name}. Type "Hit" if you wish to draw another card. If not, type "Stand" to reveal computer's hand.`;
    currentGameMode = "Play Cards";
  } else if (currentGameMode == "Play Cards") {
    if (input == "Hit" && mustStand == false) {
      // draw a card
      playerCard.push(shuffledDeck.pop());

      // print out player cards
      playerCurrentHand = printCards(playerCard);

      myOutputValue = `Your cards are:<br> ${playerCurrentHand}<br>If you wish to draw another card, enter "Hit". If not, enter "Stand".`;

      // calculate player's current score
      playerTotalRank = calRank(playerCard);
      console.log(playerTotalRank);

      // enforce rule of max. 5 cards and max. rank of 21
      if (playerCard.length == 5 || playerTotalRank > 21) {
        mustStand = true;
      }
    } else if (input == "Stand" || mustStand == true) {
      // calculate computer's current score
      var computerTotalRank = calRank(computerCard);

      // draw cards until computer's rank is more than 17
      while (computerTotalRank < 17) {
        var newCard = shuffledDeck.pop();
        computerCard.push(newCard);
        computerTotalRank += newCard.rank;
      }
      console.log(computerTotalRank);

      //print out computer cards
      computerCurrentHand = printCards(computerCard);

      // compare player and computer cards and print results
      if (playerTotalRank > computerTotalRank && playerTotalRank < 21) {
        myOutputValue = `You won!`;
        numberOfWins += 1;
      } else if (
        computerTotalRank > playerTotalRank &&
        computerTotalRank < 21
      ) {
        myOutputValue = `You lost!`;
        numberOfLose += 1;
      } else {
        myOutputValue = `It's a draw!`;
      }
      myOutputValue += `<br><br>Your cards are:<br> ${playerCurrentHand}<br>Computer cards are:<br> ${computerCurrentHand} <br><br>Total number of rounds you won: ${numberOfWins}<br>Total number of rounds computer won: ${numberOfLose}<br><br>Click submit to start a new round!`;

      // reinitialise game
      currentGameMode = "Draw Cards";
      computerCard = [];
      playerCard = [];
      computerCurrentHand = "";
      playerCurrentHand = "";
      mustStand = false;
    } else {
      myOutputValue = `Invalid input. Please enter "Hit" or "Stand".`;
    }
  }

  return myOutputValue;
};
