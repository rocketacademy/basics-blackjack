var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
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

document.getElementById("output-div").innerHTML =
  "Choose the number of players 1-5. CPU is the dealer.";
var gameDeck = shuffleCards(makeDeck());
var playersHand = []; //Store their card objects
var playersScore = []; //To count their card score
var gameState = "noOfPlayers";
var noOfPlayers = 0;
var currentPlayer = -1;
var playersBank = [];
var playersBet = [];
var dealerBank = 100;
var dealerBlackJack = false;
var playerBlackJack = [];
var noPlayerBlackJack = true;

var main = function (input) {
  var myOutputValue = "";
  // Number of players
  if (gameState == "noOfPlayers") {
    if (input <= 5 && input > 0) {
      //fill the bank
      var bank = 0;
      while (bank < Number(input)) {
        playersBank.push(100);
        console.log(playersBank[bank]);
        bank += 1;
      }
      noOfPlayers = Number(input) + 1; // add one CPU as dealer
      gameState = "betPhase";
      myOutputValue = `Total of ${noOfPlayers - 1} players.`;
      return myOutputValue;
    } else {
      myOutputValue = "Come on, choose the number of players.";
      return myOutputValue;
    }
  }
  //bet phase
  if (gameState == "betPhase") {
    if (currentPlayer < 0) {
      myOutputValue = "Player 1 please bet.";
      currentPlayer += 1;
      return myOutputValue;
    }
    if (isNaN(Number(input)) || Number(input) < 1) {
      myOutputValue = "Please enter a proper bet.";
      return myOutputValue;
    }
    playersBet.push(Number(input));
    console.log("bet", playersBet[currentPlayer]);
    currentPlayer += 1;
    if (currentPlayer == noOfPlayers - 1) {
      gameState = "dealCards";
      currentPlayer = 0;
      return "Bets closed! Let's deal!";
    }
    myOutputValue = `Player ${currentPlayer + 1} please bet.`;
    return myOutputValue;
  }
  // Deal cards 2 each
  if (gameState == "dealCards") {
    dealCards(noOfPlayers);
    //check for dealer blackjack, no player blackjack and end game
    if (playersScore[noOfPlayers - 1] == 21) {
      dealerBlackJack = true;
      //check for player blackjack from the back
      for (var i = noOfPlayers - 2; i >= 0 - 1; i -= 1) {
        if (playersScore[i] == 21) {
          noPlayerBlackJack = false;
        }
      }
      if (noPlayerBlackJack) {
        myOutputValue = "Only Dealer Blackjack! Good game!";
        gameState = "showHand";
        return myOutputValue;
      }
      myOutputValue = "Dealer BlackJack! Showing hands, good Luck!";
      gameState = "showHand";
      return myOutputValue;
    }
    myOutputValue = "Cards have been dealt. Best of luck! Players first.";
    gameState = "playingPhase";
    return myOutputValue;
  }
  //showing hands after dealer blackjack
  if (gameState == "showHand") {
    myOutputValue = showAllHands(currentPlayer);
    currentPlayer += 1;
    if (currentPlayer == noOfPlayers - 2) {
      gameState = "payOut";
    }
    return myOutputValue;
  }
  //decide for hit or stand and move on
  //dont return to let it continue to display cards in the same submit
  if (gameState == "hitOrStand") {
    if (input == "hit") {
      hitMe(currentPlayer);
      gameState = "playingPhase";
    }
    if (input == "stand") {
      currentPlayer += 1;
      gameState = "playingPhase";
      //Check if all players had a turn then dealer's turn
      if (currentPlayer == noOfPlayers - 1) {
        gameState = "dealerOpen";
        myOutputValue = "Stand! Next dealer's turn.";
        return myOutputValue;
      }
      myOutputValue = "Stand! Next player's turn.";
      return myOutputValue;
    }
    if (input != "hit" && input != "stand") {
      myOutputValue = 'You can only choose "hit" or "stand".';
      return myOutputValue;
    }
  }
  // Show cards and decide to hit or stand
  if (gameState == "playingPhase") {
    // Output cards in hand and check for bust.
    var outputIndex = 0;
    //check for blackjack and move next
    if (playersScore[currentPlayer] == 21) {
      myOutputValue = `Player ${currentPlayer + 1} BLACKJACK!`;
      playerBlackJack.push(currentPlayer);
      currentPlayer += 1;
      //Check if all players had a turn then dealer's turn
      if (currentPlayer == noOfPlayers - 1) {
        gameState = "dealerOpen";
      }
      return myOutputValue;
    }
    //check for bust and move next
    if (playersScore[currentPlayer] > 21) {
      myOutputValue = `Total count is ${playersScore[currentPlayer]}. Bust!`;
      playersScore[currentPlayer] = 0;
      currentPlayer += 1;
      //Check if all players had a turn then dealer's turn
      if (currentPlayer == noOfPlayers - 1) {
        gameState = "dealerOpen";
      }
      return myOutputValue;
    }
    //show hand and score
    myOutputValue = `Player ${currentPlayer + 1}'s hand is:<br>`;
    while (outputIndex < playersHand[currentPlayer].length) {
      myOutputValue =
        myOutputValue +
        playersHand[currentPlayer][outputIndex].name +
        " of " +
        playersHand[currentPlayer][outputIndex].suit +
        "<br>";
      outputIndex += 1;
    }
    myOutputValue =
      myOutputValue +
      `Total count: ${playersScore[currentPlayer]}<br> Hit or Stand?`;
    gameState = "hitOrStand";
    return myOutputValue;
  }
  //dealer hit or stand
  if (gameState == "dealerPlay") {
    if (playersScore[currentPlayer] > 17) {
    }
    if (playersScore[currentPlayer] > 17) {
      myOutputValue = "Dealer stands!";
      gameState = "payOut";
      return myOutputValue;
    }
    hitMe(currentPlayer);
    console.log("current player", currentPlayer);
    gameState = "dealerOpen";
  }
  //open dealer's hand
  if (gameState == "dealerOpen") {
    myOutputValue = `Dealer's hand is:<br>`;
    outputIndex = 0;
    while (outputIndex < playersHand[currentPlayer].length) {
      myOutputValue =
        myOutputValue +
        playersHand[currentPlayer][outputIndex].name +
        " of " +
        playersHand[currentPlayer][outputIndex].suit +
        "<br>";
      outputIndex += 1;
    }
    //black jack
    if (playersScore[currentPlayer] == 21) {
      dealerBlackJack = true;
      myOutputValue = myOutputValue + "Dealer Blackjack!";
      gameState = "payOut";
      return myOutputValue;
    }
    //bust
    if (playersScore[currentPlayer] > 21) {
      myOutputValue + `Total count: ${playersScore[currentPlayer]}<br>`;
      myOutputValue = myOutputValue + "Dealer bust!";
      playersScore[currentPlayer] = 0;
      gameState = "payOut";
      return myOutputValue;
    }
    myOutputValue =
      myOutputValue + `Total count: ${playersScore[currentPlayer]}<br>`;
    gameState = "dealerPlay";
    return myOutputValue;
  }
  //validate score and payout
  if (gameState == "payOut") {
    var losers = "Losers are : ";
    var winners = "Winners are : ";
    var lucky = "Lucky ones are :";
    //double the bet if dealer blackjack
    if (dealerBlackJack) {
      for (var i = 0; i < noOfPlayers - 2; i += 1) {
        playersBet[i] = playersBet[i] * 2;
      }
    }
    //double the bet for players that blackjack
    if (!noPlayerBlackJack) {
      for (var i = 0; i < playerBlackJack.length; i += 1) {
        playersBet[playerBlackJack[i]] = playersBet[playerBlackJack[i]] * 2;
      }
    }
    //bust == 0
    for (var i = 0; i < noOfPlayers - 1; i += 1) {
      //less than dealer
      if (playersScore[i] < playersScore[noOfPlayers - 1]) {
        playersBank[i] = playersBank[i] - playersBet[i];
        dealerBank = dealerBank + playersBet[i];
        losers = losers + `Player ${i + 1} with ${playersBank[i]} chips, `;
        console.log(losers);
      }
      //same as dealer
      else if (playersScore[i] == playersScore[noOfPlayers - 1]) {
        lucky = lucky + `Player ${i + 1} with ${playersBank[i]} chips, `;
      }
      //more than dealer plus bet to bank
      else if (playersScore[i] > playersScore[noOfPlayers - 1]) {
        playersBank[i] = playersBank[i] + playersBet[i];
        dealerBank = dealerBank - playersBet[i];
        winners = winners + `Player ${i + 1} with ${playersBank[i]} chips, `;
      }
    }
    myOutputValue =
      winners +
      "<br>" +
      lucky +
      "<br>" +
      losers +
      `<br> Dealer has ${dealerBank} chips left.`;
    gameState = "reDeal";
    return myOutputValue;
  }
  if (gameState == "reDeal") {
    gameDeck = shuffleCards(makeDeck());
    playersScore = [];
    playersHand = [];
    playersBet = [];
    currentPlayer = -1;
    dealerBlackJack = false;
    outputIndex = 0;
    gameState = "betPhase";
    myOutputValue = "Next round!";
    return myOutputValue;
  }
  return myOutputValue;
};

/********************************************************/

//deal card one by on to each player
var dealCards = function (playerNumber) {
  var roundsDealt = 0;
  var player = 0;
  var roundOne = [];
  var roundTwo = [];
  //deal out cards
  while (roundsDealt < 2) {
    while (player < playerNumber) {
      if (roundsDealt == 0) {
        roundOne.push(gameDeck.pop());
      } else if (roundsDealt == 1) {
        roundTwo.push(gameDeck.pop());
      }
      player += 1;
    }
    player = 0;
    roundsDealt += 1;
  }
  //push them into the hands// pop deal is in reverse order changed to log hands in reverse order
  player = noOfPlayers - 1;
  while (player >= 0) {
    //console.log("player count", player);
    var hand = [];
    hand[0] = roundOne.pop();
    hand[1] = roundTwo.pop();
    playersHand[player] = hand;
    playersScore[player] = countScore(player);
    hand = [];
    player -= 1;
  }
  return;
};

//Tally player's card scores from the playershand
var countScore = function (index) {
  var noOfCards = 0;
  var handValue = 0;
  //counts through whole hand
  while (noOfCards < playersHand[index].length) {
    // rank 11-13 = value 13
    if (playersHand[index][noOfCards].rank > 10) {
      handValue = handValue + 10;
    }
    // rank 1 = value 1 or 11
    if (playersHand[index][noOfCards].rank == 1) {
      var tempValue = handValue + 11;
      if (tempValue <= 21) {
        handValue = handValue + 11;
      } else {
        handValue = handValue + 1;
      }
    }
    if (
      playersHand[index][noOfCards].rank > 1 &&
      playersHand[index][noOfCards].rank < 11
    ) {
      handValue = handValue + playersHand[index][noOfCards].rank;
    }
    noOfCards += 1;
  }
  return handValue;
};
var hitMe = function (index) {
  playersHand[index].push(gameDeck.pop());
  playersScore[index] = countScore(index);
  return;
};

var showAllHands = function (index) {
  var outputIndex = 0;
  var myOutputValue;
  //check for blackjack
  if (playersScore[index] == 21) {
    myOutputValue = `Player ${index + 1} BLACKJACK!`;
    return myOutputValue;
  }
  //show hand and score
  myOutputValue = `Player ${index + 1}'s hand is:<br>`;
  while (outputIndex < playersHand[index].length) {
    myOutputValue =
      myOutputValue +
      playersHand[index][outputIndex].name +
      " of " +
      playersHand[index][outputIndex].suit +
      "<br>";
    outputIndex += 1;
  }
  myOutputValue = myOutputValue + `Total count: ${playersScore[index]}.<br>`;
  return myOutputValue;
};
