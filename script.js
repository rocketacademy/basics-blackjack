// Black jack!

// Key setting
// 1. Multiplayers are allowed (All players except player 1 are computers)
// 2. Betting is allowed
// 3. Only 'hit' and 'stand' are actions allowed in this game
// 4. Each player has $100 at the beginning of the game

// In round 0
// Each player put their bet.
// Computer players will randomly bet at any amount within the funds they have in the pocket.

// In round 1
// 2 cards are dealth for players and a dealer.
// The players' two cards are faced up but for dealer only the first card is faced up

// In round N
// Each player can only do one action, either 'hit' or 'stand'
// Dealer will always 'hit' when the current card scores are no greater than 17

// Players will be out of the game when ...
// 1. The player's current card scores are 21 -- out of the game with 1.5X of bet
// 2. The player's current card scores are greater than 21 ("bust") -- out of game with losing bet

// The game will end when ...
// Dealer have card scores over 17
// 1. If it's between 17-21 -- the player who have scores card closest to 21 get 1X of bet while the rest lose money.
// 2. If it's over 21 -- the dealer bust and everyone still in the game get 1X of bet

var main = function (input) {};
