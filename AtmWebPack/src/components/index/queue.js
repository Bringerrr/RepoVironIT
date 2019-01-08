function Queue(container) {
  let listeners = []; // здесь список функций, которые надо вызвать

  this.amount = 0;
  this.container = container; // Контейнер для очереди
  this.clients = [];

  this.addListener = function(func) {
    listeners.push(func);
    func(this.amount); // и сразу вызываем функцию, передаём количество клиентов
  };

  // Задаём количество человек
  this.setAmount = function(client) {
    this.amount = client;
  };

  // Первоначальный рендеринг
  this.render = function() {
    for (let i = 0; i < this.amount; i++) {
      let client = document.createElement("div");
      this.clients.push(client);
    }
    this.clients.forEach(client => {
      container.appendChild(client);
    });
  };

  // Удаляем человека вначале очереди
  this.remove = function() {
    let cont = this.container;
    cont.removeChild(cont.querySelectorAll("div")[0]);
  };

  // Движение очереди
  this.move = function() {
    if (this.amount > 0) {
      this.amount -= 1;
      this.remove();
      for (var f = 0; f < listeners.length; f++) {
        var func = listeners[f]; // func - это функция-слушатель
        func(this.amount); // вызываем её, передаём количество клиентов и что ещё надо
      }
    }
  };
}
