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
          'node_modules/koine-publisher/src/*js',
          'src/*js'
        ],
        options: {
          specs: 'specs/*_spec.js',
          keepRunner : true,
          display : 'short',
          summary : true,
          helpers: 'specs/helpers/*.js'
        }
      }
    }
  });

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
    'jshint'
  ]);
};
