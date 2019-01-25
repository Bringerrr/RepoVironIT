import emitter from '../other/EventEmitterSingleton.js'
import AtmButtonRender from './atmButtonRender.js'

export default class AtmButton {
  constructor(container, eventName, id) {
    this.container = container
    this.id = id
    this.eventName = eventName
    this.render = null
  }

  init() {
    this.render = new AtmButtonRender(this.id)

    emitter.emit(
      `RENDER_COMPONENT_ATM_BUTTON_${this.id}`,
      this.getDataForRendering('firstTimeRender')
    )
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
