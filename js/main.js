requirejs.config({
  baseUrl: '../vendor/requirejs',
  paths: {
    'jquery': '../jquery/jquery.min',
    'jquery.foundationMagellan': '../../js/plugins'
  },
  shim: {
    'jquery.foundationMagellan': {
      deps: ['jquery'],
      exports: 'jQuery.fn.foundationMagellan'
    }
  }
});
require(['jquery.foundationMagellan'], function() {
  $(document).foundationMagellan({threshold: 75});
});