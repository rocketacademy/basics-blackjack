//function to generate deck
var cards =[];
var cardDeck = function (){
  var cardSuits =['hearts', 'spades','clubs','diamonds'];
  var cardSuitsIndex =0;
  while(cardSuitsIndex<4){
    var currentsuit = cardSuits[cardSuitsIndex];
    var rankNumber=1;
    while (rankNumber<14){
      var cardName=rankNumber;
      if(rankNumber == 1){
        cardName='Ace'
      }
      else if(rankNumber == 11){
        cardName='Joker'
      }
      else if(rankNumber == 12){
        cardName='Queen'
      }
      else if(rankNumber == 13){
        cardName='King'
      }
      cards.push({
        name:  cardName,
        suit: currentsuit,
        rank: rankNumber,
      });
      rankNumber = rankNumber + 1;
    }
    cardSuitsIndex = cardSuitsIndex + 1;
  }
}
//function to shuffle deck
var shuffleDeck = function (){
  var shuffles = 0;
  while(shuffles<52){
    var currentCard = cards[shuffles];
    var newIndex = Math.floor(Math.random()*52);
    var swappedCard = cards[newIndex];
    cards[shuffles] = swappedCard;
    cards[newIndex] = currentCard;
    shuffles = shuffles + 1;
  };
};

//cards held by human player
var humanPlayerCards = [];
//cards held by computer player
var computerPlayerCards = [];

var dealCards = function (){
  var cardsDealt = 0;
  while (cardsDealt < 4){
    humanPlayerCards.push(cards[0]);
    cards.shift();
    cardsDealt = cardsDealt +1;
    computerPlayerCards.push(cards[0]);
    cards.shift();
    cardsDealt = cardsDealt +1;
  };
};

//total value of cards of human player
var humanPlayerValue = 0;
//total value of cards of computer player
var computerPlayerValue = 0;
//number of Aces by computer
var computerAceCounter = 0;
//number of Aces by human player
var humanAceCounter = 0;
//function to tally the value of all cards held by each player
var cardsTotalValue = function (cardsHeld){
  var cardsCounted = 0;
  var cardsValue = 0;
  while(cardsCounted <cardsHeld.length){
    cardsValue = cardsValue + cardsHeld[cardsCounted].rank;
    cardsCounted = cardsCounted + 1;
  }
  return cardsValue;
}
//function to calculate number of Aces
var aceCounter = function (cardsHeld){
  var cardsCounted = 0;
  var numberOfAces = 0;
  while(cardsCounted <cardsHeld.length){
    if (cardsHeld[cardsCounted].rank == 1){
      numberOfAces = numberOfAces + 1;
    };
    cardsCounted = cardsCounted + 1;
  };
  return numberOfAces;
}
//function to analyse cards draw by human player
var analyseWinningConditionsHuman = function (humanPlayerValue, humanAceCounter, computerPlayerValue){
  if (humanPlayerValue > 21){
    return `Player lost the game. Value of player cards: ${humanPlayerValue}. Value of computer cards: ${computerPlayerValue}.`
  }
  else if (humanPlayerValue == 11 & humanAceCounter > 0){
    humanPlayerValue = humanPlayerValue + 10;
    return `Player won the game. Value of player cards: ${humanPlayerValue}. Value of computer cards: ${computerPlayerValue}.`
  }
  else{
    return `Player, your cards are: <br>${cardsInHand(humanPlayerCards)}<br>The first card of the computer is: <br>${cardsInHand([computerPlayerCards[0]])}<br>Enter 'hit' to draw another card or 'stand' to pass.`
  }
}
//function to analyse next step for computer
var analyseWinningConditionsComputer = function(computerPlayerValue, computerAceCounter){
  if (computerPlayerValue == 11 & computerAceCounter > 0){
    computerPlayerValue = computerPlayerValue + 10;
    return `Player lost the game. Value of player cards: ${humanPlayerValue}. Value of computer cards: ${computerPlayerValue}.`
  }
  while (computerPlayerValue < 17){
    computerPlayerCards = drawCards(computerPlayerCards)
    computerPlayerValue = cardsTotalValue(computerPlayerCards);
    computerAceCounter = aceCounter(computerPlayerCards);
    if (computerPlayerValue == 11 & computerAceCounter > 0){
    computerPlayerValue = computerPlayerValue + 10;
    return `Player lost the game. Value of player cards: ${humanPlayerValue}. Value of computer cards: ${computerPlayerValue}.`
    }
  }
  if (computerPlayerValue > 21){
    return `Player won the game. Value of player cards: ${humanPlayerValue}. Value of computer cards: ${computerPlayerValue}.`
  }
  if (computerPlayerValue > 16 && computerPlayerValue < 22){
    return computerPlayerValue > humanPlayerValue ? `Player lost the game. Value of player cards: ${humanPlayerValue}. Value of computer cards: ${computerPlayerValue}.`: `Player won the game. Value of player cards: ${humanPlayerValue}. Value of computer cards: ${computerPlayerValue}.`
  }
}
//function to draw additional cards
var drawCards = function (cardsHeld){
  cardsHeld.push(cards[0]);
  cards.shift();
  return cardsHeld;
}
//function to output current cards held by player and computer
var cardsInHand = function (cardsHeld){
  var cardsCounted = 0;
  var stringOfCardsHeld = '';
  while (cardsCounted < cardsHeld.length){
    stringOfCardsHeld =stringOfCardsHeld + `${cardsHeld[cardsCounted].name} of ${cardsHeld[cardsCounted].suit}<br>`
    cardsCounted = cardsCounted + 1;
  }
  return stringOfCardsHeld;
}
var mode = 'initiate game';
var main = function (input) {
  if (mode == 'initiate game'){
    cardDeck();
    shuffleDeck();
    dealCards();
    humanPlayerValue = cardsTotalValue(humanPlayerCards);
    computerPlayerValue = cardsTotalValue(computerPlayerCards);
    humanAceCounter = aceCounter(humanPlayerCards);
    computerAceCounter = aceCounter(computerPlayerCards);
    myOutputValue = analyseWinningConditionsHuman(humanPlayerValue, humanAceCounter, computerPlayerValue);
    if (humanPlayerValue < 21){
      mode = 'choice to hit or stand'
    }
    return myOutputValue;
  }
  if (mode == 'choice to hit or stand'){
    if (input == 'hit'){
      humanPlayerCards = drawCards(humanPlayerCards);
      humanPlayerValue = cardsTotalValue(humanPlayerCards);
      humanAceCounter = aceCounter(humanPlayerCards);
      myOutputValue = analyseWinningConditionsHuman(humanPlayerValue, humanAceCounter, computerPlayerValue);
      return myOutputValue;
    }
    if (input == 'stand'){
      return analyseWinningConditionsComputer(computerPlayerValue, computerAceCounter);
    }
  }

};
