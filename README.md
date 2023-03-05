# Rocket Academy Coding Basics: Blackjack

Sequential things to do

1. Create deck of cards using the loop function. This will be a helper function
2. Shuffle deck of cards using the function. This will be a helper function.
3. Draw two cards for player
4. Draw two cards for dealer
5. Sum up the two cards
6. Use if else if to handle the conditionals of game
7. Change mode so that player can input action to hit or to stand
8. Draw additional card if hit, else move on to dealer
9. Dealer must hit if hand is below 17, else they will stand.
10. Sum up cards for player
11. Sum up cards for dealer
12. Use if else to handle conditionals, report outcome
13. Rerun game

## Timelog

Running total: 6 hours

28/2

- 2 hours
- From scratch till commit 3

1/3

- 30 min
- tried to debug, didn't commit

3/3

- 3.5 hours
- commit 4 to 6

5/3

- Start 1pm

## Break it down

Attempt the project in parts to make sure each section works before adding more to it.

### Commit 1 Goal - COMPLETED

- Create deck
- Shuffle deck
- Draw two cards for each player and display them in output

### Commit 2 Goal - COMPLETED

- Sum up the card value for each player
- Display the sums as output

### Commit 3 Goal - COMPLETED

- Compare the cards and display one out of 3 outcomes: tie, blackjack win or highest hand win

### Commit 4 Goal - COMPLETED

- Fix bug where the array and handarray are using different cards
- Reassign rank so that J, Q, K are 10 (done)
- Reassign rank so that Ace is 1 (done)

### Commit 5 Goal - COMPLETED

- Player can choose to hit or stand
- Draw (third) card for player
- Add card to sum
- Evaluate if player went bust with the addition of the third card
- Output the results for the player

### Commit 6 Goal - COMPLETED

- input validation if input is not "hit" or "stand"
- Evaluate if dealer needs to hit (if below 17)
- Add dealer hit or stand
- Draw card for dealer
- Add card to sum

### Commit 7 Goal - COMPLETED

- Add back evaluating winning conditions
  -- Tie: both blackjack (DONE) or same score or bust (DONE)
  -- Win: Blackjack win (DONE), highest score to 21 wins, other player bust (DONE)
  -- Remove bust conditions from player play state as there could be a possibility of a dealer bust too (DONE)

### Commit 8 Goal

- Add logic to change ace to 1 or 11 depending on the hand
- Fix the bug where player chose to stand but is asked to hit again

### Commit 9 Goal

- Allow player to restart game without refreshing page

### Commit ? Comfortable

- Add the names and suits of the cards to the output
- Clean up output to be more readable and engaging
- Add starting instructions in html file within another container
- Add GIF for winning and losing states

### Commit ? More comfortable

- Hide dealer's first card
