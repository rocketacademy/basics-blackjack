gameStage = 0;
var deck = function () {
  var cardDeck = [];
  var suit = ["hearts", "diamonds", "clubs", "spade"];
  var suitCounter = 0;
  while (suitCounter < suit.length) {
    var suitDeck = suit[suitCounter];
    var numberCounter = 1;

    while (numberCounter <= 13) {
      var cardName = numberCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else {
        if (cardName == 11) {
          cardName = "Jack";
        } else {
          if (cardName == 12) {
            cardName = "Queen";
          } else {
            if (cardName == 13) {
              cardName = "King";
            }
          }
        }
      }
      var card = {
        name: cardName,
        suit: suitDeck,
        rank: numberCounter,
      };

      cardDeck.push(card);
      numberCounter = numberCounter + 1;
    }
    suitCounter += 1;
  }
  return cardDeck;
};
var cardRandom = function (size) {
  var randomCard = Math.random() * size.length;
  var cardIntegal = Math.floor(randomCard);

  return cardIntegal;
};
var cardShuffle = function () {
  var currentIndex = 0;
  var deckCard = deck();
  while (currentIndex < deckCard.length) {
    var randomIndex = cardRandom(deckCard);
    console.log(randomIndex, "randomIndex");
    var randomCard = deckCard[randomIndex];
    console.log(randomCard, "randomCard");
    var currentCard = deckCard[currentIndex];
    console.log(currentCard, "CurrentCard");
    deckCard[currentIndex] = randomCard;
    deckCard[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return deckCard;
};
var shuffleCard = cardShuffle();
var main = function (input) {
  var userDraw = shuffleCard.pop();
  var userDraw1 = shuffleCard.pop();
  var dealerDraw = shuffleCard.pop();
  var dealerDraw1 = shuffleCard.pop();

  if (userDraw.rank + userDraw1.rank > dealerDraw.rank + dealerDraw1.rank) {
    return `You win ${userDraw.name} and ${userDraw1.name} while Dealer have draw ${dealerDraw.name} and ${dealerDraw1.name}`;
  } else {
    return `You Lose ${userDraw.name} and ${userDraw1.name} while Dealer have draw ${dealerDraw.name} and ${dealerDraw1.name}`;
  }
  // if (gameStage == 0) {
  //   if (
  //     (userDraw.rank == 1 && userDraw1.rank > 10) ||
  //     (userDraw1.rank == 1 && userDraw.rank > 10)
  //   ) {
  //     return `You win ${userDraw.name} and ${userDraw1.name}`;
  //   }
  //   if (
  //     !(userDraw.rank == 1 && userDraw1.rank > 10) ||
  //     !(userDraw1.rank == 1 && userDraw.rank > 10)
  //   ) {
  //     gameStage = 1;
  //     return `Your cards are ${userDraw.name} and ${userDraw1.name} <br>Please choose to 'hit' or 'stand'`;
  //   }
  // }
  // if (gameStage == 1) {
  //   if (input == "hit" && gameStage == 1) {
  //     var userDraw3 = shuffleCard.pop();
  //   }
  // }
};
