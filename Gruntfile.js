module.exports = function(grunt) {
  var shellOptions = {
    stdout: true,
    stderr: true,
    failOnError: true
  };

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
    shell: {
      commit: {
        options: shellOptions,
        command: [
          'git checkout master',
          'git commit -am "Release <%= pkg.version %>"',
          'git tag -a <%= pkg.version %> -m "<%= pkg.version %>"',
          'npm publish'
        ].join(' && ')
      },
      push: {
        options: shellOptions,
        command: 'git push origin --tags && git push origin --all'
      }
    },
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
    var path = require('path');
    var Builder = require('component-builder');
    var fs = require('graceful-fs');
    var mkdir = require('mkdirp');
    var done = this.async();
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
    grunt.util.spawn({
      cmd: 'php',
      args: ['doc/parse.php', 'doc/README']
    });
  });

  grunt.registerTask('upgrade', 'Update version strings', function(newVersion) {
    if (arguments.length === 0) {
      grunt.log.writeln(this.name + ", no args");
    } else {
      var fs = require('graceful-fs');
      var files = [
        './README.md',
        './package.json',
        './component.json',
        './bower.json',
        './primality.js'
      ]
      var regexp = RegExp(grunt.config.data.pkg.version, 'g');

      grunt.util._.forEach(files, function(file, index) {
        var data = fs.readFileSync(file, 'utf8');
        fs.writeFileSync(file, data.replace(regexp, newVersion));
      });
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('build', ['comp', 'test', 'uglify:regular', 'uglify:min', 'doc']);
  grunt.registerTask('release', ['build', 'shell:commit', 'shell:push']);
  grunt.registerTask('default', ['build']);
};