import emitter from '../other/EventEmitterSingleton.js'

import { RENDER_FIRST_TIME, RENDER_UPDATE, RENDER_DELETE } from '../other/Actions'

export default class Component {
  constructor() {
    this.render = function(state, newTemplate, oldTemplate, selector, id, events) {
      let newTempDom = this.createElementFromHTML(newTemplate)

      if (state === RENDER_FIRST_TIME) {
        // First time render element
        selector.appendChild(newTempDom)
      }

      if (state === RENDER_UPDATE) {
        // Update
        if (selector.innerHTML.indexOf(oldTemplate) + 1) {
          if (newTempDom === null) {
            selector.removeChild(selector.firstChild)
          } else {
            selector.replaceChild(newTempDom, selector.querySelector(`#${id}`))
          }
        }
      }

      if (events) {
        // Add Event Listener
        selector.querySelector(`#${id}`).addEventListener('click', e => {
          if (typeof events.onclick === 'object' && events.onclick.length > 1) {
            events.onclick.forEach(event => {
              emitter.emit(event, state)
            })
          } else {
            emitter.emit(events.onclick, state)
          }
        })
        // }
      }

      if (state === RENDER_DELETE) {
        // Delete
        if (selector.innerHTML.indexOf(oldTemplate) + 1) {
          selector.removeChild(selector.querySelector(`#${id}`))
        }
      }

      this.oldTemplate = newTemplate
    }
  }

  createElementFromHTML(htmlString) {
    const div = document.createElement('div')
    div.innerHTML = htmlString.trim()
    return div.firstChild
  }
}
