// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitsEmoji = ["♥", "♦", "♣", "♠"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var currentSuitEmoji = suitsEmoji[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentSuitEmoji,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// compute points, if hand < 2 cards, ace = rank 11.
var checkPoints = function (hands) {
  var points = 0;
  // if hands only have 2 cards
  if (hands.length == 2) {
    // if there first card is an ace, second ace will be equivalent to 10 points.
    if (hands[0].name == "ace") {
      points += 11;
      if (
        hands[1].name == "ace" ||
        hands[1].name == "jack" ||
        hands[1].name == "queen" ||
        hands[1].name == "king"
      ) {
        points += 10;
      } else {
        points += hands[1].rank;
      }
      // if first card is not an ace, second ace will be equivalent to 11 points.
    } else if (
      hands[0].name == "jack" ||
      hands[0].name == "queen" ||
      hands[0].name == "king"
    ) {
      points += 10;
      if (hands[1].name == "ace") {
        points += 11;
      } else if (
        hands[1].name == "jack" ||
        hands[1].name == "queen" ||
        hands[1].name == "king"
      ) {
        points += 10;
      } else {
        points += hands[1].rank;
      }
    } else {
      points += hands[0].rank;
      if (hands[1].name == "ace") {
        points += 11;
      } else if (
        hands[1].name == "jack" ||
        hands[1].name == "queen" ||
        hands[1].name == "king"
      ) {
        points += 10;
      } else {
        points += hands[1].rank;
      }
    }
    return points;
  }

  if (hands.length == 3) {
    // if there first card is an ace, second ace will be equivalent to 10 points.
    if (hands[0].name == "ace") {
      points += 11;
      if (
        hands[1].name == "jack" ||
        hands[1].name == "queen" ||
        hands[1].name == "king" ||
        hands[1].name == 10
      ) {
        points += 10;
        if (
          hands[2].name == "jack" ||
          hands[2].name == "queen" ||
          hands[2].name == "king" ||
          hands[2].name == 10
        ) {
          // first ace will be 1 point instead of 11 [A 10 10]
          points += 0;
          return points;
        } else if (hands[2].name == "ace") {
          // first and third ace will be 1 point each [A 10 A]
          points -= 9;
          return points;
        } else {
          // first ace will be 1 point instead of 11 [A 10 C]
          points -= 10;
          points += hands[2].rank;
          return points;
        }
      } else if (hands[1].name == "ace") {
        points += 1;
        if (
          hands[2].name == "jack" ||
          hands[2].name == "queen" ||
          hands[2].name == "king" ||
          hands[2].name == 10
        ) {
          // [A A 10]
          points += 0;
          return points;
        } else if (hands[2].name == "ace") {
          // [A A A]
          points += 1;
          return points;
        } else {
          // [A A C]
          points += hands[2].rank;
          return points;
        }
      } else {
        points += hands[1].rank;
        if (
          hands[2].name == "jack" ||
          hands[2].name == "queen" ||
          hands[2].name == "king" ||
          hands[2].name == 10
        ) {
          // [A C 10]
          points += 0;
          return points;
        } else if (hands[2].name == "ace") {
          // [A C A]
          points += 1;
          return points;
        } else {
          // [A C C]
          points += hands[2].rank;
          if (points > 21) {
            points -= 10;
            return points;
          }
          return points;
        }
      }
      // if first card is not an ace, second ace will be equivalent to 11 points.
    } else if (
      hands[0].name == "jack" ||
      hands[0].name == "queen" ||
      hands[0].name == "king" ||
      hands[0].name == 10
    ) {
      points += 10;
      if (hands[1].name == "ace") {
        points += 1;
        if (
          hands[2].name == "jack" ||
          hands[2].name == "queen" ||
          hands[2].name == "king" ||
          hands[2].name == 10
        ) {
          // [10 A 10]
          points += 10;
          return points;
        } else if (hands[2].name == "ace") {
          // [10 A A]
          points += 1;
          return points;
        } else {
          // [10 A C]
          points += hands[2].rank;
          return points;
        }
      } else if (
        hands[1].name == "jack" ||
        hands[1].name == "queen" ||
        hands[1].name == "king" ||
        hands[1].name == 10
      ) {
        points += 10;
        if (
          hands[2].name == "jack" ||
          hands[2].name == "queen" ||
          hands[2].name == "king" ||
          hands[2].name == 10
        ) {
          // [10 10 10]
          points += 10;
          return points;
        } else if (hands[2].name == "ace") {
          // [10 10 A]
          points += 1;
          return points;
        } else {
          // [10 10 C]
          points += hands[2].rank;
          return points;
        }
      } else {
        points += hands[1].rank;
        if (
          hands[2].name == "jack" ||
          hands[2].name == "queen" ||
          hands[2].name == "king" ||
          hands[2].name == 10
        ) {
          // [10 C 10]
          points += 10;
          return points;
        } else if (hands[2].name == "ace") {
          // [10 C A]
          points += 1;
          return points;
        } else {
          // [10 C C]
          points += hands[2].rank;
          return points;
        }
      }
    } else {
      points += hands[0].rank;
      if (hands[1].name == "ace") {
        points += 11;
        if (
          hands[2].name == "jack" ||
          hands[2].name == "queen" ||
          hands[2].name == "king" ||
          hands[2].name == 10
        ) {
          // [C A 10]
          points += 0;
          return points;
        } else if (hands[2].name == "ace") {
          // [C A A]
          points += 1;
          return points;
        } else {
          // [C A C]
          points += hands[2].rank;
          return points;
        }
      } else if (
        hands[1].name == "jack" ||
        hands[1].name == "queen" ||
        hands[1].name == "king"
      ) {
        points += 10;
        if (
          hands[2].name == "jack" ||
          hands[2].name == "queen" ||
          hands[2].name == "king" ||
          hands[2].name == 10
        ) {
          // [C 10 10]
          points += 10;
          return points;
        } else if (hands[2].name == "ace") {
          // [C 10 A]
          points += 1;
          return points;
        } else {
          // [C 10 C]
          points += hands[2].rank;
          return points;
        }
      } else {
        points += hands[1].rank;
        if (
          hands[2].name == "jack" ||
          hands[2].name == "queen" ||
          hands[2].name == "king" ||
          hands[2].name == 10
        ) {
          // [C C 10]
          points += 10;
          return points;
        } else if (hands[2].name == "ace") {
          // [C C A]
          points += 11;
          if (points > 21) {
            points -= 10;
            return points;
          }
          return points;
        } else {
          // [C C C]
          points += hands[2].rank;
          return points;
        }
      }
    }
  }

  return points;
};

var decideWinner = function (userPoints, dealerPoints) {
  if (userPoints > 21) {
    if (dealerPoints > 21) {
      return `It's a tie!`;
    } else {
      return `You bust, dealer wins!`;
    }
  }

  if (dealerPoints > 21) {
    if (userPoints > 21) {
      return `It's a tie!`;
    } else {
      return `Dealer busts, you win!`;
    }
  }

  if (userPoints > dealerPoints) {
    if (userPoints == 21) {
      return "You win with a blackjack!";
    }
    return "You win!";
  } else if (userPoints < dealerPoints) {
    if (dealerPoints == 21) {
      return "Dealer wins with a blackjack!";
    }
    return "Dealer wins!";
  } else if (userPoints == dealerPoints) {
    if (userPoints == 21) {
      return "It is a tie with both players getting blackjacks!";
    }
    return "It is a tie!";
  }
};

var gameMode = "Deck is shuffled";
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var userCards = [];
var dealerCards = [];
var userPoints = 0;
var dealerPoints = 0;
var userHands = "";
var dealerHands = "";
var main = function (input) {
  // game mode (deck is shuffled is skipped), if I utilised else if, game mode does not change, game flow will not move
  if (gameMode == "Deck is shuffled") {
    shuffledDeck = shuffleCards(makeDeck());
    userCards = [];
    dealerCards = [];
    console.log(gameMode);
    gameMode = "Cards are dealt";
    myOutputValue = "Click submit to deal cards.";
    return myOutputValue;
  }

  if (gameMode == "Cards are dealt") {
    // deal cards

    userCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());
    userCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());

    // check hands
    console.log(userCards);
    console.log(dealerCards);

    //compute points based on hands
    userPoints = checkPoints(userCards);
    dealerPoints = checkPoints(dealerCards);
    console.log(userPoints);
    console.log(dealerPoints);
    // decide winner
    var outcome = decideWinner(userPoints, dealerPoints);
    // display message for hands
    userHands = `<br> ${userCards[0].name} of ${userCards[0].suit} ${userCards[0].emoji} <br> ${userCards[1].name} of ${userCards[1].suit} ${userCards[1].emoji} <br>`;
    dealerHands = `<br> ${dealerCards[0].name} of ${dealerCards[0].suit} ${dealerCards[0].emoji} <br> ${dealerCards[1].name} of ${dealerCards[1].suit} ${dealerCards[1].emoji}. <br>`;
    // setting message
    myOutputValue = `You drew: ${userHands} You have ${userPoints} points. Do you want to hit or stand? (hit/stand)`;

    if (userPoints == 21 || dealerPoints == 21) {
      myOutputValue = `You drew: <br> ${userCards[0].name} of ${userCards[0].suit} ${userCards[0].emoji} <br> ${userCards[1].name} of ${userCards[1].suit} ${userCards[1].emoji} <br> You have ${userPoints} points. <br><br> Dealer drew: ${dealerHands}  Dealer has ${dealerPoints} points. <br><br> ${outcome}`;
      gameMode = "Deck is shuffled";
      return myOutputValue;
    }

    // myOutputValue += `<br><br>
    // Dealer drew: <br> ${dealerCards[0].name} of ${dealerCards[0].suit} ${dealerCards[0].emoji} <br> ${dealerCards[1].name} of ${dealerCards[1].suit} ${dealerCards[1].emoji}. <br> Dealer has ${dealerPoints} points. <br><br> ${outcome} `;

    // return points, give the user a choice to hit or stand

    gameMode = "Player hit or stand";
    return myOutputValue;
  }

  if (gameMode == "Player hit or stand") {
    console.log("player hit or stand");

    if (input == "" || (input != "hit" && input != "stand")) {
      myOutputValue = `You drew: ${userHands} You have ${userPoints} points. Do you want to hit or stand? (hit/stand)<br><br> Please enter a valid input (hit/stand).`;
      return myOutputValue;
    } else if (input == "hit") {
      userCards.push(shuffledDeck.pop());
      userPoints = checkPoints(userCards);
      userHands += `${userCards[2].name} of ${userCards[2].suit} ${userCards[2].emoji} <br>`;
      myOutputValue = `You have chose to hit. <br> You drew: ${userHands}  You have ${userPoints} points. <br><br> Click submit for dealer's turn.`;
      gameMode = "Dealer hit or stand";
      return myOutputValue;
    } else if (input == "stand") {
      myOutputValue = `You have chose to stand. <br> You drew: ${userHands} You have ${userPoints} points. <br><br> Click submit for dealer's turn.`;
      gameMode = "Dealer hit or stand";
      return myOutputValue;
    }
  }

  if (gameMode == "Dealer hit or stand") {
    console.log("Dealer hit or stand");
    dealerPoints = checkPoints(dealerCards);
    if (dealerPoints < 18) {
      dealerCards.push(shuffledDeck.pop());
      userPoints = checkPoints(userCards);
      dealerPoints = checkPoints(dealerCards);
      dealerHands += `${dealerCards[2].name} of ${dealerCards[2].suit} ${dealerCards[2].emoji}. <br>`;
      outcome = decideWinner(userPoints, dealerPoints);
      myOutputValue = `Dealer hits. <br><br> You drew: ${userHands} You have ${userPoints} points. 
      <br><br> Dealer drew: ${dealerHands}  Dealer has ${dealerPoints} points. <br><br> ${outcome} `;
      gameMode = "Deck is shuffled";
      return myOutputValue;
    } else {
      userPoints = checkPoints(userCards);
      dealerPoints = checkPoints(dealerCards);
      var outcome = decideWinner(userPoints, dealerPoints);
      myOutputValue = `Dealer stands. <br><br> You drew: ${userHands} You have ${userPoints} points. <br><br> Dealer drew: ${dealerHands} Dealer has ${dealerPoints} points. <br><br> ${outcome} `;
      gameMode = "Deck is shuffled";
      return myOutputValue;
    }
  }
};
