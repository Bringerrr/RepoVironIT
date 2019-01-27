// import './atmButtonRender.css'
import emitter from '../other/EventEmitterSingleton.js'
import Component from '../other/Component'

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
    console.log(this.eventName)
    emitter.on(`RENDER_COMPONENT_POPUP_${self.id}`, function(data) {
      console.log(`${self.eventName}`)
      console.log(`data`, data.events)
      console.log(`atmPopupRender SHOW-----------`, data.variables.show)

      self.selector = data.selector
      self.containerOfSelector = data.selector.parentNode
      self.isShown = data.variables.show

      console.log(data.events)
      self.render(
        data.state,
        self.createNewTemplate(data.variables),
        self.oldTemplate,
        data.selector,
        `POPUP_` + data.variables.id, // DO SMTH WITH ID ! ! ! ! ! ! ! !
        data.events
      )

      self.containerOfSelector.style.display = `${data.variables.show === true ? 'block' : 'none'}`

      // self.containerOfSelector.addEventListener('click', function(event) {
      //   event.preventDefault()

      //   if (event.target !== self.selector && event.target.parentNode !== self.selector) {
      //     console.log('sadasdasd')
      //     console.log(`${self.id}`)
      //     emitter.emit(`${self.id}`)
      //   }
      // })
    })

    emitter.on(`RENDER_COMPONENT_ATM_${self.id}`, function(data) {
      // subscribing on getting the same data
      // that method update() of atm sent
      if (self.isShown === true) {
        self.render(
          data.state,
          self.createNewTemplate(data.variables),
          self.oldTemplate,
          self.selector,
          `POPUP_` + data.variables.id,
          { onclick: `RENDER_COMPONENT_ATM_SHOW_POPUP_${self.id}` }
        )
      }
    })
  }

  createNewTemplate(variables) {
    return `<div id="POPUP_${variables.id}" class="popup">${variables.count}</div>`
  }
}
