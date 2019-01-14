import emitter from "../other/EventEmitterSingleton.js";
import Component from "../other/Component";

const test = function(e) {
  e = e || window.event;
  e.preventDefault();
  console.log("testClick");
};
export function createNewTemplate(id) {
  return `<button onсlick="${test}" id="buttonFor_${id}" class="delete_button">Удалить</button>`;
}
