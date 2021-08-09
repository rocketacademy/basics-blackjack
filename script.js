let cardDeck = [];
let gameMode = "start game";
let playersProfile = new Array();
let dealersProfile = new Array();
let allProfiles = new Array();
let currentPlayer = 0;

const resetGame = () => {
  cardDeck = [];
  gameMode = "start game";
  playersProfile = new Array();
  dealersProfile = new Array();
  allProfiles = new Array();
  currentPlayer = 0;
};

const main = (input) => {
  if (gameMode === "start game") {
    startGame();
    createPlayersProfile(input);
    createDealerProfile();
    dealHands();
    getPoints(playersProfile);
    getPoints(dealersProfile);
    allProfiles = playersProfile.concat(dealersProfile);
    instantWinner(allProfiles);
    return `${instantWinner(
      allProfiles
    )} \<br\><br\>\You have ${input} players. The profiles are: \<br\>\ ${displayProfile(
      allProfiles
    )}\<br\>\
    `;
  }

  if (gameMode === "the game") {
    if (currentPlayer < playersProfile.length) {
      if (input === "hit") {
        hitPlayer();
        let bustcheck = checkBust();
        let instantend = instantWinner(allProfiles);
        currentPlayer += 1;
        return `Player ${currentPlayer} chose hit.\<br\>\ ${bustcheck} \<br\>\ ${instantend} \<br\>\ ${displayProfile(
          allProfiles
        )}`;
      }
      if (input === "stand") {
        currentPlayer += 1;
        return `Player ${currentPlayer} chose stand. \<br\>\ ${displayProfile(
          allProfiles
        )}`;
      }
    } else hitDealer();
    allProfiles = playersProfile.concat(dealersProfile);
    removeLoser(allProfiles);
    return winnerFound(allProfiles);
  }

  if (gameMode === "final") {
    resetGame();
    return `Please enter number of players`;
  }
};

const startGame = () => {
  //generate 3 decks of cards
  makeDeck();
  makeDeck();
  makeDeck();
  //shuffle the 3 decks
  shuffleCards(cardDeck);

  return cardDeck;
};

const createPlayersProfile = (num) => {
  for (let i = 1; i <= num; i++) {
    let playerHand = new Array();
    let players = { Name: "Player " + i, ID: i, Points: 0, Hand: playerHand };
    playersProfile.push(players);
  }
};

const createDealerProfile = () => {
  let dealerHand = [cardDeck.pop(), cardDeck.pop()];
  let dealers = { Name: "Dealer", ID: "dealer", Points: 0, Hand: dealerHand };
  dealersProfile.push(dealers);
};

const hitDealer = () => {
  while (dealersProfile[0].Points <= 17) {
    let drawnCardDealer = cardDeck.pop();
    dealersProfile[0].Hand.push(drawnCardDealer);
    getPoints(dealersProfile);
  }
};

const dealHands = () => {
  // deal 2 cards per player
  for (let i = 0; i < 2; i++) {
    for (let x = 0; x < playersProfile.length; x++) {
      let card = cardDeck.pop();
      playersProfile[x].Hand.push(card);
    }
  }
};

// total value for each player
const getPoints = (anArray) => {
  let points = 0;
  for (let i = 0; i < anArray.length; i++) {
    points += totalValue(anArray[i].Hand);
    anArray[i].Points = points;
    points = 0;
  }
};

//Varying sum depending on which ace value is considered (1 or 11)
const totalValue = (anArray) => {
  //Naively sum up the cards in the deck. By default, we count each Ace as 11
  let tempValue = sumValue(anArray);
  //Count the number of aces in the hand
  let numOfAces = getAceOccurence(anArray, "ace");
  //Aces can count for 1, or 11. If it is possible to bring the value of the hand under 21 by making 11 -> 1 substitutions.
  while (numOfAces > 0) {
    if (tempValue > 21) {
      tempValue -= 10;
      numOfAces -= 1;
    }
    return tempValue;
  }
  return tempValue;
};

//Count the number of cardName in the hand.
const getAceOccurence = (anArray, ace) => {
  return anArray.filter((v) => v.name === ace).length;
};

//sum the initial cards value
const sumValue = (anArray) => {
  return anArray
    .map((item) => item.value)
    .reduce((acc, curVal) => acc + curVal);
};

//winning conditions for 'BLACKJACK'
const instantWinner = (anArray) => {
  let instantwinner = 0;
  for (let i = 0; i < anArray.length; i++) {
    if (anArray[i].Points === 21) {
      instantwinner = anArray[i].ID;
    }
  }
  if (instantwinner === 0) {
    gameMode = "the game";
    return `Nobody has BLACKJACK. `;
  }
  if (instantwinner !== 0) {
    gameMode = "final";
    return `BLACKJACK STATUS. Player: ${instantwinner} WON. Please restart the game by clicking submit`;
  }
};

//removing losers from array
const removeLoser = (anArray) => {
  for (var i = 0; i < anArray.length; i++) {
    if (anArray[i].Points > 21) {
      anArray.splice(i, 1);
    }
  }
};

//winning conditions
const winnerFound = (anArray) => {
  let maxPoints = 0;
  let winner = 0;
  for (let i = 0; i < anArray.length; i++) {
    if (anArray[i].Points > maxPoints) {
      maxPoints = anArray[i].Points;
      winner = anArray[i].ID;
    }
  }
  gameMode = "final";
  return `Player: ${winner} WON. Points: ${maxPoints} \<br\>\ ${displayProfile(
    allProfiles
  )}`;
};

//check if anybody is busted, then end the game
const checkBust = () => {
  if (playersProfile[currentPlayer].Points > 21) {
    return `Player: ${playersProfile[currentPlayer].ID} is BUSTED.`;
  }
  return "";
};

//if current player choose hit
const hitPlayer = () => {
  let drawnCardPlayer = cardDeck.pop();
  playersProfile[currentPlayer].Hand.push(drawnCardPlayer);
  getPoints(playersProfile);
};

//prep display of players Profile
const displayProfile = (anArray) =>
  anArray.reduce(
    (acc, curVal) =>
      `${acc}\<br\>\ ${curVal.Name}
      Points: ${curVal.Points} Hand: ${displayHands(curVal.Hand)}\<br\>\ `,
    ""
  );

//prep display of playerHands
const displayHands = (anArray) => {
  return anArray.reduce(
    (acc, curVal) => `${acc}\<br\>\ card name: ${curVal.name}
    card suit: ${curVal.suit}`,
    ""
  );
};

//auto generate 52 cards deck
const makeDeck = () => {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["♥", "♦", "♣", "♠"];

  // Loop over the suits array
  let suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    let currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    let rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      let cardName = rankCounter;
      let cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name, set cardValue to 10 (for jack, queen, king) or 11 (for ace)
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
      }

      // Create a new card with the current name, suit, and rank
      const card = {
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max);
};

const shuffleCards = (anArray) => {
  // Loop over the card deck array once
  let currentIndex = 0;
  while (currentIndex < anArray.length) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(anArray.length);
    // Select the card that corresponds to randomIndex
    let randomCard = anArray[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = anArray[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    anArray[currentIndex] = randomCard;
    anArray[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return anArray;
};
