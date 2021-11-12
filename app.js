var continueButton = document.querySelector("#continue-button");
continueButton.addEventListener("click", function () {
  // Set result to input value
  var input = document.querySelector("#input-field");
  var result = main("");

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  // Reset input value
  input.value = "";
});

var continueButton = document.querySelector("#hit-button");
continueButton.addEventListener("click", function () {
  // Set result to input value
  var input = document.querySelector("#input-field");
  var result = main("hit");

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  // Reset input value
  input.value = "";
});
