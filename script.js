var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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

// Get sum of cards in hand
var getHandSum = function (hand) {
  console.log(`hand in getHandSum is `)
  console.log(hand)
  var numAcesInHand = 0;
  var sumLimit= 21;
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
    } else if (currCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    }
  }
  // If sum is greater than sum limit and hand contains Aces, convert Aces from value of 11
  // to value of 1, until sum is less than or equal to sum limit or there are no more Aces.
  if (sum > sumLimit && numAcesInHand > 0) {
    for (let i = 0; i < numAcesInHand; i += 1) {
      sum -= 10;
      // If the sum is less than sumLimit before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (sum <= sumLimit) {
        break;
      }
    }
  }
  console.log(sum)
  return sum;
};

// initalise global array to store the cards

var playerCards = [];
var computerCards = [];
var gameMode = `draw card`;
var playerScore = 0;
var computerScore = 0;
var winMessage= ``
var playerPoints = 100;

var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

var main = function (input) {

  if (gameMode === `draw card`) {
    for (i = 0; i < 2; i++) {
      playerCards.push(shuffledDeck.pop());
      computerCards.push(shuffledDeck.pop());
    } 
    //summarise score and assign to global variable
    playerScore = getHandSum(playerCards);
    computerScore = getHandSum(computerCards);
  
    while (computerScore < 17) {
      currComputerCard = shuffledDeck.pop();
      computerCards.push(currComputerCard)
      computerScore = getHandSum(computerCards)
    }

    gameMode = `hit or stand`;
  }

  winMessage= `You drawed ${playerCards[0].name} of ${playerCards[0].suit}<br>
  and ${playerCards[1].name} of ${playerCards[1].suit}.<br><br>
  Your score is: ${playerScore}.<br><br>
  Enter hit or stand.`

  if (gameMode == `hit or stand`) {

  // if computer or player hits blackjack end game
    if ((computerScore == 21 && playerScore <21) || playerScore >21){
    winMessage = `You Lost!<br><br>
    Computer got ${computerScore}<br><br>
    Your hand is  ${playerScore}.<br><br>
    Refresh page to Play Again.`
    };
    
    if ((playerScore == 21 && computerScore < 21) || computerScore > 21){
        gameMode = `game start`
        winMessage = `You Win!<br><br>
        Computer got ${computerScore}<br><br>
        You got ${playerScore}.<br><br>
        Refresh page to Play Again.`}

    if (input == `hit`){
      playerCards.push(shuffledDeck.pop());
      playerScore = getHandSum(playerCards);
      console.log(playerCards)
      var drawnCard = `Your hand consist of `
      for (j=0; j<playerCards.length; j++){
        drawnCard += `${playerCards[j].name} of ${playerCards[j].suit}, `
      }
      winMessage = `${drawnCard}<br><br>
      Your score is ${playerScore}.<br><br>
      Computer score is ${computerScore}.<br><br>
      Enter hit or stand.`

      if (playerScore>21){
        winMessage = `You lose! ${drawnCard}<br><br>
        Your score is ${playerScore}.<br><br>
        Computer score is ${computerScore}.<br><br>`
      }
    } 

    if (input == `stand`) {
      if ((playerScore > computerScore) && playerScore <21) {
      winMessage = `You Win!<br><br>
      Computer got ${computerScore}.<br><br>
      You got ${playerScore}.<br><br>
      Refresh page to Play Again.`} 

      if (playerScore < computerScore){
      winMessage =`You Lose!<br><br>
      Computer got ${computerScore}.<br><br>
      You got ${playerScore}.<br><br>
      Refresh page to Play Again.`}

      if (playerScore == computerScore) {
      winMessage =`Draw!<br><br>
      Computer got ${computerScore}.<br><br>
      You got ${playerScore}.<br><br>
      Refresh page to Play Again.`
    }
  }
}
return winMessage
};