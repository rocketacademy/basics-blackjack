/* pseudo code first!!!
- have a deck of cards
- shuffle deck of cards
- player take two cards
- computer take two cards

- fakescore = scores of all cards when ace = 0
use counter and loop to check name to find out number of ace cards
- If there is one Ace, Total score = fake score + 11
    if total score >21, Total score = fake score + 1
- If there are two Aces, Total score = fake score + 12
    if total score >21, Total score = fake score + 2
- If there are three Aces, Total score = fake score + 13
    if total score >21, Total score = fake score + 3
- If there are four Aces, Total score = fake score + 14
    if total score >21, Total score = fake score + 4

- player decides to draw card or end turn

- if dealer <17 then need to take one more card. if not stand.

- compare value and see who wins
  if both value >21, draw
  if player < 21 && playerpoints>comppoints, player wins
  if com < 21 && playerpoints<compoints, com wins

- reset game

- use helper function .e.g check conditions to win

//var suits = ["♥️", "♦️", "♠️", "♣️"];
*/

var playerHand = [];
var computerHand = [];

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♠️", "♥️", "♣️", "♦️"];
  var suitIndex = 0;

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      }
      if (cardName == 11) {
        cardName = "jack";
      }
      if (cardName == 12) {
        cardName = "queen";
      }
      if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  cardDeck[0].rank = 0;
  cardDeck[13].rank = 0;
  cardDeck[26].rank = 0;
  cardDeck[39].rank = 0;
  console.log(cardDeck);
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var currentIndex = 0;
    while (currentIndex < cardDeck.length) {
      var randomIndex = getRandomIndex(cardDeck.length);
      var randomCard = cardDeck[randomIndex];
      var currentCard = cardDeck[currentIndex];
      cardDeck[currentIndex] = randomCard;
      cardDeck[randomIndex] = currentCard;
      currentIndex = currentIndex + 1;
    }
    return cardDeck;
  }
};

var shuffledDeck = shuffleCards(makeDeck());
console.log(shuffledDeck);

//player first two cards
while (playerHand.length < 2) {
  playerHand.push(shuffledDeck.pop());
}
console.log(playerHand);

// computer first two cards
while (computerHand.length < 2) {
  computerHand.push(shuffledDeck.pop());
}
console.log(computerHand);

//calculate pre-score without ace points

var computerPrePoints = computerHand[0].rank + computerHand[1].rank;
console.log(computerPrePoints);

//calculate Player pre-score without ace points
var playerPrePoints = playerHand[0].rank + playerHand[1].rank;
console.log(playerPrePoints);

// calculate number of Aces in player hands
var calPlayerAce = function () {
  var playerAce = 0;
  var i = 0;
  while (i < playerHand.length) {
    if (playerHand[i].name == "ace") {
      playerAce += 1;
    }
    i += 1;
  }
  console.log(playerAce);

  // calculate player total points with ace
  var calTotalPlayerPoints = playerPrePoints;
  if (playerAce == 1) {
    calTotalPlayerPoints = playerPrePoints + 11;
    if (calTotalPlayerPoints > 21) {
      calTotalPlayerPoints = playerPrePoints + 1;
    }
  }
  if (playerAce == 2) {
    calTotalPlayerPoints = playerPrePoints + 12;
    if (calTotalPlayerPoints > 21) {
      calTotalPlayerPoints = playerPrePoints + 2;
    }
  }
  if (playerAce == 3) {
    calTotalPlayerPoints = playerPrePoints + 13;
    if (calTotalPlayerPoints > 21) {
      calTotalPlayerPoints = playerPrePoints + 3;
    }
  }
  if (playerAce == 4) {
    calTotalPlayerPoints = playerPrePoints + 14;
    if (calTotalPlayerPoints > 21) {
      calTotalPlayerPoints = playerPrePoints + 4;
    }
  }
  console.log(calTotalPlayerPoints);
};
