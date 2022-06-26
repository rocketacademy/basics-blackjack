/* 
// Base 
The main function runs on each player's turn. The sequence of actions in the game might be the following.
Deck is shuffled.
User clicks Submit to deal cards.
The cards are analysed for game winning conditions, e.g. Blackjack.
The cards are displayed to the user.
The user decides whether to hit or stand, using the submit button to submit their choice.
The user's cards are analysed for winning or losing conditions.
The computer decides to hit or stand automatically based on game rules.
The game either ends or continues.

Note that for the main function to perform different logic on user input, for example when a player decides to hit or stand, we may wish to consider using a new game mode.
*/

/*
// Comfortable
User Instructions
Make the game intuitive and fun to use by adding explicit instructions for each step of the game. "Wow, you're at 14 right now! Do you want to hit or stand? Type h for hit or s for stand."

Starting Instructions
Add instructions on how to start the game by editing the index.html.

Simply add your instructions into line 134. These instructions will appear when the game loads and will be erased as soon as the user clicks the submit button.

Emoji
Use emoji for the card suits ♣️♠️♦️♥️and for the card names 2️⃣. Use more emoji in your game instructions and results. Get creative!

Images
You can add images to your game by including an HTML image tag in myOutputValue.

var myImage = '<img src="https://c.tenor.com/Hj2-u4VELREAAAAi/655.gif"/>';
myOutputValue = myOutputValue + myImage; // will display an image in the grey box

Image variable template: Fill in the COPIED_URL_OF_IMAGE with any image URL you find.
var myImage = '<img src="COPIED_URL_OF_IMAGE"/>';

Using images
Go to a site like tenor.com for gifs (although any website with images will work)
Right-click on an image and copy the url by selecting "Copy Image Address".
Paste this value into your code as shown above.

Using your own images
Place an image file in your Git repository. Commit the image file and push your image to your GitHub repository.
For example you added an image called my-image.jpeg into your repository directory. Refer to it like the following:

var myImage = '<img src="/my-image.jpeg" />';
myOutputValue = myOutputValue + myImage; // will display an image in the grey box

Image variable template: Fill in the COPIED_RELATIVE_IMAGE_PATH with the image file name you uploaded to your repo.
var myImage = '<img src="/COPIED_RELATIVE_IMAGE_PATH"/>';

Colors
Set your own custom colors in the CSS. Find the color values in index.html and change them. Use this tool to find the colors you want: https://www.w3schools.com/colors/colors_picker.asp
Find matching color sets using this design tool: https://color.adobe.com/create/color-wheel

Fonts
Set your own custom fonts: https://www.w3schools.com/css/css_font_google.asp
*/

// Helper functions from template
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

// Modify card deck creation for blackjack
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
    // Blackjack - need separate counter since max is rank 10 but 13 cards still needed
    var cardCounter = 1;
    while (cardCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var rankCounter = cardCounter;
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      // Blackjack - all picture cards are now rank 10
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        rankCounter = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        rankCounter = 10;
      } else if (cardName == 13) {
        cardName = "king";
        rankCounter = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment cardCounter to iterate over the next rank
      cardCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// In-class exercise
var convertSuitToEmoji = function (suit) {
  if (suit == "spades") {
    return "♠️";
  }
  if (suit == "hearts") {
    return "♥️";
  }
  if (suit == "clubs") {
    return "♣️";
  }
  if (suit == "diamonds") {
    return "♦️";
  }
  // If we reach here, we entered an invalid suit
  return "Invalid Suit!";
};

var convertCardNameToEmoji = function (cardName) {
  if (cardName == 2) {
    return "2️⃣";
  }
  if (cardName == 3) {
    return "3️⃣";
  }
  if (cardName == 4) {
    return "4️⃣";
  }
  if (cardName == 5) {
    return "5️⃣";
  }
  if (cardName == 6) {
    return "6️⃣";
  }
  if (cardName == 7) {
    return "7️⃣";
  }
  if (cardName == 8) {
    return "8️⃣";
  }
  if (cardName == 9) {
    return "9️⃣";
  }
  if (cardName == 10) {
    return "🔟";
  }
  return cardName;
};

// Initialise the card deck representation as an array of objects
// Modify template code to generate deck with function call
var deck = makeDeck();

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(deck);

// Global variables
// Winning value, minimum value to hit, player's decision, game end, list to store player and dealer hand
var BLACKJACK = 21;
var dealerHitMin = 16;
var playerDecision = false;
var endGame = false;
var playerHand = [];
var dealerHand = [];

// Comfortable Image
var winImage = '<img src="https://c.tenor.com/Hj2-u4VELREAAAAi/655.gif"/>';
var loseImage =
  '<img src="https://c.tenor.com/WPvUD2aORooAAAAC/we-lost-losing.gif"/>';
var tieImage =
  '<img src="https://c.tenor.com/wyfhYqF1tJIAAAAC/mark-wahlberg-wahlberg.gif"/>';
var dealerWinImage =
  '<img src= "https://c.tenor.com/C7CZoUiIIUQAAAAC/poker-cards-deal-with-it.gif"/>';
var addWelcomeImage = document.getElementById("output-div");
addWelcomeImage.innerHTML +=
  '<img src="https://c.tenor.com/Phz7IULNI9QAAAAC/box-hi.gif">';

// Helper function 1 - deal cards to hand (push to list)
var dealCardToHand = function (hand) {
  var cardDealt = shuffledDeck.pop();
  hand.push(cardDealt);
};

// Helper function 2 - check hand value (variable ace values to consider here)
var checkHandValue = function (hand) {
  var numOfAce = 0;
  var handValue = 0;
  var cardInHandCounter = 0;
  while (cardInHandCounter < hand.length) {
    var currentCard = hand[cardInHandCounter];
    // Let ace be 11 by default so easier to win
    if (currentCard.rank == 1) {
      numOfAce += 1;
      handValue += 11;
    } else {
      handValue += currentCard.rank;
    }
    cardInHandCounter += 1;
  }

  // If > 21 but have ace, change ace value to 1
  if (handValue > BLACKJACK && numOfAce > 0) {
    var aceCardCounter = 0;
    while (aceCardCounter < numOfAce) {
      handValue -= 10;
      // If < 21 at first, obtain original sum by exiting loop and go back up
      if (handValue <= BLACKJACK) {
        break;
      }
      aceCardCounter += 1;
    }
  }
  return handValue;
};

// Helper function 3 - check hand for blackjack (compare initial hand to determine winner), return bool
var checkBlackjack = function (hand) {
  return hand.length == 2 && checkHandValue(hand) == BLACKJACK;
};

// Helper function 4 - display hand
var displayHand = function (hand) {
  var cardsInHand = "";
  var currentCardIndex = 0;

  while (currentCardIndex < hand.length) {
    cardsInHand = `${cardsInHand}, ${convertCardNameToEmoji(
      hand[currentCardIndex].name
    )} of ${convertSuitToEmoji(hand[currentCardIndex].suit)}`;
    currentCardIndex += 1;
  }
  return cardsInHand;
};

// Helper function 5 - display output message
var displayOutputMessage = function () {
  return `Player hand: ${displayHand(
    playerHand
  )}. Total Value: ${checkHandValue(playerHand)} <br>
      Wow, you're at ${checkHandValue(playerHand)} right now! <br> <br>
          Dealer hand: ${displayHand(
            dealerHand
          )}. Total Value: ${checkHandValue(dealerHand)} <br>`;
};

// Template
var main = function (input) {
  // Check if game ended already
  if (endGame) {
    return `~ Game End ~ <br> 
    Refresh to play again!`;
  }

  // Deal Hands if hand empty (initial) - length is 0
  if (playerHand.length == 0) {
    // Call Helper function 1, 2 cards dealt
    dealCardToHand(playerHand);
    dealCardToHand(dealerHand);

    dealCardToHand(playerHand);
    dealCardToHand(dealerHand);

    // Check blackjack - call Helper function 3
    if (checkBlackjack(dealerHand)) {
      endGame = true;
      return `${displayOutputMessage()} <br> 
    Dealer wins by black jack! <br> ${dealerWinImage} <br> Refresh to play again!`;
    }

    if (checkBlackjack(playerHand)) {
      endGame = true;
      return `${displayOutputMessage()} <br>
    Player wins by black jack! <br> ${winImage} <br> Refresh to play again!`;
    }
    return `${displayOutputMessage()} <br>
    Do you want to hit or stand? Type "h" or "hit" for hit or "s" or "stand" for stand and click Submit!`;
  }

  // Player's action - hit or stand (2nd version)
  if (!playerDecision) {
    // Input validation
    if (
      input !== "hit" &&
      input !== "h" &&
      input !== "stand" &&
      input !== "s"
    ) {
      return `Please input "hit" or "h" or "stand" or "s" only.`;
    }

    // Hit - deal card to player - call Helper function 1
    if (input == "hit" || input == "h") {
      dealCardToHand(playerHand);
      // Check if > 21 - call Helper function 2
      if (checkHandValue(playerHand) > BLACKJACK) {
        endGame = true;
        return `${displayOutputMessage()} <br>
        Player has busted and lost. <br> ${loseImage} <br> Dealer won. Refresh to play again!`;
      }
    }

    // Stand - change player decision
    if (input == "stand" || input == "s") {
      playerDecision = true;
    }
  }

  // Dealer's action - hit or stand (3rd version)
  // Dealer hit if <= min - call Helper function 1, else stand
  var dealerHandValue = checkHandValue(dealerHand);
  if (dealerHandValue <= dealerHitMin) {
    dealCardToHand(dealerHand);
    // Update after new dealing
    dealerHandValue = checkHandValue(dealerHand);
    // Check if > 21 - call Helper function 2
    if (dealerHandValue > BLACKJACK) {
      endGame = true;
      return `${displayOutputMessage()} <br>
        Dealer has busted and lost. Player won :) <br> ${winImage} <br> Refresh to play again!`;
    }
  }

  // Stand - check winner, end game
  if (playerDecision && dealerHandValue > dealerHitMin) {
    endGame = true;
    if (checkHandValue(playerHand) > dealerHandValue) {
      return `${displayOutputMessage()} <br>
      Player wins! <br> ${myImage} <br> Refresh to play again!`;
    } else if (dealerHandValue > checkHandValue(playerHand)) {
      return `${displayOutputMessage()} <br>
      Dealer wins! <br> ${dealerWinImage} Refresh to play again!`;
    }
    return `${displayOutputMessage()} <br>
      It's a tie! <br> ${tieImage} <br> Refresh to play again!`;
  }
  return `${displayOutputMessage()} <br>
  Has Player chosen stand previously? (true - yes, false - no) : ${playerDecision} <br>
  If player has not yet chosen to stand, please enter "hit" or "h" for hit; or "stand" or "s" for stand and then click Submit. <br> If not, please click Submit to check Dealer's move.`;
};
