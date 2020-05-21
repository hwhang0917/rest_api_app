import gulp from "gulp";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import sourcemaps from "gulp-sourcemaps";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import minifyJS from "gulp-uglify";
import del from "del";
import browserify from "browserify";
import babelify from "babelify";
import log from "gulplog";

// PATH variables
const paths = {
  styles: {
    src: "src/assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "src/assets/scss/**/*.scss",
  },
  js: {
    src: "src/assets/js/main.js",
    dest: "src/static/js",
    watch: "src/assets/js/**/*.js",
  },
};

// This cleans the build static JS / CSS files before building
const clean = () => del([paths.js.dest, paths.styles.dest]);

const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));

const js = () => {
  const b = browserify({
    entries: paths.js.src,
    debug: true,
  });
  return b
    .transform(
      babelify.configure({
        presets: ["@babel/preset-env"],
      })
    )
    .bundle()
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(minifyJS())
    .on("error", log.error)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.js.dest));
};

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};

// const dev = gulp.series([clean, styles, watchFiles]);
const dev = gulp.series([clean, styles, js, watchFiles]);

// export const build = gulp.series(clean, styles);
export const build = gulp.series(clean, styles, js);

export default dev;
