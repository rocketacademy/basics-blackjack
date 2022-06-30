var gameState = "waiting";
var player = { cards: [], score: 0 };
var dealer = { cards: [], score: 0 };
var loseImage =
  '<img src ="https://c.tenor.com/XpZ1nVvr6DsAAAAM/diary-of-a-wimpy-kid-loser.gif" class = "center"/>';
var winImage =
  '<img src = "https://c.tenor.com/5bZBO8yLI78AAAAM/polygon-polypug.gif" class  = "center"/>';
var drawImage =
  '<img src = "https://c.tenor.com/wyfhYqF1tJIAAAAM/mark-wahlberg-wahlberg.gif" class = "center"/>';
  var waitImage =
    '<img src = "https://c.tenor.com/U4ss8KmnGZMAAAAM/wait-waiting.gif" class = "center"/>';
var makeDeck = function () {
  var deck = [];
  var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
  for (let index = 0; index < suits.length; index++) {
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var temp = cardName;
      if (cardName == "1") {
        cardName = "Ace";
        temp = rankCounter;
        rankCounter = 11;
      } else if (cardName == "11") {
        cardName = "Jack";
        temp = rankCounter;
        rankCounter = 10;
      } else if (cardName == "12") {
        cardName = "Queen";
        temp = rankCounter;
        rankCounter = 10;
      } else if (cardName == "13") {
        cardName = "King";
        temp = rankCounter;
        rankCounter = 10;
      }
      var card = {
        name: cardName,
        rank: rankCounter,
        suit: suits[index],
      };
      deck.push(card);
      rankCounter = temp;
      rankCounter += 1;
    }
  }
  return deck;
};

//shuffle deck helper function
var shuffleDeck = function (deck) {
  for (let index = deck.length - 1; index >= 0; index--) {
    var j = Math.floor(Math.random() * index);
    var temp = deck[index];
    deck[index] = deck[j];
    deck[j] = temp;
  }
  return deck;
};
var cardDeck = shuffleDeck(makeDeck());

var displaySuit = function (Suit) {
  switch (Suit) {
    case "Hearts": {
      return '<font color="red"> ♥️ </font>';
    }
    case "Diamonds": {
      return '<font color="red">  ♦️ </font>';
    }
    case "Spades": {
      return "♠️";
    }
    case "Clubs": {
      return "♣️";
    }
  }
};
var showCard = function (hand) {
  var output = "";
  for (let index = 0; index < hand.length; index++) {
    output += `${hand[index].name} of ${displaySuit(hand[index].suit)} <br>`;
  }
  return output;
};
//check blackjack
var checkBlackJack = function (hand) {
  if (
    (hand[0].name == "Ace" && hand[1].rank >= 10) ||
    (hand[1].name == "Ace" && hand[0].rank >= 10)
  ) {
    return true;
  }
  return false;
};

//find scores of player
var evaluate = function (playing) {
  for (let index = 0; index < playing.cards.length; index++) {
    if (playing.cards[index].cardName == "Ace") {
      if (playing.score <= 10) {
        playing.score += playing.cards[index].rank;
      } else {
        playing.score += 1;
      }
    } else {
      playing.score += playing.cards[index].rank;
    }
  }
};
// Deal function
var dealCards = function () {
  player = { cards: [], score: 0 };
  dealer = { cards: [], score: 0 };
  var output = "";
  for (let index = 0; index < 2; index++) {
    player.cards.push(cardDeck.pop());
    dealer.cards.push(cardDeck.pop());
  }
  var playerHand = showCard(player.cards);
  evaluate(player);
  evaluate(dealer);
  if (checkBlackJack(player.cards) && checkBlackJack(dealer.cards)) {
    return `Its a tie!<br>${drawImage}<br>Player's Hand:<br> ${showCard(
      player.cards
    )} Score: ${player.score}<br><br> Dealer's Hand:<br> ${showCard(
      dealer.cards
    )} Score: ${dealer.score}<br> Click deal to play again!`;
  } else if (checkBlackJack(player.cards)) {
    return `Congratulations! Its a blackjack! You have won!<br> ${winImage}<br>Player's Hand:<br> ${showCard(
      player.cards
    )} Score: ${player.score}<br><br> Dealer's Hand:<br> ${showCard(
      dealer.cards
    )} Score: ${dealer.score}<br> Click deal to play again!`;
  }
  return (
    output +
    `Player's Hand:<br> ${playerHand} Score: ${
      player.score
    }<br><br> Dealer's Hand:<br> ${dealer.cards[0].name} of ${displaySuit(
      dealer.cards[0].suit
    )}<br>${waitImage}`
  );
};

var outcome = function (play, deal) {
  if (checkBlackJack(deal.cards)) {
    return `Its a Blackjack! Dealer has won!` + loseImage;
  } else if (deal.score > 21) {
    return `You won! Dealer has busted` + winImage;
  } else if (play.score > deal.score) {
    return `You won!` + winImage;
  } else if (deal.score > play.score) {
    return `You lost!` + loseImage;
  }
  return `Its a tie!` + drawImage;
};

var hit = function (hand) {
  hand.cards.push(cardDeck.pop());
  hand.score += hand.cards[hand.cards.length - 1].rank;
  if (hand.score <= 21) {
    return `Player's Hand:<br> ${showCard(player.cards)} Score: ${
      player.score
    }<br><br> Dealer's Hand:<br> ${dealer.cards[0].name} of ${displaySuit(
      dealer.cards[0].suit
    )}<br>${waitImage}`;
  } else {
    return `You have busted! You have lost!<br>${loseImage}<br>Player's Hand:<br> ${showCard(
      player.cards
    )} Score: ${player.score}<br><br>Click Deal to play again!`;
  }
};

var stand = function () {
  while (dealer.score < 17) {
    dealer.cards.push(cardDeck.pop());
    dealer.score += dealer.cards[dealer.cards.length - 1].rank;
  }
  return `${outcome(player, dealer)} <br> Player's Hand:<br> ${showCard(
    player.cards
  )} Score: ${player.score}<br><br> Dealer's Hand:<br> ${showCard(
    dealer.cards
  )}Score: ${dealer.score} <br><br> Click Deal to play again!`;
};
