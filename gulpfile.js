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

gulp.task('vendor', [], function () {
	var vendor_paths = [
		'./bower_components/angular/angular.js',
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/requirejs/require.js'
	]
	for(var i = 0, l = vendor_paths.length; i < l; i++){
		gulp.src(vendor_paths[i])
			.pipe(gulp.dest('./dist/js/vendor/'));
	}
});

gulp.task('scripts', ['coffee'], function () {
	gulp.src('./scripts/js/**/*.js')
		.pipe(gulp.dest('./dist/js'));
});
gulp.task('stylesheets', ['sass'], function () {
	gulp.src('./stylesheets/css/**/*.css')
		.pipe($.sourcemaps.init())
		.pipe($.postcss([ autoprefixer({ browsers: ['last 5 versions'] }) ]))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('watch', [], function () {
	$.livereload.listen();
	gulp.watch([
		'./dist/*.html',
		'./dist/css/*.css',
		'./dist/scripts/*.js'
	]).on('change', function (file) {
		$.livereload.changed(file.path);
	});
	gulp.watch('./scripts/coffee/*.coffee', {interval: 500}, ['scripts']);
	gulp.watch('./stylesheets/sass/*.scss', {interval: 500}, ['stylesheets']);
});

gulp.task('connect', [], function () {
	var port = 8000;
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

gulp.task('default', ['scripts', 'stylesheets', 'watch', 'vendor', 'connect'], function () {
	$.util.log('Gulp started and watching for changes...');
});