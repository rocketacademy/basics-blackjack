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

  //change jack, queen, king to rank 10 for blackjack
  cardDeck[10].rank = 10;
  cardDeck[11].rank = 10;
  cardDeck[12].rank = 10;
  cardDeck[23].rank = 10;
  cardDeck[24].rank = 10;
  cardDeck[25].rank = 10;
  cardDeck[36].rank = 10;
  cardDeck[37].rank = 10;
  cardDeck[38].rank = 10;
  cardDeck[49].rank = 10;
  cardDeck[50].rank = 10;
  cardDeck[51].rank = 10;

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

var mode = "Show hand"; //Show hand, Hit or Stand, Compare
var currentPlayer = "Player"; //switch between Player and Computer
// Draw 2 cards per player, store into array
var computerCards = []; //original 2 cards stored here
var playerCards = []; // original 2 cards stored here
var outputComputerCard = ""; //original 2 cards drawn
var outputPlayerCard = ""; //original 2 cards drawn
var outputPlayerCard1 = " ";
var outputPlayerCard2 = " "; //newest card drawn
var outputComputerCard1 = " ";
var outputComputerCard2 = " "; //newest card drawn

//To check if Ace should be 1 or 11
var checkAce = function (cardsInHand) {
  //ace can be 1 or 11
  var aceValue = 11;
  var countAce = 0;
  var cards = [];
  var index = 0;
  var points = 0;
  //store card names in array
  while (index < cardsInHand.length) {
    cards[index] = cardsInHand[index].name;
    if (cards[index] == "ace") {
      countAce += 1;
    }
    points = points + cardsInHand[index].rank;
    index += 1;
  }
  if ((cardsInHand.length > 2 && countAce > 1) || points > 21) {
    aceValue = 1;
  }

  console.log(countAce);
  console.log(points);
  console.log(cardsInHand);
  return aceValue;
};

//Cards analysed for game winning conditions (blackjack), return true or false
var checkBlackjack = function (drawnCards) {
  var index = 0;
  while (index < 2) {
    if (drawnCards[index].name == "ace") {
      drawnCards[index].rank = checkAce(playerCards);
    }
    index += 1;
  }
  var totalPoints = drawnCards[0].rank + drawnCards[1].rank;

  if (totalPoints == 21) {
    var myOutputValue = true;
  } else {
    myOutputValue = false;
  }
  return myOutputValue;
};

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
    var index = 0;
    while (index < playerCards.length) {
      outputPlayerCard2 =
        "<br>" + playerCards[index].name + " of " + playerCards[index].suit;
      index += 1;
    }
  } else if (decision == "stand") {
    //end player's turn and continue with computer's turn
    currentPlayer = "Computer";
    mode = "Show hand";

    myOutputValue1 =
      "Player chose stand. It's the computer's turn. Click on submit to continue.";
  } else {
    // error, only can choose hit or stand
    myOutputValue1 =
      "Invalid choice. Please only choose 'hit' or 'stand'. Click submit button to try again.";
  }

  outputPlayerCard1 = outputPlayerCard1 + outputPlayerCard2;
  outputPlayerCard2 = " "; //reset outputplayercard2: the last drawn card
  return myOutputValue1;
};

var decideComputerHitOrStand = function (computerCards) {
  var totalPoints = computerCards[0].rank + computerCards[1].rank;

  var myOutputValue = " ";
  var myOutputValue1 = " ";
  if (totalPoints < 17) {
    //computer is dealer, have to hit (draw another card) if hand is below 17
    computerCards.push(shuffledDeck.pop());
    totalPoints = 0;
    var index = 0;
    while (index < computerCards.length) {
      if (computerCards[index].name == "ace") {
        computerCards[index].rank = checkAce(computerCards);
      }
      totalPoints = totalPoints + computerCards[index].rank;
      index += 1;
    }
    console.log(totalPoints);

    if (totalPoints >= 19) {
      myOutputValue1 = "Computer chose stand.";
      mode = "Compare";
      return myOutputValue1;
    }
    myOutputValue1 = "Computer's hand is below 17. Computer has to hit.";
  } else if (totalPoints >= 17) {
    //computer can choose to hit or stand (set default choice for computer)
    if (totalPoints >= 19) {
      myOutputValue1 = "Computer chose stand.";
      mode = "Compare";
    } else {
      computerCards.push(shuffledDeck.pop());
      myOutputValue1 = "Computer chose hit. Another card is drawn.";
      totalPoints = 0;
      var index = 0;
      while (index < computerCards.length) {
        if (computerCards[index].name == "ace") {
          computerCards[index].rank = checkAce(playerCards);
        }
        totalPoints = totalPoints + computerCards[index].rank;
        index += 1;
      }
      console.log(totalPoints);
      if (totalPoints >= 19) {
        myOutputValue1 = "Computer chose stand.";
        mode = "Compare";
        return myOutputValue1;
      }
    }
  } else {
    // error, only can choose hit or stand
    myOutputValue1 =
      "Invalid choice. Please only choose 'hit' or 'stand'. Click submit button to try again.";
  }
  var index = 0;
  while (index < computerCards.length) {
    outputComputerCard2 =
      "<br>" + computerCards[index].name + " of " + computerCards[index].suit;
    index += 1;
  }
  outputComputerCard1 = outputComputerCard1 + outputComputerCard2;
  outputPlayerCard2 = " "; //reset outputcomputercard2: the last drawn card
  return myOutputValue1;
};

var comparePoints = function (computerCards, playerCards) {
  var computerPoints = 0;
  var playerPoints = 0;
  var myOutputValue1 = " ";
  var myOutputValue = " ";
  //check total points of player's hand --> need to convert rank to number?
  for (let i = 0; i < playerCards.length; i++) {
    if (playerCards[i].name == "ace") {
      playerCards[i].rank = checkAce(playerCards);
    }
    playerPoints = playerPoints + playerCards[i].rank;
  }
  //check total points of computer's hand
  for (let i = 0; i < computerCards.length; i++) {
    if (computerCards[i].name == "ace") {
      computerCards[i].rank = checkAce(computerCards);
    }
    computerPoints = computerPoints + computerCards[i].rank;
  }

  if (
    (computerPoints > playerPoints && computerPoints <= 21) ||
    playerPoints > 21
  ) {
    if (playerPoints > 21 && computerPoints <= 21) {
      myOutputValue1 = "Player BUSTS! Computer wins!";
    } else {
      myOutputValue1 = "Computer wins!";
    }
  } else if (
    (playerPoints > computerPoints && playerPoints <= 21) ||
    computerPoints > 21
  ) {
    if (computerPoints > 21 && playerPoints <= 21) {
      myOutputValue1 = "Computer BUSTS! Player wins!";
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

var resetGame = function () {
  mode = "Show hand"; //Show hand, Hit or Stand, Compare
  currentPlayer = "Player"; //switch between Player and Computer
  // Draw 2 cards per player, store into array
  computerCards = [];
  playerCards = [];
  outputComputerCard = "";
  outputPlayerCard = "";
  outputPlayerCard1 = " ";
  outputPlayerCard2 = " ";
  outputComputerCard1 = " ";
};

//2 players: player vs computer
//Computer always dealer
//Player & computer gets 2 cards at first
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
      console.log(outputPlayerCard1);
      console.log(outputPlayerCard2);
      //will switch to computer's turn if player chooses "stand"
    }
  } else if (currentPlayer == "Computer") {
    if (mode == "Show hand") {
      myOutputValue =
        "Computer's hand: " +
        outputComputerCard +
        "<br> Computer to decide whether to Hit or Stand. Click 'Submit' to continue.";
      // need to switch mode here...
      mode = "Hit or Stand";
    } else if (mode == "Hit or Stand") {
      console.log("Computer entered here");
      //Computer decision for hit or stand defnined by standard logic (automatic, not by user input)
      myOutputValue1 = decideComputerHitOrStand(computerCards);
      console.log(outputComputerCard);

      myOutputValue =
        myOutputValue1 +
        "<br> Computer's drawn cards: " +
        outputComputerCard +
        "<br>" +
        outputComputerCard1;
      console.log(outputComputerCard1);
      //add condition to change mode only when computer ends turn
      //mode = "Compare"
      if (mode == "Compare") {
        console.log(computerCards);
        console.log(playerCards);
        //Total score is total of card ranks: J,Q,K = 10, Ace = 1 or 11
        //Closer to or not >21 --> Winner
        myOutputValue = comparePoints(computerCards, playerCards);

        resetGame();
      }
    }
  }

  console.log(mode);
  console.log(outputComputerCard);
  console.log(outputComputerCard1);

  return myOutputValue;
};
