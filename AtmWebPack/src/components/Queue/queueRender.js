import emitter from '../other/EventEmitterSingleton.js'
import Component from '../other/Component'

export default class QueueRender extends Component {
  constructor(id) {
    super()
    let self = this
    this.id = id
    this.oldTemplate = {}
    emitter.on('RENDER_COMPONENT_QUEUE', function(data) {
      self.render(
        data.state,
        self.createNewTemplate(data.variables, data.count),
        self.oldTemplate,
        data.selector,
        `queueContainer`
      )
    })
  }

  createNewTemplate(variables, count = 0) {
    // let template = `<div id="client${count}"></div>`
    let groupOfElements = []
    if (count === 0) {
      return ''
    }
    for (let i = 0; i < count; i++) {
      groupOfElements.push(`<div id="client${i}"></div>`)
    }
    return `<div id="queueContainer">${groupOfElements.join('')}</div>`
  }
}
