import { makeDeck, shuffleDeck } from "./deck.js";
import { generateOutputMsg, lineSeparator } from "./messages.js";
import {
  initialisePlayers,
  dealPlayingCards,
  evaluateInitialHand,
  detailedOutput,
  evaluateAllPlayers,
  dealerDecision,
  compareScore,
  hit,
} from "./blackjack.js";

///////////////////
// global vars  //
/////////////////
var numberOfPlayers = 2;
var players = []; // player, p0 is com, obj to contain hand[],bj bool, bust bool, soft bool, softscore int, hardscore int
var deck = [];
var player1HitCount = 0;

///////////////////////
// main game flow  ///
/////////////////////
var gameFlow = function (input) {
  switch (input) {
    case "start":
      deck = makeDeck();
      shuffleDeck(deck);
      players = initialisePlayers(numberOfPlayers);
      dealPlayingCards(numberOfPlayers, players, deck);
      evaluateInitialHand(players);
      // check for blackjack
      var compare = "";
      if (players[0].blackJack || players[1].blackJack) {
        var compare = compareScore(players);
      }
      return (
        "========== <br> Dealing cards..." +
        lineSeparator +
        detailedOutput(players) +
        lineSeparator +
        compare
      );
    case "hit":
      // player hit once
      hit("p1", players, player1HitCount, deck);
      // dealer decide to hit or not hit
      if (players[0].score < 17 && players[0].hand.length < 5) {
        hit("dealer", players, player1HitCount, deck);
      }
      // check hands if bust or under
      evaluateAllPlayers(players);
      compare = "";
      if (players[0].bust || players[1].bust) {
        var compare = compareScore(players);
      }
      return detailedOutput(players) + lineSeparator + compare;
    case "stand":
      console.log("stand");
      // evaluate p1 hands, com gets to decide hit or stand, compare results
      dealerDecision(players[0], deck);
      evaluateAllPlayers(players);
      return detailedOutput(players) + lineSeparator + compareScore(players);
    case "reset":
      console.log("reset");
      var output = reset();
      return output;
    case "default":
      return "Awaiting input from user...";
  }
};

var reset = function () {
  players = [];
  deck = [];
  player1HitCount = 0;
  return "";
};

export function main(input) {
  var output = gameFlow(input);
  return output;
}
