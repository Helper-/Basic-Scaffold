'use strict';
var SERVER_PORT = 9000;
var LIVERELOAD_PORT = 35729;

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
        dest: '.tmp/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: 'dist/scripts.min.js'
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        src: ['<%= basic.app %>/**/*.css'],
        dest: 'dist/style.min.css'
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
      prod: {
        options: {
          base: 'dist'
        }
      },
      dev: {
        options: {
          base: 'app'
        }
      }
    },
    watch: {
      options: {
        livereload: LIVERELOAD_PORT
      },
      files: ['<%= jshint.files %>', '<%= basic.app %>/**'],
      tasks: ['jshint', 'serve']
    }
  });

  grunt.registerTask('default', [
    'jshint',
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concat',
    'copy',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('serve', function(target){
    if (target === 'prod') {
      return grunt.task.run([
        'jshint',
        'build',
        'connect:prod'
      ]);
    }
    grunt.task.run([
      'jshint',
      'connect:dev',
      'watch'
    ]);
  });



};
