/* Black Jack
1 Computer (dealer) & 1 player

1. Player receives 2 cards 
2. Dealer receives 2 cards
3. Player decides if they want to hit (draw) or stand (end their turn)
  - Player can continue to draw cards but will bust if exceeds 21
4. Dealer reveals their card:
  - if < 17, draws another card
  - if > 17, compare with player and winner is determined
5. Whoever is closer to 21 wins the game.

Helper functions required:
1. make deck
2. shuffle deck
3. draw cards for dealer & player
- if ace, rank can be 1 or 11
- if jack, queen or king, rank can be 10
4. player decides to hit or stand
- if draw, hit, stand or bust
- if stand, proceed
5. dealer decides to hit or stand based on </> 17
- if <17, hit
- if > 17, stand
6. decide winner

Game Steps:
1. Deck is shuffled.
2. User clicks Submit to deal cards.
3. The cards are analysed for game winning conditions, e.g. Blackjack.
4. The cards are displayed to the user.
5. The user decides whether to hit or stand, using the submit button to submit their choice.
6. The user's cards are analysed for winning or losing conditions.
7. The computer decides to hit or stand automatically based on game rules.
8. The game either ends or continues.

Game Outcomes:
(a) A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
(b) A Blackjack win. When either player or dealer draw Blackjack.
(c) A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.
*/
var gameMode = 0;
var userName = "";
var playerHand = [];
var dealerHand = [];
var playerOutcome = "";
var dealerOutcome = "";
var playerHighestSum = "";
var playerLowestSum = "";
var dealerHighestSum = "";
var dealerLowestSum = "";
var overallOutcome = "";

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = [
  {
    rank: 5,
    suit: "heart",
    name: "five",
  },
  {
    rank: 5,
    suit: "heart",
    name: "five",
  },
  {
    rank: 5,
    suit: "heart",
    name: "five",
  },
  {
    rank: 8,
    suit: "trees",
    name: "eight",
  },
];

// Game mode 0, helper function to get player's cards
var getPlayerHand = function () {
  playerHand.push(shuffledDeck.pop());
  console.log(playerHand[0].name, "Player hand 1");
  playerHand.push(shuffledDeck.pop());
  console.log(playerHand[1].name, "Player hand 2");
};

var checkPlayerJQK = function () {
  var playerIndex = 0;
  // if either cards have king, queen, jack, convert to 10.
  while (playerHand.length > playerIndex) {
    if (
      playerHand[playerIndex].name == "jack" ||
      playerHand[playerIndex].name == "queen" ||
      playerHand[playerIndex].name == "king"
    ) {
      playerHand[playerIndex].rank = 10;
    }
    playerIndex += 1;
    console.log("Special cards determination ------");
    console.log(playerHand[0].rank, "Player hand 1");
    console.log(playerHand[1].rank, "Player hand 2");
  }
};
// if either cards have ace, determine whether
// (a) black jack
// (b) only possible sum
// (c) highest/lowest possible sum.
var checkPlayerAce = function () {
  console.log("Ace cards determination ------");
  playerHighestSum = playerHand[0].rank + playerHand[1].rank;
  playerOutcome = `Total Sum = ${playerHighestSum}`;
  if (playerHand[0].name == "ace") {
    if (playerHand[1].name == "ace") {
      playerOutcome =
        "Highest possible sum = 12. <br><br> Lowest possible sum = 2.";
    } else if (playerHand[1].rank == 10) {
      playerHighestSum = 21;
      playerOutcome = "Total Sum = 21";
    } else {
      console.log("entered loop 1");
      playerHighestSum = playerHand[1].rank + 11;
      playerLowestSum = playerHand[1].rank + 1;
      playerOutcome = `<br><br> Highest possible sum = ${playerHighestSum}. <br><br> Lowest possible sum = ${playerLowestSum}.`;
    }
  }
  if (playerHand[1].name == "ace") {
    if (playerHand[0].rank == 10) {
      playerHighestSum = 21;
      playerOutcome = "Total Sum = 21";
    } else {
      console.log("entered loop 2");
      playerHighestSum = playerHand[0].rank + 11;
      playerLowestSum = playerHand[0].rank + 1;
      playerOutcome = `<br><br> Highest possible sum = ${playerHighestSum}. <br><br> Lowest possible sum = ${playerLowestSum}.`;
    }
  }
  console.log("Ace cards determination ------");
};

var getDealerHand = function () {
  dealerHand.push(shuffledDeck.pop());
  console.log(dealerHand[0].name, "Dealer hand 1");
  dealerHand.push(shuffledDeck.pop());
  console.log(dealerHand[1].name, "Dealer hand 2");
};
var checkDealerJQK = function () {
  var dealerIndex = 0;
  // if either cards have king, queen, jack, convert to 10.
  while (dealerHand.length > dealerIndex) {
    if (
      dealerHand[dealerIndex].name == "jack" ||
      dealerHand[dealerIndex].name == "queen" ||
      dealerHand[dealerIndex].name == "king"
    ) {
      dealerHand[dealerIndex].rank = 10;
    }
    dealerIndex += 1;
    console.log("Special cards determination ------");
    console.log(dealerHand[0].rank, "Player hand 1");
    console.log(dealerHand[1].rank, "Player hand 2");
  }
  dealerHighestSum = dealerHand[0].rank + dealerHand[1].rank;
  console.log(`Dealer <br><br> Total Sum = ${dealerHighestSum}`);
};
// if either cards have ace, determine whether
// (a) black jack
// (b) only possible sum
// (c) highest/lowest possible sum.
var checkDealerAce = function () {
  console.log("Ace cards determination ------");
  dealerHighestSum = dealerHand[0].rank + dealerHand[1].rank;
  console.log(`Total Sum = ${dealerHighestSum}`);
  if (dealerHand[0].name == "ace") {
    if (dealerHand[1].name == "ace") {
      dealerHighestSum = 12;
      console.log(
        "Dealer <br><br> Highest possible sum = 12. <br><br> Lowest possible sum = 2."
      );
    } else if (dealerHand[1].rank == 10) {
      dealerHighestSum = 21;
      console.log(
        `Dealer <br><br>  black jack! Oh no! ${userName}, you have lost!`
      );
    } else {
      dealerHighestSum = dealerHand[1].rank + 11;
      dealerLowestSum = dealerHand[1].rank + 1;
      console.log(
        `Dealer <br><br>  Highest possible sum = ${dealerHighestSum}. <br><br> Lowest possible sum = ${dealerLowestSum}.`
      );
    }
  }
  if (dealerHand[1].name == "ace") {
    if (dealerHand[0].rank == 10) {
      dealerHighestSum = 21;
      console.log(
        `Dealer <br><br> black jack! Oh no! ${userName}, you have lost!`
      );
    } else {
      dealerHighestSum = dealerHand[0].rank + 11;
      dealerLowestSum = dealerHand[0].rank + 1;
      console.log(
        `Dealer <br><br> Highest possible sum = ${dealerHighestSum}. <br><br> Lowest possible sum = ${dealerLowestSum}.`
      );
    }
  }
};

var getGameOutcome = function () {
  if (playerHighestSum == dealerHighestSum) {
    overallOutcome = `It is a tie! You drew ${playerHighestSum} and the dealer drew ${dealerHighestSum}!`;
  } else if (playerHighestSum > dealerHighestSum && playerHighestSum == 21) {
    overallOutcome = `Congrats ${userName}, you have a Blackjack win! You drew ${playerHighestSum} and the dealer drew ${dealerHighestSum}!`;
  } else if (playerHighestSum > dealerHighestSum) {
    overallOutcome = `Congrats ${userName}, you win! You drew ${playerHighestSum} and the dealer drew ${dealerHighestSum}!`;
  } else if (playerHighestSum < dealerHighestSum && dealerHighestSum == 21) {
    overallOutcome = `Oh no ${userName}, you have lost! The dealer drew a black jack win! You drew ${playerHighestSum} and the dealer drew ${dealerHighestSum}!`;
  } else if (playerHighestSum < dealerHighestSum) {
    overallOutcome = `Oh no ${userName}, you have lost! You drew ${playerHighestSum} and the dealer drew ${dealerHighestSum}!`;
  }
};

var main = function (input) {
  // Game mode 0, insert username & deal cards.
  if (gameMode == 0) {
    userName = input;
    getPlayerHand(shuffledDeck);
    getDealerHand(shuffledDeck);
    checkPlayerJQK(playerHand);
    checkPlayerAce(playerHand);
    checkDealerJQK(dealerHand);
    checkDealerAce(dealerHand);
    getGameOutcome(playerHand, dealerHand);
    gameMode += 1;
    return `Hi ${userName}!<br><br> You have drawn: <br><br> Card 1: ${playerHand[0].name} of ${playerHand[0].suit}. <br><br> Card 2: ${playerHand[1].name} of ${playerHand[1].suit}. <br><br> ${playerOutcome}<br><br> ${overallOutcome}`;
    // create nested if for end of game
  }
};
