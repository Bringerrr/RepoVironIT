import emitter from '../other/EventEmitterSingleton.js'

export default class Component {
  constructor() {
    this.render = function(state, newTemplate, oldTemplate, selector, id, event) {
      let newTempDom = this.createElementFromHTML(newTemplate)

      if (state === 'firstTimeRender') {
        // First time render element
        selector.appendChild(newTempDom)
      }

      if (state === 'update') {
        // Update
        if (selector.innerHTML.indexOf(oldTemplate) + 1) {
          if (newTempDom === null) {
            selector.removeChild(selector.firstChild)
          } else {
            selector.replaceChild(newTempDom, selector.querySelector(`#${id}`))
          }
        }
      }

      if (state === 'delete') {
        // Delete
        if (selector.innerHTML.indexOf(oldTemplate) + 1) {
          selector.removeChild(selector.querySelector(`#${id}`))
        }
      }

      this.oldTemplate = newTemplate

      if (event) {
        // Add Event Listener
        document.getElementById(id).addEventListener('click', e => {
          e.preventDefault()
          e.currentTarget.style.display = 'none'
          emitter.emit(event.onclick)
        })
      }
    }
  }

  createElementFromHTML(htmlString) {
    var div = document.createElement('div')
    div.innerHTML = htmlString.trim()

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild
  }
}
