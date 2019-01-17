import emitter from "../other/EventEmitterSingleton.js";
import Component from "../other/Component";
import { createNewTemplate } from "../AtmButton/atmButtonRender.js";

export default class AtmRender extends Component {
  constructor() {
    super();
    let self = this;
    this.template;
    this.oldTemplate = {};
    emitter.on("RENDER_COMPONENT_ATM", function(data) {
      self.render(
        data.state,
        self.createNewTemplate(data.variables),
        self.oldTemplate[data.variables.id],
        data.selector,
        data.variables.id
      );
    });
  }

  createNewTemplate(variables) {
    return `<div id="${variables.id}" class="atm" style="background-color: ${
      variables.servicing === true ? "red" : "green"
    };"><h4>Время на обслуживание : </h4><span>${variables.servicingTime /
      1000} секунды</span><label for="atmCounter">Обслужено :  </label><input type="text" value="${
      variables.count
    }" name="atmCounter" class="atmCounter"><div class="clientAtAtm" style="background-color: ${
      variables.servicing === true ? "black" : "transparent"
    };"></div>${createNewTemplate(variables.id)}</div>`;
  }
}
