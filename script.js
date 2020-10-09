//Global State Trackers
var numOfPlayers = 0;
var playerCumulativeScores = []; // cumulative amount of their $bet here
var computerCumulativeScore = 0;
var currentPlayerBets = []; //cumulative current amount of player bets

var allPlayersHands = []; //contains players' list of hands
var allComputerHands = [];//contain computer's list of hands

var gameState = '' //Restart & shuffle cards , deal cards, analyze winning conditions, hit or stand
var playerX = 1;


//Create a new deck
var deck;

var main = function (input) {
  var myOutputValue = '';
  // Create and shuffle deck
  if (gameState == '') {
    deck = shuffleCards(makeDeck());

    console.log(deck, 'shuffledDeck');

    gameState = 'numOfPlayers'
    myOutputValue = `Deck is reshuffled. Please choose the number of players.`;

  } else if (gameState == 'numOfPlayers') {
    numOfPlayers = Number(input);
    console.log(numOfPlayers, 'numOfPlayers');
    gameState = 'enterBet'
    return myOutputValue = `You chose ${numOfPlayers}. Please enter the bet amount next for each player.`;

  } else if (gameState == 'computerTurn') {
    //reveal facedown card & evaluate current score
    var displayComputerCards = displayAllComputerCards();
    myOutputValue = `Dealer reveals face down card and has cards ${displayComputerCards}.`;
    gameState = 'autoHitOrStand';

    if (computerCumulativeScore == 21) {
      myOutputValue += `Blackjack! <br><br> Game results to be evaluated next.`;
    } else {
      myOutputValue += `<br><br> Click submit to see Dealer's next move.`
    }

  } else if (gameState == 'autoHitOrStand') {
    if (computerCumulativeScore < 17) {
      myOutputValue = computerDrawAddCard();

    } else if (computerCumulativeScore > 21) {
      myOutputValue = `Computer has gone bust with ${computerCumulativeScore} score. <br><br> Game results to be evaluated next. `;
      gameState = 'evaluateGame';

    } else if (computerCumulativeScore < 21 && computerCumulativeScore >= 17) {
      // calculate the probability of success of drawing another card that will lead to 21 points
      var pointsRemaining = 21 - computerCumulativeScore;
      var winningCards = deck.filter(card =>
        card.score <= pointsRemaining || card.score == 11 //referring to original score of Ace
      );

      console.log(winningCards);

      var numOfWinningCards = winningCards.length
      var pSuccess = (numOfWinningCards / deck.length * 100).toFixed(0);
      myOutputValue = `Number of cards with score ${pointsRemaining} is ${numOfWinningCards} of ${pSuccess}% of success.`;

      if (pSuccess > 50) {
        myOutputValue += computerDrawAddCard;
      } else {
        myOutputValue += `<br><br> Computer shall stand, and evalute results next.`
        gameState = 'evaluateGame'
      }

    } else if (computerCumulativeScore == 21) {
      myOutputValue = `Computer has a score 21. No further cards need to be drawn. <br><br> Game results to be evaluated next.`;
      gameState = 'evaluateGame'
    }

    //calculate the probability of drawing another card that is higher than the highestHand in the allPlayersHands

  }

  //The entire process from each player entering a bet to players choosing to hit or stand & evaluating their results if they win blackjack or exceed 21 points.
  while (playerX <= numOfPlayers) { // To ask for input 1 by 1 using the while and nested if
    if (gameState == 'enterBet' && playerX < numOfPlayers) {
      myOutputValue = playersEnterBets(input);
      playerX += 1;

    } else if (gameState == 'enterBet' && playerX == numOfPlayers) {
      myOutputValue = playersEnterBets(input) + ` Cards will be dealt next.`;
      playerX = 1;
      gameState = 'deal';

    } else if (gameState == 'deal' && playerX <= numOfPlayers) {
      while (playerX < numOfPlayers) { // to display everything at 1 shot using while + if 
        myOutputValue += dealTwoCardsToPlayer();
        playerX += 1;
      }

      if (playerX == numOfPlayers) {
        myOutputValue += dealTwoCardsToPlayer() + dealTwoCardsToDealer() + `<br><br> Player 1 shall choose to hit or stand next. <br><br> Type 'h' for hit and 's' for stand.`;
        playerX = 1;
        gameState = 'hitOrStand';
      }

    } else if (gameState == 'hitOrStand' && playerX <= numOfPlayers) {
      console.log(playerX, 'playerX');

      while (playerX <= numOfPlayers) {
        //Intermediate Result #1
        if (playerCumulativeScores[playerX - 1] < 17) {
          return myOutputValue = `Player ${playerX}, your existing score is ${playerCumulativeScores[playerX - 1]}. You need to draw another card.` + playerDrawAddCard();

          //End Result #1 = Blackjack
        } else if (playerCumulativeScores[playerX - 1] == 21 && allPlayersHands[playerX - 1].length == 2) {
          myOutputValue = `Blackjack! Player ${playerX} wins the round as player has 21 points!` + outputNextPlayer();

          playerX += 1;
          return myOutputValue;
          //End Result #2 = user's score is more than 21 and loses automatically
        } else if (playerCumulativeScores[playerX - 1] > 21) {

          myOutputValue = `Player ${playerX} has lost as his current points of ${playerCumulativeScores[playerX - 1]} is more than 21.` + outputNextPlayer();

          playerX += 1;
          return myOutputValue;

        } else if (input == 'h') {

          return myOutputValue = `Player ${playerX} current score is ${playerCumulativeScores[playerX - 1]} and he chooses to hit.` + playerDrawAddCard();


        } else if (input == 's') {

          myOutputValue = `Player ${playerX} chooses to stand. No new card is drawn. <br> Your current points is now ${playerCumulativeScores[playerX - 1]}.` + outputNextPlayer();

          playerX += 1;
          return myOutputValue;

        } else {
          console.log(playerX, 'playerX');
          var displayedCards = displayExistingCards();
          myOutputValue = `Player ${playerX}, your existing cards are ${displayedCards} Please enter s or h`;
          return myOutputValue;
        }

      }
    }
    return myOutputValue;
  }
  return myOutputValue;
};

var computerDrawAddCard = function () {
  var addCard = deck.pop();

  console.log(addCard, 'addCard');

  allComputerHands.push(addCard);

  if (addCard == 'Ace' && computerCumulativeScore <= 10) {
    computerCumulativeScore += 1;
  } else {
    computerCumulativeScore += addCard.score;
  }
  return `Computer drew ${addCard.name}. <br><br>Computer total current points is now ${computerCumulativeScore}.`;
}

var displayAllComputerCards = function () {

  var i = 0;
  var myOutputValue = '';

  while (i < allComputerHands.length) {
    computerCumulativeScore += allComputerHands[i].score;
    if (i == allComputerHands.length - 1) {
      myOutputValue += allComputerHands[i].name
    } else {
      myOutputValue += ' ' + allComputerHands[i].name + ', ';
    }
    console.log(myOutputValue);
    i += 1;
  }
  myOutputValue += `<br> Computer's total score is ${computerCumulativeScore}`;
  return myOutputValue;


}


var displayExistingCards = function () {
  var i = 0;
  var myOutputValue = '';
  while (i < allPlayersHands[playerX - 1].length) {
    if (i == allPlayersHands[playerX - 1].length - 1) {
      myOutputValue += allPlayersHands[playerX - 1][i].name
    } else {
      myOutputValue += ' ' + allPlayersHands[playerX - 1][i].name + ', ';
    }
    console.log(myOutputValue);
    i += 1;
  }


  return myOutputValue;
}

var outputNextPlayer = function () {
  if (playerX < numOfPlayers) {
    var myOutputValue = `<br><br> Player ${playerX + 1} is next.`;
  } else {
    var myOutputValue = '<br><br> Computer turn next.';
    gameState = 'computerTurn';
  }
  return myOutputValue;
}

var playerDrawAddCard = function () {
  var addCard = deck.pop();

  console.log(addCard, 'addCard');

  allPlayersHands[playerX - 1].push(addCard);

  if (addCard == 'Ace' && playerCumulativeScores[playerX - 1] <= 10) {
    playerCumulativeScores[playerX - 1] += 1;
  } else {
    playerCumulativeScores[playerX - 1] += addCard.score;
  }
  return `You drew ${addCard.name}. <br><br>Your total current points is now ${playerCumulativeScores[playerX - 1]}.`;
}


var playersEnterBets = function (input) {
  currentPlayerBets.push(Number(input));
  return `Player ${playerX} has chosen a bet of ${input}.`;
}

var dealTwoCardsToPlayer = function () {
  var playerHand = []; //creating a single player's hand 
  var myOutputValue = "";

  playerHand.push(deck.pop());
  playerHand.push(deck.pop());
  allPlayersHands.push(playerHand); //[[0,1], [  ], [  ]]
  console.log(allPlayersHands, `storing each player's hand`);

  var totalPoints = playerHand[0].score + playerHand[1].score;
  playerCumulativeScores.push(totalPoints);

  myOutputValue = `Player ${playerX} is dealt ${allPlayersHands[playerX - 1][0].name} and ${allPlayersHands[playerX - 1][1].name} and has a current total score of ${totalPoints}. <br><br>`;

  return myOutputValue;

}

var dealTwoCardsToDealer = function () {
  var myOutputValue = "";

  allComputerHands.push(deck.pop());
  allComputerHands.push(deck.pop());


  totalScore = allComputerHands[0].score

  myOutputValue = `Computer is dealt ${allComputerHands[0].name} and a faced down card. It has a current visible score of ${totalScore}.`;

  return myOutputValue;
}

// cards is an array of card objects
var shuffleCards = function (deck) {
  var currentIndex = 0;
  // loop over the entire cards array
  while (currentIndex < deck.length) {
    // select a random position from the deck
    var randomIndex = getRandomIndex(deck.length);
    // get the current card in the loop
    var currentItem = deck[currentIndex];
    // get the random card
    var randomItem = deck[randomIndex];
    // swap the current card and the random card
    deck[currentIndex] = randomItem;
    deck[randomIndex] = currentItem;
    currentIndex = currentIndex + 1;
  }
  // give back the shuffled deck
  return deck;
};

// get a random index from an array given it's size
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

//creates a deck
var makeDeck = function () {

  // create an empty deck at the start

  var deck = [];

  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {

    // make a variable of current suit
    var currentSuit = suits[suitIndex];
    //console.log("current suit : " + currentSuit)

    //loop to create all cards in this suit
    // rank 1 - 13

    var rankCounter = 1; // start from card value = 1 or Ace
    while (rankCounter <= 13) {

      //Since rank counter is equals to cardName most of the time:
      var cardName = rankCounter;


      //For special cases where number is 1, 11, 12 ,13

      if (cardName == 1) {
        cardName = 'Ace';
      } else if (cardName == 11) {
        cardName = 'Jack';
      } else if (cardName == 12) {
        cardName = 'Queen';
      } else if (cardName == 13) {
        cardName = 'King';
      }

      var scoreCounter = rankCounter;

      if (cardName == 'Ace') {
        scoreCounter = 11;
      } else if (cardName == 'Jack' || cardName == 'Queen' || cardName == 'King') {
        scoreCounter = 10;
      }


      //making a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: scoreCounter
      };

      //console.log("rank : " + rankCounter);

      //push the card into the deck
      deck.push(card);

      rankCounter = rankCounter + 1;

    }

    suitIndex = suitIndex + 1;

  }
  return deck;

}