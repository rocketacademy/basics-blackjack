var userName = "";
var gameMode = "initiate name";
var playerHand = [];
var computerHand = [];
var totalPlayerHand = 0;
var totalComputerHand = 0;

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var suitEmoji;
    if (currentSuit == "hearts") {
      suitEmoji = "♥️";
    } else if (currentSuit == "diamonds") {
      suitEmoji = "♦️";
    } else if (currentSuit == "clubs") {
      suitEmoji = "♣";
    } else if (currentSuit == "spades") {
      suitEmoji = "♠";
    }
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // create an emoji variable to store the emoji for each card
      var nameEmoji;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        nameEmoji = "🅰️";
      } else if (cardName == 2) {
        nameEmoji = "2️⃣";
      } else if (cardName == 3) {
        nameEmoji = "3️⃣";
      } else if (cardName == 4) {
        nameEmoji = "4️⃣";
      } else if (cardName == 5) {
        nameEmoji = "5️⃣";
      } else if (cardName == 6) {
        nameEmoji = "6️⃣";
      } else if (cardName == 7) {
        nameEmoji = "7️⃣";
      } else if (cardName == 8) {
        nameEmoji = "8️⃣";
      } else if (cardName == 9) {
        nameEmoji = "9️⃣";
      } else if (cardName == 10) {
        nameEmoji = "🔟";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
        nameEmoji = "👸";
      } else if (cardName == 13) {
        cardName = "king";
        nameEmoji = "🤴";
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        cardemoji: nameEmoji,
        suitEmoji: suitEmoji,
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

// Get a random index ranging from 0 (inclusive) to max (exclusive). <- For shuffle
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
// Function to shuffle deck
var shuffleCards = function () {
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
var cardDeck = makeDeck();
console.log(cardDeck);

// create a function to show player hand//

var main = function (input) {
  var myOutputValue = "";
  var showComputerHand = "";
  var showPlayerHand = "";
  var totalPlayerHand = 0;
  var totalComputerHand = 0;

  var shuffledDeck = shuffleCards(makeDeck());
  if (input == "" && gameMode == "initiate name") {
    return `Let's begin blackjack. Type 'start game' to draw your first card`;
  }

  //player and computer draws their first card.Initiate start game//
  gameMode = "start game";

  if (input == "start game") {
    gameMode == "startgame";
    var playerFirstCard = shuffledDeck.pop();
    playerHand.push(playerFirstCard);
    var computerFirstCard = shuffledDeck.pop();
    computerHand.push(computerFirstCard);
    console.log("player first card");
    console.log(playerHand);
    console.log("computer first card");
    console.log(computerHand);
    return `You drew ${playerHand[0].cardemoji} of ${playerHand[0].suitEmoji}. The total value of your hand is ${playerHand[0].rank}. The computer drew ${computerHand[0].cardemoji} of ${computerHand[0].suitEmoji}. The value of the computer hand is ${computerHand[0].rank}.<br><br> Type 'draw 2nd card' to draw another card.`;
  }

  gameMode = "roundtwo";

  if (input == "draw 2nd card" && gameMode == "roundtwo") {
    var playerSecondCard = shuffledDeck.pop();
    playerHand.push(playerSecondCard);
    var computerSecondCard = shuffledDeck.pop();
    computerHand.push(computerSecondCard);
    console.log("player second card");
    console.log(playerHand);
    console.log("computer secondcard");
    console.log(computerHand);

    return `You drew ${playerHand[1].cardemoji} of ${playerHand[1].suitEmoji}. Your previous card was ${playerHand[0].cardemoji} of ${playerHand[0].suitEmoji}. The computer second card is faced down. Do you want to draw another card? Type 'yes' or 'no'.`;
  }
  gameMode = "endgame";
  showPlayerHand = `${playerHand[0].cardemoji} of ${playerHand[0].suitEmoji}, ${playerHand[0].cardemoji} of ${playerHand[1].suitEmoji}`;
  console.log("show player hand after 2 cards");
  console.log(showPlayerHand);
  showComputerHand = `${computerHand[0].cardemoji} of ${computerHand[0].suitEmoji}, ${computerHand[0].cardemoji} of ${computerHand[1].suitEmoji}`;

  totalPlayerHand = Number(playerHand[0].rank) + Number(playerHand[1].rank);
  totalComputerHand =
    Number(computerHand[0].rank) + Number(computerHand[1].rank);

  // if player chooses no assess the winning conditions//
  if (input == "no") {
    if (
      totalPlayerHand == 21 ||
      totalPlayerHand > totalComputerHand ||
      totalComputerHand > 21
    ) {
      gameMode = "gameover";
      return ` The computer cards are ${computerHand[0].cardemoji} of ${computerHand[0].suitEmoji} and ${computerHand[1].cardemoji} of ${computerHand[1].suitEmoji}. <br><br> Your cards are ${playerHand[0].cardemoji} of ${playerHand[0].suitEmoji} and ${playerHand[1].cardemoji} of ${playerHand[1].suitEmoji}.<br><br>  Lucky you, you win! Thanks for playing the game ❤️. `;
    } else if (totalPlayerHand > 21 || totalPlayerHand < totalComputerHand) {
      return `The computer cards are ${computerHand[0].cardemoji} of ${computerHand[0].suitEmoji} and ${computerHand[1].cardemoji} of ${computerHand[1].suitEmoji}. <br><br> Your cards are ${playerHand[0].cardemoji} of ${playerHand[0].suitEmoji} and ${playerHand[1].cardemoji} of ${playerHand[1].suitEmoji}. <br><br> You scored lower than the computer. Thanks for playing, try again.😞`;
    } else if (totalComputerHand == 21) {
      return `unforch, the computer scored blackjack - cards are ${computerHand[0].cardemoji} of ${computerHand[0].suitEmoji} and ${computerHand[1].cardemoji} of ${computerHand[1].suitEmoji}.  `;
    }
  }
  //if player chooses yes, shuffle and play another card//
  gameMode = "roundthree";

  if (input == "yes") {
    gameMode = "roundthree";
    var playerThirdCard = shuffledDeck.pop();
    playerHand.push(playerThirdCard);
    console.log(totalPlayerHand);
    playerThirdCard = `${playerHand[2].cardemoji} of ${playerHand[2].suitEmoji}`;
    console.log("player third card");
    console.log(playerThirdCard);
    showPlayerHand = showComputerHand + playerThirdCard + "";
    console.log("showplayerhand");
    console.log(showPlayerHand);
    totalPlayerHand += Number(playerHand[2].rank);
    console.log("curr total value of player hand");
    if (totalPlayerHand < 16) {
      return `you drew ${showPlayerHand}. Type either 'hell yes' or 'nope' to draw again.`;
    } else if (totalPlayerHand > 16 && totalPlayerHand < 21) {
      return ` you are at ${showPlayerHand}. You shouldn't draw again. Computer's turn. Type 'computer's turn'.`;
    } else if (totalPlayerHand == 21) {
      return ` you drew ${showPlayerHand}."" Blackjack!`;
    }
    if (totalPlayerHand > 21) {
      return `You have drawn a value of ${totalPlayerHand}. You bust! It's computer's turn to draw. Type 'computer's turn'.`;
    }
  }
  gameMode = "round four";
  if (input == "nope") {
    gameMode = "round four";
    if (totalPlayerHand > totalComputerHand) {
      return ` The computer cards are ${showComputerHand}. Your cards are ${showPlayerHand} <br><br>  Lucky you, you win! Thanks for playing the game ❤️. `;
    } else if (totalPlayerHand < totalComputerHand) {
      return `The computer cards are ${showComputerHand}. Your cards are ${showPlayerHand} <br><br>. You scored lower than the computer. Thanks for playing, try again.😞`;
    } else if (totalComputerHand == 21) {
      return `unforch, the computer scored blackjack - cards are ${showComputerHand}.`;
    }
  }

  gameMode = "computerturn";
  if (input == `computer's turn` && totalComputerHand < 21) {
    var computerThirdCard = shuffledDeck.pop();
    computerHand.push(computerThirdCard);
    computerThirdCard = `${computerHand[2].cardemoji} of ${computerHand[2].suitEmoji}`;
    console.log("computer third card");
    console.log(computerThirdCard);
    showComputerHand += computerThirdCard + "";
    console.log("showcomputerhand");
    console.log(showComputerHand);
    totalComputerHand += Number(computerHand[2].rank);
    console.log("total computer hand");
    console.log(totalComputerHand);
    if (totalComputerHand < 16) {
      myOutputValue = `Computer draws again. Click enter`;
    } else if (totalComputerHand > 16 && totalComputerHand < 21) {
      myOutputValue = ` Computer has  ${showComputerHand}. It will stop drawing. Type 'end game' to see who wins`;
    } else if (totalComputerHand == 21) {
      myOutputValue = ` Computer drew ${showComputerHand}. Blackjack! Computer wins!`;
    }
    if (totalComputerHand > 21) {
      myOutputValue = `Computer drew ${showComputerHand} with a value of ${totalComputerHand}. It bust!`;
    }
    return myOutputValue;
  }
  gameMode = "round five";
  if (input == "end game") {
    gameMode = "round five";
    computerThirdCard = `${computerHand[2].cardemoji} of ${computerHand[2].suitEmoji}`;
    showComputerHand += computerThirdCard + "";
    totalComputerHand += Number(computerHand[2].rank);
    playerThirdCard = `${playerHand[2].cardemoji} of ${playerHand[2].suitEmoji}`;
    showPlayerHand += playerThirdCard + "";
    totalPlayerHand += Number(playerHand[2].rank);
    if (totalPlayerHand > totalComputerHand) {
      return ` The computer cards are ${showComputerHand}. Your cards are ${showPlayerHand} <br><br>  Lucky you, you win! Thanks for playing the game ❤️. `;
    } else if (totalPlayerHand < totalComputerHand) {
      return `he computer cards are ${showComputerHand}. Your cards are ${showPlayerHand} <br><br>. You scored lower than the computer. Thanks for playing, try again.😞`;
    } else if (totalComputerHand == 21) {
      return `unforch, the computer scored blackjack - cards are ${showComputerHand}.`;
    }
  }
};
