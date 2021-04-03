// player1sCards = [];

// var mode = 'start of game';

// var main = function (input) {
//   var firstCard = deck.pop();
//   var secondCard = deck.pop();
//   mode = 'cards drawn';
//   var score = firstCard.name + secondCard.name;

//   if (score < 21 && score > 17) {
//     var firstCard = deck.pop();
//     var secondCard = deck.pop();
//     mode = 'has 2 cards';
//     player1sCards.push(firstCard);
//     player1sCards.push(secondCard);

//     var myOutputValue = 'hello: your cards are ' + firstCard.name + ' of ' + firstCard.suit + ' and ' + secondCard.name + ' of ' + secondCard.suit + ' your total card score is ' + score + ' do you want to draw another card?';
//     console.log('a');
//     console.log(mode);
//     return myOutputValue;
//     // find the score, the sum of all the members in this array
//   }
//   if (input == 'no') {
//     mode = 'settled with his 2 cards';
//     console.log('z');
//     console.log(mode);
//     console.log(firstCard);
//     console.log(secondCard);
//     var firstCard = deck.pop();
//     var secondCard = deck.pop();
//     var score = firstCard.name + secondCard.name;
//     var message = 'you have chosen to settle with your 2 cards, your final score is ' + score;
//     console.log(score);
//     console.log('b');
//     mode = 'game finished';
//     return message;
//   }
//   if (input == 'yes') {
//     mode = 'taking a 3rd card';
//     var thirdCard = deck.pop();

//     player1sCards.push(thirdCard);
//     score = firstCard.name + secondCard.name + thirdCard.name;
//     console.log('c');

//     return message;
//   }
//   //   if (mode == 'taking a 3rd card ' && score > 21) {
//   //     var message = 'you have overshot, your score is ' + score + 'your cards are ' + P1Card.name + 'of' + P1Card.suit + ' ,' + SecondP1Card.name + 'of ' + SecondP1Card.suit + ' and' + thirdCard.name + 'of ' + thirdCard.suit;
//   //     mode = 'overshot with three cards';
//   //     player1sCards.push(thirdCard);
//   //     console.log('d');
//   //     return message;
//   //   }
//   //   if (mode == 'taking a 3rd card' && score < 21) {
//   //     message = 'your score is ' + score + ' would you like more cards?';
//   //     mode = 'already quite high on the score';
//   //     console.log('e');
//   //     return message;
//   //   }
//   //   if (mode == 'already quite high on the score' && input == 'yes') {
//   //     var fourthCard = deck.pop();
//   //     score = P1Card.name + SecondP1Card.name + thirdCard.name + fourthCard.name;
//   //     mode == '4 cards have been drawn!';
//   //     console.log('f');
//   //     return 'your final score is ' + score;
//   //   }
//   //   if (mode == 'already quite high on the score' && input == 'no') {
//   //     mode = 'settled with his 3 cards';
//   //     message = 'your score is ' + score + 'and your cards are ' + P1Card.name + 'of' + P1Card.suit + ' ,' + SecondP1Card.name + 'of ' + SecondP1Card.suit + ' and' + thirdCard.name + 'of ' + thirdCard.suit;
//   //     console.log('g');
//   //     return message;
//   //   }
//   //   if (mode == 'has 2 cards' && score < 17) {
//   //     message = 'you are under 17 so you will have to hit! you will receive a card your cards are ' + P1Card.name + ' of ' + P1Card.suit + ' and ' + SecondP1Card.name + ' of ' + SecondP1Card.suit;
//   //     mode = 'has 2 cards but under 17 gonna hit';
//   //     console.log('h');
//   //     return message;
//   //   }
//   //   if (mode == 'has 2 cards but under 17 gonna hit') {
//   //     mode = 'taking a 3rd card';
//   //     console.log('i');
//   //   }
//   // };

//   // hit or stand

//   // submits the choice, computer

//   // user's cards are analysed for winning or losing conditions

//   // computer decides to hit or stand automatically based on game rules.

// // game ends
// };

// var makeDeck = function () {
//   // Initialise an empty deck array
//   var cardDeck = [];
//   // Initialise an array of the 4 suits in our deck. We will loop over this array.
//   var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

//   // Loop over the suits array
//   var suitIndex = 0;
//   while (suitIndex < suits.length) {
//     // Store the current suit in a variable
//     var currentSuit = suits[suitIndex];

//     // Loop from 1 to 13 to create all cards for a given suit
//     // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
//     // This is an example of a loop without an array.
//     var rankCounter = 1;
//     while (rankCounter <= 13) {
//       // By default, the card name is the same as rankCounter
//       var cardName = rankCounter;

//       // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
//       if (cardName == 'ace') {
//         cardName = 1;
//       } else if (cardName == 11) {
//         cardName = 'jack';
//       } else if (cardName == 12) {
//         cardName = 'queen';
//       } else if (cardName == 13) {
//         cardName = 'king';
//       }
//       if (cardName == 'jack' || cardName == 'queen' || cardName == 'king') {
//         cardName = 10;
//       }

//       // Create a new card with the current name, suit, and rank
//       var card = {
//         name: cardName,
//         suit: currentSuit,
//         rank: rankCounter,
//       };

//       // Add the new card to the deck
//       cardDeck.push(card);

//       // Increment rankCounter to iterate over the next rank
//       rankCounter += 1;
//     }

//     // Increment the suit index to iterate over the next suit
//     suitIndex += 1;
//   }

//   // Return the completed card deck
//   return cardDeck;
// };
// // Get a random index ranging from 0 (inclusive) to max (exclusive).
// var getRandomIndex = function (max) {
//   return Math.floor(Math.random() * max);
// };

// // Shuffle the elements in the cardDeck array
// var shuffleCards = function (cardDeck) {
//   // Loop over the card deck array once
//   var currentIndex = 0;
//   while (currentIndex < cardDeck.length) {
//     // Select a random index in the deck
//     var randomIndex = getRandomIndex(cardDeck.length);
//     // Select the card that corresponds to randomIndex
//     var randomCard = cardDeck[randomIndex];
//     // Select the card that corresponds to currentIndex
//     var currentCard = cardDeck[currentIndex];
//     // Swap positions of randomCard and currentCard in the deck
//     cardDeck[currentIndex] = randomCard;
//     cardDeck[randomIndex] = currentCard;
//     // Increment currentIndex
//     currentIndex = currentIndex + 1;
//   }
//   // Return the shuffled deck
//   return cardDeck;
// };

// var deck = shuffleCards(makeDeck());

// function getArraySum(a) {
//   var total = 0;
//   for (var i in a) {

//       total += a[i];
//   }
//   return total;
// }

// var playerCards = [];
// var score = getArraySum(playerCards);

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
      if (cardName == 'ace') {
        cardName = 1;
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }
      // default value
      var cardRank = rankCounter;
      // if card names are face cards change the rank to 10
      if (cardName == 'jack' || cardName == 'queen' || cardName == 'king') {
        cardRank = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
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

var deck = shuffleCards(makeDeck());

var playerCards = [];
var computerCards = [];
var cards = [];
var message = '';
var resultMessage = '';
var playerScore = 0;
var computerScore = 0;
function getCardSum(cards) {
  var total = 0;
  var counter = 0;
  // loop to find the sum of an array
  // sum the rank of cards inside an array object
  while (counter < cards.length) {
    // add current card to current total
    console.log(total);
    total = cards[counter].rank + total;
    counter = counter + 1;
    console.log('h');
  }
  return total;
}
// after this we have to see the score of the cards
function scoresForEachCard() {
  var playerScore = getCardSum(playerCards);
  console.log('a');
  var computerScore = getCardSum(computerCards);
  console.log('b');
  message = 'player your score is ' + playerScore + ' your cards are ' + playerCards[0].name + ' of' + playerCards[0].suit + ' and ' + playerCards[1].name + ' of' + playerCards[1].suit + ' and computers score is ' + computerScore + ' ,player, would you like to hit or stand?';
  // this is the message that gets seen that shows your cards and score
  // presents you with the opportunity to hit or stand
  console.log(message);
  mode = 'deciding whether to hit or stand';
}
// purpose of these variables are to assign the data obtained from the while loop which is the score, to a variable.

// calling this function getCardSum and adding the names of the arrays in i

// so that we can find the sum of the cards the player and comouter have

function compareCardScores(playerScore, computerScore, message) {
  playerScore = getCardSum(playerCards);
  computerScore = getCardSum(computerCards);
  // here i am calling both score variables
  if (playerScore > computerScore) {
    message = 'player, your score is ' + playerScore + ' computers score is ' + computerScore + 'player wins!';
    // the new message that gets seen when player wins
    console.log('c');
  }

  if (computerScore > playerScore) {
    message = 'player, your score is ' + playerScore + ' computers score is ' + computerScore + ' computer wins!';
    console.log('d');
    // the message that gets seen when computer wins
  }
  return message;
}

function playerTakesOneCard() {
  // function to take one card, if the player wants to hit or stand accordingly
  var i = 0;
  while (i < 1) {
    playerCards.push(deck.pop());

    i += 1;
    console.log('e');
  }
}
function hitOrStand(input) {
  if (input == 'hit' && mode == 'deciding whether to hit or stand') {
    playerTakesOneCard();
    // one card is drawn
    mode = 'has hit';
    console.log(mode);
    playerScore = getCardSum(playerCards);
    mode = 'final score shown';
    console.log(mode);
    message = 'your score is ' + playerScore + ' would you like to hit again?';
    // message gets updated if I just hit and want to do it again
  }
  if (input == 'yes' && mode == 'final score shown') {
    playerTakesOneCard();
    playerScore = getCardSum(playerCards);
    message = ' now your score is ' + playerScore;
  }
  if (input == 'no' && mode == 'final score shown') {
    message = 'your final score is ' + playerScore;
  }
  if (input == 'stand' && mode == 'deciding whether to hit or stand') {
    mode = 'has stood';
    console.log(mode);
    playerScore = getCardSum(playerCards);
    mode = 'final score shown';
    console.log(mode);

    message = ' you have stood,your score is ' + playerScore;
    // practically the final score of someone who stands
  }
}
//   if (mode == 'final score shown' && input == 'ok') {
//     mode = 'result time';
//     console.log(mode);

//     compareCardScores(playerScore, computerScore, message);
//     console.log(message)
// }

// function compareCardScores(playerScore, computerScore, message) {
//   playerScore = getCardSum(playerCards);
//   computerScore = getCardSum(computerCards);
//   if (playerScore > computerScore) {
//     message = 'player, your score is ' + playerScore + ' computers score is ' + computerScore + 'player wins!';
//     console.log('c');
//   }

//   if (computerScore > playerScore) {
//     message = 'player, your score is ' + playerScore + ' computers score is ' + computerScore + ' computer wins!';
//     console.log('d');
//   }

// }

// we stored the card scores inside variables
// this is a conditional to compare the scores together.
var main = function (input) {
  if (input == '') {
    var i = 0;
    while (i <= 1) {
      playerCards.push(deck.pop());

      computerCards.push(deck.pop());
      i += 1;
      console.log('e');
      // assigns two cards for the player and for the computer
    }
  }

  getCardSum(cards);
  // finds sum of cards
  console.log('y');

  scoresForEachCard(playerCards, computerCards, message);
  // finds scores of each card

  hitOrStand(input);
  // function for the if conditionals wanting to hit or stand

  return message;
};
