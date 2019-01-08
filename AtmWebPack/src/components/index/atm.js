function Atm(
  container,
  servicingTime,
  id,
  className = { container, atmCounter, clientAtAtm, myProgressBar }
) {
  let self = this;

  self.count = 0; // Всего обслужено клиентов
  self.container = container;
  self.coreContainer = HTMLDivElement;
  self.id = id; // Наименование айдишника
  self.className = className; // Наименование класса
  self.servicing = false; // Обслуживание клиента
  self.servicingTime = parseInt(servicingTime); // Время на обслуживание в миллисекундах
  self.timeGap = 2000; // Промежуток между тем как банкомат закончил обслуживание
  //клиента и приступил к обслуживание другого
  self.clientsLeft = 0; // Осталось клиентов в очереди
  self.tick = 50;

  self.atmCounter = "";

  self.client = HTMLDivElement; // Обслуживаемый клиент
  self.progressBar = HTMLDivElement; // Обслуживаемый клиент

  self.clientServedEvent = new Event("clientServed"); // создаем кастомное событие

  // const clientServedEvent = new EventEmmiter();
  // clientServedEvent.on("event", () => {
  //   console.log("clientServed!");
  // });

  // self.atmCounter.addEventListener("event", () => {
  //   console.log("event triggered");
  // });

  self.checkQueue = function(clients) {
    self.clientsLeft = clients;
    console.log(`Банкомат узнал, что в очереди осталось:  ${clients}  человек`);
  };

  self.isFree = function() {
    self.atmCounter.dispatchEvent(self.clientServedEvent); // тригерим событие
  };

  self.servicingClient = function() {
    self.servicing = true;
    self.coreContainer.style.backgroundColor = "red";
    self.client.style.backgroundColor = "black";
    self.progressMove();
    setTimeout(() => {
      self.servicingClientEnd();
    }, self.servicingTime);
    setTimeout(() => {
      if (self.clientsLeft > 0) self.isFree();
      // clientServedEvent.trigger("event"); // триггер события eventEmmiter
    }, self.servicingTime + self.timeGap);
  };

  self.servicingClientEnd = function() {
    self.servicing = false;
    self.coreContainer.style.backgroundColor = "";
    self.client.style.backgroundColor = "";
    self.count += 1;
    self.atmCounter.value = self.count;
  };

  self.progressMove = function(
    servicingTime = self.servicingTime,
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

  self.createElement = function(elementTagName, params = {}) {
    elem = document.createElement(elementTagName);
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        elem[key] = params[key];
      }
    }
    return elem;
  };

  // self.update = function(props = {}) {
  //   for (let key in props) {
  //     if (props.hasOwnProperty(key)) {
  //       elem[key] = props[key];
  //     }
  //   }
  // };

  self.createElements = function() {
    coreContainer = self.createElement("div", {
      id: self.id,
      className: self.className.container
    });

    title = self.createElement("h4", {
      innerHTML: "Время на обслуживание :"
    });
    span = self.createElement("span", {
      innerHTML: `${self.servicingTime / 1000}секунды`
    });
    label = self.createElement("label", {
      htmlFor: self.className.atmCounter,
      innerHTML: "Обслужено :"
    });

    input = self.createElement("input", {
      type: "text",
      value: self.count,
      name: self.className.atmCounter,
      className: self.className.atmCounter
    });

    clientAtAtm = self.createElement("div", {
      className: self.className.clientAtAtm
    });
    myProgress = self.createElement("div", {
      className: "myProgress"
    });
    myBar = self.createElement("div", {
      innerHTML: "Свободно",
      className: "myBar"
    });

    self.container.appendChild(coreContainer);
    coreContainer.appendChild(title);
    coreContainer.appendChild(span);
    coreContainer.appendChild(label);
    coreContainer.appendChild(input);
    coreContainer.appendChild(clientAtAtm);
    coreContainer.appendChild(myProgress);
    myProgress.appendChild(myBar);

    self.atmCounter = input;
    self.client = clientAtAtm;
    self.progressBar = myBar;
    self.coreContainer = coreContainer;

    // mainContainer.appendChild(anotherCoreContainer);

    console.log(mainContainer);

    // self.createElement("h4", mainContainer);
  };
}
