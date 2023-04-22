import test from 'tape';

import primality, {
  areCousinPrimes,
  areSexyPrimes,
  areTwinPrimes,
  isWilsonPrime,
  isWieferichPrime
} from '../primality.js';

test('exports a function', (t) => {
  t.plan(1);
  t.equal(typeof primality, 'function');
});

test('returns true when value is prime', (t) => {
  t.plan(2);
  t.ok(primality(7), '7');
  t.ok(primality(new Number(11)), '11');
});

test('returns false when value is not prime', (t) => {
  t.plan(2);
  t.notOk(primality(6));
  t.notOk(primality(new Number(8)));
});

test('returns false for 1', (t) => {
  t.plan(2);
  t.notOk(primality(1));
  t.notOk(primality(new Number(1)));
});

test('converts strings into numbers', (t) => {
  t.plan(2);
  t.ok(primality('13'), '13');
  t.notOk(primality(new String('24')), '24');
});

test('returns true if an array of prime numbers is passed', (t) => {
  t.plan(2);
  t.ok(primality([17, 19, 23]));
  t.notOk(primality(new Array(29, 30, 31)));
});

test('twin primes', (t) => {
  t.plan(3);
  t.ok(areTwinPrimes(3, 5));
  t.notOk(areTwinPrimes(5, 6));
  t.notOk(areTwinPrimes(12, 14));
});

test('cousin primes', (t) => {
  t.plan(3);
  t.ok(areCousinPrimes(3, 7));
  t.notOk(areCousinPrimes(11, 16));
  t.notOk(areCousinPrimes(18, 24));
});

test('sexy primes', (t) => {
  t.plan(3);
  t.ok(areSexyPrimes(5, 11));
  t.notOk(areSexyPrimes(11, 16));
  t.notOk(areSexyPrimes(18, 24));
});

test('wilson prime', (t) => {
  t.plan(4);
  t.ok(isWilsonPrime(5));
  t.ok(isWilsonPrime(13));
  t.ok(isWilsonPrime(563));
  t.notOk(isWilsonPrime(1000));
});

test('wieferich prime', (t) => {
  t.plan(3);
  t.ok(isWieferichPrime(1093));
  t.ok(isWieferichPrime(3511));
  t.notOk(isWieferichPrime(2511));
});
