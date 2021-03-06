"use strict";

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyJs = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');

var paths = {
    build: [
        'static'
    ],
    js: [
        'app/**/*.module.js',
        'app/**/*.service.js',
        'app/**/*.js'
    ],
    js_vendors: [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js'
    ],
    html: [
        'app/**/*.html'
    ],
    styles: [
        'assets/styles/**/*.scss'
    ],
    styles_vendors: [],
    images: [
        'assets/images/**/*'
    ],
    fonts: [
        'assets/fonts/**/*'
    ]
};

gulp.task('clean', function () {
    return del.sync(paths.build, {force: true});
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.build + '/fonts'));
});

gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(concat('app.min.js'))
        .pipe(jshint())
        .pipe(minifyJs())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest(paths.build + '/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.build + '/images'));
});


gulp.task('js_vendors', function () {
    return gulp.src(paths.js_vendors)
        .pipe(concat('vendors.min.js'))
        .pipe(gulp.dest(paths.build + '/js'));
});


gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(minifyHtml({empty: true}))
        .pipe(gulp.dest(paths.build + '/html'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(gulp.dest(paths.build + '/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('styles_vendors', function () {
    return gulp.src(paths.styles_vendors)
        .pipe(concat('vendors.min.css'))
        .pipe(gulp.dest(paths.build + '/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build', ['clean'], function () {
    gulp.start('js', 'js_vendors', 'html', 'styles', 'styles_vendors', 'images', 'fonts');
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: ''
        }
    });
});

gulp.task('browserSyncReload', function () {
    browserSync.reload({
        stream: false
    });
});

gulp.task('watch', ['build', 'browserSync'], function () {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.js_vendors, ['js_vendors']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.styles_vendors, ['styles_vendors']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.images, ['fonts']);
    gulp.watch(['index.html'], ['browserSyncReload']);
});


gulp.task('default', ['watch'], function () {

});