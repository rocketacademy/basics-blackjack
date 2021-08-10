// Shuffle Deck
// Click submit to deal cards to both player and computer
// User decides whether to hit or stand their turn
// Computer must automatically decide whether to hit or stand
// Analyse if either side has won for each round
// RULES:
// (RULE 1: Either side must hit if the hand is below 17)
// (RULE 2: Player closer to 21 wins at the end)
// (RULE 3: Aces can be either 1 or 11)
// (RULE 4: Getting 21 on the first round: BLACKJACK!)
​
var start = `start`;
var currentGameMode = start;
var playerTotalValue = [];
var computerTotalValue = [];
var playerTotalCards = [];
var computerTotalCards = [];
var playerSum = 0;
var computerSum = 0;
​
// Shuffle Deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "spade", "clubs", "spade"];
  var aceFunction = [];
​
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
​
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    var valueCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = valueCounter;
      var cardValueAce1 = valueCounter;
      var cardValueAce11 = valueCounter;
​
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        cardValue = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 11;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 12;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 13;
      }
​
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };
​
      // Add the new card to the deck
      cardDeck.push(card);
​
      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }
​
    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
​
  // Return the completed card deck
  return cardDeck;
};
​
var myOutputValue = `KNN CCB CAN U PUT IN THE RIGHT WORD`;
​
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function (cardDeck) {
  index = 0;
  while (index < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[index];
    cardDeck[index] = randomCard;
    cardDeck[randomIndex] = currentCard;
    index++;
  }
  return cardDeck;
};
​
var deck = shuffleCards(makeDeck());
​
var main = function (input) {
  var myOutputValue = "hello world";
  var myOutputValue = ``;
  var player1stCard = deck.pop();
  var computer1stCard = deck.pop();
  var player2ndCard = deck.pop();
  var computer2ndCard = deck.pop();
  var playerDraw = deck.pop();
  var computerDraw = deck.pop();
  var playerDraw2 = deck.pop();
  var computerDraw2 = deck.pop();
  var playerCardValue = Number(player1stCard.rank) + Number(player2ndCard.rank);
  var computerCardValue =
    Number(computer1stCard.rank) + Number(computer2ndCard.rank);
​
  // Click submit to deal cards to both player and computer
  var genericOutput = ` PLAYER CARDS: <br> 1ST PLAYER CARD: ${player1stCard.name} of ${player1stCard.suit} <br> 2ND PLAYER CARD: ${player2ndCard.name} of ${player2ndCard.suit}  <br>COMPUTER CARDS: <br> 1ST COM CARD: ${computer1stCard.name} of ${computer1stCard.suit} <br> 2ND COM CARD: ${computer2ndCard.name} of ${computer2ndCard.suit}`;
​
  var genericScores = `<br> PLAYER SCORE = ${playerSum}. Computer score = ${computerSum}`;
​
  if (currentGameMode == start) {
    currentGameMode = "commence";
  }
  if (currentGameMode == `commence`) {
    currentGameMode = `decide`;
    playerTotalValue.push(playerCardValue);
    playerSum += playerCardValue;
    computerTotalValue.push(computerCardValue);
    playerTotalCards.push(
      `${player1stCard.name} of ${player1stCard.suit}`,
      `${player2ndCard.name} of ${player2ndCard.suit}`
    );
    computerSum += computerCardValue;
    computerTotalCards.push(
      `${computer1stCard.name} of ${computer1stCard.suit}`,
      `${computer2ndCard.name} of ${computer2ndCard.suit}`
    );
    if (playerSum == 21 && computerSum == 21) {
      return (myOutputValue = `Both win! please restart`);
    } else if (playerSum == 21) {
      return (myOutputValue = `Player BLACKJACK with a score of: ${playerSum}. Please restart`);
    } else if (computerSum == 21) {
      return (myOutputValue = `Computer BLACKJACK with a score of: ${computerSum}. Please restart`);
    }
    return (myOutputValue =
      genericOutput +
      `<br>PLAYER SCORE = ${playerCardValue}. Computer score = ${computerCardValue}`);
  }
  console.log(`player cards: ${playerTotalCards}`);
  console.log(`player total value: ${playerTotalValue}`);
  console.log(`computer cards: ${computerTotalCards}`);
  console.log(`computer total value: ${computerTotalValue}`);
​
  if (currentGameMode == `decide`) {
    // First round decider, if either player goes bust
    if (playerSum > 21 && computerSum > 21) {
      return (myOutputValue = `Both bust! please restart`);
    } else if (playerSum > 21 && computerSum >= 17) {
      return (myOutputValue = `Player bust with a score of: ${playerSum}. Computer wins! Please restart`);
    } else if (computerSum > 21 && playerSum >= 17) {
      return (myOutputValue = `Computer bust with a score of: ${computerSum}. Player wins! Please restart`);
    }
    //  else if (
    //   (computerSum > 21 && playerSum <= 17) ||
    //   (playerSum > 21 && computerSum <= 17)
    // ) {
    //   return (myOutputValue = `Bust and the other player has below 17!!. Please restart!`);
    // }
​
    // First round if either player BLACKJACK
    // if (playerSum == 21 && computerSum == 21) {
    //   return (myOutputValue = `Both win! please restart`);
    // } else if (playerSum == 21) {
    //   return (myOutputValue = `Player BLACKJACK with a score of: ${playerSum}. Please restart`);
    // } else if (computerSum == 21) {
    //   return (myOutputValue = `Computer BLACKJACK with a score of: ${computerSum}. Please restart`);
    // }
​
    // First round forced draw if below 17
    if (playerSum < 17 && computerSum < 17) {
      // playerSum += playerDraw.rank;
      // playerTotalCards.push(`${playerDraw.name} of ${playerDraw.suit}`);
​
      // computerSum += computerDraw.rank;
      // computerTotalCards.push(`${computerDraw.name} of ${computerDraw.suit}`);
      currentGameMode = "hit or pass";
      return (myOutputValue = `Player, please decide whether to hit or pass. Your cards: ${playerTotalCards}. <br> ${genericScores}`);
​
      // return (myOutputValue = `Both are below 17, both draw. <br> Player draw: ${playerDraw.name} of ${playerDraw.suit}. <br> Computer draw: ${computerDraw.name} of ${computerDraw.suit} <br> player score: ${playerSum}. computer score: ${computerSum}`);
    } else if (playerSum < 17) {
      // playerSum += playerDraw.rank;
      // playerTotalValue.push(playerCardValue);
      // playerTotalCards.push(`${playerDraw.name} of ${playerDraw.suit}`);
      currentGameMode = "hit or pass";
      return (myOutputValue = `Player, please decide whether to hit or pass. Your cards: ${playerTotalCards}. <br> ${genericScores}`);
​
      // return `Player, you have below 17, you must draw 1 card, which is: ${playerDraw.name} of ${playerDraw.suit}. <br> player score: ${playerSum}. computer score: ${computerSum}`;
    } else if (computerSum < 17) {
      computerSum += computerDraw.rank;
      computerTotalValue.push(computerCardValue);
      computerTotalCards.push(`${computerDraw.name} of ${computerDraw.suit}`);
      currentGameMode = "hit or pass";
​
      return (myOutputValue = `Computer, you have below 17, you must draw 1 card, which is: ${computerDraw.name} of ${computerDraw.suit}.<br> player score: ${playerSum}. computer score: ${computerSum}`);
    } else if (computerSum >= 17 && playerSum >= 17) {
      currentGameMode = "hit or pass";
      return (myOutputValue = `Player, please decide whether to hit or pass. Your cards: ${playerTotalCards}. <br> ${genericScores}`);
    }
  }
  if (currentGameMode == `hit or pass`) {
    if (input == `hit`) {
      playerSum += playerDraw2.rank;
      playerTotalValue.push(playerCardValue);
      playerTotalCards.push(`${playerDraw2.name} of ${playerDraw2.suit}`);
      return (myOutputValue = `Player, you have chosen to hit, you must draw 1 card, which is: ${playerDraw2.name} of ${playerDraw2.suit}. <br> player score: ${playerSum}. computer score: ${computerSum}`);
    } else if (input == `pass`) {
      if (playerSum > computerSum) {
        myOutputValue = `You Win!<br>Player score: ${playerSum}. computer score: ${computerSum}`;
      } else if (playerSum < computerSum) {
        myOutputValue = `You lose!<br>Player score: ${playerSum}. computer score: ${computerSum}`;
      } else {
        myOutputValue = `Draw!<br>Player score: ${playerSum}. computer score: ${computerSum}`;
      }
    }
​
    return myOutputValue;
  }
};

















