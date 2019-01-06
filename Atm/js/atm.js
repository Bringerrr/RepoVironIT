function Atm(container, servicingTime) {
  let self = this;

  self.count = 0; // Всего обслужено клиентов
  self.container = container;
  self.servicing = false; // Обслуживание клиента
  self.servicingTime = parseInt(servicingTime); // Время на обслуживание в миллисекундах
  self.timeGap = 2000; // Промежуток между тем как банкомат закончил обслуживание
  //клиента и приступил к обслуживание другого
  self.clientsLeft = 0; // Осталось клиентов в очереди
  self.tick = 50;

  self.atmCounter = container.querySelector(".atmCounter"); // Счётчик обслужанных клиентов
  self.client = container.querySelector(".clientAtAtm"); // Обслуживаемый клиент
  self.progressBar = container.querySelector(".myBar"); // Обслуживаемый клиент

  self.clientServedEvent = new Event("clientServed"); // создаем кастомное событие

  // const clientServedEvent = new EventEmmiter();
  // clientServedEvent.on("event", () => {
  //   console.log("clientServed!");
  // });

  // self.atmCounter.addEventListener("event", () => {
  //   console.log("event triggered");
  // });

  self.checkQueue = function(clients) {
    //
    self.clientsLeft = clients;
    console.log(
      "Банкомат узнал, что в очереди осталось: " + clients + " человек"
    );
  };

  self.servicingClient = function() {
    self.servicing = true;
    self.container.style.backgroundColor = "red";
    self.client.style.backgroundColor = "black";
    self.progressMove(self.servicingTime);
    setTimeout(() => {
      self.servicingClientEnd();
    }, self.servicingTime);
    setTimeout(() => {
      if (self.clientsLeft > 0)
        self.atmCounter.dispatchEvent(self.clientServedEvent); // тригерим событие
      // clientServedEvent.trigger("event"); // триггер события eventEmmiter
    }, self.servicingTime + self.timeGap);
  };

  self.servicingClientEnd = function() {
    self.servicing = false;
    self.container.style.backgroundColor = "";
    self.client.style.backgroundColor = "";
    self.count += 1;
    self.atmCounter.value = self.count;
  };

  self.progressMove = function(
    servicingTime,
    elem = self.progressBar,
    tick = self.tick
  ) {
    let step = (tick / servicingTime) * 100;
    let progress = 0;
    let id = setInterval(frame, tick);
    function frame() {
      if (progress >= 100) {
        elem.innerHTML = "Свободно";
        clearInterval(id);
      } else {
        progress += step;
        elem.style.width = progress * 1 + "%";
        elem.innerHTML = Math.ceil(progress * 1) + "%";
      }
    }
  };
}
