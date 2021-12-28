// Shuffling the deck

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
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// Making the deck

var makeDeck = function () {
  var cardDeck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
  
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var message = "";
var gameMode = "start";
var playerCardList = [];
var dealerCardList = [];
var playerCardListRank = [];
var dealerCardListRank = [];
var playerHand = [];
var dealerHand = [];
var playerScore = 0;
var dealerScore = 0;

// function that calculates hands

var calculateHandValue = function(playerHand){
  var score = 0;
  var aceCounter = 0;
  var index = 0;
  while (index < playerHand.length){
    var playerCurrentCard = playerHand[index];
    if (playerCurrentCard.name == "jack" || playerCurrentCard.name == "queen" || playerCurrentCard.name == "king"){
      score = score + 10;
    }
    else if (playerCurrentCard.name == "ace"){
      score = score + 11;
      aceCounter = aceCounter +1;
    }
    else {
      score = score + playerCurrentCard.rank;
    }
    index = index + 1;
  };
  index = 0;
  while (index < aceCounter){
    if (score > 21){
      score = score - 10;
    }
    index = index +1;
  }
  
  return score;
}

// function that adds card names and suits into hands

var createHand = function(){
  playerHand = [];
  dealerHand =[];
  for (i = 0; i < playerCardList.length; i++){
    playerHand.push(`${playerCardList[i].name} ${playerCardList[i].suit}`);
  };
  for (i = 0; i < dealerCardList.length; i++){
    dealerHand.push(`${dealerCardList[i].name} ${dealerCardList[i].suit}`);
  };
}

// the game starts and both players are dealt 2 cards each.

var dealCards = function(){
  if (gameMode == "start"){
    while (playerCardList.length < 2){
      playerCardList.push(shuffledDeck.pop());
      console.log(playerCardList);
    };
    while (dealerCardList.length < 2){
      dealerCardList.push(shuffledDeck.pop());
      console.log(dealerCardList);
    };
  }

// check for blackjack
  var playerBlackjack = false;
  var dealerBlackjack = false;
  if ((playerCardList[0].name == "ace" && playerCardList[1].rank >= 10) ||
  (playerCardList[0].rank >= 10 && playerCardList[1].name == "ace")){
    playerBlackjack = true;
  };
  if ((dealerCardList[0].name == "ace" && dealerCardList[1].rank >= 10) ||
  (dealerCardList[0].rank >= 10 && dealerCardList[1].name == "ace")){
    dealerBlackjack = true;
  };
  if (playerBlackjack == true && dealerBlackjack == false){
    message = `Player's hand is ${playerHand.join(", ")}. Player has blackjack! Player wins.`
  };
  if (playerBlackjack == false && dealerBlackjack == true){
    message = `Dealer's hand is ${dealerHand.join(", ")}. Dealer has blackjack! Dealer wins.`
  };
  if (playerBlackjack == true && dealerBlackjack == true){
    message = `Player's hand is ${playerHand.join(", ")}. <br>
    Dealer's hand is ${dealerHand.join(", ")}. <br>
    Both player and dealer have blackjack! Issa draw.`
  };

// display players' cards if there is no blackjack
  if (playerBlackjack == false && dealerBlackjack == false){
    gameMode = "player"; 
    var playerScore = calculateHandValue(playerCardList);
    var dealerScore = calculateHandValue(dealerCardList);

    createHand();
    
    message = `Hi Player, your hand is ${playerHand.join(", ")}. Your score is currently ${playerScore}. <br> 
    The dealer's hand is ${dealerHand.join(", ")}. The dealer currently has a score of ${dealerScore}. <br>
    Please enter "hit" if you want to draw a card. <br>
    Please enter "stand" if you want to end your turn.`;
  }
  return message;
}

// player's turn

var compareHandsAfterPlayerTurn = function(playerChoice){

  if (gameMode == "player" && playerChoice == "hit"){
    playerCardList.push(shuffledDeck.pop());
    
    var playerScore = calculateHandValue(playerCardList);
    var dealerScore = calculateHandValue(dealerCardList);

    createHand();    
    message = `Player, your hand is now ${playerHand.join(", ")}. Your score is now ${playerScore}. <br>
    Enter 'hit' to draw another card or 'stand' to end your turn.`
  };
    if (playerScore > 21){

      message = `Player, your hand is now ${playerHand.join(", ")}. Your score is now ${playerScore}. <br>
      You have bust and lost! Refresh the page to play again.`
    }

  console.log(playerCardList);

  var playerScore = calculateHandValue(playerCardList);
  var dealerScore = calculateHandValue(dealerCardList);

// game ends after player's turn if dealer's score is already >= 17

  if (gameMode == "player" && playerChoice == "stand"){
    if (dealerScore >= 17){
      gameMode = "end";
      if (playerScore <= 21 && playerScore > dealerScore){
        message = `Player, your hand is now ${playerHand.join(", ")}. Your score is ${playerScore} vs the dealer's score of ${dealerScore}. You win!`
        }
      if (playerScore <= 21 && playerScore < dealerScore){
        message = `Player, your hand is now ${playerHand.join(", ")}. Your score is ${playerScore} vs the dealer's score of ${dealerScore}. You lose!`;
        };
      if (playerScore <= 21 && playerScore == dealerScore){
        message = `Player, your hand is now ${playerHand.join(", ")}. Your score is ${playerScore} vs the dealer's score of ${dealerScore}. You draw!`;
        };
      };  

    var playerScore = calculateHandValue(playerCardList);
    var dealerScore = calculateHandValue(dealerCardList);

// game proceeds to dealer's turn if dealer's score is <17

    if (dealerScore < 17){
      gameMode = "dealer";
      message = `Hi Player, you have chosen to stand. Your hand is ${playerHand.join(", ")} and your final score is ${playerScore}. <br>
      The dealer's hand is ${dealerHand.join(", ")} and the dealer's score is ${dealerScore}. It is now the dealer's turn. <br>
      Dealer, enter 'hit' to draw a card.`
    };  
  };
  return message;
}

// dealer's turn

var compareHandsAfterDealerTurn = function(dealerChoice){
  createHand();

// dealer draws a card if dealer's score is <17

  if (gameMode == "dealer" && dealerChoice == "hit"){
    dealerCardList.push(shuffledDeck.pop());
    
    createHand(); 

    var playerScore = calculateHandValue(playerCardList);
    var dealerScore = calculateHandValue(dealerCardList);

    console.log(dealerCardList);
    


    message = `Dealer, your hand is now ${dealerHand.join(", ")}. Your score is now ${dealerScore}. <br>
    Enter 'hit' to draw another card or 'stand' to end your turn.`  
    
  // if dealer's score >= 17, the game ends

    if (dealerScore >=17){
      gameMode = "end";
      if (playerScore > dealerScore && playerScore <= 21){
        message = `Dealer, your hand is now ${dealerHand.join(", ")}. <br>
        Player's hand is ${playerHand.join(", ")}. <br>
        Player, your score is ${playerScore} vs the dealer's score of ${dealerScore}. You win! <br>
        Please refresh the page to play again.` 
        };
      if (playerScore < dealerScore & dealerScore <= 21){
        message = `Dealer, your hand is now ${dealerHand.join(", ")}. <br>
        Player's hand is ${playerHand.join(", ")}. <br>
        Player, your score is ${playerScore} vs the dealer's score of ${dealerScore}. You lose! <br>
        Please refresh the page to play again.`
        };
      if (playerScore <= 21 & dealerScore > 21){
        message = `Dealer, your hand is now ${dealerHand.join(", ")}. <br>
        Player's hand is ${playerHand.join(", ")}. <br>
        Player, your score is ${playerScore} vs the dealer's score of ${dealerScore}. The dealer busts! You win! <br>
        Please refresh the page to play again.` 
        };
      if (playerScore > 21 & dealerScore <= 21){
        message = `Dealer, your hand is now ${dealerHand.join(", ")}. <br>
        Player's hand is ${playerHand.join(", ")}. <br>
        Player, your score is ${playerScore} vs the dealer's score of ${dealerScore}. You bust! You lose! <br>
        Please refresh the page to play again.` 
        };
      if (playerScore == dealerScore & dealerScore <= 21){
        message = `Dealer, your hand is now ${dealerHand.join(", ")}. <br>
        Player's hand is ${playerHand.join(", ")}. <br>
        Player, your score is ${playerScore} vs the dealer's score of ${dealerScore}. You draw! <br>
        Please refresh the page to play again.` 
        };
    }
  };
  return message;
}

var main = function (input){
  var myOutputValue = "";
  if (gameMode == "start"){
    myOutputValue = dealCards();
  } else if (gameMode == "player"){
      myOutputValue = compareHandsAfterPlayerTurn(input);
  } else if (gameMode == "dealer"){
      myOutputValue = compareHandsAfterDealerTurn(input);
  } 
  return myOutputValue;
}
