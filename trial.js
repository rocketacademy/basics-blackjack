var makeDeck = function () {
    var cardDeck = [];
    var suits = ['♥','♦', '♣', '♠'];
  
    var suitIndex = 0;
    while(suitIndex < suits.length) {
        var currentSuit = suits[suitIndex];
        
        var rankCounter = 1;
        while (rankCounter <= 13) {
            var cardName = rankCounter;
            var cardValue = rankCounter;
            
            if (cardName == 1) {
                cardName = `Ace`;
                cardValue = [1, 11];
            } else if (cardName == 11) {
                cardName = `Jack`;
                cardValue = 10;
            } else if (cardName == 12) {
                cardName = `Queen`;
                cardValue = 10;
            } else if (cardName == 13) {
                cardName = `King`;
                cardValue = 10;
            }
            
          
            var card = {
                name: cardName,
                suit: currentSuit,
                rank: rankCounter,
                value: cardValue,
            }
            cardDeck.push(card);
            rankCounter += 1;
        }
        suitIndex += 1;
    }
    
    return cardDeck;
  };



var main = function(input) {
    var cards = makeDeck();
    console.table(cards);
    console.log(makeDeck(0));
}
main();