export default class Atm {
  constructor(container, servicingTime, id, className) {
    let self = this;
    this.container = container;
    this.servicingTime = servicingTime;
    this.id = id;
    this.className = className;
    this.count = 0; // Всего обслужено клиентов
    this.container = container;
    this.coreContainer = null;
    this.id = id; // Наименование айдишника
    this.className = className; // Наименование класса
    this.servicing = false; // Обслуживание клиента
    this.servicingTime = parseInt(servicingTime); // Время на обслуживание в миллисекундах
    this.timeGap = 2000; // Промежуток между тем как банкомат закончил обслуживание
    //клиента и приступил к обслуживание другого
    self.clientsLeft = 0; // Осталось клиентов в очереди
    this.tick = 50;

    this.atmCounter = "";

    this.client = null; // Обслуживаемый клиент
    this.progressBar = null; // Обслуживаемый клиент
    this.atmIsFreeEvent = new Event("atmIsFree"); // создаем кастомное событие

    this.checkQueue = function(clients) {
      self.clientsLeft = clients;
      if (self.clientsLeft > 0) {
        console.log(self.clientsLeft);
      }
      console.log(
        `Банкомат узнал, что в очереди осталось:  ${clients}  человек`
      );
    };

    this.showClients = function(clients) {
      console.log("Принимамаю" + clients);
    };
  }

  isFree() {
    this.atmCounter.dispatchEvent(this.atmIsFreeEvent); // тригерим событие
  }

  servicingClient() {
    this.progressMove();
    this.servicing = true;
    this.coreContainer.style.backgroundColor = "red";
    this.client.style.backgroundColor = "black";

    // debugger;
    setTimeout(() => {
      this.servicingClientEnd();
    }, this.servicingTime);
    setTimeout(() => {
      if (self.clientsLeft > 0) {
        this.isFree();
      }
    }, this.servicingTime + this.timeGap);
  }

  servicingClientEnd() {
    this.servicing = false;
    this.coreContainer.style.backgroundColor = "";
    this.client.style.backgroundColor = "";
    this.count += 1;
    this.atmCounter.value = this.count;
  }

  progressMove(
    servicingTime = this.servicingTime,
    elem = this.progressBar,
    tick = this.tick
  ) {
    let step = (tick / servicingTime) * 100;
    let progress = 0;
    let id = setInterval(frame, tick);
    function frame() {
      if (progress >= 100) {
        elem.innerHTML = "Свободно";
        console.log(self.clientsLeft);
        clearInterval(id);
      } else {
        progress += step;
        elem.style.width = progress * 1 + "%";
        elem.innerHTML = Math.ceil(progress * 1) + "%";
      }
    }
  }

  createElement(elementTagName, params = {}) {
    let elem = document.createElement(elementTagName);
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        elem[key] = params[key];
      }
    }
    return elem;
  }

  // update = function(props = {}) {
  //   for (let key in props) {
  //     if (props.hasOwnProperty(key)) {
  //       elem[key] = props[key];
  //     }
  //   }
  // };

  createElements() {
    let coreContainer = this.createElement("div", {
      id: this.id,
      className: this.className.container
    });

    let title = this.createElement("h4", {
      innerHTML: "Время на обслуживание :"
    });
    let span = this.createElement("span", {
      innerHTML: `${this.servicingTime / 1000}секунды`
    });
    let label = this.createElement("label", {
      htmlFor: this.className.atmCounter,
      innerHTML: "Обслужено :"
    });

    let input = this.createElement("input", {
      type: "text",
      value: this.count,
      name: this.className.atmCounter,
      className: this.className.atmCounter
    });

    let clientAtAtm = this.createElement("div", {
      className: this.className.clientAtAtm
    });
    let myProgress = this.createElement("div", {
      className: "myProgress"
    });
    let myBar = this.createElement("div", {
      innerHTML: "Свободно",
      className: "myBar"
    });

    this.container.appendChild(coreContainer);
    coreContainer.appendChild(title);
    coreContainer.appendChild(span);
    coreContainer.appendChild(label);
    coreContainer.appendChild(input);
    coreContainer.appendChild(clientAtAtm);
    coreContainer.appendChild(myProgress);
    myProgress.appendChild(myBar);

    this.atmCounter = input;
    this.client = clientAtAtm;
    this.progressBar = myBar;
    this.coreContainer = coreContainer;

    // mainContainer.appendChild(anotherCoreContainer);

    // createElement("h4", mainContainer);
  }
}
