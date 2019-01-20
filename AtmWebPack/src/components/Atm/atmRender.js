import emitter from '../other/EventEmitterSingleton.js'
import Component from '../other/Component'
// import atmButtonRender from '../AtmButton/atmButtonRender.js'

export default class AtmRender extends Component {
  constructor(id) {
    super()
    let self = this
    this.id = id
    this.template
    this.oldTemplate = {}
    this.variables

    emitter.on(`RENDER_COMPONENT_ATM_${this.id}`, function(data) {
      // console.log('createNewTemplate', self.createNewTemplate(data.variables))
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
    return `<div id="${variables.id}" class="atm" style="background-color: ${
      variables.servicing === true ? 'red' : 'green'
    };"><h4>Время на обслуживание : </h4><span>${variables.servicingTime /
      1000} секунды</span><label for="atmCounter">Обслужено :  </label><p class="atmCounter">${
      variables.count
    }"</p><div class="clientAtAtm" style="background-color: ${
      variables.servicing === true ? 'black' : 'transparent'
    };"></div></div>`
  }
}
