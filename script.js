// make function to generate a card deck
const makeDecks = () => {
  const deck = [];

  let suitIndex = 0;
  const suits = ["spades", "hearts", "clubs", "diamonds"];

  // loop 1 , 4 suits, give every suit an emoji
  while (suitIndex < suits.length) {
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

    // loop 2, rank 1-13
    let rankCounter = 1;
    // assign card's value and different name for card 1, 11, 12, 13
    let cardValue = rankCounter;
    while (rankCounter <= 13) {
      let cardName = "";
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
        emojiSuit: emojiSuit,
        value: cardValue,
      };
      // push the card to card deck
      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  // return a card deck
  return deck;
};

// generate a new card Deck
const deck = makeDecks();

// a funtion to generates a random card object from the deck.
const dealARandomCard = () => {
  let randomCard = deck[Math.floor(Math.random() * deck.length)];
  return randomCard;
};

// generate 2 card object in a row for the first drawn with params playerCards
const firstCardsDeal = (playerCards) => {
  playerCards.push(dealARandomCard());
  playerCards.push(dealARandomCard());
  return playerCards;
};

// a funtion to generates a new card
const addingNewCard = (playerCards) => {
  // generate a new card
  let newCard = dealARandomCard();
  // push the new card to userCards array
  playerCards.push(newCard);
  return newCard;
};

// a function to calculate in hand score with params playerCards
const calculateScore = (playerCards) => {
  let totalScore = 0;
  for (let i = 0; i < playerCards.length; i++) {
    let cardValue = Number(playerCards[i].value);
    totalScore = totalScore + cardValue;
    // check for an 11 (ace). If the score is already over 21, remove the 11 and replace it with a 1.
    if (cardValue == 11 && totalScore > 21) {
      cardValue = 1;
    }
  }
  // check for a blackjack (a hand with only 2 cards: ace + 10) and return 0 instead of the actual score. 0 will represent a blackjack in our game.
  if (totalScore == 21 && playerCards.length == 2) {
    return 0;
  }
  return totalScore;
};

// define a function to compare the score with params userTotalScore and compTotalScore
const compareTheScore = (userTotalScore, compTotalScore) => {
  // If you and the computer are both over, you lose.
  if (userTotalScore > 21 && compTotalScore > 21) {
    return `You went over. You lose 😤`;
  }

  if (userTotalScore == compTotalScore) {
    return `Draw 🙃`;
  } else if (compTotalScore == 0) {
    return `Lose, opponent has Blackjack 😱`;
  } else if (userTotalScore == 0) {
    return `Win with a Blackjack 😎`;
  } else if (userTotalScore > 21) {
    return `You went over. You lose 😭`;
  } else if (compTotalScore > 21) {
    return `Opponent went over. You win 😁`;
  } else if (userTotalScore > compTotalScore) {
    return `You win 😃`;
  } else {
    return `You lose 😤`;
  }
};

// assign game modes for the game
const startTheGameMode = "START_THE_GAME_MODE";
const addCardMode = "ADD_CARD_MODE";
const dealerAddCardMode = "DEALER_ADD_CARD_MODE";
const gameOver = "GAME_OVER ";

// assign the gameMode to start the game
let gameMode = startTheGameMode;

// assign arrays for user and comp cards
let userCards = [];
let compCards = [];

// assign a var for the total amount of cards in hand
let userTotalScore;
let compTotalScore;

// Game Mode 1. Start the game
const main = (input) => {
  var myOutputValue = "Click Submit to deal cards.";

  if (gameMode == startTheGameMode) {
    // generates the first 2 cards
    userCards = firstCardsDeal(userCards);
    compCards = firstCardsDeal(compCards);

    // calculate the score
    userTotalScore = calculateScore(userCards);
    compTotalScore = calculateScore(compCards);

    // comapring the score from the 1st 2 cards
    compareTheScore(userTotalScore, compTotalScore);

    const userCardsMessage = `User cards are: ${userCards[0].name} ${userCards[0].emojiSuit} and ${userCards[1].name} ${userCards[1].emojiSuit}`;
    const compCardsMessage = `Computer cards are: ${compCards[0].name} ${compCards[0].emojiSuit} and ${compCards[1].name} ${compCards[1].emojiSuit}`;

    // check if there's blackjack
    if (compTotalScore == 0) {
      gameMode = gameOver;
      return `${userCardsMessage}<br>${compCardsMessage}<br>
            Lose, opponent has Blackjack 😱`;
    } else if (userTotalScore == 0) {
      gameMode = gameOver;
      return `${userCardsMessage}<br>${compCardsMessage}<br>
            Win with a Blackjack 😎`;
    } else {
      // if there's no blackjack, continue to play, ask the user whether to hit or stand
      gameMode = addCardMode;
      console.log(gameMode);
    }
    return `${userCardsMessage}, total score : ${userTotalScore} <br>
          ${compCardsMessage}, total score : ${compTotalScore} <br>
          Type 'y' to get another card, type 'n' to pass: `;
  }
  // Game Mode 2. Ask the user whether to hit or stand, play in "addCardMode"
  else if (gameMode == addCardMode) {
    if (input == "y") {
      console.log("i'm running add card mode");
      // generate a new user's card
      let newCard = addingNewCard(userCards);
      userTotalScore += newCard.value;
      let newUserCardMessage = `Your new card is : ${newCard.name} ${newCard.emojiSuit}, total score : ${userTotalScore}.<br> Computer's total score is : ${compTotalScore} <br>`;
      // check if the score is bigger or equal to 21
      if (userTotalScore <= 21) {
        // addingNewCard(userCards, userTotalScore);
        return `${newUserCardMessage} <br>
                Type 'y' to get another card, type 'n' to pass:`;
      } // if new total score is bigger than 21, the player busts, the game is over, user lose, return the message
      else if (userTotalScore > 21) {
        gameMode = gameOver;
        console.log(gameMode);
        return `${newUserCardMessage} <br>
                ${compareTheScore(userTotalScore, compTotalScore)}`;
      }
    } // if the user input is "n". Game Mode 3. Add Dealer Hit or Stand
    else if (input == "n") {
      console.log("i'm in dealerAddCardMode");
      while (compTotalScore < 17) {
        // generate a new comp's card if comp's card's score is less than 17
        let newCard = addingNewCard(compCards);
        compTotalScore += newCard.value;
      } // if comp total score is bigger than 21, the game is over, comp busts, return the message
      gameMode = gameOver;
      console.log("i'm in game over mode");
      let resultMessage = compareTheScore(userTotalScore, compTotalScore);
      let endGameMessage = `Computer's total score is : ${compTotalScore}, user's total score is: ${userTotalScore}`;
      return `${endGameMessage}  <br> ${resultMessage} <br> Click Submit to start a new game.`;
    }
  }
  // reset the game
  userCards = [];
  compCards = [];
  userTotalScore = 0;
  compTotalScore = 0;
  gameMode = startTheGameMode;
  return myOutputValue;
};
