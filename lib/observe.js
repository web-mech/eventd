import {Event} from "./event.js";

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