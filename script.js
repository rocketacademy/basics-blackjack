///// GLOBAL VARIABLES & GAME MODES /////
var GAME_START = 'game start';
var GAME_CARDS_DRAWN = 'cards drawn';
var GAME_RESULTS_SHOWN = 'results shown';
var GAME_HIT_OR_STAND = 'hit or stand';
var currentGameMode = GAME_START;

var playerHand = []
var dealerHand = []

var gameDeck = 'empty at start';

///// CREATE & SHUFFLE DECK FUNCTIONS /////

// CREATE DECK
var createDeck = function (){
    var deck = [];
    var suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
    var indexSuits = 0;
    while (indexSuits < suits.length){
        var currentSuit = suits[indexSuits];
        var indexRanks = 1;
        while (indexRanks <= 13){
            var cardName = indexRanks;
            if (cardName == 1){
                cardName = 'Ace';
            } else if (cardName == 11){
                cardName = 'Jack'
            } else if (cardName == 12){
                cardName = 'Queen'
            } else if (cardName == 13){
                cardName = 'King'
            }
            var card = {
                name: cardName,
                suit: currentSuit,
                rank: indexRanks,
            }
            deck.push(card);
            indexRanks += 1;
        }
        indexSuits +=1;
    }
    return deck;
};
// SHUFFLE DECK
var getRandomIndex = function (size){
    return Math.floor(Math.random() * size);
};
var shuffleDeck = function (cards){
    var index = 0;
    while (index < cards.length){;
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index +=1;
    }
    return cards;
}
// CREATE NEW & SHUFFLED DECK
var createNewDeck = function(){
    var newDeck = createDeck();
    var shuffledDeck = shuffleDeck(newDeck);
    return shuffledDeck;
}

///// BLACKJACK GAME FUNCTIONS /////

// CHECK BLACKJACK
var checkBlackjack = function(hand){
    var playerCardOne = hand[0];
    var playerCardTwo = hand[1];
    var isBlackjack = false;
    if ((playerCardOne.name == 'Ace' && playerCardTwo.rank >=10) || (playerCardOne.rank >=10 && playerCardTwo.name == 'Ace')){
        return isBlackjack = true;
    } else {
        return isBlackjack = false;
    }
}
// CALCULATE TOTAL HAND VALUE
var calTotalHand = function(hand){
    var totalHand = 0;
    var aceCount = 0;
    var index = 0;
    while(index < hand.length){
        var currentCard = hand[index];
        if (currentCard.name == 'Jack' || currentCard.name == 'Queen' || currentCard.name == 'King'){
            totalHand = totalHand + 10;
        }
        else if (currentCard == 'Ace'){
            totalHand = totalHand + 11
            aceCount = aceCount + 1;
        }
        else {
            totalHand = totalHand + currentCard.rank;
        }
        index +=1;
    }
    index = 0;
    while (index < aceCount){
        if (totalHand > 21){
            totalHand = totalHand - 10;
        }
        index +=1;
    }
    return totalHand;
}
// DISPLAY PLAYER & DEALER HANDS
var displayBothHands = function(playerHand, dealerHand){
    var playerMessage = 'Player Hand: <br>';
    var index = 0;
    while (index < playerHand.length){
        playerMessage = playerMessage + '-' + playerHand[index].name + ' of ' + playerHand[index].suit + '<br>';
        index +=1;
    }
    index = 0;
    var dealerMessage = 'Dealer Hand: <br>';
    while (index < dealerHand.length){
        dealerMessage = dealerMessage + '-' + dealerHand[index].name + ' of ' + dealerHand[index].suit + '<br>';
        index +=1;
    }
    return playerMessage + '<br>' + dealerMessage;
}
// DISPLAY PLAYER & DEALER HANDS VALUE
var displayBothValues = function(playerHandValue, dealerHandValue){
    var displayBothValuesMessage = '<br>Player total hand value:' + playerHandValue + '<br>Dealer total hand value:' + dealerHandValue;
    return displayBothValuesMessage;
}

///// MAIN FUNCTION /////

// DEAL CARDS
var main = function(input){
    var myOutputValue = '';
    if (currentGameMode == GAME_START){
        gameDeck = createNewDeck();
        playerHand.push(gameDeck.pop());
        dealerHand.push(gameDeck.pop());
        playerHand.push(gameDeck.pop());
        dealerHand.push(gameDeck.pop());
        console.log('PH', playerHand);
        console.log('DH', dealerHand);
        currentGameMode = GAME_CARDS_DRAWN;
        myOutputValue = `Cards Dealt, click 'Submit' next!`
        return myOutputValue;
    }
// CARDS DRAWN MODE, CHECK BLACKJACK
    if (currentGameMode == GAME_CARDS_DRAWN){
        var playerBlackjack = checkBlackjack(playerHand);
        var dealerBlackjack = checkBlackjack(dealerHand);
        if (playerBlackjack == true || dealerBlackjack == true){
            if (playerBlackjack == true && dealerBlackjack == true){
                myOutputValue = displayBothHands(playerHand, dealerHand) + '<br>Both are Blackjacks! Draw!';
            }
            else if (playerBlackjack == true && dealerBlackjack == false){
                myOutputValue = displayBothHands(playerHand, dealerHand) + '<br>Player has Blackjack! Player wins!';
            }
            else {
                myOutputValue = displayBothHands(playerHand, dealerHand) + '<br>Dealer has Blackjack! Dealer wins!';
            }
            return myOutputValue;
        }
// NO BLACKJACK, CALCULATE AND COMPARE HANDS
        else {
            myOutputValue = displayBothHands(playerHand, dealerHand) + '<br>No Blackjacks! Press Submit.'
            currentGameMode = GAME_HIT_OR_STAND;
            return myOutputValue;
        }
    }
// HIT/STAND
    if (currentGameMode = GAME_HIT_OR_STAND){
        if (input == 'hit'){
            playerHand.push(gameDeck.pop());
            myOutputValue = displayBothHands(playerHand, dealerHand) + '<br> Another card has been drawn. <br>Please input "hit" or "stand"!<br>';
        }
        else if (input == 'stand'){
            var playerHandTotal = calTotalHand(playerHand);
            var dealerHandTotal = calTotalHand(dealerHand);
            while (dealerHandTotal < 17){
                dealerHand.push(gameDeck.pop());
                dealerHandTotal = calTotalHand(dealerHand);
            }      
            if (playerHandTotal == dealerHandTotal){
                myOutputValue = displayBothHands(playerHand, dealerHand) + '<br>Same hand for both! Draw!' + displayBothValues(playerHandTotal, dealerHandTotal);
            }
            else if (playerHandTotal > dealerHandTotal){
                myOutputValue = displayBothHands(playerHand, dealerHand) + '<br>Player hand value higher! Player wins!'+ displayBothValues(playerHandTotal, dealerHandTotal);
            }
            if (playerHandTotal < dealerHandTotal){
                myOutputValue = displayBothHands(playerHand, dealerHand) + '<br>Dealer hand value higher! Dealer wins!' + displayBothValues(playerHandTotal, dealerHandTotal);
            }
            if (playerHandTotal > 21){
                myOutputValue = displayBothHands(playerHand, dealerHand) + '<br>Busted! Dealer wins!' + displayBothValues(playerHandTotal, dealerHandTotal);
            }
            if (dealerHandTotal > 21){
                myOutputValue = displayBothHands(playerHand, dealerHand) + '<br>Busted! Player wins!' + displayBothValues(playerHandTotal, dealerHandTotal);
            }
        }
        else {
            myOutputValue = 'Now decide and input the word "hit" or "stand"!<br><br>' + displayBothHands(playerHand, dealerHand);
        }
        return myOutputValue;
    }
}