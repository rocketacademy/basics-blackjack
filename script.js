// username
var name = '';

// create deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  var suitIndex = 0;

  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;

    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var currentpoints = rankCounter;
      if (cardName == 1) {
        cardName = 'ace';
        currentpoints = 11;
      }
      else if (cardName == 11) {
        cardName = 'jack';
        currentpoints = 10;
      }
      else if (cardName == 12) {
        cardName = 'queen';
        currentpoints = 10;
      }
      else if (cardName == 13) {
        cardName = 'king';
        currentpoints = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        points: currentpoints,
      };
      cardDeck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};
// shuffle deck
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

// ai array
var dealerCards = [];
var dealerPoints = [];
var dealerCardsInDetail = [];
var sumOfDealerPoints = 0;
// player array
var playerCards = [];
var playerPoints = [];
var playerCardsInDetail = [];
var sumOfPlayerPoints = 0;
var bet = '';
var playerMoney = 100;
var moneyBet = 0;

// ai draw a card (unknown card)
// player draws 2 caeds
var main = function (input) {
  if (!name) {
    // If the user did not input anything, prompt them to enter something
    // as their user name.
    if (!input) {
      return 'Please input something :(';
    }
    name = input;

    return 'Welcome ' + name + '! Enter the amount of money you wish to bet. (Integers Only!)';
  }

  // $$$ setup
  if (!bet) {
    if (isNaN(input) == true && input != 'start' && input != 'restart' && input != 'hit' && input != 'stand') {
      return 'enter integers only!';
    }
    if (playerMoney < input) {
      return 'you only have $' + playerMoney;
    }

    if (playerMoney > input) { moneyBet = input;
      playerMoney -= moneyBet;
      return 'you bet: $' + moneyBet + '<br> You have $' + playerMoney + ' left' + "<br> Type 'start' to begin BlackJack!";
    }
  }

  // finally the game starts
  if (input == 'start') {
    console.log(shuffledDeck);
    const dealerDraw = shuffledDeck.pop();
    const dealerPoints1 = dealerDraw.points;
    const dealerName = dealerDraw.name;
    dealerCards.push(dealerName);
    dealerPoints.push(dealerPoints1);
    dealerCardsInDetail.push(dealerDraw);
    console.log(dealerDraw);
    console.log(dealerPoints1);
    console.log(dealerName);

    const playerDraw1 = shuffledDeck.pop();
    const playerrPoints1 = playerDraw1.points;
    const playerrName1 = playerDraw1.name;
    playerCards.push(playerrName1);
    playerPoints.push(playerrPoints1);
    playerCardsInDetail.push(playerDraw1);
    console.log(playerDraw1);
    console.log(playerrPoints1);
    console.log(playerrName1);

    const playerDraw2 = shuffledDeck.pop();
    const playerPoints2 = playerDraw2.points;
    const playerName2 = playerDraw2.name;
    playerCards.push(playerName2);
    playerPoints.push(playerPoints2);
    playerCardsInDetail.push(playerDraw2);
    console.log(playerDraw2);
    console.log(playerPoints2);
    console.log(playerName2);

    // summation of points
    sumOfPlayerPoints = playerPoints.reduce((a, b) => a + b, 0);

  	if (sumOfPlayerPoints == 21) {
      playerMoney = playerMoney + 2 * moneyBet;
      return 'BlackJack! You win!' + '<br> Your cards:  ' + playerCards + '<br> your score: ' + sumOfPlayerPoints + '<br> You currently have $' + playerMoney + "<br> Type 'restart' if you wish to play again! :) ";
    }
  	return 'dealer cards: Unknown card & ' + dealerCards + '<br> Your Cards: ' + playerCards + "<br> Do you want to 'hit' or 'stand'? " + sumOfPlayerPoints;
  }

  // hit = draw, stand = vs
  if (input == 'hit') {
    console.log(shuffledDeck);
    const playerDrawHit = shuffledDeck.pop();
    const playerrPointsHit = playerDrawHit.points;
    const playerrNameHit = playerDrawHit.name;
    playerCards.push(playerrNameHit);
    playerPoints.push(playerrPointsHit);
    playerCardsInDetail.push(playerDrawHit);
    console.log(playerDrawHit);
    console.log(playerrPointsHit);
    console.log(playerrNameHit);
    // summation of points
    sumOfPlayerPoints = playerPoints.reduce((a, b) => a + b, 0);

    if (sumOfPlayerPoints > 21 && playerCards.includes('ace')) {
    	  sumOfPlayerPoints = sumOfPlayerPoints - 10;

      return 'dealer cards: Unknown card & ' + dealerCards + '<br> Your Cards: ' + playerCards + "<br> Do you want to 'hit' or 'stand'? " + sumOfPlayerPoints; }

    if (sumOfPlayerPoints > 21 && playerCards.includes('ace') == false) {
      return 'bust! You lose!' + '<br> Your cards:  ' + playerCards + '<br> your score: ' + sumOfPlayerPoints + '<br> you currently have $' + playerMoney + "<br> Type 'restart' if you wish to play again! :) ";
    }
    if (sumOfPlayerPoints == 21) {
      playerMoney = playerMoney + 2 * moneyBet;
      return 'BlackJack! You win!' + '<br> Your cards:  ' + playerCards + '<br> your score: ' + sumOfPlayerPoints + '<br> you currently have: $' + playerMoney + "<br> Type 'restart' if you wish to play again! :) ";
    }

  	return 'dealer cards: Unknown card & ' + dealerCards + '<br> Your Cards: ' + playerCards + "<br> Do you want to 'hit' or 'stand'? " + sumOfPlayerPoints;
  }

  // player choose to hit or stand
  // if stand, reveal unknwon card
  if (input == 'stand') {
    console.log(shuffledDeck);
    while (sumOfDealerPoints < 16) {
      const dealerDrawStand = shuffledDeck.pop();
      const dealerPointsStand = dealerDrawStand.points;
      const dealerNameStand = dealerDrawStand.name;
      dealerCards.push(dealerNameStand);
      dealerPoints.push(dealerPointsStand);
      dealerCardsInDetail.push(dealerDrawStand);
      console.log(dealerDrawStand);
      console.log(dealerPointsStand);
      console.log(dealerNameStand);

      // summation of points
      sumOfDealerPoints = dealerPoints.reduce((a, b) => a + b, 0);
    }

  	if (sumOfPlayerPoints > sumOfDealerPoints || sumOfDealerPoints > 21) {
      playerMoney = playerMoney + 2 * moneyBet;
      return 'You WIN!!! ' + '<br> Your Score: ' + sumOfPlayerPoints + '<br> Your cards:  ' + playerCards + '<br> Dealer Score: ' + sumOfDealerPoints + '<br> Dealer cards:  ' + dealerCards + '<br> you currently have: $' + playerMoney + "<br> Type 'restart' if you wish to play again! :) ";
    }

    if (sumOfPlayerPoints < sumOfDealerPoints) {
      return 'You LOSE!!! ' + '<br> Your Score: ' + sumOfPlayerPoints + '<br> Your cards:  ' + playerCards + '<br> Dealer Score: ' + sumOfDealerPoints + '<br> Dealer cards:  ' + dealerCards + '<br> you currently have: $' + playerMoney + "<br> Type 'restart' if you wish to play again! :) ";
    }
  }
  // resets hand cards and deck
  if (input == 'restart') {
    // reset and reshuffle the deck
    shuffledDeck = shuffleCards(deck);
    shuffledDeck = shuffledDeck.concat(dealerCardsInDetail);
    shuffledDeck = shuffledDeck.concat(playerCardsInDetail);

    console.log(shuffledDeck);

    // resets hand cards
    dealerCards = [];
    dealerPoints = [];
    dealerCardsInDetail = [];
    sumOfDealerPoints = 0;
    // player array
    playerCards = [];
    playerPoints = [];
    playerCardsInDetail = [];
    sumOfPlayerPoints = 0;

    return 'enter the amount you wish to bet if you wish to play again';
  }
};
