//Win lose conditions
//if player cards amount to 21, USER wins instantly (i.e. an ace and a king queen jack or 10). (Winnings 1.5x)
//if dealer busts, all players will WIN 2x
//if any player's hand is higher than dealer's, all players will win 2x
//if dealer's hand is 21 or higher than player's, DEALER wins

//game modes
var issueCards = "Start of round, deal cards to player and dealer";
var playerRound = "Player decides to hit or stay";
var currentGameMode = issueCards;

//52 card deck function
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  //create suits
  var suitCounter = 0;
  while (suitCounter < suits.length) {
    var currentSuit = suits[suitCounter];
    //create 13 ranks & card value for each suit
    // 2-10 cards are valued at face value

    var rankCounter = 1;
    while (rankCounter < 14) {
      var currentRank = rankCounter;
      var currentName = rankCounter;
      var currentValue = rankCounter;

      // jack queen king are 10
      // ace can be 1 or 11 and value can be decided throughout the round (have card be valued 11 first, then if total value exceeds 21 during the decision phases, to convert to value 1)
      if (currentName == 1) {
        currentName = "Ace";
        currentValue = 11;
      }
      if (currentName == 11) {
        currentName = "Jack";
        currentValue = 10;
      }
      if (currentName == 12) {
        currentName = "Queen";
        currentValue = 10;
      }
      if (currentName == 13) {
        currentName = "King";
        currentValue = 10;
      }

      var currentCard = {
        suit: currentSuit,
        rank: currentRank,
        name: currentName,
        value: currentValue,
      };

      cardDeck.push(currentCard);
      rankCounter += 1;
    }
    suitCounter += 1;
  }
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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

//issue two cards and push it into array
var dealTwoCards = function (cardDeck, toCardDeck) {
  var firstCard = cardDeck.pop();
  var secondCard = cardDeck.pop();
  toCardDeck.push(firstCard);
  toCardDeck.push(secondCard);
};

//calculating total value of card
var sumOfCards = function (cardArray) {
  var totalCardValue = 0;
  var cardArrayIndex = 0;
  while (cardArrayIndex < cardArray.length) {
    var cardValue = cardArray[cardArrayIndex].value;
    totalCardValue += cardValue;
    cardArrayIndex += 1;
  }

  return totalCardValue;
};

//sumofCards with variable Ace
//if total value exceeds 21, to check if there are any aces on hand and convert the value to 1
var totalCardValue = function (cardArray) {
  var sumCardValue = sumOfCards(cardArray);
  if (sumCardValue > 21) {
    var cardIndex = 0;
    while (cardIndex < cardArray.length) {
      //to convert aces to the point where total card value does not exceed 21
      if (sumOfCards(cardArray) > 21 && cardArray[cardIndex].value == 11) {
        cardArray[cardIndex].value = 1;
      }
      cardIndex += 1;
    }
  }
  var cardValueAfterConversion = sumOfCards(cardArray);
  return cardValueAfterConversion;
};

//display card name and suit on output of all cards in array
var cardArrayDisplay = function (cardArray) {
  var cardNames = "";
  var arrayIndex = 0;
  while (arrayIndex < cardArray.length) {
    var singleCardNames = `${cardArray[arrayIndex].name} of ${cardArray[arrayIndex].suit}<br>`;
    cardNames += singleCardNames;
    arrayIndex += 1;
  }
  console.log(cardNames, "card  names", typeof cardNames);
  return cardNames;
};

var newDeck = makeDeck();
var shuffledDeck = shuffleCards(newDeck);
var playerCards = [];
var playerCardValue = 0;
var dealerCards = [];
var dealerCardValue = 0;

var main = function (input) {
  if (currentGameMode == issueCards) {
    playerCards = [];
    dealerCards = [];
    //issue two cards to player and dealer at start of round
    dealTwoCards(shuffledDeck, playerCards);
    console.log(playerCards, "player card at start");
    playerCardValue = totalCardValue(playerCards);

    dealTwoCards(shuffledDeck, dealerCards);
    dealerCardValue = totalCardValue(dealerCards);
    console.log(dealerCards, "dealer card at start");

    //check if player's hand is 21, if yes & dealer's hand is not 21, user instant wins and start new round again
    //tie if both hands are natural 21s
    if (playerCardValue == 21 && dealerCardValue != 21) {
      return `Player hand: <br>${cardArrayDisplay(
        playerCards
      )}<br>Dealer hand: <br>${cardArrayDisplay(
        dealerCards
      )}<br> NAT 21! Lucky!<br>Press submit again to play another round.`;
    }
    if (playerCardValue == 21 && dealerCardValue == 21) {
      return `Player hand: <br>${cardArrayDisplay(
        playerCards
      )}<br>Dealer hand: <br>${cardArrayDisplay(
        dealerCards
      )}<br>WHOA TWO NAT 21s! It's a tie.<br>Press submit again to play another round.`;
    }

    currentGameMode = playerRound;

    //if not 21, player can decide to hit (add another card) or stay (not add another card)
    //only show dealer's first cards
    return `Player hand: <br>${cardArrayDisplay(
      playerCards
    )}<br> Dealer hand:<br> ${dealerCards[0].name} of ${
      dealerCards[0].suit
    }<br> <br>Please submit "hit" for another card, or "stay" to remain with your current hand.`;
  }

  //if player hits, add another card into hand
  if (currentGameMode == playerRound && input == "hit") {
    var newCard = shuffledDeck.pop();
    playerCards.push(newCard);
    playerCardValue = totalCardValue(playerCards);
    console.log(shuffledDeck, "shuffled deck array 2");
    console.log(playerCards, "player cards array 2");

    //if a hit results in a bust, to restart round
    if (playerCardValue > 21) {
      currentGameMode = issueCards;
      return `You drew ${newCard.name} of ${
        newCard.suit
      }.<br> <br> Your cards have exceeded 21 points, better luck next time.<br> Player hand: <br>${cardArrayDisplay(
        playerCards
      )}<br>Press submit again to play another round.`;
    }
    //if a hit results in 21, to check if dealer hand is also 21, if dealer hand is not 21, player wins
    if (playerCardValue == 21 && dealerCardValue != 21) {
      currentGameMode = issueCards;
      return `Player hand: <br>${cardArrayDisplay(
        playerCards
      )}<br>Dealer hand: <br>${cardArrayDisplay(
        dealerCards
      )}<br> You won!<br>Press submit again to play another round.`;
    }
    if (playerCardValue == 21 && dealerCardValue == 21) {
      currentGameMode = issueCards;
      return `Player hand: <br>${cardArrayDisplay(
        playerCards
      )}<br>Dealer hand: <br>${cardArrayDisplay(
        dealerCards
      )}<br>You won!<br>Press submit again to play another round.`;
    }

    return `You drew ${newCard.name} of ${
      newCard.suit
    }.<br> <br>Player hand: <br>${cardArrayDisplay(
      playerCards
    )}<br> Dealer hand:<br> ${dealerCards[0].name} of ${
      dealerCards[0].suit
    }<br> <br>Please submit "hit" for another card, or "stay" to remain with your current hand.`;
  }

  //if player stays, switches to dealer's turn
  //to determine winner here
  if (currentGameMode == playerRound && input == "stay") {
    //if dealer's hand totals less than 17, they must hit, till their hand exceeds 17 in value
    var dealerCardsDrawn = [];
    while (dealerCardValue < 17) {
      var dealerDrawnCard = shuffledDeck.pop();
      dealerCardsDrawn.push(dealerDrawnCard);
      dealerCards.push(dealerDrawnCard);
      dealerCardValue = totalCardValue(dealerCards);
      console.log(dealerCards);
    }

    //if dealer's cards equals or more than 17 but less than player's total, dealer to draw again till they get more than player
    while (dealerCardValue < playerCardValue) {
      dealerDrawnCard = shuffledDeck.pop();
      dealerCardsDrawn.push(dealerDrawnCard);
      dealerCards.push(dealerDrawnCard);
      dealerCardValue = totalCardValue(dealerCards);
      console.log("loop ran");
    }

    //if dealer's card values busts 21, they lose
    if (dealerCardValue > 21) {
      currentGameMode = issueCards;
      return `The dealer drew:<br>${cardArrayDisplay(
        dealerCardsDrawn
      )}<br>Dealer busts 21, Player wins.<br> <br>Player's Hand: <br>${cardArrayDisplay(
        playerCards
      )}<br> <br>Dealer's Hand: ${cardArrayDisplay(
        dealerCards
      )}<br>Press submit to play another round.`;
    }

    //if dealer's cards more than player's cards, dealer wins
    if (dealerCardValue > playerCardValue) {
      currentGameMode = issueCards;
      console.log(dealerCards, "dealer cards at end");
      return `Player's Hand: <br>${cardArrayDisplay(
        playerCards
      )}<br>Dealer's Hand:<br>${cardArrayDisplay(
        dealerCards
      )}<br>Dealer won.<br> Press submit to play another round`;
    }
  }
};

//for testing
// playerCards = [
//   { suit: "Diamonds", rank: 12, name: "Queen", value: 9 },
//   { suit: "Spades", rank: 1, name: "Ace", value: 11 },
// ];
