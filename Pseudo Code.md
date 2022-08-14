# Rocket Academy Coding Basics: Blackjack
/*
Flow:
- At any pt, type in "Reset" to restart //
- Type in no. of players //
- For each player, type in Name //

Start Game Loop

Rounds Loop
- Deal 2 cards to all hands (Dealer's hand is hidden) //

  For all players:
    
  Split/Bet Loop:
    - Go around asking for bet amount  //
      - Deduct bets off chips, validate if able to bet //
    - Reveal cards//
    - Check if Blackjack//
    - Check if eligible to split.//
    - Check if these eligible have enough money to split//
    - Ask if they want to split//
      - If so, make a spilt-hand for player//
      - Pop one from main hand into split-hand//
      - Deal one more from deck into each hand (main and split)//
 
  Hit/Stand Loop, for each Hand
    - Check if Bust//
      - If bust, lose
    - Check if Blackjack//
    Print hand
    - Type in "Hit" or "Stand"
    - If hit: 
      - Pop 1 card, add to hand.
    - If stand:
      - Store player's final hand value
      - break
  
  When all players are done, Dealers AI loop
  - Check if win everyone. If so, just stand
  - Else, if >= 18, then stand
  - Else, draw

  Resolve phase
  - If dealer bust. All nonBusted players set to win
  - Else, those handvalue > dealer set to win && those handvalue < dealer set to lose
  - Winning players add value of their bet into their chips.
*/