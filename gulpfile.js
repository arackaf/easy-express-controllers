const gulp = require("gulp");
const babel = require("gulp-babel");
const gprint = require("gulp-print").default;

gulp.task("transpile-all", function() {
  transpileFolder("controllers");
  transpileFolder("controllers2");
});

function transpileFolder(name) {
  gulp
    .src(`./test/${name}-src/**/**.js`)
    .pipe(babel({ plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]] }))
    .pipe(gulp.dest(`./${name}`))
    .pipe(
      gprint(function(filePath) {
        return "File processed: " + filePath;
      })
    );
}
