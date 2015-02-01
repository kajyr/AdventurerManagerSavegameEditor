var gulp = require('gulp');
var coffee = require('gulp-coffee');
var compass = require('gulp-compass');
var gutil = require('gulp-util');

gulp.task('coffee', function() {
	gulp.src('./app/*.coffee')
	.pipe(coffee({bare: true}).on('error', gutil.log))
	.pipe(gulp.dest('./app/'))
});


gulp.task('sass', function() {
	gulp.src('./sass/*.scss')
	.pipe(compass({
		config_file: './config.rb',
		css: './app/css',
		sass: './sass'
	}))
	.pipe(gulp.dest('app/assets/temp'));
});

gulp.task('foundation', function() {
	gulp.src('./bower_components/foundation/css/*.css')
	.pipe(gulp.dest('./app/css/'));

	gulp.src('./bower_components/foundation/js/foundation.min.js')
	.pipe(gulp.dest('./app/js/'));
});