function Atm(container, servicingTime) {
  this.count = 0;
  this.container = container;
  this.servicing = false; // Обслуживание клиента
  this.servicingTime = parseInt(servicingTime); // Время на обслуживание в миллисекундах
  this.atmCounter = container.querySelector("#atmCounter"); // Счётчик обслужанных клиентов
  this.person = container.querySelector("#personAtAtm"); // Обслуживаемый клиент
  this.timeGap = 100; // Промежуток между тем как банкомат закончил обсулживание
  // и приступил к обслуживание другого

  this.servicingClient = function() {
    this.servicing = true;
    this.container.style.backgroundColor = "red";
    this.person.style.backgroundColor = "black";
    setTimeout(() => {
      console.log(this.servicingTime);
    }, this.servicingTime);
    setTimeout(() => {
      // Время
      this.servicingClientEnd();
    }, this.servicingTime + this.timeGap);
  };

  this.servicingClientEnd = function() {
    this.servicing = false;
    this.container.style.backgroundColor = "";
    this.person.style.backgroundColor = "";
    this.count += 1;
    this.atmCounter.innerHTML = this.count;
  };
}
