import emitter from "../other/EventEmitterSingleton.js";
import Component from "../other/Component";

export default class QueueRender extends Component {
  constructor() {
    super();
    let self = this;
    this.oldTemplate = {};
    emitter.on("RENDER_COMPONENT_QUEUE", function(data) {
      self.render(
        data.state,
        self.createNewTemplate(data.variables, data.count),
        self.oldTemplate[data.variables.id],
        data.selector,
        data.variables.id
      );
    });
  }

  createNewTemplate(variables, count = 0) {
    let template = `<div></div>`;
    let groupOfElements = [];
    console.log(count);
    if (count === 0) {
      return "";
    }
    for (let i = 0; i < count; i++) {
      groupOfElements.push(template);
    }
    return groupOfElements.join("");
  }
}
