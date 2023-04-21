// First Version: Compare Initial Hands to Determine Winner
gameModeGameStart = "Game_Mode_Start";
gameModeDrawnCards = "Game_Mode_Drawn_Cards";
// Second Version: Add Player Hit or Stand
gameModePlayerSelection = "Game_Mode_Player_Selection";
gameModePlayerHit = "Game_Mode_Player_Hit";
gameModePlayerStand = "Game_Mode_Player_Stand";
currentGameMode = gameModeGameStart;

var playerCards = [];
var dealerCards = [];

var main = function (input) {
  var myOutputValue = "";
  var shuffledDeck = shuffleCards(cardDeck);

  if (currentGameMode == gameModeGameStart) {
    playerCards.push(shuffledDeck.pop());
    playerCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());

    currentGameMode = gameModeDrawnCards;

    myOutputValue = "Everyone has been dealt with 2 cards.";

    return myOutputValue;
  }

  if (currentGameMode == gameModeDrawnCards) {
    var cardDrawnOutput =
      "Player hand: " +
      playerCards[0].name +
      " of " +
      playerCards[0].suit +
      ", " +
      playerCards[1].name +
      " of " +
      playerCards[1].suit +
      "<br><br>Dealer hand: " +
      dealerCards[0].name +
      " of " +
      dealerCards[0].suit +
      ", " +
      dealerCards[1].name +
      " of " +
      dealerCards[1].suit;

    if (
      (playerCards[0].rank >= 10 && playerCards[1].name == "Ace") ||
      (playerCards[1].rank >= 10 && playerCards[0].name == "Ace")
    ) {
      myOutputValue = cardDrawnOutput + "<br><br>Player wins by blackjack!";
    } else if (
      (dealerCards[0].rank >= 10 && dealerCards[1].name == "Ace") ||
      (dealerCards[1].rank >= 10 && dealerCards[0].name == "Ace")
    ) {
      myOutputValue = cardDrawnOutput + "<br><br>Dealer wins by blackjack!";
    } else {
      currentGameMode = gameModePlayerSelection;
      myOutputValue =
        cardDrawnOutput +
        "<br><br><br>Please enter 'hit' to draw a card or 'stand' to end your turn.<br><br>Click on the Submit button to proceed.";
    }
    return myOutputValue;
  }

  if (currentGameMode == gameModePlayerSelection) {
    if (
      input !== "hit" &&
      input !== "Hit" &&
      input !== "stand" &&
      input !== "Stand"
    ) {
      myOutputValue = "Please enter 'hit' or 'stand' to continue.";
    }

    if (input == "hit" || input == "Hit") {
      currentGameMode = gameModePlayerHit;
      myOutputValue =
        "Player has chosen hit.<br><br>Additional card has been drawn.";
    }

    if (input == "stand" || input == "Stand") {
      currentGameMode = gameModePlayerStand;
      myOutputValue =
        "Player has chosen stand.<br><br>Player's turn has ended.<br><br>It is now the dealer's turn.";
    }

    return myOutputValue;
  }

  if (currentGameMode == gameModePlayerHit) {
    playerCards.push(shuffledDeck.pop());

    playerHitOutput =
      "Player hand: " +
      playerCards[0].name +
      " of " +
      playerCards[0].suit +
      ", " +
      playerCards[1].name +
      " of " +
      playerCards[1].suit +
      ", " +
      playerCards[2].name +
      " of " +
      playerCards[2].suit;

    dealerHitOutput =
      "<br><br>Dealer hand: " +
      dealerCards[0].name +
      " of " +
      dealerCards[0].suit +
      ", " +
      dealerCards[1].name +
      " of " +
      dealerCards[1].suit;

    if (
      playerCards[0].rank + playerCards[1].rank + playerCards[2].rank <
        dealerCards[0].rank + dealerCards[1].rank &&
      playerCards[0].rank + playerCards[1].rank + playerCards[2].rank <= 21
    ) {
      currentGameMode = gameModePlayerSelection;
      myOutputValue =
        playerHitOutput +
        "<br><br>Please enter 'hit' if you would like to draw another card or 'stand' to continue to the dealer's turn.";
    } else if (
      playerCards[0].rank + playerCards[1].rank + playerCards[2].rank >
      21
    ) {
      myOutputValue =
        playerHitOutput + "<br><br>Bust! It is now the dealer's turn.";
    }

    return myOutputValue;
  }

  if (currentGameMode == gameModePlayerStand) {
    playerHitOutput =
      "Player hand: " +
      playerCards[0].name +
      " of " +
      playerCards[0].suit +
      ", " +
      playerCards[1].name +
      " of " +
      playerCards[1].suit +
      "<br><br>Dealer hand: " +
      dealerCards[0].name +
      " of " +
      dealerCards[0].suit +
      ", " +
      dealerCards[1].name +
      " of " +
      dealerCards[1].suit;

    if (
      playerCards[0].rank + playerCards[1].rank >
        dealerCards[0].rank + dealerCards[1].rank &&
      playerCards[0].rank + playerCards[1].rank <= 21
    ) {
      myOutputValue = playerHitOutput + "<br><br>Player wins!";
    } else if (
      dealerCards[0].rank + dealerCards[1].rank >
        playerCards[0].rank + playerCards[1].rank &&
      dealerCards[0].rank + dealerCards[1].rank <= 21
    ) {
      myOutputValue = playerHitOutput + "<br><br>Dealer wins!";
    } else if (
      playerCards[0].rank + playerCards[1].rank ==
      dealerCards[0].rank + dealerCards[1].rank
    ) {
      myOutputValue = playerHitOutput + "<br><br>It's a tie!";
    }

    return myOutputValue;
  }

  var totalPlayerHand = calculateHandTotal(playerCards);
  console.log(totalPlayerHand);
  var totalDealerHand = calculateHandTotal(dealerCards);
  console.log(totalDealerHand);
};

//Game Helper Functions

//Making a Card Deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;

    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      console.log(card.rank);

      cardDeck.push(card);

      rankCounter += 1;

      console.log(
        "Card rank counter: " + rankCounter + "Card Name: " + cardName
      );
    }

    suitIndex += 1;
  }

  return cardDeck;
};

var cardDeck = makeDeck();

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//Shuffle Cards
var shuffleCards = function (cardDeck) {
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
};

//Calculate Hand Total
var calculateHandTotal = function (cardsArray) {
  var handTotal = 0;

  var index = 0;
  while (index < cardsArray.length) {
    var currentCard = cardsArray[index];

    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      handTotal = handTotal + 10;
    } else {
      handTotal = handTotal + currentCard.rank;
    }
    index = index + 1;
  }
  return handTotal;
};
