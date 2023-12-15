//Global Variables
var cardDeck = [];
var playerArray = [];
var selectionArray = []; // use to check if card already dealt out
var stand = 0;
var hit = 0;
var player = 0; // Player is 1, Dealer is 2
var instantWinRank = ["Ace", "King", "Queen", "Jack", "10"];
var mode = 0;
var suit = ["Diamond", "Clubs", "Hearts", "Spades"];
var rank = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];
var value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
//Generate the Deck
for (var x = 0; x < 4; x += 1) {
  for (var y = 0; y < 13; y += 1) {
    var cardAttribute = {};
    cardAttribute.suit = suit[x];
    cardAttribute.number = y + 1;
    cardAttribute.rank = rank[y];
    cardAttribute.value = value[y];
    console.log("Card Attribute Suit: " + cardAttribute.suit);
    console.log("Card Attribute Number: " + cardAttribute.number);
    console.log("Card Attribute Rank: " + cardAttribute.rank);
    cardDeck.push(cardAttribute);
  }
}

var main = function (input) {
  //check input and select mode
  if (input == "hit") {
    mode = "hit";
  } else if (input == "stand") {
    mode = "stand";
  }

  //Shuffle the Deck if start of new round and deals out 2 cards per player
  if (player == 0) {
    for (var x = 0; x < cardDeck.length; x += 1) {
      randomStartNum = getRandomIndex(cardDeck.length);
      randomEndNum = getRandomIndex(cardDeck.length);
      var saveCopy = cardDeck[randomEndNum];
      cardDeck[randomEndNum] = cardDeck[randomStartNum];
      cardDeck[randomStartNum] = saveCopy;
      console.log("Start num" + randomStartNum);
      console.log("End Num " + randomEndNum);
    }
    playerArray = [];
    selectionArray = [];
    //Deals out 2 card to player and dealer
    for (var x = 0; x < 2; x += 1) {
      card1index = getRandomIndex(cardDeck.length);
      card2index = getRandomIndex(cardDeck.length);
      while (
        selectionArray.indexOf(card1index) != -1 ||
        selectionArray.indexOf(card2index) != -1
      ) {
        card1index = getRandomIndex(cardDeck.length);
        card2index = getRandomIndex(cardDeck.length);
      }
      playerArray.push([cardDeck[card1index], cardDeck[card2index]]);
      selectionArray.push(card1index);
      selectionArray.push(card2index);
    }
    player = 1; // handover to player 1 turn

    //check Instant Win condition
    //Instant Win if one card is Ace and other card is picture
    if (
      (playerArray[0][0].rank == "Ace" || playerArray[0][1].rank == "Ace") &&
      (instantWinRank.indexOf(playerArray[0][0].rank) != -1 ||
        instantWinRank.indexOf(playerArray[0][1].rank) != -1)
    ) {
      return `Dealer has ${playerArray[1][0].rank} of ${playerArray[1][0].suit} & ${playerArray[1][1].rank} of ${playerArray[1][1].suit}
       <br>Player has ${playerArray[0][0].rank} of ${playerArray[0][0].suit} & ${playerArray[0][1].rank} of ${playerArray[0][1].suit}<br><br> Player Wins!`;
    } else if (
      (playerArray[0][0].rank == "Ace" || playerArray[0][1].rank == "Ace") &&
      (instantWinRank.indexOf(playerArray[0][0].rank) != -1 ||
        instantWinRank.indexOf(playerArray[0][1].rank) != -1)
    ) {
      return `Dealer has ${playerArray[1][0].rank} of ${playerArray[1][0].suit} & ${playerArray[1][1].rank} of ${playerArray[1][1].suit}
       <br>Player has ${playerArray[0][0].rank} of ${playerArray[0][0].suit} & ${playerArray[0][1].rank} of ${playerArray[0][1].suit}<br><br> Dealer Wins!`;
    } else return "Press submit to continue";
  } else if (player == 1 && mode == 0) {        // Enter this mode if player = 1 and mode = 0
    output = `Player draws: <br> ${playerArray[0][0].rank} of ${playerArray[0][0].suit} <br> ${playerArray[0][1].rank} of ${playerArray[0][1].suit}`;
    var total = playerArray[0][0].value + playerArray[0][1].value
    //check if Ace can be 11
    for (var x = 0; x < playerArray[0].length; x+= 1){
      if (playerArray[0][x].rank == "Ace" && total + 10 <= 21){
        playerArray[0][x].value = 11
        total = total + 10 // increase in score if Ace changes to 11
      }
    }
    return output + `<br>Total Score is ${total} <br><br> Please enter hit or stand`;
  } else if (player == 1 && mode == "hit") {    // Enter this mode if player = 1 and mode = hit
    //Select new card
    newCardIndex = getRandomIndex(cardDeck.length);
    while (selectionArray.indexOf(newCardIndex) != -1) {
      newCardIndex = getRandomIndex(cardDeck.length);
    }
    selectionArray.push(newCardIndex);
    playerArray[0].push(cardDeck[newCardIndex]);

    output =
      output +
      `<br> ${playerArray[0][playerArray[0].length - 1].rank} of ${
        playerArray[0][playerArray[0].length - 1].suit
      }`;
    // check if total more than 21
    var total = 0;
    for (var x = 0; x < playerArray[0].length; x += 1) {
      total = total + playerArray[0][x].value;
    }
    //check if Ace can be 11
    for (var x = 0; x < playerArray[0].length; x+= 1){
      if (playerArray[0][x].rank == "Ace" && total + 10 <= 21){
        playerArray[0][x].value = 11
        total = total + 10 // increase in score if Ace changes to 11
      }
    }

    if (total > 21 || playerArray[0].length > 5) {    //ends player turn if total more than 21 or more than 5 cards drawn
      stand = 1;
      player = 2
      return "Total value = " + total + "<br> Press submit to continue";
    }

    return output + `<br>Total Score is ${total} <br><br> Please enter hit or stand`;
  }else if (player == 1 && mode == "stand"){    //Enter this mode if player = 1 and mode = stand
    var total = 0
    for (var x = 0; x < playerArray[0].length; x += 1) {
      total = total + playerArray[0][x].value;
    }
    player = 2
    return `Player has ${total} points <br><br> Press submit to continue`
  }else if (player == 2){   // enter this mode if player = 2, Dealer turn to play
    var dealerTotal = playerArray[1][0].value + playerArray[1][1].value
    while (dealerTotal < 17){
        //Select new card
      newCardIndex = getRandomIndex(cardDeck.length);
      while (selectionArray.indexOf(newCardIndex) != -1) {
        newCardIndex = getRandomIndex(cardDeck.length);
      }
      selectionArray.push(newCardIndex);
      playerArray[1].push(cardDeck[newCardIndex]);
      //compute dealer Total
      var dealerTotal = 0;
      for (var x = 0; x < playerArray[1].length; x += 1) {
        dealerTotal = dealerTotal + playerArray[1][x].value;
      }
      //check if Ace can be 11
      for (var x = 0; x < playerArray[1].length; x+= 1){
        if (playerArray[1][x].rank == "Ace" && dealerTotal + 10 <= 21){
          playerArray[1][x].value = 11
          dealerTotal = dealerTotal + 10 // increase in score if Ace changes to 11
        }
      }
    }
    //compare scores and output winner
    var playerOutput = ""
    var dealerOutput = ""
    var total = 0
    var dealerTotal = 0
    for (var x = 0; x < playerArray[0].length; x +=1){
      playerOutput =playerOutput +`<br> ${playerArray[0][x].rank} of ${playerArray[0][x].suit}`;
      total = total + playerArray[0][x].value
    }
    for (var x = 0; x < playerArray[1].length; x +=1){
      dealerOutput =dealerOutput +`<br> ${playerArray[1][x].rank} of ${playerArray[1][x].suit}`;
      dealerTotal = dealerTotal + playerArray[1][x].value
    }
    if ((total > 21 && dealerTotal > 21)|| dealerTotal == total){
      var winner = "No one"
    }else if (dealerTotal > total && dealerTotal < 21){
      var winner = "Dealer"
    }else if (total > dealerTotal && total < 21){
      var winner = "Player"
    }
  }

  return `Player scores ${total} with draws: ${playerOutput}<br><br> Dealer scores ${dealerTotal} with draws: ${dealerOutput} <br><br> ${winner} wins!`
};

//Get Random Index
var getRandomIndex = function (input) {
  return Math.floor(Math.random() * input);
};
