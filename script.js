// var main = function (input) {
//   var myOutputValue = "hello world";
//   return myOutputValue;
// };

///////////////////
// global vars  //
/////////////////
var p1Hand = [];
var comHand = [];
var deck = []; //rmb to reset deck on a new game
var dealPattern = ["com", "p1", "com", "p1"];

////////////////////////////////
// blackjack helper functions //
///////////////////////////////
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    var points = rankCounter;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
        points = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        points = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        points = 10;
      } else if (cardName == 13) {
        cardName = "king";
        points = 10;
      } else {
        points = rankCounter;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        points: points,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleDeck = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomInt(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    // swap position
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};

var dealPlayingCards = function (dp) {
  // expand to add number of players next time
  deck = makeDeck();
  shuffleDeck(deck);
  for (var i = 0; i < dp.length; i++) {
    dealPattern[i] == "com"
      ? comHand.push(deck.shift())
      : p1Hand.push(deck.shift());
  }
};

var hit = function (player) {
  console.log(player + "hit");
  player == "com" ? comHand.push(deck.shift()) : p1Hand.push(deck.shift());
};

var evaluateHands = function (hand) {
  var blackjack = false;
  var bust = false;
  var soft = false;
  // check for blackjack
  if (hand.length == 2) {
    if (hand[0].name == "jack" && hand[1].name == "ace") {
      blackjack = true;
    }
    if (hand[0].name == "ace" && hand[1].name == "jack") {
      blackjack = true;
    }
  }

  var points = 0;
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].name == "ace" && !soft) {
      soft = true;
    }
    points += hand[i].points;
  }

  // if soft is true
  var softPoints = points;
  var hardPoints = points;
  if (soft) {
    softPoints += 10;
  }

  console.log(`softScore: ${softPoints}, hardScore: ${hardPoints}`);

  if (hardPoints > 21 && softPoints > 21) {
    bust = true;
  } else {
    // pick minimum between the two
    points = Math.min(softPoints, hardPoints);
  }

  return { blackjack, bust, points };
};

var comDecision = function (comHand) {
  // returns same result object as evaluateHands
  var e = evaluateHands(comHand);
  while (e.points < 17) {
    if (comHand.length < 5) {
      comHand.push(deck.shift());
    }
    e = evaluateHands(comHand);
  }
  return e;
};

var compareScore = function (c, p) {
  // where c is result object of computer
  // where p is result object of player
  // output is a string
  var outputString = "";
  var comWinMsg = "Computer (dealer) wins! ";
  var playerWinMsg = "Player1 wins! ";
  var drawMsg = "Its a draw, ";
  switch (true) {
    case p.blackjack:
      return playerWinMsg + "Player1 has blackjack!";
    case c.blackjack:
      return comWinMsg + "Computer has blackjack!";
    case p.bust && !c.bust:
      return (
        comWinMsg +
        `Player1 has busted with ${p.points} while Computer has ${c.points}`
      );
    case c.bust && !p.bust:
      return (
        playerWinMsg +
        `Computer has busted with ${c.points} while Player1 has ${p.points}`
      );
    case c.bust && p.bust:
      return drawMsg + " both busted!";
    default:
      // both are less than 21, winner will be points closest to 21
      console.log("both are below 21");
      if (c.points == p.points) {
        outputString = drawMsg + `you are both tied at ${c.points} points`;
      }

      if (c.points > p.points) {
        outputString =
          comWinMsg + `Computer has ${c.points} while Player1 has ${p.points}`;
      }

      if (c.points < p.points) {
        outputString =
          playerWinMsg +
          `Player1 has ${p.points} while Computer has ${c.points}`;
      }
      return outputString;
  }
};

var formatOutput = function () {
  var outputString = ` Your hand: <br> `;
  for (var i = 0; i < p1Hand.length; i++) {
    outputString += `${p1Hand[i].name} of ${p1Hand[i].suit}, worth ${p1Hand[i].points} points <br>`;
  }
  var p = evaluateHands(p1Hand);
  total = "";
  if (!p.bust) {
    var total = `Player1 accumulated points so far: ${p.points} <br> <br>`;
  }
  return outputString + total;
};

///////////////////////
// main game flow  ///
/////////////////////
var gameFlow = function (input) {
  // player decides to hit or stand
  switch (input) {
    case "start":
      dealPlayingCards(dealPattern);
      var c = evaluateHands(comHand);
      var p = evaluateHands(p1Hand);
      var compare = "";
      if (c.blackjack || p.blackjack) {
        compare = compareScore(c, p);
      }
      return "Dealing cards... <br>" + formatOutput() + compare;
    case "hit":
      // player hit once
      hit("p1");
      // computer decide to hit or not hit
      var comPoints = evaluateHands(comHand);
      if (comPoints < 17 && comHand.length < 5) {
        hit("com");
      }
      // check hands if bust or under
      p = evaluateHands(p1Hand);
      c = evaluateHands(comHand);
      compare = "";
      if (p.bust || c.bust) {
        var compare = compareScore(c, p);
      }
      var output = formatOutput() + compare;

      return output;
    case "stand":
      // evaluate p1 hands, com gets to decide hit or stand, compare results
      p = evaluateHands(p1Hand);
      c = comDecision(comHand);
      var output = formatOutput();
      output += compareScore(c, p);
      return output;
    case "reset":
      var output = reset();
      return output;
    case "default":
      return "Awaiting input from user...";
  }
};

var reset = function () {
  p1Hand = [];
  comHand = [];
  deck = [];
  return "";
};

export function main(input) {
  var output = gameFlow(input);
  return output;
}
