//52 card deck builder
var makeDeck = function () {
  //Initialise an empty deck array
  var cardDeck = [];
  //Initialise an array of the 4 suits in your deck. This array will be looped over
  var suits = ["diamond", "hearts", "clubs", "spades"];
  //loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    //store the current suit in a variable
    var currentSuit = suits[suitIndex];
    // Loop from 1 to 13 to create all cards for a given unit
    //Notice rankCounter starts at 1 and not 0 and ends at 13 and not 12
    //Thi is an example of a loop without an array
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      //If rank is 1, 11,12, or 13, set cardName to the ace or the face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      //create a new card with the current name,suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      //Add new card to the deck
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

//shuffle the deck
//generate a random index first
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//start shuffling using the getRandomIndex from variable
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};

var cardDeck = shuffleCards(makeDeck());

var playerHand = [];
var computerHand = [];
var maxpoints = 21;
var dealerHit = 16;
var playerStand = false;
var gameover = false;
var dealCards = function (hand) {
  hand.push(cardDeck.pop());
};

var handValue = function (hand) {
  var aceinHand = 0;
  var max = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currCard = hand[i];
    if (currCard.rank >= 2 && currCard.rank <= 10) {
      max += currCard.rank;
    } else if (currCard.rank >= 11 && currCard.rank <= 13) {
      max += 10;
    } else if (currCard.rank == 1) {
      aceinHand += 1;
      max += 11;
    }
  }
  if (max > maxpoints && aceinHand > 0) {
    for (let i = 0; i < aceinHand; I += 1) {
      max -= 10;
      if (max <= maxpoints) {
        break;
      }
    }
  }
  return max;
};

var Blackjack = function (hand) {
  return hand.length === 2 && handValue(hand) === maxpoints;
};

var convertHandtoString = function (hand) {
  return hand.map((card) => card.name);
};

var Default = function () {
  return (
    "Player has hand " +
    convertHandtoString(playerHand) +
    " with sum" +
    getHandSum(playerHand) +
    "<br>" +
    "Compter has hand" +
    convertHandtoString(computerHand) +
    "with sum" +
    gethandSum(computerHand) +
    " ."
  );
};

var main = function (input) {
  if (gameover) {
    return "The game is over. Please refresh to play again.";
  }
  if (playerHand.length === 0) {
    dealCards(playerHand);
    dealCards(computerHand);
    dealCards(playerHand);
    dealCards(computerHand);

    if (Blackjack(computerHand)) {
      gameover = true;
      return (
        Default() +
        "<br>" +
        " Computer got Blackjack. Computer wins. Please refresh."
      );
    }

    if (Blackjack(playerHand)) {
      gameover = true;
      return Default() + "<br>" + "You got Blackjack. You won. Please refresh.";
    }

    if (!playerStand) {
      if (input !== "hit" && input !== "stand") {
        return 'Please input either "hit" or "stand".';
      }

      if (input === "hit") {
        dealCards(playerHand);
        if (handValue(playerhand) > maxpoints) {
          gameover = true;
          return (
            Default() +
            "<br>" +
            "You went over and lost. Please refresh to play again."
          );
        }
      }
      if (input === "stand") {
        playerStand = true;
      }
    }
    var computerHandsum = handvalue(computerHand);
    if (computerHandsum <= dealerHit) {
      dealCards(computerHand);
      computerHandsum = handvalue(computerHand);
      if (computerHandsum > maxpoints) {
        gameover = true;
        return (
          Default() + "<br>" + "Compter went over. You win. Please refresh."
        );
      }
    }
    if (playerstand && computerHandsum > dealerHit) {
      gameover = true;
      if (handValue(playerHand) > computerHandsum) {
        return Default() + "<br>" + "You won !!!! Refresh to play again!";
      }
      return Default() + "<br>" + "Computer wins! Refresh to pl;ay again.";
    }
    return (
      Default() +
      "<br>" +
      " You have chosen to stand " +
      playerstand +
      "<br>" +
      " If you have not chosen to stand please enter either 'hit' or 'stand'." +
      "<br>" +
      " If not press submit for computer turn."
    );
  }
};
