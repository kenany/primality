/* https://github.com/KenanY/primality/wiki/Performance */

var Benchmark = require('benchmark'),
    primality = require('../primality.js'),
    numbers   = require('numbers'),
    suite     = new Benchmark.Suite;

suite
  .add('primality:integer', function() {
    primality(2);
    primality(17);
    primality(839);
    primality(3733);
    primality(999983);
  })
  .add('primality:integerArray', function() {
    primality([2, 17, 839, 3733, 999983]);
  })
  .add('primality:string', function() {
    primality('2');
    primality('17');
    primality('839');
    primality('3733');
    primality('999983');
  })
  .add('primality:stringArray', function() {
    primality(['2', '17', '839', '3733', '999983']);
  })

  .add('numbers:integer', function() {
    numbers.prime.simple(2);
    numbers.prime.simple(17);
    numbers.prime.simple(839);
    numbers.prime.simple(3733);
    numbers.prime.simple(999983);
  })
  .add('numbers:integerArray', function() {
    var refArray = [2, 17, 839, 3733, 999983];
    for (var i = 0, len = refArray.length; i < len; i++) {
      numbers.prime.simple(refArray[i]);
    }
  })
  .add('numbers:string', function() {
    numbers.prime.simple('2');
    numbers.prime.simple('17');
    numbers.prime.simple('839');
    numbers.prime.simple('3733');
    numbers.prime.simple('999983');
  })
  .add('numbers:stringArray', function() {
    var refArray = ['2', '17', '839', '3733', '999983'];
    for (var i = 0, len = refArray.length; i < len; i++) {
      numbers.prime.simple(refArray[i]);
    }
  })

  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('\nFastest is ' + this.filter('fastest').pluck('name'));
  })
  .run({'async': true});