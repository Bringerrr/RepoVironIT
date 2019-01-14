console.log("App.js confirmed");

import "../styles/main.css";

let arr = [1, 2, [3, 4, 5, [6, 7]]];
let containers = [];
const req = e => {
  e.forEach((elem, index) => {
    if (index === 0) containers.push(elem);
    typeof elem === "object" && elem.length > 0 ? req(elem) : console.log(elem);
  });
};

let string = "OpusMagnumVoice";
if (string.indexOf("sMagnumV") + 1) {
  // console.log(string.replace("sMagnumV", "Как ай просто"));
}
// req(arr);

// const queueContaier = document.getElementById("queue");
// const atmLeftContainer = document.getElementById("atmLeft");
// const atmRightContainer = document.getElementById("atmRight");
// const startAppButton = document.getElementById("startButton");

// const testAppButton = document.getElementById("testButton");
// const queueAppButton = document.getElementById("queuetestButton");
// const mainContainer = document.querySelector(".atmContainer");

function createTag(tagName, id, className, inner, parent) {
  let elem = document.createElement(tagName);
  elem.id = id;
  elem.innerHTML = inner;
  elem.className = className;
  parent.appendChild(elem);
}

const buttonsId = ["testButton", "queuetestButton", "startButton"];

for (let i = 0; i < buttonsId.length; i++) {
  createTag("button", buttonsId[i], "button", buttonsId[i], document.body);
}

createTag("div", "", "mainContainer", "", document.body);
createTag(
  "div",
  "atmContainer",
  "atmContainer",
  "",
  document.querySelector(".mainContainer")
);
createTag(
  "div",
  "queue",
  "queue",
  "",
  document.querySelector(".mainContainer")
);

require("./main.js");
