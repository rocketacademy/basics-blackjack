var player = [];
var computer = [];

var dealtDeck = [];

var cardType = ["Hearts", "Spades", "Clovers", "Clubs"];
var handType = {
  Normal : 'Normal',
  Blackjack : 'Blackjack',
  DoubleAs : 'DoubleAs',
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
    total += card.rank;
  }

  return {
    score: total,
    handType: handType.Normal
  } 
}

var findWinnerResults = function (comScore, playerScore){
  switch (comScore.handType) {
    case handType.Blackjack:
    case handType.DoubleAs:
      if (playerScore.handType == handType.Normal) {
        if (playerScore.score == 21)
          return `Computer draws ${comScore.handType} and Player hands ${playerScore.score}, <br> it's a draw.`;
        else {
          return `Computer draws ${comScore.handType} and Player hands ${playerScore.score}, <br> Computer Wins.`;
        }
      } else {
        return `Computer draws ${comScore.handType} and Player hands ${playerScore.handType}, <br>  it's a draw.`;
      }
    default: //Normal
      if (playerScore.handType == handType.Normal) {
        var result = `Computer draws ${comScore.score} and Player hands ${playerScore.score}, `;
        if (comScore.score > playerScore.score)
          return  result + '<br> Computer Wins.';
        if (comScore.score < playerScore.score)
          return result +  '<br> Player Wins.';
        return result + `<br> it's a draw.`;
      } else {
        //check if player has blackjack or doubleAs
        if (playerScore.score == 21)
          return `Computer draws ${comScore.score} and Player hands ${playerScore.handType},<br> it's a draw.`;
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

var main = function (input) {
  //populate hand
  dealFirstHand(computer);
  dealFirstHand(player);
  return `
  Computer: ${computer[0].name}, ${computer[1].name}
  <br>
  Player: ${player[0].name}, ${player[1].name}
  <br>
  ${playBlackjackResults()}
  `;
};
