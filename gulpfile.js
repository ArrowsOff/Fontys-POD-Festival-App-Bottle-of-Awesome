var gulp      = require('gulp');
var gutil     = require('gulp-util');
var bower     = require('bower');
var sh        = require('shelljs');
var pngquant  = require('imagemin-pngquant');
var $         = require('gulp-load-plugins')({ camelize: true });

var paths = {
  sass: ['./app/scss/**/*.scss'],
  scripts: ['./app/js/**/*.js'],
  html: ['./app/index.html', './app/templates/**/*.html'],
  images: ['./app/img/**/*'],
  data: ['./app/data/**/*'],
  libraries: ['./app/lib/ionic/release/js/ionic.bundle.min.js',
              './app/lib/x2js/xml2json.min.js',
              './app/lib/angular-x2js/dist/x2js.min.js',
              './app/lib/ngCordova/dist/ng-cordova.min.js',
              './app/lib/ng-lodash/build/ng-lodash.min.js',
              './app/lib/pouchdb/dist/pouchdb.min.js',
              './app/lib/angular-pouchdb/angular-pouchdb.min.js',
              './app/lib/moment/min/moment.min.js',
              './app/lib/countdownjs/countdown.min.js',
              './app/lib/moment-countdown/bin/moment-countdown.min.js',
            //   './app/lib/imgcache.js/js/imgCache.js',
            //   './app/lib/angular-imgcache.js/angular-imgcache.js',
              './app/lib/angular-filter/dist/angular-filter.min.js',
              './app/lib/videogular/videogular.min.js',
              './app/lib/videogular-controls/vg-controls.min.js',
              './app/lib/PushNotification.js'],
  fonts: ['./app/lib/ionic/release/fonts/**', './app/fonts/**/*']
};

gulp.task('default', ['sass', 'scripts', 'scripts:vendor', 'html', 'images', 'fonts', 'data']);

/* HTML
========================================================*/
gulp.task('html', function() {
  gulp.src('./app/templates/**/*.html')
    .pipe(gulp.dest('./www/templates/'));

  return gulp.src('./app/index.html')
    .pipe(gulp.dest('./www'));
});

/* Fonts
========================================================*/
gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./www/fonts/'));
});


/* Styles
========================================================*/
gulp.task('sass', function() {
  return gulp.src('./app/scss/ionic.app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({ errLogToConsole: true }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./www/css/'));
});


/* Scripts
========================================================*/
gulp.task('scripts-lint', function() {
	return gulp.src(paths.scripts)
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['scripts-lint'], function() {
  return gulp.src(paths.scripts)
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('scripts:vendor', function() {
  return gulp.src(paths.libraries)
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendor.js'))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./www/js'));
});

/* Images
========================================================*/
gulp.task('images', function() {
  return gulp.src('./app/img/**/*')
    .pipe($.imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
    }))
    .pipe(gulp.dest('./www/img'));
});

/* Data
========================================================*/
gulp.task('data', function() {
  return gulp.src('./app/data/**/*')
    .pipe(gulp.dest('./www/data'));
});

/* Watch
========================================================*/
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.data, ['data']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.images, ['images']);
});


/* Other
========================================================*/
gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
