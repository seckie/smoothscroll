module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-rename');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      coffee: {
        main: {
          options: { },
          files: {
            'js/smoothscroll.js': '_coffee/*.coffee',
          }
        }
      },
      compass: {
        options: {
          httpPath: '/smoothscroll/',
          sassDir: '_scss',
          cssDir: 'css',
          imagesDir: 'img',
          relativeAssets: true
        },
        dev: {
          options: {
            environment: 'development',
            outputStyle: 'compact',
            noLineComments: true,
            assetCacheBuster: false
          }
        }
      },
      coffeelint: {
        // DOC: https://github.com/vojtajina/grunt-coffeelint
        // DOC: http://www.coffeelint.org/
        //            app: [ '_coffee/*.coffee' ],
        tests: {
          files: {
            src: [ '_coffee/*.coffee' ]
          },
          options: {
            'no_trailing_whitespace': {
              'level': 'error'
            }
          }
        }
      },
      copy: {
        main: {
          files: [
            {
              expand: true,
              cwd: 'bower_components/jquery/dist/',
              src: [ 'jquery.min.js' ],
              dest: 'js/'
            },
            {
              expand: true,
              cwd: 'bower_components/jquery-1.11.0/',
              src: [ '_temp_jquery.js' ],
              dest: 'js/'
            },
            {
              expand: true,
              cwd: 'bower_components/underscore/',
              src: [ 'underscore.js' ],
              dest: 'js/'
            },
            {
              expand: true,
              cwd: 'bower_components/backbone/',
              src: [ 'backbone.js' ],
              dest: 'js/'
            }
          ]
        }
      },
      rename: {
        main: {
          files: [
            {
              src: [ 'js/_temp_jquery.js' ],
              dest: 'js/jquery-1.11.0.min.js'
            }
          ]
        }
      },
      watch: {
//        scss: {
//          files: [ '_scss/*.scss' ],
//          tasks: [ 'compass:dev' ]
//        },
        coffee: {
          files: [ '_coffee/*.coffee' ],
          tasks: [ 'coffee' ]
        },
        coffeelint: {
          files: [ '_coffee/*.coffee' ],
          tasks: [ 'coffeelint' ]
        }
      }
  });

  grunt.registerTask('default', [ 'coffee', 'coffeelint', 'watch' ]);
  grunt.registerTask('deploy', [ 'copy', 'rename', 'coffee' ]);
};
