var gameMode="Initial";
var hitCounter=2; //initialise hit counter as 2, which is the number of cards dealt per person at the start
var playerHand=[]; //array of player hands of card
var computerHand=[]; //array of computer hands of card
var playerHandValue;
var computerHandValue;
var cardDeck=[];
var points=100; //player's points is 100 initially
var wager=0; //initialise wager to 0 to know that whether player has already wagered or not

//Base
//There will be only two players. One human and one computer (for the Base solution).
//The computer will always be the dealer.
//Each player gets dealt two cards to start.
//The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
//The dealer has to hit if their hand is below 17.
//Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
//The player who is closer to, but not above 21 wins the hand.

//More comfortable
//Hide Dealer's one card + betting version

var main = function (input) {

if (isNaN(input)==false && gameMode=="Initial") //if it is start of the game and input is number.
{
      wager=input; //assign input to wager

      if (points==0) //if point is 0
    {return "You have no more points to play the game."}

      if (wager>points) //input validation to check if wager>points;
    { return "Please note that your current point is: "+points+". You can only wager <=your points.";}
}

if (isNaN(input)==true && gameMode=="Initial") //If it is start of the game and input is not a number.
{
      wager=0; //if input is not a number, set wager to be 0 so that it will prompt user to input wager.
}

if (wager>0)    //When wager exists
      {  
            if (gameMode == "Initial")
              { //initial dealing of two cards
                      cardDeck=shuffleCards(makeDeck()); //create a new deck
                      playerHand.push(cardDeck.pop());
                      playerHand.push(cardDeck.pop());
                      computerHand.push(cardDeck.pop());
                      computerHand.push(cardDeck.pop());
                      playerHandValue=calculateHandValue(playerHand);
                      computerHandValue=calculateHandValue(computerHand);
                  
                      //if it is Blackjack at the start
                      if (checkPlayerBlackjack(playerHand) ==true && checkComputerBlackjack(computerHand) ==false)
                            { playerHand=[]; //empty the player hand to restart the games
                              computerHand=[] ;
                              gameMode = "Initial"; //restart game
                              points=points+Number(wager); //player wins game
                              wager=0; //reset wager to 0 
                              
                              return "Player wins with Blackjack with cards " + playerHand[0].name +" and "+playerHand[1].name +"<br> The game has stopped. Please start new round by inputting your wager for next round." +"The current point is:" +points+".";
                            }
                      else if (checkComputerBlackjack(computerHand)==true && checkPlayerBlackjack(playerHand) ==false)
                            { playerHand=[]; //empty the player hand to restart the games
                              computerHand=[] ;
                              gameMode = "Initial";
                              points=points-Number(wager); //computer wins game
                              wager=0; //reset wager to 0
                              return "Computer wins with Blackjack with cards " + computerHand[0].name +" and "+computerHand[1].name +"<br> The game has stopped. Please start new round by inputting your wager for next round."+"The current point is:" +points+".";}
                      else if (checkPlayerBlackjack(playerHand) ==true && checkComputerBlackjack(computerHand)==true)
                              { playerHand=[]; //empty the player hand to restart the games
                                computerHand=[] ;
                                gameMode = "Initial";
                                wager=0; //reset wager to 0
                                return "Tie." + "<br> The game has stopped. Please start new round by inputting your wager for next round."+"The current point is:" +points+".";}
                              //determineResults(playerHand,computerHand);
                              
                              //initial output message
                              gameMode= "Playing"; //start the hit or stand mode
                              return "Player has: "+ playerHand[0].name + ", "+ playerHand[1].name+  " with sum "+ playerHandValue +
                                    "<br> Computer has: " + computerHand[0].name + " and one unknown card"+
                                    "<br> Please enter hit or stand, then press Submit.";
              }
            else if (gameMode == "Playing")
              {
                      if (input=="hit")
                        {
                            playerHand.push(cardDeck.pop()); //draw a new card to player
                            hitCounter =hitCounter +1;
                            playerHandValue=calculateHandValue(playerHand); //calculate the player's hand value
                    
                            if (playerHandValue>21) //if player busted
                            { playerHand=[]; //empty the player hand to restart the games
                              computerHand=[] ;
                              gameMode = "Initial";
                              points=points-Number(wager); //computer wins game
                              wager=0; //reset wager to 0
                              return "Player has busted with value " + playerHandValue+" and Computer wins."+"<br> Input your wager for next round." +"The current point is:" +points +"."
                            }
                        
                            return "Player has drawn "+ playerHand[hitCounter-1].name + 
                            ".<br> The latest hand value for player is " + playerHandValue + "<br> Computer has: " + computerHand[0].name + " and one unknown card"+ "<br>. Please enter hit or stand to continue. ";     
                        }
                      if (input=="stand") 
                        {
                            while (computerHandValue<17) //choose to hit if computer is less than 17
                            { computerHand.push(cardDeck.pop()); //draw a new card to computer
                              computerHandValue=calculateHandValue(computerHand)
                              if (computerHandValue>21) //if computer busted
                              { playerHand=[]; //empty the player hand to restart the games
                                computerHand=[] ;
                                gameMode = "Initial";
                                 points=points+Number(wager); //player wins game
                                 wager=0; //reset wager to 0
                                return "Computer has busted with value " + computerHandValue+" and Player wins." +"<br> Input your wager for next round."+"The current point is:" +points+"."};
                            }
                            playerHand=[]; //empty the player hand to restart the games
                            computerHand=[] ;
                            gameMode = "Initial";
                          
                            return determineResults(playerHandValue,computerHandValue);
                        }
                      else
                      {
                            return "Please input hit or stand only";
                      }

              }
      }
else
{
    return "Please input the wagers. Your current point is: "+ points;
}

};

//check player's blackjack or not
var checkPlayerBlackjack = function (playerHand)
{
    if ((playerHand[0].name=="ace" && playerHand[1].rank>=10) || (playerHand[0].rank>=10 && playerHand[1].name=="ace")) 
    {return true}
    else 
    {return false}

}

//check computer's blackjack or not
var checkComputerBlackjack = function (computerHand)
{
    if ((computerHand[0].name=="ace" && computerHand[1].rank>=10) || (computerHand[0].rank>=10 && computerHand[1].name=="ace")) 
    {return true}
    else 
    {return false}

}

//Determine the results
var determineResults=function(playerHandValue,computerHandValue)
{
    if (playerHandValue > computerHandValue)
    {  points=points+Number(wager); //player wins game
      wager=0; //reset wager to 0
      return "Player wins with "+ playerHandValue + " beating computer hand value of " + computerHandValue +". The game has ended. Input your wager for next round." +"The current point is:" +points+"."}
    else if (computerHandValue > playerHandValue)
    { points=points-Number(wager); //computer wins game
      wager=0; //reset wager to 0
      return "Computer wins with " + computerHandValue + " beating player hand value of " + playerHandValue +". The game has ended. Input your wager for next round."+"The current point is:" +points+"."}
    else
    {return "Tie"+". The game has ended. Input your wager for next round."+"The current point is:" +points+"."}
}

//Calculate the hand value for the input array
var calculateHandValue = function(cardsArray){
        var aceCounter=0; //count number of Aces
        var handValue=0;

        for (i=0; i<cardsArray.length; i+=1){
        if (cardsArray[i].rank > 10)
          {handValue= handValue+ 10}
        else if (cardsArray[i].rank==1) 
          {handValue= handValue+ 11;
           aceCounter=aceCounter+1;
          }
        else
          {handValue= handValue+ cardsArray[i].rank}
        }
       
       for (j=0;j<aceCounter;j+=1)
       {
         if (handValue>21)
          {handValue=handValue-10;} //ensure that the ace is considered as 1 when >21;
       }

       return handValue;
}

//Create a standard 52 card deck
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
 
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// shuffle cards function
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
