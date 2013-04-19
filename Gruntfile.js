module.exports = function(grunt) {
  'use strict';
  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet
    , folderMount = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
      };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['app/*'],
        tasks: ['compass', 'livereload'],
        options: {}
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'app',
          cssDir: 'app',
          environment: 'production'
        }
      }
    },
    livereload: {
        port: '8087' // Default livereload listening port.
      , hostname: '*'
    },
    connect: {
      'server.livereload': {
        options: {
            hostname: '*'
          , port: 8086
          , base: 'app'
          , keepalive: true
          , middleware: function(connect, options) {
              return [
                connect.static(options.base),
                lrSnippet,
                connect.directory(options.base),
              ];
            }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  // Default task(s).
  grunt.registerTask('default', [
    // 'livereload-start',
    'connect',
    // 'watch'
  ]);

};