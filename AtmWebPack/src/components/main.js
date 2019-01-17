import Atm from './Atm/atm.js'
import AtmRender from './Atm/atmRender.js'

import Queue from './Queue/queue.js'
import QueueRender from './Queue/queueRender.js'

import AtmButton from './AtmButton/atmButton.js'
import AtmButtonRender from './AtmButton/atmButtonRender.js'

const queueContaier = document.getElementById('queue')
const mainContainer = document.getElementById('atmContainer')

const queueSize = 10 // Длинна очереди

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

// Рендер
const atmRender = new AtmRender()
const queueRender = new QueueRender()

atmLeft.init()
atmMiddle.init()
atmRight.init()

queue.init()
