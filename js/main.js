requirejs.config({
  baseUrl: '../vendor/requirejs',
  paths: {
    'jquery': [
      'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min',
      'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js',
      '../primality/jquery/jquery.min'
    ],
    'foundationMagellan': '../../primality/js/plugins',
    'rainbow': 'primality/vendor/rainbow/rainbow-custom.min'
  },
  shim: {
    'foundationMagellan': {
      deps: ['jquery'],
      exports: 'jQuery.fn.foundationMagellan'
    },
    'rainbow': {
      exports: 'Rainbow'
    }
  }
});
require(['foundationMagellan', 'rainbow'], function(Rainbow) {
  $(document).ready(function() {
      $(document).foundationMagellan({threshold: 75});
      Rainbow.color();
  });
});