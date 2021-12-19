//To create entire deck object --> need to change rank for blackjack
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
// Initialise the card deck representation as an array of objects
var deck = makeDeck();

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(deck);

//2 players: player vs computer
//Computer always dealer
//Player & computer gets 2 cards at first
//Cards analysed for game winning conditions (blackjack)
var checkBlackjack = function (drawnCards) {
  var totalPoints = drawnCards[0].rank + drawnCards[1].rank;
  if (totalPoints == 21) {
    var myOutputValue = true;
  } else {
    myOutputValue = false;
  }
  return myOutputValue;
};

//Player first --> decide to hit (draw card) or stand (end)
//Dealer (computer) must hit if hand <17
//Total score is total of card ranks: J,Q,K = 10, Ace = 1 or 11
//Closer to or not >21 --> Winner

var outputPlayerCard1 = " ";

var decidePlayerHitOrStand = function (decision, playerCards) {
  var myOutputValue1 = " ";
  mode = "Hit or Stand";
  if (decision == "hit") {
    //draw another card
    console.log(playerCards);
    playerCards.push(shuffledDeck.pop());
    console.log(playerCards);
    console.log(playerCards.length);
    myOutputValue1 = "Player chose hit. Draw a card.";
    console.log("enter after hit");
  } else if (decision == "stand") {
    //end player's turn and continue with computer's turn
    currentPlayer = "Computer";
    mode = "Show hand";
    myOutputValue1 = "Player chose stand. It's the computer's turn.";
  } else {
    // error, only can choose hit or stand
    myOutputValue1 =
      "Invalid choice. Please only choose 'hit' or 'stand'. Click submit button to try again.";
  }

  var index = 0;
  while (index < playerCards.length) {
    var outputPlayerCard2 =
      "<br>" + playerCards[index].name + " of " + playerCards[index].suit;
    index += 1;
  }
  outputPlayerCard1 = outputPlayerCard1 + outputPlayerCard2;
  return myOutputValue1;
};

var decideComputerHitOrStand = function (drawnCards) {
  var totalPoints = drawnCards[0].rank + drawnCards[1].rank;
  var outputComputerCard = "";
  var myOutputValue = " ";
  var myOutputValue1 = " ";
  if (totalPoints < 17) {
    //computer is dealer, have to hit (draw another card) if hand is below 17
    drawnCards.push(shuffledDeck.pop());
    myOutputValue1 = "Computer's hand is below 17. Computer has to hit.";
  } else if (totalPoints >= 17) {
    //computer can choose to hit or stand (set default choice for computer?)
    if (totalPoints >= 20) {
      myOutputValue1 = "Computer chose stand.";
    } else {
      drawnCards.push(shuffledDeck.pop());
      myOutputValue1 = "Computer chose hit.";
    }
  } else {
    // error, only can choose hit or stand
    myOutputValue1 =
      "Invalid choice. Please only choose 'hit' or 'stand'. Click submit button to try again.";
  }

  //output all cards on hand
  for (let i = 0; i < drawnCards.length; i++) {
    outputComputerCard =
      outputComputerCard +
      "<br> " +
      drawnCards[i].name +
      " of " +
      drawnCards[i].suit;
  }

  myOutputValue =
    myOutputValue1 + "<br> Computer's drawn cards: " + outputComputerCard;
  return myOutputValue;
};

var comparePoints = function (computerCards, playerCards) {
  var computerPoints = 0;
  var playerPoints = 0;
  var myOutputValue1 = " ";
  var myOutputValue = " ";
  //check total points of player's hand --> need to convert rank to number?
  for (let i = 0; i < playerCards.length; i++) {
    playerPoints = playerPoints + playerCards[i].rank;
  }
  //check total points of computer's hand
  for (let i = 0; i < computerCards.length; i++) {
    computerPoints = computerPoints + computerCards[i].rank;
  }

  if (
    (computerPoints > playerPoints && computerPoints <= 21) ||
    playerPoints > 21
  ) {
    if (playerPoints > 21) {
      myOutputValue1 = "Player's hand BURST! Computer wins!";
    } else {
      myOutputValue1 = "Computer wins!";
    }
  } else if (
    (playerPoints > computerPoints && playerPoints <= 21) ||
    computerPoints > 21
  ) {
    if (computerPoints > 21) {
      myOutputValue1 = "Copmuter's hand BURST! Player wins!";
    } else {
      myOutputValue1 = "Player wins!";
    }
  } else {
    myOutputValue1 = "It's a tie!";
  }

  myOutputValue =
    myOutputValue1 +
    "<br> Computer's total points: " +
    computerPoints +
    "<br> Player's total points: " +
    playerPoints;

  return myOutputValue;
};

var mode = "Show hand"; //Show hand, Hit or Stand, Compare
var currentPlayer = "Player"; //switch between Player and Computer
// Draw 2 cards per player, store into array
var computerCards = [];
var playerCards = [];
var outputComputerCard = "";
var outputPlayerCard = "";

var main = function (input) {
  //Player starts first
  if (currentPlayer == "Player") {
    if (mode == "Show hand") {
      //Draw 2 cards per player, store into array (global array)

      for (let i = 0; i < 2; i++) {
        //const element = array[i];
        computerCards.push(shuffledDeck.pop());
        playerCards.push(shuffledDeck.pop());
        outputComputerCard =
          outputComputerCard +
          "<br> " +
          computerCards[i].name +
          " of " +
          computerCards[i].suit;
        outputPlayerCard =
          outputPlayerCard +
          "<br> " +
          playerCards[i].name +
          " of " +
          playerCards[i].suit;
      }
      console.log(computerCards);
      console.log(playerCards);
      console.log(outputPlayerCard);
      console.log(outputComputerCard);

      //edit checkblackjack to return true or false
      if (checkBlackjack(playerCards) || checkBlackjack(computerCards)) {
        if (checkBlackjack(playerCards) && checkBlackjack(computerCards)) {
          //both blackjack in first draw, it's a tie
          var myOutputValue = "Blackjack for both players! It's a tie!";
        } else if (checkBlackjack(playerCards)) {
          myOutputValue =
            "Blackjack! Player won! <br> Player has drawn " + outputPlayerCard;
        } else if (checkBlackjack(computerCards)) {
          myOutputValue =
            "Blackjack! Computer won! <br> Computer has drawn " +
            outputComputerCard;
        }
        return myOutputValue;
      }

      myOutputValue =
        "Player's hand: " +
        outputPlayerCard +
        "<br> Decide whether to Hit or Stand. Input 'hit' or 'stand' and click on submit to confirm decision";
      // need to switch mode here...
      mode = "Hit or Stand";
    } else if (mode == "Hit or Stand") {
      console.log("Entered here");
      //player will decide whether to hit or stand. if hit, need to add cards to array
      var myOutputValue1 = decidePlayerHitOrStand(input, playerCards);
      console.log(outputPlayerCard);

      myOutputValue =
        myOutputValue1 +
        "<br> Player's drawn cards:<br>" +
        outputPlayerCard +
        "<br>" +
        outputPlayerCard1;

      //will switch to computer's turn if player chooses "stand"
    }
  } else if (currentPlayer == "Computer") {
    if (mode == "Show hand") {
      for (let i = 0; i < 2; i++) {
        //const element = array[i];
        outputComputerCard =
          outputComputerCard +
          "<br> " +
          computerCards[i].name +
          " of " +
          computerCards[i].suit;
      }
      myOutputValue =
        "Computer's hand: " +
        outputComputerCard +
        "<br> Computer to decide whether to Hit or Stand";
      // need to switch mode here...
      mode = "Hit or Stand";
    } else if (mode == "Hit or Stand") {
      console.log("Computer entered here");
      //Computer decision for hit or stand defnined by standard logic (automatic, not by user input)
      myOutputValue = decideComputerHitOrStand(computerCards);
      console.log(outputComputerCard);
      mode = "Compare";
    } else if (mode == "Compare") {
      myOutputValue = comparePoints(computerCards, playerCards);
      console.log(computerCards);
      console.log(playerCardspwd);
    }
  }

  console.log(mode);

  return myOutputValue;
};
