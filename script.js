/*
1. Deck is shuffled.
2. Deck is configured with Blackjack mode i.e.
 e. Card 2 to 10 is score using their face value
 f. Card J, Q, K is equal to 10
 g. Card A can be 1 or 11 (value 1 or value 2) - if rank is equal to 1, ploayer can choose either value1 or value2.
1a. Player draw 2 cards and Dealer draw 2 cards. - helper function to draw 2 cards for each player by default -> keep the object as card, and keep the object in an array, each player can has 1 array for more players in the future.
2. User clicks Submit to deal cards.
3. The cards are analysed for game winning conditions, e.g. Blackjack.
 - Blackjack winning condition
 a. Total higher than the dealer but total higher is still less than 21
 b. If total hands is higher than 21, call it a bust
 c. Everyone deal 1st card and face up
 d. Every player deal 2nd card face up, but the dealer 2nd card is faced down
 e. Card 2 to 10 is score using their face value
 f. Card J, Q, K is equal to 10
 g. Card A can be 1 or 11
 h. if you have total of 21 (by having 2 cards), you automatically win for that round, get 1.5 times of your bet from the dealer. Otherwise, you will be asked if you want to have another card from the top of the deck (last of the card using pop)
 i. you can say "hit" if you want a card with no limit but you will 'bust' when your hands got more than 21 and dealer will get ur money
 j. you can say "stand" when you don't need anymore card
 k. Once dealer has gone round the table, he has to flip the 2nd card face up. If it is 16 or under, he has to take another card. If it is 17 or above, he has to stand.
 l. if the dealer bust, everyone who is still in the round will get 1x of their bet as reward.
 m. If the dealer doesn't bust, only the player whose hands higher than dealer get 1x of their bet. 
4. The cards are displayed to the user.
5. The user decides whether to hit or stand, using the submit button to submit their choice.
6. The user's cards are analysed for winning or losing conditions.
7. The computer decides to hit or stand automatically based on game rules.
8. The game either ends or continues.


version 2: 
allow player to enter a game mode where the player can choose 'h' for hit or 's' for stand
player can hit more times until the player hit s or when it bust (>21)
when player hand bust, it doesn't mean player lose, it could be a tie if the dealer also bust

*/

var makeBlackJackDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.

    for (let rankCounter = 1; rankCounter < 14; rankCounter++) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // By default, the face value of the card follows the rankCounter with some exceptions defined later

      // Define value for each card to support black jack game rules
      var value = Number(rankCounter);
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "A";
        value = Number(11);
        // use 11 first
      } else if (cardName == 11) {
        cardName = "J";
        value = Number(10);
      } else if (cardName == 12) {
        cardName = "Q";
        value = Number(10);
      } else if (cardName == 13) {
        cardName = "K";
        value = Number(10);
      }

      // Create a new card object with the current name, suit, rank and value (this is to support game rules of Black Jack)
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: value,
      };

      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck in array
  return cardDeck;
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cardDeck.length; currentIndex++) {
    // Get a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// input person is either player or dealer
// input cardArray is the card array as of now for the player or the dealer
var formatCardDisplay = function (person, cardArray) {
  // create a table with a row

  // if the keyword is dealerunveil, the person is a dealer
  var whois = "";
  if (person == "dealerunveil") {
    whois = "dealer";
  } else {
    whois = person;
  }

  var returnDisplay = `<table><tr> <td><h1>${whois} </h1></td></tr> `;

  // print the table content by number of cards, each card take 1 column
  returnDisplay = returnDisplay + `<tr><td>`;

  if (person == "player") {
    for (let i = 0; i < cardArray.length; i++) {
      // each card occupy a column in a row
      returnDisplay =
        returnDisplay + `${cardArray[i].name} ${cardArray[i].suit} &nbsp`;
    }
  }

  if (person == "dealer") {
    // 2nd card value should not be disclosed now.
    returnDisplay =
      returnDisplay + `${cardArray[0].name} ${cardArray[0].suit} &nbsp ?`;
  }

  if (person == "dealerunveil") {
    for (let i = 0; i < cardArray.length; i++) {
      // each card occupy a column in a row
      returnDisplay =
        returnDisplay + `${cardArray[i].name} ${cardArray[i].suit} &nbsp`;
    }
  }

  returnDisplay = returnDisplay + `</td></tr></table>`;

  return returnDisplay;
};

// a simple function that take in card array and retrieve all the card object to calculate the sum of the card's values
var sumOfCards = function (cardArray) {
  // sum of all card values in the array
  var totalCardValues = Number(0);
  // track the number of ACE occurence

  var aceCounter = Number(0);
  // sum up all card values in the array regardless of its size
  for (let i = 0; i < cardArray.length; i++) {
    totalCardValues = totalCardValues + cardArray[i].value;
    if (cardArray[i].name == "A") {
      aceCounter = aceCounter + 1;
    }
  }

  // run through the number of ACE, deduct 10 from each, until it is not bigger than 21.

  for (let j = 0; j < aceCounter; j++) {
    if (totalCardValues > 21) {
      totalCardValues = totalCardValues - 10;
    }
  }

  return totalCardValues;
};

// return the winner between 2 person's total value in the cards on hands
// pass player value first, followed by dealer value
var findWinner = function (card1value, card2value) {
  // define winner
  var winner = "";
  var playerBusted = "";
  var dealerBusted = "";

  var playerWinningMsg =
    "<H3>Awesome! You are the winner!</H3><br> Refresh your browser to try again!";
  var dealerWinningMsg =
    "<H3>Dealer is the winner!</H3> <br> Refresh your browser to try again!";
  var tieMsg =
    "<H3>Oops..No winner ler.</H3><br> Refresh your browser to try again!";

  // check whose hands have busted
  if (card1value > 21) {
    playerBusted = "yes";
  }
  if (card2value > 21) {
    dealerBusted = "yes";
  }

  if (playerBusted == "yes" && dealerBusted == "yes") {
    winner = tieMsg;
  } else if (playerBusted == "yes") {
    winner = dealerWinningMsg;
  } else if (dealerBusted == "yes") {
    winner = playerWinningMsg;
  } else {
    //both are not busted
    if (card2value == card1value) {
      winner = tieMsg;
    } else if (card1value > card2value && card1value <= 21) {
      winner = playerWinningMsg;
    } else if (card2value > card1value && card2value <= 21) {
      winner = dealerWinningMsg;
    }
  }

  return winner;
};

// Initialise an empty deck array every when the browser is refreshed
var deck = [];
// Create a deck of cards for blackjack chronologically
deck = makeBlackJackDeck();
// Shuffle the deck of cards
deck = shuffleCards(deck);

// Initialise the player card, dealer card outside the main so that it will only execute once regardless of how many submit button is
var playerCard = []; // player will receive a number of cards, it refreshes every submit
var dealerCard = []; // computer will receive a number of cards, it refreshes every submit
var numberOfPlayers = 2; // Base programme supports only 1 player + 1 dealer

// gameMode for game initialisation, i.e. give 2 cards to player and dealer each
// game mode = 1 start of the game
// game mode = 2 allow player or dealer to hit or stand
// game mode = 0 winner is determined, no more game until user refresh the browser

var gameMode = 1;
// default to player as player always can decide whether to Stand or Hit
var whoseTurn = "player";
// to determine if dealer is more than 16, then he can choose to hit or stand, if not, winner should be calculated immediately when it is dealer's turn
var dealerMoreThan16 = "";

// default dealer has one card face down
var dealer2ndCardUnveil = "false";

// set as global value
var myOutputValue = "";
var cardOutputValue = "";
var instructionForDealerUnveil = "";
var instructionForDealerToHS = "";
var instructionForPlayerToHS = "";
var instructionForValidHSInput = "";
var messageForBustedPlayer =
  "<H2>Your hand busted.</h2> Don't worry. Dealer might bust too. Press submit to hand the game to the dealer.";
var messageForGameResult = "<br><h2>Game Result: </h2>";
var messageForPlayerStand =
  "<H2>You chose to stand.</h2> Press submit to hand the game to the dealer.";
// sum up all the card values
var playerCardValue = Number(0);
var dealerCardValue = Number(0);

var main = function (input) {
  if (gameMode == 1) {
    // to give 1 card to each player in round robin manner. Total two cards for each player and the dealer
    // click submit and it will execute this code once
    for (let i = 0; i < numberOfPlayers; i++) {
      playerCard.push(deck.pop()); // we can comment this to test the variable ACE scenarios in conjunction with the following commented test code.
      dealerCard.push(deck.pop());
    }
    /* -- test code for variable ACE values --
    //remember to comment out the above line "playerCard.push()"

    playerCard.push({
      name: "A",
      suit: "♦️",
      rank: 1,
      value: 11,
    });

    playerCard.push({
      name: "A",
      suit: "♥️",
      rank: 1,
      value: 11,
    });
   */

    playerCardValue = sumOfCards(playerCard);
    dealerCardValue = sumOfCards(dealerCard);

    // initialise the card display format
    cardOutputValue = `<table> 
              <tr> 
                  <td> ${formatCardDisplay(
                    "dealer",
                    dealerCard
                  )} </td> <td>(value of cards: ?)</td>
              </tr>
              <tr> 
                  <td> ${formatCardDisplay(
                    "player",
                    playerCard
                  )} </td> <td>(value of cards: ${playerCardValue}) </td>
              </tr></table>`;
    // initialise the instructions
    instructionForDealerUnveil = `<H2> Dealer's turn: </h2>Please click submit to reveal your 2nd card value.`;
    instructionForDealerToHS = `<H2> Dealer's turn: </h2>If you need 1 more card, type "h" and submit. <br> If you don't need any card, type "s" and submit.`;
    instructionForPlayerToHS = `<H2> Player's turn: </h2>If you need 1 more card, type "h" and submit. <br> If you don't need any card, type "s" and submit.`;

    // set gameMode to 2 to ensure this earlier code only initialise once
    gameMode = 2;

    if (playerCardValue < 21) {
      // continue the game with HS eligibility
      myOutputValue = cardOutputValue + instructionForPlayerToHS;

      console.log("1. First gate when player has less than 21");
    } else if (playerCardValue == 21) {
      // with 2 cards, the max is 21, and that's blackjack. This is not HS eligible. So, next is to unveil dealer's face-down card.
      whoseTurn = "dealer"; // change the turn to dealer since player has 21 from initial 2 cards
      myOutputValue = cardOutputValue + instructionForDealerUnveil;
      console.log("1.b First gate when player has 21");
    }
    return myOutputValue;
  } else if (gameMode == 2) {
    // to allow player and dealer to stand or hit
    // player's turn by default
    // player can hit submit until the number >=21 or choose to stand, then it will switch to for dealer to hit if it is <17.

    // if player turn is valid, player card value has less than 21 and player choose to hit

    // initialise the card display format
    cardOutputValue = `<table> 
              <tr> 
                  <td> ${formatCardDisplay(
                    "dealer",
                    dealerCard
                  )} </td> <td>(value of cards: ?)</td>
              </tr>
              <tr> 
                  <td> ${formatCardDisplay(
                    "player",
                    playerCard
                  )} </td> <td>(value of cards: ${playerCardValue}) </td>
              </tr></table>`;
    // initialise the instructions

    instructionForDealerToHS = `<H2> Dealer's turn: </h2>If you need 1 more card, type "h" and submit. <br> If you don't need any card, type "s" and submit.`;
    instructionForPlayerToHS = `<H2> Player's turn: </h2>If you need 1 more card, type "h" and submit. <br> If you don't need any card, type "s" and submit.`;
    instructionForValidHSInput = `<H2> Invalid input.</h2>If you need 1 more card, type "h" and submit. <br> If you don't need any card, type "s" and submit.`;
    console.log("2. Game mode 2 started");
    if (whoseTurn == "player") {
      // 1. check if player is HS eligible by retriving total value of cards possessed
      playerCardValue = sumOfCards(playerCard); // check the current value

      if (playerCardValue <= 21) {
        // if eligible to hit or stand, show instructions
        myOutputValue = cardOutputValue + instructionForPlayerToHS;
        console.log("3. When player card value less than 21");
        if (input == "h" || input == "H") {
          // add one card to player's card array to store the new card object
          playerCard.push(deck.pop());
          // calculate total value of cards as of now
          playerCardValue = sumOfCards(playerCard);

          console.log(
            "4a. When player chose HIT. The card is",
            playerCard[playerCard.length - 1].name
          );
          // card value has change. must retrieve the latest value.
          cardOutputValue = `<table> 
              <tr> 
                  <td> ${formatCardDisplay(
                    "dealer",
                    dealerCard
                  )} </td> <td>(value of cards: ?)</td>
              </tr>
              <tr> 
                  <td> ${formatCardDisplay(
                    "player",
                    playerCard
                  )} </td> <td>(value of cards: ${playerCardValue}) </td>
              </tr></table>`;

          // To check if player can continue HS after adding 1 more card.
          if (playerCardValue > 21) {
            // jump to dealer's turn
            whoseTurn = "dealer";
            myOutputValue = cardOutputValue + messageForBustedPlayer;
            console.log("3c. Busted when adding card. Switch to", whoseTurn);
          } else {
            // continue allow hit or stand
            myOutputValue = cardOutputValue + instructionForPlayerToHS;
          }

          return myOutputValue;
        } else if (input == "s" || input == "S") {
          // player choose to stand. Next turn is dealer.
          whoseTurn = "dealer";
          myOutputValue = cardOutputValue + messageForPlayerStand;
          console.log("4b. When player chose STAND");
        } else {
          // any other input consider invalid.
          myOutputValue = cardOutputValue + instructionForValidHSInput;
          console.log("4c. When player put invalid input");
        }
      } else if (playerCardValue > 21) {
        // if player is not eligible due to either player has 21 or busted. No more chance for player. Dealer's turn.
        whoseTurn = "dealer";
        myOutputValue = cardOutputValue + messageForBustedPlayer;
        console.log(
          "3b. Is it even possible to reach here? When player has 21 or more. Busted. Switch to",
          whoseTurn
        );
      }
    }

    // when it is dealer's turn, click submit to reveal dealer's card
    if (whoseTurn == "dealer") {
      // initialise the card display format in which dealer has 1 card face down
      cardOutputValue = `<table> 
              <tr> 
                  <td> ${formatCardDisplay(
                    "dealer",
                    dealerCard
                  )} </td> <td>(value of cards: ?)</td>
              </tr>
              <tr> 
                  <td> ${formatCardDisplay(
                    "player",
                    playerCard
                  )} </td> <td>(value of cards: ${playerCardValue}) </td>
              </tr></table>`;
      // initialise the instructions
      instructionForDealerToHS = `<H2> Dealer's turn: </h2>If you need 1 more card, type "h" and submit. <br> If you don't need any card, type "s" and submit.`;
      //instructionForPlayerToHS = `<H2> Player's turn: </h2>If you need 1 more card, type "h" and submit. <br> If you don't need any card, type "s" and submit.`;
      instructionForValidHSInput = `<H2> Invalid input.</h2>If you need 1 more card, type "h" and submit. <br> If you don't need any card, type "s" and submit.`;
      console.log("Entering dealer mode");

      if (dealer2ndCardUnveil == "false") {
        // if dealer 2nd card is face down, open it up and display the next possible cause
        // Unique condition: If the initial hand is more than 16, there is no chance to hit. 2) if it is less than 17, go to HS mode.
        // display the face down card
        console.log("First time loading dealer's face down code...");

        cardOutputValue = `<table> 
              <tr> 
                  <td> ${formatCardDisplay(
                    "dealer",
                    dealerCard
                  )} </td> <td>(value of cards:?)</td>
              </tr>
              <tr> 
                  <td> ${formatCardDisplay(
                    "player",
                    playerCard
                  )} </td> <td>(value of cards: ${playerCardValue}) </td>
              </tr></table>`;

        myOutputValue = cardOutputValue + instructionForDealerUnveil;
        dealer2ndCardUnveil = "true";
      } else if (dealer2ndCardUnveil == "true") {
        // check if initial hands of dealer is 17 or above, if yes, then find winner, if not go into HS mode
        console.log("Dealer has shown 2 cards now.");
        dealerCardValue = sumOfCards(dealerCard);

        // put this code here as we only check 1st time when dealer has initial hand.
        if (dealerCardValue < 17) {
          dealerMoreThan16 = "false";
        } else if (dealerCardValue >= 17) {
          dealerMoreThan16 = "true";
        }
        // set the flag that 2nd card has been unveiled and won't execute the above code more than once

        // initialisation

        cardOutputValue = `<table> 
              <tr> 
                  <td> ${formatCardDisplay(
                    "dealerunveil",
                    dealerCard
                  )} </td> <td>(value of cards:${dealerCardValue})</td>
              </tr>
              <tr> 
                  <td> ${formatCardDisplay(
                    "player",
                    playerCard
                  )} </td> <td>(value of cards: ${playerCardValue}) </td>
              </tr></table>`;

        if (dealerMoreThan16 == "true") {
          // if it is more than or equal to 17, then calculate who is the winner
          console.log("Dealer has more than 16 with 2 hands.");
          winner = findWinner(playerCardValue, dealerCardValue);
          myOutputValue = cardOutputValue + messageForGameResult + winner;
          gameMode = 0;
        } else if (dealerMoreThan16 == "false") {
          // after unveil, if the initial hand was < 17, can go to HS mode
          console.log("Dealer has less than 17 with 2 hands.");
          // retrieve the latest card values for dealer
          dealerCardValue = sumOfCards(dealerCard);

          if (dealerCardValue < 21) {
            // if eligible to hit or stand, show instructions
            myOutputValue = cardOutputValue + instructionForDealerToHS;
            console.log(
              "Dealer's total cards still less than 21. Can do H or S."
            );

            if (input == "h" || input == "H") {
              // add one card to dealer's card array to store the new card object
              dealerCard.push(deck.pop());

              // calculate total value of cards as of now
              dealerCardValue = sumOfCards(dealerCard);

              // due to card array changes, must reinitialise the output
              cardOutputValue = `<table> 
              <tr> 
                  <td> ${formatCardDisplay(
                    "dealerunveil",
                    dealerCard
                  )} </td> <td>(value of cards:${dealerCardValue})</td>
              </tr>
              <tr> 
                  <td> ${formatCardDisplay(
                    "player",
                    playerCard
                  )} </td> <td>(value of cards: ${playerCardValue}) </td>
              </tr></table>`;

              // To check if player can continue HS after adding 1 more card.
              // calculate total value of cards as of now
              dealerCardValue = sumOfCards(dealerCard);
              console.log("Dealer has ", dealerCardValue);

              if (dealerCardValue >= 21) {
                // find the winner and show game result
                winner = findWinner(playerCardValue, dealerCardValue);

                cardOutputValue = `<table> 
              <tr> 
                  <td> ${formatCardDisplay(
                    "dealerunveil",
                    dealerCard
                  )} </td> <td>(value of cards:${dealerCardValue})</td>
              </tr>
              <tr> 
                  <td> ${formatCardDisplay(
                    "player",
                    playerCard
                  )} </td> <td>(value of cards: ${playerCardValue}) </td>
              </tr></table>`;

                myOutputValue = cardOutputValue + messageForGameResult + winner;
                gameMode = 0;
                console.log("A");
              } else {
                // continue allow hit or stand
                console.log("Instruction for Dealer", instructionForDealerToHS);
                myOutputValue = cardOutputValue + instructionForDealerToHS;
                console.log("B");
              }
            } else if (input == "s" || input == "S") {
              // dealer choose to stand. Find the winner now
              winner = findWinner(playerCardValue, dealerCardValue);
              myOutputValue = cardOutputValue + messageForGameResult + winner;
              gameMode = 0;
              console.log("C");
            } else {
              myOutputValue = cardOutputValue + instructionForDealerToHS;
            }
          } else if (dealerCardValue >= 21) {
            // no more hit is allow. Find the winner now.
            console.log("Another way to hit 21. Which is unlikely");
            winner = findWinner(playerCardValue, dealerCardValue);
            myOutputValue = cardOutputValue + messageForGameResult + winner;
            gameMode = 0;
          }
        }
      }
    }
    return myOutputValue;
  } else if (gameMode == 3) {
    myOutputValue = "Please refresh the browser to start another game!";
    return myOutputValue;
  }
};
