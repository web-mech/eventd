import {} from "traceur-runtime.js";
import { Observe } from "index.js";

window.Observe = Observe;

let ob = new Observe({a: '1'});

window.ob = ob;