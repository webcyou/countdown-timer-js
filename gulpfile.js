var gulp = require("gulp"),
    path = require('path'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    typescript = require('gulp-typescript'),
    plumber = require('gulp-plumber'),
    rename = require("gulp-rename"),
    del = require('del'),
    runSequence = require('run-sequence'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util');

var FILE_NAME = 'countdown_timer.js';

var SOURCE_DIR = 'src',
    DEMO_DIR   = 'docs',
    DIST_DIR   = 'dist';

var scssFiles = DEMO_DIR + '/scss/**/*.scss';
var cssFiles  = DEMO_DIR + '/**/*.css';
var jsFiles = [
    DEMO_DIR + '/js/**/*.js'
];
var tsFiles = [ SOURCE_DIR + '/**/*.ts' ];

/**
 * Clean Task
 **/
gulp.task('clean.dist', function() {
  return del([DIST_DIR + '/*'], {force: true});
});

/**
 * Sass, CSS Task
 **/
gulp.task('sass', function() {
  return gulp.src(scssFiles)
    .pipe(sass({
      outputStyle: 'expanded'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest( DEMO_DIR + '/css'));
});

gulp.task('css.min', function() {
  return gulp.src(cssFiles)
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 8', 'ios 5', 'android 2.3'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest( DEMO_DIR + '/css'));
});


/**
 * JavaScript Task
 **/
// typescript
gulp.task('ts', function () {
  return gulp.src(tsFiles)
    .pipe(plumber())
    .pipe(typescript({
      removeComments: true,
      module: 'commonjs',
      out: FILE_NAME
    }))
    .pipe(gulp.dest(DEMO_DIR + '/js/'));
});

gulp.task('js.min', function() {
  return gulp.src([
    DEMO_DIR + '/js/**/*.js',
    '!' + DEMO_DIR + '/js/**/*min.js'
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(DEMO_DIR + '/js/'));
});

gulp.task('js.copy', function() {
  return gulp.src(jsFiles)
    .pipe(gulp.dest( DIST_DIR ));
});


/**
 * Watch Files
 **/
gulp.task('watch', function() {
  // SCSS
  gulp.watch([scssFiles], ['build.css']);

  // Typescript
  gulp.watch([tsFiles], ['ts', 'js.min']);
});


/**
 * Build Task
 **/
gulp.task('build.ui', function(callback) {
  return runSequence(
    ['build.css', 'build.js'],
    callback
  );
});

gulp.task('build.css', function(callback) {
  return runSequence(
    'sass',
    'css.min',
    callback
  );
});

gulp.task('build.js', function(callback) {
  return runSequence(
    'ts',
    'js.min',
    'js.copy',
    callback
  );
});


/**
 * Test Task
 **/
gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec'}))
    .on('error', gutil.log);
});

gulp.task('mocha.watch', function() {
  gulp.watch(['test/**'], ['mocha']);
});


/**
 * Gulp Server
 **/
gulp.task('serve', ['connect'], function() {
  gulp.watch([
      DEMO_DIR + '/**/*.*'
  ]).on('change', function(changedFile) {
    gulp.src(changedFile.path).pipe(connect.reload());
  });
});

gulp.task('connect', function() {
  connect.server({
    root: [__dirname + '/' + DEMO_DIR],
    port: 8088,
    livereload: true
  });
});


/**
 * Dist Task
 **/
gulp.task('dist', function(callback) {
  runSequence(
    'clean.dist',
    'build.ui',
    callback
  );
});


/**
 * Default Task
 **/
gulp.task('default', function(callback) {
  runSequence(
    'build.ui',
    'watch',
    'serve',
    callback
  );
});
