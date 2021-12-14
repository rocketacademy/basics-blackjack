//globals
let cardDeck = [];
let playerCount = 0;
let userNames = [];
let changeUserName = 5;
let indexUserName = 0;

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
      if (b == 1) {
        cardName = `A`;
      } else if (b == 11) {
        cardName = `J`;
      } else if (b == 12) {
        cardName = `Q`;
      } else if (b == 13) {
        cardName = `K`;
      }
      let card = {
        name: cardName,
        rank: b,
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
      console.log(userNames);
      return `Hello <b>${input}</b>, Welcome to the table. We now have your names 😈 Click submit to continue.`;
    }
    // record username as an object
    userNames[indexUserName] = {};
    userNames[indexUserName]["username"] = input;
    indexUserName += 1;
    return `Hello <b>${input}</b>, Welcome to the table.`;
  }

  //fill bank accounts for all players
  bankAccountFiller();

  //to change player count
  if (input == "change player count") {
    playerCount = 0;
    indexUserName = 0;
    userNames = [];
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

  //create a shuffled deck of cards at game initiation
  if (cardDeck == "") {
    makeDeck(cardDeck);
    shuffleArray(cardDeck);
  }
  console.log(cardDeck);

  //draw two cards for house and for player(s)
  let houseDraw = [];
  for (let count = 0; count < 2; count += 1) {
    houseDraw.push(cardDeck.pop());
  }
  for (let a = 0; a < userNames.length; a += 1) {
    userNames[a]["card1"] = cardDeck.pop();
    userNames[a]["card2"] = cardDeck.pop();
  }
  console.log(userNames);
};
