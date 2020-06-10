const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('sass', () => {
  return gulp
    .src('src/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('demo/css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', () => {
  browserSync.init({
    server: './demo',
  });

  gulp.watch('src/*.scss', gulp.parallel('sass'));
  gulp.watch('demo/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('sass', 'serve'));
