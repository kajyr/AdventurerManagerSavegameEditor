var gulp = require('gulp');
var coffee = require('gulp-coffee');
var compass = require('gulp-compass');
var gutil = require('gulp-util');
var watch = require('gulp-watch');

var files = {
	Application: './Application/*.coffee'
}

gulp.task('coffee', function() {
	gulp.src(files.Application)
	.pipe(coffee({bare: true}).on('error', gutil.log))
	.pipe(gulp.dest('./app/js'))
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

gulp.task('bower', function() {
	gulp.src('./bower_components/foundation/css/*.css')
	.pipe(gulp.dest('./app/css/'));

	gulp.src('./bower_components/foundation/js/foundation.min.js')
	.pipe(gulp.dest('./app/js/'));

	gulp.src('./bower_components/jquery/dist/jquery.min.js')
	.pipe(gulp.dest('./app/js/'));

});

gulp.task('w', function () {
    gulp.watch(files.Application, ['coffee']);
});