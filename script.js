//Global Variables
var blackjackLimit = 21;
var userStand = false;
var gameState = false;
var gameMode = "players";
var playerName = "";
var numberOfPlayers = 1;
var turn = 0;

var deck;
var playerCounter = 0;
var botHand = [];
var playersObj = [];
var wager = 0;

//A function to display the current hand passed.
var displayHand = function (hand) {
  var counter = 0;
  var outputMessage = "Current Hand:<br>";
  while (counter < hand.length) {
    outputMessage += `${hand[counter].name} of ${hand[counter].icon}<br>`;
    counter += 1;
  }
  return outputMessage;
};

//A function to display the points of the current player.
var displayPoints = function () {
  var outputMessage = `You now have ${playersObj[playerCounter].points}, remember to play moderately!`;
  return outputMessage;
};

//A function to get the sum of the hand being passed.
var getCurrentSumHand = function (hand) {
  var total = 0;
  var counter = 0;
  var countAce = 0;
  while (counter < hand.length) {
    if (hand[counter].rank <= 10 && hand[counter].rank >= 2) {
      total += hand[counter].rank;
    } else if (hand[counter].rank >= 11) total += 10;
    else {
      countAce += 1;
      total += 11;
    }
    counter++;
  }

  if (total > blackjackLimit) {
    if (countAce > 0) {
      var counter = 0;
      while (counter < countAce && total > blackjackLimit) {
        total -= 10;
        counter++;
      }
    }
  }
  return total;
};

//A function to create a deck of 52 cards.
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitsIcon = ["♥", "♦", "♣", "♠"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentSuitIcon = suitsIcon[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        icon: currentSuitIcon,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

//A function to shuffle a deck.
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

//A function to draw a card from the deck.
var drawOneCard = function () {
  var cardDrawn = deck.pop();
  return cardDrawn;
};

//A function to check if a hand is a blackjack.
var isBlackJack = function (hand) {
  var sum = getCurrentSumHand(hand);
  if (sum === blackjackLimit) {
    return true;
  } else return false;
};

var checkHandLimit = function (hand) {
  if (getCurrentSumHand(hand) > blackjackLimit) {
    return true;
  } else return false;
};

deck = shuffleCards(makeDeck());

var drawCards = function () {
  var counter = 0;
  while (counter < numberOfPlayers) {
    var firstCard = drawOneCard();
    var secondCard = drawOneCard();
    var hand = [firstCard, secondCard];
    playersObj[counter].hand.push(hand);
    counter++;
  }
  botHand.push(drawOneCard());
  botHand.push(drawOneCard());
};

var playBlackJackPlayer = function (hand, input) {
  if (playersObj[playerCounter].stand == false && input == "hit") {
    hand.push(drawOneCard());
    if (checkHandLimit(hand)) {
      playersObj[playerCounter].state = true;
      playersObj[playerCounter].points -= Number(
        playersObj[playerCounter].wager
      );
      return `Oops busted! You lose, your total hand is ${getCurrentSumHand(
        hand
      )}<br><br>${playersObj[playerCounter].name} Hand<br>${displayHand(
        hand
      )}<br><br>Bot Hand<br>${displayHand(botHand)}<br>${displayPoints()}`;
    }
    if (isBlackJack(hand)) {
      playersObj[playerCounter].state = true;
      playersObj[playerCounter].points += Number(
        playersObj[playerCounter].wager
      );
      return `Congratulations, you win! <br><br> ${
        playersObj[playerCounter].name
      } Hand<br>${displayHand(hand)}<br><br>Bot Hand<br>${displayHand(
        botHand
      )}<br>${displayPoints()}`;
    }
  }

  return `${playersObj[playerCounter].name} Hand<br>${displayHand(
    hand
  )}<br><br>Bot Hand<br>${displayHand(
    botHand
  )}<br><br> Click "Submit" to continue.`;
};

var checkIfAllStand = function () {
  var counter = 0;
  var check = true;
  while (counter < numberOfPlayers) {
    if (playersObj[counter].stand == false) {
      check = false;
    }
    counter += 1;
  }
  return check;
};

var drawBotHand = function () {
  if (getCurrentSumHand(botHand) < 16) {
    botHand.push(drawOneCard());
    if (checkHandLimit(botHand)) {
      gameState = true;
      var counter = 0;
      while (counter < numberOfPlayers) {
        playersObj[counter].points += playersObj[counter].wager;
        counter += 1;
      }
      return `Bot Busted! The bot total hand is ${getCurrentSumHand(botHand)}
      <br><br>Congratulations, all of the players win! <br><br>Bot Hand<br>${displayHand(
        botHand
      )}<br>Please press continue to check the updated points.`;
    }

    if (isBlackJack(botHand)) {
      gameState = true;
      var counter = 0;
      while (counter < numberOfPlayers) {
        playersObj[counter].points -= playersObj[counter].wager;
        counter += 1;
      }
      return `Oh noooo, the bot won! <br><br> Bot Hand<br>${displayHand(
        botHand
      )}<br>Please press continue to check the updated points.`;
    }
  }

  if (checkIfAllStand() && getCurrentSumHand(botHand) > 16) {
    gameState = true;
    var counter = 0;
    var outputMessage = `The bot current hand is: <br> ${displayHand(
      botHand
    )}<br><br>`;
    while (counter < numberOfPlayers) {
      var handCounter = 0;
      while (handCounter < playersObj[counter].hand.length) {
        if (
          getCurrentSumHand(botHand) <
          getCurrentSumHand(playersObj[counter].hand[handCounter])
        ) {
          playersObj[counter].points += playersObj[counter].wager;
          outputMessage += `${
            playersObj[counter].name
          } won against the bot. You had a total value of ${getCurrentSumHand(
            playersObj[counter].hand[handCounter]
          )}.<br><br>
        You now have a total of ${playersObj[counter].points}.;
        <br><br>`;
        } else {
          playersObj[counter].points -= playersObj[counter].wager;
          outputMessage += `${
            playersObj[counter].name
          } lose against the bot. You only had a total value of ${getCurrentSumHand(
            playersObj[counter].hand[handCounter]
          )}.<br><br>
        You now have a total of ${playersObj[counter].points}.;
        <br><br>`;
        }
        handCounter += 1;
      }
      counter += 1;
    }
    return outputMessage;
  }

  return `<br><br>Bot Hand<br>${displayHand(
    botHand
  )}<br> Please click 'Submit' to continue.`;
};

var main = function (input) {
  if (gameMode == "players") {
    numberOfPlayers = Number(input);
    if (numberOfPlayers > 3 || numberOfPlayers < 1) {
      return "There should be at least 1 player and not over 3 players.";
    } else {
      var counter = 0;
      while (counter < numberOfPlayers) {
        var player = {
          points: 100,
          stand: false,
          state: false,
          hand: [],
          wager: 0,
          name: "",
        };
        playersObj.push(player);
        counter++;
      }
      gameMode = "input";
      return `There will be ${numberOfPlayers} players. Proceed to inputting the names of the players.`;
    }
  }
  if (gameState == true) {
    deck = shuffleCards(makeDeck());
    var outputMessage = "";
    var counter = 0;
    playerCounter = 0;
    while (counter < numberOfPlayers) {
      outputMessage += `${playersObj[counter].name} now has ${playersObj[counter].points}<br>`;
      playersObj[counter].hand = [];
      playersObj[counter].stand = false;
      counter++;
    }
    botHand = [];
    gameState = false;
    gameMode = "wager";
    return `${outputMessage}<br><br> You can continue playing by inputting the wager of the first player.`;
  }
  if (gameMode == "input") {
    if (playerCounter < numberOfPlayers) {
      playersObj[playerCounter].name = input;
      playerCounter += 1;
      return `Hi ${
        playersObj[playerCounter - 1].name
      }! Welcome to Blackjack, you start off with ${
        playersObj[playerCounter - 1].points
      } points.`;
    }
    gameMode = "wager";
    playerCounter = 0;
    return `All of the player's name are inputted. Proceeding to getting the wagers.`;
  }

  if (gameMode == "wager") {
    if (playerCounter < numberOfPlayers) {
      playersObj[playerCounter].wager = Number(input);
      playerCounter += 1;
      return `Phew! you waged ${
        playersObj[playerCounter - 1].wager
      } points, let's see if you will win or lose that points.`;
    }
    gameMode = "start";
    playerCounter = 0;
    return `All of the player's wagers are inputted. Proceeding to the game.`;
  }

  if (gameMode == "start") {
    var outputMessage = "Blackjack game is now starting, drawing cards.";
    drawCards();
    gameMode = "player";
    return `${outputMessage}<br>Proceeding to ${playersObj[playerCounter].name} turn.`;
  }

  if (gameMode == "player") {
    if (checkIfAllStand()) {
      var outputMessage = drawBotHand();
      gameState = true;
      return `${outputMessage} <br><br>Click 'Submit' to continue.`;
    }

    var outputMessage = `This is ${playersObj[playerCounter].name}'s turn.<br><br>`;
    if (!turn && playersObj[playerCounter].stand == false) {
      outputMessage += `Player Hand<br>${displayHand(
        playersObj[playerCounter].hand[0]
      )}<br><br>Bot Hand<br>${displayHand(
        botHand
      )}<br><br>Do you want to 'hit' or 'stand'`;
      if (
        playersObj[playerCounter].hand[0][0].rank ==
        playersObj[playerCounter].hand[0][1].rank
      )
        outputMessage += `or 'split'?`;
      else {
        outputMessage += `?<br>`;
      }
      turn = 1;
      return outputMessage;
    } else {
      if (input == "stand") {
        playersObj[playerCounter].stand = true;
        outputMessage = `You chose to stand, please click "Submit" to continue.`;
        playerCounter += 1;
        turn = 0;
        return outputMessage;
      }
      if (input == "hit") {
        outputMessage += playBlackJackPlayer(
          playersObj[playerCounter].hand[0],
          input
        );
        turn = 0;
        return outputMessage;
      }
      if (input == "split") {
        playersObj[playerCounter].stand = true;
        var firstCard = drawOneCard();
        var secondCard = drawOneCard();
        console.log(firstCard);
        console.log(secondCard);
        playersObj[playerCounter].hand.push([
          playersObj[playerCounter].hand[0][1],
          secondCard,
        ]);
        playersObj[playerCounter].hand[0].splice(1);
        playersObj[playerCounter].hand[0].push(firstCard);
        var outputMessage = `First Hand: <br>${displayHand(
          playersObj[playerCounter].hand[0]
        )}<br><br>Second Hand: <br>${displayHand(
          playersObj[playerCounter].hand[1]
        )} `;
        turn = 0;
        playerCounter += 1;
        return outputMessage;
      }
    }
  }
};
