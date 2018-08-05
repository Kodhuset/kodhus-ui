const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

const version = require('./package.json').version;

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch("example/index.html").on('change', browserSync.reload);
});

gulp.task('sass-build', () => {
    return gulp.src('src/scss/kodhus.scss')
        .pipe(sass())
        .pipe(csso())
        .pipe(rename({suffix: '-' + version}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('sass-build-min', () => {
  return gulp.src('src/scss/kodhus.scss')
      .pipe(sass())
      .pipe(csso())
      .pipe(rename({suffix: '-' + version + '.min'}))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src('src/js/kodhus.js')
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['serve']);