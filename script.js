document.querySelector("#hit-button").disabled = true;
document.querySelector("#stand-button").disabled = true;
document.querySelector("#continue-button").disabled = true;
document.querySelector("#restart-button").disabled = true;

//Function to generate card deck
var makeDeck = function () {
  //Initialize empty deck array
  var deck = [];
  //initialize an array of the 4 suits in deck
  var suits = [`hearts`, `diamonds`, `clubs`, `spades`];
  var emoji = [`♥`, `◆`, `♣`, `♠️`];

  //loop over suits array
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    var currentSuit = suits[suitIndex];

    //loop from 1 to 13 to create all cards for a given suit
    for (var rankCounter = 1; rankCounter <= 13; rankCounter++) {
      var cardName = rankCounter;

      //if rank is 1, 11, 12, 13, change card name to ace, jack, queen, king
      if (cardName == 1) {
        cardName = `Ace of`;
      } else if (cardName == 11) {
        cardName = `Jack of`;
      } else if (cardName == 12) {
        cardName = `Queen of`;
      } else if (cardName == 13) {
        cardName = `King of`;
      }

      //create a new card object with name, suit, rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: emoji[suitIndex],
      };

      //change jack, queen, king to rank 10
      if (card.rank == 11 || card.rank == 12 || card.rank == 13) {
        card.rank = 10;
      }

      //add card to the deck
      deck.push(card);
    }
  }
  return deck;
};

//Function to get random integer from zero to max
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//Function to shuffle deck
var shuffleCards = function (deck) {
  //Initialize card deck array index
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    //select a random index in deck
    var randomIndex = getRandomIndex(deck.length);
    //select card that corresponds with random index
    var randomCard = deck[randomIndex];
    //select card that corresponds to current index
    var currentCard = deck[currentIndex];
    //swap positions of both cards
    deck[randomIndex] = currentCard;
    deck[currentIndex] = randomCard;
    //increment current index
    currentIndex += 1;
  }
  return deck;
};

//Global variables
//Make deck and shuffle cards at the start of game
var deck = makeDeck();
var cardDeck = shuffleCards(deck);
//stores player's name as userName
var userName = ``;
//Initialize myoutputvalue
var myOutputValue = ``;
//Initialize game mode
var gameMode = `awaiting username`;
//Current player and dealer hand
var playerHand = [];
var dealerHand = [];
//Current sum of cards
var playerSum = 0;
var dealerSum = 0;
//Current points
var points = 100;

//Function to prompt user for name
var startGame = function (input) {
  if (input == ` ` || input == "") {
    return `Hello, welcome to the Blackjack table. <br><br>
    <img src="https://media.giphy.com/media/l2SqcsbynKaOQYexG/giphy.gif?cid=ecf05e47jl8c3bfz4ez56fakwyvyadgodckl0ue1mjix8dli&rid=giphy.gif&ct=g" class="center">
    <br>Wait, you're new here. What's your name?`;
  } else {
    userName = input;
    document.querySelector("#submit-button").disabled = true;
    hit.disabled = false;
    stand.disabled = false;
    restart.disabled = false;
    gameMode = `deal cards`;
  }
};

//Function to deal one card
var deal = function () {
  return cardDeck.shift();
};

//Function to deal two cards to player and dealer
var dealCards = function () {
  //Deals two cards to player and dealer
  for (i = 0; i < 2; i++) {
    var card = deal();
    playerHand.push(card);
    var card2 = deal();
    dealerHand.push(card2);
  }

  //Analyze for player or dealer blackjack
  var playerBlackjack = blackjack(playerHand);
  if (playerBlackjack == true) {
    return `Wow! You got BlackJack!<br><br>You drew ${printCards(playerHand)}<br><div id ="instructions">Press continue to play another turn. Press restart to end game.</div>`;
  }
  var dealerBlackjack = blackjack(dealerHand);
  if (dealerBlackjack == true) {
    return `Awww... looks like dealer drew BlackJack!<br><br>You drew ${printCards(playerHand)}<br><br>Dealer drew: ${printCards(
      dealerHand
    )}<br><div id ="instructions">Press continue to play another turn. Press restart to end game.</div>`;
  }
  //Sum of player's cards
  playerSum = playerHand[0].rank + playerHand[1].rank;
  //Return message: Player drew (cards) and dealer drew (cards)
  return `${userName} drew: <br>${playerHand[0].name} ${playerHand[0].suit} ${playerHand[0].emoji}<br> ${playerHand[1].name} ${playerHand[1].suit} ${playerHand[1].emoji}<br><b>Current sum: ${playerSum}</b><br><br><div id="instructions">Do you want to hit or stand?</div>`;
};

//Blackjack function
var blackjack = function (currentHand) {
  var isBlackjack = false;
  if ((currentHand[0].rank == 10 || currentHand[1].rank == 10) && (currentHand[0].rank == 1 || currentHand[1].rank == 1)) {
    hit.disabled = true;
    stand.disabled = true;
    cont.disabled = false;
    return (isBlackjack = true);
  }
};

//Function to hit
var generateHitCard = function () {
  gameMode = `player hit`;
  var hitCard = deal();
  playerHand.push(hitCard);
  playerSum += hitCard.rank;
};

//Player Hit Success
var playerHit = function () {
  var currentPlayerHand = ``;
  if (playerSum <= 20) {
    currentPlayerHand = `You hit, and... it was successful!<br> Your current sum is ${playerSum}. <br><br>You drew:<br>`;
    currentPlayerHand += ` ${printCards(playerHand)} <br><div id="instructions">Do you want to hit or stand?</div>`;
  }
  //Player hit, current sum = 21
  else if (playerSum == 21) {
    currentPlayerHand = `You hit! Wow, your current sum is 21! <br><br>You drew:<br>`;
    currentPlayerHand += ` ${printCards(playerHand)} <br><div id="instructions">Press stand to continue!</div>`;
    hit.disabled = true;
  }
  //Player hit unsuccessful, >21
  else {
    currentPlayerHand = `You hit! Too bad, you went over 21... <br>Your current sum is ${playerSum}.<br><br>You drew:<br>`;
    currentPlayerHand += ` ${printCards(playerHand)} <br><div id="instructions">Press stand to continue!</div>`;
    hit.disabled = true;
  }
  return currentPlayerHand;
};

//Function to print current cards
var printCards = function (cardsOnHand) {
  currentCards = ``;
  for (i = 0; i < cardsOnHand.length; i++) {
    console.log(i);
    currentCards += `${cardsOnHand[i].name} ${cardsOnHand[i].suit} ${cardsOnHand[i].emoji}<br>`;
  }
  return currentCards;
};

//Function for dealer to play game
//Computer decides to hit or stand automatically
var dealersPlay = function () {
  hit.disabled = true;
  stand.disabled = true;
  cont.disabled = false;
  dealerSum = dealerHand[0].rank + dealerHand[1].rank;
  while (dealerSum < 15) {
    var dealerHitCard = deal();
    dealerHand.push(dealerHitCard);
    dealerSum += dealerHitCard.rank;
  }
  return `Dealer drew:<br>${printCards(dealerHand)}`;
};

//Function to analyze winning condition
var winningCondition = function () {
  //If tie or both > 21
  if (dealerSum == playerSum || (playerSum > 21 && dealerSum > 21)) {
    var announceWinner = `It's a tie!<br><br> ${userName} drew:<br>${printCards(playerHand)} 
    <b>Player sum ${playerSum}</b>. <br><br>Dealer drew:<br>${printCards(
      dealerHand
    )}<b>Dealer sum ${dealerSum}</b><br><br><div id="instructions">Press continue to play another turn or restart to end game</div>`;
  }
  //If player wins
  else if (playerSum <= 21 && (playerSum > dealerSum || dealerSum > 21)) {
    var announceWinner = `You won! <br><br> ${userName} drew:<br>${printCards(playerHand)} 
    <b>Player sum ${playerSum}</b>. <br><br>Dealer drew:<br>${printCards(
      dealerHand
    )}<b>Dealer sum ${dealerSum}</b><br><br><div id="instructions">Press continue to play another turn or restart to end game</div>`;
  }
  //If computer wins
  else if (dealerSum <= 21 && (dealerSum > playerSum || playerSum > 21)) {
    announceWinner = `Dealer wins! <br><br> ${userName} drew:<br>${printCards(playerHand)} 
    <b>Player sum ${playerSum}</b>. <br><br>Dealer drew:<br>${printCards(
      dealerHand
    )}<b>Dealer sum ${dealerSum}</b><br><br><div id="instructions">Press continue to play another turn or restart to end game</div>`;
  } else {
    announceWinner = `Error 1`;
  }
  return announceWinner;
};

//Function for next turn (continue button)
var nextTurn = function (cardDeck) {
  gameMode = `deal cards`;
  //Current player and dealer hand
  playerHand = [];
  dealerHand = [];
  //Current sum of cards
  playerSum = 0;
  dealerSum = 0;
  startGame(userName);
};

//Ace can be either 1 or 11

//Main Function
var main = function (input) {
  //Prompts player for username. If player inputs username, deal cards
  if (gameMode == `awaiting username`) {
    myOutputValue = startGame(input);
  }
  //Game mode to deal cards to both player and dealer
  if (gameMode == `deal cards`) {
    myOutputValue = dealCards();
  } else if (gameMode == `player hit`) {
    //If player hits
    myOutputValue = playerHit();
    //If player stands
  } else if (gameMode == `winning condition`) {
    //Dealer automatically chooses hit or stand
    dealersPlay();
    //Determine and announce winner
    myOutputValue = winningCondition();
  }
  return myOutputValue;
};
