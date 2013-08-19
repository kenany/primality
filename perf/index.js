/* https://github.com/KenanY/primality/wiki/Performance */

var Benchmark = require('benchmark');
var primality = require('../primality.js');
var numbers = require('numbers');

var suite = new Benchmark.Suite;

suite
  .add('primality', function() {
    primality(2);
    primality(17);
    primality(839);
    primality(3733);
    primality(999983);
  })
  .add('numbers#simple', function() {
    numbers.prime.simple(2);
    numbers.prime.simple(17);
    numbers.prime.simple(839);
    numbers.prime.simple(3733);
    numbers.prime.simple(999983);
  })
  .add('numbers#millerRabin', function() {
    numbers.prime.millerRabin(2);
    numbers.prime.millerRabin(17);
    numbers.prime.millerRabin(839);
    numbers.prime.millerRabin(3733);
    numbers.prime.millerRabin(999983);
  })

  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('\nFastest is ' + this.filter('fastest').pluck('name'));
  })
  .run({'async': true});