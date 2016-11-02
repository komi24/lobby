// Generated on 2015-01-02 using generator-angular 0.10.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.loadNpmTasks('grunt-wiredep');

  // Configurable paths for the application
  var appConfig = {
    app: 'client/app',
    test: 'client/test',
    dist: 'dist',
    site: {
      development: 'http://localhost:3000',
      production: ''
    },
    host: 'localhost'
  };

  console.log("GRUNT INIT")
  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,


    // Empties folders to start fresh
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              '<%= yeoman.dist %>/{,*/}*',
              '!<%= yeoman.dist %>/.git{,*/}*'
            ]
          }
        ]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/css/',
            src: '{,*/}*.css',
            dest: '.tmp/css/'
          }
        ]
      }

    },

    includeSource: {
      options: {
        basePath: 'client/app',
        baseUrl: '/',
        templates: {
          html: {
            js: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" href="{filePath}" />'
          },
          less: {
            less: '@import "{filePath}";',
            css: '@import "{filePath}";',
          },
        }
      },
      server: {
        files: {
          '<%= yeoman.app %>/index.html': '<%= yeoman.app %>/index.tpl.html'
        }
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/index.html': '<%= yeoman.app %>/index.tpl.html'
        }
      }

    },
    // Automatically inject Bower components into the app
    wiredep: {
      server: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: /\.\.\//
      },
      dist: {
        src: ['<%= yeoman.dist %>/index.html'],
        ignorePath: '../client/app/'
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.dist %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        root: '<%= yeoman.app %>',
        flow: {
          html: {
            steps: {
              js: [
                'concat',
                'uglifyjs'
              ],
              css: [
                'cssmin'
              ]
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/css/main.css': [
    //         '.tmp/css/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            src: '{,*/}*.{png,jpg,jpeg,gif}',
            dest: '<%= yeoman.dist %>/images'
          }
        ]
      }
    },

    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            src: '{,*/}*.svg',
            dest: '<%= yeoman.dist %>/images'
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          minifyJS: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.dist %>',
            src: [
              '*.html',
              'modules/**/views/{,*/}*.html'
            ],
            dest: '<%= yeoman.dist %>'
          }
        ]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/concat/scripts',
            src: [
              '*.js',
              '!lb-services.js',
              '!config.js',
              '!oldieshim.js'
            ],
            dest: '.tmp/concat/scripts'
          }
        ]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              'modules/**/{,*/}*.html',
              'images/{,*/}*.*',
              //'css/{,*/}*.*',
              'fonts/{,*/}*.*'
            ]
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            dest: '<%= yeoman.dist %>/images',
            src: ['generated/*']
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/css',
            dest: '<%= yeoman.dist %>/css',
            src: ['generated/*']
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/bower_components/bootstrap/dist',
            src: 'fonts/*',
            dest: '<%= yeoman.dist %>'
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/bower_components/ionicons',
            src: 'fonts/*',
            dest: '<%= yeoman.dist %>'
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/bower_components/font-awesome',
            src: 'fonts/*',
            dest: '<%= yeoman.dist %>'
          }
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/css',
        dest: '.tmp/css/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },
  });

  // Load the plugin that provides the "loopback-angular" and "grunt-docular" tasks.

  console.log("GRUNT REGISTER TASK START serve")
  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
  //   if (target === 'dist') {
  //     return grunt.task.run([
  //       'build',
  //       'connect:dist:keepalive'
  //     ]);
  //   }

    grunt.task.run([
      'clean:server',
      // 'api',
      'includeSource:server',
      // 'ngconstant:development',
      // 'loopback_sdk_angular:development',
      'wiredep:server',
      'concurrent:server',
      'autoprefixer'
      // 'connect:livereload',
      // 'watch'
    ]);
  });

  // var nodemon = require('gulp-nodemon');

  // console.log("GRUNT REGISTER TASK START api")
  // grunt.registerTask('api', function () {
  //   nodemon({
  //     script: 'server/server.js',
  //     ext: 'js json',
  //     watch: [
  //       'common',
  //       'server'
  //     ]
  //   })
  // });

  // console.log("GRUNT REGISTER TASK START server")
  grunt.registerTask('build', [
    // 'clean:dist',
    'includeSource:server',
    'wiredep:server'
    // 'useminPrepare',
    // //'concurrent:dist',
    // //'autoprefixer',
    // 'concat',
    // 'ngAnnotate',
    // 'copy:dist'
    //'cdnify',
    // 'cssmin',
    // 'uglify',
    // 'filerev',
    // 'usemin',
    // 'htmlmin'
  ]);

  // grunt.registerTask('default', [
  //   'newer:jshint',
  //   'test',
  //   'ngconstant:development',
  //   'loopback_sdk_angular:development',
  //   'docular',
  //   'nggettext_extract',
  //   'nggettext_compile',
  //   'build'
  // ]);

  // grunt.registerTask('loopback', [
  //   'ngconstant:development',
  //   'loopback_sdk_angular:development',
  //   'docular'
  // ]);

  // grunt.registerTask('gettext', [
  //   'nggettext_extract',
  //   'nggettext_compile',
  // ]);

  grunt.registerTask('includesource', [
    'includeSource:server'
  ]);

  grunt.registerTask('makeit', [
    'wiredep:dist'
  ]);
};
