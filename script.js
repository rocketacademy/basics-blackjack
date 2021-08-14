// rules of the game:
// two players - 1 human 1 computer
// computer will always be the dealer
// player & dealer always have to hit if hand < 17
// aces can be 1 or 11
// winner is the player closest to 21; busted if > 21
// starting deck is 2 cards each; max number of cards is 5 on hand

// 1. Deck is shuffled & Game/variables/function is set up (section 1.1 to 1.9)
// 2. User clicks Submit to deal cards.
// 3. The cards are analysed for game winning conditions, e.g. Blackjack.
// 4. The cards are displayed to the user.
// 5. The user decides whether to hit or stand, using the submit button to submit their choice (up to 5 cards)
// 6. The user's cards are analysed for winning or losing conditions.
// 7. The computer decides to hit or stand automatically based on game rules.
// 8. Game ended, reset gameplay 

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
var playerChosetoStand = false; // if player has decided to stand, he/she cannot choose to hit anymore
var sumThreshold = 16; //computer always hit if sum <= 16
var gameStatus = 'waitng for username'
var username = '';


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
    } else if (currentCard.rank = 1){
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

// 1.9. create function to show deck
var showDeck = function(hand){
  message = ""; 
  var counter = 0;
  while (counter < hand.length){
    message = message + hand[counter].name + ' of ' + hand[counter].suit + ', ';
  counter = counter + 1;
  }
  return message;
}

// 2. User clicks Submit to deal cards (2 cards each)
var main = function (input) {

  if(gameStatus == 'waitng for username'){
    gameStatus = 'pending username';
    return 'Please enter your name to start the blackjack game.'
  };
  
  if(gameStatus == 'pending username'){
    username = input
    gameStatus = 'ready to start';
  }
  
  if(gameStatus == 'ready to start'){    
    //draw first card each
    dealCardtoHand(playerHand);
    dealCardtoHand(computerHand);
  
    //draw second card each
    dealCardtoHand(playerHand);
    dealCardtoHand(computerHand);

    console.log("Player's hand: "+showDeck(playerHand))
    console.log("Computer's hand: "+showDeck(computerHand))
    console.log('Player has blackjack? '+isBlackjack(playerHand))
    console.log('Computer has blackjack? '+isBlackjack(computerHand))

    // 3. The cards are analysed for game winning conditions, e.g. Blackjack.
    // if player got blackjack, player wins
    if(isBlackjack(playerHand)){
      gameStatus = 'gameover';
      return 'Hello '+username+ '!'+
      '<br><br>'+'You got a Blackjack! You have won!'+
      '<br><br>'+ 'Your hand: '+ showDeck(playerHand) + 'with sum of '+ generateHandSum(playerHand) + 
      '<br><br>'+ "Computer's hand: "+ showDeck(computerHand) + 'with sum of '+ generateHandSum(computerHand) + 
      '<br><br> Please refresh to play again.';
    }

    // if computer got blackjack, computer wins
    if(isBlackjack(computerHand)){
      gameStatus = 'gameover';
      return 'Hello '+username+ '!'+ 
      '<br><br>'+'Computer got a Blackjack! Computer has won!'+
      '<br><br>'+ 'Your hand: '+ showDeck(playerHand) + 'with sum of '+ generateHandSum(playerHand) + 
      '<br>'+ "Computer's hand: "+ showDeck(computerHand) + 'with sum of '+ generateHandSum(computerHand) + 
      '<br><br> Please refresh to play again.';
    }

    // 4. The cards are displayed to the user. 
    gameStatus = 'player to hit or stand'
    return 'Hello '+username+ '!'+
    '<br><br>'+ 'Your hand: '+ showDeck(playerHand) + 'with sum of '+ generateHandSum(playerHand) +
    '<br><br> Please enter "hit" or "stand" to proceed.';
  }

  // 5. The user decides whether to hit or stand, using the submit button to submit their choice (up to 5 cards)
  // player to submit only hit or stand, otherwise error
  if(gameStatus == 'player to hit or stand'){
    if(!playerChosetoStand){
      if(input !== 'hit' && input !== 'stand'){
        return 'Invalid input. Please enter "hit" or "stand" to proceed.'
      }
    }

    // if player decides to hit 
    if(input == 'hit'){
      dealCardtoHand(playerHand)
      console.log('Player hit '+ showDeck(playerHand)+'with a sum of '+ generateHandSum(playerHand))

      if(generateHandSum(playerHand) <= sumMax){
        // if number of cards on hand > 5, player can only enter 'stand' to end their turn
        if(playerHand.length > 5){
          playerChosetoStand = true;
          gameStatus = 'computer to hit or stand';    
          return 'You reached the maximum numer of cards on hand. <br><br>'+ 
          'Your hand: '+ showDeck(playerHand) + 'with sum of '+ generateHandSum(playerHand) +'<br>'+
          'Please enter "stand" to end your turn.';
        }
        // otherwise, player can choose to deal one more card or to end turn
        else return 'You have chosen to hit. <br><br>'+ 
        'Your hand: '+ showDeck(playerHand) + 'with sum of '+ generateHandSum(playerHand) +'<br>'+
        'Please enter "hit" if you want to deal 1 more card or "stand" to end your turn.';
      }
      //6. The user's cards are analysed for winning or losing conditions (if bust, player loses)
      else if(generateHandSum(playerHand) > sumMax){
        gameStatus = 'gameover';
        return 'You have chosen to hit. <br><br>' +
        'You have busted and lost! <br><br>' +
        'Your hand: '+ showDeck(playerHand) + 'with sum of '+ generateHandSum(playerHand) +'<br>'+
        "Computer's hand: "+ showDeck(computerHand) + 'with sum of '+ generateHandSum(computerHand) + '<br><br>'+
        'Please refresh to play again.';
      } 
    } 
    // if player decides to stand
    if (input == 'stand'){
      playerChosetoStand = true;

      // if player has not reached minimum threshold of sum 17
      if(generateHandSum(playerHand) <= sumThreshold && playerChosetoStand){
        return 'You have not reached the minimum threshold of sum 17. Please enter "hit" to deal 1 more card.';
      }

      // otherwise, player's turn ends
      else gameStatus = 'computer to hit or stand';
    } 
  }
 
  // 7. The computer decides to hit or stand automatically based on game rules (hit if sum < threshold; stand if sum >= threshold)
  if(gameStatus == 'computer to hit or stand'){
    var computerHandSum = generateHandSum(computerHand);
    while (computerHandSum <= sumThreshold && computerHandSum < sumMax && computerHand.length <= 5){
      dealCardtoHand(computerHand);

      //update computer hand sum after drawing a new card
      computerHandSum = generateHandSum(computerHand);

      console.log('Computer hit '+ showDeck(computerHand) + 'with sum of '+ generateHandSum(computerHand))   
      } 
      //if burst, computer loses
      if(computerHandSum > sumMax){
        gameStatus = 'gameover'
        return  'Computer has busted and lost!' +
        '<br><br>'+ 'Your hand: '+ showDeck(playerHand) + 'with sum of '+ generateHandSum(playerHand) + 
        '<br>'+ "Computer's hand: "+ showDeck(computerHand) + 'with sum of '+ generateHandSum(computerHand) + 
        '<br><br>'+'Please refresh to play again.';
      } 
      //if computer did not burst and if sum > threshold --> proceed to analyse game result
      else gameStatus = 'generate hand sum';
  }

  // if both player and computer have not busted and have chosen to stand, decide the winner
  if(gameStatus == 'generate hand sum'){
    if(playerChosetoStand && computerHandSum > sumThreshold){
      // player wins
      if(generateHandSum(playerHand)>generateHandSum(computerHand)){
        return 'You have won!' +
        '<br><br>'+'Your hand: '+ showDeck(playerHand) + 'with sum of '+ generateHandSum(playerHand) + 
        '<br>'+ "Computer's hand: "+ showDeck(computerHand) + 'with sum of '+ generateHandSum(computerHand) +
        '<br><br>'+'Please refresh to play again.';
      }
      // computer wins
      else if(generateHandSum(playerHand)<generateHandSum(computerHand)){
        return 'Computer has won!' +
        '<br><br>'+ 'Your hand: '+ showDeck(playerHand) + 'with sum of '+ generateHandSum(playerHand) + 
        '<br>'+ "Computer's hand: "+ showDeck(computerHand) + 'with sum of '+ generateHandSum(computerHand) +      
        '<br><br>'+'Please refresh to play again.';
      } 
      // tie
      else {
        return "It's a tie!" +
        '<br><br>'+'Your hand: '+ showDeck(playerHand) + 'with sum of '+ generateHandSum(playerHand) + 
        '<br>'+ "Computer's hand: "+ showDeck(computerHand) + 'with sum of '+ generateHandSum(computerHand) +      
        '<br><br>'+"Please refresh to play again.";
      }
    } 
    gameStatus = 'gameover'
   }
   
   // 8. Game ended, reset gameplay 
   if(gameStatus == 'gameover'){
    gameStatus = 'waitng for username';

    // reshuffle deck & reset hands
    playerHand = [];
    computerHand = [];
    deck = shuffleCards(makeDeck())
  }
}
