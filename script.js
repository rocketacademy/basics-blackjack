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
      var CardRank = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
        CardRank = 11;
      } else if (cardName == 11) {
        cardName = "jack 🎃";
        CardRank = 10;
      } else if (cardName == 12) {
        cardName = "queen 👑";
        CardRank = 10;
      } else if (cardName == 13) {
        cardName = "king 👑";
        CardRank = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: CardRank,
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
var dealerDeckforMessage = [];
var win = 0;
var animation = 0;
var NumberofPlayers = 0;
var CurrentPlayer = 1;
var NumofStands = 0;

var main = function (input) {
  var myOutputValue = "";
  console.log(mode);
  var NumberOfPlayers;

  if (mode == "NumofPlayers") {
    mode = "shuffle";
    myOutputValue = start(input);
  } else if (mode == "shuffle") {
    mode = "deal";
    myOutputValue = shuffle(NumberOfPlayers);
  } else if (mode == "deal") {
    mode = "actualgame";
    myOutputValue = DealtCards(NumberOfPlayers);
  } else if (mode == "actualgame") {
    myOutputValue = actualgame(input, NumberOfPlayers);
  } else if (mode == "compareNcontrast") {
    myOutputValue = outcome(NumberofPlayers);
  } else if (mode == "reward") {
    myOutputValue = Graphics();
  }
  return myOutputValue;
};

//define number of players in game
var start = function (input) {
  var message = "";
  if (isNaN(input) == true || input <= 1) {
    mode = "NumofPlayers";
    message = `Please type the number of players.`;
  } else {
    NumberofPlayers = Number(input);
    console.log(NumberofPlayers);
    message = `You have chosen ${input} players for this game. <br><br>Click 'Submit' to shuffle the Cards.`;
  }
  return message;
};

//shuffle the cards
var shuffle = function (NumberOfPlayers) {
  console.log(NumberofPlayers);

  shuffledDeck = shuffleCards(deck);

  counter = 0;
  while (counter < NumberOfPlayers) {
    playerDeck.push([`Player ${counter + 1}`, 0]);
    counter += 1;
  }

  console.log(playerDeck);
  return `The cards have been shuffled. <br><br>Press Submit to deal the cards.`;
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
var DealtCards = function (NumberOfPlayers) {
  var message = "";
  var counter = 0;
  if (counter < NumberOfPlayers) {
    counter += 1;
    message += dealing(CurrentPlayer);
    CurrentPlayer += 1;
    console.log("d");
    mode = "deal";
  }

  message += `<br>Please click 'Submit' for the next player to be dealt their cards.`;

  var dealerCard1 = shuffledDeck.pop();
  var dealerCard2 = shuffledDeck.pop();
  dealervalue = calculations(dealerDeck);
  dealerDeck.push(dealerCard1);
  dealerDeck.push(dealerCard2);

  var counter2 = 0;
  while (counter2 < dealerDeck.length) {
    dealerDeckforMessage.push(
      ` ${dealerDeck[counter2].name} of ${dealerDeck[counter2].suit}`
    );
    counter2 += 1;
  }
  console.log("dealer: " + dealervalue);

  if (counter == NumberOfPlayers - 1) {
    message += `<br>One of the dealer's cards is the ${dealerDeckforMessage[0]}.<br><br>Do you want to 'stand' or 'hit', Player ${CurrentPlayer}?`;
    CurrentPlayer = 1;
    mode = "actualgame";
  }
  return message;
};

//deal cards to each player
var dealing = function (CurrentPlayer) {
  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();

  playerDeck[CurrentPlayer - 1].push(playerCard1);
  playerDeck[CurrentPlayer - 1].push(playerCard2);

  playervalue = calculations(playerDeck[CurrentPlayer - 1]);

  var counter = 0;

  console.log(`player${CurrentPlayer}:  + ${playervalue}`);

  return `Player ${CurrentPlayer}, your cards are the ${playerCard1.name} of ${playerCard1.suit} and the ${playerCard2.name} of ${playerCard2.suit}. `;
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

var actualgame = function (input, NumberOfPlayers) {
  var message = "";
  var counter = 0;
  if (counter < NumberOfPlayers) {
    individualchoices(CurrentPlayer);
    counter += 1;
    message = individualchoices(input);
    CurrentPlayer += 1;
    mode = "actualgame";
  }

  if (counter == NumberOfPlayers - 1) {
    if (dealervalue < 17) {
      //no matter what the player chooses, the dealer will draw one card if its value is less than 17.
      var dealerCard = shuffledDeck.pop();
      dealerDeck.push(dealerCard);
      dealervalue = calculations(dealerDeck);
      dealerDeckforMessage.push(` ${dealerCard.name} of ${dealerCard.suit}`);
      console.log("dealer: " + dealervalue);
      console.log(dealerDeck);
    }

    message += `<br>One of the dealer's cards is the ${dealerDeckforMessage[0]}.<br><br>Do you want to 'stand' or 'hit', Player ${CurrentPlayer}?`;
    mode = "compareNcontrast";
  }

  return message;
};

var individualchoices = function (input) {
  var message = ``;
  if (playerDeck[CurrentPlayer - 1][0] == "stand" || "lose") {
    message`As Player ${currentplayer} has already stood, they cannot play this round.`;
  } else {
    playervalue = calculations(playerDeck[CurrentPlayer - 1]);
    dealervalue = calculations(dealerDeck);

    //if user chooses to stand
    if (input == "stand" || "s") {
      NumofStands += 1;
      playerDeck[CurrentPlayer - 1].upshift("stand");

      message += `<br><br> Player ${CurrentPlayer} has chosen to stand.`;
    }

    //if user chooses to hit
    else if (input == "hit" || "h") {
      var playerCard = shuffledDeck.pop();
      playerDeck[CurrentPlayer - 1].push(playerCard);

      playervalue = calculations(playerDeck[CurrentPlayer - 1]);

      if (playervalue > 21) {
        NumofStands += 1;
        playerDeck[CurrentPlayer - 1].upshift("lose");

        message = `You has lost as you have exceeded 21.`;
      } else if (playervalue == 21) {
        playerDeck[CurrentPlayer - 1].upshift("stand");

        message = `You have won BlackJack!!!.`;
        win = 1;
      } else {
        message = `You have gained the ${playerCard.name} of ${playerCard.suit}.`;
      }
    }
  }

  console.log(`player ${currentplayer}:  + playervalue)`);
  console.log(playerDeck[currentplayer - 1]);

  if (!(win == 0)) {
    mode = "reward";
  }

  return message + `<br><br>Click Submit for your Reward`;
};

var outcome = function (NumberofPlayers) {
  var winners = [];
  var losers = [];
  var valueofplayers = [];

  var counter = 0;
  while (counter < NumberofPlayers) {
    if (playerDeck[counter][0] == "lose") {
      losers.push(counter);
    } else if (playerDeck[counter][0] == "win") {
      winners.push(counter);
    } else {
      valueofplayers.push(counter);
    }
  }
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
