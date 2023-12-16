/* --- Blackjack ---
-User Input: Hit, Stand, or <click> to proceed
-Number of players: Minimum one
---Standard---
Rules: Normal Blackjack*/

// Main Menu constants
const BACK='back';
const MAIN='main';
const NAMES='names';
const OPTIONS='options';
const PLAY='play';
// Options Menu constants
const BET='bet';
const SPLIT='split';
const FALSE='false';
const TRUE='true';
// Names Menu constants
const ADD='add';
const REMOVE='remove';
const VIEW='view';
// Input Handler constants
const CONTINUE='continue';
const HIT='hit';
const STAND='stand';
const BUST='bust';
const WIN='win';
const DRAW='draw';
// Menu Options
const mainMenuOptions='---Blackjack Main Menu---<br>Key in your selected option!<br>PLAY --- Start a new game!<br>OPTIONS --- Change your game options!<br>NAMES --- Change the namelist of players!<br>BACK ---Return to Main Menu';
const namesMenuOptions='Please choose the following options:<br>VIEW --- View all currently stored names<br>ADD ---Add a name to the list<br>REMOVE ---Remove a name from the list<br>BACK ---Return to Main Menu';
const optionsMenuOptions='Please choose the following options:<br>BET --- The game now tracks your money earned/lost!<br>SPLIT --- The game now allows hand-splitting!<br>BACK --- Return to Main Menu';
// Directory Settings
var mainMode=MAIN;
var subMode=MAIN;
// Permanent Settings - change in menus
var betMode=FALSE;
var splitMode=FALSE;
var nameListMain=['Player 1']; //edited to include by default
// Temporary Settings: Clears after every round / game
var latestResult='';
var gameStage=0;
var shuffledDeck=[];
var playerHand=[];
var dealerHand=[];
var dealerCard='';
var nameCount=0;
var dealerSum=0;

var generateShuffledDeck=function(){      // Generates a new shuffled deck
  var cardValue=1;
  var suitCount=0;
  var suitType = ['clubs', 'diamonds', 'hearts', 'spades'];
  var cardDeck=[];
  while (suitCount<suitType.length){    // Generate card deck first
    var cardSuit=suitType[suitCount]
    var cardCount=1;
    while (cardCount<14){
      cardName=cardCount+' of '+suitType[suitCount];
      cardValue=cardCount;
      if (cardCount==1){
        cardValue=1;
        cardName='ace of '+cardSuit;
      } else if (cardCount==11){
        cardValue=10;
        cardName='jack of '+cardSuit;
      } else if (cardCount==12){
        cardValue=10;
        cardName='queen of '+cardSuit;
      } else if (cardCount==13){
        cardValue=10;
        cardName='king of '+cardSuit;
      };
      var cardDetails={
        card: cardName,
        value: cardValue,
      };
      cardDeck.push(cardDetails);
      cardCount=cardCount+1;
    };
    suitCount=suitCount+1;
  };
  var cardCount=0;
  while (cardCount<52){
    var toSplice=Math.floor(Math.random()*cardDeck.length);
    shuffledDeck.push(cardDeck.splice(toSplice,1)[0]);
    cardCount=cardCount+1;
  };
  return shuffledDeck;
};

var calculateSumofDeck=function(player,cardArray){
  if (player=='dealer'){
    var numCard=cardArray.length;
    var count=0;
  } else {
    if (cardArray[(player*10)]==null){
      var numCard=((player*10)+3);
    }else {
    var numCard=(player*10)+(cardArray[(player*10)].number)+1;
    };
    var count=((player*10)+1);
  };
  var sumOfDeck=0;
  var numAce=0;
  while (count<numCard){
    if (cardArray[count].value==1){
      numAce=numAce+1;
    };
    sumOfDeck=sumOfDeck+cardArray[count].value;
    count=count+1;
  };
  count=0;
  while(count<numAce){
    if ((sumOfDeck+10)<22){
      sumOfDeck=sumOfDeck+10;
    };
    count=count+1;
  };
  return sumOfDeck;
};

var checkValue=function(name,value,nameCount){
  if (value>21){
    return BUST;
  };
  if (value==21){
    if ((nameCount+1)==nameListMain.length){
      gameStage=2;
      if(dealerSum!=21){
        return name+` has got a Black Jack! This round goes to him!<br>Click to reveal dealer's hand!`;
      } else { return `Both the dealer and `+name+` has got a Black Jack! This round is a draw!<br> Click to reveal dealer's hand!`;
      };
    };
    if(dealerSum!=21){
      return name+` has got a Black Jack! This round goes to him!<br>Next player ready!`;
    } else { return `Both the dealer and `+name+` has got a Black Jack! This round is a draw!<br> Next player ready!`;
    };
  };
  return 'Nothing';
};

var coreGameFunction=function(userInput){ // Core Game function is here
  // Accepts only HIT, STAND, and 0
  // subModes PLAY for first game, TRUE for awaiting input, FALSE for no input, click only.
  if (subMode==PLAY){                     // Initiates only on a new game
    var usedDeck=generateShuffledDeck();
    subMode=FALSE;
    return 'Click to start a new game!';
  };

  if(gameStage==0){                       // Dealer draws iniitial
    dealerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    dealerSum=calculateSumofDeck('dealer',dealerHand)
    dealerCard=dealerHand[0].card+'<br>'+dealerHand[1].card;
    gameStage=1;
    return `The dealer's card is the `+dealerHand[0].card+'.<br>'+nameListMain[0]+', Click to reveal your hand.';
  };

  if (gameStage==1){                      // Players decision 
    while (nameCount<nameListMain.length){
      if(subMode==FALSE){         // Player initialization
        var playerName=nameListMain[nameCount];
        var innerCount=1;
        var  listOfCards='';
        while (innerCount<3){
          playerHand[((nameCount*10)+innerCount)]=shuffledDeck.pop();
          listOfCards=listOfCards+playerHand[((nameCount*10)+innerCount)].card+'<br>';
          innerCount=innerCount+1;
        };
        var sumCards=calculateSumofDeck(nameCount,playerHand);
        var BustedOrStand=HIT;
        var numCard=2;
        var playerDetails={
          name: playerName,
          sum: sumCards,
          status: BustedOrStand,
          cards: listOfCards,
          number: numCard,
        };
        playerHand[(nameCount*10)]=playerDetails;
        var checkWin=checkValue(playerName,playerHand[(nameCount*10)].sum,nameCount);
        subMode=TRUE;
        latestResult=`The dealer's card is the `+dealerHand[0].card+'<br>Your hand is the following:<br>'+playerHand[(nameCount*10)].cards+'<br>Enter your choice: HIT or STAND!';
        return latestResult;
      };
      if(subMode==TRUE && userInput==HIT){
        subMode=FALSE;
        var playerName=playerHand[(nameCount*10)].name;
        playerHand[(nameCount*10)].number=playerHand[(nameCount*10)].number+1;
        innerCount=playerHand[(nameCount*10)].number;
        playerHand[((nameCount*10)+innerCount)]=shuffledDeck.pop();
        console.log('initialize pop');
        playerHand[(nameCount*10)].sum=calculateSumofDeck(nameCount,playerHand);
        playerHand[(nameCount*10)].cards=playerHand[(nameCount*10)].cards+playerHand[((nameCount*10)+innerCount)].card+'<br>';
        var checkWin=checkValue(playerName,playerHand[(nameCount*10)].sum,nameCount);
        if (checkWin==BUST){
          playerHand[(nameCount*10)].status=BUST;
          var output=playerHand[(nameCount*10)].cards;
          nameCount=nameCount+1;
          if (nameCount==nameListMain.length){
            gameStage=2;
            return 'Your hand is the following:<br>'+output+`You have exceeded 21! Game Over!<br>Click to show dealer's hand!`;
          } else { return 'Your hand is the following:<br>'+output+`You have exceeded 21! Game Over!<br><br> Next player ready!`;
          };
        };
        if (checkWin=='Nothing'){
        subMode=TRUE;
        return `The dealer's card is the `+dealerHand[0].card+'<br>Your hand is the following:<br>'+playerHand[(nameCount*10)].cards+'<br>Enter your choice: HIT or STAND!';
        } else {return checkWin;
        };
      };
      if (subMode==TRUE && userInput==STAND){
        subMode=FALSE;
        playerHand[(nameCount*10)].status=STAND;
        nameCount=nameCount+1;
        if (nameCount==nameListMain.length){
          gameStage=2;
          return `Click to show dealer's hand!`;
        } else { return 'Next person ready!';
        };
      };
    };
    gameStage=2;
  };

  if (gameStage==2){                      // Dealer reveals hand
    while (dealerSum<17){
      dealerHand.push(shuffledDeck.pop());
      dealerCard=dealerCard+'<br>'+dealerHand[dealerHand.length-1].card;
      dealerSum=calculateSumofDeck('dealer',dealerHand)
      if (dealerSum>21){
        gameStage=3;
        return 'The dealer busts!<br>Dealer cards:<br>'+dealerCard;
      };
    };
    gameStage=3;
    nameCount=0;
    return 'The dealer stands at '+dealerSum+'<br>Dealer cards:<br>'+dealerCard;
  };


  if(gameStage==3){
    while (nameCount<nameListMain.length){
      if (playerHand[nameCount*10].status==BUST){
        nameCount=nameCount+1;
        return playerHand[(nameCount-1)*10].name+' has busted and lost this round!';
      };
      if (dealerSum>21){
        nameCount=nameCount+1;
        return playerHand[(nameCount-1)*10].name+' has won due to the dealer busting!';
      };
      if (playerHand[nameCount*10].sum==dealerSum){
        nameCount=nameCount+1;
        return playerHand[(nameCount-1)*10].name+' has obtained the same value as the dealer and thus tied!';
      };
      if (playerHand[nameCount*10].sum>dealerSum){
        nameCount=nameCount+1;
        return playerHand[(nameCount-1)*10].name+' has obtained a larger value than the dealer and thus won!';
      } else {
        nameCount=nameCount+1;
        return playerHand[(nameCount-1)*10].name+' has obtained a smaller value than the dealer and thus lost!';
      };
    };
  subMode=MAIN;
  return 'Enter CONTINUE to play a new round!<br> Enter BACK to go back to the Main Menu!';
  };
};

var inputHandler=function(userInput){     // Process inputs for core game
  if (subMode==MAIN){                     // Checks before a new game
    if (nameListMain.length<1){              // Checks for enough players
      mainMode=MAIN;
      return 'Please add more players before starting!<br>Add players in NAMES sub-menu.<br>'+mainMenuOptions;
    };
    if (userInput==CONTINUE){                 // Checks for continued game
      latestResult='';
      gameStage=0;
      shuffledDeck=[];
      playerHand=[];
      dealerHand=[];
      dealerCard='';
      nameCount=0;
      dealerSum=0;
      subMode=PLAY;
      return coreGameFunction(userInput);
    };
    subMode=PLAY;
    return coreGameFunction(userInput);   
  };
  if (subMode==TRUE){                     // TRUE means player input is required
    if (userInput==HIT || userInput==STAND){
      return coreGameFunction(userInput);
    };
    return 'Please input either Hit or Stand<br>'+latestResult;
  };
  if (subMode==FALSE){                    //  FALSE means player just needs to press submit
    userInput=0;
    return coreGameFunction(userInput);
  };
};

var nameHandler=function(userInput){      // Adds and Removes Names
  if (subMode==MAIN){
    userInput=userInput.toLowerCase();
    if (userInput==ADD){
      subMode=ADD;
      return 'Please enter a name';
    };
    if (userInput==REMOVE){
      subMode=REMOVE;
      return 'Please enter a name for deletion<br>'+nameListMain;
    };
    if (userInput==VIEW){
      return 'The current list of users are: '+nameListMain;
    }
    return namesMenuOptions;
  };
  if (subMode==ADD){
    if (userInput!=''){
      nameListMain.push(userInput);
      subMode=MAIN;
      return 'Current list of names are:<br>'+nameListMain+'<br>'+namesMenuOptions;
    };
    return 'Please enter a name';    
  };
  if (subMode==REMOVE){
    var outerCount=0;
    var arrayLength=nameListMain.length;
    while (outerCount<arrayLength){
      if (nameListMain[outerCount]==userInput){
        nameListMain.splice(outerCount,1);
        subMode=MAIN;
        return 'New list of names are: '+nameListMain+'<br>'+namesMenuOptions;
      };
      outerCount=outerCount+1;
    };
    if (arrayLength==0){
      subMode=MAIN;
      return 'There are no names to delete!';
    }
    return 'Please enter a name for deletion<br>'+nameListMain;
  };
  return namesMenuOptions;
};

var optionsHandler=function(userInput){   // Toggle Betting and Hand-Splitting on and off
  if(userInput==BET){
    if (betMode==FALSE){
      betMode=TRUE;
    } else {betMode=FALSE;
    };
    return '---FEATURE IS UNAVAILABLE---<br>Dice Variation is now '+betMode+'!<br>'+optionsMenuOptions;
  };
  if(userInput==SPLIT){
    if (splitMode==FALSE){
      splitMode=TRUE;
    } else {splitMode=FALSE;
    };
    return '---FEATURE IS UNAVAILABLE---<br>Hand-Splitting is now '+splitMode+'!<br>'+optionsMenuOptions;
  };
  return '---OPTIONS---<br>---FEATURES ARE UNAVAILABLE---<br>Betting Mode: '+betMode+'<br>Hand-Splitting: '+splitMode+'<br>'+optionsMenuOptions;
};

var main = function (input) {
  if (input.toLowerCase()==BACK){         // Exits to main menu and resets everything
    mainMode=MAIN;
    subMode=MAIN;
    latestResult='';
    gameStage=0;
    shuffledDeck=[];
    playerHand=[];
    dealerHand=[];
    dealerCard='';
    nameCount=0;
    dealerSum=0;
    return mainMenuOptions;
  }; 
  if(mainMode==NAMES){                    // Naming function, this sub-function is case sensitive
    return nameHandler(input);
  };
  var input=input.toLowerCase();          // All functions after this are not case senstive, so input is changed to entirely lower case
  if (mainMode==PLAY){                    // Starts a new game
    return inputHandler(input);
  };
  if (mainMode==OPTIONS){                 // Toggle Betting and Hand-Splitting on and off
    return optionsHandler(input);
  };
  if (mainMode==MAIN){                    // Main Menu selection, sets mainMode and diverts to sub-function
    if (input==NAMES){
      mainMode=NAMES;
      return nameHandler(input);
    };
    if(input==OPTIONS){
      mainMode=OPTIONS;
      return optionsHandler(input);
    };
    if(input==PLAY){
      mainMode=PLAY;
      return inputHandler(input);
    };
    return mainMenuOptions;
  };
  return mainMenuOptions;                   // Returns menuSelection if no / wrong input in Main Menu
};