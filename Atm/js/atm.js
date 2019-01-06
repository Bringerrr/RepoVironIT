function Atm(container, servicingTime) {
  this.count = 0;
  this.container = container;
  this.servicing = false; // Обслуживание клиента
  this.servicingTime = parseInt(servicingTime); // Время на обслуживание в миллисекундах
  this.atmCounter = container.querySelector(".atmCounter"); // Счётчик обслужанных клиентов
  this.client = container.querySelector(".clientAtAtm"); // Обслуживаемый клиент
  this.timeGap = 100; // Промежуток между тем как банкомат закончил обсулживание
  // и приступил к обслуживание другого
  this.clientServedEvent = new Event("clientServed"); // создаем кастомное событие

  this.checkQueue = function(clients) {
    // if (clients > 0) {
    //   this.atmCounter.dispatchEvent(this.clientServedEvent); // тригерим событие
    // }
    let ccona = 23;
    console.log(
      "Банкомат узнал, что в очереди осталось: " + clients + " человек"
    );
    console.log(ccona);
    // this.servicingClient();
  };

  this.servicingClient = function() {
    this.servicing = true;
    this.container.style.backgroundColor = "red";
    this.client.style.backgroundColor = "black";
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
    this.client.style.backgroundColor = "";
    this.count += 1;
    this.atmCounter.value = this.count;
    // this.atmCounter.dispatchEvent(this.clientServedEvent); // тригерим событием
    console.log(this.atmCounter);
  };

  this.totalClientsChange = function(e) {
    e = e || window.event;
    e.preventDefault();
    e.currentTarget.value = this.count;
  };

  // Подписываемся на событие

  this.AddObserver = function() {
    this.atmCounter.addEventListener("input", this.onChange, false);
    this.atmCounter.addEventListener(
      "clientServed",
      function() {
        console.log("Изи событие");
      },
      false
    );
    console.log("observer setuped");
    console.log(this.atmCounter);
  };

  this.onChange = function(e) {
    e = e || window.event;
    e.preventDefault();
    console.log("Changed");
    console.log(e.currentTarget.value);
  };

  const observer = new EventObserver();
  console.log(observer);

  observer.subscribe(() => {
    console.log(e);
  });

  this.atmCounter.addEventListener("clientServed", () => {
    // observer.broadcast(textField.value)
    console.log("event triggered");
  });

  // atmLeft.AddObserver(); // Добавляем обсервер
  // atmRight.AddObserver(); // Добавляем обсервер
}
