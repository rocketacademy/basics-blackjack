// Array of players -- each element in this array is an object with the keys "name", "cards", "output", "decision", "seen", "score", "currentRoundWager", "result", and "totalPoints"
playersArray = [];
// Array of computer's cards
var computerCardsArray = [];
var computerResult = '';
var gameStatus = 'addPlayers';
var firstRound = 1;
var computerDecisionOutput = '';
var scoreboard = '';
var computerCards = '';
var computerScore = 0;
// Hard coded deck of cards
var deck = [
  {
    name: 'ace',
    suit: 'hearts',
    rank: 1,
    emoji: '🂱',
  },
  {
    name: '2',
    suit: 'hearts',
    rank: 2,
    emoji: '🂲',
  },
  {
    name: '3',
    suit: 'hearts',
    rank: 3,
    emoji: '🂳',
  },
  {
    name: '4',
    suit: 'hearts',
    rank: 4,
    emoji: '🂴',
  },
  {
    name: '5',
    suit: 'hearts',
    rank: 5,
    emoji: '🂵',
  },
  {
    name: '6',
    suit: 'hearts',
    rank: 6,
    emoji: '🂶',
  },
  {
    name: '7',
    suit: 'hearts',
    rank: 7,
    emoji: '🂷',
  },
  {
    name: '8',
    suit: 'hearts',
    rank: 8,
    emoji: '🂸',
  },
  {
    name: '9',
    suit: 'hearts',
    rank: 9,
    emoji: '🂹 ',
  },
  {
    name: '10',
    suit: 'hearts',
    rank: 10,
    emoji: '🂺',
  },
  {
    name: 'jack',
    suit: 'hearts',
    rank: 11,
    emoji: '🂻',
  },
  {
    name: 'queen',
    suit: 'hearts',
    rank: 12,
    emoji: '🂽',
  },
  {
    name: 'king',
    suit: 'hearts',
    rank: 13,
    emoji: '🂾',
  },
  {
    name: 'ace',
    suit: 'diamonds',
    rank: 1,
    emoji: '🃁',
  },
  {
    name: '2',
    suit: 'diamonds',
    rank: 2,
    emoji: '🃂',
  },
  {
    name: '3',
    suit: 'diamonds',
    rank: 3,
    emoji: '🃃',
  },
  {
    name: '4',
    suit: 'diamonds',
    rank: 4,
    emoji: '🃄',
  },
  {
    name: '5',
    suit: 'diamonds',
    rank: 5,
    emoji: '🃅',
  },
  {
    name: '6',
    suit: 'diamonds',
    rank: 6,
    emoji: '🃆',
  },
  {
    name: '7',
    suit: 'diamonds',
    rank: 7,
    emoji: '🃇',
  },
  {
    name: '8',
    suit: 'diamonds',
    rank: 8,
    emoji: '🃈',
  },
  {
    name: '9',
    suit: 'diamonds',
    rank: 9,
    emoji: '🃉',
  },
  {
    name: '10',
    suit: 'diamonds',
    rank: 10,
    emoji: '🃊',
  },
  {
    name: 'jack',
    suit: 'diamonds',
    rank: 11,
    emoji: '🃋',
  },
  {
    name: 'queen',
    suit: 'diamonds',
    rank: 12,
    emoji: '🃍',
  },
  {
    name: 'king',
    suit: 'diamonds',
    rank: 13,
    emoji: '🃎',
  },
  {
    name: 'ace',
    suit: 'clubs',
    rank: 1,
    emoji: '🃑',
  },
  {
    name: '2',
    suit: 'clubs',
    rank: 2,
    emoji: '🃒',
  },
  {
    name: '3',
    suit: 'clubs',
    rank: 3,
    emoji: '🃓',
  },
  {
    name: '4',
    suit: 'clubs',
    rank: 4,
    emoji: '🃔',
  },
  {
    name: '5',
    suit: 'clubs',
    rank: 5,
    emoji: '🃕',
  },
  {
    name: '6',
    suit: 'clubs',
    rank: 6,
    emoji: '🃖',
  },
  {
    name: '7',
    suit: 'clubs',
    rank: 7,
    emoji: '🃗',
  },
  {
    name: '8',
    suit: 'clubs',
    rank: 8,
    emoji: '🃘',
  },
  {
    name: '9',
    suit: 'clubs',
    rank: 9,
    emoji: '🃙',
  },
  {
    name: '10',
    suit: 'clubs',
    rank: 10,
    emoji: '🃚',
  },
  {
    name: 'jack',
    suit: 'clubs',
    rank: 11,
    emoji: '🃛',
  },
  {
    name: 'queen',
    suit: 'clubs',
    rank: 12,
    emoji: '🃝',
  },
  {
    name: 'king',
    suit: 'clubs',
    rank: 13,
    emoji: '🃞',
  },
  {
    name: 'ace',
    suit: 'spades',
    rank: 1,
    emoji: '🂡',
  },
  {
    name: '2',
    suit: 'spades',
    rank: 2,
    emoji: '🂢',
  },
  {
    name: '3',
    suit: 'spades',
    rank: 3,
    emoji: '🂣',
  },
  {
    name: '4',
    suit: 'spades',
    rank: 4,
    emoji: '🂤',
  },
  {
    name: '5',
    suit: 'spades',
    rank: 5,
    emoji: '🂥',
  },
  {
    name: '6',
    suit: 'spades',
    rank: 6,
    emoji: '🂦',
  },
  {
    name: '7',
    suit: 'spades',
    rank: 7,
    emoji: '🂧',
  },
  {
    name: '8',
    suit: 'spades',
    rank: 8,
    emoji: '🂨',
  },
  {
    name: '9',
    suit: 'spades',
    rank: 9,
    emoji: '🂩',
  },
  {
    name: '10',
    suit: 'spades',
    rank: 10,
    emoji: '🂪',
  },
  {
    name: 'jack',
    suit: 'spades',
    rank: 11,
    emoji: '🂫',
  },
  {
    name: 'queen',
    suit: 'spades',
    rank: 12,
    emoji: '🂭',
  },
  {
    name: 'king',
    suit: 'spades',
    rank: 13,
    emoji: '🂮',
  },
];

// Function to generate a deck of cards
// Add a value property to each card
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['♥', '♦', '♣', '♠'];

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
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = 'jack';
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = 'queen';
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = 'king';
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
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

// Create a deck of cards variable using the makeDeck function
var deckOfCards = makeDeck();

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

// Array of deck of shuffled cards
var shuffledDeck = shuffleCards(deckOfCards);

// Function for adding players
var addPlayers = function (playerName) {
  var listOfPlayers = '';
  if (playerName == 'end') {
    if (playersArray.length < 1) {
      return 'Please enter at least one player';
    } else {
      gameStatus = 'wager';
      for (i = 0; i < playersArray.length; i += 1) {
        listOfPlayers = listOfPlayers + playersArray[i].name + ', ';
      }
      listOfPlayers = listOfPlayers.slice(0, -2);
      return `The players are ${listOfPlayers}. <br><br>${playersArray[0].name}, please input how much you would like to wager for this round and click submit`;
    }
  }
  if (playerName.length < 1) {
    return 'Please input a valid name';
  } else {
    playersArray.push({
      name: playerName,
      cards: [],
      score: 0,
      totalPoints: 100,
      currentRoundWager: 0,
      decision: '',
      seen: false,
    });
    for (i = 0; i < playersArray.length; i += 1) {
      listOfPlayers = listOfPlayers + playersArray[i].name + ', ';
    }
    listOfPlayers = listOfPlayers.slice(0, -2);
    return `Welcome to the game ${playerName}. <br><br> The current players are ${listOfPlayers}. <br><br>Enter "end" and click submit to confirm the players.`;
  }
};

// Function to calculate score for the round
var calculateScore = function (playerCardsArray) {
  var playerScore = 0;
  var userNumberOfAces = 0;
  for (j = 0; j < playerCardsArray.length; j += 1) {
    playerScore = playerScore + playerCardsArray[j].value;
    if (playerCardsArray[j].name == 'ace') {
      userNumberOfAces = userNumberOfAces + 1;
    }
  }

  if (playerScore > 21) {
    for (k = 0; k < userNumberOfAces; k += 1) {
      if (playerScore <= 21) {
        break;
      }
      playerScore = playerScore - 10;
    }
  }
  return playerScore;
};

// Function to convert a player's cards to a string output (i.e. "ace, 2, 4")
var convertCardsArrayToString = function (cardsArray) {
  var output = '';
  for (j = 0; j < cardsArray.length; j += 1) {
    output = output + cardsArray[j].name + ', ';
  }
  output = output.slice(0, -2);
  return output;
};

var main = function (input) {
  // Add player names
  if (gameStatus == 'addPlayers') {
    return addPlayers(input);
  }
  // Players take turns to input wager before the start of each round
  if (gameStatus == 'wager') {
    scoreboard = '';
    for (i = 0; i < playersArray.length; i += 1) {
      if (playersArray[i].currentRoundWager != 0) {
        continue;
      }
      if (Number.isNaN(Number(input)) || Number(input) <= 0 || input == '') {
        return 'sorry please enter a valid number.';
      } else {
        playersArray[i].currentRoundWager = Number(input);
      }
      if (i + 1 == playersArray.length) {
        gameStatus = 'playing';
        return `${playersArray[i].name}, you have wagered ${input} points for this round.<br><br>All players have waged their bets. Click submit to deal the first two cards to all players.`;
      } else {
        return `${
          playersArray[i].name
        }, you have wagered ${input} points for this round.<br><br> ${
          playersArray[i + 1].name
        }, key in how many points you would like to wager and click submit.`;
      }
    }
  }

  if (gameStatus == 'playing') {
    if (firstRound) {
      // Press submit to deal the first two cards each to all players and computer
      for (i = 0; i < 2; i += 1) {
        for (j = 0; j < playersArray.length; j += 1) {
          var randomCard = shuffledDeck.pop();
          playersArray[j].cards.push(randomCard);
        }
        var randomCard = shuffledDeck.pop();
        computerCardsArray.push(randomCard);
      }

      // After first two cards are drawn cards are analysed to see if either user or computer hits 21
      // For two cards, the only possibility of a win is if one card is an ace and they other card has a value of 10
      // In the first round if dealer/computer gets blackjack, game ends. Players lose if they are under. Players draw if they also get blackjack.

      for (i = 0; i < 2; i += 1) {
        if (computerCardsArray[i].name == 'ace') {
          if (computerCardsArray[0].value + computerCardsArray[1].value == 21) {
            // User wins blackjack
            computerResult = 'The computer gets blackjack!';
            gameStatus = 'over';
          }
        }
      }
      // End of first round
      firstRound = 0;
      return `${playersArray[0].name}, click submit to view your cards. Then decide whether to "hit" or "stand".`;
    }
    // All players' cards are converted to a string output
    for (i = 0; i < playersArray.length; i += 1) {
      playersArray[i].output = convertCardsArrayToString(playersArray[i].cards);
    }

    if (!firstRound && gameStatus == 'playing') {
      // All players are cycled through to take turns to view only their own cards and decide whether to "hit" or "stand", using the text input and submit button
      // 1. Player sees his/her cards, types "hit" or "stand" then clicks submit
      // 3. If players hits, show them their cards with the newly drawn card, then the player clicks submit. If the player stands, skip this step
      // 4. Next player sees his/her cards

      for (i = 0; i < playersArray.length; i += 1) {
        if (playersArray[i].decision != '' && playersArray[i].seen == true) {
          continue;
        }
        playersArray[i].decision = input;
        if (playersArray[i].decision == 'hit') {
          var randomCard = shuffledDeck.pop();
          playersArray[i].cards.push(randomCard);
          playersArray[i].output = convertCardsArrayToString(
            playersArray[i].cards
          );
          playersArray[i].seen = true;
          if (i + 1 == playersArray.length) {
            return `${playersArray[i].name}, your cards are ${playersArray[i].output}.<br><br> All players are done drawing cards`;
          } else {
            return `${playersArray[i].name}, your cards are ${
              playersArray[i].output
            }.<br><br>${
              playersArray[i + 1].name
            }, click submit to view your cards.`;
          }
        }
        if (playersArray[i].decision == 'stand') {
          playersArray[i].seen = true;
          if (i + 1 == playersArray.length) {
            return `${playersArray[i].name}, your cards are ${playersArray[i].output}.<br><br> All players are done drawing cards. Click submit to see the dealer's move.`;
          } else {
            return `${playersArray[i].name}, your cards are ${
              playersArray[i].output
            }.<br><br>${
              playersArray[i + 1].name
            }, click submit to view your cards.`;
          }
        }
        return `${playersArray[i].name}, your cards are ${playersArray[i].output}. <br><br>Choose if you would like to "hit" or "stand".`;
      }

      // After all players are done picking up cards for that round. The computer then decides to hit or stand
      // Computer hits or stands automatically based on game rules (if computer's hands is below 17, the computer hits)
      computerScore = calculateScore(computerCardsArray);
      if (computerScore < 17) {
        computerDecision = 'hit';
        computerDecisionOutput = 'The computer has decided to hit.';
      } else {
        computerDecision = 'stand';
        computerDecisionOutput = 'The computer has decided to stand.';
      }

      if (computerDecision == 'hit') {
        var randomCard = shuffledDeck.pop();
        computerCardsArray.push(randomCard);
      }

      // Game status changes to over when all players and computer chooses to "stand" for that round
      var allPlayersStand = true;
      for (i = 0; i < playersArray.length; i += 1) {
        if (playersArray[i].decision == 'hit') {
          allPlayersStand = false;
        }
      }
      for (i = 0; i < playersArray.length; i += 1) {
        // Restart round variables
        playersArray[i].decision = '';
        playersArray[i].seen = false;
      }
      if (computerDecision == 'stand' && allPlayersStand) {
        gameStatus = 'over';
        return (
          computerDecisionOutput +
          `<br><br>All players have decided to stand. Click submit to view the results for this game`
        );
      }
      return (
        computerDecisionOutput +
        `<br><br>${playersArray[0].name}, click submit to see your cards again and decide whether to hit or stand for the next round.`
      );
    }
  }
  // User's and computer's cards are compared to determine win/lose/draw result
  // Once game is over, display the all players cards and computer's cards, their scores for that round, their points after the round and who won
  // Ace is counted as 11 first. If it causes a bust, minus total score by 10
  if (gameStatus == 'over') {
    computerScore = calculateScore(computerCardsArray);
    // computer's cards are converted to an output
    computerCards = convertCardsArrayToString(computerCardsArray);
    for (i = 0; i < playersArray.length; i += 1) {
      playersArray[i].output = convertCardsArrayToString(playersArray[i].cards);
      playersArray[i].score = calculateScore(playersArray[i].cards);
      console.log(playersArray[i].cards);
      console.log(playersArray[i].output);
      console.log(playersArray[i].score);
    }

    // Scanarios
    // Cycle through each player to compare each player with dealer/computer

    for (i = 0; i < playersArray.length; i += 1) {
      // Computer and user goes below 21
      if (playersArray[i].score < 21 && computerScore < 21) {
        if (playersArray[i].score > computerScore) {
          playersArray[i].result = 'You win';
          playersArray[i].totalPoints =
            playersArray[i].totalPoints + playersArray[i].currentRoundWager;
        }
        if (computerScore > playersArray[i].score) {
          playersArray[i].result = 'Computer wins';
          playersArray[i].totalPoints =
            playersArray[i].totalPoints - playersArray[i].currentRoundWager;
        }
        if (computerScore == playersArray[i].score) {
          playersArray[i].result = 'It is a draw';
        }
      }
      // User gets blackjack and computer does not
      if (playersArray[i].score == 21 && computerScore != 21) {
        playersArray[i].result = 'You get blackjack.<br>You win';
        playersArray[i].totalPoints =
          playersArray[i].totalPoints + playersArray[i].currentRoundWager;
      }
      // Computer gets blackjack and user does not
      if (computerScore == 21 && playersArray[i].score != 21) {
        playersArray[i].result = 'Computer gets blackjack.<br>Computer wins';
        playersArray[i].totalPoints =
          playersArray[i].totalPoints - playersArray[i].currentRoundWager;
      }
      // Both user and computer gets blackjack
      if (computerScore == 21 && playersArray[i].score == 21) {
        playersArray[i].result = 'You get blackjack.<br>It is a draw';
      }
      // User goes over and computer does not
      if (playersArray[i].score > 21 && computerScore <= 21) {
        playersArray[i].result = 'You have gone over.<br>Computer wins';
        playersArray[i].totalPoints =
          playersArray[i].totalPoints - playersArray[i].currentRoundWager;
      }
      // Computer goes over and user does not
      if (computerScore > 21 && playersArray[i].score <= 21) {
        playersArray[i].result = 'You win';
        playersArray[i].totalPoints =
          playersArray[i].totalPoints + playersArray[i].currentRoundWager;
      }
      // Both user and computer goes over
      if (playersArray[i].score > 21 && computerScore > 21) {
        playersArray[i].result = 'You have gone over.<br>It is a draw';
      }
    }
    // Create the scoreboard and return the scoreboard
    scoreboard = `Dealer's cards: ${computerCards}<br>Dealer's score: ${computerScore}<br><br>`;
    for (i = 0; i < playersArray.length; i += 1) {
      console.log(playersArray[i].score);
      console.log(playersArray[i].result);
      scoreboard =
        scoreboard +
        `${playersArray[i].name}'s cards: ${playersArray[i].output}<br>${playersArray[i].name}'s score: ${playersArray[i].score}<br>${playersArray[i].result}<br>${playersArray[i].name}'s total points: ${playersArray[i].totalPoints}<br><br>`;
    }

    //Restart game variables
    for (i = 0; i < playersArray.length; i += 1) {
      playersArray[i].score = 0;
      playersArray[i].currentRoundWager = 0;
      playersArray[i].cards = [];
      playersArray[i].decision = '';
      playersArray[i].seen = false;
    }
    computerCardsArray = [];
    computerResult = '';
    gameStatus = 'wager';
    firstRound = 1;
    computerDecisionOutput = '';
    return (
      scoreboard +
      `<br><br>${playersArray[0].name}, key in your wager for the next round and click submit`
    );
  }
};
