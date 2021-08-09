/*Rules:
1) Player hits 21 = instant win
2) Dealer/Player +1 card if hand <17
3) Ace = 1 or 11
4) player vs. dealer, whoever is closest to 21 is the winner
5) >21 = bust
*/

//Creating the deck

gameDeck = [];
playerHand = [];
compHand = [];

/*Modes
0 - initial draw phase
1 - player draws
2 - COMP draws
3 - Compare
*/
currentMode = 3;

var mainDeck = function () {
  cardDeck = [];
  var cardSuits = ["♦️", "♣️", "♥️", "♠️"];

  //Outer loop: assigns suits
  for (suitsIndex = 0; suitsIndex < cardSuits.length; suitsIndex += 1) {
    var currentSuit = cardSuits[suitsIndex];

    //Inner Loop 1: Creating the number cards
    for (counter = 1; counter <= 10; counter += 1) {
      var cardNumber = counter;
      if (cardNumber == 1) {
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
    for (i = 11; i <= 13; i += 1) {
      var pictureCard = i;
      if (pictureCard == 11) {
        pictureCard = "Jack";
      }
      if (pictureCard == 12) {
        pictureCard = "Queen";
      }
      if (pictureCard == 13) {
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

//Shuffle the deck
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

//Initial function - 0
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

// //Summation of card ranks
// var totalHandRank = function (playerHand, compHand) {
//   //Player card power
//   var pTotal = 0;
//   for (iTot = 0; iTot < playerHand.length; iTot += 1) {
//     pTotal += Number(playerHand[iTot].rank);
//   }
//   console.log(`The sum of the player's cards is ` + pTotal);
//   //COMP card power
//   var cTotal = 0;
//   for (iTot = 0; iTot < compHand.length; iTot += 1) {
//     cTotal += Number(compHand[iTot].rank);
//   }
//   console.log(`The sum of the COMPS's cards is ` + cTotal);
// };

//Player adds cards - 1
var playerAddsCards = function (input) {};

//COMP adds cards - 2

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
  return playerOutputValue + `<br/><br/>` + compOutputValue + `<br/><br/>`;
};

//Determination
var determineWinner = function () {
  var pTotal = 18;
  var cTotal = 20;
  //Calculating player card power
  for (iTot = 0; iTot < playerHand.length; iTot += 1) {
    pTotal += Number(playerHand[iTot].rank);
  }
  console.log(`The sum of the player's cards is ` + pTotal);
  //Calculating COMP card power
  for (iTot = 0; iTot < compHand.length; iTot += 1) {
    cTotal += Number(compHand[iTot].rank);
  }
  console.log(`The sum of the COMPS's cards is ` + cTotal);
  //Output statements
  if (pTotal == cTotal) {
    return `You draw with the dealer's hand of ${cTotal}!`;
  } else if (pTotal == 21 && cTotal !== 21) {
    return `BLACKJACK! Your hand of ${pTotal} won! The dealer had a hand of ${cTotal}.`;
  } else if (cTotal == 21 && pTotal !== 21) {
    return `Your hand of ${pTotal} lost to the dealer's ${cTotal}!`;
  } else if (pTotal > cTotal && pTotal <= 21) {
    return `Congratulations! Your hand of ${pTotal} beat the dealer's hand of ${cTotal}!`;
  } else if (pTotal < cTotal && cTotal <= 21) {
    return `Your hand of ${pTotal} lost to the dealer's hand of ${cTotal}!`;
  }
};

//Main function
var main = function (input) {
  if (currentMode == 0) {
    shuffleTheDeck();
    initialDraw();
    // totalHandRank(playerHand, compHand);
    var myOutputValue = greyBoxCardOutput(playerHand, compHand);
    myOutputValue =
      myOutputValue +
      `Would you like to stay as you are or add an additional card? Type 'stay' or 'hit'.`;
  }
  if (currentMode == 3) {
    var myOutputValue = determineWinner();
  }
  return myOutputValue;
};
