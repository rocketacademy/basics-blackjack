
//objective is to get blackjack, or get higher value (>=16 and <= 21)
//deck is shuffled and 2 cards are dealt to player and computer
//if card value is below 16, initiate deal card again
//if card value is 21, card limit is reached
//if card value is > 21, bust
//if two cards are drawn and one is A while the other is J,Q or K, blackjack
//winner is the first to get blackjack, or has higher value

var GAME_MODE_DEAL_CARDS = 'deal'
var GAME_MODE_HIT_OR_STAND = 'hit or stand' // ask for another card or next turn
var GAME_MODE_DETERMINE_WINNER = 'winner' // compare card values to determine winner
var PLAYER = 'player'
var COMPUTER = 'computer'
var currentGameMode = GAME_MODE_DEAL_CARDS; //initialise dealing of cards
var currentPlayer = PLAYER;
var gameOver = false;
var stand


//=======================Create 52-card deck=====================
var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];
    // loop to create all cards in this suit
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the card to the deck
      deck.push(card);
      rankCounter = rankCounter + 1;
      console.log(rankCounter)
    }
    suitIndex = suitIndex + 1;
    console.log(suitIndex)
  }
  return deck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }

  console.log(cards)
  return cards;
};

//=======================Shuffle cards once=====================
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

//deal cards to hands
var dealCardToHand = function () {
  for (var i = 0; i < 2; i ++) {
    hand.push(shuffledDeck.pop())
  }
  return hand;
};

//=======================Store player and computer's cards=====================
var playerHand = [];
var computerHand = [];
var playerScore = 0
var computerScore = 0
let maxCardLimit = 21; //max value before bust is 21
let dealerMinValue = 16; // dealer has to minimally deal 16


var convertHandToString = function (hand) {
  return `[${hand.map((card) => card.name)}]`;
};

//=======================Main function=====================
var main = function (input){
  var myOutputValue = '';
  var genericOutput = `Your cards: ${convertHandToString(playerHand)}  
  <br>Computer's cards: ${convertHandToString(computerHand)}. 
  <br> Your score: ${Number(calcHandTotal(playerHand))}
  <br> Computer's score: ${Number(calcHandTotal(computerHand))}`
  var playerCards = `You have drawn<br>`
  for (j = 0; j < playerHand.length; j++) {
  playerCards += `${playerHand[j].name} of ${playerHand[j].suit}<br>`
  }
  var computerCards = `Computer has drawn<br>`
  for (k = 0; k < computerHand.length; k++) {
  computerCards += `${computerHand[k].name} of ${computerHand[k].suit}<br>`
  }
//=======================Deal cards=====================
  // draw one new card for each player
  if (currentGameMode == GAME_MODE_DEAL_CARDS){
  if (playerHand.length == 0){
  playerHand.push(shuffledDeck.pop())
  computerHand.push(shuffledDeck.pop())
  // generate another card for each player
  playerHand.push(shuffledDeck.pop())
  computerHand.push(shuffledDeck.pop())
  playerScore = calcHandTotal(computerHand);
  computerScore = calcHandTotal(computerHand);
  console.log(playerHand.length)
  console.log(computerHand.length) 
  } if (playerHand.length == 2){
  myOutputValue = `${playerCards}.<br>${computerCards}.<br>${genericOutput}<br>
  Please type 'hit' or 'stand' to decide if you wish to draw cards or end your turn.`
  console.log(`game mode: ${currentGameMode}`)
  console.log (`player hand: ${playerCards}, <br>com hand: ${computerCards}`)
  currentGameMode = GAME_MODE_HIT_OR_STAND
  }
}

//=======================Determine if player hits or stands=====================
if (currentGameMode = GAME_MODE_HIT_OR_STAND){
  var playerScore = calcHandTotal(playerHand);
  if (input.toLowerCase().includes('hit')){
  console.log(`input: ${input}, game mode: ${currentGameMode}`)
  // draw one card for player if total player hand is less than 5
  if (playerHand.length < 5) {
    playerHand.push(shuffledDeck.pop());
    
  } else {
    stand = 'forced';
    console.log (`player hand: ${playerHand.length}; com hand: ${computerHand.length}`)
    gameOver = true;
    myOutputValue = `You have exceeded max hand length. Please type stand to see if you have won.`
  } if (playerScore > maxCardLimit){
  gameOver = true;
  myOutputValue = `${playerCards}.<br>${computerCards}.<br>${genericOutput}<br>Player went bust! Hit refresh to start again.`
  }
  else if (playerScore < maxCardLimit){
  myOutputValue = `${playerCards}.<br>${computerCards}.<br>${genericOutput}<br>Please type 'hit' or 'stand' to decide if you wish to draw cards or end your turn.`
  }
}
// draw one card for computer if computer has lower than dealer min value 16
if (input.toLowerCase().includes('stand') || stand == 'forced'){
  var computerScore = calcHandTotal(computerHand);
    if (computerScore <= dealerMinValue) {
      computerHand.push(shuffledDeck.pop());
      computerScore = calcHandTotal(computerHand);
      console.log(`com score: ${computerScore}`)
  currentGameMode = GAME_MODE_DETERMINE_WINNER
  gameOver = true
    myOutputValue = `${playerCards}.<br>${computerCards}.<br>${genericOutput}. ${winner()}<br> Hit refresh to start again.`
  }
}
}
return myOutputValue
}
 //=======================Determine winner=====================
if (currentGameMode == GAME_MODE_DETERMINE_WINNER){
  var winner = function (){
  if (playerScore > computerScore){
    gameOver = true;
    return `You win! Hit refresh to play again.`
  } 
  if (playerScore < computerScore){
    gameOver = true;
    return `You lose! Hit refresh to play again.`
  } 
  //=======================Blackjack logic=====================
  if (playerHand.length == 2 && playerScore == maxCardLimit){
    gameOver = true;
   return `Player has blackjack!`
  }
  if (computerHand.length ==2 && computerScore == maxCardLimit){
    gameOver = true
    return `Computer has blackjack!`
  }
  }
}

//=======================Calculate total score of cards=====================
var calcHandTotal = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currCard = hand[i];
    // If card rank is 2-10, value is same as rank
    if (currCard.rank >= 2 && currCard.rank <= 10) {
      sum += currCard.rank;
      // If card rank is 11-13, i.e. Jack, Queen, or King, value is 10
    } else if (currCard.rank >= 11 && currCard.rank <= 13) {
      sum += 10;
      // If card is Ace, value is 11 by default
    } else if (currCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    }
  }
  // If sum is greater than sum limit and hand contains Aces, convert Aces from value of 11
  // to value of 1, until sum is less than or equal to sum limit or there are no more Aces.
  if (sum > maxCardLimit && numAcesInHand > 0) {
    for (let i = 0; i < numAcesInHand; i += 1) {
      sum -= 10;
      // If the sum is less than sumLimit before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (sum <= maxCardLimit) {
        break;
      }
    }
  }
  return sum;
};