var deck = [
  {
    name: "ace",
    suit: "♡",
    rank: 1,
  },
  {
    name: "2",
    suit: "♡",
    rank: 2,
  },
  {
    name: "3",
    suit: "♡",
    rank: 3,
  },
  {
    name: "4",
    suit: "♡",
    rank: 4,
  },
  {
    name: "5",
    suit: "♡",
    rank: 5,
  },
  {
    name: "6",
    suit: "♡",
    rank: 6,
  },
  {
    name: "7",
    suit: "♡",
    rank: 7,
  },
  {
    name: "8",
    suit: "♡",
    rank: 8,
  },
  {
    name: "9",
    suit: "♡",
    rank: 9,
  },
  {
    name: "10",
    suit: "♡",
    rank: 10,
  },
  {
    name: "Jack",
    suit: "♡",
    rank: 10,
  },
  {
    name: "Queen",
    suit: "♡",
    rank: 10,
  },
  {
    name: "King",
    suit: "♡",
    rank: 10,
  },
  {
    name: "ace",
    suit: "♢",
    rank: 1,
  },
  {
    name: "2",
    suit: "♢",
    rank: 2,
  },
  {
    name: "3",
    suit: "♢",
    rank: 3,
  },
  {
    name: "4",
    suit: "♢",
    rank: 4,
  },
  {
    name: "5",
    suit: "♢",
    rank: 5,
  },
  {
    name: "6",
    suit: "♢",
    rank: 6,
  },
  {
    name: "7",
    suit: "♢",
    rank: 7,
  },
  {
    name: "8",
    suit: "♢",
    rank: 8,
  },
  {
    name: "9",
    suit: "♢",
    rank: 9,
  },
  {
    name: "10",
    suit: "♢",
    rank: 10,
  },
  {
    name: "Jack",
    suit: "♢",
    rank: 10,
  },
  {
    name: "Queen",
    suit: "♢",
    rank: 10,
  },
  {
    name: "King",
    suit: "♢",
    rank: 10,
  },
  {
    name: "ace",
    suit: "♧",
    rank: 1,
  },
  {
    name: "2",
    suit: "♧",
    rank: 2,
  },
  {
    name: "3",
    suit: "♧",
    rank: 3,
  },
  {
    name: "4",
    suit: "♧",
    rank: 4,
  },
  {
    name: "5",
    suit: "♧",
    rank: 5,
  },
  {
    name: "6",
    suit: "♧",
    rank: 6,
  },
  {
    name: "7",
    suit: "♧",
    rank: 7,
  },
  {
    name: "8",
    suit: "♧",
    rank: 8,
  },
  {
    name: "9",
    suit: "♧",
    rank: 9,
  },
  {
    name: "10",
    suit: "♧",
    rank: 10,
  },
  {
    name: "Jack",
    suit: "♧",
    rank: 10,
  },
  {
    name: "Queen",
    suit: "♧",
    rank: 10,
  },
  {
    name: "King",
    suit: "♧",
    rank: 10,
  },
  {
    name: "ace",
    suit: "♤",
    rank: 1,
  },
  {
    name: "2",
    suit: "♤",
    rank: 2,
  },
  {
    name: "3",
    suit: "♤",
    rank: 3,
  },
  {
    name: "4",
    suit: "♤",
    rank: 4,
  },
  {
    name: "5",
    suit: "♤",
    rank: 5,
  },
  {
    name: "6",
    suit: "♤",
    rank: 6,
  },
  {
    name: "7",
    suit: "♤",
    rank: 7,
  },
  {
    name: "8",
    suit: "♤",
    rank: 8,
  },
  {
    name: "9",
    suit: "♤",
    rank: 9,
  },
  {
    name: "10",
    suit: "♤",
    rank: 10,
  },
  {
    name: "Jack",
    suit: "♤",
    rank: 10,
  },
  {
    name: "Queen",
    suit: "♤",
    rank: 10,
  },
  {
    name: "King",
    suit: "♤",
    rank: 10,
  },
];
invalid = `<b>You have enter an invalid input!<br>Please only type 1 or 11!`;
gameMode = "welcome";
playerName = "";
playerBets = "";
blackjack = 21;
playingChips = 100;
p1winCounter = 0;
pcWinCounter = 0;
drawCounter = 0;
p1StartHand = [];
pcHand = [];
HOSinvalid = `<b>You have entered an invalid entry ❌!<br>Please only enter hit or stand!<br>Your current hand is ${p1StartHand}<br><br>Hit to have additional cards added to your current hand.<br>Stand if you've burst or<br>Stand to finalize your hand!`;
blackjackMessage = `<b>BLACKJACK!!<br><br>Your final hand is 21!<br>Computer's turn now.`;
var shuffle = function () {
  var shuffledeck = deck[Math.floor(Math.random() * 52)];
  return shuffledeck;
};

var randomCard = function () {
  firstDraw = shuffle();
  secondDraw = shuffle();
  pDraw = shuffle();
  cDraw = shuffle();
  additionalDraw = shuffle();
  initialHand = [firstDraw.rank + secondDraw.rank];
  pciHand = [pDraw.rank + cDraw.rank];
  if (firstDraw.name == "ace" && secondDraw.name == "ace") {
    gameMode = "pc";
    p1StartHand = initialHand;
    p1StartHand = 21;
    return blackjackMessage;
  }
  if (firstDraw.name == "ace" && secondDraw.rank == 10) {
    gameMode = "pc";
    p1StartHand = initialHand;
    p1StartHand = 21;
    return blackjackMessage;
  }
  if (secondDraw.name == "ace" && firstDraw.rank == 10) {
    gameMode = "pc";
    p1StartHand = initialHand;
    p1StartHand = 21;
    return blackjackMessage;
  }
  if (firstDraw.name == "ace" && gameMode == "p1") {
    gameMode = "chooseAce";
    p1StartHand = initialHand;
    return `<b>You drew ${firstDraw.name} of ${firstDraw.suit} and ${secondDraw.name} of ${secondDraw.suit}<br><br>Choose 1 or 11 to represent your ACE.`;
  }
  if (secondDraw.name == "ace" && gameMode == "p1") {
    gameMode = "chooseAce";
    p1StartHand = initialHand;
    return `<b>You drew ${firstDraw.name} of ${firstDraw.suit} and ${secondDraw.name} of ${secondDraw.suit}<br><br>Choose 1 or 11 to represent your ACE.`;
  }
  if (gameMode == "p1") {
    p1StartHand = initialHand;
    gameMode = "p1HOS";
    return `<b>You drew ${firstDraw.name} of ${firstDraw.suit} and ${secondDraw.name} of ${secondDraw.suit}<br><br>Your starting hand is ${p1StartHand}!`;
  }
  if (gameMode == "pc") {
    gameMode = "gameboard";
    while (pciHand <= 17) {
      pciHand = Number(String(pciHand)) + additionalDraw.rank;
    }
    return `<b>PC's final hand is ${pciHand}!`;
  }
};

var aceOnHand = function (input) {
  if (firstDraw.name == "ace") {
    if (input == 1) {
    }
    if (input == 11) {
      p1StartHand = Number(String(p1StartHand)) + 10;
    }
  }
  if (secondDraw.name == "ace") {
    if (input == 1) {
    }
    if (input == 11) {
      p1StartHand = Number(String(p1StartHand)) + 10;
    }
  }
  gameMode = "aceHOS";
  return `<b>You have chose ${input} for your ACE.<br><br>Your starting hand is ${p1StartHand}`;
};

var hitOrStand = function (input) {
  additionalDraw = shuffle();
  if (gameMode == "p1HOS") {
    if (input == "hit") {
      p1StartHand = Number(String(p1StartHand)) + additionalDraw.rank;
    }
    if (input == "stand") {
      gameMode = "pc";
      return `<b>${playerName}'s final hand is ${p1StartHand}.<br><br>Computer's turn.`;
    }
  }
  if (gameMode == "aceHOS") {
    if (input == "hit") {
      p1StartHand = Number(String(p1StartHand)) + additionalDraw.rank;
    }
    if (input == "stand") {
      gameMode = "pc";
      return `<b>${playerName}'s final hand is ${p1StartHand}.<br><br>Computer's turn`;
    }
  }
  return `<b>You draw an additional ${additionalDraw.name} of ${additionalDraw.suit}.<br>Your current hand is ${p1StartHand}.<br><br>Please type stand if you've burst or if you wish to finalize your hand!<br>Please type hit again to draw somemore additional cards`;
};

var board = function () {
  if (gameMode == "gameboard") {
    /// both draw ace and player wins
    if (firstDraw.name == "ace" && secondDraw.name == "ace" && pciHand < 21) {
      p1winCounter = p1winCounter + 1;
      playingChips = playingChips + Number(String(playerBets));
      return `<b>${playerName}'s final hand = ${blackjack}<br>Computer's final hand = ${pciHand}.<br><br>Since ${playerName}'s hand is bigger than computer's.<br>Therefore ${playerName} wins!✌️<br>Earlier you bet ${playerBets} chips<br>Therefore you won ${playerBets} chips<br><br>${playerName} currently has ${playingChips} chips<br><br>${playerName} has won ${p1winCounter} round<br>Computer has won ${pcWinCounter} round<br>Draw for ${drawCounter} round<br><br>Click the submit button to play ♠ again!`;
    }
    /// first draw ace and player wins
    if (firstDraw.name == "ace" && secondDraw.rank == 10 && pciHand < 21) {
      p1winCounter = p1winCounter + 1;
      playingChips = playingChips + Number(String(playerBets));
      return `<b>${playerName}'s final hand = ${blackjack}<br>Computer's final hand = ${pciHand}.<br><br>Since ${playerName}'s hand is bigger than computer's.<br>Therefore ${playerName} wins!✌️<br>Earlier you bet ${playerBets} chips<br>Therefore you won ${playerBets} chips<br><br>${playerName} currently has ${playingChips} chips<br><br>${playerName} has won ${p1winCounter} round<br>Computer has won ${pcWinCounter} round<br>Draw for ${drawCounter} round<br><br>Click the submit button to play ♠ again! chips left ${playingChips}`;
    }
    /// second draw ace and player wins
    if (secondDraw.name == "ace" && firstDraw.rank == 10 && pciHand < 21) {
      p1winCounter = p1winCounter + 1;
      playingChips = playingChips + Number(String(playerBets));
      return `<b>${playerName}'s final hand = ${blackjack}<br>Computer's final hand = ${pciHand}.<br><br>Since ${playerName}'s hand is bigger than computer's.<br>Therefore ${playerName} wins!✌️<br>Earlier you bet ${playerBets} chips<br>Therefore you won ${playerBets} chips<br><br>${playerName} currently has ${playingChips} chips<br><br>${playerName} has won ${p1winCounter} round<br>Computer has won ${pcWinCounter} round<br>Draw for ${drawCounter} round<br><br>Click the submit button to play ♠ again! chips left ${playingChips}`;
    }
    /// computer hand bigger & com wins
    if (p1StartHand < pciHand && p1StartHand <= 21 && pciHand <= 21) {
      pcWinCounter = pcWinCounter + 1;
      playingChips = playingChips - Number(String(playerBets));
      return `<b>${playerName}'s final hand = ${p1StartHand}<br>Computer's final hand = ${pciHand}<br><br>Since computer's hand is bigger than ${playerName}'s.<br>Therefore computer wins!✌️<br><br>Earlier you bet ${playerBets} chips, unfortunately you lost.<br>Therefore you lost ${playerBets} chips<br><br>${playerName} currently has ${playingChips} chips<br><br>${playerName} has won ${p1winCounter} round<br>Computer has won ${pcWinCounter} round<br>Draw for ${drawCounter} round<br><br>Click the submit button to play ♠ again!`;
    }
    /// player 1 hand bigger & player wins
    if (p1StartHand > pciHand && p1StartHand <= 21 && pciHand <= 21) {
      p1winCounter = p1winCounter + 1;
      playingChips = playingChips + Number(String(playerBets));
      return `<b>${playerName}'s final hand = ${p1StartHand}<br>Computer's final hand = ${pciHand}.<br><br>Since ${playerName}'s hand is bigger than computer's.<br>Therefore ${playerName} wins!✌️<br>Earlier you bet ${playerBets} chips<br>Therefore you won ${playerBets} chips<br><br>${playerName} currently has ${playingChips} chips<br><br>${playerName} has won ${p1winCounter} round<br>Computer has won ${pcWinCounter} round<br>Draw for ${drawCounter} round<br><br>Click the submit button to play ♠ again! chips left ${playingChips}`;
    }
    /// computer hand burst & player wins
    if (pciHand > 21 && p1StartHand <= 21) {
      p1winCounter = p1winCounter + 1;
      playingChips = playingChips + Number(String(playerBets));
      return `<b>${playerName}'s final hand = ${p1StartHand}<br>Computer's final hand = ${pciHand}, computer has burst.<br><br>Since computer has burst, therefore player 1 wins!✌️<br>Earlier you bet ${playerBets} chips<br>Therefore you won ${playerBets} chips<br><br>${playerName} currently has ${playingChips} chips<br><br>${playerName} has won ${p1winCounter} round<br>Computer has won ${pcWinCounter} round<br>Draw for ${drawCounter} round<br><br>Click the submit button to play ♠ again! chips left ${playingChips}`;
    }
    /// player 1 hand burst & com wins
    if (p1StartHand > 21 && pciHand <= 21) {
      pcWinCounter = pcWinCounter + 1;
      playingChips = playingChips - Number(String(playerBets));
      return `<b>${playerName}'s final hand = ${p1StartHand}<br>Computer's final hand = ${pciHand}, ${playerName} has burst.<br><br>Since ${playerName} has burst, therefore computer wins!✌️<br><br>Earlier you bet ${playerBets} chips, unfortunately you lost.<br>Therefore you lost ${playerBets} chips<br><br>${playerName} currently has ${playingChips} chips<br><br>${playerName} has won ${p1winCounter} round<br>Computer has won ${pcWinCounter} round<br>Draw for ${drawCounter} round<br><br>Click the submit button to play ♠ again!`;
    }
    /// draw
    if (p1StartHand > 21 && pciHand > 21) {
      drawCounter = drawCounter + 1;
      return `<b>${playerName}'s final hand = ${p1StartHand}<br>Computer's final hand = ${pciHand}.<br><br>Since both player have burst, therefore its a draw!<br><br>${playerName} has won ${p1winCounter} round<br>Computer has won ${pcWinCounter} round<br>Draw for ${drawCounter} round<br><br>Click the submit button to play ♠ again!`;
    }
    /// draw
    if (p1StartHand == pciHand) {
      drawCounter = drawCounter + 1;
      return `<b>${playerName}'s final hand = ${p1StartHand}<br>Computer's final hand = ${pciHand}.<br><br>Since both player have the same hand, therefore its a draw!<br><br>${playerName} has won ${p1winCounter} round<br>Computer has won ${pcWinCounter} round<br>Draw for ${drawCounter} round<br><br>Click the submit button to play ♠ again!`;
    }
  }
};

var main = function (input) {
  myOutputValue = ``;
  if (gameMode == "welcome") {
    gameMode = "playerName";
    return `<b>Welcome to blackjack! Please enter a username!`;
  }
  if (gameMode == "playerName") {
    if (input == playerName) {
      return `<b>Please enter an username!`;
    }
    playerName = input;
    gameMode = "Bet";
    return `<b>Hey ${playerName}, decide how many chips you would like to bet in this round,<br>by typing the number of chips in the long white space<br><br>DO NOT SPELL ELSE THE BETTING SYSTEM WILL CRASH!<br><br>You currently have ${playingChips} chips left<br><br>Example..if you have bet 20 chips and you win, you'll have 120 chips<br><br>Otherwise you'll have 80 chips left<br>In an event of a draw, nothing will happen<br><br>You have 100 chips initially<br><br>Click on the submit button to confirm your bet and receive your starting hand!`;
  }
  if (gameMode == "betAgain") {
    gameMode = "Bet";
    playerBets = input;
    return `<b>Hey ${playerName}, decide how many chips you would like to bet in this round,<br>by typing the number of chips in the long white space<br><br>DO NOT SPELL ELSE GAME WILL CRASH!<br><br>You currently have ${playingChips} chips left<br><br>Example..if you have bet 20 chips and you win, you'll have 120 chips<br>Otherwise you'll have 80 chips left<br><br><br><br>Click on the submit button to confirm your bet and receive your starting hand!`;
  }
  if (gameMode == "Bet") {
    playerBets = input;
    gameMode = "p1";
    return `<b>You have bet ${playerBets} chips !`;
  }
  if (gameMode == "chooseAce") {
    if (!(input == 1 || input == 11)) {
      return `<b>♤ You have entered an invalid entry ❌!<br>Your current hand is ${p1StartHand}<br><br>Please only enter 1 or 11!`;
    }
    myOutputValue = aceOnHand(input);
    gameMode = "aceHOS";
    return myOutputValue;
  }
  if (gameMode == "aceHOS") {
    if (!(input == "hit" || input == "stand")) {
      return HOSinvalid;
    }
    myOutputValue = hitOrStand(input);
    return myOutputValue;
  }
  if (gameMode == "p1") {
    myOutputValue = randomCard();
    return myOutputValue;
  }
  if (gameMode == "p1HOS") {
    if (!(input == "hit" || input == "stand")) {
      return HOSinvalid;
    }
    myOutputValue = hitOrStand(input);
    return myOutputValue;
  }
  if (gameMode == "pc") {
    myOutputValue = randomCard();
    return myOutputValue;
  }
  if (gameMode == "gameboard") {
    myOutputValue = board();
    gameMode = "betAgain";
    return myOutputValue;
  }
};
