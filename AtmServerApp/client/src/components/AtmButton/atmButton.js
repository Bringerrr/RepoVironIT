import emitter from '../other/EventEmitterSingleton.js'
import AtmButtonRender from './atmButtonRender.js'

import { RENDER_COMPONENT_ATM_BUTTON, RENDER_FIRST_TIME, RENDER_DELETE } from '../other/Actions'

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
    console.log(`getDataForRendering`, this.getDataForRendering(RENDER_FIRST_TIME))
    emitter.emit(
      `${RENDER_COMPONENT_ATM_BUTTON}_${this.id}`,
      this.getDataForRendering(RENDER_FIRST_TIME)
    )
  }

  hide() {
    emitter.emit(
      `${RENDER_COMPONENT_ATM_BUTTON}_${this.id}`,
      this.getDataForRendering(RENDER_DELETE)
    )
  }
  getDataForRendering(state) {
    return {
      state: state,
      selector: this.container,
      variables: {
        id: this.id
      },
      events: { onclick: this.eventName }
    }
  }
}
