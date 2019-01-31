import './AtmPopup.css'
import emitter from '../other/EventEmitterSingleton.js'
import AtmPopupRender from './AtmPopupRender.js'
import AtmButton from '../AtmButton/atmButton.js'

import {
  ATM_POPUP_DELETE_BUTTON,
  RENDER_COMPONENT_POPUP,
  RENDER_FIRST_TIME,
  RENDER_DELETE,
  RENDER_COMPONENT_ATM_SHOW_POPUP
} from '../other/Actions'

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

    this.deleteButton = null
  }

  init() {
    this.render = new AtmPopupRender(this.id, this.eventName)
    this.deleteButton = new AtmButton(
      this.container,
      [`${ATM_POPUP_DELETE_BUTTON}_${this.id}`, `${RENDER_COMPONENT_POPUP}_${this.id}`],
      `${ATM_POPUP_DELETE_BUTTON}_${this.id}`
    )
    this.deleteButton.init()
  }

  toggle(count) {
    this.count = count // передаем значение из нажатого атм-а
    this.isShowed = !this.isShowed
    if (this.isShowed === true) {
      this.firstTimeRender()
      this.deleteButton.show()
      Router.navigate(`/atm/${this.id}`, 'Test') // forwarding
    }
    if (this.isShowed === false) {
      console.log('deleting')
      // debugger
      this.delete()
      this.deleteButton.hide()
      Router.navigate(``) // forwarding
    }
  }

  firstTimeRender() {
    emitter.emit(
      `${RENDER_COMPONENT_POPUP}_${this.id}`,
      this.getDataForRendering(RENDER_FIRST_TIME)
    )
  }

  delete() {
    emitter.emit(`${RENDER_COMPONENT_POPUP}_${this.id}`, this.getDataForRendering(RENDER_DELETE))
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
