function buildDeck() {
  var array = [];
  for (let i = 1; i <= 52; i++) {
      array.push(i);
  }
  return array;
}

function shuffle(array) {
  let currentIndex = array.length,
      randomIndex;

  while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
      ];
  }

  return array;
}

function getCard(i) {
  return {
      value: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"][
          (i - 1) % 13
      ],
      suit: ["spades", "clubs", "hearts", "diamonds"][Math.ceil(i / 13) - 1],
  };
}

function isPortrait(card) {
  return ["J", "Q", "K"].includes(card.value);
}

function getHandValue(hand) {
  const cards = hand.map(getCard);
  const nonAces = cards.filter((card) => card.value !== "A");
  const aces = cards.filter((card) => card.value === "A");

  // Blackjack
  if (aces.length === 1 && nonAces.length === 1 && isPortrait(nonAces[0])) {
      return 21;
  }

  let score = 0;
  for (let i = 0; i < nonAces.length; i++) {
      if (isPortrait(nonAces[i])) {
          score += 10;
      } else {
          score += Number(nonAces[i].value);
      }
  }

  // Treat as aces as 1s
  score += aces.length;

  if (score >= 21) {
      return score;
  }

  // Try tens, convert aces to tens by adding 9
  // TODO: Optimize this
  for (let i = 0; i < aces.length; i++) {
      if (score + 9 <= 21) {
          score += 9;
      }
  }

  return score;
}

let _state = {
  value: "WAITING_TO_START",
};

function render(state) {
  if (state.value === "WAITING_TO_START") {
      return "Type START to start";
  }

  const hasGameEnded = ["WIN", "LOSS", "DRAW"].includes(state.value);

  return `
  <div>
      ${hasGameEnded ? "<div>Type START to restart</div><br>" : ""}
      ${hasGameEnded ? state.value : ""}
      Player: ${getHandValue(state.player)}
      <div>${state.player
        .map(getCard)
        .map((x) => `<div>${JSON.stringify(x)}</div>`)
        .join("")}</div>
      <br>
      Dealer: ${
        hasGameEnded
          ? getHandValue(state.dealer)
          : getHandValue([state.dealer[0]])
      }
      <div>${state.dealer
        .map(getCard)
        .map((x, i) =>
          hasGameEnded
            ? `<div>${JSON.stringify(x)}</div>`
            : i === 0
            ? `<div>${JSON.stringify(x)}</div>`
            : `<div>(Faced down card)</div>`
        )
        .join("")}</div>
  </div>
  `;
}

function nextState(action, prevState) {
if (
  action === "START" &&
  ["WAITING_TO_START", "DRAW", "LOSS", "WIN"].includes(prevState.value)
) {
  const deck = shuffle(buildDeck());
  const player = [deck.pop(), deck.pop()];
  const dealer = [deck.pop(), deck.pop()];
  const playerScore = getHandValue(player);
  const dealerScore = getHandValue(dealer);

  return {
    ...prevState,
    value:
      playerScore === 21
        ? dealerScore === 21
          ? "DRAW"
          : "WIN"
        : dealerScore === 21
        ? "LOSS"
        : "WAITING_FOR_PLAYER",
    deck,
    player,
    dealer,
  };
}

if (prevState.value === "WAITING_FOR_PLAYER") {
  if (action === "HIT") {
    const newDeck = [...prevState.deck];
    const newPlayer = [...prevState.player, newDeck.pop()];
    const playerScore = getHandValue(newPlayer);
    return {
      ...prevState,
      value:
        playerScore === 21
          ? "WIN"
          : playerScore > 21
          ? "LOSS"
          : prevState.value,
      deck: newDeck,
      player: newPlayer,
    };
  } else if (action === "STAND") {
    const newDeck = [...prevState.deck];
    let newDealer = [...prevState.dealer];
    let dealerScore = getHandValue(newDealer);
    const playerScore = getHandValue(prevState.player);

    // Dealers must hit as long as < 17
    while (newDeck.length && dealerScore < 17) {
      newDealer.push(newDeck.pop());
      dealerScore = getHandValue(newDealer);
    }

    return {
      ...prevState,
      deck: newDeck,
      dealer: newDealer,
      value:
        dealerScore === 21
          ? "LOSS"
          : dealerScore > 21
          ? "WIN"
          : playerScore > dealerScore
          ? "WIN"
          : playerScore < dealerScore
          ? "LOSS"
          : "DRAW",
    };
  }
}

return prevState;
}

var main = function (input) {
_state = nextState(input, _state);
console.log(JSON.stringify(_state, null, 4));
return render(_state);
};