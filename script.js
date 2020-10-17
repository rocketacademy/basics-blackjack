//Global State Trackers
var numOfPlayers = 0;
var playerCumulativeScores = []; // cumulative amount of their $bet here
var computerCumulativeScore = 0;
var currentPlayerBets = []; //cumulative current amount of player bets
var currentPlayerEquity = []; //cumulative amount of equity each player has
// *** need to initiate the amount of player equity at the start of the game. ***//
// *** need to reduce the bet amount from player equity ***//

var allPlayersHands = []; //contains players' list of hands
var allComputerHands = [];//contain computer's list of hands

var gameState = '' //Restart & shuffle cards , deal cards, analyze winning conditions, hit or stand
var playerX = 1;

//
var splitHands = [];

//Create a new deck
var deck;

var printerGif = document.createElement('img');
    printerGif.setAttribute("id","vegas")
    printerGif.src = './pictures/vegas.gif';
    document.body.append(printerGif);

// function to remove gif and audio

var removeGIFandAudio = function() {
    removeElement('epicMusic');
    removeElement('shuffleCard');
}


var main = function (input) {

  var myOutputValue = '';
  // Create and shuffle deck
  if (gameState == '') {
    removeElement('vegas');

    //Shuffle Deck Gif Displayed and Audio
    var shuffleGif = document.createElement('img');
    shuffleGif.setAttribute("id","shuffleCard")
    shuffleGif.src = './pictures/shuffle.gif';


    var shuffleAudio = document.createElement('audio');
    shuffleAudio.setAttribute('id','epicMusic')
    shuffleAudio.src = './music/shuffle.mp3';
    shuffleAudio.autoplay = true;
    shuffleAudio.volume = 0.3;
  
    document.body.append(shuffleGif);
    document.body.append(shuffleAudio);

    deck = shuffleCards(makeDeck());

    console.log(deck, 'shuffledDeck');

    gameState = 'shuffledDeck';
    myOutputValue = `Shuffling the Deck...`;
    window.setTimeout(removeGIFandAudio,13300);

  }else if(gameState == `shuffledDeck`){

    myOutputValue = `Deck is shuffled. Please input the number of players.`;
    gameState = 'numOfPlayers';

    //Remove shuffling Gif & audio when clicked
    removeGIFandAudio();

  } else if (gameState == 'numOfPlayers') {
    if(input == ''){
           return myOutputValue = 'Please enter a number greater than 0 of players.';
    } else{
    numOfPlayers = Number(input);
    }
    for (i = 0; i < numOfPlayers; i += 1) {
      currentPlayerEquity[i] = 100; //initialize each player's equity amount by $100.
    }
    gameState = 'enterBet';
    playerX = 1;
    return myOutputValue = `You chose ${numOfPlayers} players. <br><br> All players have $100 to start with. <br><br><b>Please enter the $bet amount next for Player 1.<br>`;

  } else if (gameState == 'computerTurn') {
    //reveal facedown card & evaluate current score
    var displayComputerCards = displayAllComputerCards();
    myOutputValue = `Dealer reveals face down card and has cards ${displayComputerCards}.`;
    appendPictures('computer-hand',allComputerHands,'computer');
    gameState = 'autoHitOrStand';

    if (computerCumulativeScore == 21) {
      myOutputValue += `Blackjack! <br><br> Game results to be evaluated next.`;
    } else {
      myOutputValue += `<br><br> Click submit to see Dealer's next move.`
    }

  } else if (gameState == 'autoHitOrStand') {
    if (computerCumulativeScore < 17) {
      myOutputValue = computerDrawAddCard();
      appendPictures('computer-hand',allComputerHands,'computer');

    } else if (computerCumulativeScore > 21) {
      myOutputValue = `Computer has gone bust with score of ${computerCumulativeScore} . <br><br> Game results to be evaluated next. `;
      gameState = 'evaluateGame';
      playerX = 1; //reset to playerX = 1

    } else if (computerCumulativeScore <= 21 && computerCumulativeScore >= 17) {
      myOutputValue += `Computer shall stand with a score of ${computerCumulativeScore}, and evalute results next.`
      gameState = 'evaluateGame'
      playerX = 1; //reset to playerX = 1
      console.log(computerCumulativeScore, 'computerCumulativeScore');
    };

    //calculate the probability of drawing another card that is higher than the highestHand in the allPlayersHands

  } else if (gameState == 'evaluateGame') {
    var i = playerX - 1;
    while (i < numOfPlayers) {
      console.log(i, 'value of i');
      // if Dealer busts and player did not bust
      if (computerCumulativeScore > 21) {
        if (playerCumulativeScores[i] <= 21) {

          if (playerCumulativeScores[i] == 21 && allPlayersHands[i].length == 2) {
            //player wins 1.5x their bet
            currentPlayerEquity[i] += currentPlayerBets[i] + currentPlayerBets[i] * 1.5;
            myOutputValue = `Blackjack! Player ${playerX} wins 1.5x his initial bet of $${currentPlayerBets[i]}. ${displayEquity(playerX)}.`
            console.log(allComputerHands[i], `currentplayer's hand`);

          } else {
            //player wins 2x their bet
            currentPlayerEquity[i] += currentPlayerBets[i] + currentPlayerBets[i] * 2;
            myOutputValue = `Player ${playerX} wins 2x his initial bet of $${currentPlayerBets[i]} with a score of ${playerCumulativeScores[i]} against computer's score of ${computerCumulativeScore}. ${displayEquity(playerX)}.`
          }
        } else {
          //dealer busts and player busts
          //player retains initial bet
          currentPlayerEquity[i] += currentPlayerBets[i];
          myOutputValue = `Both have gone bust! Player ${playerX} retains his initial bet of $${currentPlayerBets[i]}. ${displayEquity(playerX)}.`
        }
      } else if (computerCumulativeScore <= 21) { // if computer did not bust 
        if (playerCumulativeScores[i] > 21) { // if computer did not bust and player busts
          myOutputValue = `Player ${playerX} went bust while Dealer did not. Player ${playerX} loses the initial bet of $${currentPlayerBets[i]}. ${displayEquity(playerX)}.`

        } else if (playerCumulativeScores[i] == 21 && allPlayersHands[i].length == 2) {
          currentPlayerEquity[i] += currentPlayerBets[i] + currentPlayerBets[i] * 1.5;
          myOutputValue = `Blackjack! Player ${playerX} wins 1.5x his initial bet of $${currentPlayerBets[i]}. ${displayEquity(playerX)}.`
          console.log(allComputerHands[i], `currentplayer's hand`);

          //else if computer and player both did not bust...
        } else if (playerCumulativeScores[i] > computerCumulativeScore) {
          //player wins 2x their bet
          currentPlayerEquity[i] += currentPlayerBets[i] + currentPlayerBets[i] * 2;
          myOutputValue = `Player ${playerX} wins 2x his initial bet of $${currentPlayerBets[i]} with a score of ${playerCumulativeScores[i]} against computer's score of ${computerCumulativeScore}. ${displayEquity(playerX)}.`

        } else if (playerCumulativeScores[i] < computerCumulativeScore) {
          //player loses initial bet
          myOutputValue = `Player ${playerX} loses his initial bet of $${currentPlayerBets[i]} with a score of ${playerCumulativeScores[i]} against computer's score of ${computerCumulativeScore}. ${displayEquity(playerX)}.`
        } else { // it is a draw
          //player retains initial bet
          currentPlayerEquity[i] += currentPlayerBets[i];
          myOutputValue = `It is a draw! Player ${playerX} retains his initial bet of $${currentPlayerBets[i]} with a score of ${playerCumulativeScores[i]} against computer's score of ${computerCumulativeScore}. ${displayEquity(playerX)}.`
        }
      }

      console.log(currentPlayerBets[i], 'currentPlayerBet');
      console.log(currentPlayerEquity[i], 'currentPlayerEquity');
      playerX += 1;
      i += 1;

      return myOutputValue;
    }

    if (i == numOfPlayers) {
      gameState = 'restartGame';
      clearBox('player-hand');
      clearBox('computer-hand');

       //Shuffle Deck Gif Displayed and Audio
    var shuffleGif = document.createElement('img');
    shuffleGif.setAttribute("id","shuffleCard2")
    shuffleGif.src = './pictures/clapping.gif';


    var shuffleAudio = document.createElement('audio');
    shuffleAudio.src = './music/shuffle.mp3';
    shuffleAudio.setAttribute('id','epicMusic');
    shuffleAudio.autoplay = true;
    shuffleAudio.volume = 0.3;

   document.body.append(shuffleGif);
   document.body.append(shuffleAudio);
      return myOutputValue = `Thanks for playing! Press submit to start the next round.`;
    }

  } else if (gameState == 'restartGame') {
    
    removeElement('epicMusic');
    removeElement('shuffleCard2');

    deck = shuffleCards(makeDeck());

    

    //reinitialize global states to restart game
    playerCumulativeScores = [];
    computerCumulativeScore = 0;
    currentPlayerBets = [];
    allPlayersHands = [];
    allComputerHands = [];
    playerX = 1;

    gameState = 'enterBet';
    return myOutputValue = 'Deck is reshuffled. Player 1 to enter $ bet next.'
  }

  //The entire process from each player entering a bet to players choosing to hit or stand & evaluating their results if they win blackjack or exceed 21 points.
  while (playerX <= numOfPlayers) { // To ask for input 1 by 1 using the while and nested if
    if (gameState == 'enterBet' && playerX < numOfPlayers) {
      myOutputValue = playersEnterBets(input) + `<br>Please enter the bet for Player ${playerX + 1} next.`;
      playerX += 1;

    } else if (gameState == 'enterBet' && playerX == numOfPlayers) {
      myOutputValue = playersEnterBets(input) + ` Cards will be dealt next to each player`;
      playerX = 1;
      gameState = 'deal';

    } else if (gameState == 'deal' && playerX <= numOfPlayers) {

       // to display everything at 1 shot using while + if 

      while(playerX <= numOfPlayers){
        if(playerX == 1){
          myOutputValue = dealTwoCardsToPlayer() + dealTwoCardsToDealer() + `<br><br><b>Submit 's' to stand and 'h' to hit.` ;
        } else {
        myOutputValue = dealTwoCardsToPlayer() + `<br><br><b>Submit 's' to stand and 'h' to hit.<b>`;
        }
      
        appendPictures('player-hand', allPlayersHands[playerX-1],'player');
        console.log('append pictures');
        gameState = 'hitOrStand'
        return myOutputValue;
      }

    }else if (gameState == 'hitOrStand' && playerX <= numOfPlayers) {
      console.log(playerX, 'playerX');
      var i = playerX - 1;
      
      while (playerX <= numOfPlayers) {
        
        //Intermediate Result #1
        if (playerCumulativeScores[i] < 17) {
          
          myOutputValue = `Player ${playerX}, your existing score is ${playerCumulativeScores[i]}. You need to draw another card.` + playerDrawAddCard() + `<br><br><b>Submit 's' to stand and 'h' to hit.`;
          
          appendPictures('player-hand', allPlayersHands[playerX-1]);
          console.log([playerX-1]);

          return myOutputValue;
          //End Result #1 = Blackjack
        } else if (playerCumulativeScores[i] == 21 && allPlayersHands[i].length == 2) {
          myOutputValue = `Blackjack! Player ${playerX} wins the round with ${allPlayersHands[i][0].name} & ${allPlayersHands[i][1].name}.` + outputNextPlayer();
 
          playerX += 1;
          return myOutputValue;
          //End Result #2 = user's score is more than 21 and loses automatically
        } else if (playerCumulativeScores[i] > 21) {

          myOutputValue = `Player ${playerX} is bust! His or her current points of ${playerCumulativeScores[i]} is more than 21.` + outputNextPlayer();
          
          playerX += 1;
          return myOutputValue;

        } else if (playerCumulativeScores[i] == 21) {

          myOutputValue = `Player ${playerX} has reached 21 points. Player ${playerX + 1} shall choose next.`;
          playerX += 1;
          gameState = 'deal';

          return myOutputValue;
        } else if (input == 'h') {
       
          myOutputValue = `Player ${playerX} current score is ${playerCumulativeScores[i]} and he chooses to hit.` + playerDrawAddCard();
          //clearBox('player-hand');
          appendPictures('player-hand', allPlayersHands[playerX-1],'player');

           return myOutputValue; 
        } else if (input == 's') {

          myOutputValue = `Player ${playerX} chooses to stand. No new card is drawn. <br> Your current score is now ${playerCumulativeScores[i]}.` + outputNextPlayer();

          playerX += 1;
          return myOutputValue;

        } else {
          console.log(playerX, 'playerX');
          var displayedCards = displayExistingCards();
          myOutputValue = `Player ${playerX}, your existing cards are ${displayedCards} with a total score of ${playerCumulativeScores[i]}.<br><br><b>Submit 's' to stand and 'h' to hit.`;
          return myOutputValue;
        }

      }
    }
    return myOutputValue;
  }
  return myOutputValue;
};


var displayEquity = function (playerX) {
  var i = playerX - 1;
  appendPictures('player-hand',allPlayersHands[i],'player');
  return myOutputValue = `<br><br> Player ${playerX} now has a total equity of $${currentPlayerEquity[i]}`;

}


var computerDrawAddCard = function () {
  var addCard = deck.pop();

  console.log(addCard, 'addCard');

  allComputerHands.push(addCard);

  if (addCard.name == 'Ace' && computerCumulativeScore <= 10) {
    computerCumulativeScore[playerX - 1] += addCard.score;
  } else if (addCard.name == 'Ace' && computerCumulativeScore > 10) {
    computerCumulativeScore += 1;
  } else {
    computerCumulativeScore += addCard.score
  }

  return `Dealer drew ${addCard.name}. <br><br>Dealer total score is now ${computerCumulativeScore}.`;
}

var displayAllComputerCards = function () {

  var i = 0;
  var myOutputValue = '';

  while (i < allComputerHands.length) {
    computerCumulativeScore += allComputerHands[i].score;
    if (i == allComputerHands.length - 1) {
      myOutputValue += allComputerHands[i].name
    } else {
      myOutputValue += ' ' + allComputerHands[i].name + ', ';
    }
    console.log(myOutputValue);
    i += 1;
  }
  myOutputValue += `<br> Dealer's total score is ${computerCumulativeScore}`;
  return myOutputValue;


}

//Displays Players' existing cards
var displayExistingCards = function () {
  var i = 0;
  var myOutputValue = '';
  while (i < allPlayersHands[playerX - 1].length) {
    if (i == allPlayersHands[playerX - 1].length - 1) {
      myOutputValue += allPlayersHands[playerX - 1][i].name
    } else {
      myOutputValue += ' ' + allPlayersHands[playerX - 1][i].name + ', ';
    }
    console.log(myOutputValue);
    i += 1;
  }


  return myOutputValue;
}

//Output template for showing who is the next player
var outputNextPlayer = function () {
  if (playerX < numOfPlayers) {
    var myOutputValue = `<br><br> Player ${playerX + 1} is next.`;
    gameState ='deal';
  } else {
    var myOutputValue = '<br><br> Computer turn next.';
    gameState = 'computerTurn';
  }
  return myOutputValue;
}
//Function that allows player to draw a card when 'h' is pressed
var playerDrawAddCard = function () {
  var addCard = deck.pop();

  console.log(addCard, 'addCard');


  if (addCard.name == 'Ace' && playerCumulativeScores[playerX - 1] <= 10) {
    playerCumulativeScores[playerX - 1] += addCard.score;
  } else if (addCard.name == 'Ace' && playerCumulativeScores[playerX - 1] > 10) {
    playerCumulativeScores[playerX - 1] += 1;
  } else {
    playerCumulativeScores[playerX - 1] += addCard.score
  }

  allPlayersHands[playerX - 1].push(addCard);

  return `You drew ${addCard.name}. <br><br>Your total current points is now ${playerCumulativeScores[playerX - 1]}.`;
}

//Players will enter their bet amounts
var playersEnterBets = function (input) {
  currentPlayerBets.push(Number(input));
  currentPlayerEquity[playerX - 1] -= Number(input);
  console.log(currentPlayerEquity, 'currentPlayerEquity');
  return `Player ${playerX} has chosen a bet of $${input}.`;
}

//Deal 2 cards to a player
var dealTwoCardsToPlayer = function () {
  var playerHand = []; //creating a single player's hand 
  var myOutputValue = "";
  var totalPoints = 0;

  var card1 = deck.pop();
  var card2 = deck.pop();

  playerHand.push(card1);
  playerHand.push(card2);



  allPlayersHands.push(playerHand); //[[0,1], [  ], [  ]]
  console.log(allPlayersHands, `storing each player's hand`);

  if (playerHand[0].name == 'Ace' && playerHand[1].name == 'Ace') {
    totalPoints = 2;
  } else {
    totalPoints = playerHand[0].score + playerHand[1].score;
  }

  playerCumulativeScores.push(totalPoints);

  myOutputValue = `Player ${playerX} is dealt ${allPlayersHands[playerX - 1][0].name} and ${allPlayersHands[playerX - 1][1].name} and has a current total score of ${totalPoints}.`;

  //Creating the display for the cards
  // var playerDisplay = document.querySelector('#player-hand');
  // var listCards = document.createElement('ul');
  // console.log(playerHand);

  // for(i=0;i<playerHand.length;i++){
  //   var cardImage = displayVirtualCards(playerHand[i]);
  //   var imageTag = document.createElement('img');
  //   imageTag.src = cardImage;
  //   console.log(cardImage,'cardImage');
  //   listCards.appendChild(imageTag);
  //   playerDisplay.appendChild(listCards); 
  // }

  return myOutputValue;

}

//Deal 2 cards to the dealer, with the 2nd card faced down
var dealTwoCardsToDealer = function () {
  var myOutputValue = "";
  var card1 = deck.pop();
  var card2 = deck.pop();

  allComputerHands.push(card1);
  allComputerHands.push(card2);


  totalScore = allComputerHands[0].score

  myOutputValue = `<br><br>Computer is dealt ${allComputerHands[0].name} and a faced down card. It has a current visible score of ${totalScore}.`;

   //Creating the display for the cards
  var computerDisplay = document.querySelector('#computer-hand');
  computerDisplay.innerText = `Computer's hand:`;
  var listCards = document.createElement('ul');
  
  var cardImage = displayVirtualCards(allComputerHands[0]);
  var imageTag = document.createElement('img');
  imageTag.src = cardImage;
  listCards.appendChild(imageTag);
  computerDisplay.appendChild(listCards);

  
  return myOutputValue;
}

//Cards is an array of card objects
var shuffleCards = function (deck) {
  var currentIndex = 0;
  // loop over the entire cards array
  while (currentIndex < deck.length) {
    // select a random position from the deck
    var randomIndex = getRandomIndex(deck.length);
    // get the current card in the loop
    var currentItem = deck[currentIndex];
    // get the random card
    var randomItem = deck[randomIndex];
    // swap the current card and the random card
    deck[currentIndex] = randomItem;
    deck[randomIndex] = currentItem;
    currentIndex = currentIndex + 1;
  }
  // give back the shuffled deck
  return deck;
};

//Get a random index from an array given it's size
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

//Creates a deck
var makeDeck = function () {

  // create an empty deck at the start

  var deck = [];

  var suits = ['heart', 'diamond', 'club', 'spade'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {

    // make a variable of current suit
    var currentSuit = suits[suitIndex];
    //console.log("current suit : " + currentSuit)

    //loop to create all cards in this suit
    // rank 1 - 13

    var rankCounter = 1; // start from card value = 1 or Ace
    while (rankCounter <= 13) {

      //Since rank counter is equals to cardName most of the time:
      var cardName = rankCounter;


      //For special cases where number is 1, 11, 12 ,13

      if (cardName == 1) {
        cardName = 'Ace';
      } else if (cardName == 11) {
        cardName = 'Jack';
      } else if (cardName == 12) {
        cardName = 'Queen';
      } else if (cardName == 13) {
        cardName = 'King';
      }

      var scoreCounter = rankCounter;

      if (cardName == 'Ace') {
        scoreCounter = 11;
      } else if (cardName == 'Jack' || cardName == 'Queen' || cardName == 'King') {
        scoreCounter = 10;
      }


      //making a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: scoreCounter
      };

      //console.log("rank : " + rankCounter);

      //push the card into the deck
      deck.push(card);

      rankCounter = rankCounter + 1;

    }

    suitIndex = suitIndex + 1;

  }
  return deck;

}

//Not used yet
var newTwoCardDealToPlayer = function (i) {
  var firstCard = deck.pop();
  var secondCard = deck.pop();
  // var card1 = 

  if (firstCard.rank == secondCard.rank) {
    splitHands[i] = true;
    var thirdCard = deck.pop();
    var fourthCard = deck.pop()
    // var hand = {
    //   hand1:{

    //   }
    // }
    allPlayersHands[i].hand1.card1 = firstCard;
    allPlayersHands[i].hand1.card2 = thirdCard;

    allPlayersHands[i].hand2.card1 = secondCard;
    allPlayersHands[i].hand2.card2 = fourthCard;

    myOutputValue = `Player ${playerX} drawn 2 cards ${firstCard.name} & ${secondCard.name} of the same rank. 
    
    <br><br> The cards are split into two hands: 
    <br>Hand 1: ${firstCard.name} & ${thirdCard.name}.
    <br>Hand 2: ${secondCard.name} & ${fourthCard.name}.
    `

  } else {
    splitHands[i] = false;
    allPlayersHands[i].hand1.card1 = firstCard;
    allPlayersHands[i].hand1.card2 = secondCard;
    myOutputValue = `Player ${playerX} has drawn 2 cards, ${firstCard.name} & ${secondCard.name}.`
  }

  return myOutputValue;

}
//Not used yet
var newDealToPlayer = function () {
  var firstCard = deck.pop();
  var playerHands = [];
  playerHands[0].hand1 = firstCard;

  return playerHands;
}

var displayVirtualCards = function(card){
  var imgSrc='';
  //get directory for each of the cards
    imgSrc ='./Single_Cards/'+card.suit.toUpperCase()+ '-' +card.rank;
    console.log(imgSrc,'imgSrc');
    if(card.rank >= 11 && card.rank <= 13){
      imgSrc +='-'+ card.name.toUpperCase();
    }
    imgSrc += '.svg';
    console.log(imgSrc,'imgSrc');
    
  return imgSrc;
}

var displayShufflingAudio = function(){
  var sound = document.createElement('audio');
  sound.src = './music/shuffle.mp3';
  return sound.src;
}

var clearBox = function(elementID){
  document.getElementById(elementID).innerHTML = "";
}

var appendPictures = function(id,playerHand,person){
  clearBox(id);
  var elementID = '#'+id;
  var playerDisplay = document.querySelector(elementID);

  if(person == 'player'){
    playerDisplay.innerText = `Player ${playerX}'s hand:`;
  } else {
    playerDisplay.innerText = `Computer's hand:`;
  }

  var listCards = document.createElement('ul');
  
  for(i=0;i<playerHand.length;i++){
    var cardImage = displayVirtualCards(playerHand[i]);
    var imageTag = document.createElement('img');
    imageTag.src = cardImage;
    console.log(cardImage,'cardImage');
    listCards.appendChild(imageTag);
    playerDisplay.appendChild(listCards); 
  }
}

var removeElement = function(elementId){
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}
//
  // 
  //
  //  if (person == 'player'){
  // playerDisplay.innerText = `Player ${playerX}'s hand:`
  // } else {
  //   playerDisplay.innerText = `Computer's hand:`
  // }