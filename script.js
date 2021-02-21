// initialize constants
var MAX_SCORE = 21;
var INITIAL_NUMBER_OF_CARDS_DRAWN = 2;
var GAME_STARTED = 'game started';
var SHOW_PLAYERS_INITIAL_HAND = 'show players initial hand';
var CHOOSE_HIT_OR_STAND = 'choose hit or stand';
var SHOW_HANDS = 'show hands';
var ACE_SCORES = [1, 11];
var JACK_QUEEN_KING_SCORES = 10;

// initialize string instruction constants
var HIT_OR_STAND_INSTRUCTIONS = 'Do you wish to hit or stand? To hit, type in <i>hit</i> in the input box above and click Submit. Otherwise, type in <i>stand</i> in the input box above and click Submit.';
var SHOW_HAND_INSTRUCTIONS = 'Click Submit and we will display the results of this round.';
var FORCED_STAND_INSTRUCTIONS = 'Your best possible score is now <strong>' + MAX_SCORE + ' or above</strong>, and you can\'t hit anymore. ' + SHOW_HAND_INSTRUCTIONS;
var BLACKJACK_FLAVOUR_TEXT = 'IT\'S A <strong>BLACKJACK</strong>!';

// initialize variables;
var gameMode = GAME_STARTED;
var deck = [];
var shuffledDeck = [];
var playerCards = [];
var computerCards = [];

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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var getInitialCards = function (cardDeck) {
  var hand = [];
  var counter = 0;
  while (counter < INITIAL_NUMBER_OF_CARDS_DRAWN) {
    var card = cardDeck.pop();
    hand.push(card);
    counter += 1;
  }

  return hand;
};

var addScores = function (scoresArr, card) {
  // store duplicated (shallow) copy of scores array
  var arr = [...scoresArr];
  var counter = 0;
  // ace
  if (card.name == 'ace') {
    // when it's an ace, the scoresArr's items will be duplicated using
    // .concat() before being passed into addScores. an example will
    // be [1, 2, 3, 1, 2, 3, 1, 2 ,3]. here, we know that it has been
    // duplicated twice (or 3 copies), because ace has 3 different scores.
    // we use the everyNthDigit variable to know which indexes a duplicate
    // starts or end (in the example's case, every 3rd index)
    var everyNthIndex = arr.length / ACE_SCORES.length;
    // to store different groups of "duplicates". using the above example,
    // we should get [[1, 2, 3], [1, 2, 3], [1, 2, 3]] at the end of the loop
    var groupedScoresArr = [];
    var aceScoreIndex = 0;

    while (counter < arr.length) {
      var scoresArrSlice = arr.slice(counter, counter + everyNthIndex);
      var arrIndex = 0;
      // add scores to each group of the array.
      while (arrIndex < scoresArrSlice.length) {
        scoresArrSlice[arrIndex] += ACE_SCORES[aceScoreIndex];
        arrIndex += 1;
      }
      groupedScoresArr.push(scoresArrSlice);
      aceScoreIndex += 1;
      counter += everyNthIndex;
    }
    arr = groupedScoresArr.flat();
  }
  // every other card
  else {
    while (counter < arr.length) {
      // jack, queen or king
      if (card.name == 'jack' || card.name == 'queen' || card.name == 'king') {
        arr[counter] += JACK_QUEEN_KING_SCORES;
      }
      else {
        arr[counter] += card.rank;
      }

      counter += 1;
    }
  }

  // filter out unique scores, or remove duplicates in the array
  var uniqueScoresArr = arr.filter((item, index) => (arr.indexOf(item) == index));

  return uniqueScoresArr;
};

// calculates the score of current hand
// stored as a pair, minScore in index 0 and maxScore in index 1
// minimum and maximum scores stored as feedback, because aces
// are counted as 1 or 11.
var getCurrentScores = function (cards) {
  var scores = [];
  var counter = 0;
  while (counter < cards.length) {
    // first run of array, and card is ace
    if (counter == 0 && cards[counter].name == 'ace') {
      var aceScoresCounter = 0;
      while (aceScoresCounter < ACE_SCORES.length) {
        scores.push(ACE_SCORES[aceScoresCounter]);
        aceScoresCounter += 1;
      }
    }
    // first run of array, and card is jack, queen or king
    else if (counter == 0 && (cards[counter].name == 'jack' || cards[counter].name == 'queen' || cards[counter].name == 'king')) {
      scores.push(JACK_QUEEN_KING_SCORES);
    }
    // first run of array, and any other card
    else if (counter == 0) {
      scores.push(cards[counter].rank);
    }
    // subsequent run of array
    else {
      // card is ace
      if (cards[counter].name == 'ace') {
        var duplicatingCounter = 0;
        var duplicatedScores = [...scores];
        // duplicate elements in array (x - 1) times, depending on size of array
        // if ace only has 2 scores: 1, 11. You duplicate the contents in the scores
        // array. Then you add 1 for the first half, and add 11 to the second half
        while (duplicatingCounter < ACE_SCORES.length - 1) {
          scores = scores.concat(duplicatedScores);
          duplicatingCounter += 1;
        }
      }

      scores = addScores(scores, cards[counter]);
    }
    counter += 1;
  }

  return scores;
};

// retrieves the best possible outcome of your score
var getBestScore = function (scores) {
  var scoresArr = [...scores];
  var scoresWithoutExceedArr = scoresArr.filter((score) => score <= MAX_SCORE);
  var bestScore = Math.max(...scoresWithoutExceedArr);
  if (scoresWithoutExceedArr.length < 1) {
    bestScore = Math.min(...scoresArr);
  }
  return bestScore;
};

// checks if a hand is a blackjack
var isBlackjack = function (cards) {
  // blackjack: max score from 2 cards will be 21
  if (cards.length == 2 && getCurrentScores(cards)[1] == MAX_SCORE) {
    return true;
  }

  return false;
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

// prints card name and suit
var showCard = function (card) {
  return card.name + ' of ' + card.suit;
};

// prints cards in hand of a player
var showCards = function (cards, playerType) {
  var output = 'Your cards are ';
  if (playerType == 'computer') {
    output = 'Computer\'s cards are ';
  }
  var counter = 0;
  while (counter < cards.length) {
    output = output + '<strong>' + showCard(cards[counter]) + '</strong>';
    counter += 1;
    if (counter != cards.length) {
      output = output + ', and ';
    }
  }
  output = output + '.';
  return output;
};

var showScores = function (cards, playerType) {
  if (isBlackjack(cards)) {
    return BLACKJACK_FLAVOUR_TEXT;
  }

  // not blackjack
  var output = 'Your current score is ';
  var currentScoresArr = [...getCurrentScores(cards)];
  var sortedCurrentScores = currentScoresArr.sort(
    (currentItem, nextItem) => currentItem - nextItem,
  );

  if (playerType == 'computer') {
    output = 'Computer\'s current score is ';
  }
  // no ace drawn / only a single item in scores
  if (sortedCurrentScores.length < 2) {
    output = output + '<strong>' + sortedCurrentScores[0] + '</strong>';
  }
  // at least 1 ace in the hand
  else {
    var printScoresCounter = 0;
    output = output + 'possibly ';

    while (printScoresCounter < sortedCurrentScores.length) {
      output = output + '<strong>' + sortedCurrentScores[printScoresCounter] + '</strong>';

      if (printScoresCounter < sortedCurrentScores.length - 2) {
        output = output + ', ';
      } else if (printScoresCounter == sortedCurrentScores.length - 2) {
        output = output + ', or ';
      }

      printScoresCounter += 1;
    }

    if (playerType == 'computer') {
      output = output + '. This is because Computer have drawn at least 1 <strong>ace</strong> card. Your best score will be <strong>' + getBestScore(sortedCurrentScores) + '</strong>';
    } else {
      output = output + '. This is because you have drawn at least 1 <strong>ace</strong> card. Your best score will be <strong>' + getBestScore(sortedCurrentScores) + '</strong>';
    }
  }

  output = output + '.';

  return output;
};

var resetDeckAndHands = function () {
  deck = makeDeck();
  shuffledDeck = shuffleCards(deck);
  playerCards = getInitialCards(shuffledDeck);
  computerCards = getInitialCards(shuffledDeck);
};

var main = function (input) {
  var sanitisedInput = input.trim().toLowerCase();
  var myOutputValue = '';

  if (gameMode == GAME_STARTED) {
    // reset deck and hands
    resetDeckAndHands();
    gameMode = SHOW_PLAYERS_INITIAL_HAND;
  }

  if (gameMode == SHOW_PLAYERS_INITIAL_HAND) {
    myOutputValue = showCards(playerCards, 'player') + '<br />' + showScores(playerCards, 'player') + '<br /><br />';

    // if it's a blackjack, show hand right away - no need for hit or stand
    if (isBlackjack(playerCards)) {
      myOutputValue = myOutputValue + SHOW_HAND_INSTRUCTIONS;
      gameMode = SHOW_HANDS;
    }
    // not a blackjack, offer option to hit or stand
    else {
      myOutputValue = myOutputValue + HIT_OR_STAND_INSTRUCTIONS;
      gameMode = CHOOSE_HIT_OR_STAND;
    }

    return myOutputValue;
  }

  if (gameMode == CHOOSE_HIT_OR_STAND) {
    // input validation
    if (sanitisedInput !== 'hit' && sanitisedInput !== 'stand') {
      myOutputValue = 'Please enter a valid input.<br /><br />' + showCards(playerCards, 'player') + '<br />' + showScores(playerCards, 'player') + '<br /><br />' + HIT_OR_STAND_INSTRUCTIONS;
      return myOutputValue;
    }

    if (sanitisedInput == 'hit') {
      var drawnCard = shuffledDeck.pop();
      playerCards.push(drawnCard);
      myOutputValue = 'You have decided to hit. You drew <strong>' + showCard(drawnCard) + '</strong>.<br /><br />' + showCards(playerCards, 'player') + '<br />' + showScores(playerCards, 'player') + '<br /><br />';

      if (Math.min(...getCurrentScores(playerCards)) >= MAX_SCORE) {
        myOutputValue = myOutputValue + FORCED_STAND_INSTRUCTIONS;
        gameMode = SHOW_HANDS;
      } else {
        myOutputValue = myOutputValue + HIT_OR_STAND_INSTRUCTIONS;
      }

      return myOutputValue;
    }

    myOutputValue = 'You have decided to stand. ' + showCards(playerCards, 'player') + '<br />' + showScores(playerCards, 'player') + '<br /><br />' + SHOW_HAND_INSTRUCTIONS;
    gameMode = SHOW_HANDS;
    return myOutputValue;
  }

  // show hands
  // computer will decide to draw if not blackjack
  if (!isBlackjack(computerCards)) {
    // continue drawing while its best possible score
    // is still less than 17
    while (
      getBestScore(getCurrentScores(computerCards)) < 17
    ) {
      var computerCard = shuffledDeck.pop();
      computerCards.push(computerCard);
    }
  }

  // retrieve current scores
  var computerScores = getCurrentScores(computerCards);
  var playerScores = getCurrentScores(playerCards);
  var playerBestScore = getBestScore(playerScores);
  var computerBestScore = getBestScore(computerScores);

  // show player cards
  myOutputValue = showCards(playerCards, 'player') + '<br />';

  // show player score
  if (isBlackjack(playerCards)) {
    myOutputValue = myOutputValue + BLACKJACK_FLAVOUR_TEXT;
  } else {
    myOutputValue = myOutputValue + 'Your best score is <strong>' + playerBestScore + '</strong>.';
  }

  // show computer cards
  myOutputValue = myOutputValue + '<br /><br />' + showCards(computerCards, 'computer') + '<br />';

  // show computer score
  if (isBlackjack(computerCards)) {
    myOutputValue = myOutputValue + BLACKJACK_FLAVOUR_TEXT + '<br /><br />';
  } else {
    myOutputValue = myOutputValue + 'Computer\'s best score is <strong>' + computerBestScore + '</strong>.<br /><br />';
  }

  // determine winners
  // player winner
  if (
    playerBestScore <= MAX_SCORE && (
      (isBlackjack(playerCards) && !isBlackjack(computerCards))
      || (computerBestScore <= MAX_SCORE && playerBestScore > computerBestScore)
      || (computerBestScore > MAX_SCORE)
    )
  ) {
    myOutputValue = myOutputValue + '<strong>You win!</strong>';
  }
  // computer winner
  else if (
    computerBestScore <= MAX_SCORE && (
      (isBlackjack(computerCards) && !isBlackjack(playerCards))
      || (playerBestScore <= MAX_SCORE && computerBestScore > playerBestScore)
      || (playerBestScore > MAX_SCORE)
    )
  ) {
    myOutputValue = myOutputValue + '<strong>You lose!</strong>';
  }
  // tie
  else {
    myOutputValue = myOutputValue + '<strong>It\'s a tie!</strong>';
  }

  myOutputValue = myOutputValue + '<br /><br />Please click Submit to start a new round!';
  // reset game state
  resetDeckAndHands();
  gameMode = GAME_STARTED;

  return myOutputValue;
};
