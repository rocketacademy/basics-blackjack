// declare variables
// use object for player stats instead
// reduce bank balance by bet amount
var numOfPlayers;
var currPlayer = 1;
var players = [];
var dealer = { hand: [], score: 0 };
var gameMode = "pending number of players";

// declare functions
// Make deck function
var makeDeck = function () {
  var deck = [];
  var counter = 0;
  var suits = ["clubs", "diamonds", "hearts", "spades"];

  for (counter; counter < 52; counter += 1) {
    var cardRank = (counter % 13) + 1;
    var cardName;
    switch (cardRank) {
      case 1:
        cardName = "ace";
        break;
      case 11:
        cardName = "joker";
        break;
      case 12:
        cardName = "queen";
        break;
      case 13:
        cardName = "king";
        break;
      default:
        cardName = cardRank.toString();
    }

    var card = {
      suit: suits[Math.floor(counter / 13)],
      rank: cardRank,
      name: cardName,
      value: Math.min(cardRank, 10),
    };

    deck.push(card);
  }
  return deck;
};

// Shuffle deck function
var shuffle = function (cardDeck) {
  for (
    var currentIndex = 0;
    currentIndex < cardDeck.length;
    currentIndex += 1
  ) {
    var currentCard = cardDeck[currentIndex];
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

// Compute player score
// highest score not exceeding 21
var computeScore = function (playerHand) {
  var playerSum = 0;
  var numOfAces = playerHand.filter((card) => card.rank === 1).length; // ES6
  for (var cardNum = 0; cardNum < playerHand.length; cardNum += 1) {
    playerSum += playerHand[cardNum].value;
  }
  counter = 0;
  while ((playerSum <= 11) & (counter < numOfAces)) {
    playerSum += 10;
  }
  return playerSum;
};

var main = function (input) {
  console.log(gameMode);
  // get shuffled deck
  var deck = makeDeck();
  deck = shuffle(deck);

  if (gameMode == "pending number of players") {
    numOfPlayers = input;
    gameMode = "pending names";
    return `${numOfPlayers} players. Enter player 1 name.`;
  }

  if (gameMode == "pending names") {
    var output;
    var player = {};
    player.name = input;
    player.bank = 100;
    player.bet = 0;
    player.busted = false;
    player.hand = [];
    players.push(player);
    if (currPlayer < numOfPlayers) {
      currPlayer += 1;
      output = `Input player ${currPlayer} name.`;
    } else {
      currPlayer = 1;
      gameMode = "pending bets";
      output = "Place bets.";
    }
    return output;
  }

  if (gameMode == "pending bets") {
    players[currPlayer - 1].bet = input;
    players[currPlayer - 1].bank -= input;

    if (currPlayer < numOfPlayers) {
      currPlayer += 1;
      output = `Input player ${currPlayer} bet amount.`;
    } else {
      currPlayer = 1;
      gameMode = "deal cards";
      output = "Start game.";
    }
    return output;
  }

  if (gameMode == "deal cards") {
    // dealer gets 2 cards
    var dealerCard1 = deck.pop();
    var dealerCard2 = deck.pop();
    dealer.hand = [dealerCard1, dealerCard2];
    var output = `One of dealer's cards is: ${dealerCard1.name} <br><br>`;

    // each player gets 2 cards
    for (var playerNo = 0; playerNo < numOfPlayers; playerNo += 1) {
      var playerCard1 = deck.pop();
      var playerCard2 = deck.pop();
      var playerHand = [playerCard1, playerCard2];
      players[playerNo].hand = playerHand;
      players[playerNo].score = computeScore(playerHand);
      output += `Player ${playerNo + 1} cards are: ${playerCard1.name} and ${
        playerCard2.name
      }. <br><br>`;
    }

    gameMode = "serve player";

    // reveal cards
    return output + `Player ${currPlayer} decides to hit / stand.`;
  }

  if (gameMode == "serve player") {
    // if player decides to stand, no change to current hand
    if (input == "stand") {
      if (currPlayer == numOfPlayers) {
        gameMode = "reveal dealer cards";
        return "All players have been served.";
      } else {
        currPlayer += 1;
        return "Next player decides hit / stand.";
      }
    }

    // if player decides to hit, draw a new card
    if (input == "hit") {
      var player = players[currPlayer - 1];
      var playerHand = player.hand;
      var output;
      var newCard = deck.pop();
      output = `Player drew ${newCard.name} of ${newCard.suit}`;
      playerHand.push(newCard);
      player.hand = playerHand;

      // check if score is a bust
      var playerSum = computeScore(playerHand);
      player.score = playerSum;
      if (playerSum > 21) {
        player.busted = true;
        player.bet = 0;
        output = "Busted";
        players[currPlayer - 1] = player;

        // player is eliminated and round goes to next player
        currPlayer += 1;

        // need to check if last player + busted
        if (currPlayer > numOfPlayers) {
          gameMode = "reveal dealer cards";
          return "All players have been served.";
        }
      } else if (playerSum == 21) {
        player.bank += 1.5 * player.bet;
        player.bet = 0;
        player.score = 21;
        players[currPlayer - 1] = player;
      } else {
        players[currPlayer - 1] = player;
        output = "Decide to hit / stand.";
      }
      return output;
    }
  }

  if (gameMode == "reveal dealer cards") {
    // compute dealer score, draws cards until > 17 or busted
    var dealerSum = computeScore(dealer.hand);

    while (dealerSum < 17) {
      var newCard = deck.pop();
      dealer.hand.push(newCard);
      dealerSum = computeScore(dealer.hand);
    }

    var dealerBust = dealerSum > 21;

    // compute the final bank balances of players
    var output = `Dealer score is ${dealerSum}. <br><br>`;
    if (dealerBust) {
      for (var playerNum = 0; playerNum < numOfPlayers; playerNum += 1) {
        if (!players[playerNum].busted) {
          players[playerNum].bank += players[playerNum].bet * 2;
        }
        output += `Player ${playerNum + 1} scored ${
          players[playerNum].score
        } and has ${players[playerNum].bank} chips. <br><br>`;
        players[playerNum].bet = 0;
      }
    } else {
      for (var playerNum = 0; playerNum < numOfPlayers; playerNum += 1) {
        if (
          (players[playerNum].score > dealerSum) &
          (players[playerNum].score <= 21)
        ) {
          players[playerNum].bank += players[playerNum].bet * 2;
        }
        output += `Player ${playerNum + 1} scored ${
          players[playerNum].score
        } and has ${players[playerNum].bank} chips. <br><br>`;
        players[playerNum].bet = 0;
      }
    }
    gameMode = "pending bets";
    return output;
  }
};
