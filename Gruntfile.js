module.exports = function(grunt) {
  'use strict';

  // load all grunt tasks in package.json
  require('load-grunt-tasks')(grunt);

  var config = {
        app: './app',
        css: '<%= config.app %>/css',
        js: '<%= config.app %>/js'
      };
  // Project configuration.
  grunt.initConfig({
    config: config,
    watch: {
      options: {
        livereload: {
          // random port isn't supported,
          // use `grunt-openport` instead to get available port in range([custom  port] or above)
          // (see custom task `server`)
          port: 35729
        }
      },
      compass: {
        files: [ config.css + '/{,*/}*.{scss,sass}'],
        tasks: [ 'compass' ],
        options: {
          livereload: false
        }
      },
      livereload: {
        files: [
          config.app + '/*.html',
          config.app + '/template/{,**/}*.html',
          config.css + '/images/{,**/}*.*',
          config.css + '/{,**/}*.css',
          config.css + '/images/{,**/}*.*',
          config.js + '/{,**/}*.js'
        ]
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: '<%= config.css %>',
          cssDir: '<%= config.css %>',
          environment: 'development'
        }
      }
    },
    connect: {
      server: {
        options: {
            hostname: '0.0.0.0'
          , port: 3000
          , base: 'app'
          , middleware: function (connect, options, middlewares) {
              return [
                // livereload injection
                function () {
                  // Live-reload server is part of `watch` task that is started later than server.
                  // We should get port of live-reload in each request
                  var lrPort = grunt.config.get('watch.options.livereload.port');
                  // custom middleware is generated by `connect-livereload`
                  (require('connect-livereload')({
                    src: "//" + options.hostname + ":" + lrPort + "/livereload.js?snipver=1"
                  })).apply(null, arguments);
                }
              ].concat(middlewares);;
            }
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', [
    // 'livereload-start',
    'connect:server',
    'openport:watch.options.livereload.port:' + grunt.config.get('watch.options.livereload.port'),
    'watch'
  ]);

};