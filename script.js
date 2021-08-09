// rules of the game:
// two players - 1 human 1 computer
// computer will always be the dealer. dealer always has to hit if hand < 17
// aces can be 1 or 11
// winner is the player closest to 21

// 1. Deck is shuffled & Game/variables/function is set up (section 1.1 to 1.8)
// 2. User clicks Submit to deal cards.
// 3. The cards are analysed for game winning conditions, e.g. Blackjack.
// 4. The cards are displayed to the user.
// 5. The user decides whether to hit or stand, using the submit button to submit their choice.
// 6. The user's cards are analysed for winning or losing conditions.
// 7. The computer decides to hit or stand automatically based on game rules.
// 8. The game either ends or continues.

// 1. Deck is shuffled & Game/variables/function is set up
// 1.1 create make deck fuction
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

// 1.2. create shuffle deck function
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// 1.3. Shuffle the elements in the cardDeck array
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

// 1.4. create the deck
var deck = shuffleCards(makeDeck())

// 1.5. global varaibles to store player's and computer's cards & rules
var playerHand = [];
var computerHand = [];
var sumMax = 21; //max valid sum for blackjack is 21
var gameOver = false; //once game is over, no further moves can be made
var playerChosetoStand = false; // if player has decided to stand, he/she cannot choose to hit anymore
var computerThreshold = 16; //computer always hit if sum <= 16


// 1.6. create function to deal a card to a hand
var dealCardtoHand = function(hand){
  hand.push(deck.pop());
};

// 1.7. create function to add up all the cards in a hand
var generateHandSum = function(hand){
  var sum = 0;
  var counter = 0;
  var numAcesInHand = 0;

  while (counter < hand.length){
    var currentCard = hand[counter];
    //if card rank is between 2 to 10, value = rank
    if(currentCard.rank >= 2 && currentCard.rank <= 10){
      sum += currentCard.rank;
      //if card rank is jack, queen, king => value = 10  
    } else if (currentCard.rank >=11 && currentCard.rank <= 13){
      sum +=  10;
      //if card is ace, value = 11 by default
    } else if (currentCard.rank =1){
      numAcesInHand += 1
      sum += 11
    }

    //convert the value of ace to 1 if sum>21
    if(sum > sumMax && numAcesInHand >0){
      var aceCounter = 0;
      while(aceCounter < numAcesInHand){
        sum -= 10;
        if(sum <= sumMax){
          break;
        }
      }
      aceCounter += 1;
    }
    counter += 1;
  }
  return sum;
};

// 1.8. create function to determine if a hand contains blackjack
var isBlackjack = function(hand){
  return hand.length == 2 && generateHandSum(hand) == sumMax;
};

// 1.9. convert hand to string
var convertHandToString = function(hand){
  return hand.computerHand((card)=>card.name)
}

// 1.9. create function to generate default output message
var generateOutputMessage = function(){
  if(computerHand.length == 2 && playerHand.length == 2){
    return 'Player has hand '+playerHand[0].name + ' of ' + playerHand[0].suit+' and '+playerHand[1].name + ' of ' + playerHand[1].suit+' with sum '+generateHandSum(playerHand)
    +'<br>Computer has hand '+computerHand[0].name + ' of ' + computerHand[0].suit+' and '+computerHand[1].name + ' of ' + computerHand[1].suit+' with sum '+generateHandSum(computerHand)
  }
  else if(playerHand.length == 3 && computerHand.length == 2){
    return 'Player has hand '+playerHand[0].name + ' of ' + playerHand[0].suit+' and '+playerHand[1].name + ' of ' + playerHand[1].suit+' and '+ playerHand[2].name + ' of ' + playerHand[2].suit+' with sum '+generateHandSum(playerHand)
    +'<br>Computer has hand '+computerHand[0].name + ' of ' + computerHand[0].suit+' and '+computerHand[1].name + ' of ' + computerHand[1].suit+' with sum '+generateHandSum(computerHand)
    }
  else if(playerHand.length == 2 && computerHand.length == 3){
    return 'Player has hand '+playerHand[0].name + ' of ' + playerHand[0].suit+' and '+playerHand[1].name + ' of ' + playerHand[1].suit+' with sum '+generateHandSum(playerHand)
    +'<br>Computer has hand '+computerHand[0].name + ' of ' + computerHand[0].suit+' and '+computerHand[1].name + ' of ' + computerHand[1].suit+' and '+computerHand[2].name + ' of ' + computerHand[2].suit+' with sum '+generateHandSum(computerHand)
    }
  else return 'Player has hand '+playerHand[0].name + ' of ' + playerHand[0].suit+' and '+playerHand[1].name + ' of ' + playerHand[1].suit+' and '+ playerHand[2].name + ' of ' + playerHand[2].suit+' with sum '+generateHandSum(playerHand)
  +'<br>Computer has hand '+computerHand[0].name + ' of ' + computerHand[0].suit+' and '+computerHand[1].name + ' of ' + computerHand[1].suit+' and '+computerHand[2].name + ' of ' + computerHand[2].suit+' with sum '+generateHandSum(computerHand)
}

// 2. User clicks Submit to deal cards.
var main = function (input) {

  if(gameOver){
    return 'Gamover. Please refresh to play again.'
  }

  // initalise the game 
  if(playerHand.length == 0 && computerHand.length == 0){
    
    //draw first card each
    dealCardtoHand(playerHand);
    dealCardtoHand(computerHand);
  
    //draw second card each
    dealCardtoHand(playerHand);
    dealCardtoHand(computerHand);

    console.log("Player's hand: "+playerHand[0].name+' of '+playerHand[0].suit+' and '+playerHand[1].name+' of '+playerHand[1].suit)
    console.log("Computer's hand: "+computerHand[0].name+' of '+computerHand[0].suit+' and '+computerHand[1].name+' of '+computerHand[1].suit)
    console.log('Player has blackjack? '+isBlackjack(playerHand))
    console.log('Computer has blackjack? '+isBlackjack(computerHand))

    // 3. The cards are analysed for game winning conditions, e.g. Blackjack.
    if(isBlackjack(playerHand)){
      gameOver = true;
      return generateOutputMessage()+'<br>'+'Player won! Player has Blackjack! Please refresh to play again.';
    }
  
    if(isBlackjack(computerHand)){
      gameOver = true;
      return generateOutputMessage()+'<br>'+'Computer won! Computer has Blackjack! Please refresh to play again.';
    }

    // 4. The cards are displayed to the user.
    // 5. The user decides whether to hit or stand, using the submit button to submit their choice.
    return generateOutputMessage()+'<br> Please enter "hit" or "stand" to proceed.';
  }

  // 6. The user's cards are analysed for winning or losing conditions.
  if(!playerChosetoStand){
    if(input !== 'hit' && input !== 'stand'){
      return 'Invalid input. Please enter "hit" or "stand" to proceed.'
    }
  }

  if(input == 'hit'){
    dealCardtoHand(playerHand)
    console.log('Player hit '+playerHand[2].name+' of '+playerHand[2].suit)

      //if burst, show it to player
      if(generateHandSum(playerHand) > sumMax){
        gameOver = true;
        return generateOutputMessage()+'<br>'+'Player has busted and loses! Please refresh to play again.';
      }
  }
  
  if(input == 'stand'){
    playerChosetoStand = true;
  }

  // 7. The computer decides to hit or stand automatically based on game rules.
  // hit if sum < threshold; stand if sum >= threshold
  var computerHandSum = generateHandSum(computerHand);
  if (computerHandSum <= computerThreshold){
    dealCardtoHand(computerHand);
    console.log('Computer hit '+computerHand[2].name+' of '+computerHand[2].suit)

    //update computer hand sum after drawing a new card
    computerHandSum = generateHandSum(computerHand);
      //if burst, show it to computer
      if(computerHandSum > sumMax){
        gameOver = true;
        return generateOutputMessage()+'<br>'+'Computer has busted and loses! Please refresh to play again.';
    }
  }

  // if both player and computer have not busted and have chosen to stand, decide the winner
  if(playerChosetoStand && computerHandSum > computerThreshold){
    gameOver = true;

    if(generateHandSum(playerHand)>generateHandSum(computerHand)){
      gameOver = true; 
      return generateOutputMessage()+'<br>'+'Player won! Please refresh to play again.';
      }
  
    if(generateHandSum(playerHand)<generateHandSum(computerHand)){
      gameOver = true;
      return generateOutputMessage()+'<br>'+'Computer won! Please refresh to play again.';
      }
  }
};
