//create a deck of cards
var makeDeck = function () {
  var deck = [];
  var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
  var emojiSuits = ["♣️", "♦️", "♥️", "♠️"];
  for (var i = 0; i < suits.length; i += 1) {
    var suit = suits[i];
    var emojiSuit = emojiSuits[i];
    for (var rank = 1; rank <= 13; rank += 1) {
      var card = {
        suit: suit,
        emojiSuit: emojiSuit,
        rank: rank,
        value: rank,
        name: rank.toString(),
      };
      if (rank == 1) {
        card.name = "A";
      } else if (rank == 11) {
        card.name = "J";
        card.value = 10;
      } else if (rank == 12) {
        card.name = "Q";
        card.value = 10;
      } else if (rank == 13) {
        card.name = "K";
        card.value = 10;
      }
      deck.push(card);
    }
  }
  return deck;
};
//get random index ranging from 0 to max
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
//get a shuffled deck
var shuffleDeck = function (deck) {
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    var randomIndex = getRandomIndex(deck.length);
    var randomCard = deck[randomIndex];
    var currentCard = deck[currentIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return deck;
};

var createPlayer = function (name, balance) {
  return {
    name: name,
    balance: balance,
    bet: 0,
    hand: [],
  };
};

//defining global variables
var deck = makeDeck();
shuffleDeck(deck);
var numberOfPlayers = 0;
var currentPlayer = -1;
var players = [];
var dealerHand = [];

//defining game modes
var SELECT_PLAYERS = "select players";
var ENTER_NAME = "enter name";
var SET_BET = "set bet";
var PLAYER_DRAW_CARD = "player draw card";
var DEALER_DRAW_CARD = "dealer draw card";
var PLAYER_HIT_OR_STAND = "player hit or stand";
var DEALER_HIT_OR_STAND = "dealer hit or stand";
var GAME_OUTCOME = "game outcome";
var gameState = SELECT_PLAYERS;

var calculateScore = function (cards) {
  //if there are 2 cards and both cards are ace, return blackjack
  if (cards.length == 2) {
    if (cards[0].rank == 1 && cards[1].rank == 1) {
      return 21;
    }
  }
  var score = 0;
  var hasAce = false;
  for (var i = 0; i < cards.length; i += 1) {
    var card = cards[i];
    if (card.rank == 1) {
      hasAce = true;
    }
    score = score + card.value;
  }
  //total sum of cards <=10, ace automaticalyy converts to 11
  if (score < 21 && hasAce) {
    if (score + 10 <= 21) {
      score = score + 10;
    }
  }
  return score;
};

//beautifying the display of hands
var displayHand = function (cards) {
  var hand = "";
  if (cards.length == 0) {
    return "No cards";
  }
  //if its the last card, will not add a comma. if not will add a comma
  for (var i = 0; i < cards.length; i += 1) {
    var card = cards[i];
    if (i == cards.length - 1) {
      hand = hand + `${card.name}${card.emojiSuit}`;
    } else {
      hand = hand + `${card.name}${card.emojiSuit}, `;
    }
  }
  return hand;
};

//loops through each player, generates info about each player and creates a string and appends this string to this display table
var displayTable = function (message, showBetAndBalanceOnly) {
  var table = "";
  for (var i = 0; i < players.length; i += 1) {
    var player = players[i];
    if (showBetAndBalanceOnly == false) {
      table =
        table +
        `<b>${player.name}</b>: Hand: ${displayHand(
          player.hand
        )}, Score: ${calculateScore(player.hand)}, Balance: $${
          player.balance
        }, Bet: $${player.bet} <br>`;
    } else if (showBetAndBalanceOnly == true) {
      table =
        table +
        `<b>${player.name}</b>: Balance: $${player.balance}, Bet: $${player.bet} <br>`;
    }
  }
  if (showBetAndBalanceOnly == false) {
    table =
      table +
      `<b>Dealer</b>: ${displayHand(dealerHand)}, Score: ${calculateScore(
        dealerHand
      )}
     <br><br>`;
  } else if (showBetAndBalanceOnly == true) {
  }
  //add table in front of the message
  table = table + message;
  return table;
};

//compare the winning outcome
var compare = function (playerScore, dealerScore) {
  if (playerScore > 21 && dealerScore > 21) {
    return "draw🤝";
  }
  if (playerScore > 21 && dealerScore <= 21) {
    return "lose😭";
  }
  if (playerScore <= 21 && dealerScore > 21) {
    return "win🎉";
  }
  if (playerScore > dealerScore) {
    return "win🎉";
  }
  if (playerScore < dealerScore) {
    return "lose😭";
  }
  if (playerScore == dealerScore) {
    return "draw🤝";
  }
};

var main = function (input) {
  if (gameState == SELECT_PLAYERS) {
    gameState = ENTER_NAME;
    return `<b>🃏Welcome to BlackJack🃏</b><br><br> <u>Rules of the game</u><br> 1️⃣ Each participant attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21 <br> 2️⃣ If a player's first two cards are an ace and a a picture card or 10, giving a count of 21 in two cards, this is a BlackJack. Player's turn ends immediately and win.
    
    
    <br> 3️⃣ 2 ace is worth 1 or 11 depending on the sum of your total cards <br>4️⃣ Before the deal begins, each player places a bet, in chips, in front of them in the designated area. Each player starts with $100 credits. <br> 5️⃣ When all the players have placed their bets, the dealer gives two card face up to each player in rotation clockwise. <br> 6️⃣ Each player decides whether to hit or stand, using the deal button to submit their choice.<br> 7️⃣ Player turns ends immediately if player their hand burst. <br><br> 💰Win= win bet amount; 💰Lose = lose bet amount. <br><br> 👉 Please enter number of players above`;
  } else if (gameState == ENTER_NAME) {
    if (numberOfPlayers == 0) {
      if (isNaN(Number(input)) || Number(input) < 1) {
        return `Nice Try 🤨 <br>👉 Please enter valid number of players`;
      }
    }
    if (currentPlayer == -1) {
      numberOfPlayers = input;
      currentPlayer = 0;
      return `Player 1, 👉please enter your name`;
    } else {
      var balance = 100;
      players.push(createPlayer(input, balance));
      currentPlayer = currentPlayer + 1;
      if (currentPlayer < numberOfPlayers) {
        return `Player ${currentPlayer + 1}, 👉please enter your name `;
      } else {
        gameState = SET_BET;
        currentPlayer = 0;
        return displayTable(
          `<br> <b>${players[currentPlayer].name}</b>, you have ${players[currentPlayer].balance} credits. <br> 👉Please make your bet`,
          true
        );
      }
    }
  } else if (gameState == SET_BET) {
    var player = players[currentPlayer];
    var bet = Number(input);
    if (isNaN(bet)) {
      return `Nice Try 🤨. <br>👉Please input a valid bet. <b>${player.name}</b>, <br> You have ${players[currentPlayer].balance} credits. <br> 👉Please make your bet`;
    }
    if (bet > player.balance) {
      return `Nice Try 🤨. <br>Please do not bet more than you have. <b>${player.name}</b>, <br> You have ${players[currentPlayer].balance} credits. <br> 👉Please make your bet`;
    }
    if (bet == 0) {
      return `Nice Try 🤨. <br>Please bet something. <b>${player.name}</b>, <br> You have ${players[currentPlayer].balance} credits. <br> 👉Please make your bet`;
    }
    player.bet = bet;
    player.balance = player.balance - bet;
    currentPlayer = currentPlayer + 1;
    if (currentPlayer < numberOfPlayers) {
      return displayTable(
        `<br><b>${players[currentPlayer].name}</b>,you have ${players[currentPlayer].balance} credits. <br> 👉Please make your bet`,
        true
      );
    } else {
      currentPlayer = 0;
      gameState = PLAYER_DRAW_CARD;
      return displayTable(
        `<br>All bets have been placed. <br> <b>${players[currentPlayer].name}</b>, 👉Please draw cards by clicking "submit"`,
        true
      );
    }
  } else if (gameState == PLAYER_DRAW_CARD) {
    var player = players[currentPlayer];
    //draw 2 cards at once for each player
    player.hand.push(deck.pop());
    player.hand.push(deck.pop());
    currentPlayer = currentPlayer + 1;
    if (currentPlayer < numberOfPlayers) {
      return displayTable(
        `<b>${players[currentPlayer].name}</b>, 👉Please draw cards by clicking "submit"`,
        false
      );
    } else {
      currentPlayer = 0;
      gameState = DEALER_DRAW_CARD;
      return displayTable(
        `All players have drawn cards, dealer will now draw 2 cards.<br> 👉Click "submit" to view dealer's cards`,
        false
      );
    }
  } else if (gameState == DEALER_DRAW_CARD) {
    dealerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    currentPlayer = 0;
    gameState = PLAYER_HIT_OR_STAND;
    return displayTable(
      `${players[currentPlayer].name}</b>, 👉Type "hit" to draw an additional card. 👉Type "stand" to end your turn`,
      false
    );
  } else if (gameState == PLAYER_HIT_OR_STAND) {
    var playerInput = input;
    var player = players[currentPlayer];
    var playerDone = "done";
    if (playerInput != "hit" && playerInput != "stand") {
      return `Invalid choice. <b>${player.name}</b> 👉Type "hit" to draw an additional card. 👉Type "stand" to end your turn`;
    }
    if (playerInput == "hit") {
      player.hand.push(deck.pop());
      if (calculateScore(player.hand) > 21) {
        playerDone = "bust";
        playerInput = "stand";
      } else {
        return displayTable(
          `<b>${player.name}</b> 👉Type "hit" to draw an additional card. 👉Type "stand" to end your turn`,
          false
        );
      }
    }
    if (playerInput == "stand") {
      currentPlayer = currentPlayer + 1;
      if (currentPlayer < numberOfPlayers) {
        return displayTable(
          `<b>${player.name}</b> is ${playerDone}. ${players[currentPlayer].name} <br>👉Type "hit" to draw an additional card. 👉Type "stand" to end your turn`,
          false
        );
      } else {
        gameState = DEALER_HIT_OR_STAND;
        currentPlayer = 0;
        return displayTable(
          `All players are done, dealer will now draw. <br>👉Please click "submit" to view dealer's card`,
          false
        );
      }
    }
  } else if (gameState == DEALER_HIT_OR_STAND) {
    while (calculateScore(dealerHand) < 17) {
      dealerHand.push(deck.pop());
    }
    currentPlayer = 0;
    var player = players[currentPlayer];
    gameState = GAME_OUTCOME;
    return displayTable(
      `All cards are drawn! <br> <b>${player.name}</b>, 👉please click "submit" to see your outcome`,
      false
    );
  } else if (gameState == GAME_OUTCOME) {
    var player = players[currentPlayer];
    currentPlayer = currentPlayer + 1;
    var gameOutcome = "";
    if (
      compare(calculateScore(player.hand), calculateScore(dealerHand)) ==
      "lose😭"
    ) {
      gameOutcome = "lose😭";
      player.bet = 0;
      player.hand = [];
      if (player.balance == 0) {
        players.splice(currentPlayer - 1, 1);
        currentPlayer = currentPlayer - 1;
        numberOfPlayers = numberOfPlayers - 1;
      }
    } else if (
      compare(calculateScore(player.hand), calculateScore(dealerHand)) ==
      "win🎉"
    ) {
      gameOutcome = "win🎉";
      player.balance = player.balance + player.bet * 2;
      player.bet = 0;
      player.hand = [];
    } else {
      gameOutcome = "draw🤝";
      player.balance = player.balance + player.bet;
      player.bet = 0;
      player.hand = [];
    }

    if (currentPlayer < numberOfPlayers) {
      return displayTable(
        `<b>${player.name} ${gameOutcome}!</b><br> <b>${players[currentPlayer].name}</b> please click "submit" to see your outcome`,
        false
      );
      //once a new round starts
    } else {
      gameState = SET_BET;
      currentPlayer = 0;
      if (numberOfPlayers == 0) {
        return `all players are bust, game over`;
      }
      deck = makeDeck();
      shuffleDeck(deck);
      dealerHand = [];
      return displayTable(
        `<b>${player.name} ${gameOutcome}!</b> <br> Next round is starting.<br> ${players[currentPlayer].name},👉Please make your bet`,
        false
      );
    }
  }
};
