import emitter from '../other/EventEmitterSingleton.js'
import Component from '../other/Component'

import {
  RENDER_COMPONENT_ATM_SHOW_POPUP,
  RENDER_COMPONENT_POPUP,
  RENDER_COMPONENT_ATM
} from '../other/Actions'

export default class atmPopupRender extends Component {
  constructor(id, eventName) {
    super()
    let self = this
    this.id = id
    this.eventName = eventName
    this.selector = null
    this.containerOfSelector = null
    this.oldTemplate = {}
    this.isShown = false

    emitter.on(`${RENDER_COMPONENT_POPUP}_${self.id}`, data => {
      self.selector = data.selector
      self.containerOfSelector = data.selector.parentNode
      self.isShown = data.variables.show

      self.render(
        data.state,
        self.createNewTemplate(data.variables),
        self.oldTemplate,
        data.selector,
        `POPUP_` + data.variables.id,
        data.events
      )

      self.containerOfSelector.style.display = `${data.variables.show === true ? 'block' : 'none'}`
    })

    emitter.on(`${RENDER_COMPONENT_ATM}_${self.id}`, data => {
      // subscribe on getting the same data
      // that method update() of atm sent
      if (self.isShown === true && self.ownContainer !== null) {
        self.render(
          data.state,
          self.createNewTemplate(data.variables),
          self.oldTemplate,
          self.selector,
          `POPUP_` + data.variables.id,
          { onclick: `${RENDER_COMPONENT_ATM_SHOW_POPUP}_${self.id}` }
        )
      }
    })
  }

  createNewTemplate(variables) {
    return `<div id="POPUP_${variables.id}" class="popup"><h3>ID: ${variables.id}</h3><p>${
      variables.count
    }</p></div>`
  }
}
