/*
There will be only two players. One human and one computer (for the Base solution).
The computer will always be the dealer.
Each player gets dealt two cards to start.
The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
The dealer has to hit if their hand is below 17.
Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
The player who is closer to, but not above 21 wins the hand.
*/

// Global Variables declariation
var players = [];
// var playerHandValue = checkValue(player[0]);

var computers = [
  // {
  //   name: "computer",
  //   hands: [[]],
  //   points: 0, // array of points and wagers corresponding to hands
  //   wager: 0,
  //   chips: 100,
  //   readyState: [false], // array denoting whether the hand is settled
  // },
];
// var computerHandValue = checkValue(computer[0]);

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

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
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
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
  console.log(cardDeck);
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Initialise deck creation and shuffling
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

// var draw2Cards = function (who) {
//   who.hands = [shuffledDeck.pop(), shuffledDeck.pop()];
//   return who;
// };

// var splitOption = function(){

// }
var wait = function(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

var checkValue = function (player) {
  player.points = 0;
  console.log(player);
  // getting values of player first hand, if split implemented, do another for loop to change hands
  // player.hands[0] = [shuffledDeck.pop(), shuffledDeck.pop()];
  for (var i = 0; i < player.hands[0].length; i += 1) {
    console.log(`${player.name} cards: ${JSON.stringify(player.hands[0])}`);
    var currCardCounter = 0;
    var acesInHand = 0;

    // getting value of each card from player first hand
    while (currCardCounter < player.hands[i].length) {
      console.log(`running card ${currCardCounter}`);
      var currCard = player.hands[i][currCardCounter];
      // Deal with aces and picture rank values
      /* Special case for aces:
      if 2 aces dealt at start but allow for split
      else aces will be 11 for 2 cards
      else aces will be 1 for 3 cards and above
      */
      if (currCard.rank == 1) {
        player.points += 11;
        acesInHand += 1;
      } else if (
        currCard.rank == 11 ||
        currCard.rank == 12 ||
        currCard.rank == 13
      ) {
        player.points += 10;
      } else {
        player.points += currCard.rank;
      }
      // Check for if 2 aces dealt at start
      if (player.hands[i].length == 2 && acesInHand == 2) {
        player.points = 21;
        // myOutputValue = `You have 2 aces for a blackjack win! or do you want to split?`;
        return player;
        // check condition for split later
      }
      if (player.hands[i].length > 2 && acesInHand >= 2) {
        if (player.points > 21) {
          var aceCounter = 0;
          while (aceCounter < acesInHand) {
            player.points -= 10;
            aceCounter += 1;
            if (player.points < 21) {
              break;
            }
          }
        }
      }
      currCardCounter += 1;
    }
    return player;
  }
};



var hit = function(){
  for (var i = 0; i<players.length; i++){
    if (mainGameFunction == "waiting instructions") {
      if(players[i].hands[i].length <6 ){
        console.log(mainGameFunction)
        players[i].hands[i].push(shuffledDeck.pop());
        checkValue(players[i]).points;
        console.log(`playershands: ${players[i].points}`);
        checkValue(computers[i]).points;
        console.log(`computershands: ${computers[i].points}`);
        myOutputValue =
          "computers had " +
          computers[i].points +
          ".<br><br>players had " +
          players[i].points +
          ".<br><br>" +
          "players would you like to hit or stand?";
        mainGameFunction = "waiting instructions";
        myOutputValue = deckOutput(myOutputValue,players)
        return myOutputValue;
      }
      else{
        return "Max number of cards drawn reached"
      }
    }
  }
}

var check_win = function(){
  for (var i = 0; i<players.length; i++){
    myOutputValue =
        "computers final value is: " +
        computers[i].points +
        ".<br><br>players final value is: " +
        players[i].points +
        ".";
      mainGameFunction = "start";
      if(players[i].points >21 && computers[i].points > 21){
        finalOutput = "Both Busts<br><br>" + myOutputValue;
      }
        else if (computers[i].points > players[i].points && computers[i].points <= 21) {
        finalOutput = "computers Wins!<br><br>" + myOutputValue;
      } else if (computers[i].points < players[i].points && players[i].points <= 21) {
        finalOutput = "players Wins!<br><br>" + myOutputValue;
      } else if (computers[i].points > 21) {
        finalOutput = "computers Busts!<br><br>" + myOutputValue;
      } else if (players[i].points > 21) {
        finalOutput = "players Busts!<br><br>" + myOutputValue;
      } else if (computers[i].points == players[i].points) {
        finalOutput = "ISSA DRAW!<br><br>" + myOutputValue;
      }
    return finalOutput;
  }
}

var stand = function(){
  for (var i = 0; i<players.length; i++){
    if (mainGameFunction == "waiting instructions") {
      console.log(mainGameFunction + " in stand button")
      myOutputValue = `players final hand value is ${players[i].points}!<br><br>computers's turn to draw`;
      mainGameFunction = "computers turn";
      return myOutputValue;
    }
    else if (mainGameFunction == "computers turn") {
      if (computers[i].points < 17){
        console.log(mainGameFunction)
        computers[i].hands[i].push(shuffledDeck.pop());
        checkValue(players[i]).points;
        console.log(`playershands: ${players[i].points}`);
        checkValue(computers[i]).points;
        console.log(`computershands: ${computers[i].points}`);
        myOutputValue =
          "computers had " +
          computers[i].points +
          ".<br><br>players had " +
          players[i].points +
          ".<br><br>" +
          "computers thinking whether to draw....";
        myOutputValue = deckOutput(myOutputValue,computers)
        return myOutputValue;
        }
      else{
        mainGameFunction = "check win"
        return check_win()
      }
    }
    else{
      return "Please click restart button to replay"
    }
  }
}

var dealHands = function(){
    // alternate handing cards to each player
    // 2 cards each
    for(var i = 0; i < 2; i++)
    {
        for (var x = 0; x < players.length; x++)
        {
            var card = shuffledDeck.pop();
            players[x].hands[0].push(card);
        }
    }
    for(var i = 0; i < 2; i++)
    {
        for (var x = 0; x < computers.length; x++)
        {
          var card = shuffledDeck.pop();
          computers[x].hands[0].push(card);
        }
      }
    }
    
    var deckOutput = function(myOutputValue,whose_turn){
      myOutputValue = myOutputValue 
      for (i = 0; i<whose_turn.length;i++){
        for(var player = 0;player < whose_turn[i].hands[i].length;player ++){
          var card_Name = whose_turn[i].hands[i][player].name
          var card_Suit = whose_turn[i].hands[i][player].suit
      var player_Name = whose_turn[i].name
      myOutputValue += `<br> ${player_Name} drew: ${card_Name} ${card_Suit} for card ${player + 1}`
    }
    return myOutputValue
  }
}
mainGameFunction = `start`;

var restart= function (){
  mainGameFunction = "start"
  players = []
  computers = []
  console.log(mainGameFunction)
  myOutputValue = main()
  return myOutputValue
}

var main = function (input) {
  if (mainGameFunction == "start") {
    console.log(mainGameFunction)
    myOutputValue = `Welcome to blackjack please enter number of players and click enter`;
    mainGameFunction = "players entered";
    console.log(players)
    console.log(computers)
    return myOutputValue;
  }
  
  if(mainGameFunction == "players entered"){
    if(isNaN(input)==false){
      computers.push({
      name: "computer",
      hands: [[]],
      points: 0, // array of points and wagers corresponding to hands
      wager: 0,
      chips: 100,
      readyState: [false], // array denoting whether the hand is settled
    },)
    for (i = 0; i < input;i++){
      players.push({
        name: "player",
        hands: [[]],
        points: 0, // array of points and wagers corresponding to hands
        wager: 0,
        chips: 100,
        readyState: [false], // array denoting whether the hand is settled
      })
    }
    console.log(players)
    console.log(computers)
    myOutputValue = `Welcome to blackjack click play to start the game`;
    mainGameFunction = "draw cards"
    return myOutputValue
    }
    else{
      mainGameFunction = "players entered";
      return `Please input number of pax playing and click play`
    } 
  }
  for (var i = 0; i<players.length; i++){
    if (mainGameFunction == "draw cards") {
      dealHands()
      console.log(mainGameFunction)
      checkValue(players[i]);
      console.log(`playershands: ${players[i].points}`);
      checkValue(computers[i]);
      console.log(`computershands: ${computers[i].points}`);
      // Construct an output string to communicate which cards were drawn
      
      var myOutputValue =
      "player would you like to hit or stand?" +
      "<br><br>" +
      "computers total " +
      computers[i].points +
      ".<br><br>player total " +
      players[i].points+"<br>";

      myOutputValue = deckOutput(myOutputValue,players)
      mainGameFunction = "waiting instructions";
      return myOutputValue;
    }
    if (mainGameFunction == "waiting instructions") {
      console.log(mainGameFunction)
        myOutputValue = "Please choose either hit or stand";
        mainGameFunction = "waiting instructions"
        console.log("waiting instructions in play button");
        return myOutputValue;
    }
  }
};
