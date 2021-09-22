var drawnCard = [];
var shuffledDeck = [];
var turn = "player";
var playerCards;
var computerCards;
var playerSum;
var computerSum;
var numOfAce;

const cardNameMap = {
  1: "Ace",
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: "Jack",
  12: "Queen",
  13: "King",
};

const cardScoreValueMap = {
  1: 11, // can be 1 or 11, defaults to 11 before user input
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 10,
  12: 10,
  13: 10,
};

const cardRankEmojiMap = {
  1: "🅰",
  2: "2️⃣",
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
  6: "6️⃣",
  7: "7️⃣",
  8: "8️⃣",
  9: "9️⃣",
  10: "🔟",
  11: "<b>J</b>",
  12: "<b>Q</b>",
  13: "<b>K</b>",
};

const cardSuitEmojiMap = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

const happyImg = `<img src = "https://c.tenor.com/t0aPGUJ4TDgAAAAj/budding-pop-happy.gif">`;
const waitingImg = `<img src = "https://c.tenor.com/JqRnfuG4ZXIAAAAj/kawai-cute.gif"></img>`;
const sadImg = `<img src = "https://c.tenor.com/sC5zcz9GAEYAAAAj/sad-emo.gif">`;
const laughImg = `<img src = "https://c.tenor.com/yBhWvOq4ry4AAAAj/kawai-budding-pop.gif">`;
const tieImg = `<img src = "https://c.tenor.com/16iWaRZX6agAAAAj/kawai-budding-pop.gif">`;

const refreshMessage = "<br>Click on 'Submit' to play again.";
const hitStandMessage = `<br>Enter 'hit' to draw 1 more card or 'stand' to see results.${waitingImg}`;

var main = function (input) {
  // starts with player's turn
  if (turn == "player") {
    // when input is blank, draw 2 cards for player
    if (input == "") {
      var deck = makeDeck();
      // deck only reshuffles if game ends and return back to player
      shuffledDeck = shuffleCards(deck);
      console.log("cards are shuffled");
      myOutputValue = drawnCards();
      console.log(drawnCard);
    }
    // if player choose to hit, draw a card
    if (input == "hit") {
      hitDrawCard();
      var playerHitCounter = 2;
      while (playerHitCounter < drawnCard.length) {
        // if playersum is within 21, show sum of cards
        if (playerSum <= 21) {
          myOutputValue = `You draw: ${
            drawnCard[playerHitCounter].cardRankEmoji
          } of ${drawnCard[playerHitCounter].cardSuitEmoji}. <br><br>
          Player Cards: ${showDrawnCards()} ${calSumOfCards()} ${hitStandMessage} `;
        }
        // else shows game over
        else {
          myOutputValue = `You draw: ${
            drawnCard[playerHitCounter].cardRankEmoji
          } of ${drawnCard[playerHitCounter].cardSuitEmoji}. <br><br>
             Player Cards: ${showDrawnCards()}${calSumOfCards()} ${resultsBurst()}`;
        }
        playerHitCounter += 1;
      }
    }
    // when player choose to stand, change turn to computer
    if (input == "stand") {
      turn = "computer";
    }
  }
  // when it is computer's turn, draw 2 cards & play game
  if (turn == "computer") {
    myOutputValue = drawnCards();
    // change turn back to player so that the game restarts by clicking submit
    turn = "player";
  }

  return myOutputValue;
};

// function to draw 1 card
var hitDrawCard = function () {
  drawnCard.push(shuffledDeck.pop());
  console.log(drawnCard);
  calSumOfCards();
  return drawnCard;
};

var calSumOfCards = function () {
  // converts all picture cards to rank = 10
  var drawnCardCounter = 0;
  while (drawnCardCounter < drawnCard.length) {
    drawnCardCounter += 1;
  }

  // calculate total sum of cards using new value of rank
  function scoreValue(value) {
    return value.scoreValue;
  }
  function sum(prev, next) {
    return prev + next;
  }
  sumOfCards = drawnCard.map(scoreValue).reduce(sum);
  console.log(`Before: ${sumOfCards}`);

  // calculate number of ace cards on hand
  numOfAce = drawnCard.filter(checkAce).length;
  console.log(`Num of Ace: ${numOfAce}`);

  // if sum is > 21 & drawn cards contain Ace, convert ace value
  if (sumOfCards > 21 && numOfAce != 0) {
    reduceAceScores();
    console.log(`After: ${sumOfCards}`);
  }

  // assign value of sum to player / computer according to their turn
  if (turn == "player") {
    playerSum = sumOfCards;
    return `Your sum is now ${playerSum}.<br>`;
  } else if (turn == "computer") {
    computerSum = sumOfCards;
    return `Your sum is now ${computerSum}.<br>`;
  }
};

const checkAce = function (cardObj) {
  return cardObj.name == "Ace";
};

const reduceAceScores = function () {
  let aceCounter = 0;
  while (aceCounter < numOfAce) {
    // manually convert ace score from 11 to 1 by deducting 10 from sumofvalue
    sumOfCards -= 10;
    if (sumOfCards <= 21) {
      break;
    }
    aceCounter += 1;
  }
  return sumOfCards;
};

var showDrawnCards = function () {
  console.log("show drawn cards function is running");
  var showOutput = "";
  var showIndex = 0;
  while (showIndex < drawnCard.length) {
    showOutput = showOutput +=
      drawnCard[showIndex].cardRankEmoji +
      " " +
      drawnCard[showIndex].cardSuitEmoji +
      " | ";
    showIndex += 1;
  }
  return showOutput;
};

var drawnCards = function () {
  drawnCard = [];

  // draw initial 2 cards
  var cardsCounter = 0;
  while (cardsCounter < 2) {
    drawnCard.push(shuffledDeck.pop());
    cardsCounter += 1;
  }
  // 2 initial drawn cards will be assigned to player
  if (turn == "player") {
    console.log(
      `player: ${drawnCard[0].name} of ${drawnCard[0].suit} and ${drawnCard[1].name} of ${drawnCard[1].suit}. `
    );
    calSumOfCards();
    // check for player blackjack
    if (drawnCard.length == 2 && playerSum == 21) {
      return `Player draws: ${showDrawnCards()} <br> You got a blackjack! You won! ${happyImg}`;
    }
    // if no blackjack, ask if player wants to hit or stand.

    myOutputValue = `Player draws: ${showDrawnCards()} ${calSumOfCards()} ${hitStandMessage}`;
  }
  // 2 initial drawn cards will be assigned to computer
  if (turn == "computer") {
    console.log(
      `computer: ${drawnCard[0].name} of ${drawnCard[0].suit} and ${drawnCard[1].name} of ${drawnCard[1].suit}.`
    );
    calSumOfCards();
    // check for computer blackjack
    if (drawnCard.length == 2 && computerSum == 21) {
      return `Computer got a blackjack! Computer won! ${sadImg}`;
    }
    // if no blackjack, show the 2 cards that computer draw at the beginning
    else {
      myOutputValue = `Computer draws: ${showDrawnCards()} <br>`;
    }

    // while loop to continuously draw cards when computersum is < 17
    var computerCounter = 0;
    while (computerCounter < drawnCard.length) {
      if (computerSum < 17) {
        hitDrawCard();
      }
      computerCounter += 1;
    }

    myOutputValue = `Computer Cards: ${showDrawnCards()}<br><br>${resultsOfGame()}`;
  }

  return myOutputValue;
};

// use total sum of game to calculate who is winning
var resultsOfGame = function () {
  if (computerSum > 21) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br>
    ${resultsBurst()} ${laughImg} `;
  }

  if (playerSum > computerSum) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br><br>
    Player wins! Yay! ${refreshMessage} ${happyImg}`;
  }

  if (playerSum < computerSum) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br><br>
    Computer wins! Oh man... ${refreshMessage}${sadImg}`;
  }

  if ((playerSum = computerSum)) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br><br>
    It's a tie! Boring... ${refreshMessage}${tieImg}`;
  }
};

// results when sum is more than 21
var resultsBurst = function () {
  if (playerSum > 21) {
    return `<br>Player burst! Game Over! ${refreshMessage}${sadImg}`;
  }

  if (computerSum > 21) {
    return `<br>Computer burst! Game Over! ${refreshMessage}`;
  }
};

const makeDeck = function () {
  const cardDeck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  let suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    let rankCounter = 1;
    while (rankCounter <= 13) {
      const cardName = cardNameMap[rankCounter];
      const cardSuitEmojiTemp = cardSuitEmojiMap[suits[suitIndex]];
      const cardRankEmojiTemp = cardRankEmojiMap[rankCounter];
      const cardScoreValue = cardScoreValueMap[rankCounter];

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        cardSuitEmoji: cardSuitEmojiTemp,
        cardRankEmoji: cardRankEmojiTemp,
        scoreValue: cardScoreValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
