//FUNCTION TO GENERATE CARD DECK
var makeDeck = function () {
  //Initialize empty deck array
  var cardDeck = [];
  //initialize an array of the 4 suits in deck
  var suits = [`hearts`, `diamonds`, `clubs`, `spades`];

  //loop over suits array
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    var currentSuit = suits[suitIndex];

    //loop from 1 to 13 to create all cards for a given suit
    for (var rankCounter = 1; rankCounter <= 13; rankCounter++) {
      var cardName = rankCounter;

      //if rank is 1, 11, 12, 13, change card name to ace, jack, queen, king
      if (cardName == 1) {
        cardName = `ace`;
      } else if (cardName == 11) {
        cardName = `jack`;
      } else if (cardName == 12) {
        cardName = `queen`;
      } else if (cardName == 13) {
        cardName = `king`;
      }

      //create a new card object with name, suit, rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      //change jack, queen, king to rank 10
      if (card.rank == 11 || card.rank == 12 || card.rank == 13) {
        card.rank = 10;
      }

      //add card to the deck
      cardDeck.push(card);
    }
  }
  return cardDeck;
};

//FUNCTION TO GET RANDOM INTEGER FROM ZERO TO MAX
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//FUNCTION TO SHUFFLE DECK
var shuffleCards = function (cardDeck) {
  //Initialize card deck array index
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    //select a random index in deck
    var randomIndex = getRandomIndex(cardDeck.length);
    //select card that corresponds with random index
    var randomCard = cardDeck[randomIndex];
    //select card that corresponds to current index
    var currentCard = cardDeck[currentIndex];
    //swap positions of both cards
    cardDeck[randomIndex] = currentCard;
    cardDeck[currentIndex] = randomCard;
    //increment current index
    currentIndex += 1;
  }
  return cardDeck;
};

//GLOBAL VARIABLES
//Make deck and shuffle cards at the start of game
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
//stores player's name as userName
var userName = ``;
//Initialize myoutputvalue
var myOutputValue = ``;
//GAME MODE
var gameMode = `awaiting username`;
//Current player and dealer hand
var playerHand = [];
var dealerHand = [];
//Current sum of cards
var playerSum = 0;
var dealerSum = 0;

//FUNCTION TO PROMPT USER FOR NAME
var startGame = function (input) {
  if (input == " " || input == "") {
    return `Welcome to the Blackjack table - What's your name?`;
  } else {
    userName = input;
    gameMode = `deal card`;
  }
};

//FUNCTION TO DEAL ONE CARD
var deal = function () {
  return shuffledDeck.shift();
};

//FUNCTION TO DEAL TWO CARDS TO PLAYER AND DEALER
var dealCards = function () {
  //Deals two cards to player and dealer
  for (i = 0; i < 2; i++) {
    var card = deal();
    playerHand.push(card);
    var card2 = deal();
    dealerHand.push(card2);
  }
  //Return message: Player drew (cards) and dealer drew (cards)
  myOutputValue = `${userName} drew: <br>${playerHand[0].name} ${playerHand[0].suit}<br> ${playerHand[1].name} ${playerHand[1].suit} <br><br>Dealer drew: <br>${dealerHand[0].name} ${dealerHand[0].suit}<br> ${dealerHand[1].name} ${dealerHand[1].suit}`;
};

//FUNCTION TO END TURN
//Empty playerHand and dealerHand
var endTurn = function () {
  playerHand = [];
  dealerHand = [];
};

//FUNCTION TO ANALYZE WINNING CONDITIONS
var winningCondition = function () {
  sumOfCards();
  //If tie or both > 21
  if (dealerSum == playerSum || (playerSum > 21 && dealerSum > 21)) {
    var announceWinner = `tie!`;
  }
  //If player wins
  else if (playerSum <= 21 && (playerSum > dealerSum || dealerSum > 21)) {
    var announceWinner = `You won! <br> Player sum ${playerSum}. <br>Dealer sum ${dealerSum}`;
  }
  //If computer wins
  else if (dealerSum <= 21 && (dealerSum > playerSum || playerSum > 21)) {
    announceWinner = `Dealer wins! <br> Player sum ${playerSum}. <br>Dealer sum ${dealerSum}`;
  } else {
    announceWinner = `Error 1`;
  }
  endTurn();
  gameMode = `deal card`;
  return announceWinner;
};

//Cards analyzed for winning conditions (blackjack)
var blackJack = function () {
  if ((playerHand[1] == 10 || playerHand[0] == 10) && (playerHand[1] == 1 || playerHand[0] == 1)) {
    return `Player BlackJack!`;
  }
  if ((dealerHand[1] == 10 || dealerHand[0] == 10) && (dealerHand[1] == 1 || dealerHand[0] == 1)) {
    return `Dealer BlackJack!`;
  }
};

//Ace can be either 1 or 11

//FUNCTION TO HIT
var generateHitCard = function () {
  var hitCard = deal();
  playerHand.push(hitCard);
};

//FUNCTION TO CALCULATE CURRENT SUM
var sumOfCards = function () {
  // Create a loop to determine playerSum
  for (var i = 0; i < playerHand.length; i++) {
    playerSum += playerHand[i].rank;
  }
  // Create a loop to determine dealerSum
  for (var j = 0; j < dealerHand.length; j++) {
    dealerSum += dealerHand[j].rank;
  }
};

//FUNCTION TO DISPLAY CURRENT HAND TO PLAYER
var printPlayerHand = function () {
  var currentPlayerHand = `You hit! <br><br>${userName} drew:<br>`;
  for (i = 0; i < playerHand.length; i++) {
    console.log(i);
    currentPlayerHand += `${playerHand[i].name} ${playerHand[i].suit}<br>`;
  }
  return currentPlayerHand;
};

//FUNCTION FOR DEALER TO PLAY GAME
//Computer decides to hit or stand automatically
var dealerPlay = function () {
  while (dealerSum < 0) {
    var dealerHitCard = deal();
    dealerHand.push(dealerHitCard);
  }
};

//MAIN FUNCTION
var main = function (input) {
  //Prompts player for username
  if (gameMode == `awaiting username`) myOutputValue = startGame(input);
  //Deals card to player and dealer
  if (gameMode == `deal card`) {
    dealCards();
    gameMode = `player choice`;
  }
  //Player chooses to hit or stand
  else if (gameMode == `player choice`) {
    generateHitCard();
  } else if (gameMode == `winning condition`) {
  }
  return myOutputValue;
};
