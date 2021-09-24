//deck
var deck;
var randomDeck;
//store user cards
var playerHand = [];
var playerNumber = 0;
var message = "Player Cards:<br>";
var hit = 2;
var playerWin = 0;
//store computer cards
var botHand = [];
var botNumber = 0;
var botWin = 0;
//game modes to distribute, hit or stand, evaluate, reshuffle
var mode1 = "Distribution";
var mode2 = "Evaluate";
var mode3 = "Hit or stand";
var mode4 = "Decide winner";
var mode5 = "Return cards and reshuffle";
var currentMode = mode1;

var main = function (input) {
  //create & shuffle deck
  deck = makeDeck();
  randomDeck = shuffleCards(deck);

  //give out 2 cards to player and 2 cards to computer, alternate (player first) & display player hand
  if (currentMode == mode1) {
    console.log(`mode 1`);
    currentMode = mode2;
    var startHand = startCardDistribute(randomDeck);
    console.log(
      `playerHand: ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}`
    );
    console.log(
      `botHand: ${botHand[0].name} of ${botHand[0].suit} and ${botHand[1].name} of ${botHand[1].suit}`
    );
    console.log(`player number: ${playerNumber}`);
    console.log(`bot number: ${botNumber}`);
    return startHand;
  }

  //analyse (less than 17 need to hit, if not can choose)
  if (currentMode == mode2) {
    console.log(`mode 2`);
    currentMode = mode3;
    playerDecision = playerCardAnalysis(playerNumber);
    console.log(`playerNumber: ${playerNumber}`);
    return playerDecision;
  }

  //hit or stand (if hit go to mode 2 to ask again, if stand, run autobot)
  if (currentMode == mode3) {
    console.log(`mode 3`);
    if (
      input == `hit` &&
      (playerDecision != `Bust!` || playerDecision != `Blackjack!`)
    ) {
      console.log(`hit mode`);
      currentMode = mode2;
      var newCard = dealOneCard(randomDeck, hit);
      console.log(`playerNumber: ${playerNumber}`);
      hit += 1;
      console.log(`hit: ${hit}`);
      return newCard;
    } else if (
      input == `stand` &&
      (playerDecision != `Bust!` || playerDecision != `Blackjack!`)
    ) {
      console.log(`stand mode`);
      currentMode = mode4;
      botAutoDealer(randomDeck, hit);
      console.log(`bot number: ${botNumber}`);
      playerCardAnalysis(botNumber);
      return `Now time to reveal the winner`;
    } else if (playerDecision == `Blackjack!`) {
      playerWin += 1;
      currentMode = mode5;
      playerCardAnalysis(playerNumber);
    } else if (playerDecision == `Bust!`) {
      botWin += 1;
      currentMode = mode5;
      playerCardAnalysis(playerNumber);
    }
  }

  //win lose draw
  if (currentMode == mode4) {
    console.log(`mode 4`);
    currentMode = mode5;
    if (playerNumber == 21) {
      playerWin += 1;
      return `You win. Your number: ${playerNumber}<br>Dealer number: ${botNumber}`;
    } else if (playerNumber > botNumber && playerNumber < 21) {
      playerWin += 1;
      return `You win. Your number: ${playerNumber}<br>Dealer number: ${botNumber}`;
    } else if (botNumber > 21 && playerNumber < 21) {
      playerWin += 1;
      return `You win. Your number: ${playerNumber}<br>Dealer number: ${botNumber}`;
    } else if (botNumber > playerNumber && botNumber <= 21) {
      botWin += 1;
      return `You lose. Your number: ${playerNumber}<br>Dealer number: ${botNumber}`;
    } else if (
      botNumber == playerNumber ||
      (playerNumber > 21 && botNumber > 21)
    ) {
      return `Draw. Your number: ${playerNumber}<br>Dealer number: ${botNumber} `;
    }
  }

  //new deck and shuffle
  if (currentMode == mode5) {
    console.log(`mode 5`);
    currentMode = mode1;
    deck = makeDeck();
    randomDeck = shuffleCards(deck);
    hit = 2;
    message = "Player Cards:<br>";
    playerHand = [];
    console.log(`player hand: ${playerHand.length}`);
    playerNumber = 0;
    console.log(`playern number: ${playerNumber}`);
    botHand = [];
    console.log(`player hand: ${botHand.length}`);
    botNumber = 0;
    console.log(`playern number: ${botNumber}`);
    console.log(`new deck: ${randomDeck.length}`);
    return `Player score: ${playerWin}<br>Dealer score: ${botWin}<br>New deck created. Press submit to play again.`;
  }
};

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
      var gameValue = rankCounter;
      if (rankCounter > 10) {
        gameValue = 10;
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: gameValue,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // var counter = 0;
  // while (counter < 52) {
  //   if (cardDeck[counter].name == "jack" || "queen" || "king") {
  //     cardDeck[counter].rank = 10;
  //     counter += 1;
  //   }
  // }

  // Return the completed card deck
  return cardDeck;
};

var startCardDistribute = function (randomDeck) {
  var turn = 0;
  while (turn < 2) {
    playerHand.push(randomDeck.pop());
    playerNumber += playerHand[turn].rank;
    botHand.push(randomDeck.pop());
    botNumber += botHand[turn].rank;
    message += `${playerHand[turn].name} of ${playerHand[turn].suit} <br>`;
    turn += 1;
  }
  return message;
};

var dealOneCard = function (randomDeck, hit) {
  playerHand.push(randomDeck.pop());
  playerNumber += playerHand[hit].rank;
  message += `${playerHand[hit].name} of ${playerHand[hit].suit} <br>`;
  return message;
};

var playerCardAnalysis = function (playerNumber) {
  if (playerNumber > 21) {
    return `Bust!`;
  } else if (playerNumber == 21) {
    playerWin += 1;
    return `Blackjack!`;
  } else return `Hit or stand. Your number is ${playerNumber}`;
};

var botAutoDealer = function (randomDeck) {
  var counter = 2;
  while (botNumber < 17) {
    botHand.push(randomDeck.pop());
    botNumber += botHand[counter].rank;
    counter += 1;
  }

  return botNumber;
};

var aceDecider = function (number, hand) {
  number = 0;
  counter = 0;
  while (counter < hand.length) {
    if (number < 21 && hand[counter].rank == 11) {
      hand[counter].rank = 1;
    }
    counter += 1;
  }
  counterTwo = 0;
  while (counterTwo < hand.length) {
    number += hand[counterTwo].rank;
    counterTwo += 1;
  }
  return number;
};
