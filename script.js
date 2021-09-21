var cardDeck = [];
var playerCards = [];
var playerCardsValue = '';
var dealerCards = [];
var playerCardsValue ;
var gameMode = 'Initialize Game';
var gameTurn = '1stTurn';


//function to create deck
var makeDeck = function () {
  
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var counter = 1;
    while (counter <= 13) {    
      var rankCounter = counter;
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        rankCounter = 10;
        cardName = 'jack';
      } else if (cardName == 12) {
        rankCounter = 10;
        cardName = 'queen';
      } else if (cardName == 13) {
        rankCounter = 10;
        cardName = 'king';
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
       counter += 1;
    }
     suitIndex += 1;
  }
  return cardDeck;
};

//function to generate random number
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//function to shuffle cards (related to line 45)
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

//create deck of cards upon loading
cardDeck = shuffleCards(makeDeck())

var checkBlackJack = function(cardsInHand){
  if ((cardsInHand[0].name == 'ace' && cardsInHand[1].rank == '10') || (cardsInHand[1].name == 'ace' && cardsInHand[0].rank == '10')){
    return true;
  } else {
    return false;
  }
}



var main = function (input) {
  
  if (gameMode == 'Initialize Game'){
    playerCards = cardDeck.splice(0, 2);
    console.log(`playercard1 ${playerCards[0].name}`)
    console.log(`playercard2 ${playerCards[1].name}`)
    dealerCards = cardDeck.splice(0, 2);

  var playerBlackJackCheck = checkBlackJack(playerCards);
  console.log('blackjackcheck', playerBlackJackCheck)   
  
    if (playerBlackJackCheck == true )
    {
      gameMode = 'HitOrStand';
      return 'You got a BlackJack!!. You Won!';
    }
    else {
      //sum of all cards value in player hands
      playerCardsValue = playerCards.reduce(( sum, playerCards) => {
        return sum + playerCards.rank
      }, 0);
      gameMode = 'HitOrStand';
      return `You got ${playerCards[0].name} & ${playerCards[1].name} with a total value of ${playerCardsValue}. Please choose hit or stand.`;
    }
  }

  if (gameMode == 'HitOrStand'){
    if (input == 'hit')
    {    
     // add one card to playerCards
     playerCards.push(cardDeck[0]);
     cardDeck.splice(0, 1);
     console.log(playerCards)
     //sum player total value
     playerCardsValue = playerCards.reduce(( sum, playerCards) => {
      return sum + playerCards.rank
    }, 0)
     return `You got ${playerCards[0].name}, ${playerCards[1].name}, ${playerCards[2].name} with a total value of ${playerCardsValue}. Please choose hit or stand.`
     //if value does not exceed 21, return value and if player wants to continue hit or stand

    }
    // else if {
    //   //sum of all cards value in player hands
    //   playerCardsValue = playerCards.reduce(( sum, playerCards) => {
    //     return sum + playerCards.rank
    //   }, 0)

    //   return `You got ${playerCards[0].name} & ${playerCards[1].name} with a total value of ${playerCardsValue}. Please choose hit or stand.`
    } else {
      return 'Pls enter either hit or stand.'
    }
  // }

    };     
    // //use reduce to sum card value
    // if playerCards.includes('ace'){
    //   return 'Blackjack';
    // }
    // else {
    //   return 'Normal';
    
    // const sum = playerCards.rank.reduce((accumulator, currentValue) => {
    //   return accumulator + currentValue;
    // });
        
  // }
  // var myOutputValue = 'hello world';
  // return myOutputValue;





//blackjack rules: deal 2 cards to player

//if total is more than 21 loses
// if 2 cards is auto 21, player wins

// else show player cards value and if player choose to hit or stand (if hit add one card) 

//if stand, dealer draw 2 cards, dealer hit if below 17. stand if above or equal to 17.