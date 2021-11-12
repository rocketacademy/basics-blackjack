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


var dealerHand =[];
var playerHand =[];

var checkForBlackJack = function (handArray){
  var playerCard1 = handArray[0];
  var playerCard2 = handArray[1];
  var hasBlackJack = false;
  if (playerCard1.point + playerCard2.point >=21){
        hasBlackJack = true;
      }
      return hasBlackJack;
}

var main = function (input) {
  var playerPoints = 0;
  var dealerPoints = 0;
  var winningPoints = 21;
  var gameMode = 'start';
  var myOutputValue ='';

//first click 'submit'
  if (gameMode == 'start'){
    cardDeck = createNewDeck();
    console.log(cardDeck);

    playerHand.push(cardDeck.pop());
    playerHand.push(cardDeck.pop());
    dealerHand.push(cardDeck.pop());
    dealerHand.push(cardDeck.pop());

    console.log(`player hand:`);
    console.log(playerHand);
    console.log(`dealer hand:`);
    console.log(dealerHand);

    //computing the points of the initial 2 cards
    playerPoints = Number(playerHand[0].point) + Number(playerHand[1].point);
    dealerPoints = Number(dealerHand[0].point) + Number(dealerHand[1].point);

    console.log (`player point ${playerPoints}`)
    console.log (`dealer point ${dealerPoints}`)

    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    console.log (`Does player has blackjack? `, playerHasBlackJack);
    console.log (`Does dealer has blackjack? `, dealerHasBlackJack);

    if (playerHasBlackJack == true && dealerHasBlackJack == true){
      myOutputValue = `It is a draw! <br>
                      Both player and dealer has got BLACKJACK!<br>
                      Click "Submit" to play again!`
    }
    if (playerHasBlackJack == true && dealerHasBlackJack == false){
      myOutputValue = `The player has got blackjack! <br><br>
                      Player won the game!`
    }
    if (playerHasBlackJack == false && dealerHasBlackJack == true){
      myOutputValue = `The dealer has got blackjack! <br><br>
                      Dealer won the game!`
    }
    if (playerHasBlackJack == false && dealerHasBlackJack == false){
      var playerCardMsg = `${playerHand[0].name} of ${playerHand[0].suit}<br>
                          ${playerHand[1].name} of ${playerHand[1].suit}<br>`;
      //display player hand and ask for next move (hit / stand)
      myOutputValue = `Player had <br>${playerCardMsg}
                      Player has total points of ${playerPoints}<br><br>
                      Please submit "hit" to draw another card or "stand" to end turn.`                   ;
      gameMode = 'player move';
    }
  }
  console.log (`game mode: ${gameMode}`)
    
  if (gameMode == 'player move' && !input){
    myOutputValue = `Player had <br>${playerCardMsg}
                    Player has total points of ${playerPoints}<br><br>
                    Please submit "hit" to draw another card or "stand" to end turn.` 
  }

  if (gameMode == 'player move' && input == 'hit'){//player decided to draw card

    playerHand.push(cardDeck.pop());
    playerCardMsg += `${playerHand[playerHand.length-1].name} of ${playerHand[playerHand.length-1].suit}<br>`;
    playerPoints += Number(playerHand[playerHand.length-1].point)

    if (playerPoints <= winningPoints){
      myOutputValue = `Player had <br>${playerCardMsg}
                      Player has total points of ${playerPoints}<br><br>
                      Please submit "hit" to draw another card or "stand" to end turn.` 
    }

    if (playerPoints > winningPoints){
      myOutputValue = `Player had busted with<br>${playerCardMsg},
                      total points of ${playerPoints}<br><br>
                      Dealer has won the game!`
      gameMode = 'start';
      playerHand =[];
      dealerHand =[];
    }
  }    


  if (gameMode == 'player move' && input == 'stand'){ //player dont want to draw card, computer turn to make move
      var dealerCardCounter = 2;
      var dealerCardMsg =`${dealerHand[0].name} of ${dealerHand[0].suit}<br>
                            ${dealerHand[1].name} of ${dealerHand[1].suit}<br>`;
      while (dealerPoints < 17){ //computer draw card if the points is lesser than 17
        dealerHand.push(cardDeck.pop());
        dealerCardMsg += `${dealerHand[dealerCardCounter].name} of ${dealerHand[dealerCardCounter].suit}<br>`;
        dealerPoints += Number(dealerHand[dealerCardCounter].point)
        dealerCardCounter += 1;
      }
      console.log(`dealer hand :<br> ${dealerCardMsg}`)
      gameMode = 'compare points';
      //compare points and show results
      if (gameMode == 'compare points' && dealerPoints > winningPoints){
        myOutputValue = `Player had won the game with<br>${playerCardMsg},
                        total points of ${playerPoints}<br><br>
                        Dealer had busted with<br>${dealerCardMsg},
                        total points of ${dealerPoints}`
        gameMode = 'start';
        playerHand =[];
        dealerHand =[];
      }

      if (gameMode == 'compare points' && dealerPoints < playerPoints){
        myOutputValue = `Player had won the game with<br>${playerCardMsg},
                        total points of ${playerPoints}<br><br>
                        Dealer lose with<br>${dealerCardMsg},
                        total points of ${dealerPoints}`
        gameMode = 'start';
        playerHand =[];
        dealerHand =[];
      }
    }

              

  return myOutputValue;
};