import Atm from "./atm.js";
import Queue from "./queue.js";
// import emitter from "./index/EEsingle.js";

// emitter.on("myCustomEvent", function(x) {
//   console.log(x);
// });

const queueContaier = document.getElementById("queue");
const atmLeftContainer = document.getElementById("atmLeft");
const atmRightContainer = document.getElementById("atmRight");
const startAppButton = document.getElementById("startButton");
const testAppButton = document.getElementById("testButton");
const queueAppButton = document.getElementById("queuetestButton");
const mainContainer = document.getElementById("atmContainer");

// console.log(mainContainer);

const queueSize = 10; // Длинна очереди

const classMixins = {
  // общие классы для всех банкоматов
  container: "atm",
  atmCounter: "atmCounter",
  clientAtAtm: "clientAtAtm",
  myProgress: "myBar"
};

const atmLeft = new Atm(mainContainer, 3000, "atmLeft", classMixins);
const atmRight = new Atm(mainContainer, 1500, "atmRight", classMixins);
const queue = new Queue(queueContaier, queueSize);

// Массив объектов для дальшейней подписки событий
const allAtm = [atmLeft, atmRight];

testAppButton.addEventListener("click", () => {
  testAppButton.style.opacity = 0;
});
atmLeft.createElements();
atmRight.createElements();

queueAppButton.addEventListener("click", () => {
  queueAppButton.style.opacity = 0;
});

queue.setAmount(queueSize); // Задаем длинну
queue.render(); // Рендерим элементы

// console.log(atmLeft);
// console.log(queue);

startAppButton.addEventListener("click", start, false);

function start(e) {
  e = e || window.event;
  e.preventDefault();

  e.currentTarget.removeEventListener("click", start, false);
  e.currentTarget.style.opacity = 0;

  allAtm.forEach(atm => {
    // Объект Банкомат следит за объектом Очередь
    queue.addListener(atm.checkQueue);
    atm.atmCounter.addEventListener(
      "atmIsFree",
      function() {
        if (atm.servicing === false) {
          atm.servicingClient();
          queue.move();
        }
      },
      false
    );

    atm.isFree(); // Инициализиуем работу банкоматов
  });
}
