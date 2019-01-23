const events = require('events')

const EventEmitter = events.EventEmitter

const Emitter = function(...args) {
  if (args._singletonInstance) {
    return args._singletonInstance
  }
  args._singletonInstance = this
  EventEmitter.call(this)
}

function inherit(childClass, parentClass) {
  var F = function() {} // defining temp empty function
  F.prototype = parentClass.prototype
  F.prototype.constructor = F

  childClass.prototype = new F()

  childClass.prototype.constructor = childClass // restoring proper constructor for child class
  parentClass.prototype.constructor = parentClass // restoring proper constructor for parent class
}

inherit(Emitter, EventEmitter)

module.exports = new Emitter()
