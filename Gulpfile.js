var gulp = require('gulp'),
  $ = require('gulp-load-plugins')();

gulp.task('traceur:runtime', function() {
  return gulp.src($.traceur.RUNTIME_PATH)
    .pipe(gulp.dest('dist'));
});

function build(type) {
  var runtimePath = $.traceur.RUNTIME_PATH,
    _order = ['traceur-runtime.js', 'event.js', 'observe.js', 'global.js'];

  var filter = $.filter(['*.js', '!traceur-runtime.js']);

  var pipeline = gulp.src([runtimePath, 'lib/*.js'])
    .pipe($.order(_order))
    .pipe($.sourcemaps.init())
    .pipe(filter)
    .pipe($.traceur({
      sourceMap: true,
      modules: type
    }))
    .pipe(filter.restore())
    .pipe($.concat('eventd.js'))
    .pipe($.sourcemaps.write('.')).pipe(gulp.dest('dist'));

  return pipeline;
}

gulp.task('build:inline', function() {
  build('inline');
});

gulp.task('default', ['build:inline']);