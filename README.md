#EVENTD
[![Build Status](https://travis-ci.org/web-mech/eventd.png?branch=master)](https://travis-ci.org/web-mech/eventd)
##Usage

###Event

####Node
```
var Event = require('eventd').Event;
```

####Browser
```
//amd
//eventd.amd.js
require(['event'], function(Event) {
  ...
});

//or just use globally by using eventd.inline.js
```

####Usage
```
var evt = new Event();

evt.on('change', function() {
  console.log('foo');
});

evt.trigger('change', ...data);
```

#####Methods
 - on - bind to an event
 - off - unbind to an event
 - once - bind to an event and unbind once fired
 - trigger - call all delegates bound to an event



###Observe

####Node
```
var Observe = require('eventd').Observe;
```

####Browser
```
//amd
//eventd.amd.js
require(['observe'], function(observe) {
  ...
});

//or just use globally by using eventd.inline.js
```


####Usage
```
var obj = new Observe({foo: 'bar'});

obj.on('foo', function(foo) {
  console.log(foo); //baz
});

obj.foo = 'baz';
```

####Methods (inherits Events)
 - on ...
 - off ...
 - trigger ...
 - set - set a new observable attribute to ( delegates can be assigned before the property exists)
 - unset - unbind delegates and remove the attribute from the object




 ###Testing
 Test set up using mocha/chai
 ```
 mocha -r spec
 ```
 or 
 ```
 npm test
 ```