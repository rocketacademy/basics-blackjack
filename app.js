import { main } from "./script.js";

var buttons = document.querySelectorAll(".img-buttons");

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    var input = e.target.title;
    var result = main(input);
    var output = document.querySelector("#output-div");
    output.innerHTML = result;
  });
});
