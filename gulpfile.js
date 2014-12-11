var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(); // Load all gulp plugins
// automatically and attach
var less = require('gulp-less');

var runSequence = require('run-sequence'); // Temporary solution until gulp 4
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('concat-angular:js', function() {
    return gulp.src([
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-cookies/angular-cookies.js',
            'app/bower_components/loash/dist/loash.min.js'
        ])
        .pipe(concat('angular.concat.min.js'))
        .pipe(gulp.dest('dist/js/'))
});

gulp.task('concat:js', function() {
    return gulp.src([
            'app/js/app.js',
            'app/js/controllers.js',
            'app/js/directives.js',
            'app/js/filters.js',
            'app/js/services.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('uglify:js', function() {
    return gulp.src([
            'app/js/app.js',
            'app/js/controllers.js',
            'app/js/directives.js',
            'app/js/filters.js',
            'app/js/services.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('compile:less', function() {

    var banner = '/*! template */\n\n';

    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(plugins.header(banner))
        .pipe(gulp.dest('dist/css'));

});


gulp.task('copy:misc', function() {
    return gulp.src([
        'app/views/deal.html',
        'app/views/dealist.html'
    ]).pipe(gulp.dest('dist/views/'));
});


gulp.task('jshint', function() {
    return gulp.src([
            'gulpfile.js',
            dirs.src + '/javascript/**/*'
        ]).pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
});

gulp.task('watch', function() {
    gulp.watch(['app/less/*'], ['compile:less']);
});


// -----------------------------------------------------------------------------
// | Main tasks                                                                |
// -----------------------------------------------------------------------------
gulp.task('clean', function(done) {
    require('del')([
        'dist/js/main.js',
    ], done);
});

gulp.task('copy', [
    'copy:misc'
]);

gulp.task('compile', [
    'compile:less',
    'concat:js'
]);


gulp.task('build', function(done) {
    runSequence(
        ['clean'],
        'compile:less',
        'concat:js',
        'concat-angular:js',
        'copy',
        done);
});


gulp.task('default', ['build']);
