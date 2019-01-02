const queueContaier = document.getElementById("queue");
const atmLeftContainer = document.getElementById("atmLeft");
const atmRightContainer = document.getElementById("atmRight");
const startAppButton = document.getElementById("startButton");

const queueSize = 8; // Длинна очереди

const atmLeft = new Atm(atmLeftContainer, 3000);
const atmRight = new Atm(atmRightContainer, 1500);
const queue = new Queue(queueContaier, queueSize);

startAppButton.addEventListener("click", start, false);

queue.setAmount(queueSize); // Задаем длинну
queue.createPersons(); // Рендерим элементы

function start(e) {
  e = e || window.event;
  e.preventDefault();
  startAppButton.removeEventListener("click", start, false);

  e.currentTarget.style.opacity = 0;

  // Каждые 0.1 секунды проверяет
  //состояние обслуживания банкоматов
  const timerId = setInterval(function() {
    if (queue.amount > 0) {
      if (atmRight.servicing === false) {
        atmRight.servicingClient();
        queue.move();
      }
      if (atmLeft.servicing === false) {
        atmLeft.servicingClient();
        queue.move();
      } else {
        console.log("stand by...");
      }
    } else {
      clearInterval(timerId);
    }
  }, 100);
}
