var drawCards = "GAMEMODE drawCards";
var hitOrStand = "GAMEMODE hitOrStand";
var gameMode = drawCards;
var deck;
var shuffledDeck;
var playerCards = [];
var compCards = [];

var makeDeck = function () {
  //empty deck array
  var cardDeck = [];
  //initialise array with 4 suits
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  //loop over suits array
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    //store current suit in variable
    var currentSuit = suits[suitIndex];

    //loop from 1 to 13 to create all cards for a given suit
    for (var counter = 1; counter <= 13; counter++) {
      //default card name is same as its rank
      var rankCounter = counter;
      var cardName = rankCounter;

      //if rank is 1, 11, 12, 13
      if (cardName == 1) {
        cardName = "ace of";
      } else if (cardName == 11) {
        rankCounter = 10;
        cardName = "jack of";
      } else if (cardName == 12) {
        rankCounter = 10;
        cardName = "queen of";
      } else if (cardName == 13) {
        rankCounter = 10;
        cardName = "king of";
      }

      //create a new card with name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      //push card into deck
      cardDeck.push(card);
    }
  }
  //return completed card deck
  return cardDeck;
};

var getRandomIndex = function (cardsNum) {
  return Math.floor(Math.random() * cardsNum);
};

var shuffleCards = function (cardDeck) {
  //loop over the card deck array once
  for (var currentIndex = 0; currentIndex < cardDeck.length; currentIndex++) {
    //select random index 0-51
    var randomIndex = getRandomIndex(cardDeck.length);
    //select random card according to chosen index
    var randomCard = cardDeck[randomIndex];
    //select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    //swap positions of both cards
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  //return shuffled deck
  return cardDeck;
};

var draw2Cards = function (shuffledDeck) {
  var card1 = shuffledDeck.pop();
  var card2 = shuffledDeck.pop();
  var array = [];
  array.push(card1, card2);
  return array;
};

var listOfCards = function (cards) {
  var cardsList = "";
  for (var cardsCounter = 0; cardsCounter < cards.length; cardsCounter++) {
    cardsList +=
      cards[cardsCounter].name + " " + cards[cardsCounter].suit + "<br>";
  }
  return cardsList;
};

var sumCounter = function (cards) {
  var sum = 0;
  var aceNum = 0;
  for (var counter = 0; counter < cards.length; counter++) {
    var currentCard = cards[counter];
    if (currentCard.rank == 1) {
      aceNum += 1;
      sum += 1;
    }
    sum += currentCard.rank;
  }

  if (sum > 21 && aceNum > 0) {
    for (var aceCounter = 0; aceCounter < aceNum; aceCounter++) {
      sum -= 10;
      if (sum <= 21) {
        break;
      }
    }
  }
  return sum;
};

var main = function (input) {
  if (gameMode == drawCards) {
    deck = makeDeck();
    shuffledDeck = shuffleCards(deck);
    playerCards = draw2Cards(shuffledDeck);
    compCards = draw2Cards(shuffledDeck);
    gameMode = hitOrStand;
    return `your cards are: <br><br> ${listOfCards(
      playerCards
    )} <br><br> Enter 'hit' or 'stand'!`;
  }

  if (gameMode == hitOrStand) {
    if (input != "hit" && input != "stand") {
      return `Please ONLY input 'hit' or 'stand'!😡`;
    }
    if (input == "hit") {
      cardExtra = shuffledDeck.pop();
      playerCards.push(cardExtra);
    }
  }
};
