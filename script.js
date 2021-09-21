var cardDeck = [];
var playerCards = [];
var playerCardsValue = '';
var dealerCards = [];
var dealerCardsValue = '';
var gameMode = 'Initialize Game';
var playerBlackJackCheck = '';
var dealerBlackJackCheck = '';


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

var outputOfCards = function(cardsInHand){
var cards = '';
var handIndex = 0;
while (handIndex < cardsInHand.length){
  cards = cards + ' , ' + cardsInHand[handIndex].name +  ' of ' + cardsInHand[handIndex].suit;
  handIndex += 1;
}

  return cards;
};

var cardComparison = function(){
  if (dealerCardsValue > 21){
    return `You got ${outputOfCards(playerCards)} with a total value of ${playerCardsValue}. <br> Dealer busted with ${outputOfCards(dealerCards)} and a total value of ${dealerCardsValue}  <br> You Won!`
  }  
  else if (playerCardsValue > dealerCardsValue){
    return `You got ${outputOfCards(playerCards)} with a total value of ${playerCardsValue}. <br> Dealer got ${outputOfCards(dealerCards)} with a total value of ${dealerCardsValue}  <br> You Won!`
  }
  else if (playerCardsValue < dealerCardsValue){
    return `You got ${outputOfCards(playerCards)} with a total value of ${playerCardsValue}. <br> Dealer got ${outputOfCards(dealerCards)} with a total value of ${dealerCardsValue}  <br> Dealer Won =(`
  }
  else {
    return `You got ${outputOfCards(playerCards)} with a total value of ${playerCardsValue}. <br> Dealer got ${outputOfCards(dealerCards)} with a total value of ${dealerCardsValue}  <br> It's a tie!`
  }
};

var main = function (input) {
  
  if (gameMode == 'Initialize Game'){
    //deal 2 cards to player and dealer
    playerCards = cardDeck.splice(0, 2);
    console.log(`playercard1 ${playerCards[0].name}`)
    console.log(`playercard2 ${playerCards[1].name}`)
    dealerCards = cardDeck.splice(0, 2);
    
    //sum of all cards value in player & dealer hands
    playerCardsValue = playerCards.reduce(( sum, playerCards) => {
      return sum + playerCards.rank
    }, 0);
    dealerCardsValue = dealerCards.reduce(( sum, dealerCards) => {
      return sum + dealerCards.rank
    }, 0);

    //check if any hands obtain blackjack
    playerBlackJackCheck = checkBlackJack(playerCards);
    dealerBlackJackCheck = checkBlackJack(dealerCards);
    console.log('playerblackjackcheck', playerBlackJackCheck)
    console.log('dealerblackjackcheck', dealerBlackJackCheck)    
  
    if (playerBlackJackCheck == true && dealerBlackJackCheck != true) {
      gameMode = 'Initialize Game'
      return `You got ${outputOfCards(playerCards)}. <br> A BlackJack!!. You Won!`;
    }
    else if (playerBlackJackCheck == true && dealerBlackJackCheck == true) {
      gameMode = 'Initialize Game';
      return `You got ${outputOfCards(playerCards)}. <br> Dealer got ${outputOfCards(dealerCards)}. <br> It's a tie with both blackjack!!`;
    }
    else {
      gameMode = 'HitOrStand';
      return `You got ${outputOfCards(playerCards)} with a total value of ${playerCardsValue}. <br> Dealer one-sided card value = ${dealerCards[0].name} <br> Please choose hit or stand.`;
    }
  }

  if (gameMode == 'HitOrStand'){
    if (input == 'hit'){    
     // add one card to playerCards
     playerCards.push(cardDeck[0]);
     cardDeck.splice(0, 1);
     console.log(playerCards)
     //sum player total value
     playerCardsValue = playerCards.reduce(( sum, playerCards) => {
      return sum + playerCards.rank
    }, 0)

      //if value does not exceed 21, return value and if player wants to continue hit or stand
      if(playerCardsValue <= 21){
      return `You got ${outputOfCards(playerCards)} with a total value of ${playerCardsValue}. <br> Dealer one-sided card value = ${dealerCards[0].name}  <br>  Please choose hit or stand.`
      } else{
        gameMode = 'Initialize Game'
        return `You have busted with ${outputOfCards(playerCards)} with a total value of ${playerCardsValue}. <br> Dealer has won!`
      }
    }

    else if (input == 'stand'){          
      // while dealer total value < 17 then add one card to dealer (loop) and update dealer cards value
      while (dealerCardsValue < 17){
        
        dealerCards.push(cardDeck[0]);
        cardDeck.splice(0, 1);

       
        dealerCardsValue = dealerCards.reduce(( sum, dealerCards) => {
          return sum + dealerCards.rank
        }, 0);
      }
      
      var finalResults = cardComparison();
      console.log('final print out', finalResults)
      gameMode = 'Initialize Game'
      return finalResults
      }

      else{      
      return `Pls enter either hit or stand.<br>You got ${outputOfCards(playerCards)} with a total value of ${playerCardsValue}. <br> Dealer one-sided card value = ${dealerCards[0].name}`
      } 
    }

};      