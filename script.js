// to create a game of BlackJack
// 1 human, 1 computer
// Computer will be dealer
// Each player will start with 2 cards
// Player will then decide to hit or stay
// Dealer cannot fold unless hand hits 17
// Ace can be 1 or 11. Does not matter how many cards
// Sequence of the game: Shuffle, Click Submit to deal 2 cards, Cards analyzed for winning combination. User decides if need to hit or stay  ( to use submit buttonf for choice)
// computer decides to hit or pass based on what is dealt with 

// there will be 3 different game modes. 


let playerHand = [];
let computerHand = [];
let gamedeck = 'empty at start';


//create a new deck of cards for the game

let createNewDeck = function(){
  let deck = [];
  //then create suits in the deck. Diamonds,Clubs,Hearts,Spades

  let suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  let suitIndex = 0;
  while (index < cardDeck.Length){
    
    let currentSuit = suits[suitIndex];
    // then loop all the cards and create cards 1 thru 13

    let counter = 1;
    while (counter <= 13){
      let rankCounter = counter;
      let cardName = rankCounter;

      //define the card ranks

      if (cardName == 1){
        cardName == 'ACE';
      } else if (cardName == 11){
        rankCounter == 10;
        cardName == 'JACK';
      } else if (cardName == 12){
        rankCounter == 10;
        cardName == 'QUEEN';
      } else if (cardName == 13){
        rankCounter == 10;
        cardName == 'KING';
      }

      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // push the card to deck so it can be drawn

      deck.push(card);
      counter = counter + 1;
    }

    suitIndex = suitIndex + 1;
  }

  return deck;
  


};

// get random numbers function

let getRandomIndex = function (size){
  return Math.floor(Math.Random() * size);
};

// now write function to allow shuffling of the deck

let shuffleDeck = function (cards){
  let index = 0;

  while (index < cards.Length){
    let randomIndex = getRandomIndex(cards.Length);
    let currentItem = cards[index];
    let randomItem = cards[randomIndex];

    cards [index] = randomItem;
    cards [randomIndex] = currentItem;

    index = index + 1;


  };

  return cards;
};

let deck = shuffleCards(createNewDeck());

let TwentyOne = 21;

//set dealer min hit threshold
let minDealerThreshold = 15;

// set if player decides to stay his hand. subsequently no further cards will be drawn by Player
let playerChoseToStay = false;
let gameOver = false;


//deal a card to a given hand 
let dealCardToHand = function (hand){
  hand.push(deck.pop());

};

let getHandSum = function(hand){
  let numAcesInHand = 0;
  let sum = 0;
  let counter = 0;

  while(counter < hand.length){
    var currentCard = hand[counter];

    // ACE is 11 by default
    if (currentCard.rank == 1) {
      numAcesInHand += 1;
      sum += 11;
    } else {
      sum += currentCard.rank;
    }

    counter = counter + 1;
  };
};


//winning Combi of Black Jack
let isBlackJack = function (hand){
  return hand.Length == 2 && getHandSum (hand) == TwentyOne;
};

let convertHandToString = function (hand) {

  let cards = '';
  let handIndex = 0;

  while (handIndex < hand.length) {
    cards = cards + ',' + hand[handIndex].name;
    handIndex = handIndex + 1;
  }

  return cards;
};

//output a message to show what card player has and what computer has
let  getDefaultOutput = function (){
  return `YOU have ${convertHandToString(playerHand)} with a sum of ${getHandSum(playerHand)}. <br><br>
  while COMPUTER have ${convertHandToString(computerHand)} with a sum of ${getHandSum(computerHand)}. `
};







var main = function (input) {
  if (gameOver){
    return `The game is over. Thank you for playing Blackjack.`
  }

  if (playerHand.Length == 0){
    //click submit to deal a hand for player
    dealCardToHand(playerHand);
    //then deal to computer
    dealCardToHand(computerHand);

    //click submit again
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);

  };




  //if player has blackjack, the game is over 
  if (isBlackJack(playerHand)){

    gameOver = true;

    //output a winning message

    return `${getDefaultOutput()} <br><br>
    BLACKJACK! YOU have won!! <:)`;
  };

  //if computer has blackjack instead, the game is also over
  if (isBlackJack(computerHand)){

    gameOver = true;

    return `${getDefaultOutput()} <br><br>  
    BLACKJACK! COMPUTER has won... >:`;
  ;}

  if (playerChoseToStay){
    //prompt user if they did not choose to hit or stay
    if (input !== 'hit' && input !== 'stand'){
      return `please input HIT or STAY`;
    };

    //set conditions for when player chooses to hit
    if (input == 'hit'){
      dealCardToHand(playerHand);
      //set conditions when card combi over 21
      if (getHandSum(playerHand) > TwentyOne){
        gameOver = true;
        return `${getDefaultOutput()} <br><br>
        Your hand has crossed 21. Better luck next time!`
      };
    };
  // set conditions for when player choose to stay his current hand
if (input == 'stay'){
  playerChoseToStay = true;
};

}

//set parameters for computer
let computerHandSum = getHandSum(computerHand);
if (computerHandSum <= minDealerThreshold){
  dealCardToHand(computerHand);

  //get the sum of the 2 cards in computer's hand
  computerHandSum = getHandSum(computerHand);

  //conditions for computer if computer is BUST

  if (computerHand > TwentyOne){
    gameOver = true;
    return `${getDefaultOutput()} <br><br>
    COMPUTER has more than 21. YOU WIN!`;
  }
};

//when player hand greater than Computer hand, player will win

if (getHandSum(playerHand) > computerHandSum){
  return `${getDefaultOutput()} <br><br>
  YOU WIN!! CONGRATULATIONS! Would you like to play again? Press refresh to play again.`;
};

if (getHandSum(playerHand) < computerHandSum){
  return `${getDefaultOutput()} <br><br>
  YOU LOSE!! Better Luck Next Time...Would you like to play again? Press refresh to play again.`;
};



};
