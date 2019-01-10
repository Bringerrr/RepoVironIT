// раздели Atm на Atm (с логикой) и AtmComponent, который будет отвечать за рендер Atm'a.
// Просто AtmComponent подпиши на изменения Atm.
// Все методы, отвечающие за рендер вызывай по соответствующим ивентам от Atm.
// В таком случае тебе будет легче сопровождать код, при возникновении ошибок

import EventEmitter from "./EventEmitter.js";
import emitter from "./EventEmitterSingleton.js";

console.log(emitter);

// const emitt = new EventEmitter();
export default class Atm extends EventEmitter {
  constructor(container, servicingTime, id, className) {
    super();

    this.servicingTime = servicingTime;
    this.id = id;
    this.count = 0; // Всего обслужено клиентов
    this.container = container;
    this.coreContainer = null;
    this.id = id; // Наименование айдишника
    this.className = className; // Наименование класса
    this.servicing = false; // Обслуживание клиента
    this.servicingTime = parseInt(servicingTime); // Время на обслуживание в миллисекундах
    this.timeGap = 2000; // Промежуток между тем как банкомат закончил обслуживание
    //клиента и приступил к обслуживание другого
    this.clientsLeft = 0; // Осталось клиентов в очереди
    this.tick = 50;

    this.atmCounter = "";

    this.client = null; // Обслуживаемый клиент
    this.progressBar = null; // Обслуживаемый клиент
    // почему не использовать EventEmitter, который написал. Atm, который с логикой наследовал бы от EventEmitter'a
    this.atmIsFreeEvent = new Event("atmIsFree"); // создаем кастомное событие

    // вообще банкомату незачем знать, сколько людей в очереди, но...
    // почему this? при вызове atm.checkQueue, чему будет равен this? а если передаешь эту функцию как функтор
    // в addListener, то можно использовать atm.checkQueue.bind(atm), либо сразу в конструкторе можно написать
    // this.checkQueue = this.checkQueue.bind(this). Таким образом ты привяжешь сразу контекст этой функции.

    this.checkQueue = function(clients) {
      console.log(
        `Банкомат узнал, что в очереди осталось:  ${clients}  человек`
      );
      this.clientsLeft = clients;
    };
    this.checkQueue = this.checkQueue.bind(this);
    this.showClients = function(clients) {
      console.log("Принимамаю" + clients);
    };
  }

  // никогда бы не подумал, что isFree() - метод который тригерит событие, если бы читал интерфейс класса, то подумал,
  // что это проверка, свободен ли банкомат

  init(e) {
    emitter.emit(
      "AtmRender",
      this.container,
      this.id,
      this.className,
      this.servicingTime,
      this.count
    );
  }

  delete(e) {
    emitter.emit("AtmDelete", this.coreContainer, this.client);
  }

  servicingClientStart() {
    emitter.emit("AtmIsBusy", this.coreContainer, this.client);
    this.atmCounter.dispatchEvent(this.atmIsFreeEvent); // тригерим событие
  }

  // вот в этом методе я бы тригерил событие, что банкомат стал "занят"
  servicingClient() {
    this.progressMove();
    this.servicing = true;
    // this.coreContainer.style.backgroundColor = "red";
    // this.client.style.backgroundColor = "black";
    // debugger;
    setTimeout(() => {
      this.servicingClientEnd();
    }, this.servicingTime);
    setTimeout(() => {
      if (this.clientsLeft > 0) {
        this.servicingClientStart();
      }
    }, this.servicingTime + this.timeGap);
  }

  // а в этом тригерил бы, что "свободен"

  servicingClientEnd() {
    this.servicing = false;
    this.count += 1;
    this.atmCounter.value = this.count;
    emitter.emit("AtmIsFree", this.coreContainer, this.client);
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
        clearInterval(id);
      } else {
        progress += step;
        elem.style.width = progress * 1 + "%";
        elem.innerHTML = Math.ceil(progress * 1) + "%";
      }
    }
  }

  createElement(elementTagName, parent, params = {}) {
    let elem = document.createElement(elementTagName);
    for (let key in params) {
      // а если в params нет метода hasOwnProperty?))
      if (params.hasOwnProperty(key)) {
        elem[key] = params[key];
      } else elem[key] = params[key];
    }
    parent.appendChild(elem);
    return elem;
  }

  createElements() {
    let coreContainer = this.createElement("div", this.container, {
      id: this.id,
      className: this.className.container
    });

    let title = this.createElement("h4", coreContainer, {
      innerHTML: "Время на обслуживание :"
    });
    let span = this.createElement("span", coreContainer, {
      innerHTML: `${this.servicingTime / 1000}секунды`
    });
    let label = this.createElement("label", coreContainer, {
      htmlFor: this.className.atmCounter,
      innerHTML: "Обслужено :"
    });

    let input = this.createElement("input", coreContainer, {
      type: "text",
      value: this.count,
      name: this.className.atmCounter,
      className: this.className.atmCounter
    });

    let clientAtAtm = this.createElement("div", coreContainer, {
      className: this.className.clientAtAtm
    });
    let myProgress = this.createElement("div", coreContainer, {
      className: "myProgress"
    });
    let myBar = this.createElement("div", myProgress, {
      innerHTML: "Свободно",
      className: "myBar"
    });

    this.atmCounter = input;
    this.client = clientAtAtm;
    this.progressBar = myBar;
    this.coreContainer = coreContainer;
  }
}
