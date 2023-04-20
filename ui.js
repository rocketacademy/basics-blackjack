var button = document.querySelector("#submit-button");
button.addEventListener("click", function () {
  // Set result to input value
  var input = document.querySelector("#input-field");
  var result = main(input.value);

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  // Reset input value
  input.value = "";
});

var button = document.querySelector("#hit-button");
button.addEventListener("click", function () {
  // Set result to input value
  var input = document.querySelector("#input-field");
  var result = main(input.value);

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  // Reset input value
  input.value = "";
});

var button = document.querySelector("#stand-button");
button.addEventListener("click", function () {
  // Set result to input value
  var input = document.querySelector("#input-field");
  var result = main(input.value);

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  // Reset input value
  input.value = "";
});
