//==================== Create Deck ========================
var makeDeck = function () {
    var deck = [];
  
    var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  
    var suitIndex = 0;
    while (suitIndex < suits.length) {
      var currentSuit = suits[suitIndex];
      var rankCounter = 1;
      while (rankCounter <= 13) {
        var cardName = rankCounter;
  
        if (cardName == 1) {
          cardName = 'ace';
        } else if (cardName == 11) {
          cardName = 'jack';
        } else if (cardName == 12) {
          cardName = 'queen';
        } else if (cardName == 13) {
          cardName = 'king';
        }
//================= Single Card Variable ======================
        var card = {
          name: cardName,
          suit: currentSuit,
          rank: rankCounter,
        };
//================ Card To Deck ====================== 
        deck.push(card);
  
        rankCounter = rankCounter + 1;
      }
      suitIndex = suitIndex + 1;
    }
  
    return deck;
  };
  
  var getRandomIndex = function (size) {
    return Math.floor(Math.random() * size);
  };
//================= Shuffle Card ========================  
  var shuffleCards = function (cards) {
    var index = 0;
  
    while (index < cards.length) {
      var randomIndex = getRandomIndex(cards.length);
  
      var currentItem = cards[index];
  
      var randomItem = cards[randomIndex];
  
      cards[index] = randomItem;
      cards[randomIndex] = currentItem;
  
      index = index + 1;
    }
  
    return cards;
  };
//================= System work =====================  
  var deck = shuffleCards(makeDeck());
  
  var maxNum = 21;
  var hitNum = 16;
  var moveStand = false;
  var gameOver = false;
  var gameMode = "please enter player's name"
  var playerName = ""
  
  var playerHand = [];
  var computerHand = [];
  
//==================== Dealing Card and Calculate total card number ==========================
  var cardHand = function (hand) {
    hand.push(deck.pop());
  };
  
  
  var handNum = function (hand) {
    var aceNum = 0;
    var sum = 0;
    for (let i = 0; i < hand.length; i += 1) {
      var curCard = hand[i];
      if (curCard.rank >= 2 && curCard.rank <= 10) {
        sum += curCard.rank;
      } else if (curCard.rank >= 11 && curCard.rank <= 13) {
        sum += 10;
      } else if (curCard.rank === 1) {
        aceNum += 1;
        sum += 11;
      }
    }

    if (sum > maxNum && aceNum > 0) {
      for (let i = 0; i < aceNum; i += 1) {
        sum -= 10;
        if (sum <= maxNum) {
          break;
        }
      }
    }
    return sum;
  };
//======================= Hand Reveal =========================
  var blackJack = function (hand) {
    return hand.length === 2 && handNum(hand) === maxNum;
  };
  
  var handString = function (hand) {
    return `[${hand.map((card) => card.name)}]`;
  };
  
  var myOutput = function () {
    return `Player draws ${handString(playerHand)} worth ${handNum(playerHand)} . <br>
      Computer draws ${handString(computerHand)} worth ${handNum(computerHand)}.`;
  };

  
//===================== main function ==============================  
  var main = function (input) {
    if (gameOver) {
      return 'Game Over, refresh to play again.';
    };
    if(gameMode == "please enter player's name"){
      playerName = input;
      gameMode = "balck jack";
      return `hello! `+input+`! welcome to BlackJack, in this game you will start off with 2 random cards <br>
      the player with the highest card wins the game, you have two options,<br>
      first is "stand" that means you are playing with your current card,<br>
      second is "hit" that means you are drawing one more card to add to your current deck`
      };

    if (playerHand.length === 0){
      cardHand(playerHand);
      cardHand(computerHand);
  
      cardHand(playerHand);
      cardHand(computerHand);
    
//======================= Blackjack ===============================     
      if (blackJack(computerHand)) {
        gameOver = true;
        return `${myOutput()} <br>
          Computer draw Blackjack and wins.`;
      }
  
      if (blackJack(playerHand)) {
        gameOver = true;
        return `${myOutput()} <br>
          Player draw Blackjack and wins.`;
      }
//======================= Determine player Hit or Stand ==========================  
      return `${myOutput()} <br>
        enter "hit" or "stand" as your next move`;
      
    }
  
    if (!moveStand) {
      if (input !== 'hit' && input !== 'stand') {
        return 'Please input either "hit" or "stand"';
      }
//================== Determine winner  =======================
      if (input === 'hit') {
        cardHand(playerHand);
        if (handNum(playerHand) > maxNum) {
          gameOver = true;
          return `${myOutput()} <br>
            Player has busted and lose the game.`;
        }
      }
  
      if (input === 'stand') {
        moveStand = true;
      }
    }

    var computerHandNum = handNum(computerHand);
    if (computerHandNum <= hitNum) {
      cardHand(computerHand);
      computerHandNum = handNum(computerHand);
      if (computerHandNum > maxNum) {
        gameOver = true;
        return `${myOutput()} <br>
        Computer has busted and lose the game.`;
      }
    }
  
    if (moveStand && computerHandNum > hitNum) {
      gameOver = true;
      if (handNum(playerHand) > computerHandNum) {
        return `${myOutput()} <br>
          Player wins! Please refresh to play again.`;
      }
      return `${myOutput()} <br>
        Computer wins! Please refresh to play again.`;
    }
  
    return `${myOutput()} <br>
      please enter "hit" or "stand". <br>`;
  };
  
