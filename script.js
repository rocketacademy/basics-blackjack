// ====================================================
// ================= HELPER FUNCTIONS =================
// ====================================================

// function to create a basic poker deck
var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];
  var suits = [`♥️`, `♦️`, `♠️`, `♣️`];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardLabel = rankCounter;

      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
        cardLabel = 'A';
      } else if (cardName == 11) {
        cardName = 'jack';
        cardLabel = 'J';
      } else if (cardName == 12) {
        cardName = 'queen';
        cardLabel = 'Q';
      } else if (cardName == 13) {
        cardName = 'king';
        cardLabel = 'K';
      }

      var suitStyle = "font-size: larger;";
      if (currentSuit == '♥️' || currentSuit == '♦️') {
        cardLabel = `<span style="color: crimson">${cardLabel}</span>`;
        suitStyle += " color: crimson";
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: `<span style="${suitStyle}">${currentSuit}</span>`,
        rank: rankCounter,
        label: cardLabel,
      };

      // add the card to the deck
      deck.push(card);

      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  console.log('new deck generated')
  console.log(deck)
  return deck;
};

// function to generate a random integer according to parameter
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
}

// function for shuffling deck
var shuffleDeck = function (deck) {
  // repeat for the numbers of cards in a deck
  for (let i = 0; i < deck.length; i++) {
    var randomIndex = getRandomIndex(deck.length);

    // current index card
    var currentItem = deck[i];

    // random index card
    var randomItem = deck[randomIndex];

    // swapping the current index card and the random index card (shuffling)
    deck[i] = randomItem;
    deck[randomIndex] = currentItem;
  }

  return deck;
}

// function for dealing a card to the chosen player
var dealCards = function (player, deck) {
  if (player == 'player') {
    playerHands.push(deck.pop())
  } else if (player == 'dealer') {
    dealerHands.push(deck.pop())
  }
}

// function to reveal player's hand
var revealPlayerHands = function () {
  let playersHands = `Player's hand: `;
  for (let i = 0; i < playerHands.length; i++) {
    playersHands += `${playerHands[i].name}${playerHands[i].suit}; `
  }
  return playersHands;
}

// function to reveal dealer's hand
var revealDealerHands = function () {
  let dealersHands = `Dealer's hand: `;
  for (let i = 0; i < dealerHands.length; i++) {
    dealersHands += `${dealerHands[i].name}${dealerHands[i].suit}; `
  }
  return dealersHands;
}

// function to calculate the score
var calScore = function (userHands) {
  let scoreAmt = 0;
  for (let i = 0; i < userHands.length; i++) {
    if (userHands[i].name == 'ace' && userHands.length == 2) {
      scoreAmt += 11;
    } else if (userHands[i].name == 'ace') {
      scoreAmt += 1;
    } else if (userHands[i].name == 'jack' || userHands[i].name == 'queen' || userHands[i].name == 'king') {
      scoreAmt += 10;
    } else {
      scoreAmt += parseInt(userHands[i].name)
    }
  }

  if (scoreAmt == 21 && userHands.length == 2) {
    return 'Blackjack!';
  } else {
    return scoreAmt;
  }
}

// function for recording player's bet
// var bettingPhase = function (input) {
//   playerBet = input * 1;
//   if (!isNaN(playerBet)) {
//     if (playerBet <= 0) {
//       return lastSystemMsg + '<br><br>Player! you cannot bet less than 0 credits! Try again!'
//     } else if (playerBet < playerPot) {
//       playerOneBet = playerBet;
//       gamePhase = DEALING_PHASE;
//       document.getElementById("player-1-bet").innerHTML = playerBet;
//       lastSystemMsg = `Player has bet ${playerBet} credits for the round!<br><br>Click "Deal" to start the round!`;
//       return lastSystemMsg;
//     } else {
//       return lastSystemMsg + '<br><br>You do not have sufficient credit in your pot! Try again!'
//     }
//   } else {
//     return lastSystemMsg + '<br><br>Invalid input! Please enter the amount you want to bet for the round!'
//   }
// }

// function for dealing cards at the start of a round
var dealingPhase = function (playingDeck, playerBet) {
  dealCards('player', playingDeck);
  dealCards('dealer', playingDeck);
  dealCards('player', playingDeck);
  dealCards('dealer', playingDeck);

  console.log('player hands')
  console.log(playerHands);
  console.log('dealer hands')
  console.log(dealerHands);
  console.log('next dealing card')
  console.log(playingDeck[playingDeck.length - 1])
  // playerHands = [{name: 'ace', label: 'A', rank: 1, suit: '♦'}, {name: 2, label: 2, rank: 1, suit: '♦'}, {name: 3, label: 3, rank: 1, suit: '♦'}, {name: 4, label: 4, rank: 1, suit: '♦'}, {name: 5, label: 5, rank: 1, suit: '♦'}];
  // dealerHands = [{name: 'ace', label: 'A', rank: 1, suit: '♦'}, {name: 2, label: 2, rank: 2, suit: '♦'}];

  var playerScore = calScore(playerHands);
  var dealerScore = calScore(dealerHands);

  if (dealerScore == 'Blackjack!' && playerScore == 'Blackjack!') {
    isGameEnded = true;
    displayDealerCard(dealerHands, 'full');
    displayPlayerCard(playerHands);
    return `
      ${revealPlayerHands()}
      <br>${revealDealerHands()}
      <br><br>Player and Dealer got Blackjack! It's a Draw!
    `
  } else if (dealerScore == 'Blackjack!') {
    isGameEnded = true;
    displayDealerCard(dealerHands, 'full');
    displayPlayerCard(playerHands);
    playerPot -= playerBet;
    document.getElementById("player-1-slider").max = playerPot;
    document.getElementById("player-1-pot").innerHTML = playerPot;
    if (playerPot < playerBet) {
      document.getElementById("player-1-slider").value = playerPot;
      document.getElementById("player-1-bet").innerHTML = playerPot;
    }
    return `
      ${revealPlayerHands()}
      <br>${revealDealerHands()}
      <br><br>Dealer got Blackjack! You lost!
    `
  } else if (playerScore == 'Blackjack!') {
    isGameEnded = true;
    displayDealerCard(dealerHands, 'full');
    displayPlayerCard(playerHands);
    playerPot += playerBet;
    document.getElementById("player-1-slider").max = playerPot;
    document.getElementById("player-1-pot").innerHTML = playerPot;
    return `
      ${revealPlayerHands()}
      <br>${revealDealerHands()}
      <br><br>Player got Blackjack! You won!
    `
  }

  displayDealerCard(dealerHands, 'partial');
  displayPlayerCard(playerHands);
  return `
    ${revealPlayerHands()}
    <br><br>Player's Move: type "hit" to draw another card or "stand" to stop!
  `
}

// function for player hit phase
var playerHitPhase = function () {
  // player draw card
  var playerScore = calScore(playerHands);
  dealCards('player', playingDeck);
  displayPlayerCard(playerHands);

  console.log('player drew')
  console.log(playerHands[playerHands.length - 1])
  console.log('next dealing card')
  console.log(playingDeck[playingDeck.length - 1])

  // calculate scores
  playerScore = calScore(playerHands);

  // logic for returning the results of the player's hands
  var resultsText = ``;
  if (playerScore > 21) {
    isPlayerBusted = true;
    resultsText = `Player has busted!<br>Click "Reveal" to show the dealer's hand!`;
  } else if (playerHands.length == 5) {
    isGameEnded = true;
    resultsText = `Player has won with a hand of 5 cards!`;
  } else if (playerScore == 21) {
      resultsText = `Player's Move: type "hit" to draw another card or "stand" to stop!<br>Hint: You already hit a hand of 21! Drawing more cards will result in a busted hand!`;
  }else if (playerHands.length == 4) {
    var remainingScore = 21 - playerScore;
    if (remainingScore == 1) {
      resultsText = `Player's Move: type "hit" to draw another card or "stand" to stop!<br>Hint: You already have 4 cards on hand, the next card you draw will be your final card! If you draw an Ace you win!`;
    } else if (remainingScore >= 10) {
      resultsText = `Player's Move: type "hit" to draw another card or "stand" to stop!<br>Hint: You already have 4 cards on hand, the next card you draw will be your final card! You will win regardless of any card you draw!`;
    } else {
      resultsText = `Player's Move: type "hit" to draw another card or "stand" to stop!<br>Hint: You already have 4 cards on hand, the next card you draw will be your final card! If you draw a ${remainingScore} or below, you win!`;
    }
  } else {
    resultsText = `Player's Move: type "hit" to draw another card or "stand" to stop!`
  }
  
  return `
    Player draw: ${playerHands[playerHands.length - 1].name}${playerHands[playerHands.length - 1].suit}
    <br><br>${revealPlayerHands()}
    <br><br>${resultsText}
  `
}

// function for dealer's phase
var dealerPhase = function (playerBet) {
  var dealerScore = calScore(dealerHands);
  var playerScore = calScore(playerHands);
  var didDealerDrew = false;
  var dealerDrewText = `Dealer drew the following cards: `;

  if (playerScore < 16) {
    return `You do not have enough points to stand! Type 'hit' to draw a card!`
  }
  
  // logic for dealer drawing cards, max 5 cards
  for (let i = 2; i < 5; i++) {
    if (dealerScore < 16
      || (dealerScore < 21 && dealerScore <= playerScore && playerScore < 21)
    ) {
      dealCards('dealer', playingDeck);
      didDealerDrew = true;
      dealerDrewText += `${dealerHands[dealerHands.length - 1].name}${dealerHands[dealerHands.length - 1].suit}; `;
      dealerScore = calScore(dealerHands)
      displayDealerCard(dealerHands, 'partial')

      console.log('dealer drew')
      console.log(dealerHands[dealerHands.length - 1])
      console.log('next dealing card')
      console.log(playingDeck[playingDeck.length - 1])
    } else {
      break;
    }
  }

  // determine if dealer has drew cards
  if (!didDealerDrew) {
    dealerDrewText = `Dealer did not draw any cards.`;
  }

  // determine if dealer has busted
  if (dealerScore > 21) {
    isDealerBusted = true;
  }

  // reveal results
  var resultsText = ''
  if (isDealerBusted && isPlayerBusted) {
    resultsText = `Both Dealer and Player has busted! No one wins!`;
  } else if (isDealerBusted) {
    resultsText = `Dealer has busted! Player wins ${playerBet} credits!`;
    playerPot += playerBet;
    document.getElementById("player-1-slider").max = playerPot;
    document.getElementById("player-1-pot").innerHTML = playerPot;
  } else if (isPlayerBusted) {
    resultsText = `Player has busted! Player lose ${playerBet} credits!`;
    playerPot -= playerBet;
    document.getElementById("player-1-slider").max = playerPot;
    document.getElementById("player-1-pot").innerHTML = playerPot;
    if (playerPot < playerBet) {
      document.getElementById("player-1-slider").value = playerPot;
      document.getElementById("player-1-bet").innerHTML = playerPot;
    }
  } else if (playerScore > dealerScore) {
    playerPot += playerBet;
    resultsText = `Player wins ${playerBet} credits!`;
    document.getElementById("player-1-slider").max = playerPot;
    document.getElementById("player-1-pot").innerHTML = playerPot;
  } else if (dealerScore > playerScore) {
    playerPot -= playerBet;
    resultsText = `Player lose ${playerBet} credits!`;
    document.getElementById("player-1-slider").max = playerPot;
    document.getElementById("player-1-pot").innerHTML = playerPot;
    if (playerPot < playerBet) {
      document.getElementById("player-1-slider").value = playerPot;
      document.getElementById("player-1-bet").innerHTML = playerPot;
    }
  }

  console.log({playerPot})
  isGameEnded = true;

  // reveal dealer's hands
  displayDealerCard(dealerHands, 'full');
  return `
    ${dealerDrewText}
    <br><br>${revealDealerHands()}
    <br>${revealPlayerHands()}
    <br><br>${resultsText}
  `
}

// function to reset the game
var resetGame = function () {
  isGameEnded = false;
  gamePhase = DEALING_PHASE;
  playerHands = [];
  dealerHands = [];
  isPlayerBusted = false;
  isDealerBusted = false;
  playingDeck = makeDeck();
  playingDeck = shuffleDeck(playingDeck);
  
  document.getElementById("dealerHand").innerHTML = '';
  document.getElementById("playerHand").innerHTML = '';
  document.getElementById("player-1-pot").innerHTML = playerPot;
}

// function to display player's hand for html
var displayPlayerCard = function (cards) {
  var userHands = cards;
  var placeholderDisplay = ``
  for (let i = 0; i < userHands.length; i++) {
    let margin = -40;
    if (i == 0) {
      margin = 0;
    }
    placeholderDisplay += `
      <div id="cardFace" style="margin-left: ${margin}px;">
        <p style="margin: 0px">${userHands[i].label}</p>
        <p style="margin: -8px 0px 0px">${userHands[i].suit}</p>
      </div>
    `
  }
  document.getElementById("playerHand").innerHTML = placeholderDisplay;
}

// function to display dealer's hand for html
var displayDealerCard = function (cards, show) {
  var userHands = cards;
  var dealerHandDisplay = ``;
  var index = 0;

  if (show == 'partial') {
    dealerHandDisplay = `
      <div
        id="cardFace"
        style="
          background:
            conic-gradient(from 150deg at 50% 33%,#0000,#ff4753 .5deg 60deg,#0000 60.5deg) 
            calc(10px/2) calc(10px/1.4),
            conic-gradient(from -30deg at 50% 66%,#0000,#ff4753 .5deg 60deg,#ffdede 60.5deg);
          background-size: 10px calc(10px/1.154);
          border: 5px solid white;
        "
      ></div>
    `;
    index = 1;
  }

  for (let i = index; i < userHands.length; i++) {
    let margin = -40;
    if (i == 0) {
      margin = 0;
    }
    dealerHandDisplay += `
      <div id="cardFace" style="margin-left: ${margin}px;">
        <p style="margin: 0px">${userHands[i].label}</p>
        <p style="margin: -8px 0px 0px">${userHands[i].suit}</p>
      </div>
    `
  }
  document.getElementById("dealerHand").innerHTML = dealerHandDisplay;
}

// ====================================================
// ================= BUTTON VARIABLE ==================
// ====================================================
var btnSubmit = document.getElementById("submit-button");
// var btnSubmit = document.getElementById("deal-button");
// var btnSubmit = document.getElementById("hit-button");
// var btnSubmit = document.getElementById("stand-button");
// var btnSubmit = document.getElementById("reset-button");
// var inputField = document.getElementById("input-field");

// ====================================================
// ================= GLOBAL VARIABLE ==================
// ====================================================
var BETTING_PHASE = 'betting phase';
var DEALING_PHASE = 'dealing phase';
var PLAYER_PHASE = 'player phase';

var playingDeck = shuffleDeck(makeDeck());
var isGameEnded = false;
var gamePhase = DEALING_PHASE;
var playerHands = [];
var playerPot = 100;
var dealerHands = [];
var isPlayerBusted = false;
var isDealerBusted = false;

var lastSystemMsg = 'Hi Player! Welcome to the Blackjack Game!<br>Please adjust the amount of chips you want to bet before starting the game!';
document.querySelector("#output-div").innerHTML = lastSystemMsg;
document.getElementById("player-1-pot").innerHTML = playerPot;

// ====================================================
// ================== MAIN FUNCTIONS ==================
// ====================================================

var main = function (input) {
  var myOutputValue = '';
  var playerBet = document.getElementById("player-1-slider").value * 1;
  console.log(`player has bet:`)
  console.log(playerBet)

  // if player has no credits left
  if (playerPot == 0) {
    return `You have no credit left! Thanks for playing Blackjack! Hope to see you again!`
  }

  // if game has ended
  if (isGameEnded) {
    resetGame();
    lastSystemMsg = `Game has been reset!<br>Press play to start the game!`;
    return lastSystemMsg;
  }

  if (gamePhase == BETTING_PHASE) {
    return bettingPhase(input);
  }

  // if current phase is dealing phase
  if (gamePhase == DEALING_PHASE) {
    lastSystemMsg = dealingPhase(playingDeck, playerBet);
    gamePhase = PLAYER_PHASE;
    return myOutputValue = lastSystemMsg;
  }

  // if current phase is player action phase
  if (gamePhase == PLAYER_PHASE) {
    if (isPlayerBusted) {
      // if player has busted
      lastSystemMsg = dealerPhase(playerBet);
      return myOutputValue = lastSystemMsg;
    } else if (input == 'hit') {
      // if player is not busted and wants to hit
      lastSystemMsg = playerHitPhase();
      return myOutputValue = lastSystemMsg;
    } else if (input == 'stand') {
      // if player is not busted and wants to stand
      lastSystemMsg = dealerPhase(playerBet)
      return myOutputValue = lastSystemMsg;
    } else {
      return myOutputValue = lastSystemMsg + '<br><br>invalid input'
    }
  }
};

document.getElementById("player-1-bet");
document.getElementById("player-1-slider").max;