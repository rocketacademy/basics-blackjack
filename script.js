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
  //Assign cards to the players
  var playerCard = deck.pop();
  var compCard = deck.pop();
  // console.log(playerCard.rank);
  // console.log(compCard.rank);
  player.push(playerCard.rank);
  comp.push(compCard.rank);
  console.log(`player array: ${player}`);
  console.log(`comp array: ${comp}`);
  //Sum up both player card
  totalPlayerSum = sumCard (player);
  totalCompSum = sumCard (comp);
  console.log (`total player sum ${totalPlayerSum}`);
  console.log (`total comp sum: ${totalCompSum}`); 
  playerDisplay.push(playerCard.cardName);
  playerDisplay.push(playerCard.suit);
  console.log(`player display ${playerDisplay}`);
  compDisplay.push(compCard.cardName);
  compDisplay.push(compCard.suit);
  console.log(`comp display ${compDisplay}`);
  console.log("index" + index);
  if (totalPlayerSum == '21'){
    return 'Player Win';
  }
  if (totalCompSum == '21'){
    return 'Comp Win';
  }
  if (index == 1){
    gameMode = hit_or_stand;
    //console.log(`hi`);
    return `Player cards: ${playerDisplay}<br>Player sum: ${totalPlayerSum}<br><br> Comp cards: ${compDisplay}<br> Comp sum: ${totalCompSum}<br><br> Please enter 'hit' or 'stand'`;
  }
  index = index + 1;
  myOutput = `Player cards: ${playerDisplay}<br>Player sum: ${totalPlayerSum}<br><br> Comp cards: ${compDisplay}<br> Comp sum: ${totalCompSum}<br><br> Please click submit again.`
  }
  if (gameMode == hit_or_stand){
    if ((input == 'hit') && (totalCompSum < '17' )){
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
      totalPlayerSum = sumCard(player);
      totalCompSum = sumCard(comp);
      // console.log(`total player sum ${totalPlayerSum}`);
      // console.log(`total comp sum: ${totalCompSum}`);
      playerDisplay.push(playerCard.cardName);
      playerDisplay.push(playerCard.suit);
      //console.log(`player display ${playerDisplay}`);
      compDisplay.push(compCard.cardName);
      compDisplay.push(compCard.suit);
      // console.log(`comp display ${compDisplay}`);
      // console.log("index" + index);
      //console.log(`hi`);
      if (totalPlayerSum == "21") {
        return "Player Win";
      }
      if (totalCompSum == "21") {
        return "Comp Win";
      }
      myOutput = `Player cards: ${playerDisplay}<br>Player sum: ${totalPlayerSum}<br><br> Comp cards: ${compDisplay}<br> Comp sum: ${totalCompSum}<br><br> Please click submit again.`;
    }
    if (input == 'stand'){
      if ((totalPlayerSum < '17') || (totalCompSum < '17')){
        console.log('q');
        gameMode = hit_or_stand;
        return `total value of card too low`;
      }
      if ((totalPlayerSum > "21") || (totalCompSum > totalPlayerSum)) {
        console.log("h");
        return "player lose";
      } else if ((totalCompSum > "21") || (totalPlayerSum > totalCompSum)) {
        console.log("g");
        return "comp lose";
      }
    }
    //console.log (`bye`);
  }
  return myOutput;
  }
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
};

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
