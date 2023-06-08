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
document.getElementById("hit-button").disabled = true;
document.getElementById("stand-button").disabled = true;

function reset() {
  deck;
  gameState = "start";
  playerHand = [];
  playerHandValue = 0;
  dealerHand = [];
  dealerHandValue = 0;
  playerHandFormat = "";
  dealerHandFormat = "";
  whoseTurn = "player";
	document.getElementById("deal-button").disabled = false;
	document.getElementById("output-div").innerHTML = ""
		document.getElementById("pg2").innerHTML = ``;
};

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
				cardName = 'Ace'; //Aces will always equal to 1, if total is < 12, just add a value of 10 to the hand 
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
	evaluateValues()
	document.getElementById("deal-button").disabled = true
	document.getElementById("hit-button").disabled = false;
  document.getElementById("stand-button").disabled = false;
  document.getElementById("output-div").innerHTML = `Dealer: ${dealerHandFormat}  <br><br> Player: ${playerHandFormat}`;
};

document.getElementById("deal-button").onclick = () => {
  dealCards();
};

// console.log(dealCards())
console.log("dealerHand", dealerHand);
console.log("playerHand",playerHand)


let hit = () => {
	if (whoseTurn == "player"){
			playerHand.push(drawCard());
			playerHandFormat += `${playerHand[playerHand.length - 1].name}${
        playerHand[playerHand.length - 1].suit
      }\t\t\t\t\t\t\t`;
			document.getElementById("output-div").innerHTML = `Dealer: ${dealerHandFormat}  <br><br>Player: ${playerHandFormat}`;
			console.log("playerHand",playerHand)
	}
	else if (whoseTurn == "dealer"){
			dealerHand.push(drawCard())
			dealerHandFormat += `${dealerHand[dealerHand.length - 1].name}${
        dealerHand[dealerHand.length - 1].suit
      }\t\t\t\t\t\t\t`;
			console.log("dealerHand",dealerHand)
			document.getElementById("output-div").innerHTML = `Dealer: ${dealerHandFormat}  <br><br>Player: ${playerHandFormat}`;
	}
	evaluateValues()
}

document.getElementById("hit-button").onclick = () => {
	hit();
};
let stand = () => {
	if (whoseTurn == "player"){
      whoseTurn = "dealer";
			if (dealerHandValue <= 16){
				hit()
				whoseTurn = "player"
			}
			else if (dealerHandValue > 16){
				reveal()
			}
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

let bustOr21 = (handValue) => {
	if (handValue > 21){
		document.getElementById("hit-button").disabled = true;
		document.getElementById("stand-button").disabled = true;
		setTimeout(reset, 5000)
		console.log(`${whoseTurn} has bust!`);
		document.getElementById("pg2").innerHTML = `${whoseTurn} busts! <br> game will reset in a while`;
	}
	else if (handValue == 21){
		document.getElementById("hit-button").disabled = true;
		document.getElementById("stand-button").disabled = true;
		setTimeout(reset, 5000);
		console.log(`${whoseTurn} won!!`);
		document.getElementById("pg2").innerHTML = `${whoseTurn} won!!`;
	}
}

let evaluateValues = () =>{
		calcHandValue();
    bustOr21(playerHandValue);
    bustOr21(dealerHandValue);
}

let reveal = () => {
	document.getElementById("hit-button").disabled = true;
  document.getElementById("stand-button").disabled = true;
	if (playerHandValue > dealerHandValue){
		setTimeout(reset, 5000);
		console.log(`Player wins this round!`);
		document.getElementById("pg2").innerHTML = `Player wins this round!`;
	}
	else if (dealerHandValue > playerHandValue){
		setTimeout(reset, 5000);
		console.log(`Dealer wins this round!`);
		document.getElementById("pg2").innerHTML = `Dealer wins this round!`
	}
	else if (dealerHandValue == playerHandValue){
		setTimeout(reset, 5000);
		console.log(`it's a draw!`);
		document.getElementById("pg2").innerHTML = `it's a draw!`
	}
}