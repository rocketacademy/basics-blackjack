//Shuffle the cards
//1st mode: COMPARE INITIAL HANDS TO DETERMINE WINNER
//ADD VARIABLE ACE VALUES
//next mode: ADD PLAYER HIT OR STAND
//next mode: ADD DEALER HIT OR STAND

// Initialise an empty deck array
let cardDeck = [];
let gameState = "COMPARE INITIAL HANDS TO DETERMINE WINNER";
let handTotalOfPlayerInArray = [];
let handTotalOfDealerInArray = [];
let playerHandInArray = [];
let dealerHandInArray = [];

let makeDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  let suits = ["💙", "💎", "♣️", "♠️"];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    let currentSuit = suits[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice cardName starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let cardName = 1; cardName <= 13; cardName += 1) {
      // Create a new card with the current name, suit, and rank
      let card = {
        name: cardName,
        value: cardName,
        suit: currentSuit,
      };

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        card.name = "🅰️ace";
        card.value = [1, 11];
      } else if (cardName == 2) {
        card.name = "2️⃣";
        card.value = 2;
      } else if (cardName == 3) {
        card.name = "3️⃣";
        card.value = 3;
      } else if (cardName == 4) {
        card.name = "4️⃣";
        card.value = 4;
      } else if (cardName == 5) {
        card.name = "5️⃣";
        card.value = 5;
      } else if (cardName == 6) {
        card.name = "6️⃣";
        card.value = 6;
      } else if (cardName == 7) {
        card.name = "7️⃣";
        card.value = 7;
      } else if (cardName == 8) {
        card.name = "8️⃣";
        card.value = 8;
      } else if (cardName == 9) {
        card.name = "9️⃣";
        card.value = 9;
      } else if (cardName == 10) {
        card.name = "🔟";
        card.value = 10;
      } else if (cardName == 11) {
        card.name = "jack";
        card.value = 10;
      } else if (cardName == 12) {
        card.name = "👑queen";
        card.value = 10;
      } else if (cardName == 13) {
        card.name = "👑king";
        card.value = 10;
      }
      console.log("cards", card);
      // Add the new card to the deck
      cardDeck.push(card);
    }
  }
  // Return the completed card deck
  return cardDeck;
};

// Shuffle the elements in the cardDeck array
let shuffleCards = function (cardDeck) {
  makeDeck();
  // Loop over the card deck array once
  for (
    let currentIndex = 0;
    currentIndex < cardDeck.length;
    currentIndex += 1
  ) {
    // Select a random index in the deck
    let randomIndex = Math.floor(Math.random() * cardDeck.length);
    // Select the card that corresponds to randomIndex
    let randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
let shuffledDeck = shuffleCards(cardDeck);
console.log("shuffledDeck", shuffledDeck);

//CREATE MAIN FUNCTION TO COMPARE THE CARDS BETWEEN PLAYER AND COMPUTER
let main = function (input) {
  let myOutputValue = "";
  let imageTie =
    '<img src="https://media.tenor.com/mFYsjkPJ_TwAAAAi/%E5%BC%95%E3%81%8D%E5%88%86%E3%81%91-draw.gif"/>';
  let imagePlayerWin =
    '<img src="https://media.tenor.com/ItjSOKnVjYkAAAAi/win-%E5%8B%9D%E3%81%A1.gif"/>';
  let imagePlayerLose =
    '<img src="https://media.tenor.com/LRKlbuGlNbEAAAAi/lose-%E8%B2%A0%E3%81%91.gif"/>';
  // pop removes and returns the last array element (i.e. draws a card from the top of the deck).
  // Draw 2 cards from the top of the deck
  let playerCard1 = shuffledDeck.pop();
  playerHandInArray.push(playerCard1);
  let dealerCard1 = shuffledDeck.pop();
  dealerHandInArray.push(dealerCard1);
  let playerCard2 = shuffledDeck.pop();
  playerHandInArray.push(playerCard2);
  let dealerCard2 = shuffledDeck.pop();
  dealerHandInArray.push(dealerCard2);
  //=====PUT 1 MORE CONDITION, WHEN BOTH CARD OF PLAYER ARE "A". Value of 1pc of A will become 1. ===.
  //Return appropriate messages
  /*Player hand: Ace of Hearts, King of Spades
Dealer hand: 8 of Clubs, 8 of Spades
Player wins by black jack!*/
  if (gameState == "COMPARE INITIAL HANDS TO DETERMINE WINNER") {
    let firstHandValueOfPlayer = 0;
    let firstHandValueOfDealer = 0;
    //DISPLAY THE CARDS OF PLAYER AND THE SUM
    //PUSH HAND VALUE TO ARRAY
    if (playerCard1.name == "🅰️ace" && playerCard2.name != "🅰️ace") {
      firstHandValueOfPlayer = playerCard1.value[1] + playerCard2.value;
      handTotalOfPlayerInArray.push(firstHandValueOfPlayer);
      myOutputValue = `Player hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} with sum ${firstHandValueOfPlayer}.<br>`;
    } else if (playerCard2.name == "🅰️ace" && playerCard1.name != "🅰️ace") {
      firstHandValueOfPlayer = playerCard1.value + playerCard2.value[1];
      handTotalOfPlayerInArray.push(firstHandValueOfPlayer);
      myOutputValue = `Player hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} with sum ${firstHandValueOfPlayer}.<br>`;
    } else if (playerCard1.name == "🅰️ace" && playerCard2.name == "🅰️ace") {
      firstHandValueOfPlayer = playerCard1.value[1] + playerCard2.value[0];
      handTotalOfPlayerInArray.push(firstHandValueOfPlayer);
      myOutputValue = `Player hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} with sum ${firstHandValueOfPlayer}.<br>`;
    } else {
      firstHandValueOfPlayer = playerCard1.value + playerCard2.value;
      handTotalOfPlayerInArray.push(firstHandValueOfPlayer);
      myOutputValue = `Player hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit} with sum ${firstHandValueOfPlayer}.<br>`;
    }

    //DISPLAY THE CARDS OF DEALER AND THE SUM
    if (dealerCard1.name == "🅰️ace" && dealerCard2.name != "🅰️ace") {
      firstHandValueOfDealer = dealerCard1.value[1] + dealerCard2.value;
      handTotalOfDealerInArray.push(firstHandValueOfDealer);
      myOutputValue += `Dealer hand: ${dealerCard1.name} of ${dealerCard1.suit}, ${dealerCard2.name} of ${dealerCard2.suit} with sum ${firstHandValueOfDealer}.<br>`;
    } else if (dealerCard2.name == "🅰️ace" && dealerCard1.name != "🅰️ace") {
      firstHandValueOfDealer = dealerCard1.value + dealerCard2.value[1];
      handTotalOfDealerInArray.push(firstHandValueOfDealer);
      myOutputValue += `Dealer hand: ${dealerCard1.name} of ${dealerCard1.suit}, ${dealerCard2.name} of ${dealerCard2.suit} with sum ${firstHandValueOfDealer}.<br>`;
    } else if (dealerCard1.name == "🅰️ace" && dealerCard2.name == "🅰️ace") {
      firstHandValueOfDealer = dealerCard1.value[1] + dealerCard2.value[0];
      handTotalOfDealerInArray.push(firstHandValueOfDealer);
      myOutputValue += `Dealer hand: ${dealerCard1.name} of ${dealerCard1.suit}, ${dealerCard2.name} of ${dealerCard2.suit} with sum ${firstHandValueOfDealer}.<br>`;
    } else {
      firstHandValueOfDealer = dealerCard1.value + dealerCard2.value;
      handTotalOfDealerInArray.push(firstHandValueOfDealer);
      myOutputValue += `Dealer hand: ${dealerCard1.name} of ${dealerCard1.suit}, ${dealerCard2.name} of ${dealerCard2.suit} with sum ${firstHandValueOfDealer}.<br>`;
    }

    //COMPARE INITIAL HAND VALUE BTW PLAYER AND DEALER
    // A Blackjack win. When either player or dealer draw Blackjack.
    if (firstHandValueOfPlayer == 21 && firstHandValueOfDealer != 21) {
      myOutputValue += `Player won by Blackjack! <br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
    } else if (firstHandValueOfPlayer != 21 && firstHandValueOfDealer == 21) {
      myOutputValue += `Player lose! Dealer won by Blackjack! <br>Please refresh the webpage to play again.<br>${imagePlayerLose}`;
    }
    // A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.
    else if (
      firstHandValueOfDealer >= 17 &&
      firstHandValueOfDealer < firstHandValueOfPlayer
    ) {
      myOutputValue += `Player won! <br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
      //It's a tie. Both draw Blackjack.
    } else if (firstHandValueOfPlayer == 21 && firstHandValueOfDealer == 21) {
      myOutputValue += `It's a tie! Both dealer and player draw Blackjack! <br>Please refresh the webpage to play again.<br>${imageTie}`;
    }
    //Player choose to hit or stand
    else {
      myOutputValue += `Wow, you're at ${firstHandValueOfPlayer} right now! Do you want to hit or stand?<br>`;
      gameState = "PLAYER HIT OR STAND";
    }
  }

  if (gameState == "PLAYER HIT OR STAND") {
    if (input != "h" && input != "s") {
      myOutputValue += `Hi Player, please enter h for hit or s for stand, then click submit.`;
    } else if (input == "h") {
      gameState = "PLAYER HIT";
    } else if (input == "s") {
      gameState = "PLAYER STAND";
    }
  }

  if (gameState == "PLAYER HIT") {
    let playerNextCard = shuffledDeck.pop();
    console.log("playerNextCard", playerNextCard);
    //ONCE PLAYER HIT, NEXT CARD OF PLAYER IS ACE.
    //CHOOSE THE VALUE OF Ace TO AVOID BUST
    //AFTER PLAYER DEALT WITH 3rd card, HE STILL CAN CHOOSE EITHER HIT OR STAND.
    if (playerNextCard.name == "🅰️ace" && handTotalOfPlayerInArray[0] >= 11) {
      handTotalOfPlayerInArray[0] += playerNextCard.value[0];
      // A Blackjack win. When player draw Blackjack.
      if (handTotalOfPlayerInArray[0] == 21) {
        myOutputValue = `Player won by Blackjack! <br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
      }
      // A normal win. the winner is decided by whomever has the higher hand total. If player get higher hand total & dealer must stand, player win.
      else if (
        handTotalOfPlayerInArray[0] > handTotalOfDealerInArray[0] &&
        handTotalOfDealerInArray[0] >= 17 &&
        handTotalOfPlayerInArray[0] < 21
      ) {
        myOutputValue = `Player won! Hand total of player is ${handTotalOfPlayerInArray[0]}, which is greater than hand total of dealer: ${handTotalOfDealerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
      }
      //player busts. Player will tie with the dealer if the dealer also busts.
      else if (handTotalOfPlayerInArray[0] > 21) {
        if (handTotalOfDealerInArray[0] >= 17) {
          myOutputValue = `Player busts! You lose! Your hand total is ${handTotalOfPlayerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerLose}`;
        } else if (handTotalOfDealerInArray[0] < 17) {
          myOutputValue = `Player busts! Hand total of player: ${handTotalOfPlayerInArray[0]} ,which is higher than 21. Once dealer hit later, if dealer also busts, it's a tie. If dealer not busts, player lose.<br>Dealer will hit.<br>`;
          gameState = "DEALER HIT";
        }
      }
      //PLAYER choose hit or stand when hand total is still less than 21
      else if (handTotalOfPlayerInArray[0] < 21) {
        gameState = "PLAYER HIT OR STAND";
        myOutputValue = `Hi player, your hand total is ${handTotalOfPlayerInArray[0]}.<br> Hand total of dealer is ${handTotalOfDealerInArray[0]}.<br> Please enter h for hit or s for stand, then click submit.`;
      }
    }
    //ONCE PLAYER HIT, CURRENTLY, HAND TOTAL OF PLAYER IS LESS THAN 11 & NEXT CARD OF PLAYER IS ACE
    if (playerNextCard.name == "🅰️ace" && handTotalOfPlayerInArray[0] < 11) {
      handTotalOfPlayerInArray[0] += playerNextCard.value[1];
      // A Blackjack win. When player draw Blackjack.
      if (handTotalOfPlayerInArray[0] == 21) {
        myOutputValue = `Player won by Blackjack! <br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
      }
      // A normal win. the winner is decided by whomever has the higher hand total. If player get higher hand total & dealer must stand, player win.
      else if (
        handTotalOfPlayerInArray[0] > handTotalOfDealerInArray[0] &&
        handTotalOfDealerInArray[0] >= 17 &&
        handTotalOfPlayerInArray[0] < 21
      ) {
        myOutputValue = `Player won! Hand total of player is ${handTotalOfPlayerInArray[0]}, which is greater than hand total of dealer: ${handTotalOfDealerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
      }
      //player busts. Player will tie with the dealer if the dealer also busts.
      else if (handTotalOfPlayerInArray[0] > 21) {
        if (handTotalOfDealerInArray[0] >= 17) {
          myOutputValue = `Player busts! You lose! Your hand total is ${handTotalOfPlayerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerLose}`;
        } else if (handTotalOfDealerInArray[0] < 17) {
          myOutputValue = `Player busts! Hand total of player: ${handTotalOfPlayerInArray[0]} ,which is higher than 21. Once dealer hit later, if dealer also busts, it's a tie. If dealer not busts, player lose.<br>Dealer will hit.<br>`;
          gameState = "DEALER HIT";
        }
      }
      //PLAYER choose hit or stand when hand total is still less than 21
      else if (handTotalOfPlayerInArray[0] < 21) {
        gameState = "PLAYER HIT OR STAND";
        myOutputValue = `Hi player, your hand total is ${handTotalOfPlayerInArray[0]}.<br> Hand total of dealer is ${handTotalOfDealerInArray[0]}.<br> Please enter h for hit or s for stand, then click submit.`;
      }
    }
    //ONCE PLAYER HIT, NEXT CARD OF PLAYER IS NOT ACE.
    else if (playerNextCard.name != "🅰️ace") {
      handTotalOfPlayerInArray[0] += playerNextCard.value;
      // A Blackjack win. When player draw Blackjack.
      if (handTotalOfPlayerInArray[0] == 21) {
        myOutputValue = `Player won by Blackjack! <br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
      }
      // A normal win. the winner is decided by whomever has the higher hand total. If player get higher hand total & dealer must stand, player win.
      else if (
        handTotalOfPlayerInArray[0] > handTotalOfDealerInArray[0] &&
        handTotalOfDealerInArray[0] >= 17 &&
        handTotalOfPlayerInArray[0] < 21
      ) {
        myOutputValue = `Player won! Hand total of player is ${handTotalOfPlayerInArray[0]}, which is greater than hand total of dealer: ${handTotalOfDealerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
      }
      //player busts. Player will tie with the dealer if the dealer also busts.
      else if (handTotalOfPlayerInArray[0] > 21) {
        if (handTotalOfDealerInArray[0] >= 17) {
          myOutputValue = `Player busts! You lose! Your hand total is ${handTotalOfPlayerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerLose} `;
        } else if (handTotalOfDealerInArray[0] < 17) {
          myOutputValue = `Player busts! Hand total of player: ${handTotalOfPlayerInArray[0]} ,which is higher than 21. Once dealer hit later, if dealer also busts, it's a tie. If dealer not busts, player lose.<br>Dealer will hit.<br>`;
          gameState = "DEALER HIT";
        }
      }
      //PLAYER choose hit or stand when hand total is still less than 21
      else if (handTotalOfPlayerInArray[0] < 21) {
        gameState = "PLAYER HIT OR STAND";
        myOutputValue = `Hi player, your hand total is ${handTotalOfPlayerInArray[0]}.<br> Hand total of dealer is ${handTotalOfDealerInArray[0]}.<br> Please enter h for hit or s for stand, then click submit.`;
      }
    }
  }

  if (gameState == "PLAYER STAND") {
    //A tie. When both the player and dealer have the same total hand values(WHEN HAND VALUES OF DEALER IS 17 OR MORE)

    if (
      handTotalOfDealerInArray[0] == handTotalOfPlayerInArray[0] &&
      handTotalOfDealerInArray[0] >= 17
    ) {
      myOutputValue = `It's a tie in this round! <br>Please refresh the webpage to play again.<br>${imageTie}`;
    }
    // Player lose. Hand total of dealer is greater than player(WHEN HAND VALUES OF DEALER IS 17 OR MORE).
    else if (
      handTotalOfDealerInArray[0] > handTotalOfPlayerInArray[0] &&
      handTotalOfDealerInArray[0] >= 17
    ) {
      myOutputValue = `Player lose! Hand total of dealer: ${handTotalOfDealerInArray} is greater than hand total of player: ${handTotalOfPlayerInArray}.<br>Please refresh the webpage to play again. <br>${imagePlayerLose}`;
    }
    //If hand total of dealer is less than 17, will switch to gameState: DEALER HIT
    else if (handTotalOfDealerInArray[0] < 17) {
      myOutputValue = `Hand total of player: ${handTotalOfPlayerInArray}.<br>Hand total of dealer: ${handTotalOfDealerInArray}.<br>Dealer will hit.<br>`;
      gameState = "DEALER HIT";
    }
  }

  if (gameState == "DEALER HIT") {
    //DEALER CONTINUE TO HIT UNTIL HAND TOTAL IS >= 17
    let dealerNextCard = shuffledDeck.pop();
    console.log("dealerNextCard", dealerNextCard);
    //When hand total of dealer is more than or equal to 11, but his next card is ace.
    if (handTotalOfDealerInArray[0] >= 11 && dealerNextCard.name == "🅰️ace") {
      handTotalOfDealerInArray[0] += dealerNextCard.value[0];
      //Hand total of dealer is less than 17, then hit again.
      if (handTotalOfDealerInArray[0] < 17) {
        myOutputValue = `Dealer get the card: ${dealerNextCard.name} of ${dealerNextCard.suit}.<br>Since hand total of dealer is ${handTotalOfDealerInArray}, which is less than 17. Dealer will hit. Please click submit to proceed.`;
        gameState = "DEALER HIT";
      }
      //Hand total of dealer is greater than 16 and less than 21, then dealer must stand.
      //COMPARE THE HAND TOTAL BTW PLAYER AND DEALER
      else if (
        handTotalOfDealerInArray[0] > 16 &&
        handTotalOfDealerInArray[0] < 21
      ) {
        //A tie. When both the player and dealer have the same total hand values.
        if (handTotalOfDealerInArray[0] == handTotalOfPlayerInArray[0]) {
          myOutputValue += `<br>It's a tie in this round! <br>Hand total of Player: ${handTotalOfDealerInArray[0]}<br>Hand total of Dealer: ${handTotalOfDealerInArray}.<br>Please refresh the webpage to play again.<br>${imageTie}`;
        }
        // Player lose (DEALER WIN). Hand total of dealer is greater than player.
        else if (handTotalOfDealerInArray[0] > handTotalOfPlayerInArray[0]) {
          myOutputValue += `<br>Player lose! Because hand total of dealer is ${handTotalOfDealerInArray[0]}, which is greater than hand total of player: ${handTotalOfPlayerInArray[0]}<br>Please refresh the webpage to play again.<br>${imagePlayerLose}`;
        }
        //Player win (DEALER LOSE). Hand total of player is greater than dealer(WHEN HAND VALUES OF DEALER IS 17 OR MORE).
        else if (
          handTotalOfPlayerInArray[0] > handTotalOfDealerInArray[0] &&
          handTotalOfPlayerInArray[0] < 21
        ) {
          myOutputValue += `<br>Player win! Because hand total of dealer is ${handTotalOfDealerInArray[0]}, which is lower than hand total of player: ${handTotalOfPlayerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
        }
        //Player lose (DEALER WIN). Player busts but dealer not busts.
        else if (handTotalOfPlayerInArray[0] > 21) {
          myOutputValue += `<br>Player lost! Because player busts(hand total:${handTotalOfPlayerInArray[0]}), but dealer not busts(hand total: ${handTotalOfDealerInArray[0]}).<br>Please refresh the webpage to play again.<br>${imagePlayerLose}`;
        }
      }
      //Hand total of dealer is 21. Dealer win by BLACKJACK
      else if (handTotalOfDealerInArray[0] == 21) {
        myOutputValue += `<br>Player lose! Dealer won by Blackjack! <br>Please refresh the webpage to play again.<br>${imagePlayerLose}`;
      }
      //Hand total of dealer is greater than 21.
      else if (handTotalOfDealerInArray[0] > 21) {
        //It is tie if PLAYER AND DEALER ARE BUST
        if (handTotalOfPlayerInArray[0] > 21) {
          myOutputValue += `<br>It's a tie in this round! Because both player & dealer are busts.<br> Hand total of player: ${handTotalOfPlayerInArray[0]} & hand total of dealer: ${handTotalOfDealerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imageTie}`;
        }
        //Dealer lose (Player won) when dealer busts and player not busts
        else if (handTotalOfPlayerInArray[0] < 21) {
          myOutputValue += `<br>Player won! Because dealer busts (hand total: ${handTotalOfDealerInArray[0]}), hand total of player is ${handTotalOfPlayerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
        }
      }
    }
    //ONCE DEALER HIT, CURRENTLY, HAND TOTAL OF DEALER IS LESS THAN 11 & NEXT CARD OF PLAYER IS ACE
    else if (
      handTotalOfDealerInArray[0] < 11 &&
      dealerNextCard.name == "🅰️ace"
    ) {
      handTotalOfDealerInArray[0] += dealerNextCard.value[1];
      //Hand total of dealer is less than 17, then hit again.
      if (handTotalOfDealerInArray[0] < 17) {
        myOutputValue = `Dealer get the card: ${dealerNextCard.name} of ${dealerNextCard.suit}.<br>Since hand total of dealer is ${handTotalOfDealerInArray}, which is less than 17. Dealer will hit. Please click submit to proceed.`;
        gameState = "DEALER HIT";
      }
      //Hand total of dealer is greater than 16 and less than 21, then dealer must stand.
      //COMPARE THE HAND TOTAL BTW PLAYER AND DEALER
      else if (
        handTotalOfDealerInArray[0] > 16 &&
        handTotalOfDealerInArray[0] < 21
      ) {
        //A tie. When both the player and dealer have the same total hand values.
        if (handTotalOfDealerInArray[0] == handTotalOfPlayerInArray[0]) {
          myOutputValue += `<br>It's a tie in this round! <br>Hand total of Player: ${handTotalOfDealerInArray[0]}<br>Hand total of Dealer: ${handTotalOfDealerInArray}.<br>Please refresh the webpage to play again.<br>${imageTie}`;
        }
        // Player lose (DEALER WIN). Hand total of dealer is greater than player.
        else if (handTotalOfDealerInArray[0] > handTotalOfPlayerInArray[0]) {
          myOutputValue += `<br>Player lose! Because hand total of dealer is ${handTotalOfDealerInArray[0]}, which is greater than hand total of player: ${handTotalOfPlayerInArray[0]}<br>Please refresh the webpage to play again.<br>${imagePlayerLose}`;
        }
        //Player win (DEALER LOSE). Hand total of player is greater than dealer(WHEN HAND VALUES OF DEALER IS 17 OR MORE).
        else if (
          handTotalOfPlayerInArray[0] > handTotalOfDealerInArray[0] &&
          handTotalOfPlayerInArray[0] < 21
        ) {
          myOutputValue += `<br>Player win! Because hand total of dealer is ${handTotalOfDealerInArray[0]}, which is lower than hand total of player: ${handTotalOfPlayerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
        }
        //Player lose (DEALER WIN). Player busts but dealer not busts.
        else if (handTotalOfPlayerInArray[0] > 21) {
          myOutputValue += `<br>Player lost! Because player busts(hand total:${handTotalOfPlayerInArray[0]}), but dealer not busts(hand total: ${handTotalOfDealerInArray[0]}).<br>Please refresh the webpage to play again.<br>${imagePlayerLose}`;
        }
      }
      //Hand total of dealer is 21. Dealer win by BLACKJACK
      else if (handTotalOfDealerInArray[0] == 21) {
        myOutputValue += `<br> Player lose! Dealer won by Blackjack! <br>Please refresh the webpage to play again.<br>${imagePlayerLose}`;
      }
      //Hand total of dealer is greater than 21.
      else if (handTotalOfDealerInArray[0] > 21) {
        //It is tie if PLAYER AND DEALER ARE BUST
        if (handTotalOfPlayerInArray[0] > 21) {
          myOutputValue += `<br>It's a tie in this round! Because both player & dealer are busts.<br> Hand total of player: ${handTotalOfPlayerInArray[0]} & hand total of dealer: ${handTotalOfDealerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imageTie}`;
        }
        //Dealer lose (Player won) when dealer busts and player not busts
        else if (handTotalOfPlayerInArray[0] < 21) {
          myOutputValue += `<br>Player won! Because dealer busts (hand total: ${handTotalOfDealerInArray[0]}), hand total of player is ${handTotalOfPlayerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
        }
      }
    }
    //When dealer's next card is not ace
    else if (dealerNextCard.name != "🅰️ace") {
      handTotalOfDealerInArray[0] += dealerNextCard.value;
      //Hand total of dealer is less than 17, then hit again.
      if (handTotalOfDealerInArray[0] < 17) {
        myOutputValue = `Dealer get the card: ${dealerNextCard.name} of ${dealerNextCard.suit}.<br>Since hand total of dealer is ${handTotalOfDealerInArray}, which is less than 17. Dealer will hit. Please click submit to proceed.`;
        gameState = "DEALER HIT";
      }
      //Hand total of dealer is greater than 16 and less than 21, then dealer must stand.
      //COMPARE THE HAND TOTAL BTW PLAYER AND DEALER
      else if (
        handTotalOfDealerInArray[0] > 16 &&
        handTotalOfDealerInArray[0] < 21
      ) {
        //A tie. When both the player and dealer have the same total hand values.
        if (handTotalOfDealerInArray[0] == handTotalOfPlayerInArray[0]) {
          myOutputValue += `<br>It's a tie in this round! <br>Hand total of Player: ${handTotalOfDealerInArray[0]}<br>Hand total of Dealer: ${handTotalOfDealerInArray}.<br>Please refresh the webpage to play again.<br>${imageTie}`;
        }
        // Player lose (DEALER WIN). Hand total of dealer is greater than player.
        else if (handTotalOfDealerInArray[0] > handTotalOfPlayerInArray[0]) {
          myOutputValue += `<br>Player lose! Because hand total of dealer is ${handTotalOfDealerInArray[0]}, which is greater than hand total of player: ${handTotalOfPlayerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerLose}`;
        }
        //Player win (DEALER LOSE). Hand total of player is greater than dealer(WHEN HAND VALUES OF DEALER IS 17 OR MORE).
        else if (
          handTotalOfPlayerInArray[0] > handTotalOfDealerInArray[0] &&
          handTotalOfPlayerInArray[0] < 21
        ) {
          myOutputValue += `<br>Player win! Because hand total of dealer is ${handTotalOfDealerInArray[0]}, which is lower than hand total of player: ${handTotalOfPlayerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
        }
        //Player lose (DEALER WIN). Player busts but dealer not busts.
        else if (handTotalOfPlayerInArray[0] > 21) {
          myOutputValue += `<br>Player lose! Because player busts(hand total:${handTotalOfPlayerInArray[0]}), but dealer not busts(hand total: ${handTotalOfDealerInArray[0]}).<br>Please refresh the webpage to play again.<br>${imagePlayerLose}`;
        }
      }
      //Hand total of dealer is 21. Dealer win by BLACKJACK
      else if (handTotalOfDealerInArray[0] == 21) {
        myOutputValue += `<br> Player lose! Dealer won by Blackjack! <br>Please refresh the webpage to play again.<br>${imagePlayerLose}`;
      }
      //Hand total of dealer is greater than 21.
      else if (handTotalOfDealerInArray[0] > 21) {
        //It is tie if PLAYER AND DEALER ARE BUST
        if (handTotalOfPlayerInArray[0] > 21) {
          myOutputValue += `<br>It's a tie in this round! Because both player & dealer are busts.<br> Hand total of player: ${handTotalOfPlayerInArray[0]} & hand total of dealer: ${handTotalOfDealerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imageTie}`;
        }
        //Dealer lose (Player won) when dealer busts and player not busts
        else if (handTotalOfPlayerInArray[0] < 21) {
          myOutputValue += `<br>Player won! Because dealer busts (hand total: ${handTotalOfDealerInArray[0]}), hand total of player is ${handTotalOfPlayerInArray[0]}.<br>Please refresh the webpage to play again.<br>${imagePlayerWin}`;
        }
      }
    }
  }
  return myOutputValue;
};
