/*
1. deck shuffled
2. click Submit -> deal cards
3. cards are analysed for winning conditions
4. cards are displayed to user
5. user decides whether to hit or stand 
  - use Submit button to choose
6. user's cards analysed for winning/losing conditions
7. computer decides to hit or stand based on rules
8. games ends or continues 

*/

// FUNCTIONS

var makeDeck = function() {
  var cardDeck = [];
  var suits = [`♥️`, `♦️`, `♣️`, `♠️`]; // 0, 1, 2, 3
  var suitIndex = 0;
  while (suitIndex < suits.length) { // always true until 3 since 0 < 4
    var currentSuit = suits[suitIndex]; // suits[0]
    var rankCounter = 1;
    while (rankCounter <= 13) { // 13 times since rankCounter begins at 1
      var cardName = rankCounter; // var cardName
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = '💂';
      } else if (cardName == 12) {
        cardName = '👸';
      } else if (cardName == 13) {
        cardName = '🤴';
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


var getRandomIndex = function(max) {
  return Math.floor(Math.random() * max);
};


var shuffleCards = function(cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) { // 0 to 52
    var randomIndex = getRandomIndex(cardDeck.length); // randomize
    var randomCard = cardDeck[randomIndex]; // e.g. randomCard = cardDeck[33] at random
    var currentCard = cardDeck[currentIndex]; // e.g. currentCard = cardDeck[0] 0-52 +1
    cardDeck[currentIndex] = randomCard; // e.g. cardDeck[0] = randomCard
    cardDeck[randomIndex] = currentCard; // e.g. cardDeck[33] = currentCard
    currentIndex = currentIndex + 1; // 52 times
  }
  return cardDeck;
};


// GLOVAL VARIABLES

var output = [];
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var playerCardList = [];
var myOutputValue = ``;


// MAIN FUNCTION 1

/*
var main = function(input){
  var computerCard = shuffledDeck.pop();
  var computerCard2 = shuffledDeck.pop();
  var computerCardFullName = `${computerCard.name} of ${computerCard.suit}`;
  var computerCardFullName2 = `${computerCard2.name} of ${computerCard2.suit}`;
  var computerCards = `${computerCardFullName} and ${computerCardFullName2}`;
  var playerCard = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();
  var playerCardFullName = `${playerCard.name} of ${playerCard.suit}`;
  var playerCardFullName2 = `${playerCard2.name} of ${playerCard2.suit}`;
  var playerCards = `${playerCardFullName} and ${playerCardFullName2}`;
  
  output = `computer card is ${computerCards} <br><br> player card is ${playerCards}`;
  return output;
}
*/
// MAIN FUNCTION 1.2
// TRY
/*
1. deck shuffled
2. click Submit -> deal cards
3. cards are analysed for winning conditions
4. cards are displayed to user
5. user decides whether to hit or stand 
  - use Submit button to choose
6. user's cards analysed for winning/losing conditions
7. computer decides to hit or stand based on rules
8. games ends or continues
*/

/*
var gameMode = `first`;
var user = [];

function main(input) {
  if (gameMode == `first`) {
    user.push(input);
    userName = user[0];
    gameMode = `second`; 
    output = `welcome ${userName} to blackjack, please click Submit to begin the game`;
  }
  if (gameMode == `second` && userName == user[0]) {
    var playerCard = shuffledDeck.pop();
    var playerCard2 = shuffledDeck.pop();
    var playerCardFullName = `${playerCard.name} of ${playerCard.suit}`;
    var playerCardFullName2 = `${playerCard2.name} of ${playerCard2.suit}`;
    var playerCards = `${playerCardFullName} and ${playerCardFullName2}`;
    var playerPoints = `${playerCard.rank} + ${playerCard2.rank}`
    var bankerCard = shuffledDeck.pop();
    var bankerCard2 = shuffledDeck.pop();
    var bankerCardFullName = `${bankerCard.name} of ${bankerCard.suit}`;
    var bankerCardFullName2 = `${bankerCard2.name} of ${bankerCard2.suit}`;
    var bankerCards = `${bankerCardFullName} and ${bankerCardFullName2}`;
    var bankerPoints = `${bankerCard.rank} + ${bankerCard2.rank}`
    output = `banker has ${bankerCards} which are ${bankerPoints} <br><br> ${userName} has ${playerCards} which are ${playerPoints}`;
  }
  return output
}
*/

// really try

let mode = `first`;
let player = ``;
let playerCard1 = ``;
let playerCard2 = ``;
let playerCard3 = ``;
let playerCard4 = ``;
let playerCard5 = ``;
let playerCards = ``;
let playerCardsRank = ``;
let bankerCard1 = ``;
let bankerCard2 = ``;
let bankerCard3 = ``;
let bankerCard4 = ``;
let bankerCard5 = ``;
let bankerCards = ``;
let bankerCardsRank = ``;
let bankerCard1show = ``;
let bankerCard1Rank = ``;


function main(input) {
  if (mode == `first`){
  mode = `second`;
  output = `hi, what is your name?`;
  return output
  }
  if (mode == `second`) {
  player = input;
  mode = `third`;
  output = `welcome to blackjack 🃏${player}🃏!
  <br><br> click Submit to draw your cards & view the first card of the banker's`;
  return output;
  }
  if (mode == `third`) {
    mode = `fourth`;
    playerCard1 = shuffledDeck.pop();
    playerCard2 = shuffledDeck.pop();
    playerCards = `${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}`;
    bankerCard1 = shuffledDeck.pop();
    bankerCard2 = shuffledDeck.pop();
    bankerCards = `${bankerCard1.name} of ${bankerCard1.suit} <br> ${bankerCard2.name} of ${bankerCard2.suit}`;
    if (playerCard1.name == `ace` && playerCard2.name == `ace`
    || playerCard1.name == `ace` && playerCard2.name == `🤴`
    || playerCard1.name == `ace` && playerCard2.name == `👸`
    || playerCard1.name == `ace` && playerCard2.name == `💂`
    || playerCard1.name == `ace` && playerCard2.name == 10
    || playerCard2.name == `ace` && playerCard1.name == `🤴`
    || playerCard2.name == `ace` && playerCard1.name == `👸`
    || playerCard2.name == `ace` && playerCard1.name == `💂`
    || playerCard2.name == `ace` && playerCard1.name == 10) {
      mode == `second`;
      output = `🃏${player}🃏 got blackjack with:<br> ${playerCards}!!<br><br> 🎉🥳🍾🎁🎈🎊👯‍♀️👯‍♀️🎊🎈🎁🍾🥳🎉 <br> 🃏${player}🃏 won!`;
      return output
    }
    if (bankerCard1.name == `ace` && bankerCard2.name == `ace`
    || bankerCard1.name == `ace` && bankerCard2.name == `🤴`
    || bankerCard1.name == `ace` && bankerCard2.name == `👸`
    || bankerCard1.name == `ace` && bankerCard2.name == `💂`
    || bankerCard1.name == `ace` && bankerCard2.name == 10
    || bankerCard2.name == `ace` && bankerCard1.name == `🤴`
    || bankerCard2.name == `ace` && bankerCard1.name == `👸`
    || bankerCard2.name == `ace` && bankerCard1.name == `💂`
    || bankerCard2.name == `ace` && bankerCard1.name == 10) {
      mode == `second`;
      output = `banker got blackjack with:<br> ${bankerCards}!!<br><br> 😴😪🥱 <br> banker won!`;
      return output
    }
    bankerCard1show = `${bankerCard1.name} of ${bankerCard1.suit}`;
    if (playerCard1.rank > 10){
      playerCard1.rank = 10;
    }
    if (playerCard2.rank > 10){
      playerCard2.rank = 10;
    }
    if (bankerCard1.rank > 10){
      bankerCard1.rank = 10;
    }
    if (bankerCard2.rank > 10){
      bankerCard2.rank = 10;
    }
    if (playerCard1.name == 'ace') {
      playerCard1.rank = 11; 
    }
    if (playerCard2.name == 'ace') {
      playerCard2.rank = 11;
    }
    if (bankerCard1.name == 'ace') {
      bankerCard1.rank = 11; 
    }
    if (bankerCard2.name == 'ace') {
      bankerCard2.rank = 11; 
    }
    playerCardsRank = Number(playerCard1.rank) + Number(playerCard2.rank);
    bankerCard1Rank = Number(bankerCard1.rank);
    output = `banker first (opened) card is:<br> ${bankerCard1show}<br>=> ${bankerCard1Rank} points
    <br><br> 🃏${player}🃏 drew: <br> ${playerCards}<br>=> ${playerCardsRank} points
    <br><br> please enter <br> --> "hit" to draw cards <br>OR <br> --> "stand" to open banker's cards and end game`;
    return output;
  }
  if (mode == `fourth` && input == 'stand' || mode == `fifth` && input == 'stand' || mode == `sixth` && input == 'stand') {
    mode = `end1`;
    bankerCardsRank = Number(bankerCard1.rank) + Number(bankerCard2.rank);
    console.log*(bankerCardsRank);
    if (bankerCardsRank < 17) {
      mode = `end1`;
      bankerCard3 = shuffledDeck.pop();
      bankerCards = `${bankerCards} <br> ${bankerCard3.name} of ${bankerCard3.suit}`;
      if (bankerCard3.rank > 10) {
        bankerCard3.rank = 10;
      }
      if (bankerCard3.name == 'ace') {
        bankerCard3.rank = 1, 10; 
      }
      bankerCardsRank = bankerCardsRank + Number(bankerCard3.rank);
      console.log(bankerCard3.rank);
      output = `banker now has: <br>${bankerCards}<br>=> ${bankerCardsRank} points
      <br><br> 🃏${player}🃏 has: <br>${playerCards}<br>=> ${playerCardsRank} points`;
      console.log(bankerCards);
      console.log(bankerCardsRank);
      if (bankerCardsRank < 17) {
        mode = `end1`;
        bankerCard4 = shuffledDeck.pop();
        bankerCards = `${bankerCards} <br> ${bankerCard4.name} of ${bankerCard4.suit}`;
        if (bankerCard4.rank > 10){
          bankerCard4.rank = 10;
        }
        bankerCardsRank = bankerCardsRank + Number(bankerCard4.rank);
        console.log(bankerCard4.rank);
        output = `banker now has: <br>${bankerCards}<br>=> ${bankerCardsRank} points
        <br><br> 🃏${player}🃏 has: <br>${playerCards}<br>=> ${playerCardsRank} points`; 
        console.log(bankerCards);
        console.log(bankerCardsRank);
        if (bankerCardsRank < 17) {
          mode = `end1`;
          bankerCard5 = shuffledDeck.pop();
          bankerCards = `${bankerCards} <br> ${bankerCard5.name} of ${bankerCard5.suit}`;
          if (bankerCard5.rank > 10) {
            bankerCard5.rank = 10;
          }
          bankerCardsRank = bankerCardsRank + Number(bankerCard5.rank);
          console.log(bankerCard5.rank);
          output = `banker now has: <br>${bankerCards}<br>=> ${bankerCardsRank} points
          <br><br> 🃏${player}🃏 has: <br>${playerCards}<br>=> ${playerCardsRank} points`;
          console.log(bankerCards);
          console.log(bankerCardsRank);
        }
      }
      output = `${output} <br><br>---banker has continued to draw until banker has 17 or more points---
      <br><br> click Submit to see who won`
      return output;  
    }
  }
  if (mode == `end1` && bankerCardsRank >= 17) { 
    if (bankerCardsRank > playerCardsRank && bankerCardsRank < 22) {
      mode = `third`;
      output = `banker has: <br>${bankerCards}<br>=> ${bankerCardsRank} points
      <br><br> 🃏${player}🃏 has: <br>${playerCards}<br>=> ${playerCardsRank} points
      <br><br> ---------------😴😪🥱 banker won! 🥱😪😴---------------`;
    } else if (bankerCardsRank > playerCardsRank && bankerCardsRank >= 22 && playerCardsRank < 22) {
      mode = `third`;
      output = `banker has: <br> ${bankerCards}<br>=> ${bankerCardsRank} points
      <br><br> 🃏${player}🃏 has: <br>${playerCards}<br>=> ${playerCardsRank} points
      <br><br> ---------------🎉🎉🎉 🃏${player}🃏 won! 🎉🎉🎉---------------`;
    } else if (bankerCardsRank < playerCardsRank && playerCardsRank < 22) {
      mode = `third`;
      output = `banker has: <br> ${bankerCards}<br>=> ${bankerCardsRank} points
      <br><br> 🃏${player}🃏 has: <br>${playerCards}<br>=> ${playerCardsRank} points
      <br><br> ---------------🎉🎉🎉 🃏${player}🃏 won! 🎉🎉🎉---------------`;
    } else if (bankerCardsRank < playerCardsRank && playerCardsRank >= 22 && bankerCardsRank < 22) {
      mode = `third`;
      output = `banker has: <br>${bankerCards}<br>=> ${bankerCardsRank} points
      <br><br> 🃏${player}🃏 has: <br>${playerCards}<br>=> ${playerCardsRank} points
      <br><br> ---------------😴😪🥱 banker won! 🥱😪😴---------------`;
    } else if (bankerCardsRank == playerCardsRank) {
      mode = `third`;
      output = `banker has: <br>${bankerCards}<br>=> ${bankerCardsRank} points
      <br><br> 🃏${player}🃏 has: <br>${playerCards}<br>=> ${playerCardsRank} points
      <br><br> ---------------🤷 it's a draw! 🤷---------------`;
    } else if (bankerCardsRank >= 22 && playerCardsRank >= 22) {
      mode = `third`;
      output = `banker has: <br>${bankerCards}<br>=> ${bankerCardsRank} points
      <br><br> 🃏${player}🃏 has: <br>${playerCards}<br>=> ${playerCardsRank} points
      <br><br> ---------------🤷🤷 both burst, both lost! 🤷🤷---------------`;
    }
  output = `${output} <br><br> --> refresh to play again 
  <br> --> or Submit to draw new cards with the same player 😁`
  return output
  }
  if (mode == `fourth` && input == 'hit') {
    mode = `fifth`;
    playerCard3 = shuffledDeck.pop();
    playerCards = `${playerCards} <br> ${playerCard3.name} of ${playerCard3.suit}`;
    if (playerCard3.rank > 10){
      playerCard3.rank = 10;
    }
    if (playerCard3.name == 'ace') {
      playerCard3.rank = 1, 10; 
    }
    playerCardsRank = playerCardsRank + Number(playerCard3.rank);
    output = `banker has: <br>${bankerCard1show}<br>=> ${bankerCard1Rank} points
    <br><br> 🃏${player}🃏 has: <br>${playerCards}<br>=> ${playerCardsRank} points
    <br><br> please enter hit to draw cards OR stand to open banker's cards and end game`;
    return output;
  }
  if (mode == `fifth` && input == 'hit') {
    mode = `sixth`;
    playerCard4 = shuffledDeck.pop();
    playerCards = `${playerCards} <br> ${playerCard4.name} of ${playerCard4.suit}`;
    if (playerCard4.rank > 10){
      playerCard4.rank = 10;
    }
    playerCardsRank = playerCardsRank + Number(playerCard4.rank);
    output = `banker has: <br>${bankerCard1show}<br>=> ${bankerCard1Rank} points
    <br><br> 🃏${player}🃏 has: <br>${playerCards}<br>=> ${playerCardsRank} points
    <br><br> please enter hit to draw cards OR stand to open banker's cards and end game`;
    return output;
  }
  if (mode == `sixth` && input == 'hit') {
    mode = `end1`;
    playerCard5 = shuffledDeck.pop();
    playerCards = `${playerCards} <br> ${playerCard5.name} of ${playerCard5.suit}`;
    if (playerCard5.rank > 10){
      playerCard5.rank = 10;
    }
    playerCardsRank = playerCardsRank + Number(playerCard5.rank);
    output = `banker has: <br>${bankerCard1show}<br>=> ${bankerCard1Rank} points
    <br><br> 🃏${player}🃏 has: <br>${playerCards}<br>=> ${playerCardsRank} points
    <br><br> please enter stand to open banker's cards and end game`;
    return output;
  }
};