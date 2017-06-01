var gulp = require('gulp'),
	concat = require('gulp-concat'),
	order = require("gulp-order2"),
	uglify = require('gulp-uglify'),
	pump = require('pump');

gulp.task('default', function() {
  gulp.src('./src/*.js')
	.pipe(gulp.src("src/*.js"))
  	.pipe(order([
  		"renderGraph.js",
  		"renderTool.js",
  		"axis.js",
  		"yAxis.js",
  		"xAxis.js",
  		"parsing.js",
  		"lineChart.js",
  		"columnChart.js",
  		"global.js",
  		"crossChartTable.js",
  		"crossChart.js",
  		"crossChartDemo.js"
	]))
  	.pipe(concat('multivariatedv.js'))
  	.pipe(gulp.dest('./build'));
});

gulp.task('default', function(cb) {
	pump([
		gulp.src('build/multivariatedv.js'),
	    uglify(),
	    concat('multivariatedv.min.js'),
	    gulp.dest('build')
	], cb);
});