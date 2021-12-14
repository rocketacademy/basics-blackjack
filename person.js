const game = () => {
  let _deck = shuffleDeck(generateDeck());

  return { getDeck: () => _deck };
};
