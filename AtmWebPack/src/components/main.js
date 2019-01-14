import Atm from "./Atm/atm.js";
import AtmRender from "./Atm/atmRender.js";

import Queue from "./Queue/queue.js";
import QueueRender from "./Queue/queueRender.js";

import AtmButton from "./AtmButton/atmButton.js";
import AtmButtonRender from "./AtmButton/atmButtonRender.js";

const queueContaier = document.getElementById("queue");
const mainContainer = document.getElementById("atmContainer");

const queueSize = 10; // Длинна очереди

const classMixins = {
  // общие классы для всех банкоматов
  container: "atm",
  atmCounter: "atmCounter",
  clientAtAtm: "clientAtAtm"
};

// Логика
const atmLeft = new Atm(mainContainer, 1320, 2000, "atmLeft", classMixins);
const atmMiddle = new Atm(mainContainer, 4000, 2000, "atmMiddle", classMixins);
const atmRight = new Atm(mainContainer, 1500, 2000, "atmRight", classMixins);

// let atmArray = [atmLeft, atmMiddle, atmRight];

const queue = new Queue(queueContaier, queueSize, "queueForAtm");

// Рендер
const atmRender = new AtmRender();
const queueRender = new QueueRender();

atmLeft.init();
atmMiddle.init();
atmRight.init();

queue.init();

console.log(atmLeft);

// startAppButton.addEventListener("click", start, false);

// function start(e) {
//   e = e || window.event;
//   e.preventDefault();
//   e.currentTarget.removeEventListener("click", start, false);
//   e.currentTarget.style.opacity = 0;
// }
