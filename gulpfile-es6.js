var gulp = require('gulp'),
	rename = require('gulp-rename'),
	mocha = require('gulp-mocha'),
	gprint = require('gulp-print'),
	babel = require('gulp-babel'),
	karma = require("gulp-karma"),
	fs = require('fs');

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
	easyControllers.createController(app, 'person');
	easyControllers.createController(app, 'globalcontroller');
	easyControllers.createController(app, 'publisher/publisherDetails');
	easyControllers.createController(app, 'books/book');

	gulp.src('tests/**/!(*-es6.js)') //we don't want es6 files - just the transpiled results
		.pipe(mocha())
		.on('end', mochaTestsDone);

	function mochaTestsDone(){
		let filesToLoad = [
				'testUtil/jquery-2.1.4.min.js', //for $.ajax
				'testUtil/karmaTestSetup.js' //resets my utils global with client-side code to run and verify my paths with $.ajax
			],
			blackList = [
				'parameterSnifferTests.js',
				'requestDiscoveryTests.js'
			].map(f => f.toLowerCase());

		let allTestFiles = fs.readdirSync('./tests');
		filesToLoad.push(...allTestFiles.filter(f => !/-es6.js$/.test(f) && blackList.indexOf(f.toLowerCase()) < 0).map(f => `./tests/${f}`));

		//now re-run the relevant tests in an actual browser with acctual ajax calls
		gulp.src(filesToLoad)
			.pipe(karma({
				configFile: __dirname + "/karma.conf.js",
				action: "run"
			}))
			.on('end', function(){ server.close(); });
	}
});