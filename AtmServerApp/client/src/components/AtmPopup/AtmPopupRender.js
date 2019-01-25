// import './atmButtonRender.css'
import emitter from '../other/EventEmitterSingleton.js'
import Component from '../other/Component'

export default class atmPopupRender extends Component {
  constructor(id) {
    super()
    let self = this
    this.id = id
    this.selector = null
    this.containerOfSelector = null
    this.oldTemplate = {}
    emitter.on(`RENDER_COMPONENT_ATM_POPUP_${self.id}`, function(data) {
      console.log(`RENDER_COMPONENT_ATM_POPUP_${self.id}`)
      console.log(data)
      self.selector = data.selector
      self.containerOfSelector = data.selector.parentNode
      console.log('init template', self.createNewTemplate(data.variables))
      self.render(
        data.state,
        self.createNewTemplate(data.variables),
        self.oldTemplate,
        data.selector,
        data.variables.id,
        data.events
      )
      self.containerOfSelector.style.display = `${data.variables.show === true ? 'block' : 'none'}`
      self.selector.addEventListener('click', () => console.log('not clicked'), false)
      self.containerOfSelector.addEventListener('click', () => console.log('clicked'), false)
    })
    emitter.on(`RENDER_COMPONENT_ATM_${this.id}`, function(data) {
      // subscribing on getting the same data
      // which method update() of atm sent
      self.render(
        data.state,
        self.createNewTemplate(data.variables),
        self.oldTemplate,
        self.selector,
        `POPUP_${data.variables.id}`
      )
    })
  }

  createNewTemplate(variables) {
    return `<div style="display:${variables.show === true ? 'none' : 'block'};" id="POPUP_${
      variables.id
    }" class="popup">${variables.count}</div>`
  }
}
