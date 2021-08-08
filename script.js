
  var playerName = '';
  var playerPoints = 100;
  var currentBet = '';

var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;
  var playerName = '';
  var playerPoints = 100;
  var currentBet = '';

  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the card to the deck
      deck.push(card);

      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return deck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);

    var currentItem = cards[index];

    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;

    index = index + 1;
  }

  return cards;
};

var deck = shuffleCards(makeDeck());

var playerHand = []; 
var computerHand = []; 

var gameMode = 'start';

//dealcard
var dealCard = function (hand){
  hand.push(deck.pop());
}

//calculate score
var getHandScore = function(hand){
    var sum = 0;
    var i = 0;
    var numberOfAces = 0;
    while(i <hand.length){
      var currentCard = hand[i];

      //if player has an Ace 
      if (currentCard.rank == 1){
              sum += 11;
              i +=1;
              numberOfAces += 1; 
      }
      //if player has 2-10
      else if (currentCard.rank >=2 && currentCard.rank <=10){
        sum += currentCard.rank;
        i +=1;
      }
      //if player has Jack or Queen or King
      else if (currentCard.rank >=11 && currentCard.rank <=13){
        sum += 10; 
        i +=1;
      }
      if (numberOfAces >= 1 && sum >21){
        sum -= 10; 
      }
    }

    return sum;
};


//deck is shuffled


//user clicks submit to deal cards

var main = function (input) {

  if (gameMode == 'start'){
    gameMode = 'getPlayerName';
    return `Input your name.`;
  }

  if (gameMode == 'getPlayerName'){
    playerName = input;
    gameMode = 'bet';
    return `Hello ${playerName}, welcome to the game! You have ${playerPoints} now. Please input how much you want to bet`;
  }

  if (gameMode == 'bet'){

    if (input < playerPoints && input >= 1){
      currentBet = input; 
      gameMode = 'dealFirstCard';
      return `${playerName}, you bet ${currentBet}. Press submit to deal your cards.`
    }  
    
    return `You only have ${playerPoints}. Please bet a smaller amount.` 
  }


  if (gameMode == 'dealFirstCard' && playerHand.length == 0){
    dealCard(playerHand);
    dealCard(computerHand);
    
    console.log(playerHand);
    console.log(computerHand);
  
    gameMode = 'dealSecondCard';
    return `${playerName} drew  ${playerHand[0].name} ${playerHand[0].suit} <br><br>Computer drew  ${computerHand[0].name} ${computerHand[0].suit} <br><br> Press Submit to draw the 2nd card.` ;
  }

  if (gameMode == 'dealSecondCard' && playerHand.length == 1){
    dealCard(playerHand);
    dealCard(computerHand);
    
    gameMode = 'checkBlackJack';
    console.log(playerHand);
    console.log(computerHand);
    console.log(getHandScore(playerHand));
    
    return `${playerName} drew <b>${playerHand[1].name} ${playerHand[1].suit}</b> and <b>${playerHand[0].name} ${playerHand[0].suit} </b> ${playerName} score is ${getHandScore(playerHand)}. <br><br>Computer drew  <b>${computerHand[1].name} ${computerHand[1].suit} </b>and <b>${computerHand[0].name} ${computerHand[0].suit}</b> Computer score is ${getHandScore(computerHand)}.` ;
    
  }




//cards analyzed for game winning conditions (computer first, player next)
  if (gameMode == 'checkBlackJack'){
    if (computerHand[1].name == 'ace' && (computerHand[0].name == '10'||computerHand[0].name == 'jack'||computerHand[0].name == 'queen'||computerHand[0].name == 'king')){
      gameMode = 'end';
      playerScore = Number(playerScore) - Number(currentBet);
      return `Computer Wins!`
    }
    else if (computerHand[0].name == 'ace' && (computerHand[1].name == '10'||computerHand[1].name == 'jack'||computerHand[1].name == 'queen'||computerHand[1].name == 'king')){
      gameMode = 'end';
      playerScore = Number(playerScore) - Number(currentBet);
      return `Computer Wins!`
    }
    else if (playerHand[1].name == 'ace' && (playerHand[0].name == '10'||playerHand[0].name == 'jack'||playerHand[0].name == 'queen'||playerHand[0].name == 'king')){
      gameMode = 'end';
      playerScore = Number(playerScore) + Number((2*currentBet));
      return `Player Wins!`
    }
    else if (playerHand[0].name == 'ace' && (playerHand[1].name == '10'||playerHand[1].name == 'jack'||playerHand[1].name == 'queen'||playerHand[1].name == 'king')){
      gameMode = 'end';
      playerScore = Number(playerScore) + Number((2*currentBet));
      return `Player Wins!`
    }
    else if (gameMode = 'playerCalculate' && getHandScore(playerHand) < 16){
      gameMode = 'playerCalculate';
    return `No one got blackjack. Game continue. ${playerName} has less than 16, you have to hit it. <br><br>${playerName} drew <b>${playerHand[1].name} ${playerHand[1].suit}</b> and <b>${playerHand[0].name} ${playerHand[0].suit} </b><br><br>Computer drew  <b>${computerHand[1].name} ${computerHand[1].suit} </b>and <b>${computerHand[0].name} ${computerHand[0].suit}</b><br><br>.`
  }
  gameMode = 'playerCalculate';
  return `No one got blackjack. Game continue.  <br><br>${playerName} drew <b>${playerHand[1].name} ${playerHand[1].suit}</b> and <b>${playerHand[0].name} ${playerHand[0].suit} </b><br><br>Computer drew  <b>${computerHand[1].name} ${computerHand[1].suit} </b>and <b>${computerHand[0].name} ${computerHand[0].suit}</b><br><br>.`
}

  //user decides to hit or stand (using submit)
    if (gameMode == 'playerCalculate'){
          if (input == 'hit'){
            dealCard(playerHand);
                if (getHandScore(playerHand) > 21){
                    gameMode = 'restart';
                    return `${playerName} total score is ${getHandScore(playerHand)}. Player loses, computer wins!`;
                }
            return `${playerName} total score is ${getHandScore(playerHand)}. <br><br>Computer drew  <b>${computerHand[1].name} ${computerHand[1].suit} </b>and <b>${computerHand[0].name} ${computerHand[0].suit}</b>. Computer score is ${getHandScore(computerHand)}. Press hit or stand to continue the game`;
          } 
          else if (input == 'stand'){
            gameMode = 'computerTurn';
            return 'Your score is ' + getHandScore(playerHand) + ' <br><br>Its computer turn now';
          }
      return `you need to type in hit or stand to continue`;
    }
  
    //user card analyze for winning (count score) or losing (exceed 21)
    if (gameMode == 'computerTurn'){
        if (getHandScore(playerHand) > 21){
          gameMode = 'restart';
          return `${playerName} has more than 21! Computer Wins!`;
        }
        gameMode = 'computerCalculateAutomatically';
        return `${playerName} score is ${getHandScore(playerHand)} and computer score is ${getHandScore(computerHand)} Computer will decide action now.`
    }

  //computer decide to hit or stand automatically
    if (gameMode == 'computerCalculateAutomatically'){
        if (getHandScore(computerHand) < 16){
          dealCard(computerHand);
          return `Computer drew another card. ${playerName} score is ${getHandScore(playerHand)} and computerScore is ${getHandScore(computerHand)}`;
        }
        else if (getHandScore(computerHand) > 21) {
          gameMode = 'restart'; 
          playerPoints = Number(playerPoints)- Number(currentBet);
          return `${playerName} wins! Computer got more than 21.`
        }
        else if (getHandScore(computerHand) < 22 && getHandScore(computerHand) >= 16){
          gameMode = 'determineWinner'; 
          return `${playerName} score is ${getHandScore(playerHand)} and computer score is ${getHandScore(computerHand)}`;
        }
    }
    
    if (gameMode == 'determineWinner'){
      if (getHandScore(playerHand) > getHandScore(computerHand) && (getHandScore(playerHand) <21 && getHandScore(computerHand)) <21 ){
        gameMode = 'restart';
        playerPoints = Number(playerPoints) + Number(currentBet);
        console.log(currentBet);
        return `${playerName} wins! Press submit to restart. You have ${playerPoints} points left.`
      }
      else if (getHandScore(playerHand) == getHandScore(computerHand)){
        gameMode = 'restart';
        return `${playerName} and computer draw! Press submit to restart. You have ${playerPoints} points left.`
      }
      
      gameMode = 'restart';
      console.log(currentBet);
      console.log(playerPoints);
      playerPoints = Number(playerPoints)- Number(currentBet);
      return `Computer wins!. Press submit to restart. You have ${playerPoints} points left.`
    }
    
    if (gameMode == 'restart'){
      playerHand = []; 
      computerHand = []; 
      gameMode = 'bet';
      currentBet =  '';
      return `Game will restart now`;
    }

};


//game end or continues

//main

