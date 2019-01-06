const queueContaier = document.getElementById("queue");
const atmLeftContainer = document.getElementById("atmLeft");
const atmRightContainer = document.getElementById("atmRight");
const startAppButton = document.getElementById("startButton");

const queueSize = 6; // Длинна очереди

const atmLeft = new Atm(atmLeftContainer, 3000);
const atmRight = new Atm(atmRightContainer, 1500);
const queue = new Queue(queueContaier, queueSize);

// Массив объектов для дальшейней подписки событий
const allAtm = [atmLeft, atmRight];

startAppButton.addEventListener("click", start, false);

queue.setAmount(queueSize); // Задаем длинну
queue.createClients(); // Рендерим элементы

function start(e) {
  e = e || window.event;
  e.preventDefault();

  e.currentTarget.removeEventListener("click", start, false);
  e.currentTarget.style.opacity = 0;

  allAtm.forEach(atm => {
    // Объект Банкомат следит за объектом Очередь
    // debugger;
    queue.addListener(atm.checkQueue);
    atm.atmCounter.addEventListener(
      "clientServed",
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
