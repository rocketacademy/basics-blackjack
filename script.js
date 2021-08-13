/*ACE card variation
Found on https://stackoverflow.com/questions/4689856/how-to-change-value-of-object-which-is-inside-an-array-using-javascript-or-jquer
*/

/*Rules:
1) Player hits 21 = instant win
2) Dealer/Player +1 card if hand <17
3) Ace = 1 or 11
4) player vs. dealer, whoever is closest to 21 is the winner
5) >21 = bust
*/

gameDeck = [];
playerHand = []; //Cards player has
pTotal = 0; //Sum of cards
compHand = []; //Cards COMPUTER has
cTotal = 0; //Sum of cards
playerName = [];
playerPoints = 100;
pot = 0;

/*Modes
0a - Welcome, name save
0b - Player bets, initial draw phase
1 - player action
2 - COMP action
3 - Determine winner
*/
currentMode = "0a";

//Creating deck
var mainDeck = function () {
  cardDeck = [];
  var cardSuits = ["♦️", "♣️", "♥️", "♠️"];

  //Outer loop: assigns suits
  for (suitsIndex = 0; suitsIndex < cardSuits.length; suitsIndex += 1) {
    var currentSuit = cardSuits[suitsIndex];

    //Inner Loop 1: Creating the number cards
    for (counter = 2; counter <= 11; counter += 1) {
      var cardNumber = counter;
      if (cardNumber == 11) {
        cardNumber = "Ace";
      }
      var cardAttributes = {
        name: cardNumber,
        suit: currentSuit,
        rank: counter,
      };

      //Add card to main deck
      cardDeck.push(cardAttributes);
    }
    //Inner Loop 2: Ensuring JQK have rank of 10
    for (i = 0; i < 3; i += 1) {
      var pictureCard = i;
      if (pictureCard == 0) {
        pictureCard = "Jack";
      }
      if (pictureCard == 1) {
        pictureCard = "Queen";
      }
      if (pictureCard == 2) {
        pictureCard = "King";
      }
      var cardAttributes = {
        name: pictureCard,
        suit: currentSuit,
        rank: 10,
      };
      //Add card to main deck
      cardDeck.push(cardAttributes);
    }
  }
  return cardDeck;
};

//Shuffle function
var shuffle = function (cardDeck) {
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//Shuffle the deck, push to gameDeck[]
var shuffleTheDeck = function () {
  gameDeck = shuffle(mainDeck());
  console.log(`Game Deck:`);
  console.log(gameDeck);
};

//Display card properly in output to player
var greyBoxCardOutput = function (playerHand, compHand) {
  var playerOutputValue = "Your cards are:";
  for (i = 0; i < playerHand.length; i += 1) {
    playerOutputValue += `<br/>` + playerHand[i].name + playerHand[i].suit;
  }
  var compOutputValue = "The dealer's cards are:";
  for (i = 0; i < compHand.length; i += 1) {
    compOutputValue += `<br/>` + compHand[i].name + compHand[i].suit;
  }
  console.log(`Showing player their hand`);
  return (
    playerOutputValue +
    `<br/>Your total count: ${pTotal}` +
    `<br/><br/>` +
    compOutputValue +
    `<br/>Dealer's total count: ${cTotal}`
  );
  // + compOutputValue + `<br/><br/>`;
};

//Initial function - mode 0
var initialDraw = function () {
  for (i = 0; i < 2; i += 1) {
    var compCard = gameDeck.pop();
    compHand.push(compCard);
    var playerCard = gameDeck.pop();
    playerHand.push(playerCard);
  }
  console.log(`Cards pushed.`);
  console.log(`Player Hand: `);
  console.log(playerHand);
  console.log(`COMPUTER Hand: `);
  console.log(compHand);
};

//Ace points changer. Faith helped!
var aceChange = function (pasteInHandType) {
  if (pasteInHandType.length > 2) {
    for (var i in pasteInHandType) {
      if (pasteInHandType[i].name == "Ace") {
        pasteInHandType[i].rank = 1;
        break; //Stops loops once found
      }
    }
  }
};

//Calculating player score
var playerScore = function () {
  aceChange(playerHand);
  var pSum = 0;
  for (iTot = 0; iTot < playerHand.length; iTot += 1) {
    pSum += Number(playerHand[iTot].rank);
  }
  console.log(`Player card score: ` + pSum);
  pTotal = pSum;
  console.log(`Player hand: `);
  console.log(playerHand);
};

//Calculating COMP score
var compScore = function () {
  aceChange(compHand);
  var cSum = 0;
  for (iTot = 0; iTot < compHand.length; iTot += 1) {
    cSum += Number(compHand[iTot].rank);
  }
  console.log(`COMP card score: ` + cSum);
  cTotal = cSum;
  console.log(`COMP hand: `);
  console.log(compHand);
};

//Player adds cards - mode 1
var playerAction = function (input) {
  console.log(`-Current mode: ` + currentMode);
  playerScore();
  if (input == "stay") {
    currentMode = 2;
    console.log(`Mode changed to: ` + currentMode);
    myOutputValue = `You have decided to keep your hand. Please click SUBMIT for the next player's turn.`;
  } else if (input == "") {
    var playerCard = gameDeck.pop();
    playerHand.push(playerCard);
    var playerOutputValue = "Your cards are:";
    for (i = 0; i < playerHand.length; i += 1) {
      playerOutputValue += `<br/>` + playerHand[i].name + playerHand[i].suit;
    }
    console.log(`CHECK MODE: ` + currentMode);
    console.log(`>>Player added card.`);
    playerScore();
    myOutputValue =
      playerOutputValue +
      `<br><br>Total count: ${pTotal}<br><br>Would you like to stay as you are or add an additional card? Click SUBMIT to add a card, or enter 'stay' to finish your turn.`;
  }
  compScore();
  return myOutputValue;
};

//COMP adds cards - mode 2
var compAction = function () {
  console.log(`CHECK MODE: ` + currentMode);
  console.log(`COMP card score: ` + cTotal);
  while (cTotal <= 17) {
    var compCard = gameDeck.pop();
    compHand.push(compCard);
    console.log(`>>COMPUTER added card.`);
    compScore(); //Necessary for pushing new score to cTotal global variable
  }
  cTotal += 1;
  if (cTotal > 17) {
    currentMode = 3;
    console.log(`Mode changed to: ` + currentMode);
    return `The dealer has finished their action! Click SUBMIT to determine the winner!`;
  }
};
/* for (i=cTotal; cTotal<=17; i+=1){
  var compCard = gameDeck.pop();
    compHand.push(compCard);
    console.log(`>>COMPUTER added card.`);
    compScore();
}
*/

//Function to calculate points won because I'm lazy
var win = function (multiplier) {
  playerPoints = playerPoints + Number(pot) * Number(multiplier);
  return `You've won ${pot} points! ${playerName}'s points: ${playerPoints}<br><br>`;
};

//Function to calculate points lost because I'm lazy
var lose = function (multiplier) {
  playerPoints = playerPoints - Number(pot) * Number(multiplier);
  return `You've lost ${pot} points! ${playerName}'s points: ${playerPoints}<br><br>`;
};

//Determination - mode 3
var determineWinner = function () {
  var playAgainStatement = `<br><br>If you would like to play another round, please place your bet!`;
  if (pTotal == cTotal) {
    return (
      `You draw with the dealer's hand of ${cTotal}!<br><br>` +
      greyBoxCardOutput(playerHand, compHand) +
      playAgainStatement
    );
  } else if (pTotal == 21 && cTotal !== 21) {
    var myOutputValue = win(1);
    myOutputValue =
      myOutputValue +
      `Your hand of ${pTotal} won and ${pot} points have been added to your bag! The dealer had a hand of ${cTotal}.<br><br>` +
      greyBoxCardOutput(playerHand, compHand) +
      playAgainStatement;
    return myOutputValue;
  } else if (cTotal == 21 && pTotal !== 21) {
    var myOutputValue = lose(1);
    myOutputValue =
      myOutputValue +
      `Your hand of ${pTotal} lost to the dealer's ${cTotal}!<br><br>` +
      greyBoxCardOutput(playerHand, compHand) +
      playAgainStatement;
    return myOutputValue;
  } else if (cTotal < 21 && pTotal > 21) {
    var myOutputValue = lose(1);
    myOutputValue =
      myOutputValue +
      `Your hand of ${pTotal} went bust! The dealer wins with a hand of ${cTotal}!<br><br>` +
      greyBoxCardOutput(playerHand, compHand) +
      playAgainStatement;
    return myOutputValue;
  } else if (pTotal > cTotal && pTotal <= 21) {
    var myOutputValue = win(1);
    myOutputValue =
      myOutputValue +
      `Congratulations! Your hand of ${pTotal} beat the dealer's hand of ${cTotal}!<br><br>` +
      greyBoxCardOutput(playerHand, compHand) +
      playAgainStatement;
    return myOutputValue;
  } else if (pTotal > 21 && cTotal > 21) {
    var myOutputValue = `${playerName}'s points: ${playerPoints}<br><br>`;
    myOutputValue =
      myOutputValue +
      `Both parties are bust! Your hand: ${pTotal}. Dealer's hand: ${cTotal}<br><br>` +
      greyBoxCardOutput(playerHand, compHand) +
      playAgainStatement;
    return myOutputValue;
  } else if (pTotal < cTotal && cTotal > 21) {
    var myOutputValue = win(1);
    myOutputValue =
      myOutputValue +
      `You win! Your hand of ${pTotal} beat the dealer's hand of ${cTotal}!<br><br>` +
      greyBoxCardOutput(playerHand, compHand) +
      playAgainStatement;
    return myOutputValue;
  } else if (pTotal < cTotal && cTotal <= 21) {
    var myOutputValue = lose(1);
    myOutputValue =
      myOutputValue +
      `Your hand of ${pTotal} lost to the dealer's hand of ${cTotal}!<br><br>` +
      greyBoxCardOutput(playerHand, compHand) +
      playAgainStatement;
    return myOutputValue;
  }
};

//Resets everything but player points
var gameReset = function (input) {
  playerHand = []; //Reset player hand
  console.log(`Resetting playerHand. Player hand: `);
  console.log(playerHand);
  pTotal = 0; //Reset sum of cards
  console.log(`Player count: ${pTotal}`);
  compHand = []; //Reset player hand
  console.log(`Resetting compHand. COMP hand: `);
  console.log(compHand);
  cTotal = 0; //Reset sum of cards
  console.log(`COMP count: ${cTotal}`);
};

//Main function
var main = function (input) {
  console.log(`>>>>Program start`);
  console.log(`Current Mode: ` + currentMode);
  if (currentMode == 3) {
    myOutputValue = determineWinner();
    if (currentMode == 3 && input !== "") {
      gameReset(input);
      currentMode = "0b";
    }
  }
  if (currentMode == 2) {
    myOutputValue = compAction();
  }
  if (currentMode == 1) {
    myOutputValue = playerAction(input);
  }
  if (currentMode == "0b") {
    pot = input;
    shuffleTheDeck();
    initialDraw();
    playerScore();
    var betSaved = `Okay ${playerName}, your bet of ${input} points has been saved. <br><br>`;
    var playerOutputValue = "Your cards are:";
    for (i = 0; i < playerHand.length; i += 1) {
      playerOutputValue += `<br/>` + playerHand[i].name + playerHand[i].suit;
    }
    myOutputValue =
      betSaved +
      playerOutputValue +
      `<br><br>Total count: ${pTotal}<br><br>Would you like to stay as you are or add an additional card? Click SUBMIT to add a card, or enter 'stay' to finish your turn.`;
    currentMode = 1;
    console.log(`Mode changed to: ` + currentMode);
  }
  if (currentMode == "0a") {
    if (input == "help" || input == "Help") {
      return `Welcome to the help page. You may SUBMIT your name at any time to begin!<br><br>HOW TO PLAY:<br />1) Players must
        either beat the dealer's hand, OR, get 21 with two cards<br />2) Players
        first place a bet, and then are dealt their cards.<br />3) Players may
        choose to draw more cards, or stay at however many cards they have.<br />4)
        WIN: you are given the amount you bet. LOSE: you lose your bet. DRAW: no
        change in points.<br /><br />SETUP:<br />1) Each player starts with two
        cards and 100 points.<br />2) The points do not replenish when a new
        round starts.<br />3) Aces can count as either 1 or 11, but only 1 if
        your hand has 3 cards or more.<br /><br />SPECIAL SCORING!<br />1) If
        your hand has 5 cards and you are less-than or equal-to 21, you win
        extra!<br />2) If you hit 21 with three cards of 7, you win 7x your
        bid!<br />3) If you start with a winning hand of Ace and a card that
        equals 10, you win double your bid!`;
    } else playerName.push(input);
    currentMode = "0b";
    console.log(`Player name saved: ${playerName}`);
    console.log(`Mode changed: ${currentMode}`);
    return `Hello ${playerName}. Please place your bet!<br/><br/>You have ${playerPoints} points.`;
  }
  console.log("<<<<Program end");
  return myOutputValue;
};
