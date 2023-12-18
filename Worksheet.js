// var makeDeck = function () {
//     var cardDeck = [];
//     var suits = ['♥','♦', '♣', '♠'];
  
//     var suitIndex = 0;
//     while(suitIndex < suits.length) {
//         var currentSuit = suits[suitIndex];
        
//         var rankCounter = 1;
//         while (rankCounter <= 13) {
//             var cardName = rankCounter;
//             var cardValue = rankCounter;
            
//             if (cardName == 1) {
//                 cardName = `Ace`;
//                 cardValue = [1, 11];
//             } else if (cardName == 11) {
//                 cardName = `Jack`;
//                 cardValue = 10;
//             } else if (cardName == 12) {
//                 cardName = `Queen`;
//                 cardValue = 10;
//             } else if (cardName == 13) {
//                 cardName = `King`;
//                 cardValue = 10;
//             }
            
          
//             var card = {
//                 name: cardName,
//                 suit: currentSuit,
//                 rank: rankCounter,
//                 value: cardValue,
//             }
//             cardDeck.push(card);
//             rankCounter += 1;
//         }
//         suitIndex += 1;
//     }
    
//     return cardDeck;
//   };



// var main = function(input) {
//     var cards = makeDeck();
//     console.table(cards);
//     console.log(makeDeck(0));
// }
// main();


var mode = "start";
var myoutputvalue = "";
var totalCoins = 10;
var mode = "end";
var coins = 0;

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
  console.log("make deck",makeDeck.length)
  console.log("makeeee", (makeDeck().length)-4);
  return Math.floor(Math.random()* ((makeDeck().length)-4) );
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
  
  var inputBet = parseInt(input);
  var Alpinput = input.toLowerCase();
  console.log("Input",Alpinput)
  if (mode == "end") {
    cardDeck= makeDeck();
    PlayerHand = [];
    DealerHand = [];
    if (totalCoins == 0) {
      myoutputvalue = `You lost all!! You have ${totalCoins}💰 <br> Dont worry! You are given 10 more Coins to lose 😎`;
      totalCoins = 10;
      mode = "start";
      return myoutputvalue;
    } else {
      if (totalCoins == 1) {
        myoutputvalue = `You have ${totalCoins} Coin. Press Submit to play another hand`;
        mode = "start";
      } else if (totalCoins > 1) {
        myoutputvalue = `You have ${totalCoins} Coins. Press Submit to play another hand`;
        mode = "start";
      } else {
      myoutputvalue =`You can bet upto ${totalCoins} coins. Please enter again.`;
      } return myoutputvalue;
    }
  
  }
  
  if (mode == "start") {
    var shuffleDCard = shuffleCards(cardDeck);
    console.log(shuffleDCard);
    counterPlayer = 0;
    counterDealer = 0;
    
    while (counterPlayer < 2) {
      PlayerHand.push(shuffleDCard.pop());
      counterPlayer++;
    }

    while (counterDealer < 2) {
      DealerHand.push(shuffleDCard.pop());
      counterDealer++;
    }
      
      console.log(PlayerHand);
      console.log(DealerHand);

      mode = "BetCoins";
      console.log(mode);
      console.log('cardd', cardDeck.length);
      myoutputvalue = `You got ${totalCoins}- Enter How much you want to lose 🤣.`;
      return myoutputvalue;
      }
  
    
    
    if (mode == "BetCoins") {
        if(inputBet <= totalCoins){
          if (inputBet == 1) {
            coins = coins + inputBet;
            myoutputvalue = `You are Betting ${coins} Coin. To see Cards press <b>Submit</b>.`;
            mode = "evaluation";
        } else if (inputBet >= 1) {
            coins = coins + inputBet;
            myoutputvalue = `You are Betting ${coins} Coins. To see Cards press <b>Submit</b>.`;
            mode = "evaluation";
        } 

        } else {
          myoutputvalue =`Player can only bet ${totalCoins} coins. Please input again.`;
          return myoutputvalue;
      }

        mode = "evaluation";
        return myoutputvalue;

    }
    var DealerHandValue = parseInt(DealerHand[0].value)+parseInt(DealerHand[1].value);
    var PlayerHandValue = parseInt(PlayerHand[0].value)+parseInt(PlayerHand[1].value);

    if (mode == "evaluation") {
      if (((PlayerHand[0].name)=="Ace" && (PlayerHand[1].name)=="10")
      if (((DealerHand[0].name)!= "Ace" && (DealerHand[1].name)!="Ace") && ((PlayerHand[0].name)!="Ace" && (PlayerHand[1].name)!="Ace")){
        if ((PlayerHand[0].name)!="Ace" && (PlayerHand[1].name)!="Ace"){
          PlayerHandValue = parseInt(PlayerHand[0].value)+parseInt(PlayerHand[1].value);
          mode = "game";

        } else if ((DealerHand[0].name)!= "Ace" && (DealerHand[1].name)!="Ace"){
          if (DealerHandValue < 17) {
            mode = "DealerHit";
            
  
          } else if ((DealerHandValue > 17) && (DealerHandValue < 21 )){
            mode = "LastStand";
  
          } 
        }
      } else if ((DealerHand[0].name)== "Ace" || (DealerHand[1].name)=="Ace" || (PlayerHand[0].name)=="Ace" || (PlayerHand[1].name)=="Ace") {
        if ((((DealerHand[0].name)== "Ace" || (DealerHand[1].name)=="Ace") && ((DealerHand[0].value)== 10 || (DealerHand[1].value)== 10)) && (((PlayerHand[0].name)== "Ace" || (PlayerHand[1].name)=="Ace") && ((PlayerHand[0].value)== 10 || (PlayerHand[1].value)== 10))){
          
          myoutputvalue = `<b>It's a Tie!!</b><br> Dealer's Hand <br>${DealerHand[0].name} ${DealerHand[0].suit} | ${DealerHand[1].name} ${DealerHand[1].suit} 
          <br> <br> Player's Hand <br>${PlayerHand[0].name} ${PlayerHand[0].suit} | ${PlayerHand[1].name} ${PlayerHand[1].suit}`;
          mode = "end";
          coins=0;
          return myoutputvalue;

        } else if (((PlayerHand[0].name)== "Ace" || (PlayerHand[1].name)=="Ace") && ((PlayerHand[0].value)== 10 || (PlayerHand[1].value)== 10)){
          totalCoins = totalCoins + (coins*1.5);
          myoutputvalue = `<b>Black Jack!!</b> Player Wins!<br> Dealer's Hand <br>${DealerHand[0].name} ${DealerHand[0].suit} | ${DealerHand[1].name} ${DealerHand[1].suit} 
          <br> <br> Player's Hand <br>${PlayerHand[0].name} ${PlayerHand[0].suit} | ${PlayerHand[1].name} ${PlayerHand[1].suit}`;
          mode = "end";
          coins=0;
          return myoutputvalue;

        } else if (((DealerHand[0].name)== "Ace" || (DealerHand[1].name)=="Ace") && ((DealerHand[0].value)== 10 || (DealerHand[1].value)== 10)){
          totalCoins = totalCoins - coins;
          myoutputvalue = `<b>Black Jack!!</b> Dealer Wins!<br> Dealer's Hand <br>${DealerHand[0].name} ${DealerHand[0].suit} | ${DealerHand[1].name} ${DealerHand[1].suit} 
          <br> <br> Player's Hand <br>${PlayerHand[0].name} ${PlayerHand[0].suit} | ${PlayerHand[1].name} ${PlayerHand[1].suit}`;
          mode = "end";
          coins=0;
          return myoutputvalue;

        } else if ((PlayerHand[0].name)== "Ace" && (PlayerHand[1].name)=="Ace"){
          PlayerHandValue = parseInt(PlayerHand[0].value[1]) + parseInt(PlayerHand[0].value[0]);
          mode ="game";
          

        } else if((PlayerHand[0].name)== "Ace" && (PlayerHand[1].name)<=9) {
          PlayerHandValue = parseInt(PlayerHand[0].value[1]) + parseInt(PlayerHand[1].value);
          mode ="game";
          

        } else if (((PlayerHand[0].name)<= 9 && (PlayerHand[1].name)=="Ace")) {
          PlayerHandValue = parseInt(PlayerHand[0].value) + parseInt(PlayerHand[1].value[1]);
          mode = "game";
          

        } else if (((DealerHand[0].name)== "Ace" && (DealerHand[1].name)== "Ace")){
          DealerHandValue = parseInt(DealerHand[0].value[1]) + parseInt(DealerHand[1].value[0]);
          mode = "DealerHit";
          
          

        }  else if((DealerHand[0].name)== "Ace" && (DealerHand[1].name)<=9) {
          DealerHandValue = parseInt(DealerHand[0].value[1]) + parseInt(DealerHand[1].value);

          if (DealerHandValue < 17) {
            mode = "DealerHit";
            
          } else if ((DealerHandValue >= 17) && (DealerHandValue < 21 )){
            mode = "LastStand";
            
          } 

        } else if (((DealerHand[0].name)<= 9 && (DealerHand[1].name)=="Ace")) {
          DealerHandValue = parseInt(DealerHand[0].value) + parseInt(DealerHand[1].value[1]);

          if (DealerHandValue < 17) {
            mode = "DealerHit";
            
          } else if ((DealerHandValue >= 17) && (DealerHandValue < 21 )){
            mode = "LastStand";
            
          } 
        }
      
    } else {
      DealerHandValue = parseInt(DealerHand[0].value)+parseInt(DealerHand[1].value);
      console.log(DealerHandValue);
      PlayerHandValue = parseInt(PlayerHand[0].value)+parseInt(PlayerHand[1].value);
      console.log(PlayerHandValue);
      mode = "game";
    }
  }

  var showBothHands = function() {      // test with player and dealer hit as it can have many cards...
    var index = 0;
    var Dealeroutput = []
    while (index < DealerHand.length){
      Dealeroutput[index] = `${DealerHand[index].name}${DealerHand[index].suit}`;
      index = index + 1;
      
    }
    var index = 0;
    var Playeroutput = []
    while (index < PlayerHand.length){
      Playeroutput[index] = `${PlayerHand[index].name}${PlayerHand[index].suit}`;
      index = index + 1;
    }
    myoutputvalue = `Player: ${Playeroutput[0]}, ${Playeroutput[1]} <br> Dealer: ${Dealeroutput[0]}, ${Dealeroutput[1]}`;
    return myoutputvalue;
  }

  var PlayerCval = function() {
    var index = 0;
    while (index < PlayerHand.length){
      var PValue = `${PlayerHand[index].value}`;
      console.log(PValue);
      index = index + 1;
    }
  } 

  var DealerCval = function() {
    var index = 0;
    while (index < DealerHand.length){
      var Dvalue = `${DealerHand[index].value}`;
      console.log(Dvalue);
      index = index + 1;
    }
  }

  if (mode == "HitandPlay") {
    myoutputvalue = `Dealer's Hand <br>${DealerHand[0].name} ${DealerHand[0].suit} | "Guess!!" <br> <br> Player's Hand 
    <br>${PlayerHand[0].name} ${PlayerHand[0].suit} | ${PlayerHand[1].name} ${PlayerHand[1].suit} 
    <br> [Total => ${PlayerHandValue}] *Press <b>'h'</b> for Hit || Press <b>Submit</b> for Stand`;
    console.log("Hit it", mode);

  }



  // Play with hit and stand 
  if (mode == "game") {
    myoutputvalue = `Dealer's Hand <br>${DealerHand[0].name} ${DealerHand[0].suit} | "Guess!!" <br> <br> Player's Hand 
    <br>${PlayerHand[0].name} ${PlayerHand[0].suit} | ${PlayerHand[1].name} ${PlayerHand[1].suit} 
    <br> [Total => ${PlayerHandValue}] *Press <b>'h'</b> for Hit || Press <b>Submit</b> for Stand`;
    console.log("game", mode);

    if (Alpinput == "h") {
      mode = "PlayerHit";
      console.log("Player Hit");
    } else {
      
      console.log(DealerHandValue);
      console.log(DealerHandValue);
      console.log("show time");
      mode = "LastStand";
    }
  
    
                      
  
} else if (mode == "PlayerHit") {
  console.log("We Hit!");
  var newCard= PlayerHand.push(shuffleDCard.pop());
  myoutputvalue = `${newCard.name}, ${newCard.suit},`;
  if (PlayerHandValue > 1){
    var afterAce = function(){
      var index = 2;
      while (index < PlayerHand.length){
        var PValue = `${PlayerHand[index].value}`;
        console.log(PValue);
        index = index + 1;
    }var pCval= `${PlayerHandValue}+ ${afterAce()}`;
    
    } 
    } else if (PlayerHandValue == 0 ){
      var NoAceBefore = function(){
        var index = 0;
        while (index < PlayerHand.length){
          var PValue = `${PlayerHand[index].value}`;
          console.log(PValue);
          index = index + 1;
      }

    }
  }

  

      
}else if (mode == "DealerHit") {
  console.log("Dealer Hit!");
 

      
} else if (mode == "PlayerBust"){
  console.log("Busted!");

} else if (mode == "DealerBust"){
  console.log("Dealer got Busted!");

} else if(mode == "LastStand") {
  console.log(PlayerHandValue);
  console.log(DealerHandValue);

  if (PlayerHandValue > DealerHandValue) {
    totalCoins= totalCoins + coins;

    myoutputvalue = `Player Wins this hand! Your coin balance is ${totalCoins}<br> ${showBothHands()}`;
    mode = "end";
    coins=0;
    return myoutputvalue;

  } else if (PlayerHandValue < DealerHandValue){
    totalCoins= totalCoins - coins;
    
    myoutputvalue = `Dealer Wins! Your coin balance is ${totalCoins}<br> ${showBothHands()}`;
    mode = "end";
    coins=0;
    return myoutputvalue;

  } else {
    
    myoutputvalue = `Tie! Your coin balance is ${totalCoins}<br> ${showBothHands()}`;
    mode = "end";
    coins=0;
    return myoutputvalue;
  }

      }
    
    };
  
    // else if(DealerHandValue > 21) {
    //   totalCoins = totalCoins + coins;
    //   mode = "DealerBust";
    //   myoutputvalue = "Dealer got Busted!"
    // }

    // if (mode == "Check") {  
    //   var DealerHandValue = parseInt(DealerHand[0].value)+parseInt(DealerHand[1].value);
    //   console.log(DealerHandValue);
    //   var e = parseInt(PlayerHand[0].value)+parseInt(PlayerHand[1].value);
    //   console.log(PlayerHandValue);
    //   // if totals to 21 is Black Jack and wins or tie.
    //   if (DealerHandValue == 21 || PlayerHandValue == 21) {
    //     if (DealerHandValue == 21){
    //       totalCoins - coins;
    //       mode = "end";
    //       myoutputvalue = `<b>Black Jack!!</b> Dealer Wins!`;
    //       return myoutputvalue; 
    //     } else if (PlayerHandValue == 21) {
    //       mode = "end";
    //       myoutputvalue = `<b>Black Jack!!</b> You Win!`;
    //       return myoutputvalue; 
    //     }


          
  // }
    //   }
      // both Player and Dealer cards should be <=20 to continue.
      // if less <= 20, Player can Hit or stand. Anything aboove 21 is Bust!! Lose!!
      // if Dealer is less than 17 must Hit. Anything above 21 is Bust!! Lose!!
      // final showdown, Player has to have higher cards then Dealer to win