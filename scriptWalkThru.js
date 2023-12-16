// Version 1
// 1. define player vs messageDealer
// 2. create and shuffle a deck
// 3. Player takes 2 cards & dealer takes 2 cards
// 4. win conditions (a)black jack (b) normal higher
// 5. output cards of hands n declare winder

// Version 2
// 1. extra game mode "hit or stand"
// 2. let user input "hit" or "stand"

// Version 3
// 1. Dealer can only hit or stand ONLY AFTER player has chosen to stand
// 2. Dealer must hit if his handSum < 17
// 3. Dealer must stand if his handSum > 17

// Version 4
// 1. if totalHandValue, with an ace , < 21, then ace value = 11
// 2. if totalHandValue, with an ace > 21, then ace value = 1

let playerHand = [];
let dealerHand = [];
let mode = 'start';
let gameDeck = 'something to hold deck of card';

const makeDeck = function () {
  // Initialise an empty deck array
  let cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  let suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  let suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a letiable
    let currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    let rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      let cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === 1) {
        cardName = 'ace';
      } else if (cardName === 11) {
        cardName = 'jack';
      } else if (cardName === 12) {
        cardName = 'queen';
      } else if (cardName === 13) {
        cardName = 'king';
      }

      // assign value

      let cardValue = rankCounter;
      if (cardName === 'ace') {
        cardValue = 1;
      } else if (
        cardName === 'jack' ||
        cardName === 'queen' ||
        cardName === 'king'
      ) {
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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

const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
const shuffleCards = function (cardDeck) {
  // Loop over the card deck array once for every card so every card position got shuffled once
  for (let cardIndex = 0; cardIndex < cardDeck.length; cardIndex += 1) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    let randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = cardDeck[cardIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[cardIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cardDeck;
};

const aNewDeck = function () {
  let newDeck = makeDeck();
  let shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

var main = function (input) {
  let outputMessage = '';
  // FIRST CLICK
  //create deck
  if (mode === 'start') {
    gameDeck = aNewDeck();
    console.log(gameDeck);

    // each participant gets 2 cards
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log(`player hands are `, playerHand);
    console.log(`dealer hadns are `, dealerHand);
    // go into game mode
    mode = 'drawn cards';
    // output message
    outputMessage = 'Everyone has his cards. Click Submit to compare';
    return outputMessage;
  }

  // SECOND CLICK
  if (mode === 'drawn cards') {
    // test for isBlackJack function
    // playerHand = [
    //   { name: 'king', suit: 'spades', rank: 13, value: 10 },
    //   { name: 'ace', suit: 'hearts', rank: 1, value: 1 },
    // ];
    // dealerHand = [
    //   { name: 'king', suit: 'diamonds', rank: 13, value: 10 },
    //   { name: 'ace', suit: 'diamonds', rank: 1, value: 1 },
    // ];
    // check for blackjack
    let playerBlackJack = isBlackJack(playerHand);
    let dealerBlackJack = isBlackJack(dealerHand);

    // console.log('Player has a blackJack ?', playerBlackJack);
    // console.log('Dealer has a blackJack ?', dealerBlackJack);
    // playerBlackJack = true;
    // dealerBlackJack = true;
    if (playerBlackJack === true || dealerBlackJack === true) {
      // both blackjack : tie
      if (playerBlackJack === true && dealerBlackJack === true) {
        outputMessage =
          displayHands(playerHand, dealerHand) + 'It is a blackJack tie';
      }
      // only player has blackjack : player wins
      else if (playerBlackJack === true && dealerBlackJack === false) {
        outputMessage =
          displayHands(playerHand, dealerHand) + 'Player wins blackJack';
      }
      // only dealer has blackjack : dealer wins
      else {
        outputMessage =
          displayHands(playerHand, dealerHand) + 'Dealer wins blackJack';
      }
      console.log(outputMessage);
    } else {
      outputMessage =
        displayHands(playerHand, dealerHand) + 'There is no blackJack';
      console.log(outputMessage);
      // no black jacks

      // change game mode
      mode = 'hit or stand';
      // output message
      return outputMessage;
    }
  }
  // HIT OR STAND VERSION 2
  if ((mode = 'hit or stand')) {
    // player hit
    if (input === 'hit') {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayHands(playerHand, dealerHand) +
        `<br> You drew another card. <br> Please input "hit" or "stand".`;
    }
    // player stand
    else if (input === 'stand') {
      // calculate who has the higher value in hands
      let playerHandSum = calculateHand(playerHand);
      let dealerHandSum = calculateHand(dealerHand);

      while (dealerHandSum < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandSum = calculateHand(dealerHand);
      }

      // playerHandSum = 13;
      // dealerHandSum = 12;

      console.log(`Player value in hand is `, playerHandSum);
      console.log(`Dealer value in hand is `, dealerHandSum);
      // same value : tie
      if (playerHandSum == dealerHandSum) {
        outputMessage =
          displayHands(playerHand, dealerHand) +
          `<br>Its a tie!<br>` +
          displayHandsTotalValues(playerHandSum, dealerHandSum);
      }
      // player higher value : player wins
      else if (playerHandSum > dealerHandSum) {
        outputMessage =
          displayHands(playerHand, dealerHand) +
          `<br>Player wins<br>` +
          displayHandsTotalValues(playerHandSum, dealerHandSum);
      }
      // dealer higher value : dealer wins
      else {
        outputMessage =
          displayHands(playerHand, dealerHand) +
          `<br>Dealer wins!<br>` +
          displayHandsTotalValues(playerHandSum, dealerHandSum);
      }
    }
    // Input validation
    else {
      outputMessage =
        `wrong input. Only "hit" or "stand are valid. <br><br>` +
        displayHands(playerHand, dealerHand);
    }
    return outputMessage;
  }
};

const isBlackJack = function (handArray) {
  // check participant dealerHand
  let card1 = handArray[0];
  let card2 = handArray[1];
  let isBlackJack = false;

  // if there is blackJack, return true
  // possible cases
  // 1st card is ace, 2nd card is a 10 or picture cards
  // 2nd card is ace, 1st card is a 10 or picture cards
  if (
    (card1.name === 'ace' && card2.rank >= 10) ||
    (card1.rank >= 10 && card2.name === 'ace')
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
};

const calculateHand = function (handArray) {
  let handSum = 0;
  let aceCounter = 0;
  // go through the cards in player/dealer hand and find hand values
  for (let i = 0; i < handArray.length; i++) {
    let currentCard = handArray[i];
    // picture card case
    if (
      currentCard.name === 'jack' ||
      currentCard.name === 'queen' ||
      currentCard.name === 'king'
    ) {
      handSum += 10;
    } else if (currentCard.name === 'ace') {
      handSum = handSum + 11;
      aceCounter = aceCounter + 1;
    } else {
      handSum = handSum + currentCard.rank;
    }
  }
  for (let i = 0; i < aceCounter; i++) {
    if (handSum > 21) {
      handSum = handSum - 10;
    }
  }
  return handSum;
};

// display card
const displayHands = function (playerHandArray, dealerHandArray) {
  // player hand
  let playerMessage = `Player Hand: <br>`;
  for (let i = 0; i < playerHandArray.length; i++) {
    playerMessage =
      playerMessage +
      `-` +
      playerHandArray[i].name +
      ` of ` +
      playerHandArray[i].suit +
      `<br>`;
  }

  // dealer hand
  let dealerMessage = `Dealer Hand: <br>`;
  for (let i = 0; i < dealerHandArray.length; i++) {
    dealerMessage =
      dealerMessage +
      `-` +
      dealerHandArray[i].name +
      ` of ` +
      dealerHandArray[i].suit +
      `<br>`;
  }
  return playerMessage + `<br>` + dealerMessage;
};

// display total value in hands
let displayHandsTotalValues = function (playerHandValue, dealerHandValue) {
  let totalHandValueMsg =
    `<br>Player total hand value: ` +
    playerHandValue +
    `<br>Dealer total hand value: ` +
    dealerHandValue;
  return totalHandValueMsg;
};
