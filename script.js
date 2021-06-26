//make deck of card
//draw one card for player and dealer
//player can analyze it and chose to hit or stand
//if the player get over 21 the player lose
var GAMEMODE = 'draw card'

var playerTotal = 0
var dealerTotal = 0
var currentDeck

var main = function (input) {
  if(GAMEMODE == 'draw card'){
    // reset the total
    playerTotal = 0
    dealerTotal = 0
    // reset the deck
    deck = shuffleDeck(makeDeck())

    GAMEMODE = 'hit or stand'
    return drawCardMode()
  }
  else if(GAMEMODE == 'ace'){
    return aceChose(input)
  }
   else if(GAMEMODE == 'hit or stand'){
    return hitOrStand(input)
  }
   else if(GAMEMODE == 'win or lose'){
    return winOrLose()
  }
};

var drawCardMode = function(){
  var playerCard = deck.pop()
  var dealerCard = deck.pop()
  playerTotal += playerCard.rank
  dealerTotal += dealerCard.rank
  if(playerCard.rank == 1){
      GAMEMODE = 'ace'
      playerTotal -= playerCard.rank
      return `player card : ${playerCard.name} of ${playerCard.suit}<br>dealer card : ${dealerCard.name} of ${dealerCard.suit}<br> your current total is ${playerTotal}, you got ace input '1' or '11'`
  }
  return `player card : ${playerCard.name} of ${playerCard.suit} <br>dealer card : ${dealerCard.name} of ${dealerCard.suit}<br>click submit to add the card or input "stand" if you are done`
}

var hitOrStand = function(input){
  if(input == ''){
    var playerCard = deck.pop()
    playerTotal += playerCard.rank
    if(playerCard.rank == 1){
      GAMEMODE = 'ace'
      playerTotal -= playerCard.rank
      return `you got ${playerCard.name} of ${playerCard.suit}<br> your current total is ${playerTotal}, input '1' or '11'`
    }
    if(playerTotal >21){
    GAMEMODE = 'draw card'
    return `you got ${playerCard.name} of ${playerCard.suit}<br>your total is ${playerTotal}<br>bustedd! click submit to play again`
    }
    else{
      return `you got ${playerCard.name} of ${playerCard.suit}<br>your total is ${playerTotal}<br>click submit to add the card or input "stand" if you are done`
    }
  }
    GAMEMODE = 'win or lose'
    return `your total is ${playerTotal}, click submit to decide the winner`
}

var aceChose = function(input){
  if(input == '1'){
    playerTotal +=1
    if(playerTotal >21){
    GAMEMODE = 'draw card'
    return `you chose 1<br>your total is ${playerTotal}<br>bustedd! click submit to play again`
    }
    GAMEMODE = 'hit or stand'
    return `you chose 1<br>your total is ${playerTotal}<br>click submit to add the card or input "stand" if you are done`
  }
  else if(input == '11'){
    playerTotal +=11
    if(playerTotal >21){
    GAMEMODE = 'draw card'
    return `you chose 11<br>your total is ${playerTotal}<br>bustedd! click submit to play again`
    }
    GAMEMODE = 'hit or stand'
    return `you chose 11<br>your total is ${playerTotal}<br>click submit to add the card or input "stand" if you are done`
  }
  else{
    return `your current total is ${playerTotal}, you got ace input '1' or '11'`
  }

}

var winOrLose = function(){
  while(dealerTotal < 17){
    dealerCard = deck.pop()
    dealerTotal += dealerCard.rank
  }
  if(dealerTotal >21){
    GAMEMODE = 'draw card'
    return `Dealer got ${dealerTotal}<br>bustedd! YOU WINN click submit to play again`
    }
   GAMEMODE = 'draw card'
  if(dealerTotal > playerTotal){
    return `player sum : ${playerTotal} <br>dealer sum : ${dealerTotal}<br> dealer winn`
  }
  else if(dealerTotal < playerTotal){
    return `player sum : ${playerTotal} <br>dealer sum : ${dealerTotal}<br> player winn`
  }
  else if(dealerTotal == 21){
    return `player sum : ${playerTotal} <br>dealer sum : ${dealerTotal}<br> dealer got blackjack, dealer winn`
  }
  else if(playerTotal == 211){
    return `player sum : ${playerTotal} <br>dealer sum : ${dealerTotal}<br> player got blackjack, player winn`
  }
  else{
    return `player sum : ${playerTotal} <br>dealer sum : ${dealerTotal}<br> tie`
  }
}


var makeDeck = function(){
  var deck = []
  var suitCounter = 0
  var suit = [`diamond`,`heart`,`club`,`spade`]
  while(suitCounter < suit.length){
    var rankCounter = 1
    while(rankCounter <= 13){
      var cardName = String(rankCounter)
      var blackjackRank = rankCounter
      if(cardName == '1'){
        cardName = 'ace'
      }
      else if(cardName == '11'){
        cardName = 'jack'
        blackjackRank = 10
      }
      else if(cardName == '12'){
        cardName = 'queen'
        blackjackRank = 10
      }
      else if(cardName == '13'){
        cardName = 'king'
        blackjackRank = 10
      }
      var object ={
        suit : suit[suitCounter],
        rank : blackjackRank,
        name :cardName
      }
      deck.push(object)
      rankCounter+=1
    }
    suitCounter+=1
  }
  return deck
}
var randomInteger = function(){
  var number = Math.floor(Math.random()*52)
  return number
}
var shuffleDeck = function(deck){
  var counter = 0
  while(counter < deck.length){
    var currentCard = deck[counter]
    var randomCard = deck[randomInteger()]

    deck[counter] = randomCard
    deck[randomInteger()] = currentCard
    counter+=1
  }
  return deck
}

var deck = shuffleDeck(makeDeck())




