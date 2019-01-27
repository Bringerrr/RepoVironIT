import emitter from '../other/EventEmitterSingleton.js'

export default class Component {
  constructor() {
    this.render = function(state, newTemplate, oldTemplate, selector, id, event) {
      let newTempDom = this.createElementFromHTML(newTemplate)
      // console.log(newTempDom)

      if (state === 'firstTimeRender') {
        if (newTemplate.indexOf('POPUP') + 1) {
          // console.log(selector)
        }
        // First time render element
        selector.appendChild(newTempDom)
      }

      if (state === 'update') {
        // if (newTemplate.indexOf('POPUP') + 1) {
        //   console.log(selector)
        // }

        // Update
        if (selector.innerHTML.indexOf(oldTemplate) + 1) {
          if (newTempDom === null) {
            selector.removeChild(selector.firstChild)
          } else {
            selector.replaceChild(newTempDom, selector.querySelector(`#${id}`))
          }
        }
      }

      // if (event.onclick.indexOf('data.variables.event') + 1) {
      //   console.log(event.onclick)
      //   console.log(selector)
      // }

      if (event) {
        // Add Event Listeners
        if (event.onclick.indexOf('RENDER_COMPONENT_ATM_SHOW_POPUP') + 1) {
          // console.log('delete state go ------------------->')
          // console.log(document.getElementById('popupContainer'))
          // document.getElementById('popupContainer').addEventListener(
          //   'click',
          //   e => {
          //     e.preventDefault()
          //     e.stopePropagation()
          //     if (event.onclick.indexOf('DELETE') + 1) {
          //       e.currentTarget.style.display = 'none'
          //     }
          //     console.log(event.onclick, state)
          //     emitter.emit(event.onclick, state)
          //   },
          //   true
          // )
          //   document.getElementById('popupContainer').addEventListener('click', function(event) {
          //   event.preventDefault()
          //   if (event.target !== selector && event.target.parentNode !== selector) {
          //     console.log('sadasdasd')
          //   }
          // })
        }
        selector.querySelector(`#${id}`).addEventListener('click', e => {
          e.preventDefault()
          if (event.onclick.indexOf('DELETE') + 1) {
            e.currentTarget.style.display = 'none'
          }
          // console.log(event.onclick, state)
          emitter.emit(event.onclick, state)
        })

        if (state === 'delete') {
          // Delete
          if (selector.innerHTML.indexOf(oldTemplate) + 1) {
            selector.removeChild(selector.querySelector(`#${id}`))
          }
        }
      }

      this.oldTemplate = newTemplate
    }
  }

  createElementFromHTML(htmlString) {
    var div = document.createElement('div')
    div.innerHTML = htmlString.trim()

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild
  }
}
