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

1.1 create a deck
1.2 jacks, queen and kings to have a value of 10
1.3 ace to have a value of 1 or 11 

2.1 create a shuffled deck

3.1 output 2 cards from shuffled deck to user

4.1 create player's choice function
4.2 if player choose "hit" draw another card from shuffled deck
4.3 if current player score is less than 10, ace will be 11 else ace is 1
4.4 total value of player's score changes according to "hit" result
4.5 else player choose to "stand" and the current value is the final score

5.1 create a win/lose function
5.2 if player's score is more than 21, player lose
5.3 else player wins

// Create a game player is playing against computer

6.1 computer gets 2 cards from shuffled deck

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

// ==== MAIN FUNCTION ==== //
let main = function (input) {
  let output = drawCard();
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
  let chosenCardOne = drawCard.pop();
  let chosenCardTwo = drawCard.pop();
  playerHand.push(chosenCardOne, chosenCardTwo);
  let totalPlayerHandValue = calCardValue(playerHand);
  console.log(cardArray);
  cardArray = [];
  playerHand = [];
  console.log(cardArray);

  return `Player Hand:<br /><br />${chosenCardOne.name} of ${chosenCardOne.suit}<br />${chosenCardTwo.name} of ${chosenCardTwo.suit}<br /><br />Total value: ${totalPlayerHandValue}`;
};

// calculate hand value
let calCardValue = function (handArray) {
  let totalValue = 0;
  for (let i = 0; i < handArray.length; i += 1) {
    let currentCard = handArray[i];
    if (
      currentCard.name == `Jack` ||
      currentCard.name == `Queen` ||
      currentCard.name == `King`
    ) {
      totalValue = totalValue + 10;
    } else {
      totalValue = totalValue + currentCard.value;
    }
  }
  return totalValue;
};
