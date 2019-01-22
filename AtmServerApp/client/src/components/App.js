import '../styles/main.css'
import axios from 'axios' 

console.log(window.location.hostname)

const showMeSmth = async () => {
  await axios.get(`http://localhost:5000/api/atm`).then(res => console.log(res.data))
  console.log('smth')
}

showMeSmth()

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
