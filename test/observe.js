var traceur = require('traceur'),
  expect = require('chai').expect;

traceur.require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our app
  return filename.indexOf('node_modules') === -1;
});


var Observe = require('../lib/observe.js').Observe;

describe('Observe', function() {
  
  it('Has observable properties', function(done) {
    var mammal = new Observe({
      type: 'elephant'
    });
    mammal.on('type', function(type) {
      expect(type).to.equal('horse');
      done();
    });
    mammal.type = 'horse';
  });

  it('Can set new observable properties, observe them before they are set.', function(done) {
    var human = new Observe({});
    human.on('name', function(name) {
      expect(name).to.equal('mike');
      done();
    });
    human.set('name', 'mike');
  });
});