//Blackjack project:

//Requirements:
// 1. Generate deck -> deck generator function but 'Jack', 'Queen', 'King' = 10. "Ace" set to 11, later to be manipulated
// 2. Shuffle deck -> shuffle deck function (copy from previous work) -> Constructor card: name, suits, value
// 3. Deal initial cards to players and dealer -> constructor function for players and dealer -> constructor player: name, hands, bank
// 4. "Ace" manipulator -> a function to manipulate value of Ace. -> check value of current hands
//     One way to do it is to check current value of player hand and manipulate depending on current value of player card
// 5. Read current value of player card function: Based on player hand, return the value of player hand.
//    Initialise an array for player's hand
// 6. Hit: draw a card  -> hit function for hit button
// 7. Stand: End turn -> stand function
// 8. Dealer must hit if value <17, stand if >17 && <21 and dealer draw first
// 8. if burst >= 22 -> stand function and include msg you burst (check if dealer/player burst)
// 9. if dealer burst and player burst: outcome draw
// 10. if dealer burst and player didnt burst: player win regardless of numbers
// 11. if player burst, player instant lose
// 12. else compare dealer hand value and player hand to determine winner
// 13. Make code scalable for more players

var deck = []
var players = []
const suit = ["❤️", "♦", "♣", "♠️"]
const cardName = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
var numOfplayer = 0
var currentPlayer = 1
//constructor function for cards
function Card(cardname, logo, number){
  this.name = cardname;
  this.suit = logo;
  this.value = number
} 
//constructor function for player
function Player(playerName){
  this.name = playerName
  this.bank = 100
  this.hand = []
  this.wager = 0
  this.handValue = 0
}

var main = function (input) {
  var myOutputValue = 'start';
  return myOutputValue;
};

//Make deck
var makeDeck = function(){
  for(let i = 0; i < suit.length; i++){
    for(let j = 0; j < cardName.length; j++)
    {
      let currentCard = new Card(cardName[j], suit[i], j + 1)
      //Force set value of Jack, Queen, King as 10
      if (cardName[j] === "Jack" || cardName[j] === "Queen" || cardName[j] === "King"){
        currentCard.value = 10
      }
      if(cardName[j] === "Ace"){
        currentCard.value = 11
      }
      deck.push(currentCard);
    }
  }
}

//Shuffling deck function
var shuffleCards = function (shufflingDeck) {
  for (let i = shufflingDeck.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * shufflingDeck.length);
    let temp = shufflingDeck[i];
    shufflingDeck[i] = shufflingDeck[j];
    shufflingDeck[j] = temp;
  }
  return shufflingDeck;
};

//hit function for hit button
var hitFunction = function(){
  let newCard = deck.pop();
  console.log(newCard)
  players[currentPlayer].hand.push(newCard);
  return `New card is:  ${newCard.name} of ${newCard.suit}`
}

//Stand function
var stand = function(){
  currentPlayer++
}

//Update the current value of player hand
var updateValue = function(){
  for(let i = 0; i < players[currentPlayer].hand.length; i++){
    players[currentPlayer].value += players[currentPlayer].hand[i].value
  }
}

//Set game
var setGameState = function(playersNum){
  numOfplayer = playersNum
}

//Reset game
var resetGame = function(){
  var deck = [];
  var players = [];
  var numOfplayer = 0;
  var currentPlayer = 1;
  document.querySelector("#hit-button").style.visibility = "hidden";
  document.querySelector("#stand-button").style.visibility = "hidden";
  document.querySelector("#quit-button").style.visibility = "hidden";
  document.querySelector("#num-player").disabled = false;
  document.querySelector("#start-button").disabled = false;
}
