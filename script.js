// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 16.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

//Playing Process
var playerName = ``;
var playerMoney = 20;
var playerBet = 0;
var playerCards = [];
var playerHandTotal = 0;
var dealerCards = [];
var dealerHandTotal = 0;
var allPlayerCards = ``;
var allDealerCards = ``;

//Initial Game State
var gameState = `enterTheCasino`;
console.log(`gameState`, gameState);
var hitMode = false;
var stayMode = false;
var roundsPlayed = 0;

//Helper Functions:
var yesNoGenerator = function () {
  return Math.ceil(Math.random() * 2);
};

var calcHandTotal = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    var currCard = hand[counter];
    // If card is Ace, value is 11 by default
    if (currCard.points === 1) {
      numAcesInHand += 1;
      sum += 11;
    } else {
      sum += currCard.points;
    }

    counter = counter + 1;
  }
  // If sum is greater than sum limit and hand contains Aces, convert Aces from value of 11
  // to value of 1, until sum is less than or equal to sum limit or there are no more Aces.
  if (sum > 21 && numAcesInHand > 0) {
    var aceCounter = 0;
    while (aceCounter < numAcesInHand) {
      sum -= 10;
      // If the sum is less than TWENTY_ONE before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (sum <= 21) {
        break; // break keyword causes the loop to finish
      }
      aceCounter = aceCounter + 1;
    }
  }
  return sum;
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥️", "♦️", "♠️", "♣️"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      var cardPoints = rankCounter;
      if (cardPoints == 11) {
        cardPoints = 10;
      } else if (cardPoints == 12) {
        cardPoints = 10;
      } else if (cardPoints == 13) {
        cardPoints = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        points: cardPoints,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};
var deck = shuffleCards(makeDeck());

var dealCard = function (hand) {
  hand.push(deck.pop());
};

var showCards = function (hand) {
  var message = ``;
  for (counter = 0; counter < hand.length; counter += 1) {
    message += `${hand[counter].name}${hand[counter].suit} `;
  }
  return message;
};

//Main game function begins here
var main = function (input) {
  input = input.toLowerCase();

  if (playerMoney >= 25) {
    gameOver = true;
    return `<b>Congratulations</b> you have won the game with a total of $${playerMoney}!<br>
    <br>
    Refresh the page if you wish to play again.`;
  }

  if (gameState == `enterTheCasino`) {
    if (input != `open sesame`) {
      return `Sorry, I don't think you're in the right place. Please go away.`;
    }

    if (input == `open sesame`) {
      gameState = `enterYourName`;
      return `Ah I see you are one of us. Welcome in - What is your name?`;
    }
  }

  if (gameState == `enterYourName`) {
    if (input == ``) {
      return `Sorry I didn't get that. What's your name?`;
    }

    if (input != ``) {
      playerName = input;
      gameState = `placeBet`;
      return `Hello ${playerName}, welcome to our secret place.<br>
      <br>You will begin with $20. The minimum bet per round is $1. Once you hit $100, you will have to leave the table to make room for the next player. Can't have you hogging the table the whole day ya'know.<br>
      <br>
      So, what will you bet for the first round?`;
    }
  }

  if (gameState == `newRound` && input == ``) {
    playerCards = [];
    playerHandTotal = 0;
    dealerCards = [];
    dealerHandTotal = 0;
    playerBet = 0;

    gameState = `placeBet`;
    return `How much would you like to bet for this round?`;
  }

  if (gameState == `placeBet`) {
    if (input > 0 && input <= playerMoney) {
      playerBet = input * 1;
      gameState = `dealCards`;
      return `Okay now that we have your bet. Click to deal the cards!`;
    } else if (
      input > playerMoney ||
      input == `` ||
      input < 0 ||
      input === NaN
    ) {
      return `I didn't get that. How much would you like to bet? The minimum is $1. Just type in a number.`;
    }
  }

  if (gameState == `dealCards` && playerCards.length == 0) {
    var deck = shuffleCards(makeDeck());

    //deal first card
    dealCard(playerCards);
    dealCard(dealerCards);
    //deal second card
    dealCard(playerCards);
    dealCard(dealerCards);
    console.log(`playerCards`, playerCards);
    console.log(`dealerCards`, dealerCards);

    //calculatecards
    playerHandTotal = calcHandTotal(playerCards);
    dealerHandTotal = calcHandTotal(dealerCards);
    console.log(`playerHand`, playerHandTotal);
    console.log(`dealerHand`, dealerHandTotal);

    //initiate any winning conditions
    if (playerHandTotal == 21 && dealerHandTotal != 21) {
      gameState == `newRound`;
      playerMoney += playerBet;
      roundsPlayed += 1;
      allPlayerCards = showCards(playerCards);
      allDealerCards = showCards(dealerCards);
      return `<b><u>Your Cards</u></b><br>
      ${allPlayerCards}<br>
      <br>
      <b><u>Dealer's Cards</u></b><br>
      ${allDealerCards}<br>
      <br>
      <b><u>Results</u></b><br>
      You have <b>won</b> with an opening hand of 21 points! Yay!<br>
      <br>
      <b><u>Your Money</b></u><br>
      $${playerMoney}<br>
      <br>
      Click next to start a new round.`;
    }

    if (dealerHandTotal == 21 && playerHandTotal != 21) {
      gameState == `newRound`;
      playerMoney -= playerBet;
      roundsPlayed += 1;
      allPlayerCards = showCards(playerCards);
      allDealerCards = showCards(dealerCards);
      return `<b><u>Your Cards</u></b><br>
      ${allPlayerCards}<br>
      <br>
      <b><u>Dealer's Cards</u></b><br>
      ${allDealerCards}<br>
      <br>
      <b><u>Results</u></b><br>
      You have <b>lost</b> as the dealer had an opening hand of 21 points! Oh well.<br>
      <br>
      <b><u>Your Money</b></u><br>
      $${playerMoney}<br>
      <br>
      Click next to start a new round.`;
    }

    if (playerHandTotal == 21 && dealerHandTotal == 21) {
      gameState == `newRound`;
      roundsPlayed += 1;
      allPlayerCards = showCards(playerCards);
      allDealerCards = showCards(dealerCards);
      return `<b><u>Your Cards</u></b><br>
      ${allPlayerCards}<br>
      <br>
      <b><u>Dealer's Cards</u></b><br>
      ${allDealerCards}<br>
      <br>
      <b><u>Results</u></b><br>
      It's a <b>tie</b> as both you and the dealer had an opening hand of 21 points! Oh well.<br>
      <b><u>Your Money</b></u><br>
      $${playerMoney}<br>
      <br>
      <br> Click next to start a new round.`;
    }
    if (playerHandTotal != 21 && dealerHandTotal != 21) {
      gameState = `playersMove`;
      allPlayerCards = showCards(playerCards);
      allDealerCards = showCards(dealerCards);
      return `<b><u>Your Cards</u></b><br>
      ${allPlayerCards}<br>
      <br>
      <b><u>Dealer's Cards</u></b><br>
      Open Card: ${dealerCards[0].name}${dealerCards[0].suit}
      <br>
      Things are heating up! Click next to see your options.`;
    }
  }

  if (gameState == `playersMove`) {
    if (input == `hit`) {
      dealCard(playerCards);
      playerHandTotal = calcHandTotal(playerCards);
      allPlayerCards = showCards(playerCards);
      allDealerCards = showCards(dealerCards);
      hitMode = false;
      stayMode = false;
      return `<b><u>Your Cards</u></b><br>
      ${allPlayerCards}
      <br>
      <b><u>Dealer's Cards</u></b><br>
      Open Card: ${dealerCards[0].name}${dealerCards[0].suit}
      <br>
       <b>Click next to continue.</b>`;
    }

    if (input == `stay`) {
      gameState = `dealersMove`;
      return `You've chosen to stay. Click next to continue.`;
    }

    if (playerHandTotal < 16) {
      hitMode = true;
      stayMode = false;
      return `Your current hand is less than 16 points! You must hit in order to continue playing. Click hit to continue`;
    }

    if (playerHandTotal > 16 && playerHandTotal < 21) {
      hitMode = true;
      stayMode = true;
      return `Your current hand is ${playerHandTotal}. You may choose to hit or stay. Click one to continue.`;
    }

    if (playerHandTotal == 21) {
      hitMode = true;
      stayMode = true;
      return `Your current hand is ${playerHandTotal}! You are in a good place. You shouldn't take anymore cards! Just click stay to keep this hand then click next to continue.`;
    }

    if (playerHandTotal > 21) {
      gameState = `dealersMove`;
      hitMode = false;
      stayMode = false;
      return `Oh no! You're above 21 points :( Nothing you can do now but click stay to continue and hope the dealer busts too.`;
    }
  }

  if (gameState == `dealersMove`) {
    hitMode = false;
    stayMode = false;
    dealerHandTotal = calcHandTotal(dealerCards);

    while (dealerHandTotal < 16) {
      dealCard(dealerCards);
      dealerHandTotal = calcHandTotal(dealerCards);
    }

    if (dealerHandTotal > 16) {
      while (dealerHandTotal < 21) {
        var drawOrNot = yesNoGenerator();

        if ((drawOrNot = 1)) {
          dealCard(dealerCards);
          dealerHandTotal = calcHandTotal(dealerCards);
        }
        if ((drawOrNot = 2)) {
          dealerHandTotal = calcHandTotal(dealerCards);
          break;
        }
      }
    }
    dealerHandTotal = calcHandTotal(dealerCards);
    gameState = `compareHands`;
    return `The dealer is done with their turn. Click next to see who wins the round!`;
  }

  if (gameState == `compareHands` && input == ``) {
    if (
      playerHandTotal == dealerHandTotal ||
      (playerHandTotal > 21 && dealerHandTotal > 21)
    ) {
      gameState = `newRound`;
      roundsPlayed += 1;
      allPlayerCards = showCards(playerCards);
      allDealerCards = showCards(dealerCards);
      return `<b><u>Your Cards</u></b><br>
      ${allPlayerCards}<br>
      <br>
      <b><u>Dealer's Cards</u></b><br>
      ${allDealerCards}<br>
      <br>
      <b><u>Results</u></b><br>
      It's a <b>tie</b> Oh well.<br>
      <b><u>Your Money</b></u><br>
      $${playerMoney}<br>
      <br>
      <br> Click next to start a new round.`;
    }

    if (
      playerHandTotal > dealerHandTotal &&
      playerHandTotal <= 21 &&
      dealerHandTotal <= 21
    ) {
      playerMoney += playerBet;
      gameState = `newRound`;
      roundsPlayed += 1;
      allPlayerCards = showCards(playerCards);
      allDealerCards = showCards(dealerCards);
      return `<b><u>Your Cards</u></b><br>
      ${allPlayerCards}<br>
      <br>
      <b><u>Dealer's Cards</u></b><br>
      ${allDealerCards}<br>
      <br>
      <b><u>Results</u></b><br>
      You have <b>won</b> Yay!<br>
      <br>
      <b><u>Your Money</b></u><br>
      $${playerMoney}<br>
      <br>
      Click next to start a new round.`;
    }

    if (
      playerHandTotal < dealerHandTotal &&
      playerHandTotal <= 21 &&
      dealerHandTotal <= 21
    ) {
      playerMoney -= playerBet;
      gameState = `newRound`;
      roundsPlayed += 1;
      allPlayerCards = showCards(playerCards);
      allDealerCards = showCards(dealerCards);
      return `<b><u>Your Cards</u></b><br>
      ${allPlayerCards}<br>
      <br>
      <b><u>Dealer's Cards</u></b><br>
      ${allDealerCards}<br>
      <br>
      <b><u>Results</u></b><br>
      You have <b>lost</b> Oh well.<br>
      <br>
      <b><u>Your Money</b></u><br>
      $${playerMoney}<br>
      <br>
      Click next to start a new round.`;
    }

    if (playerHandTotal <= 21 && dealerHandTotal > 21) {
      playerMoney += playerBet;
      gameState = `newRound`;
      roundsPlayed += 1;
      allPlayerCards = showCards(playerCards);
      allDealerCards = showCards(dealerCards);
      return `<b><u>Your Cards</u></b><br>
      ${allPlayerCards}<br>
      <br>
      <b><u>Dealer's Cards</u></b><br>
      ${allDealerCards}<br>
      <br>
      <b><u>Results</u></b><br>
      You have <b>won</b> Yay!<br>
      <br>
      <b><u>Your Money</b></u><br>
      $${playerMoney}<br>
      <br>
      Click next to start a new round.`;
    }

    if (playerHandTotal > 21 && dealerHandTotal <= 21) {
      playerMoney -= playerBet;
      gameState = `newRound`;
      roundsPlayed += 1;
      allPlayerCards = showCards(playerCards);
      allDealerCards = showCards(dealerCards);
      return `<b><u>Your Cards</u></b><br>
      ${allPlayerCards}<br>
      <br>
      <b><u>Dealer's Cards</u></b><br>
      ${allDealerCards}<br>
      <br>
      <b><u>Results</u></b><br>
      You have <b>lost</b> Oh well.<br>
      <br>
      <b><u>Your Money</b></u><br>
      $${playerMoney}<br>
      <br>
      Click next to start a new round.`;
    }
  }
};
