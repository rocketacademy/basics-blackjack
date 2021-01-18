// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['♥', '♦', '♣', '♠'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let value = rankCounter
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
        value = 11
      } else if (cardName === '11') {
        cardName = 'J';
        value = 10
      } else if (cardName === '12') {
        cardName = 'Q';
        value = 10
      } else if (cardName === '13') {
        cardName = 'K';
        value = 10
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: value
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};




// Global Variables
let gameMode = 'start'
let playerHand = [];
let dealerHand = [];
let myOutputValue;


// function that deals cards to both player and dealer
const dealCard = (playerArray) => {
  playerArray.push(deck.pop())
  return playerArray
};

//function to check if dealer's hand is more than 16
const MoreThanSixteen = () => {
  let sum = 0;
  for (let i = 0; i < dealerHand.length; i += 1) {
    sum += dealerHand[i].value
    console.log(sum)
  }
  if (sum > 16) {
    return true
  } else {
    return false
  }
}

// function to check for win/lose
const checkWin = () => {
  let playerSum = 0;
  let dealerSum = 0;
  for (let i = 0; i < playerHand.length; i += 1) {
    playerSum += playerHand[i].value
  }
  for (let j = 0; j < dealerHand.length; j += 1) {
    dealerSum += dealerHand[j].value
  }
  // check for final game win
  if (gameMode === 'stand') {
    if (playerSum > 21 && dealerSum > 21) {
      console.log("test1")
      myOutputValue = printCards(playerHand, dealerHand, show = true) + '<br />DRAW! Both players busted!'
    } else if (playerSum > 21) {
      myOutputValue = printCards(playerHand, dealerHand, show = true) + '<br />Player Lost'
      console.log("test2")
      gameMode = 'end'
    } else if (dealerSum > 21) {
      myOutputValue = printCards(playerHand, dealerHand, show = true) + '<br/> Dealer Busted! Player Wins'
      gameMode = 'end'
    } else if (playerSum > dealerSum) {
        myOutputValue = printCards(playerHand, dealerHand, show = true) + '<br/> Player Wins'
        gameMode = 'end'
    } else if (dealerSum > playerSum) {
        myOutputValue = printCards(playerHand, dealerHand, show = true) + '<br/> Dealer Wins'
        gameMode = 'end'
    } else {
        myOutputValue = printCards(playerHand, dealerHand, show = true) + '<br/> Draw'
        gameMode = 'end'
    }
  }
  // check if player busts 21 while hitting
  if (gameMode === 'Hit or Stand') {
    // check if player gets 21 while hitting
    if (playerSum === 21) {
      myOutputValue = printCards(playerHand, dealerHand, show = true) + '<br />Player Wins'
      gameMode = 'end'
    } else {
        myOutputValue = printCards(playerHand, dealerHand) + "<br /><br />Hit or Stand?"
    }
  }
  // check if player gets 21 immediately
  if (gameMode === 'player turn') {
    if (playerSum === 21) {
      myOutputValue = printCards(playerHand, dealerHand, show = true) + '<br />Player Wins'
      gameMode = 'end'
    }
  }
}


// function to print out player and dealer's cards
const printCards = (cardArray1, cardArray2, show = false) => {
  let cardString = ''
  let cardString2 = ''
  let sumOne = 0;
  let sumTwo = 0;
  for (let i = 0; i < cardArray1.length; i += 1) {
    cardString += `${cardArray1[i].name}` + `${cardArray1[i].suit} `
    sumOne += cardArray1[i].value
  }
  for (let j = 0; j < cardArray2.length; j += 1) {
    cardString2 += `${cardArray2[j].name}` + `${cardArray2[j].suit} `
    sumTwo += cardArray2[j].value
  }
  if (show === true) {
    cardString = 
    `Player's Cards: <br/>
    ${cardString} <br/>
    value: ${sumOne} <br/>
    <br/>
    Dealer's Cards: <br/>
    ${cardString2} <br/>
    value: ${sumTwo}`
    return cardString
  } else if (show === false){
      cardString = 
      `Player's Cards: <br/>
      ${cardString} <br/>
      value: ${sumOne} <br/>
      <br/>
      Dealer's Cards: <br/>
      ${cardArray2[0].name}${cardArray2[0].suit}`
      return cardString
  }
}                                             

// shuffle deck
const deck = shuffleCards(makeDeck());
// deal 2 cards to each player
dealCard(playerHand)
dealCard(dealerHand)
dealCard(playerHand)
dealCard(dealerHand)

var main = function (input) {
  // get user to click on submit to start the game
  if (gameMode === 'start') {
    myOutputValue = 'Click on submit to start the game!'
    gameMode = 'player turn'
    checkWin()
  }

  // cards are dealt to player and dealer
  if (gameMode === 'player turn') {
    myOutputValue = printCards(playerHand, dealerHand) + "<br /><br />Hit or Stand? (h/s)"
    gameMode = 'Hit or Stand'
  }
  // player chooses to hit or stand
  if (gameMode === 'Hit or Stand') {
    let userInput = document.getElementById('my-input').value
    if (userInput === 'h') {
      dealCard(playerHand)
      // check if player gets 21 while hitting
      checkWin()
    } else if (userInput === 's') {
        gameMode = 'stand'
        while (MoreThanSixteen() === false) {
          dealCard(dealerHand)
        }
        checkWin()
      }
  }
  return myOutputValue
}