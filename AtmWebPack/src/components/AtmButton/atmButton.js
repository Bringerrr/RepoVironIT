import emitter from "../other/EventEmitterSingleton.js";

export default class AtmButton {
  constructor(container, className, action) {
    this.container = container;
    this.id = container.id;
    this.className = className; // Наименование класса
    this.action = action;
    console.log(this.id);
  }

  getDataForRendering(state) {
    return {
      state: state,
      selector: this.container,
      variables: {
        id: this.id
      }
    };
  }
}
