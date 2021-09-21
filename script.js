// assign game modes for the game
const startTheGameMode = "START_THE_GAME_MODE";
const addCardMode = "ADD_CARD_MODE";
const gameOver = "GAME_OVER ";

// assign the gameMode to start the game
let gameMode = startTheGameMode;

// assign arrays for user and comp cards
let userCards = [];
let compCards = [];
const suits = ["spades", "hearts", "clubs", "diamonds"];

// assign a var for the total amount of cards in hand
let userTotalScore;
let compTotalScore;

// assign variables for messages
let newUserCardMessage;
let userCardsMessage;
let compCardsMessage;
const restartGameMessage = `<br> Click Submit to start a new game.`;

// make function to generate a card deck
const makeDecks = () => {
  const deck = [];
  // loop 1 , 4 suits, give every suit an emoji
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    let emojiSuit = "";
    if (currentSuit == "spades") {
      emojiSuit = "♠️";
    } else if (currentSuit == "hearts") {
      emojiSuit = "♥️";
    } else if (currentSuit == "clubs") {
      emojiSuit = "♣️";
    } else if (currentSuit == "diamonds") {
      emojiSuit = "♦️";
    }
    // loop 2, rank 1-13, assign card's value and different name for card 1, 11, 12, 13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = "";
      let cardValue = rankCounter;
      if (rankCounter == 1) {
        cardName = "ace";
        cardValue = 11;
      } else if (rankCounter == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (rankCounter == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (rankCounter == 13) {
        cardName = "king";
        cardValue = 10;
      } else {
        cardName = String(rankCounter);
        cardValue = rankCounter;
      }
      // assign a card object
      const card = {
        rank: rankCounter,
        suit: currentSuit,
        name: cardName,
        emojiSuit,
        value: cardValue,
      };
      // push the card to card deck
      deck.push(card);
    }
  }
  // return a card deck
  return deck;
};

// generate a new card Deck
const deck = makeDecks();

// a funtion to generates a random card object from the deck.
const dealARandomCard = () => {
  const randomCard = deck[Math.floor(Math.random() * deck.length)];
  return randomCard;
};

// generate 2 card object in a row for the first drawn with params playerCards
const firstCardsDeal = (playerCards) => {
  playerCards.push(dealARandomCard());
  playerCards.push(dealARandomCard());
  // playerCards.push({
  //   rank: 1,
  //   suit: "hearts",
  //   name: "ace",
  //   emojiSuit: "⭐️",
  //   value: 11,
  // });
  return playerCards;
};

// a funtion to generates a new card
const addingNewCard = (playerCards) => {
  // generate a new card
  const newCard = dealARandomCard();
  // push the new card to userCards array
  playerCards.push(newCard);
  return newCard;
};

// a function to calculate in hand score with params playerCards
const calculateScore = (playerCards) => {
  let totalScore = 0;
  for (let i = 0; i < playerCards.length; i += 1) {
    const cardValue = Number(playerCards[i].value);
    totalScore = totalScore + cardValue;
  }
  // check for a blackjack (a hand with only 2 cards: ace + 10)
  // and return 0 instead of the actual score. 0 will represent a blackjack in our game.
  if (totalScore == 21 && playerCards.length == 2) {
    return 0;
  }
  return totalScore;
};

// define a function to compare the score with params userTotalScore and compTotalScore
const compareTheScore = (userScore, compScore) => {
  // If you and the computer are both over, you lose.
  if (userScore > 21 && compScore > 21) {
    return `You went over. You lose 😤 ${restartGameMessage}`;
  }
  if (userScore == compScore) {
    return `Draw 🙃 ${restartGameMessage}`;
  }
  if (compScore == 0) {
    return `Lose, opponent has Blackjack 😱 ${restartGameMessage} `;
  } else if (userScore == 0) {
    return `Win with a Blackjack 😎 ${restartGameMessage}`;
  }
  if (userScore > 21) {
    return `You went over. You lose 😭 ${restartGameMessage}`;
  } else if (compTotalScore > 21) {
    return `Opponent went over. You win 😁 ${restartGameMessage}`;
  } else if (userScore > compTotalScore) {
    return `You win 😃 ${restartGameMessage}`;
  }
  return `You lose 😤 ${restartGameMessage}`;
};

// function to reset the game
const resetTheGame = () => {
  userCards = [];
  compCards = [];
  userTotalScore = 0;
  compTotalScore = 0;
  gameMode = startTheGameMode;
};

// a function to generates the first 2 cards
const firstDealCards = () => {
  userCards = firstCardsDeal(userCards);
  compCards = firstCardsDeal(compCards);
  // calculate the score
  userTotalScore = calculateScore(userCards);
  compTotalScore = calculateScore(compCards);
  // comapring the score from the 1st 2 cards
  compareTheScore(userTotalScore, compTotalScore);

  userCardsMessage = `User cards are: ${userCards[0].name} ${userCards[0].emojiSuit} and ${userCards[1].name} ${userCards[1].emojiSuit}`;
  compCardsMessage = `Computer cards are: ${compCards[0].name} ${compCards[0].emojiSuit} and ${compCards[1].name} ${compCards[1].emojiSuit}`;
};

// a function to add dealer hit or stand
const dealerAddCard = () => {
  while (compTotalScore < 17) {
    // generate a new comp's card if comp's card's score is less than 17
    let newCard = addingNewCard(compCards);
    compTotalScore += newCard.value;
  } // if comp total score is bigger than 21, the game is over, comp busts, return the message
  gameMode = gameOver;
  // console.log("i'm in game over mode");
  let resultMessage = compareTheScore(userTotalScore, compTotalScore);
  let endGameMessage = `User's total score is: ${userTotalScore} <br> Computer's total score is : ${compTotalScore} `;
  return { resultMessage, endGameMessage };
};

const main = (input) => {
  var myOutputValue = "Click Submit to deal cards.";

  // Game Mode 1. Start the game
  if (gameMode == startTheGameMode) {
    // generates the first 2 cards
    firstDealCards();

    // check if there's blackjack
    if (compTotalScore == 0) {
      gameMode = gameOver;
      return `${userCardsMessage}<br>${compCardsMessage}<br>
            Lose, opponent has Blackjack 😱`;
    } else if (userTotalScore == 0) {
      gameMode = gameOver;
      return `${userCardsMessage}<br>${compCardsMessage}<br>
            Win with a Blackjack 😎`;
    }

    // check if the player wants to assign Ace as 1 or 11
    if (userCards[0].value == 11 || userCards[1].value == 11) {
      gameMode = addCardMode;
      return `${userCardsMessage}<br>${compCardsMessage}<br>
            Do you wish your Ace value is 1 or 11?`;
    }

    // if there's no blackjack, continue to play, ask the user whether to hit or stand
    gameMode = addCardMode;
    // console.log(gameMode);

    return `${userCardsMessage}, total score : ${userTotalScore} <br>
          ${compCardsMessage}, total score : ${compTotalScore} <br>
          Type 'y' to get another card, type 'n' to pass: `;
  }

  // Game Mode 2. Ask the user whether to hit or stand, play in "addCardMode"
  else if (gameMode == addCardMode) {
    // to check whether player wants their ace value to be 1 or 11
    if (input == "1") {
      // console.log("player wants to change the ace value");
      userTotalScore -= 10;
      return `${userCardsMessage}, total score : ${userTotalScore} <br>
          ${compCardsMessage}, total score : ${compTotalScore} <br>
          Type 'y' to get another card, type 'n' to pass: `;
    } else if (input == 11) {
      return `${userCardsMessage}, total score : ${userTotalScore} <br>
          ${compCardsMessage}, total score : ${compTotalScore} <br>
          Type 'y' to get another card, type 'n' to pass: `;
    }
    if (input == "y") {
      // console.log("i'm running add card mode");
      // generate a new card for user and add it to the userCards array with addingNewCard function
      let newCard = addingNewCard(userCards);
      // update user's new score
      userTotalScore += newCard.value;
      newUserCardMessage = `Your new card is : ${newCard.name} ${newCard.emojiSuit}, total score : ${userTotalScore}.<br> Computer's total score is : ${compTotalScore} <br>`;

      // check if the user score is less or equal to 21 to give option to add a new card
      if (userTotalScore <= 21) {
        return `${newUserCardMessage} <br>
                Type 'y' to get another card, type 'n' to pass:`;
      }
      // check if new user's total score is bigger than 21
      else if (userTotalScore > 21) {
        // if the user busts, the game is over, user lose, return the message
        gameMode = gameOver;
        // console.log(gameMode);
        return `${newUserCardMessage} <br>
                ${compareTheScore(userTotalScore, compTotalScore)}`;
      }
    } // if the user input is "n". Game Mode 3. Add Dealer Hit or Stand
    else if (input == "n") {
      // dealer add card mode
      const { endGameMessage, resultMessage } = dealerAddCard();
      return `${endGameMessage}  <br> ${resultMessage}`;
    }
  }

  // reset the game
  resetTheGame();
  return myOutputValue;
};
