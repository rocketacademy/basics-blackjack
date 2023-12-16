var cardDeck = [];

var playerDetails = []; //Keeps Player name, Coins, Bet
var dealerHand = [];

var gameMode = "start";

var currPlayer = 0;

var blackjackMode = "start";

var showCard = function (name, suit) {
  if (name == "ace") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Playing_card_club_A.svg/800px-Playing_card_club_A.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Playing_card_diamond_A.svg/800px-Playing_card_diamond_A.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Playing_card_heart_A.svg/800px-Playing_card_heart_A.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Playing_card_spade_A.svg/800px-Playing_card_spade_A.svg.png" width="100">`;
  } else if (name == "2") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Playing_card_club_2.svg/800px-Playing_card_club_2.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Playing_card_diamond_2.svg/800px-Playing_card_diamond_2.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Playing_card_heart_2.svg/800px-Playing_card_heart_2.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Playing_card_spade_2.svg/800px-Playing_card_spade_2.svg.png" width="100">`;
  } else if (name == "3") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Playing_card_club_3.svg/800px-Playing_card_club_3.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Playing_card_diamond_3.svg/800px-Playing_card_diamond_3.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Playing_card_heart_3.svg/800px-Playing_card_heart_3.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Playing_card_spade_3.svg/800px-Playing_card_spade_3.svg.png" width="100">`;
  } else if (name == "4") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Playing_card_club_4.svg/800px-Playing_card_club_4.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Playing_card_diamond_4.svg/800px-Playing_card_diamond_4.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Playing_card_heart_4.svg/800px-Playing_card_heart_4.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Playing_card_spade_4.svg/800px-Playing_card_spade_4.svg.png" width="100">`;
  } else if (name == "5") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_club_5.svg/800px-Playing_card_club_5.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Playing_card_diamond_5.svg/800px-Playing_card_diamond_5.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Playing_card_heart_5.svg/800px-Playing_card_heart_5.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_spade_5.svg/800px-Playing_card_spade_5.svg.png" width="100">`;
  } else if (name == "6") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Playing_card_club_6.svg/800px-Playing_card_club_6.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Playing_card_diamond_6.svg/800px-Playing_card_diamond_6.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Playing_card_heart_6.svg/800px-Playing_card_heart_6.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Playing_card_spade_6.svg/800px-Playing_card_spade_6.svg.png" width="100">`;
  } else if (name == "7") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Playing_card_club_7.svg/800px-Playing_card_club_7.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Playing_card_diamond_7.svg/800px-Playing_card_diamond_7.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_heart_7.svg/800px-Playing_card_heart_7.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Playing_card_spade_7.svg/800px-Playing_card_spade_7.svg.png" width="100">`;
  } else if (name == "8") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Playing_card_club_8.svg/800px-Playing_card_club_8.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Playing_card_diamond_8.svg/800px-Playing_card_diamond_8.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_heart_8.svg/800px-Playing_card_heart_8.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Playing_card_spade_8.svg/800px-Playing_card_spade_8.svg.png" width="100">`;
  } else if (name == "9") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Playing_card_club_9.svg/800px-Playing_card_club_9.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Playing_card_diamond_9.svg/800px-Playing_card_diamond_9.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_heart_9.svg/800px-Playing_card_heart_9.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Playing_card_spade_9.svg/800px-Playing_card_spade_9.svg.png" width="100">`;
  } else if (name == "10") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Playing_card_club_10.svg/800px-Playing_card_club_10.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Playing_card_diamond_10.svg/800px-Playing_card_diamond_10.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Playing_card_heart_10.svg/800px-Playing_card_heart_10.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Playing_card_spade_10.svg/800px-Playing_card_spade_10.svg.png" width="100">`;
  } else if (name == "jack") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Playing_card_club_J.svg/800px-Playing_card_club_J.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Playing_card_diamond_J.svg/800px-Playing_card_diamond_J.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Playing_card_heart_J.svg/800px-Playing_card_heart_J.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Playing_card_spade_J.svg/800px-Playing_card_spade_J.svg.png" width="100">`;
  } else if (name == "queen") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Playing_card_club_Q.svg/800px-Playing_card_club_Q.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Playing_card_diamond_Q.svg/800px-Playing_card_diamond_Q.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Playing_card_heart_Q.svg/800px-Playing_card_heart_Q.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Playing_card_spade_Q.svg/800px-Playing_card_spade_Q.svg.png" width="100">`;
  } else if (name == "king") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Playing_card_club_K.svg/800px-Playing_card_club_K.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Playing_card_diamond_K.svg/800px-Playing_card_diamond_K.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Playing_card_heart_K.svg/800px-Playing_card_heart_K.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Playing_card_spade_K.svg/800px-Playing_card_spade_K.svg.png" width="100">`;
  } else if ((name == 0, suit == 0)) {
    return `<img src="https://i.pinimg.com/564x/34/d3/07/34d3075782ced7649b440d38388d6c70.jpg" width="100">`;
  }
};

var addCardToDeck = function () {
  cardDeck = [];
  var cardSuits = ["hearts", "diamonds", "clubs", "spades"];

  for (let pile = 0; pile < cardSuits.length; pile++) {
    for (let card = 1; card <= 13; card++) {
      var cardName = "";
      if (card == 1) cardName = "ace";
      else if (card == 11) cardName = "jack";
      else if (card == 12) cardName = "queen";
      else if (card == 13) cardName = "king";
      else cardName = card;

      if (card > 10)
        cardDeck.push({
          name: cardName,
          suit: cardSuits[pile],
          rank: card,
          value: 10,
        });
      else
        cardDeck.push({
          name: cardName,
          suit: cardSuits[pile],
          rank: card,
          value: Number(card),
        });
    }
  }
};

var randomizer = function (num) {
  return Math.floor(Math.random() * num);
};

var shuffleDeck = function () {
  var shufffle = randomizer(100);
  console.log(shufffle);
  for (let numShuffle = 0; numShuffle < shufffle; numShuffle++) {
    var cardOne = randomizer(cardDeck.length);
    var cardTwo = randomizer(cardDeck.length);

    var temp = cardDeck[cardOne];
    cardDeck[cardOne] = cardDeck[cardTwo];
    cardDeck[cardTwo] = temp;
  }
};

var startMode = function (start) {
  if (start.toLowerCase() == "start") {
    gameMode = "players";
    return `Number of Players: </br>
        How many players will be playing Blackjack?`;
  } else {
    return `Welcome to Basics Blackjack, Type '<b>start</b>' to play the Game </br></br>
        If you do not know the rules of Blackjack, here is a simple Guide.
        <iframe width="420" height="345" src="https://www.youtube.com/embed/eyoh-Ku9TCI"></iframe>`;
  }
};

var playerMode = function (numPlayer) {
  var checkNum = Number(numPlayer);
  if (!Number.isInteger(checkNum))
    return `Please input a number </br></br>
    Number of Players: </br>
    How many players will be playing Blackjack?`;
  else if (checkNum == 0)
    return `Atleast 1 player is needed </br></br>
    Number of Players: </br>
    How many players will be playing Blackjack?`;
  else if (checkNum > 7)
    return `Maximum of 7 Players only </br></br>
    Number of Players: </br>
    How many players will be playing Blackjack?`;

  for (let player = 0; player < checkNum; player++) {
    playerDetails.push({
      name: player + 1,
      coins: 0,
      bet: 0,
      cards: [],
      stand: false,
    });
  }

  gameMode = "coins";
  return `Number of Players: <b>${checkNum}</b></br>
     Starting currency per player: </br></br> How much currency will each player start (<i>Minimum of 10</i>)?`;
};

var coinMode = function (coin) {
  var checkCoin = Number(coin);
  if (!Number.isInteger(checkCoin))
    return `Please input a number </br></br>
      Number of Players: <b>${playerDetails.length}</b></br>
      Starting currency per player: </br></br> How much currency will each player start (Minimum of 10)?`;
  if (checkCoin < 10)
    return `Currency must be minimum of 10 </br></br>
      Number of Players: <b>${playerDetails.length}</b></br>
      Starting currency per player: </br></br> How much currency will each player start (Minimum of 10)?`;

  for (let player = 0; player < playerDetails.length; player++) {
    playerDetails[player].coins = checkCoin;
  }

  gameMode = "game proper";
  return `Number of Players: <b>${playerDetails.length} </b></br>
     Starting currency per player: <b>${coin} </b></br></br>
     The Blackjack will now start. </br>
     Please click <b>'Submit'</b>`;
};

var gameProperMode = function () {
  gameMode = "game proper bet";
  return `- BETTING - </br>
  How much will you bet Player ${playerDetails[currPlayer].name}? </br> Coins: ${playerDetails[currPlayer].coins}`;
};

var gameProperBetMode = function (bet) {
  var checkBet = Number(bet);

  if (!Number.isInteger(checkBet))
    return `Not a Number </br></br>
  - BETTING - </br>
  How much will you bet <b> Player ${playerDetails[currPlayer].name} </b> </br> Coins: ${playerDetails[currPlayer].coins}?`;
  else {
    if (playerDetails[currPlayer].coins < checkBet) {
      return `Your currency would not reach: ${bet} </br></br>
  - BETTING - </br>
  How much will you bet Player ${playerDetails[currPlayer].name}? </br> Coins: ${playerDetails[currPlayer].coins}`;
    } else if (checkBet == 0)
      return `You need to bet </br></br>
  - BETTING - </br>
  How much will you bet Player ${playerDetails[currPlayer].name}? </br> Coins: ${playerDetails[currPlayer].coins}`;
    else {
      playerDetails[currPlayer].bet = checkBet;
      playerDetails[currPlayer].coins -= checkBet;
      currPlayer++;

      if (currPlayer < playerDetails.length)
        return `- BETTING - </br>
  How much will you bet Player ${playerDetails[currPlayer].name} ? </br> Coins: ${playerDetails[currPlayer].coins}`;
      else {
        var betString = "";
        for (let p = 0; p < playerDetails.length; p++) {
          betString += `Player ${p + 1}: ${playerDetails[p].bet} | Remaining ${
            playerDetails[p].coins
          }</br>`;
        }

        gameMode = "blackjack";
        currPlayer = 0;
        addCardToDeck();
        shuffleDeck();
        return `${betString} </br> </br> Collecting Bets...<br>Press Submit to Continue `;
      }
    }
  }
};

var getCard = function () {
  var rndCard = randomizer(cardDeck.length);
  var playerCard = cardDeck[rndCard];
  cardDeck.splice(rndCard, 1);
  return playerCard;
};

var blackjackStart = function () {
  // adding cards to players and dealer
  for (let card = 1; card <= 2; card++) {
    for (let player = 0; player <= playerDetails.length; player++) {
      var genCard = getCard();
      if (player == playerDetails.length) {
        dealerHand.push(genCard);
      } else {
        playerDetails[player].cards.push(genCard);
      }
    }
  }

  //display player cards at hand
  var cardString = "<b>- CARDS AT PLAY -</b> </br></br>";
  for (let player = 0; player < playerDetails.length; player++) {
    cardString += `Player ${playerDetails[player].name}: </br>`;
    for (let card = 0; card < playerDetails[player].cards.length; card++) {
      cardString += `${showCard(
        playerDetails[player].cards[card].name,
        playerDetails[player].cards[card].suit
      )}`;
    }
    cardString += `</br></br>`;
  }
  cardString += `Dealers Hand: </br>`;
  for (let card = 0; card < dealerHand.length; card++) {
    if ((card = 1)) cardString += `${showCard(0, 0)}`;
    cardString += `${showCard(dealerHand[card].name, dealerHand[card].suit)}`;
  }

  cardString += `</br></br> click '<b>Submit</b>' to continue...`;
  blackjackMode = "analysis";
  return cardString;
};

var blackjackHitOrStand = function (hitOrStand) {
  var cardString = "";
  if (hitOrStand.toLowerCase() == "hit") {
    var genCard = getCard();
    playerDetails[currPlayer].cards.push(genCard);

    cardString = `<b>- Player ${playerDetails[currPlayer].name} new cards -</b> </br>`;
    cardString += displayCardInHand(playerDetails[currPlayer].cards);
  } else if (hitOrStand.toLowerCase() == "stand") {
    playerDetails[currPlayer].stand = true;

    cardString = `<b>- Player ${playerDetails[currPlayer].name} cards -</b> </br>`;
    cardString += displayCardInHand(playerDetails[currPlayer].cards);

    cardString += `</br></br> Cards Stand`;
    currPlayer++;
  } else {
    cardString = `<b>- Player ${playerDetails[currPlayer].name} cards -</b> </br>`;
    cardString += displayCardInHand(playerDetails[currPlayer].cards);

    cardString = `Player ${playerDetails[currPlayer].name} please input 'Hit' or 'Stand' </br></br> ${cardString}`;
  }

  cardString += `</br></br> Click '<b>Submit</b>' to Continue`;
  blackjackMode = "analysis";
  return cardString;
};

var getCardValue = function (cardArray) {
  var cardValue = 0;
  var aceCard = 0;
  //count card value
  for (let card = 0; card < cardArray.length; card++) {
    if (cardArray[card].name == "ace") aceCard++;
    else cardValue += Number(cardArray[card].value);
  }

  if (aceCard > 0) {
    for (let ace = 0; ace < aceCard; ace++) {
      if (cardValue + 11 <= 21) cardValue += 11;
      else cardValue++;
    }
  }

  return cardValue;
};

var displayCardInHand = function (handArray) {
  var handString = "";
  for (let card = 0; card < handArray.length; card++) {
    handString += `${showCard(handArray[card].name, handArray[card].suit)}`;
  }

  return handString;
};

var blackjackAnalysis = function () {
  if (currPlayer == playerDetails.length) {
    blackjackMode = "dealer";
    currPlayer = 0;
    return `<b>Dealer's Turn</b> </br></br>
    Click '<b>Submit</b> to continue`;
  }
  var modeString = `<b>- Player ${playerDetails[currPlayer].name} -</b></br> Cards:`;
  //display cards
  modeString += displayCardInHand(playerDetails[currPlayer].cards);

  var cardValue = getCardValue(playerDetails[currPlayer].cards);
  console.log(
    `player ${playerDetails[currPlayer].name} card value ${cardValue}`
  );
  var pName = playerDetails[currPlayer].name;
  if (cardValue == 21) {
    var prizeCoin = playerDetails[currPlayer].bet * 2;
    playerDetails[currPlayer].coins += prizeCoin;
    playerDetails[currPlayer].bet = 0;

    currPlayer++;
    return `YOU WON Player ${pName}! <br> ${prizeCoin} added. </br></br> Click '<b>Submit</b>' to continue`;
  } else if (cardValue < 21) {
    if (!playerDetails[currPlayer].stand) {
      blackjackMode = "HitOrStand";
      cardString = `Player ${playerDetails[currPlayer].name} cards <br>`;
      cardString += displayCardInHand(playerDetails[currPlayer].cards);
      return `${cardString} <br> Would you like to <i>Hit</b> or <i>Stand</b>`;
    }
  } else {
    playerDetails[currPlayer].bet = 0;
    currPlayer++;
    return `YOU LOST Player ${pName}! </br></br> Click '<b>Submit</b>' to continue`;
  }
};

var blackjackDealer = function () {
  //display Dealer cards
  var cardString = "<b> - Dealer Hand - </b>";
  var cardValue = getCardValue(dealerHand);

  while (cardValue < 17) {
    dealerHand.push(getCard());
    cardValue = getCardValue(dealerHand);
  }
  cardString += displayCardInHand(dealerHand);

  cardString += `</br></br>`;

  var pCardValue = 0;
  for (let player = 0; player < playerDetails.length; player++) {
    if (playerDetails[player].stand) {
      cardString += `Player ${playerDetails[player].name} </br>`;
      cardString += displayCardInHand(playerDetails[player].cards);
      pCardValue = getCardValue(playerDetails[player].cards);

      if (cardValue > 21) {
        var prizeCoin = playerDetails[player].bet * 2;
        playerDetails[player].coins += prizeCoin;
        playerDetails[player].bet = 0;
        cardString += `YOU WON Player ${playerDetails[player].name}! <br> ${prizeCoin} added. </br></br>`;
      } else if (cardValue == 21) {
        playerDetails[player].bet = 0;
        cardString += `YOU LOST Player ${playerDetails[player].name}! </br></br>`;
      } else {
        if (pCardValue > cardValue) {
          console.log(pCardValue);
          var prizeCoin = playerDetails[player].bet * 2;
          playerDetails[player].coins += prizeCoin;
          playerDetails[player].bet = 0;
          cardString += `YOU WON Player ${playerDetails[player].name}! <br> ${prizeCoin} added. </br></br>`;
        } else {
          playerDetails[player].bet = 0;
          cardString += `YOU LOST Player ${playerDetails[player].name}! </br></br>`;
        }
      }
    }
  }

  cardString += `Player Coins: </br>`;
  for (let i = 0; i < playerDetails.length; i++) {
    cardString += `Player ${playerDetails[i].name} | coins: ${playerDetails[i].coins} </br>`;
  }

  cardString += `</br> Do you want to Continue to play? (y/n) </br> <i>WARNING</i> Player/s with 0 coin are eliminated if you want to continue`;
  blackjackMode = "play again";

  return cardString;
};

var resetDeck = function () {
  addCardToDeck();
  shuffleDeck();
};

var resetAll = function () {
  cardDeck = [];
  playerDetails = []; //Keeps Player name, Coins, Bet
  dealerHand = [];
  gameMode = "start";
  currPlayer = 0;
  blackjackMode = "start";
  resetDeck();
};

var resetPlayerDetails = function () {
  var playersEliminated = [];
  dealerHand = [];
  for (let i = 0; i < playerDetails.length; i++) {
    playerDetails[i].stand = false;
    playerDetails[i].cards = [];
    if (Number(playerDetails[i].coins) == 0) {
      playersEliminated.push(i);
    }
  }

  if (playerDetails.length == playersEliminated.length) {
    console.log(`same`);
    playerDetails = [];
  } else {
    console.log(`not same`);
    while (playersEliminated.length > 0) {
      playerDetails.splice(playersEliminated[playersEliminated.length - 1], 1);
      playersEliminated.pop();
    }
  }

  gameMode = "game proper";
  blackjackMode = "start";
  resetDeck();
};

var blackjackPlayAgain = function (input) {
  var userAnswer = input.toLowerCase();
  console.log(userAnswer);
  if (userAnswer == "y") {
    resetPlayerDetails();
    if (playerDetails.length == 0) {
      resetAll();
      return "No players remaining. </br>Game is Reseting...";
    }
    return `Click <b>'Submit'</b> to continue`;
  } else if (userAnswer == "n") {
    return `Do you want to reset the game? Type '<b>reset</b> or </br>
    Do you want to Continue to play? (y/n) </br> <i>WARNING</i> Player/s with 0 coin are eliminated if you want to continue`;
  } else
    return `Please type (y/n) </br></br>
  Do you want to reset the game? Type '<b>reset</b> or </br>
  Do you want to Continue to play? (y/n) </br> <i>WARNING</i> Player/s with 0 coin are eliminated if you want to continue`;
};

var blackjackMain = function (input) {
  if (blackjackMode == "start") return blackjackStart();
  else if (blackjackMode == "analysis") return blackjackAnalysis();
  else if (blackjackMode == "HitOrStand") return blackjackHitOrStand(input);
  else if (blackjackMode == "dealer") return blackjackDealer(input);
  else if (blackjackMode == "play again") return blackjackPlayAgain(input);
};

var main = function (input) {
  if (input.toLowerCase() == "reset") {
    resetAll();
    return `Welcome to Basics Blackjack, Type '<b>start</b>' to play the Game </br></br>
        If you do not know the rules of Blackjack, here is a simple Guide.
        <iframe width="420" height="345" src="https://www.youtube.com/embed/eyoh-Ku9TCI"></iframe>`;
  } else {
    if (gameMode == "start") return startMode(input);
    else if (gameMode == "players") return playerMode(input);
    else if (gameMode == "coins") return coinMode(input);
    else if (gameMode == "game proper") return gameProperMode(input);
    else if (gameMode == "game proper bet") return gameProperBetMode(input);
    else if (gameMode == "blackjack") return blackjackMain(input);
  }
};
