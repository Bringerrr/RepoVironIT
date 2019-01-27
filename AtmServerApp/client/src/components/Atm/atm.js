import emitter from '../other/EventEmitterSingleton.js'
import AtmButton from '../AtmButton/atmButton.js'
import AtmRender from './atmRender.js'
import AtmPopup from '../AtmPopup/AtmPopup.js'

import { Router } from '../other/Router'

import axios from 'axios'

export default class Atm {
  constructor(parentContainer, servicingTime, timeGap, id, className, count) {
    let self = this

    this.status = 'working'

    this.servicingTime = servicingTime
    this.id = id
    this.count = count || 0 // Всего обслужено клиентов
    this.parentContainer = parentContainer // родительский
    this.ownContainer = null // собственный

    this.mainContainer = document.getElementById('mainContainer')
    this.popupContainer = document.getElementById('popupContainer')
    this.popupIndicator = document.getElementById('popupIndicator')

    this.id = id // Наименование айдишника
    this.className = className // Наименование класса
    this.servicing = false // Обслуживание клиента
    this.servicingTime = parseInt(servicingTime) // Время на обслуживание в миллисекундах
    this.timeGap = parseInt(timeGap)
    // Промежуток между тем как банкомат закончил обслуживание
    // клиента и приступил к обслуживание другого
    this.atmCounter = 0

    this.deleteButton = null
    this.render = null
    this.popup = null

    emitter.on('clientEntered', function(x) {
      // start servicing client
      if (self.id === x && self.status === 'working') {
        self.servicingClientStart()
      }
    })
    emitter.on(`ATM_DELETE_${this.id}`, function() {
      // delete button event
      self.delete()
    })
    emitter.on(`ATM_POPUP_DELETE_BUTTON_${this.id}`, function() {
      // delete button event from popup
      self.delete()
    })

    emitter.on(`RENDER_COMPONENT_ATM_SHOW_POPUP_${this.id}`, function(state) {
      // console.log('ATM_RENDER_POPUP', state)
      self.togglePopup(self.count)
    })
  }

  // Если АТМ не обслуживает клиента, то
  // он повторно сигнизирует о том, что свободен
  atmNotifyItIsFree() {
    emitter.emit('AtmIsFree', `${this.id}`)
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
    emitter.emit(`RENDER_COMPONENT_ATM_${this.id}`, this.getDataForRendering('firstTimeRender'))

    this.atmNotifyItIsFree()

    this.ownContainer = document.getElementById(`${this.id}`)
    this.deleteButton = new AtmButton(
      this.parentContainer,
      `ATM_DELETE_${this.id}`,
      `ATM_DELETE_${this.id}`
    )
    this.deleteButton.init()
    this.deleteButton.show()

    this.popup = new AtmPopup(
      this.popupIndicator,
      `RENDER_COMPONENT_ATM_SHOW_POPUP_${this.id}`,
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
        onclick: `RENDER_COMPONENT_ATM_SHOW_POPUP_${this.id}` // toggle popup event
      }
    }
  }

  update() {
    emitter.emit(`RENDER_COMPONENT_ATM_${this.id}`, this.getDataForRendering('update'))
  }

  delete() {
    this.status = 'offline' // обрубаем связь
    this.fetchDelete()
    // this.deleteButton.hide()
    emitter.emit(`RENDER_COMPONENT_ATM_${this.id}`, this.getDataForRendering('delete'))
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
