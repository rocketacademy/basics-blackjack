var UNIVERSAL_GAME_MODE = ``;
var GAME_MODE_PLAYER_CHOICE = `Player turn: Choose to hit or stand!`;
var GAME_MODE_DEALER_CHOICE = `Dealer turn: Choose to hit or stand!`;
var GAME_MODE_EVALUATE = `Time to evaluate if player or dealer busts and winning condition!`;
var cardDeck = [];
//Captures dealer cards
var dealerHands = [];
//Captures player cards
var playerHands = [];
//Used to join dealer cards'names and suits
var fullDealerHand = [];
//Used to join player cards'names and suits
var fullPlayerHand = [];
//Capture sum of dealer cards
var sumOfDealerHand = 0;
//Capture sum of player cards
var sumOfPlayerHand = 0;
//set to true if player met blackjack
var playerBlackjack = ``;
//set to true if dealer met blackjack
var dealerBlackjack = ``;

var main = function (input) {
  if (UNIVERSAL_GAME_MODE === ``) {
    //Generates deck of cards
    cardDeck = cardDeckGenerator();
    console.log(cardDeck);

    //Shuffle deck of cards
    cardDeck = shuffleCardDeck(cardDeck);
    console.log(cardDeck);

    //Start assigning hands to dealer then player
    dealerHands = assignCards(2);
    console.log(`Starting dealer hand:` + JSON.stringify(dealerHands));
    playerHands = assignCards(2);

    console.log(`Starting player hand:` + JSON.stringify(playerHands));

    //Calculate sum of dealer cards & check if need to vary ace values
    sumOfDealerHand = sumCards(dealerHands) + varyAceValues(dealerHands);
    console.log(`Sum dealer cards: ` + sumOfDealerHand);

    //check if blackjack is met for dealer
    dealerBlackjack = checksForBlackjack(dealerHands);
    console.log(`Check for blackjack: ` + dealerBlackjack);

    //Calculate sum of player cards
    sumOfPlayerHand = sumCards(playerHands) + varyAceValues(playerHands);
    console.log(`Sum player cards: ` + sumOfPlayerHand);
    console.log(
      `Sum player cards: ` + sumOfPlayerHand + JSON.stringify(playerHands)
    );

    //check if blackjack is met for player
    playerBlackjack = checksForBlackjack(playerHands);
    console.log(`Check for blackjack: ` + dealerBlackjack);

    //if blackjack is met by player, change game mode since they win automatically
    if (playerBlackjack === `true` || dealerBlackjack === `true`) {
      var winner = captureWinner();
      return winner;
    }

    //Change game mode to allow player to choose to hit or stand
    UNIVERSAL_GAME_MODE = GAME_MODE_PLAYER_CHOICE;
    console.log(`GAME MODE : ` + UNIVERSAL_GAME_MODE);

    //append deck images for player and dealer
    appendImagesWhenDeckHanded(`player`);
    appendImagesWhenDeckHanded(`dealer`);

    var myOutputValue = `Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand}  <br> Enter hit to draw a card or stand to end your turn then click the Submit button `;

    //if player has less than dealer on first round and has less than 17, nudge to choose hit
    if (sumOfPlayerHand < sumOfDealerHand && sumOfPlayerHand < 17) {
      myOutputValue =
        `Your current total is less than dealer so, it's wise to hit! <br>` +
        myOutputValue;
    } else if (sumOfPlayerHand < sumOfDealerHand && sumOfPlayerHand > 17) {
      myOutputValue =
        `Your current total is less than dealer but, be careful to avoid busting! <br>` +
        myOutputValue;
    }
    return myOutputValue;
  }

  if (UNIVERSAL_GAME_MODE === GAME_MODE_PLAYER_CHOICE) {
    //Checks if user input is either hit or stand
    var userChoice = validatesInput(input);

    //user chose to hit (draw a card)
    if (userChoice === `hit`) {
      playerHands = hit(playerHands);

      //Calculate sum of player cards
      sumOfPlayerHand = sumCards(playerHands) + varyAceValues(playerHands);
      console.log(
        `Sum player cards: ` + sumOfPlayerHand + JSON.stringify.playerHands
      );

      //check if blackjack is met for player
      playerBlackjack = checksForBlackjack(playerHands);
      console.log(`Check for blackjack: ` + dealerBlackjack);

      //if blackjack is met by player, change game mode since they win automatically
      if (playerBlackjack === `true` || dealerBlackjack === `true`) {
        var winner = captureWinner();
        return winner;
      }

      console.log(` HIT Player hand:` + JSON.stringify(playerHands));

      //append deck images for player
      appendImagesWhenHit(`player`);

      var myOutputValue = `You chose hit and have drawn a new card! <br> Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand} <br> Enter hit to draw a card or stand to end your turn then click the Submit button!`;

      UNIVERSAL_GAME_MODE = GAME_MODE_PLAYER_CHOICE;
      console.log(`UNIVERSAL_GAME_MODE:` + UNIVERSAL_GAME_MODE);
      return myOutputValue;
    } else if (userChoice === "stand") {
      var myOutputValue = `You chose stand so no cards were drawn! <br> Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand}  <br> Click button again to see what dealer chooses! `;
      UNIVERSAL_GAME_MODE = GAME_MODE_DEALER_CHOICE;
      console.log(`UNIVERSAL_GAME_MODE:` + UNIVERSAL_GAME_MODE);
      return myOutputValue;
    }
    return userChoice;
  }

  if (UNIVERSAL_GAME_MODE === GAME_MODE_DEALER_CHOICE) {
    //check if dealer sum > 17 and has to hit
    if (sumOfDealerHand < 17) {
      //Assign new card
      dealerHands = hit(dealerHands);
      console.log(`Starting dealer hand:` + JSON.stringify(dealerHands));

      //Calculate sum of dealer cards and change ace variable if preset
      sumOfDealerHand = sumCards(dealerHands) + varyAceValues(dealerHands);
      console.log(`Sum dealer cards: ` + sumOfDealerHand);

      //check if blackjack is met for dealer
      dealerBlackjack = checksForBlackjack(dealerHands);
      console.log(`Check for blackjack: ` + dealerBlackjack);

      //if blackjack is met by dealer, change game mode since they win automatically
      if (playerBlackjack === `true` || dealerBlackjack === `true`) {
        var winner = captureWinner();
        return winner;
      }

      //change button text to nudge player to click for next steps
      var button = document.querySelector("#submit-button");
      button.innerText;
      button.innerText = "Click to continue!";

      //append deck images for dealer
      appendImagesWhenHit(`dealer`);

      var myOutputValue = `Dealer chose hit and has drawn a new card! <br> Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand}`;
    } else {
      var myOutputValue = `Dealer chose stand and no new cards are drawn! <br> Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand} `;

      UNIVERSAL_GAME_MODE = GAME_MODE_EVALUATE;
      console.log(`Universal game mode` + UNIVERSAL_GAME_MODE);
    }

    return myOutputValue;
  }

  if (UNIVERSAL_GAME_MODE === GAME_MODE_EVALUATE) {
    //evaluate if either player or dealer bust
    if (sumOfPlayerHand > 21 || sumOfDealerHand > 21) {
      var winner = declaresWinnerIfBustReturnsTrue();
      console.log(`bust condition met- winner` + winner);
      return winner;
    }

    // If bust condition not met-Compare dealer hands and player hands to see who wins
    else var winner = captureWinner();
    return winner;
  }
};

//Function to append images when decks are assigned
var appendImagesWhenDeckHanded = function (playerOrDealer) {
  //tracks if the function should append for player or dealer
  var playerOrDealer = playerOrDealer;
  console.log(`DECK` + playerOrDealer);
  counter = 0;
  console.log(`full player hand` + JSON.stringify.fullPlayerHand);

  if (playerOrDealer === `player`) {
    while (counter < playerHands.length) {
      //in case there are existing images, remove to avoid duplicates

      //adds images
      var cardImage = document.createElement(`img`);
      cardImage.src = `cards/` + playerHands[counter].image + `.png`;
      console.log(`IMAGE` + cardImage.src);
      document.getElementById("player-cards").append(cardImage);
      counter += 1;
    }
  } else {
    while (counter < dealerHands.length) {
      //adds images
      var cardImage = document.createElement(`img`);
      cardImage.src = `cards/` + dealerHands[counter].image + `.png`;
      console.log(`IMAGE` + cardImage.src);
      document.getElementById("dealer-cards").append(cardImage);
      counter += 1;
    }
  }
};

//Function to append images when cards are drawn --> only adds last card drawn
var appendImagesWhenHit = function (playerOrDealer) {
  //tracks if the function should append for player or dealer
  var playerOrDealer = playerOrDealer;
  console.log(`DECK` + playerOrDealer);
  console.log(`full player hand` + JSON.stringify.playerHands);
  var counter = 0;

  if (playerOrDealer === `player`) {
    //variable to capture last drawn card
    var number = playerHands.length - 1;
    var cardImage = document.createElement(`img`);
    cardImage.src = `cards/` + playerHands[number].image + `.png`;
    console.log(`IMAGE` + cardImage.src);
    document.getElementById("player-cards").append(cardImage);
    counter += 1;
  } else {
    //variable to capture last drawn card
    var number = dealerHands.length - 1;
    //adds images
    var cardImage = document.createElement(`img`);
    cardImage.src = `cards/` + dealerHands[number].image + `.png`;
    console.log(`IMAGE` + cardImage.src);
    document.getElementById("dealer-cards").append(cardImage);
    counter += 1;
  }
};

//Function to create deck of cards
//Create a single card
var cardDeckGenerator = function () {
  var cardSuits = [`heart`, `diamonds`, `club`, `spade`];

  var cardSuitsCounter = 0;
  while (cardSuitsCounter < cardSuits.length) {
    var cardSuit = cardSuits[cardSuitsCounter];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var score = rankCounter;

      console.log(`Rank counter` + rankCounter);

      if (rankCounter === 1) {
        cardName = `ace`;
      } else if (rankCounter === 11) {
        cardName = `jack`;
        score = 10;
      } else if (rankCounter === 12) {
        cardName = `queen`;
        score = 10;
      } else if (rankCounter === 13) {
        cardName = `king`;
        score = 10;
      }

      console.log(`Card Name` + cardName);

      var card = {
        name: cardName,
        suit: cardSuit,
        rank: score,
        image: cardSuit + "-" + cardName,
      };
      //return card to deck
      cardDeck.push(card);

      rankCounter += 1;
    }

    cardSuitsCounter += 1;
  }
  return cardDeck;
};

//Generate random number for shuffling
var getRandomNumber = function (limit) {
  return Math.floor(Math.random() * limit);
};

//Function to shuffle cards
var shuffleCardDeck = function (cardDeck) {
  var cardCounter = 0;
  while (cardCounter < cardDeck.length) {
    var randomNumber = getRandomNumber(cardDeck.length);
    var currentCard = cardDeck[cardCounter];
    var randomCard = cardDeck[randomNumber];
    cardDeck[randomNumber] = currentCard;
    cardDeck[cardCounter] = randomCard;
    cardCounter += 1;
  }

  return cardDeck;
};

//Function to hit
var hit = function (hand) {
  hand.push(assignCards(1));
  hand = [].concat.apply([], hand);
  return hand;
};

//Function to hand out cards
var assignCards = function (numberOfCardsNeeded) {
  counter = 0;
  var cardHands = [];
  while (counter < numberOfCardsNeeded) {
    var newCard = cardDeck.pop();
    console.log(`New card:` + newCard);
    cardHands.push(newCard);
    counter += 1;
  }
  console.log(`Card hands:` + cardHands);
  return cardHands;
};

//Function to validate input; whether user entered hit or stand
var validatesInput = function (text) {
  var input = text.toLowerCase();
  if (input !== `hit` && input !== `stand`) {
    errorMessage = `Wrong option! Please enter either hit or stand only.`;
    return errorMessage;
  }
  return input;
};

//function that checks for blackjack
var checksForBlackjack = function (deck) {
  //checks total
  var total = sumCards(deck) + varyAceValues(deck);
  var metBlackjack = ``;

  //check if sum = 21 --> blackjack
  if (total === 21) {
    metBlackjack = `true`;
  }
  return metBlackjack;
};

//Function to sum values of hand using rank
var sumCards = function (hands) {
  console.log(`Hands: ` + hands);
  //captures position of array
  var index = 0;
  console.log(`Index: ` + index);
  var sum = 0;
  while (index < hands.length) {
    console.log(`Index: ` + index);
    var currentRank = hands[index].rank;
    sum = sum + currentRank;
    index += 1;
  }
  console.log(`Sum: ` + sum);
  return sum;
};

//Function to check if hand busts >21
var checkIfHandBusts = function (hand) {
  var sum = sumCards(hand) + varyAceValues(hand);

  var handBust = ``;
  //if hand sum is more more than 21
  if (sum > 21) {
    var handBust = `true`;
  } else {
    handBust = "false";
  }
  console.log(`sum based on vary ace values` + sum);
  return handBust;
};

//Function to test winning conditions and capture output that declares winner
var captureWinner = function () {
  //First the sum of both dealer (computer) and player hands is calculated
  var sumOfDealerHands = sumCards(dealerHands) + varyAceValues(dealerHands);
  console.log(`Sum of dealer hands rank:  ` + sumOfDealerHands);

  var sumOfPlayerHands = sumCards(playerHands) + varyAceValues(playerHands);
  console.log(`Sum of player rank:  ` + sumOfPlayerHands);

  // If both players have the same value or draw blackjack causing tie
  if (
    sumOfDealerHands === sumOfPlayerHands ||
    (playerBlackjack === `true` && dealerBlackjack === `true`)
  ) {
    var image = `<img src=" https://media.tenor.com/mOfIOlNpmmkAAAAi/hello-kitty-ok.gif"/>`;
    var myOutputValue =
      `It's a tie! <br> Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand} <br> Refresh to play again. ` +
      image;
  }

  //If dealer (computer) wins by blackjack so hand = 21
  else if (dealerBlackjack === `true` && playerBlackjack !== `true`) {
    var image = `<img src=" https://media.tenor.com/dVzwsfQxks0AAAAd/cursed-hello-kitty-balloon-hello-kitty.gif"/>`;
    var myOutputValue =
      `Dealer hits blackjack! You lose! <br> Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand} <br> Refresh to play again.  ` +
      image;
  }

  //If player wins by blackjack so hand = 21
  else if (playerBlackjack === `true` && dealerBlackjack !== `true`) {
    var image = `<img src="https://media.tenor.com/fvQDMD0LjKgAAAAC/sanrio-hello-kitty.gif"/>`;
    var myOutputValue =
      `You hit blackjack! <br>  Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand} <br> Refresh to play again.` +
      image;
  }

  // If neither draw blacjack and dealer (computer) has higher value
  else if (sumOfDealerHands > sumOfPlayerHands) {
    var image = `<img src=" https://media.tenor.com/dVzwsfQxks0AAAAd/cursed-hello-kitty-balloon-hello-kitty.gif"/>`;
    var myOutputValue =
      `Dealer wins! You lose! <br>  Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand} <br> Refresh to play again. ` +
      image;
  }

  // If neither draw blacjack and player has higher value
  else {
    var image = `<img src="https://media.tenor.com/fvQDMD0LjKgAAAAC/sanrio-hello-kitty.gif"/>`;
    var myOutputValue =
      `You win! <br>  Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand} <br> Refresh to play again.  ` +
      image;
  }

  return myOutputValue;
};

//Function to capture winning conditions in event either or both player and deal bust (sum > 21)
var declaresWinnerIfBustReturnsTrue = function () {
  var myOutputValue = ``;

  if (sumOfPlayerHand > 21 && sumOfDealerHand > 21) {
    var image = `<img src=" https://media.tenor.com/mOfIOlNpmmkAAAAi/hello-kitty-ok.gif"/>`;
    myOutputValue =
      `Both dealer and you bust! It's a tie! <br> Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand}<br> Refresh to play again.  ` +
      image;
  } else if (sumOfPlayerHand < 21 && sumOfDealerHand > 21) {
    var image = `<img src="https://media.tenor.com/fvQDMD0LjKgAAAAC/sanrio-hello-kitty.gif"/>`;
    myOutputValue =
      `Dealer bust! Player wins! <br> Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand} <br> Refresh to play again. ` +
      image;
  } else {
    var image = `<img src=" https://media.tenor.com/dVzwsfQxks0AAAAd/cursed-hello-kitty-balloon-hello-kitty.gif"/>`;
    myOutputValue =
      `Player bust and dealer wins! You lose! <br> Player Total: ${sumOfPlayerHand}  <br> Dealer Total: ${sumOfDealerHand} <br> Refresh to play again.` +
      image;
  }
  return myOutputValue;
};

//Function to check if hand contains ace and vary ace value
var varyAceValues = function (fullHand) {
  //flatten array to remove bracket
  console.log(`what is passed to array` + JSON.stringify(fullHand));
  var hand = [];
  hand = fullHand.map(getHands);
  function getHands(item) {
    return [item.name].join("  ");
  }
  console.log(`Flattened array` + JSON.stringify(hand));

  var increaseSumOfHand = 0;
  //checks if array includes ace -> if yes= true / no = false
  var aceCondition = hand.includes("ace");
  console.log("ace condition" + aceCondition);

  if (aceCondition === true) {
    //increases sum by 10 since ace was 1 and is now 11
    increaseSumOfHand = 10;
    console.log(`Ace condition met, increase sum by:` + increaseSumOfHand);
  }

  return increaseSumOfHand;
};
