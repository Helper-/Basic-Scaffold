'use strict';
var SERVER_PORT = 9000;

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Configurable paths for your app
  var basicConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    basic: basicConfig,

    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: ['dist/*']
    },
    copy: {
      html: {
        files: [{
          expand: true,
          cwd: '<%= basic.app %>',
          dest: 'dist',
          src: [
            '*.html'
          ]
        }]
      },
      projectfiles: {
        files: [{
          expand: true,
          cwd: '<%= basic.app %>',
          dest: 'dist',
          src: [
            'favicon.ico'
          ]
        }]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['<%= basic.app %>/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', '<%= basic.app %>/**/*.js', 'test/**/*.js'],
      options: {
        node: true,
        strict: true,
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    connect: {
      options: {
        port: SERVER_PORT,
        keepalive: true,
        open: true,
        hostname: 'localhost'
      },
      production: {
        options: {
          base: 'dist'
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.registerTask('default', [
    'jshint',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concat',
    'copy',
    'uglify'
  ]);

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('serve', [
    'jshint',
    'build',
    'connect'
  ]);



};
