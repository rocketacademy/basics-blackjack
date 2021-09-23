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
var winImage =
  '<img src="https://c.tenor.com/kEOz87vlud0AAAAC/minions-yahoo.gif"/>';
var loseImage =
  '<img src="https://c.tenor.com/XDeOwV3fT5IAAAAC/puppy-eyes-agnes.gif"/>';
var drawImage =
  '<img src="https://c.tenor.com/2w0ss8jJzXwAAAAC/lol-friends.gif"/>';

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
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
      if (rankCounter == 11 || rankCounter == 12 || rankCounter == 13) {
        var cardRank = 10;
      } else if (rankCounter == 1) {
        cardRank = 11;
      } else {
        cardRank = rankCounter;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
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
    myOutputValue = `You have drawn ${playerCard[0].suit} ${playerCard[0].name} and ${playerCard[1].suit} ${playerCard[1].name}. <br><br> Type "Hit" if you wish to draw another card. If not, type "Stand" to reveal computer's hand.`;
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
      // calculate player's current score
      playerTotalRank = calRank(playerCard);
      console.log(playerTotalRank);

      // calculate computer's current score
      var computerTotalRank = calRank(computerCard);

      // draw cards until computer's rank is more than 17
      while (computerTotalRank < 17) {
        var newCard = shuffledDeck.pop();
        computerCard.push(newCard);
        computerTotalRank += newCard.rank;
      }
      console.log(computerTotalRank);

      // print out player cards
      playerCurrentHand = printCards(playerCard);
      //print out computer cards
      computerCurrentHand = printCards(computerCard);

      // compare player and computer cards and print results
      if (
        playerTotalRank <= 21 &&
        (playerTotalRank > computerTotalRank || computerTotalRank > 21)
      ) {
        myOutputValue = `<b>You won!</b><br><br>${winImage}`;
        numberOfWins += 1;
      } else if (
        computerTotalRank <= 21 &&
        (computerTotalRank > playerTotalRank || playerTotalRank > 21)
      ) {
        myOutputValue = `<b>You lost!</b><br><br>${loseImage}`;
        numberOfLose += 1;
      } else {
        myOutputValue = `<b>It's a draw!</b><br><br>${drawImage}`;
      }
      myOutputValue += `<br><u>Your cards are:</u><br> ${playerCurrentHand}<br><u>Computer cards are:</u><br> ${computerCurrentHand}<br>Total number of rounds you won: ${numberOfWins}<br>Total number of rounds computer won: ${numberOfLose}<br><br>Click submit to start a new round!`;

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
