define(["./event"], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var Event = $__0.Event;
  var Observe = function Observe() {
    var obj = arguments[0] !== (void 0) ? arguments[0] : {};
    $traceurRuntime.superConstructor($Observe).call(this);
    var props = Object.keys(obj);
    this._obj = {};
    var $__6 = true;
    var $__7 = false;
    var $__8 = undefined;
    try {
      for (var $__4 = void 0,
          $__3 = (props)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
        var attr = $__4.value;
        {
          this._define(attr, obj[attr]);
        }
      }
    } catch ($__9) {
      $__7 = true;
      $__8 = $__9;
    } finally {
      try {
        if (!$__6 && $__3.return != null) {
          $__3.return();
        }
      } finally {
        if ($__7) {
          throw $__8;
        }
      }
    }
  };
  var $Observe = Observe;
  ($traceurRuntime.createClass)(Observe, {
    on: function(event, handler) {
      return $traceurRuntime.superGet(this, $Observe.prototype, "on").call(this, event, handler);
    },
    trigger: function(event) {
      var $__11;
      for (var data = [],
          $__10 = 1; $__10 < arguments.length; $__10++)
        data[$__10 - 1] = arguments[$__10];
      ($__11 = $traceurRuntime.superGet(this, $Observe.prototype, "trigger")).call.apply($__11, $traceurRuntime.spread([this, event], data));
    },
    unset: function(attr) {
      if (!this._obj.hasOwnProperty(attr)) {
        return ;
      }
      delete this_.obj[attr];
      this.trigger('change', attr, undefined, 'removed');
    },
    set: function(attr, value) {
      if (typeof attr === 'string') {
        return this._setter(attr, value);
      }
      if (typeof attr === 'object') {
        for (var prop in attr) {
          this._setter(prop, attr[prop]);
        }
      }
    },
    _define: function(attr, value) {
      Object.defineProperty(this, attr, {
        set: function(value) {
          this._setter(attr, value);
        }.bind(this),
        get: function() {
          return this._obj[attr];
        }.bind(this)
      });
      this._obj[attr] = value;
    },
    _setter: function(attr, value) {
      if (this._obj.hasOwnProperty(attr)) {
        if (this._obj[attr] === value) {
          return ;
        }
        this._obj[attr] = value;
      } else {
        this._define(attr, value);
      }
      this.trigger(attr, value, 'set');
      this.trigger('change', attr, value, 'set');
    }
  }, {}, Event);
  return {
    get Observe() {
      return Observe;
    },
    __esModule: true
  };
});

//# sourceMappingURL=observe.js.map