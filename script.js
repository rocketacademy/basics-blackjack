var dealerStatus = 0;
var playerStatus = 0;
var gameMode = "login";
var playerHand = [];
var dealerHand = [];

// Card Generation
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
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};
//shuffle
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

var main = function (input) {
  var output = "";

  if (gameMode == "login") {
    gameMode = "drawCards";
    return (output = `Welcome Player to Blackjack!<br/> Click submit again to play!`);
  }
  if (gameMode == "drawCards") {
    var createDeck = makeDeck();

    var shuffledDeck = shuffleCards(createDeck);

    var playerCardOne = shuffledDeck.pop();
    var dealerCardOne = shuffledDeck.pop();
    var playerCardTwo = shuffledDeck.pop();
    var dealerCardTwo = shuffledDeck.pop();

    //blackjack condition

    if (
      (playerCardOne.name == "ace" && playerCardTwo.name >= 10) ||
      (playerCardTwo.name == "ace" && playerCardOne.name >= 10)
    ) {
      var playerblackjack = true;
    }
    if (
      (dealerCardOne.name == "ace" && dealerCardTwo.name >= 10) ||
      (dealerCardTwo.name == "ace" && dealerCardOne.name >= 10)
    ) {
      var dealerblackjack = true;
    }

    if (playerblackjack == true && dealerblackjack != true) {
      return (output = `player has ${playerCardOne.name} of ${playerCardOne.suit} & ${playerCardTwo.name} of ${playerCardTwo.suit}<br /> 
      dealer has ${dealerCardOne.name} of ${dealerCardOne.suit} & ${dealerCardTwo.name} of ${dealerCardTwo.suit}<br />
      Player has gotten a blackjack! Player Wins!`);
    }
    if (playerblackjack != true && dealerblackjack == true) {
      return (output = `player has ${playerCardOne.name} of ${playerCardOne.suit} & ${playerCardTwo.name} of ${playerCardTwo.suit}<br /> 
      dealer has ${dealerCardOne.name} of ${dealerCardOne.suit} & ${dealerCardTwo.name} of ${dealerCardTwo.suit}<br />
      Dealer has gotten a blackjack! Dealer Wins!`);
    }
    if (playerblackjack == true && dealerblackjack == true) {
      return (output = `player has ${playerCardOne.name} of ${playerCardOne.suit} & ${playerCardTwo.name} of ${playerCardTwo.suit}<br /> 
      dealer has ${dealerCardOne.name} of ${dealerCardOne.suit} & ${dealerCardTwo.name} of ${dealerCardTwo.suit}<br />
      Player & Dealer has gotten a blackjack! Ties!`);
    }

    if (playerblackjack != true && dealerblackjack != true) {
      gameMode = "hit/Stand";
      return (output = `player has ${playerCardOne.name} of ${playerCardOne.suit} & ${playerCardTwo.name} of ${playerCardTwo.suit}<br /> 
      dealer has ${dealerCardOne.name} of ${dealerCardOne.suit} & ${dealerCardTwo.name} of ${dealerCardTwo.suit} <br /> + "hit or stand?")`);
    }
    if (gameMode == "hit/Stand") {
      var pCardOne = playerCardOne.name;
      var pCardTwo = playerCardTwo.name;
      var dCardOne = dealerCardOne.name;
      var dCardTwo = dealerCardTwo.name;

      // winning condition
      if (pCardOne == "jack" || pCardOne == "queen" || pCardOne == "king") {
        pCardOne = 10;
      }
      if (pCardTwo == "jack" || pCardTwo == "queen" || pCardTwo == "king") {
        pCardTwo = 10;
      }
      if (dCardOne == "jack" || dCardOne == "queen" || dCardOne == "king") {
        dCardOne = 10;
      }
      if (dCardTwo == "jack" || dCardTwo == "queen" || dCardTwo == "king") {
        dCardTwo = 10;
      }
      if (pCardOne == "ace") {
        pCardOne = 11;
      }
      if (pCardTwo == "ace") {
        pCardTwo = 11;
      }
      if (dCardOne == "ace") {
        dCardOne = 11;
      }
      if (dCardTwo == "ace") {
        dCardTwo = 11;
      }
      playerStatus = pCardOne + pCardTwo;
      dealerStatus = dCardOne + dCardTwo;

      var output = `dealer has ${dealerCardOne.name} of ${dealerCardOne.suit} & ${dealerCardTwo.name} of ${dealerCardTwo.suit}<br />
  player has ${playerCardOne.name} of ${playerCardOne.suit} & ${playerCardTwo.name} of ${playerCardTwo.suit}<br />
  playerStatus = ${playerStatus}<br />
  dealerStatus = ${dealerStatus}<br /> `;
      //if (dealerStatus == 21)

      if (dealerStatus > playerStatus) {
        output = output + "dealer wins";
      } else if (dealerStatus < playerStatus) {
        output = output + "player wins";
      } else {
        output = output + "Tie";
      }

      return output;
    }
  }
};
