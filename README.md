# primality.js

[![Build Status](https://travis-ci.org/KenanY/primality.png)](https://travis-ci.org/KenanY/primality)
[![Dependency Status](https://gemnasium.com/KenanY/primality.png)](https://gemnasium.com/KenanY/primality)

Primality is a JavaScript library for prime numbers. It features a fantastic
[primality test](https://en.wikipedia.org/wiki/Primality_test) and
identification of the various
[classes](https://en.wikipedia.org/wiki/Template:Prime_number_classes) of prime
numbers.

## Download

  * [Development build](https://raw.github.com/KenanY/primality/1.6.0/dist/primality.js)
  * [Production build](https://raw.github.com/KenanY/primality/1.6.0/dist/primality.min.js)

## Features

  - Check the primality of a number
  - Works with numbers disguised as strings
  - Also does arrays
  - Provides checks for the following classes of prime numbers:
    - [twin](https://en.wikipedia.org/wiki/Twin_prime)
    - [cousin](https://en.wikipedia.org/wiki/Cousin_prime)
    - [sexy](https://en.wikipedia.org/wiki/Sexy_prime)
    - [Wilson](https://en.wikipedia.org/wiki/Wilson_prime)
  - About 1 kibibyte minified and gzipped
  - CommonJS and AMD loader support

## Support

Primality has been tested in:

  - Chrome 6–29
  - Firefox 15–20
  - Internet Explorer 10
  - Opera 11.6-12.15
  - Safari 5.0.5–5.1
  - Node.js 0.6.21–0.10.15

## Installation

In browsers:

- Standalone
``` html
<script src="primality.js"></script>
```

- Component
``` bash
$ component install KenanY/primality
```

- Bower
``` bash
$ bower install primality
```

Using npm:

``` bash
$ npm install primality
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

Primality's flagship method is `primality()`, which works as you might expect it
to:

``` javascript
primality(7);
// => true

primality(6);
// => false
```

Of course, you can pass strings instead of numbers if you'd like:

``` javascript
primality('13');
// => true
```

Primality can even do arrays. If any of the values in an array are not prime,
`false` is returned.

``` javascript
primality([17, 19, 23]);
// => true

primality([17, 20, 23]);
// => false
```

Beyond primality testing, Primality can also tell you if a pair of numbers are
twin, cousin, or sexy primes. Twin primes are prime numbers that differ from
each other by two. Similarly, cousin primes differ by four and sexy primes
differ by six.

``` javascript
primality.areTwinPrimes(3, 5);
// => true

primality.areCousinPrimes(3, 7);
// => true

primality.areSexyPrimes(5, 11);
// => true
```

You can also check for Wilson primes. Only three Wilson primes are known at the
moment: 5, 13, and 563.

``` javascript
primality.isWilsonPrime(563);
// => true
```

## Release Notes

### 1.6.0

  - [#11](https://github.com/KenanY/primality/issues/11): Added
  `isWieferichPrime` function.
  - [#13](https://github.com/KenanY/primality/issues/13): Fixed component
  install issue.
  - Slight performance boost by using a `while` loop instead of a `for` loop
  when iterating through arrays.
  - [#14](https://github.com/KenanY/primality/issues/14): lodash@2.0.0

The full changelog is available [here](https://github.com/KenanY/primality/wiki/Changelog).