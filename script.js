// test html-js link properly set up
//alert("Helloooo this is your script speaking!");

//*****************************************************************
//Global Variables
//*****************************************************************
// Seemed a waste to always generate this. So gen once w code in Deck Codes section & saved as const
const startDeck = [
  { Suit: "club", Value: "A", Weight: 11 },
  { Suit: "club", Value: 2, Weight: 2 },
  { Suit: "club", Value: 3, Weight: 3 },
  { Suit: "club", Value: 4, Weight: 4 },
  { Suit: "club", Value: 5, Weight: 5 },
  { Suit: "club", Value: 6, Weight: 6 },
  { Suit: "club", Value: 7, Weight: 7 },
  { Suit: "club", Value: 8, Weight: 8 },
  { Suit: "club", Value: 9, Weight: 9 },
  { Suit: "club", Value: 10, Weight: 10 },
  { Suit: "club", Value: "J", Weight: 10 },
  { Suit: "club", Value: "Q", Weight: 10 },
  { Suit: "club", Value: "K", Weight: 10 },
  { Suit: "diamond", Value: "A", Weight: 11 },
  { Suit: "diamond", Value: 2, Weight: 2 },
  { Suit: "diamond", Value: 3, Weight: 3 },
  { Suit: "diamond", Value: 4, Weight: 4 },
  { Suit: "diamond", Value: 5, Weight: 5 },
  { Suit: "diamond", Value: 6, Weight: 6 },
  { Suit: "diamond", Value: 7, Weight: 7 },
  { Suit: "diamond", Value: 8, Weight: 8 },
  { Suit: "diamond", Value: 9, Weight: 9 },
  { Suit: "diamond", Value: 10, Weight: 10 },
  { Suit: "diamond", Value: "J", Weight: 10 },
  { Suit: "diamond", Value: "Q", Weight: 10 },
  { Suit: "diamond", Value: "K", Weight: 10 },
  { Suit: "heart", Value: "A", Weight: 11 },
  { Suit: "heart", Value: 2, Weight: 2 },
  { Suit: "heart", Value: 3, Weight: 3 },
  { Suit: "heart", Value: 4, Weight: 4 },
  { Suit: "heart", Value: 5, Weight: 5 },
  { Suit: "heart", Value: 6, Weight: 6 },
  { Suit: "heart", Value: 7, Weight: 7 },
  { Suit: "heart", Value: 8, Weight: 8 },
  { Suit: "heart", Value: 9, Weight: 9 },
  { Suit: "heart", Value: 10, Weight: 10 },
  { Suit: "heart", Value: "J", Weight: 10 },
  { Suit: "heart", Value: "Q", Weight: 10 },
  { Suit: "heart", Value: "K", Weight: 10 },
  { Suit: "spade", Value: "A", Weight: 11 },
  { Suit: "spade", Value: 2, Weight: 2 },
  { Suit: "spade", Value: 3, Weight: 3 },
  { Suit: "spade", Value: 4, Weight: 4 },
  { Suit: "spade", Value: 5, Weight: 5 },
  { Suit: "spade", Value: 6, Weight: 6 },
  { Suit: "spade", Value: 7, Weight: 7 },
  { Suit: "spade", Value: 8, Weight: 8 },
  { Suit: "spade", Value: 9, Weight: 9 },
  { Suit: "spade", Value: 10, Weight: 10 },
  { Suit: "spade", Value: "J", Weight: 10 },
  { Suit: "spade", Value: "Q", Weight: 10 },
  { Suit: "spade", Value: "K", Weight: 10 },
];
//Code variables
let playDeck = [];
let playersData = [];
let round = 0;
let numPlayers = 1;
let remainingPlayers = [];
//DOM variables
let header = document.querySelectorAll(".header");
let textUpdates = document.getElementById("TextUpdates");
let playersSelected = document.getElementById("PlayersSelected");
//DOM variables - Buttons
let newGameBox = document.getElementById("NewGameBox");
let othBtnsBox = document.getElementById("OthBtnsBox");
let newGameBtn = document.getElementById("NewGame");
let hitBtn = document.getElementById("Hit");
let stayBtn = document.getElementById("Stay");
let dealAgainBtn = document.getElementById("DealAgain");
let restartBtn = document.getElementById("Restart");
//DOM variables - Score box
let scoreBox = document.getElementById("ScoreBox");
let p2Head = document.getElementById("P2Head");
let p3Head = document.getElementById("P3Head");
let dlrScore = document.getElementById("DlrScore");
let p1Score = document.getElementById("P1Score");
let p2Score = document.getElementById("P2Score");
let p3Score = document.getElementById("P3Score");
let rdDlrScore = document.getElementById("RdDlrScore");
let rdP1Score = document.getElementById("RdP1Score");
let rdP2Score = document.getElementById("RdP2Score");
let rdP3Score = document.getElementById("RdP3Score");
//DOM variables - Display area
let bckgrdLogo = document.getElementById("BckgrdLogo");
let displayArea = document.getElementById("DisplayArea");
let dlrDisplay = document.getElementById("DlrDisplay");
let dlrDisplayCards = document.getElementById("DlrDisplayCards");
let dlrDisplayPoints = document.getElementById("DlrDisplayPoints");
let nowPlayer = document.getElementById("NowPlayer");
let nowPlayerDisplay = document.getElementById("NowPlayerDisplay");
let nowPlayerDisplayCards = document.getElementById("NowPlayerDisplayCards");
let nowPlayerDisplayPoints = document.getElementById("NowPlayerDisplayPoints");
let p2Display = document.getElementById("P2Display");
let p2DisplayCards = document.getElementById("P2DisplayCards");
let p2DisplayPoints = document.getElementById("P2DisplayPoints");
let p3Display = document.getElementById("P3Display");
let p3DisplayCards = document.getElementById("P3DisplayCards");
let p3DisplayPoints = document.getElementById("P3DisplayPoints");
//*****************************************************************
//Game Play Codes
//*****************************************************************
///////////////////////////////////////
//Button Triggered Functions
///////////////////////////////////////
//Trigerred by newGameBtn
function startGame() {
  createPlayers(numPlayers);
  setupScreen();
  deal();
  cal();
}

//Trigerred by dealAgainBtn
function dealAgain() {
  const enableList = [hitBtn, stayBtn];
  enableList.forEach((e) => e.removeAttribute("style")); //unhides hitBtn & stayBtn

  const resetList = [rdDlrScore, rdP1Score, rdP2Score, rdP3Score];
  resetList.forEach((e) => (e.innerHTML = "")); //clears This Round score display

  const hideList = [p2Display, p3Display];
  hideList.forEach((e) => e.classList.add("hidden")); //hides p2 & p3 card displays

  playersData.forEach(function (el) {
    el.Hand = [];
    el.Pts = 0;
    el.Status = "Open";
  }); //reset relevant elements for ea player
  deal();
  cal();
}

//Trigerred by restartBtn
function restartGame() {
  playersData = [];
  round = 0;
  numPlayers = 1;
  resetScreen();
}

//Trigerred by hitBtn
function hit() {
  const playingNow = playersData.find(
    (e) => e.Name === remainingPlayers[0].Name
  );
  if (playingNow.Hand.length >= 5) {
    alert("You have drawn too many cards. Your turn is over.");
    stay();
  } else {
    playingNow.Hand.push(playDeck.pop());
    console.log(playingNow.Name, " hits"); //for debugging
    cal();
  }
}

//Trigerred by stayBtn
function stay() {
  const playingNow = playersData.find(
    (e) => e.Name === remainingPlayers[0].Name
  );
  playingNow.Status = "Closed";
  remainingPlayers = playersData.filter((e) => e.Status === "Open");

  if (remainingPlayers.length === 1) {
    dealerDraws();
  } else {
    redrawScreen();
  }

  console.log(
    playingNow.Name,
    " stays",
    "Remaining players ",
    remainingPlayers
  ); //for debugging
}

///////////////////////////////////////
//Helper Functions
///////////////////////////////////////
//Called by startGame(), dealAgain()
function deal() {
  playDeck = shuffle(startDeck.slice());
  round += 1;
  remainingPlayers = [];
  for (let i = 2; i > 0; i--) {
    playersData.forEach((el) => el.Hand.push(playDeck.pop()));
  }
}

//Called by startGame(), dealAgain(), hit(), dealerDraws()
function cal() {
  playersData.forEach(function (elPlayer) {
    const totalPoints = elPlayer.Hand.reduce((a, b) => {
      return a + b.Weight;
    }, 0);
    let countA = 0;
    elPlayer.Hand.forEach(function (elHand) {
      elHand.Value === "A" ? (countA += 1) : countA;
    });
    switch (elPlayer.Hand.length) {
      case 2:
        elPlayer.Pts > 21 ? (elPlayer.Pts = 21) : (elPlayer.Pts = totalPoints);
        break;
      case 3:
        countA >= 1 && totalPoints >= 18 && totalPoints <= 21
          ? (elPlayer.Pts = totalPoints)
          : (elPlayer.Pts = totalPoints - 10 * countA);
        break;
      default:
        elPlayer.Pts = totalPoints - 10 * countA;
    }
  });
  const dealer = playersData[numPlayers];
  if (dealer.Hand.length === 2 && dealer.Pts >= 21) {
    roundResults(); //ends round immediately if dealer blackjack
  } else {
    redrawScreen();
    test(); //for debugging
  }
}

//Called by stay()
function dealerDraws() {
  const dealer = playersData[numPlayers];
  while (dealer.Pts < 17 && dealer.Hand.length < 6) {
    //prevent dealer from drawing more than 5 cards and busting
    dealer.Hand.push(playDeck.pop());
    cal();
  }
  roundResults();
}

//Called by cal(), dealerDraws()
function roundResults() {
  const disableList = [hitBtn, stayBtn];
  disableList.forEach((e) => (e.style.display = "none")); //hitBtn and stayBtn no longer needed. so hide them. .hidden class did not work. so directly added style of display: none

  let thisRdScore = [0, 0, 0, 0];
  const dealer = playersData[numPlayers];

  for (let i = 0; i < numPlayers; i++) {
    const player = playersData[i];
    if (player.Pts > 21) {
      if (dealer.Pts <= 21) {
        dealer.Score += 1;
        thisRdScore[3] += 1;
      }
    } else if (player.Pts <= 21)
      if (dealer.Pts > 21) {
        player.Score += 1;
        thisRdScore[i] += 1;
      } else if (dealer.Pts <= 21) {
        if (dealer.Hand.length === 5) {
          dealer.Score += 1;
          thisRdScore[3] += 1;
        } else if (player.Pts > dealer.Pts) {
          player.Score += 1;
          thisRdScore[i] += 1;
        } else if (player.Pts < dealer.Pts && player.Hand.length === 5) {
          player.Score += 1;
          thisRdScore[i] += 1;
        } else if (player.Pts < dealer.Pts) {
          dealer.Score += 1;
          thisRdScore[3] += 1;
        }
      }
  }
  //Updating UI for round's scores needs to be in here cos use local variable
  rdDlrScore.innerHTML = thisRdScore[3];
  rdP1Score.innerHTML = thisRdScore[0];
  if (numPlayers === 3) {
    rdP3Score.innerHTML = thisRdScore[2];
    rdP2Score.innerHTML = thisRdScore[1];
  } else if (numPlayers === 2) {
    rdP2Score.innerHTML = thisRdScore[1];
  }
  endRoundScreen();
}

//*****************************************************************
//UI Codes
//*****************************************************************
//Called by startGame()
function setupScreen() {
  textUpdates.innerHTML = ` <p> <strong> Round ${round} </strong><br> Hit: Add card  •  Stay: Keep current cards <br> Deal Again: Redeal Cards  •  Restart: Restart Game</p>`;

  header.forEach((e) => e.classList.add("hidden"));

  newGameBox.classList.add("hidden");

  const unhideList = [othBtnsBox, scoreBox, dlrDisplay, nowPlayerDisplay];
  unhideList.forEach((e) => e.classList.remove("hidden"));

  const enableList = [hitBtn, stayBtn];
  enableList.forEach((e) => e.removeAttribute("style"));

  const imgList = [bckgrdLogo];
  imgList.forEach((e) => (e.style.opacity = 0.1)); //change backgrd logo opacity

  if (numPlayers === 2) {
    p2Head.innerHTML = "Player 2";
  } else if (numPlayers === 3) {
    p2Head.innerHTML = "Player 2";
    p3Head.innerHTML = "Player 3";
  }
}

// Called by cal(), stay()
function redrawScreen() {
  textUpdates.innerHTML = ` <p> <strong> Round ${round} </strong><br> Hit: Add card  •  Stay: Keep current cards <br> Deal Again: Redeal Cards  •  Restart: Restart Game</p>`;

  remainingPlayers = playersData.filter((e) => e.Status === "Open");
  const playingNow = playersData.find(
    (e) => e.Name === remainingPlayers[0].Name
  );

  dlrDisplayCards.innerHTML = `<i class="${playersData[numPlayers].Hand[1].Suit}">${playersData[numPlayers].Hand[1].Value}</i>`;
  dlrDisplayPoints.innerHTML = ""; //show only 2nd card for dealer & dun show any points

  nowPlayer.innerHTML = playingNow.Name;
  nowPlayerDisplayCards.innerHTML = createCardsDisplay(playingNow);
  nowPlayerDisplayPoints.innerHTML = `Points: ${playingNow.Pts}`;
  //shows current player data
}

//Called by roundResults()
function endRoundScreen() {
  textUpdates.innerHTML = ` <p> <strong> Round ${round} over!</strong><br> Deal Again: Redeal Cards  •  Restart: Restart Game</p>`;

  dlrScore.innerHTML = playersData[numPlayers].Score;
  p1Score.innerHTML = playersData[0].Score;
  //def at least these 2 players, so show all rounds scores for them by default

  dlrDisplayCards.innerHTML = createCardsDisplay(playersData[numPlayers]);
  dlrDisplayPoints.innerHTML = `Points: ${playersData[numPlayers].Pts}`;
  //show both dealer's cards and also points

  nowPlayer.innerHTML = playersData[0].Name;
  nowPlayerDisplayCards.innerHTML = createCardsDisplay(playersData[0]);
  nowPlayerDisplayPoints.innerHTML = `Points: ${playersData[0].Pts}`;
  //this second display card will also player 1's data

  if (numPlayers === 2) {
    const unhideList = [p2Display];
    unhideList.forEach((e) => e.classList.remove("hidden"));
    p2Score.innerHTML = playersData[1].Score;
    p2DisplayCards.innerHTML = createCardsDisplay(playersData[1]);
    p2DisplayPoints.innerHTML = `Points: ${playersData[1].Pts}`;
    //unhide 3rd display card and show player 2's data if player exists
  } else if (numPlayers === 3) {
    const unhideList = [p2Display, p3Display];
    unhideList.forEach((e) => e.classList.remove("hidden"));

    p2Score.innerHTML = playersData[1].Score;
    p2DisplayCards.innerHTML = createCardsDisplay(playersData[1]);
    p2DisplayPoints.innerHTML = `Points: ${playersData[1].Pts}`;

    p3Score.innerHTML = playersData[2].Score;
    p3DisplayCards.innerHTML = createCardsDisplay(playersData[2]);
    p3DisplayPoints.innerHTML = `Points: ${playersData[2].Pts}`;
    //unhide 3rd & 4th display cards and show player 2/3's data if players exist
  }
}

//Helper function whenever cards needed to be displayed
function createCardsDisplay(player) {
  let result = `<i class="${player.Hand[0].Suit}">${player.Hand[0].Value}</i>`;
  for (let i = 1; i < player.Hand.length; i++) {
    result += `<i class="${player.Hand[i].Suit}">-${player.Hand[i].Value}</i>`;
  }
  return result;
}

//Called by restartGame()
function resetScreen() {
  header.forEach((e) => e.classList.remove("hidden"));

  textUpdates.innerHTML =
    "<h3>Select number of players and click 'New Game' below to begin!</h3>";

  const unhideList = [newGameBox];
  unhideList.forEach((e) => e.classList.remove("hidden"));

  const enableList = [hitBtn, stayBtn, bckgrdLogo];
  enableList.forEach((e) => e.removeAttribute("style")); //unhides hitBtn & stayBtn, restores opacity of bckgrd logo

  const hideList = [
    othBtnsBox,
    scoreBox,
    dlrDisplay,
    nowPlayerDisplay,
    p2Display,
    p3Display,
  ];
  hideList.forEach((e) => e.classList.add("hidden"));

  playersSelected.selectedIndex = 0; //reset drop down list to 1

  const resetList = [
    dlrScore,
    rdDlrScore,
    p1Score,
    rdP1Score,
    p2Head,
    p3Head,
    p2Score,
    rdP2Score,
    p3Score,
    rdP3Score,
    dlrDisplayCards,
    dlrDisplayPoints,
    nowPlayer,
    nowPlayerDisplayCards,
    nowPlayerDisplayPoints,
    p2DisplayCards,
    p2DisplayPoints,
    p3DisplayCards,
    p3DisplayPoints,
  ];

  resetList.forEach((e) => (e.innerHTML = ""));
}

//*****************************************************************
//Console.log Test Code
//*****************************************************************
function test() {
  console.log("Cards remaining ", playDeck.length);
  playersData.forEach((el) =>
    console.log(
      el.Name,
      `Status: ${el.Status}`,
      el.Hand,
      "Points:",
      el.Pts,
      "Score:",
      el.Score
    )
  );
  console.log("Remaining players ", remainingPlayers);
}
//*****************************************************************
//Player Codes
//*****************************************************************
//Get number of players selected from drop down list
function getPlayersSelected(e) {
  numPlayers = parseInt(e.target.value);
}

//Create multiple number of players and store their data as objects in an array
function createPlayers(num) {
  playersData = [
    { Name: "Dealer", Status: "Open", Score: 0, Hand: [], Pts: 0 },
  ];
  for (let i = num; i > 0; i--) {
    let player = {
      Name: "Player" + i,
      Status: "Open",
      Score: 0,
      Hand: [],
      Pts: 0,
    };
    playersData.unshift(player);
  }
}

//*****************************************************************
//Deck Codes
//*****************************************************************
//Fisher-Yates algorithm to shuffle startDeck everytime game starts
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Create startDeck using code below
/* const pics = ["club", "diamond", "heart", "spade"];
const values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const weights = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

function createDeck() {
  let deck = [];
  for (let i = 0; i < pics.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = { Suit: pics[i], Value: values[j], Weight: weights[j] };
      deck.push(card);
    }
  }
  return console.log(deck);
}

createDeck(); 
*/
