var currentGameState = "startGame";
var playerScore = 0;
var computerScore = 0;
var playerCards = [];
var computerCards = [];
var image = "";
var computerCC = "";
var playerCC = "";
var playerCredits = 100;
var currentPlayingCredit = 0;
var computerCCHide = "";

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

var getRandomIndex = function (max) {
  var randomIndex = Math.floor(Math.random() * max);
  return randomIndex;
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];

    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var shuffledDeck = shuffleCards(makeDeck());

var convertCharacterCard = function (card, convertAce) {
  if (convertAce == true && card == "ace") {
    return 1;
  }
  if (card == "jack" || card == "queen" || card == "king") {
    return 10;
  }

  if (convertAce == false && card == "ace") {
    return 11;
  } else {
    return card;
  }
};

var convertSuit = function (suit) {
  if (suit == "hearts") {
    return "♥";
  }

  if (suit == "diamonds") {
    return "♦";
  }

  if (suit == "clubs") {
    return "♣";
  }

  if (suit == "spades") {
    return "♠";
  }
};

var computeFinalScore = function (arr) {
  var totalScore = 0;

  for (var i = 0; i < arr.length; i++) {
    var score = convertCharacterCard(arr[i], false);

    totalScore = totalScore + score;
  }
  if (totalScore > 21) {
    totalScore = 0;

    for (var i = 0; i < arr.length; i++) {
      var score = convertCharacterCard(arr[i], true);

      totalScore = totalScore + score;
    }
  }

  return totalScore;
};

var main = function (input) {
  // Draw 2 cards from the top of the deck
  if (isNaN(parseFloat(input)) == true) {
    image = '<img src="./img/llc_dance.gif" />';

    return (myOutputValue =
      `Player's credits: ${playerCredits} <br> Please enter your bet!` + image);
  } else if (playerCredits - parseInt(input) < 0) {
    image = '<img src="./img/llc_fade.gif" />';
    return (myOutputValue =
      `Player's credits: ${playerCredits} <br> You have not enough money!` +
      image);
  } else if (currentGameState == "startGame") {
    currentPlayingCredit = parseInt(input);
    playerCredits = playerCredits - currentPlayingCredit;
    //console.log(input);
    //console.log(playerCredits);
    playerScore = 0;
    computerScore = 0;
    playerCards = [];
    computerCards = [];

    var computerCard1 = shuffledDeck.pop();
    computerCards.push(computerCard1.name);
    var computerCard2 = shuffledDeck.pop();
    computerCards.push(computerCard2.name);

    var playerCard1 = shuffledDeck.pop();
    playerCards.push(playerCard1.name);
    var playerCard2 = shuffledDeck.pop();
    playerCards.push(playerCard2.name);

    //console.log(computerCard1);
    //console.log(computerCard2);

    //console.log(playerCard1);
    //console.log(playerCard2);

    //console.log(computerCards);
    //console.log(playerCards);

    computerScore = computeFinalScore(computerCards);

    playerScore = computeFinalScore(playerCards);

    computerCC = `[${computerCard1.name}${convertSuit(computerCard1.suit)}] [${
      computerCard2.name
    }${convertSuit(computerCard2.suit)}]`;

    computerCCHide = `[*] [${computerCard2.name}${convertSuit(
      computerCard2.suit
    )}]`;

    playerCC = `[${playerCard1.name}${convertSuit(playerCard1.suit)}] [${
      playerCard2.name
    }${convertSuit(playerCard2.suit)}]`;

    var myOutputValue = `Player's credits: ${playerCredits} <br> Dealer had ${computerCCHide}<br> 
    You had ${playerCC} and your score is ${playerScore}`;

    if (playerScore == 21) {
      currentGameState = "gamePlaying";
      image = '<img src="./img/cat-lan-lan-cat.gif" />';
      //console.log(playerCredits);
      myOutputValue =
        myOutputValue +
        `<br> OH YOU HAVE BLACKJACK! HIT THE STAND BUTTON ${image}
        `;
      return myOutputValue;
    }

    if (computerScore == 21) {
      currentGameState = "gamePlaying";
      image = '<img src="./img/llc_nani.gif" />';
      myOutputValue =
        `Player's credits: ${playerCredits} <br> Dealer had ${computerCC}<br> 
          You had ${playerCC} and your score is ${playerScore}` +
        "<br> Dealer has BLACKJACK! DECIDE WHETHER YOU WANT TO HIT OR LOSE!" +
        image;
      return myOutputValue;
    }

    currentGameState = "gamePlaying";
    return myOutputValue + "<br>Choose HIT or STAND to continue!";
  }

  if (currentGameState == "gamePlaying") {
    if (input != "hit" && input !== "stand") {
      image = '<img src="./img/llc_think.gif" />';
      myOutputValue = "please return hit or stand" + image;
      return myOutputValue;
    }
  }

  return myOutputValue;
};

var hit = function () {
  if (currentGameState == "gamePlaying") {
    var playerCard = shuffledDeck.pop();
    playerCards.push(playerCard.name);

    //console.log(playerCard.name);

    //console.log(playerScore);

    playerCC =
      playerCC + ` [${playerCard.name}${convertSuit(playerCard.suit)}]`;

    playerScore = computeFinalScore(playerCards);

    //console.log(playerScore);

    myOutputValue = `Player's cards: ${playerCC} and now your score is ${playerScore}`;

    if (playerScore > 21) {
      image = '<img src="./img/llc_crawl.gif" />';
      myOutputValue =
        myOutputValue + "<br>YOU BUST! HIT THE STAND BUTTON" + image;
      return myOutputValue;
    }
    if (playerScore == 21) {
      image = '<img src="./img/llc_heart.gif" />';
      myOutputValue =
        myOutputValue + "<br>BLACKJACK! HIT THE STAND BUTTON" + image;

      return myOutputValue;
    }

    if (playerScore < 21 && playerCards.length < 5) {
      image = '<img src="./img/llc_think.gif" />';
      myOutputValue =
        myOutputValue +
        "<br>Think carefully if you want to hit or stand" +
        image;

      return myOutputValue;
    }

    if (playerCards.length == 5) {
      image = '<img src="./img/llc_huali.gif" />';
      currentGameState = "startGame";
      playerCredits = playerCredits + currentPlayingCredit * 2;
      myOutputValue =
        myOutputValue +
        `<br>YOU WON COZ YOU DID NOT BUST WITH 5 CARDS! ${image} <br> Player's credits: ${playerCredits}`;

      return myOutputValue;
    }
  } else if (currentGameState == "startGame") {
    image = '<img src="./img/llc_ming.gif" />';
    myOutputValue = "Please hit the new game button" + image;
  }
  return myOutputValue;
};

var stand = function () {
  if (currentGameState == "gamePlaying") {
    currentGameState = "startGame";
    while (computerScore < 17) {
      var computerCard = shuffledDeck.pop();
      computerCards.push(computerCard.name);
      computerScore = computeFinalScore(computerCards);
      //console.log(computerCard);
      //console.log(computerScore);

      computerCC =
        computerCC + ` [${computerCard.name}${convertSuit(computerCard.suit)}]`;
    }
    myOutputValue = `Player's cards: ${playerCC} and player's score: ${playerScore} <br>
        Dealer's cards: ${computerCC} and dealer's score: ${computerScore} <br>`;

    if (
      (computerScore > 21 && playerScore > 21) ||
      computerScore == playerScore
    ) {
      image = '<img src="./img/llc_heart.gif" />';
      playerCredits = playerCredits + currentPlayingCredit;
      myOutputValue =
        myOutputValue +
        "It's a tie!" +
        image +
        " <br> Player's credits: " +
        playerCredits;
    }
    if (computerScore > 21 && playerScore <= 21) {
      image = '<img src="./img/llc_pop.gif" />';
      playerCredits = playerCredits + currentPlayingCredit * 2;
      myOutputValue =
        myOutputValue +
        "DEALER BUST AND YOU WON!" +
        image +
        " <br> Player's credits: " +
        playerCredits;
    }

    if (computerScore <= 21 && playerScore > 21) {
      image = '<img src="./img/llc_shock.gif" />';
      currentGameState = "startGame";
      myOutputValue =
        myOutputValue +
        "<br>YOU BUST AND DEALER WON!" +
        image +
        " <br> Player's credits: " +
        playerCredits;
      return myOutputValue;
    }

    if (computerScore <= 21 && playerScore <= 21) {
      if (playerScore < computerScore) {
        image = '<img src="./img/llc_daren.gif" />';
        myOutputValue =
          myOutputValue +
          "Dealer wins!" +
          image +
          " <br> Player's credits: " +
          playerCredits;
      } else if (playerScore > computerScore) {
        image = '<img src="./img/llc_pop.gif" />';
        playerCredits = playerCredits + currentPlayingCredit * 2;
        myOutputValue =
          myOutputValue +
          "YOU WON!" +
          image +
          " <br> Player's credits: " +
          playerCredits;
      }
    }
  } else if (currentGameState == "startGame") {
    image = '<img src="./img/llc_ming.gif" />';
    myOutputValue = "Please hit the new game button" + image;
  }

  return myOutputValue;
};
