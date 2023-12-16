var gameStarted = false
var playerTurn = 0
var endGame = false
var cpuPlaying = false
var gameInitialized = false
var balanceTracker = []
const balancePrototype = {
  PlayerID : 0,
  Balance : 100
}

var main = function (input,bet) {
  var output = '';
  if(gameStarted == true && endGame == false){
    if(playerTurn != 0){ //attempting cpu choice
      input = computerChoice(playerRecords,playerTurn)
      cpuPlaying = true
      if(balanceTracker[playerTurn].Balance<1){
        playerRecords[playerTurn].isWinner = "bankrupt"
        playerTurn++
        return "This player is bankrupt!<br>skipping turn."
      }
      if(playerTurn<numberOfPlayers){//i<5 cause max cards in blackjack is 5
        if(input == !"h" || !"s" ) return `Player ${playerTurn+1}'s cards are ${convertCardsIntoReadable(playerRecords[playerTurn].playerCardInfo)} press h to hit or s to stand`
        if(input == "h"){
           [deck, currentHand] = drawCard(deck,playerRecords[playerTurn].playerCardInfo,playerRecords[playerTurn].playerID) //drawCard function returns two values
           playerRecords[playerTurn].playerCardInfo = currentHand
           output = `Player ${playerTurn+1} chose to hit.<br>Player ${playerTurn+1}'s cards are ${convertCardsIntoReadable(playerRecords[playerTurn].playerCardInfo)}` 
        }
        
        if(input == "s" || playerRecords[playerTurn].playerCardCount === 5){
          output = `Player ${playerTurn+1} stands.<br>Player ${playerTurn+1}'s cards are ${convertCardsIntoReadable(playerRecords[playerTurn].playerCardInfo)}<br>It is now player ${playerTurn+2}'s turn`
          if(playerTurn == numberOfPlayers-1){
            //endgame
            endGame = true
            return "press submit to view all player's cards and see the winner!"
          }
          playerTurn++
        }
      }
    }
    //above code is for computer input processing
    if(cpuPlaying == false){
    if(playerTurn<numberOfPlayers){//i<5 cause max cards in blackjack is 5
      if(input == !"h" || !"s" ) return `Player ${playerTurn+1}'s cards are ${convertCardsIntoReadable(playerRecords[playerTurn].playerCardInfo)} press h to hit or s to stand`
      if(input == "h"){
         [deck, currentHand] = drawCard(deck,playerRecords[playerTurn].playerCardInfo,playerRecords[playerTurn].playerID) //drawCard function returns two values
         playerRecords[playerTurn].playerCardInfo = currentHand
         output = `Player ${playerTurn+1}'s cards are ${convertCardsIntoReadable(playerRecords[playerTurn].playerCardInfo)}` 
      }
      
      if(input == "s" || playerRecords[playerTurn].playerCardCount === 5){
        output = `player ${playerTurn+1}'s cards are ${convertCardsIntoReadable(playerRecords[playerTurn].playerCardInfo)}<br>It is now player ${playerTurn+2}'s turn`
        if(playerTurn == numberOfPlayers-1){
          //endgame
          endGame = true
          return "press submit to view all player's cards and see the winner!"
        }
        playerTurn++
      }
    }
  }

    //above code is for user input processing
  }

  if(endGame == true){
    playerRecords = assignValue(playerRecords) //this is correct fk vscode its supposed to be playerRecords pls dont change it
    var playerScores = calculateScore(playerRecords) //this too
    //console.log(playerScores) //returns an array of objects with scores from player 1 to 5 [{ID,score,isBust},{ID,score,isBust}...] 
    //array get last index (banker) and compare with all players to see who won
    playerRecords = findWinnersAndLosers(playerScores,playerRecords,balanceTracker)
    for(i=0;i<playerRecords.length-1;i++){
      output += `Player ${playerRecords[i].playerID+1} ${playerRecords[i].isWinner} with card value of ${playerScores[i].score}<br>` 
    }
    output += `Player ${playerRecords[playerRecords.length-1].playerID+1} was the banker with card value of ${playerScores[playerRecords.length-1].score}`


    //reset card values and deck ONLY
    endGame = false
    gameStarted = false
    playerTurn = 0
    cpuPlaying = false

    //update balances
    balanceTracker = updateBalance(playerRecords,numberOfPlayers,balanceTracker,bet)
    balanceField.innerHTML = balanceTracker[0].Balance

    for(i=0;i<numberOfPlayers;i++){
      var scoreboard = document.querySelector("#display"+`${i}`)
      scoreboard.innerHTML = `Player ${i}'s balance: ` + balanceTracker[i].Balance
    }

    //kick bankrupt players
    //[playerRecords,numberOfPlayers] = kickBrokePpl(playerRecords,balanceTracker,numberOfPlayers)

    console.log(playerRecords,"playerrec")
    console.log(balanceTracker,"baltrack")
    if(balanceTracker[0].Balance < 1){
      gameInitialized = false
      endGame = false
      gameStarted = false
      playerTurn = 0
      cpuPlaying = false
      return "Oh no! you lost all your money!<br>The game is now over!"
    }
    console.log(numberOfPlayers,"numofplayets")
    console.log(balanceTracker,"baltraker")
    if(balanceTracker[numberOfPlayers-1].Balance < 1){
      gameInitialized = false
      endGame = false
      gameStarted = false
      playerTurn = 0
      cpuPlaying = false
      return "Congratulations! you have robbed the banker off his fortune!<br>The game is now over!"
    }

    return output
  }

  
  if(gameInitialized == false){
    if(input < 2 || input > 5 || isNaN(input) || input.length == 0) return "Please enter number of players 2-5.<br>Dealer inclusive"
    numberOfPlayers = input
    gameInitialized = true
    balanceTracker = initBalance(numberOfPlayers)
    return `${numberOfPlayers} players are playing, there will be ${numberOfPlayers-1} cpu players.`
  }

//this will run first on program start after gameInitialized, playerRecords is defined when this runs
  if(gameStarted == false){
    deck = makeDeck()
    deck = shuffleDeck(deck);
    [deck,playerRecords] = initialDealCards(deck,numberOfPlayers)
    return `Your cards are ${convertCardsIntoReadable(playerRecords[playerTurn].playerCardInfo)}</br>Type h to hit and s to stand`
  }

return output
};

//unused function cause splice causes SO MUCH ERRORS cause it edits playerrecords length which causes all the references to just up and die
// replaced it with simply giving broke ppl a broke status so the game doesnt count them in anymore
// bankrupt players still draw cards but i dont have time to fix it cause it doesnt really affect gameplay and class is in 2 hours lol

// function kickBrokePpl(playerRecords,balanceTracker,numberOfPlayers){
//   var toBeKicked = []
//   var numberBooted = 0
//   var tempRecord = []
//   for(i=0;i<numberOfPlayers-1;i++){
//     if(balanceTracker[i].Balance < 1){
//       console.log("how many times do i run")
//       toBeKicked.push(balanceTracker[i].playerID)
//       numberBooted++
//     }
//   }
//   numberOfPlayers -= numberBooted
// console.log(toBeKicked,"tobekicked")  //tobekicked holds playerID of player tobekicked

    
//     for(i=0;i<playerRecords.length;i++){  
//       console.log(playerRecords[i].playerID)
//     if(toBeKicked.includes(playerRecords[i].playerID)){ //if an ID in tobekicked is found in ID in playerrecords, splice that 
//       console.log("spliec!")
//       tempRecord.push(i)
//     }
//   }
     
// console.log(tempRecord,"temperc")
//   for(i=0;i<tempRecord.length;i++){
//     console.log("kicking someon", tempRecord[i])
//     playerRecords.splice(tempRecord[i],1)
//     balanceTracker.splice(tempRecord[i],1)
//   }

//   return [playerRecords,numberOfPlayers]
// }


//something to keep track of balance and remove players if their balance hits 0
//to be called at the end of every game
//updates balanceTracker array cause playerRecords gets reinit every game
//balanceTracker will hold playerID and balance ONLY
function updateBalance(playerRecords,numberOfPlayers,balTrackerInArray,bet){
  console.log(balTrackerInArray,"baltrack in func")

 //playerRecords has PlayerID that matches with PlayerID in balTrackerInArray
 //looking at isWinner, take bet amount and either add or - from the balance
 var winTracker = []
  for(i=0;i<numberOfPlayers-1;i++){
    winTracker.push(playerRecords[i].isWinner)
  }
  for(i=0;i<numberOfPlayers-1;i++){
    if(winTracker[i] == "Wins" ){
      balTrackerInArray[i].Balance += bet //add balance to player
      balTrackerInArray[numberOfPlayers-1].Balance -= bet  //minus balance from banker
    }
    if(winTracker[i] == "Loses"){
      balTrackerInArray[i].Balance -= bet   //vice  versa
      balTrackerInArray[numberOfPlayers-1].Balance += bet
    }
  }
  return balTrackerInArray
}

//creates a tracker on game start
function initBalance(numberOfPlayers){
  var balanceTracker = []
  for(i=0;i<numberOfPlayers-1;i++){
    const x = Object.create(balancePrototype)
    x.playerID = i
    x.Balance = 100
    balanceTracker.push(x)
  }
  const banker = Object.create(balancePrototype)
   banker.playerID = numberOfPlayers-1
   banker.Balance = 1000
  balanceTracker.push(banker)
  console.log(balanceTracker)
  return balanceTracker
}


//enable cpu playing for other players functionality
function computerChoice(playerRecords,playerTurn){
  playerRecords = assignValue(playerRecords)
  currentHandValue = calculateScore(playerRecords)
  
  var currentHandValue = currentHandValue[playerTurn].score
  var returnHandle = ''
  if(currentHandValue > 19){
    returnHandle = "s"
  }
  if(currentHandValue == 19){
    if(Math.random() < 0.2){
      returnHandle = "h"
    } else returnHandle = "s"
  }
  if(currentHandValue == 18){
    if(Math.random() < 0.4){
      returnHandle = "h"
    } else returnHandle = "s"
  }
  if(currentHandValue == 17){
    if(Math.random() < 0.6){
      returnHandle = "h"
    } else returnHandle = "s"
  }
  if(currentHandValue == 16){
    if(Math.random() < 0.8){
      returnHandle = "h"
    } else returnHandle = "s"
  }
  if(currentHandValue < 16){
    returnHandle = "h"
  }
  return returnHandle
  //will not draw when >20
  //very low chance on 19
  //low chance on 18
  //chance on 17
  //high chance on 16
  //will draw <15
}



function findWinnersAndLosers(playerScores,playerRecords,balanceTracker){ //playerScores returns an array of objects [{ID,score,isBust},{ID,score,isBust}...] 
  var bankerScore = playerScores.pop()//apparantly popping arrays remove the element from ALL iterations of that array so i cant pop playerRecords
  var scoreIsWinHandler = []
  var scoreIsDrawHandler = []
  var bankruptFilter = []  //contain player IDs who have been bankrupt, prevent them from getting an isWinner state

  console.log(balanceTracker)
  for(i=0;i<balanceTracker.length;i++){
    if(balanceTracker[i].Balance<1){
      bankruptFilter.push(balanceTracker[i].playerID)
    }
  }
  
  //need to filter out the entire object based on one element either isBust or score
  if(bankerScore.isBust == false){ //if banker didnt bust, need to compare scores
    scoreIsDrawHandler = playerScores.filter(obj => obj.score == bankerScore.score)
    scoreIsWinHandler = playerScores.filter(obj => (obj.score > bankerScore.score)) //i thought this would record double and overwrite but it doesnt... tf is happening?
    scoreIsWinHandler = scoreIsWinHandler.filter(obj => obj.isBust == false)
  } 
  if(bankerScore.isBust == true){ //if banker busted, just check for who didnt bust
    scoreIsWinHandler = playerScores.filter(obj => obj.isBust == false)
  }
  for(i=0;i<scoreIsWinHandler.length;i++){ //gives all players in temparray handler a win state
    scoreIsWinHandler[i].isWinner = "Wins"
  }
  for(i=0;i<scoreIsDrawHandler.length;i++){ //gives all players in draw handler a draw state
    scoreIsDrawHandler[i].isWinner = "Draws"
  }
  //something is happening here where the win and draw handlers are updating the playerscore.isWinner SOMEHOW IDK HOW.
  //maybe cause i used the .isWinner so much it somehow updates each other even tho they in diff objects. send help.
  //but it works so..
  // console.log(bankerScore,"bankerscore")
  // console.log(scoreIsWinHandler,"scorewinhandle") //returns eg. {playerID: 0, score: 21, isBust: false, isWinner: 'true'}
  // console.log(scoreIsDrawHandler,"scoredrawhandle")
  // take the playerID and isWinner keys and pass it back to playerRecords to update it
  for(i=0;i<playerScores.length;i++){
    if(!('isWinner' in playerScores[i])){
      playerScores[i].isWinner = "Loses"
    }
  }
  // console.log(playerScores,"playerscores")
playerScores.push(bankerScore)
  for(i=0;i<playerScores.length;i++){ //adding keys from playerScores to playerRecords
    playerRecords[i].isWinner = playerScores[i].isWinner
  }



  //find playerID in playerrecords that are in bankruptfilter and changer their iswinner to a null value
  for(i=0;i<playerRecords.length;i++){
    if(bankruptFilter.includes(playerRecords[i].playerID)){
      playerRecords[i].isWinner = "bankrupt"
    }
  }


  return playerRecords
}


//need a function to assign value of the cards to playerRecords[x].playerCardInfo[y].value
//does stuff like KQJ = 10, A == 11||10||1, etc.
function assignValue(playerRecords){
  var index = 0
  while(index<playerRecords.length){
    for(i=0;i<playerRecords[index].playerCardCount;i++){
      //find all cards player has then assign value to each of them accordingly
      if(playerRecords[index].playerCardInfo[i].name === "A"){
        if(playerRecords[index].playerCardCount == 2){
          playerRecords[index].playerCardInfo[i].value = 11
        }
        if(playerRecords[index].playerCardCount == 3){
          playerRecords[index].playerCardInfo[i].value = 10
        } 
        if(playerRecords[index].playerCardCount >= 4) {
          playerRecords[index].playerCardInfo[i].value = 1
        }
      }
      else if(playerRecords[index].playerCardInfo[i].name === "K" || playerRecords[index].playerCardInfo[i].name === "Q" || playerRecords[index].playerCardInfo[i].name === "J"){
        playerRecords[index].playerCardInfo[i].value = 10
      }
      else {
        playerRecords[index].playerCardInfo[i].value = playerRecords[index].playerCardInfo[i].name
      }
    }
    index++
  }
  return playerRecords
}

function calculateScore(playerRecords){ //get total rank of each player
   //total rank value of cards of a player
  var tempArrayHandler = []
  var index = 0
  while(index<playerRecords.length){
    var tempScoreHandler = 0
    for(i=0;i<playerRecords[index].playerCardCount;i++){
      tempScoreHandler += playerRecords[index].playerCardInfo[i].value
    }
    var playerScores = {
      playerID: 0,
      score: 0,
      isBust: false
    }
    playerScores.playerID = index
    playerScores['score'] = tempScoreHandler 
    if(tempScoreHandler>21){
      playerScores['isBust']=true
    }
    tempArrayHandler.push(playerScores)
    index++
  }
  // console.log(tempArrayHandler,"temparrayhandler")
  return tempArrayHandler
}



//cardHand will be an array 
function convertCardsIntoReadable(currentHand){  //send in playerCardInfo
cardArray = []
returnString = ''
for(i=0;i<currentHand.length;i++){
  cardArray.push(`${currentHand[i].name}${currentHand[i].suit}, `)
  returnString += cardArray[i]
}
return returnString
}




function drawCard(deck,playerCardInfo,playerID){
  playerCardInfo.push(deck.pop())
  playerRecords[playerID].playerCardCount++
  return ([deck,playerCardInfo])
}


function initialDealCards(deck,numberOfPlayers){   //reusalbe except balance
  var playerRecords = []
  var playerIndex = 0
  var cardIndex = 0
  while(playerIndex < numberOfPlayers){
    playerRecords[playerIndex] = {
      playerID: playerIndex,
      playerCardCount: 0,
      playerCardInfo: [],
      // playerBalance: 100
    }
    playerIndex++
  }
  while(cardIndex < 2){
    for(i=0;i<numberOfPlayers;i++){
      playerRecords[i].playerCardInfo.push(deck.pop())
      playerRecords[i].playerCardCount++
    }
    cardIndex++
  }
  gameStarted = true
  return([deck,playerRecords])
}



function shuffleDeck(deck){  //resuable
  var newDeck = []
  var deckIndex = 0
  var decklength = deck.length
  while(deckIndex<decklength){
    //randomise card draw 
    var randomcard = deck[Math.floor(Math.random()*deck.length)]
    newDeck.push(randomcard)
    //filters out the card that was drawn
    deck = deck.filter(val => newDeck.indexOf(val) == -1)
    deckIndex++
  }
  return newDeck
}



var makeDeck = function () {   //reusalbe
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['♥️', '♦️', '♣️', '♠️'];

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
        cardName = 'A';
      } else if (cardName == 11) {
        cardName = 'J';
      } else if (cardName == 12) {
        cardName = 'Q';
      } else if (cardName == 13) {
        cardName = 'K';
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
