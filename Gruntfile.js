module.exports = function(grunt) {

  var source_directory = './src',
      target_directory = '.';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      dist: {
        options: {
          baseUrl: source_directory+'/js',
          mainConfigFile: source_directory+'/js/config.js',
          out: target_directory + '/js/script.js',
          name: 'script',
          optimize: "uglify2",
          uglify2: {
              output: {
                  beautify: false
              },
              compress: true,
              warnings: true,
              mangle: true
          },
        }
      },
      dev: {
        options: {
          baseUrl: source_directory+'/js',
          mainConfigFile: source_directory+'/js/config.js',
          out: target_directory + '/js/script.js',
          name: 'script',
          optimize: 'none'
        }
      }
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: source_directory,
          src: ['**/*.{jpg,ico,gif,png,eot,svg,ttf,woff,php,html}'],
          dest: target_directory
        }, {
          src: ['bower_components/requirejs/require.js'],
          dest: target_directory + '/js/require.js'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: source_directory,
          src: ['**/*.{jpg,ico,gif,png,eot,svg,ttf,woff,php,html}'],
          dest: target_directory
        }, {
          src: ['bower_components/requirejs/require.js'],
          dest: target_directory + '/js/require.js'
        }]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: source_directory,
          src: ['img/**/*.{png,gif}'],
          dest: target_directory,
        }]
      }
    },
    inline_angular_templates: {
      dist: {
        options: {
          base: '', // (Optional) ID of the <script> tag will be relative to this folder. Default is project dir.
          prefix: '',            // (Optional) Prefix path to the ID. Default is empty string.
          selector: '#container',       // (Optional) CSS selector of the element to use to insert the templates. Default is `body`.
          method: 'prepend',       // (Optional) DOM insert method. Default is `prepend`.
          unescape: {             // (Optional) List of escaped characters to unescape
            '&lt;': '<',
            '&gt;': '>',
            '&apos;': '\'',
            '&amp;': '&'
          }
        },
        files: {
          'index.html': ['partials/*.html']
        }
      }
    },
    less: {
      dev: {
        options: {
          cleancss: false
        },
        files: [{
          expand: true,
          cwd: source_directory,
          src: ['css/style.less'],
          dest: target_directory,
          ext: '.css'
        }]
      },
      dist: {
        options: {
          cleancss: true
        },
        files: [{
          expand: true,
          cwd: source_directory,
          src: ['css/style.less'],
          dest: target_directory,
          ext: '.css'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: source_directory,
          src: ['**/*.svg'],
          dest: target_directory,
        }, {
          expand: true,
          cwd: 'bower_components/fontawesome/fonts',
          src: ['*.svg'],
          dest: target_directory + '/font'
        }]
      }
    },
    uglify: {
      dist: {
        files: [{
          src: ['bower_components/requirejs/require.js'],
          dest: target_directory + '/js/require.js'
        }]
      }
    },
    compress: {
      pack: {
        options: {
          archive: 'distribution.zip'
        },
        files: [{
          expand: true,
          cwd: target_directory,
          src: ['**'],
          dest: '/',
        }]
      }
    },
    concurrent: {
      dev: ['copy:dev', 'less:dev'],
      dist: ['copy:dist', 'less:dist', 'imagemin:dist', 'svgmin:dist', 'uglify:dist'],
      watch: ['watch:copy', 'watch:less']
    },
    clean: {
      statics: [target_directory + '/img', target_directory + '/css', target_directory + '/js', target_directory + '/font'],
      pack: ['distribution.zip'],
      postbuild: ['.tmp']
    },
    watch: {
      copy: {
        files: [source_directory + '/**/*.{jpg,ico,gif,png,eot,svg,ttf,woff,php,html}'],
        tasks: ['copy:dev']
      },
      requirejs: {
        files: [source_directory + '/**/*.js'],
        tasks: ['copy:dev', 'requirejs:dev']
      },
      less: {
        files: [source_directory + '/**/*.less'],
        tasks: ['less:dev']
      }
    },
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-inline-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-svgmin');

  grunt.registerTask('default', [
    'clean:statics',
    'concurrent:dev',
    'requirejs:dev',
    //'inline_angular_templates:dist',
    'clean:postbuild'
  ]);

  grunt.registerTask('spy', [
    'clean:statics',
    'concurrent:dev',
    'requirejs:dev',
    'concurrent:watch',
    'clean:postbuild'
  ]);


  grunt.registerTask('dist', [
    'clean:statics',
    'concurrent:dist',
    'requirejs:dist',
    //'inline_angular_templates:dist',
    'clean:postbuild'
  ]);

  grunt.registerTask('pack', [
    'clean:statics',
    'clean:pack',
    'concurrent:dist',
    'requirejs:dist',
    'compress:pack',
    'clean:postbuild'
  ]);
};
