import emitter from '../other/EventEmitterSingleton.js'
import QueueRender from './queueRender.js'

export default class Queue {
  constructor(container, size, id) {
    let self = this
    this.id = id
    this.amount = size
    this.container = container // Контейнер для очереди

    this.flow = null
    this.render = null

    emitter.on('AtmIsFree', function(atm) {
      if (self.amount > 0) {
        self.move()
        emitter.emit('clientEntered', atm)
      }
    })
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

    emitter.emit('RENDER_COMPONENT_QUEUE', this.getDataForRendering('firstTimeRender'))
  }

  update() {
    emitter.emit('RENDER_COMPONENT_QUEUE', this.getDataForRendering('update'))
  }

  delete() {
    emitter.emit('RENDER_COMPONENT_QUEUE', this.getDataForRendering('delete'))
  }

  // Движение очереди
  move() {
    this.amount -= 1
    this.update()
  }
}
