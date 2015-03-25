var traceur = require('traceur'),
  expect = require('chai').expect,
  should = require('chai').should();

traceur.require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our app
  return filename.indexOf('node_modules') === -1;
});

var Observe = require('../lib/observe.js').Observe;
var Event = require('../lib/event.js').Event;

global.Event = Event;
global.Observe = Observe;
global.expect = expect;
global.should = should;