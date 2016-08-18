var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	iife = require("gulp-iife"),
	htmlreplace = require('gulp-html-replace');


gulp.task('default', function () {
	gulp.src('src/*.js')
		.pipe(concat('multivariate.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js/'));


	gulp.src('./style.css')
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/style/'));

	gulp.src('./index.html')
		.pipe(htmlreplace({
			'js': 'js/multivariate.min.js'
		}))
		.pipe(gulp.dest('./public/'));

});