var gameMode = "welcome";
var playerHand = [];
var dealerHand = [];
var shuffledDeck = "";
var calculatePlayerHand = "";
var calculateDealerHand = "";
var aceCounter = "";

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

var checkBlackjack = function (hand) {
  var CardOne = hand[0];
  var CardTwo = hand[1];
  var isBlackjack = false;

  if (
    (CardOne.name == "ace" && CardTwo.rank >= 10) ||
    (CardTwo.name == "ace" && CardOne.rank >= 10)
  ) {
    var isBlackjack = true;
  }
  return isBlackjack;
};
var calculateHand = function (hand) {
  var handScore = 0;
  for (var i = 0; i < hand.length; i += 1) {
    var currentCard = hand[i];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      handScore = handScore + 10;
    }
    if (currentCard.rank <= 10) {
      handScore = handScore + currentCard.rank;
    }
    //add another 10 pt for ace card to become 11 if score didnt reach 21
    if (currentCard.name == "ace") {
      handScore = handScore + 10;
      aceCounter = aceCounter + 1;
    }
  }
  var index = 0;
  while (index < aceCounter) {
    if (handScore > 21) {
      handScore = handScore - 10;
    }
    index += 1;
  }
  return handScore;
};
var showHand = function (playerShowHand, dealerShowHand) {
  var showingPlayerHand = `Player Hand: <br/>`;
  for (var j = 0; j < playerShowHand.length; j += 1) {
    showingPlayerHand =
      showingPlayerHand +
      playerShowHand[j].name +
      ` of ` +
      playerShowHand[j].suit +
      `<br/>`;
  }

  var showingDealerHand = `Dealer Hand: <br/>`;
  for (var j = 0; j < dealerShowHand.length; j += 1) {
    showingDealerHand =
      showingDealerHand +
      dealerShowHand[j].name +
      ` of ` +
      dealerShowHand[j].suit +
      `<br/>`;
  }
  return showingPlayerHand + "<br/>" + showingDealerHand + "<br/>";
};

var showScore = function (playerScore, dealerScore) {
  var displayPlayerScore = `<br/>Player Scores: ` + playerScore;
  var displayDealerScore = `<br/>Dealer Scores: ` + dealerScore;
  return displayPlayerScore + displayDealerScore;
};

var main = function (input) {
  var output = "";
  if (gameMode == "welcome") {
    var createDeck = makeDeck();
    shuffledDeck = shuffleCards(createDeck);
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());

    console.log("playerhand: ");
    console.log(playerHand);
    console.log("dealerhand: ");
    console.log(dealerHand);

    gameMode = "drawCards";
    return (output = `Welcome Player to Blackjack!<br/> Click submit again to view Hand!`);
  }
  if (gameMode == "drawCards") {
    var playerBlackJack = checkBlackjack(playerHand);
    var dealerBlackJack = checkBlackjack(dealerHand);

    if (playerBlackJack == true || dealerBlackJack == true) {
      if (playerBlackJack == true && dealerBlackJack == true) {
        setTimeout(() => {
          document.location.reload();
        }, 5000);
        return (output =
          showHand(playerHand, dealerHand) +
          "<br/> TIE!  <br/>game will restart in 5s");
      } else if (playerBlackJack == true && dealerBlackJack != true) {
        setTimeout(() => {
          document.location.reload();
        }, 5000);
        return (output =
          showHand(playerHand, dealerHand) +
          "<br/> Player Blackjack!  <br/>game will restart in 5s");
      } else {
        setTimeout(() => {
          document.location.reload();
        }, 5000);
        return (output =
          showHand(playerHand, dealerHand) +
          "<br/> Dealer Blackjack!  <br/>game will restart in 5s");
      }
    } else {
      calculatePlayerHand = calculateHand(playerHand);
      calculateDealerHand = calculateHand(dealerHand);
      console.log("player score: " + calculatePlayerHand);
      console.log("dealer score: " + calculateDealerHand);
      output =
        showHand(playerHand, dealerHand) +
        showScore(calculatePlayerHand, calculateDealerHand);
    }
    gameMode = "hitStand";
    return (output = output + "<br/> hit or stand?");
  }
  if (gameMode == "hitStand") {
    if (input == "hit") {
      playerHand.push(shuffledDeck.pop());
      output =
        showHand(playerHand, dealerHand) +
        `<br/> You drew a card <br/> hit or stand?`;
    } else if (input == "stand") {
      calculatePlayerHand = calculateHand(playerHand);
      calculateDealerHand = calculateHand(dealerHand);

      while (calculateDealerHand < 17) {
        dealerHand.push(shuffledDeck.pop());
        calculateDealerHand = calculateHand(dealerHand);
      }

      if (
        calculatePlayerHand == calculateDealerHand &&
        calculatePlayerHand < 22
      ) {
        output =
          showHand(playerHand, dealerHand) +
          showScore(calculatePlayerHand, calculateDealerHand) +
          "<br/> TIE! <br/>  <br/>type in r and submit to restart!";
      } else if (
        calculatePlayerHand > calculateDealerHand &&
        calculatePlayerHand < 22
      ) {
        output =
          showHand(playerHand, dealerHand) +
          showScore(calculatePlayerHand, calculateDealerHand) +
          "<br/> Player Wins! <br/>  <br/>type in r and submit to restart!";
      } else if (
        calculatePlayerHand > calculateDealerHand &&
        calculatePlayerHand > 21
      ) {
        output =
          showHand(playerHand, dealerHand) +
          showScore(calculatePlayerHand, calculateDealerHand) +
          "<br/> Player Bust! <br/>  <br/>type in r and submit to restart!";
      } else if (calculateDealerHand > 21) {
        output =
          showHand(playerHand, dealerHand) +
          showScore(calculatePlayerHand, calculateDealerHand) +
          "<br/> Dealer Bust! <br/>  <br/>type in r and submit to restart!";
      } else {
        output =
          showHand(playerHand, dealerHand) +
          showScore(calculatePlayerHand, calculateDealerHand) +
          "<br/> Dealer Wins! <br/> <br/>type in r and submit to restart!";
      }
    } else if (input == "r") {
      document.location.reload();
    } else {
      output =
        "wrong input, hit or stand" +
        showScore(calculatePlayerHand, calculateDealerHand);
    }

    return output;
  }
};
