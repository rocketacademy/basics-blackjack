var main = function (input) {
  var myOutputValue = 'hello world';
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




// Deck generation
let createDeck = () => {
	let deck = [];
	let suit = ['clubs', 'diamonds', 'hearts', 'spades'];
	for (let i = 0; i < 4; i++) {
		let currentSuit = suit[i];
		let rankCounter = 1;
		for (let j = 1; j < 13; j++) {
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
console.log(createDeck()); //check if it works

//shuffle deck 
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
console.log(shuffleDeck());
