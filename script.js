var mode = "name";
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

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
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

var main = function (input) {
  var myOutputValue = "";
  console.log(mode);

  if ((input = "1")) {
    mode = "reward";
  }

  if (mode == "name") {
    mode = "deal";
    myOutputValue = Name(input);
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

var Name = function (input) {
  if (!(typeof input == "string") || input == 0) {
    mode = "name";
    return `Please type in your name.`;
  } else {
    shuffledDeck = shuffleCards(deck);
    UserName = input;
    return `Hello, ${UserName}. <br><br>The cards have been shuffled. <br><br>Press Submit to deal cards.`;
  }
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

var DealtCards = function () {
  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();

  playerDeck.push(playerCard1);
  playerDeck.push(playerCard2);

  var dealerCard1 = shuffledDeck.pop();
  var dealerCard2 = shuffledDeck.pop();

  dealerDeck.push(dealerCard1);
  dealerDeck.push(dealerCard2);

  playervalue = calculations(playerDeck);
  dealervalue = calculations(dealerDeck);

  while (dealervalue > 21) {
    dealerCard2 = shuffledDeck.pop();
    dealerDeck[1] = dealerCard2;
    dealerDeckforMessage[1] = ` ${dealerCard2.name} of ${dealerCard2.suit}`;

    dealervalue = calculations(dealerDeck);
  }

  var counter = 0;
  while (counter < playerDeck.length) {
    playerDeckforMessage.push(
      ` ${playerDeck[counter].name} of ${playerDeck[counter].suit}`
    );
    counter += 1;
  }

  var counter2 = 0;
  while (counter2 < dealerDeck.length) {
    dealerDeckforMessage.push(
      ` ${playerDeck[counter2].name} of ${playerDeck[counter2].suit}`
    );
    counter2 += 1;
  }

  console.log("player: " + playervalue);
  console.log("dealer: " + dealervalue);

  return `Your cards are the ${playerDeckforMessage}. <br>One of the dealer's cards is the ${dealerDeckforMessage[0]}.<br><br>Do you want to 'stand' or 'hit', ${UserName}?`;
};

var calculations = function (ADeck) {
  var counter = 0;
  var value = 0;
  while (counter < ADeck.length) {
    value += ADeck[counter].rank;
    counter += 1;
  }
  return value;
};

var actualgame = function (input) {
  var message = `Please enter either 'stand' or 'hit', ${UserName}.`;
  playervalue = calculations(playerDeck);
  dealervalue = calculations(dealerDeck);

  if (dealervalue < 17) {
    var dealerCard = shuffledDeck.pop();
    dealerDeck.push(dealerCard);
    dealervalue = calculations(dealerDeck);
    dealerDeckforMessage.push(` ${dealerCard.name} of ${dealerCard.suit}`);
  }

  if (dealervalue > 21) {
    //if the computer itself exceeds 21, the player automatically loses
    win = 2;
    message = `${UserName} has won as the dealer busted!`;
  } else {
    //if user chooses to stand
    if (input == "stand") {
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
    else if (input == "hit") {
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
  console.log("dealer: " + dealervalue);

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
