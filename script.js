var game_state_deal_cards = "dealCards";
var game_state_hit_or_stand = "hitOrStand";
var game_state_end_game = "endGame";
var game_state_wager_points = "wagerPoint";

var currentmode = game_state_wager_points;

var playersWager;
var pointsToWager;

var dealerHand = [];
var playerHand = [];

var deckMaker = function () {
  var cardArray = [];
  var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var pointCounter = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "A";
      } else if (cardName == 11) {
        cardName = "J";
      } else if (cardName == 12) {
        cardName = "Q";
      } else if (cardName == 13) {
        cardName = "K";
      }
      if (rankCounter == 1) {
        pointCounter = 1;
      } else if (rankCounter == 11 || rankCounter == 12 || rankCounter == 13) {
        pointCounter = 10;
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        point: pointCounter,
      };
      cardArray.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardArray;
};

var cardShuffle = function (deck) {
  var copyDeck = [...deck];
  for (var index = 0; index < copyDeck.length; index += 1) {
    var randomIndex = Math.floor(Math.random() * copyDeck.length);
    var currentCard = copyDeck[index];
    var randomCard = copyDeck[randomIndex];
    copyDeck[index] = randomCard;
    copyDeck[randomIndex] = currentCard;
  }
  return copyDeck;
};

var convertSuitWordToEmoji = function (suit) {
  if (suit == "Spades") {
    return "♠️";
  }
  if (suit == "Hearts") {
    return "♥️";
  }
  if (suit == "Clubs") {
    return "♣️";
  }
  if (suit == "Diamonds") {
    return "♦️";
  }
  // If we reach here, we entered an invalid suit
  return "Invalid Suit!";
};

var shuffledCardDeck = cardShuffle(deckMaker());

var checkForBlackJack = function (handArray) {
  var playerCard1 = handArray[0];
  var playerCard2 = handArray[1];
  var isBlackJack = false;
  if (
    (playerCard1.name == "A" && playerCard2.rank >= 10) ||
    (playerCard2.name == "A" && playerCard1.rank >= 10)
  ) {
    isBlackJack = true;
  }

  return isBlackJack;
};

var updatePlayerPoints = function (winningPlayer) {
  if (winningPlayer == "p") {
    playerPoints += pointsToWager;
    return;
  }
  playerPoints -= pointsToWager;
};

var displayWagerPointsMessage = function () {
  return `You currently have $${playerPoints}.`;
};

var calcTotalValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;

  var index = 0;
  while (index < handArray.length) {
    var currCard = handArray[index];

    if (currCard.name == "K" || currCard.name == "Q" || currCard.name == "J") {
      totalHandValue = totalHandValue + 10;
    } else if (currCard.name == "A") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currCard.rank;
    }
    index = index + 1;
  }

  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }

  return totalHandValue;
};

var displayPlayerHands = function (playerHandArray) {
  var playerMessage = "Your hand:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      `[${playerHandArray[index].name}` +
      `${convertSuitWordToEmoji(playerHandArray[index].suit)}]`;
    index = index + 1;
  }
  return playerMessage;
};

var displayDealerHands = function (dealerHandArray) {
  var dealerMessage = "Dealer hand:<br>";

  dealerMessage =
    dealerMessage +
    `[${dealerHandArray[0].name}` +
    `${convertSuitWordToEmoji(dealerHandArray[0].suit)}]` +
    "[??]";

  return dealerMessage;
};

var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = "Your hand:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      `[${playerHandArray[index].name}` +
      `${convertSuitWordToEmoji(playerHandArray[index].suit)}]`;
    index = index + 1;
  }

  index = 0;
  var dealerMessage = "Dealer hand:<br>";
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      `[${dealerHandArray[index].name}` +
      `${convertSuitWordToEmoji(dealerHandArray[index].suit)}]`;
    index = index + 1;
  }

  return playerMessage + "<br><br>" + dealerMessage;
};

var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br>Player Score: " +
    playerHandValue +
    "<br>Dealer Score: " +
    dealerHandValue;
  return totalHandValueMessage;
};

var displayPlayerHandValues = function (playerHandValue) {
  var totalPlayerHandValues = "<br>Player Score: " + playerHandValue;
  return totalPlayerHandValues;
};

var displayDealerHandValues = function () {
  var totalDealerHandValues = "<br>Dealer Score: ?? ";
  return totalDealerHandValues;
};

var main = function (input) {
  var outputValue = "";

  if (currentmode == game_state_end_game) {
    var outputValue = `The game is over. Please refresh to play again.`;
    return outputValue;
  }

  if (currentmode == game_state_wager_points) {
    playerPoints = Number(input);
    pointsToWager = playerPoints;
    if (input == "" || Number.isNaN(playerPoints)) {
      var outputValue = `Please enter the amount to wager. You currently have $${playerPoints}.`;
      return outputValue;
    }
    currentmode = game_state_deal_cards;

    var outputValue = `You have wagered $${playerPoints}. Click 'Play' now.`;
    return outputValue;
  }

  if (currentmode == game_state_deal_cards) {
    playerHand.push(shuffledCardDeck.pop());
    playerHand.push(shuffledCardDeck.pop());
    dealerHand.push(shuffledCardDeck.pop());
    dealerHand.push(shuffledCardDeck.pop());
    console.log("Player Hand ==>");
    console.log(playerHand);
    console.log("Dealer Hand ==>");
    console.log(dealerHand);

    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    var playerHandTotalValue = calcTotalValue(playerHand);
    var dealerHandTotalValue = calcTotalValue(dealerHand);

    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        currentmode = game_state_end_game;
        outputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><br>Its a Black Jack Tie!  <br><br> ${displayWagerPointsMessage()}<br><br> Please refresh to play again.`;
      } else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        updatePlayerPoints("p");
        currentmode = game_state_wager_points;
        currentmode = game_state_end_game;

        outputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><br>You win by Black Jack!  <br><br> ${displayWagerPointsMessage()}<br><br> Please refresh to play again.`;
      } else {
        updatePlayerPoints("d");
        currentmode = game_state_wager_points;
        currentmode = game_state_end_game;

        outputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><br>Dealer wins by Black Jack! <br><br> ${displayWagerPointsMessage()}<br><br> Please refresh to play again.`;
      }
    } else {
      outputValue =
        displayPlayerHands(playerHand) +
        `<br><br> ${displayDealerHands(dealerHand)}` +
        `<br><br> ${displayPlayerHandValues(playerHandTotalValue)}` +
        `<br><br> Dealer Score: ??` +
        `<br> <br> There are no Black Jacks. <br><br> ${displayWagerPointsMessage()} <br><br>Please input "h" to hit or  "s" to stand.`;
      currentmode = game_state_hit_or_stand;
    }

    return outputValue;
  }

  if (currentmode == game_state_hit_or_stand) {
    if (input == "h") {
      playerHand.push(shuffledCardDeck.pop());
      var playerHandTotalValue = calcTotalValue(playerHand);
      var dealerHandTotalValue = calcTotalValue(dealerHand);
      outputValue =
        displayPlayerHands(playerHand) +
        `<br><br> ${displayDealerHands(dealerHand)}` +
        `<br><br> ${displayPlayerHandValues(playerHandTotalValue)}` +
        `<br><br> Dealer Score: ??` +
        '<br><br> You drew another card. <br><br>Please input "h" to hit or  "s" to stand.';
    }

    if (input == "s") {
      var playerHandTotalValue = calcTotalValue(playerHand);
      var dealerHandTotalValue = calcTotalValue(dealerHand);

      while (dealerHandTotalValue < 17) {
        dealerHand.push(shuffledCardDeck.pop());
        dealerHandTotalValue = calcTotalValue(dealerHand);
      }

      if (
        playerHandTotalValue == dealerHandTotalValue ||
        (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
      ) {
        currentmode = game_state_end_game;

        outputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><br> ${displayHandTotalValues(
            playerHandTotalValue,
            dealerHandTotalValue
          )}` +
          `<br><br>Its a Tie! <br><br> ${displayWagerPointsMessage()}<br><br> Please refresh to play again.`;
      } else if (
        (playerHandTotalValue > dealerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
      ) {
        updatePlayerPoints("p");

        currentmode = game_state_end_game;
        outputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><br> ${displayHandTotalValues(
            playerHandTotalValue,
            dealerHandTotalValue
          )}` +
          `<br><br>You win! <br><br> ${displayWagerPointsMessage()} <br><br> Please refresh to play again.`;
      } else {
        updatePlayerPoints("d");
        currentmode = game_state_end_game;

        outputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><br> ${displayHandTotalValues(
            playerHandTotalValue,
            dealerHandTotalValue
          )}` +
          `<br><br>Dealer wins!<br><br> ${displayWagerPointsMessage()}<br><br> Please refresh to play again.`;
      }
    }

    if (input != "s" && input != "h") {
      outputValue =
        'wrong input... input only "h" to hit or "s" to stand are valid.<br><br>' +
        displayPlayerHands(playerHand) +
        `<br><br> ${displayDealerHands(dealerHand)}` +
        `<br><br> ${displayPlayerHandValues(playerHandTotalValue)}` +
        `<br><br> Dealer Score: ??`;
    }
  }

  return outputValue;
};
