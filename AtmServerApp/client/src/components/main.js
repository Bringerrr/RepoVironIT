import Queue from './Queue/queue.js'
import Form from './other/Form'

const queueContaier = document.getElementById('queue')

// Форма инициализирует и управляет АТМ-ами
const formContainer = document.getElementById('formContainer')

// formContainer.innerHTML
formContainer.appendChild(Form)

const queueSize = 0 // Длинна очереди

// Инициализация очереди
new Queue(queueContaier, queueSize, 'queueForAtm').init()
