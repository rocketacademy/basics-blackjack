var mode = "NumofPlayers";
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥", "♦", "♣", "♠"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
        rankCounter = 11;
      } else if (cardName == 11) {
        cardName = "jack 🎃";
        rankCounter = 10;
      } else if (cardName == 12) {
        cardName = "queen 👑";
        rankCounter = 10;
      } else if (cardName == 13) {
        cardName = "king 👑";
        rankCounter = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
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
var deck = makeDeck();

var playerDeck = [];
var dealerDeck = [];
var shuffledDeck = [];
var playervalue = 0;
var dealervalue = 0;
var playerDeckforMessage = [];
var dealerDeckforMessage = [];
var UserName = "";
var win = 0;
var animation = 0;
var NumberOfPlayers = 0;
var CurrentPlayer = 1;

var main = function (input) {
  var myOutputValue = "";
  console.log(mode);

  if (mode == "NumofPlayers") {
    mode = "shuffle";
    myOutputValue = start();
  } else if (mode == "shuffle") {
    mode = "deal";
    myOutputValue = shuffle();
  } else if (mode == "deal") {
    mode = "actualgame";
    return DealtCards();
  } else if (mode == "actualgame") {
    return actualgame(input);
  } else if (mode == "reward") {
    return Graphics();
  }
  return myOutputValue;
};

//define number of players in game
var start = function (input) {
  if (isNaN(input) == false || input == 0) {
    mode = "NumofPlayers";
    return `Please type the number of players.`;
  } else {
    NumberofPlayers = input;
    return `You have chosen ${NumberOfPlayers} players for this game. <br><br>Click 'Submit' to shuffle the Cards.`;
  }
};

//shuffle the cards
var shuffle = function () {
  shuffledDeck = shuffleCards(deck);

  counter = 0;
  while (counter < NumberOfPlayers) {
    playerDeck[counter] = [`Player ${counter + 1}`];
    counter += 1;
  }
  return `Hello. <br><br>The cards have been shuffled. <br><br>Press Submit to deal the cards.`;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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

//deal the cards to the players
var DealtCards = function () {
  var message = "";
  var counter = 0;
  if (counter < NumberOfPlayers) {
    dealing(CurrentPlayer);
    counter += 1;
    message = dealing(CurrentPlayer);
    CurrentPlayer += 1;
    mode = "actualgame";
  }

  var dealerCard1 = shuffledDeck.pop();
  var dealerCard2 = shuffledDeck.pop();
  dealervalue = calculations(dealerDeck);
  dealerDeck.push(dealerCard1);
  dealerDeck.push(dealerCard2);

  var counter2 = 0;
  while (counter2 < dealerDeck.length) {
    dealerDeckforMessage.push(
      ` ${playerDeck[counter2].name} of ${playerDeck[counter2].suit}`
    );
    counter2 += 1;
  }
  console.log("dealer: " + dealervalue);

  if (counter == NumberOfPlayers - 1) {
    message += `<br>One of the dealer's cards is the ${dealerDeckforMessage[0]}.<br><br>Do you want to 'stand' or 'hit', Player ${CurrentPlayer}?`;
    CurrentPlayer = 1;
  }
  return message;
};

//deal cards to each player
var dealing = function (CurrentPlayer) {
  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();

  playerDeck[CurrentPlayer - 1].push(playerCard1);
  playerDeck[CurrentPlayer - 1].push(playerCard2);

  playervalue = calculations(playerDeck);

  var counter = 0;
  while (counter < playerDeck[CurrentPlayer - 1].length) {
    playerDeckforMessage[CurrentPlayer - 1].push(
      ` ${playerDeck[CurrentPlayer - 1][counter].name} of ${
        playerDeck[CurrentPlayer - 1][counter].suit
      }`
    );
    counter += 1;
  }

  console.log(`player${CurrentPlayer}:  + ${playervalue}`);

  return `Player ${CurrentPlayer}, your cards are the ${
    playerDeckforMessage[CurrentPlayer - 1]
  }. `;
};

var calculations = function (ADeck) {
  var counter = 0;
  var value = 0;
  var NumofAces = 0;

  while (counter < ADeck.length) {
    value += ADeck[counter].rank;
    if ((ADeck[counter].name = "ace")) {
      NumofAces += 1;
    }
    counter += 1;
  }

  while (value > 21 && NumofAces >= 1) {
    value -= 10;
    NumofAces -= 1;
  }

  return value;
};

var actualgame = function (input) {
  var message = `Please enter either 'stand' or 'hit', ${UserName}.`;
  playervalue = calculations(playerDeck);
  dealervalue = calculations(dealerDeck);

  if (dealervalue < 17) {
    //no matter what the player chooses, the dealer will draw one card if its value is less than 17.
    var dealerCard = shuffledDeck.pop();
    dealerDeck.push(dealerCard);
    dealervalue = calculations(dealerDeck);
    dealerDeckforMessage.push(` ${dealerCard.name} of ${dealerCard.suit}`);
  }

  if (dealervalue > 21) {
    //if the computer itself exceeds 21, the computer automatically loses
    win = 2;
    message = `${UserName} has won as the dealer busted!`;
  } else {
    //if user chooses to stand
    if (input == "stand" || "s") {
      win = 2; //if player losses, win = 2
      if (playervalue < dealervalue) {
        message = `The dealer has won!`;
      } else if (playervalue > dealervalue) {
        win = 1; //if player wins, win = 1
        message = `You have won!`;
      } else if (playervalue == dealervalue) {
        message = `It's a tie.`;
      }
      message += `<br><br> Your cards were ${playerDeckforMessage} while the dealer's cards were ${dealerDeckforMessage}.`;
    }

    //if user chooses to hit
    else if (input == "hit" || "h") {
      var playerCard = shuffledDeck.pop();
      playerDeck.push(playerCard);

      playerDeckforMessage.push(` ${playerCard.name} of ${playerCard.suit}`);

      playervalue = calculations(playerDeck);

      if (playervalue > 21) {
        win = 2;

        message = `You has lost as you have exceeded 21. <br><br> Your cards were ${playerDeckforMessage} while the dealer's cards were ${dealerDeckforMessage}.`;
      } else if (playervalue == 21) {
        message = `You have won!!! <br><br> Your cards were ${playerDeckforMessage} while the dealer's cards were ${dealerDeckforMessage}.`;
        win = 1;
      } else {
        message = `Your cards are ${playerDeckforMessage} while the dealer's cards are ${dealerDeckforMessage}. <br><br>Do you wish to 'stand' or 'hit'?`;
      }
    }
  }

  console.log("player: " + playervalue);
  console.log(playerDeck);
  console.log("dealer: " + dealervalue);
  console.log(dealerDeck);

  if (!(win == 0)) {
    mode = "reward";
  }

  return message + `<br><br>Click Submit for your Reward`;
};

var Graphics = function () {
  var message = "";
  if (win == true) {
    message = `<br>

┏┓╋╋┏┳━━━┳┓╋┏┓┏┓┏┓┏┳━━━┳━┓╋┏┳┳┳┓
┃┗┓┏┛┃┏━┓┃┃╋┃┃┃┃┃┃┃┃┏━┓┃┃┗┓┃┃┃┃┃
┗┓┗┛┏┫┃╋┃┃┃╋┃┃┃┃┃┃┃┃┃╋┃┃┏┓┗┛┃┃┃┃
╋┗┓┏┛┃┃╋┃┃┃╋┃┃┃┗┛┗┛┃┃╋┃┃┃┗┓┃┣┻┻┛
╋╋┃┃╋┃┗━┛┃┗━┛┃┗┓┏┓┏┫┗━┛┃┃╋┃┃┣┳┳┓
╋╋┗┛╋┗━━━┻━━━┛╋┗┛┗┛┗━━━┻┛╋┗━┻┻┻┛`;
    if (animation == 0) {
      message += `
<br><br>
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄░░░░░░░░░
░░░░░░░░▄▀░░░░░░░░░░░░▄░░░░░░░▀▄░░░░░░░
░░░░░░░░█░░▄░░░░▄░░░░░░░░░░░░░░█░░░░░░░
░░░░░░░░█░░░░░░░░░░░░▄█▄▄░░▄░░░█░▄▄▄░░░
░▄▄▄▄▄░░█░░░░░░▀░░░░▀█░░▀▄░░░░░█▀▀░██░░
░██▄▀██▄█░░░▄░░░░░░░██░░░░▀▀▀▀▀░░░░██░░
░░▀██▄▀██░░░░░░░░▀░██▀░░░░░░░░░░░░░▀██░
░░░░▀████░▀░░░░▄░░░██░░░▄█░░░░▄░▄█░░██░
░░░░░░░▀█░░░░▄░░░░░██░░░░▄░░░▄░░▄░░░██░
░░░░░░░▄█▄░░░░░░░░░░░▀▄░░▀▀▀▀▀▀▀▀░░▄▀░░
░░░░░░█▀▀█████████▀▀▀▀████████████▀░░░░
░░░░░░████▀░░███▀░░░░░░▀███░░▀██▀░░░░░░
`;
      animation = 1;
    } else if (animation == 1) {
      message += `
<br><br>
░░░░░░░░░░▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄░░░░░░░░░
░░░░░░░░▄▀░░░░░░░░░░░░▄░░░░░░░▀▄░░░░░░░
░░░░░░░░█░░▄░░░░▄░░░░░░░░░░░░░░█░░░░░░░
░░░░░░░░█░░░░░░░░░░░░▄█▄▄░░▄░░░█░▄▄▄░░░
░▄▄▄▄▄░░█░░░░░░▀░░░░▀█░░▀▄░░░░░█▀▀░██░░
░██▄▀██▄█░░░▄░░░░░░░██░░░░▀▀▀▀▀░░░░██░░
░░▀██▄▀██░░░░░░░░▀░██▀░░░░░░░░░░░░░▀██░
░░░░▀████░▀░░░░▄░░░██░░░▄█░░░░▄░▄█░░██░
░░░░░░░▀█░░░░▄░░░░░██░░░░▄░░░▄░░▄░░░██░
░░░░░░░▄█▄░░░░░░░░░░░▀▄░░▀▀▀▀▀▀▀▀░░▄▀░░
░░░░░░█▀▀█████████▀▀▀▀████████████▀░░░░
░░░░░░████▀░░███▀░░░░░░▀███░░▀██▀░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`;
      animation = 0;
    }
    message += `<br><br>Click Submit again to continue.`;
  } else {
    message =
      `🆂🅴🆁🅸🅾🆄🆂🅻🆈❓` +
      `
░░░░░░░░▄▄██▀▀▀▀▀▀▀████▄▄▄▄░░░░░░░░░░░░░
░░░░░▄██▀░░░░░░░░░░░░░░░░░▀▀██▄▄░░░░░░░░
░░░░██░░░░░░░░░░░░░░░░░░░░░░░░▀▀█▄▄░░░░░
░░▄█▀░░░░░░░░░░░░░░░░░░░░░░░░░░░░▀▀█▄░░░
░▄█▀░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█▄░░
░█▀░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▀█░
▄█░░░░░░░░░░░░░░░░░░▄░░░░░░░░░░░░░░░░░██
█▀░░░░░░██▄▄▄▄▄░░░░▄█░░░░░░░░░░░░░░░░░░█
█░░░░░░░█▄░░▀██████▀░░░▄▄░░░░░░░░░░██░░█
█░░░░░░░░▀█▄▄▄█▀░░░░░░░██▀▀██▄▄▄▄▄▄█░░▄█
█░░░░░░░░░░░░░░░░░░░░░░░▀▄▄▄▀▀▀██▀░░░░█▀
█▄░░░░░▄▄░░░░░░░░░░░░░░░░░░▀▀▀▀▀░░░░▄█▀░
░█▄░░░░█░░░░▄▄▄▄░░░░░░░░░░░░░░░░░░░▄█░░░
░░█▄░░▀█▄░░▀▀▀███████▄▄▄░░░▄░░░░░▄█▀░░░░
░░░█▄░░░░░░░░░░░░░▀▀▀░░█░░░█░░░░██░░░░░░
░░░░▀█▄▄░░░░░░░░░░░░░░░░░██░░░▄█▀░░░░░░░
░░░░░░▀▀█▄▄▄░░░░░░░░░░░░░▄▄▄█▀▀░░░░░░░░░
░░░░░░░░░░▀▀█▀▀███▄▄▄███▀▀▀░░░░░░░░░░░░░
░░░░░░░░░░░█▀░░░░░░░░░░░░░░░░░░░░░░░░░░░

      `;
  }

  return message;
};
