function Queue(container) {
  this.amount = 0;
  this.container = container; // Контейнер (очередь), где все находятся
  this.clients = [];

  // кому интересно изменение погоды?
  var listeners = []; // здесь список функций, которые надо вызвать
  this.addListener = function(func) {
    listeners.push(func);
    func(this.amount); // и сразу вызываем функцию, передаём количество клиентов
  };

  for (var f = 0; f < listeners.length; f++) {
    var func = listeners[f]; // func - это функция-слушатель
    func(num); // вызываем её, передаём количество клиентов и что ещё надо
  }

  // Задаём количество человек
  this.setAmount = function(client) {
    this.amount = client;
  };
  // Первоначальный рендеринг
  this.createClients = function() {
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
    // for (var f = 0; f < listeners.length; f++) {
    //   var func = listeners[f]; // func - это функция-слушатель
    //   func(num); // вызываем её, передаём количество клиентов и что ещё надо
    // }
  };

  // Движение очереди
  this.move = function() {
    if (this.amount > 0) {
      this.amount -= 1;
      this.remove();
    }
  };
}
