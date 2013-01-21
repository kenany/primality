requirejs.config({
  baseUrl: '../vendor/requirejs',
  paths: {
    'jquery': '../jquery/jquery.min',
    'foundationMagellan': '../../js/plugins'
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