var Tmsg = "";
var msg = "";
var msg2 = "";
var determineMsg = "";
var cardNo = 2;
var ACardNo = 2;
var ATotal = "";
var PTotal = "";
var gamemode = 0;
var playerCards = [];
var AiCards = [];

var deckMaker = function () {
  var cardArray = [];
  var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
  for (let index = 0; index < suits.length; index += 1) {
    var currentSuit = suits[index];

    for (let value = 1; value <= 13; value += 1) {
      var cardName = value;
      var Power = value;
      if (value == 1) {
        cardName = "Ace";
      } else if (value == 11) {
        cardName = "Jack";
        Power = 10;
      } else if (value == 12) {
        cardName = "Queen";
        Power = 10;
      } else if (value == 13) {
        cardName = "King";
        Power = 10;
      }
      var allCards = {
        name: cardName,
        rank: value,
        suit: currentSuit,
        power: Power,
      };
      cardArray.push(allCards);
    }
  }
  return cardArray;
};
var copyDeck = "";
var cardShuffle = function (deck) {
  copyDeck = [...deck];
  for (var index = 0; index < copyDeck.length; index += 1) {
    var randomIndex = Math.floor(Math.random() * copyDeck.length);
    var currentCard = copyDeck[index];
    var randomCard = copyDeck[randomIndex];
    copyDeck[index] = randomCard;
    copyDeck[randomIndex] = currentCard;
  }
  console.log(copyDeck);
  return copyDeck;
};
var deck = deckMaker();
var shuffledCards = cardShuffle(deck);

var dealingCardsFP = function () {
  card = shuffledCards.pop();
  playerCards.push(card);
  return playerCards;
};

var dealingCardsFAI = function () {
  card = shuffledCards.pop();
  AiCards.push(card);
  return AiCards;
};

var main = function (input) {
  if (gamemode == 0) {
    var No = 0;
    var NoA = 0;
    while (No < 2) {
      playerCards = dealingCardsFP();
      No += 1;
    }
    console.log(playerCards);
    while (NoA < 2) {
      AiCards = dealingCardsFAI();
      NoA += 1;
    }
    console.log(AiCards);

    msg = `Your cards are:<br/>${playerCards[0].name} of ${playerCards[0].suit}<br/>${playerCards[1].name} of ${playerCards[1].suit}`;
    msg2 = `<br/><br/>Dealer's cards are: <br/>${AiCards[0].name} of ${AiCards[0].suit}<br/> ???<br/><br/>`;
    standrdMsg = `Please enter "hit" or "stand" to draw a card or end your turn respectively`;
    PTotal = playerCards[0].power + playerCards[1].power;
    gamemode = 1;
  } else if (gamemode == 1) {
    if (input == "stand") {
      msg2 = `<br/><br/>Dealer's cards are: <br/>${AiCards[0].name} of ${AiCards[0].suit}<br/> ${AiCards[1].name} of ${AiCards[1].suit}`;
      if (AiCards.name == "Ace") {
        if (ATotal < 11) {
          ATotal = ATotal + 11;
        } else if (ATotal > 10) {
          ATotal = ATotal + 1;
        }
      }
      ATotal = AiCards[0].power + AiCards[1].power;

      if (ATotal < 17) {
        while (ATotal < 17) {
          AiCards = dealingCardsFAI();
          msg2 =
            msg2 + `<br/>${AiCards[ACardNo].name} of ${AiCards[ACardNo].suit}`;
          if (AiCards[ACardNo].name == "Ace") {
            if (ATotal < 11) {
              ATotal = ATotal + 11;
            } else if (ATotal > 10) {
              ATotal = ATotal + 1;
            }
          } else {
            ATotal = ATotal + AiCards[ACardNo].power;
            ACardNo += 1;
            console.log(AiCards);
          }
        }
      }
      if ((ATotal > 21 && PTotal > 21) || ATotal == PTotal) {
        determineMsg = `Lucky you! Its a tie!`;
      } else if (ATotal > 21 || (PTotal > ATotal && PTotal <= 21)) {
        determineMsg = `You won!`;
      } else if (PTotal > 21 || (ATotal > PTotal && ATotal <= 21)) {
        determineMsg = `You lost! There goes your bet!`;
      }
      console.log(PTotal);
      standrdMsg = `<br/><br/>The dealer has revealed their cards!<br/> Your total is ${PTotal}<br/>Their total is ${ATotal}<br/>${determineMsg}`;
    } else if (input == "hit") {
      playerCards = dealingCardsFP();
      if (playerCards[cardNo].name == "Ace") {
        if (PTotal < 11) {
          PTotal = PTotal + 11;
        } else if (PTotal > 10) {
          PTotal = PTotal + 1;
        }
        msg =
          msg +
          `<br/>${playerCards[cardNo].name} of ${playerCards[cardNo].suit}`;
        cardNo += 1;
      } else {
        msg =
          msg +
          `<br/>${playerCards[cardNo].name} of ${playerCards[cardNo].suit}`;
        PTotal = PTotal + playerCards[cardNo].power;
        cardNo += 1;
        console.log(playerCards);
      }
    }
  }
  Tmsg = msg + msg2 + standrdMsg;
  return Tmsg;
};
