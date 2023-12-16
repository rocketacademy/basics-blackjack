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
var cardDeck = makeDeck();

// console.table(cardDeck);

mode = "start";

var main = function(input){
  

  if (mode == "start") {
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

      mode = "BetCoins";
      console.log(mode);
      myoutputvalue = `You got 10 Coins- Enter How much you want lose 🤣.`;
      return myoutputvalue;
      }
            
    
    
    if (mode == "BetCoins") {
        inputBet = Number(input);
        if (inputBet == 1) {
            coins = coins + input;
            myoutputvalue = `You are Betting ${coins} Coin. To see Cards press <b>Submit</b>.`;
            mode = "game";
        } else if (inputBet > 1 && inputBet <= 10) {
            coins = coins + input;
            myoutputvalue = `You are Betting ${coins} Coins. To see Cards press <b>Submit</b>.`;
            mode = "game";
        } else {
            myoutputvalue =`Player can only start with 10 coins. Please input again.`;
            return myoutputvalue;
        }
        mode = "game";
        return myoutputvalue;

    }
    if (mode == "game") {
        console.log(DealerHand[0]);
        myoutputvalue = `Dealer's Hand <br>${DealerHand[0].name} ${DealerHand[0].suit} | ${DealerHand[1].name} ${DealerHand[1].suit}
                          <br> <br> Player's Hand <br>${PlayerHand[0].name} ${PlayerHand[0].suit} | ${PlayerHand[1].name} ${PlayerHand[1].suit}`;
      
      return myoutputvalue;
    }
// check the values 
// if totals to 21 is Black Jack and wins or tie.
// both Player and Dealer cards should be <=20 to continue.
// if less <= 20, Player can Hit or stand. Anything aboove 21 is Bust!! Lose!!
// if Dealer is less than 17 must Hit. Anything above 21 is Bust!! Lose!!
// final showdown, Player has to have higher cards then Dealer to win.

  };