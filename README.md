# primality.js
[![build status](https://secure.travis-ci.org/KenanY/primality.png)](http://travis-ci.org/KenanY/primality)

Primality is a JavaScript library for prime numbers.

## Download

 * [Development build](https://raw.github.com/KenanY/primality/1.1.0/primality.js)
 * [Production build](https://raw.github.com/KenanY/primality/1.1.0/primality.min.js)

## Features

  - Check primality of a number
  - Works with numbers disguised as strings
  - Also does arrays
  - Less than 700 bytes minified and gzipped
  - AMD loader support
  - Support for almost every browser and JavaScript runtime.

## Installation

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
  console.log(primality.VERSION);
});
```

## Usage

It can't get any easier:

``` javascript
primality(7);
// => true

primality(6);
// => false

primality(new Number(11));
// => true

/**
 * Strings can be prime, too!
 */
primality('13');
// => true

primality(new String('14'));
// => false

/**
 * Primality can even do arrays!
 *
 * If any of the values of an array are not prime, we return false.
 */
primality([17, 19, 23]);
// => true

primality([17, 20, 23]);
// => false
```

## Release Notes

### 1.1.0

  - Arrays can now be checked for primality
  - `primality.version` is now `primality.VERSION`
  - Don't check NaN and Finite status of `n` in `leastFactor`

The full changelog is available [here](https://github.com/KenanY/primality/wiki/Changelog).