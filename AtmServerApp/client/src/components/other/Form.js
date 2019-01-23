import axios from 'axios'

import isNumber from './isNumber'
import isEmpty from './isEmpty'

import Atm from '../Atm/atm.js'

const mainContainer = document.getElementById('atmContainer')

// общие классы для всех банкоматов
const classNames = {
  container: 'atm',
  atmCounter: 'atmCounter',
  clientAtAtm: 'clientAtAtm'
}

let props = [
  { id: 'atmNew1', servisingTime: 1320, timeGap: 2000 },
  { id: 'atmNew2', servisingTime: 1920, timeGap: 2000 },
  { id: 'atmNew3', servisingTime: 2900, timeGap: 2000 }
]

const getProps = async () => {
  await axios.get(`http://localhost:5000/api/atm`).then(res => console.log(res.data))
  console.log(props)
}

const postProps = async () => {
  await axios
    .post(`http://localhost:5000/api/atm`, {
      id: 'atmTest2',
      servicingTime: 2000,
      timeGap: 4000,
      count: 200
    })
    .then(res => console.log(res.data))
  console.log(props)
}

getProps()
postProps()

const template =
  '<form id="formContainer"><input id="servisingTime" placeholder="Время oбслуживание (мс)"><span></span></br></input><input id="timeGap" placeholder="Время задержки (мс)"><span></span></br></input><input id="atmID" placeholder="ID"></input><span></span></br><button id="form_button-create" class="button-create" value="Добавить">Добавить</button></form>'

const createElementFromHTML = function(htmlString) {
  if (htmlString === '') console.log(htmlString)
  var div = document.createElement('div')
  div.innerHTML = htmlString.trim()
  return div.firstChild
}

let DOMtemplate = createElementFromHTML(template)

const createInitializedAtm = function(container, servisingTime, timeGap, id, classNames, Obj) {
  return new Obj(container, servisingTime, timeGap, id, classNames).init()
}

const validation = function(e) {
  e.preventDefault()

  let err = 0

  const servicingTime = document.getElementById('servisingTime')
  const TimeGap = document.getElementById('timeGap')
  const Id = document.getElementById('atmID')

  const sTimeVal = servicingTime.value
  const tGapVal = TimeGap.value
  const idVal = Id.value

  if (isNumber(sTimeVal)) {
    servicingTime.style.border = '1px solid black'
    servicingTime.nextSibling.innerHTML = ''
  }

  if (!isNumber(sTimeVal) || isEmpty(sTimeVal)) {
    servicingTime.style.border = '1px solid red'
    servicingTime.nextSibling.innerHTML = 'Пустое значение или не число'
    err += 1
  }

  if (isNumber(tGapVal)) {
    TimeGap.style.border = '1px solid black'
    TimeGap.nextSibling.innerHTML = ''
  }

  if (!isNumber(tGapVal) || isEmpty(tGapVal)) {
    TimeGap.style.border = '1px solid red'
    TimeGap.nextSibling.innerHTML = 'Пустое значение или не число'
    err += 1
  }

  if (isEmpty(idVal)) {
    Id.style.border = '1px solid red'
    Id.nextSibling.innerHTML = 'Пустое значение'
    err += 1
  }

  if (!isEmpty(idVal)) {
    Id.style.border = '1px solid black'
    Id.nextSibling.innerHTML = ''
    if (props.filter(elem => elem.id === idVal).length > 0) {
      Id.style.border = '1px solid red'
      Id.nextSibling.innerHTML = 'Такой ID уже есть'
      err += 1
    }
    if (props.filter(elem => elem.id === idVal).length === 0) {
      Id.style.border = '1px solid black'
      Id.nextSibling.innerHTML = ''
    }
  }

  if (err === 0) {
    props.push({
      id: idVal,
      servisingTime: parseInt(sTimeVal),
      timeGap: parseInt(tGapVal)
    })
    createInitializedAtm(
      mainContainer,
      parseInt(sTimeVal),
      parseInt(tGapVal),
      idVal,
      classNames,
      Atm
    )
    console.log(props)
    return true
  }

  console.log(err)
  if (err > 0) {
    return false
  }
}

props.forEach(element => {
  return createInitializedAtm(
    mainContainer,
    element.servisingTime,
    element.timeGap,
    element.id,
    classNames,
    Atm
  )
})


DOMtemplate.querySelector('#form_button-create').addEventListener('click', validation, false)

export default DOMtemplate
