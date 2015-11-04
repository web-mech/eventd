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
//eventd.js
require(['eventd'], function(Eventd) {
  var evt = new Eventd.Event();
  //do event stuff...
});

//or just use globally by using eventd.js
```

####Usage

Add a specific event and trigger it.
```
var evt = new Eventd.Event();

evt.on('change', function() {
  console.log('foo');
});

evt.trigger('change', ...data);
```

Remove ALL handlers listening to a specific event from stack.
```
evt.off('change');
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
//eventd.js
require(['eventd'], function(Eventd) {
  var obj = new Eventd.Observe();
  //do observe stuff...
});

//or just use globally by using eventd.js
```


####Usage
Set a property
```
var obj = new Observe({foo: 'bar'});

obj.once('foo', function(foo) {
  console.log(foo); //baz
});

obj.foo = 'baz';
```

Set multiple properties at once
```
obj.on('foo', function(foo) {
  console.log(foo); //foo
});

obj.on('bar', function(bar) {
  console.log(bar); //bar
});

obj.on('baz', function(baz) {
  console.log(baz); //baz
});

obj.set({
  foo: 'foo',
  bar: 'bar',
  baz: 'baz'
});
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
