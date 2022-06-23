var gameMode = "start";
var shuffledDeck = null;
var playerHand = [];
var computerHand = [];
var playerCurrentScore = 0;
var computerCurrentScore = 0;

var makeDeck = function () {
  // make 52 cards
  // rank 1-13
  // 1-4 suits hearts, diamonds, clubs, spades
  // 2-10 and jack, queen, king and ace

  var cardDeck = [];

  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitsEmoji = ["❤️", "♦️", "♣️", "♠️"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: suitsEmoji[suitIndex],
      };

      cardDeck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var shuffleCards = function (cardDeck) {
  currentIndex = 0;

  while (currentIndex < cardDeck.length) {
    var randomIndex = Math.floor(Math.random() * cardDeck.length);

    var currentCard = cardDeck[currentIndex];
    var randomCard = cardDeck[randomIndex];

    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex += 1;
  }
  return cardDeck;
}

var firstDeal = function ()
{
  for (var i = 0;i < 2; i++){
    playerHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());
    
  }
}

var printHand = function(hand){
  var print = "<br>";
  for (i = 0; i < hand.length; i++){
    print += `<br>${hand[i].name} of ${hand[i].suit} ${hand[i].emoji}`
  }
  return print;
}

var calculateScore = function(hand)
{
  var thisScore = 0;
  for (var i = 0; i < hand.length; i++){
    var thisCardScore = 0;
    if(hand[i].rank == 11 || hand[i].rank == 12 ||hand[i].rank == 13){
      thisCardScore = 10;
    } else if (hand[i].rank == 1 && thisScore < 11){
      thisCardScore = 11;
    } else if (hand[i].rank == 1 && thisScore > 10){
      thisCardScore = 1;
    }else {
      thisCardScore = hand[i].rank;
    }
    thisScore += thisCardScore;
  }
  return thisScore;
}


var hitOrStand = function(input){
  var print = null;
  if(input == "hit"){
    playerHand.push(shuffledDeck.pop());
    playerCurrentScore = calculateScore(playerHand);
    if (playerCurrentScore < 22) {
      var computerCard1 = `${computerHand[0].name} of ${computerHand[0].suit} ${computerHand[0].emoji}`;
      print = `Dealer's Card:<br>${computerCard1}<br><br><br>Your Cards:${printHand(playerHand)} <br><br><br>Your Score: ${playerCurrentScore}`
    } else if (playerCurrentScore > 21){
      var computerCard1 = `${computerHand[0].name} of ${computerHand[0].suit} ${computerHand[0].emoji}`;
      gameMode = "start";
      print = `BOOM! YOU LOSE!<br> Dealer's Card:<br>${computerCard1}<br><br><br>Your Cards:${printHand(playerHand)} <br><br><br>Your Score: ${playerCurrentScore}`
    }
  } else if (input == "stand"){
    // if the player is done hitting, the dealder(computer) will keep drawing until the computer score is at least 16
    computerCurrentScore = calculateScore(computerHand);
    if (computerCurrentScore < 16){
      while (computerCurrentScore < 16) {
        computerHand.push(shuffledDeck.pop());
        computerCurrentScore = calculateScore(computerHand);
      }
    }
    if (computerCurrentScore > playerCurrentScore && computerCurrentScore < 22){
      gameMode = "start";
      print = `The Dealer outdrew you. <br>Dealer's Cards:${printHand(computerHand)}<br>Dealer's Score: ${computerCurrentScore}<br><br><br>Your Cards:${printHand(playerHand)} <br><br><br>Your Score: ${playerCurrentScore}`;
    } else if (playerCurrentScore > computerCurrentScore){
      gameMode = "start";
      print = `Wow! You win!<br> Dealer's Cards:${printHand(computerHand)}<br>Dealer's Score: ${computerCurrentScore}<br><br><br>Your Cards:${printHand(playerHand)} <br><br><br>Your Score: ${playerCurrentScore}`;
    } else if (computerCurrentScore > 21 ){
      gameMode = "start";
      print = `You got lucky this time! You win. <br> Dealer's Cards:${printHand(computerHand)}<br>Dealer's Score: ${computerCurrentScore}<br><br><br>Your Cards:${printHand(playerHand)} <br><br><br>Your Score: ${playerCurrentScore}`;
    }
  
  }
  return print;
}

var main = function (input) {
  var myOutputValue = 'hello world';
  if(gameMode == "start"){
    playerHand = [];
    computerHand = [];
    shuffledDeck = shuffleCards(makeDeck());
    firstDeal();
    var computerCard1 = `${computerHand[0].name} of ${computerHand[0].suit} ${computerHand[0].emoji}`;
    playerCurrentScore = calculateScore(playerHand);
    console.log(playerCurrentScore);
    myOutputValue = `Dealer's Card:<br>${computerCard1}<br><br><br>Your Cards:${printHand(playerHand)} <br><br><br>Your Score: ${playerCurrentScore}`;
    gameMode = "hitOrStand";
    console.log(computerHand);
  } else if (gameMode == "hitOrStand"){
    myOutputValue = hitOrStand(input);
  }
  
  return myOutputValue;
}
