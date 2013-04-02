# Primality

<!-- div -->


<!-- div -->

## <a id="Methods"></a>`Methods`
* [`primality`](#primalityinput)
* [`primality.areCousinPrimes`](#primalityarecousinprimesa-b)
* [`primality.areSexyPrimes`](#primalityaresexyprimesa-b)
* [`primality.areTwinPrimes`](#primalityaretwinprimesa-b)

<!-- /div -->


<!-- div -->

## `Properties`
* [`primality.VERSION`](#primalityversion)

<!-- /div -->


<!-- /div -->


<!-- div -->


<!-- div -->

## `Methods`

<!-- div -->

### <a id="primalityinput"></a>`primality(input)`
<a href="#primalityinput">#</a> [&#x24C8;](https://github.com/KenanY/primality/blob/master/primality.js#L135 "View in source") [&#x24C9;][1]

Creates a new primality instance.

#### Arguments
1. `input` *(Mixed)*: A number, string, or array to check the primality of.

#### Returns
*(Boolean)*: Returns `true` if `input` is prime.

#### Example
```js
primality(7);
// => true

primality('13');
// => true

primality([17, 19, 23]);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="primalityarecousinprimesa-b"></a>`primality.areCousinPrimes(a, b)`
<a href="#primalityarecousinprimesa-b">#</a> [&#x24C8;](https://github.com/KenanY/primality/blob/master/primality.js#L182 "View in source") [&#x24C9;][1]

Checks if `a` and `b` are cousin primes

<https://en.wikipedia.org/wiki/Cousin_prime>

#### Arguments
1. `a` *(Number)*: First of the pair
2. `b` *(Number)*: Second of the pair

#### Returns
*(Boolean)*: Returns `true` if `a` and `b` are cousin primes

#### Example
```js
primality.areCousinPrimes(3, 7)
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="primalityaresexyprimesa-b"></a>`primality.areSexyPrimes(a, b)`
<a href="#primalityaresexyprimesa-b">#</a> [&#x24C8;](https://github.com/KenanY/primality/blob/master/primality.js#L203 "View in source") [&#x24C9;][1]

Checks if `a` and `b` are sexy primes

<https://en.wikipedia.org/wiki/Sexy_prime>

#### Arguments
1. `a` *(Number)*: First of the pair
2. `b` *(Number)*: Second of the pair

#### Returns
*(Boolean)*: Returns `true` if `a` and `b` are sexy primes

#### Example
```js
primality.areSexyPrimes(5, 11)
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="primalityaretwinprimesa-b"></a>`primality.areTwinPrimes(a, b)`
<a href="#primalityaretwinprimesa-b">#</a> [&#x24C8;](https://github.com/KenanY/primality/blob/master/primality.js#L161 "View in source") [&#x24C9;][1]

Checks if `a` and `b` are twin primes

<https://en.wikipedia.org/wiki/Twin_prime>

#### Arguments
1. `a` *(Number)*: First of the pair
2. `b` *(Number)*: Second of the pair

#### Returns
*(Boolean)*: Returns `true` if `a` and `b` are twin primes

#### Example
```js
primality.areTwinPrimes(3, 5)
// => true
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Properties`

<!-- div -->

### <a id="primalityversion"></a>`primality.VERSION`
<a href="#primalityversion">#</a> [&#x24C8;](https://github.com/KenanY/primality/blob/master/primality.js#L216 "View in source") [&#x24C9;][1]

*(String)*: The semantic version number.

* * *

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #Methods "Jump back to the TOC."