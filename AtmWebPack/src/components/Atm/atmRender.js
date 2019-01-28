import emitter from '../other/EventEmitterSingleton.js'
import Component from '../other/Component'
// import atmButtonRender from '../AtmButton/atmButtonRender.js'

export default class AtmRender extends Component {
  constructor(id) {
    super()
    let self = this
    this.id = id
    this.template // = null ?
    this.oldTemplate = {}
    this.variables // = null ?

    // лучше заменить на () => {} и убрать self
    emitter.on(`RENDER_COMPONENT_ATM_${this.id}`, function(data) {
      self.render(
        data.state,
        self.createNewTemplate(data.variables),
        self.oldTemplate,
        data.selector,
        id
      )
    })
  }

  createNewTemplate(variables) {
    return `<div class="atm" id="${variables.id}" style="background-color: ${
      variables.servicing === true ? 'red' : 'green'
    };"><h4>Время на обслуживание : </h4><span>${variables.servicingTime /
      1000} секунды</span><label for="atmCounter">Обслужено :  </label><p class="atmCounter">${
      variables.count
    }</p><div class="clientAtAtm" style="background-color: ${
      variables.servicing === true ? 'black' : 'transparent'
    };"></div></div>`
  }
}
