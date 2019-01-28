import Atm from './Atm/atm.js'
import Queue from './Queue/queue.js'
import Form from './other/Form'
const queueContaier = document.getElementById('queue')
const mainContainer = document.getElementById('atmContainer')
const formContainer = document.getElementById('formContainer')

// formContainer.innerHTML
formContainer.appendChild(Form)

const queueSize = 15 // Длинна очереди

// общие классы для всех банкоматов
const classNames = {
  container: 'atm',
  atmCounter: 'atmCounter',
  clientAtAtm: 'clientAtAtm'
}

// Логика
const atmLeft = new Atm(mainContainer, 1320, 2000, 'atmLeft', classNames)
const atmMiddle = new Atm(mainContainer, 4000, 2000, 'atmMiddle', classNames)
const atmRight = new Atm(mainContainer, 1500, 2000, 'atmRight', classNames)

const queue = new Queue(queueContaier, queueSize, 'queueForAtm')

atmLeft.init()
atmMiddle.init()
atmRight.init()

queue.init()
