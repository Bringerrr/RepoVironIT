import emitter from '../other/EventEmitterSingleton.js'
import AtmButton from '../AtmButton/atmButton.js'
import AtmRender from './atmRender.js'
import AtmPopup from '../AtmPopup/AtmPopup.js'

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
    this.timeGap = parseInt(timeGap) // Промежуток между тем как банкомат закончил обслуживание
    // клиента и приступил к обслуживание другого
    this.atmCounter = 0

    this.deleteButton = null
    this.render = null
    this.popup = null

    emitter.on('clientEntered', function(x) {
      // queue
      if (self.id === x && self.status === 'working') {
        self.servicingClientStart()
      }
    })
    emitter.on(`ATM_DELETE_${this.id}`, function() {
      // delete button event
      self.delete()
    })
    emitter.on(`ATM_POPUP_DELETE_${this.id}`, function() {
      // delete button by popup event
      self.delete()
    })

    emitter.on(`ATM_RENDER_POPUP_${this.id}`, function() {
      self.showPopup(self.count)
    })
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
        onclick: `ATM_RENDER_POPUP_${this.id}`
      }
    }
  }

  // Если АТМ не обслуживает клиента, то
  // он повторно сигнизирует о том, что свооден
  atmNotifyItIsFree() {
    emitter.emit('AtmIsFree', `${this.id}`)
    if (this.servicing === false && this.status === 'working') {
      setTimeout(() => {
        this.atmNotifyItIsFree()
      }, 1000)
    }
  }

  showPopup(initCount) {
    this.popup.init()
    this.popup.show(initCount)
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
    ).init()
    this.popup = new AtmPopup(this.popupIndicator, `RENDER_COMPONENT_ATM_POPUP_${this.id}`, this.id)
  }

  update() {
    emitter.emit(`RENDER_COMPONENT_ATM_${this.id}`, this.getDataForRendering('update'))
  }

  delete() {
    this.status = 'offline' // обрубаем связь
    this.fetchDelete()
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
      .post(`http://localhost:5000/api/atm/change/${this.id}/${1}`, {
        id: 'atmTest2',
        servicingTime: 2000,
        timeGap: 4000,
        count: 200
      })
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
