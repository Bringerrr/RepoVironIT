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
  }

  show() {
    console.log('BUTTON SHOWED')
    emitter.emit(
      `RENDER_COMPONENT_ATM_BUTTON_${this.id}`,
      this.getDataForRendering('firstTimeRender')
    )
  }

  hide() {
    console.log('BUTTON HIDDEN')
    console.log('button has been hidden')
    emitter.emit(`RENDER_COMPONENT_ATM_BUTTON_${this.id}`, this.getDataForRendering('delete'))
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
