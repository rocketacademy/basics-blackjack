// makeDeckFunction
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = [' ♤', ' ♡', ' ◇', ' ♧'];

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
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
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

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

// Variables for storing data
var playerName = '';

var playerHand = [];
var dealerHand = [];
var blackJackLimit = 21;
var dealerHitTill = 16;
var playerCredit = 100;
var newPlayerCredit = Number();
var playerBet = Number();
// tracking end of turn for player
var playerHasChosenToStand = false;
// Tracking game scenario
var gameMode = 'inputName';
var gameOver = false;

var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};

// loop each card total to get the value of hand
var getValueOfHand = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currCard = hand[i];
    // If card rank is 2-10, value is same as rank
    if (currCard.rank >= 2 && currCard.rank <= 10) {
      sum += currCard.rank;
      // If card rank is 11-13, i.e. Jack, Queen, or King, value is 10
    } else if (currCard.rank >= 11 && currCard.rank <= 13) {
      sum += 10;
      // If card is Ace, value is 11 by default
    } else if (currCard.rank == 1) {
      numAcesInHand += 1;
      sum += 11;
    }
  }
  // If sum is greater than sum limit and hand contains Aces, convert Aces to value of 1,
  // until sum is less than or equal to sum limit or there are no more Aces.
  if (sum > blackJackLimit && numAcesInHand > 0) {
    for (let i = 0; i < numAcesInHand; i += 1) {
      sum -= 10;
      // If the sum is less than BlackJackLimit before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (sum <= blackJackLimit) {
        break;
      }
    }
  }
  return sum;
};

// Variable for Blackjack Combination to be used to determining Blackjack
var isBlackjack = function (hand) {
  return hand.length == 2 && getValueOfHand(hand) == blackJackLimit;
};

// cpmver the card hand ( array of cards in hand)
var convertCardToText = function (handArray) {
  var cardValues = '';

  for (let i = 0; i < handArray.length; i += 1) {
    cardValues += handArray[i].name + handArray[i].suit + ', ';
  }
  return cardValues;
};

var mainBlackJackMessage = function () {
  console.log(convertCardToText(playerHand) + 'PlayerHand');
  console.log(convertCardToText(dealerHand) + 'DealerHand');
  return `${playerName} has in their hand <strong>${convertCardToText(playerHand)} </strong> with a total score of <strong>${getValueOfHand(playerHand)}</strong>. <br>
    Computer has in their hand  <strong>${convertCardToText(dealerHand)}</strong> with a total score of <strong>${getValueOfHand(dealerHand)}</strong>.<br>`;
};

var main = function (input) {
  // Input name for the player
  if (gameMode == 'inputName') {
    playerName = (input);
    gameMode = 'placeBets';
    return `Welcome <strong>${playerName}</strong>, press submit to start <strong>Blackjack ♤♡♧◇!</strong> You currently have <strong>${playerCredit}</strong> Bitcoins, please type in how many bitcoins you want to bet!`;
  }
  // Place Bets
  if (gameMode == 'placeBets') {
    playerBet = input;
    if (isNaN(input)) {
      return 'Please enter a valid number bet. :(';
    }
    newPlayerCredit = Number(playerCredit - playerBet);
    if (newPlayerCredit < 0) {
      return `This is not a valid bet, you do not have enough coins to bet <strong>${input} Bitcoins </strong>. Please enter a valid bet. You currently have <strong>${playerCredit} Bitcoins </strong> in your wallet.<br>
    If you have run out of coins, please restart the game by refreshing.`;
    }
    gameMode = 'gameStart';
    console.log('playercredit' + playerCredit);
    console.log('newplayercredit' + newPlayerCredit);
    console.log('playerbet' + playerBet);
    return `You have bet <strong>${playerBet}</strong> Bitcoins, your new balance is <strong>${newPlayerCredit}</strong> Bitcoins. Click submit to start the game!`;
  }

  // Start initial Game
  if (gameMode == 'gameStart') {
    playerHand = [];
    dealerHand = [];
    // Submit to deal the first hand to player and computer
    dealCardToHand(playerHand);
    dealCardToHand(dealerHand);

    // Dealing second hand to player and computer
    dealCardToHand(playerHand);

    // If player has blackjack and computer does not, player wins.
    if (isBlackjack(playerHand) && gameMode == 'nextMode') {
      gameOver = true;
      gameMode = 'placeBets';
      playerCredit = newPlayerCredit + playerBet * 2.5;
      // Player wins, return
      return `${mainBlackJackMessage()} <br>
        Blackjack! You win! You now have <strong>${playerCredit}</strong> Bitcoins.  Please submit how many bitcoins you want to bet for the next game.`;
    }
    gameMode = 'nextMode';
    // The cards are displayed to the user.
    return `${mainBlackJackMessage()} <br>
      Please enter <strong>"hit" or "stand" </strong>, then press Submit`;
  }

  // Player has to decide to hit or stand
  if (gameMode == 'nextMode') {
    // If user inputs something else, tell user they can only input hit or stand
    if (input !== 'hit' && input !== 'stand') {
      return ` ${playerName} has in their hand <strong>${convertCardToText(playerHand)} </strong> with a total score of <strong>${getValueOfHand(playerHand)}</strong>. <br>
    Dealer has in their hand <strong>${convertCardToText(dealerHand)}</strong> with a total score of <strong>${getValueOfHand(dealerHand)}</strong>. <br> <strong>Please input either "hit" or "stand" as possible moves in Blackjack.</strong>`;
    }

    if (input == 'hit') {
      dealCardToHand(playerHand);
      // if player busts during hit, player loses
      if (getValueOfHand(playerHand) > blackJackLimit) {
        gameOver = true;
        gameMode = 'placeBets';
        playerCredit = newPlayerCredit;
        console.log('endplayercredit' + playerCredit);
        console.log('endnewplayercredit' + newPlayerCredit);
        return `${mainBlackJackMessage()} <br>
          You have busted! You lose <strong>${playerBet}</strong> Bitcoins!. Your new balance is <strong>${playerCredit}</strong> Bitcoins. Please submit how many bitcoins you want to bet for the next game.`;
      }
    }
    // New mode to dealerTurn if player has chosen to stand.
    if (input == 'stand') {
      playerHasChosenToStand = true;
      gameMode = 'dealerTurn';
    }
  }

  // Computer must have number greater than dealerHitsTill
  // Computer hits till sum in hand is greater than dealerHitsTill

  var dealerHandSum = getValueOfHand(dealerHand);
  if (dealerHandSum <= dealerHitTill && gameMode == 'dealerTurn') {
    dealCardToHand(dealerHand);
    // Sum computer's hand
    dealerHandSum = getValueOfHand(dealerHand);
    return ` ${playerName} has in their hand <strong>${convertCardToText(playerHand)} </strong> with a total score of <strong>${getValueOfHand(playerHand)}</strong>. <br>
    Computer has in their hand <strong>${convertCardToText(dealerHand)}</strong> with a total score of <strong>${getValueOfHand(dealerHand)}</strong>. <br> <strong> Click Submit to continue the game. `;
    // If computer busts, it loses
  }

  gameMode = 'dealerTurn';
  // Check first if Blackjack
  // Computer wins if Blackjack is true for computer.
  if (isBlackjack(dealerHand) && gameMode == 'dealerTurn') {
    gameOver = true;
    playerCredit = newPlayerCredit;
    gameMode = 'placeBets';

    // Computer wins, return
    return `${mainBlackJackMessage()} <br>
        Blackjack! Dealer wins! You lose <strong> ${playerBet}</strong> Bitcoins. Please submit how many bitcoins you want to bet for the next game.`;
  }

  if (dealerHandSum > blackJackLimit) {
    gameOver = true;
    playerCredit = newPlayerCredit + playerBet * 2;
    console.log('endplayercredit' + playerCredit);
    console.log('endnewplayercredit' + newPlayerCredit);
    gameMode = 'placeBets';
    return `${mainBlackJackMessage()} <br>
      Dealer has busted! You win! Your new balance is <strong>${playerCredit}</strong> Bitcoins. Please submit how many bitcoins you want to bet for the next game.`;
  }
  // If player and computer have both not busted and chosen to stand, decide who wins
  if (playerHasChosenToStand && dealerHandSum > dealerHitTill) {
    // The game is always over after this point
    gameOver = true;
    gameMode = 'placeBets';
    // If player hand is greater than computer hand, player wins!
    if (getValueOfHand(playerHand) > getValueOfHand(dealerHand)) {
      console.log(getValueOfHand(playerHand));
      console.log(getValueOfHand(dealerHand));
      playerCredit = newPlayerCredit + playerBet * 2;
      console.log('endplayercredit' + playerCredit);
      console.log('endnewplayercredit' + newPlayerCredit);
      return `${mainBlackJackMessage()} <br>
        You win! You have more points than the dealer. Your new balance is <strong>${playerCredit}</strong> Bitcoins.  Please submit how many bitcoins you want to bet for the next game.`;
    }
    if (getValueOfHand(playerHand) === getValueOfHand(dealerHand)) {
      console.log(getValueOfHand(playerHand));
      console.log(getValueOfHand(dealerHand));
      playerCredit = Number(newPlayerCredit) + Number(playerBet);
      console.log('endplayercredit' + playerCredit);
      console.log('endnewplayercredit' + newPlayerCredit);
      return `${mainBlackJackMessage()} <br>
    Its a draw! Dealer has same points as you. Your balance remains at <strong>${playerCredit}</strong> Bitcoins. Please submit how many bitcoins you want to bet for the next game. `;
    }
    // If computer hand is greater than player hand, computer wins!
    if (getValueOfHand(playerHand) < getValueOfHand(dealerHand)) {
      console.log(getValueOfHand(playerHand));
      console.log(getValueOfHand(dealerHand));
      playerCredit = newPlayerCredit;
      console.log('endplayercredit' + playerCredit);

      return `${mainBlackJackMessage()} <br>
      You lose! Dealer has more points than you. You have lost <strong>${playerBet}</strong> Bitcoins. Your new balance is <strong>${playerCredit}</strong> Bitcoins. Please submit how many bitcoins you want to bet for the next game.`;
    }
  }

  // If game is not yet over, show current game status
  return `${mainBlackJackMessage()} <br>
    ${playerName}, please enter <strong>"hit" or "stand"</strong>. <br>
    Else, press Submit to see Computer's next move.`;
};
