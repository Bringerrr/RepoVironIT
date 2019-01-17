// раздели Atm на Atm (с логикой) и AtmComponent, который будет отвечать за рендер Atm'a.
// Просто AtmComponent подпиши на изменения Atm.
// Все методы, отвечающие за рендер вызывай по соответствующим ивентам от Atm.
// В таком случае тебе будет легче сопровождать код, при возникновении ошибок

import emitter from "../other/EventEmitterSingleton.js";

import AtmButton from "../AtmButton/atmButton.js";
// import AtmButtonRender from "../AtmButton/atmButtonRender.js";

export default class Atm {
  constructor(container, servicingTime, timeGap, id, className) {
    let self = this;
    this.status = "working";
    this.servicingTime = servicingTime;
    this.id = id;
    this.count = 0; // Всего обслужено клиентов
    this.container = container; // родительский
    this.ownContainer = null; // собственный
    this.id = id; // Наименование айдишника
    this.className = className; // Наименование класса
    this.servicing = false; // Обслуживание клиента
    this.servicingTime = parseInt(servicingTime); // Время на обслуживание в миллисекундах
    this.timeGap = timeGap; // Промежуток между тем как банкомат закончил обслуживание
    //клиента и приступил к обслуживание другого

    this.atmCounter = 0;
    this.deleteButton = null;
    this.emmiter = emitter.on("clientEntered", function(x) {
      if (self.id === x && self.status === "working")
        self.servicingClientStart();
    });
  }

  getDataForRendering(state) {
    return {
      state: state,
      selector: this.container,
      variables: {
        servicing: this.servicing,
        servicingTime: this.servicingTime,
        count: this.count,
        id: this.id
      }
    };
  }

  init() {
    emitter.emit("RENDER_COMPONENT_ATM", this.getDataForRendering(false));
    emitter.emit("AtmIsFree", `${this.id}`);

    console.log(`this.id`, this.id);
    this.ownContainer = document.getElementById(`${this.id}`);
    this.deleteButton = new AtmButton(this.ownContainer);
    console.log(this.deleteButton);
  }

  update() {
    emitter.emit("RENDER_COMPONENT_ATM", this.getDataForRendering(true));
  }

  delete() {
    this.status = "offline"; // обрубаем связь
    emitter.emit("RENDER_COMPONENT_ATM", this.getDataForRendering(null));
  }

  servicingClientStart() {
    this.servicing = true;
    this.update();
    this.servicingClient();
  }
  servicingClient() {
    setTimeout(() => {
      this.servicing = false;
      this.count += 1;
      this.update();
    }, this.servicingTime);
    setTimeout(() => {
      this.servicingClientEnd();
    }, this.servicingTime + this.timeGap);
  }

  servicingClientEnd() {
    this.servicing = false;
    this.update();
    emitter.emit("AtmIsFree", `${this.id}`);
  }
}
