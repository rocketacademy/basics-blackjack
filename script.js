var main = function (input) {
	var myOutputValue = formatDrawnCards(drawCard());
  return myOutputValue;
};

// Enter key to submit input value
document.addEventListener("keydown", function (event) {
	
	if (event.key === "Enter") {
		var input = document.querySelector("#input-field");
		var result = main(input.value);
		var output = document.querySelector("output-div");
		output.innerHTML = result;
		input.value = "";
		
	}})

// Global variables
let deck;


// Deck generation
let createDeck = () => {
	let deck = [];
	let suit = ['Clubs ♣️', 'Diamonds ♦️', 'Hearts ❤️', 'Spades ♠️'];
	for (let i = 0; i < 4; i++) {
		let currentSuit = suit[i];
		let rankCounter = 1;
		for (let j = 1; j < 14; j++) {
			let cardName = rankCounter;
			if (cardName === 1) {
				cardName = 'Ace';
			} else if (cardName === 11) {
				cardName = 'Jack';
			} else if (cardName === 12) {
				cardName = 'Queen';
			} else if (cardName === 13) {
				cardName = 'King';
			}
			let card = {
				name: cardName,
				suit: currentSuit,
				rank: j,
			};
			deck.push(card);
			rankCounter++;
		}
	}
	return deck;
}
console.log("Initialized deck", createDeck()); //check if it works

//Shuffle deck 
let shuffleDeck = () => {
	let deck = [...createDeck()];
	let currentIndex = deck.length;
	let randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		let temp = deck[currentIndex];
		deck[currentIndex] = deck[randomIndex];
		deck[randomIndex] = temp;
	}
	return deck;
}

// So the deck will persist when cards are popped, and shuffled
deck = [...shuffleDeck()];

//Draw card
let drawCard = () => {
	console.log(deck)
	let card = deck.pop();
	return card;
}
// console.log(drawCard());

let formatDrawnCards = (card) => {
	return `${card.name} of ${card.suit}`;
}
