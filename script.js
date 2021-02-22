// initialize constants
var MAX_SCORE = 21;
var COMPUTER_MUST_HIT_MAX_SCORE = 17;
var INITIAL_NUMBER_OF_CARDS_DRAWN = 2;
var GAME_STARTED = 'game started';
var SHOW_PLAYERS_INITIAL_HAND = 'show players initial hand';
var CHOOSE_SPLITS_OR_HIT_OR_STAND = 'choose splits or hit or stand';
var CHOOSE_HIT_OR_STAND = 'choose hit or stand';
var SHOW_HANDS = 'show hands';
var HIT_INPUT = 'hit';
var STAND_INPUT = 'stand';
var SPLIT_INPUT = 'split';
var ACE_SCORES = [1, 11];
var JACK_QUEEN_KING_SCORES = 10;

// initialize string instruction constants
var HIT_OR_STAND_INSTRUCTIONS_START = 'Do you wish to hit or stand? ';
var HIT_OR_STAND_INSTRUCTIONS_END = 'To hit, type in <i>hit</i> in the input box above and click Submit. Otherwise, type in <i>stand</i> in the input box above and click Submit.';
var HIT_OR_STAND_INSTRUCTIONS = HIT_OR_STAND_INSTRUCTIONS_START + HIT_OR_STAND_INSTRUCTIONS_END;
var SPLIT_OR_HIT_OR_STAND_INSTRUCTIONS = 'Do you wish to split, hit or stand? To split, type in <i>split</i> in the input box above and click Submit. ' + HIT_OR_STAND_INSTRUCTIONS_END;
var SHOW_HAND_INSTRUCTIONS = 'Click Submit and we will display the results of this round.';
var NEXT_SPLIT_HAND_INSTRUCTIONS = 'Click Submit and we will display your next split hand.';
var FORCED_STAND_INSTRUCTIONS = 'Your best possible score is now <strong>' + MAX_SCORE + ' or above</strong>, and you can\'t hit anymore. ';
var FLAVOUR_TEXT_START = 'IT\'S A ';
var BLACKJACK_FLAVOUR_TEXT_END = '<strong>BLACKJACK</strong>!';
var SPLIT_FLAVOUR_TEXT_END = '<strong>SPLIT</strong>!';
var BLACKJACK_FLAVOUR_TEXT = FLAVOUR_TEXT_START + BLACKJACK_FLAVOUR_TEXT_END;
var SPLIT_FLAVOUR_TEXT = FLAVOUR_TEXT_START + SPLIT_FLAVOUR_TEXT_END;

// initialize variables;
var gameMode = GAME_STARTED;
var deck = [];
var shuffledDeck = [];
var playerCards = [];
var computerCards = [];
var playerHandIndex = 0;
var doesPlayerHaveSplitHand = false;

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

// retrieves the best possible outcome of your score.
// if at least 1 of the score(s) is less than 21, it
// picks the one lower than but closest to 21. if all
// scores are above 21, it picks the smallest one
// closest to 21.
var getBestScore = function (scores) {
  var scoresArr = [...scores];
  // filters out (in an array) all scores 21 and below
  var scoresWithoutExceedArr = scoresArr.filter((score) => score <= MAX_SCORE);
  var bestScore = Math.max(...scoresWithoutExceedArr);
  // if there are no scores 21 and below, it just picks
  // the smallest out of all scores.
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

// checks if a hand is able to be split
var isAbleToBeSplit = function (cards) {
  // hand size is 2, and there are cards of equal rank
  if (cards.length == 2 && cards[0].rank == cards[1].rank) {
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

// shows instructions for initial 2 cards based on its status,
// and changes game mode accordingly.
// this function assumes there isn't already a hit or stand yet.
var showInstructionsAndHandleGameMode = function (hand) {
  var cards = hand;

  // convenient if statement to assign cards
  // to current hand if there are split hands
  if (doesPlayerHaveSplitHand) {
    cards = cards[playerHandIndex];
  }

  // default: not blackjack
  var output = HIT_OR_STAND_INSTRUCTIONS;

  if (isBlackjack(cards)) {
    // is split hand, not last hand of player
    // check for hand.length instead of cards.length
    // because we want the number of hands, not the
    // number of cards in any given hand
    if (doesPlayerHaveSplitHand && playerHandIndex != hand.length - 1) {
      output = NEXT_SPLIT_HAND_INSTRUCTIONS;
      playerHandIndex += 1;
    } else {
      output = SHOW_HAND_INSTRUCTIONS;
      gameMode = SHOW_HANDS;
    }

    return output;
  }

  // not blackjack
  gameMode = CHOOSE_HIT_OR_STAND;
  return output;
};

// function assumes input is one of 'hit' or 'stand'
// handles input of 'hit' or 'stand' and changes instructions
// and game mode accordingly
var handleHitStandAndShowInstructions = function (input, hand) {
  var playerHand = hand;
  var showSplitHandNumberText = '';
  var SPLIT_HAND_NUMBER_TEXT = 'For split hand ' + (playerHandIndex + 1) + ': ';

  // convenient if statement to assign cards
  // to current hand if there are split hands
  if (doesPlayerHaveSplitHand) {
    playerHand = playerHand[playerHandIndex];
    showSplitHandNumberText = SPLIT_HAND_NUMBER_TEXT;
  }

  // default: assume stand
  var output = 'You have decided to stand. ' + showSplitHandNumberText + showCards(playerHand, 'player') + '<br />' + showScores(playerHand, 'player') + '<br /><br />';

  // for hit
  if (input == HIT_INPUT) {
    var drawnCard = shuffledDeck.pop();
    playerHand.push(drawnCard);

    output = 'You have decided to hit. You drew <strong>' + showCard(drawnCard) + '</strong>.<br /><br />';

    if (doesPlayerHaveSplitHand) {
      output += SPLIT_HAND_NUMBER_TEXT;
    }

    output += showCards(playerHand, 'player') + '<br />' + showScores(playerHand, 'player') + '<br /><br />';

    // if the minimum of an individual's score(s) is more than 21
    // show hands right away, can't hit anymore
    if (Math.min(...getCurrentScores(playerHand)) >= MAX_SCORE) {
      if (doesPlayerHaveSplitHand && playerHandIndex != hand.length - 1) {
        output += FORCED_STAND_INSTRUCTIONS + NEXT_SPLIT_HAND_INSTRUCTIONS;
        playerHandIndex += 1;
        gameMode = SHOW_PLAYERS_INITIAL_HAND;
      } else {
        output += SHOW_HAND_INSTRUCTIONS;
        gameMode = SHOW_HANDS;
      }
    }
    // else, continue offering option to hit or stand
    else {
      output += HIT_OR_STAND_INSTRUCTIONS;
    }

    return output;
  }

  // for stand
  if (doesPlayerHaveSplitHand && playerHandIndex != hand.length - 1) {
    output += NEXT_SPLIT_HAND_INSTRUCTIONS;
    playerHandIndex += 1;
    gameMode = SHOW_PLAYERS_INITIAL_HAND;
  } else {
    output += SHOW_HAND_INSTRUCTIONS;
    gameMode = SHOW_HANDS;
  }

  return output;
};

var resetDeckAndHands = function () {
  deck = makeDeck();
  shuffledDeck = shuffleCards(deck);
  playerCards = [
    { name: 'queen', suit: 'diamonds', rank: 12 },
    { name: 'queen', suit: 'hearts', rank: 12 },
  ];

  // playerCards = getInitialCards(shuffledDeck);
  computerCards = getInitialCards(shuffledDeck);

  playerHandIndex = 0;
  doesPlayerHaveSplitHand = false;
};

var main = function (input) {
  var sanitisedInput = input.trim().toLowerCase();
  var myOutputValue = '';
  var SPLIT_HAND_NUMBER_TEXT = 'For split hand ' + (playerHandIndex + 1) + ': ';

  if (gameMode == GAME_STARTED) {
    // reset deck and hands
    resetDeckAndHands();
    gameMode = SHOW_PLAYERS_INITIAL_HAND;
  }

  if (gameMode == SHOW_PLAYERS_INITIAL_HAND) {
    var initialHandCards = playerCards;

    // convenient if statement to assign cards
    // to current hand if there are split hands
    if (doesPlayerHaveSplitHand) {
      initialHandCards = initialHandCards[playerHandIndex];
      myOutputValue += SPLIT_HAND_NUMBER_TEXT;
    }

    myOutputValue += showCards(initialHandCards, 'player');

    if (isAbleToBeSplit(initialHandCards) && playerHandIndex == 0) {
      myOutputValue += ' ' + SPLIT_FLAVOUR_TEXT;
    }

    myOutputValue += '<br />' + showScores(initialHandCards, 'player') + '<br /><br />';

    // split hand
    // offer option to split, hit or stand
    if (isAbleToBeSplit(initialHandCards) && playerHandIndex == 0) {
      myOutputValue += SPLIT_OR_HIT_OR_STAND_INSTRUCTIONS;
      gameMode = CHOOSE_SPLITS_OR_HIT_OR_STAND;
    }
    // blackjack, or other kinds of hand
    // game mode handling in showAndHandleHandStatus()
    else {
      myOutputValue += showInstructionsAndHandleGameMode(initialHandCards, false);
    }

    return myOutputValue;
  }

  if (gameMode == CHOOSE_SPLITS_OR_HIT_OR_STAND) {
    // input validation
    if (
      sanitisedInput !== HIT_INPUT
      && sanitisedInput !== STAND_INPUT
      && sanitisedInput !== SPLIT_INPUT
    ) {
      myOutputValue = 'Please enter a valid input.<br /><br />' + showCards(playerCards, 'player') + ' ' + SPLIT_FLAVOUR_TEXT + '<br />' + showScores(playerCards, 'player') + '<br /><br />' + SPLIT_OR_HIT_OR_STAND_INSTRUCTIONS;
      return myOutputValue;
    }

    if (sanitisedInput == HIT_INPUT || sanitisedInput == STAND_INPUT) {
      myOutputValue = handleHitStandAndShowInstructions(sanitisedInput, playerCards);
      return myOutputValue;
    }

    // for split
    doesPlayerHaveSplitHand = true;
    // remove first item from playerCards, and remove last item from shuffled deck
    // combine them within an array to form the n-th hand
    // var firstHand = [playerCards.shift(), { name: 'ace', suit: 'spades', rank: 1 }];
    var firstHand = [playerCards.shift(), shuffledDeck.pop()];
    var secondHand = [playerCards.shift(), shuffledDeck.pop()];
    // var secondHand = [playerCards.shift(), { name: 'ace', suit: 'spades', rank: 1 }];
    playerCards.push(firstHand);
    playerCards.push(secondHand);

    myOutputValue = 'You have decided to split. ' + SPLIT_HAND_NUMBER_TEXT + showCards(playerCards[playerHandIndex], 'player') + '<br />' + showScores(playerCards[playerHandIndex], 'player') + '<br /><br />' + showInstructionsAndHandleGameMode(playerCards, true);

    // switch modes - now only hit or stand
    gameMode = CHOOSE_HIT_OR_STAND;

    return myOutputValue;
  }

  if (gameMode == CHOOSE_HIT_OR_STAND) {
    var currentPlayerHand = playerCards;
    var splitHandInsertedText = '';
    // convenient if statement to assign cards
    // to current hand if there are split hands
    if (doesPlayerHaveSplitHand) {
      currentPlayerHand = currentPlayerHand[playerHandIndex];
      splitHandInsertedText = SPLIT_HAND_NUMBER_TEXT;
    }

    // input validation
    if (sanitisedInput !== HIT_INPUT && sanitisedInput !== STAND_INPUT) {
      myOutputValue = 'Please enter a valid input.<br /><br />' + splitHandInsertedText + showCards(currentPlayerHand, 'player') + '<br />' + showScores(currentPlayerHand, 'player') + '<br /><br />' + HIT_OR_STAND_INSTRUCTIONS;
      return myOutputValue;
    }

    // for hit or stand
    myOutputValue = handleHitStandAndShowInstructions(sanitisedInput, playerCards);
    return myOutputValue;
  }

  // get scores of computer initial hand
  var computerScores = getCurrentScores(computerCards);
  var computerBestScore = getBestScore(computerScores);

  // computer will decide to draw if not blackjack
  if (!isBlackjack(computerCards)) {
    // continue drawing while its best possible score
    // is still less than COMPUTER_MUST_HIT_MAX_SCORE (17).
    // this is the most conservative playstyle, getting
    // the "best score" instead of "minimum of all scores".
    while (
      computerBestScore < COMPUTER_MUST_HIT_MAX_SCORE
    ) {
      var computerCard = shuffledDeck.pop();
      computerCards.push(computerCard);
      // to update computerScores after drawing
      computerScores = getCurrentScores(computerCards);
      // to update computerBestScore after drawing
      computerBestScore = getBestScore(computerScores);
    }
  }

  // retrieve current scores
  var playerScores = getCurrentScores(playerCards);
  // retrieve player "best" score. if at least 1
  // of the score(s) is less than 21, it picks the
  // one lower than but closest to 21. if all
  // scores are above 21, it picks the smallest one
  // closest to 21.
  var playerBestScore = getBestScore(playerScores);

  // show player cards
  myOutputValue = showCards(playerCards, 'player') + '<br />';

  // show player score
  // if blackjack, we assume they already know it's an
  // automatic 21. in fact, better than a 21 with more
  // than 2 cards. blackjack > 21 with more than 2 cards >
  // less than 21 > more than 21
  if (isBlackjack(playerCards)) {
    myOutputValue += BLACKJACK_FLAVOUR_TEXT;
  } else {
    myOutputValue += 'Your best score is <strong>' + playerBestScore + '</strong>.';
  }

  // show computer cards
  myOutputValue += '<br /><br />' + showCards(computerCards, 'computer') + '<br />';

  // show computer score
  if (isBlackjack(computerCards)) {
    myOutputValue += BLACKJACK_FLAVOUR_TEXT + '<br /><br />';
  } else {
    myOutputValue += 'Computer\'s best score is <strong>' + computerBestScore + '</strong>.<br /><br />';
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
    myOutputValue += '<strong>You win!</strong>';
  }
  // computer winner
  else if (
    computerBestScore <= MAX_SCORE && (
      (isBlackjack(computerCards) && !isBlackjack(playerCards))
      || (playerBestScore <= MAX_SCORE && computerBestScore > playerBestScore)
      || (playerBestScore > MAX_SCORE)
    )
  ) {
    myOutputValue += '<strong>You lose!</strong>';
  }
  // tie
  else {
    myOutputValue += '<strong>It\'s a tie!</strong>';
  }

  myOutputValue += '<br /><br />Please click Submit to start a new round!';
  // reset game state
  resetDeckAndHands();
  gameMode = GAME_STARTED;

  return myOutputValue;
};
