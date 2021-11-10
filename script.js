const main = function () {
  myOutputValue = playBlackJack();
  return myOutputValue;
};

const makeDeck = function () {
  // Initialise an empty deck array
  let cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  let suits = ["hearts", "diamonds", "clubs", "spades"];

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
        cardName = "ace";
      } else if (cardName === 11) {
        cardName = "jack";
      } else if (cardName === 12) {
        cardName = "queen";
      } else if (cardName === 13) {
        cardName = "king";
      }

      // assign value

      let cardValue = rankCounter;
      if (cardName === "ace") {
        cardValue = 1;
      } else if (
        cardName === "jack" ||
        cardName === "queen" ||
        cardName === "king"
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

const isBlackJack = function (arrayHand) {
  if (
    (arrayHand[0].cardValue === 10 && arrayHand[1].Name === `ace`) ||
    (arrayHand[1].cardValue === 10 && arrayHand[0].Name === `ace`) ||
    (arrayHand[0].Name === `ace` && arrayHand[1].Name === `ace`)
  ) {
    return true;
  } else {
    return false;
  }
};

let mode = "start mode";
let numberPlayers = 1;
const playBlackJack = function (aDeck) {
  mode = "start mode";
  let playDeck = aNewDeck();
  let cardsOfPlayers = [];
  let sumOfPlayer = 0;
  let players = {};
  for (let i = 1; i <= numberPlayers; i++) {
    // player draws 2 cards
    let playerCard1 = playDeck.pop();
    cardsOfPlayers.push(playerCard1);
    let playerCard2 = playDeck.pop();
    cardsOfPlayers.push(playerCard2);
    // sum of player hands
    sumOfPlayer =
      cardsOfPlayers[(i - 1) * 2].value + cardsOfPlayers[(i - 1) * 2 + 1].value;

    players["player" + i] = {
      cardsPlayer: [
        cardsOfPlayers[(i - 1) * 2],
        cardsOfPlayers[(i - 1) * 2 + 1],
      ],
      sumPlayer: sumOfPlayer,
    };
  }

  console.log(players);
  mode = "dealer mode";
  // dealer draws 2 cards
  let cardsOfDealer = [];
  let dealerCard1 = playDeck.pop();
  cardsOfDealer.push(dealerCard1);
  let dealerCard2 = playDeck.pop();
  cardsOfDealer.push(dealerCard2);
  // sum of dealer hands
  sumOfDealer = cardsOfDealer[0].value + cardsOfDealer[1].value;

  let dealer = {
    cardsDealer: cardsOfDealer,
    sumDealer: sumOfDealer,
  };

  // nested object of players and dealer cards and their sum in hand
  //  gameRecord = {}
  let gameRecord = { players, dealer };
  console.log(`gameRecord is `, gameRecord);
  console.log(`Remaining Deck now has`, playDeck.length, `cards.`);

  // Compare results

  for (let i = 1; i <= numberPlayers; i++) {
    // tie
    let playerIndex = "player" + i;
    if (gameRecord.players[playerIndex].sumPlayer === dealer.sumDealer) {
      message = `Its a tie. <br><br>`;
    }
    // black jack cases
    else if (isBlackJack(gameRecord.players[playerIndex].cardsPlayer)) {
      message = `Player wins blackjack <br><br>`;
    } else if (isBlackJack(gameRecord.dealer.cardsDealer)) {
      message = `Dealer wins blackjack <br><br>`;
    } // normal win
    else if (gameRecord.players[playerIndex].sumPlayer > dealer.sumDealer) {
      message = `Player wins <br><br>`;
    } else {
      message = `Dealer wins <br><br>`;
    }
  }
  return message + declare(gameRecord);
};

// declare results
const declare = function (gameRecord) {
  for (let i = 1; i <= numberPlayers; i++) {
    let playerIndex = "player" + i;
    let messagePlayers = `Player ${i} hand: <br> ${gameRecord.players[playerIndex].cardsPlayer[0].name} of ${gameRecord.players[playerIndex].cardsPlayer[0].suit}, <br> ${gameRecord.players[playerIndex].cardsPlayer[1].name} of ${gameRecord.players[playerIndex].cardsPlayer[1].suit}, <br><br>`;
    messageAllPlayers = messagePlayers;
  }
  let messageDealer = `Dealer hand: <br> ${gameRecord.dealer.cardsDealer[0].name} of ${gameRecord.dealer.cardsDealer[0].suit}, <br> ${gameRecord.dealer.cardsDealer[1].name} of ${gameRecord.dealer.cardsDealer[1].suit},`;

  return messageAllPlayers + messageDealer;
};
