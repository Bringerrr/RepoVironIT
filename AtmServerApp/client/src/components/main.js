import Queue from './Queue/queue.js'
import Form, { createAtm } from './other/Form'

const queueContaier = document.getElementById('queue')
const formContainer = document.getElementById('formContainer')

// formContainer.innerHTML
formContainer.appendChild(Form)

const queueSize = 0 // Длинна очереди

// const createState = (container, sTime, tGap, id, classNames, Obj) => {
//   return new Obj(container, sTime, tGap, id, classNames)
// }

// const atmNew = createState(mainContainer, 1320, 2000, 'atmNew', classNames, Atm).init()

// Логика

const queue = new Queue(queueContaier, queueSize, 'queueForAtm').init()
