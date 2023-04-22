# primality.js

Primality is a JavaScript library for prime numbers. It features a fantastic
[primality test](https://en.wikipedia.org/wiki/Primality_test) and
identification of the various
[classes](https://en.wikipedia.org/wiki/Template:Prime_number_classes) of prime
numbers.

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
  - ESM support

## Installation

``` bash
$ npm install primality
```

## Usage

Primality's flagship method is `primality()`, which works as you might expect it
to:

``` javascript
import primality from 'primality';

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
import { areCousinPrimes, areSexyPrimes, areTwinPrimes } from 'primality';

areCousinPrimes(3, 7);
// => true

areSexyPrimes(5, 11);
// => true

areTwinPrimes(3, 5);
// => true
```

You can also check for Wilson primes. Only three Wilson primes are known at the
moment: 5, 13, and 563.

``` javascript
import { isWilsonPrime } from 'primality';

isWilsonPrime(563);
// => true
```
