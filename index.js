class App {
  state = GameState.Start;
  previousState = -1;
  #players = [];
  #currentTurnIndex = 0;
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
      this.#dealerIndex = 1;

      this.newRound();
    } else {
      document.getElementById("input-player-name").classList.add("uk-animation-shake");
      document.getElementById("input-player-name-error").hidden = false;
    }
  }

  newRound() {
    document.getElementById("input-hit").disabled = false;
    document.getElementById("input-stand").disabled = false;

    UIkit.modal("#modal-name").hide();

    this.#currentDeck = new Deck();
    this.#currentDeck.shuffle();

    this.#players.forEach((player, index) => {
      player.discardHand();
      player.addCardToHand(this.#currentDeck.draw());
      player.addCardToHand(this.#currentDeck.draw());
    });

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
        });
      });
    });
  }

  displayCard(card, displayArea) {
    var outputElement = null;
    if (displayArea === DisplayArea.Dealer) {
      outputElement = document.querySelector("#div-dealer-hand");
    } else {
      outputElement = document.querySelector("#div-player-hand");
    }

    outputElement.innerHTML +=
        '<div class="uk-padding-small">' +
          '<div class="uk-card uk-card-default uk-animation-slide-bottom">' +
            '<div class="uk-card-media-top flip-card-front">' +
              `<img src="${card.getImage()}" class="uk-height-small uk-height-max-small">` +
            '</div>' + 
          // '<div class="uk-card-body flip-card-back"></div>' +
        '</div>'
      '</div>';
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
    const startGameButton = document.querySelector("#input-start-game");
    startGameButton.addEventListener("click", this.startGame.bind(this));
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
    let codeString = cardString.split();
    this.#suit = codeString.pop();
    this.#value = codeString.join();
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

const temp = new App();