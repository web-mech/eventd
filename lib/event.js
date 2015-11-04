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
      this.off(event, _handle);
      handle.apply(this, [].slice.call(arguments, 0));
    }.bind(this));
    return _handle;
  }

  off(event, handle) {
    if (typeof handle === 'undefined') {
      this._events[event] = [];
      return;
    }

    event = this._events[event];
    if (!event) {
      return;
    }

    var _handle = event.indexOf(handle);
    if (!!~_handle) {
      event.splice(_handle, 1);
    }
  }

  trigger(event, ...data) {
    if (this._events[event]) {
      for (let e of this._events[event]) {
        e.call(e, ...data);
      }
    }
  }
}