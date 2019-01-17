import '../styles/main.css'

console.log('App.js confirmed')

function createTag (tagName, id, className, inner, parent) {
  let elem = document.createElement(tagName)
  elem.id = id
  elem.innerHTML = inner
  elem.className = className
  parent.appendChild(elem)
}

createTag('div', '', 'mainContainer', '', document.body)
createTag(
  'div',
  'atmContainer',
  'atmContainer',
  '',
  document.querySelector('.mainContainer')
)
createTag(
  'div',
  'queue',
  'queue',
  '',
  document.querySelector('.mainContainer')
)

require('./main.js')
