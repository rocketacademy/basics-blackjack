//Global State Trackers
var numOfPlayers = 0;
var playerCumulativeScores = []; // cumulative amount of their $bet here
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
  }

  while (playerX <= numOfPlayers) { // To ask for input 1 by 1 using the while and nested if
    if (gameState == 'enterBet' && playerX < numOfPlayers) {
      myOutputValue = playersEnterBets(input);
      playerX += 1;

    } else if (gameState == 'enterBet' && playerX == numOfPlayers) {
      myOutputValue = playersEnterBets(input) + ` Cards will be dealt next.`;
      playerX = 1;
      gameState = 'deal';

    } else if (gameState == 'deal' && playerX < numOfPlayers) {
      while (playerX < numOfPlayers) { // to display everything at 1 shot using while + if 
        myOutputValue += dealTwoCardsToPlayer();
        playerX += 1;
      }

      if (playerX == numOfPlayers) {
        myOutputValue += dealTwoCardsToPlayer() + dealTwoCardsToDealer() + `<br><br> Player 1 shall choose to hit or stand next. <br><br> Type 'h' for hit and 's' for stand.`;
        playerX = 1;
        gameState = 'hitOrStand';
      }

    } else if (gameState == 'hitOrStand' && playerX < numOfPlayers) {
      console.log(playerX, 'playerX');
      console.log(playerCumulativeScores[0], 'playerCUmulativeScore');
      console.log(allPlayersHands[0], `currentPlayer's hand`);

      while (playerX <= numOfPlayers) {
        var j = 0;
        while (j < 1) {
          if (playerCumulativeScores[playerX - 1] < 17) {
            var addCard = deck.pop();
            console.log(addCard, 'addCard');
            allPlayersHands[playerX - 1].push(addCard);
            playerCumulativeScores[playerX - 1] += addCard.score;
            myOutputValue = `You need to draw another card. Your score is now ${playerCumulativeScores[playerX - 1]}.`;
            console.log('1');

          } else if (playerCumulativeScores[playerX - 1] == 21) {
            myOutputValue = `Player ${playerX} wins the round as player has 21 points with 2 cards!`
            j += 1;
            console.log('2');

          } else if (playerCumulativeScores[playerX - 1] > 21) {
            myOutputValue = `Player ${playerX} has lost as his current points is more than 25.`;
            j += 1;
            console.log('3');

          } else if (input == 'h') {
            var addCard = deck.pop();
            console.log(addCard, 'addCard');
            allPlayersHands[playerX - 1].push(addCard);
            playerCumulativeScores[playerX - 1] += addCard.score;

            myOutputValue = `Player ${playerX} chooses to hit. <br> The new card is ${addCard.name}. <br> Your total current points is now ${playerCumulativeScores[playerX - 1]}`;

          } else if (input == 's') {
            myOutputValue = `Player ${playerX} chooses to stand. No new card is drawn. <br> Your current points is now ${playerCumulativeScores[playerX - 1]}`;
            j += 1;
          } else {
            j += 1;
          }
          return myOutputValue;
        }
        playerX += 1;
        console.log(playerX, 'playerX');
      }
    }

    return myOutputValue;
    // var hitOrStand = 0; //false being stand
  }

  return myOutputValue;
};

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
  var computerHand = []; //creating a single player's hand 
  var myOutputValue = "";

  computerHand.push(deck.pop());
  computerHand.push(deck.pop());


  var totalPoints = computerHand[0].score

  myOutputValue = `Computer is dealt ${computerHand[0].name} and a faced down card. It has a current visible score of ${totalPoints}.`;

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