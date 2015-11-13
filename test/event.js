describe('Event', function() {
  
  it('Can bind to a single event', function() {
      var evt = new Event();
      evt.on('foo', function() {});
      should.exist(evt._events['foo']);
      expect(evt._events['foo'].length).to.equal(1);
  });

  it('Can unbind all events', function() {
    var evt = new Event();
    evt.on('foo', function() {});
    should.exist(evt._events['foo']);
    evt.off('foo');
    should.not.exist(evt._events['foo']);
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
    evt.trigger('foo', 'baz');
  });
});
