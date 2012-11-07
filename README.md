# primality.js
[![build status](https://secure.travis-ci.org/KenanY/primality.png)](http://travis-ci.org/KenanY/primality)

Primality is a JavaScript library for prime numbers.

## Download

 * [Development build](https://raw.github.com/KenanY/primality/1.0.0/primality.js)
 * [Production build](https://raw.github.com/KenanY/primality/1.0.0/primality.min.js)

## Features

  - Check primality of a number
  - About 500 bytes minified and gzipped
  - AMD loader support
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