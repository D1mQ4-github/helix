const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

function server() {
    browserSync.init({
        server: './dist'
    });

    gulp.watch('./src/sass/**/*.scss', gulp.series(css));
    gulp.watch('./src/js/*.js', gulp.series(scripts)).on('change', browserSync.reload);
    gulp.watch('./src/*.html', gulp.series(html)).on('change', browserSync.reload);
    gulp.watch('./src/img/**/*').on('all', gulp.series(img));
    gulp.watch('./src/fonts/**/*').on('all', gulp.series(fonts));
    gulp.watch('./src/icons/**/*').on('all', gulp.series(icons));
}

function html() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}

function img() {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream());
}

function fonts() {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts/'))
        .pipe(browserSync.stream());
}

function icons() {
    return gulp.src('./src/icons/**/*')
        .pipe(gulp.dest('./dist/icons/'))
        .pipe(browserSync.stream());
}

function css() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./src/styles/'))
        .pipe(gulp.dest('./dist/styles/'))
        .pipe(browserSync.stream());
}

module.exports.start = gulp.series(html, css, fonts, scripts, icons, img, server);