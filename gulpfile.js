/**
 * Packages
 */
const gulp = require('gulp');

// Utilities
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

// CSS
const sass = require('gulp-sass');
const pleeease = require('gulp-pleeease');

// JS
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

/**
 * Config
 */
const conf = {
  rootDir: 'docs/',
  srcDir: 'src/'
};

// Path
const paths = {
  src: {
    styles: conf.srcDir+'styles/**/*.scss',
    scripts: conf.srcDir+'scripts/',
  },
  dest: {
    views: conf.rootDir+'*.html',
    styles: conf.rootDir+'assets/styles',
    stylesMap: conf.rootDir+'assets/styles/**/*.map',
    scripts: conf.rootDir+'assets/scripts',
    scriptsMap: conf.rootDir+'assets/scripts/**/*.map'
  }
}

/**
 * Tasks
 */

// Static server
gulp.task('browser-sync', function(){
  browserSync.init({
    port: 3000,
    open: false,
    reloadOnRestart: true,
    ui: false,
    notify: false,
    scrollProportionally: false,
    ghostMode: {
      scroll: false
    },
    server: {
      baseDir: conf.rootDir
    }
  });
});

// Reload all browsers
gulp.task('bs-reload', function () {
  reload();
});

// Styles
gulp.task('build:styles', function () {
  gulp.src(paths.src.styles)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle:'compressed',
      includePaths: [
        'node_modules/',
        require('bourbon').includePaths,
        require('bourbon-neat').includePaths
      ]
    }))
    .pipe(pleeease({
      autoprefixer: {
        browsers: ['last 2 versions']
      },
      mqpacker: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest.styles))
    .pipe(reload({stream: true}));
});

// Scripts
gulp.task('build:scripts', function() {
  return browserify({
    entries: [paths.src.scripts+'scripts.js'],
    debug: true
  }).bundle()
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(uglify({output:{comments:/^!/}})).on('error', function(err){ console.log(err); })
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest.scripts))
    .pipe(reload({stream: true}));
});

// Clean
gulp.task('clean', del.bind(null,
  [
    paths.dest.stylesMap,
    paths.dest.scriptsMap
  ]
));

// Build
gulp.task('build', gulp.series('clean', 'build:styles', 'build:scripts'));

// Default
gulp.task('default', gulp.series('browser-sync'), function() {
  gulp.watch(paths.src.styles,['build:styles']);
  gulp.watch(paths.src.scripts+'**/*.*',['build:scripts']);
  gulp.watch(paths.dest.views,['bs-reload']);
});
