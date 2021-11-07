class App {
  state = GameState.Start;
  previousState = -1;
  #players = [];
  #currentTurnIndex = 0;

  constructor() {
    const deck = new Deck();
    deck.shuffle();

    for (let i = 0; i < 5; i++) {
      const card = deck.draw();
      console.log(card);

      this.displayCard(card);
    }
  }

  displayCard(card) {
    const outputElement = document.querySelector("#output-div");
    outputElement.innerHTML +=
      '<div class="uk-padding-small">' + 
      '<div class="uk-card uk-card-default">' +
          '<div class="uk-card-media-top flip-card-front">' +
            `<img src="${card.getImage()}" class="uk-height-small uk-height-max-small">` + 
          '</div>'
          '<div class="uk-card-body flip-card-back"></div>' + 
        '</div>'
      '</div>';
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
  $hand = [];

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  addScore(score) {
    this.#score += score;
  }

  getScore() {
    return this.#score;
  }
}

const GameState = Object.freeze({
  Start: 0,
  NewRound: 1,
  Playing: 2,
  End: 3
});

const temp = new App();