# primality.js

Primality is a JavaScript library for prime numbers.

## Features

  - Check primality of a number
  - Less than 500 bytes minified
  - AMD support
  - Support for almost every browser and JavaScript runtime.

## Installation and usage

In browsers:

``` html
<script src="primality.js"></script>
```

Using npm:

```
npm install primality
```

In Node.js and RingoJS v0.8.0+:

``` javascript
var primality = require('primality');
```

In RingoJS v0.7.0-:

``` javascript
var primality = require('primality').primality;
```

In Rhino:

``` javascript
load('primality.js');
```

In an AMD loader like RequireJS:

``` javascript
require({
  'paths': {
    'primality': 'path/to/primality'
  }
},
['primality'], function(primality) {
  console.log(primality.version);
});
```