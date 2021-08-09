const main = function (input) {
  return blackJack(input);
};

let playerName = `Player 1`;
let dealerName = `Computer`;

let gameState = `shuffle`;

let playerHand = [];
let dealerHand = [];

let playerScore = 0;
let dealerScore = 0;

let playerValueArray;
let dealerValueArray;

let playerHandText = ``;
let dealerHandText = ``;

/**
 *
 * @param {*} userInput user input in the field
 * @returns output result which differs at different gameStates
 */
const blackJack = function (userInput) {
  // Deck is shuffled.
  if (gameState == `shuffle`) {
    deck = shuffleCards(deck);
    gameState = `deal`;
    return `deck is shuffled`;
  }
  // User clicks Submit to deal cards.
  if (gameState == `deal`) {
    // deal 1 to player and dealer
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    // deal another 1 to player and dealer
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());

    console.log(playerHand);
    console.log(dealerHand);

    gameState = `checkVal`;
    return `<b>You drawn:</b><br>${revealedHandText(playerHand)}
    <b>Dealer's hand:</b><br>${unrevealedHandText(dealerHand)}`;
  }
  // The initial cards are analysed for game winning conditions, e.g. Blackjack.
  if (gameState == `checkVal`) {
    playerValueArray = handValues(playerHand);
    dealerValueArray = handValues(dealerHand);
    console.log(playerValueArray);
    console.log(dealerValueArray);
    // check if player already has 21 in his starting hand and computer doesn't have 21 in his starting hand
    if (
      bestValue(playerValueArray) == 21 &&
      bestValue(dealerValueArray) != 21
    ) {
      // player wins and scores
      playerScore += 1;
      resetGame();
      gameState = `shuffle`;
      return `<i>${playerName} wins!</i><br><br>
      ${playerName}'s total score: ${playerScore}<br>
      ${dealerName}'s total score: ${dealerScore}<br>
      `;
    } else if (
      bestValue(playerValueArray) != 21 &&
      bestValue(dealerValueArray) == 21
    ) {
      // player loses
      dealerScore += 1;
      resetGame();
      gameState = `shuffle`;
      return `<i>${playerName} loses!</i><br><br>
      ${playerName}'s total score: ${playerScore}<br>
      ${dealerName}'s total score: ${dealerScore}<br>
      `;
    } else if (
      bestValue(playerValueArray) == 21 &&
      bestValue(dealerValueArray) == 21
    ) {
      // draw
      resetGame();
      gameState = `shuffle`;
      return `${playerName} has drawn against the dealer!<br>click submit to start next round!<br><br>${playerName}'s score: ${playerScore}<br>${dealerName}'s score: ${dealerScore}`;
    } else {
      gameState = `playerhitOrStand`;
      return `<i>No one has an initial winning hand.</i><br><br>
      It is now ${playerName}'s turn.<br>
      Hit or Stand? [type 'hit' or 'stand' and submit]<br><br>
      <b>You drawn:</b><br>${revealedHandText(playerHand)}
      <b>Dealer's hand:</b><br>${unrevealedHandText(dealerHand)}
      `;
    }
  }
  // Player's turn to play
  if (gameState == `playerhitOrStand`) {
    // Check if player's lowest possible value has already exceeded 21. if so, return as player loss and score a point for dealer
    if (playerValueArray[0] > 21) {
      // player loses
      dealerScore += 1;
      resetGame();
      gameState = `shuffle`;
      return `<i>${playerName} loses!</i><br><br>
      ${playerName}'s total score: ${playerScore}<br>
      ${dealerName}'s total score: ${dealerScore}<br>
      `;
    } else {
      // proceed to player's decision to hit/stand
      if (userInput != `hit` && userInput != `stand`) {
        return `<i>Please type 'hit' or 'stand'</i><br><br>
        It is now ${playerName}'s turn.<br>
        Hit or Stand? [type 'hit' or 'stand' and submit]<br><br>
        <b>You drawn:</b><br>${revealedHandText(playerHand)}
        <b>Dealer's hand:</b><br>${unrevealedHandText(dealerHand)}
        `;
      }
      if (userInput == `hit`) {
        // hit code block
        // updates playerHand
        playerHand.push(deck.pop());
        playerHandText = revealedHandText(playerHand);
        playerValueArray = handValues(playerHand);

        return `<i>You have drawn a card</i><br><br>
        It is now ${playerName}'s turn.<br>
        Hit or Stand? [type 'hit' or 'stand' and submit]<br><br>
        <b>You drawn:</b><br>${revealedHandText(playerHand)}
        <b>Dealer's hand:</b><br>${unrevealedHandText(dealerHand)}
        `;
      }
      if (userInput == `stand`) {
        // move to start of dealers' turn
        // dealer reveals facedown card
        gameState = `dealerHitOrStand`;
        return `<i>Dealer reveals facedown card</i><br><br>
        It is now ${dealerName}'s turn. [click submit to proceed]<br><br>
        <b>You drawn:</b><br>${revealedHandText(playerHand)}
        <b>Dealer's hand:</b><br>${revealedHandText(dealerHand)}
        `;
      }
    }
  }
  // Dealer's turn to play
  if (gameState == `dealerHitOrStand`) {
    // Check if dealer's lowest possible value has already exceeded 21. if so, return as player win and score a point for player
    if (dealerValueArray[0] > 21) {
      // player wins
      playerScore += 1;
      resetGame();
      gameState = `shuffle`;
      return `<i>${playerName} loses!</i><br><br>
      ${playerName}'s total score: ${playerScore}<br>
      ${dealerName}'s total score: ${dealerScore}<br>
      `;
    } else {
      // proceed to dealer's decision to hit/stand
      if (dealerValueArray[dealerValueArray.length - 1] < 17) {
        // if dealer's highest possible value < 17, dealer MUST hit.
        dealerHand.push(deck.pop());
        dealerHandText = unrevealedHandText(dealerHand);
        dealerValueArray = handValues(dealerHand);
        return `<i>Dealer hits, and drawn a card</i><br><br>
        It is now ${dealerName}'s turn.<br><br>
        <b>You drawn:</b><br>${revealedHandText(playerHand)}
        <b>Dealer's hand:</b><br>${revealedHandText(dealerHand)}
        `;
      } else if (dealerValueArray[0] >= 17) {
        // if dealer hand lowest possible value >= 17, dealer MUST stand.
        gameState = `scoring`;
        return `<i>Dealer stands</i><br><br>
        Comparing best values.. [click submit to proceed]<br><br>
        <b>You drawn:</b><br>${revealedHandText(playerHand)}
        <b>Dealer's hand:</b><br>${revealedHandText(dealerHand)}
        `;
      } else {
        // ..dealer chooses to hit or stand.
        if (userInput != `hit` && userInput != `stand`) {
          return `<i>Please type 'hit' or 'stand'</i><br><br>
          It is now ${dealerName}'s turn.<br><br>
          Hit or Stand? [type 'hit' or 'stand' and submit]<br><br>
          <b>You drawn:</b><br>${revealedHandText(playerHand)}
          <b>Dealer's hand:</b><br>${revealedHandText(dealerHand)}
          `;
        }
        if (userInput == `hit`) {
          // dealer chooses hit
          dealerHand.push(deck.pop());
          dealerHandText = unrevealedHandText(dealerHand);
          dealerValueArray = handValues(dealerHand);
          return `<i>Dealer hits, and drawn a card</i><br><br>
          It is now ${dealerName}'s turn.<br><br>
          <b>You drawn:</b><br>${revealedHandText(playerHand)}
          <b>Dealer's hand:</b><br>${revealedHandText(dealerHand)}
          `;
        }
        if (userInput == `stand`) {
          // dealer chooses stand
          gameState = `scoring`;
          return `<i>Dealer stands</i><br><br>
          Comparing best values.. [click submit to proceed]<br><br>
          <b>You drawn:</b><br>${revealedHandText(playerHand)}
          <b>Dealer's hand:</b><br>${revealedHandText(dealerHand)}
          `;
        }
      }
    }
  }
  // Score Evaluation & resetting gameState to `shuffle`
  if (gameState == `scoring`) {
    if (bestValue(playerValueArray) > bestValue(dealerValueArray)) {
      // if player's best value > dealer's best value, player wins
      playerScore += 1;
      resetGame();
      gameState = `shuffle`;
      return `<i>${playerName} wins!</i><br><br>
      ${playerName}'s total score: ${playerScore}<br>
      ${dealerName}'s total score: ${dealerScore}<br>
      `;
    }
    if (bestValue(playerValueArray) < bestValue(dealerValueArray)) {
      // if player's best value < dealer's best value, player loses
      dealerScore += 1;
      resetGame();
      gameState = `shuffle`;
      return `<i>${playerName} loses!</i><br><br>
      ${playerName}'s total score: ${playerScore}<br>
      ${dealerName}'s total score: ${dealerScore}<br>
      `;
    }
    if (bestValue(playerValueArray) == bestValue(dealerValueArray)) {
      // if player's best value = dealer's best value, game is tied
      resetGame();
      gameState = `shuffle`;
      return `<i>${playerName} wins!</i><br>
      Click submit again to play next round<br><br>
      ${playerName}'s total score: ${playerScore}<br>
      ${dealerName}'s total score: ${dealerScore}<br>
      `;
    }
  }
};

/**
 * takes in a dealer's (not player) hand array and returns it in text format
 * @param {array} handArray array of card objects that represents a blackjack hand
 * @returns hand in text format
 */
const unrevealedHandText = function (handArray) {
  let handText = ``;
  for (let i = 0; i < handArray.length; i++) {
    if (i == 1) {
      handText += `Card ${i + 1}: *Face Down*<br>`;
    } else {
      handText += `Card ${i + 1}: ${handArray[i]["name"]} of ${
        handArray[i]["suit"]
      }<br>`;
    }
  }
  handText += `Current possible values: *Unknown*`;
  return handText;
};

/**
 * takes in a hand array and returns it in text format, revealing all card values.
 * @param {array} handArray array of card objects that represents a blackjack hand
 * @returns hand in text format
 */
const revealedHandText = function (handArray) {
  let handText = ``;
  for (let i = 0; i < handArray.length; i++) {
    handText += `Card ${i + 1}: ${handArray[i]["name"]} of ${
      handArray[i]["suit"]
    }<br>`;
  }
  handText += `Current possible values: ${handValues(handArray)}<br><br>`;
  return handText;
};

/**
 * resets all hands to initial state.
 */
const resetGame = function () {
  gameState = `shuffle`;
  deck = makeDeck();

  playerHand = [];
  dealerHand = [];

  playerValueArray = undefined;
  dealerValueArray = undefined;

  playerHandText = ``;
  dealerHandText = ``;
};

/**
 * takes in valueArray argument and returns a number cloest and <= 21
 * @param {array} valueArray input valueArray of any 1 player/computer
 * @returns a single number closest and <= 21
 */
const bestValue = function (valueArray) {
  // get closest handVal to 21 for player, must be <= 21
  let bestValue;
  if (valueArray.some((value) => value > 21) == true && valueArray[0] <= 21) {
    // if (1) playerhand has possible value > 21 and (2) playerhand minimum value <= 21; then loop to find largest hand value <= 21 and assign value as bestPlayerValue
    for (let i = 0; i < valueArray.length; i++) {
      if (valueArray[i] - 21 > 0) {
        bestValue = valueArray[i - 1];
        break;
      }
    }
  } else if (valueArray.some((value) => value > 21) == true) {
    // if all playerhand is > 21, choose lowest value
    bestValue = valueArray[0];
  } else {
    // if all playerhand is <= 21, select largest value in playerValueArray as bestPlayerValue
    bestValue = valueArray[valueArray.length - 1];
  }
  return bestValue;
};

/**
 * takes in handArray and returns an array of handValue, i.e. `handValueArray`
 * @param {array} handArray input your array of card objects to check for total value of hand
 * @returns an array of hand values [value if A = 1, value if A = 11, ..].
 */
const handValues = function (handArray) {
  let handValueArray = [];
  let handVal = 0;
  // count handValue for all non-Ace cards in hand, and ignore Aces (treat Ace value = 0).
  for (i = 0; i < handArray.length; i++) {
    if (handArray[i]["value"] == `x`) {
      handArray[i]["value"] = 0;
    }
    handVal += handArray[i]["value"];
    if (handArray[i]["value"] == 0) {
      handArray[i]["value"] = `x`;
    }
  }

  if (aceCounter(handArray) == 0) {
    // if hand contains no ace
    handValueArray = [handVal];
  } else if (aceCounter(handArray) == 1) {
    // if hand contains 1 ace
    handValueArray = [1 + handVal, 11 + handVal];
  } else if (aceCounter(handArray) == 2) {
    // if hand contains 2 ace
    handValueArray = [2 + handVal, 12 + handVal, 22 + handVal];
  } else if (aceCounter(handArray) == 3) {
    handValueArray = [3 + handVal, 13 + handVal, 23 + handVal, 33 + handVal];
  } else {
    // if hand contains 4 ace
    handValueArray = [
      4 + handVal,
      14 + handVal,
      24 + handVal,
      34 + handVal,
      44 + handVal,
    ];
  }
  return handValueArray;
};

/**
 * takes in handArray and returns the number of ace in hand
 * @param {array} handArray array of card objects
 * @returns returns the number of aces in hand
 */
const aceCounter = function (handArray) {
  let noOfAce = 0;
  for (i = 0; i < handArray.length; i++) {
    if (handArray[i]["value"] == `x`) {
      noOfAce += 1;
    }
  }
  return noOfAce;
};

/**
 * creates an array of 52 card objects. Each card object has name, rank, suit, and value.
 * @returns an array of 52 card objects. Each card object has name, rank, suit, and value.
 */
const makeDeck = function () {
  // Initialise an empty deck array
  let cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  let suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  let suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    let currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    let rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      let cardName = rankCounter;
      let cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = `ace`;
      } else if (cardName == 11) {
        cardName = `jack`;
      } else if (cardName == 12) {
        cardName = `queen`;
      } else if (cardName == 13) {
        cardName = `king`;
      }
      // If rank is 1, set cardValue to `x`.
      // 11, 12, or 13, set cardValue to 10.
      if (rankCounter == 1) {
        cardValue = `x`;
      } else if (rankCounter == 11) {
        cardValue = 10;
      } else if (rankCounter == 12) {
        cardValue = 10;
      } else if (rankCounter == 13) {
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
const shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  let currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    let randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Create Deck
let deck = makeDeck();
