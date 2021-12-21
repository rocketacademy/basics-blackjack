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
// Output message of player card
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
  if (input != "" && playerCounter + 1 == numOfPlayersPlaying.length) {
    numOfPlayersPlaying[playerCounter].bet = Number(input);
    playerCounter = 0;
    gameMode = DEAL_CARDS;
  } else if (
    Number(input) > 0 &&
    Number(input) < numOfPlayersPlaying[playerCounter].chips
  ) {
    numOfPlayersPlaying[playerCounter].bet = Number(input);
    playerCounter += 1;
    return `Player ${numOfPlayersPlaying[playerCounter].number}, it is your turn to place bet.`;
  } else {
    return `Player ${numOfPlayersPlaying[playerCounter].number}, you have ${numOfPlayersPlaying[playerCounter].chips} chips. Please place bet within your limit.`;
  }
};

// Function to check if Player/Dealer has BlackJack
const checkBlackJack = function (user) {
  //if player has a Ace and a picture card, Ace rank value will switch to 11 and total hand value will be 21.
  if (
    (user.hand[0].name == "ace" && user.hand[1].rank == 10) ||
    (user.hand[0].rank == 10 && user.hand[1].name == "ace")
  ) {
    user.blackjack = true;
  }
};

// Player auto receive 2 cards each.
const dealCard = function (players) {
  // Each player to draw 2 cards before Dealer.
  //  a. Cards are stored in the player's attribute and be cleared after each round.
  index = 0;
  while (index < players.length) {
    players[index].hand.push(shuffledDeck.pop());
    players[index].hand.push(shuffledDeck.pop());
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
  // Dealer to draw 2 cards.
  dealerHand.hand = [shuffledDeck.pop(), shuffledDeck.pop()];
  dealerHand.handvalue += dealerHand.hand[0].rank + dealerHand.hand[1].rank;
  checkBlackJack(dealerHand);
  playerCounter = 0;
  gameMode = PLAY_GAME;
};

// Display current hand a player/dealer has.
const displayHand = function (user) {
  let message = "";
  index = 0;
  while (index < user.hand.length) {
    message += `${user.hand[index].name}${user.hand[index].suit} | `;
    index += 1;
  }
  message += `<br> Hand value: ${user.handvalue} <br> -------------------- <br>`;
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
  if (
    (dealerHand.blackjack == true && player.blackjack == true) ||
    dealerHand.handvalue == player.handvalue
  ) {
    player.bet = 0;
    return "It is a push!";
  } else if (
    dealerHand.blackjack == true ||
    player.bust == true ||
    (player.bust == true && dealerHand.bust == true) ||
    (player.handvalue < dealerHand.handvalue && dealerHand.bust == false)
  ) {
    player.chips -= player.bet;
    player.bet = 0;
    return "You lose!";
  } else if (player.blackjack == true) {
    player.chips += player.bet * 2.5;
    player.bet = 0;
    return "Blackjack! You win!";
  } else if (
    dealerHand.bust == true ||
    player.handvalue > dealerHand.handvalue
  ) {
    player.chips += player.bet;
    player.bet = 0;
    return "You win!";
  }
};

// Function to validate player input to hit, stand and update their hand
const hitStandSplit = function (input, player) {
  const playerchoice = ["hit", "stand", "split"];
  let message = ``;
  // need to figure out how to recalculate value of ace if there's 2 aces...
  if (playerchoice.includes(input.toLowerCase().trim())) {
    switch (input) {
      case "hit":
        player.hand.push(shuffledDeck.pop());
        player.handvalue += player.hand[player.hand.length - 1].rank;
        if (
          (player.hand.length >= 3 &&
            player.handvalue > 21 &&
            player.hand[0].name == "ace") ||
          player.hand[1].name == "ace"
        ) {
          player.handvalue -= 10;
        } else if (
          player.hand.length >= 3 &&
          player.handvalue + 10 < 21 &&
          player.hand[player.hand.length - 1].name == "ace"
        ) {
          player.handvalue += 10;
        }
        message = `Player ${player.number}, you drew ${
          player.hand[player.hand.length - 1].name
        }${
          player.hand[player.hand.length - 1].suit
        } <br> -------------------- <br> ${displayHand(
          player
        )} I dare you to Hit! <br> or Stand, it's up to you...`;
        if (player.handvalue > 21) {
          player.bust = true;
          playerCounter += 1;
          if (playerCounter == numOfPlayersPlaying.length) {
            gameMode = DEALER_TURN;
            message = `You bust! Dealer's turn! <br> ${dealerHandBoard()} ${playerHandBoard(
              numOfPlayersPlaying
            )}`;
          } else {
            message = `You bust! It is now Player ${
              numOfPlayersPlaying[playerCounter].number
            }'s turn. Your hand: ${displayHand(
              numOfPlayersPlaying[playerCounter]
            )} <br> I dare you to Hit! <br> or Stand, it's up to you...`;
          }
        }
        break;
      case "stand":
        playerCounter += 1;
        if (playerCounter == numOfPlayersPlaying.length) {
          gameMode = DEALER_TURN;
          playerCounter = 0;
          message = `${dealerHandBoard()} ${playerHandBoard(
            numOfPlayersPlaying
          )}`;
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
    message = `Player ${player.number}, you have ${displayHand(
      player
    )} <br> I dare you to Hit! <br> or Stand, it's up to you...`;
  }
  return message;
};

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == ENTER_NUM_PLAYER) {
    return createPlayers(input);
  }

  // Players to determine how much chip to bet for that round.
  //  a. Enter bet mode to take in player bets.
  if (gameMode == ENTER_BET) {
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
    if (dealerHand.blackjack == true) {
      myOutputValue = "";
      while (playerCounter < numOfPlayersPlaying.length) {
        myOutputValue += `Dealer Blackjack! Player ${
          numOfPlayersPlaying[playerCounter].number
        }: ${calcBetWinLose(numOfPlayersPlaying[playerCounter])}<br>`;
        numOfPlayersPlaying[playerCounter].hand = [];
        playerCounter += 1;
      }
      playerCounter = 0;
      dealerHand.blackjack = false;
      gameMode = DEAL_CARDS;
    } else if (numOfPlayersPlaying[playerCounter].blackjack == true) {
      playerCounter += 1;
      if (playerCounter == numOfPlayersPlaying.length) {
        gameMode = DEALER_TURN;
        return `Player ${
          numOfPlayersPlaying[playerCounter - 1].number
        } Blackjack!${dealerHandBoard()} ${playerHandBoard(
          numOfPlayersPlaying
        )}`;
      } else {
        return `Player ${
          numOfPlayersPlaying[playerCounter - 1].number
        } Blackjack! Player ${
          numOfPlayersPlaying[playerCounter].number
        }'s turn! ${displayHand(
          numOfPlayersPlaying[playerCounter]
        )} I dare you to Hit! <br> or Stand, it's up to you...`;
      }
    } else {
      return `${hitStandSplit(input, numOfPlayersPlaying[playerCounter])}`;
    }
  }

  if (gameMode == DEALER_TURN) {
    myOutputValue = "";
    playerCounter = 0;

    if (dealerHand.handvalue < 17) {
      dealerHand.hand.push(shuffledDeck.pop());
      dealerHand.handvalue += dealerHand.hand[dealerHand.hand.length - 1].rank;
      myOutputValue = `Dealer drew ${
        dealerHand.hand[dealerHand.hand.length - 1].name
      }${
        dealerHand.hand[dealerHand.hand.length - 1].suit
      } <br> -------------------- <br>${dealerHandBoard()} ${playerHandBoard(
        numOfPlayersPlaying
      )}`;
    }
    if (dealerHand.handvalue > 21) {
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
        numOfPlayersPlaying[playerCounter].hand = [];
        playerCounter += 1;
      }
      playerCounter = 0;
      dealerHand.handvalue = 0;
      gameMode = DEAL_CARDS;
    } else {
      while (playerCounter < numOfPlayersPlaying.length) {
        myOutputValue += `Player ${
          numOfPlayersPlaying[playerCounter].number
        }: ${calcBetWinLose(numOfPlayersPlaying[playerCounter])}<br>`;
        numOfPlayersPlaying[playerCounter].hand = [];
        playerCounter += 1;
      }
      playerCounter = 0;
      dealerHand.handvalue = 0;
      gameMode = DEAL_CARDS;
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
