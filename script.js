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

      // If rank is 1, 11, 12, or 13, set rank as 10
      if (rankCounter === 11 || rankCounter === 12 || rankCounter === 13) {
        card.rank = 10;
      }

      
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



// Initialise the card deck representation as an array of objects
var deck = makeDeck()
//[
  // card1,
  // card2,
  // ...
//];

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(deck);


var mode = 'draw2Cards'

var playerCard = {};
var playerCard2 = {};
var computerCard = {};
var computerCard2 = {};
// the sum of the ranks of the cards in the player's hand
var playerRank = 0
// the sum of the ranks of the cards in the computer's hand
var computerRank = 0

var main = function (input) {

  if (mode === 'draw2Cards') {
    // Draw 2 cards each from the top of the deck
    playerCard = shuffledDeck.pop();
    playerCard2 = shuffledDeck.pop();
    computerCard = shuffledDeck.pop();
    computerCard2 = shuffledDeck.pop();
  
    // Construct an output string to communicate which cards were drawn
    var myOutputValue =
      'Computer had ' +
      computerCard.name +
      ' of ' +
      computerCard.suit +
      ' and another card. <br/><br/>' +
      'Player had ' +
      playerCard.name +
      ' of ' +
      playerCard.suit +
      ' and ' +
      playerCard2.name +
      ' of ' +
      playerCard2.suit +
      '. <br/><br/>';

    // Tabulate player's and comupter's card rank in total.
    playerRank = Number(playerCard.rank) + Number(playerCard2.rank)
    computerRank = Number(computerCard.rank) + Number(computerCard2.rank)
    
    console.log('computer rank: ' + (Number(computerCard.rank) + Number(computerCard2.rank)))
    console.log('player rank: ' + (Number(playerCard.rank) + Number(playerCard2.rank)))
    
    mode = 'hitOrStand'
    myOutputValue += 
    'Player, enter "hit" if you want another card from the deck, and "stand" if you do not want any more cards.'
  
  } else if (mode === 'hitOrStand') {
    // if input is hit, reveal the card drawn and their total score.
    if (input == 'hit') {
      var newPlayerCard = {}
      newPlayerCard = shuffledDeck.pop()
      playerRank += Number(newPlayerCard.rank)
      console.log('player rank: ' + playerRank)
      var myOutputValue =
      'Player has drawn ' + newPlayerCard.name + ' of ' + newPlayerCard.suit + '. <br/><br/> Your score is now ' + playerRank + '! <br/><br/>'
      
      // If player goes bust, proceed to next round
      if (playerRank > 21) {
        myOutputValue += 'Player goes bust. Computer wins.';
        mode = 'draw2Cards';
      } else {
        // Proceed to ask player to hit or stand
        myOutputValue += 'Player, enter "hit" if you want another card from the deck, and "stand" if you do not want any more cards.'
      }
    } else if (input == 'stand') {
      mode = 'compareWithComputer'
      var myOutputValue = 'Player has chosen to stand. Press submit again to compare your score with the computer score.'
    } else {
      var myOutputValue = 'You have entered an invalid input. Please enter "hit" if you want another card from the deck, and "stand" if you do not want any more cards.'
    }
  }


  // Compare computer and player cards by rank attribute
  // If computer card rank is greater than player card rank, computer wins
 
  else if (mode === 'compareWithComputer') {
    var myOutputValue =
      'Computer had ' +
      computerCard.name +
      ' of ' +
      computerCard.suit +
      ' and ' +
      computerCard2.name +
      ' of ' +
      computerCard2.suit + 
      '. <br/><br/>'
    
    while (computerRank < 16) {
      var newComputerCard = {}
      newComputerCard = shuffledDeck.pop()
      computerRank += Number(newComputerCard.rank)
      myOutputValue += 'Computer has chosen to hit. Computer draws ' + newComputerCard.name + ' of ' + newComputerCard.suit + '.<br/><br/>';
    }
    

    if (playerRank > 21) {
      myOutputValue += 'Computer wins.';
    } else if (computerRank > 21) {
      myOutputValue += 'Player wins!';
    } else if (computerRank > playerRank) {
      // Add conditional-dependent text to the output string
     myOutputValue += 'Computer wins.';
      // Else if computer card rank is less than player card rank, player wins
    } else if (computerRank < playerRank) {
      myOutputValue += 'Player wins!';
      // Otherwise (i.e. ranks are equal), it's a tie
    } else {
      myOutputValue += "It's a tie.";
    }
    
    myOutputValue += '<br/><br/> Press Submit to play the next round.'
    mode = 'draw2Cards'

  }
  // Return the fully-constructed output string
  return myOutputValue;
};

