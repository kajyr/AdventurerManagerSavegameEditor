var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');

gulp.task('coffee', function() {
  gulp.src('./app/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./app/'))
});