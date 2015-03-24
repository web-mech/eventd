import { Observe } from "observe.js";

window.Observe = Observe;

let ob = new Observe({a: '1'});

window.ob = ob;