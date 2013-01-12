var Benchmark = require('benchmark'),
    primality = require('../primality.js'),
    suite     = new Benchmark.Suite;

// add tests
suite.add('primality(integer)', function() {
  primality(2);
  primality(17);
  primality(839);
  primality(3733);
  primality(999983);
})
suite.add('primality(string)', function() {
  primality('2');
  primality('17');
  primality('839');
  primality('3733');
  primality('999983');
})
suite.add('primality(integerArray)', function() {
  primality([2, 17, 839, 3733, 999983]);
})
suite.add('primality(stringArray)', function() {
  primality(['2', '17', '839', '3733', '999983']);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });