var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('traceur:runtime', function() {
  return gulp.src($.traceur.RUNTIME_PATH)
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
  var runtimePath = $.traceur.RUNTIME_PATH,
    filter = $.filter(['*','!traceur-runtime.js']);

  return gulp.src([runtimePath, 'lib/*.js'])
    .pipe($.order([
      'traceur-runtime.js',
      'event.js',
      'observe.js',
      'app.js'
    ]))
    .pipe($.sourcemaps.init())
    .pipe(filter)
    .pipe($.traceur({
      sourceMap: true,
      modules: 'inline'
    }))
    .pipe(filter.restore())
    .pipe($.concat('eventd.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});