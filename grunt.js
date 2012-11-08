module.exports = function(grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: "/*!\n * <%= pkg.name %> v<%= pkg.version %>\n * (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %>\n */"
    },
    lint: {
      all: ['grunt.js', 'primality.js']
    },
    jshint: {
      options: {
        browser: true
      }
    },
    min: {
      dist: {
        src: ['<banner>', 'primality.js'],
        dest: 'primality.min.js'
      }
    },
    uglify: {
      mangle: {except: 'define'},
      codegen: {ascii_only: true}
    },
    mocha: {
      all: ['test/**/*.html']
    }
  });

  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', 'mocha');
};