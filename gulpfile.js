var gulp = require("gulp"),
  rename = require("gulp-rename"),
  mocha = require("gulp-mocha"),
  gprint = require("gulp-print"),
  babel = require("gulp-babel"),
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  fs = require("fs");

gulp.task("transpile-all", function() {
  gulp
    .src("**/**-es6.js")
    .pipe(babel({ presets: ["babel-preset-es2015"], plugins: ["transform-decorators-legacy"] }))
    .pipe(
      rename(function(path) {
        path.basename = path.basename.replace(/-es6$/, "");
      })
    )
    .pipe(gulp.dest(""))
    .pipe(
      gprint(function(filePath) {
        return "File processed: " + filePath;
      })
    );
});

gulp.task("transpile-watch", function() {
  return gulp.watch("**/**-es6.js", function(obj) {
    if (obj.type === "changed") {
      gulp
        .src(obj.path, { base: "./" })
        .pipe(
          plumber({
            errorHandler: function(error) {
              //babel error - dev typed in in valid code
              if (error.fileName) {
                var fileParts = error.fileName.split("\\");
                try {
                  notify.onError(error.name + " in " + fileParts[fileParts.length - 1])(error);
                } catch (e) {} //gulp-notify may break if not run in Win 8
                console.log(error.name + " in " + error.fileName);
              } else {
                notify.onError("Oh snap, file system error! :(")(error);
              }

              console.log(error.message);
              this.emit("end");
            }
          })
        )
        .pipe(babel({ presets: ["babel-preset-es2015"], plugins: ["transform-decorators-legacy"] }))
        .pipe(
          rename(function(path) {
            path.basename = path.basename.replace(/-es6$/, "");
          })
        )
        .pipe(gulp.dest(""))
        .pipe(
          gprint(function(filePath) {
            return "File processed: " + filePath;
          })
        );
    }
  });
});
