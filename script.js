

let gameMode = 'waiting for user name'

// set a function to generate number
let getRandomIndex = function (deck){
  return Math.floor(Math.random() * deck);
};

// set a function to make deck of cards
let deckOfCards = function (){
  let deckArray = [];
  let suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1){
    let currentSuit = suits[suitIndex];
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1){
      let cardName = rankCounter;

      if (cardName == 1){
        cardName = 'ace';
      } else if (cardName == 11){
        cardName = 'jack';
      } else if (cardName == 12){
        cardName = 'queen';
      } else if (cardName == 13){
        cardName = 'king';
      }

      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter
      }

      deckArray.push(card);
    }
  }
  return deckArray;
};

// set a function to shuffle cards
let shuffledDeck = function (){
  let deck = deckOfCards();
  
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex += 1){
    let randomIndex = getRandomIndex(deck.length);
    let randomCard = deck[randomIndex];
    let currentCard = deck[currentIndex];


    deck[randomIndex] = currentCard;
    deck[currentIndex] = randomCard;
  }
  return deck;
};

let main = function (input){
  if (gameMode == 'waiting for user name'){
    if (input == ''){
     return `Please enter your name to play 🔐`;
    }
    gameMode = 'Place bets and deal';
    document.getElementById("submit-button").innerHTML = "Place bets and deal";
    let helloGif = '<img src = "https://media.tenor.com/lLuTOOcOeS8AAAAd/kto-lbow.gif"/>'
    return `Hello ${input}, welcome to Blackjack! Place your bets and start dealing.<br><br> ${helloGif}`;
  }


}



