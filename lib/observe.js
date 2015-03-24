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
        set: function(value) {
          emitter.trigger(p, value, 'set');
          emitter.trigger('change', p, value, 'set');
        }
      });
    }
  }

  on(event, handler) {
    super.on(event, handler);
  }

  once(event, handler) {
    super.once(event, handler);
  }

  trigger(event, ...data) {
    super.trigger(event, ...data);
  }

  unset(attr) {
    if(!this.hasOwnProperty(attr)) {
      return;
    }
    
    delete this[attr];

    this.trigger('change', attr, undefined, 'removed');
  }

  set(attr, value) {
    if(this.hasOwnProperty(attr)) {
      this[attr] = value;
      return;
    }

    Object.defineProperty(this, attr, {
      set: function(prop) {
        this.trigger(attr, prop, 'set');
      }.bind(this)
    });
    this[attr] = value;
  }
}