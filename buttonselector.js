var standButton = document.querySelector("#stand-button");
var hitButton = document.querySelector("#hit-button");
var newgameButton = document.querySelector("#newgame-button");
      
standButton.addEventListener("click", function () {
    // Set result to input value
    var input = document.querySelector("#stand-button");
    var result = main(input.value);

    // Display result in output element
    var output = document.querySelector("#output-div");
    output.innerHTML = result;
});

hitButton.addEventListener("click", function () {
    // Set result to input value
    var input = document.querySelector("#hit-button");
    var result = main(input.value);

    // Display result in output element
    var output = document.querySelector("#output-div");
    output.innerHTML = result;
});
      
newgameButton.addEventListener("click", function () {
    // Set result to input value
    var input = document.querySelector("#input-field");
    var result = main(input.value);

    // Display result in output element
    var output = document.querySelector("#output-div");
    output.innerHTML = result;
});