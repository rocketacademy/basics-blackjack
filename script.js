//The main function runs on each player's turn. The sequence of actions in the game might be the following.
// Create a deck.
// Deck is shuffled.
// Multiplayer can play.
//  a. User to input number of players playing.
//  b. Generate the number of players according to the input number.
//  c. Players have attributes: Player Number, Chips.
// Players to determine how much chip to bet for that round.
// Player clicks Submit to receive 2 cards each.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// Each player is able to choose to Hit, Stand or Split by clicking the respective buttons.
// The user's cards are analysed for winning or losing conditions.
// Hide dealer's first card
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues
const ENTER_NUM_PLAYER = "enter number of players";
const ENTER_BET = "enter number of chips to bet";
const PLAY_GAME = "players take turn to play Blackjack";
const DEAL_CARDS = "dealer deal cards to players";
const COMPARE_HAND = "compare hand value between dealer and players";
const DEALER_TURN = "dealer to draw card if necessary";
let dealerHand = {
  hand: [],
  handvalue: 0,
  blackjack: false,
  bust: false,
};
let gameMode = ENTER_NUM_PLAYER;
let numOfPlayersPlaying = [];
let playerCounter = 0;
let allPlayersBust = false;

// Function to creat a deck of cards
const makeDeck = function () {
  // Initialise an empty deck array
  let cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  let suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  let suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    let currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    let rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      let cardName = rankCounter;
      let newRank = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        newRank = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        newRank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        newRank = 10;
      }

      // Create a new card with the current name, suit, and rank
      let card = {
        name: cardName,
        suit: currentSuit,
        rank: newRank,
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
const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
const shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  let currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    let randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Create a deck of cards
const deck = makeDeck();

// Shuffled deck of cards
const shuffledDeck = shuffleCards(deck);

// Create players objects function
const createPlayers = function (input) {
  //  a. User to input number of players playing.
  //  b. Generate the number of players according to the input number.
  //  c. Players have attributes: Player Number, Chips.
  let playerLimit = ["1", "2", "3", "4"];
  if (playerLimit.includes(input)) {
    for (i = 1; i <= input; i += 1) {
      var player = {
        number: i,
        chips: 100,
        bet: 0,
        hand: [],
        handvalue: 0,
        blackjack: false,
        bust: false,
        gameOver: false,
      };
      numOfPlayersPlaying.push(player);
    }
  } else {
    return "Please enter the number of players playing (max. 4 players).";
  }
  input = null;
  gameMode = ENTER_BET;
  return "Time to place your bet! Each player has 100 chips to play. <br> Player 1, please submit your bet amount.";
};

// Receive player bet value and update player objects
const playerBets = function (input) {
  //  b. Num of players unknown so will need to determine if the player counter meets the length of total number of player array.
  //  c. For each player in the array, replace the bet value with the input value the user entered.
  //    i. Need to convert each player's input into number.
  //    ii. Validate user input.
  //  d. Once done, enter deal card mode.
  input = Number(input);
  if (isNaN(input) || input == "") {
    return `Player ${numOfPlayersPlaying[playerCounter].number}, you have ${numOfPlayersPlaying[playerCounter].chips} chips. <br> Please place bet within your limit.`;
  } else if (numOfPlayersPlaying[playerCounter].gameOver == true) {
    playerCounter += 1;
    return `Player ${
      numOfPlayersPlaying[playerCounter - 1].number
    } Game Over! <br> Player ${
      numOfPlayersPlaying[playerCounter].number
    }, it is your turn to place bet. <br> You have ${
      numOfPlayersPlaying[playerCounter].chips
    } chips.`;
  } else if (input != "" && playerCounter + 1 == numOfPlayersPlaying.length) {
    numOfPlayersPlaying[playerCounter].bet = input;
    playerCounter = 0;
    gameMode = DEAL_CARDS;
  } else if (input > 0 && input <= numOfPlayersPlaying[playerCounter].chips) {
    numOfPlayersPlaying[playerCounter].bet = input;
    playerCounter += 1;
    if (numOfPlayersPlaying[playerCounter].gameOver == true) {
      playerCounter += 1;
      return `Player ${
        numOfPlayersPlaying[playerCounter - 1].number
      } Game Over! <br> Player ${
        numOfPlayersPlaying[playerCounter].number
      }, it is your turn to place bet. <br> You have ${
        numOfPlayersPlaying[playerCounter].chips
      } chips.`;
    } else {
      return `Player ${numOfPlayersPlaying[playerCounter].number}, it is your turn to place bet. <br> You have ${numOfPlayersPlaying[playerCounter].chips} chips.`;
    }
  } else {
    return `Player ${numOfPlayersPlaying[playerCounter].number}, you have ${numOfPlayersPlaying[playerCounter].chips} chips. <br> Please place bet within your limit.`;
  }
};

// Player auto receive 2 cards each.
const dealCard = function (players) {
  // Each player to draw 2 cards before Dealer.
  //  a. Cards are stored in the player's attribute and be cleared after each round.
  let index = 0;
  while (index < players.length) {
    if (players[index].gameOver == true) {
      index += 1;
    } else {
      players[index].hand = [shuffledDeck.pop(), shuffledDeck.pop()];
      if (
        players[index].hand[0].name == "ace" &&
        players[index].hand[1].name == "ace"
      ) {
        players[index].handvalue = 12;
      } else if (
        (players[index].hand[0].name == "ace" &&
          players[index].hand[1].rank == 10) ||
        (players[index].hand[0].rank == 10 &&
          players[index].hand[1].name == "ace")
      ) {
        players[index].handvalue = 21;
        players[index].blackjack = true;
      } else if (
        players[index].hand[0].name == "ace" ||
        players[index].hand[1].name == "ace"
      ) {
        players[index].handvalue =
          players[index].hand[0].rank + players[index].hand[1].rank + 10;
      } else {
        players[index].handvalue =
          players[index].hand[0].rank + players[index].hand[1].rank;
      }
      index += 1;
    }
  }
  // Dealer to draw 2 cards.
  dealerHand.hand = [shuffledDeck.pop(), shuffledDeck.pop()];

  if (
    (dealerHand.hand[0].name == "ace" && dealerHand.hand[1].rank == 10) ||
    (dealerHand.hand[0].rank == 10 && dealerHand.hand[1].name == "ace")
  ) {
    dealerHand.handvalue = 21;
    dealerHand.blackjack = true;
  } else {
    dealerHand.handvalue = dealerHand.hand[0].rank + dealerHand.hand[1].rank;
  }
  playerCounter = 0;
  gameMode = PLAY_GAME;
};

// Display current hand a player/dealer has.
const displayHand = function (player) {
  let message = "";
  if (player.gameOver == true) {
    message += "Game Over! <br> -------------------- <br>";
  } else {
    let i = 0;
    while (i < player.hand.length) {
      message += `${player.hand[i].name}${player.hand[i].suit} | `;
      i += 1;
    }
    message += `<br> Hand value: ${player.handvalue} <br> -------------------- <br>`;
  }
  return message;
};

// Display current hand of all players and dealer.
const playerHandBoard = function (players) {
  let message = "";
  for (let player of players) {
    message += `Player ${player.number}: ${displayHand(player)}`;
  }
  return message;
};

// Display dealer hand in different game modes.
const dealerHandBoard = function () {
  if (gameMode == DEALER_TURN) {
    return `Dealer hand: ${displayHand(dealerHand)}`;
  } else {
    return `Dealer hand: ${dealerHand.hand[0].name}${dealerHand.hand[0].suit} 🎴 <br> -------------------- <br> `;
  }
};

// calculate bet when a player win/lose and add/deduct from player chips amount.
const calcBetWinLose = function (player) {
  if (player.gameOver == true) {
    return "Game Over!";
  } else if (
    (dealerHand.blackjack == true && player.blackjack == true) ||
    (dealerHand.handvalue == player.handvalue && player.bust == false)
  ) {
    player.bet = 0;
    return "It is a push! Your chips are safe";
  } else if (
    dealerHand.blackjack == true ||
    player.bust == true ||
    (player.bust == true && dealerHand.bust == true) ||
    (player.handvalue < dealerHand.handvalue && dealerHand.bust == false)
  ) {
    player.chips -= player.bet;
    player.bet = 0;
    return `You lose! <br> Chips remaining: ${numOfPlayersPlaying[playerCounter].chips}`;
  } else if (player.blackjack == true) {
    player.chips += player.bet * 2.5;
    player.bet = 0;
    return `Blackjack! You win! <br> Your fortune: ${numOfPlayersPlaying[playerCounter].chips} chips`;
  } else if (
    dealerHand.bust == true ||
    player.handvalue > dealerHand.handvalue
  ) {
    player.chips += player.bet;
    player.bet = 0;
    return `You win! <br> Your fortune: ${numOfPlayersPlaying[playerCounter].chips} chips`;
  }
};

// Function to validate player input to hit, stand and update their hand
const hitStandSplit = function (input) {
  const playerchoice = ["hit", "stand", "split"];
  input = input.toLowerCase().trim();
  let message = "";

  if (numOfPlayersPlaying[playerCounter].gameOver == true) {
    playerCounter += 1;
    message = `Player ${
      numOfPlayersPlaying[playerCounter - 1].number
    }, Game Over <br> `;
    if (playerCounter == numOfPlayersPlaying.length) {
      gameMode = DEALER_TURN;
      playerCounter = 0;
      message += `${dealerHandBoard()} ${playerHandBoard(
        numOfPlayersPlaying
      )} Click submit for Dealer to draw card.`;
    } else {
      message += `It is now Player ${
        numOfPlayersPlaying[playerCounter].number
      }'s turn. Your hand: ${displayHand(
        numOfPlayersPlaying[playerCounter]
      )} I dare you to Hit! <br> or Stand, it's up to you...`;
    }
  } else if (playerchoice.includes(input)) {
    switch (input) {
      case "hit":
        numOfPlayersPlaying[playerCounter].hand.push(shuffledDeck.pop());
        numOfPlayersPlaying[playerCounter].handvalue +=
          numOfPlayersPlaying[playerCounter].hand[
            numOfPlayersPlaying[playerCounter].hand.length - 1
          ].rank;
        if (
          (numOfPlayersPlaying[playerCounter].hand.length >= 3 &&
            numOfPlayersPlaying[playerCounter].handvalue > 21 &&
            numOfPlayersPlaying[playerCounter].hand[0].name == "ace") ||
          numOfPlayersPlaying[playerCounter].hand[1].name == "ace"
        ) {
          numOfPlayersPlaying[playerCounter].handvalue -= 10;
        } else if (
          (numOfPlayersPlaying[playerCounter].hand.length >= 3 &&
            numOfPlayersPlaying[playerCounter].handvalue + 10 <= 21 &&
            numOfPlayersPlaying[playerCounter].hand[0].name == "ace") ||
          numOfPlayersPlaying[playerCounter].hand[1].name == "ace" ||
          numOfPlayersPlaying[playerCounter].hand[
            numOfPlayersPlaying[playerCounter].hand.length - 1
          ].name == "ace"
        ) {
          numOfPlayersPlaying[playerCounter].handvalue += 10;
        }
        message = `Player ${
          numOfPlayersPlaying[playerCounter].number
        }, you drew ${
          numOfPlayersPlaying[playerCounter].hand[
            numOfPlayersPlaying[playerCounter].hand.length - 1
          ].name
        }${
          numOfPlayersPlaying[playerCounter].hand[
            numOfPlayersPlaying[playerCounter].hand.length - 1
          ].suit
        } <br> -------------------- <br> ${displayHand(
          numOfPlayersPlaying[playerCounter]
        )} I dare you to Hit! <br> or Stand, it's up to you...`;
        if (numOfPlayersPlaying[playerCounter].handvalue > 21) {
          numOfPlayersPlaying[playerCounter].bust = true;
          message = `Player ${numOfPlayersPlaying[playerCounter].number}, `;
          playerCounter += 1;
          if (playerCounter == numOfPlayersPlaying.length) {
            gameMode = DEALER_TURN;
            message += `You bust! Dealer's turn! <br> ${dealerHandBoard()} ${playerHandBoard(
              numOfPlayersPlaying
            )} Click submit for Dealer to draw card.`;
          } else {
            if (numOfPlayersPlaying[playerCounter].gameOver == true) {
              playerCounter += 1;
              message += `You bust! <br> Player ${
                numOfPlayersPlaying[playerCounter - 1].number
              } Game Over. <br> It is now Player ${
                numOfPlayersPlaying[playerCounter].number
              }'s turn. Your hand: ${displayHand(
                numOfPlayersPlaying[playerCounter]
              )} <br> I dare you to Hit! <br> or Stand, it's up to you...`;
            } else {
              message += `You bust! <br> It is now Player ${
                numOfPlayersPlaying[playerCounter].number
              }'s turn. Your hand: ${displayHand(
                numOfPlayersPlaying[playerCounter]
              )} <br> I dare you to Hit! <br> or Stand, it's up to you...`;
            }
          }
        }
        break;
      case "stand":
        playerCounter += 1;

        if (playerCounter == numOfPlayersPlaying.length) {
          gameMode = DEALER_TURN;
          message = `Player ${numOfPlayersPlaying[playerCounter - 1].number} `;
          if (numOfPlayersPlaying[playerCounter - 1].gameOver == true) {
            message += `Game Over! <br> ${dealerHandBoard()} ${playerHandBoard(
              numOfPlayersPlaying
            )}`;
          } else {
            message = `Dealer's turn! <br> ${dealerHandBoard()} ${playerHandBoard(
              numOfPlayersPlaying
            )} Click submit for Dealer to draw card.`;
          }
        } else if (numOfPlayersPlaying[playerCounter].gameOver == true) {
          message = `Player ${numOfPlayersPlaying[playerCounter].number} `;
          playerCounter += 1;
          message += `Game Over! <br> It is now Player ${
            numOfPlayersPlaying[playerCounter].number
          }'s turn. Your hand: ${displayHand(
            numOfPlayersPlaying[playerCounter]
          )} I dare you to Hit! <br> or Stand, it's up to you...`;
        } else {
          message = `It is now Player ${
            numOfPlayersPlaying[playerCounter].number
          }'s turn. Your hand: ${displayHand(
            numOfPlayersPlaying[playerCounter]
          )} I dare you to Hit! <br> or Stand, it's up to you...`;
        }
        break;
    }
  } else {
    message = `Player ${
      numOfPlayersPlaying[playerCounter].number
    }, you have ${displayHand(
      numOfPlayersPlaying[playerCounter]
    )} <br> I dare you to Hit! <br> or Stand, it's up to you...`;
  }
  return message;
};

// Function to check Player/Dealer Blackjack conditions -- cannot get out of game mode
const checkBlackJack = function (players) {
  let message = ``;
  if (dealerHand.blackjack == true) {
    let index = 0;
    message = "Dealer Blackjack! <br>";
    while (index < players.length) {
      message += `Player ${players[index].number}: ${calcBetWinLose(
        players[index]
      )}<br>`;
      players[index].hand = [];
      index += 1;
    }
    playerCounter = 0;
    dealerHand.blackjack = false;
    gameMode = ENTER_BET;
  } else if (players[index].blackjack == true) {
    message = `Player ${players[index].number} Blackjack! <br>`;
    index += 1;
    if (index == players.length) {
      gameMode = DEALER_TURN;
      message += `${dealerHandBoard()} ${playerHandBoard(
        numOfPlayersPlaying
      )} <br> Click submit for Dealer to check card.`;
    } else {
      if (players[index].gameOver == true) {
        index += 1;
        message += `Player ${players[index].number} Game Over! <br> Player ${
          players[index].number
        }'s turn! ${displayHand(
          players[index]
        )} I dare you to Hit! <br> or Stand, it's up to you...`;
      } else {
        message += `Player ${players[index].number}'s turn! ${displayHand(
          players[index]
        )} I dare you to Hit! <br> or Stand, it's up to you...`;
      }
    }
  } else {
    message = `${hitStandSplit(input, players[index])}`;
    index += 1;
  }
  return message;
};

const checkGameOver = function (players) {
  for (i = 0; i < players.length; i += 1) {
    if (players[i].chips == 0) {
      players[i].gameOver = true;
    }
  }
};

const resetPlayerStats = function () {
  numOfPlayersPlaying[playerCounter].bet = 0;
  numOfPlayersPlaying[playerCounter].blackjack = false;
  numOfPlayersPlaying[playerCounter].bust = false;
  allPlayersBust = false;
};

const resetDealerStats = function () {
  dealerHand.blackjack = false;
  dealerHand.bust = false;
};

const checkAllPlayerBust = function (players) {
  let bustCounter = 0;
  for (i = 0; i < players.length; i += 1) {
    if (players[i].bust == true) {
      bustCounter += 1;
    }
  }
  if (bustCounter == players.length) {
    allPlayersBust = true;
  }
};

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == ENTER_NUM_PLAYER) {
    return createPlayers(input);
  }

  // Players to determine how much chip to bet for that round.
  //  a. Enter bet mode to take in player bets.
  if (gameMode == ENTER_BET) {
    checkGameOver(numOfPlayersPlaying);
    myOutputValue = playerBets(input);
  }
  // The cards are dealed and displayed to the user.
  if (gameMode == DEAL_CARDS) {
    dealCard(numOfPlayersPlaying);
    gameMode = PLAY_GAME;
    return `${dealerHandBoard()} ${playerHandBoard(
      numOfPlayersPlaying
    )} Player ${
      numOfPlayersPlaying[playerCounter].number
    } Click submit to start game.`;
  }

  // The cards are analysed for game winning conditions, e.g. Blackjack.
  //  a. Player card will be displayed during their own turn.
  // Each player is able to choose to Hit, Stand or Split by clicking the respective buttons.

  if (gameMode == PLAY_GAME) {
    //myOutputValue = checkHands(numOfPlayersPlaying, input);
    myOutputValue = "";
    if (dealerHand.blackjack == true) {
      myOutputValue = "Dealer Blackjack! <br>";
      while (playerCounter < numOfPlayersPlaying.length) {
        myOutputValue += `Player ${
          numOfPlayersPlaying[playerCounter].number
        }: ${calcBetWinLose(numOfPlayersPlaying[playerCounter])}<br>`;
        resetPlayerStats();
        playerCounter += 1;
      }
      myOutputValue += "Click submit to play next round.";
      playerCounter = 0;
      resetDealerStats();
      gameMode = ENTER_BET;
    } else if (numOfPlayersPlaying[playerCounter].blackjack == true) {
      myOutputValue = `Player ${numOfPlayersPlaying[playerCounter].number} Blackjack! <br>`;
      playerCounter += 1;
      if (playerCounter == numOfPlayersPlaying.length) {
        myOutputValue += `Dealer's turn! <br> ${dealerHandBoard()} ${playerHandBoard(
          numOfPlayersPlaying
        )} Click submit for Dealer to draw card.`;
        gameMode = DEALER_TURN;
      } else {
        if (numOfPlayersPlaying[playerCounter].gameOver == true) {
          playerCounter += 1;
          myOutputValue += `Player ${
            numOfPlayersPlaying[playerCounter - 1].number
          } Game Over! <br> Player ${
            numOfPlayersPlaying[playerCounter].number
          }'s turn! ${displayHand(
            numOfPlayersPlaying[playerCounter]
          )} I dare you to Hit! <br> or Stand, it's up to you...`;
        } else {
          myOutputValue += `Player ${
            numOfPlayersPlaying[playerCounter].number
          }'s turn! ${displayHand(
            numOfPlayersPlaying[playerCounter]
          )} I dare you to Hit! <br> or Stand, it's up to you...`;
        }
      }
    } else {
      return `${hitStandSplit(input, numOfPlayersPlaying[playerCounter])}`;
    }
  }

  if (gameMode == DEALER_TURN) {
    playerCounter = 0;
    checkAllPlayerBust(numOfPlayersPlaying);
    if (allPlayersBust == true) {
      myOutputValue = `Dealer Win! <br> ${dealerHandBoard()} ${playerHandBoard(
        numOfPlayersPlaying
      )}. Click submit to play next round.`;
      resetPlayerStats();
      resetDealerStats();
      gameMode = ENTER_BET;
    }
    if (dealerHand.handvalue <= 16) {
      dealerHand.hand.push(shuffledDeck.pop());
      dealerHand.handvalue += dealerHand.hand[dealerHand.hand.length - 1].rank;
      myOutputValue = `Dealer drew ${
        dealerHand.hand[dealerHand.hand.length - 1].name
      }${
        dealerHand.hand[dealerHand.hand.length - 1].suit
      } <br> -------------------- <br>${dealerHandBoard()} ${playerHandBoard(
        numOfPlayersPlaying
      )}`;
    } else if (dealerHand.handvalue > 21) {
      dealerHand.bust = true;
      myOutputValue = `Dealer drew ${
        dealerHand.hand[dealerHand.hand.length - 1].name
      }${
        dealerHand.hand[dealerHand.hand.length - 1].suit
      } <br> -------------------- <br> Dealer Bust! <br> ${dealerHandBoard()} ${playerHandBoard(
        numOfPlayersPlaying
      )}`;
      while (playerCounter < numOfPlayersPlaying.length) {
        myOutputValue += `Player ${
          numOfPlayersPlaying[playerCounter].number
        }: ${calcBetWinLose(numOfPlayersPlaying[playerCounter])}<br>`;
        resetPlayerStats();
        playerCounter += 1;
      }
      myOutputValue += "Click submit to play next round.";
      playerCounter = 0;
      resetDealerStats();
      gameMode = ENTER_BET;
    } else if (dealerHand.handvalue > 16) {
      myOutputValue = `${dealerHandBoard()} ${playerHandBoard(
        numOfPlayersPlaying
      )}`;
      while (playerCounter < numOfPlayersPlaying.length) {
        myOutputValue += `Player ${
          numOfPlayersPlaying[playerCounter].number
        }: ${calcBetWinLose(numOfPlayersPlaying[playerCounter])}<br>`;
        resetPlayerStats();
        playerCounter += 1;
      }
      myOutputValue += "Click submit to play next round.";
      playerCounter = 0;
      resetDealerStats();
      gameMode = ENTER_BET;
    }
  }
  return myOutputValue;
};

// ---- DOM Manipulation ----
// var hitButton;
// var standButton;
// var container = document.getElementById("container");
// hitButton = document.createElement("button");
// standButton = document.createElement("button");
// hitButton.innerText = "Hit";
// standButton.innerText = "Stand";
// container.appendChild(hitButton);
// container.appendChild(standButton);
// var message = "";
// hitButton.addEventListener("click", function () {
//   message = hitStandSplit("hit", numOfPlayersPlaying[playerCounter]);
// });
// var hitButton = document.getElementById("hit-button");
// hitButton.addEventListener("click", function () {
//   message = hitStandSplit("hit", numOfPlayersPlaying[playerCounter]);
// });
// hitButton.remove();
// standButton.remove();
