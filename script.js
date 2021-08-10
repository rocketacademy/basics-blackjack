/*ACE card variation
Found on https://stackoverflow.com/questions/4689856/how-to-change-value-of-object-which-is-inside-an-array-using-javascript-or-jquer

var aceChange = function(){
if((playerHand.length||compHand.length)>2){
for (var i in (playerHand||compHand)) {
     if ((playerHand.cardAttributes[i].name||compHand.cardAttributes[i].name) == "Ace") {
        playerHand.cardAttributes[i].rank = 1;
        compHand.cardAttributes[i].rank = 1;
        break; //Stops loops once found
     }
   }
  }
}
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

/*Modes
0 - initial draw phase
1 - player action
2 - COMP action
3 - Determine winner
*/
currentMode = 0;

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
  return playerOutputValue + `<br/><br/>`;
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

//Ace points changer
var aceChange = function (pasteInHandType) {
  if (pasteInHandType.length > 2) {
    for (var i in pasteInHandType) {
      if (pasteInHandType.cardAttributes[i].name == "Ace") {
        pasteInHandType.cardAttributes[i].rank = 1;
        break; //Stops loops once found
      } else return false;
    }
  }
};

//Calculating player score
var playerScore = function () {
  //Player score
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
    myOutputValue = `You have decided to keep your hand. Please click SUBMIT for the dealer to have their turn.`;
  } else if (input == "") {
    var playerCard = gameDeck.pop();
    playerHand.push(playerCard);
    var myOutputValue = greyBoxCardOutput(playerHand, compHand);
    console.log(`CHECK MODE: ` + currentMode);
    console.log(`>>Player added card.`);
    myOutputValue =
      myOutputValue +
      `Would you like to stay as you are or add an additional card? Click SUBMIT to add a card, or enter 'stay' to finish your turn.`;
    playerScore();
  }
  compScore();
  return myOutputValue;
};

//COMP adds cards - mode 2
var compAction = function () {
  console.log(`CHECK MODE: ` + currentMode);
  if (cTotal > 17) {
    currentMode = 3;
    console.log(`Mode changed to: ` + currentMode);
    return `The dealer has decided to stand! Click SUBMIT to determine the winner!`;
  } else if (cTotal <= 17) {
    var compCard = gameDeck.pop();
    compHand.push(compCard);
    console.log(`>>COMPUTER added card.`);
    compScore(); //Necessary for pushing new score to cTotal[] global variable
    return `The dealer added a card to their hand. Please click SUBMIT.`;
  }
};

//Determination - mode 3
var determineWinner = function () {
  if (pTotal == cTotal) {
    return `You draw with the dealer's hand of ${cTotal}!`;
  } else if (pTotal == 21 && cTotal !== 21) {
    return `Your hand of ${pTotal} won! The dealer had a hand of ${cTotal}.`;
  } else if (cTotal == 21 && pTotal !== 21) {
    return `Your hand of ${pTotal} lost to the dealer's ${cTotal}!`;
  } else if (pTotal > cTotal && pTotal <= 21) {
    return `Congratulations! Your hand of ${pTotal} beat the dealer's hand of ${cTotal}!`;
  } else if (pTotal > 21 && cTotal > 21) {
    return `Both parties are bust! Your hand: ${pTotal}. Dealer's hand: ${cTotal}`;
  } else if (pTotal < cTotal && cTotal > 21) {
    return `The dealer went bust! Your hand of ${pTotal} beat the dealer's hand of ${cTotal}!`;
  } else if (pTotal < cTotal && cTotal <= 21) {
    return `Your hand of ${pTotal} lost to the dealer's hand of ${cTotal}!`;
  }
};

//Main function
var main = function (input) {
  console.log(`>>>>Program start`);
  console.log(`Current Mode: ` + currentMode);
  if (currentMode == 3) {
    myOutputValue = determineWinner();
  }
  if (currentMode == 2) {
    myOutputValue = compAction();
  }
  if (currentMode == 1) {
    myOutputValue = playerAction(input);
  }
  if (currentMode == 0) {
    shuffleTheDeck();
    initialDraw();
    var myOutputValue = greyBoxCardOutput(playerHand, compHand);
    myOutputValue =
      myOutputValue +
      `Would you like to stay as you are or add an additional card? Click SUBMIT to add a card, or enter 'stay' to finish your turn.`;
    currentMode = 1;
    console.log(`Mode changed to: ` + currentMode);
  }
  console.log("<<<<Program end");
  return myOutputValue;
};
