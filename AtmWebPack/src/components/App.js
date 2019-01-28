import '../styles/main.css'

// Что это? o_o
console.log(parseInt('wer'))

function createTag(tagName, id, className, inner, parent) {
  let elem = document.createElement(tagName) // const
  elem.id = id
  elem.innerHTML = inner
  elem.className = className
  parent.appendChild(elem)
}
createTag('div', 'formContainer', 'formContainer', '', document.body)
createTag('div', 'mainContainer', 'mainContainer', '', document.body)
createTag('div', 'atmContainer', 'atmContainer', '', document.querySelector('.mainContainer'))
createTag('div', 'queue', 'queue', '', document.querySelector('.mainContainer'))

require('./main.js')
