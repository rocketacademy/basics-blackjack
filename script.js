const main = function (input) {
  myOutputValue = playBlackJack(input) + myImage;
  return myOutputValue;
};

var myImage =
  '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUuGvyf_o1FSReTWGfz7z-H19NnLDadMKLU2FRPWO4MA2gJkRVpdaTYm8wg3KXO6LxuYw&usqp=CAU"/>';
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

const isBlackJack = function (arrayHand) {
  if (
    (arrayHand[0].value === 10 && arrayHand[1].name === `ace`) ||
    (arrayHand[1].value === 10 && arrayHand[0].name === `ace`) ||
    (arrayHand[0].name === `ace` && arrayHand[1].name === `ace`)
  ) {
    return true;
  } else {
    return false;
  }
};

let mode = 'start mode';
let numberPlayers = 1;
let playDeck = aNewDeck();
let gameRecord = {};
const playBlackJack = function (input) {
  if (mode === 'start mode') {
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
        cardsOfPlayers[(i - 1) * 2].value +
        cardsOfPlayers[(i - 1) * 2 + 1].value;

      players['player' + i] = {
        cardsPlayer: [
          cardsOfPlayers[(i - 1) * 2],
          cardsOfPlayers[(i - 1) * 2 + 1],
        ],
        sumPlayer: sumOfPlayer,
      };
    }

    console.log(players);
    mode = 'dealer mode';
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

    gameRecord = { players, dealer };
    console.log(`gameRecord is `, gameRecord);
    console.log(`Remaining Deck now has`, playDeck.length, `cards.`);
    mode = 'compare cards';

    if (mode === 'compare cards') {
      // Compare results
      for (let i = 1; i <= numberPlayers; i++) {
        // tie
        let playerIndex = 'player' + i;
        console.log(
          `1bj`,
          isBlackJack(gameRecord.players[playerIndex].cardsPlayer)
        );
        console.log(`2bj`, isBlackJack(gameRecord.dealer.cardsDealer));
        if (gameRecord.players[playerIndex].sumPlayer === dealer.sumDealer) {
          message = `Its a tie. <br><br>`;
        }
        // black jack cases
        else if (
          isBlackJack(gameRecord.players[playerIndex].cardsPlayer) === true
        ) {
          message = `Player wins blackjack <br><br>`;
        } else if (isBlackJack(gameRecord.dealer.cardsDealer) === true) {
          message = `Dealer wins blackjack <br><br>`;
        } else if (
          isBlackJack(gameRecord.players[playerIndex].cardsPlayer) === true &&
          isBlackJack(gameRecord.dealer.cardsDealer) === true
        ) {
          message = `Both player and dealer win by blackjack <br><br>`;
        }
        // normal win
        else if (gameRecord.players[playerIndex].sumPlayer > dealer.sumDealer) {
          message = `Player wins <br><br>`;
        } else {
          message = `Dealer wins <br><br>`;
        }
      }
      mode = 'hit or stand';
      return (
        message +
        declare(gameRecord) +
        ` <br><br>Player, pls decide hit or stand.`
      );
    }
  }
  // console.log(`mode before decide hit or stand is `, mode);
  else if (mode === 'hit or stand') {
    console.log(`enter into hit or stand`);
    for (let i = 1; i <= numberPlayers; i++) {
      let playerIndex = 'player' + i;
      if (input === 'hit') {
        console.log(`wereadfdfzdfasdfgdrsts`);
        let addPlayerCard = playDeck.pop();
        gameRecord.players[playerIndex].cardsPlayer.push(addPlayerCard);
        console.log(
          `cards of player${i}`,
          gameRecord.players[playerIndex].cardsPlayers
        );
        message =
          declare(gameRecord) +
          '<br> You drew another card. <br>Please input "hit" or "stand" to continue.';
        return message;
      } else if (input === 'stand') {
        while (gameRecord.dealer.sumDealer < 17) {
          let addDealerCard = playDeck.pop();
          gameRecord.dealer.cardsDealer.push(addDealerCard);
        }
        mode = 'compare cards';
      }
    }
    console.log(`playDeck now has `, playDeck.length, `cards.`);
  }
  // mode = "start mode";
};

// declare results
let innerMessagePlayers = '';
let innerMessageDealer = '';
let messagePlayers = '';
let messageDealer = '';
const declare = function (gameRecord) {
  for (let i = 1; i <= numberPlayers; i++) {
    let playerIndex = 'player' + i;
    for (
      let e = 0;
      e < gameRecord.players[playerIndex].cardsPlayer.length;
      e++
    ) {
      console.log(`i `, i);
      console.log(`player e `, e);
      innerMessagePlayers += `<br> ${gameRecord.players[playerIndex].cardsPlayer[e].name} of ${gameRecord.players[playerIndex].cardsPlayer[e].suit}, `;
    }
    messagePlayers = `Player ${i} hand: ` + innerMessagePlayers;
  }

  for (let e = 0; e < gameRecord.dealer.cardsDealer.length; e++) {
    console.log(`dealer e `, e);
    innerMessageDealer += `<br> ${gameRecord.dealer.cardsDealer[e].name} of ${gameRecord.dealer.cardsDealer[e].suit},`;
    messageDealer = `<br><br> Dealer hand: ` + innerMessageDealer;
  }
  return messagePlayers + messageDealer;
};
