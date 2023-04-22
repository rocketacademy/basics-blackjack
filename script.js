// -- Basics --
// 1.Deck is shuffled.
// 2.User clicks Submit to deal cards.
// 3.The cards are analysed for game winning conditions, e.g. Blackjack.
// 4.The cards are displayed to the user.
// 5.The user decides whether to hit or stand, using the submit button to submit their choice.
// 6.The user's cards are analysed for winning or losing conditions.
// 7.The dealer decides to hit or stand automatically based on game rules.
// 8.The game either ends or continues.

// global variables
// game states
var DEAL_CARDS = "deal cards";
var PLAYER_HIT_OR_STAND = "player hit or stand";
var COMPARED_RESULT = "compared result";
var GameState = DEAL_CARDS;

var output;
var playerCards = [];
var dealerCards = [];
var numberCountArray = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th']

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

// Get a random Number ranging from 0 (inclusive) to max (exclusive).
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

// the player & dealer get 2 cards
var dealCards = function (shuffledDeck) {
  for (counter = 0; counter < 2; counter += 1) {
    // draw cards from deck
    var playerDrawCards = shuffledDeck.pop();
    var dealerDrawCards = shuffledDeck.pop();
    console.log ('player card 1: ' + playerDrawCards[0],
    'player card 2: ' + playerDrawCards[1],
    'dealer card 1: ' + dealerDrawCards[0],
    'dealer card 2: ' + dealerDrawCards[1])
    // push card to array
    playerCards.push(playerDrawCards);
    dealerCards.push(dealerDrawCards);
  }
  output = `Type "hit" to deal another card or "stand" to pass. <br><br>
  ${listPlayerCardsAndDealerFirstCards(playerCards, dealerCards)}`;
  return output;
};

// if sum is not 21, the player choose to hit or stand
var getSumOfPlayerCards = function (playerCards) {
  var sumOfPlayerCards = 0;
  for (counter = 0; counter < playerCards.length; counter += 1) {
    var currentCard = playerCards[counter];
    if (currentCard.name == 'jack' || currentCard.name == 'queen' || currentCard.name == 'king') {
      sumOfPlayerCards = sumOfPlayerCards + 10
      console.log(sumOfPlayerCards);
      }
    else {
      sumOfPlayerCards = sumOfPlayerCards + currentCard.rank;
      console.log(sumOfPlayerCards);
    }
  };
  return sumOfPlayerCards;
};

// if sum is not 21, the dealer cards automactically hit or stay
var getSumOfDealerCards = function (dealerCards) {
  var sumOfDealerCards = 0;
  var counter;
  // Calculate initial dealer cards sum first
  for (counter = 0; counter < dealerCards.length; counter += 1) {
    var currentCard = dealerCards[counter];
    if (currentCard.name == 'jack' || currentCard.name == 'queen' || currentCard.name == 'king') {
      sumOfDealerCards = sumOfDealerCards + 10
      console.log(sumOfDealerCards);
    }
    else {
      sumOfDealerCards = sumOfDealerCards + currentCard.rank;
      console.log(sumOfDealerCards);
    }
  }
  return sumOfDealerCards;
};

// if sum of dealer cards are larger or equal to 17, then dealer no need to deal
// if sum of dealer cards are smaller than 17, dealer has to deal
// ! Problem! wanna run this function in main
var autoHitOrStandDealer = function () {
  var sumOfDealerCards = getSumOfDealerCards();
  while (sumOfDealerCards <= 16) {
    var drawCards = shuffledDeck.pop();
    dealerCards.push(drawCards);
  };
};

// player input hit or stand
var inputHitOrStand = function (input, shuffledDeck) {
  if (input == "hit") {
    drawCards = shuffledDeck.pop();
    console.log(drawCards);
    playerCards.push(drawCards);
    console.log(playerCards);
    output = `Type "hit" to deal another card or "stand" to pass. <br><br>
    ${listPlayerCardsAndDealerFirstCards(playerCards, dealerCards)}`;
    GameState = PLAYER_HIT_OR_STAND;
  }
  else if (input == "stand") {
    GameState = COMPARED_RESULT;
    output = `${getComparedResult()}`;
  }
  // else if (input !== "hit" || input !== "stand" ) {
  //   output = `You can only type "hit" to deal another card or "stand" to pass. <br><br>
  //   ${listPlayerCardsAndDealerFirstCards(playerCards, dealerCards)}`
  // }
  return output;
};

// output message showing player's and dealer's cards. Dealer's second card not shown.
// ! Problem! only showing the last card
var listPlayerCardsAndDealerFirstCards = function (playerCards, dealerCards) {
  var sumOfPlayerCards = getSumOfPlayerCards(playerCards);
  var playerMessage = '';
  var playerCardMessage;
  var counter;
  for (counter = 0; counter < playerCards.length; counter += 1) {
    playerCardMessage = `${numberCountArray[counter]}: ${playerCards[counter].name} ${playerCards[counter].suit} <br>
    <b> Sum: ${sumOfPlayerCards} </b>`
  };
  playerMessage = `<u> Your Cards </u> <br>` + playerCardMessage;
  console.log(playerMessage)
  var dealerMessage = `<u> Dealer Cards </u> <br>
    ${numberCountArray[0]}: ${dealerCards[0].name} ${dealerCards[0].suit} <br>
    2nd: hidden <br>
    <b> Sum: hidden </b> `;
  console.log(dealerMessage);
  return `${playerMessage} <br><br> ${dealerMessage}`;
};

// output message showing player's and dealer's cards. Dealer's second cards shown.
// ! Problem! only showing the last card
var listPlayerCardsAndDealerCards = function (playerCards, dealerCards) {
  var sumOfPlayerCards = getSumOfPlayerCards(playerCards);
  var sumOfDealerCards = getSumOfDealerCards(dealerCards);
  var playerMessage = ''
  var counter;
  for (counter = 0; counter < playerCards.length; counter += 1) {
    playerMessage = `<u> Your Cards </u> <br>
    ${numberCountArray[counter]}: ${playerCards[counter].name} ${playerCards[counter].suit} <br>
    Sum: ${sumOfPlayerCards}`;
  };

  var dealerMessage = ''
  for (counter = 0; counter < dealerCards.length; counter += 1) {
    dealerMessage = `<u> Dealer Cards </u> <br>
    ${numberCountArray[counter]}: ${dealerCards[counter].name} ${dealerCards[counter].suit} <br>
    Sum: ${sumOfDealerCards}`;
  };
  return `${playerMessage} <br><br> ${dealerMessage}`;
};

// if sum of player's or dealer's card is 21 at anytime, the round of game ends
// ! Problem! wanna run this function in main
var sumOfCards21 = function (sumOfPlayerCards, sumOfDealerCards) {
  var sumOfCardsIs21 = false;
  if (sumOfPlayerCards == 21 && sumOfDealerCards == 21) {
    output = `<b> It's a draw. Both the dealer and you got the black jack! </b> <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}}`;
    sumOfCardsIs21 = true;
  } else if (sumOfPlayerCards == 21) {
    output = `<b> You win by black jack! </b> <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}}`
    sumOfCardsIs21 = true;
  } else if (sumOfDealerCards == 21) {
    output = `<b> You lose! Dealer wins by black jack! </b> <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}}`
    sumOfCardsIs21 = true;
  }
  return output;
};

// Compare Result of player and dealer
// 21 case is mentioned on function sumOfCards21())
var getComparedResult = function () {
  var sumOfPlayerCards = getSumOfPlayerCards(playerCards);
  var sumOfDealerCards = getSumOfDealerCards(dealerCards);
  // 1.player & dealer both smaller than 21 & player > dealer
  // 1.player wins
  if (sumOfPlayerCards < 21 && sumOfDealerCards < 21 && sumOfPlayerCards > sumOfDealerCards) {
    output = `<b> You win! Dealer lose! </b> <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}`
  }
  // 2.player & dealer both smaller than 21 & dealer > player
  // 2.dealer wins
  else if (sumOfPlayerCards < 21 && sumOfDealerCards < 21 && sumOfDealerCards > sumOfPlayerCards) {
    output = `<b> You lose! Dealer wins! </b> <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}`
  }
  // 3.player busts & dealer smaller to 21
  // 3.dealer wins
  else if (sumOfPlayerCards > 21 && sumOfDealerCards < 21) {
    output = `<b> You bust! Dealer wins! </b> <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}`
  }
  // 4.player smaller than 21 & dealer busts
  // 4.player wins
  else if (sumOfPlayerCards < 21 && sumOfDealerCards > 21) {
    output = `<b> You win! Dealer bust! </b> <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}`
  }
  // 5.both player busts
  // 5.tie
  else if (sumOfPlayerCards > 21 && sumOfDealerCards > 21) {
    output = `<b> It's a tie! Dealer and you both bust! </b> <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}`
  }
  // 6.both player same number but not 21
  // 6.tie
  else if (sumOfPlayerCards == !21 && sumOfPlayerCards == sumOfDealerCards) {
    output = `<b> It's a tie! Dealer and you both got the same sum of cards! </b> <br> <br>
    ${listPlayerCardsAndDealerCards(playerCards, dealerCards)}`
  }
  return output;
};

// Main function Deck
var main = function (input) {
  var deck = makeDeck();
  var shuffledDeck = shuffleCards(deck);
  
  if (GameState == DEAL_CARDS) {
    output = dealCards(shuffledDeck);
    GameState = PLAYER_HIT_OR_STAND;
  }
  var sumOfCardsEqualsTo21 = sumOfCards21(sumOfPlayerCards,sumOfDealerCards)
  if (sumOfCardsEqualsTo21 == true) {
    output = sumOfCardsEqualsTo21;
    GameState = DEAL_CARDS;
    // This is not working!
    // please run this function TT!
  }
  else if (GameState == PLAYER_HIT_OR_STAND) {
    var sumOfPlayerCards = getSumOfPlayerCards(playerCards);
    var sumOfDealerCards = getSumOfDealerCards(dealerCards);
    output = inputHitOrStand(input, shuffledDeck);
    console.log(sumOfPlayerCards);
    console.log(sumOfDealerCards);
  }
  else if (GameState == COMPARED_RESULT) {
    var hitOrStandDealer = autoHitOrStandDealer();
    if (hitOrStandDealer == true) {
      // This is not working!
      // please run this function TT!
    };
    output = getComparedResult();
    GameState = DEAL_CARDS;
  }
  return output;
}