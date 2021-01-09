var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];

  var suits = ['♥️', '♦️', '♣️', '♠️'];

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
    }
    suitIndex = suitIndex + 1;
  }

  return deck;
};

// shuffle cards
// get a random index from an array given it's size
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// cards is an array of card objects
var shuffleCards = function (cards) {
  var currentIndex = 0;

  // loop over the entire cards array
  while (currentIndex < cards.length) {
    // select a random position from the deck
    var randomIndex = getRandomIndex(cards.length);

    // get the current card in the loop
    var currentItem = cards[currentIndex];

    // get the random card
    var randomItem = cards[randomIndex];

    // swap the current card and the random card
    cards[currentIndex] = randomItem;
    cards[randomIndex] = currentItem;

    currentIndex = currentIndex + 1;
  }

  // give back the shuffled deck
  return cards;
};

var cards = shuffleCards(makeDeck());

// ***********GLOBLE**************** //

// store player and dealer hand into an array
var playerHandArray = [];
var dealerHandArray = [];
var playerHandArray1 = [];
var playerHandArray2 = [];

// if the sum is <= 16, both have to draw, so the min sum is 16
var minSum = 16;

// if the sum is > 21, they busted and lose, so the max sum is 21
var maxSum = 21;

var playerName = '';

var betAmount;

var currGameMode = 'askName';

// **************HELPER FUNCTIONS****************** //

// this funciton deal cards to hands
var dealCardToHand = function () {
  var dealedCard = cards.pop();
  return dealedCard;
};

// this function generates the sum of the hand by looping through the hand array
// and return a sum
var sumOfHand = function (handArray) {
  var sum = 0;
  handArray.forEach((card) => {
    if (card.rank > 1 && card.rank <= 10) {
      sum += card.rank;
    } else if (card.rank > 10) {
      sum += 10;
    } else if (card.rank == 1) {
      if (sum <= 10) {
        sum += 11;
      } else if (sum > 10) {
        sum += 1;
      }
    }
  });
  return sum;
};

// this function help to display the hand array nicely,
// input the hand array, output an array of string
var displayHandArray = function (handArray) {
  var drawnCardArray = [];
  for (let i = 0; i < handArray.length; i += 1) {
    var drawnCard = ` ${handArray[i].name} of ${handArray[i].suit}`;
    drawnCardArray.push(drawnCard);
  }
  return drawnCardArray;
};

// this function determine the winner of the game, output player or dealer
var determineWinner = function () {
  if (sumOfHand(dealerHandArray) > maxSum) {
    betAmount = betAmount * 2;
    return `The dealer busted! You win! You now have 💰 ${betAmount}`;
  }
  if (dealerHandArray.length == 2 && sumOfHand(dealerHandArray) == 21) {
    betAmount = 0;
    return `The dealer had a black Jack, Dealer win! You now have 💰 ${betAmount}`;
  }
  if (playerHandArray1.length == 0 && playerHandArray2 == 0) {
    if (sumOfHand(playerHandArray) > sumOfHand(dealerHandArray)) {
      betAmount = betAmount * 2;
      return `You win! You now have 💰 ${betAmount}`;
    }
    if (sumOfHand(playerHandArray) < sumOfHand(dealerHandArray)) {
      betAmount = 0;
      return `Dealer win! You now have 💰 ${betAmount}`;
    }
    if (sumOfHand(playerHandArray) == sumOfHand(dealerHandArray)) {
      betAmount = betAmount + (betAmount / 2);
      return `It's a tie! You now have 💰 ${betAmount}`;
    }
  }
  if (playerHandArray1.length > 0) {
    if (sumOfHand(playerHandArray1) > sumOfHand(dealerHandArray)) {
      var message1 = 'Your first hand won!';
    }
    if (sumOfHand(playerHandArray1) < sumOfHand(dealerHandArray)) {
      message1 = 'Your first hand lost!';
    }
    if (sumOfHand(playerHandArray1) == sumOfHand(dealerHandArray)) {
      message1 = 'Your first hand is a tie!';
    }
    if (sumOfHand(playerHandArray1) > maxSum) {
      message1 = 'Your first hand busted!';
    }
  }
  if (playerHandArray2.length > 0) {
    if (sumOfHand(playerHandArray2) > sumOfHand(dealerHandArray)) {
      var message2 = 'Your second hand won!';
    }
    if (sumOfHand(playerHandArray2) < sumOfHand(dealerHandArray)) {
      message2 = 'Your second hand lost!';
    }
    if (sumOfHand(playerHandArray2) == sumOfHand(dealerHandArray)) {
      message2 = 'Your second hand is a tie!';
    }
    if (sumOfHand(playerHandArray2) > maxSum) {
      message2 = 'Your second hand busted!';
    }
  }
  return message1 + '<br>' + message2;
};

// ************
// ************
// ************
// main function here
// ************
// ************
// ************

// var singleCard = {
//   name: '10',
//   suit: '♣️',
//   rank: 10,
// };

var main = function (input) {
// gema starts with asking the player's name
  if (currGameMode == 'askName') {
    playerName = input;
    currGameMode = 'enterBet';
    return `Hello ${playerName}, Please enter your bet amount 💰💰`;
  }

  if (currGameMode == 'enterBet') {
    betAmount = Number(input);
    currGameMode = 'dealCards';
    return `${playerName} 😌 <br> You have ${betAmount} to bet! <br> Good Luck! 😘 <br> Click 'submit' to get your hand.`;
  }

  if (currGameMode == 'dealCards') {
    // dealer gets 1 card
    dealerHandArray.push(dealCardToHand());

    // player gets 1 card
    playerHandArray.push(dealCardToHand());
    // playerHandArray.push(singleCard);

    // dealer gets 1 card
    dealerHandArray.push(dealCardToHand());

    // player gets 1 card
    playerHandArray.push(dealCardToHand());
    // playerHandArray.push(singleCard);

    // store in player and dealer card array

    console.log(playerHandArray);
    console.log(dealerHandArray);

    // the the player's cards are have the same suit, change to split or not game mode
    if (playerHandArray[0].rank == playerHandArray[1].rank) {
      currGameMode = 'split or not';
      return `${playerName} <br> You had: <br> ${displayHandArray(playerHandArray)} <br> Do you want to split your cards? <br> Enter 'yes or 'no'`;
    }

    // if the player's 2 cards sum is = 21, its a black jack and he automacally wins
    if (sumOfHand(playerHandArray) == maxSum) {
      betAmount = betAmount * 2;
      return `You had: ${displayHandArray(playerHandArray)} <br> Your sum is ${sumOfHand(playerHandArray)} <br> It's a Black Jack! You won! <br> You have 💰 ${betAmount} now <br> Refresh to start new game`;
    }
    // if not, return the player his drawn cards and tell him the sum of his cards,
    // change the game mode to player action
    currGameMode = 'playerAction';
    return `${playerName} <br> You had: ${displayHandArray(playerHandArray)} <br> <br> So far your sum is ${sumOfHand(playerHandArray)} <br> <br> Enter 'hit' to draw another card or 'stand' to stay at you current hand`;
  }

  // player choose to split or not
  if (currGameMode == 'split or not') {
    // if yes, store the cards into 2 arrays and the game mode change to player first hand
    if (input == 'yes') {
      currGameMode = 'playerFirstHandsAction';
      playerHandArray1.push(playerHandArray[0]);
      playerHandArray1.push(dealCardToHand());

      playerHandArray2.push(playerHandArray[1]);
      playerHandArray2.push(dealCardToHand());

      // this determine whether the player had a black jack after spliting.
      if (playerHandArray1.length == 2 && sumOfHand(playerHandArray1) == maxSum) {
        betAmount = betAmount * 2;
        return `You had: ${displayHandArray(playerHandArray1)} <br> Your sum is ${sumOfHand(playerHandArray1)} <br> It's a Black Jack! You won this hand! <br> You have 💰 ${betAmount} now <br> Enter 'next' for your second hand`;
      }

      return `You splited! <br> Your first hand is ${displayHandArray(playerHandArray1)} <br> Your sum is ${sumOfHand(playerHandArray1)} <br> Enter 'hit' to draw another card or 'stand' to stay at you current hand`;
    }
    if (input == 'no') {
      currGameMode = 'playerAction';
      return `This is your current hand: ${displayHandArray(playerHandArray)} <br> Your sum is ${sumOfHand(playerHandArray)} <br> Enter 'hit' to draw another card or 'stand' to stay at you current hand`;
    }
  }

  // player get to choose whether he wants to 'hit', which is get another card,
  if (currGameMode == 'playerFirstHandsAction') {
    if (input == 'hit') {
      playerHandArray1.push(dealCardToHand());

      if (sumOfHand(playerHandArray1) > maxSum) {
        return `Now you have ${displayHandArray(playerHandArray1)} <br> Your sum now is ${sumOfHand(playerHandArray1)} <br> You busted! <br> Enter 'next' for your second Hand`;
      }

      return `Now you have ${displayHandArray(playerHandArray1)} <br> Your sum now is ${sumOfHand(playerHandArray1)} <br> Enter 'hit' to draw another card or 'stand' to stay at current hand`;
    }
    // or 'stand', which is stay at his current hand
    if (input == 'stand') {
      // change game mode to playerSecondHandAction
      currGameMode = 'playerSecondHandAction';
      return `Your sum is ${sumOfHand(playerHandArray1)} <br> Enter 'next' for your seocnd hand`;
    }

    if (input != 'hit' || input != 'stand' || input != 'next') {
      return 'Please only enter either \'hit\' or \'stand\' or \'next\'';
    }
  }
  if (currGameMode == 'playerSecondHandAction') {
    if (input == 'next') {
      if (playerHandArray2.length == 2 && sumOfHand(playerHandArray2) == maxSum) {
        currGameMode = 'dealerAction';
        betAmount = betAmount * 2;
        return `You had: ${displayHandArray(playerHandArray2)} <br> Your sum is ${sumOfHand(playerHandArray2)} <br> It's a Black Jack! You won this hand! <br> You have 💰 ${betAmount} now <br> Click 'submit' to see the other result`;
      }
      return `This is your second hand. <br> <br> You had ${displayHandArray(playerHandArray2)} <br> Your sum is ${sumOfHand(playerHandArray2)} <br> Enter 'hit' to draw another card or 'stand' to stay at you current hand`;
    }
    if (input == 'hit') {
      playerHandArray2.push(dealCardToHand());
      if (sumOfHand(playerHandArray2) > maxSum) {
        currGameMode = 'dealerAction';
        return `This is your second Hand! <br> <br> Now you have ${displayHandArray(playerHandArray2)} <br> Your sum now is ${sumOfHand(playerHandArray2)} <br> You busted! <br> Click 'submit' to see your result`;
      }
      return `This is your second hand! <br> <br> Now you have ${displayHandArray(playerHandArray2)} <br> Your sum now is ${sumOfHand(playerHandArray2)} <br> Enter 'hit' to draw another card or 'stand' to stay at current hand`;
    }
    // or 'stand', which is stay at his current hand
    if (input == 'stand') {
      // change game mode to dealerAction
      currGameMode = 'dealerAction';
      return `Your sum is ${sumOfHand(playerHandArray2)} <br> Click 'submit' for the dealer turn`;
    }
    if (input != 'hit' || input != 'stand' || input != 'next') {
      return 'Please only enter either \'hit\' or \'stand\'';
    }
  }

  if (currGameMode == 'playerAction') {
    if (input == 'hit') {
      playerHandArray.push(dealCardToHand());
      if (sumOfHand(playerHandArray) > 21) {
        betAmount = 0;
        return `Now you have ${displayHandArray(playerHandArray)} <br> Your sum now is ${sumOfHand(playerHandArray)} <br> You busted! <br> You have 💰 ${betAmount} now <br> Refresh to start new game`;
      }
      return `Now you have ${displayHandArray(playerHandArray)} <br> Your sum now is ${sumOfHand(playerHandArray)} <br> Enter 'hit' to draw another card or 'stand' to stay at current hand`;
    }
    if (input == 'stand') {
      currGameMode = 'dealerAction';
      return `Your sum is ${sumOfHand(playerHandArray)} <br> Click 'submit' for the dealer turn`;
    }
  }

  if (currGameMode == 'dealerAction') {
  // if the sum of 2 cards > 16 and <= 21, the dealer stay
  // whoever had the higher sum of cards wins
    if (sumOfHand(dealerHandArray) > minSum && sumOfHand(dealerHandArray) <= maxSum) {
      return `The dealer had: ${displayHandArray(dealerHandArray)} <br> The dealer sum is ${sumOfHand(dealerHandArray)} <br> ${determineWinner()} <br> Refresh to start new game`;
    }

    // if the sum of the two cards is <= 16, the dealer needs to the hit another card
    // untill the sum is > 16
    // winning conditions as above
    for (let i = 0; i < dealerHandArray.length; i += 1) {
      if (sumOfHand(dealerHandArray) <= minSum) {
        dealerHandArray.push(dealCardToHand());
      }
    }
    return `The dealer drawed a new card. <br> The dealer had: ${displayHandArray(dealerHandArray)} <br> The dealer sum is ${sumOfHand(dealerHandArray)} <br> ${determineWinner()} <br> Refresh to start new game`;
  }
};
