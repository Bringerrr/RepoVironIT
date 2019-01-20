import emitter from '../other/EventEmitterSingleton.js'
import AtmButtonRender from './atmButtonRender.js'

export default class AtmButton {
  constructor(container, eventName, className) {
    this.container = container
    this.id = container.id
    this.className = className // Наименование класса
    this.eventName = eventName
    this.render = null
    console.log(this.id)
  }

  init() {
    this.render = new AtmButtonRender(this.id)
    console.log('RENDER_COMPONENT_ATM_BUTTON')
    emitter.emit(`RENDER_COMPONENT_ATM_BUTTON_${this.id}`, this.getDataForRendering(false))
  }

  getDataForRendering(state) {
    return {
      state: state,
      selector: this.container,
      variables: {
        id: this.id
      },
      events: {
        onclick: this.eventName
      }
    }
  }
}
