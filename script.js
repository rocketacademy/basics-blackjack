//globals
let playerCount = 3;
let userNames = [
  { username: "asd", bank: 0 },
  { username: "bsd", bank: 0 },
  { username: "csd", bank: 0 },
];
let changeUserName = 5;
let indexUserName = 2;

//to be reset after each game
let cardDeck = [];
let houseDraw = [];
let gamePlayed = 0;
let houseCardValue = 0;
let playerCardValue = [];
let winLossTie = 0;
let betAmount = [10, 10, 10];

//reset helper fn
let gameResetter = function () {
  cardDeck = [];
  houseDraw = [];
  gamePlayed = 0;
  houseCardValue = 0;
  playerCardValue = [];
  winLossTie = 0;
  betAmount = [];
};

//array shuffle helper fn
let shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

//card deck maker helper fn
let makeDeck = function (deckArray) {
  let cardSuits = ["♡", "♢", "♣️", "♠️"];
  for (let a = 0; a < cardSuits.length; a += 1) {
    for (let b = 1; b <= 13; b += 1) {
      let cardName = `${b}`;
      let cardRank = b;
      if (b == 1) {
        cardName = `A`;
        cardRank = 11;
      } else if (b == 11) {
        cardName = `J`;
        cardRank = 10;
      } else if (b == 12) {
        cardName = `Q`;
        cardRank = 10;
      } else if (b == 13) {
        cardName = `K`;
        cardRank = 10;
      }
      let card = {
        name: cardName,
        rank: cardRank,
        suit: cardSuits[a],
      };
      deckArray.push(card);
    }
  }
};

//fill bank accounts helper fn
let bankAccountFiller = function () {
  for (let counter = 0; counter < userNames.length; counter += 1) {
    userNames[counter].bank = 100;
  }
};

//calculate house card value helper fn
let calcHouseCardValue = function () {
  for (let a = 0; a < houseDraw.length; a += 1) {
    houseCardValue += houseDraw[a].rank;
  }
};

//calculate player card value helper fn
let calcPlayerCardValue = function (a) {
  playerCardValue[a] += userNames[a].card1.rank + userNames[a].card2.rank;
};

let main = function (input) {
  // player count validation
  if (playerCount == 0) {
    if (isNaN(input) || input > 4 || input < 1) {
      return `Please enter the number of players that wish to play. Maximum of 4 and minimum of 1!`;
    }
    playerCount = input;
    return `<b>${playerCount}</b> players selected. Please proceed to enter your usernames.`;
  }

  //username validation
  if (userNames.length < playerCount) {
    if (input == "" || userNames.some((x) => x.username == input)) {
      return `Please enter a valid username! Usernames must be unique to other players and should not be blank!`;
    } //final username before moving on.
    else if (userNames.length == playerCount - 1) {
      userNames[indexUserName] = {};
      userNames[indexUserName]["username"] = input;
      userNames[indexUserName]["bank"] = 0;
      console.log(userNames);
      return `Hello <b>${input}</b>, Welcome to the table. We now have your names 😈<br><br><b>${userNames[0].username}</b> please enter the amount you wish to bet.`;
    }
    // record username as an object
    userNames[indexUserName] = {};
    userNames[indexUserName]["username"] = input;
    userNames[indexUserName]["bank"] = 0;
    indexUserName += 1;
    return `Hello <b>${input}</b>, Welcome to the table.`;
  }

  //to change player count
  if (input == "change player count") {
    playerCount = 0;
    userNames = [];
    indexUserName = 0;
    return `Please enter the new number of players for the game.`;
  }

  //to change username
  if (input == "change username") {
    changeUserName = -1;
    return "Please enter your current username";
  }
  if (changeUserName == -1) {
    if (input == "" || userNames.some((x) => x.username == input) == false) {
      return `Username not found! Please enter your current username accurately!`;
    }
    changeUserName = userNames.findIndex((x) => x.username == input);
    return `Old username <b>${input}</b> detected. Please enter your new desired username.`;
  }
  if (changeUserName < 5 && changeUserName > -1) {
    if (input == "" || userNames.some((x) => x.username == input)) {
      return `Please enter a valid username! Usernames must be unique to other players and should not be blank!`;
    }
    userNames[changeUserName].username = input;
    console.log(userNames);
    changeUserName = 5;
    return `Username successfully changed. hello <b>${input}</b>.<br><br>Enough time wasted peasants. Now click submit to continue playing.`;
  }

  //fill bank accounts for all players
  if (userNames.some((x) => x.bank == 0)) {
    let zeroCount = 0;
    for (let q = 0; q < playerCount; q += 1) {
      if (userNames[q].bank == 0) {
        zeroCount += 1;
      }
    }
    if (zeroCount == playerCount) {
      bankAccountFiller();
      console.log(`checking code flow`);
    }
  }

  //create a shuffled deck of cards at game initiation
  if (cardDeck == "") {
    makeDeck(cardDeck);
    shuffleArray(cardDeck);
    console.log(cardDeck);
  }

  //take bets for all players
  if (betAmount.length < playerCount) {
    //check for appropriate bet amount
    if (
      isNaN(input) ||
      input == "" ||
      input > userNames[betAmount.length].bank
    ) {
      let outputMsg = `Please enter an appropriate bet amount! Minimum bet of 1, and you cannot bet more than what you have! GAMBLE RESPONSIBLY!`;
      for (let o = 0; o < playerCount; o += 1) {
        outputMsg += `<br><br><b>${userNames[o].username}</b> bank balance: $${userNames[o].bank}`;
      }
      return outputMsg;
    }
    if (betAmount.length == playerCount - 1) {
      betAmount.push(Number(input));
      console.log("betAmount array: " + betAmount);
      return `<b>${
        userNames[betAmount.length - 1].username
      }</b> You've placed a bet of $${input}<br><br>Click Submit to continue.`;
    }
    betAmount.push(Number(input));
    return `<b>${
      userNames[betAmount.length - 1].username
    }</b> You've placed a bet of $${input}<br><br><b>${
      userNames[betAmount.length].username
    }</b> Your bank balance is at $${
      userNames[betAmount.length].bank
    }<br><br>please enter your desired bet amount.`;
  }

  //draw two cards for house
  if (houseCardValue == 0) {
    for (let count = 0; count < 2; count += 1) {
      houseDraw.push(cardDeck.pop());
    }
    console.log(houseDraw);

    //calc total house card value
    calcHouseCardValue();
    //check for double aces, if true, house card value -10
    if (houseCardValue > 21) {
      houseCardValue -= 10;
    }
    console.log(`house card value: ${houseCardValue}`);
  }

  //draw two cards for each player. assign as object
  if (playerCardValue == "") {
    for (let a = 0; a < userNames.length; a += 1) {
      userNames[a]["card1"] = cardDeck.pop();
      userNames[a]["card2"] = cardDeck.pop();
    }
    console.log(userNames);
    playerCardValue.length = playerCount;
    playerCardValue.fill(Number(0));
    console.log(playerCardValue);
  }

  if (gamePlayed < playerCount) {
    //refactor outputmsg
    let outputMessage = `Banker is showing ${houseDraw[0].name}${houseDraw[0].suit}<br><br><b>${userNames[gamePlayed].username}</b>, you are dealt ${userNames[gamePlayed].card1.name}${userNames[gamePlayed].card1.suit},${userNames[gamePlayed].card2.name}${userNames[gamePlayed].card2.suit}`;

    //use gamePlayed as condition to run through the game with all players.
    if (gamePlayed < playerCount && playerCardValue[gamePlayed] == 0) {
      //calc player card values
      calcPlayerCardValue(gamePlayed);
      //check for double aces. minus 10 from player card value if true
      if (playerCardValue[gamePlayed] > 21) {
        playerCardValue[gamePlayed] -= 10;
      }
      console.log(`player card values: ${playerCardValue}`);
      return `${outputMessage}<br><br>Your current cards gives you ${playerCardValue[gamePlayed]}<br><br>Would you like to hit or stand?`;
    }
    //first player to input hit or stand. Draw card on hit, go to next player on stand
    if (gamePlayed != playerCount) {
      if (input == "" || (input != "hit" && input != "stand")) {
        return `${outputMessage}<br><br>Your current cards gives you ${playerCardValue[gamePlayed]}<br><br>Please enter "hit" or "stand" or we will throw you out of the casino 🕴️`;
      } else if (input == "hit") {
        //draw a card and add to player card value
        let drawCard = cardDeck.pop();
        playerCardValue[gamePlayed] += drawCard.rank;
        //check for multiple aces. -10 from player card value for each additional ace.
        if (drawCard.name == `A` && playerCardValue[gamePlayed] > 21) {
          playerCardValue[gamePlayed] -= 10;
        }
        //check player card value, if >21, bust the player.
        if (playerCardValue[gamePlayed] > 21) {
          //bust the player and gameplayed +=1. add condition if gameplayed == playerCount -1
          if (gamePlayed == playerCount - 1) {
            //check if its the last player to hit. If so, return a different statement showing house cards.
            let outputValue =
              outputMessage +
              `<br><br>You drew ${drawCard.name}${drawCard.suit}<br><br>Your current cards gives you ${playerCardValue[gamePlayed]}. You went over 21, BUSTED.<br><br>Banker flips over his second card, showing ${houseDraw[0].name}${houseDraw[0].suit},${houseDraw[1].name}${houseDraw[1].suit} for a total of ${houseCardValue}`;
            gamePlayed += 1;
            return `${outputValue}`;
          }
          let outPutValue =
            outputMessage +
            `<br><br>You drew ${drawCard.name}${drawCard.suit}<br><br>Your current cards gives you ${playerCardValue[gamePlayed]}. You went over 21, BUSTED.<br><br>`;
          gamePlayed += 1;
          return `${outPutValue}<b>${userNames[gamePlayed].username}</b>, click submit to play your turn.`;
        }
        return `${outputMessage}<br><br>You drew ${drawCard.name}${drawCard.suit}<br><br>Your current cards gives you ${playerCardValue[gamePlayed]}`;
      } else if (input == "stand") {
        //check if its the last player to stand. If so, return a different statement showing house cards.
        if (gamePlayed == playerCount - 1) {
          gamePlayed += 1;
          return `${outputMessage}<br><br>Banker flips over his second card, showing ${houseDraw[0].name}${houseDraw[0].suit},${houseDraw[1].name}${houseDraw[1].suit} for a total of ${houseCardValue}`;
        }
        //go to next player
        gamePlayed += 1;
        return `<b>${userNames[gamePlayed].username}</b>, click submit to play your turn.`;
      }
    }
  }

  //check house card value, if <=16 draw card, if >=17 then stand.
  else if (gamePlayed == playerCount && winLossTie == 0) {
    console.log(`code reaches here success`);
    let outputMessage = `Banker is showing ${houseDraw[0].name}${houseDraw[0].suit},${houseDraw[1].name}${houseDraw[1].suit} for a total of ${houseCardValue}`;

    if (houseCardValue < 17) {
      let i = 2;
      while (houseCardValue < 17) {
        let houseDrawCard = cardDeck.pop();
        houseDraw.push(houseDrawCard);
        houseCardValue += houseDraw[i].rank;
        //check for multiple aces
        if (houseDrawCard.name == `A` && houseCardValue > 21) {
          houseCardValue -= 10;
        }
        outputMessage += `<br><br>Banker draws ${houseDraw[i].name}${houseDraw[i].suit} for a total of ${houseCardValue}`;
        i += 1;
      }
    }
    if (houseCardValue > 21) {
      outputMessage += `<br><br>Banker went bust! Click submit to claim winnings for all players that did not bust.`;
    } else {
      winLossTie = 1;
      outputMessage += `<br><br>Click submit to see outcome and claim winnings`;
      return `${outputMessage}`;
    }
    winLossTie = 1;
    return `${outputMessage}`;
  }

  //do each player card value compared to house card value.
  if (winLossTie == 1) {
    //condition if banker busts
    if (houseCardValue > 21) {
      let outputWinLoss = `Banker has busted`;
      //loop to see who else busted. anyone that did not bust add bank balance = bet amount, set message, reset statuses
      for (let n = 0; n < playerCardValue.length; n += 1) {
        if (playerCardValue[n] < 22) {
          //add bank balance feature
          userNames[n].bank += betAmount[n];
          //set message
          outputWinLoss += `<br><br><b>${userNames[n].username}</b> Congrats! You've won.<br>Bank balance is at ${userNames[n].bank}`;
        } else {
          outputWinLoss += `<br><br><b>${userNames[n].username}</b> you busted as well. Lucky escape!<br>Bank balance is at ${userNames[n].bank}`;
        }
      }
      gameResetter();
      return outputWinLoss + "<br><br>Click submit to start again!";
    }
    //final output should be showing all player values incl. house
    let outputWinLoss = `Banker has ${houseCardValue}`;
    //compare values
    for (let i = 0; i < playerCardValue.length; i += 1) {
      //if player < house, reduce bank balance = bet amount
      if (playerCardValue[i] < houseCardValue) {
        //reduce bank balance feature
        userNames[i].bank -= betAmount[i];

        //set message
        outputWinLoss += `<br><br><b>${userNames[i].username}</b> you have ${playerCardValue[i]}, you've lost.<br>Bank balance is at ${userNames[i].bank}`;
      } else if (playerCardValue[i] > houseCardValue) {
        //if player > house, add bank balance = bet amount UNLESS player busted
        if (playerCardValue[i] > 21) {
          //reduce bank balance feature
          userNames[i].bank -= betAmount[i];

          //set message
          outputWinLoss += `<br><br><b>${userNames[i].username}</b> you have ${playerCardValue[i]}, you've busted.<br>Bank balance is at ${userNames[i].bank}`;
        }
        //add bank balance feature
        userNames[i].bank += betAmount[i];
        //set message
        outputWinLoss += `<br><br><b>${userNames[i].username}</b> you have ${playerCardValue[i]}, Congrats! You've won.<br>Bank balance is at ${userNames[i].bank}`;
      } else if (playerCardValue[i] == houseCardValue) {
        //if tie, do nothing, set message
        outputWinLoss += `<br><br><b>${userNames[i].username}</b> you have ${playerCardValue[i]}, it's a tie, Narrow escape!<br>Bank balance is at ${userNames[i].bank}`;
      }
    }
    //reset neccessary game statuses
    gameResetter();
    return outputWinLoss + "<br><br>Click submit to start again!";
  }

  // //boot the player if bank account goes to 0 lines 343 and 351
  //       if (userNames[i].bank == 0) {
  //         outputWinLoss += `<br><br><b>${userNames[i].username}</b> you have ${playerCardValue[i]}, you've lost.<br>Bank balance is at ${userNames[i].bank}<br><br>You're bankrupt. Gambling never pays, go make some money instead. Goodbye!`;
  //         userNames.splice(i, 1);
  //         playerCount -= 1;
};
