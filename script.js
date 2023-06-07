var main = function (input) {
	var myOutputValue = formatDrawnCards(drawCard());  //gameFlow(input);
  return myOutputValue;
};


// Enter key to submit input value
document.addEventListener("keydown", function(event){
	if (event.key === "Enter") {
		var input = document.querySelector("#input-field");
		var result = main(input.value);
		var output = document.querySelector("#output-div");
		output.innerHTML = result;
		input.value = "";
		
	}})

// document.getElementById("output-div").innerHTML = "please tell me how many players (2-4)";

// Global variables
let deck;
let gameState = "start";
let numOfPlayers = 0;
let currentPlayer = 0;
let playerNames = [];
let playerHands = [];

// Create game flow 
let gameFlow = input => {
	if (gameState === "start") {
		return initiate(input);
	}
	else if (input.toLowerCase() === "quit"){
    gameState = "start"
	playerScore =[0,0,0,0];
	playerNames =[];
	playerNumCombo = [];
	currentPlayer = 0;
	round =0;
    return `please tell me how many players (2-4)`;
  }
  else if (gameState == "input name"){
    return storeNames(input);
  }
}

// Initiate game
let initiate = input => {
	input = Number(input);
	if (input >= 2 && input <= 4){
		numOfPlayers = input;
		gameState = "input name";
		return `You have chosen a ${numOfPlayers}-player game. Please input player 1's name`;}
	else{return `Please input a number between 2 and 4`}
}


// Store names
let storeNames = input => {
	input = input.trim()[0].toUpperCase() + input.trim().slice(1);
	playerNames.push(input);
	currentPlayer++;
	if (currentPlayer === numOfPlayers) {
		gameState = "start";
		currentPlayer = 0;
		return `Everyone has entered their names. ${playerNames[currentPlayer]} will go first`;
	}
	else {
		return `Player ${currentPlayer + 1} please enter your name`;

}}

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
				cardName = 'Ace'; //Aces will always equal to 1, if total is <= to 12, just add a value of 10 to the hand 
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
	let card = deck.pop();
	return card;
}
// console.log(drawCard());

let formatDrawnCards = (card) => {
	return `${card.name} of ${card.suit}`;
}

numOfPlayers = 2; //for testing, it works.
//Deal cards for each player and dealer
let dealCards = () => {
	playerHands = [];
	for (let i = 0; i < numOfPlayers; i++) {
		playerHands.push([drawCard(), drawCard()]);
	}
	console.log(playerHands);
	return playerHands;
}
dealCards();
console.log(deck.length)
