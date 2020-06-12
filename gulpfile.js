const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const path = require('path');

const postcss = require('gulp-postcss');
const postcssUrl = require('postcss-url');

gulp.task('sass', () => {
  const plugins = [
    postcssUrl({
      url: 'inline',
      basePath: path.resolve('./src/'),
      assetsPath: path.resolve('./demo/assets/'),
      useHash: true,
    }),
  ];

  return gulp
    .src('src/*.scss')
    .pipe(sass())
    .pipe(postcss(plugins), { syntax: require('postcss-scss') })
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
