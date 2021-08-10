// generates card deck
var makeDeck = function () {
  var cardDeck = [];

  // generates the standard six decks
  for (let i = 0; i < 6; i += 1) {
    // generates a single deck
    var suits = ["♠️", "♥️", "♣️", "♦️"];
    for (let i = 0; i < suits.length; i += 1) {
      var currentSuit = suits[i];
      var rankIndex = 1;
      while (rankIndex <= 13) {
        var cardName = rankIndex;
        var cardRank = rankIndex;
        if (cardName == 1) {
          cardName = "Ace";
        } else if (cardName == 11) {
          cardName = "Jack";
          cardRank = 10;
        } else if (cardName == 12) {
          cardName = "Queen";
          cardRank = 10;
        } else if (cardName == 13) {
          cardName = "King";
          cardRank = 10;
        }
        var card = {
          name: cardName,
          suit: currentSuit,
          rank: cardRank,
        };
        cardDeck.push(card);
        rankIndex += 1;
      }
    }
  }
  return cardDeck;
};

// original card deck
var cardDeck = makeDeck();

// shuffles card deck
var shuffleCards = function () {
  var cardDeck = makeDeck();
  for (let i = 0; i < cardDeck.length; i += 1) {
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[i];
    cardDeck[i] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

// shuffled card deck
var shuffledDeck = shuffleCards(cardDeck);

// establishes player name
var playerName = "";

// keeps track of game mode
var currentGameMode = "start game";

// keeps track of player's points
var playerPoints = 100;

// keeps track of current bet
var currentBet = 0;

// keeps track of player's cards
var playerCards = [];

// keeps track of dealer's cards
var dealerCards = [];

// keeps track of used cards
var usedCards = [];

var main = function (input) {
  var myOutputValue = "";

  // setting up the game for a new round
  if (currentGameMode == "start game") {
    // new player enters their username
    if (input.trim() != "" || playerName != "") {
      if (playerName == "") {
        playerName = input;
      }

      // clears player and dealer hand from previous round
      for (let i = 0; i <= playerCards.length; i += 1) {
        usedCards = playerCards.pop();
      }
      for (let i = 0; i <= dealerCards.length; i += 1) {
        usedCards = dealerCards.pop();
      }

      // ensures there's enough cards for a full round
      if (shuffledDeck.length < 22) {
        return "There are an insufficient number of cards left in the deck. <br><br> Please refresh the page to start a new game.";
      }

      currentGameMode = "place bet";
      return `Let's play, ${playerName}! <br><br> You currently have ${playerPoints} points. Please place a bet.`;
    } else {
      return "Your username needs to contain at least a letter or number.";
    }
  }

  // player places a bet
  if (currentGameMode == "place bet") {
    if (isNaN(input) == true || !Number(input) > 0 || Math.sign(input) == -1) {
      return "Please enter a number larger than 0.";
    } else if (input > playerPoints) {
      return `You cannot bet ${input} as you only have ${playerPoints} points. <br><br> Please place another bet.`;
    } else {
      // draws initial cards
      for (let i = playerCards.length; i < 2; i += 1) {
        playerCards.push(shuffledDeck.pop());
        dealerCards.push(shuffledDeck.pop());
      }

      currentGameMode = "determine scenario";
      currentBet = input;
      return `You have decided to bet ${currentBet} points this round. <br><br> Click submit to draw your cards.`;
    }
  }

  // generates output for player's hand
  var playerHand = "";
  for (let i = 0; i < playerCards.length; i += 1) {
    playerHand += `Card #${i + 1}: ${playerCards[i].name} of ${
      playerCards[i].suit
    } <br>`;
  }

  // determines what's next for the player
  if (currentGameMode == "determine scenario") {
    // generates output for ending message
    var endMessage = "";
    if (getHandSum(playerCards) == 21) {
      endMessage = "You drew a blackjack! <br><br> Click submit to continue.";
      currentGameMode = "player stand";
    } else if (getHandSum(playerCards) > 21) {
      endMessage = `You busted! <br><br> Click submit to continue.`;
      currentGameMode = "player lost";
    } else {
      endMessage =
        "Would you like to hit or stand? <br><br> Input your decision then click submit.";
      currentGameMode = "hit or stand";
    }
    // displays result
    return `Your points: ${playerPoints} <br> Your current bet: ${currentBet} <br><br> <b><u> Your hand </u></b> <br> ${playerHand} <br> <b><u> Dealer's hand </u></b> <br> Card #1: ${dealerCards[0].name} of ${dealerCards[0].suit} <br> Card #2: ? <br><br> ${endMessage}`;
  }

  // allows player to choose hit or stand
  if (currentGameMode == "hit or stand") {
    if (input != "hit" && input != "stand") {
      return `Please input "hit" or "stand".`;
    } else {
      if (input == "hit") {
        playerCards.push(shuffledDeck.pop());
        currentGameMode = "determine scenario";
        return `You drew a ${playerCards[playerCards.length - 1].name} of ${
          playerCards[playerCards.length - 1].suit
        } <br><br> Click submit to continue.`;
      } else {
        currentGameMode = "player stand";
        return "You chose to stand. The dealer will now reveal his second card. <br><br> Click submit to continue.";
      }
    }
  }

  // generates output for dealer's hand
  var dealerHand = "";
  for (let i = 0; i < dealerCards.length; i += 1) {
    dealerHand += `Card #${i + 1}: ${dealerCards[i].name} of ${
      dealerCards[i].suit
    } <br>`;
  }

  // dealer's turn to draw cards
  if (currentGameMode == "player stand") {
    var dealerMessage = "";
    if (getHandSum(dealerCards) < 17) {
      dealerCards.push(shuffledDeck.pop());
      dealerMessage =
        "The dealer has less than 17, so he's going to hit. <br><br> Click submit to view his next draw.";
    } else if (getHandSum(dealerCards) > 21) {
      dealerMessage = "The dealer busted! <br><br> Click submit to continue.";
      currentGameMode = "player won";
    } else {
      if (getHandSum(playerCards) > getHandSum(dealerCards)) {
        dealerMessage =
          "Your hand is better than the dealer's. You won this round! <br><br> Click submit to continue.";
        currentGameMode = "player won";
      } else if (getHandSum(playerCards) < getHandSum(dealerCards)) {
        dealerMessage =
          "The dealer's hand is better than yours. You lost this round! <br><br> Click submit to continue.";
        currentGameMode = "player lost";
      } else {
        dealerMessage =
          "It's a tie! You neither win nor lose your bet. <br><br> Click submit to start the next round.";
        currentGameMode = "start game";
      }
    }
    return `Your points: ${playerPoints} <br> Your current bet: ${currentBet} <br><br> <b><u> Your hand </u></b> <br> ${playerHand} <br> <b><u> Dealer's hand </u></b> <br> ${dealerHand} <br> ${dealerMessage}`;
  }

  // player won
  if (currentGameMode == "player won") {
    playerPoints += Number(currentBet);
    currentGameMode = "start game";
    return `You just won ${currentBet} points! You now have ${playerPoints} points. <br><br> Click submit to start the next round.`;
  }

  // player lost
  if (currentGameMode == "player lost") {
    playerPoints -= currentBet;
    if (playerPoints <= 0) {
      return "You lost all your points! <br><br> Please refresh the page to start a new game.";
    } else {
      currentGameMode = "start game";
      return `You just lost ${currentBet} points! You now have ${playerPoints} points remaining. <br><br> Click submit to start the next round.`;
    }
  }
};

// calculates the sum of a hand
var getHandSum = function (hand) {
  var sum = 0;
  var numAces = 0;
  for (let i = 0; i < hand.length; i += 1) {
    thisCard = hand[i];
    if (thisCard.rank > 1 && thisCard.rank < 11) {
      sum += thisCard.rank;
    } else if (thisCard.rank > 10 && thisCard.rank > 14) {
      sum += 10;
    } else {
      sum += 11;
      numAces += 1;
    }
  }
  if (sum > 21 && numAces > 0) {
    for (let i = 0; i < numAces; i += 1) {
      sum -= 10;
      numAces -= 1;
      if (sum <= 21) {
        break;
      }
    }
  }
  return sum;
};
