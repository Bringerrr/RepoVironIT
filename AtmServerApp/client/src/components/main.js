import Queue from './Queue/queue.js'
import Form from './other/Form' // В форме осуществляется манипуляция с АТМ-ами

import { Router } from './other/Router'

// configuration
// Router not yet realized
Router.config({ mode: 'history' })

// adding routes
Router.add(/atm\/(.*)/, function(x) {
  console.log(x)
  console.log('atm', arguments)
})
  //   .check('/atm')
  .listen()

const queueContaier = document.getElementById('queue')

// Форма инициализирует и управляет АТМ-ами
const formContainer = document.getElementById('formContainer')

// Controller for queue
const queueController = document.getElementById('queue_controller')

queueController.outerHTML = `<input id="queue_controller" placeholder="Появление человека в очереди(мс)" class="queue_controller">`

// formContainer.innerHTML
formContainer.appendChild(Form)

const queueSize = 15 // Длинна очереди

// Инициализация очереди
const queueObj = new Queue(queueContaier, queueSize, 'queueForAtm')
queueObj.init()

queueController.addEventListener('change', e => {
  e.preventDefault()
  queueObj.increseGrowingSpeed(e.target.value)
})
