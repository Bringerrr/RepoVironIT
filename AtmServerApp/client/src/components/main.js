import Queue from './Queue/queue.js'
import Form from './other/Form'

import { Router } from './other/Router'

// configuration
Router.config({ mode: 'history' })

// adding routes
Router.add(/about/, function() {
  console.log('about')
})
  .add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments)
  })
  .add(function() {
    console.log('default')
  })
  //   .check('/about')
  .listen()

// forwarding
// Router.navigate('/about')

const queueContaier = document.getElementById('queue')

// Форма инициализирует и управляет АТМ-ами
const formContainer = document.getElementById('formContainer')

// formContainer.innerHTML
formContainer.appendChild(Form)

const queueSize = 0 // Длинна очереди

// Инициализация очереди
new Queue(queueContaier, queueSize, 'queueForAtm').init()
