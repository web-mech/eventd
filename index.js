var traceur = require('traceur');

traceur.require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our app
  return filename.indexOf('node_modules') === -1;
});

module.exports = {
  Event: require('./lib/event.js'),
  Observe: require('./lib/observe.js')
};