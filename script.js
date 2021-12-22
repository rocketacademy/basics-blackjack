var main = function (input) {
  if (input == "start") {
    // Turn on Hit and Stand button
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
    // Turn off Start button
    document.getElementById("start-button").disabled = true;
    return "Start";
  } else if (input == "hit") {
    return "Hit";
  } else if (input == "stand") {
    // Turn off Hit button and Stand button
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    // Turn on Start button
    document.getElementById("start-button").disabled = false;

    return "Stand";
  }
};
