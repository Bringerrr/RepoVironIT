import './AtmPopup.css'
import emitter from '../other/EventEmitterSingleton.js'
import AtmPopupRender from './AtmPopupRender.js'
import AtmButton from '../AtmButton/atmButton.js'

import { Router } from '../other/Router'

export default class AtmPopup {
  constructor(container, eventName, id) {
    this.mainContainer = document.getElementById('popupContainer')
    this.container = container
    this.id = id
    this.eventName = eventName
    this.render = null
    this.count = 0
    this.isShowed = false

    Router.add(function() {
      console.log(self.id)
    })
  }

  init() {
    this.render = new AtmPopupRender(this.id, this.eventName)
    this.deleteButton = new AtmButton(
      this.container,
      `ATM_POPUP_DELETE_BUTTON_${this.id}`,
      `ATM_POPUP_DELETE_BUTTON_${this.id}`
    )
    this.deleteButton.init()
  }

  toggle(count) {
    console.log(`ATM+POPUP_TOGGLED`)
    this.count = count // передаем значение из нажатого атм-а
    this.isShowed = !this.isShowed
    console.log(`isShowed`, this.isShowed)
    if (this.isShowed === true) {
      console.log('created')
      this.firstTimeRender()
      this.deleteButton.show()
      Router.navigate(`/atm/${this.id}`, 'Test') // forwarding
      // this.mainContainer.addEventListener('click', this.test, true)
    }
    if (this.isShowed === false) {
      console.log('deleting')
      // debugger
      this.delete()
      this.deleteButton.hide()
      Router.navigate(``) // forwarding
      // this.mainContainer.removeEventListener('click', this.toggle, true)
    }
  }

  firstTimeRender() {
    emitter.emit(`RENDER_COMPONENT_POPUP_${this.id}`, this.getDataForRendering('firstTimeRender'))
  }

  delete() {
    emitter.emit(`RENDER_COMPONENT_POPUP_${this.id}`, this.getDataForRendering('delete'))
  }

  hide() {
    console.log(this.id, ' now is hidden')
    emitter.emit(`RENDER_COMPONENT_ATM_POPUP_${this.id}`, this.getDataForRendering('delete'))
  }

  getDataForRendering(state) {
    console.log(this.eventName)
    return {
      state: state,
      selector: this.container,
      variables: {
        id: this.id,
        count: this.count,
        show: this.isShowed
      },
      events: {
        onclick: this.eventName
      }
    }
  }
}
