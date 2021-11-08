// My global variables are:

var cardSuits = [`♥️`, `♦️`, `♣️`, `♠️`];

var makeDeck = function () {
  var cardCounter = 0;
  var deck = [];

  // loop to generate cards from 1 to 13
  var suitCounter = 0;
  while (suitCounter < cardSuits.length) {
    var currentSuit = cardSuits[suitCounter];
    console.log(`suit counter is ${suitCounter}`);

    var cardnameCounter = 1;
    while (cardnameCounter < 14) {
      var cardName = cardnameCounter;
      var cardRank = cardnameCounter;
      // change face card from number to name
      if (cardName == 11) {
        cardName = `Jack`;
        cardRank = 10;
      } else if (cardName == 12) {
        cardName = `👸`;
        cardRank = 10;
      } else if (cardName == 13) {
        cardName = `🤴`;
        cardRank = 10;
      } else if (cardName == 1) {
        cardName = `Ace`;
      }
      console.log(`card generated is ${cardName}`);

      //loops to generate 4 different suits per card number

      var fullcardName = `${cardName} of ${currentSuit}`;

      console.log(`This is ${fullcardName}`);

      var card = {
        name: fullcardName,
        suit: currentSuit,
        number: cardName,
        rank: cardRank,
      };
      console.log(card);

      deck.push(card);

      cardnameCounter = cardnameCounter + 1;
    }
    suitCounter = suitCounter + 1;
  }
  cardCounter = cardCounter + 1;
  console.log(deck);

  return deck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffle = function (deck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(deck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = deck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = deck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  console.log(deck);
  return deck;
};

var shuffledDeck = shuffle(makeDeck());
var playerCards = [];
var computerCards = [];
var myOutputValue = ``;
var computerResult = ``;
var computerScore = 0;
var playerScore = 0;
var listofplayerCards = [];
var listofcomputerCards = [];
var remindertoRefresh = `Refresh to play again!`;

// ================================================= MAIN DECK STARTS HERE ===================================================================

var main = function (input) {
  // 2 cards are handed out first
  if (!input) {
    myOutputValue = dealcardsStart();
  }
  // player has to decide whether to hit or stand
  if (input == `hit`) {
    myOutputValue = playerHit();
  }

  if (input == `stand`) {
    myOutputValue = playerStand();
  }
  return myOutputValue;
};

// ========================================================== HELPER FUNCTIONS ===============================================================

var dealcardsStart = function () {
  var index = 0;

  while (index < 2) {
    playerCards.push(shuffledDeck.pop());
    computerCards.push(shuffledDeck.pop());
    index += 1;
  }

  console.log(`player first two cards are`);
  console.log(JSON.stringify(playerCards, ["name"]));
  console.log(`computer first two cards are`);
  console.log(JSON.stringify(computerCards, ["name"]));
  playerScore = scoreCalculator(playerCards);
  computerScore = scoreCalculator(computerCards);
  var msg = blackjackChecker();
  return msg;
};

var cardlistGenerator = function (input) {
  var cards = input;
  var index = 0;
  var list = [];
  while (index < cards.length) {
    var currentCard = cards[index].name;
    list.push(currentCard);
    index += 1;
  }
  return list;
};

var acecardArray = function (input) {
  var index = 0;
  var cards = input;
  var currentCard = {};
  var aceArray = [];
  while (index < cards.length) {
    currentCard = cards[index];
    var acePresent = currentCard[`number`] == "Ace";
    aceArray.push(acePresent);
    console.log(`ace is present ${acePresent}`);
    index += 1;
  }
  return aceArray;
};

var blackjackChecker = function () {
  listofcomputerCards = cardlistGenerator(computerCards);
  listofplayerCards = cardlistGenerator(playerCards);
  var computerAce = acecardArray(computerCards);
  var playerAce = acecardArray(playerCards);
  if (
    playerAce.includes(true) == true &&
    playerScore == 11 &&
    computerAce.includes(true) == false
  ) {
    playerScore = 21;
    var image =
      '<img src="https://c.tenor.com/V32kcGajQJwAAAAC/steve-carell-the-office.gif"/>';
    var result = `You win! Blackjack!`;
  } else if (
    computerAce.includes(true) == true &&
    computerScore == 11 &&
    playerAce.includes(true) == false
  ) {
    computerScore = 21;
    image =
      '<img src="https://c.tenor.com/JEuupMZB5HwAAAAC/michael-scott-flip.gif"/>';
    result = `Michael wins! Blackjack!`;
  } else if (
    playerAce.includes(true) == true &&
    playerScore == 11 &&
    computerAce.includes(true) == true &&
    computerScore == 11
  ) {
    playerScore = 21;
    computerScore = 21;
    image =
      '<img src="https://c.tenor.com/NfJlfKHv7gcAAAAC/the-office-steve-carell.gif"/>';
    result = `You both win! Blackjack!!`;
  } else {
    var image =
      '<img src="  https://c.tenor.com/4zdrgPbM0TAAAAAC/michael-scott-the-office.gif"/>';

    result = `Your turn. Hit or stand?`;
  }
  return (
    `${result} <br><br> Player cards: ${listofplayerCards} = ${playerScore} <br><br> Michael's cards: ${listofcomputerCards} = ${computerScore} <br><br>` +
    image
  );
};

var playerHit = function () {
  playerCards.push(shuffledDeck.pop());
  computerResult = computervalueChecker();
  var msg = finalwinnerChecker();
  return `You chose to hit. <br><br> ${computerResult} <br><br> ${msg}`;
};

var playerStand = function () {
  computerResult = computervalueChecker();
  var msg = finalwinnerChecker();

  return `You chose to stand. <br><br> ${computerResult} <br><br> ${msg}`;
};

var computervalueChecker = function () {
  msg = `Michael stands.`;
  if (computerCards[0].rank + computerCards[1].rank < 17) {
    computerCards.push(shuffledDeck.pop());
  }

  if (computerCards.length == 3) {
    msg = `Michael drew ${computerCards[2].name}`;
  }
  return msg;
};

var scoreCalculator = function (input) {
  var cards = input;
  var currentScore = 0;
  var index = 0;
  var aceFound = 0;
  while (index < cards.length) {
    var currentCard = cards[index];
    console.log(`current card is`);
    console.log(JSON.stringify(currentCard, ["name"]));
    if (
      currentCard.number == "Jack" ||
      currentCard.number == "👸" ||
      currentCard.number == "🤴"
    ) {
      currentScore = currentScore + 10;
    } else if (currentCard.number == "Ace") {
      aceFound = +1;
      currentScore = currentScore + 11;
      console.log(`ace found`);
      console.log(`current score is ${currentScore}`);
    } else {
      currentScore = currentScore + cards[index].rank;
    }
    index += 1;
  }
  index = 0;
  while (index < aceFound) {
    if (currentScore > 21) {
      currentScore = currentScore - 10;
    }
    index += 1;
  }
  return currentScore;
};

var finalwinnerChecker = function () {
  playerScore = scoreCalculator(playerCards);
  computerScore = scoreCalculator(computerCards);
  var image =
    '<img src="https://c.tenor.com/S_wekPtfKm4AAAAS/nice-finger-gone.gif"/>';
  var result = `Michael wins!`;
  if (playerScore > 21 && computerScore <= 21) {
    image = '<img src="https://c.tenor.com/Ld3M7VTJgFEAAAAd/smack-slap.gif"/>';
    result = `You bust. Michael wins!`;
  } else if (computerScore > 21 && playerScore <= 21) {
    image =
      '<img src="https://c.tenor.com/TZfPMV7zLk8AAAAC/the-office-michael-scott.gif"/>';
    result = `Michael bust. You win!`;
  } else if (playerScore > 21 && computerScore > 21) {
    image =
      '<img src="https://c.tenor.com/U6z3DOglmewAAAAC/the-office-michael-scott.gif"/>';
    result = `You both bust. It's a tie!`;
  } else if (
    playerScore > computerScore &&
    playerScore <= 21 &&
    computerScore <= 21
  ) {
    image =
      '<img src="https://c.tenor.com/4eKR0YrybeUAAAAS/ok-boomer-the-office.gif"/>';
    result = `You win!`;
  } else if (computerScore == playerScore) {
    image =
      '<img src="https://c.tenor.com/W-Y7lHJCTWkAAAAC/the-office-dwight.gif"/>';
    result = `It's a tie!`;
  }

  listofcomputerCards = cardlistGenerator(computerCards);
  listofplayerCards = cardlistGenerator(playerCards);

  return (
    `${result} <br><br> Your cards: ${listofplayerCards} = ${playerScore} <br><br> Michael's cards: ${listofcomputerCards} = ${computerScore}` +
    image +
    remindertoRefresh
  );
};
