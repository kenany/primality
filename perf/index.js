/* https://github.com/KenanY/primality/wiki/Performance */

var Benchmark = require('benchmark'),
    primality = require('../primality.js'),
    suite     = new Benchmark.Suite;

/* This first test is always the fastest because less obstacles are in the way */
suite.add('primality(integer)', function() {
  primality(2);
  primality(17);
  primality(839);
  primality(3733);
  primality(999983);
})

/* Here, the strings have to be coerced */
suite.add('primality(string)', function() {
  primality('2');
  primality('17');
  primality('839');
  primality('3733');
  primality('999983');
})

/* Should theoretically be as fast as the first test */
suite.add('primality(integerArray)', function() {
  primality([2, 17, 839, 3733, 999983]);
})

/* Hopefully as fast as the second test */
suite.add('primality(stringArray)', function() {
  primality(['2', '17', '839', '3733', '999983']);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('\nFastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });