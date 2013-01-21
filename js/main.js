requirejs.config({
  baseUrl: '../vendor/requirejs',
  paths: {
    'jquery': [
      'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min',
      'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js',
      '../primality/jquery/jquery.min'
    ],
    'foundationMagellan': '../../primality/js/plugins'
  },
  shim: {
    'foundationMagellan': {
      deps: ['jquery'],
      exports: 'jQuery.fn.foundationMagellan'
    }
  }
});
require(['foundationMagellan'], function() {
  $(document).foundationMagellan({threshold: 75});
});