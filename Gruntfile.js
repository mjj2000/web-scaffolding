module.exports = function(grunt) {
  'use strict';
  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet
    , folderMount = function (connect, dir) {
        return connect.static(require('path').resolve(dir), { maxAge: 0 });
      }
    , config = {
        app: './app',
        css: '<%= config.app %>/css',
        js: '<%= config.app %>/js'
      };
  // Project configuration.
  grunt.initConfig({
    config: config,
    regarde: {
      compass: {
        files: ['<%= config.css %>/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '<%= config.app %>/*.html',
          '<%= config.app %>/images/{,*/}*.*',
          '<%= config.css %>/{,*/}*.css',
          '<%= config.css %>/images/{,*/}*.*',
          '<%= config.js %>/scripts/{,*/}*.js'
        ],
        tasks: ['livereload']
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: '<%= config.css %>',
          cssDir: '<%= config.css %>',
          environment: 'production'
        }
      }
    },
    livereload: {
        port: 0 // Default livereload listening port.
      , hostname: '*'
    },
    connect: {
      server: {
        options: {
            hostname: '0.0.0.0'
          , port: 0
          , base: 'app'
          , middleware: function (connect, options) {
              return [
                lrSnippet,
                folderMount(connect, options.base),
                connect.directory(options.base)
              ];
            }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  // Default task(s).
  grunt.registerTask('default', [
    'livereload-start',
    'connect:server',
    'regarde'
  ]);

};