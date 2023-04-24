// reference HOW TO PLAY - video: https://www.youtube.com/watch?v=eyoh-Ku9TCI&ab_channel=wikiHow // 

// global variables
// game states
var PLACE_BET = "place bet";
var DEAL_CARDS = "deal cards";
var PLAYER_HIT_OR_STAND = "player hit or stand";
var gameState = PLACE_BET;

var output;
var playerCards = [];
var dealerCards = [];
var numberCountArray = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th']
var sumOfPlayerCards;
var sumOfDealerCards;

var currentBet;
var playerBankRoll = 100;
var initialbet;

// Make cards deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["❤️", "♦️", "♣️", "♠️"];
  var suitCounter = 0;
  while (suitCounter < suits.length) {
    var currentSuit = suits[suitCounter];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitCounter += 1;
  }
  return cardDeck;
};

// Get a random Number
var getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  var currentNumber = 0;
  while (currentNumber < cardDeck.length) {
    var randomNumber = getRandomNumber(cardDeck.length);
    var randomCard = cardDeck[randomNumber];
    var currentCard = cardDeck[currentNumber];
    cardDeck[currentNumber] = randomCard;
    cardDeck[randomNumber] = currentCard;
    currentNumber = currentNumber + 1;
  }
  console.log(cardDeck);
  return cardDeck;
};

// reset game
var resetGame = function () {
  playerCards = [];
  dealerCards = [];
  var deck = makeDeck();
  shuffledDeck = shuffleCards(deck);
};

// the player & dealer get 2 cards
var dealCards = function (shuffledDeck) {
  // draw cards from deck
  playerCards = [shuffledDeck.pop(), shuffledDeck.pop()];
  dealerCards = [shuffledDeck.pop(), shuffledDeck.pop()];
  console.log(playerCards, dealerCards)
};

// Sum of player cards
var getSumOfPlayerCards = function (playerCards) {
  // calculate number of ace in the playercards.length
  var aceCounter = 0;
  var sumOfPlayerCards = 0;
  var counter = 0;
  var counter1;
  while (counter < playerCards.length) {
    var currentCard = playerCards[counter];
    // count number of aces
    if (currentCard.name == 'ace') {
      aceCounter += 1;
    }
    console.log(aceCounter)
    // jack queen king, add 10
    if (currentCard.name == 'jack' || currentCard.name == 'queen' || currentCard.name == 'king') {
      sumOfPlayerCards = sumOfPlayerCards + 10
      console.log('sum of player cards JQK: ' + sumOfPlayerCards);
    }
    // when ace & sum of cards is less than 21, add 11
    if (currentCard.name == 'ace') {
      sumOfPlayerCards = sumOfPlayerCards + 11
      console.log('sum of player cards ACE + 11: ' + sumOfPlayerCards);
    }
    // others, add their rank
    if (currentCard.name == '2' || currentCard.name == '3' || currentCard.name == '4' || currentCard.name == '5' || currentCard.name == '6' || currentCard.name == '7'|| currentCard.name == '8'|| currentCard.name == '9' || currentCard.name == '10') {
      sumOfPlayerCards = sumOfPlayerCards + currentCard.rank;
      console.log('sum of player cards + curr rank: ' + sumOfPlayerCards);
    }
    // when ace & sum of cards is larger than 21, minus 11 then add 1, then aceCounter - 1 so that it wont count next time
    if (sumOfPlayerCards > 21 && aceCounter > 0) {
      for (counter1 = 0; counter1 < aceCounter; counter1 += 1) {
      sumOfPlayerCards = sumOfPlayerCards - 11 + 1
      aceCounter = aceCounter - 1;
      console.log('sum of player cards ACE -11 + 1: ' + sumOfPlayerCards);
      }
    }     
    counter += 1
  }
  return sumOfPlayerCards;
};

// sum of dealer cards
var getSumOfDealerCards = function (dealerCards) {
  var aceCounter = 0;
  var sumOfDealerCards = 0;
  var counter;
  var counter1;
  for (counter = 0; counter < dealerCards.length; counter += 1) {
    // count number of aces
    var currentCard = dealerCards[counter];
    if (currentCard.name == 'ace') {
      aceCounter += 1;
    }
    console.log(aceCounter)
    // jack queen king, add 10
    if (currentCard.name == 'jack' || currentCard.name == 'queen' || currentCard.name == 'king') {
      sumOfDealerCards = sumOfDealerCards + 10
      console.log('sum of dealer cards JQK: ' + sumOfDealerCards);
    }
    // when ace & sum of cards is less than 21, add 11
    if (currentCard.name == 'ace') {
      sumOfDealerCards = sumOfDealerCards + 11
      console.log('sum of dealer cards ACE + 11: ' + sumOfDealerCards);     
    }
    // others, add their rank
    if (currentCard.name == '2' || currentCard.name == '3' || currentCard.name == '4' || currentCard.name == '5' || currentCard.name == '6' || currentCard.name == '7'|| currentCard.name == '8'|| currentCard.name == '9' || currentCard.name == '10') {
      sumOfDealerCards = sumOfDealerCards + currentCard.rank;
      console.log('sum of dealer cards + curr rank: ' + sumOfDealerCards);
    }
    // when ace & sum of cards is larger than 21, minus 11 then add 1, then aceCounter - 1 so that it wont count next time
    if (sumOfDealerCards > 21 && aceCounter > 0) {
      for (counter1 = 0; counter1 < aceCounter; counter1 += 1) {
      sumOfDealerCards = sumOfDealerCards - 11 + 1
      aceCounter = aceCounter - 1;
      console.log('sum of Dealer cards ACE -11 + 1: ' + sumOfDealerCards);
      }
    } 
  }
  return sumOfDealerCards;
};

// output message showing player's and dealer's cards. Dealer's second card not shown.
var listPlayerCardsAndDealerFirstCards = function (playerCards, dealerCards) {
  var sumOfPlayerCards = getSumOfPlayerCards(playerCards);
  var playerMessage = '';
  var playerCardMessage = '';
  var counter;
  for (counter = 0; counter < playerCards.length; counter += 1) {
    playerCardMessage = playerCardMessage + `${numberCountArray[counter]}: ${playerCards[counter].name} ${playerCards[counter].suit} <br>`
  };
  playerMessage = `<u> Your Cards </u> <br> ${playerCardMessage} Sum: ${sumOfPlayerCards}`;
  console.log(playerMessage)
  var dealerMessage = `<u> Dealer Cards </u> <br>
    ${numberCountArray[0]}: ${dealerCards[0].name} ${dealerCards[0].suit} <br>
    2nd: hidden <br>
    Sum: hidden`;
  console.log(dealerMessage);
  return `${playerMessage} <br><br> ${dealerMessage}`;
};

// output message showing player's and dealer's cards. Dealer's second cards shown.
var listPlayerCardsAndDealerCards = function (playerCards, dealerCards) {
  var sumOfPlayerCards = getSumOfPlayerCards(playerCards);
  var sumOfDealerCards = getSumOfDealerCards(dealerCards);
  var playerMessage = ''
  var playerCardMessage = ''
  var counter;
  for (counter = 0; counter < playerCards.length; counter += 1) {
    playerCardMessage = playerCardMessage + `${numberCountArray[counter]}: ${playerCards[counter].name} ${playerCards[counter].suit} <br>`
  };
  playerMessage = `<u> Your Cards </u> <br> ${playerCardMessage} Sum: ${sumOfPlayerCards}`;

  var dealerMessage = ''
  var dealerCardMessage = ''
  var counter;
  for (counter = 0; counter < dealerCards.length; counter += 1) {
    dealerCardMessage = dealerCardMessage + `${numberCountArray[counter]}: ${dealerCards[counter].name} ${dealerCards[counter].suit} <br>`
  };
  dealerMessage = `<u> Dealer Cards </u> <br> ${dealerCardMessage} Sum: ${sumOfDealerCards}`;
  return `${playerMessage} <br><br> ${dealerMessage}`;
};

// Compare Result of player and dealer except blackjack case
var getComparedResult = function () {
  // Additional Images on output result
  var myImagesWin = '<img src = "https://steamuserimages-a.akamaihd.net/ugc/911281516661117210/612F5F6EB1BF8F1618FDD41ACEA486B74609CBDC/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"/ class="center">'
  var myImagesLose = '<img src = "https://media.tenor.com/n4C8YTtBFrAAAAAC/howls-moving-castle-calcifer.gif"/ class="center">'
  var myImagesTie = '<img src = "https://media.tenor.com/8VPQWQmFzZIAAAAC/howls-moving-castle-frying.gif"/ class="center">'
  // 1.player & dealer both smaller than 21 & player > dealer
  // 1.player wins
  if (sumOfPlayerCards <= 21 && sumOfDealerCards <= 21 && sumOfPlayerCards > sumOfDealerCards) {
    currentBet = initialbet * 2;
    playerBankRoll = playerBankRoll + currentBet;
    output = `<b> You win! Dealer lose! </b> <br> Your bankroll is now ${playerBankRoll}. Input a number to continue betting. <br><br>
    ${myImagesWin} <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}`
  }
  // 2.player & dealer both smaller than 21 & dealer > player
  // 2.dealer wins
  else if (sumOfPlayerCards <= 21 && sumOfDealerCards <= 21 && sumOfDealerCards > sumOfPlayerCards) {
    currentBet = -initialbet;
    playerBankRoll = playerBankRoll + currentBet;
    output = `<b> You lose:( Dealer wins! </b> <br> Your bankroll is now ${playerBankRoll}. Input a number to continue betting. <br><br>
    ${myImagesLose} <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}`
  }
  // 3.player busts
  // 3.dealer wins
  else if (sumOfPlayerCards > 21 && sumOfDealerCards <= 21) {
    currentBet = -initialbet;
    playerBankRoll = playerBankRoll + currentBet;
    output = `<b> You bust:( Dealer wins! </b> <br> Your bankroll is now ${playerBankRoll}. Input a number to continue betting.<br><br>
    ${myImagesLose} <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)} <br><br>`
  }
  // 4.player smaller than 21 & dealer busts
  // 4.player wins
  else if (sumOfPlayerCards <= 21 && sumOfDealerCards > 21) {
    currentBet = initialbet * 2;
    playerBankRoll = playerBankRoll + currentBet;
    output = `<b> You win! Dealer bust! </b> <br>Your bankroll is now ${playerBankRoll}. Input a number to continue betting. <br><br>
    ${myImagesWin} <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}`
  }
  // 6.both player same number
  // 6.tie
  else if (sumOfPlayerCards == sumOfDealerCards) {
    playerBankRoll = playerBankRoll;
    output = `<b> It's a tie! Dealer and you both got the same sum of cards! </b> <br>Your bankroll is now ${playerBankRoll}. Input a number to continue betting. <br><br>
    ${myImagesTie} <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)} <br><br>`
  }
  return output;
};

// check if there is blackjack after pushing card
var checkBlackJack = function () {
  var isBlackJack = false;
  if (sumOfPlayerCards == 21 && sumOfDealerCards == 21 || sumOfPlayerCards == 21 || sumOfDealerCards == 21) {
    isBlackJack = true;
  }
  return isBlackJack;
}

// If there is blackjack, output blackjack message
var outputBlackJackMessage = function () {
  // 1.player and dealer both blackjack
  if (sumOfPlayerCards == 21 && sumOfDealerCards == 21) {
    playerBankRoll = playerBankRoll;
    output =  `<b> It's a tie. Both the dealer and you got the black jack! </b> <br> Your bankroll is now ${playerBankRoll}. Input a number to continue betting. <br> <br>
    ${myImagesTie} <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}`;
    gameState = PLACE_BET;
  }
  // 2. only player blackjack
  else if (sumOfPlayerCards == 21) {
  currentBet = initialbet * 1.5;
  playerBankRoll = playerBankRoll + currentBet;
    output = `<b> You win by black jack! </b> <br> Your bankroll is now ${playerBankRoll}. Input a number to continue betting. <br> <br> 
    ${myImagesWin} <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}`
    gameState = PLACE_BET;
  }
  // 3. only dealer blackjack
  else if (sumOfDealerCards == 21) {
    currentBet = -initialbet;
    playerBankRoll = playerBankRoll + currentBet;
    output = `<b> You lose! Dealer wins by black jack! </b> <br> Your bankroll is now ${playerBankRoll}. Input a number to continue betting. <br> <br>
    ${myImagesLose} <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}`
    gameState = PLACE_BET;
  }
  return output;
};

// Additional Images on output result
var myImagesWin = '<img src = "https://steamuserimages-a.akamaihd.net/ugc/911281516661117210/612F5F6EB1BF8F1618FDD41ACEA486B74609CBDC/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"/ class="center">'
var myImagesLose = '<img src = "https://media.tenor.com/n4C8YTtBFrAAAAAC/howls-moving-castle-calcifer.gif"/ class="center">'
var myImagesTie = '<img src = "https://media.tenor.com/8VPQWQmFzZIAAAAC/howls-moving-castle-frying.gif"/ class="center">'

var inputIsHit = function () {
  drawCards = shuffledDeck.pop();
  playerCards.push(drawCards);
  sumOfPlayerCards = getSumOfPlayerCards(playerCards);
  sumOfDealerCards = getSumOfDealerCards(dealerCards);
  if (sumOfPlayerCards > 21) {
    currentBet = -initialbet;
    playerBankRoll = playerBankRoll + currentBet;
    output = `<b> You bust:( Dealer wins! </b> <br> Your bankroll is now ${playerBankRoll}. Input a number to continue betting.<br><br>
    ${myImagesLose} <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)} <br><br>`
    gameState = PLACE_BET;
  }
  else if (sumOfPlayerCards < 21) {
    output = `<b> Type "hit" to deal another card again or "stand" to pass. </b> <br><br>
    ${listPlayerCardsAndDealerFirstCards(playerCards, dealerCards)}`;
    gameState = PLAYER_HIT_OR_STAND;
  }
  else if (sumOfPlayerCards == 21) {
    while (sumOfDealerCards < 17) {
      drawCards = shuffledDeck.pop();
      dealerCards.push(drawCards);
      sumOfDealerCards = getSumOfDealerCards(dealerCards);
    };
    output = getComparedResult(sumOfPlayerCards, sumOfDealerCards);
    gameState = PLACE_BET;
  }
  return output;
}

// Main function Deck
var main = function (input) {
  if (gameState == PLACE_BET) {
    // if betting is less than player bank roll. Invalid
    if (playerBankRoll == 0) {
      return `<b> You lose all your money. Your bankroll is now 0. Please refresh the page to play the game again.</b>`;
    }
    else if (Number(input) > playerBankRoll) {
      return `<b> You cannot input a number larger than your bankroll. Your bankroll is ${playerBankRoll}. </b>`;
    }
    else if (Number(input) < 0) {
      return `<b> You cannot input a number smaller than 0. Your bankroll is ${playerBankRoll}. </b>`;
    }
    // if there isnt any input
    else if (input == "") {
      return `<b> You didn't input any numbers. Your bankroll is ${playerBankRoll}. Please input a number to bet. </b>`;
    }
    // if input is not number
    else if (isNaN(input) == true) {
      return `<b> Your input is not a number. Your bankroll is ${playerBankRoll}. Please input a number to bet. </b>`;
    }
    // if input is a number
    else {initialbet = input;
    output = `<b> Your bet is ${initialbet}. Click the submit button to deal two cards! </b>`;
    gameState = DEAL_CARDS;
    }
  }

  else if (gameState == DEAL_CARDS) {
    // deal two cards
    resetGame();
    dealCards(shuffledDeck);
    sumOfPlayerCards = getSumOfPlayerCards(playerCards);
    sumOfDealerCards = getSumOfDealerCards(dealerCards);
    var isblackjack = checkBlackJack();
    // check if there is blackjack after pushing card. If there is blackjack, output blackjack message
    if (isblackjack == true) {
      output = outputBlackJackMessage()
    }
    // 4. if there is no blackjack, game state -> player hit or stand
    else {
      output = `<b> Type "hit" to deal another card or "stand" to pass. </b> <br><br>
      ${listPlayerCardsAndDealerFirstCards(playerCards, dealerCards)}`;
      gameState = PLAYER_HIT_OR_STAND
    }
  }

  else if (gameState == PLAYER_HIT_OR_STAND) {
    // if player hit, add a card to array
    var input = input.toLowerCase();
    if (input == "hit") {
      output = inputIsHit();
      }
    // if player stand, game state -> compare result
    else if (input == "stand") {
      // if sum of dealer cards are larger or equal to 17, then dealer no need to deal
      // if sum of dealer cards are smaller than 17, dealer has to deal
      while (sumOfDealerCards < 17) {
        drawCards = shuffledDeck.pop();
        dealerCards.push(drawCards);
        sumOfDealerCards = getSumOfDealerCards(dealerCards);
      };
      console.log(sumOfDealerCards);
      output = getComparedResult(sumOfPlayerCards, sumOfDealerCards);
      gameState = PLACE_BET;
      }
    // wrong input
    else if (input != "hit" || input != "stand") {
      output = `<b> Wrong input:( You can only type "hit" to deal another card or "stand" to pass. </b> <br><br>
      ${listPlayerCardsAndDealerFirstCards(playerCards, dealerCards)}`
      gameState = PLAYER_HIT_OR_STAND;
    }
    console.log('sum of player cards: ' + sumOfPlayerCards);
    console.log('sum of dealer cards: ' + sumOfDealerCards);
  }
  return output;
}