// ====================================================
// ===== HELPER FUNCTIONS =============================
// ====================================================

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
      var cardScore = rankCounter;

      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
        cardLabel = 'A';
      } else if (cardName == 11) {
        cardName = 'jack';
        cardLabel = 'J';
        cardScore = 10;
      } else if (cardName == 12) {
        cardName = 'queen';
        cardLabel = 'Q';
        cardScore = 10;
      } else if (cardName == 13) {
        cardName = 'king';
        cardLabel = 'K';
        cardScore = 10;
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
        score: cardScore,
        label: cardLabel,
      };

      // add the card to the deck
      deck.push(card);

      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  console.log('new deck generated')
  console.table(deck)
  return deck;
};

// ====================================================
// function to generate a random integer according to parameter
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
}

// ====================================================
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

// ====================================================
// function for dealing a card to the chosen player
var dealCardPlayer = function (index) {

  // defining the drawn card
  var drawnCard = playingDeck.pop()

  // adding drawn card to player's hand
  playersData[index].cards.push(drawnCard)

  // return drawn card
  return drawnCard;
}

// ====================================================
// function for dealing a card to the dealer
var dealCardDealer = function () {

  // defining the drawn card
  var drawnCard = playingDeck.pop()

  // adding drawn card to dealer's hand
  dealerData.cards.push(drawnCard)

  // return drawn card
  return drawnCard;
}

// ====================================================
// function to reveal card
var revealCard = function (card) {
  var outputCardName = `${indexCard.name}${indexCard.suit}`
  return outputCardName;
}

// ====================================================
// function to display specific player's hand for html
var displayPlayerHands = function (cards, index) {

  // defining the cards to display
  var userHands = cards;

  // for each cards in hand, display the card in html
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
  document.getElementById(`playerHand${index}`).innerHTML = placeholderDisplay;
}

// ====================================================
// function to display dealer's hand for html
var displayDealerCard = function (cards, type) {

  // defining cards to displau
  var userHands = cards;


  var dealerHandDisplay = ``;
  var index = 0;

  // if arguement to show only partial hand, hide the 1st card of the dealer
  if (type == 'partial') {
    dealerHandDisplay = `
      <div
        id="cardFace"
        style="
          background:
            conic-gradient(from 150deg at 50% 33%,#0000,#ff4753 .5deg 60deg,#0000 60.5deg) 
            calc(10px/2) calc(10px/1.4),
            conic-gradient(from -30deg at 50% 66%,#0000,#ff4753 .5deg 60deg,#ffdede 60.5deg);
          background-size: 10px calc(10px/1.154);
          border: 5px solid #ffffffd1;
        "
      ></div>
    `;
    index = 1;
  }

  // show the rest of the dealer's card
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
// function to calculate the score
var calScore = function (cards) {
  let scoreAmt = 0;
  // for (let i = 0; i < cards.length; i++) {
  //   if (cards[i].name == 'ace' && cards.length == 2) {
  //     scoreAmt += 11;
  //   } else if (cards[i].name == 'ace') {
  //     scoreAmt += 1;
  //   } else if (cards[i].name == 'jack' || cards[i].name == 'queen' || cards[i].name == 'king') {
  //     scoreAmt += 10;
  //   } else {
  //     scoreAmt += parseInt(cards[i].name)
  //   }
  // }
  console.log(cards)

  var aceCounter = 0;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].name == 'ace') {
      aceCounter++
    } else if (cards[i].name == 'jack' || cards[i].name == 'queen' || cards[i].name == 'king') {
      scoreAmt += 10;
    } else {
      scoreAmt += parseInt(cards[i].name)
    }
  }
  console.log({aceCounter})
  console.log({length: cards.length})
  
  if (cards.length == 2 && aceCounter == 2) {
    scoreAmt = 21;
  } else if (cards.length == 2 && aceCounter == 1) {
    scoreAmt += 11;
  } else if (aceCounter == 1) {
    var ifScore = scoreAmt + 10;
    if (ifScore > 21) {
      scoreAmt += 1;
    } else {
      scoreAmt = ifScore;
    }
  } else if (aceCounter == 2) {
    var ifScore = scoreAmt + 10;
    if (ifScore > 21) {
      scoreAmt += 2
    } else {
      scoreAmt += 10;
      var ifScore = scoreAmt + 1;
      if (ifScore > 21) {
        scoreAmt -= 10;
        scoreAmt += 2
      } else {
        scoreAmt += 10;
        if (scoreAmt > 21) {
          scoreAmt -= 10
          scoreAmt += 1
        }
      }
    }
  } else if (aceCounter == 3) {
    scoreAmt += 3
  } else if (aceCounter == 4) {
    scoreAmt += 4
  }

  if (scoreAmt == 21 && cards.length == 2) {
    // if hands is blackjack, return blackjack
    return 'Blackjack!';

  } else {
    // else return score amount
    return scoreAmt;
  }
}

// ====================================================
// function for setting the number of players
var setPlayerCount = function (input) {

  // input validation to check if its a number
  var noOfPlayer = input * 1;

  if (isNaN(noOfPlayer)) {
    // if input is not a number, return error
    return 'Invalid input! Please enter the number of players for the game!<br>' + lastSystemMsg
    
  } else if (noOfPlayer < 1) {
    // if input is a number but is less than 1, return error
    return 'Minimum 1 player is required to play the game!<br>' + lastSystemMsg

  } else if (noOfPlayer > 6) {
    // if input is a number but is more than 6, return error
    return 'Maximum 6 players can play the game!<br>' + lastSystemMsg

  } else {
    // if number of player is withint 1 to 6
    // set player count
    playerCount = noOfPlayer;

    // set phase to naming player phase
    gameStage = SET_PLAYER_NAME;

    // record system message as last system message and return it 
     return lastSystemMsg = `${noOfPlayer} Players!<br>Player 1, please enter your name!`;
  }
}

// ====================================================
// function for naming players
var playerConstructor = function (playerName) {
  
  if (playerName) {
    // constructing player for the match
    // creating global variable for number of players
    playersData[currentPlayerIndex] = {
      name: `${playerName}`,
      cards: [],
      chipsBalance: 100,
      betAmt: 1,
      isBusted: false,
      score: 0,
      gameResult: null,
    }
  
    // creating display for HTML
    // revealing player HTML card
    document.getElementById(`player-${currentPlayerIndex}-container`).style.display = 'flex';
    // setting name for player HTML card
    document.getElementById(`player-${currentPlayerIndex}-name`).innerHTML = playerName;
    // displaying player's chip balance
    document.getElementById(`player-${currentPlayerIndex}-pot`).innerHTML = playersData[currentPlayerIndex].chipsBalance;
  
    // move to next player index
    currentPlayerIndex++
  
    if (currentPlayerIndex < playerCount) {
  
      // if not the last player, return this statement
      return `Hello ${playerName}!<br>Player ${currentPlayerIndex + 1}, please enter your name!`
    } else {
  
      // if this is the last player:
      // update game phase to dealing phase
      gameStage = DEALING_PHASE;
      
      // reset current player index to 0
      currentPlayerIndex = 0;
      
      // enabling deal button and disable submit button and input field
      btnDeal.disabled = false;
      allowBetting(true);
  
      // return this statement
      return lastSystemMsg = `Hello ${playerName}!<br>All Players has entered their name, start the game by pressing "Deal"!<br>Reminder to set your bets before the round starts!`
    }
  } else {
    return `Please don't leave your name empty!<br>` + lastSystemMsg
  }
}

// ====================================================
// function for dealing cards at the start of a round
var dealingPhase = function (input) {
  
  // dealing 1 cards to all players and dealer
  for (let i = 0; i < playerCount; i++) {

    // defining player info
    var playerInfo = playersData[i];

    // only deal card if player has chips
    if (playerInfo.chipsBalance > 0) {
      dealCardPlayer(i);
    }
  }
  dealCardDealer();

  // dealing 1 cards to all players and dealer
  for (let i = 0; i < playerCount; i++) {

    // defining player info
    var playerInfo = playersData[i];

    // only deal card if player has chips
    if (playerInfo.chipsBalance > 0) {
      dealCardPlayer(i);
    }
  }
  dealCardDealer();

  // playersData[1].cards = [
  //   {
  //     name: 'ace',
  //     suit: `<span style="color: crimson">♥</span>`,
  //     rank: 1,
  //     score: 1,
  //     label: `<span style="color: crimson">A</span>`,
  //   }, {
  //     name: 'ace',
  //     suit: `<span style="color: crimson">♥</span>`,
  //     rank: 1,
  //     score: 1,
  //     label: `<span style="color: crimson">A</span>`,
  //   }, {
  //     name: 2,
  //     suit: `<span style="color: crimson">♥</span>`,
  //     rank: 2,
  //     score: 2,
  //     label: `<span style="color: crimson">2</span>`,
  //   }
  // ]
  // playersData[1].cards = [
  //   {
  //     name: 'ace',
  //     suit: `<span style="color: crimson">♦</span>`,
  //     rank: 1,
  //     score: 1,
  //     label: `<span style="color: crimson">A</span>`,
  //   }, {
  //     name: 'ace',
  //     suit: `<span style="color: crimson">♥</span>`,
  //     rank: 1,
  //     score: 1,
  //     label: `<span style="color: crimson">A</span>`,
  //   }
  // ]
}

// ====================================================
// function for calculating the score after dealing 
var calculateDealScore = function () {

  // calculate dealer's score
  dealerData.score = calScore(dealerData.cards);

  // revealing players' cards and calculate score
  for (let i = 0; i < playerCount; i++) {
    
    // display player's hands
    displayPlayerHands(playersData[i].cards, i);
    
    // calculate and store player's score in database
    playersData[i].score = calScore(playersData[i].cards)
  }
}

// ====================================================
// function for dealing cards at the start of a round
var checkBlackjack = function (input) {

  // check if dealer has blackjack
  var dealerHasBlackjack = (dealerData.score == 'Blackjack!');
  var outputStatement = ``;

  // if dealer has blackjack
  if (dealerHasBlackjack) {

    // show dealer's hands and return statement
    displayDealerCard(dealerData.cards, 'full')
    outputStatement += 'Dealer got Blackjack!';

    // reveal players' hands and check if they have blackjack
    for (let i = 0; i < playerCount; i++) {

      // defining player's info and show player's hands
      var playerInfo = playersData[i];
      var playerBet = document.getElementById(`player-${i}-slider`).value
      displayPlayerHands(playerInfo.cards, i);

      if (playerInfo.chipsBalance > 0) {
        if (playerInfo.score == 'Blackjack!') {
          // if player got blackjack too, add to return statement
          playersData[i].gameResult = 'draw';
          outputStatement += `<br>${playerInfo.name} got Blackjack and escape from losing!`;
  
        } else {
          // else player loses automatically
          playersData[i].gameResult = 'lost'
          playerInfo.chipsBalance -= playerBet
          outputStatement += `<br>${playerInfo.name} lost this round with a bet of ${playerBet}!`
        }
      }
    }

    // change gamemode to reveal results
    gameStage = RESET;
    btnDeal.innerHTML = 'Reset';

    updatePlayerChipBalance();

    return lastSystemMsg = outputStatement + `<br>Click 'Reset' to clear the table`;
  } else {

    // if dealer does not have blackjack show dealer's partial hands and return statement
    displayDealerCard(dealerData.cards, 'partial')
    outputStatement += `Cards has been dealt!`

    // reveal players' hands and check if they have blackjack
    for (let i = 0; i < playerCount; i++) {

      // defining player's info and show player's hands
      var playerInfo = playersData[i];
      displayPlayerHands(playerInfo.cards, i);

      if (playerInfo.chipsBalance > 0) {
        if (playerInfo.score == 'Blackjack!') {
          // if player got blackjack too, add to return statement
          playersData[i].gameResult = 'won';
          outputStatement += `<br>${playerInfo.name} got Blackjack!`;
  
          var remainingPlayers = 0;
          for (let j = 0; j < playerCount; j++) {
            if (playersData[j].chipsBalance > 0) {
              remainingPlayers++
            }
          }

          // if it's this player's round, skip his turn as he has already won
          if (remainingPlayers == 1) {
            currentPlayerIndex = 0;
            gameStage = DEALER_PHASE;
            btnDeal.innerHTML = 'Proceed'
            return lastSystemMsg = `
              ${playerInfo.name} got Blackjack!
              <br>Dealer's turn! Click 'Proceed' to continue!
            `
          }
          if (currentPlayerIndex == i || playerInfo.chipsBalance == 0) {
            currentPlayerIndex++
          }
        }
      }
    }

    // change game mode to player phase
    gameStage = PLAYER_PHASE;
    document.getElementById(`player-${currentPlayerIndex}-container`).style.backgroundColor = "#fff3d3";
    document.getElementById(`player-${currentPlayerIndex}-container`).style.boxShadow = "0px 0px 30px 10px white"
    
    btnDeal.disabled = true;
    btnHit.disabled = false;
    btnStand.disabled = false;

    return lastSystemMsg = `
      ${outputStatement}
      <br>${playersData[currentPlayerIndex].name}'s turn! Click 'Hit' to draw another card or 'stand' to stop!
    `
  }
}

// ====================================================
// function for dealing cards to player
var playerHit = function () {
  
  // defining current player's information
  var currentPlayerInfo = playersData[currentPlayerIndex];

  // player draw card and revealing hand
  var drawnCard = dealCardPlayer(currentPlayerIndex)
  displayPlayerHands(currentPlayerInfo.cards, currentPlayerIndex);
  
  return drawnCard
}

// ====================================================
// function for checking if any player's hands have busted
var checkIfBusted = function (input) {
  
  // defining current player's information
  var currentPlayerInfo = playersData[currentPlayerIndex];

  // computing scores, update player data
  var newScore = calScore(currentPlayerInfo.cards);
  currentPlayerInfo.score = newScore;

  // if new score is less than or equal to 21, continue player's choice
  if (newScore > 21) {
    currentPlayerInfo.isBusted = true;
    return true;
  } else {
    return false;
  } 
}

// ====================================================
// function for player's action during their turn
var playerGameChoice = function (input) {
  var playerOption = input.toLowerCase();
  
  // defining current player's information
  var currentPlayerInfo = playersData[currentPlayerIndex];
  console.log({currentPlayerIndex})
  console.log({currentPlayerInfo})
  
  // input validation
  if (playerOption !== HIT && playerOption !== STAND) {
    return `Invalid input! Type 'hit' to draw a card or 'stand' to stop!<br>` + lastSystemMsg
  }

  // if player choose to draw card
  if (playerOption == HIT) {

    // defining player's drawn card and whether they have busted
    var drawnCard = playerHit();
    var hasBusted = checkIfBusted();

    // if player has busted
    if (hasBusted) {

      // determine which player is next OR dealer's turn
      currentPlayerIndex++
      console.log({currentPlayerIndex})
      console.log({currentPlayerInfo})

      document.getElementById(`player-${currentPlayerIndex - 1}-container`).style.backgroundColor = "#ffffffd1"
      document.getElementById(`player-${currentPlayerIndex - 1}-container`).style.boxShadow = "none"
  
      
      // if this is the last player, change game mode to dealer's turn 
      if (currentPlayerIndex == playerCount) {
        currentPlayerIndex = 0;
        gameStage = DEALER_PHASE;
        
        btnHit.disabled = true
        btnStand.disabled = true
        btnDeal.disabled = false
        btnDeal.innerHTML = 'Proceed'

        return lastSystemMsg = `
          ${currentPlayerInfo.name} has drawn ${drawnCard.name}${drawnCard.suit}, ${currentPlayerInfo.name} has busted!
          <br>Dealer's turn! Click 'Proceed' to continue!
        `

        // else if player is not the last, check if there are any players that needs a turn
      } else {

        var counter = currentPlayerIndex;
        for (let i = counter; i < playerCount; i++) {
          var checkInfo = playersData[i];
          if (checkInfo.gameResult || checkInfo.chipsBalance == 0) {
            currentPlayerIndex++;
          } else {
            break;
          }
        }

        // if no other player's turn, return statement 
        if (currentPlayerIndex == playerCount) {
          // reset player index
          currentPlayerIndex = 0;
          gameStage = DEALER_PHASE;
        
          btnHit.disabled = true
          btnStand.disabled = true
          btnDeal.disabled = false
          btnDeal.innerHTML = 'Proceed'

          return lastSystemMsg = `
            ${currentPlayerInfo.name} has drawn ${drawnCard.name}${drawnCard.suit}, ${currentPlayerInfo.name} has busted!
            <br>Dealer's turn! Click 'Proceed' to continue!
          `

          // if there are players that still needs a turn 
        } else {
          
          document.getElementById(`player-${currentPlayerIndex}-container`).style.backgroundColor = "#fff3d3";
          document.getElementById(`player-${currentPlayerIndex}-container`).style.boxShadow = "0px 0px 30px 10px white"

          return lastSystemMsg = `
            ${currentPlayerInfo.name} has drawn ${drawnCard.name}${drawnCard.suit}, ${currentPlayerInfo.name} has busted!
            <br>${playersData[currentPlayerIndex].name}'s turn! Click 'Hit' to draw a card or 'Stand' to stop!
          `
        }
      }

      // if player hand is not busted
    } else {
      
      // check score of player
      var playerScore = calScore(currentPlayerInfo.cards)

      // if player hands has not bust alr has 5 cards in hand, 
      if (currentPlayerInfo.cards.length == 5) {

        // update player game result to 'won'
        currentPlayerInfo.gameResult = 'won';

        // check if there are any players that need a turn
        currentPlayerIndex++;
        var counter = currentPlayerIndex;
        for (let i = counter; i < playerCount; i++) {
          var checkInfo = playersData[i];
          if (checkInfo.gameResult || checkInfo.chipsBalance == 0) {
            currentPlayerIndex++;
          } else {
            break;
          }
        }

        // if there is no other player that needs a turn
        if (currentPlayerIndex == playerCount) {

          // reset player index, update game mode and return statement
          currentPlayerIndex = 0;
          gameStage = DEALER_PHASE;
        
          btnHit.disabled = true
          btnStand.disabled = true
          btnDeal.disabled = false
          btnDeal.innerHTML = 'Proceed'

          document.getElementById(`player-${currentPlayerIndex - 1}-container`).style.backgroundColor = "#ffffffd1"
          document.getElementById(`player-${currentPlayerIndex - 1}-container`).style.boxShadow = "none"

          return lastSystemMsg = `
            ${currentPlayerInfo.name} has drawn ${drawnCard.name}${drawnCard.suit}!
            <br>${currentPlayerInfo.name} has won with a hand of 5 cards!
            <br>Dealer's turn! Click 'Proceed' to continue!
          `

          // if there are other players that still needs a turn 
        } else {

          document.getElementById(`player-${currentPlayerIndex - 1}-container`).style.backgroundColor = "#ffffffd1"
          document.getElementById(`player-${currentPlayerIndex - 1}-container`).style.boxShadow = "none"
          document.getElementById(`player-${currentPlayerIndex}-container`).style.backgroundColor = "#fff3d3";
          document.getElementById(`player-${currentPlayerIndex}-container`).style.boxShadow = "0px 0px 30px 10px white"
          
          return lastSystemMsg = `
            ${currentPlayerInfo.name} has drawn ${drawnCard.name}${drawnCard.suit}!
            <br>${currentPlayerInfo.name} has won with a hand of 5 cards!
            <br>${playersData[currentPlayerIndex].name}'s turn! Click 'Hit' to draw a card or 'Stand' to stop!
          `
        }
      }

      // if player has 21 points, return statement
      if (playerScore == 21) {
        return lastSystemMsg = `
          ${currentPlayerInfo.name} has drawn ${drawnCard.name}${drawnCard.suit}!
          <br>It's still ${currentPlayerInfo.name}'s turn! Click 'Hit' to draw a card or 'Stand' to stop!
          <br>Hint: You already have 21 points in hand! Drawing more cards will result in a busted hand!
        `
      }

      if (currentPlayerInfo.cards.length == 4) {

        // defining player's score
        var remainingScore = 21 - playerScore;
        var placeholderText = '';
 
        if (remainingScore == 1) {
          placeholderText = 'If you draw an Ace, you will win!';
        } else if (remainingScore >= 10) {
          placeholderText = 'You will win regardless of any card drawn!'
        } else {
          placeholderText = `Draw a ${remainingScore} or below to win!`
        }

        // return statement
        return lastSystemMsg = `
          ${currentPlayerInfo.name} has drawn ${drawnCard.name}${drawnCard.suit}!
          <br>It's still ${currentPlayerInfo.name}'s turn! Click 'Hit' to draw a card or 'Stand' to stop!
          <br>Hint: You already have 4 cards on hand, the next card you draw will be your final card! ${placeholderText}
        `
      }

      return lastSystemMsg = `
        ${currentPlayerInfo.name} has drawn ${drawnCard.name}${drawnCard.suit}!
        <br>It's still ${currentPlayerInfo.name}'s turn! Click 'Hit' to draw a card or 'Stand' to stop!
      `
    }
  } else if (playerOption == STAND) {

    // defining player's current score
    var score = currentPlayerInfo.score

    // if score is less than 16, return error
    if (score < 16) {
      return `You do not have sufficient points to 'Stand', please Type 'Hit' to draw a card!<br>` + lastSystemMsg

      // if score is more than 16
    } else {

      // determine which player is next OR dealer's turn
      currentPlayerIndex++
      document.getElementById(`player-${currentPlayerIndex - 1}-container`).style.backgroundColor = "#ffffffd1"
      document.getElementById(`player-${currentPlayerIndex - 1}-container`).style.boxShadow = "none"
  
      // if this is the last player, change game mode to dealer's turn 
      if (currentPlayerIndex == playerCount) {
        currentPlayerIndex = 0;
        gameStage = DEALER_PHASE;
        
        btnHit.disabled = true
        btnStand.disabled = true
        btnDeal.disabled = false
        btnDeal.innerHTML = 'Proceed'

        return lastSystemMsg = `
          ${currentPlayerInfo.name} has chose to 'Stand'!
          <br>Dealer's turn! Click 'Proceed' to continue!
        `

        // else if player is not the last, check if there are any players that needs a turn
      } else {
        var counter = currentPlayerIndex;
        for (let i = counter; i < playerCount; i++) {
          var checkInfo = playersData[i];
          if (checkInfo.gameResult || checkInfo.chipsBalance == 0) {
            currentPlayerIndex++;
          } else {
            break;
          }
        }

        // if no other player's turn, return statement 
        if (currentPlayerIndex == playerCount) {
          currentPlayerIndex = 0;
          gameStage = DEALER_PHASE;
        
          btnHit.disabled = true
          btnStand.disabled = true
          btnDeal.disabled = false
          btnDeal.innerHTML = 'Proceed'

          return lastSystemMsg = `
            ${currentPlayerInfo.name} has chose to 'Stand'!
            <br>Dealer's turn! Click 'Proceed' to continue!
          `

          // if there are players that still needs a turn
        } else {
          document.getElementById(`player-${currentPlayerIndex}-container`).style.backgroundColor = "#fff3d3"
          document.getElementById(`player-${currentPlayerIndex}-container`).style.boxShadow = "0px 0px 30px 10px white"
          return lastSystemMsg = `
            ${currentPlayerInfo.name} has chose to 'Stand'!
            <br>${playersData[currentPlayerIndex].name}'s turn! Click 'Hit' to draw a card or 'Stand' to stop!
          `
        }
      }
    }
  }
}

// ====================================================
// function for dealer's action during their turn
var dealerAction = function () {
  var didDealerDraw = false;
  var dealerDrewText = `Dealer drew the following cards: `
  
  for (let i = 2; i < 5; i++) {

    // defining dealer's score
    var dealerScore = calScore(dealerData.cards);

    // if score is less than 16
    if (dealerScore < 16) {

      // draw card
      var drawnCard = dealCardDealer()
      didDealerDraw = true
      dealerDrewText += `${drawnCard.name}${drawnCard.suit} `
      displayDealerCard(dealerData.cards, 'partial')

      // if score is between 16 and 21
    } else if (dealerScore < 21) {

      var roundsWon = 0;
      for (let j = 0; j < playersData.length; j++) {
        var playerInfo = playersData[j];
        if (!playerInfo.gameResult && playerInfo.isBusted) {
          roundsWon++
        } else if (!playerInfo.gameResult && (dealerScore > playerInfo.score)) {
          roundsWon++
        }
      }

      // if dealer has not won any round, draw card
      if (roundsWon == 0) {
        var drawnCard = dealCardDealer()
        didDealerDraw = true
        dealerDrewText += `${drawnCard.name}${drawnCard.suit} `
        displayDealerCard(dealerData.cards, 'partial')
      } 
    } else if (dealerScore > 21) {
      
      // set dealer's hands have busted
      dealerData.isBusted = true; 
    }
  }

  // change gamdemode to reveal results
  gameStage = REVEAL_RESULTS;
  btnDeal.innerHTML = 'Reveal'
  dealerData.score = calScore(dealerData.cards);

  // determine if dealer has drawn any additional cards
  if (!didDealerDraw) {
    return lastSystemMsg = `
      Dealer did not draw any cards!
      <br>Click 'Reveal' to see results!
    `

    // if dealer drew cards
  } else {
    return lastSystemMsg = `
      ${dealerDrewText}
      <br>Click 'Reveal' to see results!
    `
  }
}

// ====================================================
// function to calculate game results
var calculateResults = function () {
  for (let i = 0; i < playerCount; i++) {

    // defining player info
    let playerInfo = playersData[i];
    
    if (playerInfo.chipsBalance) {
      // if game results is empty
      if (!playerInfo.gameResults) {
  
        // if player and dealer both busted
        if (playerInfo.isBusted && dealerData.isBusted) {
          playerInfo.gameResult = 'draw'
        }
  
        // if player is not busted but dealer is busted
        if (!playerInfo.isBusted && dealerData.isBusted) {
          playerInfo.gameResult = 'won'
        }
  
        // if player is busted but dealer is not
        if (playerInfo.isBusted && !dealerData.isBusted) {
          playerInfo.gameResult = 'lose'
        }
  
        // if neither player nor dealer is busted
        if (!playerInfo.isBusted && !dealerData.isBusted) {
  
          // if player score is more than dealer
          if (playerInfo.score > dealerData.score) {
            playerInfo.gameResult = 'won'
          } 
  
          // if player score is less than dealer
          if (playerInfo.score < dealerData.score) {
            playerInfo.gameResult = 'lose'
          } 
  
          // if player score is equal dealer
          if (playerInfo.score == dealerData.score) {
            playerInfo.gameResult = 'draw'
          } 

          // if dealer got 5 cards in hand
          if (dealerData.cards.length == 5) {
            playerInfo.gameResult = 'lose'
          }
        }
      }
    }
  }

}

// ====================================================
// function to calculate game results
var settleBets = function () {
  
  // defining empty placeholder
  var placeholderText = 'Dealer is settling the bets:';
  
  // for each players
  for (let i = 0; i < playerCount; i++) {
    
    // defining player information and bet amount
    var playerInfo = playersData[i]
    var playerBet = document.getElementById(`player-${i}-slider`).value

    if (playerInfo.chipsBalance > 0) {
      if (playerInfo.gameResult == 'won') {
        playerInfo.chipsBalance += parseInt(playerBet)
        placeholderText += `<br>${playerInfo.name} won this round with a bet of ${playerBet}!`
      }
      if (playerInfo.gameResult == 'lose') {
        playerInfo.chipsBalance -= playerBet
        placeholderText += `<br>${playerInfo.name} lost this round with a bet of ${playerBet}!`
      }
      if (playerInfo.gameResult == 'draw') {
        placeholderText += `<br>${playerInfo.name} draw this round!`
      }
      
      // update player bet slider
      updatePlayerChipBalance();
    }
  }

  // set game mode to reset round
  gameStage = RESET;
  btnDeal.innerHTML = 'Reset';

  return lastSystemMsg = placeholderText + `<br>Click 'reset' to clear the table!`;
}

// ====================================================
// function to reset player information for new round
var updatePlayerChipBalance = function () {

  // for each player
  for (let i = 0; i < playerCount; i++) {

    // define player information
    var playerChipsBalance = playersData[i].chipsBalance;
    var playerBet = document.getElementById(`player-${i}-slider`).value

    if (playerChipsBalance < playerBet) {
      document.getElementById(`player-${i}-slider`).max = playerChipsBalance;
      document.getElementById(`player-${i}-bet`).innerHTML = playerChipsBalance;
      document.getElementById(`player-${i}-pot`).innerHTML = playerChipsBalance;
    } else {
      document.getElementById(`player-${i}-slider`).max = playerChipsBalance;
      document.getElementById(`player-${i}-pot`).innerHTML = playerChipsBalance;
    }
  }
}

// ====================================================
// function to reset player information for new round
var resetPlayersInfo = function () {

  // for every player
  for (let i = 0; i < playerCount; i++) {

    // defining player information
    var playerInfo = playersData[i];

    // resetting player's cards, isBusted, score, and gameResults
    playerInfo.cards = [];
    playerInfo.isBusted = false;
    playerInfo.score = 0;
    playerInfo.gameResult = null;

    // reset player HTML UI cards
    displayPlayerHands(playerInfo.cards, i);
  }

  // reset dealer's data 
  dealerData = {
    cards: [],
    isBusted: false,
    score: 0,
  }

  // reset dealer's HTML UI cards 
  displayDealerCard(dealerData.cards)

  // change game mode to dealing phase
  gameStage = DEALING_PHASE
  allowBetting(true)
  btnDeal.disabled = false;
  btnDeal.innerHTML = 'Deal'

  // make a new shuffled deck
  playingDeck = shuffleDeck(makeDeck());

  for (let i = 0; i < playerCount; i++) {
    playerInfo = playersData[i];
    if (playerInfo.chipsBalance == 0) {
      currentPlayerIndex++
    } else {
      break;
    }
  }

  return lastSystemMsg = `Round has been reset! Click 'Deal' to start new round!<br>Reminder to set your bets before the round starts!`

}

// ====================================================
// function to enable or disable betting
var allowBetting = function (boolean) {

  if (boolean == false) {
    for (let i = 0; i < playerCount; i++) {
      document.getElementById(`player-${i}-slider`).disabled = !boolean;
    }
  } else {
    for (let i = 0; i < playerCount; i++) {
      if (playersData[i].chipsBalance !== 0) {
        document.getElementById(`player-${i}-slider`).disabled = !boolean;
      }
    }
  }
}

// ====================================================
// ===== GLOBAL VARIABLE ==============================
// ====================================================
var SET_PLAYER_COUNT = 'set player count';
var SET_PLAYER_NAME = 'set player name';
var DEALING_PHASE = 'dealing phase';
var PLAYER_PHASE = 'player phase';
var DEALER_PHASE = 'dealer phase';
var REVEAL_RESULTS = 'reveal results';
var RESET = 'reset';
var HIT = 'hit';
var STAND = 'stand';
var DEAL = 'deal';

var gameStage = SET_PLAYER_COUNT;
var currentPlayerIndex = 0;
var playerCount = 0;

var playingDeck = shuffleDeck(makeDeck());
var playersData = [
  // player 1 - index[0]
  {
    name: '',
    cards: [],
    chipsBalance: 100,
    betAmt: 1,
    isBusted: false,
    score: 0,
    gameResult: null,
  }
];
var dealerData = {
  cards: [],
  isBusted: false,
  score: 0,
}

var lastSystemMsg = 'Welcome to Blackjack! Please enter the number of players!';

// ====================================================
// ===== BUTTON VARIABLE ==============================
// ====================================================
var btnSubmit = document.getElementById("submit-button");
var btnDeal = document.getElementById("deal-button");
var btnHit = document.getElementById("hit-button");
var btnStand = document.getElementById("stand-button");
var inputField = document.getElementById("input-field");
var outputDiv = document.getElementById("output-div");

// ====================================================
// ===== ON LAUNCH ====================================
// ====================================================
outputDiv.innerHTML = lastSystemMsg;
btnDeal.disabled = true;
btnHit.disabled = true;
btnStand.disabled = true;


// ====================================================
// ===== MAIN FUNCTION ================================
// ====================================================

var main = function (input) {

  if (gameStage == SET_PLAYER_COUNT) {
    return setPlayerCount(input);
  }

  if (gameStage == SET_PLAYER_NAME) {
    return playerConstructor(input);
  }

  if (gameStage == RESET) {
    return resetPlayersInfo();
  }

  // check if there are any players remaining
  var remainingPlayers = 0;
  for (let i = 0; i < playerCount; i++) {
    if (playersData[i].chipsBalance > 0) {
      remainingPlayers++;
    }
  }
  if (remainingPlayers == 0) {
    return 'No players remaining. Thanks for playing!'
  }

  if (gameStage == DEALING_PHASE) {
    allowBetting(false);
    dealingPhase();
    calculateDealScore();
    return checkBlackjack();
  }

  if (gameStage == PLAYER_PHASE) {
    return playerGameChoice(input);
  }

  if (gameStage == DEALER_PHASE) {
    return dealerAction();
  }

  if (gameStage == REVEAL_RESULTS) {
    displayDealerCard(dealerData.cards, 'full')
    calculateResults();
    return settleBets();
  }

};