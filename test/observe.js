var traceur = require('traceur');

traceur.require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our app
  return filename.indexOf('node_modules') === -1;
});


var o = require('../lib/observe.js').Observe;



describe('Observe', function() {
  it('is very cool', function() {
    var m = new o({a:1});
    console.log(m);
  });
});
