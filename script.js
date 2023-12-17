var gameMode1 = "Compare initial hands";
var gameMode2 = "Player hit or stand";
var gameMode3 = "Dealer hit or stand";
var currentGameMode = gameMode1;

var cardDeck = [];
var playerArray = [];
var dealerArray = [];

var makeDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  // Use more emoji
  var suits = ["♥️", "♦️", "♣️", "♠️"];

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
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "🃏";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
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

var calcHandValue = function (array) {
  var value = 0;
  var index = 0;
  // no of cards = how many times the loop runs
  while (index < array.length) {
    var latestCard = array[index];
    // queen king jack values = 10
    if (
      latestCard.name == "Queen" ||
      latestCard.name == "King" ||
      latestCard.name == "🃏"
    ) {
      value = value + 10;
      //ace value = 11 if <=21
    } else if (latestCard.name == "Ace" && value < 20) {
      value = value + 11;
    } else {
      //the rest: = rank number
      value = value + latestCard.rank;
    } //last line of while loop: increment index
    index = index + 1;
  }
  return value;
};

// display the player's hand
var showPlayerHand = function (playerArray) {
  message = "Your Hand: <br>";
  index = 0;
  while (index < playerArray.length) {
    message =
      message +
      playerArray[index].name +
      " of " +
      playerArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return message;
};

// dealer's full hand only to be shown upon results generation
var showDealerHand = function (dealerArray) {
  message = "Dealer Hand: <br>";
  index = 0;
  while (index < dealerArray.length) {
    message =
      message +
      dealerArray[index].name +
      " of " +
      dealerArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return message;
};

//Edit game logic such that the player is only told one of the dealer's first two cards.
var showDealerHandWithCoveredCard = function (dealerArray) {
  // reserve space to display covered card
  message = "Dealer Hand: <br>🫥 Covered card 🫥<br>";
  // skip the first card [0] and start at [1]
  index = 1;
  while (index < dealerArray.length) {
    message =
      message +
      dealerArray[index].name +
      " of " +
      dealerArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return message;
};

var main = function (input) {
  var myOutputValue = "";
  if (currentGameMode == gameMode1) {
    cardDeck = shuffleCards(makeDeck());
    playerArray.push(cardDeck.pop());
    playerArray.push(cardDeck.pop());
    dealerArray.push(cardDeck.pop());
    dealerArray.push(cardDeck.pop());
    console.log("deal cards");
    var playerValue = calcHandValue(playerArray);
    var dealerValue = calcHandValue(dealerArray);
    var showHandsAndValue =
      showPlayerHand(playerArray) +
      calcHandValue(playerArray) +
      "<br><br>" +
      showDealerHand(dealerArray) +
      calcHandValue(dealerArray);
    console.log("hands: ", showHandsAndValue);
    if (playerValue == 21 && dealerValue != 21) {
      console.log("P win");
      var cheeringSanta =
        '<img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlpOXNxdXByZnF6c3BocGttOHF5NzF2eWY4djdlcXhmd29yN3QwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/wuMue3qGESHbrM8ps9/giphy.gif"/>';
      myOutputValue =
        showHandsAndValue +
        "<br>You won! Click ♠️♥️♣️♦️ to play again.<br>" +
        cheeringSanta;
      playerArray = [];
      dealerArray = [];
      currentGameMode = gameMode1;
      return myOutputValue;
    }
    if (playerValue == 21 && dealerValue == 21) {
      console.log("tie");
      var heartSanta =
        '<img src="https://media2.giphy.com/media/m8XKBTQdYrvbj7dTXX/200w.webp?cid=ecf05e47wxxds42erx8xo7804e39xbd229viz0sound7bbnv&ep=v1_gifs_related&rid=200w.webp&ct=s"/>';
      myOutputValue =
        showHandsAndValue +
        "<br>Its a tie. Click ♠️♥️♣️♦️ to play again.<br>" +
        heartSanta;
      playerArray = [];
      dealerArray = [];
      currentGameMode = gameMode1;
      return myOutputValue;
    } else {
      currentGameMode = gameMode2;
      var chimneySanta =
        '<img src="https://media3.giphy.com/media/6LWgndjhVe1HTb0pQi/200w.webp?cid=ecf05e472if9q1t6kike3whspu7s0v3prrjn93zr0leml8r4&ep=v1_gifs_related&rid=200w.webp&ct=g"/>';
      // keep first card covered
      // also cover dealer hand value
      myOutputValue =
        showPlayerHand(playerArray) +
        calcHandValue(playerArray) +
        "<br><br>" +
        showDealerHandWithCoveredCard(dealerArray) +
        "<br><br> Were you naughty or nice this year? <br>" +
        chimneySanta;
    }
    return myOutputValue;
  }
  //The player hitting or standing is a new mode in the game that allows the player to enter their choice
  if (currentGameMode == gameMode2) {
    if (input == "h") {
      playerArray.push(cardDeck.pop());
      var dealerHandValue = calcHandValue(dealerArray);
      var playerHandValue = calcHandValue(playerArray);
      if (playerHandValue > 21) {
        currentGameMode = gameMode3;
        // The player should not immediately lose if he busts - there is a possibility he will tie with the dealer if the dealer also busts.
        // logic for when the player busts (has a total score of >21).
        myOutputValue =
          showPlayerHand(playerArray) +
          playerHandValue +
          "<br><br>" +
          showDealerHandWithCoveredCard(dealerArray) +
          "<br><br> You bust. Click ♠️♥️♣️♦️ to see results.";
      } else {
        myOutputValue =
          showPlayerHand(playerArray) +
          playerHandValue +
          "<br><br>" +
          showDealerHandWithCoveredCard(dealerArray) +
          "<br> Were you naughty or nice this year? ";
      }
    } else if (input == "s") {
      currentGameMode = gameMode3;
      myOutputValue = "Dealer's turn now. Click ♠️♥️♣️♦️ to see results.";
    }
    return myOutputValue;
  }
  //The rules state that the dealer hits after the player is done.
  if (currentGameMode == gameMode3) {
    var dealerHandValue = calcHandValue(dealerArray);
    while (dealerHandValue < 17) {
      dealerArray.push(cardDeck.pop());
      dealerHandValue = calcHandValue(dealerArray);
    }
    var playerHandValue = calcHandValue(playerArray);
    var showHandsAndValue =
      showPlayerHand(playerArray) +
      calcHandValue(playerArray) +
      "<br><br>" +
      showDealerHand(dealerArray) +
      calcHandValue(dealerArray);
    if (dealerHandValue > 21 && playerHandValue > 21) {
      var presentpresentSanta =
        '<img src= "https://media1.giphy.com/media/Stuz0v7wzyUvaqzvst/giphy.gif?cid=ecf05e470qdw6zv5ah0l0mlfx5y4m2twko27w7k2pbz5ou32&ep=v1_gifs_related&rid=giphy.gif&ct=s"/>';
      myOutputValue =
        showHandsAndValue +
        "<br><br>Its a tie, both bust. Click ♠️♥️♣️♦️ to play again!<br>" +
        presentpresentSanta;
    } else if (dealerHandValue > 21 && playerHandValue <= 21) {
      var pointingSanta =
        '<img src= "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXhjZGI0dzNlZXdscHNxeG4xdGRtbW05a3ZuN2F4ZGJsdzNqcGgzdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/aJehSiEgLb76Dikq7T/giphy.gif"/>';
      myOutputValue =
        showHandsAndValue +
        "<br><br>Dealer bust. You won! Click ♠️♥️♣️♦️ to play again!<br>" +
        pointingSanta;
    } else if (playerHandValue > 21 && dealerHandValue <= 21) {
      var disapprovingSanta =
        '<img src= "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTljYnY5NmZ5aTFldm8wams1cDFnbDdqa3M4bWU4ZjhndTZ2dm84cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/zsa730TRwOF8O4UoAJ/giphy.gif"/>';
      myOutputValue =
        showHandsAndValue +
        "<br><br>You bust. Dealer won. Click ♠️♥️♣️♦️ to play again!<br>" +
        disapprovingSanta;
    } else if (playerHandValue > dealerHandValue && playerHandValue <= 21) {
      var cheeringSanta =
        '<img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTk3MmR0eHNuem84bXZyaG1hejdiN2Jwa2h0bnc4cGw3Y2tqYm84eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/wuMue3qGESHbrM8ps9/giphy_s.gif"/>';
      myOutputValue =
        showHandsAndValue +
        "<br><br>You won! Click ♠️♥️♣️♦️ to play again!<br>" +
        cheeringSanta;
    } else if (playerHandValue < dealerHandValue && dealerHandValue <= 21) {
      var noNoSanta =
        '<img src= "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3Y3eTI2bGFlc3E4NDN6NTEyYXRwbGxzcDJ5c3l2Z2Y1ZTVuOGV5diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/N3eZflDS4BZvAC0Ai5/giphy.gif"/>';
      myOutputValue =
        showHandsAndValue +
        "<br><br>Dealer won. Click ♠️♥️♣️♦️ to play again!<br>" +
        noNoSanta;
    }
    playerArray = [];
    dealerArray = [];
    currentGameMode = gameMode1;
    return myOutputValue;
  }
};

// check sum and display
//loop through array
// display when player clicks 'hit'
// call this function in html
var hit = function () {
  console.log("hit is selected. card:" + cardDeck.pop);
  playerArray.push(cardDeck.pop());
  var dealerHandValue = calcHandValue(dealerArray);
  var playerHandValue = calcHandValue(playerArray);
  if (playerHandValue > 21) {
    currentGameMode = gameMode3;
    var knockingSanta =
      '<img src= "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmpnZ3hjbTg3ZWt2dmhkNjNhNWhzODN4bThrZmhtcHkwcjJ2aXF6ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Z0MMLLRmzNbfPHT4Gn/giphy.gif"/>';
    myOutputValue =
      showPlayerHand(playerArray) +
      playerHandValue +
      "<br><br>" +
      showDealerHandWithCoveredCard(dealerArray) +
      "<br><br> You bust. Click ♠️♥️♣️♦️ to see results.<br>" +
      knockingSanta;
  } else if (playerHandValue == 21) {
    var twoThumbsUpSanta =
      '<img src= "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW4xa2IxcGR1YjA0OGtmbXlwaHlrc3VsOWkwbDE1MTBvbnZ1eWQybiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VxylsapmBSnf01keYg/giphy.gif"/>';
    myOutputValue =
      showPlayerHand(playerArray) +
      playerHandValue +
      "<br><br>" +
      showDealerHand(dealerArray) +
      dealerHandValue +
      "<br><br> You won! Click ♠️♥️♣️♦️ to play again.<br>" +
      twoThumbsUpSanta;
    playerArray = [];
    dealerArray = [];
    currentGameMode = gameMode1;
  } else {
    var presentsSanta =
      '<img src= "https://media1.giphy.com/media/yP2MOlgfnip51GutHT/200w.webp?cid=ecf05e472if9q1t6kike3whspu7s0v3prrjn93zr0leml8r4&ep=v1_gifs_related&rid=200w.webp&ct=g"/>';
    myOutputValue =
      showPlayerHand(playerArray) +
      playerHandValue +
      "<br><br>" +
      showDealerHandWithCoveredCard(dealerArray) +
      "<br><br> Were you naughty or nice this year? <br>" +
      presentsSanta;
  }
  return myOutputValue;
};

// after player choose to stand, dealer will draw if hand value is below 17
// winner will be determined here so show dealer's full hand and dealer's hand value
// call this function in html to display when player clicks 'stand'
var stand = function () {
  console.log("stand is selected.");
  var myOutputValue = "";
  var dealerHandValue = calcHandValue(dealerArray);
  while (dealerHandValue < 17) {
    dealerArray.push(cardDeck.pop());
    dealerHandValue = calcHandValue(dealerArray);
  }
  var playerHandValue = calcHandValue(playerArray);
  var showHandsAndValue =
    showPlayerHand(playerArray) +
    calcHandValue(playerArray) +
    "<br><br>" +
    showDealerHand(dealerArray) +
    calcHandValue(dealerArray);
  if (dealerHandValue > 21 && playerHandValue > 21) {
    var presentpresentSanta =
      '<img src= "https://media1.giphy.com/media/Stuz0v7wzyUvaqzvst/giphy.gif?cid=ecf05e470qdw6zv5ah0l0mlfx5y4m2twko27w7k2pbz5ou32&ep=v1_gifs_related&rid=giphy.gif&ct=s"/>';
    myOutputValue =
      showHandsAndValue +
      "<br><br>Its a tie, both bust. Click ♠️♥️♣️♦️ to play again!<br>" +
      presentpresentSanta;
  } else if (dealerHandValue > 21 && playerHandValue <= 21) {
    var pointingSanta =
      '<img src= "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXhjZGI0dzNlZXdscHNxeG4xdGRtbW05a3ZuN2F4ZGJsdzNqcGgzdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/aJehSiEgLb76Dikq7T/giphy.gif"/>';
    myOutputValue =
      showHandsAndValue +
      "<br><br>Dealer bust. You won! Click ♠️♥️♣️♦️ to play again!<br>" +
      pointingSanta;
  } else if (playerHandValue > 21 && dealerHandValue <= 21) {
    var disapprovingSanta =
      '<img src= "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTljYnY5NmZ5aTFldm8wams1cDFnbDdqa3M4bWU4ZjhndTZ2dm84cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/zsa730TRwOF8O4UoAJ/giphy.gif"/>';
    myOutputValue =
      showHandsAndValue +
      "<br><br>You bust. Dealer won. Click ♠️♥️♣️♦️ to play again!<br>" +
      disapprovingSanta;
  } else if (playerHandValue > dealerHandValue && playerHandValue <= 21) {
    var cheeringSanta =
      '<img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlpOXNxdXByZnF6c3BocGttOHF5NzF2eWY4djdlcXhmd29yN3QwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/wuMue3qGESHbrM8ps9/giphy.gif"/>';
    myOutputValue =
      showHandsAndValue +
      "<br><br>You won! Click ♠️♥️♣️♦️ to play again!<br>" +
      cheeringSanta;
  } else if (playerHandValue < dealerHandValue && dealerHandValue <= 21) {
    var noNoSanta =
      '<img src= "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3Y3eTI2bGFlc3E4NDN6NTEyYXRwbGxzcDJ5c3l2Z2Y1ZTVuOGV5diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/N3eZflDS4BZvAC0Ai5/giphy.gif"/>';
    myOutputValue =
      showHandsAndValue +
      "<br><br>Dealer won. Click ♠️♥️♣️♦️ to play again!<br>" +
      noNoSanta;
  } else if (dealerHandValue == playerHandValue) {
    var presentpresentSanta =
      '<img src= "https://media1.giphy.com/media/yP2MOlgfnip51GutHT/200w.webp?cid=ecf05e472if9q1t6kike3whspu7s0v3prrjn93zr0leml8r4&ep=v1_gifs_related&rid=200w.webp&ct=g"/>';
    myOutputValue =
      showHandsAndValue +
      "<br><br>Its a tie. Click ♠️♥️♣️♦️ to play again!<br>" +
      presentpresentSanta;
  }
  playerArray = [];
  dealerArray = [];
  currentGameMode = gameMode1;
  return myOutputValue;
};
