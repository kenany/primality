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
      all: ['test/**/*.html']
    }
  });

  grunt.registerTask('comp', 'Component compile', function() {
    var done = this.async();
    var path = require('path');
    var Builder = require('component-builder');
    var fs = require('graceful-fs');
    var mkdir = require('mkdirp');
    var builder = new Builder(process.cwd());
    var jsPath = path.join('dist', grunt.template.process('<%= pkg.name %>.js'));

    mkdir.sync('dist');
    builder.copyAssetsTo('dist');

    builder.build(function(err, obj){
      if (err) grunt.fail.fatal(err.message);

      var js = '';
      js += ';(function(window) {\n';
      js += obj.require;
      js += obj.js;

      var umd = [
        'var freeExports = typeof exports == "object" && exports;',
        'var freeModule = typeof module == "object" && module && module.exports == freeExports && module;',
        'if (typeof define == "function" && typeof define.amd == "object" && define.amd) {',
        '  window.<%= pkg.name %> = require("<%= pkg.name %>");',
        '  define(function() {',
        '    return require("<%= pkg.name %>");',
        '  });',
        '}',
        'else if (freeExports && !freeExports.nodeType) {',
        '  if (freeModule) {',
        '    (freeModule.exports = require("<%= pkg.name %>")).<%= pkg.name %> = require("<%= pkg.name %>");',
        '  }',
        '  else {',
        '    freeExports.<%= pkg.name %> = require("<%= pkg.name %>");',
        '  }',
        '}',
        'else {',
        '  window.<%= pkg.name %> = require("<%= pkg.name %>");',
        '}'
      ];

      js += grunt.template.process(umd.join('\n'));
      js += '}(this));';

      fs.writeFile(jsPath, js);
      done();
    });
  });

  grunt.registerTask('doc', 'Generate docs', function() {
    var done = this.async();
    grunt.util.spawn({
      cmd: 'php',
      args: ['doc/parse.php', 'doc/README']
    }, done);
  });

  grunt.registerTask('testling', 'Generate testling tests', function() {
    var done = this.async();
    var rjs = require('requirejs');

    var generateSpec = function() {
      rjs.optimize({
        logLevel: 3,
        baseUrl: '.',
        optimize: 'none',
        name: 'spec/suite',
        paths: {
          'primality': 'empty:',
          'spec': 'test/spec'
        },
        out: 'test/testling/specs.js'
      }, done);
    }

    grunt.log.writeln('Building testling tests...');
    rjs.optimize({
      logLevel: 3,
      baseUrl: '.',
      optimize: 'none',
      name: 'primality/primality.min',
      paths: {
        'primality': 'dist'
      },
      out : 'test/testling/src.js'
    }, generateSpec);
  });

  grunt.registerTask('upgrade', 'Update version strings', function(newVersion) {
    var done = this.async();
    if (arguments.length === 0) {
      grunt.log.writeln(this.name + ", no args");
      done(false);
    } else {
      var fs = require('graceful-fs');

      // `grunt.util.async` does not work
      var async = require('async');

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
  grunt.registerTask('build', ['comp', 'uglify:regular', 'uglify:min', 'doc']);
  grunt.registerTask('default', ['build', 'test']);
};