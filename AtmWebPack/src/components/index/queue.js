// тоже самое, что и с Atm, разделяй логику от рендера
export default class Queue {
  constructor(container) {
    this.container = container;
    this.amount = 0;
    this.container = container; // Контейнер для очереди
    this.clients = [];
    this.listeners = []; // здесь список функций, которые надо вызвать
  }

  addListener(func) {
    this.listeners.push(func);
    func(this.amount); // и сразу вызываем функцию, передаём количество клиентов
    console.log(this.listeners);
  }

  // Задаём количество человек
  setAmount(client) {
    this.amount = client;
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

  // Удаляем человека вначале очереди
  remove() {
    let cont = this.container;
    // зачем querySelectorAll, если ссылки на HTMLElement'ы у тебя в this.clients
    cont.removeChild(cont.querySelectorAll("div")[0]);
  }

  // Движение очереди
  move() {
    if (this.amount > 0) {
      this.amount -= 1;
      this.remove();

      for (let f = 0; f < this.listeners.length; f++) {
        let func = this.listeners[f];
        func(this.amount); // вызываем её, передаём количество клиентов и что ещё надо
      }
    }
  }
}
