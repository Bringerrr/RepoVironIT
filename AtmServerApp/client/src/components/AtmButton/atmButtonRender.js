import './atmButtonRender.css'
import emitter from '../other/EventEmitterSingleton.js'
import Component from '../other/Component'

export default class atmButtonRender extends Component {
  constructor(id) {
    super()
    let self = this
    this.id = id
    this.oldTemplate = {}
    emitter.on(`RENDER_COMPONENT_ATM_BUTTON_${self.id}`, function(data) {
      self.render(
        data.state,
        self.createNewTemplate(id),
        self.oldTemplate,
        data.selector,
        data.variables.id,
        data.events
      )
    })
  }

  createNewTemplate(id) {
    return `<button id="${id}" class="delete_button">Удалить</button>`
  }
}
