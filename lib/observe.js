import {Event} from "./event.js";

export class Observe extends Event {
  constructor(obj) {
    super();
    this._obj = {};
    let props = [];
    
    for(var i in obj) {
      props.push(i);
    }

    for(let attr of props) {
      Object.defineProperty(this, attr, {
        set: function(value) {
          this._obj[attr] = value;
          this.trigger(attr, value, 'set');
          this.trigger('change', attr, value, 'set');
        }.bind(this),
        get: function() {
          return this._obj[attr];
        }.bind(this)
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
      set: function(value) {
        this._obj[attr] = value;
        this.trigger(attr, value, 'set');
        this.trigger('change', attr, value, 'set');
      }.bind(this),
      get: function() {
        return this._obj[attr];
      }.bind(this)
    });
    this[attr] = value;
  }
}