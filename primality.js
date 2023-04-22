import factorial from 'factorial';
import isFinite from 'lodash.isfinite';

const WILSON_PRIMES = [5, 13, 563];
const WIEFERICH_PRIMES = [1093, 3511];

/**
 * Finds the smallest factor of `n`
 *
 * @private
 * @param {number} n The value to check
 * @returns {number}
 *   The smallest prime that divides n
 *   NaN if n is NaN or Infinity
 *   0 if n is 0
 *   1 if n = 1, n = -1, or n is not an integer
 */
function leastFactor(n) {
  if (n === 0) return 0;
  else if (n % 1 || n * n < 2) return 1;
  else if (n % 2 === 0) return 2;
  else if (n % 3 === 0) return 3;
  else if (n % 5 === 0) return 5;

  const m = Math.sqrt(n);
  for (let i = 7; i <= m; i += 30) {
    if (n % i === 0) return i;
    else if (n % (i + 4) === 0) return i + 4;
    else if (n % (i + 6) === 0) return i + 6;
    else if (n % (i + 10) === 0) return i + 10;
    else if (n % (i + 12) === 0) return i + 12;
    else if (n % (i + 16) === 0) return i + 16;
    else if (n % (i + 22) === 0) return i + 22;
    else if (n % (i + 24) === 0) return i + 24;
  }
  return n;
}

/**
 * Checks if `value` is prime.
 *
 * @private
 * @param {number | string} value The value to check
 * @returns {boolean} Returns `true` if `value` is prime
 */
function isPrime(value) {
  if (Number.isNaN(value) || !isFinite(value) || value % 1 || value < 2) {
    return false;
  }
  if (value !== leastFactor(value)) return false;
  return true;
}

/**
 * Primality test.
 *
 * @param {number | string | readonly (number | string)[]} input A number,
 *  string, or array to check the primality of.
 * @returns {Boolean} Returns `true` if `input` is prime.
 * @example
 *
 * primality(7);
 * // => true
 *
 * primality('13');
 * // => true
 *
 * primality([17, 19, 23]);
 * // => true
 */
export default function primality(input) {
  if (input === null || input === '') return null;
  else if (Array.isArray(input)) {
    let i = input.length;
    while (i--) {
      if (!isPrime(input[i])) return false;
    }
    return true;
  }
  else return isPrime(input);
}

/**
 * Checks if `a` and `b` are primes which differ by `difference`.
 *
 * @private
 * @param {Number} a First of the pair
 * @param {Number} b Second of the pair
 * @param {Number} difference
 * @returns {Boolean}
 */
function isRelated(a, b, difference) {
  return Math.abs(a - b) !== difference
    ? false
    : primality([a, b]);
}
/**
 * Checks if `a` and `b` are twin primes
 *
 * <https://en.wikipedia.org/wiki/Twin_prime>
 *
 * @param {Number} a First of the pair
 * @param {Number} b Second of the pair
 * @returns {Boolean} Returns `true` if `a` and `b` are twin primes
 * @example
 *
 * primality.areTwinPrimes(3, 5)
 * // => true
 */
export function areTwinPrimes(a, b) {
  return isRelated(a, b, 2);
}

/**
 * Checks if `a` and `b` are cousin primes
 *
 * <https://en.wikipedia.org/wiki/Cousin_prime>
 *
 * @param {Number} a First of the pair
 * @param {Number} b Second of the pair
 * @returns {Boolean} Returns `true` if `a` and `b` are cousin primes
 * @example
 *
 * primality.areCousinPrimes(3, 7)
 * // => true
 */
export function areCousinPrimes(a, b) {
  return isRelated(a, b, 4);
}

/**
 * Checks if `a` and `b` are sexy primes
 *
 * <https://en.wikipedia.org/wiki/Sexy_prime>
 *
 * @param {Number} a First of the pair
 * @param {Number} b Second of the pair
 * @returns {Boolean} Returns `true` if `a` and `b` are sexy primes
 * @example
 *
 * primality.areSexyPrimes(5, 11)
 * // => true
 */
export function areSexyPrimes(a, b) {
  return isRelated(a, b, 6);
}

/**
 * Checks if `value` is a Wilson prime.
 *
 * <https://en.wikipedia.org/wiki/Wilson_prime>
 *
 * @param {Number} value
 * @returns {Boolean} Returns `true` if `value` is a Wilson prime.
 * @example
 *
 * primality.isWilsonPrime(5);
 * // => true
 */
export function isWilsonPrime(value) {
  return WILSON_PRIMES.includes(value)
    || (factorial(value - 1, { useBigInt: true }) + 1n)
      % BigInt(Math.pow(value, 2)) === 0;
}

/**
 * Checks if `value` is a Wieferich prime.
 *
 * <https://en.wikipedia.org/wiki/Wieferich_prime>
 *
 * @param {Number} value
 * @returns {Boolean} Returns `true` if `value` is a Wieferich prime.
 * @example
 *
 * primality.isWieferichPrime(1093);
 * // => true
 */
export function isWieferichPrime(value) {
  return WIEFERICH_PRIMES.includes(value)
    || (Math.pow(2, value - 1) - 1) % Math.pow(value, 2) === 0;
}
