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
  }

  off() {

  }

  trigger(event, ...data) {
    if(this._events[event]) {
      for(let e of this._events[event]) {
        e.call(e, ...data);
      }
    }
  }
}