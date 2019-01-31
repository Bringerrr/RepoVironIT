import emitter from '../other/EventEmitterSingleton.js'
import QueueRender from './queueRender.js'

import {
  QUEUE_CLIENT_ENTERED,
  RENDER_COMPONENT_QUEUE,
  ATM_IS_FREE,
  RENDER_FIRST_TIME,
  RENDER_UPDATE,
  RENDER_DELETE
} from '../other/Actions'

export default class Queue {
  constructor(container, size, id) {
    let self = this
    this.id = id
    this.amount = size
    this.container = container // Контейнер для очереди

    this.flow = null // скорость добавление клиентов в очередь
    this.render = null

    emitter.on(ATM_IS_FREE, function(atm) {
      if (self.amount > 0) {
        self.move()
        emitter.emit(QUEUE_CLIENT_ENTERED, atm)
      }
    })
  }

  increseGrowingSpeed(ms) {
    clearInterval(this.flow)
    this.flow = setInterval(() => {
      this.amount += 1
      this.update()
    }, ms)
  }

  getDataForRendering(state) {
    return {
      state: state,
      selector: this.container,
      count: this.amount,
      variables: { id: this.id }
    }
  }

  init() {
    this.render = new QueueRender(this.container.id)
    this.flow = setInterval(() => {
      this.amount += 1
      this.update()
    }, 1000)

    emitter.emit(RENDER_COMPONENT_QUEUE, this.getDataForRendering(RENDER_FIRST_TIME))
  }

  update() {
    emitter.emit(RENDER_COMPONENT_QUEUE, this.getDataForRendering(RENDER_UPDATE))
  }

  delete() {
    emitter.emit(RENDER_COMPONENT_QUEUE, this.getDataForRendering(RENDER_DELETE))
  }

  // Движение очереди
  move() {
    this.amount -= 1
    this.update()
  }
}
