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
var numOfplayers = 0
var currentPlayer = 0
var dealeroutput
var currentPlayerOutput
//constructor function for cards
function Card(cardname, logo, number){
  this.name = cardname;
  this.suit = logo;
  this.value = number
} 
//constructor function for player
function Player(playerName, balance){
  this.name = playerName
  this.bank = balance
  this.hand = []
  this.wager = 0
  this.handValue = 0
  this.winState = "unknown"
}
//HTML settings
document.querySelector("#hit-button").disabled = true;
document.querySelector("#stand-button").disabled = true;
document.querySelector("#quit-button").disabled = true;
document.querySelector("#next-button").disabled = true;
document.querySelector("#num-player").disabled = false;
document.querySelector("#start-button").disabled = false;
document.querySelector("#continue-button").style.visibility = "hidden";

var main = function (input) {
  var myOutputValue = 'start';
  return myOutputValue;
};

//Start game
var gameStart = function(){
  makeDeck()
  deck = [...shuffleCards(deck)]
  //Initailise players
  for(let i = 1; i <= numOfplayers; i++){
    let userName
    do{
     userName = prompt(`Player ${i}, what is your name?`, "")
    }while(userName === "")
    players.push(new Player(userName, 100))
  }
  //Create dealer object, push it to first element in players array
  var dealer = new Player("Dealer", 0)
  players.unshift(dealer)
  //Dealing of cards
  for(let i = 0; i < 2; i++){
    for(let j = players.length; j > 0; j--) {
      players[j - 1].hand.push(deck.pop());
      updateValue(players[j - 1].hand, j - 1);
    }
  }
  return `Game has been set-up.  Player 1, press Next to continue`
}

//Mid-game
var midgame = function(){
  let output
  //dealer's turn when currentPlayer > numOfplayers
  if(currentPlayer > numOfplayers){
    output = endgame()
    console.log(output)
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#stand-button").disabled = true;
    document.querySelector("#continue-button").style.visibility = "visible";
    return output
  }
  dealeroutput = `The dealer cards:<br>??? of ???<br>${players[0].hand[1].name} of ${players[0].hand[1].suit}<br><br>`;
  currentPlayerOutput = `Player ${currentPlayer}'s cards:<br>`
  for(let i = 0; i < players[currentPlayer].hand.length; i++){
    currentPlayerOutput += `${players[currentPlayer].hand[i].name} of ${players[currentPlayer].hand[i].suit}<br>`;
  }
  if (players[currentPlayer].handValue > 21)
    aceManipulator(players[currentPlayer].hand, currentPlayer);
  currentPlayerOutput += `<br>Player ${currentPlayer}'s card value is: ${players[currentPlayer].handValue}`;
  //Check for bust
  if (players[currentPlayer].handValue > 21){
    document.querySelector("#stand-button").disabled = true;
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#next-button").disabled = false;
    players[currentPlayer].winState = "bust"
    players[currentPlayer].handValue = 0
    if(currentPlayer == numOfplayers){
      output = dealeroutput + currentPlayerOutput + `<br><br>You have bust! It is the dealer's turn next. Press next to continue`;
    }
    else{
     output = dealeroutput + currentPlayerOutput + `<br><br>You have bust! Player ${currentPlayer + 1}, press next to continue`;
    }
  }
  else{
     output = dealeroutput + currentPlayerOutput + "<br><br>Do you want to hit or stand";
  }
  return output
}

//We are in the endgame
//jk. this is the endgame function, consisting of drawing of dealer's hand and determining win, lose and draw condition.
//It also make dealer do a soft 17 and reveal cards
var endgame = function(){
  let output = `The dealer has drawn:<br>`
  //Dealer drawing
  while(players[0].handValue <= 16){
    players[0].hand.push(deck.pop());
    //Update Card Values
    updateValue(players[0].hand, 0)
    //break the loop if it is within 17 and 21
    if(players[0].handValue >= 17 && players[0].handValue <= 21){
      break;
    }else if(players[0].handValue > 21){
      aceManipulator(players[0].hand, 0)
    }
  }
  for(let i = 0; i < players[0].hand.length;i++){
    output += `<br>${players[0].hand[i].name} of ${players[0].hand[i].suit}`;
  }
  output += `<br><br>Card Value: ${players[0].handValue}<br>`;
  //Check if dealer bust
  if(players[0].handValue > 21){
    players[0].winState = "bust"
    players[0].handValue = 0
  }
  //Deal win, lose, draw condition to player
  if(players[0].winState == "bust"){ //If dealer bust -> check if player did not bust
    output += "<br>The dealer has busted!<br>"
    output += winlosedraw()
  } // else if dealer did not bust, compare the handvalue to determine "win", "lose", "draw" condition
  else if(players[0].winState == "unknown"){
    output += winlosedraw()
  }
  return output
  }

var winlosedraw = function(){
  let output = ""
  for (let i = 1; i < players.length; i++) {
      if(players[i].handValue > players[0].handValue) {
        players[i].winState = "win";
        output += `<br>Player ${i} has won!`;
      } 
      else if(players[i].handValue < players[0].handValue){
        players[i].winState = "lose"
        output += `<br>Player ${i} has lost!`
      }
      else if(players[i].handValue == players[0].handValue) {
        players[i].winState = "draw";
        output += `<br>Player ${i} draw with the dealer!`;
      }
  }
  return output
}
//Ace value manipulator
var aceManipulator = function(currentPlayerHand, playerNum){
  let index = currentPlayerHand.findIndex(element => element.name === "Ace" && element.value > 1)
  //if index is found (value of index >= 0) manipulate the value, if index not found (value of index = -1), ignore
  if(index >= 0){
    players[playerNum].hand[index].value = 1;
    updateValue(currentPlayerHand, playerNum);
    //If still burst, do a recursion, else ignore
    if (players[playerNum].handValue > 21) {
      aceManipulator(currentPlayerHand, playerNum);
    }
  }
}

//hit function for hit button
var hitFunction = function(){
  let newCard = deck.pop();
  players[currentPlayer].hand.push(newCard);
  updateValue(players[currentPlayer].hand, currentPlayer);
}

//Set game
var setGameState = function(playersNum){
  numOfplayers = playersNum
}

//Stand function
//Once stand is choosen,, disable stand button and enable Next
var standButton = function(){
  let output
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#next-button").disabled = false;
  if(currentPlayer == numOfplayers){
   output = `Player ${currentPlayer} has stand.<br>It is Dealer's turn. Please press next to continue.`;
  }
  else{
   output = `Player ${currentPlayer} has stand.<br>Player ${currentPlayer + 1}, please press next to start your turn.`
  }
  return output
}

//Function for next button
var nextPlayer = function(){
  document.querySelector("#hit-button").disabled = false;
  document.querySelector("#stand-button").disabled = false;
  document.querySelector("#quit-button").disabled = false;
  document.querySelector("#next-button").disabled = true;
  currentPlayer++
  if(currentPlayer > numOfplayers){
    endgame()
  }
}

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

//Update the current value of player hand
var updateValue = function(currentHand, currentplayer){
  let cardValue = 0;
  for(let i = 0; i < currentHand.length; i++){
    cardValue += players[currentplayer].hand[i].value;
  }
  players[currentplayer].handValue = cardValue
}

//Reset game
var resetGame = function(){
  deck = [];
  players = [];
  numOfplayer = 0;
  currentPlayer = 0;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#quit-button").disabled = true;
  document.querySelector("#next-button").disabled = true;
  document.querySelector("#num-player").disabled = false;
  document.querySelector("#start-button").disabled = false;
  document.querySelector("#continue-button").style.visibility = "hidden";
}

//continue
var contButton = function(){
  makeDeck();
  deck = [...shuffleCards(deck)];
  currentPlayer = 0;
  for (let i = 0; i < players.length; i++) {
    players[i].hand = [];
    players[i].handValue = 0;
    players[i].winState = "unknown";
  }
  //Dealing of cards
  for (let i = 0; i < 2; i++){
    for (let j = players.length; j > 0; j--) {
      players[j - 1].hand.push(deck.pop());
      updateValue(players[j - 1].hand, j - 1);
    }
  }
  document.querySelector("#continue-button").style.visibility = "hidden";
  document.querySelector("#next-button").disabled = false;
  return "Game reset. Player 1, please click next to play again"
}