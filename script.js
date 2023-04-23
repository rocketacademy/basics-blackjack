/*

// ==== GAME BREAKDOWN ==== //

- there are two players (1 human, 1 computer)
- computer is always the dealer
- each player gets two cards at the start
- player starts first, they can decide to either hit (draw another card) or stand (end their turn)
- dealer has to hit if their hand is below 17
- each player's score is a total of their card ranks
- jacks/queen/kings are 10
- aces can be 1 or 11 depending on the current total cards score of player
- player who is closer/equals to 21 wins, anything above 21 player automatically lose

// ==== STEPS ==== //

// Create a game that player is playing on their own

1.1 create a deck (done)
1.2 jacks, queen and kings to have a value of 10 (done)
1.3 ace to have a value of 1 or 11 

2.1 create a shuffled deck (done)

3.1 output 2 cards from shuffled deck to user (done)

4.1 create player's choice function (done)
4.2 if player choose "hit" draw another card from shuffled deck (done)
4.3 if current player score is less than 10, ace will be 11 else ace is 1
4.4 total value of player's score changes according to "hit" result 
4.5 else player choose to "stand" and the current value is the final score

5.1 create a win/lose function
5.2 if player's score is more than 21, player lose
5.3 else player wins
5.4 if player scores blackjack, player wins

// Create a game player is playing against computer

6.1 computer gets 2 cards from shuffled deck (done)

7.1 edit win/lose function to also include computer's scores
7.2 if computer's score is more than 21, computer lose
5.3 if computers score is more than player and is less/equals to 21, computer wins

8.1 create a random choice function for computer
8.2 generate random selection between "hit" or "stand"
8.3 if current computer score is less than 17 computer "hit"
4.3 if current computer score is less than 10, ace will be 11 else ace is 1
8.4 else randomize selection
8.5 if "stand" is generated, current value is computer's final score


*/

// ==== GLOBAL VARIALBLES ==== //
let cardArray = [];
let playerHand = [];
let dealerHand = [];
let playerValue = [];
let dealerValue = [];

let GAME_STATE_RESULT = `show who wins`;
let GAME_STATE_BLACKJACK = `either/both players hit blackjack`;
let GAME_STATE_STARTING_POINT = `game starting`;
let GAME_STATE_PLAYER_CHOOSE = `player choose to hit or stand`;
let GAME_STATE_CARD_GENERATE = `generate two random cards`;
let gameState = GAME_STATE_STARTING_POINT;

// ==== MAIN FUNCTION ==== //
let main = function (input) {
  let output = ``;

  // intro message to start the game
  if (gameState == GAME_STATE_STARTING_POINT) {
    let resetGame = gameReset();
    gameState = GAME_STATE_CARD_GENERATE;
    let myImage =
      '<img src="https://media.tenor.com/pS9palHuoq8AAAAC/evil-witch-laugh.gif"/>';
    return (
      resetGame +
      myImage +
      `<br />Now that everyone has their cards... Hit submit to see what we've got!`
    );
  }

  // generate two cards for player and dealer
  if (gameState == GAME_STATE_CARD_GENERATE) {
    let generateCards = drawCard();

    // if result is blackjack ==> restart game
    if (gameState == GAME_STATE_BLACKJACK) {
      output = gameReset();
      gameState = GAME_STATE_STARTING_POINT;
    } else {
      // else switch game mode to let player choose
      gameState = GAME_STATE_PLAYER_CHOOSE;
    }
    return generateCards;
  }

  // player choose to stand, dealer will start hitting
  if (gameState == GAME_STATE_PLAYER_CHOOSE) {
    let dealerRandomChoice = dealerChoice(input);
    output = playerChoice(input);
    if (playerValue > 21) {
      gameState = GAME_STATE_STARTING_POINT;
      return (
        `You lose! You went over 21.<br /><br />` +
        outputPlayerHand(playerHand, dealerHand) +
        `<br /><br />Hit submit to restart.`
      );
    }
    if (dealerValue > 21) {
      gameState = GAME_STATE_STARTING_POINT;
      return (
        `You win! Dealer has busted.<br /><br />` +
        outputBothPlayersHand(playerHand, dealerHand) +
        `<br /><br />Hit submit to restart.`
      );
    }
    return output + dealerRandomChoice;
  }

  if (gameState == GAME_STATE_RESULT) {
    gameState = GAME_STATE_STARTING_POINT;
    let whoWins = findwinner(playerValue, dealerValue);
    return whoWins;
  }

  return output;
};

// ==== HELPER FUNCTIONS ==== //

// card deck
let makeDeck = function () {
  let suits = [`Spades`, `Hearts`, `Clubs`, `Diamonds`];

  for (let i = 0; i < suits.length; i += 1) {
    for (let j = 1; j <= 13; j += 1) {
      let cardObject = {
        name: j,
        value: j,
        suit: suits[i],
      };
      if (j == 1) {
        cardObject.name = `Ace`;
      } else if (j == 11) {
        cardObject.name = `Jack`;
      } else if (j == 12) {
        cardObject.name = `Queen`;
      } else if (j == 13) {
        cardObject.name = `King`;
      }

      cardArray.push(cardObject);
    }
  }
  return cardArray;
};

// shuffled card deck
let shuffledDeck = function (cardArray) {
  let deckCopy = [...cardArray];
  for (let i = 0; i < deckCopy.length; i += 1) {
    let randomIndex = Math.floor(Math.random() * deckCopy.length);
    let currentCard = deckCopy[i];
    let randomCard = deckCopy[randomIndex];
    deckCopy[i] = randomCard;
    deckCopy[randomIndex] = currentCard;
  }
  return deckCopy;
};

// draw 2 cards
let drawCard = function () {
  let drawCard = shuffledDeck(makeDeck());

  // player hand cards
  let chosenCardOne = drawCard.pop();
  let chosenCardTwo = drawCard.pop();
  playerHand.push(chosenCardOne, chosenCardTwo);
  let totalPlayerHandValue = calCardValue(playerHand);
  playerValue.push(totalPlayerHandValue);

  // dealer hand cards
  let chosenCardThree = drawCard.pop();
  let chosenCardFour = drawCard.pop();
  dealerHand.push(chosenCardThree, chosenCardFour);
  let totalDealerHandValue = calCardValue(dealerHand);
  dealerValue.push(totalDealerHandValue);

  cardArray = [];

  // if player/dealer gets blackjack
  if (playerValue == 21) {
    gameState = GAME_STATE_BLACKJACK;
    return (
      `You win! You got blackjack.<br /><br />` +
      outputPlayerHand(playerHand, dealerHand) +
      `<br /><br />Hit submit to restart.`
    );
  } else if (dealerValue == 21) {
    gameState = GAME_STATE_BLACKJACK;
    return (
      `You lost! Dealer got blackjack!<br /><br />` +
      outputBothPlayersHand(playerHand, dealerHand) +
      `<br /><br />Hit submit to restart.`
    );
  } else if (dealerValue == 21 && playerValue == 21) {
    gameState = GAME_STATE_BLACKJACK;
    return (
      `It's a tie! Both of you got blackjack!<br /><br />` +
      outputBothPlayersHand(playerHand, dealerHand) +
      `<br /><br />Hit submit to restart.`
    );
  } else {
    return (
      outputPlayersHandOneDealerHand(playerHand, dealerHand) +
      `<br /><br />Do you want to hit or stand?`
    );
  }
};

// calculate hand value
let calCardValue = function (handArray) {
  let totalValue = 0;
  let aceCounter = 0;

  for (let i = 0; i < handArray.length; i += 1) {
    let currentCard = handArray[i];
    if (
      currentCard.name == `Jack` ||
      currentCard.name == `Queen` ||
      currentCard.name == `King`
    ) {
      totalValue = totalValue + 10;
    } else if (currentCard.name == `Ace`) {
      totalValue = totalValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalValue = totalValue + currentCard.value;
    }
  }

  for (let i = 0; i < aceCounter; i += 1) {
    if (totalValue > 21) {
      totalValue = totalValue - 10;
    }
  }

  return totalValue;
};

// game reset function
let gameReset = function () {
  let output = ``;
  gameState = GAME_STATE_STARTING_POINT;
  playerHand = [];
  dealerHand = [];
  playerValue = [];
  dealerValue = [];
  return output;
};

// player choice function
let playerChoice = function (playerInput) {
  let output = ``;
  if (playerInput == `hit`) {
    playerValue = [];
    // draw once card from shuffled deck
    let drawOneCard = shuffledDeck(makeDeck());
    let chosenNewCardOne = drawOneCard.pop();

    // add new card into player array
    playerHand.push(chosenNewCardOne);

    // calculate new card value
    let newTotalPlayerHandValue = calCardValue(playerHand);

    // add new card value into player array
    playerValue.push(newTotalPlayerHandValue);

    return (
      outputPlayersHandOneDealerHand(playerHand, dealerHand) +
      `<br /><br />Do you want to hit or stand?`
    );
  } else if (playerInput == `stand`) {
    let myImage =
      '<img src="https://media.tenor.com/2CJn8jmHOTQAAAAC/ursula-little-mermaid.gif"/>';
    gameState = GAME_STATE_RESULT;
    return `Hit submit to find out who wins! <br /><br/>` + myImage;
  } else {
    output =
      `Please enter either hit or stand <br /><br />` +
      outputPlayersHandOneDealerHand(playerHand, dealerHand);
  }
  return output;
};

// dealer's choice
let dealerChoice = function (playerInput) {
  let output = ``;

  if (dealerValue < 17) {
    dealerValue = [];

    let dealerDrawOneCard = shuffledDeck(makeDeck());
    let chosenNewCardOne = dealerDrawOneCard.pop();

    dealerHand.push(chosenNewCardOne);

    // calculate new card value
    let newTotalPlayerHandValue = calCardValue(dealerHand);

    dealerValue.push(newTotalPlayerHandValue);
  } else if (playerInput == `stand` && dealerValue > 17) {
    return output;
  }
  return output;
};

// set displays for player and dealer hand output
let outputBothPlayersHand = function (playerHand, dealerHand) {
  let playerMessage = `Your Hand:<br />`;
  for (let i = 0; i < playerHand.length; i += 1) {
    playerMessage = `${playerMessage}- ${playerHand[i].name} of ${playerHand[i].suit}<br />`;
  }

  let dealerMessage = `Dealer Hand:<br />`;
  for (let i = 0; i < dealerHand.length; i += 1) {
    dealerMessage = `${dealerMessage}- ${dealerHand[i].name} of ${dealerHand[i].suit}<br />`;
  }
  return `${playerMessage} <br />Your total hand value: ${playerValue}<br /><br /> ${dealerMessage} <br />Dealer total hand value: ${dealerValue}`;
};

// set displays for player hand output only
let outputPlayerHand = function (playerHand, dealerHand) {
  let playerMessage = `Your Hand:<br />`;
  for (let i = 0; i < playerHand.length; i += 1) {
    playerMessage = `${playerMessage}- ${playerHand[i].name} of ${playerHand[i].suit}<br />`;
  }
  return `${playerMessage} <br />Your total hand value: ${playerValue}`;
};

// set displays for player hand output and only one dealer hand output
let outputPlayersHandOneDealerHand = function (playerHand, dealerHand) {
  let playerMessage = `Your Hand:<br />`;
  for (let i = 0; i < playerHand.length; i += 1) {
    playerMessage = `${playerMessage}- ${playerHand[i].name} of ${playerHand[i].suit}<br />`;
  }

  let dealerMessage = `Dealer Hand:<br />`;
  for (let i = 0; i < 1; i += 1) {
    dealerMessage = `${dealerMessage}- ${dealerHand[i].name} of ${dealerHand[i].suit}<br />`;
  }
  return `${playerMessage} <br />Your total hand value: ${playerValue}<br /><br /> ${dealerMessage}- ❔❔❔<br /><br />Dealer total hand value: ❔❔❔`;
};

// find which player wins
let findwinner = function (playerValue, dealerValue) {
  if (playerValue > dealerValue && playerValue <= 21) {
    return (
      `You win! You have a higher hand than the dealer.<br /><br />` +
      outputBothPlayersHand(playerHand, dealerHand) +
      `<br /><br />Hit submit to restart.`
    );
  } else if (playerValue < dealerValue && dealerValue <= 21) {
    return (
      `You lose! Dealer hand is higher than yours.<br /><br />` +
      outputBothPlayersHand(playerHand, dealerHand) +
      `<br /><br />Hit submit to restart.`
    );
  } else {
    return (
      `It's a tie! You both got the same hand value.<br /><br />` +
      outputBothPlayersHand(playerHand, dealerHand) +
      `<br /><br />Hit submit to restart.`
    );
  }
};
