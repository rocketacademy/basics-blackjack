import { generateOutputMsg, lineSeparator } from "./messages.js";
////////////////////////////////
// blackjack helper functions //
///////////////////////////////

export function initialisePlayers(n) {
  var players = [];
  for (var i = 0; i < n; i++) {
    var name = i == 0 ? "dealer" : `Player${i}`;
    players.push({
      name: name,
      hand: [],
      blackJack: false,
      bust: false,
      softScore: 0,
      hardScore: 0,
      score: 0,
    });
  }
  return players;
}

export function dealPlayingCards(n, players, deck) {
  var startingHand = 2;
  // used double loop to achieve deal pattern: com -> p1 -> com -> p1
  for (var round = 0; round < startingHand; round++) {
    for (var i = 0; i < n; i++) {
      var randomCard = deck.pop();
      players[i]["hand"].push(randomCard);
    }
  }
}

export function hit(w, players, player1HitCount, deck) {
  console.log(w + "hit");
  if (w == "dealer") {
    players[0]["hand"].push(deck.pop());
  } else {
    if (player1HitCount < 5) {
      players[1]["hand"].push(deck.pop());
      player1HitCount += 1;
    }
  }
}

export function evaluateInitialHand(players) {
  for (var i = 0; i < players.length; i++) {
    var hand = players[i].hand;

    // check blackjack
    if (hand[0].name == "jack" && hand[1].name == "ace") {
      players[i]["blackJack"] = true;
      players[i]["softScore"] = 21;
      players[i]["hardScore"] = 21;
      return;
    }
    if (hand[0].name == "ace" && hand[1].name == "jack") {
      blackjack = true;
      players[i]["softScore"] = 21;
      players[i]["hardScore"] = 21;
      return;
    }

    if (hand[0].name == "ace" || hand[1].name == "ace") {
      players[i]["soft"] = true;
    }

    //calculate scores +  other values
    var hardScore = calculateScore(hand);
    if (players[i]["soft"] == true) {
      players[i]["softScore"] = hardScore + 10;
      players[i]["hardScore"] = hardScore;
      players[i]["score"] =
        players[i]["softScore"] > players[i]["hardScore"]
          ? players[i]["softScore"]
          : players[i]["hardScore"];
    } else {
      players[i]["softScore"] = hardScore;
      players[i]["hardScore"] = hardScore;
      players[i]["score"] = hardScore;
    }
  }
  return;
}

var calculateScore = function (hand) {
  var points = 0;
  for (var i = 0; i < hand.length; i++) {
    points += hand[i].points;
  }
  return points;
};

// evaluate all players hand, assumes initalHand is already evaluated
export function evaluateAllPlayers(players) {
  for (var i = 0; i < players.length; i++) {
    evaluatePlayer(players[i]);
  }
  return;
}

// evaluate a single player hand
var evaluatePlayer = function (player) {
  // calculate hard score
  var points = 0;
  for (var i = 0; i < player.hand.length; i++) {
    points += player.hand[i].points;
  }

  player.softScore = points;
  player.hardScore = points;
  if (player.soft) {
    player.softScore += 10;
  }

  player.score =
    player.softScore >= 21
      ? Math.min(player.softScore, player.hardScore)
      : Math.max(player.softScore, player.hardScore);

  player.bust = player.score > 21 ? true : false;

  return;
};

export function dealerDecision(dealer, deck) {
  evaluatePlayer(dealer);
  while (dealer.score < 17) {
    if (dealer.hand.length < 5) {
      dealer.hand.push(deck.pop());
    }
    evaluatePlayer(dealer);
  }
}

export function compareScore(players) {
  var dealer = players[0];
  var player = players[1];
  console.log(players);
  switch (true) {
    case player.blackJack:
      return generateOutputMsg("playerBlackJack", dealer.score, player.score);
    case dealer.blackJack:
      return generateOutputMsg("dealerBlackJack", dealer.score, player.score);
    case player.bust && !dealer.bust:
      return generateOutputMsg("playerBusts", dealer.score, player.score);
    case dealer.bust && !player.bust:
      return generateOutputMsg("dealerBusts", dealer.score, player.score);
    case dealer.bust && player.bust:
      return generateOutputMsg("bothBust", dealer.score, player.score);
    default:
      // both are less than 21, winner will be points closest to 21
      if (dealer.score > player.score) {
        console.log("dealer higher");
        return generateOutputMsg("dealerWinU21", dealer.score, player.score);
      }

      if (dealer.score < player.score) {
        console.log("dealer lower");
        return generateOutputMsg("playerWinU21", dealer.score, player.score);
      }

      if (dealer.score == player.score) {
        console.log("both draw");
        return generateOutputMsg("bothDraw", dealer.score, player.score);
      }
  }
}

export function detailedOutput(players) {
  console.log("detailedOutput");
  var p1Hand = players[1].hand;
  var dealerHand = players[0].hand;

  var outputString = `[PLAYER_HAND]: <br> `;
  for (var i = 0; i < p1Hand.length; i++) {
    outputString += `${p1Hand[i].name} of ${p1Hand[i].suit}, worth ${p1Hand[i].points} points <br>`;
  }
  evaluatePlayer(players[1]);
  var p1Total = "";
  if (!players[1].bust) {
    var p1Total = `Player1 total: ${players[1].score} points <br>`;
  }

  var dealerOutput = `[DEALER_HAND]: ${dealerHand[0].name} of ${dealerHand[0].suit}, worth ${dealerHand[0].points} points <br>`;

  return outputString + p1Total + lineSeparator + dealerOutput;
}
