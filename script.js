//global variable: To store playing card deck
var cardDeck = [];

//global variable: To store player & dealer cards in array and value
var playerCards = [];
var playerCardsValue = '';
var dealerCards = [];
var dealerCardsValue = '';

//global variable: Game mode to dictate code and message
var gameMode = 'Initialize Game';
var myOutputValue;

//global variable: To check if blackjack criteria holds true
var playerBlackJackCheck = '';
var dealerBlackJackCheck = '';

//global variable: For Ace value conversion
var playerAceCardsValue;
var playerAceCounter = 0;
var dealerAceCardsValue;
var dealerAceCounter = 0;
var playerAceInHand = false;
var dealerAceInHand = false;

//function to create deck
var makeDeck = function () {
  
  var suits = ['♥️', '♦️', '♣️', '♣️'];
  var emojiNames = {
    1:'🅰️',
    2:'2️⃣',
    3:'3️⃣',
    4:'4️⃣',
    5:'5️⃣',
    6:'6️⃣',
    7:'7️⃣',
    8:'8️⃣',
    9:'9️⃣',
    10:'🔟',
    11:'🕺🏽',
    12:'👸🏽',
    13:'🤴🏽',
  };

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
      
      var emojiName = emojiNames[counter];
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emojiName: emojiName,
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

//function to shuffle cards (linked to getRandomIndex)
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

//function to return true if Blackjack occurs in first round
var checkBlackJack = function(cardsInHand){
  if ((cardsInHand[0].name == 'ace' && cardsInHand[1].rank == '10') || (cardsInHand[1].name == 'ace' && cardsInHand[0].rank == '10')){
    return true;
  } else {
    return false;
  }
}

//function provide output message if blackjack or proceed to ask player if hit or stand
var runFunctionBasedOnBlackJackOutcome = function(playerBlackJackCheck, dealerBlackJackCheck){
  if (playerBlackJackCheck == true && dealerBlackJackCheck != true) {
    gameMode = 'Initialize Game'
    return myOutputValue = `You got ${outputOfCards(playerCards)}. <br> A BlackJack!! You Won! <br>\<img src="https://c.tenor.com/EuASQmkMttsAAAAC/chow-yun-fat-laughing.gif"\>`;
  }
  else if (playerBlackJackCheck == true && dealerBlackJackCheck == true) {
    gameMode = 'Initialize Game';
    return myOutputValue = `You got ${outputOfCards(playerCards)}. <br> Dealer got ${outputOfCards(dealerCards)}. <br> It's a tie with both blackjack!! <br>\<img src="https://c.tenor.com/1B3KuSRuHRsAAAAM/embarrassing-fail.gif"\>`;
  }
  else {
    gameMode = 'HitOrStand';
    if (playerAceInHand == true){
    return myOutputValue = `You got ${outputOfCards(playerCards)} with a total value of ${playerCardsValue} or ${playerAceCardsValue}. <br> Dealer one-sided card value = ${dealerCards[0].name} <br> Please choose hit or stand.`}
    else {
      return myOutputValue = `You got ${outputOfCards(playerCards)} with a total value of ${playerCardsValue}. <br> Dealer one-sided card value = ${dealerCards[0].name} <br> Please choose hit or stand.`
    }
  }
}

//function to return output of cards
var outputOfCards = function(cardsInHand){
var cards = '';
var handIndex = 0;
while (handIndex < cardsInHand.length){
  cards = cards + ' , ' + cardsInHand[handIndex].emojiName +  ' of ' + cardsInHand[handIndex].suit;
  handIndex += 1;
}

  return cards;
};

//function to compare player vs dealer cards winner
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

//check for number of ace in player hands
var checkForPlayerAce = function(cardArray) {
  var i = 0;
  while(i < cardArray.length){
    if(cardArray[i].name == 'ace'){
      playerAceCounter += 1;
    }
    i++      
  }
};

//check for number of ace in dealer hands
var checkForDealerAce = function(cardArray) {
  var i = 0;
  while(i < cardArray.length){
    if(cardArray[i].name == 'ace'){
      dealerAceCounter += 1;
    }
    i++      
  }
};

//function to calculate alternative ace total value of player hands
var calculatePlayerAceValue = function(){
  if(playerAceCounter > 0){
  i = playerAceCounter;
  j = playerAceCounter;
  playerAceCardsValue = playerCardsValue;
  playerAceCardsValue -= i;    
    while(j > 0 && playerAceCardsValue <= 21){
      playerAceCardsValue += 11;
      j --;
      while(j > 0 && playerAceCardsValue <= 21){
        playerAceCardsValue += 1;
        j --;        
      }
    }
  }
};

//function to calculate alternative ace total value of dealer hands
var calculateDealerAceValue = function(){
  if(dealerAceCounter > 0){
  i = dealerAceCounter;
  j = dealerAceCounter
  dealerAceCardsValue = dealerCardsValue;
  dealerAceCardsValue -= i;    
    while(j > 0 && dealerAceCardsValue <= 21){
      dealerAceCardsValue += 11;
      j --;
      while(j > 0 && dealerAceCardsValue <= 21){
        dealerAceCardsValue += 1;
        j --;        
      }
    }
  }
};

//helper function for input validation check and corresponding message
var inputValidation = function(input){
  if (input != 'hit' && input != 'stand'){
  return myOutputValue = `Invalid input. Pls enter either hit or stand.<br>You got ${outputOfCards(playerCards)}. <br> Dealer one-sided card value = ${dealerCards[0].name}`
  }
}

//helper function for hit conditions and messages
var runFunctionBasedOnHit = function(){
  if(playerAceInHand == true && playerAceCardsValue <= 21 && playerCardsValue <= 21){
    return myOutputValue = `You got ${outputOfCards(playerCards)} with a total value of ${playerCardsValue} or ${playerAceCardsValue}. <br> Dealer one-sided card value = ${dealerCards[0].name}  <br>  Please choose hit or stand.`
  }
    //if value does not exceed 21, return value and if player wants to continue hit or stand
   else if((playerAceInHand != true && playerCardsValue <= 21) || (playerAceInHand == true && (playerAceCardsValue <= 21 || playerCardsValue <= 21))){
    return myOutputValue = `You got ${outputOfCards(playerCards)} with a total value of ${playerCardsValue}. <br> Dealer one-sided card value = ${dealerCards[0].name}  <br>  Please choose hit or stand.`
    } else{
      gameMode = 'Initialize Game'
      return myOutputValue = `You have busted with ${outputOfCards(playerCards)} with a total value of ${playerCardsValue}. <br> Dealer has won!`
    }
}

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
    
    //check if any ace on hands for both player and dealer
    checkForPlayerAce(playerCards);
    checkForDealerAce(dealerCards);

    //if ace in hands, generate another set of total value numbers for player / dealer.
    if(playerAceCounter > 0){
    playerAceInHand = true;
    calculatePlayerAceValue();    
    }

    if(dealerAceCounter > 0){
      dealerAceInHand = true;
      calculateDealerAceValue();    
      }

    //check if any hands obtain blackjack
    playerBlackJackCheck = checkBlackJack(playerCards);
    dealerBlackJackCheck = checkBlackJack(dealerCards);
    console.log('playerblackjackcheck', playerBlackJackCheck)
    console.log('dealerblackjackcheck', dealerBlackJackCheck)    
    
    //if any hands has blackjack, games end. Otherwise player to choose hit or stand
    runFunctionBasedOnBlackJackOutcome(playerBlackJackCheck, dealerBlackJackCheck);

    return myOutputValue;  
  }
  
  //player decision to hit or stand based on initial cards
  if (gameMode == 'HitOrStand'){    
  //input validation to ensure either hit or stand
    if (inputValidation(input)){
      return myOutputValue;  
    } 
    //condition if player decide to hit
    if (input == 'hit'){    
     // add one card to playerCards
     playerCards.push(cardDeck[0]);
     cardDeck.splice(0, 1);
     console.log(playerCards)
     //sum player total value
     playerCardsValue = playerCards.reduce(( sum, playerCards) => {
      return sum + playerCards.rank
    }, 0)
    
    //check if any ace on hands for player
    checkForPlayerAce(playerCards);

    //if ace in hands, generate another set of total value numbers for player
    if(playerAceCounter > 0){
    playerAceInHand = true;
    calculatePlayerAceValue();    
    }
    //run function based on hit criteria
    runFunctionBasedOnHit();
    return myOutputValue;    
    }
    //condition if player decide to stand
    else if (input == 'stand'){      
      //use highest value of player ace hand.
      if(playerAceInHand == true && playerAceCardsValue <= 21 && playerCardsValue < playerAceCardsValue){
        playerCardsValue = playerAceCardsValue;
      }

      //if dealer has blackjack, game ends.
      if(dealerBlackJackCheck == true) {
        gameMode = 'Initialize Game'
        return `You got ${outputOfCards(playerCards)} with a total value of ${playerCardsValue}. <br> Dealer has cards ${outputOfCards(dealerCards)} <br> Dealer has won with a blackjack!<br>\<img src="https://thumbs.gfycat.com/UnacceptablePowerlessDoctorfish-max-1mb.gif"\>`      
        
      // while dealer total value < 17 then add one card to dealer (loop) and sum dealer cards value
      } else{
      while (dealerCardsValue < 17){
        
        dealerCards.push(cardDeck[0]);
        cardDeck.splice(0, 1);
       
        dealerCardsValue = dealerCards.reduce(( sum, dealerCards) => {
          return sum + dealerCards.rank
        }, 0);
        
        //check if any ace on hands for dealer
        checkForDealerAce(dealerCards);

        //if ace in hands, generate another set of total value numbers for dealer and use the higher number
          if(dealerAceCounter > 0){
          dealerAceInHand = true;
          calculateDealerAceValue(); 
          
            if (dealerAceCardsValue <= 21 && dealerAceCardsValue > dealerCardsValue){
              dealerCardsValue = dealerAceCardsValue
            }
          } 
      }

      //if dealer does not bust, run card comparison between player and dealer and declare winner
        var finalResults = cardComparison();
        console.log('final print out', finalResults)
        gameMode = 'Initialize Game'
        return finalResults
      } 
    }
  }

}; 