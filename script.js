var generateDeck = function (input) {
  var deck = []; // Empty array for deck
  var noOfCards = 0; // Counter for the cards
  var suits = ["spade", "heart", "clubs", "diamonds"]; // 4 suits
  var ranks = [...Array(13).keys()]; // Generates 13 numbers, from 0 to 12
  var name = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]; // Name of the cards

  for (let i = 0; i < ranks.length; i += 1) {
    // Assigning all numbers above 10 to be equal 10
    if (ranks[i] > 9) {
      // later on will be adding back the 1
      ranks[i] = 9;
    }
  }

  //Assign ace to have 11 pts for a start. Put 10, because will add on below.
  ranks[0] = 10;

  for (let i = 0; i < suits.length; i += 1) {
    var suit1 = suits[i]; // Allow the suit to go through the loop
    var j = 0;
    while (j < ranks.length) {
      var element = {}; // Initialise / Reset element as empty
      var rank1 = ranks[j] + 1;
      var name1 = name[j];

      element.name = name1; // Assign element with name
      element.suit = suit1; // Assign element with suit
      element.rank = rank1; // Assign element with rank

      deck.push(element); // Put element inside array

      j += 1;
      noOfCards += 1; // Keep track of number of cards, max is 52
    }
  }
  // console.log(`No of cards is: ${noOfCards}`);
  console.log(deck);
  return deck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the cards
var shuffleDeck = function (cardDeck) {
  // Loop over card deck
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Random card and Current Card
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    // Swap positions with current position with random position;
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};

var createPlayerProfile = function (playerName) {
  var player = [];
  var element = {};

  element.name = playerName;
  element.score = 0;
  element.points = 0;
  element.ace = 0;
  element.blackjack = 0;
  element.remarks = "";
  player.push(element);

  return player;
};

var allPlayerProfile = function (noOfPlayers, COM) {
  var listOfPlayers = []; // Create a empty list for the player
  for (let i = 1; i <= noOfPlayers; i += 1) {
    // Automatically Generate each player's name
    var playerName = "Player " + String(i);
    // Create the player profile. It'll look like this {name: "Player 1", score: 0, points: 0, remarks: ""}
    var player = createPlayerProfile(playerName);
    // Push the player profile (element) inside the array
    listOfPlayers.push(player);
  }
  if (COM == true) {
    // Place the computer as the last player
    playerCOM = createPlayerProfile("COM");
    listOfPlayers.push(playerCOM);
  }
  return listOfPlayers;
};

var drawCard = function (listOfPlayers, shuffledDeck) {
  var noOfDraws = 2;

  for (j = 0; j < noOfDraws; j += 1) {
    for (let i = 0; i < listOfPlayers.length; i += 1) {
      // Draw card, inside draw card there is e.g. {name: 'ace', suit : 'spades', rank : 1}
      cardDrawn = shuffledDeck.pop();
      // After drawing the card, store the value of the card inside by retrieving rank
      rankScore = cardDrawn.rank;
      cardType = `${cardDrawn.name} of ${cardDrawn.suit},`;
      // Find the player profile. listOfPlayers[0][0] e.g:{name: 'Player 1', score :0, points:0, remarks: ""}
      listOfPlayers[i][0].score += rankScore;
      listOfPlayers[i][0].remarks += cardType;

      if (cardDrawn.name == "ace") {
        listOfPlayers[i][0].ace += 1;
      }
      console.log(cardType);
    }
  }
  return listOfPlayers;
};

var drawAdditionalCard = function (index, shuffledDeck, allCardDrawn) {
  // Draw a single card
  var additionalCard = shuffledDeck.pop();
  // Obtain the rank
  rankScore = additionalCard.rank;
  // Obtain the name and suit of the card
  cardType = `${additionalCard.name} of ${additionalCard.suit},`;
  //
  allCardDrawn[index][0].score += rankScore;
  allCardDrawn[index][0].remarks += cardType;

  return cardType;
};

var blackJack = function (allCardDrawn) {
  var blackJackScore = 21;
  var listOfBlackjack = [];
  var msg = "";

  // Loop through every player profile
  for (let i = 0; i < allCardDrawn.length; i += 1) {
    var scoreBeat = allCardDrawn[i][0].score;
    var blackJack = false;
    if (scoreBeat == blackJackScore) {
      blackJack = true;
    }
    // Check if there is blackjack, if there is, push 1, otherwise push 0.
    if (blackJack == true) {
      allCardDrawn[i][0].blackjack = 1;
    } else {
      allCardDrawn[i][0].blackjack = 0;
    }
  }
  return;
};

var winningCondition = function (allCardDrawn) {
  var win = "";
  var lose = "";
  var draw = "";
  var bust = "";
  var overshotScore = 21;

  // Re-assess all the scores if there is an ace.
  // allCardDrawn[0][0] is {name: 'Player 1', score :0, points:0, ace:0,remarks: ""}
  for (let i = 0; i < allCardDrawn.length; i += 1) {
    var reAdjustScore = allCardDrawn[i][0].score;
    // If above 21, check for aces. Depending on the number of ace, there'll be reduction.
    if (reAdjustScore > overshotScore) {
      var ace_counter = 0;
      while (ace_counter < allCardDrawn[i][0].ace) {
        reAdjustScore -= 10;
        ace_counter += 1;
      }
    }
  }

  // Taking out the score of COM thus far
  var COM_score = allCardDrawn[allCardDrawn.length - 1][0].score;
  var COMStatus = `COM Card Score: ${COM_score}`;
  // Separate indicator to check COM score
  var checkCOMscore = COM_score;
  // Stop at before COM player profile.
  for (let i = 0; i < allCardDrawn.length - 1; i += 1) {
    var cardScore = allCardDrawn[i][0].score;
    // Separate indicator to check player score
    var checkCardScore = cardScore;
    var cardName = allCardDrawn[i][0].name;
    // if computer exceeds 21, just assume it is 0
    if (checkCOMscore > overshotScore) {
      checkCOMscore = 0;
      COMStatus = `COM has bust. COM Card Score: ${COM_score}`;
    }
    // if player exceeds, just assume it is 0
    if (cardScore > overshotScore) {
      bust += `${cardName} has bust. Card score: ${cardScore} <br>`;
      checkCardScore = 0;
    }

    if (checkCardScore > checkCOMscore) {
      win += `${cardName} has won. `;
      if (allCardDrawn[i][0].blackjack == 1) {
        win += `Black Jack! Card score: ${cardScore} <br>`;
      } else {
        win += `Card score: ${cardScore} <br> `;
      }
    } else if (checkCardScore == checkCOMscore) {
      draw += `${cardName} has draw. Card score: ${cardScore} <br> `;
    } else if (checkCardScore != 0) {
      lose += `${cardName} has lost. Card score: ${cardScore}<br> `;
    }
  }

  msg = win + lose + draw + bust + COMStatus;
  return msg;
};

var obtainCardsDrawnRemarks = function (allCardDrawn, index) {
  // Draw out remarks of player / COM
  var remarks1 = allCardDrawn[index][0].remarks;
  remarks1 = remarks1.split(",");
  // Remove the empty ""
  remarks1.pop();

  return remarks1;
};

var ResetGame = function () {
  var gameMode = "Blackjack";
  // var noOfPlayers = 0;
  var allCardDrawn = "";
  var indexCounter = 1;
  var remarksCOM = "";
  var deck = "";
  var shuffledDeck = "";
};

//Initialise variables
var gameMode = "Select Game Mode";
var cardsDrawn = "Drawn Card";
var hitOrStand = "Hit or Stand";
var noOfPlayers = 0;
var COM = true;
var allCardDrawn = ""; // Will be used to update the profile and scores of players
var indexCounter = 1; // this indexCounter is used to check who wants to draw a card
var remarksCOM = "";
// Generate deck and shuffle
var deck = "";
var shuffledDeck = "";

// DELETE LTR //
var gameMode = "Blackjack";
var noOfPlayers = 2;
//////////////////

var main = function (input) {
  // Display image
  var msg = "";

  if (gameMode == "Select Game Mode") {
    msg = "Please select Game Mode: <br> 1 - Blackjack <br>";
    // If No.1 is selected, gameMode is blackjack. Otherwise nothing.
    if (Number(input) == 1) {
      gameMode = "Blackjack";
      msg = `Game Mode: ${gameMode} <br><br> Please select number of players`;
    }
    return msg;
  }

  if (noOfPlayers == 0) {
    msg = `Select number of player(s)`;
    if (Number(input) > 0) {
      noOfPlayers = Number(input);
      msg = `Number of player(s): ${noOfPlayers}`;
    }
    return msg;
  }
  // First part of the game
  if (gameMode == "Blackjack") {
    deck = generateDeck();
    shuffledDeck = shuffleDeck(deck);
    // Store all player profile into a list
    listOfPlayers = allPlayerProfile(noOfPlayers, COM);
    console.log(`The number of players are : ${listOfPlayers.length} and the list is: ${listOfPlayers[0]}`);

    // Draw 2 Cards. To access first player card details.
    //i.e. allCardDrawn[0][0] is {name: 'Player 1', score :0, points:0, ace:0,remarks: ""} same as listofplayers but updated with scores.
    allCardDrawn = drawCard(listOfPlayers, shuffledDeck);
    // Check blackJack
    blackJack(allCardDrawn);
    // if COM is blackjack. Check if any other blackjack.
    if (allCardDrawn[allCardDrawn.length - 1][0].blackjack == 1) {
      var listOfOtherBlackJacks = [];
      var msgBlackJack = "";
      for (let i = 0; i < allCardDrawn.length - 1; i += 1) {
        if (allCardDrawn[i][0].blackjack == 1) {
          listOfOtherBlackJacks.push("has tied!");
        } else if (allCardDrawn[i][0].blackjack == 0) {
          listOfOtherBlackJacks.push("has lost!");
        }
      }
      for (let i = 0; i < listOfOtherBlackJacks.length; i += 1) {
        msgBlackJack += `Player ${i + 1} ${listOfOtherBlackJacks[i]}<br>`;
      }
      msgBlackJack += "<br> COM has Black Jack!";
      return msgBlackJack;
    }

    for (let i = 0; i < allCardDrawn.length; i += 1) {
      console.log(allCardDrawn[i][0]);
    }

    // Change gamemode to hit or stand
    gameMode = hitOrStand;
    // Obtain the remarks of the cards thus far from player 1
    var remarks1 = obtainCardsDrawnRemarks(allCardDrawn, 0);
    // Obtain the remarks of the cards thus far from player COM
    remarksCOM = obtainCardsDrawnRemarks(allCardDrawn, allCardDrawn.length - 1);

    msg = `2 Cards have been dealt to every player.<br><br> Player 1's turn.<br> Your current cards are: ${remarks1} <br><br> COM has drawn the ${remarksCOM}<br><br>Please select "Hit" or "Stand"`;
    console.log(`The game mode is: ${gameMode}`);
    return msg;
  }

  // HIT OR STAND
  if (gameMode == hitOrStand) {
    msg = "Please enter a valid input. Either 'hit' or 'stand'";
    var remarks = obtainCardsDrawnRemarks(allCardDrawn, indexCounter - 1);
    // Check if player has blackjack, if he has, skip his turn.
    if (allCardDrawn[indexCounter - 1][0].blackjack == 1 || !input) {
      indexCounter += 1;
      remarks = obtainCardsDrawnRemarks(allCardDrawn, indexCounter - 1);
      msg = `Player ${indexCounter - 1} has Black Jack! Does not need to draw! `;
      if (indexCounter < allCardDrawn.length) {
        msg += `<br> Player ${indexCounter}'s turn.<br> Your current cards are : ${remarks} <br><br> COM has ${remarksCOM} <br><br> 'Hit' or 'Stand' or 'Submit'`;
      }
      return msg;
    }

    // indexCounter starts from 1. Purpose is to stop right before the COM's profile
    if (indexCounter < allCardDrawn.length && allCardDrawn[indexCounter - 1][0].blackjack == 0) {
      if (input.toLowerCase() == "hit") {
        // Draw additional cards, whatCard returns what card was drawn in string
        whatCard = drawAdditionalCard(indexCounter - 1, shuffledDeck, allCardDrawn);
        msg = `${whatCard} was drawn.<br> Player ${indexCounter} now has ${remarks}, ${whatCard} <br><br> COM has ${remarksCOM} <br><br> "Hit" Or "Stand"?`;
        console.log(`The value of i : ${indexCounter}`);
      }
      if (input.toLowerCase() == "stand") {
        indexCounter += 1;
        remarks = obtainCardsDrawnRemarks(allCardDrawn, indexCounter - 1);
        msg = `Player ${indexCounter - 1} picked stand. <br><br> Player ${indexCounter}'s turn.<br> Your current cards are : ${remarks} <br><br> COM has ${remarksCOM} <br><br> 'Hit' or 'Stand'`;
      }
      if (!input) {
        indexCounter += 1;
      }
    }
    // Once indexcounter reaches last. which is COM's
    if (indexCounter == allCardDrawn.length) {
      // gameMode = cardsDrawn;
      var currentScoreCOM = allCardDrawn[allCardDrawn.length - 1][0].score;
      console.log(`COM's score: ${allCardDrawn[allCardDrawn.length - 1][0].score}`);
      msg = "All players have drawn their cards. It's COM's turn<br><br>";
      msg1 = "COM does not need to draw. Click Submit to continue";
      // If computer score is below 17, auto draw till reach above 17.
      while (currentScoreCOM < 17) {
        whatCard = drawAdditionalCard(indexCounter - 1, shuffledDeck, allCardDrawn);
        var msg1 = `${whatCard} was drawn.<br> COM now has ${remarks}, ${whatCard} <br><br>`;
        currentScoreCOM = allCardDrawn[allCardDrawn.length - 1][0].score;
      }
      gameMode = cardsDrawn;
      console.log(`COM's score: ${allCardDrawn[allCardDrawn.length - 1][0].score}`);
      console.log(`The game mode is: ${gameMode}`);
      msg += msg1;
    }
    return msg;
  }

  if (gameMode == cardsDrawn) {
    msg = winningCondition(allCardDrawn);
    ResetGame();
    return msg;
  }

  return msg;
};
