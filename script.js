const main = function(input) {
  myOutputValue = playBlackJack()
  return myOutputValue
}


const makeDeck = function () {
  // Initialise an empty deck array
  let cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  let suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  let suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a letiable
    let currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    let rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      let cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === 1) {
        cardName = 'ace';
      } else if (cardName === 11) {
        cardName = 'jack';
      } else if (cardName === 12) {
        cardName = 'queen';
      } else if (cardName === 13) {
        cardName = 'king';
      }
    
    // assign value
    
      let cardValue = rankCounter;
      if (cardName === 'ace') {
        cardValue = 1 || 11
      } else if (cardName === 'jack' || cardName === 'queen' || cardName === 'king') {
        cardValue = 10
      }
    
    

      // Create a new card with the current name, suit, and rank
      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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

let deck = makeDeck()


const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};


// Shuffle the elements in the cardDeck array
const shuffleCards = function (cardDeck) {
  // Loop over the card deck array once for every card so every card position got shuffled once
  for (let cardIndex = 0 ; cardIndex < cardDeck.length; cardIndex += 1 ){
     // Select a random index in the deck
    let randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    let randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = cardDeck[cardIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[cardIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cardDeck;
};

let totalPlayers  = 1
let recordParticipants = {}
let mode = "start mode"
const playBlackJack = function () {
  if (mode === "start mode") {
    // shuffle card
    let shuffledDeck = shuffleCards(deck)
    // initialise object for their cards and their score
    let playDeck = shuffledDeck
    let handOfPlayer = {
        hands : [],
        sumInHand : 0
    }
    // create indexPlayer and sum array
    let players = []
    // array to stare each player sum of cards
    let sumOfHand = []

    // initialise array for each player to hold their cards
    let cardsOfPlayer = []
    // store score of every player
    for (let playerIndex = 0; playerIndex <= totalPlayers-1 ; playerIndex ++) {
    
      // player and computer take 2 cards each. participants first
      let playerCard1 = playDeck.pop()
      cardsOfPlayer.push(playerCard1)
      let playerCard2 = playDeck.pop()
      cardsOfPlayer.push(playerCard2)
      // find total of each participant. Jacks/Queen/Kings are 10. Aces can be 1 or 11
      sumOfHandPlayer = cardsOfPlayer[playerIndex].value + cardsOfPlayer[playerIndex+1].value
      // push sum into array
      sumOfHand.push(sumOfHandPlayer)
      console.log(`sum of all players hand`, sumOfHand)

      // push each player cards and sum into object handOfPlayer
      handOfPlayer.hands = cardsOfPlayer;
      handOfPlayer.sumInHand = sumOfHand[playerIndex];    
      console.log(`handOfPlayer`, handOfPlayer)

      // build array of playerIndex as key  
      let playerNum = "player" + (playerIndex + 1).toString()
      console.log(`players are: `, playerNum)
      
      players.push(playerNum)
      console.log(`players array: `, players)
      
      dealerDeck = playDeck
      if ((cardsOfPlayer[0].value ===10 && cardsOfPlayer[1].name === 'ace') ||
          (cardsOfPlayer[1].value === 10 && cardsOfPlayer[0].name === 'ace')){
            mode = "start mode"
            return "player won blackjack."
      }else{
        mode = "dealer mode"
        return  `the player total of 2 cards is ${sumOfHandPlayer}.`
      }
    }
    //create object
    const recordParticipants = Object.fromEntries(players.map(key=>[key, handOfPlayer]))  
    console.log(`record of cards across players `, recordParticipants) 
  }
    // map recordNum in  players as key and handofPlayer as values


    // mode = "dealer mode" /// ????
  
  if (mode == "dealer mode") {  
      // initialise array for dealer cards
      let cardsOfDealer = []
  
      // // initialise object for dealer cards and dealer score
      // let handOfDealer = {}
      // computer take 2 cards 
      let dealerCard1 = dealerDeck.pop()
      cardsOfDealer.push(dealerCard1)
      let dealerCard2 = dealerDeck.pop()
      cardsOfDealer.push(dealerCard2)
      let sumOfDealer = cardsOfDealer[0].value + cardsOfDealer[1].value 
      console.log(`the dealers cards are: `, cardsOfDealer, `and the dealer sum is `, sumOfDealer)
      console.log(`Remaining Deck now has`, dealerDeck.length, `cards.`)

      if((cardsOfDealer[0].value ===10 && cardsOfDealer[1].name === 'ace') ||
         (cardsOfDealer[1].value === 10 && cardsOfDealer[0].name === 'ace')){
          mode = "start mode"
           return "player won blackjack." 
      }else if(sumOfDealer >= 17){
        if(sumOfDealer>sumOfHandPlayer){
          mode = "start mode"
          message = `dealer wins. The dealer sum is ${sumOfDealer}.`
        }else if(sumOfDealer<sumOfHandPlayer){
          mode = "start mode"
          message = `you win. The Dealer sum is ${sumOfDealer}.`
        }else if(sumOfDealer===sumOfHandPlayer){
          mode = "start mode"
          message = `its a draw. The dealer sum is ${sumOfDealer}.`
        }
      } else if (sumOfDealer < 17){
          mode = "start mode"
          message = `Hit and end game. The dealer sum is ${sumOfDealer}.`
      } 
        return message  
  }
}    

      

    // check if dealer meets minimum 17 otherwise return to start mode  
    // player decides hit (draw a card) or stand (end their turn)
    // find new total of every participannt

