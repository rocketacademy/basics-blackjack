const main = () => {
  const lounge = Sample.getDefaultHeadsUp();

  new PlayingArea().commenceLounge(lounge);
};

main();
