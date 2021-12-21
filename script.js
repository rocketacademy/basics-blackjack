// Card deck generation
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var emoji = ["♥", "♦", "♣", "♠"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit and corresponding emoji in a variable
    var currentSuit = suits[suitIndex];
    var currentEmoji = emoji[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = `${rankCounter}`;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == `1`) {
        cardName = "ace";
      } else if (cardName == `11`) {
        cardName = "jack";
      } else if (cardName == `12`) {
        cardName = "queen";
      } else if (cardName == `13`) {
        cardName = "king";
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentEmoji,
      };
      // Add the new card to the deck
      cardDeck.push(card);
      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }
    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
  // Return the completed card deck
  return cardDeck;
};

//shuffling cards
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (deckLength) {
  var randomDec = Math.random() * deckLength;
  var randomIndex = Math.floor(randomDec);
  return randomIndex;
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

// 2 players:
// P1 is human, P2 is Computer/Dealer
// if card is jack, queen or king, is just 10.
// ace can be 1 or 11.
// 4 game modes:
// dealingCards: each player dealt 2 cards to start
// playingHit: human chooses to takes another card. can keep taking even if exceed 21, and the player won't lost/win yet.
// playingStand: player doesn't take a card. then switch to dealer's turn
// playDealer: within each playHit or playStand, comPlay will auto decide to hit if 16 & below, or stay if 17 and above.
// results: person with the largest combined number that is not more than 21 will win.

var humanCards = [];
var comCards = [];
var gameMode = "dealCards";
// create global variable for shuffledDeck so that it can be used in conditionals
var shuffledDeck = [];

var main = function (input) {
  var output = "";
  if (gameMode == "dealCards") {
    return dealingCards();
  }
  if (gameMode == "play") {
    if (input == "h") {
      return playingHit();
    }
    if (input == "s") {
      return playingStand();
    } else {
      return `Please only type "h" or "s".`;
    }
  }
  if (gameMode == "dealer") {
    playDealer();
  }
  if (gameMode == "results") {
    return checkingResults();
  }
};

// helper function to count combined score
var countCombinedScore = function (allCards) {
  let combinedAllCards = 0;
  // create a counter i, initialize to 0, add each card value, and after addition, add 1 to i at the end of each iteration. do this until the end of the array.
  for (let i = 0; i < allCards.length; i++) {
    // for any ace cards whose rank has been converted to 11, retain the rank.
    if (allCards[i].name == "ace") {
      combinedAllCards += allCards[i].rank;
    } else {
      // otherwise, for cards with rank 11,12, 13, it will just add 10.
      combinedAllCards += Math.min(allCards[i].rank, 10);
    }
  }
  console.log(combinedAllCards);
  return combinedAllCards;
};

// helper function to check whether the player has the cards: ace + 10/jack/queen/king
var isBlackjack = function (allCards) {
  // "in" operator checks if the value of card equals to 10/11/12/13
  console.log(allCards);
  var value10 = [10, 11, 12, 13];
  if (
    (value10.indexOf(allCards[0].rank) != -1 && allCards[1].rank == 1) ||
    (value10.indexOf(allCards[1].rank) != -1 && allCards[0].rank == 1)
  ) {
    return true;
  }
  return false;
};

// helper function to translate all the cards' properties into a readible string to display in the results.
var printCard = function (allCards) {
  var cardNum = 0;
  var cardString = "<br>";
  while (cardNum < allCards.length) {
    cardString =
      cardString +
      `${allCards[cardNum].name} of ${allCards[cardNum].emoji}<br>`;
    cardNum = cardNum + 1;
  }
  return cardString;
};

// helper function to store all the indexes of the aces, cos i want to change the value of the first ace only
var hasAce = function (allCards) {
  var allAces = [];
  var i = 0;
  while (i < allCards.length) {
    // if any of the cards have aces, push them into the array allAces.
    if (allCards[i].rank == 1) {
      allAces.push(i);
    }
    i = i + 1;
  }
  return allAces;
};

//helper function for game mode: deal cards.
var dealingCards = function () {
  //shuffled Deck
  var madeDeck = makeDeck();
  shuffledDeck = shuffleCards(madeDeck);
  // human is given first card
  var humCard1 = shuffledDeck.pop();
  // store card in humanCards
  humanCards.push(humCard1);
  // dealer gets first card
  var comCard1 = shuffledDeck.pop();
  // store card in comCards
  comCards.push(comCard1);
  // same thing for 2 cards
  var humCard2 = shuffledDeck.pop();
  humanCards.push(humCard2);
  var comCard2 = shuffledDeck.pop();
  comCards.push(comCard2);

  // if both have Blackjack, both wins & game is over;
  if (isBlackjack(humanCards) && isBlackjack(comCards)) {
    var humBlackjack = `player has: <br> ${humanCards[0].name} of ${humanCards[0].emoji} and ${humanCards[1].name} of ${humanCards[1].emoji} and dealer has: <br> ${comCards[0].name} of ${comCards[0].emoji} and ${comCards[1].name} of ${comCards[1].emoji}. Blackjack! Both won!`;
    gameMode = "play";
    console.log(gameMode);
    return humBlackjack;
  }

  // if dealer has blackJack, then game is over;
  if (isBlackjack(comCards)) {
    var comBlackjack = `dealer has: <br> ${comCards[0].name} of ${comCards[0].emoji} and ${comCards[1].name} of ${comCards[1].emoji}. Blackjack! dealer wins.`;
    gameMode = "play";
    console.log(gameMode);
    return comBlackjack;
  }
  // if human has blackJack, then game is over;
  if (isBlackjack(humanCards)) {
    var humBlackjack = `player has: <br> ${humanCards[0].name} of ${humanCards[0].emoji} and ${humanCards[1].name} of ${humanCards[1].emoji}. Blackjack! player wins.`;
    gameMode = "play";
    console.log(gameMode);
    return humBlackjack;
  }

  // if nothing else, game carries on;
  else {
    var aceIndices = hasAce(humanCards);
    if (aceIndices.length !== 0 && countCombinedScore(humanCards) <= 10) {
      console.log(`total Aces`, aceIndices);
      humanCards[aceIndices[0]].rank = 11;
      var currentCards = `You have ${printCard(
        humanCards
      )}<br>while the dealer 🖥 has drawn ${comCards[0].name} of ${
        comCards[0].emoji
      } for one of the cards.<br><br> If you want to draw more cards, type "h".<br> If you do not want any cards, type "s". `;
      gameMode = "play";
      console.log("with ace:", gameMode);
      return currentCards;
    } else {
      var contPlay = `You have drawn: <br> ${humanCards[0].name} of ${humanCards[0].emoji} and ${humanCards[1].name} of ${humanCards[1].emoji}, <br> while the dealer 🖥 has drawn ${comCards[0].name} of ${comCards[0].emoji} for one of the cards. <br><br> If you want to draw more cards, type "h".<br> If you do not want any cards, type "s".`;
      gameMode = "play";
      console.log(gameMode);
      return contPlay;
    }
  }
};

//helper function for game mode: play cards and user inputs "h" to play hit.
var playingHit = function (input) {
  //give 1 more card to the player and store card in array.show all the cards in the array.
  humanCards.push(shuffledDeck.pop());
  console.log(humanCards);
  var aceIndices = hasAce(humanCards);
  // if there's any aces, first ace is 11.
  if (aceIndices.length !== 0 && countCombinedScore(humanCards) <= 10) {
    humanCards[aceIndices[0]].rank = 11;
    // since the last element of the array is length-1 of the array, i can use this to show the latest card drawn.
    var currentCards = `You just drew ${
      humanCards[humanCards.length - 1].name
    } of ${
      humanCards[humanCards.length - 1].emoji
    }. <br> Now you have ${printCard(
      humanCards
    )}.<br><br> if you want more cards, type "h". <br> If you do not want any more cards, type "s".`;
    return currentCards;
  } else {
    //if no aces, just show cards and combined score, and prompt choice of hit or stand.
    var currentCards = `You just drew ${
      humanCards[humanCards.length - 1].name
    } of ${
      humanCards[humanCards.length - 1].emoji
    }. <br> Now you have ${printCard(
      humanCards
    )}. <br> Your total score now now is ${countCombinedScore(
      humanCards
    )}.<br><br> if you want more cards, type "h". <br> If you do not want any more cards, type "s".`;
    return currentCards;
  }
};
// helper function to change mode when human plays stand, so that dealer can play
var playingStand = function () {
  gameMode = "dealer";
  return `your total score now now is ${countCombinedScore(
    humanCards
  )}. Now it is the dealer's turn. `;
};

//helper function for dealer's turn
var playDealer = function () {
  // check if dealers' card has any ace, and change the first ace's rank to 11. then add card until total value is greater than or equals to 17.
  var aceIndices = hasAce(comCards);
  if (aceIndices.length !== 0 && countCombinedScore(comCards) <= 10) {
    comCards[aceIndices[0]].rank = 11;
    while (countCombinedScore(comCards) < 17) {
      comCards.push(shuffledDeck.pop());
      console.log("after adding card:", comCards);
    }
    if (countCombinedScore(comCards) >= 17) {
      gameMode = "results";
      console.log(gameMode);
    }
  } else {
    while (countCombinedScore(comCards) < 17) {
      comCards.push(shuffledDeck.pop());
      console.log("after adding card:", comCards);
    }
    if (countCombinedScore(comCards) >= 17) {
      gameMode = "results";
      console.log(gameMode);
    }
  }
};

//helper function for game mode: check results.
var checkingResults = function () {
  var totalScoreHuman = countCombinedScore(humanCards);
  console.log("human score:", totalScoreHuman);
  var totalScoreCom = countCombinedScore(comCards);
  console.log("computer score:", totalScoreCom);
  if (totalScoreHuman > 21 && totalScoreCom > 21) {
    return `You have: ${printCard(
      humanCards
    )} Your score is ${totalScoreHuman}.<br>Dealer has: ${printCard(
      comCards
    )}Dealer's score is ${totalScoreCom}<br> Both dealer and player's cards exceed 21. Game is over and both lost😞. Refresh to try again!`;
  }
  if (totalScoreHuman > 21 && totalScoreCom <= 21) {
    return `You have: ${printCard(
      humanCards
    )} Your score is ${totalScoreHuman}.<br>Dealer has: ${printCard(
      comCards
    )}Dealer's score is ${totalScoreCom}<br>Dealer won!`;
  }
  if (totalScoreHuman <= 21 && totalScoreCom > 21) {
    return `You have: ${printCard(
      humanCards
    )}Your score is ${totalScoreHuman}.<br>Dealer has: ${printCard(
      comCards
    )}Dealer's score is ${totalScoreCom}<br>Player won!`;
  }
  if (totalScoreHuman <= 21 && totalScoreCom <= 21) {
    if (totalScoreHuman < totalScoreCom) {
      return `You have: ${printCard(
        humanCards
      )}Your score is ${totalScoreHuman}.<br>Dealer has: ${printCard(
        comCards
      )}Dealer's score is ${totalScoreCom}<br>Dealer won!`;
    }
    if (totalScoreHuman > totalScoreCom) {
      return `You have: ${printCard(
        humanCards
      )} Your score is ${totalScoreHuman}.<br>Dealer has: ${printCard(
        comCards
      )} Dealer's score is ${totalScoreCom}<br>Player won!`;
    }
    if (totalScoreHuman == totalScoreCom) {
      return `You have: ${printCard(
        humanCards
      )} Your score is ${totalScoreHuman}.<br>Dealer has: ${printCard(
        comCards
      )} Dealer's score is ${totalScoreCom}<br>It's a draw!`;
    }
  }
};
