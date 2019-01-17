import emitter from "../other/EventEmitterSingleton.js";
import Component from "../other/Component";

import "./atmButtonRender.css";

const test = function tes() {
  console.log("testClick");
};
export function createNewTemplate(id) {
  return `<button id="buttonFor_${id}" class="delete_button">Удалить</button>`;
}
