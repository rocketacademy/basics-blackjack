var playingCards = [];
var playerCards = [];
var computerCards = [];

var myOutputValue='Press Submit to Start Playing';
var gameState = 'Not Started';
var outCome;

var playerCardsAtHand = 0;
var computerCardsAtHand = 0;

var isThereAce = function (cardsAtHard, cardTotal) {
  // loop
  var index = 0;
  while (index < cardsAtHard.length) {
    // sET ACE TO 1 OR 11? 1) total<10 Ace= 11 2) total>10 Ace= 1
    console.log(cardsAtHard[index].cardName + ' ' + cardsAtHard[index].rank);
    if (cardsAtHard[index].cardName == 'ace' && cardTotal < 10) {
      cardsAtHard[index].rank = 11;
    }
    if (cardsAtHard[index].cardName == 'ace' && cardTotal > 10) {
      cardsAtHard[index].rank = 1;
    }

    console.log(cardsAtHard[index].cardName + ' ' + cardsAtHard[index].rank);
    index = index + 1;
  }
  return cardsAtHard;

  // sET ACE TO 1 OR 11? 1) total<10 Ace= 11 2) total>10 Ace= 1
};
var playerWon = function (playerCard, computerCard) { // player cards index rank not the actual value of the card
  // Add King Queen or Jack =10, Ace = 1 or 11
  // sum of Ace change between 1 or 11
// sET ACE TO 1 OR 11?

  var index = 0;
  
  playerCardsAtHand=0;
  // initial calculate cards at hand
  while (index < playerCards.length) {
    playerCardsAtHand = playerCardsAtHand + playerCards[index].rank;

    index = index + 1;
    
  }
  index = 0;
  computerCardsAtHand=0;
  while (index < computerCards.length) {
    computerCardsAtHand = computerCardsAtHand + computerCards[index].rank;
    index = index + 1;
    // check if there is ace - create Ace Checking function
    // sET ACE TO 1 OR 11? 1) <10 Ace= 21 2) >10 Ace= 1
    // use if - else
  }
  // Do adjustment for aces

  console.log( 'playerCardsAtHand :' +playerCardsAtHand );
  console.log( 'computerCardsAtHand :' +computerCardsAtHand );
  playerCards = isThereAce(playerCard, playerCardsAtHand);
  computerCards = isThereAce(computerCards, computerCardsAtHand);
  console.log('Player Cards at Hand ->' + playerCardsAtHand + ' Computer Cards at Hand ->' + computerCardsAtHand);

  if (computerCardsAtHand > 21) {
    console.log('Computer Bust');

    return 'Computer Bust with '+ computerCardsAtHand+'<br><br>Click Submit to Start a new Game<br>';
  } if (playerCardsAtHand > 21) {
    console.log('Player Bust');

    return 'Player Bust with '+playerCardsAtHand+'<br><br>Click Submit to Start a new Game<br>';
  } if (computerCardsAtHand > 17 && playerCardsAtHand > computerCardsAtHand) {
    console.log('Player Lose');
    return 'Player Lose with '+playerCardsAtHand+'<br><br>Click Submit to Start a new Game<br>';
  } if (computerCardsAtHand > 17 && playerCardsAtHand < computerCardsAtHand) {
    console.log('Computer Won with '+ computerCardsAtHand);
    return 'Computer Won<br><br>Click Submit to Start a new Game<br>';
  } if ((playerCardsAtHand < 22) && (playerCardsAtHand == computerCardsAtHand)) {
    console.log('Draw');
    return 'Draw<br><br>Click Submit to Start a new Game<br>';
  }
  return 'Continue<br> <br>Enter Hit or Stand<br>';
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    var rank = 0;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = 'ace';
        // can be 1 or 11
      } else if (cardName == 11) {
        cardName = 'jack';
        // change rank = 10
        rank = 10;
      } else if (cardName == 12) {
        cardName = 'queen';
        rank = 10;
      } else if (cardName == 13) {
        cardName = 'king';
        rank = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // console.log(card.cardName);
      cardDeck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (cardSize) {
  return Math.floor(Math.random() * cardSize);
};

var randomCardPicked = function () {
  // console.log('Playing card length' + playingCards.length);

  var cardSize = playingCards.length;
  var randomIndex = getRandomIndex(cardSize);
  console.log('Random Index: ' + randomIndex);
  var cardPicked = playingCards[randomIndex];
  playingCards.splice(randomIndex, 1);

  console.log('Cards picked ' + cardPicked );

  return cardPicked;
};

var startGame = function () {
  playerCards = [];
  computerCards = [];

  playerCardsAtHand = 0;
  computerCardsAtHand = 0;
  playingCards = makeDeck();
  playerCards.push(randomCardPicked());
  computerCards.push(randomCardPicked());
  gameState = 'Started';
};



var main = function (input) {
  if (gameState == 'Not Started') {
    startGame();
    console.log('start Game');
  } else if (gameState == 'Started') {
    if (input = 'Hit') {
      playerCards.push(randomCardPicked());
      outCome = playerWon(playerCards, computerCards);
    }
    computerCards.push(randomCardPicked());
    outCome = playerWon(playerCards, computerCards);
  }

  // check if player has won
  

  myOutputValue = 'Player Cards at Hand -> ' + playerCardsAtHand 
  + ' Computer Cards at Hand -> '
  + computerCardsAtHand + '<br>' + 'Outcome : ' + playerWon(playerCards, computerCards);
  


  console.log('Game state : ' + gameState);
  if (outCome != 'Continue<br> <br>Enter Hit or Stand<br>') {
    console.log('re start game');
    gameState == 'Not Started';

    playerCards = [];
    computerCards = [];
    
    playerCardsAtHand=0;
    computerCardsAtHand=0;

    console.log('After clearing Player Cards at Hand -> ' + playerCardsAtHand);
    console.log('After clearing Computer Cards at Hand -> ' + computerCardsAtHand);
  }

  return myOutputValue;
};
