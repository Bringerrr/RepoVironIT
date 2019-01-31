import axios from 'axios'

import isNumber from './isNumber'
import isEmpty from './isEmpty'

import Atm from '../Atm/atm.js'

const mainContainer = document.getElementById('atmContainer')

const template =
  '<form id="formContainer"><input id="servisingTime" placeholder="Время oбслуживание (мс)"><span></span></br></input><input id="timeGap" placeholder="Время задержки (мс)"><span></span></br></input><input id="atmID" placeholder="ID"></input><span></span></br><button id="form_button-create" class="button-create" value="Добавить">Добавить</button></form>'

// общие классы для всех банкоматов
const classNames = {
  container: 'atm',
  atmCounter: 'atmCounter',
  clientAtAtm: 'clientAtAtm'
}

let props = [] // props для хранения текущих атрибутов ATM объектов

const hideSpiner = () => {
  const Spinner = document.getElementById('spinner')
  Spinner.style.display = 'none'
}

const fetchGetProps = async () => {
  await axios
    .get(`http://localhost:5000/api/atm`)
    .then(res => (props = res.data))
    .then(res => hideSpiner())
    .catch(err => {
      hideSpiner()
      return err
    })

  props.forEach(element => {
    createInitializedAtm(
      mainContainer,
      element.servicingTime,
      parseInt(element.timeGap),
      element.id,
      classNames,
      element.count,
      Atm
    )
  })
}

const fetchCreateAtm = async body => {
  await axios
    .post(`http://localhost:5000/api/atm`, body)
    .then(res => res)
    .catch(err => err)
}

const createElementFromHTML = function(htmlString) {
  var div = document.createElement('div')
  div.innerHTML = htmlString.trim()
  return div.firstChild
}

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
  const idVal = Id.value.split(' ').join('')

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

    if (isNumber(idVal)) {
      Id.style.border = '1px solid red'
      Id.nextSibling.innerHTML = 'Требуется строка'
      err += 1
    }
  }

  if (err === 0) {
    let atmAttributes = {
      // getting attributes for atm from inputs
      id: idVal,
      servicingTime: parseInt(sTimeVal),
      timeGap: parseInt(tGapVal),
      count: 0
    }

    props.push(atmAttributes) // save attrubutes in props

    createInitializedAtm(
      // create and init new atm on page
      mainContainer,
      parseInt(sTimeVal),
      parseInt(tGapVal),
      idVal,
      classNames,
      0,
      Atm
    )

    fetchCreateAtm(atmAttributes) // writting down new ATM at DB

    return true
  }

  console.log(`${err} vlidation erorrs`)
  if (err > 0) {
    return false
  }
}

let DOMtemplate = createElementFromHTML(template)

fetchGetProps() // Запрашиваем АТМ-ы

DOMtemplate.querySelector('#form_button-create').addEventListener('click', validation, false)

export default DOMtemplate
