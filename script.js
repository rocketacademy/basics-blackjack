//need help to see how to display the object more nicely

//creating a card deck
var makeDeck = function () {
  var deck = [];
  var cardCounter = 1;
  while (cardCounter <= 52) {
    console.log("cardCounter:" + cardCounter);
    cardCounter = cardCounter + 1;
  }
  var suitIndex = 0;
  var suits = ["diamond", "spade", "heart", "club"];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 0;
    while (rankCounter < 13) {
      var cardName = rankCounter;
      if ((cardName = 1)) {
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
      rankCounter = rankCounter + 1;
      deck.push(card);
      console.log("rank counter:" + rankCounter);
    }
    suitIndex = suitIndex + 1;
    console.log("suits:" + currentSuit);
  }
  return deck;
};

var deck = makeDeck();

//draws a random card from the deck
var drawCard = function () {
  var randomIndex = Math.floor(Math.random() * deck.length);
  var cut = deck.splice(randomIndex, 1);
  var randomCard = cut[0];
  return randomCard;
};

//tells you the total score of the cards in the array
var calculateSum = function (cards) {
  var totalSum = 0;
  var index = 0;
  var aceValue = 11;
  if (cards.length == 2) {
    var firstCard = cards[0];
    var secondCard = cards[1];
    //if 2 ace cards only, return 21
    if (firstCard.rank == 1 && secondCard.rank == 1) {
      return 21;
    }
  } else {
    aceValue = 1;
  }
  while (index < cards.length) {
    var card = cards[index];
    var cardRank = card.rank;
    //if card = ace, use the ace value defined above
    if (cardRank == 1) {
      totalSum = totalSum + aceValue;
      //else, just compare total scores of card based on ranking
    } else {
      totalSum = totalSum + Math.min(cardRank, 10);
    }
    index = index + 1;
  }
  return totalSum;
};

//defining the different game phases
var gamePhase_starting_game = "starting game";
var gamePhase = gamePhase_starting_game;
var gamePhase_draw_first_card = "draw first card";
var gamePhase_draw_second_card = " draw second card";
var gamePhase_hit_or_stand = "hit or stand";
var gamePhase_draw_card = "draw card";
var gamePhase_stop_drawing = " stop drawing";

//defining global variables
var playerCards = [];
var computerCards = [];

var main = function (input) {
  //prompt player 1 to draw a card
  if (gamePhase == gamePhase_starting_game) {
    gamePhase = gamePhase_draw_first_card;
    return ` player, please draw a card by clicking "submit"`;
    //player 1 has drawn 1st card
  } else if (gamePhase == gamePhase_draw_first_card) {
    gamePhase = gamePhase_draw_second_card;
    var playerCard1 = drawCard();
    playerCards.push(playerCard1);
    //computer automatically draws 1st card
    var computerCard1 = drawCard();
    computerCards.push(computerCard1);
    return `Player you drew ${JSON.stringify(
      playerCards
    )}, please draw another card by clicking "submit"`;
    //player 1 to draw 2nd card
  } else if (gamePhase == gamePhase_draw_second_card) {
    gamePhase = gamePhase_hit_or_stand;
    var playerCard2 = drawCard();
    playerCards.push(playerCard2);
    //computer to automatically draw 2nd card
    var computerCard2 = drawCard();
    computerCards.push(computerCard2);
    return `Player you now have ${JSON.stringify(
      playerCards
    )}, with a total sum of ${calculateSum(
      playerCards
    )}, would you like to hit or stand?`;
    //outcome when player decides to hit or stand
  } else if (gamePhase == gamePhase_hit_or_stand) {
    //if player wants to hit, draw 1 additional card
    if (input == "hit") {
      gamePhase = gamePhase_draw_card;
      return `Please click to draw a card`;
      // if player wants to stand, stop drawing
    } else if (input == "stand") {
      gamePhase = gamePhase_stop_drawing;
      return `You stand, please click to continue`;
    }
    //If player keeps inputting "hit", keep drawing card and adding the total sum
  } else if (gamePhase == gamePhase_draw_card) {
    gamePhase = gamePhase_hit_or_stand;
    var playerNewCard = drawCard();
    playerCards.push(playerNewCard);
    console.log(gamePhase, "gamephase");
    return `Player you now have ${JSON.stringify(
      playerCards
    )}, with a total sum of ${calculateSum(
      playerCards
    )}, would you like to hit or stand?`;
  } else if (gamePhase == gamePhase_stop_drawing) {
    //If sum of computer hands<17, keep drawing a card and add to card array
    while (calculateSum(computerCards) < 17) {
      computerCards.push(drawCard());
    }
    //compute player hand
    var playerSum = calculateSum(playerCards);
    //computer computer hands
    var computerSum = calculateSum(computerCards);
    //compare the winning outcome
    var gameOutcome = "";
    if (playerSum > 21 && computerSum > 21) {
      gameOutcome = "draw";
    } else if (playerSum <= 21 && computerSum > 21) {
      gameOutcome = "win";
    } else if (playerSum > 21 && computerSum <= 21) {
      gameOutcome = "lose";
    } else if (playerSum < computerSum) {
      gameOutcome = "lose";
    } else if (computerSum < playerSum) {
      gameOutcome = "win";
    } else {
      gameOutcome = "draw";
    }
    return `Player has ${calculateSum(playerCards)}, dealer has ${calculateSum(
      computerCards
    )}, it's a ${gameOutcome}!`;
  }
};
