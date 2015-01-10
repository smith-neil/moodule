var gulp   = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('default', function () {
  return gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
    .pipe(gulp.dest('./'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./'));
})