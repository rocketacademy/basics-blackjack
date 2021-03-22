//function to generate deck
var cards =[];
var cardDeck = function (){
  var cardSuits =['hearts', 'spades','clubs','diamonds'];
  var cardSuitsIndex =0;
  while(cardSuitsIndex<4){
    var currentsuit = cardSuits[cardSuitsIndex];
    var rankNumber=1;
    while (rankNumber<14){
      var cardName=rankNumber;
      if(rankNumber == 1){
        cardName='Ace'
      }
      else if(rankNumber == 11){
        cardName='Joker'
      }
      else if(rankNumber == 12){
        cardName='Queen'
      }
      else if(rankNumber == 13){
        cardName='King'
      }
      cards.push({
        name:  cardName,
        suit: currentsuit,
        rank: rankNumber,
      });
      rankNumber = rankNumber + 1;
    }
    cardSuitsIndex = cardSuitsIndex + 1;
  }
}
//function to shuffle deck

var main = function (input) {
  cardDeck();
  console.log(cards);
};
