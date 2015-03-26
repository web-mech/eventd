import {Observe} from "observe.js";
import {Event} from "event.js";

if(typeof define === 'function' && typeof require === 'function') {
  define('eventd', function() {
    return {
      Event: Event,
      Observe: Observe
    };
  });
} else {
  window.Eventd = window.Eventd || {
    Event: Event,
    Observe: Observe
  };
}