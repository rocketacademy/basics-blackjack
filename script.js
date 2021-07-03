var makeDeck = function () {
  var cardDeck = [];

  var suits = ["diamond", "club", "heart", "spade"];
  var suitsPic = ["♦️", "♣️", "♥️", "♠️"];
  var suitIndex = 0;

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentSuitPic = suitsPic[suitIndex];
    var rankCounter = 1;
    var value = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = value;

      if (rankCounter == 1) {
        cardName = "Ace";
      } else if (rankCounter == 11) {
        cardName = "Jack";
      } else if (rankCounter == 12) {
        cardName = "Queen";
      } else if (rankCounter == 13) {
        cardName = "King";
      }

      if (rankCounter == 1) {
        cardValue = 11;
      } else if (rankCounter == 11) {
        cardValue = 10;
      } else if (rankCounter == 12) {
        cardValue = 10;
      } else if (rankCounter == 13) {
        cardValue = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        suitPic: currentSuitPic,
        rank: rankCounter,
        value: cardValue,
      };

      cardDeck.push(card);

      rankCounter += 1;
      value += 1;
    }
    suitIndex += 1;
  }

  return cardDeck;
};
var getRandomIndex = function (size) {
  var randomInteger = Math.floor(Math.random() * size);
  return randomInteger;
};
var shuffleCards = function () {
  var cardDeck = makeDeck();
  numberOfCards = cardDeck.length;

  var currentIndex = 0;

  while (currentIndex < numberOfCards) {
    var randomIndex = getRandomIndex(numberOfCards);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }

  return cardDeck;
};

//CONSTANTS: gameModes
const GM_NUMBER_OF_PLAYERS = "NUMBER_OF_PLAYERS";
const GM_NAME_OF_PLAYERS = "NAME_OF_PLAYERS";
const GM_WAGER_POINTS_PER_ROUND = "WAGER_POINTS_PER_ROUND";
const GM_DEAL_CARDS = "DEAL_CARDS";
const GM_DECISION = "DECISION";
const GM_POST_DECISION = "POST_DECISION";
const GM_LEADERBOARD = "LEADERBOARD";

//GlOBAL VARIABLES
var gameMode = GM_NUMBER_OF_PLAYERS;
// Re-set every new player
var currentPlayer = 1;
var currentPlayerHand = [];
var dealerHand = [];
// Re-set every new round
var wagerPointsPerRound = 0;
var dealtCardsPerRound = [];
var allPlayersCardPointsPerRound = [];
var findWinnerArray = [];
var newDeck = []; // reshuffle
// Re-set every new game
var numberOfPlayers = 0;
var nameOfPlayers = [];
var numberOfGamesPerPlayer = [];
var numberofWinsPerPlayer = [];
var wagerPot = [];
var altCardPointsIfBusted = 0;

var main = function (input) {
  if (gameMode == GM_NUMBER_OF_PLAYERS) {
    if (Number.isNaN(Number(input)) == true) {
      return `Please enter the number of players!`;
    }
    numberOfPlayers = Number(input);
    numberOfGamesPerPlayer = Array(numberOfPlayers).fill(0);
    numberofWinsPerPlayer = Array(numberOfPlayers).fill(0);
    wagerPot = Array(numberOfPlayers).fill(100);
    gameMode = GM_NAME_OF_PLAYERS;
    return `♦️ ♣️ Welcome to BlackJack! ♥️ ♠️<br><br>Dealer (Computer): 1<br>Number of Players: ${numberOfPlayers}<br><br>Player ${currentPlayer}, please enter your name!`;
  } else if (gameMode == GM_NAME_OF_PLAYERS) {
    var playerName = input;
    nameOfPlayers.push(playerName);

    var counter = 0;
    var number = 1;
    var standardOuput = "";
    while (counter < nameOfPlayers.length) {
      standardOuput = `${standardOuput}Player ${number}: ${nameOfPlayers[counter]}<br>`;
      counter += 1;
      number += 1;
    }

    if (nameOfPlayers.length == numberOfPlayers) {
      currentPlayer = 1;
      gameMode = GM_WAGER_POINTS_PER_ROUND;
      return `♦️ ♣️ Welcome to BlackJack! ♥️ ♠️<br><br>${standardOuput}<br>${nameOfPlayers[0]}, please enter this round's wager number!`;
    } else {
      var nextPlayer = (currentPlayer % numberOfPlayers) + 1;
      currentPlayer = nextPlayer;
      return `Hi ${playerName}, welcome to BlackJack ♦️ ♣️ ♥️ ♠️!<br><br>Player ${nextPlayer}, please enter your name!`;
    }
  } else if (gameMode == GM_WAGER_POINTS_PER_ROUND) {
    if (Number.isNaN(Number(input)) == true) {
      return `Please enter a number!`;
    }
    wagerPointsPerRound = Number(input);
    var counter = 0;
    var number = 1;
    var standardOuput = "";
    while (counter < nameOfPlayers.length) {
      standardOuput = `${standardOuput}${nameOfPlayers[counter]}: $${wagerPot[counter]}<br>`;
      counter += 1;
      number += 1;
    }
    gameMode = GM_DEAL_CARDS;
    return `♦️ ♣️ BLACKJACK ♥️ ♠️<br><br>Here are the rules of the game:<br>(1) The computer will always be the dealer.<br>(2) The dealer and player(s) have to hit if their hand is below 17.<br>(3) The player who is closer to 21 wins the hand.<br>(4) Aces can be 1 or 11.<br><br>Current Pot Amount:<br>${standardOuput}<br>Wager amount for this round: $${wagerPointsPerRound}.<br><br>${nameOfPlayers[0]}, please click submit to kick-start the game!`;
  } else if (gameMode == GM_DEAL_CARDS) {
    currentPlayer = 1;
    dealtCardsPerRound = [];
    allPlayersCardPointsPerRound = [];
    findWinnerArray = [];
    dealerHand = [];
    var shuffledDeck = shuffleCards();
    newDeck = shuffledDeck;

    var cardsDealt = numberOfPlayers * 2 + 2;

    var cardCounter = 0;
    while (cardCounter < cardsDealt) {
      var card = newDeck.pop();
      dealtCardsPerRound.push(card);
      cardCounter += 1;
    }

    // Check dealer's card for BAN-BAN / BAN-LUCK
    var dealerFirstCardIndex = numberOfPlayers;
    var dealerSecondCardIndex = dealerFirstCardIndex + numberOfPlayers + 1;
    var dealerCard1 = dealtCardsPerRound[dealerFirstCardIndex];
    dealerHand.push(dealerCard1);
    var dealerCard2 = dealtCardsPerRound[dealerSecondCardIndex];
    dealerHand.push(dealerCard2);
    var cardOutput = `<br>(1) ${dealerCard1.name} of ${dealerCard1.suitPic}<br>(2) ${dealerCard2.name} of ${dealerCard2.suitPic}<br><br>Press "Submit" to view the leaderboard!`;

    console.log(`Dealer card 1: ${dealerCard1.name} of ${dealerCard1.suitPic}`);
    console.log(`Dealer card 2: ${dealerCard2.name} of ${dealerCard2.suitPic}`);
    console.log(`------------------------------`);

    if (dealerCard1.name == "Ace" && dealerCard2.name == "Ace") {
      gameMode = GM_LEADERBOARD;
      return `The dealer has gotten BAN-BAN 🎉!${cardOutput}`;
    } else if (
      dealerCard1.name == "Ace" &&
      (dealerCard2.rank == 10 ||
        dealerCard2.rank == 11 ||
        dealerCard2.rank == 12 ||
        dealerCard2.rank == 13)
    ) {
      gameMode = GM_LEADERBOARD;
      return `The dealer has gotten BLACKJACK 🎉!${cardOutput}`;
    } else if (
      dealerCard2.name == "Ace" &&
      (dealerCard1.rank == 10 ||
        dealerCard1.rank == 11 ||
        dealerCard1.rank == 12 ||
        dealerCard1.rank == 13)
    ) {
      gameMode = GM_LEADERBOARD;
      return `The dealer has gotten BLACKJACK 🎉!${cardOutput}`;
    }

    gameMode = GM_DECISION;

    return `♦️ ♣️ BLACKJACK ♥️ ♠️<br><br>All cards have been dealt!<br><br>${nameOfPlayers[0]}, press "Submit" to reveal your hand!`;
  } else if (gameMode == GM_DECISION) {
    var currentPlayerName = nameOfPlayers[currentPlayer - 1];
    currentPlayerHand = [];
    altCardPointsIfBusted = 0;
    var firstCardIndex = currentPlayer - 1;
    var secondCardIndex = firstCardIndex + numberOfPlayers + 1;
    var playerCard1 = dealtCardsPerRound[firstCardIndex];
    currentPlayerHand.push(playerCard1);
    var playerCard2 = dealtCardsPerRound[secondCardIndex];
    currentPlayerHand.push(playerCard2);
    var cardOutput = `<br>(1) ${playerCard1.name} of ${playerCard1.suitPic}<br>(2) ${playerCard2.name} of ${playerCard2.suitPic}`;

    console.log(`Player card 1: ${playerCard1.name} of ${playerCard1.suit}`);
    console.log(`Player card 2: ${playerCard2.name} of ${playerCard2.suit}`);

    // check if player card got BAN-BAN/BAN-LUCK
    var blackJackHit = checkForBlackJackOrBanBan(playerCard1, playerCard2);
    if (blackJackHit == "Yes") {
      allPlayersCardPointsPerRound.push(21);
      findWinnerArray.push(21);
      if (currentPlayer < numberOfPlayers) {
        var nextPlayer = (currentPlayer % numberOfPlayers) + 1;
        var nextPlayerName = nameOfPlayers[nextPlayer - 1];
        currentPlayer = nextPlayer;
        return `Congratulations ${currentPlayerName}! You have gotten BLACKJACK 🎉!<br>${cardOutput}<br><br>${nextPlayerName}, please click the "Submit" button to reveal your hand!`;
      } else if (currentPlayer == numberOfPlayers) {
        gameMode = GM_LEADERBOARD;
        return `Congratulations ${currentPlayerName}! You have gotten BLACKJACK 🎉!<br>${cardOutput}<br><br>Please click the "Submit" button to view the leaderboard!`;
      }
    }
    // check if player card is "Ace"
    var hasAce = checkForAce(currentPlayerHand);
    if (hasAce == true) {
      var cardPointsIfAce11 = calculatePlayerHand(currentPlayerHand);
      var cardPoints2IfAce1 = calculatePlayerHand(currentPlayerHand) - 10;

      gameMode = GM_POST_DECISION;

      if (cardPointsIfAce11 < 17 && cardPoints2IfAce1 < 17) {
        return `Hi ${currentPlayerName}, here are your cards:<br>${cardOutput}<br><br>Current hand (Ace is Eleven): ${cardPointsIfAce11}<br>Current hand (Ace is One): ${cardPoints2IfAce1}<br><br>Please enter "hit" to draw a new card!`;
      } else if (cardPointsIfAce11 > 16 && cardPoints2IfAce1 < 17) {
        return `Hi ${currentPlayerName}, here are your cards:<br>${cardOutput}<br><br>Current hand (Ace is Eleven): ${cardPointsIfAce11}<br>Current hand (Ace is One): ${cardPoints2IfAce1}<br><br>Please enter "hit" to draw a new card OR<br>Please enter "stand" to finalize your hand.`;
      }
    }
    // check if player card is < 17
    var cardPoints = calculatePlayerHand(currentPlayerHand);

    if (cardPoints < 17) {
      gameMode = GM_POST_DECISION;
      return `Hi ${currentPlayerName}, here are your cards:<br>${cardOutput}<br><br>Current hand: ${cardPoints}<br><br>As your current hand is below 17, please enter "hit" to draw a new card.`;
    } else {
      gameMode = GM_POST_DECISION;
      return `Hi ${currentPlayerName}, here are your cards:<br>${cardOutput}<br><br>Current hand: ${cardPoints}<br><br>Please enter "hit" to draw a new card OR<br>Please enter "stand" to finalize your hand.`;
    }
  }
  if (gameMode == GM_POST_DECISION) {
    var currentPlayerName = nameOfPlayers[currentPlayer - 1];
    if (input == "hit") {
      var card = newDeck.pop();
      console.log(`Player card: ${card.name} of ${card.suit}`);
      currentPlayerHand.push(card);

      var cardOutput = "";
      var index = 0;
      var number = 1;
      while (index < currentPlayerHand.length) {
        cardOutput = `${cardOutput}(${number}) ${currentPlayerHand[index].name} of ${currentPlayerHand[index].suitPic}<br>`;
        index += 1;
        number += 1;
      }

      // check if player card has "Ace"
      // check the number of "Ace" -- if 1 normal card and 2 ace card: both 11, 1 11 1 1, both 1.
      var hasAce = checkForAce(currentPlayerHand);
      if (hasAce == true) {
        var aceValueOutput = calculateHandBasedOnAce(currentPlayerHand);
        console.log(`player hand with ACE: ${aceValueOutput}`);
        if (aceValueOutput == "BUSTED!") {
          return `Hi ${currentPlayerName}, here are your cards:<br><br>${cardOutput}<br>Current Hand Value: ${altCardPointsIfBusted}<br>BUSTED! 💣<br><br>Please enter "stand" to finalize your hand.`;
        }
        if (aceValueOutput[0] > 21) {
          var output = `Hi ${currentPlayerName}, here are your cards:<br><br>${cardOutput}<br>Variation of Current Hand Value: ${aceValueOutput} (BUSTED! 💣)<br><br>Please enter "stand" to finalize your hand.`;
        } else if (aceValueOutput[0] < 17) {
          output = `Hi ${currentPlayerName}, here are your cards:<br><br>${cardOutput}<br>Variation of Current Hand Value: ${aceValueOutput}<br><br>Please enter "hit" to draw a new card`;
        } else if (aceValueOutput[0] > 16 && aceValueOutput[0] < 22) {
          output = `Hi ${currentPlayerName}, here are your cards:<br><br>${cardOutput}<br>Variation of Current Hand Value: ${aceValueOutput}<br><br>Please enter "hit" to draw a new card OR<br>Please enter "stand" to finalize your hand.`;
        } else if (aceValueOutput[0] == 21) {
          output = `Hi ${currentPlayerName}, here are your cards:<br><br>${cardOutput}<br>Current hand: ${cardPoints} (Congratulations! 🎉)<br><br>Please enter "stand" to finalize your hand.`;
        }
        return output;
      }

      // check if player card is below 17
      var cardPoints = calculatePlayerHand(currentPlayerHand);

      if (cardPoints < 17) {
        output = `Hi ${currentPlayerName}, here are your cards:<br><br>${cardOutput}<br>Current hand: ${cardPoints}<br><br>As your current hand is below 17, please enter "hit" to draw a new card.`;
      } else if (cardPoints > 16 && cardPoints < 22) {
        output = `Hi ${currentPlayerName}, here are your cards:<br><br>${cardOutput}<br>Current hand: ${cardPoints}<br><br>Please enter "hit" to draw a new card OR<br>Please enter "stand" to finalize your hand.`;
      } else if (cardPoints > 21) {
        output = `Hi ${currentPlayerName}, here are your cards:<br><br>${cardOutput}<br>Current hand: ${cardPoints} (BUSTED! 💣)<br><br>Please enter "stand" to finalize your hand.`;
      } else if (cardPoints == 21) {
        output = `Hi ${currentPlayerName}, here are your cards:<br><br>${cardOutput}<br>Current hand: ${cardPoints} (Congratulations! 🎉)<br><br>Please enter "stand" to finalize your hand.`;
      }

      return output;
    } else if (input == "stand") {
      //check for ace value
      var hasAce = checkForAce(currentPlayerHand);
      if (hasAce == true) {
        var aceValueOutput = calculateHandBasedOnAce(currentPlayerHand);
        if (aceValueOutput == `BUSTED!`) {
          allPlayersCardPointsPerRound.push(altCardPointsIfBusted);
          findWinnerArray.push(0);
        } else {
          allPlayersCardPointsPerRound.push(aceValueOutput[0]);
          findWinnerArray.push(aceValueOutput[0]);
        }
      } else if (hasAce !== true) {
        var cardPoints = calculatePlayerHand(currentPlayerHand);
        allPlayersCardPointsPerRound.push(cardPoints);
        findWinnerArray.push(cardPoints);
      }

      if (currentPlayer < numberOfPlayers) {
        var nextPlayer = (currentPlayer % numberOfPlayers) + 1;
        currentPlayer = nextPlayer;
        var nextPlayerName = nameOfPlayers[nextPlayer - 1];
        gameMode = GM_DECISION;
        return `${currentPlayerName}, you have finalized your hand!<br><br>${nextPlayerName}, please click the "Submit" button to reveal your hand!`;
      } else if (currentPlayer == numberOfPlayers) {
        gameMode = GM_LEADERBOARD;
        return `${currentPlayerName}, you have finalized your hand!<br><br>${currentPlayerName}, please click the "Submit" button to view the leaderboard!`;
      }
    }
  }
  if (gameMode == GM_LEADERBOARD) {
    // Check dealer's card for BAN-BAN / BAN-LUCK
    var dealerCard1 = dealerHand[0];
    var dealerCard2 = dealerHand[1];
    if (
      (dealerCard1.name == "Ace" && dealerCard2.name == "Ace") ||
      (dealerCard1.name == "Ace" &&
        (dealerCard2.rank == 10 ||
          dealerCard2.rank == 11 ||
          dealerCard2.rank == 12 ||
          dealerCard2.rank == 13)) ||
      (dealerCard2.name == "Ace" &&
        (dealerCard1.rank == 10 ||
          dealerCard1.rank == 11 ||
          dealerCard1.rank == 12 ||
          dealerCard1.rank == 13))
    ) {
      wagerPotForEachPlayerLose(wagerPointsPerRound);
      var wagerPotOutput = "";
      var wagerPotOutputIndex = 0;
      while (wagerPotOutputIndex < wagerPot.length) {
        wagerPotOutput = `${wagerPotOutput}${nameOfPlayers[wagerPotOutputIndex]}: $${wagerPot[wagerPotOutputIndex]}<br>`;
        wagerPotOutputIndex += 1;
      }
      return `The game has ended! Dealer has ♦️ ♣️BlackJack!♥️ ♠️<br><br>Wager Pot:<br>${wagerPotOutput}<br>Click on "Submit" to restart the game!`;
    }

    var dealerFinalCardPoints = calculateDealerHand(dealerHand);
    var dealerPointsAbove16 = true;

    if (dealerFinalCardPoints < 17) {
      dealerPointsAbove16 = false;
    }

    while (dealerPointsAbove16 == false) {
      // DEALER HAS ACE?
      var card = newDeck.pop();
      dealerHand.push(card);
      var dealerHandCheckAce = checkForAce(dealerHand);

      if (dealerHandCheckAce == false) {
        dealerFinalCardPoints = calculateDealerHand(dealerHand);
      } else if (dealerHandCheckAce == true) {
        dealerFinalCardPoints = calculateHandBasedOnAce(dealerHand);
      }

      if (dealerFinalCardPoints > 16) {
        dealerPointsAbove16 = true;
      }
    }

    console.log(
      `allPlayersCardPointsPerRound: ${allPlayersCardPointsPerRound}`
    );
    console.log(`dealerFinalCardPoints: ${dealerFinalCardPoints}`);

    // FIND THE WINNER
    var playerIndex = 0;
    while (playerIndex < findWinnerArray.length) {
      if (findWinnerArray[playerIndex] > 21) {
        findWinnerArray[playerIndex] = 0;
      }
      playerIndex += 1;
    }

    // IF > 1 WINNER
    var indexOfWinners = [];
    var indexOfHighestNumber = indexOfMaxInArray(findWinnerArray);
    var findWinnerIndex = 0;
    console.log(`indexOfWinners = ${indexOfWinners}`);
    console.log(`indexofHighestNumber = ${indexOfHighestNumber}`);

    while (findWinnerIndex < findWinnerArray.length) {
      if (
        findWinnerArray[findWinnerIndex] ==
        findWinnerArray[indexOfHighestNumber]
      ) {
        indexOfWinners.push(findWinnerIndex);
      }
      findWinnerIndex += 1;
    }
    //
    var winner = "";
    if (dealerFinalCardPoints == findWinnerArray[indexOfHighestNumber]) {
      winner = `Run!`;
    } else if (
      dealerFinalCardPoints < 22 &&
      dealerFinalCardPoints > findWinnerArray[indexOfHighestNumber]
    ) {
      winner = `Dealer (computer)`;
    } else if (
      (dealerFinalCardPoints > 21 &&
        findWinnerArray[indexOfHighestNumber] < 22) ||
      (findWinnerArray[indexOfHighestNumber] > dealerFinalCardPoints &&
        findWinnerArray[indexOfHighestNumber] < 22)
    ) {
      var winnerCounter = 0;
      var number = 1;
      while (winnerCounter < indexOfWinners.length) {
        var returnIndexOfWinner = indexOfWinners[winnerCounter];
        winner = `${winner}(${number}) ${nameOfPlayers[returnIndexOfWinner]}<br>`;
        winnerCounter += 1;
        number += 1;
      }
    }

    console.log(`findWinnerArray: ${findWinnerArray}`);
    console.log(`Winner: ${winner}`);

    // RESULTS BASED ON WHO IS THE WINNER
    if (winner !== `Dealer (computer)` && winner !== `Run!`) {
      wagerPotForEachPlayerWin(indexOfWinners, wagerPointsPerRound);
    } else if (winner == `Dealer (computer)`) {
      wagerPotForEachPlayerLose(wagerPointsPerRound);
    }

    // outputs
    if (winner == `Run!`) {
      var winnerOutput = `Nobody won!`;
    } else if (winner == `Dealer (computer)`) {
      var winnerOutput = `The dealer has won!`;
    } else if (winner !== `Dealer (computer)` && winner !== `Run!`) {
      var winnerOutput = `🎉CONGRATULATIONS WINNERS!🎉<br>${winner}`;
    }

    var dealerHandOutput = "";
    var dealerHandOutputindex = 0;
    var number = 1;
    while (dealerHandOutputindex < dealerHand.length) {
      dealerHandOutput = `${dealerHandOutput}(${number}) ${dealerHand[dealerHandOutputindex].name} of ${dealerHand[dealerHandOutputindex].suitPic}<br>`;
      dealerHandOutputindex += 1;
      number += 1;
    }

    console.log(`Dealer hand output: ${dealerHandOutput}`);

    var pointsOutput = "";
    var pointsOutputIndex = 0;
    while (pointsOutputIndex < allPlayersCardPointsPerRound.length) {
      pointsOutput = `${pointsOutput}${nameOfPlayers[pointsOutputIndex]}: ${allPlayersCardPointsPerRound[pointsOutputIndex]}<br>`;
      pointsOutputIndex += 1;
    }

    console.log(`Points output: ${pointsOutput}`);

    var wagerPotOutput = "";
    var wagerPotOutputIndex = 0;
    while (wagerPotOutputIndex < wagerPot.length) {
      wagerPotOutput = `${wagerPotOutput}${nameOfPlayers[wagerPotOutputIndex]}: $${wagerPot[wagerPotOutputIndex]}<br>`;
      wagerPotOutputIndex += 1;
    }

    console.log(`Points output: ${wagerPotOutput}`);

    if (dealerFinalCardPoints > 21) {
      var dealerFinalCardPointsOutput = `BUSTED!💣`;
    } else {
      dealerFinalCardPointsOutput = ``;
    }

    gameMode = GM_DEAL_CARDS;

    return `${winnerOutput}<br>Here are the dealer's card:<br>${dealerHandOutput}<br>Card Points:<br>${pointsOutput}Dealer: ${dealerFinalCardPoints} ${dealerFinalCardPointsOutput}<br><br>Wager Pot:<br>${wagerPotOutput}<br>Click "Submit" to restart the game!`;
  }
};

// Checkfor BAN-BAN / BAN-LUCK
var checkForBlackJackOrBanBan = function (card1, card2) {
  if (card1.name == "Ace" && card2.name == "Ace") {
    var output = `Yes`;
  } else if (
    card1.name == "Ace" &&
    (card2.rank == 10 ||
      card2.rank == 11 ||
      card2.rank == 12 ||
      card2.rank == 13)
  ) {
    output = `Yes`;
  } else if (
    card2.name == "Ace" &&
    (card1.rank == 10 ||
      card1.rank == 11 ||
      card1.rank == 12 ||
      card1.rank == 13)
  ) {
    output = `Yes`;
  } else {
    output = `No`;
  }
  return output;
};
var checkForAce = function (hand) {
  var index = 0;
  var hasAce = false;

  while (index < hand.length) {
    if (hand[index].name == "Ace") {
      hasAce = true;
    }
    index += 1;
  }

  return hasAce;
};
var calculatePlayerHand = function (currentPlayerHand) {
  var index = 0;
  var cardPoints = 0;

  while (index < currentPlayerHand.length) {
    cardPoints += currentPlayerHand[index].value;
    index += 1;
  }
  return Number(cardPoints);
};
var calculateDealerHand = function (dealerHand) {
  var index = 0;
  var cardPoints = 0;

  while (index < dealerHand.length) {
    cardPoints += dealerHand[index].value;
    index += 1;
  }
  return Number(cardPoints);
};
var calculateHandBasedOnAce = function (currentPlayerHand) {
  var output = [];

  // calculate number of ace
  var aceCounter = 0;
  var numberOfAce = 0;
  while (aceCounter < currentPlayerHand.length) {
    if (currentPlayerHand[aceCounter].name == "Ace") {
      numberOfAce += 1;
    }
    aceCounter += 1;
  }
  // calculate value based on initial ace value of 11
  var cardCounter = 0;
  var maxCardPoints = 0;
  while (cardCounter < currentPlayerHand.length) {
    maxCardPoints += currentPlayerHand[cardCounter].value;
    cardCounter += 1;
  }
  if (maxCardPoints < 22) {
    output.push(maxCardPoints);
  }
  // calculate alt card values based on ace value of 1
  var aceCardCounter = 0;
  var altCardPoints = 0;
  while (aceCardCounter < numberOfAce) {
    var pointsToBeDeducted = (aceCardCounter + 1) * 10;
    altCardPoints = maxCardPoints - pointsToBeDeducted;
    if (altCardPoints < 22) {
      output.push(altCardPoints);
    } else if (altCardPoints > 21) {
      altCardPointsIfBusted = altCardPoints;
      return `BUSTED!`;
    }

    aceCardCounter += 1;
  }

  return output;
};
var indexOfMaxInArray = function (findWinnerArray) {
  if (findWinnerArray.length == 0) {
    return -1;
  }

  var max = findWinnerArray[0];
  var maxIndex = 0;

  for (var i = 1; i < findWinnerArray.length; i++) {
    if (findWinnerArray[i] > max) {
      maxIndex = i;
      max = findWinnerArray[i];
    }
  }

  return maxIndex;
};
var incrementNumberOfWinsOfEachPlayer = function (indexOfHighestNumber) {
  numberofWinsPerPlayer[indexOfHighestNumber] += 1;
};
var wagerPotForEachPlayerWin = function (indexOfWinners, wagerPointsPerRound) {
  var counter = 0;

  while (counter < indexOfWinners.length) {
    var winnerIndex = indexOfWinners[counter];
    wagerPot[winnerIndex] += wagerPointsPerRound;
    counter += 1;
  }
};
var wagerPotForEachPlayerLose = function (wagerPointsPerRound) {
  var index = 0;
  while (index < wagerPot.length) {
    wagerPot[index] -= wagerPointsPerRound;
    index += 1;
  }
};
