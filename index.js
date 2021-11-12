class App {
  state = GameState.Start;
  previousState = -1;
  #players = [];
  #payoutRate = 1.5;
  #betAmount = -1;
  // #currentTurnIndex = -1;
  #playerStands = false;
  #currentDeck = null;
  #dealerIndex = -1;

  constructor() {
    this.initButtons();
    this.askForName();
  }

  startGame() {
    const playerName = document.querySelector("#input-player-name").value;
    if (playerName.length > 0) {
      document.getElementById("input-player-name").classList.remove("uk-animation-shake");
      document.getElementById("input-player-name-error").hidden = true;

      this.#players = [new Player(playerName), new Player("Dealer")];
      this.#dealerIndex = this.#players.length - 1;

      UIkit.modal("#modal-name").hide();

      this.displayBank(this.#players[0]);

      document.getElementById("input-new-round").disabled = false;
    } else {
      document.getElementById("input-player-name").classList.add("uk-animation-shake");
      document.getElementById("input-player-name-error").hidden = false;
    }
  }

  newRound() {
    UIkit.modal("#modal-bet").show();

    this.clearCards(DisplayArea.Dealer);
    this.clearCards(DisplayArea.Player);
    this.state = GameState.NewRound;
  }

  placeBet() {
    const betAmount = document.querySelector("#input-player-bet").value;
    if (betAmount.length > 0 && betAmount != 0) {

      UIkit.modal("#modal-bet").hide();

      this.#betAmount = parseInt(betAmount);
      this.#players[0].subtractScore(this.#betAmount);

      this.displayBank(this.#players[0]);
      this.deal();
    }
  }

  deal() {
    document.getElementById("input-new-round").disabled = true;
    document.getElementById("input-hit").disabled = false;
    document.getElementById("input-stand").disabled = false;

    this.#playerStands = false;

    this.state = GameState.Playing;

    this.#currentDeck = new Deck();
    this.#currentDeck.shuffle();

    this.#players.forEach((player, index) => {
      player.discardHand();

      player.addCardToHand(this.#currentDeck.draw());
      player.addCardToHand(this.#currentDeck.draw());

      this.calculateHand(player);
    });

    const dealer = this.#players[this.#dealerIndex];
    while (dealer.handValue < 17) {
      dealer.addCardToHand(this.#currentDeck.draw());
      this.calculateHand(dealer);
    }

    this.#players.forEach((player, index) => {
      let delay = (index + 1) * 500;
      player.getHand().forEach((card, cardIndex) => {
        delay += (cardIndex + 1) * 500;
        this.delay(delay).then(() => {
          if (index === this.#dealerIndex) {
            this.displayCard(card, DisplayArea.Dealer);
          } else {
            this.displayCard(card, DisplayArea.Player);
          }

          if (index === this.#dealerIndex) {
            this.displayScore(player.handValue, DisplayArea.Dealer);
          } else {
            this.displayScore(player.handValue, DisplayArea.Player);
          }
        });
      });
    });

    this.calculateScore();
  }

  calculateScore() {
    const dealer = this.#players[this.#dealerIndex];
    for (let i = 0; i < this.#players.length; i++) {
      let player = this.#players[i];
      if (i === this.#dealerIndex) {
        if (player.handValue > 21) {
          this.endTurn(GameRoundState.Win);
          this.state = GameState.End;
        } 
      } else {
        if (player.handValue > 21) {
          this.endTurn(GameRoundState.Lose);
          this.state = GameState.End;
        } else if (player.handValue === 21) {
          if (dealer.handValue !== 21) {
            this.endTurn(GameRoundState.Win);
            this.state = GameState.End;
          }
        } else if (this.#playerStands) {
          if (player.handValue > dealer.handValue) {
            this.endTurn(GameRoundState.Win);
            this.state = GameState.End;
          } else if (player.handValue === dealer.handValue) {
            this.endTurn(GameRoundState.Push);
            this.state = GameState.End;
          } else {
            this.endTurn(GameRoundState.Lose);
            this.state = GameState.End;
          }
        }
      }
    }
  };

  endTurn(playerWins) {
    console.log("playerWins? " + playerWins);
    const player = this.#players[0];

    let winnings = this.#betAmount;
    switch (playerWins) {
      case GameRoundState.Win:
        winnings = this.#betAmount * this.#payoutRate;
        player.addScore(winnings);
        break;
      case GameRoundState.Lose:
        winnings = this.#betAmount;
        break;
      case GameRoundState.Push:
        winnings = this.#betAmount;
        player.addScore(winnings);
        break;
    }

    document.getElementById("input-new-round").disabled = false;
    document.getElementById("input-hit").disabled = true;
    document.getElementById("input-stand").disabled = true;

    this.displayBank(player);
    this.displayEndRound(playerWins, winnings);
  }

  calculateHand(player) {
    player.handValue = 0;
    player.getHand().forEach((card) => {
      switch (card.getValue()) {
        case "A": {
          if ((player.handValue + 11) > 21) {
            player.handValue += 1;
          } else {
            player.handValue += 11;
          }
        }
          break;
        case "J":
        case "Q":
        case "K":
          {
            player.handValue += 10;
          }
          break;
        default:
          {
            player.handValue += parseInt(card.getValue());
          }
          break;
      }
    });
  }

  hit() {
    console.log("hit");

    const player = this.#players[0];
    const card = this.#currentDeck.draw();

    player.addCardToHand(card);

    this.calculateHand(player);
    this.calculateScore();

    this.displayCard(card, DisplayArea.Player);
    this.displayScore(player.handValue, DisplayArea.Player);
  }

  stand() {
    console.log("stand");

    const player = this.#players[0];
    const dealer = this.#players[1];
    // const card = this.#currentDeck.draw();

    // dealer.addCardToHand(card);

    this.#playerStands = true;

    this.calculateHand(dealer);
    this.calculateHand(player);
    this.calculateScore();

    // this.displayCard(dealer, DisplayArea.Dealer);
    // this.displayScore(dealer.handValue, DisplayArea.Dealer);
  }

  displayEndRound(playerWins, winnings) {
    const title = document.querySelector("#end-round-title");
    const body = document.querySelector("#end-round-body");

    switch (playerWins) {
      case GameRoundState.Win:
        title.innerHTML = "You Win!";
        body.innerHTML = `<img class="uk-align-center" src="https://c.tenor.com/E8LtQl2x9xYAAAAC/money-we-getting-money.gif"/>`;
        body.innerHTML += `<h3 class="uk-text-center">You've won \$${winnings}</h3>`;
        break;
      case GameRoundState.Lose:
        title.innerHTML = "You Lose!";
        body.innerHTML = `<img class="uk-align-center" src="https://c.tenor.com/3MYmU_ShnpUAAAAd/tommy-wiseau-tearing-me-apart.gif"/>`;
        body.innerHTML += `<h3 class="uk-text-center">You've lost \$${winnings}</h3>`;
        break;
      case GameRoundState.Push:
        title.innerHTML = "Push!";
        body.innerHTML = `<img class="uk-align-center" src="https://c.tenor.com/FA4RkpLbpAQAAAAd/leon-s-kennedy-leon.gif"/>`;
        body.innerHTML += `<h3 class="uk-text-center">You've got back \$${winnings}</h3>`;
        break;
    }

    UIkit.modal("#modal-end-round").show();
  }

  displayBank(player) {
    const outputElement = document.querySelector("#bank-player");
    outputElement.innerHTML = `\$${player.getScore()}`;
  }

  displayScore(score, displayArea) {
    let outputElement = null;
    if (displayArea === DisplayArea.Dealer) {
      outputElement = document.querySelector("#score-dealer");
    } else {
      outputElement = document.querySelector("#score-player");
    }
    outputElement.innerHTML = isNaN(score) ? "" : score;
  }

  clearScores() {
    this.displayScore(null, DisplayArea.Dealer);
    this.displayScore(null, DisplayArea.Player);
  }

  displayCard(card, displayArea) {
    let outputElement = null;
    if (displayArea === DisplayArea.Dealer) {
      outputElement = document.querySelector("#div-dealer-hand");
    } else {
      outputElement = document.querySelector("#div-player-hand");
    }

    outputElement.innerHTML +=
      `<div class="uk-padding-small">
        <div class="uk-card uk-card-default uk-animation-slide-bottom">
          <div class="uk-card-media-top flip-card-front">
            <img src="${card.getImage()}" class="uk-height-small uk-height-max-small">
          </div>
        </div>
      </div>`;
  }

  clearCards(displayArea) {
    if (displayArea === DisplayArea.Dealer) {
      document.querySelector("#div-dealer-hand").innerHTML = "";
    } else {
      document.querySelector("#div-player-hand").innerHTML = "";
    }
  }

  askForName() {
    UIkit.modal("#modal-name").show();
  }

  initButtons() {
    // Modals
    const startGameButton = document.querySelector("#input-start-game");
    startGameButton.addEventListener("click", this.startGame.bind(this));

    const placeBetButton = document.querySelector("#input-place-bet");
    placeBetButton.addEventListener("click", this.placeBet.bind(this));

    // Player input
    const newRoundButton = document.querySelector("#input-new-round");
    newRoundButton.addEventListener("click", this.newRound.bind(this));

    const hitButton = document.querySelector("#input-hit");
    hitButton.addEventListener("click", this.hit.bind(this));

    const standButton = document.querySelector("#input-stand");
    standButton.addEventListener("click", this.stand.bind(this));
  }

  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}

class Deck {
  #cards = [];

  constructor(cards) {
    const suits = ["C", "D", "H", "S"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        this.#cards.push(values[j] + suits[i]);
      }
    }
  }

  shuffle() {
    const shuffled = [];
    while (this.#cards.length > 0) {
      const index = Math.floor(Math.random() * this.#cards.length);
      shuffled.push(this.#cards[index]);
      this.#cards.splice(index, 1);
    }
    this.#cards = shuffled;
  }

  draw() {
    const drawnCard = this.#cards.pop();
    console.log("Value is " + drawnCard);
    return new Card(drawnCard);
  }
}

class Card {
  #value = "";
  #suit = "";

  constructor(cardString) {
    let codeString = cardString.split("");
    this.#suit = codeString.pop();
    this.#value = codeString.join("");
  }

  getValue() {
    return this.#value;
  }

  getSuit() {
    return this.#suit;
  }

  getImage() {
    return `http://richardschneider.github.io/cardsJS/cards/${this.#value + this.#suit}.svg`;
  }
}

class Player {
  #name = "Player Unknown";
  #score = 100;
  #hand = [];
  handValue = 0;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getHand() {
    return this.#hand;
  }

  addCardToHand(card) {
    this.#hand.push(card);
  }

  discardHand() {
    this.#hand = [];
    this.handValue = 0;
  }

  getScore() {
    return this.#score;
  }

  addScore(score) {
    this.#score += score;
  }

  subtractScore(score) {
    this.#score -= score;
  }
}

const GameState = Object.freeze({
  Start: 0,
  NewRound: 1,
  Playing: 2,
  End: 3
});

const DisplayArea = Object.freeze({
  Player: 0,
  Dealer: 1
});

const GameRoundState = Object.freeze({
  Lose: -1,
  Push: 0,
  Win: 1
});

new App();