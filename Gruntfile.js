var path = require('path');
var async = require('async');
var Builder = require('component-builder');
var fs = require('graceful-fs');
var mkdir = require('mkdirp');

module.exports = function(grunt) {
  var fileBanner = [
    '/*!',
    ' * <%= pkg.name %> v<%= pkg.version %>',
    ' * (c) 2012–<%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %>',
    ' *',
    ' * Includes functions from Lo-Dash',
    ' * (c) 2012–2013 The Dojo Foundation',
    ' *',
    ' * Available under MIT license',
    ' */\n'
  ].join('\n');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      regular: {
        options: {
          banner: fileBanner,
          beautify: {
            'beautify': true,
            'indent_level': 2,
            'width': 80
          },
          mangle: false,
          compress: false
        },
        files: {
          'dist/primality.js': ['dist/primality.js']
        }
      },
      min: {
        options: {
          banner: fileBanner,
          report: 'gzip',
          beautify: {
            'ascii_only': true,
            'max_line_len': 500,
            'comments': /@cc_on|@license|@preserve/i
          },
          compress: {
            'comparisons': false,
            'unsafe': true,
            'unsafe_comps': true,
            'warnings': false
          },
          mangle: {
            except: ['define']
          }
        },
        files: {
          'dist/primality.min.js': ['dist/primality.js']
        }
      }
    },
    mocha: {
      all: ['test/index.html']
    }
  });

  grunt.registerTask('comp', 'Component compile', function() {
    var done = this.async();

    async.waterfall([
      function(callback){
        mkdir('dist', callback)
      },
      function(made, callback){
        var builder = new Builder(process.cwd());
        builder.copyAssetsTo('dist');
        builder.build(callback);
      },
      function(obj, callback){
        async.parallel([
            function(callback){
                fs.readFile('./build/umd-prelude.js', 'utf8', callback);
            },
            function(callback){
                fs.readFile('./build/umd-postlude.js', 'utf8', callback);
            }
        ],
        function(error, results){
            if (error) grunt.log.error(error.message);
            var js = '';
            js += results[0];
            js += obj.require;
            js += obj.js;
            js += results[1];

            var jsPath = path.join('dist', grunt.template.process('primality.js'));
            fs.writeFile(jsPath, js, done);
        });
      }
    ],
    function(error) {
      if (error) grunt.log.error(error.message);
    });
  });

  grunt.registerTask('doc', 'Generate docs', function() {
    var done = this.async();

    grunt.util.spawn({
      cmd: 'php',
      args: ['doc/parse.php', 'doc/README']
    }, done);
  });

  grunt.registerTask('upgrade', 'Update version strings', function(newVersion) {
    var done = this.async();

    if (arguments.length === 0) {
      grunt.log.writeln(this.name + ", no args");
      done(false);
    } else {
      var files = [
        './README.md',
        './package.json',
        './component.json',
        './bower.json',
        './primality.js'
      ]
      var regexp = RegExp(grunt.config.data.pkg.version, 'g');

      function upgradeVersion(item, cb) {
        async.waterfall([
          function(callback) {
            fs.readFile(item, 'utf8', callback);
          },
          function(data, callback) {
            fs.writeFile(item, data.replace(regexp, newVersion), callback);
          }
        ], cb);
      }

      async.each(files, upgradeVersion, function(err) {
        var pkg = grunt.file.readJSON('package.json');
        grunt.config.data.pkg = pkg;
        done();
      });
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('build', ['comp', 'uglify:regular', 'uglify:min']);
  grunt.registerTask('default', ['build', 'test']);
};