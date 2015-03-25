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
      expect(type).to.equal(mammal.type);
      expect(mammal.type).to.equal('horse');
      done();
    });

    mammal.type = 'horse';
  });

  it('Can set new observable properties, observe them before they are set.', function(done) {
    var human = new Observe({});

    human.once('name', function(name) {
      expect(name).to.equal(human.name);
      expect(human.name).to.equal('mike');

      human.once('name', function(name) {
        expect(name).to.equal(human.name);
        expect(human.name).to.equal('price');
        done();
      });

      human.set('name', 'price');
    });
    human.set('name', 'mike');
  });

  it('Can set multiple, observable properies at once', function() {
    var human = new Observe({});

    human.once('name', function(name) {
      expect(name).to.equal(human.name);
      expect(name).to.equal('mike');
    });
    
    human.once('age', function(age) {
      expect(age).to.equal(human.age);
      expect(age).to.equal(28);
    });
    human.once('gender', function(gender) {
      expect(gender).to.equal(human.gender);
      expect(gender).to.equal('m');
    });
  
    human.set({
      name: 'mike',
      age: 28,
      gender: 'm'
    });
  });
});