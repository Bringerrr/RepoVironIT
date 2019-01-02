function Queue(container) {
  this.amount = 0;
  this.container = container; // Контейнер (очередь), где все находятся
  this.persons = [];

  // Задаём количество человек
  this.setAmount = function(person) {
    this.amount = person;
  };
  // Первоначальный рендеринг
  this.createPersons = function() {
    for (let i = 0; i < this.amount; i++) {
      let person = document.createElement("div");
      this.persons.push(person);
    }
    this.persons.forEach(person => {
      container.appendChild(person);
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
    }
  };
}
