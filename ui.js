var button = document.querySelector("#deal-button");
button.addEventListener("click", function () {
  // Set result to input value
  var result = main("deal");
  // Display result in output element
  var output = document.querySelector("#output-div");

  output.innerHTML = result;
});

var button = document.querySelector("#hit-button");
button.addEventListener("click", function () {
  var result = main("hit");

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

var button = document.querySelector("#stand-button");
button.addEventListener("click", function () {
  // Set result to input value
  var result = main("stand");

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});
