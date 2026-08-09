import factorial from 'factorial';
import lodashIsFinite from 'lodash.isfinite';

const WILSON_PRIMES = [5, 13, 563];
const WIEFERICH_PRIMES = [1093, 3511];

/** A single value, or an array of values, to test for primality. */
export type PrimalityInput =
  | number
  | string
  | readonly (number | string)[]
  | null;

/**
 * Finds the smallest factor of `n`.
 *
 * @param n The value to check.
 * @returns The smallest prime that divides `n`; `NaN` if `n` is `NaN` or
 *   `Infinity`; `0` if `n` is `0`; `1` if `n` is `1`, `-1`, or not an integer.
 */
function leastFactor(n: number): number {
  if (n === 0) {
    return 0;
  }
  if (n % 1 || n * n < 2) {
    return 1;
  }
  if (n % 2 === 0) {
    return 2;
  }
  if (n % 3 === 0) {
    return 3;
  }
  if (n % 5 === 0) {
    return 5;
  }

  const m = Math.sqrt(n);
  for (let i = 7; i <= m; i += 30) {
    if (n % i === 0) {
      return i;
    }
    if (n % (i + 4) === 0) {
      return i + 4;
    }
    if (n % (i + 6) === 0) {
      return i + 6;
    }
    if (n % (i + 10) === 0) {
      return i + 10;
    }
    if (n % (i + 12) === 0) {
      return i + 12;
    }
    if (n % (i + 16) === 0) {
      return i + 16;
    }
    if (n % (i + 22) === 0) {
      return i + 22;
    }
    if (n % (i + 24) === 0) {
      return i + 24;
    }
  }
  return n;
}

/**
 * Checks if `value` is prime.
 *
 * @param value The value to check.
 * @returns `true` if `value` is prime.
 */
function isPrime(value: number): boolean {
  if (Number.isNaN(value) || !lodashIsFinite(value) || value % 1 || value < 2) {
    return false;
  }
  return value === leastFactor(value);
}

/**
 * Tests the primality of a number, a numeric string, or an array of numbers
 * and numeric strings.
 *
 * @param input The value to test. Strings are coerced to numbers. When an
 *   array is given, every element must be prime for the result to be `true`.
 * @returns `true` if `input` is prime, `false` if it is not, or `null` when
 *   `input` is `null` or an empty string.
 *
 * @example
 * ```ts
 * primality(7);
 * // => true
 *
 * primality('13');
 * // => true
 *
 * primality([17, 19, 23]);
 * // => true
 * ```
 */
export function primality(input: PrimalityInput): boolean | null {
  if (input === null || input === '') {
    return null;
  }
  if (Array.isArray(input)) {
    for (const item of input) {
      if (!isPrime(Number(item))) {
        return false;
      }
    }
    return true;
  }
  return isPrime(Number(input));
}

/**
 * Checks if `a` and `b` are primes which differ by `difference`.
 *
 * @param a First of the pair.
 * @param b Second of the pair.
 * @param difference The required gap between `a` and `b`.
 * @returns `true` if both are prime and differ by exactly `difference`.
 */
function isRelated(a: number, b: number, difference: number): boolean {
  return Math.abs(a - b) === difference && primality([a, b]) === true;
}

/**
 * Checks if `a` and `b` are twin primes: primes that differ by two.
 *
 * @see {@link https://en.wikipedia.org/wiki/Twin_prime}
 *
 * @param a First of the pair.
 * @param b Second of the pair.
 * @returns `true` if `a` and `b` are twin primes.
 *
 * @example
 * ```ts
 * areTwinPrimes(3, 5);
 * // => true
 * ```
 */
export function areTwinPrimes(a: number, b: number): boolean {
  return isRelated(a, b, 2);
}

/**
 * Checks if `a` and `b` are cousin primes: primes that differ by four.
 *
 * @see {@link https://en.wikipedia.org/wiki/Cousin_prime}
 *
 * @param a First of the pair.
 * @param b Second of the pair.
 * @returns `true` if `a` and `b` are cousin primes.
 *
 * @example
 * ```ts
 * areCousinPrimes(3, 7);
 * // => true
 * ```
 */
export function areCousinPrimes(a: number, b: number): boolean {
  return isRelated(a, b, 4);
}

/**
 * Checks if `a` and `b` are sexy primes: primes that differ by six.
 *
 * @see {@link https://en.wikipedia.org/wiki/Sexy_prime}
 *
 * @param a First of the pair.
 * @param b Second of the pair.
 * @returns `true` if `a` and `b` are sexy primes.
 *
 * @example
 * ```ts
 * areSexyPrimes(5, 11);
 * // => true
 * ```
 */
export function areSexyPrimes(a: number, b: number): boolean {
  return isRelated(a, b, 6);
}

/**
 * Checks if `value` is a Wilson prime.
 *
 * @see {@link https://en.wikipedia.org/wiki/Wilson_prime}
 *
 * @param value The value to check.
 * @returns `true` if `value` is a Wilson prime.
 *
 * @example
 * ```ts
 * isWilsonPrime(5);
 * // => true
 * ```
 */
export function isWilsonPrime(value: number): boolean {
  return (
    WILSON_PRIMES.includes(value) ||
    (factorial(value - 1, { useBigInt: true }) + 1n) % BigInt(value ** 2) === 0n
  );
}

/**
 * Checks if `value` is a Wieferich prime.
 *
 * @see {@link https://en.wikipedia.org/wiki/Wieferich_prime}
 *
 * @param value The value to check.
 * @returns `true` if `value` is a Wieferich prime.
 *
 * @example
 * ```ts
 * isWieferichPrime(1093);
 * // => true
 * ```
 */
export function isWieferichPrime(value: number): boolean {
  return (
    WIEFERICH_PRIMES.includes(value) ||
    (2 ** (value - 1) - 1) % value ** 2 === 0
  );
}
