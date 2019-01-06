function EventEmmiter() {
  this.eventTable = {};

  this.on = function(eventName, cb) {
    if (this.eventTable[eventName]) {
      this.eventTable[eventName].push(cb);
    } else {
      this.eventTable[eventName] = [cb];
    }
  };

  this.trigger = function(eventName, ...rest) {
    if (this.eventTable[eventName]) {
      this.eventTable[eventName].forEach(cb => {
        cb.apply(rest);
      });
    }
  };
}
