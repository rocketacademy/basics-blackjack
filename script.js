var playerHand = []; //all cards player will hold
var computerHand = []; // all cards computer will hold
var gameMode = 'deal2Cards';

// create deck
var makeDeck = function () {
  var deck = [];
  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    //console.log("current suit: " + currentSuit);
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
      };
      //console.log("rank: " + rankCounter);
      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

// shuffle deck 
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
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

var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);


//function to take a hand and come up with points
//add rank
// count aces
// write the score
var calculate = function(hand){
  var currentScore = 0;
  var cardIndex = 0;
  var handLength = hand.length;
  var gotAce = 0;
  while (cardIndex < handLength){
    var currentCard = hand[cardIndex]
    var cardScore = currentCard.rank
    if (cardScore == 1){
      gotAce += 1;
    }
    currentScore += Math.min(10,cardScore)
    cardIndex += 1
  }
  if (gotAce > 0 & currentScore <= 11){
    currentScore += 10;
  }
  return currentScore
}

//banker to decide whether to draw or not
var dealerActions = function(){
  var currentScore = calculate(computerHand);
  console.log(currentScore)
  while (currentScore < 17){
    var newCard = shuffledDeck.pop();
    computerHand.push(newCard);
    currentScore = calculate(computerHand);
    console.log(currentScore)
  }
}


// if user choose stand, compare card with computer
// show results and end game.


var main = function (input) {
  // Submit to deal 2 cards to computer and player
  if (gameMode == 'deal2Cards'){
    var playerCard1 = shuffledDeck.pop();
    var playerCard2 = shuffledDeck.pop();
    playerHand.push(playerCard1,playerCard2);
    var computerCard1 = shuffledDeck.pop();
    var computerCard2 = shuffledDeck.pop();
    computerHand.push(computerCard1,computerCard2);


    //blackjack check
    if (calculate(playerHand)== 21){
      var myOutputValue = 'The cards are dealt. You have drawn ' +playerCard1.name+ ' of ' +playerCard1.suit+ ' and ' +playerCard2.name+ ' of ' +playerCard2.suit + '<br><b>Congratulations, you have hit Blackjack</b>';
      playerHand = [];
      deck = makeDeck();
      shuffledDeck = shuffleCards(deck);
      return myOutputValue;
    }
    // normal output
    var myOutputValue = 'The cards are dealt. You have drawn ' +playerCard1.name+ ' of ' +playerCard1.suit+ ' and ' +playerCard2.name+ ' of ' +playerCard2.suit + ' Choose "hit" or "stand" for your next move!';
    gameMode = 'choose Hit or Stand';
    return myOutputValue;
    
  } else if (gameMode == 'choose Hit or Stand'){
      // Player choose hit
      if (input == 'hit'){
        var playerCard = shuffledDeck.pop();
        playerHand.push(playerCard);
        var playerScore = calculate(playerHand);

        // Display cards
        var myOutputValue = "These are your cards:<br>";
        var cardIndex = 0;
        var handLength = playerHand.length;
        while (cardIndex < handLength){
          var currentCard = playerHand[cardIndex];
          myOutputValue += `${currentCard.name} of ${currentCard.suit} | `;
          cardIndex += 1;
        }

        if (playerScore > 21){
          myOutputValue += `<br>You lose! Press "Submit" to play again. `;
          gameMode = "deal2Cards";
          return myOutputValue
        }

        // Check for blackjack
        myOutputValue += `<br> Your score is ${playerScore}. Do you want to "hit" or "stand"?`;
        return myOutputValue;
      }else if (input == 'stand'){  
        // banker's turn to decide what to do
        dealerActions();
        var bankerScore = calculate(computerHand);
        var playerScore = calculate(playerHand);
        // if banker > 21, banker burst
       var myOutputValue = "These are the computer cards:<br>";
        var cardIndex = 0;
        var handLength = computerHand.length;
        while (cardIndex < handLength){
          var currentCard = computerHand[cardIndex];
          myOutputValue += `${currentCard.name} of ${currentCard.suit} | `;
          cardIndex += 1;
        }
        if (bankerScore > 21 || playerScore > bankerScore){
            myOutputValue += '<br>Player wins! computer loses. Try again!'
        }else if (bankerScore == playerScore){
            myOutputValue += '<br>It is a tie! try again!'
        }else if (playerScore < bankerScore){
            myOutputValue += '<br>Computer wins! player loses. Try again!'   
        };
      gameMode = "deal2Cards";
      playerHand = [];
      computerHand = [];
      deck = makeDeck();
      shuffledDeck = shuffleCards(deck);
      return myOutputValue;
      };
  };
};

