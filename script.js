var createDeck =function (){
  var cardDeck =[];
  var suits =['Spades ♠️', 'Hearts ♥️', 'Clubs ♣️', 'Diamonds ♦️'];
  var suitIndex = 0;
  while (suitIndex < suits.length){
    var currentSuit = suits[suitIndex];
    var rankIndex = 1;
    while (rankIndex <= 13){
      var cardName = rankIndex;
      var point = rankIndex;
      if (cardName == 1){
        cardName = 'Ace';
        point = 11;
      }
      if (cardName == 11){
        cardName = 'Jack';
        point = 10;
      }
      if (cardName == 12){
        cardName = 'Queen';
        point = 10;
      }
      if (cardName == 13){
        cardName = 'King';
        point = 10;
      }
      var card ={
        name : cardName,
        suit : currentSuit,
        rank : rankIndex,
        point : point
      };
      cardDeck.push(card);
      rankIndex += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
}

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
    currentIndex += 1;
  }
  return cardDeck;
};

var createNewDeck = function(){
  var newDeck = createDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
}

var checkForBlackJack = function (handArray){
  var playerCard1 = handArray[0];
  var playerCard2 = handArray[1];
  var hasBlackJack = false;
  if (playerCard1.point + playerCard2.point >=21){
        hasBlackJack = true;
      }
      return hasBlackJack;
}

var playerHand = [];
var dealerHand = [];
var gameMode = 'start';
var playerPoints = 0;
var dealerPoints = 0;
var playerCardMsg = '';
var dealerCardMsg = '';

var main = function (input) {
  var winningPoints = 21;
  var myOutputValue ='';

  if (gameMode == 'end game'){
    myOutputValue = `The game is over. Please refresh to play again.`
  }

//first click 'submit'
  if (gameMode == 'start'){
    cardDeck = createNewDeck();
    console.log(cardDeck);

    playerHand.push(cardDeck.pop());
    playerHand.push(cardDeck.pop());
    dealerHand.push(cardDeck.pop());
    dealerHand.push(cardDeck.pop());

    //computing the points of the initial 2 cards
    playerPoints = Number(playerHand[0].point) + Number(playerHand[1].point);
    dealerPoints = Number(dealerHand[0].point) + Number(dealerHand[1].point);

    console.log(`player hand:`);
    console.log(playerHand);
    console.log(`dealer hand:`);
    console.log(dealerHand);
    console.log(cardDeck);
    console.log (`player point ${playerPoints}`)
    console.log (`dealer point ${dealerPoints}`)

    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    console.log (`Does player has blackjack? `, playerHasBlackJack);
    console.log (`Does dealer has blackjack? `, dealerHasBlackJack);

    if (playerHasBlackJack == true && dealerHasBlackJack == true){
      myOutputValue = `It is a draw! <br>
                      Both player and dealer has got BLACKJACK!<br>
                      The game is over. Please refresh to play again.`
    }
    if (playerHasBlackJack == true && dealerHasBlackJack == false){
      myOutputValue = `The player has got BLACKJACK! <br>
                      Player won the game!<br><br>
                      The game is over. Please refresh to play again.`
      playerHand = [];
      dealerHand = [];
      gameMode = 'end game';
      playerPoints = 0;
      dealerPoints = 0;
    }
    if (playerHasBlackJack == false && dealerHasBlackJack == true){
      myOutputValue =  `The dealer has got BLACKJACK! <br>
                       Dealer won the game!<br><br>
                       The game is over. Please refresh to play again.`
      playerHand = [];
      dealerHand = [];
      gameMode = 'end game';
      playerPoints = 0;
      dealerPoints = 0;
    }
    if (playerHasBlackJack == false && dealerHasBlackJack == false){
      var playerCardMsg =`${playerHand[0].name} of ${playerHand[0].suit}<br>
                          ${playerHand[1].name} of ${playerHand[1].suit}<br>`;
      //display player hand and ask for next move (hit / stand)
      myOutputValue = `Player had <br>${playerCardMsg}
                      Player has total points of ${playerPoints}<br><br>
                      Please submit "hit" to draw another card or "stand" to end turn.`                   ;
      gameMode = 'player move';
    }
  }
    
  if (gameMode == 'player move'){ //required player's input
    if (!input || (input!= 'hit' && input != 'stand')){
    myOutputValue = `Player had <br>${playerCardMsg}
                    Player has total points of ${playerPoints}<br><br>
                    Please submit "hit" to draw another card or "stand" to end turn.` 
    }

    if (input == 'hit'){//player decided to draw card
    var playerMsgIndex = 0;
    var playerCardMsg ='';
    var playerPoints = 0;
    var playerCardCount = 0;
    playerHand.push(cardDeck.pop());
    while (playerMsgIndex < playerHand.length){ 
      playerCardMsg = playerCardMsg + `${playerHand[playerMsgIndex].name} of ${playerHand[playerMsgIndex].suit}<br>`;
      playerPoints += Number(playerHand[playerMsgIndex].point)
      playerMsgIndex += 1;
    }
    while (playerCardCount<playerHand.length){
      if (playerHand[playerCardCount].name == 'Ace'){
        playerHand[playerCardCount].point = Number(1);
      }
      playerCardCount += 1;
    }
      if (playerPoints <= winningPoints){
        myOutputValue = `Player had <br>${playerCardMsg}
                        Player has total points of ${playerPoints}<br><br>
                        Please submit "hit" to draw another card or "stand" to end turn.` 
      }

      else if (playerPoints > winningPoints){
        myOutputValue = `Player had busted with<br>${playerCardMsg}
                        total points of ${playerPoints}<br><br>
                        Dealer has won the game!`
        
        console.log(`player hand:`);
        console.log(playerHand);
        console.log(`dealer hand:`);
        console.log(dealerHand);
        console.log (`player point ${playerPoints}`)
        console.log (`dealer point ${dealerPoints}`)

        playerHand = [];
        dealerHand = [];
        gameMode = 'end game';
        playerPoints = 0;
        dealerPoints = 0;
      }
      console.log(cardDeck);
    }    

    if (input == 'stand'){ //player dont want to draw card, computer turn to make move
        var dealerCardCount = 0;
        var dealerCardCounter = 2;
        var dealerCardMsg =`${dealerHand[0].name} of ${dealerHand[0].suit}<br>
                            ${dealerHand[1].name} of ${dealerHand[1].suit}<br>`;
        var playerMsgIndex = 0;
        var playerCardMsg ='';
        var playerPoints = 0;
                          
        while (playerMsgIndex < playerHand.length){ 
        playerCardMsg = playerCardMsg + `${playerHand[playerMsgIndex].name} of ${playerHand[playerMsgIndex].suit}<br>`;
        playerPoints += Number(playerHand[playerMsgIndex].point)
        playerMsgIndex += 1;
        }
      
        while (dealerPoints < 17){ //computer keeps drawing card if the points is lesser than 17
        dealerHand.push(cardDeck.pop());
        dealerCardMsg = dealerCardMsg + `${dealerHand[dealerCardCounter].name} of ${dealerHand[dealerCardCounter].suit}<br>`;
        dealerPoints += Number(dealerHand[dealerCardCounter].point)
        dealerCardCounter += 1;
      }
      while (dealerCardCount<dealerHand.length){
        if (dealerHand[dealerCardCount].name == 'Ace'){
          dealerHand[dealerCardCount].point = Number(1);
        }
        dealerCardCount += 1;
      }
    
        
      //compare points and show results
      if (dealerPoints > winningPoints){
        myOutputValue = `Player had won the game with<br>${playerCardMsg}
                        total points of ${playerPoints}<br><br>
                        Dealer had busted with<br>${dealerCardMsg}
                        total points of ${dealerPoints}`

        console.log(`player hand:`);
        console.log(playerHand);
        console.log(`dealer hand:`);
        console.log(dealerHand);
        console.log (`player point ${playerPoints}`)
        console.log (`dealer point ${dealerPoints}`)

        playerHand = [];
        dealerHand = [];
        gameMode = 'end game';
        playerPoints = 0;
        dealerPoints = 0;
      }

      else if (dealerPoints < playerPoints){
      myOutputValue = `Player had won the game with<br>${playerCardMsg}
                      total points of ${playerPoints}<br><br>
                      Dealer lose with<br>${dealerCardMsg}
                      total points of ${dealerPoints}`

        console.log(`player hand:`);
        console.log(playerHand);
        console.log(`dealer hand:`);
        console.log(dealerHand);
        console.log (`player point ${playerPoints}`)
        console.log (`dealer point ${dealerPoints}`)

        playerHand = [];
        dealerHand = [];
        gameMode = 'end game';
        playerPoints = 0;
        dealerPoints = 0;
      }
     
      else if (dealerPoints >= playerPoints){
      myOutputValue = `Dealer had won the game with<br>${dealerCardMsg}
                      total points of ${dealerPoints}<br><br>
                      Player lose with<br>${playerCardMsg}
                      total points of ${playerPoints}`

        console.log(`player hand:`);
        console.log(playerHand);
        console.log(`dealer hand:`);
        console.log(dealerHand);
        console.log (`player point ${playerPoints}`)
        console.log (`dealer point ${dealerPoints}`)

        playerHand = [];
        dealerHand = [];
        gameMode = 'end game';
        playerPoints = 0;
        dealerPoints = 0;
      }
      console.log(cardDeck);
  }
  }
    
    console.log (`game mode: ${gameMode}`)

  return myOutputValue;
};