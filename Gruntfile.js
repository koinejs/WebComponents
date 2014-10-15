module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'src/*.js',
        'examples/**/*.js'
      ]
    },
    jasmine: {
      components: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/koine-publisher/src/*js',
          'node_modules/koine-decorators-dom/src/*js',
          'src/*js'
        ],
        options: {
          specs: 'specs/*_spec.js',
          keepRunner : true,
          // display : 'short',
          summary : true,
          helpers: 'specs/helpers/*.js'
        }
      }
    },
    uglify: {
      minify: {
        files: {
          'dist/Koine.WebComponents.min.js': [
            'src/*',
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('jshintage', [
    'jshint',
  ]);

  grunt.registerTask('test', [
    'jasmine',
  ]);

  grunt.registerTask('travis', [
    'jasmine',
    'jshint',
    'uglify'
  ]);
};
