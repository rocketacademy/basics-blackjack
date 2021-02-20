var playingCards = [];
var playerCards = [];
var computerCards = [];

var playerCardsAtHand = 0;
var computerCardAtHand = 0;

var gameState = 'Not Started';

var isThereAce = function (cardsAtHard, cardTotal) {
  // loop
  var index = 0;
  while (index < cardsAtHard.length) {
    // sET ACE TO 1 OR 11? 1) total<10 Ace= 11 2) total>10 Ace= 1
    console.log(cardsAtHard[index].cardName + ' ' + cardsAtHard[index].rank);
    if (cardsAtHard[index].cardName == 'ace' && cardTotal < 10) {
      cardsAtHard[index].rank = 11;
    }
    if (cardsAtHard[index].cardName == 'ace' && cardTotal > 10) {
      cardsAtHard[index].rank = 1;
    }

    console.log(cardsAtHard[index].cardName + ' ' + cardsAtHard[index].rank);
    index = index + 1;
  }
  return cardsAtHard;

  // sET ACE TO 1 OR 11? 1) total<10 Ace= 11 2) total>10 Ace= 1
};
var playerWon = function (playerCard, computerCard) { // player cards index rank not the actual value of the card
  // Add King Queen or Jack =10, Ace = 1 or 11
  // sum of Ace change between 1 or 11
// sET ACE TO 1 OR 11?

  var index = 0;
  playerCardsAtHand = 0;
  computerCardAtHand = 0;

  // initial calculate cards at hand
  while (index < playerCard.length) {
    playerCardsAtHand = playerCardsAtHand + playerCard[index].rank;

    index = index + 1;
    // check if there is ace - create Ace Checking function

    // sET ACE TO 1 OR 11? 1) <10 Ace= 21 2) >10 Ace= 1
    // use if - else
  }
  index = 0;
  while (index < computerCard.length) {
    computerCardAtHand = computerCardAtHand + computerCard[index].rank;
    index = index + 1;
    // check if there is ace - create Ace Checking function
    // sET ACE TO 1 OR 11? 1) <10 Ace= 21 2) >10 Ace= 1
    // use if - else
  }
  // Do adjustment for aces
  playerCards = isThereAce(playerCard, playerCardsAtHand);
  computerCards = isThereAce(computerCards, computerCardAtHand);
  console.log('Player Cards at Hand ->' + playerCardsAtHand + ' Computer Cards at Hand ->' + computerCardAtHand);

  if (computerCardAtHand > 21) {
    console.log('Computer Bust');
    return 'Computer Bust';
  } if (playerCardsAtHand > 21) {
    console.log('Player Bust');

    return 'Player Bust';
  } if (computerCardAtHand > 17 && playerCardsAtHand > computerCardAtHand) {
    console.log('Player Bust');
    return 'Player Lose';
  } if (computerCardAtHand > 17 && playerCardsAtHand < computerCardAtHand) {
    console.log('Computer Won');
    return 'Computer Won';
  } if ((playerCardsAtHand < 22) && (playerCardsAtHand == computerCardAtHand)) {
    console.log('Draw');
    return 'Draw';
  }
  return 'Continue';
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    var rank = 0;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = 'ace';
        // can be 1 or 11
      } else if (cardName == 11) {
        cardName = 'jack';
        // change rank = 10
        rank = 10;
      } else if (cardName == 12) {
        cardName = 'queen';
        rank = 10;
      } else if (cardName == 13) {
        cardName = 'king';
        rank = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // console.log(card.cardName);
      cardDeck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (cardSize) {
  return Math.floor(Math.random() * cardSize);
};

var randomCardPicked = function () {
  // console.log('Playing card length' + playingCards.length);

  var cardSize = playingCards.length;
  var randomIndex = getRandomIndex(cardSize);
  console.log('Random Index: ' + randomIndex);
  var cardPicked = playingCards[randomIndex];
  playingCards.splice(randomIndex, 1);

  console.log('Cards picked -> suit: ' + cardPicked.suit + ' rank: ' + cardPicked.rank + ' name: ' + cardPicked.name);

  return cardPicked;
};

var startGame = function () {
  playerCards = [];
  computerCards = [];

  playerCardsAtHand = 0;
  computerCardAtHand = 0;
  playingCards = makeDeck();
  playerCards.push(randomCardPicked());
  computerCards.push(randomCardPicked());
  gameState = 'Started';
};
/*
Introduction
Implement a simplified version of Blackjack. If you're not familiar with Blackjack, refer to this video for game rules. Our simplified rules are the following.
There will be only two players. One human and one computer.
The computer will always be the dealer. The dealer has to hit if their hand is below 17.
The player who is closer to 21 wins the hand. Aces can be 1 or 11.

The main function runs on each player's turn. The sequence of actions in the game might be the following.
Deck is shuffled.
User clicks Submit to deal cards.
The cards are analysed for game winning conditions, e.g. Blackjack.
The cards are displayed to the user.
The user decides whether to hit or stand, using the submit button to submit their choice.
The user's cards are analysed for winning or losing conditions.
The computer decides to hit or stand automatically based on game rules.
The game either ends or continues.

First Version: Compare Initial Hands to Determine Winner
Aim for a playable game. A minimal version of Blackjack could just compare the ranks of the player's and dealer's cards. For now, we can leave out features such as Aces being 1 or 11, and the player and dealer choosing to hit or stand. Write pseudocode to guide your logic.
Compare the initially-drawn cards to determine a winner. Code with the understanding that your code will expand later to encompass other Blackjack functionality.
Test your code.

Third Version: Add Dealer Hit or Stand
The rules state that the dealer hits after the player is done. After the player confirms they are done, add the logic for the dealer adding cards to their hand. This should happen before the winning  condition.
Test your code.

// Fourth Version: Add Variable Ace Values
// Add logic to determine whether Aces should have value of 1 or 11 for a given hand.
// Test your code.

*/
var main = function (input) {
  if (gameState == 'Not Started') {
    startGame();
    console.log('start Game');
  } else if (gameState == 'Started') {
    if (input = 'Hit') {
      playerCards.push(randomCardPicked());
    }
    computerCards.push(randomCardPicked());
  }

  // check if player has won
  outCome = playerWon(playerCards, computerCards);
  playerScore = playerCardsAtHand;
  computerScore = computerCardAtHand;

  var myOutputValue = 'Player Cards at Hand -> ' + playerCardsAtHand
  + ' Computer Cards at Hand -> '
  + computerCardAtHand + '<br>' + 'Outcome : ' + playerWon(playerCards, computerCards);
  if (playerWon(playerCards, computerCards) == 'Continue') {
    myOutputValue = 'Player Cards at Hand -> ' + playerCardsAtHand
  + ' Computer Cards at Hand -> '
  + computerCardAtHand + '<br>' + 'Outcome : ' + playerWon(playerCards, computerCards) + '<br> Enter Hit or Stand then Click Submit';
  }

  console.log('Game state : ' + gameState);
  if (outCome != 'Continue') {
    console.log('re start game');
    gameState == 'Not Started';

    playerCards = [];
    computerCards = [];

    console.log('After clearing Player Cards at Hand -> ' + playerCardsAtHand);
    console.log('After clearing Computer Cards at Hand -> ' + computerCardAtHand);
  }

  return myOutputValue;
};
