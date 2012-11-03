var uglifyParser = require('uglify-js').parser;
var uglifyMangler = require('uglify-js').uglify;
var gzip = require('zlib').gzip;

module.exports = function(grunt) {
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'test/**/*.js']
    },
    jshint: {
      options: {
        browser: true
      }
    },
    mocha: {
      all: ['test/**/*.html']
    }
  });

  grunt.task.registerTask('bytes', 'Count bits.', function() {
    var source = grunt.file.read('primality.js');
    var minified;
    try {
      minified = uglifyMangler.gen_code(
                 uglifyMangler.ast_squeeze(
                 uglifyMangler.ast_mangle(
                 uglifyParser.parse(source))));
    } catch (ex) {
      grunt.log.error('Uglify error: ' + (ex && ex.message ? ex.message : ex));
    }
    gzip(minified, function(err, data) {
      if (err) {
        return grunt.log.error('Gzip error: ' + (err && err.message ? err.message : err));
      }
      grunt.log.writeln('Full: ' + source.length);
      grunt.log.writeln('Minified: ' + minified.length);
      grunt.log.writeln('Gzipped: ' + data.length);
    });
  });

  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', 'mocha');
};