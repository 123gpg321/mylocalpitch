var gulp = require('gulp');
var $ = require('gulp-load-plugins')(); // only works for gulp-prefixed dependencies
var autoprefixer = require('autoprefixer');

gulp.task('sass', [], function () {
	return gulp.src('./stylesheets/sass/**/*.scss')
		.pipe($.sass().on('error', $.sass.logError))
		.pipe(gulp.dest('./stylesheets/css'));
});

gulp.task('coffee', [], function () {
	return gulp.src('./scripts/coffee/**/*.coffee')
		.pipe($.coffee({bare: true}).on('error', $.util.log))
		.pipe(gulp.dest('./scripts/js'));
});

gulp.task('watch', [], function () {
	$.livereload.listen();
	gulp.watch([
		'./dist/*.html',
		'./dist/*.css',
		'./dist/*.js'
	]).on('change', function (file) {
		$.livereload.changed(file.path);
	});
	gulp.watch('./scripts/coffee/**/*.coffee', ['coffee']);
	gulp.watch('./stylesheets/sass/**/*.scss', ['sass']);
});

gulp.task('connect', [], function () {
	var port = 8080;
	$.connect.server({
		root: './dist',
		port: port,
		livereload: true
	});
	var options = {
		uri: 'http://localhost:' + port,
		app: 'chrome'
	}
	gulp.src('./')
		.pipe($.open(options));	
});

gulp.task('default', ['connect', 'watch'], function () {
	
});