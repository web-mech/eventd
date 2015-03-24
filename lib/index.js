class Event {
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

export class Observe extends Event {
  constructor(obj) {
    super();
    this._obj = {};

    let emitter = this;
    let props = [];

    for(var i in obj) {
      props.push(i);
    }

    for(let p of props) {
      Object.defineProperty(this, p, {
        set: function(prop) {
          emitter.trigger(p, prop, 'set');
        }
      });
    }
  }

  on(event, handler) {
    super.on(event, handler);
  }

  trigger(event, ...data) {
    super.trigger(event, ...data);
  }
}