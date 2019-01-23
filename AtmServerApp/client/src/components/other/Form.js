import axios from 'axios'

import isNumber from './isNumber'
import isEmpty from './isEmpty'

import Atm from '../Atm/atm.js'

console.log(document.getElementById('spinner'))

const mainContainer = document.getElementById('atmContainer')

// общие классы для всех банкоматов
const classNames = {
  container: 'atm',
  atmCounter: 'atmCounter',
  clientAtAtm: 'clientAtAtm'
}

let defProps = [
  { id: 'atmNew1', servisingTime: 1320, timeGap: 2000 },
  { id: 'atmNew2', servisingTime: 1920, timeGap: 2000 },
  { id: 'atmNew3', servisingTime: 2900, timeGap: 2000 }
]

let props = []
let objts1 = []

const hideSpiner = () => {
  const Spinner = document.getElementById('spinner')
  Spinner.style.display = 'none'
}

const getProps = async () => {
  await axios
    .get(`http://localhost:5000/api/atm`)
    .then(res => (props = res.data))
    .then(res => hideSpiner())
    .catch(err => {
      console.log
      props = defProps
      return err
    })
  console.log('props', props)
  props.forEach(element => {
    console.log(element.servicingTime)
    objts1.push(
      createInitializedAtm(
        mainContainer,
        element.servicingTime,
        parseInt(element.timeGap),
        element.id,
        classNames,
        element.count,
        Atm
      )
    )
  })
  console.log(objts1)
}

const createAtm = async body => {
  await axios
    .post(`http://localhost:5000/api/atm`, body)
    .then(res => console.log(res))
    .catch(err => {
      console.log
      return err
    })
}

createAtm({
  id: 'atmTest',
  servicingTime: 2000,
  timeGap: 4000,
  count: 200
})

const postProps = async () => {
  await axios
    .post(`http://localhost:5000/api/atm`, {
      id: 'atmTest2',
      servicingTime: 2000,
      timeGap: 4000,
      count: 200
    })
    .then(res => console.log(res.data))
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

const createInitializedAtm = function(
  container,
  servisingTime,
  timeGap,
  id,
  classNames,
  count,
  Obj
) {
  return new Obj(container, servisingTime, timeGap, id, classNames, count).init()
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
    let atmAttributes = {
      id: idVal,
      servicingTime: parseInt(sTimeVal),
      timeGap: parseInt(tGapVal),
      count: 0
    }
    props.push(atmAttributes)
    createInitializedAtm(
      mainContainer,
      parseInt(sTimeVal),
      parseInt(tGapVal),
      idVal,
      classNames,
      0,
      Atm
    )
    createAtm(atmAttributes)
    console.log(props)
    return true
  }

  console.log(`${err} vlidation erorrs`)
  if (err > 0) {
    return false
  }
}

DOMtemplate.querySelector('#form_button-create').addEventListener('click', validation, false)

export default DOMtemplate
