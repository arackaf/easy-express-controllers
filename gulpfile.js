var gulp = require('gulp'),
	rename = require('gulp-rename'),
	mocha = require('gulp-mocha'),
	gprint = require('gulp-print'),
	babel = require('gulp-babel');

gulp.task('initial-transpile', function () {
	gulp.src('**/**-es6.js')
		.pipe(babel({ stage: 1 }))
		.pipe(rename(function (path) {
			path.basename = path.basename.replace(/-es6$/, '');
		}))
		.pipe(gulp.dest(''))
		.pipe(gprint(function(filePath){ return "File processed: " + filePath; }));
});

gulp.task('test', function () {
    require('./testUtil/testSetup');

    gulp.src('tests/**/!(*-es6.js)') //we don't want es6 files - just the transpiled results
        .pipe(mocha());
});