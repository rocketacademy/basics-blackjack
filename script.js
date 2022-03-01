var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  for (suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    var currentSuit = suits[suitIndex];
    for (rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
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
    }
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

var main = function (input) {
  // remember to early return otherwise the input from the first time will be used forever!
  if (gameState == `gameStart`) {
    deck = shuffleCards(makeDeck()); // why doesn't var deck = shuffleCards(makeDeck()) work here
    console.log(deck);
    gameState = `dealerDeals`; // why doesn't var gameState = `dealerDealsFirstCard` work here
    return `Please enter number of players against dealer!<br><br>Minimum: 1, Maximum: 6`;
  }
  if (gameState == `dealerDeals`) {
    numberOfPlayers = input;
    for (counter = 1; counter <= numberOfPlayers; counter += 1) {
      player[counter] = [];
      player[counter].push(deck.pop());
      player[counter].push(deck.pop());
    }
    player[0] = [];
    player[0].push(deck.pop());
    player[0].push(deck.pop());
    gameState = `hitStandBegins`;
    var cardsOnTableStatement =
      `Dealer has :<br>
    ${player[0][0].name} of ${player[0][0].suit}<br>
    and one hidden card<br><br>` + cardsOnTable(numberOfPlayers);
    return cardsOnTableStatement;
  }
  // if (gameState == `hitStandBegins`){
  //   for (counter = 0)

  // }
  /*too troublesome to deal two cards separately
  if (gameState == `dealerDealsSecondCard`) {
    for (counter = 1; counter <= numberOfPlayers; counter += 1) {
      player[counter].push(deck.pop());
    }
    player[0].push(deck.pop());
    gameState = `trueGameStart`;
    return `Dealer has dealt second card to all`;
  }
  */
  var myOutputValue = "hello world";
  return myOutputValue;
};
var gameState = `gameStart`;
var player = [`dealer`]; // dealer is 0
var numberOfPlayers = ""; // against dealer
var cardsOnTable = function (numberOfPlayers) {
  var statement = "";
  // var innerstatement = [];
  for (counter = 1; counter <= numberOfPlayers; counter += 1) {
    statement = statement + `Player ${counter} has:<br>`;
    for (
      innercounter = 0;
      innercounter < player[counter].length;
      innercounter += 1
    ) {
      statement =
        statement +
        `${player[counter][innercounter].name} of ${player[counter][innercounter].suit}<br>`;
    }

    statement = statement + `<br>`;
  }
  return statement;

  // var innerstatement[counter-1] = `Player ${counter} has:<br>`;
  // for (
  //   innercounter = 0;
  //   innercounter < player[counter].length;
  //   innercounter += 1
  // ) {
  //   var innerstatement[counter-1] =
  //     innerstatement[counter-1] +
  //     `${player[counter][innercounter].name} of ${player[counter][innercounter].suit}<br>`;
  // }
};
