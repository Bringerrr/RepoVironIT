const events = require('events')
// Можно заменить на const { EventEmitter }  = req...
const EventEmitter = events.EventEmitter

const Emitter = function(...args) {
  if (args._singletonInstance) {
    return args._singletonInstance
  }
  args._singletonInstance = this
  EventEmitter.call(this)
}

// Не используй __proto__
Emitter.prototype.__proto__ = EventEmitter.prototype

module.exports = new Emitter()
