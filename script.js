//Gamestate variables (idk what to assign to them so i just gave them random numbers)
const startingGame = 0,
  playingRound = 1,
  playingSplitRound = 2,
  endingRound = 3;
let gameState = startingGame;
//Button variables
const hitButton = buttonMaker("Hit (H)");
const standButton = buttonMaker("Stand (S)");
const splitButton = buttonMaker("Split (Y)");
//Global Variables
const deck = [];
const dealerHand = [];
let playersHands = []; //let instead of const because of reassignment during Split
let gameMessage = "";
let numberOfDecks = 0;
let handCounter = 0;
let playerGold = 1000;
let betGold = null;

//Listen for button click and keypress
detect(hitButton, "H");
detect(standButton, "S");
detect(splitButton, "Y");

//Main function
function main(input) {
  if (playerGold <= 0) {
    betGold = null;
    gameMessage = `You are broke! Get out!<br><br><img src="https://media.tenor.com/sSc5Pt_FdjUAAAAC/rainbow-spongebob.gif"/>`;
  } else {
    switch (gameState) {
      case playingRound:
        playNormalRound(input);
        consoleCheck();
        break;
      case playingSplitRound:
        playSplitRound(input);
        consoleCheck();
        break;
      case endingRound:
        resetRound();
        shuffleDeck();
        betGold =
          Number(input) > 0 && Number(input) <= playerGold ? Number(input) : 10;
        initRound();
        consoleCheck();
        break;
      case startingGame:
        if (numberOfDecks === 0) {
          numberOfDecks =
            Number.isInteger(Number(input)) &&
            Number(input) >= 1 &&
            Number(input) <= 8
              ? Number(input)
              : 1;
          gameMessage =
            `You selected ${numberOfDecks} decks! Type in your bet amount and press submit to play!<br>Default is 10 gold<br>` +
            '<br><img src="https://media.tenor.com/aiHuleZkUYMAAAAC/poker-cards.gif"/>';
        } else if (numberOfDecks > 0) {
          initDeck();
          shuffleDeck();
          betGold =
            Number(input) > 0 && Number(input) <= playerGold
              ? Number(input)
              : 10;
          initRound();
          consoleCheck();
        }
        break;
    }
  }
  let myOutputValue =
    gameMessage + `<b style="font-weight:600;">${displayGold()}</b>`;
  return myOutputValue;
}

//Prints first card of dealer face up
const dealerFaceUp = () =>
  `Dealer's Face up:<br>${dealerHand[0].Name} of ${dealerHand[0].Suit}<br><br>Type "H" to Hit and "S" to Stand`;
//Display total gold and bet amount
const displayGold = () =>
  betGold == null
    ? `<br><br>You have ${playerGold} gold`
    : `<br><br>You have ${playerGold} gold. Your bet: ${betGold} gold`;
//Display hand and score
const displayHand = (hand) =>
  hand === dealerHand
    ? `Dealer's Hand:<br>${print(hand)}Score: ${calculateScore(hand)}`
    : `Hand:<br>${print(hand)}Score: ${calculateScore(hand)}`;
//Print any hand
function print(hand) {
  let output = "";
  for (const card of hand) {
    output += `${card.Name} of ${card.Suit}<br>`;
  }
  return output;
}

//Calculate points of current hand
const calculateScore = (hand) =>
  hand.some((card) => card.Rank === 1) && hardScore(hand) <= 11
    ? hardScore(hand) + 10
    : hardScore(hand);
//Helper function for hard values
function hardScore(hand) {
  let totalPoints = 0;
  for (const card of hand) {
    const point = card.Rank > 10 ? 10 : card.Rank;
    totalPoints += point;
  }
  return totalPoints;
}

//Evaluation if draw
const drawEvaluation = (individualPlayerHand, dealerHand) =>
  (calculateScore(individualPlayerHand) > 21 &&
    calculateScore(dealerHand) > 21) ||
  calculateScore(individualPlayerHand) === calculateScore(dealerHand);
//Evaluate if win
const winEvaluation = (individualPlayerHand, dealerHand) =>
  calculateScore(individualPlayerHand) <= 21 &&
  (calculateScore(individualPlayerHand) > calculateScore(dealerHand) ||
    calculateScore(dealerHand) > 21);
//Evaluate game
function gameEvaluation(individualPlayerHand, dealerHand) {
  if (drawEvaluation(individualPlayerHand, dealerHand)) {
    return `You tied!<br><img src="https://media.tenor.com/QXVs4QWLlzkAAAAC/spider-man.gif"`;
  } else if (winEvaluation(individualPlayerHand, dealerHand)) {
    playerGold += betGold;
    return `You won!<br><img src="https://media.tenor.com/M05wGouvJsgAAAAi/money-throwing.gif"/>`;
  } else {
    playerGold -= betGold;
    return `You lost!<br><img src="https://media.tenor.com/hlWE3gT84GUAAAAi/tkthao219-capoo.gif"/>`;
  }
}
//Evaluate Blackjack
function bjEvaluation(individualPlayerHand, dealerHand) {
  if (drawEvaluation(individualPlayerHand, dealerHand)) {
    return "Push!";
  } else if (winEvaluation(individualPlayerHand, dealerHand)) {
    playerGold += 0.5 * betGold;
    return "Player has Blackjack";
  } else {
    playerGold -= 0.5 * betGold;
    return "Dealer has Blackjack";
  }
}
//Start round
function initRound() {
  for (let i = 0; i < 2; i++) {
    hit(playersHands);
    hit(dealerHand);
  }
  if (
    calculateScore(playersHands) === 21 ||
    calculateScore(dealerHand) === 21
  ) {
    gameMessage =
      `Your ${displayHand(playersHands)}<br><br>${displayHand(dealerHand)}` +
      `<br><br>${gameEvaluation(playersHands, dealerHand)}` +
      `<br>${bjEvaluation(playersHands, dealerHand)}` +
      '<img src="https://media.tenor.com/ckwiG8tPdsYAAAAi/tkthao219-capoo.gif"/>' +
      `<br><br>Type in bet amount and press submit to play another round`;
    gameState = endingRound;
  } else if (playersHands[0].Rank === playersHands[1].Rank) {
    insertButton(1);
    gameMessage =
      `Your ${displayHand(
        playersHands
      )}<br><br>${dealerFaceUp()}<br>You have a pair of ${
        playersHands[0].Name
      }s type "Y" to Split` +
      `<br><img src="https://media.tenor.com/ECW8CBXO4ToAAAAi/twist-street-split.gif"/>`;
    gameState = playingRound;
  } else {
    insertButton(0);
    gameMessage = `Your ${displayHand(playersHands)}<br><br>${dealerFaceUp()}`;
    gameState = playingRound;
  }
}

//Game flow for Hit and Stand and Split
function playNormalRound(input) {
  if (
    playersHands[0].Rank === playersHands[1].Rank &&
    (input === "Y" || input === "y")
  ) {
    playersHands = playersHands.map((card) => [card]);
    hit(playersHands[0]);
    hit(playersHands[1]);
    gameMessage = `First ${displayHand(
      playersHands[0]
    )}<br><br>Second ${displayHand(
      playersHands[1]
    )}<br><br>${dealerFaceUp()} for first hand`;
    gameState = playingSplitRound;
    splitButton.remove();
  } else {
    if (splitButton) {
      splitButton.remove();
    }
    switch (input) {
      case "H":
      case "h":
        hit(playersHands);
        if (calculateScore(playersHands) < 21) {
          gameMessage = `Your ${displayHand(
            playersHands
          )}<br><br>${dealerFaceUp()}`;
          break;
        }
      case "S":
      case "s":
        dealerAI();
        gameMessage =
          `Your ${displayHand(playersHands)}<br><br>${displayHand(
            dealerHand
          )}` +
          `<br><br>${gameEvaluation(playersHands, dealerHand)}` +
          `<br><br>Type in bet amount and press submit to play another round`;
        gameState = endingRound;
        removeButton();
        break;
      default:
        gameMessage = `Invalid input!<br><br>Your ${displayHand(
          playersHands
        )}<br><br>${dealerFaceUp()}`;
    }
  }
}

//Game flow when player has 2 hands
function playSplitRound(input) {
  switch (input) {
    case "H":
    case "h":
      hit(playersHands[handCounter]);
      if (calculateScore(playersHands[handCounter]) < 21) {
        gameMessage = `Curent ${displayHand(
          playersHands[handCounter]
        )}<br><br>First ${displayHand(
          playersHands[0]
        )}<br><br>Second ${displayHand(
          playersHands[1]
        )}<br><br>${dealerFaceUp()}`;
        break;
      }
    case "S":
    case "s":
      handCounter++;
      if (handCounter === 2) {
        dealerAI();
        gameMessage =
          `First ${displayHand(playersHands[0])}` +
          `<br><br>${gameEvaluation(
            playersHands[0],
            dealerHand
          )}<br><br>Second ${displayHand(
            playersHands[1]
          )}<br><br>${gameEvaluation(
            playersHands[1],
            dealerHand
          )}<br><br>${displayHand(dealerHand)}` +
          `<br><br>Type in bet amount and press submit to play another round`;
        gameState = endingRound;
        removeButton();
      } else {
        gameMessage = `Curent ${displayHand(
          playersHands[handCounter]
        )}<br><br>First ${displayHand(
          playersHands[0]
        )}<br><br>Second ${displayHand(
          playersHands[1]
        )}<br><br>${dealerFaceUp()}`;
      }
      break;
    default:
      gameMessage = `Invalid input!<br><br>Curent ${displayHand(
        playersHands[handCounter]
      )}<br><br>First ${displayHand(
        playersHands[0]
      )}<br><br>Second ${displayHand(
        playersHands[1]
      )}<br><br>${dealerFaceUp()}`;
  }
}

//Draw a card
const hit = (hand) => hand.push(deck.pop());

//Dealer hits soft 17, H17 rules
function dealerAI() {
  while (calculateScore(dealerHand) < 17 || hardScore(dealerHand) + 10 <= 17) {
    hit(dealerHand);
  }
}

//Reset round
function resetRound() {
  deck.push(...playersHands.flat());
  playersHands.length = 0;
  deck.push(...dealerHand);
  dealerHand.length = 0;
  handCounter = 0;
}

//Fisher-Yates Shuffle, Durstenfeld variation
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

//Create decks
function initDeck() {
  const nameConstruct = [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King",
  ];
  const suitConstruct = ["Diamonds ♦️", "Clubs ♣️", "Hearts ♥️", "Spades ♠️"];
  for (let i = 0; i < numberOfDecks; i++) {
    for (const name of nameConstruct) {
      for (const suit of suitConstruct) {
        const card = {
          Name: name,
          Suit: suit,
          Rank: nameConstruct.indexOf(name) + 1,
        };
        deck.push(card);
      }
    }
  }
}

//Button Factory
function buttonMaker(buttonText) {
  const button = document.createElement("button");
  button.className = "button";
  const buttonSpan = document.createElement("span");
  buttonSpan.textContent = buttonText;
  button.append(buttonSpan);
  return button;
}
//Inserting elements
function insertButton(splitEvent) {
  if (splitEvent === 1) {
    document.querySelector("#container").append(splitButton);
  }
  document.querySelector("#container").append(hitButton, standButton);
}
//Removing elements
function removeButton() {
  hitButton.remove();
  standButton.remove();
}
//Listen for Event function
function detect(button, keypress) {
  button.addEventListener("click", () => {
    const input = keypress;
    const result = main(input);
    const output = document.querySelector("#output-div");
    output.innerHTML = result;
    document.querySelector("#input-field").value = "";
  });
  document.addEventListener("keydown", (e) => {
    if (e.key.toUpperCase() === keypress.toUpperCase()) {
      button.click();
    }
  });
}

//Check state of hand and deck
function consoleCheck() {
  console.clear();
  console.table([playersHands, dealerHand]);
  console.table(deck);
}
