// pseudo-code
// Deck is shuffled. using shuffle helper function
// There will be only two players. One human and one computer, need to assign variables for them

// The computer will always be the dealer. Reference dice roll solution
// Each player gets dealt two cards to start. Human player will click Submit to deal/draw the two cards, at the same time dealer will show his two cards. Use console.log
// Put human player and computer's two cards value in an array
// Concatenate human player and computer's values. Reference beatThat solution
// If either human player and computer's two cards are blackjack, immediately show output that the player won.
// Put in conditions for blackjack - ace king, ace queen, ace jack, ace ten, else just show arrays in output
// Show the arrays in output e.g. 'Human has cards [x, y] with total value/rank of (x+y), computer has cards [a,b] with total value/rank of (a+b)'

// Human player decides if they want to hit (draw a card) or stand (end their turn). There is a game mode here, where input 'hit' or 'stand' can determine next step or turn.
// Consider input validation if human player doesn't input 'hit' or 'stand', show 'please input 'hit' to draw a card or 'stand' to pass
// If hit, go game mode 'draw a card'. Console.log to differentiate from computer game mode.
// At this 'draw a card' game mode, draw card from deck and show the new card in output value and push the newest card to the array using .push and then add the values.
// Show the output after the new card is added and the latest value/rank
// If total value > 21, shows the output 'Busted! Let's wait... you still have a chance if the computer also gets busted!'
// If total value > 21 then also switch to 'pass, dealer's next' game mode
// If total value < 21, can still draw and input 'hit'. If total value is still < 21, shows normal output 'Human has cards [x, y, z, w] with total value of (x+y+z+w). Can still put 'hit' or 'stand to continue.

// If stand, go game mode 'pass'. Console.log to differentiate from computer game mode like 'dealer's next'. Once at 'pass' game mode, dealer's turn to click Submit for the next card.
// If dealer's current card value/rank is < 17, when he clicks Submit, immediately draw a card.
// If dealer's current card rank (in an array) is > 17, there is a game mode here, where input 'hit' or 'stand' can determine next step or turn.
// If hit, go game mode 'draw a card'. Console.log to differentiate from human game mode. At this game mode, another card drawn. Show the new card in output value and push the newest card to the array using .push and then add the values.
// Show the output after the new card is added and the latest value/rank for computer, at the same time shows the final conclusion together without the need to click submit button
// If computer total value/rank > 21, shows the output 'Busted! Computer and human player both loses'
// If computer total rank/value > human player rank, shows output, 'Computer wins'
// If computer total rank/value < human player rank, shows output, 'Human wins'
// If computer total rank/value = human player rank, shows output, 'It's a tie'
// Game ends.
