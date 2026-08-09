import {
  areCousinPrimes,
  areSexyPrimes,
  areTwinPrimes,
  isWieferichPrime,
  isWilsonPrime,
  primality,
} from 'primality';
import { describe, expect, it } from 'vitest';

describe('primality', () => {
  it('exports a function', () => {
    expect(typeof primality).toBe('function');
  });

  it('returns true when value is prime', () => {
    expect(primality(7)).toBe(true);
    expect(primality(11)).toBe(true);
  });

  it('returns false when value is not prime', () => {
    expect(primality(6)).toBe(false);
    expect(primality(8)).toBe(false);
  });

  it('returns false for values below 2', () => {
    expect(primality(1)).toBe(false);
    expect(primality(0)).toBe(false);
  });

  it('coerces strings into numbers', () => {
    expect(primality('13')).toBe(true);
    expect(primality('24')).toBe(false);
  });

  it('returns true only when every array element is prime', () => {
    expect(primality([17, 19, 23])).toBe(true);
    expect(primality([29, 30, 31])).toBe(false);
  });

  it('returns null for null or empty string', () => {
    expect(primality(null)).toBe(null);
    expect(primality('')).toBe(null);
  });
});

describe('areTwinPrimes', () => {
  it('detects twin primes', () => {
    expect(areTwinPrimes(3, 5)).toBe(true);
    expect(areTwinPrimes(5, 6)).toBe(false);
    expect(areTwinPrimes(12, 14)).toBe(false);
  });
});

describe('areCousinPrimes', () => {
  it('detects cousin primes', () => {
    expect(areCousinPrimes(3, 7)).toBe(true);
    expect(areCousinPrimes(11, 16)).toBe(false);
    expect(areCousinPrimes(18, 24)).toBe(false);
  });
});

describe('areSexyPrimes', () => {
  it('detects sexy primes', () => {
    expect(areSexyPrimes(5, 11)).toBe(true);
    expect(areSexyPrimes(11, 16)).toBe(false);
    expect(areSexyPrimes(18, 24)).toBe(false);
  });
});

describe('isWilsonPrime', () => {
  it('detects Wilson primes', () => {
    expect(isWilsonPrime(5)).toBe(true);
    expect(isWilsonPrime(13)).toBe(true);
    expect(isWilsonPrime(563)).toBe(true);
    expect(isWilsonPrime(1000)).toBe(false);
  });
});

describe('isWieferichPrime', () => {
  it('detects Wieferich primes', () => {
    expect(isWieferichPrime(1093)).toBe(true);
    expect(isWieferichPrime(3511)).toBe(true);
    expect(isWieferichPrime(2511)).toBe(false);
  });
});
