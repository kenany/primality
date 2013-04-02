module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['grunt.js', 'primality.js'],
      options: grunt.file.readJSON('.jshintrc')
    },
    uglify: {
      options: {
        banner: '/*!\n' +
                ' * <%= pkg.name %> v<%= pkg.version %>\n' +
                ' * (c) 2012–<%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %>\n' +
                ' *\n' +
                ' * Includes functions from Lo-Dash\n' +
                ' * (c) 2012 John-David Dalton\n' +
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
          'primality.min.js': ['primality.js']
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('default', ['test', 'uglify', 'doc']);
};