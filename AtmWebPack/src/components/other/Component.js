export default class Component {
  constructor() {
    this.render = function(state, newTemplate, oldTemplate, selector, id, event) {
      console.log('newTemplate', this.createElementFromHTML(newTemplate))
      let newTempDom = this.createElementFromHTML(newTemplate)

      if (state === false) {
        // First time render element
        // console.log(this.createElementFromHTML(newTemplate))
        // console.log('newTemplate', this.createElementFromHTML(newTemplate))

        // console.log(selector)
        selector.appendChild(newTempDom)
        // console.log(this.createElementFromHTML(newTemplate))
      }

      if (state === true) {
        // Change (update) rendered element
        // console.log('newTemplate', newTemplate)
        // console.log('oldTemplate', oldTemplate)
        // console.log('selector.innerHTML', selector.innerHTML)
        // console.log('oldTemplate', this.createElementFromHTML(oldTemplate))
        if (selector.innerHTML.indexOf(oldTemplate) + 1) {
          // console.log('selector', selector)
          // console.log('selector', id)
          // console.log('selectorAuerry', selector.querySelector(`${id}`))
          // console.log(newTempDom)
          if (newTempDom === null) {
            selector.removeChild(selector.firstChild)
          } else selector.replaceChild(newTempDom, selector.querySelector(`#${id}`))
          // selector.innerHTML = selector.innerHTML.replace(oldTemplate, newTemplate)

          // console.log(selector)
          // console.log(
          //   this.createElementFromHTML(selector.innerHTML.replace(oldTemplate, newTemplate))
          // )
          // selector.innerHTML = ''
          // console.log(domOld)
          // selector.replaceChild(domNew, domOld)
        }
      }

      if (state === null) {
        // Delete
        if (selector.innerHTML.indexOf(oldTemplate) + 1) {
          selector.innerHTML = selector.innerHTML.replace(oldTemplate, '')
        }
      }

      this.oldTemplate = newTemplate

      if (event) {
        console.log('event', event.onclick)
      }
      // console.log(this.strToDOM(selector.innerHTML))
    }
  }

  strToDOM(htmlString) {
    var [, openTag, content] = /<(.*?|(?:.*?\n)+.*?)>(.*?|(?:.*?\n)+.*?)<\/.+?>/.exec(htmlString)
    var tagName = /\w+/.exec(openTag)
    var element = document.createElement(tagName)
    var reParams = /([\w|-]+)="(.*?|(?:.*?\n?)+.*?)"/g
    var reParamsExecResult
    while ((reParamsExecResult = reParams.exec(openTag))) {
      element.setAttribute(reParamsExecResult[1], reParamsExecResult[2])
    }
    element.innerHTML = content.trim()
    return element
  }

  createElementFromHTML(htmlString) {
    if (htmlString === '') console.log(htmlString)
    var div = document.createElement('div')
    div.innerHTML = htmlString.trim()

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild
  }
}
