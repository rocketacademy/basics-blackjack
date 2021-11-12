const types = {
  PlayerBlackJack: "playerBlackJack",
  DealerBlackJack: "dealerBlackJack",
  PlayerBusts: "playerBusts",
  DealerBusts: "dealerBusts",
  BothBust: "bothBust",
  DealerWinU21: "dealerWinU21",
  PlayerWinU21: "playerWinU21",
  BothDraw: "bothDraw",
};

export const lineSeparator = `<br> ========== <br>`;

export function generateOutputMsg(type, dealerPoints, playerPoints) {
  var output = "";
  switch (type) {
    case types.PlayerBlackJack:
      output = "[RESULT] Player1 wins! Player 1 has BlackJack!" + lineSeparator;
      break;
    case types.DealerBlackJack:
      output = "[RESULT] Dealer wins! Dealer has BlackJack!" + lineSeparator;
      break;
    case types.PlayerBusts:
      output =
        `[RESULT] Dealer wins! Player1 busted with ${playerPoints}, Dealer has ${dealerPoints}` +
        lineSeparator;
      break;
    case types.DealerBusts:
      output =
        `[RESULT] Player1 wins! Dealer busted with ${dealerPoints}, Player1 has ${playerPoints}` +
        lineSeparator;
      break;
    case types.BothBust:
      output = "[RESULT] Both Dealer and Player1 busted!" + lineSeparator;
      break;
    case types.DealerWinU21:
      output =
        `[RESULT] Dealer wins! Dealer has ${dealerPoints} while Player1 has ${playerPoints}` +
        lineSeparator;
      break;
    case types.PlayerWinU21:
      output =
        `[RESULT] Player1 wins! Player1 has ${playerPoints} while Dealer has ${dealerPoints}` +
        lineSeparator;
      break;
    case types.BothDraw:
      console.log("WHAT HOW");
      output = "[RESULT] Both players scores are tied!" + lineSeparator;
      break;
    default:
      output = "[RESULT] default message" + lineSeparator;
      break;
  }
  return output;
}
