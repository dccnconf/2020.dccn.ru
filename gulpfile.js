const gulp = require('gulp');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync');
const del = require('del');
const util = require('gulp-util');
const purgecss = require('@fullhuman/postcss-purgecss');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const config = {
  root: {
    src: 'src',
    dest: 'dist',
  },
  production: !!util.env.production,
};

console.log('* Gulp is running in ', 
            config.production ? 'production' : 'development', ' mode');

const paths = {
  dest: `${config.root.dest}/`,
  css: `${config.root.src}/**/*.css`,
  html: `${config.root.src}/**/*.html`,
  js: `${config.root.src}/**/*.js`,
  images: `${config.root.src}/images/**`
};

/////////////////////////////////////////////////////////////////////////////
// Production-specific plugins and tools:
const postcssPlugins = config.production ? 
  [
    purgecss({
      content: [paths.html, paths.js],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }), 
    cssnano({ preset: 'default' }),
  ] : [];

const uglifyTool = config.production ? uglify : util.noop;

/////////////////////////////////////////////////////////////////////////////
// Define build tasks:
const build = {
  css: function () {
    return gulp.src(paths.css)
      .pipe(sourcemaps.init())
      .pipe(postcss([
        require('tailwindcss'),
        require('autoprefixer'),
        ...postcssPlugins,
      ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.stream());
  },
  
  html: function () {
    return gulp.src(paths.html)
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.stream());
  },

  js: function () {
    return gulp.src(paths.js)
      .pipe(sourcemaps.init())
      .pipe(babel({ presets: ['@babel/env'] }))
      .pipe(uglifyTool())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.stream());
  },

  images: function () {
    return gulp.src(paths.images)
      .pipe(gulp.dest(paths.dest + '/images'))
      .pipe(browserSync.stream());
  }
};

const buildAll = gulp.parallel(build.css, build.html, build.js, build.images);

const serve = function () {
  browserSync.init({ server: config.root.dest });
  gulp.watch(paths.css, build.css);
  gulp.watch(paths.js, build.js);
  gulp.watch(paths.html, build.html);
  gulp.watch(paths.images, build.images);
};

const clear = function (callback) {
  del([`${config.root.dest}/*`]);
  callback();
};

exports.build = buildAll;
exports.serve = gulp.series(buildAll, serve);
exports.clear = clear;
