module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      build: {
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        },
        command: 'component build -o dist -n primality -s primality'
      }
    },
    uglify: {
      options: {
        banner: '/*!\n' +
                ' * <%= pkg.name %> v<%= pkg.version %>\n' +
                ' * (c) 2012–<%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %>\n' +
                ' *\n' +
                ' * Includes functions from Lo-Dash\n' +
                ' * (c) 2012–2013 The Dojo Foundation\n' +
                ' *\n' +
                ' * Available under MIT license\n' +
                ' */',
        report: 'gzip',
        compress: {
          'comparisons': false,
          'unsafe': true,
          'unsafe_comps': true,
          'warnings': false
        },
        mangle: {
          except: ['define']
        },
        'ascii_only': true,
        'comments': /@cc_on|@license|@preserve/i,
        'max_line_len': 500,
      },
      dist: {
        files: {
          'dist/primality.min.js': ['dist/primality.js']
        }
      }
    },
    mocha: {
      all: ['test/**/*.html']
    }
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
  grunt.registerTask('default', ['shell:build', 'test', 'uglify', 'doc']);
};