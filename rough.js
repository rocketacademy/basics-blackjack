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
              cardValue = 1;
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

function calculateValue(hand) {
    var total = 0;
    var hasAce = false;

    for(var i =0; i< hand.length; i++){
        var card = hand[i];

      if (card.name == "Ace") {
          hasAce = true;
      } else {
        total += card.value;
      }
    }
    if (hasAce && total + 11 <= 21) {
        total += 11;
    } else if (hasAce) {
        total += 1;
    }
    return total;
  }


mode = "start";


var main = function(input){
  
  var inputBet = parseInt(input);
  var Alpinput = input.toLowerCase();
  console.log("ALPha Input",Alpinput)

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
    
    
    console.log(calculateValue(PlayerHand));
    console.log(calculateValue(DealerHand));
      // console.log("Player hand:",playerTotal);
      
      mode = "BetCoins";
      console.log(mode);
      console.log('cardd', cardDeck.length);
      myoutputvalue = `You got ${totalCoins}- Enter How much you want to lose 🤣.`;
      return myoutputvalue;
      }
var PlayerHandValue = calculateValue(PlayerHand);
var DealerHandValue = calculateValue(DealerHand);

  var showBothHands = function() {      
    var Dealeroutput = []
    var DealerHandValue = 0;
    var hasAceDealer = false;
    for (var i = 0; i < DealerHand.length; i++) {
        var card = DealerHand[i];
        Dealeroutput.push(`${card.name},${card.suit}`);
        if (card.name == "Ace") {
            hasAceDealer = true;
        } else {
          DealerHandValue += card.value;
        }
    }
    if (hasAceDealer && DealerHandValue + 11 <= 21) {
        DealerHandValue += 11;
    } else if (hasAceDealer) {
        DealerHandValue += 1;
    }

    var Playeroutput = []
    var PlayerHandValue = 0;
    var hasAcePlayer = false;
    for (var i = 0; i < PlayerHand.length; i++) {
        var card = PlayerHand[i];
        Playeroutput.push(`${card.name},${card.suit}`);
        if (card.name == "Ace") {
            hasAcePlayer = true;
        } else {
          PlayerHandValue += card.value;
        }
      }
      if (hasAcePlayer && PlayerHandValue + 11 <= 21) {
          hasAcePlayer += 11;
      } else if (hasAcePlayer) {
          PlayerHandValue += 1;
      }
      myoutputvalue = `Dealer: ${Dealeroutput}| Total: ${DealerHandValue} <br> Player: ${Playeroutput} | Total: ${PlayerHandValue}`;
      return myoutputvalue;
        
    }
    

    
      

    if (mode == "BetCoins") {
        // Calculate hand value
        if(inputBet <= totalCoins){
          if (inputBet == 1) {
            coins = coins + inputBet;
            myoutputvalue = `You are Betting ${coins} Coin. To see Cards press <b>Submit</b>.`;
            mode = "Evaluation";
        } else if (inputBet >= 1) {
            coins = coins + inputBet;
            myoutputvalue = `You are Betting ${coins} Coins. To see Cards press <b>Submit</b>.`;
            mode = "Evaluation";
        } 

        } else {
          myoutputvalue =`Player can only bet ${totalCoins} coins. Please input again.`;
          return myoutputvalue;
      }

        mode = "Evaluation";
        return myoutputvalue;

    }

    
    
    if (mode == "Evaluation") {
      if ((((DealerHand[0].name)== "Ace" && (DealerHand[1].value)== 10) || ((DealerHand[0].value)== 10 && (DealerHand[1].name)== "Ace")) || 
      (((PlayerHand[0].name)== "Ace" && (PlayerHand[1].value)== 10) && ((PlayerHand[0].value)== 10 && (PlayerHand[1].name)== "Ace"))){
          
          myoutputvalue = `<b>Black Jack !! but a Tie!!</b><br> Dealer's Hand <br> ${showBothHands()}`;
          mode = "end";
          coins=0;
          return myoutputvalue;

    } else if (((PlayerHand[0].name)== "Ace" || (PlayerHand[1].name)=="Ace") && ((PlayerHand[0].value)== 10 || (PlayerHand[1].value)== 10)){
          totalCoins = totalCoins + (coins*1.5);
          myoutputvalue = `<b>Black Jack!!</b> Player Wins!<br> Dealer's Hand <br> ${showBothHands()}`;
          mode = "end"; 
          coins=0;
          return myoutputvalue;

    } else if (((DealerHand[0].name)== "Ace" || (DealerHand[1].name)=="Ace") && ((DealerHand[0].value)== 10 || (DealerHand[1].value)== 10)){
          totalCoins = totalCoins - coins;
          myoutputvalue = `<b>Black Jack!!</b> Dealer Wins!<br> Dealer's Hand <br> ${showBothHands()}`;
          mode = "end";
          coins=0;
          return myoutputvalue;

    } else {
        
        

        myoutputvalue = `Dealer's Hand <br>${DealerHand[0].name} ${DealerHand[0].suit} | "Guess!!" <br> <br> Player's Hand 
                        <br>${PlayerHand[0].name} ${PlayerHand[0].suit} | ${PlayerHand[1].name} ${PlayerHand[1].suit} 
                        <br> [Total => ${PlayerHandValue}] *Press <b>'h'</b> for Hit || Press <b>Submit</b> for Stand`;
        
    
    
    mode = "game";
    console.log("game", mode);
    

    }  return myoutputvalue;
    } 
    
    if (mode == "game") {
        
        var onlyPlayerHand = function() {             
            var Playeroutput = []
            var PlayerHandValue = 0;
            var hasAcePlayer = false;
            for (var i = 0; i < PlayerHand.length; i++) {
                var card = PlayerHand[i];
                Playeroutput.push(`${card.name},${card.suit}`);
                if (card.name == "Ace") {
                    hasAcePlayer = true;
                } else {
                  PlayerHandValue += card.value;
                }
              }
              if (hasAcePlayer && PlayerHandValue + 11 <= 21) {
                  hasAcePlayer += 11;
              } else if (hasAcePlayer) {
                  PlayerHandValue += 1;
              }
              myoutputvalue = `Dealer: ${DealerHand[0].name} ${DealerHand[0].suit} | "Guess!!" <br> Player: ${Playeroutput} | Total: ${PlayerHandValue}`;
              return myoutputvalue;
                
            }
        
        
        if (Alpinput == "h") {
            PlayerHand.push(cardDeck.pop());
            onlyPlayerHand();
            myoutputvalue =`You draw a card ${onlyPlayerHand()} <br>
            *Press <b>'h'</b> for Hit || Press <b>Submit</b> for Stand`;
            console.log(onlyPlayerHand());
            if (PlayerHandValue  == 21) {
                totalCoins = totalCoins + (coins*1.5);

                myoutputvalue = `Black Jack!! You Win! ${showBothHands()}`;
                mode = "end";
                coins=0;
                return myoutputvalue;
            } else if (PlayerHandValue   > 21) {
                totalCoins = totalCoins - coins;
                
                myoutputvalue = `Busted!! You Lose! ${showBothHands()}`;
                mode = "end";
                coins=0;
                return myoutputvalue;

            }
            return myoutputvalue;


        } else {
            mode = "DealerHit";
            myoutputvalue = `${onlyPlayerHand} Dealer's turn.. Press Submit to show hands.`
            
        } 
      
    
    }


    if (mode == "DealerHit"){
        if (DealerHandValue < 17) {
            DealerHand.push(cardDeck.pop());
            if (DealerHandValue  == 21) {
                totalCoins = totalCoins - coins;

                myoutputvalue = `Black Jack!! Dealer Wins! ${showBothHands()}`;
                mode = "end";
                coins=0;
                return myoutputvalue;
            } else if (PlayerHandValue   > 21) {
                totalCoins = totalCoins + coins;
                
                myoutputvalue = `Dealer Busted!! You win! ${showBothHands()}`;
                mode = "end";
                coins=0;
                return myoutputvalue;
            }

        } mode = "Show Hands";

    }
    if (mode == "Show Hands") {
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