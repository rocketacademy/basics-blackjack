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
  var nameEmoji = [
    "🅰",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🔟",
    "🧑",
    "👸",
    "🤴",
  ];
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

      var cardValue = rankCounter;
      if (rankCounter == 11 || rankCounter == 12 || rankCounter == 13) {
        cardValue = 10;
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentSuitEmoji,
        value: cardValue,
        rankEmoji: nameEmoji[rankCounter - 1],
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
  var aceCounter = 0;
  var counter = 0;
  while (counter < hands.length) {
    points += hands[counter].value;
    if (hands[counter].name == "ace") {
      aceCounter += 1;
    }
    counter++;
  }
  if (aceCounter >= 1 && points <= 11) {
    points += 10;
  }
  return points;
};

var decideWinner = function (userPoints, dealerPoints) {
  var loseImage =
    '<img src = "https://c.tenor.com/1nevoLbzV0UAAAAi/run-pepe-sad-pepe.gif"/>';
  var winImage =
    '<img src = "https://c.tenor.com/B0BbyOHgHt4AAAAi/pepe-the-frog-dance.gif"/>';
  var tieImage =
    '<img src = "https://c.tenor.com/J91J3WdKk_8AAAAi/feel-weird-man-pepe.gif"/>';
  if (userPoints > 21) {
    if (dealerPoints > 21) {
      return `Both bust! It's a tie!` + tieImage;
    } else {
      return `You bust, pepe wins!` + winImage;
    }
  }

  if (dealerPoints > 21) {
    if (userPoints > 21) {
      return `Both bust! It's a tie!` + tieImage;
    } else {
      return `Pepe busts, you win!` + loseImage;
    }
  }

  if (userPoints > dealerPoints) {
    if (userPoints == 21) {
      return "You win with a blackjack!" + loseImage;
    }
    return "You win!" + loseImage;
  } else if (userPoints < dealerPoints) {
    if (dealerPoints == 21) {
      return "Pepe wins with a blackjack!" + winImage;
    }
    return "Pepe wins!" + winImage;
  } else if (userPoints == dealerPoints) {
    if (userPoints == 21) {
      return "It is a tie with both players getting blackjacks!" + tieImage;
    }
    return "It is a tie!" + tieImage;
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
var playerCounter = 0;
var dealerCounter = 0;
var partialDealerHands = "";
var main = function (input) {
  // game mode (deck is shuffled is skipped), if I utilised else if, game mode does not change, game flow will not move
  if (gameMode == "Deck is shuffled") {
    document.body.style.backgroundImage =
      "url('https://c.tenor.com/GB3x5UMmH24AAAAC/pepe-meme.gif')";
    shuffledDeck = shuffleCards(makeDeck());
    userCards = [];
    dealerCards = [];
    playerCounter = 0;
    dealerCounter = 0;
    console.log(gameMode);
    gameMode = "Cards are dealt";
    var excitedPepe =
      '<img src ="https://c.tenor.com/YQYglnnhg0YAAAAi/pepe-excited.gif"/>';
    https: myOutputValue = "Click on dancing pepe to deal cards." + excitedPepe;
    return myOutputValue;
  }

  if (gameMode == "Cards are dealt") {
    // deal cards

    userCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());
    userCards.push(shuffledDeck.pop());
    playerCounter++;
    dealerCards.push(shuffledDeck.pop());
    dealerCounter++;

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
    userHands = `<br> ${userCards[0].rankEmoji} of ${userCards[0].emoji} <br> ${userCards[1].rankEmoji} of ${userCards[1].emoji} <br>`;
    dealerHands = `<br> ${dealerCards[0].rankEmoji} of ${dealerCards[0].emoji} <br> ${dealerCards[1].rankEmoji} of ${dealerCards[1].emoji}. <br>`;
    partialDealerHands = `<br> ${dealerCards[0].rankEmoji} of ${dealerCards[0].emoji}`;
    // setting message
    var hitOrStandImage =
      '<img src ="https://c.tenor.com/pcw4xMVjup0AAAAi/pepeblue-pepebluesky.gif"/>';
    myOutputValue =
      `You drew: ${userHands} You have ${userPoints} points. <br><br> Pepe drew: ${partialDealerHands} <br><br> Do you want to hit or stand? (hit/stand)` +
      hitOrStandImage;

    if (userPoints == 21 || dealerPoints == 21) {
      document.body.style.backgroundImage =
        "url('https://c.tenor.com/CMvlbBuFtH4AAAAC/pepe-meme.gif')";
      myOutputValue = `You drew: <br> ${userCards[0].rankEmoji} of  ${userCards[0].emoji} <br> ${userCards[1].rankEmoji} of  ${userCards[1].emoji} <br> You have ${userPoints} points. <br><br> Pepe drew: ${dealerHands}  Pepe has ${dealerPoints} points. <br><br> ${outcome}`;
      gameMode = "Deck is shuffled";
      return myOutputValue;
    }
    gameMode = "Player hit or stand";
    return myOutputValue;
  }

  if (gameMode == "Player hit or stand") {
    console.log("player hit or stand");
    var hitOrStandImage =
      '<img src ="https://c.tenor.com/pcw4xMVjup0AAAAi/pepeblue-pepebluesky.gif"/>';
    var annoyedImage =
      '<img src ="https://c.tenor.com/17bXXRTAZwgAAAAi/wut-rage.gif"/>';
    if (
      input == "" ||
      (input != "hit" && input != "stand" && input != "Hit" && input != "Stand")
    ) {
      myOutputValue =
        `You drew: ${userHands} You have ${userPoints} points. <br><br> Pepe drew: ${partialDealerHands} <br><br> Do you want to hit or stand? (hit/stand)<br> Please enter a valid input (hit/stand).` +
        annoyedImage;
      return myOutputValue;
    } else if (input == "hit" || input == "Hit") {
      userCards.push(shuffledDeck.pop());
      playerCounter++;
      userPoints = checkPoints(userCards);
      userHands += `${userCards[playerCounter].rankEmoji} of ${userCards[playerCounter].emoji} <br>`;
      if (userPoints < 22) {
        myOutputValue =
          `You have chose to hit. <br> You drew: ${userHands}  You have ${userPoints} points.  <br><br> Pepe drew: ${partialDealerHands} <br><br> <br><br> Do you want to hit or stand? (hit/stand)` +
          hitOrStandImage;
        return myOutputValue;
      } else if (userPoints > 21) {
        var hehePepe =
          '<img src ="https://c.tenor.com/eSzdZd6_b_0AAAAC/pepe.gif"/>';
        myOutputValue =
          `You have chose to hit. <br> You drew: ${userHands}  You have ${userPoints} points. <br><br> Pepe drew: ${partialDealerHands} <br><br> You bust, click on dancing pepe for pepe's turn. ` +
          hehePepe;
        gameMode = "Dealer hit or stand";
        return myOutputValue;
      }
      counter++;
      return myOutputValue;
    } else if (input == "stand" || input == "Stand") {
      var anxiousPepe =
        '<img src ="https://c.tenor.com/GNiV7ZWl4OMAAAAi/monka-spin-pepe-frog.gif"/>';
      https: myOutputValue =
        `You have chose to stand. <br> You drew: ${userHands} You have ${userPoints} points. <br><br> Pepe drew: ${partialDealerHands} <br><br> Click on dancing pepe for pepe's turn.` +
        anxiousPepe;
      gameMode = "Dealer hit or stand";
      return myOutputValue;
    }
  }

  if (gameMode == "Dealer hit or stand") {
    console.log("Dealer hit or stand");
    dealerPoints = checkPoints(dealerCards);

    if (dealerPoints < 17) {
      dealerCards.push(shuffledDeck.pop());
      dealerCounter++;
      userPoints = checkPoints(userCards);
      dealerPoints = checkPoints(dealerCards);
      dealerHands += `${dealerCards[dealerCounter].rankEmoji} of ${dealerCards[dealerCounter].emoji}. <br>`;
      outcome = decideWinner(userPoints, dealerPoints);

      if (dealerPoints < 17) {
        var anxiousPepe =
          '<img src="https://c.tenor.com/IMKlr0dPXh0AAAAi/pepeblue-pepebluesky.gif"/>';
        myOutputValue =
          `Pepe hits. <br><br> You drew: ${userHands} You have ${userPoints} points. 
      <br><br> Pepe drew: ${dealerHands}  Pepe has ${dealerPoints} points and will need to draw again. <br><br> Click on dancing pepe for pepe to hit.` +
          anxiousPepe;
        return myOutputValue;
      }
      document.body.style.backgroundImage =
        "url('https://c.tenor.com/CMvlbBuFtH4AAAAC/pepe-meme.gif')";
      myOutputValue = `Pepe hits. <br><br> You drew: ${userHands} You have ${userPoints} points. 
      <br><br> Pepe drew: ${dealerHands}  Pepe has ${dealerPoints} points. <br><br> ${outcome} `;
      gameMode = "Deck is shuffled";
      return myOutputValue;
    } else {
      document.body.style.backgroundImage =
        "url('https://c.tenor.com/CMvlbBuFtH4AAAAC/pepe-meme.gif')";
      userPoints = checkPoints(userCards);
      dealerPoints = checkPoints(dealerCards);
      var outcome = decideWinner(userPoints, dealerPoints);
      myOutputValue = `Pepe stands. <br><br> You drew: ${userHands} You have ${userPoints} points. <br><br> Pepe drew: ${dealerHands} Pepe has ${dealerPoints} points. <br><br> ${outcome} `;
      gameMode = "Deck is shuffled";
      return myOutputValue;
    }
  }
};
