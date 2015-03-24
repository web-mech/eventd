var traceur = require('traceur'),
  expect = require('chai').expect,
  should = require('chai').should();
  
traceur.require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our app
  return filename.indexOf('node_modules') === -1;
});


var Event = require('../lib/event.js').Event;

describe('Event', function() {
  
  it('Can bind to a single event', function() {
      var evt = new Event();
      evt.on('foo', function() {});
      should.exist(evt._events['foo']);
      expect(evt._events['foo'].length).to.equal(1);
  });

  it('Can trigger bound events', function(done) {
    var evt = new Event();
    evt.on('foo', function(bar) {
      expect(bar).to.equal('bar');
      done();
    });
    evt.trigger('foo', 'bar');
  });

  it('Can bind to an event once', function(done) {
    var evt = new Event();
    evt.once('foo', function(bar) {
      expect(bar).to.equal('bar');
      expect(evt._events['foo'].length).to.equal(0);
      done();
    });
    evt.trigger('foo', 'bar');
  });
});
