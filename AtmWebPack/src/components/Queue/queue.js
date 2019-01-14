import emitter from "../other/EventEmitterSingleton.js";

// тоже самое, что и с Atm, разделяй логику от рендера
export default class Queue {
  constructor(container, size, id) {
    let self = this;
    this.id = id;
    this.container = container;
    this.amount = size;
    this.container = container; // Контейнер для очереди
    this.clients = [];
    this.listeners = []; // здесь список функций, которые надо вызвать
    emitter.on("AtmIsFree", function(atm) {
      console.log("AtmIsFree");
      if (self.amount > 0) {
        self.move();
        emitter.emit("clientEntered", atm);
      }
    });
  }

  // Первоначальный рендеринг
  render() {
    for (let i = 0; i < this.amount; i++) {
      let client = document.createElement("div");
      this.clients.push(client);
    }
    this.clients.forEach(client => {
      this.container.appendChild(client);
    });
  }

  getDataForRendering(state) {
    return {
      state: state,
      selector: this.container,
      count: this.amount,
      variables: { id: this.id }
    };
  }

  init() {
    emitter.emit("RENDER_COMPONENT_QUEUE", this.getDataForRendering(false));
  }

  update() {
    emitter.emit("RENDER_COMPONENT_QUEUE", this.getDataForRendering(true));
  }

  delete() {
    emitter.emit("RENDER_COMPONENT_QUEUE", this.getDataForRendering(null));
  }

  // Удаляем человека вначале очереди
  remove() {
    this.update();
  }

  // Движение очереди
  move() {
    this.amount -= 1;
    this.remove();
  }
}
