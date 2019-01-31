import emitter from '../other/EventEmitterSingleton.js'
import AtmButton from '../AtmButton/atmButton.js'
import AtmRender from './atmRender.js'
import AtmPopup from '../AtmPopup/AtmPopup.js'

import {
  QUEUE_CLIENT_ENTERED,
  ATM_DELETE,
  ATM_POPUP_DELETE_BUTTON,
  RENDER_COMPONENT_ATM_SHOW_POPUP,
  RENDER_COMPONENT_ATM,
  ATM_IS_FREE,
  RENDER_FIRST_TIME,
  RENDER_UPDATE,
  RENDER_DELETE
} from '../other/Actions'

import axios from 'axios'

export default class Atm {
  constructor(parentContainer, servicingTime, timeGap, id, className, count) {
    let self = this

    this.status = 'working'

    this.servicingTime = servicingTime
    this.id = id
    this.count = count || 0 // Всего обслужено клиентов
    this.parentContainer = parentContainer // родительский
    this.ownContainer = null // Cобственный

    this.mainContainer = document.getElementById('mainContainer')
    this.popupContainer = document.getElementById('popupContainer')
    this.popupIndicator = document.getElementById('popupIndicator')

    this.id = id // Наименование айдишника
    this.className = className // Наименование класса
    this.servicing = false // Обслуживание клиента
    this.servicingTime = parseInt(servicingTime) // Время на обслуживание в миллисекундах

    // Промежуток между тем как банкомат закончил обслуживание
    // клиента и приступил к обслуживание другого
    this.timeGap = parseInt(timeGap)

    this.atmCounter = 0

    // variabalses for storaging created Objects
    // and further calling their methods
    this.deleteButton = null
    this.render = null
    this.popup = null

    emitter.on(QUEUE_CLIENT_ENTERED, x => {
      // start servicing client
      if (self.id === x && self.status === 'working') {
        self.servicingClientStart()
      }
    })

    emitter.on(`${ATM_DELETE}_${this.id}`, () => {
      // delete button event
      self.delete()
    })
    emitter.on(`${ATM_POPUP_DELETE_BUTTON}_${this.id}`, () => {
      // delete button event from popup
      self.delete()
    })

    emitter.on(`${RENDER_COMPONENT_ATM_SHOW_POPUP}_${this.id}`, () => {
      // method for putting current number of atm in popup
      self.togglePopup(self.count)
    })
  }

  // Если АТМ не обслуживает клиента, то
  // он повторно сигнизирует о том, что свободен
  atmNotifyItIsFree() {
    emitter.emit(ATM_IS_FREE, `${this.id}`)
    if (this.servicing === false && this.status === 'working') {
      setTimeout(() => {
        this.atmNotifyItIsFree()
      }, 1000)
    }
  }

  togglePopup(initCount) {
    this.popup.toggle(initCount)
  }

  init() {
    this.render = new AtmRender(this.id)
    emitter.emit(`${RENDER_COMPONENT_ATM}_${this.id}`, this.getDataForRendering(RENDER_FIRST_TIME))

    this.atmNotifyItIsFree()

    this.ownContainer = document.getElementById(`${this.id}`)
    this.deleteButton = new AtmButton(
      this.parentContainer,
      `${ATM_DELETE}_${this.id}`,
      `${ATM_DELETE}_${this.id}`
    )
    this.deleteButton.init()
    this.deleteButton.show()

    this.popup = new AtmPopup(
      this.popupIndicator,
      `${RENDER_COMPONENT_ATM_SHOW_POPUP}_${this.id}`,
      `${this.id}`
    )
    this.popup.init()
  }

  getDataForRendering(state) {
    return {
      state: state,
      selector: this.parentContainer,
      variables: {
        servicing: this.servicing,
        servicingTime: this.servicingTime,
        count: this.count,
        id: this.id
      },
      events: {
        onclick: `${RENDER_COMPONENT_ATM_SHOW_POPUP}_${this.id}` // toggle popup event
      }
    }
  }

  update() {
    emitter.emit(`${RENDER_COMPONENT_ATM}_${this.id}`, this.getDataForRendering(RENDER_UPDATE))
  }

  delete() {
    this.status = 'offline' // обрубаем связь
    this.fetchDelete()
    this.deleteButton.hide()
    emitter.emit(`${RENDER_COMPONENT_ATM}_${this.id}`, this.getDataForRendering(RENDER_DELETE))
  }

  servicingClientStart() {
    this.servicing = true
    this.update()
    this.servicingClient()
  }

  async fetchDelete() {
    await axios
      .delete(`http://localhost:5000/api/atm/${this.id}`)
      .then(res => console.log(res.data))
      .catch(err => err)
  }

  async fetchIncreaseCounter() {
    await axios
      .put(`http://localhost:5000/api/atm/change/${this.id}/${1}`)
      .then(res => res)
      .catch(err => err)
  }

  servicingClient() {
    setTimeout(() => {
      this.servicing = false
      this.count += 1
      this.fetchIncreaseCounter()
      this.update()
    }, this.servicingTime)
    setTimeout(() => {
      this.servicingClientEnd()
    }, this.servicingTime + this.timeGap)
  }

  servicingClientEnd() {
    this.servicing = false
    this.update()
    if (this.status === 'working') {
      this.atmNotifyItIsFree()
    }
  }
}
