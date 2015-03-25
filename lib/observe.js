import {Event} from "./event.js";

export class Observe extends Event {
  constructor(obj) {
    super();
    let props = Object.keys(obj);
    this._obj = {};
    for (let attr of props) {
      this._define(attr, obj[attr]);
    }
  }

  on(event, handler) {
    return super.on(event, handler);
  }

  trigger(event, ...data) {
    super.trigger(event, ...data);
  }

  unset(attr) {
    if (!this._obj.hasOwnProperty(attr)) {
      return;
    }

    delete this_.obj[attr];

    this.trigger('change', attr, undefined, 'removed');
  }

  set(attr, value) {
    if (typeof attr === 'string') {
      return this._setter(attr, value);  
    }
    if(typeof attr === 'object') {
      for(let prop in attr) {
        this._setter(prop, attr[prop]);
      }
    }
  }

  _define(attr, value) {
    Object.defineProperty(this, attr, {
      set: function(value) {
        this._setter(attr, value);
      }.bind(this),
      get: function() {
        return this._obj[attr];
      }.bind(this)
    });
    this._obj[attr] = value;
  }

  _setter(attr, value) {
    if (this._obj.hasOwnProperty(attr)) {
      this._obj[attr] = value;
    } else {
      this._define(attr, value);
    }
    this.trigger(attr, value, 'set');
    this.trigger('change', attr, value, 'set');
  }
}