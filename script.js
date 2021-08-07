var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;
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

var gameMode = 'dealFirstCard';

//dealcard
var dealCard = function (hand){
  hand.push(deck.pop());
}

//calculate score in hand, assume ace = 11
var getHandScore = function(hand){
    var sum = 0;
    for (let i = 0; i <hand.length; i+=1){
      var currentCard = hand[i];
      if (currentCard.rank == 1){
        sum += 11;
      }
      else if (currentCard.rank >=2 && currentCard.rank <=10){
        sum += currentCard.rank;
      }
      else if (currentCard.rank >=11 && currentCard.rank <=13){
        sum += 10; 
      }
    }
    return sum;
};


//deck is shuffled


//user clicks submit to deal cards

var main = function (input) {


  if (gameMode == 'dealFirstCard' && playerHand.length == 0){
    dealCard(playerHand);
    dealCard(computerHand);
    
    console.log(playerHand);
    console.log(computerHand);
  
    gameMode = 'dealSecondCard';
    return `Player drew  ${playerHand[0].name} ${playerHand[0].suit} <br><br>Computer drew  ${computerHand[0].name} ${computerHand[0].suit} <br><br> Press Submit to draw the 2nd card.` ;
  }

  if (gameMode == 'dealSecondCard' && playerHand.length == 1){
    dealCard(playerHand);
    dealCard(computerHand);
    
    gameMode = 'checkBlackJack';
    console.log(playerHand);
    console.log(computerHand);
    console.log(getHandScore(playerHand));
    
    return `Player drew <b>${playerHand[1].name} ${playerHand[1].suit}</b> and <b>${playerHand[0].name} ${playerHand[0].suit} </b> Player score is ${getHandScore(playerHand)}. <br><br>Computer drew  <b>${computerHand[1].name} ${computerHand[1].suit} </b>and <b>${computerHand[0].name} ${computerHand[0].suit}</b> Computer score is ${getHandScore(computerHand)}.` ;
    
  }




//cards analyzed for game winning conditions (computer first, player next)
  if (gameMode == 'checkBlackJack'){
    if (computerHand[1].name == 'ace' && (computerHand[0].name == '10'||computerHand[0].name == 'jack'||computerHand[0].name == 'queen'||computerHand[0].name == 'king')){
      gameMode = 'end';
      return `Computer Wins!`
    }
    else if (computerHand[0].name == 'ace' && (computerHand[1].name == '10'||computerHand[1].name == 'jack'||computerHand[1].name == 'queen'||computerHand[1].name == 'king')){
      gameMode = 'end';
      return `Computer Wins!`
    }
    else if (playerHand[1].name == 'ace' && (playerHand[0].name == '10'||playerHand[0].name == 'jack'||playerHand[0].name == 'queen'||playerHand[0].name == 'king')){
      gameMode = 'end';
      return `Player Wins!`
    }
    else if (playerHand[0].name == 'ace' && (playerHand[1].name == '10'||playerHand[1].name == 'jack'||playerHand[1].name == 'queen'||playerHand[1].name == 'king')){
      gameMode = 'end';
      return `Player Wins!`
    }
    gameMode = 'playerCalculate';
    return `No one got blackjack. Game continue. Press 'hit' to draw 1 more card, or 'stand' to stop your turn. <br><br>Player drew <b>${playerHand[1].name} ${playerHand[1].suit}</b> and <b>${playerHand[0].name} ${playerHand[0].suit} </b><br><br>Computer drew  <b>${computerHand[1].name} ${computerHand[1].suit} </b>and <b>${computerHand[0].name} ${computerHand[0].suit}</b><br><br>.`
  }

  //user decides to hit or stand (using submit)
    if (gameMode == 'playerCalculate'){
          if (input == 'hit'){
            dealCard(playerHand);
            gameMode = 'computerTurn';
            return `Player drew <b>${playerHand[2].name} ${playerHand[2].suit}</b> and <b>${playerHand[1].name} ${playerHand[1].suit}</b> and <b>${playerHand[0].name} ${playerHand[0].suit} </b>. Player score is ${getHandScore(playerHand)}. <br><br>Computer drew  <b>${computerHand[1].name} ${computerHand[1].suit} </b>and <b>${computerHand[0].name} ${computerHand[0].suit}</b>. Computer score is ${getHandScore(computerHand)}. Press hit or stand to continue the game`;
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
          return `Player has more than 21! Computer Wins!`;
        }
        gameMode = 'computerCalculateAutomatically';
        return `Player score is ${getHandScore(playerHand)} and computer score is ${getHandScore(computerHand)} Computer will decide action now.`
    }

  //computer decide to hit or stand automatically
    if (gameMode == 'computerCalculateAutomatically'){
        if (getHandScore(computerHand) < 16){
          dealCard(computerHand);
          return `Computer drew another card. Player score is ${getHandScore(playerHand)} and computerScore is ${getHandScore(computerHand)}`;
        }
        else if (getHandScore(computerHand) > 21) {
          gameMode = 'restart'; 
          return 'Player wins! Computer got more than 21.'
        }
        else if (getHandScore(computerHand) < 21 && getHandScore(computerHand) > 16){
          gameMode = 'determineWinner'; 
          return `Player score is ${getHandScore(playerHand)} and computer score is ${getHandScore(computerHand)}`;
        }
    }
    
    if (gameMode == 'determineWinner'){
      if (getHandScore(playerHand) > getHandScore(computerHand) && (getHandScore(playerHand) <21 && getHandScore(computerHand)) <21 ){
        gameMode = 'restart';
        return `Player wins! Press submit to restart.`
      }
      gameMode = 'restart';
      return `Computer wins!. Press submit to restart.`
    }
    
    if (gameMode == 'restart'){
      playerHand = []; 
      computerHand = []; 
      gameMode = 'dealFirstCard';
      return `Game will restart now`;
    }

};


//game end or continues

//main

