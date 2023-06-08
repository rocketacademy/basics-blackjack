var main = function (input) {
	var myOutputValue = dealCards() //gameFlow(input); 
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
let playerHand = [];
let playerHandValue = 0;
let dealerHand = [];
let dealerHandValue = 0;
let playerHandFormat = "";
let dealerHandFormat = "";
let whoseTurn = "player";
// Create game flow 


// CREATE DECK
let createDeck = () => {
	let deck = [];
	let suit = ['♣️', '♦️', '❤️', '♠️'];
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
				rank: j == 11 || j == 12 || j == 13 ? 10 : j, //ternary operator
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
console.log(deck)
//Draw card
let drawCard = () => {
	let card = deck.pop();
	return card;
}

let formatDrawnCards = (card) => {
	return `${card.name} ${card.suit}`;
}

// TO DEAL CARDS
let dealCards = () => { 	
	for (let i = 0; i < 2; i++){
		  playerHand.push(drawCard());
      dealerHand.push(drawCard());
			playerHandFormat += `${playerHand[i].name}${playerHand[i].suit}\t\t\t\t\t\t\t`;
			dealerHandFormat += `${dealerHand[i].name}${dealerHand[i].suit}\t\t\t\t\t\t\t`;
	}
	document.getElementById("submit-button").disabled = true
  return `dealer: ${dealerHandFormat}  <br><br> player: ${playerHandFormat}
	`;
};


// console.log(dealCards())
console.log("dealerHand", dealerHand);
console.log("playerHand",playerHand)


let hit = () => {
	if (whoseTurn == "player"){
			playerHand.push(drawCard());
			console.log("playerHand",playerHand)
      return playerHand;
	}
	else if (whoseTurn == "dealer"){
			dealerHand.push(drawCard())
			console.log("dealerHand",dealerHand)
			return dealerHand
	}
}

document.getElementById("hit-button").onclick = () => {
	hit();
};
let stand = () => {
	if (whoseTurn == "player"){
      whoseTurn = "dealer";
	}
	else if (whoseTurn == "dealer"){
			whoseTurn = "player";
	}
}
document.getElementById("stand-button").onclick = () => {
  stand();
	console.log(whoseTurn);
};

let calcHandValue = () => {
	dealerHandValue = 0;
	playerHandValue = 0; 
	for (let i = 0; i < playerHand.length; i++) {
		playerHandValue += playerHand[i].rank
	}
	for (let i = 0; i < dealerHand.length; i++){
		dealerHandValue += dealerHand[i].rank
	}
	if (dealerHandValue < 12 && hasAce(dealerHand)){
		console.log("something")
		dealerHandValue += 10
	}
	if (playerHandValue < 12 && hasAce(playerHand)) {
		console.log("next thing")
		playerHandValue += 10;
	}
	console.log("dealerHandValue", dealerHandValue);
	console.log("playerHandValue", playerHandValue);
  }

let hasAce = hand => {
	for (let card of hand) {
		if (card.name === "Ace") {
			return true;
		}
	}
	return false;
}

let checkBust = (handValue) => {
	if (handValue > 21){
		return `${whoseTurn} has bust!`
	}
}