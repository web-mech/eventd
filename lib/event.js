export class Event {
  constructor() {
    this._events = {};
  }

  on() {
    let args = Array.prototype.slice.call(arguments, 0),
      event = args.shift(),
      handle = args.shift();

    this._events[event] = this._events[event] || [];
    this._events[event].push(handle);
    return handle;
  }

  once(event, handle) {
    let _handle = this.on(event, function() {
      handle.apply(this, [].splice.call(arguments, 0));
      this.off(event, _handle);
    }.bind(this));
  }

  off(event, handle) {
    event = this._events[event];
    if(!event) {
      return;
    }
    var _handle = event.indexOf(handle);
    if(!~_handle) {
      event.splice(_handle, 1);
    }
  }

  trigger(event, ...data) {
    if(this._events[event]) {
      for(let e of this._events[event]) {
        e.call(e, ...data);
      }
    }
  }
}