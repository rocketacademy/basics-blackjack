var mode = "start";
// var mode = "game";
var myoutputvalue = "";
var totalCoins = 10;
// var remainCoins = (totalCoins - coins);
var mode = "end";



var coins = "";

var PlayerHand = [];
var DealerHand = [];


var makeDeck = function () {
  var cardDeck = [];
  var suits = ['♥','♦', '♣', '♠'];

  var suitIndex = 0;
  while(suitIndex < suits.length) {
      var currentSuit = suits[suitIndex];
      
      var rankCounter = 1;
      while (rankCounter <= 13) {
          var cardName = rankCounter;
          var cardValue = rankCounter;
          
          if (cardName == 1) {
              cardName = `Ace`;
              cardValue = [1, 11];
          } else if (cardName == 11) {
              cardName = `Jack`;
              cardValue = 10;
          } else if (cardName == 12) {
              cardName = `Queen`;
              cardValue = 10;
          } else if (cardName == 13) {
              cardName = `King`;
              cardValue = 10;
          }
          
        
          var card = {
              name: cardName,
              suit: currentSuit,
              rank: rankCounter,
              value: cardValue,
          }
          cardDeck.push(card);
          rankCounter += 1;
      }
      suitIndex += 1;
  }
  
  return cardDeck;
};

var getRandomIndex = function () {
  return Math.floor(Math.random()* makeDeck().length );
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
      var randomIndex = getRandomIndex(cardDeck.length);
      var randomCard = cardDeck[randomIndex];
      var currentCard = cardDeck[currentIndex];
      cardDeck[currentIndex] = randomCard;
      cardDeck[randomIndex] = currentCard;
      currentIndex = currentIndex + 1;
  }
  return cardDeck;
};
var cardDeck = makeDeck();

// console.table(cardDeck);

mode = "start";

var main = function(input){
  
  if (mode == "end") {
    if (totalCoins == 0) {
      myoutputvalue = `You lost all!! You have ${totalCoins}💰 <br> Dont worry! You are given 10 more Coins to lose 😎`;
      PlayerHand = [];
      DealerHand = [];
      mode = "start";
      return myoutputvalue;
    } else {
      if (totalCoins == 1) {
        myoutputvalue = `You have ${totalCoins} Coin. Enter the bet Coins`;
        mode = "BetCoins";
      } else if (inputBet > 1 && inputBet <= 10) {
        myoutputvalue = `You have ${totalCoins} Coins. Enter the bet Coins`;
        mode = "BetCoins";
      } else {
      myoutputvalue =`You can bet upto ${totalCoins} coins. Please enter again.`;
      } return myoutputvalue;
    }
  
  }
  

  if (mode == "start") {
    var shuffleDCard = shuffleCards(cardDeck);

    counterPlayer = 0;
    counterDealer = 0;
    
    while (counterPlayer < 2) {
      var PlayerCard = shuffleDCard.pop();
      PlayerHand.push(PlayerCard);
      console.log(PlayerHand);
      counterPlayer++;
    }

    while (counterDealer < 2) {
      var DealerCard = shuffleDCard.pop();
      DealerHand.push(DealerCard);
      console.log(DealerHand);
      counterDealer++;
    }
      console.log(shuffleDCard);
      console.log(PlayerHand);
      console.log(DealerHand);
      // console.log(cardDeck[0]);
      console.log(cardDeck[0].value);

      mode = "BetCoins";
      console.log(mode);
      myoutputvalue = `You got 10 Coins- Enter How much you want lose 🤣.`;
      return myoutputvalue;
      }
            
    
    
    if (mode == "BetCoins") {
        inputBet = parseInt(input);
        if (inputBet == 1) {
            coins = coins + input;
            myoutputvalue = `You are Betting ${coins} Coin. To see Cards press <b>Submit</b>.`;
            mode = "game";
        } else if (inputBet > 1 && inputBet <= 10) {
            coins = coins + input;
            myoutputvalue = `You are Betting ${coins} Coins. To see Cards press <b>Submit</b>.`;
            mode = "game";
        } else {
            myoutputvalue =`Player can only bet ${totalCoins} coins. Please input again.`;
            return myoutputvalue;
        }
        mode = "game";
        return myoutputvalue;

    }
    if (mode == "game") {
        console.log(DealerHand[0]);
        myoutputvalue = `Dealer's Hand <br>${DealerHand[0].name} ${DealerHand[0].suit} | ${DealerHand[1].name} ${DealerHand[1].suit}
                          <br> <br> Player's Hand <br>${PlayerHand[0].name} ${PlayerHand[0].suit} | ${PlayerHand[1].name} ${PlayerHand[1].suit}`;
      mode = "evaluation";
      return myoutputvalue;
    }

    if (mode == "evaluation") {
      var DealerHandValue = parseInt(DealerHand[0].value)+parseInt(DealerHand[1].value);
      console.log(DealerHandValue);
      var PlayerHandValue = parseInt(PlayerHand[0].value)+parseInt(PlayerHand[1].value);
      console.log(PlayerHandValue);

      if (((DealerHand[0].name)!= "Ace" && (DealerHand[1].name)!="Ace") && ((PlayerHand[0].name)!="Ace" && (PlayerHand[1].name)!="Ace")){
        if ((PlayerHand[0].name)!="Ace" && (PlayerHand[1].name)!="Ace"){
          if (input == "h") {
            mode = "PlayerHit";
            myoutputvalue = "Pop and Push";
            return myoutputvalue;

          } else if (input == "s"){
            mode = "LastStand";
            myoutputvalue = "Take a Stand!";
            return myoutputvalue;
          }
        } else if ((DealerHand[0].name)!= "Ace" && (DealerHand[1].name)!="Ace"){
          if (DealerHandValue < 17) {
            mode = "DealerHit";
            myoutputvalue = "Pop and Push";
            return myoutputvalue;
  
          } else if ((DealerHandValue > 17) && (DealerHandValue < 21 )){
            mode = "LastStand";
            myoutputvalue = "Dealer's Stand!";
            return myoutputvalue;
  
          } 
        } 
        
      
      } else if ((DealerHand[0].name)== "Ace" || (DealerHand[1].name)=="Ace" || (PlayerHand[0].name)=="Ace" || (PlayerHand[1].name)=="Ace") {
        if ((((DealerHand[0].name)== "Ace" || (DealerHand[1].name)=="Ace") && ((DealerHand[0].rank)>= 10 || (DealerHand[1].rank)>= 10)) && (((PlayerHand[0].name)== "Ace" || (PlayerHand[1].name)=="Ace") && ((PlayerHand[0].rank)>= 10 || (PlayerHand[1].rank)>= 10))){
          mode = "end";
          myoutputvalue = `<b>It's a Tie!!</b>`;
          return myoutputvalue;

        } else if (((PlayerHand[0].name)== "Ace" || (PlayerHand[1].name)=="Ace") && ((PlayerHand[0].rank)>= 10 || (PlayerHand[1].rank)>= 10)){
          totalCoins = totalCoins + (coins*1.5);
          mode = "end";
          myoutputvalue = `<b>Black Jack!!</b> Player Wins!`;
          return myoutputvalue;

        } else if (((DealerHand[0].name)== "Ace" || (DealerHand[1].name)=="Ace") && ((DealerHand[0].rank)>= 10 || (DealerHand[1].rank)>= 10)){
          totalCoins = totalCoins - coins;
          mode = "end";
          myoutputvalue = `<b>Black Jack!!</b> Dealer Wins!`;
          return myoutputvalue;

        } else if ((PlayerHand[0].name)== "Ace" && (PlayerHand[1].name)=="Ace"){
          PlayerHandValue = parseInt(PlayerHand[0].value[1]) + parseInt(PlayerHand[0].value[0]);
          
          if (input == "h") {
            mode = "PlayerHit";
            myoutputvalue = "Pop and Push";
            return myoutputvalue;

          } else if (input == "s"){   // if Dealer's hand is less than 17 and hit can make Dealer Bust so even less value stand can win. 
            mode = "LastStand";
            myoutputvalue = "Take a Stand!";
            return myoutputvalue;
          }
        } else if((PlayerHand[0].name)== "Ace" && (PlayerHand[1].name)<=9) {
          PlayerHandValue = parseInt(PlayerHand[0].value[1]) + parseInt(PlayerHand[1].value);

          if (input == "h") {
            mode = "PlayerHit";
            myoutputvalue = "Pop and Push";
            return myoutputvalue;

          } else if (input == "s"){
            mode = "LastStand";
            myoutputvalue = "Take a Stand!";
            return myoutputvalue;
          }

        } else if (((PlayerHand[0].name)<= 9 && (PlayerHand[1].name)=="Ace")) {
          PlayerHandValue = parseInt(PlayerHand[0].value) + parseInt(PlayerHand[0].value[1]);

          if (input == "h") {
            mode = "PlayerHit";
            myoutputvalue = "Pop and Push";
            return myoutputvalue;

          } else if (input == "s"){
            mode = "LastStand";
            myoutputvalue = "Take a Stand!";
            return myoutputvalue;
          }

        } else if (((DealerHand[0].name)== "Ace" && (DealerHand[1].name)== "Ace")){
          DealerHandValue = parseInt(DealerHand[0].value[1]) + parseInt(DealerHand[0].value[0]);
          mode = "DealerHit";
          myoutputvalue = "Dealers Pop and Push";
          return myoutputvalue;

        }  else if((DealerHand[0].name)== "Ace" && (DealerHand[1].name)<=9) {
          DealerHandValue = parseInt(DealerHand[0].value[1]) + parseInt(DealerHand[1].value);

          if (DealerHandValue < 17) {
            mode = "DealerHit";
            myoutputvalue = "Pop and Push";
            return myoutputvalue;

          } else if ((DealerHandValue > 17) && (DealerHandValue < 21 )){
            mode = "LastStand";
            myoutputvalue = "Dealer's Stand!";
            return myoutputvalue;

          } 

        } else if (((DealerHand[0].name)<= 9 && (DealerHand[1].name)=="Ace")) {
          DealerHandValue = parseInt(DealerHand[0].value) + parseInt(DealerHand[1].value[1]);

          if (DealerHandValue < 17) {
            mode = "DealerHit";
            myoutputvalue = "Pop and Push";
            return myoutputvalue;

          } else if ((DealerHandValue > 17) && (DealerHandValue < 21 )){
            mode = "LastStand";
            myoutputvalue = "Dealer's Stand!";
            return myoutputvalue;

          } 
        }
      
    }
  // check the values 
    
    

    if (mode == "PlayerHit") {
      console.log("We Hit!");
      
    }

    if (mode == "DealerHit") {
      console.log("Dealer Hit!");
      
    }

    if (mode == "PlayerBust"){
      console.log("Busted!");

    }

    if (mode == "DealerBust"){
      console.log("Dealer got Busted!");

    }
    
    if(mode == "LastStand") {
      console.log("We Stand!");

      if (PlayerHandValue > DealerHandValue) {
        totalCoins + coins;
        mode = "end";
        myoutputvalue = `Player Wins this hand! Your coin balance is ${totalCoins}`;
        return myoutputvalue;

      } else if (PlayerHandValue < DealerHandValue){
        totalCoins - coins;
        mode = "end";
        myoutputvalue = `Dealer Wins! Your coin balance is ${totalCoins}`;
        return myoutputvalue;

      } else {
        mode = "end";
        myoutputvalue = `Tie! Your coin balance is ${totalCoins}`;
        return myoutputvalue;
      }

      }
    }
    

    

    
    };