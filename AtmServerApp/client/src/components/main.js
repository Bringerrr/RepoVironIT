import Queue from './Queue/queue.js'
import Form from './other/Form' // В форме осуществляется манипуляция с АТМ-ами

import { Router } from './other/Router'

// configuration
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

// formContainer.innerHTML
formContainer.appendChild(Form)

const queueSize = 0 // Длинна очереди

// Инициализация очереди
new Queue(queueContaier, queueSize, 'queueForAtm').init()
