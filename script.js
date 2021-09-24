var createDeck = [];
var num = [];

// Dealer object consists of the dealer data
var dealerObject = {
  name: "Dealer",
  cards: [],
  totalCardValue: 0,
};

// Player object consists of the player data
var playerObject = {
  name: "",
  cards: [],
  totalCardValue: 0,
};

var currentPlayer = playerObject;

// Game modes
var playerStand = false;
var gameOver = false;

var makeDeck = function () {
  //A decks contains of 52 cards
  //which ranks 1-13 that includes 1 as Ace, 11 as jack, 12 as queen, 13 as king
  var cardDeck = [];

  //1-4 suits : hearts, clubs, diamonds, spades
  var cardSuits = ["hearts", "clubs", "diamonds", "spades"];

  // we want to loop card suits array using an index that starts from 0
  var suitsIndex = 0;
  // looping 4 sutis
  while (suitsIndex < cardSuits.length) {
    var currentSuit = cardSuits[suitsIndex];

    // looping card rank from 1-13
    // rank counter will start from 1 because the card starts from 1 not 0
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;

      if (cardName == 1) {
        cardName = "Ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      cardDeck.push(card);
      rankCounter += 1;
    }
    suitsIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

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

var getCard = function (hand) {
  return hand.push(createDeck.pop());
};

var countCards = function (hand) {
  var score = 0;
  var counter = 0;
  var numOfAces = 0;
  //Check if there is ace in the card
  while (counter < hand.length) {
    if (hand[counter].name === "Ace") {
      numOfAces += 1;
    }

    score += hand[counter].value;
    console.log("score:" + score);
    counter += 1;
  }

  if (numOfAces > 0 && score > 21) {
    var counterAces = 0;
    while (counterAces < numOfAces) {
      console.log("score ace 11:" + score);
      score -= 10;
      console.log("score ace 1:" + score);
      if (score < 21) {
        break;
      }
      counterAces += 1;
    }
  }
  return score;
};

var getCardToString = function (hand) {
  var counter = 0;

  var output = `${playerObject.name}, you have drawn: <br>`;

  if (hand == dealerObject.cards) {
    output = `Dealer has drawn: <br>`;
  }

  while (counter < hand.length) {
    var text = hand[counter].name + " of " + hand[counter].suit;
    // if (hand == dealerObject.cards && counter > 0) {
    //   text = "[Hidden]";
    // }
    console.log(text);
    output += text + "<br>";
    counter += 1;
  }

  return output;
};

// This function is to check if the player or dealer has wins a blackjack or bust
var check = function (handValue, name) {
  // Check if player has blackjack then player after getting the card
  if (handValue == 21) {
    gameOver = true;
    return `<br><br> Its blackjack. ${name} has won !`;
    // Check if its busts
  } else if (handValue > 21) {
    gameOver = true;
    return `<br><br> ${name} busts.`;
  } else {
    if (name != "Dealer") {
      return `<br><br> Do you want to [H]it or [S]tand? (H/S)`;
    }

    return "Dealer hits.";
  }
};

var defaultMessage = function () {
  var showDealerHand = getCardToString(dealerObject.cards);
  var showPlayerHand = getCardToString(playerObject.cards);
  return ` ${showDealerHand} Dealer's hand valued at: ${dealerObject.totalCardValue} <br><br> ${showPlayerHand} Your hand valued at: ${playerObject.totalCardValue} `;
};

var main = function (input) {
  if (gameOver) {
    return "The game is over. Please refresh the page for a new game.";
  }
  var output = "";
  // check if the global variable to track if deck has already been made
  console.log(createDeck.length);
  if (createDeck.length == 0) {
    createDeck = shuffleCards(makeDeck());
  }

  console.log(createDeck);

  if (!playerObject.name) {
    if (!input) {
      return "The game will start after you enter your name. ";
    }
    playerObject.name = "Player " + input;
    return `Welcome ${playerObject.name}. Click submit to draw your cards.`;
  }

  if (playerObject.cards.length == 0) {
    // 1st card distributed
    getCard(playerObject.cards);
    getCard(dealerObject.cards);

    //2nd card distributed
    getCard(playerObject.cards);
    getCard(dealerObject.cards);

    console.log(playerObject.cards);
    console.log(dealerObject.cards);

    // Count player cards
    playerObject.totalCardValue = countCards(playerObject.cards);
    dealerObject.totalCardValue = countCards(dealerObject.cards);

    //Check player cardValue if there is blackjack
    output = check(playerObject.totalCardValue, playerObject.name);

    gameStart = true;
    return defaultMessage() + output;
  }

  if (!playerStand) {
    if (input != "h" && input != "s") {
      return "Please enter [H]it or [S]tand.(H/S)";
    }

    if (input === "h") {
      getCard(playerObject.cards);
      console.log("Player hits");
      console.log(playerObject.cards);
      playerObject.totalCardValue = countCards(playerObject.cards);
      output = check(playerObject.totalCardValue, playerObject.name);
      if (gameOver) {
        output += ` Dealer wins! Better luck next time! <br><br> Please refresh the page for a new game.`;
      }
      return defaultMessage() + output;
    }

    if (input === "s") {
      console.log("player stand");
      playerStand = true;
    }
    // how to output the winner name when the player bust
  }

  if (dealerObject.totalCardValue <= 17) {
    getCard(dealerObject.cards);
    console.log("Dealer hits");
    dealerObject.totalCardValue = countCards(dealerObject.cards);
    output = check(dealerObject.totalCardValue, dealerObject.name);
    if (gameOver) {
      output += ` ${playerObject.name} wins! Please refresh the page for a new game.`;
      return `${defaultMessage()} ${output}`;
    }
  }

  if (playerStand && dealerObject.totalCardValue > 17) {
    gameOver = true;
    if (playerObject.totalCardValue > dealerObject.totalCardValue) {
      return `${defaultMessage()} <br><br> Player wins! Please refresh the page for a new game.`;
    } else if (playerObject.totalCardValue == dealerObject.totalCardValue) {
      return `${defaultMessage()} <br><br> Its a tie! Please refresh the page for a new game.`;
    }
    return `${defaultMessage()} <br><br> Dealer wins! Please refresh the page for a new game.`;
  }

  return `${defaultMessage()}. <br><br> Click submit to see Dealer's next move`;
};
