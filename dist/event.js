define([], function() {
  "use strict";
  var Event = function Event() {
    this._events = {};
  };
  ($traceurRuntime.createClass)(Event, {
    on: function() {
      var args = Array.prototype.slice.call(arguments, 0),
          event = args.shift(),
          handle = args.shift();
      this._events[event] = this._events[event] || [];
      this._events[event].push(handle);
      return handle;
    },
    once: function(event, handle) {
      var _handle = this.on(event, function() {
        this.off(event, _handle);
        handle.apply(this, [].slice.call(arguments, 0));
      }.bind(this));
      return _handle;
    },
    off: function(event, handle) {
      event = this._events[event];
      if (!event) {
        return ;
      }
      var _handle = event.indexOf(handle);
      if (!!~_handle) {
        event.splice(_handle, 1);
      }
    },
    trigger: function(event) {
      var $__9;
      for (var data = [],
          $__8 = 1; $__8 < arguments.length; $__8++)
        data[$__8 - 1] = arguments[$__8];
      if (this._events[event]) {
        var $__4 = true;
        var $__5 = false;
        var $__6 = undefined;
        try {
          for (var $__2 = void 0,
              $__1 = (this._events[event])[$traceurRuntime.toProperty(Symbol.iterator)](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
            var e = $__2.value;
            {
              ($__9 = e).call.apply($__9, $traceurRuntime.spread([e], data));
            }
          }
        } catch ($__7) {
          $__5 = true;
          $__6 = $__7;
        } finally {
          try {
            if (!$__4 && $__1.return != null) {
              $__1.return();
            }
          } finally {
            if ($__5) {
              throw $__6;
            }
          }
        }
      }
    }
  }, {});
  return {
    get Event() {
      return Event;
    },
    __esModule: true
  };
});

//# sourceMappingURL=event.js.map