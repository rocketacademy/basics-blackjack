// The goal of blackjack is to beat the dealer's hand without going over 21.
//Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.
//Each player starts with two cards.
//To 'Hit' is to ask for another card.
//To 'Stand' is to hold your total and end your turn.
//If you go over 21 you bust, and the dealer wins regardless of the dealer's hand.
//If you are dealt 21 from the start (Ace & 10), you got a blackjack.
//Dealer will hit until his/her cards total 17 or higher.

//GLOBAL VARIABLES //
//ARRAY
var playerHand = [];
var dealerHand = [];
var gameDeck = [];

//game modes
var gameStart = "game start";
var currentMode = gameStart;
var cardsOnHands = "cards are distributed to player and dealer";
var resultMode = "results are out";
var hitOrStand = "hit or stand";

// MAKE DECK FUNCTION
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

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

// GENERATE RANDOM NUMBER TO SHUFFLE DECK
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cards) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cards.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled decks
  return cards;
};

//(FIRST SUBMIT) TO CREATE AND SHUFFLE A DECK
var makeNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

// FUNCTION TO CALCULATE THE TOTAL SUM OF CARDS ON HANDS
// J,Q,J are counted as 10
// ace can be counted as 1 or 11
// ace counter to keep track of the number of aces

var calHandSum = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;
  // loop while player/dealer hand and sum up the rank of cards
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
      // the value of ace as 11 by defalut
    } else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }

  //ACE COUNTER
  index = 0;
  // loop for the number of aces found and only minus 10 from total hand value when total hand value is more than 21.
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue -= 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};

// FUNCTION TO CHECK BLACKJACK //
var blackJack = function (handArray) {
  // if one of card is ace and another is rank of 10, it is blackjack = true, otherwise it is false
  var playerCard1 = handArray[0];
  var playerCard2 = handArray[1];
  var isBlackJack = false;

  if (
    (playerCard1.name == "ace" && playerCard2.rank >= 10) ||
    (playerCard2.name == "ace" && playerCard1.rank >= 10)
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
};

// FUNCTION TO SHOW THE PLAYER/DEALER HAND
var playerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = `Player hand : <br>`;
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage = `${playerMessage} ${playerHandArray[index].name} of ${playerHandArray[index].suit} <br>`;
    index = index + 1;
  }

  index = 0;
  var dealerMessage = `Dealer hand: <br>`;
  while (index < dealerHandArray.length) {
    dealerMessage = `${dealerMessage} ${dealerHandArray[index].name} of ${dealerHandArray[index].suit} <br>`;
    index = index + 1;
  }

  return `${playerMessage} <br> ${dealerMessage}`;
};

// FUNCTION TO SHOW THE TOTAL HAND VALUE OF PLAYER AND DEALER
var totalHandValues = function (playerHandValue, delaerHandValue) {
  var totalHandValueOutput = `Player total hand value : ${playerHandValue} <br> Dealer total hand value : ${delaerHandValue}`;
  return totalHandValueOutput;
};

// MAIN FUNCTION//
//var gameEnd = false;
var main = function (input) {
  //if  (gameEnd) {return "the game is over, please refresh to play again";}
  var myOutputValue = "";

  //when the user make first submit, it should make a deck of cards
  if (currentMode == gameStart) {
    gameDeck = makeNewDeck();
    // player and dealer get 2 cards each
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    //console.log for each cards
    console.log("player hand ", playerHand);
    console.log("dealer hand ", dealerHand);

    // once cards are distrubuted, game mode should change to cardsonhands
    currentMode = cardsOnHands;

    myOutputValue = `Now you and dealer have 2 cards, please click "Submit" to see your cards`;

    return myOutputValue;
  }

  // when user click submit, the total value of two cards should be revealed

  if (currentMode == cardsOnHands) {
    // First to check whether either player or dealer hit blackjack
    var playerBJ = blackJack(playerHand);
    var dealerBJ = blackJack(dealerHand);

    console.log("player BJ? : ", playerBJ);
    console.log("dealer BJ? : ", dealerBJ);

    // BJ function works when eithr player OR dealer has blackjack
    // then there are 3 scenario
    // 1) when both player AND dealer have black jack, IT IS A TIE !
    // when either player OR dealer has black jack,
    // 2) if player has blackjack AND delaer doesn't, PLAYER WIN !
    // 3) if dealer has blackjack AND player doesnt, DEALER WIN !

    if (playerBJ == true || dealerBJ == true) {
      // 3 scenario
      if (playerBJ == true && dealerBJ == true) {
        myOutputValue = `${playerAndDealerHands(
          playerHand,
          dealerHand
        )} <br> it is a tie ! we start again`;
      } else if (playerBJ == true && dealerBJ == false) {
        myOutputValue = `${playerAndDealerHands(
          playerHand,
          dealerHand
        )} <br>   Congratulation ! Player wins by Black Jack! <br>
        Please click 'Refresh 🔄' to play again !`;
        // currentMode = gameStart;
      } else {
        myOutputValue = `${playerAndDealerHands(
          playerHand,
          dealerHand
        )} <br> Dealer wins by Black Jack!<br>
        Please click 'Refresh 🔄' to play again! `;
        //currentMode = gameStart;
      }
      console.log(myOutputValue);
    } else {
      myOutputValue = `${playerAndDealerHands(
        playerHand,
        dealerHand
      )} <br> Please input "hit" or "stand" for next move`;
      currentMode = hitOrStand;
    }
    return myOutputValue;
  }

  // When player input either 'HIT' or 'STAND'
  if (currentMode == hitOrStand) {
    // when player submit 1) hit, another card is drawn, and make another decision to submit hit or stand.  2) else if stand, then should calculate hands
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      myOutputValue = `${playerAndDealerHands(
        playerHand,
        dealerHand
      )} <br> player total : ${calHandSum(
        playerHand
      )}. <br> dealer total : ${calHandSum(
        dealerHand
      )} <br> You drew another card. <br><br> Please input "hit" or "stand". `;

      //if (playerHand > 21) {
      //gameEnd = true;
      //return `Player has busted and lost. Please refresh to play again`;}
    } else if (input == "stand") {
      var playerHandTotal = calHandSum(playerHand);
      var dealerHandTotal = calHandSum(dealerHand);

      // Dealer hits as long the total tank is less than 16
      while (dealerHandTotal < 16) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotal = calHandSum(dealerHand);
      }

      // condition for player win
      // 1.  by drawing a hand value of 21 on plauer's first two cards, when the dealer does not (BLACKJACK) (done above)
      // 2. by drawing a hand value that is higher than the dealer's hand value while player's hand value is less than or equal to 21
      // 3. by the dealer drawing a hand value that goes over 21

      if (
        (playerHandTotal > dealerHandTotal && playerHandTotal <= 21) ||
        (playerHandTotal <= 21 && dealerHandTotal > 21)
      ) {
        myOutputValue = `${playerAndDealerHands(
          playerHand,
          dealerHand
        )} <br> Player WINS! <br> ${totalHandValues(
          playerHandTotal,
          dealerHandTotal
        )} <br><br> Please click "Refresh 🔄 " to start again.`;

        // condition for tied gmae
      } else if (
        playerHandTotal == dealerHandTotal ||
        (playerHandTotal > 21 && dealerHandTotal > 21)
      ) {
        myOutputValue = `${playerAndDealerHands(
          playerHand,
          dealerHand
        )} <br> It is a TIE ! <br> ${totalHandValues(
          playerHandTotal,
          dealerHandTotal
        )} <br><br> Please click "Refresh 🔄 " to start again. `;
      } else if (calHandSum(playerHand) > 21) {
        myOutputValue = `${playerAndDealerHands(
          playerHand,
          dealerHand
        )} <br> player total : ${calHandSum(
          playerHand
        )}. <br> dealer total : ${calHandSum(
          dealerHand
        )} <br> You have busted and lose. 💸 <br><br> Please click "Refresh 🔄 " to start again. `;
      }

      // otherwise Player lose (Dealer wins ) when
      // 1. player's hand value exceeds 21
      // 2. the dealer hand has a greater value than players at the end of the round
      else {
        myOutputValue = `${playerAndDealerHands(
          playerHand,
          dealerHand
        )} <br> Dealer WINS! <br> ${totalHandValues(
          playerHandTotal,
          dealerHandTotal
        )} <br><br> Please click "Refresh 🔄 " to start again.  `;
      }
    } else {
      myOutputValue = `Sorry your ${input} is not valid. please input "hit" or "stand" <br> ${playerAndDealerHands(
        playerHand,
        dealerHand
      )}`;
    }

    return myOutputValue;
  }
};
