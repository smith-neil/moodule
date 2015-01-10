var gulp   = require('gulp'),
    bump   = require('gulp-bump'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('patch', ['build'], function () {
  return gulp.src('./package.json')
    .pipe(bump({type: 'patch'}))
    .pipe(gulp.dest('./'));
});

gulp.task('minor', ['build'], function () {
  return gulp.src('./package.json')
    .pipe(bump({type: 'minor'}))
    .pipe(gulp.dest('./'));
});

gulp.task('major', ['build'], function () {
  return gulp.src('./package.json')
    .pipe(bump({type: 'major'}))
    .pipe(gulp.dest('./'));
});

gulp.task('build', function () {
  return gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
    .pipe(gulp.dest('./'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./'));
});