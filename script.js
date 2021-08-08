let cardDeck = [];
let playerHand = [];
let dealerHand = [];
let gameMode = "generate deck";

// indicating whether player is in or out (bust)
let playerBust = false;

const main = (input) => {
  if (gameMode === "generate deck") {
    mainDeck();
    return "Deck is ready";
  }

  if (gameMode === "the deal") {
    //Player clicks Submit to deal 2 cards for player and dealer.
    playerHand = [cardDeck.pop(), cardDeck.pop()];
    dealerHand = [cardDeck.pop(), cardDeck.pop()];
    //The cards are analysed for game winning conditions, e.g. Blackjack.
    if (totalValue(playerHand) < 21 && totalValue(dealerHand) !== 21) {
      gameMode = "the play";
      return `Choose hit/stand.\<br\>\Current total value: ${totalValue(
        playerHand
      )} vs ${totalValue(dealerHand)}\<br\>\Player:\<br\>\ ${display(
        playerHand
      )}
      \<br\>\ Dealer:\<br\>\ ${display(dealerHand)}`;
    }
    if (totalValue(playerHand) === 21) {
      return `BlackJack! You won.\<br\>\Current total value: ${totalValue(
        playerHand
      )} vs ${totalValue(dealerHand)}\<br\>\Player:\<br\>\ ${display(
        playerHand
      )}
      \<br\>\ Dealer:\<br\>\ ${display(dealerHand)}`;
    }
    if (totalValue(dealerHand) === 21) {
      return `BlackJack! Dealer won.\<br\>\Current total value: ${totalValue(
        playerHand
      )} vs ${totalValue(dealerHand)}\<br\>\Player:\<br\>\ ${display(
        playerHand
      )}
      \<br\>\ Dealer:\<br\>\ ${display(dealerHand)}`;
    }
    if (totalValue(dealerHand) === 21 && totalValue(playerHand) === 21) {
      return `It's a draw.\<br\>\Current total value: ${totalValue(
        playerHand
      )} vs ${totalValue(dealerHand)}\<br\>\Player:\<br\>\ ${display(
        playerHand
      )}
      \<br\>\ Dealer:\<br\>\ ${display(dealerHand)}`;
    }
  }

  if (gameMode === "the play") {
    // as long as player is not bust (total value is <= 21), player can always chose hit or stand
    if (input === "hit") {
      let drawnCardPlayer = cardDeck.pop();
      playerHand.push(drawnCardPlayer);
      if (totalValue(playerHand) <= 21) {
        return `Choose hit/stand.\<br\>\ Current total value: ${totalValue(
          playerHand
        )} vs ${totalValue(dealerHand)}\<br\>\Player:\<br\>\ ${display(
          playerHand
        )}
      \<br\>\ Dealer:\<br\>\ ${display(dealerHand)}`;
      }
      return `Busted. You lose.\<br\>\ Current total value: ${totalValue(
        playerHand
      )} vs ${totalValue(dealerHand)}\<br\>\Player:\<br\>\ ${display(
        playerHand
      )}
      \<br\>\ Dealer:\<br\>\ ${display(dealerHand)}`;
    }

    if (input === "stand") {
      totalValue(dealerHand);
      //dealer will keep drawing cards as long as total value is less than 17
      while (totalValue(dealerHand) <= 17) {
        let drawnCardDealer = cardDeck.pop();
        console.log(drawnCardDealer);
        dealerHand.push(drawnCardDealer);
      }
      //evaluate winner, whoever is closest under 21 won. Dealer could be busted too.
      if (totalValue(dealerHand) <= 21) {
        if (totalValue(playerHand) > totalValue(dealerHand)) {
          return `You won. \<br\>\ Current total value: ${totalValue(
            playerHand
          )} vs ${totalValue(dealerHand)}\<br\>\Player:\<br\>\ ${display(
            playerHand
          )}
      \<br\>\ Dealer:\<br\>\ ${display(dealerHand)}`;
        }
        if (totalValue(playerHand) < totalValue(dealerHand)) {
          return `You lose. \<br\>\ Current total value: ${totalValue(
            playerHand
          )} vs ${totalValue(dealerHand)}\<br\>\Player:\<br\>\ ${display(
            playerHand
          )}
      \<br\>\ Dealer:\<br\>\ ${display(dealerHand)}`;
        }
        if (totalValue(playerHand) === totalValue(dealerHand)) {
          return `It's a draw\<br\>\ Current total value: ${totalValue(
            playerHand
          )} vs ${totalValue(dealerHand)}\<br\>\Player:\<br\>\ ${display(
            playerHand
          )}
      \<br\>\ Dealer:\<br\>\ ${display(dealerHand)}`;
        }
      }
      return `You won. Dealer is busted.\<br\>\Current total value: ${totalValue(
        playerHand
      )} vs ${totalValue(dealerHand)}\<br\>\Player:\<br\>\ ${display(
        playerHand
      )}
      \<br\>\ Dealer:\<br\>\ ${display(dealerHand)}`;
    }
  }
};

//Varying sum depending on which ace value is considered (1 or 11)
const totalValue = (anArray) => {
  //Naively sum up the cards in the deck. By default, we count each Ace as 11
  let tempValue = sumValue(anArray);
  //Count the number of aces in the hand
  let numOfAces = getAceOccurence(anArray, "ace");
  //Aces can count for 1, or 11. If it is possible to bring the value of the hand under 21 by making 11 -> 1 substitutions.
  while (numOfAces > 0) {
    if (tempValue > 21) {
      tempValue -= 10;
      numOfAces -= 1;
    }
    return tempValue;
  }
  return tempValue;
};

//Count the number of cardName in the hand.
const getAceOccurence = (anArray, ace) => {
  return anArray.filter((v) => v.name === ace).length;
};

//sum the initial cards value
const sumValue = (anArray) => {
  return anArray
    .map((item) => item.value)
    .reduce((acc, curVal) => acc + curVal);
};

const mainDeck = () => {
  //generate 3 decks of cards
  makeDeck();
  makeDeck();
  makeDeck();
  //shuffle the 3 decks
  shuffleCards(cardDeck);
  gameMode = "the deal";
  return cardDeck;
};

//prep display of playerCard
const display = (anArray) =>
  anArray.reduce(
    (acc, curVal) =>
      `${acc} Name: ${curVal.name}. Suit: ${curVal.suit}\<br\>\ `,
    ""
  );

// sorting function for playerHand
const sortCard = (anArray) =>
  anArray.sort((a, b) => {
    return b.rank - a.rank;
  });

//auto generate 52 cards deck
const makeDeck = () => {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["♥", "♦", "♣", "♠"];

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

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name, set cardValue to 10 (for jack, queen, king) or 11 (for ace)
      if (rankCounter == 1) {
        cardName = "ace";
        cardValue = 11;
      } else if (rankCounter == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (rankCounter == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (rankCounter == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      const card = {
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
const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max);
};

const shuffleCards = (anArray) => {
  // Loop over the card deck array once
  let currentIndex = 0;
  while (currentIndex < anArray.length) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(anArray.length);
    // Select the card that corresponds to randomIndex
    let randomCard = anArray[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = anArray[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    anArray[currentIndex] = randomCard;
    anArray[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return anArray;
};
