var mode = "start";
// var mode = "game";
var myoutputvalue = "";
var coins = "";

var PlayerHand = [];


var DealerHand = [];




var makeDeck = function () {
  var cardDeck = [];
  var suits = ['♥','♦', '♣', '♠'];

  var suitIndex = 0;
  while(suitIndex < suits.length) {
      var currentSuit = suits[suitIndex];
      
      var rankCounter = 1;
      while (rankCounter <= 13) {
          var cardName = rankCounter;
          var cardValue = rankCounter;
          
          if (cardName == 1) {
              cardName = `Ace`;
              cardValue = [1, 11];
          } else if (cardName == 11) {
              cardName = `Jack`;
              cardValue = 10;
          } else if (cardName == 12) {
              cardName = `Queen`;
              cardValue = 10;
          } else if (cardName == 13) {
              cardName = `King`;
              cardValue = 10;
          }
          
        
          var card = {
              name: cardName,
              suit: currentSuit,
              rank: rankCounter,
              value: cardValue,
          }
          cardDeck.push(card);
          rankCounter += 1;
      }
      suitIndex += 1;
  }
  
  return cardDeck;
};

var getRandomIndex = function () {
  return Math.floor(Math.random()* makeDeck().length );
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

var cardes = [
    {
    name: "Ace",
    suit: "Heart",
    rank: 1,
    value: [1 , 11],
},

{ name: "Queen",
    suit: "Heart",
    rank: 12,
    value: 10,
}

]

var cardDeck = makeDeck();

// console.table(cardDeck);

mode = "start";

var main = function(input){if (mode == "start") {

    console.log(parseInt(cardes[0].value[1]));

    var shuffleDCard = shuffleCards(cardDeck);

    counterPlayer = 0;
    counterDealer = 0;
    
    while (counterPlayer < 2) {
      var PlayerCard = shuffleDCard.pop();
      PlayerHand.push(PlayerCard);
      console.log(PlayerHand);
      counterPlayer++;
    }

    while (counterDealer < 2) {
      var DealerCard = shuffleDCard.pop();
      DealerHand.push(DealerCard);
      console.log(DealerHand);
      counterDealer++;
    }

        console.log(shuffleDCard);
      console.log(PlayerHand);
      console.log(DealerHand);
      console.log(cardDeck[0]);
      console.log(cardDeck[0].value);

    var PlayerHandOne = parseInt(`${PlayerHand[0].value}`);
      var PlayerHandTwo = parseInt(`${PlayerHand[1].value}`);
    
      var DealerHandOne = parseInt(`${DealerHand[0].value}`);
      var DealerHandTwo = parseInt(`${DealerHand[1].value}`);
    

      
    



      mode = "BetCoins";
      console.log(mode);
      myoutputvalue = `You got 10 Coins- Enter How much you want lose 🤣.`;
      var DealerHandValue = parseInt(DealerHand[0].value)+parseInt(DealerHand[1].value);
      var PlayerHandValue = parseInt(PlayerHand[0].value)+parseInt(PlayerHand[1].value);
      // if totals to 21 is Black Jack and wins or tie.
      var total = DealerHandValue;
      console.log(total);
      console.log(cardDeck);
      return myoutputvalue;
      }
    
};
