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

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('default', ['shell:build', 'test', 'uglify', 'doc']);
};