import '../styles/main.css'
import axios from 'axios' // promised based requests - like fetch()

console.log(window.location.hostname)

axios.get(`/api/atm`).then(res => console.log(res.data))

function createTag(tagName, id, className, inner, parent) {
  let elem = document.createElement(tagName)
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
