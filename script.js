var generateRandomIndex = function (max) {
  var randomDecimal = Math.random() * max;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger;
};

var cardDeck = [];
var playersHand = [];
var dealersHand = [];
var gameMode = "deal";
var playersCard1 = 0;
var playersCard2 = 0;
var dealersCard1 = 0;
var dealersCard2 = 0;
var playersTotal = 0;
var dealersTotal = 0;

var main = function (input) {
  if (gameMode == "reset") {
    reset();
  }
  if (input == "end") {
    gameMode = "end";
  }
  if (gameMode == "end") {
    dealersPlay();
    if (dealersTotal > 21) {
      gameMode = "reset";
      return "The dealer busted his hand. You win!";
    }
    gameMode = "reset";
    return compareResults();
  }
  if (input == "draw") {
    gameMode = "draw";
  }
  if (gameMode == "draw") {
    return playersPlay();
  }
  if (gameMode == "deal") {
    createNShuffleDeck();
    return dealCards();
  }
};

//initialize deck of cards
var createNShuffleDeck = function () {
  var suits = ["hearts", "clubs", "spades", "diamonds"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var rankValue = rankCounter;
      var cardName = rankValue;
      if (rankCounter == 1) {
        cardName = "Ace";
      }
      if (rankCounter == 11) {
        cardName = "Jack";
        rankValue = 10;
      }
      if (rankCounter == 12) {
        cardName = "Queen";
        rankValue = 10;
      }
      if (rankCounter == 13) {
        cardName = "King";
        rankValue = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }

  //shuffle deck of cards
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = generateRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  console.log("Shuffled card deck:", cardDeck);
  return cardDeck;
};

//pop player's and dealer's cards, output player's hand
var dealCards = function (input) {
  playersCard1 = cardDeck.pop();
  playersHand.push(playersCard1);
  playersCard2 = cardDeck.pop();
  playersHand.push(playersCard2);
  console.log("Player's array:", playersHand);
  // dealersCard1 = cardDeck.pop();
  dealersCard1 = { name: "Ace", suit: "hearts", rank: 1 };
  dealersHand.push(dealersCard1);
  dealersCard2 = cardDeck.pop();
  dealersHand.push(dealersCard2);
  console.log("Dealer's array:", dealersHand);

  //first ace is always 11 except for if both cards are aces
  if (playersCard1.name == "Ace") {
    playersCard1.rank = 11;
  }
  if (playersCard2.name == "Ace") {
    playersCard2.rank = 11;
  }
  if (playersCard1.rank + playersCard2.rank > 21) {
    playersCard1.rank = 1;
  }
  playersTotal = Number(playersCard1.rank) + Number(playersCard2.rank);
  console.log("Player's Total:", playersTotal);

  if (dealersCard1.name == "Ace") {
    dealersCard1.rank = 11;
    console.log("Dealer's Ace rank: 11");
  }
  if (dealersCard2.name == "Ace") {
    dealersCard2.rank = 11;
    console.log("Dealer's Ace rank: 11");
  }
  if (dealersCard1.rank + dealersCard2.rank > 21) {
    dealersCard1.rank = 1;
    console.log("Double Ace - dealer's Ace reverts to 1: card 1", dealersHand);
  }
  dealersTotal = Number(dealersCard1.rank) + Number(dealersCard2.rank);
  console.log("Dealer's Total:", dealersTotal);

  //check for Blackjack
  var myOutputValue;
  if (
    (dealersCard1.name == "Ace" && dealersCard2.rank == 10) ||
    (dealersCard2.name == "Ace" && dealersCard1.rank == 10)
  ) {
    gameMode = "reset";
    myOutputValue = "The dealer got a natural blackjack! You lose.";
  } else if (
    (playersCard1.name == "Ace" && playersCard2.rank == 10) ||
    (playersCard2.name == "Ace" && playersCard1.rank == 10)
  ) {
    gameMode = "reset";
    myOutputValue = "You got a natural blackjack! You win.";
  } else if (
    ((dealersCard1.name == "Ace" && dealersCard2.rank == 10) ||
      (dealersCard2.name == "Ace" && dealersCard1.rank == 10)) &&
    ((playersCard1.name == "Ace" && playersCard2.rank == 10) ||
      (playersCard2.name == "Ace" && playersCard1.rank == 10))
  ) {
    myOutputValue =
      "Both you and the dealer got natural blackjacks! It's a tie.";
  } else {
    myOutputValue =
      "You got " +
      playersCard1.name +
      " of " +
      playersCard1.suit +
      " and " +
      playersCard2.name +
      " of " +
      playersCard2.suit +
      ". Your total is " +
      playersTotal +
      " points. Enter 'draw' to draw another card or 'end' if you're satisfied with your cards.";
  }
  return myOutputValue;
};

//player inputs "draw" to draw another card or "end" to compare hands
var playersPlay = function () {
  playersTotal = 0;
  var playersDrawCard = cardDeck.pop();
  console.log("Player's Draw Card:", playersDrawCard);
  playersHand.push(playersDrawCard);
  var arrayIndex = 0;
  while (arrayIndex < playersHand.length) {
    //first ace is always 11 except for if both cards are aces
    if (
      (arrayIndex == "0" || arrayIndex == "1") &&
      playersHand[arrayIndex].name == "Ace"
    ) {
      playersHand[arrayIndex].rank = 11;
      console.log("Array Index:", arrayIndex);
      console.log("Player's Ace rank: 11");
    }
    if (playersHand[0].rank + playersHand[1].rank > 21) {
      playersHand[0].rank = 1;
      console.log("Array Index:", arrayIndex);
      console.log("Double Ace - player's Ace reverts to 1:", playersHand);
    }
    playersTotal += Number(playersHand[arrayIndex].rank);
    arrayIndex += 1;
  }
  console.log("Player's total before recount:", playersTotal);
  //if player's total hand exceeds 21, revert ace with a 11 value to ace with a 1 value
  if (playersTotal > 21) {
    if (playersHand[0].name == "Ace") {
      playersHand[0].rank = 1;
      console.log(
        "Exceeds 21 - player's Ace reverts to 1: index 0",
        playersHand
      );
    }
    if (playersHand[1].name == "Ace") {
      playersHand[1].rank = 1;
      console.log(
        "Exceeds 21 - player's Ace reverts to 1: index 1",
        playersHand
      );
    }
    playersTotal = 0;
    var recountArrayIndex = 0;
    while (recountArrayIndex < playersHand.length) {
      playersTotal += Number(playersHand[recountArrayIndex].rank);
      recountArrayIndex += 1;
    }
  }
  console.log("Player's total after recount:", playersTotal);
  if (playersTotal <= 21) {
    return (
      "You have drawn " +
      playersDrawCard.name +
      " of " +
      playersDrawCard.suit +
      ". Your total is " +
      playersTotal +
      " points. Enter 'draw' to draw another card or 'end' if you're satisfied with your cards."
    );
  }
  if (playersTotal > 21) {
    gameMode = "reset";
    return (
      "You have drawn " +
      playersDrawCard.name +
      " of " +
      playersDrawCard.suit +
      ". Your total is " +
      playersTotal +
      " points. You've busted your hand. Better luck next time!"
    );
  }
};

//if dealer is < 17, dealer has to draw
var dealersPlay = function () {
  dealersTotal = 0;
  //first ace is always 11 except for if both cards are aces
  if (dealersCard1.name == "Ace") {
    dealersCard1.rank = 11;
    console.log("Dealer's Ace rank: 11");
  }
  if (dealersCard2.name == "Ace") {
    dealersCard2.rank = 11;
    console.log("Dealer's Ace rank: 11");
  }
  if (dealersCard1.rank + dealersCard2.rank > 21) {
    dealersCard1.rank = 1;
    console.log("Double Ace - dealer's Ace reverts to 1: card 1", dealersHand);
  }
  dealersTotal = Number(dealersCard1.rank) + Number(dealersCard2.rank);
  while (dealersTotal < 17) {
    var dealersDrawCard = cardDeck.pop();
    console.log("Dealer's Draw Card:", dealersDrawCard);
    dealersHand.push(dealersDrawCard);
    dealersTotal += Number(dealersDrawCard.rank);
  }
  console.log("Dealer's total before recount:", dealersTotal);
  //if dealer's total hand exceeds 21, revert ace with a 11 value to ace with a 1 value
  if (dealersTotal > 21) {
    if (dealersCard1.name == "Ace") {
      dealersCard1.rank = 1;
      console.log(
        "Exceeds 21 - dealer's Ace reverts to 1: card 1",
        dealersHand
      );
    }
    if (dealersCard2.name == "Ace") {
      dealersCard2.rank = 1;
      console.log(
        "Exceeds 21 - dealer's Ace reverts to 1: card 2",
        dealersHand
      );
    }
    dealersTotal = 0;
    recountArrayIndex = 0;
    while (recountArrayIndex < dealersHand.length) {
      dealersTotal += Number(dealersHand[recountArrayIndex].rank);
      recountArrayIndex += 1;
    }
    while (dealersTotal < 17) {
      dealersDrawCard = cardDeck.pop();
      console.log("Dealer's Draw Card:", dealersDrawCard);
      dealersHand.push(dealersDrawCard);
      dealersTotal += Number(dealersDrawCard.rank);
    }
  }
  console.log("Dealer's total after recount:", dealersTotal);
  return dealersTotal;
};

//output results, aces can be 1 or 11
var compareResults = function () {
  if (dealersTotal > playersTotal) {
    return (
      "You scored " +
      playersTotal +
      " points while the dealer scored " +
      dealersTotal +
      " points. You lose!"
    );
  }
  if (dealersTotal < playersTotal) {
    return (
      "You scored " +
      playersTotal +
      " points while the dealer scored " +
      dealersTotal +
      " points. You win!"
    );
  }
  if (dealersTotal == playersTotal) {
    return (
      "You scored " +
      playersTotal +
      " points while the dealer scored " +
      dealersTotal +
      " points. It's a tie!"
    );
  }
};

var reset = function () {
  gameMode = "deal";
  cardDeck = [];
  playersHand = [];
  dealersHand = [];
  playersCard1 = 0;
  playersCard2 = 0;
  dealersCard1 = 0;
  dealersCard2 = 0;
  playersTotal = 0;
  dealersTotal = 0;
};
