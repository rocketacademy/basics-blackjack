var getRandomIndex = function () {
  // Get a random index ranging from 0 (inclusive) to max (exclusive).
  return Math.floor(Math.random() * 52);
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"]; // Initialise an array of the 4 suits in our deck.
  var suitIndex = 0; // Loop over the suits array
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    /* Store the current suit in a variable
​    // Loop from 1 to 13 to create all cards for a given suit.
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    This is an example of a loop without an array.*/
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      // By default, the card name is the same as rankCounter
      if (cardName == 1) {
        //If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      var card = {
        // Create a new card with the current name, suit, and rank
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      // Store and add the new card to the deck within rankcounter
      rankCounter += 1;
      // Increment rankCounter to iterate over the next rank
    }
    suitIndex += 1; // Increment the suit index to iterate over the next suit
  }
  return cardDeck; // Return the completed card deck
};

var shuffleCards = function (cardDeck) {
  let deck = makeDeck(); // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(deck.length);
    var randomCard = deck[randomIndex]; // Select the card that corresponds to randomIndex
    var currentCard = deck[currentIndex]; // Select the card that corresponds to currentIndex
    // Swap positions of randomCard and currentCard in the deck
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  return deck; // Return the shuffled deck
};

var faceValue = function (playCardGame) {
  var currentIndex = 0;
  console.log(playCardGame);
  while (currentIndex < playCardGame.length) {
    if (playCardGame[currentIndex].name == "jack") {
      playCardGame[currentIndex].rank = 10;
      console.log(playCardGame[currentIndex].rank);
    } else if (playCardGame[currentIndex].name == "queen") {
      playCardGame[currentIndex].rank = 10;
      console.log(playCardGame[currentIndex].rank);
    } else if (playCardGame[currentIndex].name == "king") {
      playCardGame[currentIndex].rank = 10;
      console.log(playCardGame[currentIndex].rank);
    }
    currentIndex += 1;
  }
  return playCardGame;
};

var addPlayerCard = function (playerCard) {
  var totalplayerCard = playerCard[0].rank + playerCard[1].rank;
  return totalplayerCard;
};

var checkBlackJack = function (totalplayerCard, totaldealerCard) {
  var message = "";
  if (totalplayerCard == 21 || totaldealerCard == 21) {
    if (totalplayerCard == 21) {
      message = `Player ${winGameMessage}`;
      gameMode = "ShuffleCard";
      blackJack = true;
    } else if (totaldealerCard == 21) {
      message = `Dealer${winGameMessage}`;
      gameMode = "ShuffleCard";
      blackJack = true;
    }
    return message;
  } else return message;
};

var gameMode = "ShuffleCard"; //initialize to initial mode
var playCardGame = {};
var winGameMessage = "BlackJack!";
var blackJack = false;

var main = function () {
  var playerOneCard = [];
  var dealerCard = [];
  var totalplayerOneCard = 0;
  var totaldealerCard = 0;
  var outPutMessage = "";

  if (gameMode === "ShuffleCard") {
    playCardGame = shuffleCards(makeDeck()); //inital stage
    playCardGame = faceValue(playCardGame); //reset Jacks/Queen/King to rank 10
    //playCardGame = faceValue(playCardGame);
    gameMode = "DealCard";
    console.log(playCardGame);

    return "Card Shuffle, Dealer ready to deal card, click submit to deal card";
  }
  if (gameMode === "DealCard") {
    playerOneCard.push(playCardGame[0]);
    playerOneCard.push(playCardGame[2]);
    console.log(playerOneCard);
    dealerCard.push(playCardGame[1]);
    dealerCard.push(playCardGame[3]);
    console.log(dealerCard);
    totalplayerOneCard = addPlayerCard(playerOneCard);
    totaldealerCard = addPlayerCard(dealerCard);
    //totalplayerOneCard = 21; // testing purpose, remove if applicable
    if (totalplayerOneCard == 21 || totaldealerCard == 21) {
      outPutMessage = checkBlackJack(totalplayerOneCard, totaldealerCard);
      console.log("CheckBlackJack Boolean working");
      //return outPutMessage;
    } //(totalplayerOneCard != 21 || totaldealerCard != 21) {
    else
      outPutMessage = `Player, your cards are <br/> Card 1: ${playerOneCard[0].suit} of ${playerOneCard[0].rank} <br/> Card 2: ${playerOneCard[1].suit} of ${playerOneCard[1].rank} <br/> Total are ${totalplayerOneCard} <br/> Enter 1 to draw or Enter 2 to Stand?`;
    gameMode = "PlayerTurn";
    return outPutMessage;
  }

  if (gameMode === "PlayerTurn") {
    console.log("PlayTurn");
  }
};
