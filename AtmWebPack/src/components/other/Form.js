import isNumber from './isNumber'
import isEmpty from './isEmpty'

const template =
  '<form id="formContainer"><input id="sTime" placeholder="Обслуживание"></input><input id="tGap" placeholder="Задержка"></input><input id="atmID" placeholder="ID"></input><button id="form_button-create" class="button-create" value="Добавить">Добавить</button></form>'

let formState = {}

const createElementFromHTML = function(htmlString) {
  if (htmlString === '') console.log(htmlString)
  var div = document.createElement('div')
  div.innerHTML = htmlString.trim()

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild
}

let DOMtemplate = createElementFromHTML(template)

const createAtm = function(e) {
  e.preventDefault()

  const servicingTime = document.getElementById('sTime')
  const TimeGap = document.getElementById('tGap')
  const Id = document.getElementById('atmID')

  const validation = function() {
    let err = 0

    if (isNumber(servicingTime.value)) {
      servicingTime.style.border = '1px solid black'
    }

    if (!isNumber(servicingTime.value) && !isEmpty(servicingTime.value)) {
      servicingTime.style.border = '1px solid red'
      err += 1
    }

    if (isNumber(TimeGap.value)) {
      TimeGap.style.border = '1px solid black'
    }

    if (!isNumber(TimeGap.value) && !isEmpty(servicingTime.value)) {
      TimeGap.style.border = '1px solid red'
      err += 1
    }

    if (isEmpty(Id.value)) {
      Id.style.border = '1px solid red'
      err += 1
    }

    if (!isEmpty(Id.value)) {
      Id.style.border = '1px solid black'
    }

    if (err === 0) {
      formState[Id.value] = { TimeGap: TimeGap.value, servicingTime: servicingTime.value }
    }
    console.log(formState)
    console.log(err)
  }
  console.log(servicingTime, TimeGap, Id)
  validation()
}

DOMtemplate.querySelector('#form_button-create').addEventListener('click', createAtm, false)

export default DOMtemplate
