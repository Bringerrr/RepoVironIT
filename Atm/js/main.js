const queueContaier = document.getElementById("queue");
const atmLeftContainer = document.getElementById("atmLeft");
const atmRightContainer = document.getElementById("atmRight");
const startAppButton = document.getElementById("startButton");

const queueSize = 8; // Длинна очереди

const atmLeft = new Atm(atmLeftContainer, 3000);
const atmRight = new Atm(atmRightContainer, 1500);
const queue = new Queue(queueContaier, queueSize);
const store = new Store([]);

store.addObserver(state => {
  console.log("STATE UPDATED: ", state);
});

// Массив событий для подписки собыйтий
const allAtm = [atmLeft, atmRight];

startAppButton.addEventListener("click", start, false);

queue.setAmount(queueSize); // Задаем длинну
queue.createClients(); // Рендерим элементы

function start(e) {
  e = e || window.event;
  e.preventDefault();
  startAppButton.removeEventListener("click", start, false);

  e.currentTarget.style.opacity = 0;

  // observer.subscribe(text => {
  //   countField.innerHTML = getWordsCount(text);
  // });

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

  allAtm.forEach(atm => {
    observer.subscribe(text => {
      atm.atmCounter.value = getWordsCount(text);
    });
    atm.atmCounter.addEventListener(
      "clientServed",
      function() {
        console.log("Изи событие");
        if (atmRight.servicing === false) {
          atmRight.servicingClient();
          queue.move();
        } else if (atmLeft.servicing === false) {
          atmLeft.servicingClient();
          queue.move();
        }
      },
      false
    );
    console.info(observer);
  });

  // Каждые 0.1 секунды проверяет
  // состояние обслуживания банкоматов
  // const timerId = setInterval(function() {
  //   if (queue.amount > 0) {
  //     if (atmRight.servicing === false) {
  //       atmRight.servicingClient();
  //       queue.move();
  //     }
  //     if (atmLeft.servicing === false) {
  //       atmLeft.servicingClient();
  //       queue.move();
  //     } else {
  //       console.log("stand by...");
  //     }
  //   } else {
  //     clearInterval(timerId);
  //   }
  // }, 100);
}

queue.addListener(atmLeft.checkQueue);
queue.addListener(atmRight.checkQueue);
