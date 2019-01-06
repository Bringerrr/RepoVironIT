function Store(state) {
  this.state = state;
  this.observers = new Set();

  this.addObserver = function(observer) {
    this.observers.add(observer);
  };

  this.removeObserver = function(observer) {
    this.observers.delete(observer);
  };

  this.updateState = function(updater) {
    this.state = updater(this.state);
    this.notifyObservers();
  };

  this.notifyObservers = function() {
    for (let observer of this.observers) {
      observer(this.state);
    }
  };
}
