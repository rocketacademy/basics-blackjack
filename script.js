var state = "";
var player1Cards = [];
var player1String = [];
var dealerCards = [];
var dealerString = [];
var message = "";
var player1Score = 0;
var dealerScore = 0;

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["diamonds", "clubs", "hearts", "spades"];

  for (var suit in suits) {
    suit = suits[suit];
    for (var num of Array.from({ length: 13 }, (_, i) => 1 + i)) {
      var name = num;
      if (num == 1) {
        name = "Ace";
      } else if (num == 11) {
        name = "Jack";
      } else if (num == 12) {
        name = "Queen";
      } else if (num == 13) {
        name = "King";
      }

      var card = {
        name: name,
        suit: suit,
        rank: num,
      };
      cardDeck.push(card);
    }
  }
  return cardDeck;
};

var getRandom = function () {
  return Math.floor(Math.random() * 52);
};

var shuffleCards = function (cardDeck) {
  for (var i = 0; i < 52; i++) {
    random = getRandom();
    [cardDeck[i], cardDeck[random]] = [cardDeck[random], cardDeck[i]];
  }
  return cardDeck;
};

var shuffledDeck = shuffleCards(makeDeck());

var main = function (input) {
  if (state == "") {
    player1Cards = [];
    player1String = [];
    dealerCards = [];
    dealerString = [];
    message = "";
    player1Score = 0;
    dealerScore = 0;
    myOutputValue = "Welcome to the card game!";
    state = "start";
  } else if (state == "start") {
    if (shuffledDeck.length == 0) {
      myOutputValue = "No more cards. Please press submit to restart";
      shuffledDeck = shuffleCards(makeDeck());
      return myOutputValue;
    }
    player1Cards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());
    player1Cards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());

    for (var card in player1Cards) {
      var joined = Object.values(player1Cards[card]);
      var joined = joined[0] + " of " + joined[1];
      player1String.push(joined);

      if (player1Cards[card].rank > 9) {
        player1Cards[card].rank = 10;
      } else if (player1Cards[card].name == "Ace") {
        player1Score += 10;
      }
      player1Score += player1Cards[card].rank;
      if (player1Score > 21) {
        player1Score -= 1;
      }
    }
    for (var card in dealerCards) {
      var joined = Object.values(dealerCards[card]);
      var joined = joined[0] + " of " + joined[1];
      dealerString.push(joined);

      if (dealerCards[card].rank > 9) {
        dealerCards[card].rank = 10;
      } else if (dealerCards[card].name == "Ace") {
        dealerScore += 10;
      }
      dealerScore += dealerCards[card].rank;

      if (dealerScore > 21) {
        dealerScore -= 1;
      }
    }

    state = "hosp";

    if (
      player1Cards.find((ace) => ace.name == "Ace") &&
      player1Cards.find((jqk) => jqk.rank > 9)
    ) {
      message = "Player wins by black jack!";
      state = "";
    } else if (
      dealerCards.find((ace) => ace.name == "Ace") &&
      dealerCards.find((jqk) => jqk.rank > 9)
    ) {
      message = "Dealer wins by black jack!";
      state = "";
    } else if (player1Score > dealerScore) {
      message = "Player wins! Player please enter hit or stand to continue.";
    } else if (dealerScore > player1Score) {
      message = "Dealer wins! Player please enter hit or stand to continue.";
    } else if (dealerScore == player1Score) {
      message = "It is a tie! Player please enter hit or stand to continue.";
    } else {
      message = "";
    }

    console.log(player1Score, dealerScore);

    var myOutputValue =
      "Player hand: " +
      player1String.join(", ") +
      " (" +
      player1Score +
      ")" +
      "<br>" +
      "Dealer hand: " +
      dealerString.join(", ") +
      " (" +
      dealerScore +
      ")" +
      "<br>" +
      message;
  } else if (state == "hosp") {
    if (/hit/.test(input)) {
      player1Score = 0;
      player1Cards.push(shuffledDeck.pop());
      var newCard = player1Cards[player1Cards.length - 1];

      if (newCard.rank > 9) {
        newCard.rank = 10;
      }

      for (card in player1Cards) {
        player1Score += player1Cards[card].rank;
        console.log(player1Score);
      }

      if (player1Score < 21 && player1Cards.find((ace) => ace.name == "Ace")) {
        player1Score += 10;
        if (player1Score > 21) {
          player1Score -= 10;
        }
      }

      if (player1Score > 21) {
        message = "Player 1 burst! Player please enter stand to continue.";
      } else if (player1Score > dealerScore) {
        message =
          "Player wins!" +
          (player1Score < 21
            ? " Player please enter hit or stand to continue."
            : " Player please enter stand to continue");
      } else if (dealerScore > player1Score) {
        message = "Dealer wins! Player please enter hit or stand to continue.";
      } else if (dealerScore == player1Score) {
        message = "It is a tie! Player please enter hit or stand to continue.";
      } else {
        message = "";
      }
      joined = newCard.name + " of " + newCard.suit;
      player1String.push(joined);
      myOutputValue =
        "Player hand: " +
        player1String.join(", ") +
        " (" +
        player1Score +
        ")" +
        "<br>" +
        "Dealer hand: " +
        dealerString.join(", ") +
        " (" +
        dealerScore +
        ")" +
        "<br>" +
        message;
    } else if (/stand/.test(input)) {
      state = "hosd";
      myOutputValue =
        "Dealer is your turn!" +
        "<br>" +
        "Player hand: " +
        player1String.join(", ") +
        " (" +
        player1Score +
        ")" +
        "<br>" +
        "Dealer hand: " +
        dealerString.join(", ") +
        " (" +
        dealerScore +
        ")" +
        "<br>" +
        "Please enter hit or stand to continue.";
    } else {
      myOutputValue =
        "Please enter" +
        (player1Score <= 21 ? " hit or stand." : " stand.") +
        " Player turn." +
        "<br><br>" +
        "Player hand: " +
        player1String.join(", ") +
        " (" +
        player1Score +
        ")" +
        "<br>" +
        "Dealer hand: " +
        dealerString.join(", ") +
        " (" +
        dealerScore +
        ")" +
        "<br>" +
        message;
    }
  } else if (state == "hosd") {
    if (/hit/.test(input) && dealerScore <= 21) {
      dealerScore = 0;
      dealerCards.push(shuffledDeck.pop());
      var newCard = dealerCards[dealerCards.length - 1];

      if (newCard.rank > 9) {
        newCard.rank = 10;
      }

      for (card in dealerCards) {
        dealerScore += dealerCards[card].rank;
        console.log(dealerScore);
      }

      if (dealerScore < 21 && dealerCards.find((ace) => ace.name == "Ace")) {
        dealerScore += 10;
        if (dealerScore > 21) {
          dealerScore -= 10;
        }
      }

      if (dealerScore > 21) {
        message = "Dealer burst!";
        state = "";
      } else if (player1Score > dealerScore) {
        if (player1Score > 21) {
          message =
            "Dealer wins! Dealer please enter hit or stand to continue.";
        } else {
          message =
            "Player wins! Dealer please enter hit or stand to continue.";
        }
      } else if (dealerScore > player1Score) {
        message = "Dealer wins! Dealer please enter hit or stand to continue.";
      } else if (dealerScore == player1Score) {
        message = "It is a tie! Dealer please enter hit or stand to continue.";
      } else {
        message = "";
      }
      joined = newCard.name + " of " + newCard.suit;
      dealerString.push(joined);
      myOutputValue =
        "Player hand: " +
        player1String.join(", ") +
        " (" +
        player1Score +
        ")" +
        "<br>" +
        "Dealer hand: " +
        dealerString.join(", ") +
        " (" +
        dealerScore +
        ")" +
        "<br>" +
        message;
    } else if (/stand/.test(input)) {
      state = "";
      myOutputValue = "Thank you for playing!";
    } else {
      message = "Dealer please enter hit or stand to continue.";
      myOutputValue =
        "Please enter" +
        (dealerScore <= 21 ? " hit or stand." : " stand.") +
        " Dealer turn." +
        "<br><br>" +
        "Player hand: " +
        player1String.join(", ") +
        " (" +
        player1Score +
        ")" +
        "<br>" +
        "Dealer hand: " +
        dealerString.join(", ") +
        " (" +
        dealerScore +
        ")" +
        "<br>" +
        message;
    }
  }
  return myOutputValue;
};
