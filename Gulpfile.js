var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('traceur:runtime', function() {
  return gulp.src($.traceur.RUNTIME_PATH)
    .pipe(gulp.dest('dist'));
});

function build(type) {
  var runtimePath = $.traceur.RUNTIME_PATH,
    filter = $.filter(['*','!traceur-runtime.js']);
  type = type || 'inline';
  return gulp.src([runtimePath, 'lib/*.js'])
    .pipe($.order([
      'traceur-runtime.js',
      'event.js',
      'observe.js',
      'global.js'
    ]))
    .pipe($.sourcemaps.init())
    .pipe(filter)
    .pipe($.traceur({
      sourceMap: true,
      modules: type
    }))
    .pipe(filter.restore())
    .pipe($.concat(['eventd.', type, '.js'].join('')))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
}

gulp.task('build:inline',function() {
  build('inline');
});

gulp.task('build:cjs',function() {
  build('commonjs');
});

gulp.task('build:amd',function() {
  build('amd');
});

gulp.task('default', ['build:inline']);