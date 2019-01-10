import emitter from "./EventEmitterSingleton.js";

export default class AtmRender {
  constructor() {
    this.writeSmth = this.writeSmth.bind(this);
    emitter.on("AtmIsBusy", this.writeSmth, function(container, client) {
      console.log("atmIsBusy", this);
      container.style.backgroundColor = "red";
      client.style.backgroundColor = "black";
    });

    // emitter.on("AtmIsFree", this.writeSmth);
  }
  writeSmth() {
    console.log("this");
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
  render() {
    console.log(AtmRender);

    // this.atmCounter = input;
    // this.client = clientAtAtm;
    // this.progressBar = myBar;
    // this.coreContainer = coreContainer;
  }
}
