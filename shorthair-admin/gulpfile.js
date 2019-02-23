const gulp = require("gulp");
const sass = require("gulp-sass");

const sassToCss = () => {
  return gulp
    .src("./mock/template/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./mock/template/"));
};

gulp.task("sass", gulp.series(() => sassToCss()));

gulp.task(
  "watch",
  gulp.series(() => {
    gulp.watch("./mock/template/*.scss", () => sassToCss());
  })
);
