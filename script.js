var player = [];
var computer = [];

var dealtDeck = [];

var cardType = ["Hearts", "Spades", "Clovers", "Clubs"];
var handType = {
  Normal : 'Normal',
  Blackjack : 'Blackjack',
  DoubleAs : 'DoubleAs',
  Busted : 'Busted'
}

var getCardName = function (num, suit) {
  //fix the number first
  var name;
  switch (num) {
    case 1:
      return 'Ace of ' + suit;
    case 11:
      return 'Jack of ' + suit;
    case 12:
      return 'Queen of ' + suit;
    case 13:
      return 'King of ' + suit;
    default:
      return num + ' of ' + suit;
  }
}

var getCardFromDeck = function () {
 //get value of card from Ace(1) to King(13)
 var num = Math.floor(Math.random() * 13) + 1;

 var suit = cardType[Math.floor(Math.random() * 4)];

//value of card will be 10 regardless of card is 10, Jack, Queen or King.
if (num > 10)
  num = 10;

 return card = {
    rank: num,
    suit: suit,
    name: getCardName(num, suit)
 };
}

var dealFirstHand = function(hand) {
  //check if hand already contained 2 cards already
  if (hand.length < 2 ) {
    var card = getCardFromDeck();
    if (!dealtDeck.includes(card)) {
      hand.push(card);
    } 
    dealFirstHand(hand);
  }
}

var findHandHighestScore = function (hand){
  if (hand.length == 2) {
    //check if contain Ace - can be used as 1, 10 or 11
    if (hand[0].rank == 1 && hand[1].rank == 1){
      //TODO: Advanced - handle double Ace condition
      return {
        score: 21,
        handType: handType.DoubleAs
      }
    }
    if ((hand[0].rank == 1) && (hand[1].rank >= 10) || (hand[1].rank == 1) && (hand[0].rank >= 10)) {
      return {
        score: 21,
        handType: handType.Blackjack
      }
    } else {
      return {
        score: hand[0].rank + hand[1].rank,
        handType: handType.Normal
      }
    }
  }

  var total = 0;
  for (var card in hand) {
    total += hand[card].rank;
  }

  var type = handType.Normal;
  if (total > 21)
    type = handType.Busted;

  return {
    score: total,
    handType: type
  } 
}

//TODO: Sum of cards cannot be under 16 & cover busted hands
var findWinnerResults = function (comScore, playerScore){

  if (playerScore.score < 16) {
    if (comScore.handType == handType.Busted){
      return `Computer busted and Player hands under 16, <br> It's a draw!`;
    }
    return `Computer draws ${comSCore.score} and Player hand is under 16, <br> Computer Wins!`;
  }

  switch (comScore.handType) {
    case handType.Busted:
      if (playerScore.handType == handType.Busted) {
        return `Computer Busted and Player Busted, <br> It's a draw.`;
      } 
      return `Computer busted and Player hands ${playerScore.score}, <br> Player Wins!`;
    case handType.Blackjack:
    case handType.DoubleAs:
      if (playerScore.handType == handType.Normal) {
        if (playerScore.score == 21)
          return `Computer draws ${comScore.handType} and Player hands ${playerScore.score}, <br> It's a draw.`;
        else {
          return `Computer draws ${comScore.handType} and Player hands ${playerScore.score}, <br> Computer Wins.`;
        }
      } else {
        return `Computer draws ${comScore.handType} and Player hands ${playerScore.handType}, <br> It's a draw.`;
      }
    default: //Normal
      if (playerScore.handType == handType.Busted) {
        return `Computer draws ${comScore.score} and Player Busted, <br> Computer Wins!`;
      } else if (playerScore.handType == handType.Normal) {
        var result = `Computer draws ${comScore.score} and Player hands ${playerScore.score}, `;
        if (comScore.score > playerScore.score)
          return  result + '<br> Computer Wins.';
        if (comScore.score < playerScore.score)
          return result +  '<br> Player Wins.';
        return result + `<br> It's a draw.`;
      } else {
        //check if player has blackjack or doubleAs
        if (playerScore.score == 21)
          return `Computer draws ${comScore.score} and Player hands ${playerScore.handType},<br> It's a draw.`;
        else
          return `Computer draws ${comScore.score} and Player hands ${playerScore.handType},<br> Player Win.`;
      }
  }
}

var playBlackjackResults = function (){
  var comScore = findHandHighestScore(computer);
  var playerScore = findHandHighestScore(player);
  console.log(comScore);
  console.log(playerScore);
  return findWinnerResults(comScore, playerScore);
}

var getRoundDetails = function (){
  var roundDetails = 'Player: ';

  for (var card in player) {
    roundDetails += player[card].name + ", ";
  }
  roundDetails += " with sum " + findHandHighestScore(player).score + '<br>';

  roundDetails += 'Computer: ';

  for (var card in computer) {
    roundDetails += computer[card].name + ", ";
  }

  roundDetails += " with sum " + findHandHighestScore(computer).score;

  return roundDetails + '<br>';
}

var playComputerAI = function(){
  var highest = findHandHighestScore(computer).score;
  var playerHand = findHandHighestScore(player);
  //check if card is lower than 16
  if ((highest < 16) || (playerHand.handType != handType.Busted && highest < playerHand.score)){
    computer.push(getCardFromDeck());
    playComputerAI();
  }
}

var main = function (input) {
  //populate hand
  if (computer.length < 2)
    dealFirstHand(computer);
  if (player.length < 2)
    dealFirstHand(player);

  var output = getRoundDetails();

  //user draws another card
  if (input == "hit") {
    console.log('hit');
    player.push(getCardFromDeck());
    output = getRoundDetails();
  }

  //user end turn
  if (input == "stand") {
    //computer turn
    playComputerAI();
    output = getRoundDetails();
    return output + `<br> ${playBlackjackResults()}`;
  }

  return output + '<br> Please type "hit" or "stand" to continue the game';
};
