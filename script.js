// Black Jack rules:
// The player with 2 ace win
// The player with highest score but <= 21 wins
// Ace consider as 11 when there is only 2 cards
// Ace consider as 1 if there are more than 2 cards


// The game mode

var start_game = 'start game';
var hit_or_stand = 'hit or stand';
var gameMode = start_game;

// The players
var player = [];
var comp = [];

//Define var for player sum
var totalPlayerSum = Number();
var totalCompSum = Number();

//Define var for display
var playerDisplay = [];
var compDisplay = [];

var index = 0;

var main = function (input) {
  var myOutput;
  // When player click submit to start the game
  if (gameMode == start_game) {
  //console.log ('kk');
  //Assign cards to the players
  var playerCard = deck.pop();
  var compCard = deck.pop();
  // console.log(playerCard.rank);
  // console.log(compCard.rank);
  player.push(playerCard.rank);
  comp.push(compCard.rank);
  // console.log(`player array: ${player}`);
  // console.log(`comp array: ${comp}`);
  //Sum up both player card
  totalPlayerSum = sumCard (player);
  totalCompSum = sumCard (comp);
  // console.log (`total player sum ${totalPlayerSum}`);
  // console.log (`total comp sum: ${totalCompSum}`); 
  playerDisplay.push(playerCard.cardName);
  playerDisplay.push(playerCard.suit);
  // console.log(`player display ${playerDisplay}`);
  compDisplay.push(compCard.cardName);
  compDisplay.push(compCard.suit);
  // console.log(`comp display ${compDisplay}`);
  // console.log("index" + index);  }
  if (index == 0){
     myOutput = `Player cards: ${playerDisplay}<br>Player sum: ${totalPlayerSum}<br><br> Comp cards: ${compDisplay}<br> Comp sum: ${totalCompSum}<br><br> Please click submit again.`;
  }
  if (index == 1){
    gameMode = hit_or_stand;
      myOutput = `Player cards: ${playerDisplay}<br>Player sum: ${totalPlayerSum}<br><br> Comp cards: ${compDisplay}<br> Comp sum: ${totalCompSum}<br><br> Please enter 'hit' or 'stand'.`;
    //console.log(`hi`);
  }
  
  index = index + 1;
  return myOutput;
  }
  if (gameMode === hit_or_stand){
    //console.log('gg');
      
    if (input == 'hit'){
      //Assign cards to the players
      var playerCard = deck.pop();
      // console.log(playerCard.rank);
      player.push(playerCard.rank);
      // console.log(`player array: ${player}`);
      //Sum up both player card
      totalPlayerSum = sumCard(player);
      // console.log(`total player sum ${totalPlayerSum}`);
      playerDisplay.push(playerCard.cardName);
      playerDisplay.push(playerCard.suit);
      //console.log(`player display ${playerDisplay}`);
      // console.log("index" + index);
      //console.log(`hi`);
      //1.Comp have to hit if total sum is less than 17
    if (totalCompSum <'18' || totalCompSum < '22'){
      var compCard = deck.pop();
      comp.push(compCard.rank); totalCompSum = sumCard(comp);
      compDisplay.push(compCard.cardName);
      compDisplay.push(compCard.suit);
      if (totalCompSum == '21'){
        return `Player got ${totalPlayerSum}<br> Computer got ${totalCompSum}<br><br>Computer win!<br>Player Lose!<br><br>Please refresh the page to restart the game!`;
      } else{
      return `Player cards: ${playerDisplay}<br>Player sum: ${totalPlayerSum}<br><br> Comp cards: ${compDisplay}<br> Comp sum: ${totalCompSum}<br><br> Please enter 'hit' or 'stand'.`;
      }
      }
      // Condition in 'hit' mode:
        //1. If comp or player sum more than 21, input = 'stand'.
      // if (totalPlayerSum > '22' || totalCompSum > '22'){
        
      //   return `Player got ${totalPlayerSum}<br> Computer got ${totalCompSum}<br> Please enter 'stand`;
      // }
      gameMode == hit_or_stand;
      return `Player cards: ${playerDisplay}<br>Player sum: ${totalPlayerSum}<br><br> Comp cards: ${compDisplay}<br> Comp sum: ${totalCompSum}<br><br> Please enter 'hit' or 'stand'.`;
    }
  
    if (input == 'stand'){
      //console.log ('hihi');
      // Conditions where player sum less than 21
      // 1. player sum is more than comp sum, player win
      //2. Player got 21, player win
      //3. Comp sum more than 21, player win
      //4. player sum equal to comp sum, it's a tie.
      if (totalPlayerSum < "22") {
        if (
          totalPlayerSum == "21" ||
          totalPlayerSum > totalCompSum ||
          totalCompSum > "21"
        ) {
          //index == 0;
          //gameMode == start_game;
          return `Player got ${totalPlayerSum}<br> Computer got ${totalCompSum}<br><br>Player win!<br>Computer Lose!<br><br>Please refresh the page to restart the game!`;
        } else if (totalCompSum == totalPlayerSum) {
          //index == 0;
          //gameMode == start_game;
          return `Player got ${totalPlayerSum}<br> Computer got ${totalCompSum}<br> It's a tie!<br><br>Please refresh the page to restart the game!`;
        }
      }
      //index == 0;
      //gameMode === start_game;
      //Condition where computer sum is less than 21
      //1. Comp sum more than player sum, comp Win
      //2.comp got 21, comp win
      //3. Player sum more than 21, comp win
      //4. Player sum equal to comp sum, it's a tie
      if (totalCompSum < '22'){
        if (totalCompSum == '21' || totalCompSum > totalPlayerSum || totalPlayerSum > '21'){
          //index == 0;
          //gameMode == start_game;
          return `Player got ${totalPlayerSum}<br> Computer got ${totalCompSum}<br><br>Computer win!<br>Player Lose!<br><br>Please refresh the page to restart the game!`;
        }
        else if (totalCompSum == totalPlayerSum) {
          //index == 0;
          //gameMode == start_game;
          return `Player got ${totalPlayerSum}<br> Computer got ${totalCompSum}<br> It's a tie!<br><br>Please refresh the page to restart the game!`;
      }
    }
      if (totalCompSum > '21' && totalPlayerSum > '21'){
        return `Player got ${totalPlayerSum}<br> Computer got ${totalCompSum}<br> It's a tie!<br><br>Please refresh the page to restart the game!`;
      }
    return;
    //console.log (`bye`);
      //myOutput = `Player cards: ${playerDisplay}<br>Player sum: ${totalPlayerSum}<br><br> Comp cards: ${compDisplay}<br> Comp sum: ${totalCompSum}<br><br> Please enter 'hit' or 'stand'.`;
      //return `Please enter 'hit or 'stand`;
  }
  return;
  }
  //tried to make it a loop but does't work
  // index == 0;
  // gameMode === start_game;
  return;
};
  //prompt user to select hit or stand
  //condition to decide comp newed to draw card
  //return

//Generate a Deck function
// Includes card name 1-10, jack, queen, king 
// Include suits heart, diamond, club, and spade.
// Include rank 1-13
var cardDeck = function (){
  //var deck
  deck = [];
  var name = '';
  var suitIndex = 0;
  var suits = ['heart', 'diamond', 'spade', 'club'];
  while (suitIndex < 4){
  var currentSuit = suits[suitIndex];
  suitIndex += 1;
  console.log(`suit: ${suitIndex}`)

  var rankIndex = 1;
  while(rankIndex < 14){
    if (rankIndex == 1 ){
      name = 'ace';
    }else if (rankIndex == 11){
      name = 'jack';
    }else if (rankIndex == 12){
      name = 'queen';
    }else if (rankIndex == 13){
      name = 'king';
    }else {
      name = rankIndex;
    }
    var card = {
      rank: rankIndex,
      suit: currentSuit,
      cardName: name,
    };
    deck.push(card)
    console.log(deck);
    rankIndex += 1;
    console.log(`rank: ${rankIndex}`);
  }
}
return deck
}

//Generate a random Index first
var genRandomIndex = function (length) {
  var randomDecimal = Math.random() * length;
  var randomInterger = Math.floor(randomDecimal);
  return randomInterger;
};

// The shuffle card function
var shuffleCard = function(cards){
  var shuffleIndex = 0;
  while (shuffleIndex < cards.length){
    var randomIndex = genRandomIndex(cards.length);
    var randomCard = cards[randomIndex];
    var currentCard = cards[shuffleIndex];
    //swap the existing card with the random choosen card
    cards[shuffleIndex] = randomCard;
    cards[randomIndex] = currentCard;

    shuffleIndex += 1;
  }
return deck;
}

//redefine deck
var deck = shuffleCard(cardDeck());


//summarise card function
var sumCard = function (onHand){
  var totalVal = 0;
  var counter = 0
  var aceCounter = 0;
  while (counter < onHand.length){
     currCards = onHand[counter];
     if (currCards == 11 || currCards == 12 || currCards == 13){
       currCards = 10;
       
     }else if (currCards == 1 && aceCounter == 0){
       currCards = 11;
       aceCounter = aceCounter + 1;
     }else if (currCards == 1 && aceCounter == 1){
       currCards = 10;
     }
      else {
       totalVal = totalVal;
     }
     totalVal = totalVal + currCards;
    //  console.log ('total value ' + totalVal);
    //  console.log ('counter' + counter);
     counter = counter + 1;
  }

  return totalVal;
}
