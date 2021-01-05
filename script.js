var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];

  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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

// store player and dealer hand into an array
var playerHandArray = [];
var dealerHandArray = [];

// if the sum is <= 16, both have to draw, so the min sum is 16
var minSum = 16;

// if the sum is > 21, they busted and lose, so the max sum is 21
var maxSum = 21;

// black jack is when 2 cards sum = 21

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

// TODO: suit to emoji function and implement it
var convertSuitToEmoji = function (suitName) {
  var emoji = '';
  if (suitName == 'diamonds') {
    emoji = '♦️';
  }
  if (suitName == 'hearts') {
    emoji = '♥️';
  }
  if (suitName == 'spades') {
    emoji = '♠️';
  }
  if (suitName == 'clubs') {
    emoji = '♣️';
  }
  return emoji;
};

// this function help to display the hand array nicely,
// input the hand array, output an array of string
var displayHandArray = function (handArray) {
  var drawnCardArray = [];
  for (let i = 0; i < handArray.length; i += 1) {
    var drawnCard = ` ${handArray[i].name} of ${convertSuitToEmoji(handArray[i].suit)}`;
    drawnCardArray.push(drawnCard);
  }
  return drawnCardArray;
};

// this function determine the winner of the game, output player or dealer
var determineWinner = function () {
  if (sumOfHand(dealerHandArray) > maxSum) {
    return 'The dealer busted! You win!';
  }
  if (sumOfHand(playerHandArray) > sumOfHand(dealerHandArray)) {
    return 'You win!';
  }
  if (sumOfHand(playerHandArray) < sumOfHand(dealerHandArray)) {
    return 'Dealer win!';
  }
  if (sumOfHand(playerHandArray) == sumOfHand(dealerHandArray)) {
    return 'It\'s a tie';
  }
  if (dealerHandArray.length == 2 && sumOfHand(dealerHandArray) == 21) {
    return 'The dealer had a black Jack, Dealer win!';
  }
};

var currGameMode = 'dealCards';

var main = function (input) {
// there is 3 modes in the game: deal cards, player action, dealer action
// gema starts with deal cards

  if (currGameMode == 'dealCards') {
    // dealer gets 1 card
    var dealerCard = dealCardToHand();
    dealerHandArray.push(dealerCard);

    // player gets 1 card
    var playerCard = dealCardToHand();
    playerHandArray.push(playerCard);

    // dealer gets 1 card
    dealerCard = dealCardToHand();
    dealerHandArray.push(dealerCard);

    // player gets 1 card
    playerCard = dealCardToHand();
    playerHandArray.push(playerCard);

    // store in player and dealer card array

    console.log(playerHandArray);
    console.log(dealerHandArray);

    // change the game mode to player action
    currGameMode = 'playerAction';

    // return the player his drawn cards and tell him the sum of his cards

    // if the player's 2 cards sum is = 21, its a black jack and he automacally wins
    if (sumOfHand(playerHandArray) == 21) {
      return `You had: ${displayHandArray(playerHandArray)} <br> Your sum is ${sumOfHand(playerHandArray)} <br> It's a Black Jack! You won! <br> Refresh to start new game.`;
    }

    return `You had: ${displayHandArray(playerHandArray)} <br> The dealer had: ${displayHandArray(dealerHandArray)[0]} and a faced down card <br> So far your sum is ${sumOfHand(playerHandArray)} <br> Enter 'hit' to draw another card or 'stand' to stay at you current hand`;
  }

  // player get to choose whether he wants to 'hit', which is get another card,
  if (currGameMode == 'playerAction') {
    if (input == 'hit') {
      playerCard = dealCardToHand();
      playerHandArray.push(playerCard);

      // if the player busted(sum > 21), the player loses and the dealer wins
      if (sumOfHand(playerHandArray) > maxSum) {
        return `Now you have ${displayHandArray(playerHandArray)} <br> Your sum now is ${sumOfHand(playerHandArray)} <br> You busted! <br> Refresh to start new game.`;
      }
      return `Now you have ${displayHandArray(playerHandArray)} <br> Your sum now is ${sumOfHand(playerHandArray)} <br> Enter 'hit' to draw another card or 'stand' to stay at current hand`;
    }
    // or 'stand', which is stay at his current hand
    if (input == 'stand') {
      // change game mode to dealer action
      currGameMode = 'dealerAction';
      return `Your sum is ${sumOfHand(playerHandArray)} <br> Press 'submit' to reveal dealer's cards`;
    }
    if (input != 'hit' || input != 'stand') {
      return 'Please only enter either \'hit\' or \'stand\'';
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
        dealerCard = dealCardToHand();
        dealerHandArray.push(dealerCard);
      }
    }
    return `The dealer drawed a new card. <br> The dealer had: ${displayHandArray(dealerHandArray)} <br> The dealer sum is ${sumOfHand(dealerHandArray)} <br> ${determineWinner()} <br> Refresh to start new game`;
  }
};
