import './AtmPopup.css'
import emitter from '../other/EventEmitterSingleton.js'
import AtmPopupRender from './AtmPopupRender.js'
import AtmButton from '../AtmButton/atmButton.js'

export default class AtmPopup {
  constructor(container, eventName, id) {
    this.container = container
    this.id = id
    this.eventName = eventName
    this.render = null
    this.count = 0
    this.isShowed = false
  }

  init() {
    console.log(this.id)
    this.render = new AtmPopupRender(this.id)
    // this.render = new AtmPopupRender(this.id)
    console.log('popup inited')
    this.deleteButton = new AtmButton(
      this.container,
      `ATM_POPUP_DELETE_${this.id}`,
      `ATM_POPUP_DELETE_${this.id}`
    ).init()
  }

  show(count) {
    this.count = count // передаем значение из нажатого атм-а
    // this.show = true
    console.log('popup showed', this.count)
    emitter.emit(
      `RENDER_COMPONENT_ATM_POPUP_${this.id}`,
      this.getDataForRendering('firstTimeRender')
    )
  }

  getDataForRendering(state) {
    return {
      state: state,
      selector: this.container,
      variables: {
        id: this.id,
        count: this.count,
        show: !this.isShowed
      },
      events: {
        onclick: this.eventName
      }
    }
  }
}
