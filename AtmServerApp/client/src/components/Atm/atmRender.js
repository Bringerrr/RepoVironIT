import emitter from '../other/EventEmitterSingleton.js'
import Component from '../other/Component'

import { RENDER_COMPONENT_ATM } from '../other/Actions'

export default class AtmRender extends Component {
  constructor(id) {
    super()
    let self = this
    this.id = id
    this.template = null
    this.oldTemplate = {}
    this.variables = null
    emitter.on(`${RENDER_COMPONENT_ATM}_${this.id}`, data => {
      self.render(
        data.state,
        self.createNewTemplate(data.variables),
        self.oldTemplate,
        data.selector,
        id,
        data.events
      )
    })
  }

  createNewTemplate(variables) {
    return `<div class="atm" id="${variables.id}" style="background-color: ${
      variables.servicing === true ? 'red' : 'green'
    };"><h4 class="atm-name">${
      this.id
    }</h4><h4>Время на обслуживание : </h4><span>${variables.servicingTime /
      1000} секунды</span><label for="atmCounter">Обслужено :  </label><p class="atmCounter">${
      variables.count
    }</p><div class="clientAtAtm" style="background-color: ${
      variables.servicing === true ? 'black' : 'transparent'
    };"></div></div>`
  }
}
