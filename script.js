//define variables
var others = ``;
var shuffledCardDeck;
var playerCard = [];
var computerCard = [];
var index = 0;
var index2 = 0;
var index4 = 0;
index3 = 0;
var mode = "first deal";
var cardDeck = [];
var playerRank = 0;
var computerRank = 0;
var initialMode = `first deal`;
var currentPlayerRank = 0;

// currentPlayerRank=checkRank(playerCard,playerRankArray,playerRank)
// currentPlayerRank=checkRank(computerCard,computerRankArray,computerRank)
// checkBust(playerRank,`player`,'computer')
// checkBust(computerRank,`computer`,'player')
var main = function (input) {
  //make the deck
  cardDeck = makeDeck();
  shuffledCardDeck = shuffleCards(cardDeck);
  if (mode == `value of ace`) {
    if (input != `1` && input != `11`) {
      return `Please enter either '1' or '11'`;
    } else {
      changingValueOfAce(input);
    }
  }
  if (input == `play again`) {
    others = ``;
    playerCard = [];
    computerCard = [];
    cardDeck = makeDeck();
    playerRank = 0;
    computerRank = 0;
    playerRankArray = [];
    computerRankArray = [];
    mode = `first deal`;
    index2 = 0;
    index3 = 0;
    index = 0;
  }
  if (mode == "first deal") {
    //deal one card to player and computer
    dealACard(playerCard);
    dealACard(computerCard);
    playerRank += playerCard[index2].rank;
    computerRank += computerCard[index4].rank;
    index4 += 1;
    if (playerCard[index2].name == `ace`) {
      mode = `value of ace`;
      index2 += 1;
      return standardReply(
        "Type '1' if you want the value of Ace to be 1 and '11' if you want it to be 11"
      );
    } else {
      index2 += 1;
      checkBust();
      console.log(playerCard);
      console.log(computerCard);
      mode = "second deal";
      return standardReply(`Press submit to get another card.`);
    }
  }
  if (mode == "second deal") {
    initialMode = `second deal`;
    dealACard(playerCard);
    dealACard(computerCard);
    playerRank += playerCard[index2].rank;
    computerRank += computerCard[index4].rank;
    if (playerCard[index2].name == `ace`) {
      mode = `value of ace`;
      index2 += 1;
      index4 += 1;
      return standardReply(
        "Type '1' if you want the value of Ace to be 1 and '11' if you want it to be 11"
      );
    } else {
      index4 += 1;
      index2 += 1;
      checkBust();
      console.log(playerCard);
      console.log(computerCard);
      mode = `subsequent deal`;
      return standardReply(
        ` Enter 'hit' to get another card or 'stay' if you dont want another card.`
      );
    }
  }
  if (mode == `subsequent deal`) {
    if (input == ``) {
      return standardReply(
        ` Enter 'hit' to get another card or 'stay' if you dont want another card.`
      );
    }
    if (input == "stay") {
      if (computerRank <= 16) {
        dealACard(computerCard);
        computerRank += computerCard[index2].rank;
        checkBust();
        return `${whoWins()}`;
      } else {
        return `${whoWins()}`;
      }
    } else if (input == "hit") {
      dealACard(playerCard);
      playerRank += playerCard[index2].rank;
      if (playerCard[index2].name == `ace`) {
        mode = `value of ace`;
        index2 += 1;
        return standardReply(
          "Type '1' if you want the value of Ace to be 1 and '11' if you want it to be 11"
        );
      } else {
        index2 += 1;
        return checkBust();
      }
    }
  }
};
//checking who wins
var whoWins = function () {
  //   while (index < playerCard.length) {
  //     playerRankArray.push(playerCard[index].rank);
  //     index += 1;
  //   }
  //   index = 0;
  //   while (index < computerCard.length) {
  //     computerRankArray.push(computerCard[index].rank);
  //     index += 1;
  //   }
  //   index = 0;
  //   while (index < playerRankArray.length) {
  //     playerRank += Number(playerRankArray[index]);
  //     index += 1;
  //   }
  //   index = 0;
  //   while (index < computerRankArray.length) {
  //     computerRank += Number(computerRankArray[index]);
  //     index += 1;
  //   }
  //   index = 0;
  // if (computerRank > playerRank) {
  //   return `The computer has gone bust. Player Wins!~ Type 'play again' to retry`;
  // }
  // if (playerRank > 21) {
  //   return `The player has gone bust. Computer Wins!~Type 'play again' to retry`;
  //}
  if (computerRank > playerRank) {
    return `Computer Wins! Type 'play again' to retry`;
  } else if (computerRank < playerRank) {
    return `Player Wins! Type 'play again' to retry`;
  } else if (computerRank == playerRank) {
    return "It's a tie! Type 'play again' to retry";
  }
};

//dealing cards
var dealACard = function (deckType) {
  deckType.push(shuffledCardDeck.pop());
  return deckType;
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
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
    suitIndex += 1;
  }

  return cardDeck;
};

// var checkRank = function (card, rankArray, rank) {
//   while (index < card.length) {
//     rankArray.push(card[index].rank);
//     index += 1;
//   }
//   index = 0;
//   while (index < rankArray.length) {
//     rank += Number(rankArray[index]);
//     index += 1;
//   }
//   index = 0;
//   return rank;
// };

var checkBust = function () {
  if (playerRank > 21) {
    return `Player has gone bust. Computer wins! Type 'play again' if you want to retry. `;
  }
  if (computerRank > 21) {
    return `Computer has gone bust. Player wins! Type 'play again' if you want to retry.`;
  } else {
    return standardReply(
      `Enter 'hit' to get another card or 'stay' if you don't want another card`
    );
  }
};
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
  // Return the shuffled deck
  return cardDeck;
};

var standardReply = function (customPhrase) {
  if (index3 < playerCard.length - 1) {
    index3 += 1;
    others = `${others} and the ${playerCard[index3].name} of ${playerCard[index3].suit}`;
  }
  return `Your card is the ${playerCard[0].name} of ${playerCard[0].suit} ${others}. The dealer's card is the ${computerCard[0].name} of ${computerCard[0].suit} and another mystery card. ${customPhrase}. Type 'play again' if you want to retry`;
};

// var valueOfAce = function () {
//   mode == `value of ace`;
//   index2 += 1;
//   return standardReply(
//     "Type '1' if you want the value of Ace to be 1 and '11' if you want it to be 11"
//   );
// };
var changingValueOfAce = function (Input) {
  if (initialMode == `first deal`) {
    mode = `second deal`;
    if (Input == `11`) {
      playerRank += 10;
      return standardReply(`<br>Your value of ace has been set to 11`);
    } else {
      return standardReply(`<br>Your value of ace has been set to 1.`);
    }
  }
  if (initialMode == `second deal`) {
    mode = `subsequent deal`;
    if (Input == `1`) {
      playerRank -= 10;
      return standardReply(
        `<br>Your value of ace has been set to 1. Enter 'hit' to get another card or 'stay' if you don't want another card`
      );
    } else {
      return standardReply(
        `<br>Your value of ace has been set to 11. Enter 'hit' to get another card or 'stay' if you don't want another card `
      );
    }
  }
};
