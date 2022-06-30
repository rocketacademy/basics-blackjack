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

var deck = [];
var players = [];
const suit = ["Hearts", "Diamonds", "Clubs", "Spades"];
const cardName = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];
var numOfplayers = 0;
var currentPlayer = 0;
var dealeroutput;
var currentPlayerOutput;
//constructor function for cards
function Card(cardname, logo, number, cardImage) {
  this.name = cardname;
  this.suit = logo;
  this.value = number;
  this.image = cardImage;
}
//constructor function for player
function Player(playerName, balance, bet) {
  this.name = playerName;
  this.bank = balance;
  this.hand = [];
  this.wager = bet;
  this.handValue = 0;
}

//HTML settings

document.querySelector("#hit-button").style.visibility = "hidden";
document.querySelector("#stand-button").style.visibility = "hidden";
document.querySelector("#quit-button").style.visibility = "hidden";
document.querySelector("#next-button").style.visibility = "hidden";
document.querySelector("#continue-button").style.visibility = "hidden";
document.querySelector("#num-player").disabled = false;
document.querySelector("#start-button").disabled = false;

//Start game(set up function)
//consist of generating players andd dealer and dealing their cards
var gameStart = function () {
  makeDeck();
  deck = [...shuffleCards(deck)];

  //Initailise players array
  for (let i = 1; i <= numOfplayers; i++) {
    let userName;
    let amtBet;
    do {
      userName = prompt(`Player ${i}, what is your name?`, "");
    } while (userName === "");
    do {
      amtBet = Number(
        prompt(
          `${userName}, how much to you want to wager?\nYou currently have ${100}.`,
          ""
        )
      );
    } while (Number.isInteger(amtBet) == false || amtBet > 100);
    players.push(new Player(userName, 100, amtBet));
  }

  //Create dealer object, push it to first element in players array
  //We want to set the dealer as the first element, so it is easily referenced -> players[0] is dealer
  var dealer = new Player("Dealer", 0, 0);
  players.unshift(dealer);

  //Dealing of cards
  for (let i = 0; i < 2; i++) {
    for (let j = players.length; j > 0; j--) {
      players[j - 1].hand.push(deck.pop());
      updateValue(players[j - 1].hand, j - 1);
    }
  }
  return `Game has been set-up.  ${players[1].name}, press Next to continue`;
};

//Mid-game
// Consists of allowing user to hit/stand. Next button serve as continuation
var midgame = function () {
  let output;
  //dealer's turn when currentPlayer > numOfplayers -> go to endgame()
  if (currentPlayer > numOfplayers) {
    output = endgame();
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#stand-button").disabled = true;
    document.querySelector("#continue-button").style.visibility = "visible";
    document.querySelector("#continue-button").disabled = false
    return output;
  }

  dealeroutput = `The dealer cards:<br><img src = "./assets/backcard.png"/><img src = "${players[0].hand[1].image}"/><br><br>`;
  currentPlayerOutput = `Player ${currentPlayer}'s cards:<br>`;
  for (let i = 0; i < players[currentPlayer].hand.length; i++) {
    currentPlayerOutput += `<img src = "${players[currentPlayer].hand[i].image}"/>`;
  }

  //Manipulate cards if there is ace in the hands
  if (players[currentPlayer].handValue > 21) {
    aceManipulator(players[currentPlayer].hand, currentPlayer);
  }

  currentPlayerOutput += `<br>Player ${currentPlayer}'s card value is: ${players[currentPlayer].handValue}`;

  //output-div ouput
  output = dealeroutput + currentPlayerOutput;

  //Check for bust
  let displaytext = document.querySelector("#display-text");
  if (players[currentPlayer].handValue > 21) {
    document.querySelector("#stand-button").disabled = true;
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#next-button").disabled = false;
    players[currentPlayer].handValue = 0;

    //for formatting, easier transition to endgame when next player is dealer
    if (currentPlayer == numOfplayers) {
      displaytext.innerHTML = `You have bust! It is the dealer's turn next. Press next to continue`;
    } 
    else {
      //else continue if there are players left
      displaytext.innerHTML = `You have bust! Player ${currentPlayer + 1}, press next to continue`;
    }
    cardStorage(players[currentPlayer].hand, currentPlayer);
  } 
  //player has blackjack
  else if(hasBlackjack(players[currentPlayer].hand, currentPlayer) && players[currentPlayer].hand.length === 2){
    document.querySelector("#stand-button").disabled = true;
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#next-button").disabled = false;
    if(currentPlayer == numOfplayers){
      displaytext.innerHTML = `Player ${currentPlayer} has blackjack!. It is Dealer's turn next! Press next to continue `;
    }
    else{
      displaytext.innerHTML = `Player ${currentPlayer} has blackjack!. It is Player ${
        currentPlayer + 1
      } turn! Press next to continue `;
    }
  }
  //no bust or blackjack
  else{
    displaytext.innerHTML = "Do you want to hit or stand";
  }
  return output;
};

//We are in the endgame
//jk. this is the endgame function, consisting of drawing of dealer's hand and determining win, lose and draw condition.
//It also make dealer do a soft 17 and reveal cards
var endgame = function () {
  let output = `The dealer has drawn:<br>`;
  //Dealer drawing
  while (players[0].handValue <= 16) {
    players[0].hand.push(deck.pop());

    //Update Card Values
    updateValue(players[0].hand, 0);

    //break the loop if it is within 17 and 21
    if (players[0].handValue > 21) 
      aceManipulator(players[0].hand, 0);
  }

  for (let i = 0; i < players[0].hand.length; i++) {
    output += `<img src = "${players[0].hand[i].image}"/>`;
  }
  output += `<br><br>Card Value: ${players[0].handValue}<br>`;

  //Check if dealer bust, handvalue = 0 means bust
  if (players[0].handValue > 21) {
    players[0].handValue = 0;
  }
  let displayText = document.querySelector("#display-text");
  let text = "";
  if (hasBlackjack(players[0].hand, 0)) {
    text += "The dealer has blackjack! Game Over!";
    players[0].handValue = 100;
  }
  //Deal win, lose, draw condition to player
  if (players[0].handValue == 0) {
      //If dealer bust -> check if player did not bust
      text += "The dealer has busted! Game Over!";
      winlosedraw()
      displayText.innerHTML = text;
  }

  // else if dealer did not bust, compare the handvalue to determine "win", "lose", "draw" condition
  else if (players[0].handValue > 0 && players[0].handValue != 100) {
    text += "Game Over!"
    winlosedraw();
    displayText.innerHTML = text;
  }

  return output;
};

//determine win lose or draw
var winlosedraw = function () {
  for (let i = 1; i < players.length; i++) {
    if (players[i].handValue > players[0].handValue) {
      console.log(
        `Player ${i} Bank: ${players[i].bank} Bet: ${players[i].wager}`
      );
      players[i].bank += players[i].wager;
      players[i].wager = 0;
      console.log(
        `Player ${i} Bank: ${players[i].bank} Bet: ${players[i].wager}`
      );
      let output = document.querySelector(`#player-${i}`);
      let win = document.createElement('div')
      win.id = "WLD"
      win.innerText = "WIN!"
      output.appendChild(win)
    } else if (players[i].handValue < players[0].handValue) {
      players[i].bank -= players[i].wager;
      players[i].wager = 0;
      let output = document.querySelector(`#player-${i}`);
      let lose = document.createElement("div");
      lose.id = "WLD";
      lose.innerText = "LOSE";
      output.appendChild(lose);
    } else if (players[i].handValue == players[0].handValue) {
      players[i].wager = 0;
      let output = document.querySelector(`#player-${i}`);
      let draw = document.createElement("div");
      draw.id = "WLD";
      draw.innerText = "DRAW";
      output.appendChild(draw);
    }
  }
};

//Ace value manipulator
var aceManipulator = function (currentPlayerHand, playerNum) {
  let index = currentPlayerHand.findIndex(
    (element) => element.name === "Ace" && element.value > 1
  ); // ace card finder

  //if index is found (value of index >= 0) manipulate the value, if index not found (value of index = -1), ignore
  if (index >= 0) {
    players[playerNum].hand[index].value = 1;
    updateValue(currentPlayerHand, playerNum);

    //If still burst, do a recursion, else ignore
    if (players[playerNum].handValue > 21) {
      aceManipulator(currentPlayerHand, playerNum);
    }
  }
};

//hit function for hit button
var hitFunction = function () {
  let newCard = deck.pop();
  players[currentPlayer].hand.push(newCard);
  updateValue(players[currentPlayer].hand, currentPlayer);
};

//Set game
var setGameState = function (playersNum) {
  numOfplayers = playersNum;
};

//Stand function
//Once stand is choosen,, disable stand button and enable Next
var standButton = function () {
  let output;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#next-button").disabled = false;
  if (currentPlayer == numOfplayers) {
    output = `Player ${currentPlayer} has stand.<br>It is Dealer's turn. Please press next to continue.`;
  } else {
    output = `Player ${currentPlayer} has stand.<br>Player ${
      currentPlayer + 1
    }, please press next to start your turn.`;
  }
  cardStorage(players[currentPlayer].hand, currentPlayer);
  return output;
};

//Function for next button
var nextPlayer = function () {
  document.querySelector("#hit-button").disabled = false;
  document.querySelector("#stand-button").disabled = false;
  document.querySelector("#quit-button").disabled = false;
  document.querySelector("#next-button").disabled = true;
  currentPlayer++;
};

//Make deck
var makeDeck = function () {
  for (let i = 0; i < suit.length; i++) {
    for (let j = 0; j < cardName.length; j++) {
      let cardtype = cardName[j];
      let cardsuit = suit[i];
      let cardImage = "./assets/" + cardtype + "Of" + cardsuit + ".png";
      let currentCard = new Card(cardName[j], suit[i], j + 1, cardImage);

      //Force set value of Jack, Queen, King as 10 and Ace as 11
      if (
        cardName[j] === "Jack" ||
        cardName[j] === "Queen" ||
        cardName[j] === "King"
      ) {
        currentCard.value = 10;
      }
      if (cardName[j] === "Ace") {
        currentCard.value = 11;
      }
      deck.push(currentCard);
    }
  }
};

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
var updateValue = function (currentHand, currentplayer) {
  let cardValue = 0;
  for (let i = 0; i < currentHand.length; i++) {
    cardValue += players[currentplayer].hand[i].value;
  }
  players[currentplayer].handValue = cardValue;
};

var setUP = function () {
  var element = document.getElementById("inputs");
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
  document.querySelector("#hit-button").style.visibility = "visible";
  document.querySelector("#stand-button").style.visibility = "visible";
  document.querySelector("#quit-button").style.visibility = "visible";
  document.querySelector("#next-button").style.visibility = "visible";
};

//Reset game -> full reset
var resetGame = function () {
  deck = [];
  players = [];
  currentPlayer = 0;
  document.querySelector("#hit-button").style.visibility = "hidden";
  document.querySelector("#stand-button").style.visibility = "hidden";
  document.querySelector("#quit-button").style.visibility = "hidden";
  document.querySelector("#next-button").style.visibility = "hidden";
  document.querySelector("#continue-button").style.visibility = "hidden";
  let input = document.querySelector("#inputs");
  input.innerHTML = `<p style = "display: inline;">Number of players:</p> 
               <input id = "num-player" 
                type="number"
                min="1"
                max="6"
                value="1"
                onkeydown="return false"
               />
               <button id = "start-button">Start</button>`;
  let output = document.querySelector("#output-div");
  output.innerHTML = "";
  for(let i = 1; i <= numOfplayers; i++){
    let divRemover = document.querySelector(`#player-${i}`);
    divRemover.remove();
  }
  numOfplayer = 0;
};

//continue -> soft reset
var continueButton = function () {
  makeDeck();
  deck = [...shuffleCards(deck)];
  currentPlayer = 0;
  //reset player's div output
   for (let i = 1; i <= numOfplayers; i++) {
     let outputRemover = document.querySelector(`#player-${i}-output`);
     let playercardvalue = document.querySelector(`#classValue-player${i}`);
     outputRemover.innerHTML = ""
     playercardvalue.innerHTML = ""
   }
  let outputDiv = document.querySelector("#output-div");
  outputDiv.innerHTML = ""
  //reset display output div
  document.querySelectorAll("#WLD").forEach((e) => e.remove());
  for (let i = 0; i < players.length; i++) {
    players[i].hand = [];
    players[i].handValue = 0;
    let amtBet;
    if (i >= 1) {
      do {
        amtBet = Number(prompt (`Player ${i}, how much to you want to wager?\nYou currently have ${players[i].bank}.`, ""));
      } while (Number.isInteger(amtBet) == false || amtBet > players[i].bank);
    }
    players[i].wager = amtBet
  }
  //Dealing of cards
  for (let i = 0; i < 2; i++) {
    for (let j = players.length; j > 0; j--) {
      players[j - 1].hand.push(deck.pop());
      updateValue(players[j - 1].hand, j - 1);
    }
  }
  document.querySelector("#continue-button").style.visibility = "hidden";
  document.querySelector("#next-button").disabled = false;
  return "Game reset. Player 1, please click next to play again";
};

var createPlayerArea = function (num) {
  for (let i = 1; i <= num; i++) {
    if (i % 2 == 0) {
      var playerArea = document.querySelector(".even-player-area");
      var playersInfo = document.createElement("div");
      playersInfo.id = `player-${i}`;
      playersInfo.innerHTML = `<p style="margin: 0px;" id = "player-${i}-name">${players[i].name}</p><p style ="margin: 0px;"id = "classValue-player${i}"></p><output id = "player-${i}-output"></output>`;
      playerArea.appendChild(playersInfo);
    } else {
      var playerArea = document.querySelector(".odd-player-area");
      var playersInfo = document.createElement("div");
      playersInfo.id = `player-${i}`;
      playersInfo.innerHTML = `<p style="margin: 0px;" id = "player-${i}-name">${players[i].name}</p><p style ="margin: 0px;"id = "classValue-player${i}"></p><output id = "player-${i}-output"></output>`;
      playerArea.appendChild(playersInfo);
    }
  }
};

var cardStorage = function (playerhand, num) {
  //display card value and bet
  let playercardvalue = document.querySelector(`#classValue-player${num}`);
  let displayCardValue = `Card Value: ${players[num].handValue}&emsp;Bets: ${players[num].wager}`;
  playercardvalue.innerHTML = displayCardValue;
  //give the stored cards a class
  let output = "";
  for (let i = 0; i < playerhand.length; i++) {
    output += `<img class = "cardstorage" src = "${playerhand[i].image}"/>`;
  }
  var playerOutput = document.querySelector(`#player-${num}-output`);
  playerOutput.innerHTML = output;
};

var hasBlackjack = function (playerHand, num) {
  let index = playerHand.findIndex((element) => element.name === "Ace" ); // ace card finder
  if(index >= 0 && players[num].handValue === 21){
    return true
  }
  else{
    return false
  }
};