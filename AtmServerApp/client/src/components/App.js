import '../styles/main.css'

function createTag(tagName, id, className, inner, parent) {
  const elem = document.createElement(tagName)
  elem.id = id
  elem.innerHTML = inner
  elem.className = className
  parent.appendChild(elem)
}
createTag('div', 'formContainer', 'formContainer', '', document.body)
createTag('div', 'mainContainer', 'mainContainer', '', document.body)
createTag('div', 'popupContainer', 'popupContainer', '', document.body)

createTag('div', 'popupIndicator', 'popup_indicator', '', document.querySelector('.popupContainer'))

createTag('div', 'atmContainer', 'atmContainer', '', document.querySelector('.mainContainer'))
createTag('div', 'spinner', 'spinner', '', document.querySelector('.atmContainer'))
createTag('div', 'queue', 'queue', '', document.querySelector('.mainContainer'))

createTag(
  'input',
  'queue_controller',
  'queue_controller',
  '',
  document.querySelector('.mainContainer')
)

require('./main.js')
