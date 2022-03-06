//two users. Player and Computer. Each deal two cards. Player can decide to hit or stand
//Computer is always the dealer. The dealer hass to hit if the hand is below 17
// whoever has the closest value to 21 but not exceed, wins
// ace can be 1 or 11

var deal = "deal";
var antiGamblingAd = "antiGamblingAd";
var adNumbertwo = "adNumbertwo";
var hitOrStand = "HitOrStand";
var compare = "compare";
var gameMode = antiGamblingAd;
var computerCurrentCard = [];
var playerCurrentCard = [];

//AntigamblingAd, agedetector
////////////////////////////////////////////////////////////////////
var antiGambling = function () {
  var myImage =
    '<img src = "https://www.mrbrown.com/.a/6a00d83451b52369e2017c3700c3da970b-550wi"/>';

  var myOutputValue = `PUBLIC SERVICE ADVERTISEMENT: <br>-------------------------------------<br> Stop before it is too late. Say No to Problem Gambling. <br> 一人嗜赌， 全家受苦。 <br> ${myImage} (NOT Brought to you by NCPG.) <br><br> Click again to proceed only if you are above 18. <br> (Try to be honest. You know we won't be able to tell also, if you are not.)`;
  gameMode = adNumbertwo;
  return myOutputValue;
};

//AdNumbertwo
////////////////////////////////////////////////////////////////////
var advertisementTwo = function () {
  var myImage =
    '<img src = "https://i.ytimg.com/vi/wF92cw7P2Ms/maxresdefault.jpg"/>';
  // ('myImage.style.height = "500px"');
  // ('myImage.style.width = "200px"');
  var myOutputValue = /*` The fact that you are reading this page implies that the anti-gambling ad is as effective as the pictorial warning on our cigarrette packaging. <br><br> So........,<br>*/ `Subscribe to BLACK JACK PREMIUM now to enjoy a smooth ad-free experience! <br> ${myImage} (Yes, you've guessed it. This is also an ad.)<br><br>Click Submit button to start the game. <br> For real this time. We promise.`;
  gameMode = deal;
  return myOutputValue;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
////////////////////////////////////////////////////////////////////
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//Make Deck
////////////////////////////////////////////////////////////////////
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥️hearts♥️", "♦️diamonds♦️", "♣️clubs♣️", "♠️spades♠️"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var rankNumber = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
        rankNumber = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        rankNumber = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        rankNumber = 10;
      } else if (cardName == 13) {
        cardName = "King";
        rankNumber = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankNumber,
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
  console.log("generated deck: ", cardDeck);
  return cardDeck;
};

// Shuffle the elements in the cardDeck array
//////////////////////////////////////////////////
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length); // Select a random index in the deck
    var randomCard = cardDeck[randomIndex]; // Select the card that corresponds to randomIndex
    var currentCard = cardDeck[currentIndex]; // Select the card that corresponds to currentIndex
    cardDeck[currentIndex] = randomCard; // Swap positions of randomCard and currentCard in the deck
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1; // Increment currentIndex
  }
  // Return the shuffled deck
  console.log("shuffled deck: ", cardDeck);
  return cardDeck; // this cardDeck is a local variable and is not the same as cardDeck in makeDeck function
};

var cards = makeDeck();
var shuffledDeck = shuffleCards(cards);

//Draw initial two cards, Check if there is black jack
//////////////////////////////////////////////////
var drawTwoCards = function () {
  var counter = 0;
  while (counter < 2) {
    var computerCard = shuffledDeck.pop();
    var playerCard = shuffledDeck.pop();
    computerCurrentCard.push(computerCard);
    playerCurrentCard.push(playerCard);
    counter += 1;
  }
  console.log(computerCurrentCard);
  console.log(playerCurrentCard);
  if (computerTotalValue() == 21 && playerTotalValue() != 21) {
    var myOutputValue = `Computer has drawn: <br> ------------------ <br> ${displayComputerMessage()} <br> total value is ${computerTotalValue()}  <br> Player has drawn <br> ------------------ <br> ${displayPlayerMessage()} total value is ${playerTotalValue()} <br><br> Computer has BLACK JACK! Computer wins!`;
  } else if (playerTotalValue() == 21 && computerTotalValue() != 21) {
    myOutputValue = `Computer has drawn:<br> ------------------ <br> ${displayComputerMessage()} total value is ${computerTotalValue()}  <br> Player has drawn <br> ------------------ <br> ${displayPlayerMessage()} total value is ${playerTotalValue()} <br><br> Player has BLACK JACK! player wins!`;
  } else if (playerTotalValue() == 21 && computerTotalValue() == 21) {
    myOutputValue = `Computer has drawn:<br> ------------------ <br> ${displayComputerMessage()} total value is ${computerTotalValue()}  <br> Player has drawn <br> ------------------ <br> ${displayPlayerMessage()} total value is ${playerTotalValue()} <br><br> Player and Compuer both have BLACK JACK! It's a tie!`;
  } else {
    myOutputValue = /*`Computer has drawn: ${displayComputerMessage()} ,total value is ${computerTotalValue()}  <br>*/ `Player has drawn <br> ------------------ <br> ${displayPlayerMessage()} total value is ${playerTotalValue()} <br><br>Does player want to hit(h) or stand(s)?`;
  }
  gameMode = hitOrStand;
  return myOutputValue;
};

//Function - Display computer message
/////////////////////////////////////////////////
var displayComputerMessage = function () {
  var computerMessage = "";
  var index = 0;
  while (index < computerCurrentCard.length) {
    computerMessage =
      computerMessage +
      `${computerCurrentCard[index].name} of ${computerCurrentCard[index].suit},<br> `;
    index += 1;
  }
  return computerMessage;
};

//Function - Display player message
/////////////////////////////////////////////////
var displayPlayerMessage = function () {
  var playerMessage = "";
  var index = 0;
  while (index < playerCurrentCard.length) {
    playerMessage =
      playerMessage +
      `${playerCurrentCard[index].name} of ${playerCurrentCard[index].suit},<br> `;
    index += 1;
  }
  return playerMessage;
};

var computerTotal = "";
var playerTotal = "";

//function to calculate computer total value
//////////////////////////////////////////////
var computerTotalValue = function () {
  computerTotal = "";
  var index = 0;
  var aceCounter = 0;
  while (index < computerCurrentCard.length) {
    computerTotal = Number(computerTotal) + computerCurrentCard[index].rank;
    if (computerCurrentCard[index].name == "Ace") {
      aceCounter += 1;
    }
    index += 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (computerTotal > 21) {
      computerTotal = computerTotal - 10;
    }
    index += 1;
  }
  console.log("ace:", aceCounter);
  console.log(computerTotal);
  return computerTotal;
};

//function to calculate player total value
//////////////////////////////////////////////
var playerTotalValue = function () {
  playerTotal = "";
  var index = 0;
  var aceCounter = 0;
  while (index < playerCurrentCard.length) {
    playerTotal = Number(playerTotal) + playerCurrentCard[index].rank;
    if (playerCurrentCard[index].name == "Ace") {
      aceCounter += 1;
    }
    index += 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (playerTotal > 21) {
      playerTotal = playerTotal - 10;
    }
    index += 1;
  }
  console.log("ace:", aceCounter);
  console.log(playerTotal);
  return playerTotal;
};

//function to compare who wins
/////////////////////////////////////////////
var whoWin = function () {
  var myImage3 =
    '<img src = "https://apicms.thestar.com.my/uploads/images/2019/11/14/385015.jpg"/>';
  if (
    (computerTotal <= 21 && computerTotal > playerTotal) ||
    (playerTotal > 21 && computerTotal <= 21)
  ) {
    var myOutputValue = `<br> Dealer wins! <br><br> -------------------------------------------------<br> Need quick cash? <br> **LONE SHAQ SECURED LOAN SERVICE**<br> ${myImage3} --Safe and Fast, your friendly neighbourhood Ah Long-- <br> Contact us now : +65-8123456`;
  } else if (
    (playerTotal <= 21 && playerTotal > computerTotal) ||
    (computerTotal > 21 && playerTotal <= 21)
  ) {
    myOutputValue = "<br>Player wins!";
  } else if (
    playerTotal == computerTotal ||
    (playerTotal > 21 && computerTotal > 21)
  ) {
    myOutputValue = "<br>It's a draw";
  }
  return myOutputValue;
};

//Main Game Function
//////////////////////////////////////////////
var hitStand = function (inputX) {
  if (inputX != "h" && inputX != "s") {
    return (myOutputValue = "Please input only hit(h) or stand(s).");
  } else {
    console.log(computerTotal);
    if (inputX == "h" && playerTotalValue() < 21) {
      var playerCard2 = shuffledDeck.pop();
      playerCurrentCard.push(playerCard2);
      myOutputValue = /*`Computer has drawn: ${displayComputerMessage()} , total value is ${computerTotalValue()} <br>*/ `Player has drawn:<br> ------------------ <br> ${displayPlayerMessage()} , total value is ${playerTotalValue()} <br><br> Would you like to hit(h) again or stand(s)?`;
    }
    if (inputX == "h" && playerTotalValue() == 21) {
      myOutputValue = `Player has drawn:<br> ------------------ <br> ${displayPlayerMessage()} , total value is 21. <br><br> Input stand(s) to see the final result.`;
    }
    if (inputX == "h" && playerTotalValue() > 21) {
      myOutputValue = `Player has drawn:<br> ------------------ <br> ${displayPlayerMessage()} total value is ${playerTotalValue()} <br> You have busted. <br><br>Input stand(s) to see the final result.`;
    }
    if (inputX == "s" && playerTotalValue() < 15) {
      myOutputValue = `Player has drawn:<br> ------------------ <br> ${displayPlayerMessage()} total value is ${playerTotalValue()} <br> Your total value is smaller than 15, <br><br>Input hit(h) to hit again.`;
    }
    if (inputX == "s" && playerTotalValue() >= 15) {
      index = 2;
      while (computerTotal < 17) {
        var computerCard2 = shuffledDeck.pop();
        computerCurrentCard.push(computerCard2);
        computerTotal = computerTotal + computerCurrentCard[index].rank;
        index += 1;
        console.log(computerTotal);
      }
      myOutputValue = `Computer has drawn:<br> ------------------ <br> ${displayComputerMessage()} total value is ${computerTotalValue()} <br><br> Player has drawn: <br> ------------------ <br>${displayPlayerMessage()} total value is ${playerTotalValue()} <br> ${whoWin()} <br><br> Click one more time to restart the game`;
      gameMode = deal;
      computerCurrentCard = [];
      playerCurrentCard = [];
    }
  }
  return myOutputValue;
};

var main = function (input) {
  console.log("top of function", gameMode);
  if (gameMode == antiGamblingAd) return antiGambling();
  if (gameMode == adNumbertwo) return advertisementTwo();
  if (gameMode == deal) return drawTwoCards();
  if (gameMode == hitOrStand) return hitStand(input);
};
