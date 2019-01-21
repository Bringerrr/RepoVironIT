const events = require('events')

const EventEmitter = events.EventEmitter

const Emitter = function(...args) {
  if (args._singletonInstance) {
    return args._singletonInstance
  }
  args._singletonInstance = this
  EventEmitter.call(this)
}

Emitter.prototype.__proto__ = EventEmitter.prototype

module.exports = new Emitter()
